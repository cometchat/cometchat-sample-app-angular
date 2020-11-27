import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-comet-chat-receiver-message-bubble",
  templateUrl: "./comet-chat-receiver-message-bubble.component.html",
  styleUrls: ["./comet-chat-receiver-message-bubble.component.css"],
})
export class CometChatReceiverMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;

  constructor() {}

  ngOnInit() {}

  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeStamp;
  }
}
