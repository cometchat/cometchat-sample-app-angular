import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "conversation-view",
  templateUrl: "./conversation-view.component.html",
  styleUrls: ["./conversation-view.component.css"],
})
export class ConversationViewComponent implements OnInit, OnChanges {
  @Input() ConversationDetails = null;
  @Input() loggedInUser = null;
  setAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  lastMessageName: string;

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("Conversation View ngOnChanges ->> ", change);
    if (change["ConversationDetails"]) {
      if (
        change["ConversationDetails"].currentValue !==
        change["ConversationDetails"].previousValue
      ) {
        this.getLastMessage(change["ConversationDetails"].currentValue);
        this.getLastMessageTimestamp(
          change["ConversationDetails"].currentValue
        );
        this.getName(change["ConversationDetails"].currentValue);
      }
    }
  }
  ngOnInit() {
    // console.log("ConversationView -> ngOnInit  ", this.ConversationDetails);
    this.getLastMessage(this.ConversationDetails);
    this.getLastMessageTimestamp(this.ConversationDetails);
    this.getName(this.ConversationDetails);
  }

  /**
   * Sets Avatar According to user type ie. user or group
   * @param
   */
  getAvatar(data) {
    if (data.conversationType === "user") {
      this.setAvatar = data.conversationWith.avatar;
    } else if (data.conversationType === "group") {
      this.setAvatar = data.conversationWith.icon;
    }
    return this.setAvatar;
  }

  /**
   * Gets Name of Last Conversation User
   * @param
   */
  getName(data) {
    this.lastMessageName = data.conversationWith.name;
    return this.lastMessageName;
  }

  /**
   * Gets the Last Conversation with user
   * @param
   */
  getLastMessage(data) {
    if (data === null) {
      return false;
    }
    if (data.hasOwnProperty("lastMessage") === false) {
      return false;
    }
    let message = null;
    const lastMessage = data.lastMessage;

    if (lastMessage.hasOwnProperty("deletedAt")) {
      message =
        this.loggedInUser.uid === lastMessage.sender.uid
          ? "⚠ You deleted this message."
          : "⚠ This message was deleted.";
    } else {
      switch (lastMessage.category) {
        case "message":
          message = this.getMessage(lastMessage);
          break;
        case "call":
          message = this.getCallMessage(lastMessage);
          break;
        case "action":
          message = lastMessage.message;
          break;
        case "custom":
          message = this.getCustomMessage(lastMessage);
          break;
        default:
          break;
      }
    }
    this.lastMessage = message;
    return this.lastMessage;
  }

  /**
   * Gets Time when the last conversation was done
   * @param
   */
  getLastMessageTimestamp(data) {
    if (data === null) {
      return false;
    }

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
    this.lastMessageTimestamp = timestamp;
    return this.lastMessageTimestamp;
  }

  /**
   * Gets the MessageType i.e if text then display text else displays image,video,etc
   * @param
   */
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

  /**
   * Displays if lastMessage was Video or Audio Call
   * @param
   */
  getCallMessage(lastMessage) {
    let message = null;
    switch (lastMessage.type) {
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "Video call";
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "Audio call";
        break;
      default:
        break;
    }

    return message;
  }

  /**
   * Displays lastMessage was Custom Message i.e Poll or Sticker
   * @param
   */
  getCustomMessage = (lastMessage) => {
    let message = null;
    switch (lastMessage.type) {
      case enums.CUSTOM_TYPE_POLL:
        message = "Poll";
        break;
      case enums.CUSTOM_TYPE_STICKER:
        message = "Sticker";
        break;
      default:
        break;
    }

    return message;
  };
}
