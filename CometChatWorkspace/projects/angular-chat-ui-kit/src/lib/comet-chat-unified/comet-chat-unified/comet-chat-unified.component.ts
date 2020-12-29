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
  groupToUpdate = {};
  groupToLeave = {};
  groupToDelete = {};
  groupMessage = [];
  composedthreadmessage = null;
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

    let data = action.payLoad;

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
      case enums.CHANGE_THREAD_PARENT_MESSAGE_REPLY_COUNT: {
        // this.toggleDetailView();

        this.composedthreadmessage = {
          ...this.threadMessageParent,
          replyCount: action.payLoad,
        };

        // console.log(
        //   "groupListScreen --> thread Message Reply count updated ",
        //   action.payLoad
        // );

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
      case enums.MENU_CLICKED: {
        // this.checkAnimatedState = "normal";
        this.item = null;
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

    //close detail screen when switching between users/groups
    this.viewDetailScreen = false;
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

      // console.log("group list screen --> message to be dislayed ", messageObj);
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
    // console.log("changing group member count to ", count);

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
