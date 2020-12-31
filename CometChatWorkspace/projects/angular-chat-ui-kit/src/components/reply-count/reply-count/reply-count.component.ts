import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import * as enums from "../../utils/enums";

@Component({
  selector: "reply-count",
  templateUrl: "./reply-count.component.html",
  styleUrls: ["./reply-count.component.css"],
})
export class ReplyCountComponent implements OnInit {
  @Input() MessageDetails = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  replies = null;
  reply: string;
  constructor() {}

  ngOnInit() {
    let replyCount = this.getReplyCount();
    if (replyCount === 1) {
      this.reply = replyCount + " reply";
    } else if (replyCount > 1) {
      this.reply = replyCount + " replies";
    }
  }
  /**
   * get reply count for thread
   */
  getReplyCount() {
    if (this.MessageDetails.hasOwnProperty("replyCount") === false) {
      this.replies = null;
    }

    this.replies = this.MessageDetails.replyCount;
    return this.replies;
  }
  /**
   * Open thread when clicked
   */
  openThreadMessage() {
    this.actionGenerated.emit({
      type: enums.VIEW_MESSAGE_THREAD,
      payLoad: this.MessageDetails,
    });
  }
}
