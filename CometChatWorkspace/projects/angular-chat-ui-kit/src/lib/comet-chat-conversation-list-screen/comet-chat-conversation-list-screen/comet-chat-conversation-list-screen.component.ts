import { Component, OnInit } from "@angular/core";
import { CometChatManager } from "../../utils/controller";
@Component({
  selector: "comet-chat-conversation-list-screen",
  templateUrl: "./comet-chat-conversation-list-screen.component.html",
  styleUrls: ["./comet-chat-conversation-list-screen.component.css"],
})
export class CometChatConversationListScreenComponent implements OnInit {
  item = null;
  type = "";
  loggedInUser;
  sidebarview: boolean = false;
  viewDetailScreen: boolean = false;
  threadMessageView: boolean = false;
  threadMessageItem = null;
  threadMessageType = "";
  threadMessageParent = null;

  fullScreenViewImage: boolean = false;
  // To display image in full screen
  imageView = null;

  constructor() {}

  ngOnInit() {
    // console.log("item is ", this.item);
    // console.log("type is ", this.type);

    if (!Object.keys(this.item).length) {
      this.toggleSideBar();
    }
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;
      })
      .catch((error) => {
        console.log("[CometChatUnified] getLoggedInUser error", error);
      });
  }

  actionHandler(action = null, item = null, count = null, ...other) {
    let message = action.payLoad;

    switch (action.type) {
      //   case "blockUser":
      //     this.blockUser();
      //   break;
      //   case "unblockUser":
      //     this.unblockUser();
      //   break;
      //   case "audioCall":
      //     this.audioCall();
      //   break;
      //   case "videoCall":
      //     this.videoCall();
      //   break;
      case "viewDetail":
      case "closeDetailClicked":
        this.toggleDetailView();
        break;

      //   // eslint-disable-next-line no-lone-blocks
      //   case "menuClicked":{
      //     this.toggleSideBar();
      //     this.setState({ item: {} });
      //   }
      //     break;
      //   case "closeMenuClicked":
      //     this.toggleSideBar();
      //   break;
      //   case "groupUpdated":
      //     this.groupUpdated(item, count, ...otherProps);
      //   break;
      //   case "groupDeleted":
      //     this.deleteGroup(item);
      //   break;
      //   case "leftGroup":
      //     this.leaveGroup(item, ...otherProps);
      //   break;
      //   case "membersUpdated":
      //     this.updateMembersCount(item, count);
      //   break;
      case "viewMessageThread":
        this.viewMessageThread(message);
        break;
      case "closeThreadClicked":
        this.closeThreadMessages();
        break;
      //   case "threadMessageComposed":
      //     this.onThreadMessageComposed(item);
      //     this.updateLastMessage(item[0]);
      //   break;
      //   case "acceptIncomingCall":
      //     this.acceptIncomingCall(item);
      //     break;
      //   case "acceptedIncomingCall":
      //     this.callInitiated(item);
      //     break;
      //   case "rejectedIncomingCall":
      //     this.rejectedIncomingCall(item, count);
      //     break;
      //   case "outgoingCallRejected":
      //   case "outgoingCallCancelled":
      //   case "callEnded":
      //     this.outgoingCallEnded(item);
      //     break;
      //   case "userJoinedCall":
      //   case "userLeftCall":
      //     this.appendCallMessage(item);
      //     break;
      case "viewActualImage":
        this.toggleImageView(message);
        break;
      case "closeFullScreenImage": {
        this.toggleImageView(null);
      }
      //   case "membersAdded":
      //     this.membersAdded(item);
      //     break;
      //   case "memberUnbanned":
      //     this.memberUnbanned(item);
      //     break;
      //   case "memberScopeChanged":
      //     this.memberScopeChanged(item);
      //     break;
      //   case "messageComposed":
      //   case "messageEdited":
      //   case "messageDeleted":
      //     this.updateLastMessage(item[0]);
      //     break;
      default:
        break;
    }
  }

  toggleSideBar() {
    const sidebarview = this.sidebarview;
    this.sidebarview = !sidebarview;
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
   * Opens the clicked Image in full screen mode
   * @param Any message
   */
  toggleImageView(message) {
    // console.log("Conversationscreen toggleImageView ", message);
    this.imageView = message;
    this.fullScreenViewImage = !this.fullScreenViewImage;
  }

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(event) {
    // console.log("event is  ", event);
    this.closeThreadMessages();
    this.viewDetailScreen = false;
    this.item = event.conversationWith;
    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
  }
}
