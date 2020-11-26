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

  constructor() {}

  ngOnInit() {
    //console.log("MessageListScreen -> Type of User ", this.type);
  }

  /**
   * Edit and Sent a Text message
   * @param Event e
   */
  actionHandler(action) {
    //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
    console.log("MessageListScreen --> action generation is ", action);

    switch (action.type) {
      case "messageFetched":
        this.prependMessages(action.payLoad);
        break;
      case "messageComposed": {
        this.appendMessage(action.payLoad);
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: action.payLoad,
        });
        break;
      }
    }
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
    this.messageList = [...this.messageList, ...messages];

    console.log("appending the sent message ", this.messageList);
  };
}
