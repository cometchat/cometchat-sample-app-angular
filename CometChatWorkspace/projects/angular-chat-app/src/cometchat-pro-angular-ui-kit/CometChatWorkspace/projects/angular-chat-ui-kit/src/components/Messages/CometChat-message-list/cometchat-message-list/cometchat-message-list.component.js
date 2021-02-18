/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-message-list/cometchat-message-list/cometchat-message-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { DatePipe } from "@angular/common";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatMessageListComponent {
    /**
     * @param {?} ref
     * @param {?} datepipe
     */
    constructor(ref, datepipe) {
        this.ref = ref;
        this.datepipe = datepipe;
        this.item = null;
        this.type = null;
        this.parentMessageId = null;
        this.messages = [];
        this.reachedTopOfConversation = [];
        this.actionGenerated = new EventEmitter();
        this.limit = 50;
        this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
        this.times = 0;
        this.lastScrollTop = 0;
        this.msgListenerId = enums.MESSAGE_ + new Date().getTime();
        this.groupListenerId = enums.GROUP_ + new Date().getTime();
        this.callListenerId = enums.CALL_ + new Date().getTime();
        this.MESSAGE_TYPE_TEXT = CometChat.MESSAGE_TYPE.TEXT;
        this.MESSAGE_TYPE_IMAGE = CometChat.MESSAGE_TYPE.IMAGE;
        this.MESSAGE_TYPE_VIDEO = CometChat.MESSAGE_TYPE.VIDEO;
        this.MESSAGE_TYPE_AUDIO = CometChat.MESSAGE_TYPE.AUDIO;
        this.MESSAGE_TYPE_FILE = CometChat.MESSAGE_TYPE.FILE;
        this.MESSAGE_TYPE_CUSTOM = CometChat.MESSAGE_TYPE.CUSTOM;
        this.CALL_TYPE_AUDIO = CometChat.CALL_TYPE.AUDIO;
        this.CALL_TYPE_VIDEO = CometChat.CALL_TYPE.VIDEO;
        this.CATEGORY_MESSAGE = CometChat.CATEGORY_MESSAGE;
        this.CATEGORY_ACTION = CometChat.CATEGORY_ACTION;
        this.CATEGORY_CALL = CometChat.CATEGORY_CALL;
        this.categories = [
            CometChat.CATEGORY_MESSAGE,
            CometChat.MESSAGE_TYPE.CUSTOM,
            CometChat.CATEGORY_ACTION,
            CometChat.CATEGORY_CALL,
        ];
        this.types = [
            CometChat.MESSAGE_TYPE.TEXT,
            CometChat.MESSAGE_TYPE.IMAGE,
            CometChat.MESSAGE_TYPE.VIDEO,
            CometChat.MESSAGE_TYPE.AUDIO,
            CometChat.MESSAGE_TYPE.FILE,
            enums.CUSTOM_TYPE_POLL,
            enums.CUSTOM_TYPE_STICKER,
            enums.ACTION_TYPE_GROUPMEMBER,
            CometChat.CALL_TYPE.AUDIO,
            CometChat.CALL_TYPE.VIDEO,
        ];
        /**
         * Detects if the message that was edit is you current open conversation window
         * @param Any message
         */
        this.messageEdited = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            try {
                if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                    message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                    message.getReceiver().guid === this.item.guid) {
                    this.updateEditedMessage(message);
                }
                else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                    message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                    this.loggedInUser.uid === message.getReceiverId() &&
                    message.getSender().uid === this.item.uid) {
                    this.updateEditedMessage(message);
                }
                else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                    message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                    this.loggedInUser.uid === message.getSender().uid &&
                    message.getReceiverId() === this.item.uid) {
                    this.updateEditedMessage(message);
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
         * @param Any message
         */
        this.updateEditedMessage = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            try {
                //If the updated message is the current message that is opened in thread view then update thread view also
                if (message.id == this.parentMessageId) {
                    this.actionGenerated.emit({
                        type: enums.THREAD_PARENT_MESSAGE_UPDATED,
                        payLoad: message,
                    });
                }
                /** @type {?} */
                const messageList = [...this.messages];
                /** @type {?} */
                let messageKey = messageList.findIndex((/**
                 * @param {?} m
                 * @param {?} k
                 * @return {?}
                 */
                (m, k) => m.id === message.id));
                if (messageKey > -1) {
                    /** @type {?} */
                    const messageObj = messageList[messageKey];
                    /** @type {?} */
                    const newMessageObj = Object.assign({}, messageObj, message);
                    messageList.splice(messageKey, 1, newMessageObj);
                    this.actionGenerated.emit({
                        type: enums.MESSAGE_UPDATED,
                        payLoad: messageList,
                    });
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Emits an Action Indicating that Group Data has been updated
         * @param
         */
        this.groupUpdated = (/**
         * @param {?} key
         * @param {?} message
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (key, message, group, options) => {
            try {
                if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                    message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                    message.getReceiver().guid === this.item.guid) {
                    this.actionGenerated.emit({
                        type: enums.GROUP_UPDATED,
                        payLoad: { message, key, group, options },
                    });
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Adds Metadata to Poll
         * @param message
         */
        this.addMetadataToCustomData = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            try {
                /** @type {?} */
                const customData = message.data.customData;
                /** @type {?} */
                const options = customData.options;
                /** @type {?} */
                const resultOptions = {};
                for (const option in options) {
                    resultOptions[option] = {
                        text: options[option],
                        count: 0,
                    };
                }
                /** @type {?} */
                const polls = {
                    id: message.id,
                    options: options,
                    results: {
                        total: 0,
                        options: resultOptions,
                        question: customData.question,
                    },
                    question: customData.question,
                };
                return Object.assign({}, message, { metadata: { "@injected": { extensions: { polls: polls } } } });
            }
            catch (error) {
                logger(error);
            }
        });
        try {
            setInterval((/**
             * @return {?}
             */
            () => {
                if (!this.ref[enums.DESTROYED]) {
                    this.ref.detectChanges();
                }
            }), 2500);
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
                //Removing Previous Conversation Listeners
                CometChat.removeMessageListener(this.msgListenerId);
                CometChat.removeGroupListener(this.groupListenerId);
                CometChat.removeCallListener(this.callListenerId);
                this.msgListenerId = enums.MESSAGE_ + new Date().getTime();
                this.groupListenerId = enums.GROUP_ + new Date().getTime();
                this.callListenerId = enums.CALL_ + new Date().getTime();
                this.createMessageRequestObjectAndGetMessages();
                // Attach MessageListeners for the new conversation
                this.addMessageEventListeners();
            }
            if (change[enums.REACHED_TOP_OF_CONVERSATION]) {
                if (change[enums.REACHED_TOP_OF_CONVERSATION].currentValue) {
                    this.getMessages(false, false, true);
                }
            }
            // new thread opened
            if (change[enums.PARENT_MESSAGE_ID]) {
                //Removing Previous thread Listeners
                CometChat.removeMessageListener(this.msgListenerId);
                this.msgListenerId = enums.MESSAGE_ + new Date().getTime();
                this.createMessageRequestObjectAndGetMessages();
                // Attach MessageListeners for the new conversation
                this.addMessageEventListeners();
            }
            if (change[enums.MESSAGED]) {
                if (change[enums.MESSAGED].currentValue.length > 0) {
                    this.decoratorMessage = "";
                }
            }
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
            this.createMessageRequestObjectAndGetMessages();
            // Attach MessageListeners Here
            this.addMessageEventListeners();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            //Removing Message Listeners
            CometChat.removeMessageListener(this.msgListenerId);
            CometChat.removeGroupListener(this.groupListenerId);
            CometChat.removeCallListener(this.callListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @return {?}
     */
    createMessageRequestObjectAndGetMessages() {
        try {
            if (this.parentMessageId) {
                this.messagesRequest = this.buildMessageRequestObject(this.item, this.type, this.parentMessageId);
            }
            else {
                this.messagesRequest = this.buildMessageRequestObject(this.item, this.type);
            }
            this.getMessages(false, true);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listener To Receive Messages in Real Time
     * @return {?}
     */
    addMessageEventListeners() {
        try {
            CometChat.addMessageListener(this.msgListenerId, new CometChat.MessageListener({
                onTextMessageReceived: (/**
                 * @param {?} textMessage
                 * @return {?}
                 */
                (textMessage) => {
                    this.messageUpdated(enums.TEXT_MESSAGE_RECEIVED, textMessage);
                }),
                onMediaMessageReceived: (/**
                 * @param {?} mediaMessage
                 * @return {?}
                 */
                (mediaMessage) => {
                    this.messageUpdated(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
                }),
                onCustomMessageReceived: (/**
                 * @param {?} customMessage
                 * @return {?}
                 */
                (customMessage) => {
                    this.messageUpdated(enums.CUSTOM_MESSAGE_RECEIVED, customMessage);
                }),
                onMessagesDelivered: (/**
                 * @param {?} messageReceipt
                 * @return {?}
                 */
                (messageReceipt) => {
                    this.messageUpdated(enums.MESSAGE_DELIVERED, messageReceipt);
                }),
                onMessagesRead: (/**
                 * @param {?} messageReceipt
                 * @return {?}
                 */
                (messageReceipt) => {
                    this.messageUpdated(enums.MESSAGE_READ, messageReceipt);
                }),
                onMessageDeleted: (/**
                 * @param {?} deletedMessage
                 * @return {?}
                 */
                (deletedMessage) => {
                    this.messageUpdated(enums.MESSAGE_DELETED, deletedMessage);
                }),
                onMessageEdited: (/**
                 * @param {?} editedMessage
                 * @return {?}
                 */
                (editedMessage) => {
                    this.messageUpdated(enums.MESSAGE_EDITED, editedMessage);
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
                    this.messageUpdated(enums.GROUP_MEMBER_SCOPE_CHANGED, message, changedGroup, { user: changedUser, scope: newScope });
                }),
                onGroupMemberKicked: (/**
                 * @param {?} message
                 * @param {?} kickedUser
                 * @param {?} kickedBy
                 * @param {?} kickedFrom
                 * @return {?}
                 */
                (message, kickedUser, kickedBy, kickedFrom) => {
                    this.messageUpdated(enums.GROUP_MEMBER_KICKED, message, kickedFrom, {
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
                    this.messageUpdated(enums.GROUP_MEMBER_BANNED, message, bannedFrom, {
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
                    this.messageUpdated(enums.GROUP_MEMBER_UNBANNED, message, unbannedFrom, { user: unbannedUser });
                }),
                onMemberAddedToGroup: (/**
                 * @param {?} message
                 * @param {?} userAdded
                 * @param {?} userAddedBy
                 * @param {?} userAddedIn
                 * @return {?}
                 */
                (message, userAdded, userAddedBy, userAddedIn) => {
                    this.messageUpdated(enums.GROUP_MEMBER_ADDED, message, userAddedIn, {
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
                    this.messageUpdated(enums.GROUP_MEMBER_LEFT, message, group, {
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
                    this.messageUpdated(enums.GROUP_MEMBER_JOINED, message, joinedGroup, {
                        user: joinedUser,
                    });
                }),
            }));
            CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
                onIncomingCallReceived: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.messageUpdated(enums.INCOMING_CALL_RECEIVED, call);
                }),
                onIncomingCallCancelled: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.messageUpdated(enums.INCOMING_CALL_CANCELLED, call);
                }),
                onOutgoingCallAccepted: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.messageUpdated(enums.OUTGOING_CALL_ACCEPTED, call);
                }),
                onOutgoingCallRejected: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.messageUpdated(enums.OUTGOING_CALL_REJECTED, call);
                }),
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param {?=} item
     * @param {?=} type
     * @param {?=} parentMessageId
     * @return {?}
     */
    buildMessageRequestObject(item = null, type = null, parentMessageId = null) {
        try {
            /** @type {?} */
            let messageRequestBuilt;
            if (type === CometChat.RECEIVER_TYPE.USER) {
                if (parentMessageId) {
                    messageRequestBuilt = new CometChat.MessagesRequestBuilder()
                        .setUID(item.uid)
                        .setParentMessageId(parentMessageId)
                        .setCategories(this.categories)
                        .setTypes(this.types)
                        .setLimit(this.limit)
                        .build();
                }
                else {
                    messageRequestBuilt = new CometChat.MessagesRequestBuilder()
                        .setUID(item.uid)
                        .setCategories(this.categories)
                        .setTypes(this.types)
                        .hideReplies(true)
                        .setLimit(this.limit)
                        .build();
                }
            }
            else if (type === CometChat.RECEIVER_TYPE.GROUP) {
                if (parentMessageId) {
                    messageRequestBuilt = new CometChat.MessagesRequestBuilder()
                        .setGUID(item.guid)
                        .setParentMessageId(parentMessageId)
                        .setCategories(this.categories)
                        .setTypes(this.types)
                        .setLimit(this.limit)
                        .build();
                }
                else {
                    messageRequestBuilt = new CometChat.MessagesRequestBuilder()
                        .setGUID(item.guid)
                        .setCategories(this.categories)
                        .setTypes(this.types)
                        .hideReplies(true)
                        .setLimit(this.limit)
                        .build();
                }
            }
            return messageRequestBuilt;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param {?=} scrollToBottom
     * @param {?=} newConversation
     * @param {?=} scrollToTop
     * @return {?}
     */
    getMessages(scrollToBottom = false, newConversation = false, scrollToTop = false) {
        try {
            this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
            /** @type {?} */
            const actionMessages = [];
            /** @type {?} */
            let user = CometChat.getLoggedinUser().then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.loggedInUser = user;
                this.messagesRequest.fetchPrevious().then((/**
                 * @param {?} messageList
                 * @return {?}
                 */
                (messageList) => {
                    // No Messages Found
                    if (messageList.length === 0 && this.messages.length === 0) {
                        this.decoratorMessage = COMETCHAT_CONSTANTS.NO_MESSAGES_FOUND;
                    }
                    else {
                        this.decoratorMessage = "";
                    }
                    messageList.forEach((/**
                     * @param {?} message
                     * @return {?}
                     */
                    (message) => {
                        if (message.category === CometChat.CATEGORY_ACTION &&
                            message.sender.uid === enums.APP_SYSTEM) {
                            actionMessages.push(message);
                        }
                        //if the sender of the message is not the loggedin user, mark it as read.
                        if (message.getSender().getUid() !== user.getUid() &&
                            !message.getReadAt()) {
                            if (message.getReceiverType() === CometChat.RECEIVER_TYPE.USER) {
                                CometChat.markAsRead(message.getId().toString(), message.getSender().getUid(), message.getReceiverType());
                            }
                            else if (message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP) {
                                CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
                            }
                            this.actionGenerated.emit({
                                type: enums.MESSAGE__READ,
                                payLoad: message,
                            });
                        }
                    }));
                    ++this.times;
                    /** @type {?} */
                    let actionGeneratedType = enums.MESSAGE_FETCHED;
                    if (scrollToBottom === true) {
                        actionGeneratedType = enums.MESSAGE_FETCHED_AGAIN;
                    }
                    if (scrollToTop) {
                        actionGeneratedType = enums.OLDER_MESSAGES_FETCHED;
                    }
                    // Only called when the active user changes the the conversation , that is switches to some other person
                    // to chat with
                    if (newConversation) {
                        actionGeneratedType = enums.NEW_CONVERSATION_OPENED;
                    }
                    if ((this.times === 1 && actionMessages.length > 5) ||
                        (this.times > 1 && actionMessages.length === 30)) {
                        this.actionGenerated.emit({
                            type: enums.MESSAGE_FETCHED,
                            payLoad: messageList,
                        });
                        this.getMessages(true, false);
                    }
                    else {
                        this.actionGenerated.emit({
                            type: actionGeneratedType,
                            payLoad: messageList,
                        });
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    // logger("Message fetching failed with error:", error);
                }));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("No Logged In User Found", { error });
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates messageList on basis of user activity or group activity or calling activity
     * @param {?=} key
     * @param {?=} message
     * @param {?=} group
     * @param {?=} options
     * @return {?}
     */
    messageUpdated(key = null, message = null, group = null, options = null) {
        try {
            switch (key) {
                case enums.TEXT_MESSAGE_RECEIVED:
                case enums.MEDIA_MESSAGE_RECEIVED:
                    this.messageReceived(message);
                    break;
                case enums.MESSAGE_DELIVERED:
                case enums.MESSAGE_READ:
                    this.messageReadAndDelivered(message);
                    break;
                case enums.MESSAGE_DELETED: {
                    this.messageDeleted(message);
                    break;
                }
                case enums.MESSAGE_EDITED: {
                    this.messageEdited(message);
                    break;
                }
                case enums.GROUP_MEMBER_SCOPE_CHANGED:
                case enums.GROUP_MEMBER_JOINED:
                case enums.GROUP_MEMBER_LEFT:
                case enums.GROUP_MEMBER_ADDED:
                case enums.GROUP_MEMBER_KICKED:
                case enums.GROUP_MEMBER_BANNED:
                case enums.GROUP_MEMBER_UNBANNED: {
                    this.groupUpdated(key, message, group, options);
                    break;
                }
                case enums.CUSTOM_MESSAGE_RECEIVED:
                    this.customMessageReceived(message);
                    break;
                case enums.INCOMING_CALL_RECEIVED:
                case enums.INCOMING_CALL_CANCELLED:
                case enums.OUTGOING_CALL_ACCEPTED:
                case enums.OUTGOING_CALL_REJECTED:
                    this.callUpdated(message);
                    break;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When Message is Received
     * @param {?} message
     * @return {?}
     */
    messageReceived(message) {
        try {
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverId() === this.item.guid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
                }
                this.actionGenerated.emit({
                    type: enums.MESSAGE_RECEIVED,
                    payLoad: [message],
                });
            }
            else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                message.getSender().uid === this.item.uid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getSender().uid, message.getReceiverType());
                }
                this.actionGenerated.emit({
                    type: enums.MESSAGE_RECEIVED,
                    payLoad: [message],
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            this.actionGenerated.emit(action);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets Status of messages i.e sent/delivered/read
     * @param {?} message
     * @return {?}
     */
    messageReadAndDelivered(message) {
        try {
            if (message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                message.getSender().getUid() === this.item.uid &&
                message.getReceiver() === this.loggedInUser.uid) {
                /** @type {?} */
                let messageList = [...this.messages];
                if (message.getReceiptType() === enums.DELIVERY) {
                    //search for message
                    /** @type {?} */
                    let messageKey = messageList.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    (m) => m.id === message.messageId));
                    if (messageKey > -1) {
                        /** @type {?} */
                        let messageObj = Object.assign({}, messageList[messageKey]);
                        /** @type {?} */
                        let newMessageObj = Object.assign({}, messageObj, {
                            deliveredAt: message.getDeliveredAt(),
                        });
                        messageList.splice(messageKey, 1, newMessageObj);
                        this.actionGenerated.emit({
                            type: enums.MESSAGE_UPDATED,
                            payLoad: messageList,
                        });
                    }
                }
                else if (message.getReceiptType() === enums.READ) {
                    //search for message
                    /** @type {?} */
                    let messageKey = messageList.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    (m) => m.id === message.messageId));
                    if (messageKey > -1) {
                        /** @type {?} */
                        let messageObj = Object.assign({}, messageList[messageKey]);
                        /** @type {?} */
                        let newMessageObj = Object.assign({}, messageObj, {
                            readAt: message.getReadAt(),
                        });
                        messageList.splice(messageKey, 1, newMessageObj);
                        this.actionGenerated.emit({
                            type: enums.MESSAGE_UPDATED,
                            payLoad: messageList,
                        });
                    }
                }
            }
            else if (message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiver().guid === this.item.guid) {
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param {?} message
     * @return {?}
     */
    messageDeleted(message) {
        try {
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiver().guid === this.item.guid) {
                this.actionGenerated.emit({
                    type: enums.MESSAGE_DELETE,
                    payLoad: [message],
                });
            }
            else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                message.getSender().uid === this.item.uid) {
                this.actionGenerated.emit({
                    type: enums.MESSAGE_DELETE,
                    payLoad: [message],
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When custom messages are received eg. Poll, Stickers emits action to update message list
     * @param {?} message
     * @return {?}
     */
    customMessageReceived(message) {
        try {
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverId() === this.item.guid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
                }
                if (message.hasOwnProperty(enums.METADATA) &&
                    message.type !== enums.CUSTOM_TYPE_STICKER &&
                    message.type !== enums.CUSTOM_TYPE_POLL) {
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [message],
                    });
                }
                else if (message.type === enums.CUSTOM_TYPE_STICKER) {
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [message],
                    });
                }
                else if (message.type === enums.CUSTOM_TYPE_POLL) {
                    //customdata (poll extension) does not have metadata
                    //The poll message that  is received by the message listeners , will not be appended to message list
                    //if the current loggedIn user is the sender/creator of the poll message
                    if (message.sender.uid === this.loggedInUser.uid) {
                        return false;
                    }
                    /** @type {?} */
                    const newMessage = this.addMetadataToCustomData(message);
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [newMessage],
                    });
                }
            }
            else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                message.getSender().uid === this.item.uid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getSender().uid, message.getReceiverType());
                }
                if (message.hasOwnProperty(enums.METADATA) &&
                    message.type !== enums.CUSTOM_TYPE_STICKER &&
                    message.type !== enums.CUSTOM_TYPE_POLL) {
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [message],
                    });
                }
                else if (message.type === enums.CUSTOM_TYPE_STICKER) {
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [message],
                    });
                }
                else if (message.type === enums.CUSTOM_TYPE_POLL) {
                    //customdata (poll extension) does not have metadata
                    /** @type {?} */
                    const newMessage = this.addMetadataToCustomData(message);
                    this.actionGenerated.emit({
                        type: enums.CUSTOM_MESSAGE_RECEIVE,
                        payLoad: [newMessage],
                    });
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates the callMessage
     * @param {?} message
     * @return {?}
     */
    callUpdated(message) {
        try {
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverId() === this.item.guid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
                }
                this.actionGenerated.emit({
                    type: enums.CALL_UPDATED,
                    payLoad: message,
                });
            }
            else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
                message.getSender().uid === this.item.uid) {
                if (!message.getReadAt()) {
                    CometChat.markAsRead(message.getId().toString(), message.getSender().uid, message.getReceiverType());
                }
                this.actionGenerated.emit({
                    type: enums.CALL_UPDATED,
                    payLoad: message,
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Compares two dates and sets Date on a a new day
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    isDateDifferent(firstDate, secondDate) {
        try {
            /** @type {?} */
            let firstDateObj;
            /** @type {?} */
            let secondDateObj;
            firstDateObj = new Date(firstDate * 1000);
            secondDateObj = new Date(secondDate * 1000);
            if (firstDateObj.getDate() === secondDateObj.getDate() &&
                firstDateObj.getMonth() === secondDateObj.getMonth() &&
                firstDateObj.getFullYear() === secondDateObj.getFullYear()) {
                return false;
            }
            return true;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessageListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-list",
                template: "<div class=\"chatListStyle\">\n  <!--Message Container-->\n  <div class=\"decoratorMessageStyle\">\n    <p class=\"decoratorMessageTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"listWrapperStyle\">\n    <!--message-->\n    <div *ngFor=\"let msg of messages; let i = index\">\n      <div class=\"messageDateContainerStyle\" *ngIf=\"i === 0\">\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <div\n        class=\"messageDateContainerStyle\"\n        *ngIf=\"\n          i > 0 && isDateDifferent(messages[i - 1]?.sentAt, messages[i]?.sentAt)\n        \"\n      >\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <!--CASE FOR CALL MESSAGES-->\n      <div *ngIf=\"msg?.category == CATEGORY_CALL\">\n        <cometchat-action-message-bubble\n          [messageDetails]=\"msg\"\n          [loggedInUserUid]=\"loggedInUser?.uid\"\n        ></cometchat-action-message-bubble>\n      </div>\n      <!--CASE FOR CALL MESSAGES ENDS-->\n      <!-- CASE FOR DELETED MESSAGES -->\n      <div *ngIf=\"msg?.deletedAt; else elseBlock\">\n        <cometchat-delete-message-bubble\n          [messageDetails]=\"msg\"\n          [loggedInUser]=\"loggedInUser\"\n        ></cometchat-delete-message-bubble>\n      </div>\n      <!-- CASE FOR DELETED MESSAGES ENDS -->\n\n      <ng-template #elseBlock>\n        <!-- NgSwitchCase for different Types Of Bubble -->\n        <div [ngSwitch]=\"msg.type\">\n          <!-- CASE FOR TEXT -->\n          <div *ngSwitchCase=\"MESSAGE_TYPE_TEXT\">\n            <cometchat-receiver-text-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [item]=\"item\"\n              [type]=\"type\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-text-message-bubble>\n            <cometchat-sender-text-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-text-message-bubble>\n          </div>\n          <!--CASE FOR TEXT ENDS -->\n          <!--CASE FOR FILE-->\n          <div *ngSwitchCase=\"MESSAGE_TYPE_FILE\">\n            <cometchat-sender-file-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-file-message-bubble>\n            <cometchat-receiver-file-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-file-message-bubble>\n          </div>\n          <!--CASE FOR FILE ENDS-->\n          <!--CASE FOR IMAGE -->\n          <div *ngSwitchCase=\"MESSAGE_TYPE_IMAGE\">\n            <cometchat-sender-image-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-image-message-bubble>\n            <cometchat-receiver-image-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-image-message-bubble>\n          </div>\n          <!--CASE FOR IMAGE  ENDS-->\n          <!--CASE FOR VIDEO -->\n          <div *ngSwitchCase=\"MESSAGE_TYPE_VIDEO\">\n            <div *ngIf=\"msg.category !== CATEGORY_CALL\">\n              <cometchat-sender-video-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [messageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-video-message-bubble>\n              <cometchat-receiver-video-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [messageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-video-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR VIDEO ENDS -->\n\n          <!--CASE FOR AUDIO -->\n          <div *ngSwitchCase=\"MESSAGE_TYPE_AUDIO\">\n            <div *ngIf=\"msg.category !== CATEGORY_CALL\">\n              <cometchat-sender-audio-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [messageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-audio-message-bubble>\n              <cometchat-receiver-audio-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [messageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-audio-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR AUDIO ENDS -->\n\n          <!--CASE FOR Action Messages -->\n          <div *ngSwitchCase=\"'groupMember'\">\n            <div class=\"actionMessageStyle\">\n              <p class=\"actionMessageTxtStyle\">{{ msg?.message }}</p>\n            </div>\n          </div>\n          <!--CASE FOR Action Messages -->\n          <!--CASE FOR STICKER -->\n          <div *ngSwitchCase=\"'extension_sticker'\">\n            <cometchat-sender-sticker-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-sticker-message-bubble>\n            <cometchat-receiver-sticker-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-sticker-message-bubble>\n          </div>\n          <!--CASE FOR STICKER ENDS -->\n\n          <!--CASE FOR POLLS -->\n          <div *ngSwitchCase=\"'extension_poll'\">\n            <cometchat-sender-poll-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-poll-message-bubble>\n            <cometchat-receiver-poll-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [loggedInUserUid]=\"loggedInUser.uid\"\n              [messageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-poll-message-bubble>\n          </div>\n          <!--CASE FOR  POLLS ENDS -->\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n",
                styles: [".chatListStyle{z-index:1;width:100%;flex:1 1 0;order:2;position:relative;height:100%}.listWrapperStyle{box-sizing:border-box;display:flex;flex-direction:column;position:absolute;top:0;width:100%;z-index:100;padding-top:14px}.actionMessageTxtStyle{padding:8px 12px;margin-bottom:16px;text-align:center}.messageDateContainerStyle{text-align:center;margin-bottom:16px}.messageDateStyle{padding:8px 12px;background-color:#f6f6f6;color:#141414;border-radius:10px}.decoratorMessageStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.decoratorMessageTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}"]
            }] }
];
/** @nocollapse */
CometChatMessageListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatePipe }
];
CometChatMessageListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    parentMessageId: [{ type: Input }],
    messages: [{ type: Input }],
    reachedTopOfConversation: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatMessageListComponent.prototype.item;
    /** @type {?} */
    CometChatMessageListComponent.prototype.type;
    /** @type {?} */
    CometChatMessageListComponent.prototype.parentMessageId;
    /** @type {?} */
    CometChatMessageListComponent.prototype.messages;
    /** @type {?} */
    CometChatMessageListComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometChatMessageListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageListComponent.prototype.messagesRequest;
    /** @type {?} */
    CometChatMessageListComponent.prototype.limit;
    /** @type {?} */
    CometChatMessageListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatMessageListComponent.prototype.times;
    /** @type {?} */
    CometChatMessageListComponent.prototype.lastScrollTop;
    /** @type {?} */
    CometChatMessageListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatMessageListComponent.prototype.msgListenerId;
    /** @type {?} */
    CometChatMessageListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometChatMessageListComponent.prototype.callListenerId;
    /** @type {?} */
    CometChatMessageListComponent.prototype.prevUser;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_TEXT;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_IMAGE;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_VIDEO;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_AUDIO;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_FILE;
    /** @type {?} */
    CometChatMessageListComponent.prototype.MESSAGE_TYPE_CUSTOM;
    /** @type {?} */
    CometChatMessageListComponent.prototype.CALL_TYPE_AUDIO;
    /** @type {?} */
    CometChatMessageListComponent.prototype.CALL_TYPE_VIDEO;
    /** @type {?} */
    CometChatMessageListComponent.prototype.CATEGORY_MESSAGE;
    /** @type {?} */
    CometChatMessageListComponent.prototype.CATEGORY_ACTION;
    /** @type {?} */
    CometChatMessageListComponent.prototype.CATEGORY_CALL;
    /** @type {?} */
    CometChatMessageListComponent.prototype.categories;
    /** @type {?} */
    CometChatMessageListComponent.prototype.types;
    /**
     * Detects if the message that was edit is you current open conversation window
     * \@param Any message
     * @type {?}
     */
    CometChatMessageListComponent.prototype.messageEdited;
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * \@param Any message
     * @type {?}
     */
    CometChatMessageListComponent.prototype.updateEditedMessage;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * \@param
     * @type {?}
     */
    CometChatMessageListComponent.prototype.groupUpdated;
    /**
     * Adds Metadata to Poll
     * \@param message
     * @type {?}
     */
    CometChatMessageListComponent.prototype.addMetadataToCustomData;
    /**
     * @type {?}
     * @private
     */
    CometChatMessageListComponent.prototype.ref;
    /** @type {?} */
    CometChatMessageListComponent.prototype.datepipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtbWVzc2FnZS1saXN0L2NvbWV0Y2hhdC1tZXNzYWdlLWxpc3QvY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUlaLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2xELE1BQU0sT0FBTyw2QkFBNkI7Ozs7O0lBcUR4QyxZQUFvQixHQUFzQixFQUFTLFFBQWtCO1FBQWpELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQW5ENUQsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsNkJBQXdCLEdBQUcsRUFBRSxDQUFDO1FBRTdCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEUsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLHFCQUFnQixHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ3hELFVBQUssR0FBRyxD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O0lBQ3hELDREQUE0RDs7SUFDNUQsd0RBQW9EOztJQUNwRCx3REFBb0Q7O0lBQ3BELHlEQUFzRDs7SUFDdEQsd0RBQW9EOztJQUNwRCxzREFBZ0Q7O0lBRWhELG1EQUtFOztJQUNGLDhDQVdFOzs7Ozs7SUFpbUJGLHNEQTBCRTs7Ozs7O0lBTUYsNERBeUJFOzs7Ozs7SUFNRixxREFlRTs7Ozs7O0lBZ0dGLGdFQStCRTs7Ozs7SUE1eUJVLDRDQUE4Qjs7SUFBRSxpREFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TWVzc2FnZUxpc3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBwYXJlbnRNZXNzYWdlSWQgPSBudWxsO1xuXG4gIEBJbnB1dCgpIG1lc3NhZ2VzID0gW107XG4gIEBJbnB1dCgpIHJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IFtdO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VzUmVxdWVzdDtcbiAgbGltaXQgPSA1MDtcbiAgZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTE9BRElOR19NRVNTU0FHRTtcbiAgdGltZXMgPSAwO1xuICBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBtc2dMaXN0ZW5lcklkID0gZW51bXMuTUVTU0FHRV8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gZW51bXMuR1JPVVBfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNhbGxMaXN0ZW5lcklkID0gZW51bXMuQ0FMTF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgcHJldlVzZXI7XG5cbiAgTUVTU0FHRV9UWVBFX1RFWFQ6IFN0cmluZyA9IENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVEVYVDtcbiAgTUVTU0FHRV9UWVBFX0lNQUdFOiBTdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFO1xuICBNRVNTQUdFX1RZUEVfVklERU86IFN0cmluZyA9IENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVklERU87XG4gIE1FU1NBR0VfVFlQRV9BVURJTzogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5BVURJTztcbiAgTUVTU0FHRV9UWVBFX0ZJTEU6IFN0cmluZyA9IENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuRklMRTtcbiAgTUVTU0FHRV9UWVBFX0NVU1RPTTogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5DVVNUT007XG4gIENBTExfVFlQRV9BVURJTzogU3RyaW5nID0gQ29tZXRDaGF0LkNBTExfVFlQRS5BVURJTztcbiAgQ0FMTF9UWVBFX1ZJREVPOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPO1xuICBDQVRFR09SWV9NRVNTQUdFOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FURUdPUllfTUVTU0FHRTtcbiAgQ0FURUdPUllfQUNUSU9OOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FURUdPUllfQUNUSU9OO1xuICBDQVRFR09SWV9DQUxMOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FURUdPUllfQ0FMTDtcblxuICBjYXRlZ29yaWVzID0gW1xuICAgIENvbWV0Q2hhdC5DQVRFR09SWV9NRVNTQUdFLFxuICAgIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuQ1VTVE9NLFxuICAgIENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT04sXG4gICAgQ29tZXRDaGF0LkNBVEVHT1JZX0NBTEwsXG4gIF07XG4gIHR5cGVzID0gW1xuICAgIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVEVYVCxcbiAgICBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFLFxuICAgIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVklERU8sXG4gICAgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5BVURJTyxcbiAgICBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkZJTEUsXG4gICAgZW51bXMuQ1VTVE9NX1RZUEVfUE9MTCxcbiAgICBlbnVtcy5DVVNUT01fVFlQRV9TVElDS0VSLFxuICAgIGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8sXG4gICAgQ29tZXRDaGF0LkNBTExfVFlQRS5WSURFTyxcbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICB0cnkge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucmVmW2VudW1zLkRFU1RST1lFRF0pIHtcbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1MDApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2hhbmdlW2VudW1zLklURU1dKSB7XG4gICAgICAgIC8vUmVtb3ZpbmcgUHJldmlvdXMgQ29udmVyc2F0aW9uIExpc3RlbmVyc1xuICAgICAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubXNnTGlzdGVuZXJJZCk7XG4gICAgICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgICAgICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcblxuICAgICAgICB0aGlzLm1zZ0xpc3RlbmVySWQgPSBlbnVtcy5NRVNTQUdFXyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmdyb3VwTGlzdGVuZXJJZCA9IGVudW1zLkdST1VQXyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkID0gZW51bXMuQ0FMTF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1lc3NhZ2VSZXF1ZXN0T2JqZWN0QW5kR2V0TWVzc2FnZXMoKTtcblxuICAgICAgICAvLyBBdHRhY2ggTWVzc2FnZUxpc3RlbmVycyBmb3IgdGhlIG5ldyBjb252ZXJzYXRpb25cbiAgICAgICAgdGhpcy5hZGRNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5SRUFDSEVEX1RPUF9PRl9DT05WRVJTQVRJT05dKSB7XG4gICAgICAgIGlmIChjaGFuZ2VbZW51bXMuUkVBQ0hFRF9UT1BfT0ZfQ09OVkVSU0FUSU9OXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmdldE1lc3NhZ2VzKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbmV3IHRocmVhZCBvcGVuZWRcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuUEFSRU5UX01FU1NBR0VfSURdKSB7XG4gICAgICAgIC8vUmVtb3ZpbmcgUHJldmlvdXMgdGhyZWFkIExpc3RlbmVyc1xuICAgICAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubXNnTGlzdGVuZXJJZCk7XG4gICAgICAgIHRoaXMubXNnTGlzdGVuZXJJZCA9IGVudW1zLk1FU1NBR0VfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTWVzc2FnZVJlcXVlc3RPYmplY3RBbmRHZXRNZXNzYWdlcygpO1xuXG4gICAgICAgIC8vIEF0dGFjaCBNZXNzYWdlTGlzdGVuZXJzIGZvciB0aGUgbmV3IGNvbnZlcnNhdGlvblxuICAgICAgICB0aGlzLmFkZE1lc3NhZ2VFdmVudExpc3RlbmVycygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlW2VudW1zLk1FU1NBR0VEXSkge1xuICAgICAgICBpZiAoY2hhbmdlW2VudW1zLk1FU1NBR0VEXS5jdXJyZW50VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jcmVhdGVNZXNzYWdlUmVxdWVzdE9iamVjdEFuZEdldE1lc3NhZ2VzKCk7XG5cbiAgICAgIC8vIEF0dGFjaCBNZXNzYWdlTGlzdGVuZXJzIEhlcmVcbiAgICAgIHRoaXMuYWRkTWVzc2FnZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vUmVtb3ZpbmcgTWVzc2FnZSBMaXN0ZW5lcnNcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5tc2dMaXN0ZW5lcklkKTtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBNZXNzYWdlIFJlcXVlc3Qgb2JqZWN0ICggaG9sZGluZyB0aGUgY29uZmlnICwgdGhhdCBpcyB0aGUgdHdvIHVzZXIgaW52b2x2ZWQgaW4gY29udmVyc2F0aW9uICkgYW5kIGdldHMgYWxsIHRoZSBtZXNzYWdlc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VSZXF1ZXN0T2JqZWN0QW5kR2V0TWVzc2FnZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzUmVxdWVzdCA9IHRoaXMuYnVpbGRNZXNzYWdlUmVxdWVzdE9iamVjdChcbiAgICAgICAgICB0aGlzLml0ZW0sXG4gICAgICAgICAgdGhpcy50eXBlLFxuICAgICAgICAgIHRoaXMucGFyZW50TWVzc2FnZUlkXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzUmVxdWVzdCA9IHRoaXMuYnVpbGRNZXNzYWdlUmVxdWVzdE9iamVjdChcbiAgICAgICAgICB0aGlzLml0ZW0sXG4gICAgICAgICAgdGhpcy50eXBlXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoZmFsc2UsIHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBUbyBSZWNlaXZlIE1lc3NhZ2VzIGluIFJlYWwgVGltZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGFkZE1lc3NhZ2VFdmVudExpc3RlbmVycygpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmFkZE1lc3NhZ2VMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgICAgb25UZXh0TWVzc2FnZVJlY2VpdmVkOiAodGV4dE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuVEVYVF9NRVNTQUdFX1JFQ0VJVkVELCB0ZXh0TWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbk1lZGlhTWVzc2FnZVJlY2VpdmVkOiAobWVkaWFNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQsIG1lZGlhTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkN1c3RvbU1lc3NhZ2VSZWNlaXZlZDogKGN1c3RvbU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRUQsIGN1c3RvbU1lc3NhZ2UpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25NZXNzYWdlc0RlbGl2ZXJlZDogKG1lc3NhZ2VSZWNlaXB0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfREVMSVZFUkVELCBtZXNzYWdlUmVjZWlwdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbk1lc3NhZ2VzUmVhZDogKG1lc3NhZ2VSZWNlaXB0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfUkVBRCwgbWVzc2FnZVJlY2VpcHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25NZXNzYWdlRGVsZXRlZDogKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfREVMRVRFRCwgZGVsZXRlZE1lc3NhZ2UpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25NZXNzYWdlRWRpdGVkOiAoZWRpdGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5NRVNTQUdFX0VESVRFRCwgZWRpdGVkTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIENvbWV0Q2hhdC5hZGRHcm91cExpc3RlbmVyKFxuICAgICAgICB0aGlzLmdyb3VwTGlzdGVuZXJJZCxcbiAgICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyU2NvcGVDaGFuZ2VkOiAoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICBuZXdTY29wZSxcbiAgICAgICAgICAgIG9sZFNjb3BlLFxuICAgICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKFxuICAgICAgICAgICAgICBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgY2hhbmdlZEdyb3VwLFxuICAgICAgICAgICAgICB7IHVzZXI6IGNoYW5nZWRVc2VyLCBzY29wZTogbmV3U2NvcGUgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChcbiAgICAgICAgICAgICAgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAga2lja2VkRnJvbSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChcbiAgICAgICAgICAgICAgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgYmFubmVkRnJvbSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6IGJhbm5lZFVzZXIsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyVW5iYW5uZWQ6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICB1bmJhbm5lZEJ5LFxuICAgICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKFxuICAgICAgICAgICAgICBlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIHVuYmFubmVkRnJvbSxcbiAgICAgICAgICAgICAgeyB1c2VyOiB1bmJhbm5lZFVzZXIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChcbiAgICAgICAgICAgICAgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELFxuICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICB1c2VyQWRkZWRJbixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgICAgICBoYXNKb2luZWQ6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgbWVzc2FnZSwgZ3JvdXAsIHtcbiAgICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChcbiAgICAgICAgICAgICAgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgam9pbmVkR3JvdXAsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBDb21ldENoYXQuYWRkQ2FsbExpc3RlbmVyKFxuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0LkNhbGxMaXN0ZW5lcih7XG4gICAgICAgICAgb25JbmNvbWluZ0NhbGxSZWNlaXZlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuSU5DT01JTkdfQ0FMTF9SRUNFSVZFRCwgY2FsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQsIGNhbGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25PdXRnb2luZ0NhbGxBY2NlcHRlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuT1VUR09JTkdfQ0FMTF9BQ0NFUFRFRCwgY2FsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbk91dGdvaW5nQ2FsbFJlamVjdGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVELCBjYWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBCdWlsZCBNZXNzYWdlIFJlcXVlc3QgQ29uZmlndXJhdGlvbiBPYmplY3QgLCB0aGF0IGhlbHBzIGluIGdldHRpbmcgbWVzc2FnZXMgb2YgYSBwYXJ0aWN1bGFyIGNvbnZlcnNhdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIGJ1aWxkTWVzc2FnZVJlcXVlc3RPYmplY3QoaXRlbSA9IG51bGwsIHR5cGUgPSBudWxsLCBwYXJlbnRNZXNzYWdlSWQgPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBtZXNzYWdlUmVxdWVzdEJ1aWx0O1xuXG4gICAgICBpZiAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICBpZiAocGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgICAuc2V0VUlEKGl0ZW0udWlkKVxuICAgICAgICAgICAgLnNldFBhcmVudE1lc3NhZ2VJZChwYXJlbnRNZXNzYWdlSWQpXG4gICAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAgIC5zZXRMaW1pdCh0aGlzLmxpbWl0KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgICAuc2V0VUlEKGl0ZW0udWlkKVxuICAgICAgICAgICAgLnNldENhdGVnb3JpZXModGhpcy5jYXRlZ29yaWVzKVxuICAgICAgICAgICAgLnNldFR5cGVzKHRoaXMudHlwZXMpXG4gICAgICAgICAgICAuaGlkZVJlcGxpZXModHJ1ZSlcbiAgICAgICAgICAgIC5zZXRMaW1pdCh0aGlzLmxpbWl0KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgaWYgKHBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgICAgIG1lc3NhZ2VSZXF1ZXN0QnVpbHQgPSBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAgICAgLnNldEdVSUQoaXRlbS5ndWlkKVxuICAgICAgICAgICAgLnNldFBhcmVudE1lc3NhZ2VJZChwYXJlbnRNZXNzYWdlSWQpXG4gICAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAgIC5zZXRMaW1pdCh0aGlzLmxpbWl0KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgICAuc2V0R1VJRChpdGVtLmd1aWQpXG4gICAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAgIC5oaWRlUmVwbGllcyh0cnVlKVxuICAgICAgICAgICAgLnNldExpbWl0KHRoaXMubGltaXQpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVzc2FnZVJlcXVlc3RCdWlsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBNZXNzYWdlcyBGb3IgYSBwYXJ0aWN1bGFyIGNvbnZlcnNhdGlvbiBiYXNlcyBvbiBNZXNzYWdlUmVxdWVzdENvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldE1lc3NhZ2VzKFxuICAgIHNjcm9sbFRvQm90dG9tID0gZmFsc2UsXG4gICAgbmV3Q29udmVyc2F0aW9uID0gZmFsc2UsXG4gICAgc2Nyb2xsVG9Ub3AgPSBmYWxzZVxuICApIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5MT0FESU5HX01FU1NTQUdFO1xuICAgICAgY29uc3QgYWN0aW9uTWVzc2FnZXMgPSBbXTtcblxuICAgICAgbGV0IHVzZXIgPSBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbihcbiAgICAgICAgKHVzZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG5cbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzUmVxdWVzdC5mZXRjaFByZXZpb3VzKCkudGhlbihcbiAgICAgICAgICAgIChtZXNzYWdlTGlzdCkgPT4ge1xuICAgICAgICAgICAgICAvLyBObyBNZXNzYWdlcyBGb3VuZFxuICAgICAgICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoID09PSAwICYmIHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19NRVNTQUdFU19GT1VORDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbWVzc2FnZUxpc3QuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2F0ZWdvcnkgPT09IENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT04gJiZcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2Uuc2VuZGVyLnVpZCA9PT0gZW51bXMuQVBQX1NZU1RFTVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgYWN0aW9uTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2lmIHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UgaXMgbm90IHRoZSBsb2dnZWRpbiB1c2VyLCBtYXJrIGl0IGFzIHJlYWQuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS5nZXRVaWQoKSAhPT0gdXNlci5nZXRVaWQoKSAmJlxuICAgICAgICAgICAgICAgICAgIW1lc3NhZ2UuZ2V0UmVhZEF0KClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUlxuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkuZ2V0VWlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVBcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX19SRUFELFxuICAgICAgICAgICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICArK3RoaXMudGltZXM7XG5cbiAgICAgICAgICAgICAgbGV0IGFjdGlvbkdlbmVyYXRlZFR5cGUgPSBlbnVtcy5NRVNTQUdFX0ZFVENIRUQ7XG4gICAgICAgICAgICAgIGlmIChzY3JvbGxUb0JvdHRvbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbkdlbmVyYXRlZFR5cGUgPSBlbnVtcy5NRVNTQUdFX0ZFVENIRURfQUdBSU47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9Ub3ApIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25HZW5lcmF0ZWRUeXBlID0gZW51bXMuT0xERVJfTUVTU0FHRVNfRkVUQ0hFRDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE9ubHkgY2FsbGVkIHdoZW4gdGhlIGFjdGl2ZSB1c2VyIGNoYW5nZXMgdGhlIHRoZSBjb252ZXJzYXRpb24gLCB0aGF0IGlzIHN3aXRjaGVzIHRvIHNvbWUgb3RoZXIgcGVyc29uXG4gICAgICAgICAgICAgIC8vIHRvIGNoYXQgd2l0aFxuICAgICAgICAgICAgICBpZiAobmV3Q29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uR2VuZXJhdGVkVHlwZSA9IGVudW1zLk5FV19DT05WRVJTQVRJT05fT1BFTkVEO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLnRpbWVzID09PSAxICYmIGFjdGlvbk1lc3NhZ2VzLmxlbmd0aCA+IDUpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMudGltZXMgPiAxICYmIGFjdGlvbk1lc3NhZ2VzLmxlbmd0aCA9PT0gMzApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9GRVRDSEVELFxuICAgICAgICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNZXNzYWdlcyh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25HZW5lcmF0ZWRUeXBlLFxuICAgICAgICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgLy8gbG9nZ2VyKFwiTWVzc2FnZSBmZXRjaGluZyBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIk5vIExvZ2dlZCBJbiBVc2VyIEZvdW5kXCIsIHsgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgbWVzc2FnZUxpc3Qgb24gYmFzaXMgb2YgdXNlciBhY3Rpdml0eSBvciBncm91cCBhY3Rpdml0eSBvciBjYWxsaW5nIGFjdGl2aXR5XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVzc2FnZVVwZGF0ZWQoa2V5ID0gbnVsbCwgbWVzc2FnZSA9IG51bGwsIGdyb3VwID0gbnVsbCwgb3B0aW9ucyA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICAgIGNhc2UgZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTElWRVJFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1JFQUQ6XG4gICAgICAgICAgdGhpcy5tZXNzYWdlUmVhZEFuZERlbGl2ZXJlZChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURUQ6IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VEZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElURUQ6IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9MRUZUOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVEOiB7XG4gICAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgICB0aGlzLmN1c3RvbU1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVEOlxuICAgICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfQUNDRVBURUQ6XG4gICAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgICAgICB0aGlzLmNhbGxVcGRhdGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIE1lc3NhZ2UgaXMgUmVjZWl2ZWRcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICAgICkge1xuICAgICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCksXG4gICAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfUkVDRUlWRUQsXG4gICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkID09PSB0aGlzLml0ZW0udWlkXG4gICAgICApIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkLFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1JFQ0VJVkVELFxuICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgU3RhdHVzIG9mIG1lc3NhZ2VzIGkuZSBzZW50L2RlbGl2ZXJlZC9yZWFkXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlUmVhZEFuZERlbGl2ZXJlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLmdldFVpZCgpID09PSB0aGlzLml0ZW0udWlkICYmXG4gICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKSA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkXG4gICAgICApIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZXNdO1xuXG4gICAgICAgIGlmIChtZXNzYWdlLmdldFJlY2VpcHRUeXBlKCkgPT09IGVudW1zLkRFTElWRVJZKSB7XG4gICAgICAgICAgLy9zZWFyY2ggZm9yIG1lc3NhZ2VcbiAgICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChtKSA9PiBtLmlkID09PSBtZXNzYWdlLm1lc3NhZ2VJZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZUxpc3RbbWVzc2FnZUtleV0gfTtcbiAgICAgICAgICAgIGxldCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwge1xuICAgICAgICAgICAgICBkZWxpdmVyZWRBdDogbWVzc2FnZS5nZXREZWxpdmVyZWRBdCgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1VQREFURUQsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VMaXN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZ2V0UmVjZWlwdFR5cGUoKSA9PT0gZW51bXMuUkVBRCkge1xuICAgICAgICAgIC8vc2VhcmNoIGZvciBtZXNzYWdlXG4gICAgICAgICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgICAobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5tZXNzYWdlSWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldIH07XG4gICAgICAgICAgICBsZXQgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIHtcbiAgICAgICAgICAgICAgcmVhZEF0OiBtZXNzYWdlLmdldFJlYWRBdCgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1VQREFURUQsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VMaXN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICAgICkge1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IGEgbWVzc2FnZSB3YXMgZGVsZXRlZCBieSB0aGUgdXNlci9wZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZURlbGV0ZWQobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkID09PSB0aGlzLml0ZW0udWlkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0cyBpZiB0aGUgbWVzc2FnZSB0aGF0IHdhcyBlZGl0IGlzIHlvdSBjdXJyZW50IG9wZW4gY29udmVyc2F0aW9uIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VFZGl0ZWQgPSAobWVzc2FnZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVFZGl0ZWRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSAmJlxuICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRWRpdGVkTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS51aWRcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZUVkaXRlZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IGEgbWVzc2FnZSB3YXMgZGVsZXRlZCBieSB0aGUgdXNlci9wZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdXBkYXRlRWRpdGVkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vSWYgdGhlIHVwZGF0ZWQgbWVzc2FnZSBpcyB0aGUgY3VycmVudCBtZXNzYWdlIHRoYXQgaXMgb3BlbmVkIGluIHRocmVhZCB2aWV3IHRoZW4gdXBkYXRlIHRocmVhZCB2aWV3IGFsc29cbiAgICAgIGlmIChtZXNzYWdlLmlkID09IHRoaXMucGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVELFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlc107XG4gICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSwgaykgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuICAgICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgICAgbWVzc2FnZUxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1VQREFURUQsXG4gICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gQWN0aW9uIEluZGljYXRpbmcgdGhhdCBHcm91cCBEYXRhIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuR1JPVVBfVVBEQVRFRCxcbiAgICAgICAgICBwYXlMb2FkOiB7IG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBXaGVuIGN1c3RvbSBtZXNzYWdlcyBhcmUgcmVjZWl2ZWQgZWcuIFBvbGwsIFN0aWNrZXJzIGVtaXRzIGFjdGlvbiB0byB1cGRhdGUgbWVzc2FnZSBsaXN0XG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBjdXN0b21NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpLFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5NRVRBREFUQSkgJiZcbiAgICAgICAgICBtZXNzYWdlLnR5cGUgIT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIgJiZcbiAgICAgICAgICBtZXNzYWdlLnR5cGUgIT09IGVudW1zLkNVU1RPTV9UWVBFX1BPTExcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUikge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1BPTEwpIHtcbiAgICAgICAgICAvL2N1c3RvbWRhdGEgKHBvbGwgZXh0ZW5zaW9uKSBkb2VzIG5vdCBoYXZlIG1ldGFkYXRhXG5cbiAgICAgICAgICAvL1RoZSBwb2xsIG1lc3NhZ2UgdGhhdCAgaXMgcmVjZWl2ZWQgYnkgdGhlIG1lc3NhZ2UgbGlzdGVuZXJzICwgd2lsbCBub3QgYmUgYXBwZW5kZWQgdG8gbWVzc2FnZSBsaXN0XG4gICAgICAgICAgLy9pZiB0aGUgY3VycmVudCBsb2dnZWRJbiB1c2VyIGlzIHRoZSBzZW5kZXIvY3JlYXRvciBvZiB0aGUgcG9sbCBtZXNzYWdlXG4gICAgICAgICAgaWYgKG1lc3NhZ2Uuc2VuZGVyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbmV3TWVzc2FnZSA9IHRoaXMuYWRkTWV0YWRhdGFUb0N1c3RvbURhdGEobWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICAgKSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5nZXRSZWFkQXQoKSkge1xuICAgICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCxcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuTUVUQURBVEEpICYmXG4gICAgICAgICAgbWVzc2FnZS50eXBlICE9PSBlbnVtcy5DVVNUT01fVFlQRV9TVElDS0VSICYmXG4gICAgICAgICAgbWVzc2FnZS50eXBlICE9PSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIpIHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkUsXG4gICAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMKSB7XG4gICAgICAgICAgLy9jdXN0b21kYXRhIChwb2xsIGV4dGVuc2lvbikgZG9lcyBub3QgaGF2ZSBtZXRhZGF0YVxuXG4gICAgICAgICAgY29uc3QgbmV3TWVzc2FnZSA9IHRoaXMuYWRkTWV0YWRhdGFUb0N1c3RvbURhdGEobWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgTWV0YWRhdGEgdG8gUG9sbFxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgYWRkTWV0YWRhdGFUb0N1c3RvbURhdGEgPSAobWVzc2FnZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjdXN0b21EYXRhID0gbWVzc2FnZS5kYXRhLmN1c3RvbURhdGE7XG4gICAgICBjb25zdCBvcHRpb25zID0gY3VzdG9tRGF0YS5vcHRpb25zO1xuXG4gICAgICBjb25zdCByZXN1bHRPcHRpb25zID0ge307XG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHJlc3VsdE9wdGlvbnNbb3B0aW9uXSA9IHtcbiAgICAgICAgICB0ZXh0OiBvcHRpb25zW29wdGlvbl0sXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvbGxzID0ge1xuICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgIG9wdGlvbnM6IHJlc3VsdE9wdGlvbnMsXG4gICAgICAgICAgcXVlc3Rpb246IGN1c3RvbURhdGEucXVlc3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHF1ZXN0aW9uOiBjdXN0b21EYXRhLnF1ZXN0aW9uLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubWVzc2FnZSxcbiAgICAgICAgbWV0YWRhdGE6IHsgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBwb2xscyB9IH0gfSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjYWxsTWVzc2FnZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgY2FsbFVwZGF0ZWQobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpLFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX1VQREFURUQsXG4gICAgICAgICAgcGF5TG9hZDogbWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICAgKSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5nZXRSZWFkQXQoKSkge1xuICAgICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCxcbiAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ0FMTF9VUERBVEVELFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gZGF0ZXMgYW5kIHNldHMgRGF0ZSBvbiBhIGEgbmV3IGRheVxuICAgKi9cbiAgaXNEYXRlRGlmZmVyZW50KGZpcnN0RGF0ZSwgc2Vjb25kRGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZmlyc3REYXRlT2JqOiBEYXRlLCBzZWNvbmREYXRlT2JqOiBEYXRlO1xuICAgICAgZmlyc3REYXRlT2JqID0gbmV3IERhdGUoZmlyc3REYXRlICogMTAwMCk7XG4gICAgICBzZWNvbmREYXRlT2JqID0gbmV3IERhdGUoc2Vjb25kRGF0ZSAqIDEwMDApO1xuICAgICAgaWYgKFxuICAgICAgICBmaXJzdERhdGVPYmouZ2V0RGF0ZSgpID09PSBzZWNvbmREYXRlT2JqLmdldERhdGUoKSAmJlxuICAgICAgICBmaXJzdERhdGVPYmouZ2V0TW9udGgoKSA9PT0gc2Vjb25kRGF0ZU9iai5nZXRNb250aCgpICYmXG4gICAgICAgIGZpcnN0RGF0ZU9iai5nZXRGdWxsWWVhcigpID09PSBzZWNvbmREYXRlT2JqLmdldEZ1bGxZZWFyKClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==