import { Component, OnInit } from "@angular/core";
import { CometChatManager } from "../../utils/controller";
import * as enums from "../../utils/enums";

@Component({
  selector: "comet-chat-unified",
  templateUrl: "./comet-chat-unified.component.html",
  styleUrls: ["./comet-chat-unified.component.css"],
})
export class CometChatUnifiedComponent implements OnInit {
  item = null;
  curentItem;
  type;
  viewDetailScreen: boolean = false;
  threadMessageView: boolean = false;
  threadMessageItem = null;
  threadMessageType = "";
  threadMessageParent = null;
  lastMessage;
  loggedInUser;

  fullScreenViewImage: boolean = false;
  // To display image in full screen
  imageView = null;

  constructor() {}

  ngOnInit() {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;
      })
      .catch((error) => {
        console.log("[CometChatUnified] getLoggedInUser error", error);
      });
  }

  actionHandler(action = null, item = null, count = null) {
    let message = action.payLoad;
    switch (action.type) {
      case enums.BLOCK_USER:
        this.blockUser();
        break;
      case enums.UNBLOCK_USER:
        this.unblockUser();
        break;
      case enums.VIEW_DETAIL:
      case enums.CLOSE_DETAIL_CLICKED:
        this.toggleDetailView();
        break;
      case enums.VIEW_MESSAGE_THREAD:
        this.viewMessageThread(message);
        break;
      case enums.CLOSE_THREAD_CLICKED:
        this.closeThreadMessages();
        break;
      case enums.VIEW_ACTUAL_IMAGE:
        this.toggleImageView(message);
        break;
      case enums.CLOSE_FULL_SCREEN_IMAGE: {
        this.toggleImageView(null);
      }
      case enums.MESSAGE_COMPOSED:
      case enums.MESSAGE_EDIT:
      case enums.MESSAGE_DELETE:
        this.updateLastMessage(message);
        break;
      default:
        break;
    }
  }

  updateLastMessage(message) {
    console.log("last message upated ", message);

    this.lastMessage = message;
  }

  /**
   * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
   * @param Any parentMessage
   */
  viewMessageThread(parentMessage) {
    //Open Thread Screen
    this.threadMessageView = true;
    // console.log("parent ", parentMessage);

    //close user ( the person you are chatting with ) Detail screen
    this.viewDetailScreen = false;

    this.threadMessageParent = parentMessage;
    this.threadMessageItem = this.item;
    this.threadMessageType = this.type;
  }
  /*
   * Close the thread window
   * @param Any parentMessage
   */
  closeThreadMessages() {
    //close Thread Screen
    this.threadMessageView = false;
    this.threadMessageParent = null;
    this.threadMessageItem = null;
    this.threadMessageType = null;
  }
  /**
   * Opens User Detail Right Side bar
   * @param Any message
   */
  toggleDetailView = () => {
    this.threadMessageView = false;
    this.viewDetailScreen = !this.viewDetailScreen;
  };
  /**
   * Opens the clicked Image in full screen mode
   * @param Any message
   */
  toggleImageView(message) {
    // console.log("Conversationscreen toggleImageView ", message);
    this.imageView = message;
    this.fullScreenViewImage = !this.fullScreenViewImage;
  }
  /**
   * When User Block someone
   */
  blockUser() {
    let usersList = [this.item.uid];
    CometChatManager.blockUsers(usersList)
      .then((list) => {
        this.item = { ...this.item, blockedByMe: true };
        this.curentItem = this.item;
        console.log("block success");
      })
      .catch((error) => {
        console.log("Blocking user fails with error", error);
      });
  }

  /**
   * When User UnBlock someone
   */
  unblockUser() {
    let usersList = [this.item.uid];
    CometChatManager.unblockUsers(usersList)
      .then((list) => {
        this.item = { ...this.item, blockedByMe: false };
        this.curentItem = this.item;

        console.log("unblock success");
      })
      .catch((error) => {
        console.log("unblocking user fails with error", error);
      });
  }

  userClicked(user) {
    console.log("unified event", user);
    this.item = user;
    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
  }
}
