import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "comet-chat-receiver-message-bubble",
  templateUrl: "./comet-chat-receiver-message-bubble.component.html",
  styleUrls: ["./comet-chat-receiver-message-bubble.component.css"],
})
export class CometChatReceiverMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

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

  toggleToolTip() {
    //console.log("toggle tool tip");
    //this.showToolTip = !this.showToolTip;
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("receiver Message Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
