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
import { INCOMING_MESSAGE_SOUND } from "../../resources/audio/incomingMessageSound";
import * as enums from "../../utils/enums";
@Component({
  selector: "cometchat-message-list-screen",
  templateUrl: "./cometchat-message-list-screen.component.html",
  styleUrls: ["./cometchat-message-list-screen.component.css"],
})
export class CometchatMessageListScreenComponent implements OnInit, OnChanges {
  @ViewChild("messageWindow", null) chatWindow: ElementRef;

  @Input() item = null;
  @Input() type = null;
  @Input() composedthreadmessage = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageList = [];
  scrollToBottom: true;
  messageToBeEdited = null;
  replyPreview = null;
  liveReaction = false;
  changeNumber = 0;
  reachedTopOfConversation = false;
  scrollVariable = 0;

  reactionName = "heart";

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("Message List --> ngOnChanges -->  ", change);

    if (change["composedthreadmessage"]) {
      // console.log(
      //   "Message List Screen --> a thread Parent was updated ",
      //   change["composedthreadmessage"]
      // );

      // There is a valid Thread parent message , than update it's reply count
      if (change["composedthreadmessage"].currentValue) {
        //this.updateReplyCount(change["composedthreadmessage"].currentValue);
        this.messageEdited(change["composedthreadmessage"].currentValue);
      }
    }
  }

  ngOnInit() {
    //console.log("MessageListScreen -> Type of User ", this.type);
    //console.log("MessageListScreen -> ChatWindow ", this.chatWindow);
  }

  /**
   * Updating the reply count of Thread Parent Message
   * @param Any message
   */
  updateReplyCount(messages) {
    const receivedMessage = messages[0];

    let messageList = [...this.messageList];
    let messageKey = messageList.findIndex(
      (m) => m.id === receivedMessage.parentMessageId
    );
    if (messageKey > -1) {
      const messageObj = messageList[messageKey];
      let replyCount = messageObj.replyCount ? messageObj.replyCount : 0;
      replyCount = replyCount + 1;
      const newMessageObj = Object.assign({}, messageObj, {
        replyCount: replyCount,
      });

      messageList.splice(messageKey, 1, newMessageObj);
      this.messageList = [...messageList];
    }
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here

    // action.payLoad has the array of messages that is received
    let messages = action.payLoad;

    // console.log("MessageListScreen --> action generation is ", action);

    switch (action.type) {
      case enums.CUSTOM_MESSAGE_RECEIVE:
      case enums.MESSAGE_RECEIVED: {
        const message = messages[0];
        if (message.parentMessageId) {
          // Implement while doing the threaded message feature
          this.updateReplyCount(messages);
        } else {
          // Smart Reply Feature
          this.smartReplyPreview(messages);

          setTimeout(() => {
            // console.log("scroll to bottom after getting smart reply");

            this.scrollToBottomOfChatWindow();
          }, 2500);

          console.log(
            " MessageListScreen -->  received a message from the user , u r chatting with , going to append it"
          );
          this.appendMessage(messages);
        }

        //play message received audio
        this.playAudio();

        break;
      }

      case enums.MESSAGE_FETCHED: {
        this.prependMessages(messages);
        break;
      }
      case enums.OLDER_MESSAGES_FETCHED: {
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
      case enums.MESSAGE_COMPOSED: {
        this.appendMessage(messages);
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: messages,
        });
        break;
      }
      case enums.MESSAGE_UPDATED: {
        this.updateMessages(messages);
        break;
      }
      case enums.VIEW_ACTUAL_IMAGE: {
        this.actionGenerated.emit({
          type: "viewActualImage",
          payLoad: messages,
        });
        break;
      }
      case enums.NEW_CONVERSATION_OPENED: {
        this.resetPage();
        this.setMessages(messages);

        break;
      }
      case enums.VIEW_MESSAGE_THREAD: {
        this.actionGenerated.emit({
          type: "viewMessageThread",
          payLoad: messages,
        });
        break;
      }
      case enums.DELETE_MESSAGE: {
        this.deleteMessage(messages);
        break;
      }
      case enums.EDIT_MESSAGE: {
        this.editMessage(messages);
        break;
      }
      case enums.MESSAGE_EDIT: {
        this.messageEdited(messages);
        break;
      }
      case enums.AUDIO_CALL:
      case enums.VIDEO_CALL:
      case enums.VIEW_DETAIL:
      case enums.MENU_CLICKED: {
        this.actionGenerated.emit(action);
        break;
      }
      case enums.SEND_REACTION: {
        this.toggleReaction(true);
        break;
      }
      case enums.SHOW_REACTION: {
        this.showReaction(messages);
        break;
      }
      case enums.STOP_REACTION: {
        this.toggleReaction(false);
        break;
      }
      case enums.CLEAR_MESSAGE_TO_BE_UPDATED: {
        this.messageToBeEdited = null;
        break;
      }
      case enums.MESSAGE_UPDATED: {
        this.updateMessages(messages);
        break;
      }

      case enums.MESSAGE_DELETE: {
        this.removeMessages(messages);
        break;
      }
      case enums.POLL_CREATED: {
        this.appendPollMessage(messages);
        break;
      }
      case enums.POLL_ANSWERED: {
        console.log("Mesasge List screen -->Answer poll case ");
        this.updatePollMessage(messages);
        break;
      }
    }
  }

  /**
   * Resets The component to initial conditions
   * @param
   */
  resetPage() {
    this.messageToBeEdited = null;
    this.replyPreview = null;
  }

  /**
   * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
   * @param Any messages
   */
  setMessages(messages) {
    this.messageList = [...messages];

    // console.log("MessageListScreen->> ", this.messageList);

    this.scrollToBottomOfChatWindow();
  }

  /**
   * prepend Fetched Messages
   * @param Any messages
   */
  prependMessages(messages) {
    this.messageList = [...messages, ...this.messageList];
  }

  /**
   * append Messages that are sent
   * @param Any messages
   */
  appendMessage = (messages) => {
    let dummy = [...this.messageList];

    this.messageList = [...dummy, ...messages];

    this.scrollToBottomOfChatWindow();

    //console.log("appending the sent message ", this.messageList);
  };

  /**
   * append Poll Messages that are sent
   * @param Any messages
   */
  appendPollMessage(messages) {
    console.log("MessageListScreen->> Appending poll message ", messages);

    this.appendMessage(messages);
  }

  /**
   * updates Poll Messages depending on answer given by user
   * @param Any messages
   */
  updatePollMessage(message) {
    console.log("Mesasge List screen --> starting to update poll message ");

    const messageList = [...this.messageList];
    const messageId = message.poll.id;
    let messageKey = messageList.findIndex((m, k) => m.id === messageId);
    if (messageKey > -1) {
      const messageObj = messageList[messageKey];

      const metadataObj = {
        "@injected": { extensions: { polls: message.poll } },
      };

      const newMessageObj = { ...messageObj, metadata: metadataObj };

      // messageList.splice(messageKey, 1, newMessageObj);

      console.log(
        "Mesasge List screen --> updated poll message ",
        newMessageObj
      );

      this.messageEdited(newMessageObj);
    }
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
   * Delete the message
   * @param Any message
   */
  deleteMessage = (message) => {
    const messageId = message.id;
    CometChat.deleteMessage(messageId)
      .then((deletedMessage) => {
        this.removeMessages([deletedMessage]);

        // console.log(" MessageList screen --> Message Deleted successfully");

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
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);

    //console.log("Message List Screen --> reached bottom ", bottom);

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

  /**
   * Toggle Reaction -> true/false
   * @param
   */
  toggleReaction(flag) {
    this.liveReaction = flag;
  }

  /**
   * Shows Reaction on receiving end
   * @param
   */
  showReaction(reaction) {
    if (!reaction.hasOwnProperty("metadata")) {
      return false;
    }
    if (
      !reaction.metadata.hasOwnProperty("type") ||
      !reaction.metadata.hasOwnProperty("reaction")
    ) {
      return false;
    }
    if (!enums.LIVE_REACTIONS.hasOwnProperty(reaction.metadata.reaction)) {
      return false;
    }

    if (reaction.metadata.type === enums.LIVE_REACTION_KEY) {
      this.reactionName = reaction.metadata.reaction;
      this.liveReaction = true;
    }
  }

  /**
   * Plays Audio When Message is Sent
   */
  playAudio() {
    let audio = new Audio();
    audio.src = INCOMING_MESSAGE_SOUND;
    audio.play();
  }
}
