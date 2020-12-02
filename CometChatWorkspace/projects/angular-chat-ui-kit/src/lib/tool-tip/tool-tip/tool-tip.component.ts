import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "tool-tip",
  templateUrl: "./tool-tip.component.html",
  styleUrls: ["./tool-tip.component.css"],
})
export class ToolTipComponent implements OnInit {
  @Input() MessageDetails = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip: boolean = true;

  loggedInUser;

  showOnlyReplyButton: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.hasOwnProperty("parentMessageId")) {
      this.showToolTip = false;
    }

    let user = CometChat.getLoggedinUser().then((user) => {
      this.loggedInUser = user;

      //for the message that is received , only show the reply button in tooltip
      if (this.MessageDetails.sender.uid !== this.loggedInUser.uid) {
        this.showOnlyReplyButton = true;
      }
    });
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
