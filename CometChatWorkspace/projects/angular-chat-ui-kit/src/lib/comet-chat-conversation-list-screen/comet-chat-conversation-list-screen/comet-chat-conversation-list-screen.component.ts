import { Component, OnInit, HostListener } from "@angular/core";
import { CometChatManager } from "../../utils/controller";
import * as enums from "../../utils/enums";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "comet-chat-conversation-list-screen",
  templateUrl: "./comet-chat-conversation-list-screen.component.html",
  styleUrls: ["./comet-chat-conversation-list-screen.component.css"],
  animations: [
    trigger("FadeInFadeOut", [
      state(
        "normal",
        style({
          left: "0%",
        })
      ),
      state(
        "animated",
        style({
          left: "-100%",
          zIndex: "0",
        })
      ),
      transition("normal<=>animated", animate(300)),
    ]),
  ],
})
export class CometChatConversationListScreenComponent implements OnInit {
  curentItem;
  lastMessage;
  item = null;
  type = "";
  loggedInUser;
  sidebarview: boolean = false;
  viewDetailScreen: boolean = false;
  threadMessageView: boolean = false;
  threadMessageItem = null;
  threadMessageType = "";
  threadMessageParent = null;
  composedthreadmessage = null;

  fullScreenViewImage: boolean = false;
  // To display image in full screen
  imageView = null;
  groupToUpdate = {};
  groupToLeave = {};
  groupToDelete = {};
  groupMessage = [];

  checkAnimatedState;
  checkIfAnimated: boolean = false;
  innerWidth;

  constructor() {}

  ngOnInit() {
    //console.log("item is ", this.item);
    // console.log("type is ", this.type);

    // if (!Object.keys(this.item).length) {
    //   this.toggleSideBar();
    // }
    this.onResize();
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;
      })
      .catch((error) => {
        console.log("[CometChatUnified] getLoggedInUser error", error);
      });
  }
  /**
   * Checks when window size is changed in realtime
   */
  @HostListener("window:resize", [])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= "320" && this.innerWidth <= "767") {
      if (this.checkIfAnimated === true) {
        return false;
      }
      console.log("inner ", this.innerWidth);
      this.checkAnimatedState = "normal";
      console.log("state initail ", this.checkAnimatedState);
      this.checkIfAnimated = true;
    } else {
      this.checkAnimatedState = null;
      this.checkIfAnimated = false;
    }
  }

  actionHandler(action = null, item = null, count = null) {
    let message = action.payLoad;

    console.log("cls message ", message);

    let data = action.payLoad;

    switch (action.type) {
      case enums.BLOCK_USER:
        this.blockUser();
        break;
      case enums.UNBLOCK_USER:
        this.unblockUser();
        break;
      //   case "audioCall":
      //     this.audioCall();
      //   break;
      //   case "videoCall":
      //     this.videoCall();
      //   break;
      case enums.VIEW_DETAIL:
      case enums.CLOSE_DETAIL_CLICKED:
        this.toggleDetailView();
        break;

      //   // eslint-disable-next-line no-lone-blocks
      case enums.MENU_CLICKED: {
        console.log("before animation ", this.checkAnimatedState);
        this.checkAnimatedState = "normal";
        this.toggleSideBar();
        this.item = null;
        break;
      }
      case enums.CLOSE_MENU_CLICKED:
        this.toggleSideBar();
        break;
      case enums.VIEW_MESSAGE_THREAD:
        this.viewMessageThread(message);
        break;
      case enums.CLOSE_THREAD_CLICKED:
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
      case enums.CHANGE_THREAD_PARENT_MESSAGE_REPLY_COUNT: {
        // this.toggleDetailView();

        this.composedthreadmessage = {
          ...this.threadMessageParent,
          replyCount: action.payLoad,
        };

        break;
      }

      case enums.MEMBER_SCOPE_CHANGED: {
        this.memberScopeChanged(action.payLoad);
        break;
      }
      case enums.MEMBERS_ADDED: {
        this.membersAdded(data);
        break;
      }
      case enums.MEMBERS_UPDATED: {
        this.updateMembersCount(data.item, data.count);
        break;
      }
      case enums.GROUP_UPDATED:
        this.groupUpdated(data.message, data.key, data.group, data.options);
        break;
      case enums.MEMBER_UNBANNED:
        this.memberUnbanned(data);
        break;
      case enums.LEFT_GROUP: {
        this.leaveGroup(data);
        break;
      }
      case enums.DELETE_GROUP: {
        this.deleteGroup(data);
        break;
      }
      default:
        break;
    }
  }

  updateLastMessage(message) {
    console.log("last message upated ", message);

    this.lastMessage = message;
  }

  toggleSideBar() {
    console.log("sidebar toggle works");

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

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(event) {
    if (this.checkAnimatedState !== null) {
      this.checkAnimatedState == "normal"
        ? (this.checkAnimatedState = "animated")
        : (this.checkAnimatedState = "normal");
      console.log("animated state is ", this.checkAnimatedState);
    }
    console.log("event in cls is  ", event);
    // this.item = event;
    // console.log("item is userclicked ", this.item);

    this.closeThreadMessages();
    this.viewDetailScreen = false;
    this.item = event.conversationWith;
    this.curentItem = this.item;
    this.lastMessage = event.lastMessage;
    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
  }

  /**
   * updates the message list with a message notifying that , scope a some user is changed
   * @param Any members
   */
  memberScopeChanged = (members) => {
    const messageList = [];

    members.forEach((eachMember) => {
      const message = `${this.loggedInUser.name} made ${eachMember.name} ${eachMember.scope}`;
      const sentAt = new Date();
      const messageObj = {
        category: "action",
        message: message,
        type: enums.ACTION_TYPE_GROUPMEMBER,
        sentAt: sentAt,
      };
      messageList.push(messageObj);

      console.log("group list screen --> message to be dislayed ", messageObj);
    });

    this.groupMessage = messageList;
  };

  /**
   * updates the messageList with messages about the members that were added
   * @param Any members
   */
  membersAdded = (members) => {
    const messageList = [];
    members.forEach((eachMember) => {
      const message = `${this.loggedInUser.name} added ${eachMember.name}`;
      const sentAt = new Date();
      const messageObj = {
        category: "action",
        message: message,
        type: enums.ACTION_TYPE_GROUPMEMBER,
        sentAt: sentAt,
      };
      messageList.push(messageObj);
    });

    this.groupMessage = messageList;
  };

  /**
   * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
   * @param Any members
   */
  updateMembersCount = (item, count) => {
    console.log("changing group member count to ", count);

    const group = Object.assign({}, this.item, { membersCount: count });

    this.item = group;
    this.groupToUpdate = group;
  };

  /**
   * Updates Current Group Information
   * @param
   */
  groupUpdated = (message, key, group, options) => {
    switch (key) {
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_KICKED: {
        if (options.user.uid === this.loggedInUser.uid) {
          this.item = null;
          this.type = "group";
          this.viewDetailScreen = false;
        }
        break;
      }
      case enums.GROUP_MEMBER_SCOPE_CHANGED: {
        if (options.user.uid === this.loggedInUser.uid) {
          const newObj = Object.assign({}, this.item, {
            scope: options["scope"],
          });

          this.item = newObj;
          this.type = "group";
          this.viewDetailScreen = false;
        }
        break;
      }
      default:
        break;
    }
  };

  /**
   *  Unbans the user
   * @param
   */
  memberUnbanned(members) {
    const messageList = [];
    members.forEach((eachMember) => {
      const message = `${this.loggedInUser.name} unbanned ${eachMember.name}`;
      const sentAt = new Date();
      const messageObj = {
        category: "action",
        message: message,
        type: enums.ACTION_TYPE_GROUPMEMBER,
        sentAt: sentAt,
      };
      messageList.push(messageObj);
    });

    this.groupMessage = messageList;
  }
  /* Closes group screen and all , after user has left the group
   * @param
   */
  leaveGroup = (group) => {
    this.groupToLeave = group;
    this.toggleDetailView();
    this.item = null;
  };

  /**
   * Closes group screen and all , after user has deleted the group
   * @param
   */
  deleteGroup = (group) => {
    this.groupToDelete = group;
    this.toggleDetailView();
    this.item = null;
  };
}
