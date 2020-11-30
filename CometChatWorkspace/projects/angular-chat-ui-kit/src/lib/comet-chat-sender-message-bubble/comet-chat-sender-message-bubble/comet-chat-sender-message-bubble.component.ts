import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "comet-chat-sender-message-bubble",
  templateUrl: "./comet-chat-sender-message-bubble.component.html",
  styleUrls: ["./comet-chat-sender-message-bubble.component.css"],
})
export class CometChatSenderMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;

  constructor() {}

  ngOnInit() {}
}
