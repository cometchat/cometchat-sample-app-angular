import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "comet-chat-sender-message-bubble",
  templateUrl: "./comet-chat-sender-message-bubble.component.html",
  styleUrls: ["./comet-chat-sender-message-bubble.component.css"],
})
export class CometChatSenderMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  constructor() {}

  ngOnInit() {}

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("receiver Message Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
