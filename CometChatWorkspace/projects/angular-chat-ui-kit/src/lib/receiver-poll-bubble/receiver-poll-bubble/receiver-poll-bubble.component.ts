import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "receiver-poll-bubble",
  templateUrl: "./receiver-poll-bubble.component.html",
  styleUrls: ["./receiver-poll-bubble.component.css"],
})
export class ReceiverPollBubbleComponent implements OnInit {
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
    console.log("receiver Poll Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
