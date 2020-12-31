import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "deleted-message-bubble",
  templateUrl: "./deleted-message-bubble.component.html",
  styleUrls: ["./deleted-message-bubble.component.css"],
})
export class DeletedMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;

  @Input() loggedInUser = null;

  loggedInUserDeletedThisMessage: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.deletedBy === this.loggedInUser.uid) {
      // console.log(
      //   "Delete Message Bubble --> logged In user ",
      //   this.loggedInUser
      // );
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
    // console.log("time is ", timeStamp);
    return timeStamp;
  }
}
