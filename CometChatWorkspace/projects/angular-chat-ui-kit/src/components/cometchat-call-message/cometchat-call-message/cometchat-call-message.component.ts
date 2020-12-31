import { Component, Input, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "cometchat-call-message",
  templateUrl: "./cometchat-call-message.component.html",
  styleUrls: ["./cometchat-call-message.component.css"],
})
export class CometchatCallMessageComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() loggedInUserUid;
  message;
  constructor() {}

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    const call = this.MessageDetails;
    switch (call.status) {
      case CometChat.CALL_STATUS.INITIATED: {
        this.message = "Call initiated";
        if (call.type === "audio") {
          if (call.receiverType === "user") {
            this.message =
              call.callInitiator.uid === this.loggedInUserUid
                ? "Outgoing audio call"
                : "Incoming audio call";
          } else if (call.receiverType === "group") {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              this.message =
                call.callInitiator.uid === this.loggedInUserUid
                  ? "Outgoing audio call"
                  : "Incoming audio call";
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              this.message =
                call.sender.uid === this.loggedInUserUid
                  ? "Call rejected"
                  : `${call.sender.name} rejected call`;
            }
          }
        } else if (call.type === "video") {
          if (call.receiverType === "user") {
            this.message =
              call.callInitiator.uid === this.loggedInUserUid
                ? "Outgoing video call"
                : "Incoming video call";
          } else if (call.receiverType === "group") {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              this.message =
                call.callInitiator.uid === this.loggedInUserUid
                  ? "Outgoing video call"
                  : "Incoming video call";
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              this.message =
                call.sender.uid === this.loggedInUserUid
                  ? "Call rejected"
                  : `${call.sender.name} rejected call`;
            }
          }
        }
        break;
      }
      case CometChat.CALL_STATUS.ONGOING: {
        if (call.receiverType === "user") {
          this.message = "Call accepted";
        } else if (call.receiverType === "group") {
          if (call.action === CometChat.CALL_STATUS.ONGOING) {
            this.message =
              call.sender.uid === this.loggedInUserUid
                ? "Call accepted"
                : `${call.sender.name} joined`;
          } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
            this.message =
              call.sender.uid === this.loggedInUserUid
                ? "Call rejected"
                : `${call.sender.name} rejected call`;
          } else if (call.action === "left") {
            this.message =
              call.sender.uid === this.loggedInUserUid
                ? "You left the call"
                : `${call.sender.name} left the call`;
          }
        }

        break;
      }
      case CometChat.CALL_STATUS.UNANSWERED: {
        this.message = "Call unanswered";
        if (
          call.type === "audio" &&
          (call.receiverType === "user" || call.receiverType === "group")
        ) {
          this.message =
            call.callInitiator.uid === this.loggedInUserUid
              ? "Unanswered audio call"
              : "Missed audio call";
        } else if (
          call.type === "video" &&
          (call.receiverType === "user" || call.receiverType === "group")
        ) {
          this.message =
            call.callInitiator.uid === this.loggedInUserUid
              ? "Unanswered video call"
              : "Missed video call";
        }
        break;
      }
      case CometChat.CALL_STATUS.REJECTED: {
        this.message = "Call rejected";
        break;
      }
      case CometChat.CALL_STATUS.ENDED:
        this.message = "Call ended";
        break;
      case CometChat.CALL_STATUS.CANCELLED:
        this.message = "Call cancelled";
        break;
      case CometChat.CALL_STATUS.BUSY:
        this.message = "Call busy";
        break;
      default:
        break;
    }
  }
}
