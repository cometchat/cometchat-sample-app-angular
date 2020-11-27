import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "lib-cometchat-message-list-screen",
  templateUrl: "./cometchat-message-list-screen.component.html",
  styleUrls: ["./cometchat-message-list-screen.component.css"],
})
export class CometchatMessageListScreenComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageList = [];
  scrollToBottom: true;
  messageToBeEdited: null;
  replyPreview: null;
  liveReaction: false;
  changeNumber = 0;

  constructor() {}

  ngOnInit() {
    //console.log("MessageListScreen -> Type of User ", this.type);
  }

  /**
   * Edit and Sent a Text message
   * @param Event action
   */
  actionHandler(action) {
    //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here

    // action.payLoad has the array of messages that is received
    let messages = action.payLoad;

    console.log("MessageListScreen --> action generation is ", action);

    switch (action.type) {
      case "customMessageReceived":
      case "messageReceived":
        {
          const message = messages[0];
          if (message.parentMessageId) {
            // Implement while doing the threaded message feature
            // this.updateReplyCount(messages);
          } else {
            // Smart Reply Feature
            // this.smartReplyPreview(messages);
            console.log(
              "received a message from the user , u r chatting with , going to append it"
            );
            this.appendMessage(messages);
          }

          //play message received audio
          //this.playAudio();
        }
        break;
      case "messageFetched":
        this.prependMessages(messages);
        break;
      case "messageComposed": {
        this.appendMessage(messages);
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: messages,
        });
        break;
      }
      case "newConversationOpened": {
        this.setMessages(messages);
      }
    }
  }

  /**
   * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
   * @param Any messages
   */
  setMessages(messages) {
    this.messageList = [...messages];
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

    if (this.messageList !== dummy) {
      console.log("the reference of message list array also changed");
    } else {
      console.log("the reference of message list array also NOT changed");
    }

    this.changeNumber++;

    console.log("appending the sent message ", this.messageList);
  };
}
