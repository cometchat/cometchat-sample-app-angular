/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/CometChat-conversation-list/cometchat-conversation-list/cometchat-conversation-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { INCOMING_OTHER_MESSAGE_SOUND } from "../../../../resources/audio/incomingOtherMessageSound";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatConversationListComponent {
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
        this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
        this.loggedInUser = null;
        this.conversationList = [];
        this.onItemClick = null;
        this.selectedConversation = undefined;
        this.checkItemChange = false;
        this.conversationRequest = null;
        this.conversationListenerId = enums.CHAT_LIST_ + new Date().getTime();
        this.userListenerId = enums.CHAT_LIST_USER_ + new Date().getTime();
        this.groupListenerId = enums.CHAT_LIST_GROUP_ + new Date().getTime();
        this.callListenerId = enums.CHAT_LIST_CALL_ + new Date().getTime();
        this.CHATS = COMETCHAT_CONSTANTS.CHATS;
        /**
         * Updates the conversation list's last message , badgeCount , user presence based on activities propagated by listeners
         */
        this.conversationUpdated = (/**
         * @param {?=} key
         * @param {?=} item
         * @param {?=} message
         * @param {?=} options
         * @return {?}
         */
        (key = null, item = null, message = null, options = null) => {
            try {
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
            }
            catch (error) {
                logger(error);
            }
        });
        setInterval((/**
         * @return {?}
         */
        () => {
            if (!this.ref[enums.DESTROYED]) {
                this.ref.detectChanges();
            }
        }), 1500);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            this.removeListeners();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                this.checkItemChange = true;
                if (change[enums.ITEM].previousValue !==
                    change[enums.ITEM].currentValue &&
                    change[enums.ITEM].currentValue) {
                    if (Object.keys(change[enums.ITEM].currentValue).length === 0) {
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
                                this.type === CometChat.RECEIVER_TYPE.USER &&
                                c.conversationWith.uid === this.item.uid) ||
                                (c.conversationType === this.type &&
                                    this.type === CometChat.RECEIVER_TYPE.GROUP &&
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
                    if (change[enums.ITEM].previousValue &&
                        Object.keys(change[enums.ITEM].previousValue).length &&
                        change[enums.ITEM].previousValue.uid ===
                            change[enums.ITEM].currentValue.uid &&
                        change[enums.ITEM].previousValue.blockedByMe !==
                            change[enums.ITEM].currentValue.blockedByMe) {
                        /** @type {?} */
                        let conversationlist = [...this.conversationList];
                        //search for user
                        /** @type {?} */
                        let convKey = conversationlist.findIndex((/**
                         * @param {?} c
                         * @param {?} k
                         * @return {?}
                         */
                        (c, k) => c.conversationType === CometChat.RECEIVER_TYPE.USER &&
                            c.conversationWith.uid === change[enums.ITEM].currentValue.uid));
                        if (convKey > -1) {
                            conversationlist.splice(convKey, 1);
                            this.conversationList = conversationlist;
                        }
                    }
                }
            }
            if (change[enums.GROUP_TO_UPDATE]) {
                /** @type {?} */
                let prevProps = { groupToUpdate: null };
                /** @type {?} */
                let props = { groupToUpdate: null };
                prevProps[enums.GROUP_TO_UPDATE] =
                    change[enums.GROUP_TO_UPDATE].previousValue;
                props[enums.GROUP_TO_UPDATE] =
                    change[enums.GROUP_TO_UPDATE].currentValue;
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
                            scope: groupToUpdate[enums.SCOPE],
                            membersCount: groupToUpdate[enums.MEMBERS_COUNT],
                        });
                        conversationList.splice(groupKey, 1, newGroupObj);
                        this.conversationList = conversationList;
                    }
                }
            }
            if (change[enums.GROUP_TO_LEAVE]) {
                /** @type {?} */
                let prevProps = { groupToLeave: null };
                /** @type {?} */
                let props = { groupToLeave: null };
                prevProps[enums.GROUP_TO_LEAVE] =
                    change[enums.GROUP_TO_LEAVE].previousValue;
                props[enums.GROUP_TO_LEAVE] = change[enums.GROUP_TO_LEAVE].currentValue;
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
                        const membersCount = parseInt(groupToLeave[enums.MEMBERS_COUNT]) - 1;
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
            if (change[enums.GROUP_TO_DELETE]) {
                /** @type {?} */
                let prevProps = { groupToDelete: null };
                /** @type {?} */
                let props = { groupToDelete: null };
                prevProps[enums.GROUP_TO_DELETE] =
                    change[enums.GROUP_TO_DELETE].previousValue;
                props[enums.GROUP_TO_DELETE] =
                    change[enums.GROUP_TO_DELETE].currentValue;
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
                            this.decoratorMessage = COMETCHAT_CONSTANTS.NO_CHATS_FOUND;
                        }
                    }
                }
            }
            /**
             * When user sends message conversationList is updated with latest message
             */
            if (this.checkItemChange === false) {
                if (change[enums.LAST_MESSAGE]) {
                    if (change[enums.LAST_MESSAGE].previousValue !==
                        change[enums.LAST_MESSAGE].currentValue &&
                        change[enums.LAST_MESSAGE].currentValue !== undefined) {
                        /** @type {?} */
                        const lastMessage = change[enums.LAST_MESSAGE].currentValue[0];
                        /** @type {?} */
                        const conversationList = [...this.conversationList];
                        /** @type {?} */
                        const conversationKey = conversationList.findIndex((/**
                         * @param {?} c
                         * @return {?}
                         */
                        (c) => {
                            if (lastMessage === undefined) {
                                return false;
                            }
                            return c.conversationId === lastMessage.conversationId;
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.conversationRequest = new CometChat.ConversationsRequestBuilder()
                .setLimit(30)
                .build();
            this.getConversation();
            this.attachListeners(this.conversationUpdated);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches the coversation based on the conversationRequest config
     * @return {?}
     */
    fetchNextConversation() {
        try {
            return this.conversationRequest.fetchNext();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * attaches Listeners for user activity , group activities and calling
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes all listeners
     * @return {?}
     */
    removeListeners() {
        try {
            CometChat.removeMessageListener(this.conversationListenerId);
            CometChat.removeUserListener(this.userListenerId);
            CometChat.removeGroupListener(this.groupListenerId);
            CometChat.removeCallListener(this.callListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches Conversations Details with all the users
     * @return {?}
     */
    getConversation() {
        try {
            CometChat.getLoggedinUser()
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
                        if (this.type !== null &&
                            this.item !== null &&
                            this.type === conversation.conversationType) {
                            if ((conversation.conversationType ===
                                CometChat.RECEIVER_TYPE.USER &&
                                this.item.uid === conversation.conversationWith.uid) ||
                                (conversation.conversationType ===
                                    CometChat.RECEIVER_TYPE.GROUP &&
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
                        this.decoratorMessage = COMETCHAT_CONSTANTS.NO_CHATS_FOUND;
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
                    this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                    logger("[CometChatConversationList] getConversations fetchNext error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                logger("[CometChatConversationList] getConversations getLoggedInUser error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates Detail when user comes online/offline
     * @param {?} user
     * @return {?}
     */
    updateUser(user) {
        try {
            //when user updates
            /** @type {?} */
            const conversationlist = [...this.conversationList];
            //Gets the index of user which comes offline/online
            /** @type {?} */
            const conversationKey = conversationlist.findIndex((/**
             * @param {?} conversationObj
             * @return {?}
             */
            (conversationObj) => conversationObj.conversationType === CometChat.RECEIVER_TYPE.USER &&
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
        catch (error) {
            logger(error);
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
        try {
            /** @type {?} */
            const newMessage = Object.assign({}, message);
            return newMessage;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param {?} message
     * @param {?=} notification
     * @return {?}
     */
    updateConversation(message, notification = true) {
        try {
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
                logger("This is an error in converting message to conversation", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *
     * Gets The Count of Unread Messages
     * @param {?=} conversation
     * @param {?=} operator
     * @return {?}
     */
    makeUnreadMessageCount(conversation = {}, operator = null) {
        try {
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
                this.item.hasOwnProperty(enums.GUID) &&
                conversation.conversationWith.hasOwnProperty(enums.GUID) &&
                this.item.guid === conversation.conversationWith.guid) ||
                (this.item &&
                    this.item.hasOwnProperty(enums.UID) &&
                    conversation.conversationWith.hasOwnProperty(enums.UID) &&
                    this.item.uid === conversation.conversationWith.uid)) {
                unreadMessageCount = 0;
            }
            else {
                if (operator && operator === enums.DECREMENT) {
                    unreadMessageCount = unreadMessageCount ? unreadMessageCount - 1 : 0;
                }
                else {
                    unreadMessageCount = unreadMessageCount + 1;
                }
            }
            return unreadMessageCount;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Changes detail of conversations
     * @param {?} message
     * @return {?}
     */
    makeConversation(message) {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates Conversation View when message is edited or deleted
     * @param {?} message
     * @return {?}
     */
    conversationEditedDeleted(message) {
        try {
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
                logger("This is an error in converting message to conversation", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
                Math.round(e.currentTarget.clientHeight);
            if (bottom) {
                this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
                this.getConversation();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits User on User Click
     * @param {?} user
     * @return {?}
     */
    userClicked(user) {
        try {
            this.onUserClick.emit(user);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Plays Audio When Message is Received
     * @return {?}
     */
    playAudio() {
        try {
            /** @type {?} */
            let audio = new Audio();
            audio.src = INCOMING_OTHER_MESSAGE_SOUND;
            audio.play();
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatConversationListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-conversation-list",
                template: "<div class=\"chatWrapperStyle\">\n  <div class=\"chatsHeaderStyle\">\n    <!--Close Btn-->\n    <h4 class=\"chatsHeaderTitleStyle\">{{ CHATS }}</h4>\n    <div></div>\n  </div>\n  <!--Message Container-->\n  <div class=\"chatsMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n    <p class=\"chatsMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"chatsListStyle\" (scroll)=\"handleScroll($event)\">\n    <!--Conversation List-->\n    <div *ngFor=\"let conversation of conversationList\">\n      <cometchat-conversation-list-item\n        [conversationDetails]=\"conversation\"\n        [loggedInUser]=\"loggedInUser\"\n        (onUserClick)=\"userClicked($event)\"\n      >\n      </cometchat-conversation-list-item>\n    </div>\n  </div>\n</div>\n",
                styles: [".chatWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.chatsHeaderStyle{padding:19px 16px;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.chatsHeaderTitleStyle{margin:0;display:inline-block;width:66%;text-align:left;font-size:20px}.chatsMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.chatsMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.chatsListStyle{height:calc(100% - 65px);width:100%;overflow-y:auto;margin:0;padding:0}"]
            }] }
];
/** @nocollapse */
CometChatConversationListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometChatConversationListComponent.propDecorators = {
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
    CometChatConversationListComponent.prototype.item;
    /** @type {?} */
    CometChatConversationListComponent.prototype.type;
    /** @type {?} */
    CometChatConversationListComponent.prototype.lastMessage;
    /** @type {?} */
    CometChatConversationListComponent.prototype.onUserClick;
    /** @type {?} */
    CometChatConversationListComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatConversationListComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatConversationListComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatConversationListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatConversationListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatConversationListComponent.prototype.conversationList;
    /** @type {?} */
    CometChatConversationListComponent.prototype.onItemClick;
    /** @type {?} */
    CometChatConversationListComponent.prototype.selectedConversation;
    /** @type {?} */
    CometChatConversationListComponent.prototype.ConversationListManager;
    /** @type {?} */
    CometChatConversationListComponent.prototype.checkItemChange;
    /** @type {?} */
    CometChatConversationListComponent.prototype.conversationRequest;
    /** @type {?} */
    CometChatConversationListComponent.prototype.conversationListenerId;
    /** @type {?} */
    CometChatConversationListComponent.prototype.userListenerId;
    /** @type {?} */
    CometChatConversationListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometChatConversationListComponent.prototype.callListenerId;
    /** @type {?} */
    CometChatConversationListComponent.prototype.CHATS;
    /**
     * Updates the conversation list's last message , badgeCount , user presence based on activities propagated by listeners
     * @type {?}
     */
    CometChatConversationListComponent.prototype.conversationUpdated;
    /**
     * @type {?}
     * @private
     */
    CometChatConversationListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NoYXRzL0NvbWV0Q2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sa0NBQWtDOzs7O0lBMEI3QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXpCakMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTlCLHFCQUFnQixHQUFXLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hFLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0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QVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLGt4QkFBMkQ7O2FBRTVEOzs7O1lBZEMsaUJBQWlCOzs7bUJBZ0JoQixLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxNQUFNOzRCQUNOLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzs7O0lBTk4sa0RBQXFCOztJQUNyQixrREFBcUI7O0lBQ3JCLHlEQUFxQjs7SUFDckIseURBQThEOztJQUM5RCwyREFBOEI7O0lBQzlCLDBEQUE2Qjs7SUFDN0IsMkRBQThCOztJQUU5Qiw4REFBZ0U7O0lBQ2hFLDBEQUFvQjs7SUFDcEIsOERBQXNCOztJQUN0Qix5REFBbUI7O0lBQ25CLGtFQUFpQzs7SUFDakMscUVBQXdCOztJQUN4Qiw2REFBaUM7O0lBRWpDLGlFQUEyQjs7SUFFM0Isb0VBQWlFOztJQUNqRSw0REFBOEQ7O0lBQzlELDZEQUFnRTs7SUFDaEUsNERBQThEOztJQUU5RCxtREFBMEM7Ozs7O0lBc2IxQyxpRUEwQkU7Ozs7O0lBOWNVLGlEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBJTkNPTUlOR19PVEhFUl9NRVNTQUdFX1NPVU5EIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9pbmNvbWluZ090aGVyTWVzc2FnZVNvdW5kXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgbGFzdE1lc3NhZ2U7XG4gIEBPdXRwdXQoKSBvblVzZXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGdyb3VwVG9VcGRhdGUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvTGVhdmUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvRGVsZXRlID0gbnVsbDtcblxuICBkZWNvcmF0b3JNZXNzYWdlOiBzdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkxPQURJTkdfTUVTU1NBR0U7XG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGNvbnZlcnNhdGlvbkxpc3QgPSBbXTtcbiAgb25JdGVtQ2xpY2sgPSBudWxsO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbiA9IHVuZGVmaW5lZDtcbiAgQ29udmVyc2F0aW9uTGlzdE1hbmFnZXI7XG4gIGNoZWNrSXRlbUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnZlcnNhdGlvblJlcXVlc3QgPSBudWxsO1xuXG4gIGNvbnZlcnNhdGlvbkxpc3RlbmVySWQgPSBlbnVtcy5DSEFUX0xJU1RfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHVzZXJMaXN0ZW5lcklkID0gZW51bXMuQ0hBVF9MSVNUX1VTRVJfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IGVudW1zLkNIQVRfTElTVF9HUk9VUF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY2FsbExpc3RlbmVySWQgPSBlbnVtcy5DSEFUX0xJU1RfQ0FMTF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBDSEFUUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DSEFUUztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucmVmW2VudW1zLkRFU1RST1lFRF0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDE1MDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuSVRFTV0pIHtcbiAgICAgICAgdGhpcy5jaGVja0l0ZW1DaGFuZ2UgPSB0cnVlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuSVRFTV0uY3VycmVudFZhbHVlICYmXG4gICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLmN1cnJlbnRWYWx1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlW2VudW1zLklURU1dLmN1cnJlbnRWYWx1ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uID0ge307XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gY29udmVyc2F0aW9ubGlzdC5maW5kKChjKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoYy5jb252ZXJzYXRpb25UeXBlID09PSB0aGlzLnR5cGUgJiZcbiAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgICAgICAgICAgYy5jb252ZXJzYXRpb25XaXRoLnVpZCA9PT0gdGhpcy5pdGVtLnVpZCkgfHxcbiAgICAgICAgICAgICAgICAoYy5jb252ZXJzYXRpb25UeXBlID09PSB0aGlzLnR5cGUgJiZcbiAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY29udmVyc2F0aW9uT2JqKSB7XG4gICAgICAgICAgICAgIGxldCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25saXN0LmluZGV4T2YoY29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiAwLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbmxpc3Q7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24gPSBuZXdDb252ZXJzYXRpb25PYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgdXNlciBpcyBibG9ja2VkL3VuYmxvY2tlZCwgdXBkYXRlIGNvbnZlcnNhdGlvbmxpc3QgaS5lIHVzZXIgaXMgcmVtb3ZlZCBmcm9tIGNvbnZlcnNhdGlvbkxpc3RcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuSVRFTV0ucHJldmlvdXNWYWx1ZSAmJlxuICAgICAgICAgICAgT2JqZWN0LmtleXMoY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUpLmxlbmd0aCAmJlxuICAgICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUudWlkID09PVxuICAgICAgICAgICAgICBjaGFuZ2VbZW51bXMuSVRFTV0uY3VycmVudFZhbHVlLnVpZCAmJlxuICAgICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUuYmxvY2tlZEJ5TWUgIT09XG4gICAgICAgICAgICAgIGNoYW5nZVtlbnVtcy5JVEVNXS5jdXJyZW50VmFsdWUuYmxvY2tlZEJ5TWVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBjb252ZXJzYXRpb25saXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG5cbiAgICAgICAgICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgICAgICAgICBsZXQgY29udktleSA9IGNvbnZlcnNhdGlvbmxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgICAoYywgaykgPT5cbiAgICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvblR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSBjaGFuZ2VbZW51bXMuSVRFTV0uY3VycmVudFZhbHVlLnVpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjb252S2V5ID4gLTEpIHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9ubGlzdC5zcGxpY2UoY29udktleSwgMSk7XG4gICAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbmxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuR1JPVVBfVE9fVVBEQVRFXSkge1xuICAgICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG4gICAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuXG4gICAgICAgIHByZXZQcm9wc1tlbnVtcy5HUk9VUF9UT19VUERBVEVdID1cbiAgICAgICAgICBjaGFuZ2VbZW51bXMuR1JPVVBfVE9fVVBEQVRFXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgICBwcm9wc1tlbnVtcy5HUk9VUF9UT19VUERBVEVdID1cbiAgICAgICAgICBjaGFuZ2VbZW51bXMuR1JPVVBfVE9fVVBEQVRFXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvVXBkYXRlICYmXG4gICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCB8fFxuICAgICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgPT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAmJlxuICAgICAgICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50ICE9PVxuICAgICAgICAgICAgICAgIHByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50IHx8XG4gICAgICAgICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUpKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgIGNvbnN0IGdyb3VwVG9VcGRhdGUgPSB0aGlzLmdyb3VwVG9VcGRhdGU7XG5cbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5jb252ZXJzYXRpb25XaXRoLmd1aWQgPT09IGdyb3VwVG9VcGRhdGUuZ3VpZFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gY29udmVyc2F0aW9uTGlzdFtncm91cEtleV07XG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cFRvVXBkYXRlLCB7XG4gICAgICAgICAgICAgIHNjb3BlOiBncm91cFRvVXBkYXRlW2VudW1zLlNDT1BFXSxcbiAgICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBncm91cFRvVXBkYXRlW2VudW1zLk1FTUJFUlNfQ09VTlRdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdHcm91cE9iaik7XG5cbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuR1JPVVBfVE9fTEVBVkVdKSB7XG4gICAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuICAgICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuXG4gICAgICAgIHByZXZQcm9wc1tlbnVtcy5HUk9VUF9UT19MRUFWRV0gPVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5HUk9VUF9UT19MRUFWRV0ucHJldmlvdXNWYWx1ZTtcbiAgICAgICAgcHJvcHNbZW51bXMuR1JPVVBfVE9fTEVBVkVdID0gY2hhbmdlW2VudW1zLkdST1VQX1RPX0xFQVZFXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUgJiZcbiAgICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5jb252ZXJzYXRpb25XaXRoLmd1aWQgPT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cFRvTGVhdmUgPSBwcm9wcy5ncm91cFRvTGVhdmU7XG4gICAgICAgICAgICBjb25zdCBncm91cE9iaiA9IHsgLi4uY29udmVyc2F0aW9uTGlzdFtncm91cEtleV0gfTtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnNDb3VudCA9XG4gICAgICAgICAgICAgIHBhcnNlSW50KGdyb3VwVG9MZWF2ZVtlbnVtcy5NRU1CRVJTX0NPVU5UXSkgLSAxO1xuXG4gICAgICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlW2VudW1zLkdST1VQX1RPX0RFTEVURV0pIHtcbiAgICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb0RlbGV0ZTogbnVsbCB9O1xuICAgICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgICBwcmV2UHJvcHNbZW51bXMuR1JPVVBfVE9fREVMRVRFXSA9XG4gICAgICAgICAgY2hhbmdlW2VudW1zLkdST1VQX1RPX0RFTEVURV0ucHJldmlvdXNWYWx1ZTtcbiAgICAgICAgcHJvcHNbZW51bXMuR1JPVVBfVE9fREVMRVRFXSA9XG4gICAgICAgICAgY2hhbmdlW2VudW1zLkdST1VQX1RPX0RFTEVURV0uY3VycmVudFZhbHVlO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0RlbGV0ZSAmJlxuICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBwcm9wcy5ncm91cFRvRGVsZXRlLmd1aWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxKTtcblxuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTk9fQ0hBVFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogV2hlbiB1c2VyIHNlbmRzIG1lc3NhZ2UgY29udmVyc2F0aW9uTGlzdCBpcyB1cGRhdGVkIHdpdGggbGF0ZXN0IG1lc3NhZ2VcbiAgICAgICAqL1xuICAgICAgaWYgKHRoaXMuY2hlY2tJdGVtQ2hhbmdlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoY2hhbmdlW2VudW1zLkxBU1RfTUVTU0FHRV0pIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuTEFTVF9NRVNTQUdFXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICAgICAgICBjaGFuZ2VbZW51bXMuTEFTVF9NRVNTQUdFXS5jdXJyZW50VmFsdWUgJiZcbiAgICAgICAgICAgIGNoYW5nZVtlbnVtcy5MQVNUX01FU1NBR0VdLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IGNoYW5nZVtlbnVtcy5MQVNUX01FU1NBR0VdLmN1cnJlbnRWYWx1ZVswXTtcblxuICAgICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9uTGlzdC5maW5kSW5kZXgoKGMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGxhc3RNZXNzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGMuY29udmVyc2F0aW9uSWQgPT09IGxhc3RNZXNzYWdlLmNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSBjb252ZXJzYXRpb25MaXN0W2NvbnZlcnNhdGlvbktleV07XG4gICAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZSxcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEpO1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnVuc2hpZnQobmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tJdGVtQ2hhbmdlID0gZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udmVyc2F0aW9uUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuQ29udmVyc2F0aW9uc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgICAuYnVpbGQoKTtcbiAgICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLmNvbnZlcnNhdGlvblVwZGF0ZWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIHRoZSBjb3ZlcnNhdGlvbiBiYXNlZCBvbiB0aGUgY29udmVyc2F0aW9uUmVxdWVzdCBjb25maWdcbiAgICovXG4gIGZldGNoTmV4dENvbnZlcnNhdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVyc2F0aW9uUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYXR0YWNoZXMgTGlzdGVuZXJzIGZvciB1c2VyIGFjdGl2aXR5ICwgZ3JvdXAgYWN0aXZpdGllcyBhbmQgY2FsbGluZ1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGF0dGFjaExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQuYWRkVXNlckxpc3RlbmVyKFxuICAgICAgICB0aGlzLnVzZXJMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgICAgb25Vc2VyT25saW5lOiAob25saW5lVXNlcikgPT4ge1xuICAgICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgY29tZXMgb25saW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuVVNFUl9PTkxJTkUsIG9ubGluZVVzZXIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Vc2VyT2ZmbGluZTogKG9mZmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5VU0VSX09GRkxJTkUsIG9mZmxpbmVVc2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgQ29tZXRDaGF0LmFkZEdyb3VwTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICAgIG9uR3JvdXBNZW1iZXJTY29wZUNoYW5nZWQ6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICAgIG5ld1Njb3BlLFxuICAgICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBjaGFuZ2VkR3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICAgIHNjb3BlOiBuZXdTY29wZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlcktpY2tlZDogKG1lc3NhZ2UsIGtpY2tlZFVzZXIsIGtpY2tlZEJ5LCBraWNrZWRGcm9tKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBraWNrZWRGcm9tLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgYmFubmVkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyVW5iYW5uZWQ6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICB1bmJhbm5lZEJ5LFxuICAgICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsIHVuYmFubmVkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgICB1c2VyOiB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCB1c2VyQWRkZWRJbiwgbWVzc2FnZSwge1xuICAgICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBncm91cCwgbWVzc2FnZSwge1xuICAgICAgICAgICAgICB1c2VyOiBsZWF2aW5nVXNlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlckpvaW5lZDogKG1lc3NhZ2UsIGpvaW5lZFVzZXIsIGpvaW5lZEdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBqb2luZWRHcm91cCwgbWVzc2FnZSwge1xuICAgICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIENvbWV0Q2hhdC5hZGRNZXNzYWdlTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdGVuZXJJZCxcbiAgICAgICAgbmV3IENvbWV0Q2hhdC5NZXNzYWdlTGlzdGVuZXIoe1xuICAgICAgICAgIG9uVGV4dE1lc3NhZ2VSZWNlaXZlZDogKHRleHRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIHRleHRNZXNzYWdlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVkaWFNZXNzYWdlUmVjZWl2ZWQ6IChtZWRpYU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIG1lZGlhTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkN1c3RvbU1lc3NhZ2VSZWNlaXZlZDogKGN1c3RvbU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkVELCBudWxsLCBjdXN0b21NZXNzYWdlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVzc2FnZURlbGV0ZWQ6IChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVTU0FHRV9ERUxFVEVELCBudWxsLCBkZWxldGVkTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbk1lc3NhZ2VFZGl0ZWQ6IChlZGl0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRVNTQUdFX0VESVRFRCwgbnVsbCwgZWRpdGVkTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgICBvbkluY29taW5nQ2FsbFJlY2VpdmVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuSU5DT01JTkdfQ0FMTF9SRUNFSVZFRCwgbnVsbCwgY2FsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBudWxsLCBjYWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVyc1xuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMuY29udmVyc2F0aW9uTGlzdGVuZXJJZCk7XG4gICAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBDb252ZXJzYXRpb25zIERldGFpbHMgd2l0aCBhbGwgdGhlIHVzZXJzXG4gICAqL1xuICBnZXRDb252ZXJzYXRpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgICB0aGlzLmZldGNoTmV4dENvbnZlcnNhdGlvbigpXG4gICAgICAgICAgICAudGhlbigoY29udmVyc2F0aW9uTGlzdCkgPT4ge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LmZvckVhY2goKGNvbnZlcnNhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkKSB8fFxuICAgICAgICAgICAgICAgICAgICAoY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09XG4gICAgICAgICAgICAgICAgICAgICAgQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguZ3VpZClcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24udW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBbXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbkxpc3QsXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgIGlmICh0aGlzLmNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19DSEFUU19GT1VORDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkVSUk9SO1xuICAgICAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0Q29udmVyc2F0aW9uTGlzdF0gZ2V0Q29udmVyc2F0aW9ucyBmZXRjaE5leHQgZXJyb3JcIixcbiAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkVSUk9SO1xuICAgICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgIFwiW0NvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RdIGdldENvbnZlcnNhdGlvbnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb252ZXJzYXRpb24gbGlzdCdzIGxhc3QgbWVzc2FnZSAsIGJhZGdlQ291bnQgLCB1c2VyIHByZXNlbmNlIGJhc2VkIG9uIGFjdGl2aXRpZXMgcHJvcGFnYXRlZCBieSBsaXN0ZW5lcnNcbiAgICovXG4gIGNvbnZlcnNhdGlvblVwZGF0ZWQgPSAoXG4gICAga2V5ID0gbnVsbCxcbiAgICBpdGVtID0gbnVsbCxcbiAgICBtZXNzYWdlID0gbnVsbCxcbiAgICBvcHRpb25zID0gbnVsbFxuICApID0+IHtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5VU0VSX09OTElORTpcbiAgICAgICAgY2FzZSBlbnVtcy5VU0VSX09GRkxJTkU6IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXIoaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICAgIGNhc2UgZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnZlcnNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVRFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURUQ6XG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25FZGl0ZWREZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBEZXRhaWwgd2hlbiB1c2VyIGNvbWVzIG9ubGluZS9vZmZsaW5lXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlVXNlcih1c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vd2hlbiB1c2VyIHVwZGF0ZXNcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgICAgLy9HZXRzIHRoZSBpbmRleCBvZiB1c2VyIHdoaWNoIGNvbWVzIG9mZmxpbmUvb25saW5lXG4gICAgICBjb25zdCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25saXN0LmZpbmRJbmRleChcbiAgICAgICAgKGNvbnZlcnNhdGlvbk9iaikgPT5cbiAgICAgICAgICBjb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgIGNvbnZlcnNhdGlvbk9iai5jb252ZXJzYXRpb25XaXRoLnVpZCA9PT0gdXNlci51aWRcbiAgICAgICk7XG4gICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgbGV0IGNvbnZlcnNhdGlvbk9iaiA9IHsgLi4uY29udmVyc2F0aW9ubGlzdFtjb252ZXJzYXRpb25LZXldIH07XG4gICAgICAgIGxldCBjb252ZXJzYXRpb25XaXRoT2JqID0ge1xuICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iai5jb252ZXJzYXRpb25XaXRoLFxuICAgICAgICAgIHN0YXR1czogdXNlci5nZXRTdGF0dXMoKSxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICBjb252ZXJzYXRpb25XaXRoOiBjb252ZXJzYXRpb25XaXRoT2JqLFxuICAgICAgICB9O1xuICAgICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG5cbiAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9ubGlzdDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogR2V0cyB0aGUgbGFzdCBtZXNzYWdlXG4gICAqIEBwYXJhbSBjb252ZXJzYXRpb25cbiAgICovXG4gIG1ha2VMYXN0TWVzc2FnZShtZXNzYWdlLCBjb252ZXJzYXRpb24gPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBuZXdNZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZSk7XG4gICAgICByZXR1cm4gbmV3TWVzc2FnZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXBkYXRlcyBDb252ZXJzYXRpb25zIGFzIFRleHQvQ3VzdG9tIE1lc3NhZ2VzIGFyZSByZWNlaXZlZFxuICAgKiBAcGFyYW1cbiAgICpcbiAgICovXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbihtZXNzYWdlLCBub3RpZmljYXRpb24gPSB0cnVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubWFrZUNvbnZlcnNhdGlvbihtZXNzYWdlKVxuICAgICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbktleTtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25PYmogPSByZXNwb25zZS5jb252ZXJzYXRpb25PYmo7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbkxpc3Q7XG5cbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSB0aGlzLm1ha2VVbnJlYWRNZXNzYWdlQ291bnQoXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbk9ialxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IHRoaXMubWFrZUxhc3RNZXNzYWdlKG1lc3NhZ2UsIGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiB1bnJlYWRNZXNzYWdlQ291bnQsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEpO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSB0aGlzLm1ha2VVbnJlYWRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IHRoaXMubWFrZUxhc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudDogdW5yZWFkTWVzc2FnZUNvdW50LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3QudW5zaGlmdChuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgIFwiVGhpcyBpcyBhbiBlcnJvciBpbiBjb252ZXJ0aW5nIG1lc3NhZ2UgdG8gY29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICpcbiAgICogR2V0cyBUaGUgQ291bnQgb2YgVW5yZWFkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWFrZVVucmVhZE1lc3NhZ2VDb3VudChjb252ZXJzYXRpb246IGFueSA9IHt9LCBvcGVyYXRvciA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbnZlcnNhdGlvbikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gcGFyc2VJbnQoY29udmVyc2F0aW9uLnVucmVhZE1lc3NhZ2VDb3VudCk7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24gJiZcbiAgICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgICApIHtcbiAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh0aGlzLml0ZW0gJiZcbiAgICAgICAgICB0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoZW51bXMuR1VJRCkgJiZcbiAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5HVUlEKSAmJlxuICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkKSB8fFxuICAgICAgICAodGhpcy5pdGVtICYmXG4gICAgICAgICAgdGhpcy5pdGVtLmhhc093blByb3BlcnR5KGVudW1zLlVJRCkgJiZcbiAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5VSUQpICYmXG4gICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkKVxuICAgICAgKSB7XG4gICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3BlcmF0b3IgJiYgb3BlcmF0b3IgPT09IGVudW1zLkRFQ1JFTUVOVCkge1xuICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IHVucmVhZE1lc3NhZ2VDb3VudCA/IHVucmVhZE1lc3NhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IHVucmVhZE1lc3NhZ2VDb3VudCArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVucmVhZE1lc3NhZ2VDb3VudDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyBkZXRhaWwgb2YgY29udmVyc2F0aW9uc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIG1ha2VDb252ZXJzYXRpb24obWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBDb21ldENoYXQuQ29tZXRDaGF0SGVscGVyLmdldENvbnZlcnNhdGlvbkZyb21NZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgICAgICAoYykgPT4gYy5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgY29udmVyc2F0aW9uT2JqID0geyAuLi5jb252ZXJzYXRpb24gfTtcbiAgICAgICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25PYmogPSB7IC4uLmNvbnZlcnNhdGlvbkxpc3RbY29udmVyc2F0aW9uS2V5XSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uS2V5OiBjb252ZXJzYXRpb25LZXksXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbk9iajogY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0OiBjb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ29udmVyc2F0aW9uIFZpZXcgd2hlbiBtZXNzYWdlIGlzIGVkaXRlZCBvciBkZWxldGVkXG4gICAqL1xuICBjb252ZXJzYXRpb25FZGl0ZWREZWxldGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tYWtlQ29udmVyc2F0aW9uKG1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uS2V5O1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbk9iaiA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbk9iajtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IGNvbnZlcnNhdGlvbk9iai5sYXN0TWVzc2FnZTtcblxuICAgICAgICAgICAgaWYgKGxhc3RNZXNzYWdlT2JqLmlkID09PSBtZXNzYWdlLmlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0xhc3RNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSBPYmplY3QuYXNzaWduKHt9LCBjb252ZXJzYXRpb25PYmosIHtcbiAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbmV3TGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgXCJUaGlzIGlzIGFuIGVycm9yIGluIGNvbnZlcnRpbmcgbWVzc2FnZSB0byBjb252ZXJzYXRpb25cIixcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIFVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tIG9mIHRoZSBjdXJyZW50IENvbnZlcnNhdGlvbiBsaXN0IHRoYW4gZmV0Y2ggbmV4dCBpdGVtcyBvZiB0aGUgQ29udmVyc2F0aW9uIGxpc3QgYW5kIGFwcGVuZFxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm90dG9tID1cbiAgICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG4gICAgICBpZiAoYm90dG9tKSB7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTE9BRElOR19NRVNTU0FHRTtcbiAgICAgICAgdGhpcy5nZXRDb252ZXJzYXRpb24oKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgVXNlciBvbiBVc2VyIENsaWNrXG4gICAqIEBwYXJhbSB1c2VyXG4gICAqL1xuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub25Vc2VyQ2xpY2suZW1pdCh1c2VyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIFdoZW4gTWVzc2FnZSBpcyBSZWNlaXZlZFxuICAgKi9cbiAgcGxheUF1ZGlvKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICAgIGF1ZGlvLnNyYyA9IElOQ09NSU5HX09USEVSX01FU1NBR0VfU09VTkQ7XG4gICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=