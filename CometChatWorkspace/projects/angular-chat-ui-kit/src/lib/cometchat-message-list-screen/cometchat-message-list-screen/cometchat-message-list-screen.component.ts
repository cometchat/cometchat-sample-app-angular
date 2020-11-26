import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-cometchat-message-list-screen",
  templateUrl: "./cometchat-message-list-screen.component.html",
  styleUrls: ["./cometchat-message-list-screen.component.css"],
})
export class CometchatMessageListScreenComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;

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
    }
  }

  prependMessages(messages) {
    this.messageList = [...messages, ...this.messageList];
  }
}
