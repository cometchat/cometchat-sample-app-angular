import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-comet-chat-receiver-message-bubble",
  templateUrl: "./comet-chat-receiver-message-bubble.component.html",
  styleUrls: ["./comet-chat-receiver-message-bubble.component.css"],
})
export class CometChatReceiverMessageBubbleComponent implements OnInit {
  @Input() MessageText = "Dummy";

  constructor() {}

  ngOnInit() {}
}
