import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cometchat-deleted-message-bubble",
  templateUrl: "./cometchat-deleted-message-bubble.component.html",
  styleUrls: ["./cometchat-deleted-message-bubble.component.css"],
})
export class CometchatDeletedMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;

  @Input() loggedInUser = null;

  loggedInUserDeletedThisMessage: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.deletedBy === this.loggedInUser.uid) {
      this.loggedInUserDeletedThisMessage = true;
    }
  }

  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return timeStamp;
  }
}
