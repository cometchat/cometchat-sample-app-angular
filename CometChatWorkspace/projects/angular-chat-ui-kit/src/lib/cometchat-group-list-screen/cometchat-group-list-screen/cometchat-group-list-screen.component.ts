import { Component, OnInit, HostListener } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
@Component({
  selector: "cometchat-group-list-screen",
  templateUrl: "./cometchat-group-list-screen.component.html",
  styleUrls: ["./cometchat-group-list-screen.component.css"],
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
export class CometchatGroupListScreenComponent implements OnInit {
  //It can be a user or a group
  item = null;

  // Defines the types of item that was clicked --> that is .. if its a user or a group
  type = null;

  loggedInUser = null;

  threadMessageView: boolean = false;
  threadMessageParent = null;
  threadMessageItem = null;
  threadMessageType = "";
  composedthreadmessage = null;
  viewDetailScreen: boolean = false;
  // To display image in full screen
  imageView = null;

  //If clicked then only show image in full screen
  fullScreenViewImage: boolean = false;

  groupToUpdate = {};
  groupToLeave = {};
  groupToDelete = {};
  groupMessage = [];

  checkAnimatedState;
  checkIfAnimated: boolean = false;
  innerWidth;

  constructor() {}

  ngOnInit() {
    this.onResize();

    CometChat.getLoggedinUser().then((user) => {
      this.loggedInUser = user;
    });
  }

  /**
   * Listen to the group emitted by the groupList component
   * @param Event user
   */
  groupClicked(group) {
    if (this.checkAnimatedState !== null) {
      this.checkAnimatedState == "normal"
        ? (this.checkAnimatedState = "animated")
        : (this.checkAnimatedState = "normal");
      // console.log("animated state is ", this.checkAnimatedState);
    }
    this.item = group;

    //Close Thread And User Detail Screen When Chat Window Is Changed
    this.closeThreadMessages();
    this.viewDetailScreen = false;

    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
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
      this.checkAnimatedState = "normal";
      // console.log("state initail ", this.checkAnimatedState);
      this.checkIfAnimated = true;
    } else {
      this.checkAnimatedState = null;
      this.checkIfAnimated = false;
    }
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let message = action.payLoad;

    let data = action.payLoad;

    console.log("groupListScreen --> action generation is ", action);

    switch (action.type) {
      case enums.VIEW_MESSAGE_THREAD: {
        this.viewMessageThread(message);
        break;
      }
      case enums.CLOSE_THREAD_CLICKED: {
        this.closeThreadMessages();
        break;
      }
      case enums.VIEW_ACTUAL_IMAGE: {
        this.toggleImageView(action.payLoad);
        break;
      }
      case enums.CLOSE_FULL_SCREEN_IMAGE: {
        this.toggleImageView(null);
      }
      case enums.VIEW_DETAIL:
      case enums.CLOSE_DETAIL_CLICKED: {
        this.toggleDetailView();
        break;
      }
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
        // console.log("before animation ", this.checkAnimatedState);
        this.checkAnimatedState = "normal";
        this.item = null;
        break;
      }
    }
  }

  /**
   * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
   * @param Any parentMessage
   */
  viewMessageThread(parentMessage) {
    //Open Thread Screen
    this.threadMessageView = true;

    //close user ( the person you are chatting with ) Detail screen
    this.viewDetailScreen = false;

    this.threadMessageParent = parentMessage;
    this.threadMessageItem = this.item;
    this.threadMessageType = this.type;
  }

  /**
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
    // console.log("userlistscreen toggleImageView ", message);
    this.imageView = message;
    this.fullScreenViewImage = !this.fullScreenViewImage;
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
