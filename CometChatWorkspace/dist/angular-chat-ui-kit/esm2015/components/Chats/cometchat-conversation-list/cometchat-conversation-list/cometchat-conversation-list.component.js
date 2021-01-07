/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/cometchat-conversation-list/cometchat-conversation-list/cometchat-conversation-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { INCOMING_OTHER_MESSAGE_SOUND } from "../../../resources/audio/incomingOtherMessageSound";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatConversationListComponent {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.item = null;
        this.type = null;
        this.onUserClick = new EventEmitter();
        this.groupToUpdate = null;
        this.groupToLeave = null;
        this.groupToDelete = null;
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.loggedInUser = null;
        this.conversationList = [];
        this.onItemClick = null;
        this.selectedConversation = undefined;
        this.checkItemChange = false;
        // this.audio = new Audio(incomingOtherMessageAlert);
        this.conversationRequest = null;
        this.conversationListenerId = "chatlist_" + new Date().getTime();
        this.userListenerId = "chatlist_user_" + new Date().getTime();
        this.groupListenerId = "chatlist_group_" + new Date().getTime();
        this.callListenerId = "chatlist_call_" + new Date().getTime();
        this.CHATS = STRING_MESSAGES.CHATS;
        this.conversationUpdated = (/**
         * @param {?=} key
         * @param {?=} item
         * @param {?=} message
         * @param {?=} options
         * @return {?}
         */
        (key = null, item = null, message = null, options = null) => {
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
                case enums.MESSAGE_EDITED:
                case enums.MESSAGE_DELETED:
                    this.conversationEditedDeleted(message);
                    break;
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
        });
        setInterval((/**
         * @return {?}
         */
        () => {
            if (!this.ref["destroyed"]) {
                this.ref.detectChanges();
            }
        }), 1500);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListeners();
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["item"]) {
            this.checkItemChange = true;
            if (change["item"].previousValue !== change["item"].currentValue &&
                change["item"].currentValue) {
                if (Object.keys(change["item"].currentValue).length === 0) {
                    // this.chatListRef.scrollTop = 0;
                    this.selectedConversation = {};
                }
                else {
                    /** @type {?} */
                    const conversationlist = [...this.conversationList];
                    /** @type {?} */
                    const conversationObj = conversationlist.find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    (c) => {
                        if ((c.conversationType === this.type &&
                            this.type === "user" &&
                            c.conversationWith.uid === this.item.uid) ||
                            (c.conversationType === this.type &&
                                this.type === "group" &&
                                c.conversationWith.guid === this.item.guid)) {
                            return c;
                        }
                        return false;
                    }));
                    if (conversationObj) {
                        /** @type {?} */
                        let conversationKey = conversationlist.indexOf(conversationObj);
                        /** @type {?} */
                        let newConversationObj = Object.assign({}, conversationObj, { unreadMessageCount: 0 });
                        conversationlist.splice(conversationKey, 1, newConversationObj);
                        this.conversationList = conversationlist;
                        this.selectedConversation = newConversationObj;
                    }
                }
                // if user is blocked/unblocked, update conversationlist i.e user is removed from conversationList
                if (change["item"].previousValue &&
                    Object.keys(change["item"].previousValue).length &&
                    change["item"].previousValue.uid ===
                        change["item"].currentValue.uid &&
                    change["item"].previousValue.blockedByMe !==
                        change["item"].currentValue.blockedByMe) {
                    /** @type {?} */
                    let conversationlist = [...this.conversationList];
                    //search for user
                    /** @type {?} */
                    let convKey = conversationlist.findIndex((/**
                     * @param {?} c
                     * @param {?} k
                     * @return {?}
                     */
                    (c, k) => c.conversationType === "user" &&
                        c.conversationWith.uid === change["item"].currentValue.uid));
                    if (convKey > -1) {
                        conversationlist.splice(convKey, 1);
                        this.conversationList = conversationlist;
                        // this.setState({ conversationlist: conversationlist });
                    }
                }
            }
        }
        if (change["groupToUpdate"]) {
            /** @type {?} */
            let prevProps = { groupToUpdate: null };
            /** @type {?} */
            let props = { groupToUpdate: null };
            prevProps["groupToUpdate"] = change["groupToUpdate"].previousValue;
            props["groupToUpdate"] = change["groupToUpdate"].currentValue;
            if (prevProps.groupToUpdate &&
                (prevProps.groupToUpdate.guid !== props.groupToUpdate.guid ||
                    (prevProps.groupToUpdate.guid === props.groupToUpdate.guid &&
                        (prevProps.groupToUpdate.membersCount !==
                            props.groupToUpdate.membersCount ||
                            prevProps.groupToUpdate.scope !== props.groupToUpdate.scope)))) {
                /** @type {?} */
                const conversationList = [...this.conversationList];
                /** @type {?} */
                const groupToUpdate = this.groupToUpdate;
                /** @type {?} */
                const groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                (group) => group.conversationWith.guid === groupToUpdate.guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    const groupObj = conversationList[groupKey];
                    /** @type {?} */
                    const newGroupObj = Object.assign({}, groupObj, groupToUpdate, {
                        scope: groupToUpdate["scope"],
                        membersCount: groupToUpdate["membersCount"],
                    });
                    conversationList.splice(groupKey, 1, newGroupObj);
                    // this.setState({grouplist: groups});
                    this.conversationList = conversationList;
                }
            }
        }
        if (change["groupToLeave"]) {
            /** @type {?} */
            let prevProps = { groupToLeave: null };
            /** @type {?} */
            let props = { groupToLeave: null };
            prevProps["groupToLeave"] = change["groupToLeave"].previousValue;
            props["groupToLeave"] = change["groupToLeave"].currentValue;
            if (prevProps.groupToLeave &&
                prevProps.groupToLeave.guid !== props.groupToLeave.guid) {
                /** @type {?} */
                const conversationList = [...this.conversationList];
                /** @type {?} */
                const groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                (group) => group.conversationWith.guid === props.groupToLeave.guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    const groupToLeave = props.groupToLeave;
                    /** @type {?} */
                    const groupObj = Object.assign({}, conversationList[groupKey]);
                    /** @type {?} */
                    const membersCount = parseInt(groupToLeave["membersCount"]) - 1;
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        hasJoined: false,
                    });
                    conversationList.splice(groupKey, 1, newgroupObj);
                    // this.setState({grouplist: groups});
                    this.conversationList = conversationList;
                }
            }
        }
        if (change["groupToDelete"]) {
            /** @type {?} */
            let prevProps = { groupToDelete: null };
            /** @type {?} */
            let props = { groupToDelete: null };
            prevProps["groupToDelete"] = change["groupToDelete"].previousValue;
            props["groupToDelete"] = change["groupToDelete"].currentValue;
            if (prevProps.groupToDelete &&
                prevProps.groupToDelete.guid !== props.groupToDelete.guid) {
                /** @type {?} */
                const conversationList = [...this.conversationList];
                /** @type {?} */
                const groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                (group) => group.conversationWith.guid === props.groupToDelete.guid));
                if (groupKey > -1) {
                    conversationList.splice(groupKey, 1);
                    // this.setState({grouplist: groups});
                    this.conversationList = conversationList;
                    if (conversationList.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_CHATS_FOUND;
                    }
                }
            }
        }
        /**
         * When user sends message conversationList is updated with latest message
         */
        if (this.checkItemChange === false) {
            if (change["lastMessage"]) {
                if (change["lastMessage"].previousValue !==
                    change["lastMessage"].currentValue) {
                    /** @type {?} */
                    const lastMessage = change["lastMessage"].currentValue[0];
                    /** @type {?} */
                    const conversationList = [...this.conversationList];
                    /** @type {?} */
                    const conversationKey = conversationList.findIndex((/**
                     * @param {?} c
                     * @return {?}
                     */
                    (c) => {
                        return c.conversationId == lastMessage.conversationId;
                    }));
                    if (conversationKey > -1) {
                        /** @type {?} */
                        const conversationObj = conversationList[conversationKey];
                        /** @type {?} */
                        let newConversationObj = Object.assign({}, conversationObj, { lastMessage: lastMessage });
                        conversationList.splice(conversationKey, 1);
                        conversationList.unshift(newConversationObj);
                        this.conversationList = conversationList;
                    }
                }
            }
        }
        this.checkItemChange = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.conversationRequest = new CometChat.ConversationsRequestBuilder()
            .setLimit(30)
            .build();
        this.getConversation();
        this.attachListeners(this.conversationUpdated);
    }
    /**
     * @return {?}
     */
    fetchNextConversation() {
        return this.conversationRequest.fetchNext();
    }
    /**
     * Listeners for respective functionality
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
        CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
            onUserOnline: (/**
             * @param {?} onlineUser
             * @return {?}
             */
            (onlineUser) => {
                /* when someuser/friend comes online, user will be received here */
                callback(enums.USER_ONLINE, onlineUser);
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            (offlineUser) => {
                /* when someuser/friend went offline, user will be received here */
                callback(enums.USER_OFFLINE, offlineUser);
            }),
        }));
        CometChat.addGroupListener(this.groupListenerId, new CometChat.GroupListener({
            onGroupMemberScopeChanged: (/**
             * @param {?} message
             * @param {?} changedUser
             * @param {?} newScope
             * @param {?} oldScope
             * @param {?} changedGroup
             * @return {?}
             */
            (message, changedUser, newScope, oldScope, changedGroup) => {
                callback(enums.GROUP_MEMBER_SCOPE_CHANGED, changedGroup, message, {
                    user: changedUser,
                    scope: newScope,
                });
            }),
            onGroupMemberKicked: (/**
             * @param {?} message
             * @param {?} kickedUser
             * @param {?} kickedBy
             * @param {?} kickedFrom
             * @return {?}
             */
            (message, kickedUser, kickedBy, kickedFrom) => {
                callback(enums.GROUP_MEMBER_KICKED, kickedFrom, message, {
                    user: kickedUser,
                    hasJoined: false,
                });
            }),
            onGroupMemberBanned: (/**
             * @param {?} message
             * @param {?} bannedUser
             * @param {?} bannedBy
             * @param {?} bannedFrom
             * @return {?}
             */
            (message, bannedUser, bannedBy, bannedFrom) => {
                callback(enums.GROUP_MEMBER_BANNED, bannedFrom, message, {
                    user: bannedUser,
                });
            }),
            onGroupMemberUnbanned: (/**
             * @param {?} message
             * @param {?} unbannedUser
             * @param {?} unbannedBy
             * @param {?} unbannedFrom
             * @return {?}
             */
            (message, unbannedUser, unbannedBy, unbannedFrom) => {
                callback(enums.GROUP_MEMBER_UNBANNED, unbannedFrom, message, {
                    user: unbannedUser,
                });
            }),
            onMemberAddedToGroup: (/**
             * @param {?} message
             * @param {?} userAdded
             * @param {?} userAddedBy
             * @param {?} userAddedIn
             * @return {?}
             */
            (message, userAdded, userAddedBy, userAddedIn) => {
                callback(enums.GROUP_MEMBER_ADDED, userAddedIn, message, {
                    user: userAdded,
                    hasJoined: true,
                });
            }),
            onGroupMemberLeft: (/**
             * @param {?} message
             * @param {?} leavingUser
             * @param {?} group
             * @return {?}
             */
            (message, leavingUser, group) => {
                callback(enums.GROUP_MEMBER_LEFT, group, message, {
                    user: leavingUser,
                });
            }),
            onGroupMemberJoined: (/**
             * @param {?} message
             * @param {?} joinedUser
             * @param {?} joinedGroup
             * @return {?}
             */
            (message, joinedUser, joinedGroup) => {
                callback(enums.GROUP_MEMBER_JOINED, joinedGroup, message, {
                    user: joinedUser,
                });
            }),
        }));
        CometChat.addMessageListener(this.conversationListenerId, new CometChat.MessageListener({
            onTextMessageReceived: (/**
             * @param {?} textMessage
             * @return {?}
             */
            (textMessage) => {
                callback(enums.TEXT_MESSAGE_RECEIVED, null, textMessage);
            }),
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            (mediaMessage) => {
                callback(enums.MEDIA_MESSAGE_RECEIVED, null, mediaMessage);
            }),
            onCustomMessageReceived: (/**
             * @param {?} customMessage
             * @return {?}
             */
            (customMessage) => {
                callback(enums.CUSTOM_MESSAGE_RECEIVED, null, customMessage);
            }),
            onMessageDeleted: (/**
             * @param {?} deletedMessage
             * @return {?}
             */
            (deletedMessage) => {
                callback(enums.MESSAGE_DELETED, null, deletedMessage);
            }),
            onMessageEdited: (/**
             * @param {?} editedMessage
             * @return {?}
             */
            (editedMessage) => {
                callback(enums.MESSAGE_EDITED, null, editedMessage);
            }),
        }));
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onIncomingCallReceived: (/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                callback(enums.INCOMING_CALL_RECEIVED, null, call);
            }),
            onIncomingCallCancelled: (/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                callback(enums.INCOMING_CALL_CANCELLED, null, call);
            }),
        }));
    }
    /**
     * Listeners Removed
     * @return {?}
     */
    removeListeners() {
        CometChat.removeMessageListener(this.conversationListenerId);
        CometChat.removeUserListener(this.userListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
        CometChat.removeCallListener(this.callListenerId);
    }
    /**
     * Fetches Conversations Details with all the users
     * @return {?}
     */
    getConversation() {
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.loggedInUser = user;
            this.fetchNextConversation()
                .then((/**
             * @param {?} conversationList
             * @return {?}
             */
            (conversationList) => {
                conversationList.forEach((/**
                 * @param {?} conversation
                 * @return {?}
                 */
                (conversation) => {
                    if (conversation.conversationType === "user" &&
                        !conversation.conversationWith.avatar) {
                        conversation.conversationWith.avatar = this.setAvatar(conversation);
                    }
                    else if (conversation.conversationType === "group" &&
                        !conversation.conversationWith.icon) {
                        conversation.conversationWith.icon = this.setAvatar(conversation);
                    }
                    if (this.type !== null &&
                        this.item !== null &&
                        this.type === conversation.conversationType) {
                        if ((conversation.conversationType === "user" &&
                            this.item.uid === conversation.conversationWith.uid) ||
                            (conversation.conversationType === "group" &&
                                this.item.guid === conversation.conversationWith.guid)) {
                            conversation.unreadMessageCount = 0;
                        }
                    }
                }));
                this.conversationList = [
                    ...this.conversationList,
                    ...conversationList,
                ];
                if (this.conversationList.length === 0) {
                    this.decoratorMessage = STRING_MESSAGES.NO_CHATS_FOUND;
                }
                else {
                    this.decoratorMessage = "";
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.decoratorMessage = STRING_MESSAGES.ERROR;
                console.error("[CometChatConversationList] getConversations fetchNext error", error);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.decoratorMessage = STRING_MESSAGES.ERROR;
            console.log("[CometChatConversationList] getConversations getLoggedInUser error", error);
        }));
    }
    /**
     * Sets User Avatar If Avatar is not present
     * @param {?} conversation
     * @return {?}
     */
    setAvatar(conversation) {
        if (conversation.conversationType === "user" &&
            !conversation.conversationWith.avatar) {
            /** @type {?} */
            const uid = conversation.conversationWith.uid;
            /** @type {?} */
            const char = conversation.conversationWith.name.charAt(0).toUpperCase();
            // return SvgAvatar.getAvatar(uid, char);
        }
        else if (conversation.conversationType === "group" &&
            !conversation.conversationWith.icon) {
            /** @type {?} */
            const guid = conversation.conversationWith.guid;
            /** @type {?} */
            const char = conversation.conversationWith.name.charAt(0).toUpperCase();
            // return SvgAvatar.getAvatar(guid, char)
        }
    }
    /**
     * Updates Detail when user comes online/offline
     * @param {?} user
     * @return {?}
     */
    updateUser(user) {
        //when user updates
        /** @type {?} */
        const conversationlist = [...this.conversationList];
        //Gets the index of user which comes offline/online
        /** @type {?} */
        const conversationKey = conversationlist.findIndex((/**
         * @param {?} conversationObj
         * @return {?}
         */
        (conversationObj) => conversationObj.conversationType === "user" &&
            conversationObj.conversationWith.uid === user.uid));
        if (conversationKey > -1) {
            /** @type {?} */
            let conversationObj = Object.assign({}, conversationlist[conversationKey]);
            /** @type {?} */
            let conversationWithObj = Object.assign({}, conversationObj.conversationWith, { status: user.getStatus() });
            /** @type {?} */
            let newConversationObj = Object.assign({}, conversationObj, { conversationWith: conversationWithObj });
            conversationlist.splice(conversationKey, 1, newConversationObj);
            this.conversationList = conversationlist;
        }
    }
    /**
     *
     * Gets the last message
     * @param {?} message
     * @param {?=} conversation
     * @return {?}
     */
    makeLastMessage(message, conversation = {}) {
        /** @type {?} */
        const newMessage = Object.assign({}, message);
        return newMessage;
    }
    /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param {?} message
     * @param {?=} notification
     * @return {?}
     */
    updateConversation(message, notification = true) {
        this.makeConversation(message)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            /** @type {?} */
            const conversationKey = response.conversationKey;
            /** @type {?} */
            const conversationObj = response.conversationObj;
            /** @type {?} */
            const conversationList = response.conversationList;
            if (conversationKey > -1) {
                /** @type {?} */
                let unreadMessageCount = this.makeUnreadMessageCount(conversationObj);
                /** @type {?} */
                let lastMessageObj = this.makeLastMessage(message, conversationObj);
                /** @type {?} */
                let newConversationObj = Object.assign({}, conversationObj, { lastMessage: lastMessageObj, unreadMessageCount: unreadMessageCount });
                conversationList.splice(conversationKey, 1);
                conversationList.unshift(newConversationObj);
                this.conversationList = conversationList;
                if (notification) {
                    this.playAudio();
                }
            }
            else {
                /** @type {?} */
                let unreadMessageCount = this.makeUnreadMessageCount();
                /** @type {?} */
                let lastMessageObj = this.makeLastMessage(message);
                /** @type {?} */
                let newConversationObj = Object.assign({}, conversationObj, { lastMessage: lastMessageObj, unreadMessageCount: unreadMessageCount });
                conversationList.unshift(newConversationObj);
                this.conversationList = conversationList;
                if (notification) {
                    this.playAudio();
                }
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("This is an error in converting message to conversation", error);
        }));
    }
    /**
     *
     * Gets The Count of Unread Messages
     * @param {?=} conversation
     * @param {?=} operator
     * @return {?}
     */
    makeUnreadMessageCount(conversation = {}, operator = null) {
        if (Object.keys(conversation).length === 0) {
            return 1;
        }
        /** @type {?} */
        let unreadMessageCount = parseInt(conversation.unreadMessageCount);
        if (this.selectedConversation &&
            this.selectedConversation.conversationId === conversation.conversationId) {
            unreadMessageCount = 0;
        }
        else if ((this.item &&
            this.item.hasOwnProperty("guid") &&
            conversation.conversationWith.hasOwnProperty("guid") &&
            this.item.guid === conversation.conversationWith.guid) ||
            (this.item &&
                this.item.hasOwnProperty("uid") &&
                conversation.conversationWith.hasOwnProperty("uid") &&
                this.item.uid === conversation.conversationWith.uid)) {
            unreadMessageCount = 0;
        }
        else {
            if (operator && operator === "decrement") {
                unreadMessageCount = unreadMessageCount ? unreadMessageCount - 1 : 0;
            }
            else {
                unreadMessageCount = unreadMessageCount + 1;
            }
        }
        return unreadMessageCount;
    }
    /**
     * Changes detail of conversations
     * @param {?} message
     * @return {?}
     */
    makeConversation(message) {
        /** @type {?} */
        const promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            CometChat.CometChatHelper.getConversationFromMessage(message)
                .then((/**
             * @param {?} conversation
             * @return {?}
             */
            (conversation) => {
                /** @type {?} */
                let conversationList = [...this.conversationList];
                /** @type {?} */
                let conversationKey = conversationList.findIndex((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.conversationId === conversation.conversationId));
                /** @type {?} */
                let conversationObj = Object.assign({}, conversation);
                if (conversationKey > -1) {
                    conversationObj = Object.assign({}, conversationList[conversationKey]);
                }
                resolve({
                    conversationKey: conversationKey,
                    conversationObj: conversationObj,
                    conversationList: conversationList,
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Updates Conversation View when message is edited or deleted
     * @param {?} message
     * @return {?}
     */
    conversationEditedDeleted(message) {
        this.makeConversation(message)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            /** @type {?} */
            const conversationKey = response.conversationKey;
            /** @type {?} */
            const conversationObj = response.conversationObj;
            /** @type {?} */
            const conversationList = response.conversationList;
            if (conversationKey > -1) {
                /** @type {?} */
                let lastMessageObj = conversationObj.lastMessage;
                if (lastMessageObj.id === message.id) {
                    /** @type {?} */
                    const newLastMessageObj = Object.assign({}, lastMessageObj, message);
                    /** @type {?} */
                    let newConversationObj = Object.assign({}, conversationObj, {
                        lastMessage: newLastMessageObj,
                    });
                    conversationList.splice(conversationKey, 1, newConversationObj);
                    this.conversationList = conversationList;
                }
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("This is an error in converting message to conversation", error);
        }));
    }
    /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom) {
            this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
            this.getConversation();
        }
    }
    /**
     * Emits User on User Click
     * @param {?} user
     * @return {?}
     */
    userClicked(user) {
        this.onUserClick.emit(user);
    }
    /**
     * Plays Audio When Message is Received
     * @return {?}
     */
    playAudio() {
        /** @type {?} */
        let audio = new Audio();
        audio.src = INCOMING_OTHER_MESSAGE_SOUND;
        audio.play();
    }
}
CometchatConversationListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-conversation-list",
                template: "<div class=\"chatWrapperStyle\">\n  <div class=\"chatsHeaderStyle\">\n    <!--Close Btn-->\n    <h4 class=\"chatsHeaderTitleStyle\">{{ CHATS }}</h4>\n    <div></div>\n  </div>\n  <!--Message Container-->\n  <div class=\"chatsMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n    <p class=\"chatsMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"chatsListStyle\" (scroll)=\"handleScroll($event)\">\n    <!--Conversation List-->\n    <div *ngFor=\"let conversation of conversationList\">\n      <cometchat-conversation-list-item\n        [ConversationDetails]=\"conversation\"\n        [loggedInUser]=\"loggedInUser\"\n        (onUserClick)=\"userClicked($event)\"\n      >\n      </cometchat-conversation-list-item>\n    </div>\n  </div>\n</div>\n",
                styles: [".chatWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.chatsHeaderStyle{padding:19px 16px;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.chatsHeaderTitleStyle{margin:0;display:inline-block;width:66%;text-align:left;font-size:20px}.chatsMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.chatsMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.chatsListStyle{height:calc(100% - 65px);width:100%;overflow-y:auto;margin:0;padding:0}"]
            }] }
];
/** @nocollapse */
CometchatConversationListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometchatConversationListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    lastMessage: [{ type: Input }],
    onUserClick: [{ type: Output }],
    groupToUpdate: [{ type: Input }],
    groupToLeave: [{ type: Input }],
    groupToDelete: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometchatConversationListComponent.prototype.item;
    /** @type {?} */
    CometchatConversationListComponent.prototype.type;
    /** @type {?} */
    CometchatConversationListComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatConversationListComponent.prototype.onUserClick;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatConversationListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatConversationListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationList;
    /** @type {?} */
    CometchatConversationListComponent.prototype.onItemClick;
    /** @type {?} */
    CometchatConversationListComponent.prototype.selectedConversation;
    /** @type {?} */
    CometchatConversationListComponent.prototype.ConversationListManager;
    /** @type {?} */
    CometchatConversationListComponent.prototype.checkItemChange;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationRequest;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.callListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.CHATS;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationUpdated;
    /**
     * @type {?}
     * @private
     */
    CometchatConversationListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NoYXRzL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sa0NBQWtDOzs7O0lBNEI3QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTNCakMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTlCLHFCQUFnQixHQUFXLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIs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RyxJQUFJLEtBQUssRUFBRTtRQUN2QixLQUFLLENBQUMsR0FBRyxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUM7OztZQW51QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLGt4QkFBMkQ7O2FBRTVEOzs7O1lBZEMsaUJBQWlCOzs7bUJBZ0JoQixLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxNQUFNOzRCQUNOLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzs7O0lBTk4sa0RBQXFCOztJQUNyQixrREFBcUI7O0lBQ3JCLHlEQUFxQjs7SUFDckIseURBQThEOztJQUM5RCwyREFBOEI7O0lBQzlCLDBEQUE2Qjs7SUFDN0IsMkRBQThCOztJQUU5Qiw4REFBNEQ7O0lBQzVELDBEQUFvQjs7SUFDcEIsOERBQXNCOztJQUN0Qix5REFBbUI7O0lBQ25CLGtFQUFpQzs7SUFDakMscUVBQXdCOztJQUN4Qiw2REFBaUM7O0lBSWpDLGlFQUEyQjs7SUFFM0Isb0VBQTREOztJQUM1RCw0REFBeUQ7O0lBQ3pELDZEQUEyRDs7SUFDM0QsNERBQXlEOztJQUV6RCxtREFBc0M7O0lBcWJ0QyxpRUE2Q0U7Ozs7O0lBaGVVLGlEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOQ09NSU5HX09USEVSX01FU1NBR0VfU09VTkQgfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2F1ZGlvL2luY29taW5nT3RoZXJNZXNzYWdlU291bmRcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxhc3RNZXNzYWdlO1xuICBAT3V0cHV0KCkgb25Vc2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBncm91cFRvVXBkYXRlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0xlYXZlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0RlbGV0ZSA9IG51bGw7XG5cbiAgZGVjb3JhdG9yTWVzc2FnZTogc3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGNvbnZlcnNhdGlvbkxpc3QgPSBbXTtcbiAgb25JdGVtQ2xpY2sgPSBudWxsO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbiA9IHVuZGVmaW5lZDtcbiAgQ29udmVyc2F0aW9uTGlzdE1hbmFnZXI7XG4gIGNoZWNrSXRlbUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIHRoaXMuYXVkaW8gPSBuZXcgQXVkaW8oaW5jb21pbmdPdGhlck1lc3NhZ2VBbGVydCk7XG5cbiAgY29udmVyc2F0aW9uUmVxdWVzdCA9IG51bGw7XG5cbiAgY29udmVyc2F0aW9uTGlzdGVuZXJJZCA9IFwiY2hhdGxpc3RfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgdXNlckxpc3RlbmVySWQgPSBcImNoYXRsaXN0X3VzZXJfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gXCJjaGF0bGlzdF9ncm91cF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjYWxsTGlzdGVuZXJJZCA9IFwiY2hhdGxpc3RfY2FsbF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIENIQVRTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQ0hBVFM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJlZltcImRlc3Ryb3llZFwiXSkge1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSwgMTUwMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIml0ZW1cIl0pIHtcbiAgICAgIHRoaXMuY2hlY2tJdGVtQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZSAmJlxuICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZVxuICAgICAgKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gdGhpcy5jaGF0TGlzdFJlZi5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24gPSB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25saXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG5cbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSBjb252ZXJzYXRpb25saXN0LmZpbmQoKGMpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKGMuY29udmVyc2F0aW9uVHlwZSA9PT0gdGhpcy50eXBlICYmXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC51aWQgPT09IHRoaXMuaXRlbS51aWQpIHx8XG4gICAgICAgICAgICAgIChjLmNvbnZlcnNhdGlvblR5cGUgPT09IHRoaXMudHlwZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgICAgICAgYy5jb252ZXJzYXRpb25XaXRoLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChjb252ZXJzYXRpb25PYmopIHtcbiAgICAgICAgICAgIGxldCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25saXN0LmluZGV4T2YoY29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbmxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSwgbmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbmxpc3Q7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uID0gbmV3Q29udmVyc2F0aW9uT2JqO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHVzZXIgaXMgYmxvY2tlZC91bmJsb2NrZWQsIHVwZGF0ZSBjb252ZXJzYXRpb25saXN0IGkuZSB1c2VyIGlzIHJlbW92ZWQgZnJvbSBjb252ZXJzYXRpb25MaXN0XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUpLmxlbmd0aCAmJlxuICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZS51aWQgPT09XG4gICAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZS51aWQgJiZcbiAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUuYmxvY2tlZEJ5TWUgIT09XG4gICAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZS5ibG9ja2VkQnlNZVxuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgY29udmVyc2F0aW9ubGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuXG4gICAgICAgICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICAgICAgICBsZXQgY29udktleSA9IGNvbnZlcnNhdGlvbmxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgKGMsIGspID0+XG4gICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICAgICAgYy5jb252ZXJzYXRpb25XaXRoLnVpZCA9PT0gY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUudWlkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY29udktleSA+IC0xKSB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252S2V5LCAxKTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbmxpc3Q7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgY29udmVyc2F0aW9ubGlzdDogY29udmVyc2F0aW9ubGlzdCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZSAmJlxuICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkIHx8XG4gICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgPT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAmJlxuICAgICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLm1lbWJlcnNDb3VudCAhPT1cbiAgICAgICAgICAgICAgcHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgfHxcbiAgICAgICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUpKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwVG9VcGRhdGUgPSB0aGlzLmdyb3VwVG9VcGRhdGU7XG5cbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gZ3JvdXBUb1VwZGF0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSBjb252ZXJzYXRpb25MaXN0W2dyb3VwS2V5XTtcbiAgICAgICAgICBjb25zdCBuZXdHcm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cFRvVXBkYXRlLCB7XG4gICAgICAgICAgICBzY29wZTogZ3JvdXBUb1VwZGF0ZVtcInNjb3BlXCJdLFxuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBncm91cFRvVXBkYXRlW1wibWVtYmVyc0NvdW50XCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtncm91cGxpc3Q6IGdyb3Vwc30pO1xuXG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZSAmJlxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBUb0xlYXZlID0gcHJvcHMuZ3JvdXBUb0xlYXZlO1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0geyAuLi5jb252ZXJzYXRpb25MaXN0W2dyb3VwS2V5XSB9O1xuICAgICAgICAgIGNvbnN0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwVG9MZWF2ZVtcIm1lbWJlcnNDb3VudFwiXSkgLSAxO1xuXG4gICAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7Z3JvdXBsaXN0OiBncm91cHN9KTtcblxuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb0RlbGV0ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb0RlbGV0ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9EZWxldGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9EZWxldGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0RlbGV0ZSAmJlxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkICE9PSBwcm9wcy5ncm91cFRvRGVsZXRlLmd1aWRcbiAgICAgICkge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gY29udmVyc2F0aW9uTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5jb252ZXJzYXRpb25XaXRoLmd1aWQgPT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEpO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fQ0hBVFNfRk9VTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB1c2VyIHNlbmRzIG1lc3NhZ2UgY29udmVyc2F0aW9uTGlzdCBpcyB1cGRhdGVkIHdpdGggbGF0ZXN0IG1lc3NhZ2VcbiAgICAgKi9cbiAgICBpZiAodGhpcy5jaGVja0l0ZW1DaGFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtcImxhc3RNZXNzYWdlXCJdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgICAgY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlWzBdO1xuXG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KChjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYy5jb252ZXJzYXRpb25JZCA9PSBsYXN0TWVzc2FnZS5jb252ZXJzYXRpb25JZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gY29udmVyc2F0aW9uTGlzdFtjb252ZXJzYXRpb25LZXldO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbGFzdE1lc3NhZ2UsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEpO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrSXRlbUNoYW5nZSA9IGZhbHNlO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29udmVyc2F0aW9uUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuQ29udmVyc2F0aW9uc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgIC5idWlsZCgpO1xuICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnModGhpcy5jb252ZXJzYXRpb25VcGRhdGVkKTtcbiAgfVxuXG4gIGZldGNoTmV4dENvbnZlcnNhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb252ZXJzYXRpb25SZXF1ZXN0LmZldGNoTmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVycyBmb3IgcmVzcGVjdGl2ZSBmdW5jdGlvbmFsaXR5XG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKGNhbGxiYWNrKSB7XG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuVVNFUl9PTkxJTkUsIG9ubGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuVVNFUl9PRkZMSU5FLCBvZmZsaW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBjaGFuZ2VkR3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBraWNrZWRGcm9tLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBraWNrZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgYmFubmVkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVELCB1bmJhbm5lZEZyb20sIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVzZXJBZGRlZCxcbiAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIHVzZXJBZGRlZEluLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJMZWZ0OiAobWVzc2FnZSwgbGVhdmluZ1VzZXIsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQsIGdyb3VwLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBsZWF2aW5nVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckpvaW5lZDogKG1lc3NhZ2UsIGpvaW5lZFVzZXIsIGpvaW5lZEdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCwgam9pbmVkR3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGpvaW5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkTWVzc2FnZUxpc3RlbmVyKFxuICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5NZXNzYWdlTGlzdGVuZXIoe1xuICAgICAgICBvblRleHRNZXNzYWdlUmVjZWl2ZWQ6ICh0ZXh0TWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLlRFWFRfTUVTU0FHRV9SRUNFSVZFRCwgbnVsbCwgdGV4dE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lZGlhTWVzc2FnZVJlY2VpdmVkOiAobWVkaWFNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRCwgbnVsbCwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DdXN0b21NZXNzYWdlUmVjZWl2ZWQ6IChjdXN0b21NZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIGN1c3RvbU1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VEZWxldGVkOiAoZGVsZXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRVNTQUdFX0RFTEVURUQsIG51bGwsIGRlbGV0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRWRpdGVkOiAoZWRpdGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLk1FU1NBR0VfRURJVEVELCBudWxsLCBlZGl0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5DYWxsTGlzdGVuZXIoe1xuICAgICAgICBvbkluY29taW5nQ2FsbFJlY2VpdmVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQsIG51bGwsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRCwgbnVsbCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXJzIFJlbW92ZWRcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMuY29udmVyc2F0aW9uTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIENvbnZlcnNhdGlvbnMgRGV0YWlscyB3aXRoIGFsbCB0aGUgdXNlcnNcbiAgICovXG4gIGdldENvbnZlcnNhdGlvbigpIHtcbiAgICBuZXcgQ29tZXRDaGF0TWFuYWdlcigpXG4gICAgICAuZ2V0TG9nZ2VkSW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRDb252ZXJzYXRpb24oKVxuICAgICAgICAgIC50aGVuKChjb252ZXJzYXRpb25MaXN0KSA9PiB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LmZvckVhY2goKGNvbnZlcnNhdGlvbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmF2YXRhclxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5hdmF0YXIgPSB0aGlzLnNldEF2YXRhcihcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgICAgICAgICFjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5pY29uXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmljb24gPSB0aGlzLnNldEF2YXRhcihcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAoY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbS51aWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLnVpZCkgfHxcbiAgICAgICAgICAgICAgICAgIChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLnVucmVhZE1lc3NhZ2VDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IFtcbiAgICAgICAgICAgICAgLi4udGhpcy5jb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19DSEFUU19GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIltDb21ldENoYXRDb252ZXJzYXRpb25MaXN0XSBnZXRDb252ZXJzYXRpb25zIGZldGNoTmV4dCBlcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5FUlJPUjtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0Q29udmVyc2F0aW9uTGlzdF0gZ2V0Q29udmVyc2F0aW9ucyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBVc2VyIEF2YXRhciBJZiBBdmF0YXIgaXMgbm90IHByZXNlbnRcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRBdmF0YXIoY29udmVyc2F0aW9uKSB7XG4gICAgaWYgKFxuICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAhY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguYXZhdGFyXG4gICAgKSB7XG4gICAgICBjb25zdCB1aWQgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC51aWQ7XG4gICAgICBjb25zdCBjaGFyID0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcblxuICAgICAgLy8gcmV0dXJuIFN2Z0F2YXRhci5nZXRBdmF0YXIodWlkLCBjaGFyKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmljb25cbiAgICApIHtcbiAgICAgIGNvbnN0IGd1aWQgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkO1xuICAgICAgY29uc3QgY2hhciA9IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgIC8vIHJldHVybiBTdmdBdmF0YXIuZ2V0QXZhdGFyKGd1aWQsIGNoYXIpXG4gICAgfVxuICB9XG5cbiAgY29udmVyc2F0aW9uVXBkYXRlZCA9IChcbiAgICBrZXkgPSBudWxsLFxuICAgIGl0ZW0gPSBudWxsLFxuICAgIG1lc3NhZ2UgPSBudWxsLFxuICAgIG9wdGlvbnMgPSBudWxsXG4gICkgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT05MSU5FOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX09GRkxJTkU6IHtcbiAgICAgICAgdGhpcy51cGRhdGVVc2VyKGl0ZW0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVEVYVF9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgdGhpcy51cGRhdGVDb252ZXJzYXRpb24obWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVRFRDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEVEOlxuICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkVkaXRlZERlbGV0ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVEOlxuICAgICAgLy8gY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIC8vICAgdGhpcy51cGRhdGVDb252ZXJzYXRpb24obWVzc2FnZSwgZmFsc2UpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVEOlxuICAgICAgLy8gICB0aGlzLnVwZGF0ZUdyb3VwTWVtYmVyQWRkZWQobWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgICAvLyAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgLy8gY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgLy8gY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVDpcbiAgICAgIC8vICAgdGhpcy51cGRhdGVHcm91cE1lbWJlclJlbW92ZWQobWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgICAvLyAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDpcbiAgICAgIC8vICAgdGhpcy51cGRhdGVHcm91cE1lbWJlclNjb3BlQ2hhbmdlZChtZXNzYWdlLCBvcHRpb25zKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAvLyAgIHRoaXMudXBkYXRlR3JvdXBNZW1iZXJDaGFuZ2VkKG1lc3NhZ2UsIG9wdGlvbnMsIFwiaW5jcmVtZW50XCIpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgLy8gICB0aGlzLnVwZGF0ZUdyb3VwTWVtYmVyQ2hhbmdlZChtZXNzYWdlLCBvcHRpb25zLCBcIlwiKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBkZWZhdWx0OlxuICAgICAgLy8gICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgRGV0YWlsIHdoZW4gdXNlciBjb21lcyBvbmxpbmUvb2ZmbGluZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHVwZGF0ZVVzZXIodXNlcikge1xuICAgIC8vd2hlbiB1c2VyIHVwZGF0ZXNcbiAgICBjb25zdCBjb252ZXJzYXRpb25saXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG5cbiAgICAvL0dldHMgdGhlIGluZGV4IG9mIHVzZXIgd2hpY2ggY29tZXMgb2ZmbGluZS9vbmxpbmVcbiAgICBjb25zdCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25saXN0LmZpbmRJbmRleChcbiAgICAgIChjb252ZXJzYXRpb25PYmopID0+XG4gICAgICAgIGNvbnZlcnNhdGlvbk9iai5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgICBjb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uV2l0aC51aWQgPT09IHVzZXIudWlkXG4gICAgKTtcbiAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgIGxldCBjb252ZXJzYXRpb25PYmogPSB7IC4uLmNvbnZlcnNhdGlvbmxpc3RbY29udmVyc2F0aW9uS2V5XSB9O1xuICAgICAgbGV0IGNvbnZlcnNhdGlvbldpdGhPYmogPSB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iai5jb252ZXJzYXRpb25XaXRoLFxuICAgICAgICBzdGF0dXM6IHVzZXIuZ2V0U3RhdHVzKCksXG4gICAgICB9O1xuXG4gICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgIGNvbnZlcnNhdGlvbldpdGg6IGNvbnZlcnNhdGlvbldpdGhPYmosXG4gICAgICB9O1xuICAgICAgY29udmVyc2F0aW9ubGlzdC5zcGxpY2UoY29udmVyc2F0aW9uS2V5LCAxLCBuZXdDb252ZXJzYXRpb25PYmopO1xuXG4gICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25saXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBHZXRzIHRoZSBsYXN0IG1lc3NhZ2VcbiAgICogQHBhcmFtIGNvbnZlcnNhdGlvblxuICAgKi9cbiAgbWFrZUxhc3RNZXNzYWdlKG1lc3NhZ2UsIGNvbnZlcnNhdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgbmV3TWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2UpO1xuICAgIHJldHVybiBuZXdNZXNzYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFVwZGF0ZXMgQ29udmVyc2F0aW9ucyBhcyBUZXh0L0N1c3RvbSBNZXNzYWdlcyBhcmUgcmVjZWl2ZWRcbiAgICogQHBhcmFtXG4gICAqXG4gICAqL1xuICB1cGRhdGVDb252ZXJzYXRpb24obWVzc2FnZSwgbm90aWZpY2F0aW9uID0gdHJ1ZSkge1xuICAgIHRoaXMubWFrZUNvbnZlcnNhdGlvbihtZXNzYWdlKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uS2V5O1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSByZXNwb25zZS5jb252ZXJzYXRpb25PYmo7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSByZXNwb25zZS5jb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSB0aGlzLm1ha2VVbnJlYWRNZXNzYWdlQ291bnQoY29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICBsZXQgbGFzdE1lc3NhZ2VPYmogPSB0aGlzLm1ha2VMYXN0TWVzc2FnZShtZXNzYWdlLCBjb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICBsYXN0TWVzc2FnZTogbGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICB1bnJlYWRNZXNzYWdlQ291bnQ6IHVucmVhZE1lc3NhZ2VDb3VudCxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoY29udmVyc2F0aW9uS2V5LCAxKTtcbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnVuc2hpZnQobmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHVucmVhZE1lc3NhZ2VDb3VudCA9IHRoaXMubWFrZVVucmVhZE1lc3NhZ2VDb3VudCgpO1xuICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IHRoaXMubWFrZUxhc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICBsYXN0TWVzc2FnZTogbGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICB1bnJlYWRNZXNzYWdlQ291bnQ6IHVucmVhZE1lc3NhZ2VDb3VudCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3QudW5zaGlmdChuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG5cbiAgICAgICAgICBpZiAobm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJUaGlzIGlzIGFuIGVycm9yIGluIGNvbnZlcnRpbmcgbWVzc2FnZSB0byBjb252ZXJzYXRpb25cIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogR2V0cyBUaGUgQ291bnQgb2YgVW5yZWFkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWFrZVVucmVhZE1lc3NhZ2VDb3VudChjb252ZXJzYXRpb246IGFueSA9IHt9LCBvcGVyYXRvciA9IG51bGwpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoY29udmVyc2F0aW9uKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSBwYXJzZUludChjb252ZXJzYXRpb24udW5yZWFkTWVzc2FnZUNvdW50KTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uICYmXG4gICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uSWRcbiAgICApIHtcbiAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IDA7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICh0aGlzLml0ZW0gJiZcbiAgICAgICAgdGhpcy5pdGVtLmhhc093blByb3BlcnR5KFwiZ3VpZFwiKSAmJlxuICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5oYXNPd25Qcm9wZXJ0eShcImd1aWRcIikgJiZcbiAgICAgICAgdGhpcy5pdGVtLmd1aWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmd1aWQpIHx8XG4gICAgICAodGhpcy5pdGVtICYmXG4gICAgICAgIHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSAmJlxuICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSAmJlxuICAgICAgICB0aGlzLml0ZW0udWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC51aWQpXG4gICAgKSB7XG4gICAgICB1bnJlYWRNZXNzYWdlQ291bnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3BlcmF0b3IgJiYgb3BlcmF0b3IgPT09IFwiZGVjcmVtZW50XCIpIHtcbiAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gdW5yZWFkTWVzc2FnZUNvdW50ID8gdW5yZWFkTWVzc2FnZUNvdW50IC0gMSA6IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bnJlYWRNZXNzYWdlQ291bnQgPSB1bnJlYWRNZXNzYWdlQ291bnQgKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bnJlYWRNZXNzYWdlQ291bnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyBkZXRhaWwgb2YgY29udmVyc2F0aW9uc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIG1ha2VDb252ZXJzYXRpb24obWVzc2FnZSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDb21ldENoYXQuQ29tZXRDaGF0SGVscGVyLmdldENvbnZlcnNhdGlvbkZyb21NZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICAgIGxldCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgKGMpID0+IGMuY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgY29udmVyc2F0aW9uT2JqID0geyAuLi5jb252ZXJzYXRpb24gfTtcbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbk9iaiA9IHsgLi4uY29udmVyc2F0aW9uTGlzdFtjb252ZXJzYXRpb25LZXldIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25LZXk6IGNvbnZlcnNhdGlvbktleSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbk9iajogY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdDogY29udmVyc2F0aW9uTGlzdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBDb252ZXJzYXRpb24gVmlldyB3aGVuIG1lc3NhZ2UgaXMgZWRpdGVkIG9yIGRlbGV0ZWRcbiAgICovXG4gIGNvbnZlcnNhdGlvbkVkaXRlZERlbGV0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMubWFrZUNvbnZlcnNhdGlvbihtZXNzYWdlKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uS2V5O1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSByZXNwb25zZS5jb252ZXJzYXRpb25PYmo7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSByZXNwb25zZS5jb252ZXJzYXRpb25MaXN0O1xuICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICBsZXQgbGFzdE1lc3NhZ2VPYmogPSBjb252ZXJzYXRpb25PYmoubGFzdE1lc3NhZ2U7XG5cbiAgICAgICAgICBpZiAobGFzdE1lc3NhZ2VPYmouaWQgPT09IG1lc3NhZ2UuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xhc3RNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIGxhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnZlcnNhdGlvbk9iaiwge1xuICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbmV3TGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSwgbmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlRoaXMgaXMgYW4gZXJyb3IgaW4gY29udmVydGluZyBtZXNzYWdlIHRvIGNvbnZlcnNhdGlvblwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBVc2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY3VycmVudCBDb252ZXJzYXRpb24gbGlzdCB0aGFuIGZldGNoIG5leHQgaXRlbXMgb2YgdGhlIENvbnZlcnNhdGlvbiBsaXN0IGFuZCBhcHBlbmRcbiAgICogQHBhcmFtIEV2ZW50IGVcbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcbiAgICBpZiAoYm90dG9tKSB7XG4gICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIFVzZXIgb24gVXNlciBDbGlja1xuICAgKiBAcGFyYW0gdXNlclxuICAgKi9cblxuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHVzZXIpO1xuICB9XG4gIC8qKlxuICAgKiBQbGF5cyBBdWRpbyBXaGVuIE1lc3NhZ2UgaXMgUmVjZWl2ZWRcbiAgICovXG4gIHBsYXlBdWRpbygpIHtcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICBhdWRpby5zcmMgPSBJTkNPTUlOR19PVEhFUl9NRVNTQUdFX1NPVU5EO1xuICAgIGF1ZGlvLnBsYXkoKTtcbiAgfVxufVxuIl19