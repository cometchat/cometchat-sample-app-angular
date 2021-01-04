import { Component, Input, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../utils/messageConstants";

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
        this.message = STRING_MESSAGES.CALL_INITIATED;
        if (call.type === "audio") {
          if (call.receiverType === "user") {
            this.message =
              call.callInitiator.uid === this.loggedInUserUid
                ? STRING_MESSAGES.OUTGOING_AUDIO_CALL
                : STRING_MESSAGES.INCOMING_AUDIO_CALL;
          } else if (call.receiverType === "group") {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              this.message =
                call.callInitiator.uid === this.loggedInUserUid
                  ? STRING_MESSAGES.OUTGOING_AUDIO_CALL
                  : STRING_MESSAGES.INCOMING_AUDIO_CALL;
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
                ? STRING_MESSAGES.OUTGOING_VIDEO_CALL
                : STRING_MESSAGES.INCOMING_VIDEO_CALL;
          } else if (call.receiverType === "group") {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              this.message =
                call.callInitiator.uid === this.loggedInUserUid
                  ? STRING_MESSAGES.OUTGOING_VIDEO_CALL
                  : STRING_MESSAGES.INCOMING_VIDEO_CALL;
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
          this.message = STRING_MESSAGES.CALL_ACCEPTED;
        } else if (call.receiverType === "group") {
          if (call.action === CometChat.CALL_STATUS.ONGOING) {
            this.message =
              call.sender.uid === this.loggedInUserUid
                ? STRING_MESSAGES.CALL_ACCEPTED
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
              ? STRING_MESSAGES.UNANSWERED_AUDIO_CALL
              : "Missed audio call";
        } else if (
          call.type === "video" &&
          (call.receiverType === "user" || call.receiverType === "group")
        ) {
          this.message =
            call.callInitiator.uid === this.loggedInUserUid
              ? STRING_MESSAGES.UNANSWERED_VIDEO_CALL
              : "Missed video call";
        }
        break;
      }
      case CometChat.CALL_STATUS.REJECTED: {
        this.message = "Call rejected";
        break;
      }
      case CometChat.CALL_STATUS.ENDED:
        this.message = STRING_MESSAGES.CALL_ENDED;
        break;
      case CometChat.CALL_STATUS.CANCELLED:
        this.message = STRING_MESSAGES.CALL_CANCELLED;
        break;
      case CometChat.CALL_STATUS.BUSY:
        this.message = STRING_MESSAGES.CALL_BUSY;
        break;
      default:
        break;
    }
  }
}
