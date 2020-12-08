import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
@Component({
  selector: "message-thread",
  templateUrl: "./message-thread.component.html",
  styleUrls: ["./message-thread.component.css"],
})
export class MessageThreadComponent implements OnInit, OnChanges {
  @ViewChild("messageWindow", null) chatWindow: ElementRef;

  @Input() item = null;
  @Input() type = null;
  @Input() parentMessage = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageList = [];
  replyCount: number = 0;
  reachedTopOfConversation = false;
  scrollVariable = 0;
  loggedInUser = null;
  messageToBeEdited = null;
  replyPreview = null;

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    if (change["parentMessage"]) {
      this.messageList = [];
      this.scrollToBottomOfChatWindow();
      if (change["parentMessage"].currentValue.hasOwnProperty("replyCount")) {
        this.replyCount = this.parentMessage.replyCount;
      } else {
        this.replyCount = 0;
      }
    }
  }

  ngOnInit() {
    //console.log("Message Thread --> parent message ", this.parentMessage);
    if (this.parentMessage.hasOwnProperty("replyCount")) {
      this.replyCount = this.parentMessage.replyCount;
    }

    let user = CometChat.getLoggedinUser().then((user) => {
      this.loggedInUser = user;
    });
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let messages = action.payLoad;

    console.log("MessageThread --> action generation is ", action);

    switch (action.type) {
      case "newConversationOpened": {
        this.setMessages(messages);
        this.replyCount = messages.length;
        break;
      }
      case "messageComposed": {
        this.appendMessage(messages);
        this.replyCount = this.replyCount + messages.length;

        console.log("Message Thread --> new message added ", messages);

        this.actionGenerated.emit({
          type: "changeThreadParentMessageReplyCount",
          payLoad: this.replyCount,
        });
        break;
      }
      case "messageUpdated": {
        this.updateMessages(messages);
        break;
      }

      case "customMessageReceived":
      case "messageReceived": {
        const message = messages[0];
        if (message.parentMessageId === this.parentMessage.id) {
          // const replyCount = this.state.replyCount + 1;
          // this.setState({ replyCount: replyCount });
          this.smartReplyPreview(messages);
          this.replyCount = this.replyCount + messages.length;
          this.appendMessage(messages);
          this.actionGenerated.emit({
            type: "changeThreadParentMessageReplyCount",
            payLoad: this.replyCount,
          });
        }
        break;
      }
      case "olderMessagesFetched": {
        this.reachedTopOfConversation = false;

        //No Need for below actions if there is nothing to prepend
        if (messages.length == 0) break;

        let prevScrollHeight = this.chatWindow.nativeElement.scrollHeight;

        this.prependMessages(messages);

        setTimeout(() => {
          this.scrollVariable =
            this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
        }, 1);

        break;
      }
      case "editMessage": {
        this.editMessage(messages);
        break;
      }
      case "messageEdited": {
        this.messageEdited(messages);
        break;
      }
      case "deleteMessage": {
        this.deleteMessage(messages);
        break;
      }
      case "messageDeleted":
        this.removeMessages(messages);
        break;
    }
  }

  /**
   * Action is Generated to inform UserListScreen to close the thread window
   * @param
   */
  closeThread() {
    console.log("close thread clicked");
    this.actionGenerated.emit({ type: "closeThreadClicked", payLoad: null });
  }

  /**
   * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
   * @param Any messages
   */
  setMessages(messages) {
    this.messageList = [...messages];

    this.scrollToBottomOfChatWindow();
  }

  /**
   * append Messages that are sent
   * @param Any messages
   */
  appendMessage = (messages) => {
    let dummy = [...this.messageList];

    this.messageList = [...dummy, ...messages];

    this.scrollToBottomOfChatWindow();
  };

  /**
   * prepend Fetched Messages
   * @param Any messages
   */
  prependMessages(messages) {
    this.messageList = [...messages, ...this.messageList];
  }

  /**
   * update status of message ie. read or deliv
   * @param Any messages
   */
  updateMessages = (messages) => {
    // let dummy = [...this.messageList];

    this.messageList = [...messages];
    //this.scrollToBottomOfChatWindow();
  };

  /**
   * Sets The message to be edited to pass it to the message composer
   * @param Any messages
   */
  editMessage(messages) {
    this.messageToBeEdited = messages;
  }

  /**
   * Render The Message List after Message has been successfullly edited
   * @param Any message
   */
  messageEdited(message) {
    const messageList = [...this.messageList];
    let messageKey = messageList.findIndex((m) => m.id === message.id);
    if (messageKey > -1) {
      const messageObj = messageList[messageKey];

      const newMessageObj = Object.assign({}, messageObj, message);

      messageList.splice(messageKey, 1, newMessageObj);
      this.updateMessages(messageList);

      if (messageList.length - messageKey === 1 && !message.replyCount) {
        this.actionGenerated.emit({
          type: "messageEdited",
          payLoad: [newMessageObj],
        });
      }
    }
  }

  /**
   * Delete the message
   * @param Any message
   */
  deleteMessage = (message) => {
    const messageId = message.id;
    CometChat.deleteMessage(messageId)
      .then((deletedMessage) => {
        this.removeMessages([deletedMessage]);

        console.log(" MessageList screen --> Message Deleted successfully");

        const messageList = [...this.messageList];
        let messageKey = messageList.findIndex((m) => m.id === message.id);

        if (messageList.length - messageKey === 1 && !message.replyCount) {
          this.actionGenerated.emit({
            type: "messageDeleted",
            payLoad: [deletedMessage],
          });
        }
      })
      .catch((error) => {
        console.log("Message delete failed with error:", error);
      });
  };

  /**
   * If the message gets deleted successfull , remove the deleted message in frontend using this function
   * @param Any messages
   */
  removeMessages = (messages) => {
    const deletedMessage = messages[0];
    const messagelist = [...this.messageList];

    let messageKey = messagelist.findIndex(
      (message) => message.id === deletedMessage.id
    );
    if (messageKey > -1) {
      let messageObj = { ...messagelist[messageKey] };
      let newMessageObj = Object.assign({}, messageObj, deletedMessage);

      messagelist.splice(messageKey, 1, newMessageObj);
      // this.setState({ messageList: messagelist, scrollToBottom: false });
      this.messageList = [...messagelist];
    }
  };

  smartReplyPreview(messages) {
    const message = messages[0];

    if (message.hasOwnProperty("metadata")) {
      const metadata = message.metadata;
      if (metadata.hasOwnProperty("@injected")) {
        const injectedObject = metadata["@injected"];
        if (injectedObject.hasOwnProperty("extensions")) {
          const extensionsObject = injectedObject["extensions"];
          if (extensionsObject.hasOwnProperty("smart-reply")) {
            const smartReply = extensionsObject["smart-reply"];
            if (smartReply.hasOwnProperty("error") === false) {
              this.replyPreview = message;
            } else {
              this, (this.replyPreview = null);
            }
          }
        }
      }
    }
  }

  handleScroll(e) {
    console.log(
      `Message Thread --> e.currentTarget.clientHeight `,
      e.currentTarget.clientHeight
    );

    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);

    const top = e.currentTarget.scrollTop === 0;

    if (top) {
      this.reachedTopOfConversation = top;
    }
  }

  scrollToBottomOfChatWindow() {
    setTimeout(() => {
      this.scrollVariable =
        this.chatWindow.nativeElement.scrollHeight -
        this.chatWindow.nativeElement.clientHeight;
    }, 1);
  }
}
