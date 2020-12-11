import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
import { CometChatManager } from "../../utils/controller";

@Component({
  selector: "comet-chat-conversation-list",
  templateUrl: "./comet-chat-conversation-list.component.html",
  styleUrls: ["./comet-chat-conversation-list.component.css"],
})
export class CometChatConversationListComponent implements OnInit, OnChanges {
  @Input() item;
  @Input() type;

  decoratorMessage: string;
  loggedInUser = null;
  conversationList = [];
  onItemClick = null;
  selectedConversation = undefined;
  ConversationListManager;

  @Output() onUserClick: EventEmitter<any> = new EventEmitter();
  // @Output() curentType: EventEmitter<any> = new EventEmitter();

  // this.theme = Object.assign({}, theme, this.props.theme);

  // this.audio = new Audio(incomingOtherMessageAlert);

  conversationRequest = null;

  conversationListenerId = "chatlist_" + new Date().getTime();
  userListenerId = "chatlist_user_" + new Date().getTime();
  groupListenerId = "chatlist_group_" + new Date().getTime();
  callListenerId = "chatlist_call_" + new Date().getTime();

  constructor(private ref: ChangeDetectorRef) {
    setInterval(() => {
      //console.log("UserList --> detectchange called");
      if (!this.ref["destroyed"]) {
        this.ref.detectChanges();
      }
    }, 1500);
  }

  ngOnChanges(change: SimpleChanges) {}
  ngOnInit() {
    this.conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(30)
      .build();
    this.getConversation();
    this.attachListeners(this.conversationUpdated);
  }

  fetchNextConversation() {
    return this.conversationRequest.fetchNext();
  }

  /**
   * Listeners for respective functionality
   * @param callback
   */
  attachListeners(callback) {
    CometChat.addUserListener(
      this.userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser) => {
          /* when someuser/friend comes online, user will be received here */
          callback(enums.USER_ONLINE, onlineUser);
        },
        onUserOffline: (offlineUser) => {
          /* when someuser/friend went offline, user will be received here */
          callback(enums.USER_OFFLINE, offlineUser);
        },
      })
    );

    CometChat.addGroupListener(
      this.groupListenerId,
      new CometChat.GroupListener({
        onGroupMemberScopeChanged: (
          message,
          changedUser,
          newScope,
          oldScope,
          changedGroup
        ) => {
          callback(enums.GROUP_MEMBER_SCOPE_CHANGED, changedGroup, message, {
            user: changedUser,
            scope: newScope,
          });
        },
        onGroupMemberKicked: (message, kickedUser, kickedBy, kickedFrom) => {
          callback(enums.GROUP_MEMBER_KICKED, kickedFrom, message, {
            user: kickedUser,
            hasJoined: false,
          });
        },
        onGroupMemberBanned: (message, bannedUser, bannedBy, bannedFrom) => {
          callback(enums.GROUP_MEMBER_BANNED, bannedFrom, message, {
            user: bannedUser,
          });
        },
        onGroupMemberUnbanned: (
          message,
          unbannedUser,
          unbannedBy,
          unbannedFrom
        ) => {
          callback(enums.GROUP_MEMBER_UNBANNED, unbannedFrom, message, {
            user: unbannedUser,
          });
        },
        onMemberAddedToGroup: (
          message,
          userAdded,
          userAddedBy,
          userAddedIn
        ) => {
          callback(enums.GROUP_MEMBER_ADDED, userAddedIn, message, {
            user: userAdded,
            hasJoined: true,
          });
        },
        onGroupMemberLeft: (message, leavingUser, group) => {
          callback(enums.GROUP_MEMBER_LEFT, group, message, {
            user: leavingUser,
          });
        },
        onGroupMemberJoined: (message, joinedUser, joinedGroup) => {
          callback(enums.GROUP_MEMBER_JOINED, joinedGroup, message, {
            user: joinedUser,
          });
        },
      })
    );

    CometChat.addMessageListener(
      this.conversationListenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          callback(enums.TEXT_MESSAGE_RECEIVED, null, textMessage);
        },
        onMediaMessageReceived: (mediaMessage) => {
          callback(enums.MEDIA_MESSAGE_RECEIVED, null, mediaMessage);
        },
        onCustomMessageReceived: (customMessage) => {
          callback(enums.CUSTOM_MESSAGE_RECEIVED, null, customMessage);
        },
        onMessageDeleted: (deletedMessage) => {
          callback(enums.MESSAGE_DELETED, null, deletedMessage);
        },
        onMessageEdited: (editedMessage) => {
          callback(enums.MESSAGE_EDITED, null, editedMessage);
        },
      })
    );

    CometChat.addCallListener(
      this.callListenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call) => {
          callback(enums.INCOMING_CALL_RECEIVED, null, call);
        },
        onIncomingCallCancelled: (call) => {
          callback(enums.INCOMING_CALL_CANCELLED, null, call);
        },
      })
    );
  }

  /**
   * Listeners Removed
   */
  removeListeners() {
    CometChat.removeMessageListener(this.conversationListenerId);
    CometChat.removeUserListener(this.userListenerId);
    CometChat.removeGroupListener(this.groupListenerId);
    CometChat.removeCallListener(this.callListenerId);
  }

  /**
   * Fetches Conversations Details with all the users
   */
  getConversation() {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;
        this.fetchNextConversation()
          .then((conversationList) => {
            if (conversationList.length === 0) {
              this.decoratorMessage = "No chats found";
            }
            conversationList.forEach((conversation) => {
              if (
                conversation.conversationType === "user" &&
                !conversation.conversationWith.avatar
              ) {
                conversation.conversationWith.avatar = this.setAvatar(
                  conversation
                );
              } else if (
                conversation.conversationType === "group" &&
                !conversation.conversationWith.icon
              ) {
                conversation.conversationWith.icon = this.setAvatar(
                  conversation
                );
              }

              if (
                this.type !== null &&
                this.item !== null &&
                this.type === conversation.conversationType
              ) {
                if (
                  (conversation.conversationType === "user" &&
                    this.item.uid === conversation.conversationWith.uid) ||
                  (conversation.conversationType === "group" &&
                    this.item.guid === conversation.conversationWith.guid)
                ) {
                  conversation.unreadMessageCount = 0;
                }
              }
            });
            this.conversationList = [
              ...this.conversationList,
              ...conversationList,
            ];
            // console.log(
            //   "ConversationList-> conversationList  ",
            //   this.conversationList
            // );
          })
          .catch((error) => {
            this.decoratorMessage = "Error";
            console.error(
              "[CometChatConversationList] getConversations fetchNext error",
              error
            );
          });
      })
      .catch((error) => {
        this.decoratorMessage = "Error";
        console.log(
          "[CometChatConversationList] getConversations getLoggedInUser error",
          error
        );
      });
  }

  ///////////////////////////////////////////////////////VERIFY
  /**
   * Sets User Avatar If Avatar is not present
   * @param
   */
  setAvatar(conversation) {
    if (
      conversation.conversationType === "user" &&
      !conversation.conversationWith.avatar
    ) {
      const uid = conversation.conversationWith.uid;
      const char = conversation.conversationWith.name.charAt(0).toUpperCase();

      // return SvgAvatar.getAvatar(uid, char);
    } else if (
      conversation.conversationType === "group" &&
      !conversation.conversationWith.icon
    ) {
      const guid = conversation.conversationWith.guid;
      const char = conversation.conversationWith.name.charAt(0).toUpperCase();

      // return SvgAvatar.getAvatar(guid, char)
    }
  }

  conversationUpdated = (
    key = null,
    item = null,
    message = null,
    options = null
  ) => {
    // console.log("key ", key);
    // console.log("item ", item);
    // console.log("message ", message);
    // console.log("options ", options);

    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        this.updateUser(item);
        break;
      }
      case enums.TEXT_MESSAGE_RECEIVED:
      case enums.MEDIA_MESSAGE_RECEIVED:
      case enums.CUSTOM_MESSAGE_RECEIVED:
        this.updateConversation(message);
        break;
      // case enums.MESSAGE_EDITED:
      // case enums.MESSAGE_DELETED:
      //   this.conversationEditedDeleted(message);
      //   break;
      // case enums.INCOMING_CALL_RECEIVED:
      // case enums.INCOMING_CALL_CANCELLED:
      //   this.updateConversation(message, false);
      //   break;
      // case enums.GROUP_MEMBER_ADDED:
      //   this.updateGroupMemberAdded(message, options);
      //   break;
      // case enums.GROUP_MEMBER_KICKED:
      // case enums.GROUP_MEMBER_BANNED:
      // case enums.GROUP_MEMBER_LEFT:
      //   this.updateGroupMemberRemoved(message, options);
      //   break;
      // case enums.GROUP_MEMBER_SCOPE_CHANGED:
      //   this.updateGroupMemberScopeChanged(message, options);
      //   break;
      // case enums.GROUP_MEMBER_JOINED:
      //   this.updateGroupMemberChanged(message, options, "increment");
      //   break;
      // case enums.GROUP_MEMBER_UNBANNED:
      //   this.updateGroupMemberChanged(message, options, "");
      //   break;
      // default:
      //   break;
    }
  };

  /**
   * Updates Detail when user comes online/offline
   * @param
   */
  updateUser(user) {
    //when user updates
    const conversationlist = [...this.conversationList];

    //Gets the index of user which comes offline/online
    const conversationKey = conversationlist.findIndex(
      (conversationObj) =>
        conversationObj.conversationType === "user" &&
        conversationObj.conversationWith.uid === user.uid
    );
    if (conversationKey > -1) {
      let conversationObj = { ...conversationlist[conversationKey] };
      let conversationWithObj = {
        ...conversationObj.conversationWith,
        status: user.getStatus(),
      };

      let newConversationObj = {
        ...conversationObj,
        conversationWith: conversationWithObj,
      };
      conversationlist.splice(conversationKey, 1, newConversationObj);
      // console.log("ConversationList -> new conversationList", conversationlist);

      this.conversationList = conversationlist;
    }
  }

  /**
   *
   * Gets the last message
   * @param conversation
   */
  makeLastMessage(message, conversation = {}) {
    const newMessage = Object.assign({}, message);
    return newMessage;
  }

  /**
   *
   * Updates Conversations as Text/Custom Messages are received
   * @param
   *
   */
  updateConversation(message, notification = true) {
    // console.log("messagee ", message);
    this.makeConversation(message)
      .then((response: any) => {
        const conversationKey = response.conversationKey;
        const conversationObj = response.conversationObj;
        const conversationList = response.conversationList;
        console.log("ck ", conversationKey);

        if (conversationKey > -1) {
          let unreadMessageCount = this.makeUnreadMessageCount(conversationObj);
          let lastMessageObj = this.makeLastMessage(message, conversationObj);
          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
          };
          console.log("cc ", conversationList);
          console.log("new cc ", newConversationObj);

          conversationList.splice(conversationKey, 1);
          conversationList.unshift(newConversationObj);
          this.conversationList = conversationList;
          console.log("this1", this.conversationList);

          if (notification) {
            // this.playAudio(message);
          }
        } else {
          let unreadMessageCount = this.makeUnreadMessageCount();
          let lastMessageObj = this.makeLastMessage(message);
          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
          };
          conversationList.unshift(newConversationObj);
          this.conversationList = conversationList;

          if (notification) {
            // this.playAudio(message);
          }
        }
      })
      .catch((error) => {
        console.log(
          "This is an error in converting message to conversation",
          error
        );
      });
  }

  /**
   *
   * Gets The Count of Unread Messages
   * @param
   */
  makeUnreadMessageCount(conversation: any = {}, operator = null) {
    if (Object.keys(conversation).length === 0) {
      return 1;
    }

    let unreadMessageCount = parseInt(conversation.unreadMessageCount);
    if (
      this.selectedConversation &&
      this.selectedConversation.conversationId === conversation.conversationId
    ) {
      unreadMessageCount = 0;
    } else if (
      (this.item &&
        this.item.hasOwnProperty("guid") &&
        conversation.conversationWith.hasOwnProperty("guid") &&
        this.item.guid === conversation.conversationWith.guid) ||
      (this.item &&
        this.item.hasOwnProperty("uid") &&
        conversation.conversationWith.hasOwnProperty("uid") &&
        this.item.uid === conversation.conversationWith.uid)
    ) {
      unreadMessageCount = 0;
    } else {
      if (operator && operator === "decrement") {
        unreadMessageCount = unreadMessageCount ? unreadMessageCount - 1 : 0;
      } else {
        unreadMessageCount = unreadMessageCount + 1;
      }
    }

    return unreadMessageCount;
  }

  /**
   *
   * @param
   */
  makeConversation(message) {
    const promise = new Promise((resolve, reject) => {
      CometChat.CometChatHelper.getConversationFromMessage(message)
        .then((conversation: any) => {
          let conversationList = [...this.conversationList];
          let conversationKey = conversationList.findIndex(
            (c) => c.conversationId === conversation.conversationId
          );

          let conversationObj = { ...conversation };
          if (conversationKey > -1) {
            conversationObj = { ...conversationList[conversationKey] };
          }

          resolve({
            conversationKey: conversationKey,
            conversationObj: conversationObj,
            conversationList: conversationList,
          });
        })
        .catch((error) => reject(error));
    });

    return promise;
  }

  /**
   * Emits User on User Click
   * @param user
   */

  userClicked(user) {
    this.onUserClick.emit(user);
  }
}
