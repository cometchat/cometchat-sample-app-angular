import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cometchat-sender-file-bubble",
  templateUrl: "./cometchat-sender-file-bubble.component.html",
  styleUrls: ["./cometchat-sender-file-bubble.component.css"],
})
export class CometchatSenderFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Input() showReplyCount = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  url: string;
  name: string;
  constructor() {}

  ngOnInit() {
    this.url = this.MessageDetails.data.attachments[0].url;
    this.name = this.MessageDetails.data.attachments[0].name;
  }
  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    this.actionGenerated.emit(action);
  }
}
