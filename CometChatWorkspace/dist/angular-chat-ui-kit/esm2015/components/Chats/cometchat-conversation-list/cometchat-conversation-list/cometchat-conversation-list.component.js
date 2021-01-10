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
        }
        else if (conversation.conversationType === "group" &&
            !conversation.conversationWith.icon) {
            /** @type {?} */
            const guid = conversation.conversationWith.guid;
            /** @type {?} */
            const char = conversation.conversationWith.name.charAt(0).toUpperCase();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NoYXRzL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sa0NBQWtDOzs7O0lBMEI3QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXpCakMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTlCLHFCQUFnQixHQUFXLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIs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Qjs7SUFDcEIsOERBQXNCOztJQUN0Qix5REFBbUI7O0lBQ25CLGtFQUFpQzs7SUFDakMscUVBQXdCOztJQUN4Qiw2REFBaUM7O0lBRWpDLGlFQUEyQjs7SUFFM0Isb0VBQTREOztJQUM1RCw0REFBeUQ7O0lBQ3pELDZEQUEyRDs7SUFDM0QsNERBQXlEOztJQUV6RCxtREFBc0M7O0lBNmF0QyxpRUFzQkU7Ozs7O0lBamNVLGlEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IElOQ09NSU5HX09USEVSX01FU1NBR0VfU09VTkQgfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2F1ZGlvL2luY29taW5nT3RoZXJNZXNzYWdlU291bmRcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxhc3RNZXNzYWdlO1xuICBAT3V0cHV0KCkgb25Vc2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBncm91cFRvVXBkYXRlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0xlYXZlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0RlbGV0ZSA9IG51bGw7XG5cbiAgZGVjb3JhdG9yTWVzc2FnZTogc3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGNvbnZlcnNhdGlvbkxpc3QgPSBbXTtcbiAgb25JdGVtQ2xpY2sgPSBudWxsO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbiA9IHVuZGVmaW5lZDtcbiAgQ29udmVyc2F0aW9uTGlzdE1hbmFnZXI7XG4gIGNoZWNrSXRlbUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnZlcnNhdGlvblJlcXVlc3QgPSBudWxsO1xuXG4gIGNvbnZlcnNhdGlvbkxpc3RlbmVySWQgPSBcImNoYXRsaXN0X1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHVzZXJMaXN0ZW5lcklkID0gXCJjaGF0bGlzdF91c2VyX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IFwiY2hhdGxpc3RfZ3JvdXBfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY2FsbExpc3RlbmVySWQgPSBcImNoYXRsaXN0X2NhbGxfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBDSEFUUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNIQVRTO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDE1MDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdKSB7XG4gICAgICB0aGlzLmNoZWNrSXRlbUNoYW5nZSA9IHRydWU7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUgJiZcbiAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIHRoaXMuY2hhdExpc3RSZWYuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9ubGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuXG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gY29udmVyc2F0aW9ubGlzdC5maW5kKChjKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChjLmNvbnZlcnNhdGlvblR5cGUgPT09IHRoaXMudHlwZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSB0aGlzLml0ZW0udWlkKSB8fFxuICAgICAgICAgICAgICAoYy5jb252ZXJzYXRpb25UeXBlID09PSB0aGlzLnR5cGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uT2JqKSB7XG4gICAgICAgICAgICBsZXQgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9ubGlzdC5pbmRleE9mKGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25saXN0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbiA9IG5ld0NvbnZlcnNhdGlvbk9iajtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB1c2VyIGlzIGJsb2NrZWQvdW5ibG9ja2VkLCB1cGRhdGUgY29udmVyc2F0aW9ubGlzdCBpLmUgdXNlciBpcyByZW1vdmVkIGZyb20gY29udmVyc2F0aW9uTGlzdFxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMoY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlKS5sZW5ndGggJiZcbiAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUudWlkID09PVxuICAgICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUudWlkICYmXG4gICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlLmJsb2NrZWRCeU1lICE9PVxuICAgICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUuYmxvY2tlZEJ5TWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgICAgICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgICAgICAgbGV0IGNvbnZLZXkgPSBjb252ZXJzYXRpb25saXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjLCBrKSA9PlxuICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC51aWQgPT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlLnVpZFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGNvbnZLZXkgPiAtMSkge1xuICAgICAgICAgICAgY29udmVyc2F0aW9ubGlzdC5zcGxpY2UoY29udktleSwgMSk7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25saXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9VcGRhdGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb1VwZGF0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9VcGRhdGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb1VwZGF0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9VcGRhdGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvVXBkYXRlICYmXG4gICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkICE9PSBwcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgfHxcbiAgICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkICYmXG4gICAgICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50ICE9PVxuICAgICAgICAgICAgICBwcm9wcy5ncm91cFRvVXBkYXRlLm1lbWJlcnNDb3VudCB8fFxuICAgICAgICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5zY29wZSAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5zY29wZSkpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBUb1VwZGF0ZSA9IHRoaXMuZ3JvdXBUb1VwZGF0ZTtcblxuICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBncm91cFRvVXBkYXRlLmd1aWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IGNvbnZlcnNhdGlvbkxpc3RbZ3JvdXBLZXldO1xuICAgICAgICAgIGNvbnN0IG5ld0dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIGdyb3VwVG9VcGRhdGUsIHtcbiAgICAgICAgICAgIHNjb3BlOiBncm91cFRvVXBkYXRlW1wic2NvcGVcIl0sXG4gICAgICAgICAgICBtZW1iZXJzQ291bnQ6IGdyb3VwVG9VcGRhdGVbXCJtZW1iZXJzQ291bnRcIl0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuXG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZSAmJlxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBUb0xlYXZlID0gcHJvcHMuZ3JvdXBUb0xlYXZlO1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0geyAuLi5jb252ZXJzYXRpb25MaXN0W2dyb3VwS2V5XSB9O1xuICAgICAgICAgIGNvbnN0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwVG9MZWF2ZVtcIm1lbWJlcnNDb3VudFwiXSkgLSAxO1xuXG4gICAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG5cbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb0RlbGV0ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvRGVsZXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0RlbGV0ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvRGVsZXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0RlbGV0ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9EZWxldGUgJiZcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBwcm9wcy5ncm91cFRvRGVsZXRlLmd1aWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxKTtcblxuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG5cbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19DSEFUU19GT1VORDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHVzZXIgc2VuZHMgbWVzc2FnZSBjb252ZXJzYXRpb25MaXN0IGlzIHVwZGF0ZWQgd2l0aCBsYXRlc3QgbWVzc2FnZVxuICAgICAqL1xuICAgIGlmICh0aGlzLmNoZWNrSXRlbUNoYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJsYXN0TWVzc2FnZVwiXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0ucHJldmlvdXNWYWx1ZSAhPT1cbiAgICAgICAgICBjaGFuZ2VbXCJsYXN0TWVzc2FnZVwiXS5jdXJyZW50VmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBjaGFuZ2VbXCJsYXN0TWVzc2FnZVwiXS5jdXJyZW50VmFsdWVbMF07XG5cbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9uTGlzdC5maW5kSW5kZXgoKGMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjLmNvbnZlcnNhdGlvbklkID09IGxhc3RNZXNzYWdlLmNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSBjb252ZXJzYXRpb25MaXN0W2NvbnZlcnNhdGlvbktleV07XG4gICAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSk7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnVuc2hpZnQobmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tJdGVtQ2hhbmdlID0gZmFsc2U7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb252ZXJzYXRpb25SZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Db252ZXJzYXRpb25zUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgLmJ1aWxkKCk7XG4gICAgdGhpcy5nZXRDb252ZXJzYXRpb24oKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLmNvbnZlcnNhdGlvblVwZGF0ZWQpO1xuICB9XG5cbiAgZmV0Y2hOZXh0Q29udmVyc2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnNhdGlvblJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXJzIGZvciByZXNwZWN0aXZlIGZ1bmN0aW9uYWxpdHlcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBhdHRhY2hMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICBDb21ldENoYXQuYWRkVXNlckxpc3RlbmVyKFxuICAgICAgdGhpcy51c2VyTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuVXNlckxpc3RlbmVyKHtcbiAgICAgICAgb25Vc2VyT25saW5lOiAob25saW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIGNvbWVzIG9ubGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5VU0VSX09OTElORSwgb25saW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5VU0VSX09GRkxJTkUsIG9mZmxpbmVVc2VyKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIENvbWV0Q2hhdC5hZGRHcm91cExpc3RlbmVyKFxuICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICBvbkdyb3VwTWVtYmVyU2NvcGVDaGFuZ2VkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICBuZXdTY29wZSxcbiAgICAgICAgICBvbGRTY29wZSxcbiAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsIGNoYW5nZWRHcm91cCwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICBzY29wZTogbmV3U2NvcGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIGtpY2tlZEZyb20sIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELCBiYW5uZWRGcm9tLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyVW5iYW5uZWQ6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVuYmFubmVkVXNlcixcbiAgICAgICAgICB1bmJhbm5lZEJ5LFxuICAgICAgICAgIHVuYmFubmVkRnJvbVxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsIHVuYmFubmVkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogdW5iYW5uZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lbWJlckFkZGVkVG9Hcm91cDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgIHVzZXJBZGRlZEJ5LFxuICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgdXNlckFkZGVkSW4sIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgZ3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGxlYXZpbmdVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBqb2luZWRHcm91cCwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogam9pbmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIENvbWV0Q2hhdC5hZGRNZXNzYWdlTGlzdGVuZXIoXG4gICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgIG9uVGV4dE1lc3NhZ2VSZWNlaXZlZDogKHRleHRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuVEVYVF9NRVNTQUdFX1JFQ0VJVkVELCBudWxsLCB0ZXh0TWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVkaWFNZXNzYWdlUmVjZWl2ZWQ6IChtZWRpYU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVELCBudWxsLCBtZWRpYU1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbkN1c3RvbU1lc3NhZ2VSZWNlaXZlZDogKGN1c3RvbU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRCwgbnVsbCwgY3VzdG9tTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVzc2FnZURlbGV0ZWQ6IChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLk1FU1NBR0VfREVMRVRFRCwgbnVsbCwgZGVsZXRlZE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VFZGl0ZWQ6IChlZGl0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVTU0FHRV9FRElURUQsIG51bGwsIGVkaXRlZE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZENhbGxMaXN0ZW5lcihcbiAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LkNhbGxMaXN0ZW5lcih7XG4gICAgICAgIG9uSW5jb21pbmdDYWxsUmVjZWl2ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuSU5DT01JTkdfQ0FMTF9SRUNFSVZFRCwgbnVsbCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5jb21pbmdDYWxsQ2FuY2VsbGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBudWxsLCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lcnMgUmVtb3ZlZFxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5jb252ZXJzYXRpb25MaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlQ2FsbExpc3RlbmVyKHRoaXMuY2FsbExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgQ29udmVyc2F0aW9ucyBEZXRhaWxzIHdpdGggYWxsIHRoZSB1c2Vyc1xuICAgKi9cbiAgZ2V0Q29udmVyc2F0aW9uKCkge1xuICAgIG5ldyBDb21ldENoYXRNYW5hZ2VyKClcbiAgICAgIC5nZXRMb2dnZWRJblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLmZldGNoTmV4dENvbnZlcnNhdGlvbigpXG4gICAgICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3QuZm9yRWFjaCgoY29udmVyc2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICAgICAgICAhY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguYXZhdGFyXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmF2YXRhciA9IHRoaXMuc2V0QXZhdGFyKFxuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmljb25cbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaWNvbiA9IHRoaXMuc2V0QXZhdGFyKFxuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW0gIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkKSB8fFxuICAgICAgICAgICAgICAgICAgKGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLmd1aWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmd1aWQpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24udW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gW1xuICAgICAgICAgICAgICAuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3QsXG4gICAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbkxpc3QsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udmVyc2F0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX0NIQVRTX0ZPVU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5FUlJPUjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiW0NvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RdIGdldENvbnZlcnNhdGlvbnMgZmV0Y2hOZXh0IGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRDb252ZXJzYXRpb25MaXN0XSBnZXRDb252ZXJzYXRpb25zIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIFVzZXIgQXZhdGFyIElmIEF2YXRhciBpcyBub3QgcHJlc2VudFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldEF2YXRhcihjb252ZXJzYXRpb24pIHtcbiAgICBpZiAoXG4gICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICFjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5hdmF0YXJcbiAgICApIHtcbiAgICAgIGNvbnN0IHVpZCA9IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLnVpZDtcbiAgICAgIGNvbnN0IGNoYXIgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAhY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaWNvblxuICAgICkge1xuICAgICAgY29uc3QgZ3VpZCA9IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmd1aWQ7XG4gICAgICBjb25zdCBjaGFyID0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJzYXRpb25VcGRhdGVkID0gKFxuICAgIGtleSA9IG51bGwsXG4gICAgaXRlbSA9IG51bGwsXG4gICAgbWVzc2FnZSA9IG51bGwsXG4gICAgb3B0aW9ucyA9IG51bGxcbiAgKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9PTkxJTkU6XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT0ZGTElORToge1xuICAgICAgICB0aGlzLnVwZGF0ZVVzZXIoaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICBjYXNlIGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnZlcnNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVEVEOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURUQ6XG4gICAgICAgIHRoaXMuY29udmVyc2F0aW9uRWRpdGVkRGVsZXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIERldGFpbCB3aGVuIHVzZXIgY29tZXMgb25saW5lL29mZmxpbmVcbiAgICogQHBhcmFtXG4gICAqL1xuICB1cGRhdGVVc2VyKHVzZXIpIHtcbiAgICAvL3doZW4gdXNlciB1cGRhdGVzXG4gICAgY29uc3QgY29udmVyc2F0aW9ubGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuXG4gICAgLy9HZXRzIHRoZSBpbmRleCBvZiB1c2VyIHdoaWNoIGNvbWVzIG9mZmxpbmUvb25saW5lXG4gICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9ubGlzdC5maW5kSW5kZXgoXG4gICAgICAoY29udmVyc2F0aW9uT2JqKSA9PlxuICAgICAgICBjb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgY29udmVyc2F0aW9uT2JqLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSB1c2VyLnVpZFxuICAgICk7XG4gICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICBsZXQgY29udmVyc2F0aW9uT2JqID0geyAuLi5jb252ZXJzYXRpb25saXN0W2NvbnZlcnNhdGlvbktleV0gfTtcbiAgICAgIGxldCBjb252ZXJzYXRpb25XaXRoT2JqID0ge1xuICAgICAgICAuLi5jb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uV2l0aCxcbiAgICAgICAgc3RhdHVzOiB1c2VyLmdldFN0YXR1cygpLFxuICAgICAgfTtcblxuICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICBjb252ZXJzYXRpb25XaXRoOiBjb252ZXJzYXRpb25XaXRoT2JqLFxuICAgICAgfTtcbiAgICAgIGNvbnZlcnNhdGlvbmxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSwgbmV3Q29udmVyc2F0aW9uT2JqKTtcblxuICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9ubGlzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogR2V0cyB0aGUgbGFzdCBtZXNzYWdlXG4gICAqIEBwYXJhbSBjb252ZXJzYXRpb25cbiAgICovXG4gIG1ha2VMYXN0TWVzc2FnZShtZXNzYWdlLCBjb252ZXJzYXRpb24gPSB7fSkge1xuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlKTtcbiAgICByZXR1cm4gbmV3TWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBVcGRhdGVzIENvbnZlcnNhdGlvbnMgYXMgVGV4dC9DdXN0b20gTWVzc2FnZXMgYXJlIHJlY2VpdmVkXG4gICAqIEBwYXJhbVxuICAgKlxuICAgKi9cbiAgdXBkYXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UsIG5vdGlmaWNhdGlvbiA9IHRydWUpIHtcbiAgICB0aGlzLm1ha2VDb252ZXJzYXRpb24obWVzc2FnZSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbktleTtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gcmVzcG9uc2UuY29udmVyc2F0aW9uT2JqO1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gdGhpcy5tYWtlVW5yZWFkTWVzc2FnZUNvdW50KGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgbGV0IGxhc3RNZXNzYWdlT2JqID0gdGhpcy5tYWtlTGFzdE1lc3NhZ2UobWVzc2FnZSwgY29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGxhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiB1bnJlYWRNZXNzYWdlQ291bnQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSk7XG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgIGlmIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSB0aGlzLm1ha2VVbnJlYWRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgICBsZXQgbGFzdE1lc3NhZ2VPYmogPSB0aGlzLm1ha2VMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGxhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiB1bnJlYWRNZXNzYWdlQ291bnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnVuc2hpZnQobmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiVGhpcyBpcyBhbiBlcnJvciBpbiBjb252ZXJ0aW5nIG1lc3NhZ2UgdG8gY29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEdldHMgVGhlIENvdW50IG9mIFVucmVhZCBNZXNzYWdlc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIG1ha2VVbnJlYWRNZXNzYWdlQ291bnQoY29udmVyc2F0aW9uOiBhbnkgPSB7fSwgb3BlcmF0b3IgPSBudWxsKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGNvbnZlcnNhdGlvbikubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gcGFyc2VJbnQoY29udmVyc2F0aW9uLnVucmVhZE1lc3NhZ2VDb3VudCk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbiAmJlxuICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgKSB7XG4gICAgICB1bnJlYWRNZXNzYWdlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAodGhpcy5pdGVtICYmXG4gICAgICAgIHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcImd1aWRcIikgJiZcbiAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaGFzT3duUHJvcGVydHkoXCJndWlkXCIpICYmXG4gICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkKSB8fFxuICAgICAgKHRoaXMuaXRlbSAmJlxuICAgICAgICB0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikgJiZcbiAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaGFzT3duUHJvcGVydHkoXCJ1aWRcIikgJiZcbiAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkKVxuICAgICkge1xuICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wZXJhdG9yICYmIG9wZXJhdG9yID09PSBcImRlY3JlbWVudFwiKSB7XG4gICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IHVucmVhZE1lc3NhZ2VDb3VudCA/IHVucmVhZE1lc3NhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gdW5yZWFkTWVzc2FnZUNvdW50ICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5yZWFkTWVzc2FnZUNvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgZGV0YWlsIG9mIGNvbnZlcnNhdGlvbnNcbiAgICogQHBhcmFtXG4gICAqL1xuICBtYWtlQ29udmVyc2F0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgQ29tZXRDaGF0LkNvbWV0Q2hhdEhlbHBlci5nZXRDb252ZXJzYXRpb25Gcm9tTWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgIGxldCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjKSA9PiBjLmNvbnZlcnNhdGlvbklkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uSWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbk9iaiA9IHsgLi4uY29udmVyc2F0aW9uIH07XG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25PYmogPSB7IC4uLmNvbnZlcnNhdGlvbkxpc3RbY29udmVyc2F0aW9uS2V5XSB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uS2V5OiBjb252ZXJzYXRpb25LZXksXG4gICAgICAgICAgICBjb252ZXJzYXRpb25PYmo6IGNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Q6IGNvbnZlcnNhdGlvbkxpc3QsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ29udmVyc2F0aW9uIFZpZXcgd2hlbiBtZXNzYWdlIGlzIGVkaXRlZCBvciBkZWxldGVkXG4gICAqL1xuICBjb252ZXJzYXRpb25FZGl0ZWREZWxldGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1ha2VDb252ZXJzYXRpb24obWVzc2FnZSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbktleTtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gcmVzcG9uc2UuY29udmVyc2F0aW9uT2JqO1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IGxhc3RNZXNzYWdlT2JqID0gY29udmVyc2F0aW9uT2JqLmxhc3RNZXNzYWdlO1xuXG4gICAgICAgICAgaWYgKGxhc3RNZXNzYWdlT2JqLmlkID09PSBtZXNzYWdlLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdMYXN0TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSBPYmplY3QuYXNzaWduKHt9LCBjb252ZXJzYXRpb25PYmosIHtcbiAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IG5ld0xhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJUaGlzIGlzIGFuIGVycm9yIGluIGNvbnZlcnRpbmcgbWVzc2FnZSB0byBjb252ZXJzYXRpb25cIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgVXNlciBzY3JvbGxzIHRvIHRoZSBib3R0b20gb2YgdGhlIGN1cnJlbnQgQ29udmVyc2F0aW9uIGxpc3QgdGhhbiBmZXRjaCBuZXh0IGl0ZW1zIG9mIHRoZSBDb252ZXJzYXRpb24gbGlzdCBhbmQgYXBwZW5kXG4gICAqIEBwYXJhbSBFdmVudCBlXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG4gICAgaWYgKGJvdHRvbSkge1xuICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gICAgICB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBVc2VyIG9uIFVzZXIgQ2xpY2tcbiAgICogQHBhcmFtIHVzZXJcbiAgICovXG5cbiAgdXNlckNsaWNrZWQodXNlcikge1xuICAgIHRoaXMub25Vc2VyQ2xpY2suZW1pdCh1c2VyKTtcbiAgfVxuICAvKipcbiAgICogUGxheXMgQXVkaW8gV2hlbiBNZXNzYWdlIGlzIFJlY2VpdmVkXG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgYXVkaW8uc3JjID0gSU5DT01JTkdfT1RIRVJfTUVTU0FHRV9TT1VORDtcbiAgICBhdWRpby5wbGF5KCk7XG4gIH1cbn1cbiJdfQ==