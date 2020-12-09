import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "sender-poll-bubble",
  templateUrl: "./sender-poll-bubble.component.html",
  styleUrls: ["./sender-poll-bubble.component.css"],
})
export class SenderPollBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  constructor() {}

  ngOnInit() {}

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("Sender Poll Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
