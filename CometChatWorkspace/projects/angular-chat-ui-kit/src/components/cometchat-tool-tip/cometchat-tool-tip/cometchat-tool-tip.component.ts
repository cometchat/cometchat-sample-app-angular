import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "cometchat-tool-tip",
  templateUrl: "./cometchat-tool-tip.component.html",
  styleUrls: ["./cometchat-tool-tip.component.css"],
})
export class CometchatToolTipComponent implements OnInit {
  @Input() MessageDetails = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip: boolean = true;

  @Input() pollView: boolean = false;

  loggedInUser;

  showOnlyReplyButton: boolean = false;
  receivedMessage: boolean = false;
  showReplyOption: boolean = true;
  threadView: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.hasOwnProperty("parentMessageId")) {
      //you cannot reply any message inside thread window
      this.showReplyOption = false;
      this.threadView = true;
    }

    let user = CometChat.getLoggedinUser().then((user) => {
      this.loggedInUser = user;

      //for the message that is received , only show the reply button in tooltip
      if (this.MessageDetails.sender.uid !== this.loggedInUser.uid) {
        this.showOnlyReplyButton = true;
        this.receivedMessage = true;
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
      type: enums.VIEW_MESSAGE_THREAD,
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
