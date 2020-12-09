import { Component, Input, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "conversation-view",
  templateUrl: "./conversation-view.component.html",
  styleUrls: ["./conversation-view.component.css"],
})
export class ConversationViewComponent implements OnInit {
  @Input() ConversationListDetails = null;
  constructor() {}

  ngOnInit() {
    console.log("ConversationView -> ngOnInit  ", this.ConversationListDetails);

    // const timestamp = this.getLastMessageTimestamp();
    // this.lastMessageTimestamp = timestamp;
  }

  getLastMessage(data) {
    if (data === null) {
      return false;
    }
    //console.log(data.hasOwnProperty("lastMessage"));

    if (data.hasOwnProperty("lastMessage") === false) {
      return false;
    }
    let message = null;
    const lastMessage = data.lastMessage;
    if (lastMessage.hasOwnProperty("deletedAt")) {
      message =
        this.ConversationListDetails.loggedInUser.uid === lastMessage.sender.uid
          ? "⚠ You deleted this message."
          : "⚠ This message was deleted.";
    } else {
      switch (lastMessage.category) {
        case "message":
          message = this.getMessage(lastMessage);
          break;
        // case "call":
        //   message = this.getCallMessage(lastMessage);
        //   break;
        // case "action":
        //   message = lastMessage.message;
        //   break;
        // case "custom":
        //   message = this.getCustomMessage(lastMessage);
        //   break;
        default:
          break;
      }
    }
    return message;
  }

  getLastMessageTimestamp(data) {
    // let dummy;
    // return dummy;
    if (data === null) {
      return false;
    }
    //console.log(data.hasOwnProperty("lastMessage"));

    if (data.hasOwnProperty("lastMessage") === false) {
      return false;
    }
    if (data.lastMessage.hasOwnProperty("sentAt") === false) {
      return false;
    }
    let timestamp = null;

    const messageTimestamp: any = new Date(data.lastMessage.sentAt * 1000);
    const currentTimestamp = Date.now();
    const diffTimestamp = currentTimestamp - messageTimestamp;
    if (diffTimestamp < 24 * 60 * 60 * 1000) {
      timestamp = messageTimestamp.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else if (diffTimestamp < 48 * 60 * 60 * 1000) {
      timestamp = "Yesterday";
    } else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
      timestamp = messageTimestamp.toLocaleString("en-US", { weekday: "long" });
    } else {
      timestamp = messageTimestamp.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    }

    return timestamp;
  }
  getMessage(lastMessage) {
    let message = null;
    switch (lastMessage.type) {
      case CometChat.MESSAGE_TYPE.TEXT:
        message = lastMessage.text;
        break;
      case CometChat.MESSAGE_TYPE.MEDIA:
        message = "Media message";
        break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        message = "📷 Image ";
        break;
      case CometChat.MESSAGE_TYPE.FILE:
        message = "📁 File";
        break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "🎥 Video";
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "🎵 Audio";
        break;
      case CometChat.MESSAGE_TYPE.CUSTOM:
        message = "Custom message";
        break;
      default:
        break;
    }

    return message;
  }
}
