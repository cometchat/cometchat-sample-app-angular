import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
@Component({
  selector: "message-header",
  templateUrl: "./message-header.component.html",
  styleUrls: ["./message-header.component.css"],
})
export class MessageHeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item = null;
  @Input() type = null;
  @Input() widgetsettings = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  userListenerId = "head_user_" + new Date().getTime();
  msgListenerId = "head_message_" + new Date().getTime();
  groupListenerId = "head_group_" + new Date().getTime();
  status: string = "";
  isTyping: boolean = false;
  loggedInUser = null;

  //displays audio and video call options
  checkNotBlocked: boolean = true;

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    console.log("Message Header --> ngOnChanges -->  ", change);

    if (change["item"]) {
      //Check if user is blocked/unblocked
      this.checkBlocked();

      // if the person you are chatting with changes
      //Removing User Presence , typing and Group Listeners
      this.removeListeners();

      if (this.type == "group") {
        let prevProps = {
          item:
            change["item"].previousValue == null
              ? { guid: "" }
              : change["item"].previousValue,
        };
        let props = { item: change["item"].currentValue };

        if (
          prevProps.item.guid === props.item.guid &&
          prevProps.item.membersCount !== props.item.membersCount
        ) {
          this.updateHeader(enums.GROUP_MEMBER_ADDED, props.item);
        }

        if (prevProps.item.guid !== props.item.guid) {
          this.setGroupMemeberCountStatus(this.item.membersCount);
        }
      }

      //Attaching new listeners
      this.userListenerId = "head_user_" + new Date().getTime();
      this.msgListenerId = "head_message_" + new Date().getTime();
      this.groupListenerId = "head_group_" + new Date().getTime();
      this.attachListeners();
    }
  }

  ngOnInit() {
    this.attachListeners();

    this.getLoggedInUserInfo();

    if (this.type == "group") {
      this.setGroupMemeberCountStatus(this.item.membersCount);
    }
  }

  ngOnDestroy() {
    //Removing User Presence , typing and Group Listeners
    this.removeListeners();
  }

  /**
   * Gets Information of the currently logged in user
   * @param
   */
  getLoggedInUserInfo() {
    CometChat.getLoggedinUser()
      .then((user) => {
        this.loggedInUser = user;
      })
      .catch((error) => {
        console.log(
          "[CometChatGroupList] getUsers getLoggedInUser error",
          error
        );
      });
  }

  attachListeners() {
    CometChat.addUserListener(
      this.userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser) => {
          /* when someuser/friend comes online, user will be received here */
          console.log("Message Header --> user came online ", onlineUser);

          this.updateHeader(enums.USER_ONLINE, onlineUser);
        },
        onUserOffline: (offlineUser) => {
          /* when someuser/friend went offline, user will be received here */
          console.log("Message Header --> user Went offline ", offlineUser);
          this.updateHeader(enums.USER_OFFLINE, offlineUser);
        },
      })
    );

    CometChat.addMessageListener(
      this.msgListenerId,
      new CometChat.MessageListener({
        onTypingStarted: (typingIndicator) => {
          console.log("Message Header --> Current Friend Stated Typing");
          this.updateHeader(enums.TYPING_STARTED, typingIndicator);
        },
        onTypingEnded: (typingIndicator) => {
          this.updateHeader(enums.TYPING_ENDED, typingIndicator);
        },
      })
    );

    CometChat.addGroupListener(
      this.groupListenerId,
      new CometChat.GroupListener({
        onGroupMemberKicked: (message, kickedUser, kickedBy, kickedFrom) => {
          this.updateHeader(enums.GROUP_MEMBER_KICKED, kickedFrom, kickedUser);
        },
        onGroupMemberBanned: (message, bannedUser, bannedBy, bannedFrom) => {
          this.updateHeader(enums.GROUP_MEMBER_BANNED, bannedFrom, bannedUser);
        },
        onMemberAddedToGroup: (
          message,
          userAdded,
          userAddedBy,
          userAddedIn
        ) => {
          this.updateHeader(enums.GROUP_MEMBER_ADDED, userAddedIn);
        },
        onGroupMemberLeft: (message, leavingUser, group) => {
          this.updateHeader(enums.GROUP_MEMBER_LEFT, group, leavingUser);
        },
        onGroupMemberJoined: (message, joinedUser, joinedGroup) => {
          this.updateHeader(enums.GROUP_MEMBER_JOINED, joinedGroup);
        },
      })
    );
  }

  removeListeners() {
    CometChat.removeUserListener(this.userListenerId);
    CometChat.removeMessageListener(this.msgListenerId);
    CometChat.removeGroupListener(this.groupListenerId);
  }

  /**
   * If user blocked then doesnot display audio and video call else displays
   */
  checkBlocked() {
    if (this.item.blockedByMe === true) {
      this.checkNotBlocked = false;
    } else {
      this.checkNotBlocked = true;
    }
  }

  updateHeader(key = null, item = null, groupUser = null) {
    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if (this.type === "user" && this.item.uid === item.uid) {
          if (
            this.widgetsettings &&
            this.widgetsettings.hasOwnProperty("main") &&
            this.widgetsettings.main.hasOwnProperty("show_user_presence") &&
            this.widgetsettings.main["show_user_presence"] === false
          ) {
            return false;
          }

          this.item = { ...item };
        }
        break;
      }
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        if (
          this.type === "group" &&
          this.item.guid === item.guid &&
          this.loggedInUser.uid !== groupUser.uid
        ) {
          let membersCount = parseInt(item.membersCount);
          this.item.membersCount = membersCount;
          this.setGroupMemeberCountStatus(membersCount);
        }
        break;
      case enums.GROUP_MEMBER_JOINED:
        if (this.type === "group" && this.item.guid === item.guid) {
          let membersCount = parseInt(item.membersCount);
          this.item.membersCount = membersCount;
          this.setGroupMemeberCountStatus(membersCount);
        }
        break;
      case enums.GROUP_MEMBER_ADDED:
        if (this.type === "group" && this.item.guid === item.guid) {
          let membersCount = parseInt(item.membersCount);
          this.item.membersCount = membersCount;
          this.setGroupMemeberCountStatus(membersCount);
        }
        break;
      case enums.TYPING_STARTED: {
        if (
          this.type === "group" &&
          this.type === item.receiverType &&
          this.item.guid === item.receiverId
        ) {
          this.status = item.sender.name + " is typing...";
          this.actionGenerated.emit({
            type: "showReaction",
            payLoad: item,
          });
        } else if (
          this.type === "user" &&
          this.type === item.receiverType &&
          this.item.uid === item.sender.uid
        ) {
          this.isTyping = true;
          this.status = "typing...";
          this.actionGenerated.emit({
            type: "showReaction",
            payLoad: item,
          });
        }
        break;
      }
      case enums.TYPING_ENDED: {
        if (
          this.type === "group" &&
          this.type === item.receiverType &&
          this.item.guid === item.receiverId
        ) {
          this.setGroupMemeberCountStatus(this.item.membersCount);

          // this.setStatusForGroup();
          this.actionGenerated.emit({
            type: "stopReaction",
            payLoad: item,
          });
        } else if (
          this.type === "user" &&
          this.type === item.receiverType &&
          this.item.uid === item.sender.uid
        ) {
          if (this.item.status === "online") {
            console.log("typing online");
            this.status = null;
            this.isTyping = false;
          } else {
            this.getDate(item.lastActiveAt);
          }
          this.actionGenerated.emit({
            type: "stopReaction",
            payLoad: item,
          });
        }
        break;
      }
    }
  }

  /**
   * Sets status of the group according to its member count
   * @param number membersCount
   */
  setGroupMemeberCountStatus(membersCount) {
    if (membersCount > 1) {
      this.status = membersCount + " members";
    } else {
      this.status = membersCount + " member";
    }
  }

  /**
   * Get Last Active Date
   * @param
   */
  getDate(date) {
    let lastActiveDate = "Last Active At: ";

    if (date === undefined) {
      lastActiveDate = "Offline";
      return lastActiveDate;
    }

    lastActiveDate =
      lastActiveDate +
      new Date(date * 1000).toLocaleTimeString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    // console.log("z->>>>>> ", lastActiveDate);
    return lastActiveDate;
  }

  /**
   * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
   * @param
   */
  openUserDetail() {
    this.actionGenerated.emit({ type: enums.VIEW_DETAIL, payLoad: null });
  }

  closeChatWindow() {
    this.actionGenerated.emit({ type: enums.MENU_CLICKED });
  }
}
