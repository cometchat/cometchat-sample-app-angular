import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "tool-tip",
  templateUrl: "./tool-tip.component.html",
  styleUrls: ["./tool-tip.component.css"],
})
export class ToolTipComponent implements OnInit {
  @Input() MessageDetails = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  showToolTip: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.hasOwnProperty("parentMessageId")) {
      this.showToolTip = false;
    }
  }

  /**
   * Generates an action to reply to the current message
   *
   */
  replyToMessage() {
    console.log("reply to ", this.MessageDetails);
    this.actionGenerated.emit({
      type: "viewMessageThread",
      payLoad: this.MessageDetails,
    });
  }

  /**
   * Generates an action to edit  the current message
   *
   */
  editMessage() {
    console.log("edit message ", this.MessageDetails);
    this.actionGenerated.emit({
      type: "editMessage",
      payLoad: this.MessageDetails,
    });
  }

  /**
   * Generates an action to Delete  the current message
   *
   */
  deleteMessage() {
    console.log("Delete ", this.MessageDetails);
    this.actionGenerated.emit({
      type: "deleteMessage",
      payLoad: this.MessageDetails,
    });
  }
}
