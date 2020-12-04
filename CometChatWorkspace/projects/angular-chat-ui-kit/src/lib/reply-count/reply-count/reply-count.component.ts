import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

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

  getReplyCount() {
    if (this.MessageDetails.hasOwnProperty("replyCount") === false) {
      this.replies = null;
    }
    if (
      this.MessageDetails.hasOwnProperty("widgetconfig") &&
      this.MessageDetails.widgetconfig &&
      this.MessageDetails.hasOwnProperty("threaded-chats") &&
      this.MessageDetails["threaded-chats"] === false
    ) {
      this.replies = null;
    }
    if (
      this.MessageDetails.hasOwnProperty("widgetsettings") &&
      this.MessageDetails.widgetsettings &&
      this.MessageDetails.hasOwnProperty("main") &&
      this.MessageDetails.main.hasOwnProperty("enable_threaded_replies") &&
      this.MessageDetails.main["enable_threaded_replies"] === false
    ) {
      this.replies = null;
    }
    this.replies = this.MessageDetails.replyCount;
    return this.replies;
  }

  openThreadMessage() {
    this.actionGenerated.emit({
      type: "viewMessageThread",
      payLoad: this.MessageDetails,
    });
  }
}
