/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-list/cometchat-message-list/cometchat-message-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { DatePipe } from "@angular/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatMessageListComponent {
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
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.times = 0;
        this.lastScrollTop = 0;
        this.msgListenerId = "message_" + new Date().getTime();
        this.groupListenerId = "group_" + new Date().getTime();
        this.callListenerId = "call_" + new Date().getTime();
        this.categories = [
            enums.CATEGORY_MESSAGE,
            enums.CATEGORY_CUSTOM,
            enums.CATEGORY_ACTION,
            enums.CATEGORY_CALL,
        ];
        this.types = [
            enums.MESSAGE_TYPE_TEXT,
            enums.MESSAGE_TYPE_IMAGE,
            enums.MESSAGE_TYPE_VIDEO,
            enums.MESSAGE_TYPE_AUDIO,
            enums.MESSAGE_TYPE_FILE,
            enums.CUSTOM_TYPE_POLL,
            enums.CUSTOM_TYPE_STICKER,
            enums.ACTION_TYPE_GROUPMEMBER,
            enums.CALL_TYPE_AUDIO,
            enums.CALL_TYPE_VIDEO,
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
            if (this.type === "group" &&
                message.getReceiverType() === "group" &&
                message.getReceiver().guid === this.item.guid) {
                this.updateEditedMessage(message);
            }
            else if (this.type === "user" &&
                message.getReceiverType() === "user" &&
                this.loggedInUser.uid === message.getReceiverId() &&
                message.getSender().uid === this.item.uid) {
                this.updateEditedMessage(message);
            }
            else if (this.type === "user" &&
                message.getReceiverType() === "user" &&
                this.loggedInUser.uid === message.getSender().uid &&
                message.getReceiverId() === this.item.uid) {
                this.updateEditedMessage(message);
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
            if (this.type === "group" &&
                message.getReceiverType() === "group" &&
                message.getReceiver().guid === this.item.guid) {
                this.actionGenerated.emit({
                    type: enums.GROUP_UPDATED,
                    payLoad: { message, key, group, options },
                });
            }
        });
        this.addMetadataToCustomData = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
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
        });
        setInterval((/**
         * @return {?}
         */
        () => {
            if (!this.ref["destroyed"]) {
                this.ref.detectChanges();
            }
        }), 2500);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["item"]) {
            //Removing Previous Conversation Listeners
            CometChat.removeMessageListener(this.msgListenerId);
            CometChat.removeGroupListener(this.groupListenerId);
            CometChat.removeCallListener(this.callListenerId);
            this.msgListenerId = "message_" + new Date().getTime();
            this.groupListenerId = "group_" + new Date().getTime();
            this.callListenerId = "call_" + new Date().getTime();
            this.createMessageRequestObjectAndGetMessages();
            // Attach MessageListeners for the new conversation
            this.addMessageEventListeners();
        }
        if (change["reachedTopOfConversation"]) {
            if (change["reachedTopOfConversation"].currentValue) {
                this.getMessages(false, false, true);
            }
        }
        // new thread opened
        if (change["parentMessageId"]) {
            //Removing Previous thread Listeners
            CometChat.removeMessageListener(this.msgListenerId);
            this.msgListenerId = "message_" + new Date().getTime();
            this.createMessageRequestObjectAndGetMessages();
            // Attach MessageListeners for the new conversation
            this.addMessageEventListeners();
        }
        if (change["messages"]) {
            if (change["messages"].currentValue.length > 0) {
                this.decoratorMessage = "";
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createMessageRequestObjectAndGetMessages();
        // Attach MessageListeners Here
        this.addMessageEventListeners();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // removinf the changeDetector Ref
        //this.ref.detach();
        //Removing Message Listeners
        CometChat.removeMessageListener(this.msgListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
        CometChat.removeCallListener(this.callListenerId);
    }
    /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @return {?}
     */
    createMessageRequestObjectAndGetMessages() {
        if (this.parentMessageId) {
            this.messagesRequest = this.buildMessageRequestObject(this.item, this.type, this.parentMessageId);
        }
        else {
            this.messagesRequest = this.buildMessageRequestObject(this.item, this.type);
        }
        this.getMessages(false, true);
    }
    /**
     * Listener To Receive Messages in Real Time
     * @return {?}
     */
    addMessageEventListeners() {
        CometChat.addMessageListener(this.msgListenerId, new CometChat.MessageListener({
            onTextMessageReceived: (/**
             * @param {?} textMessage
             * @return {?}
             */
            (textMessage) => {
                // console.log("Text message received successfully", textMessage);
                this.messageUpdated(enums.TEXT_MESSAGE_RECEIVED, textMessage);
            }),
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            (mediaMessage) => {
                // console.log("Media message received successfully", mediaMessage);
                this.messageUpdated(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
            }),
            onCustomMessageReceived: (/**
             * @param {?} customMessage
             * @return {?}
             */
            (customMessage) => {
                // console.log("Custom message received successfully", customMessage);
                this.messageUpdated(enums.CUSTOM_MESSAGE_RECEIVED, customMessage);
                // Handle custom message
            }),
            onMessagesDelivered: (/**
             * @param {?} messageReceipt
             * @return {?}
             */
            (messageReceipt) => {
                // console.log("Text Message Delivered successfully ", messageReceipt);
                this.messageUpdated(enums.MESSAGE_DELIVERED, messageReceipt);
            }),
            onMessagesRead: (/**
             * @param {?} messageReceipt
             * @return {?}
             */
            (messageReceipt) => {
                // console.log("Text Message Read successfully ", messageReceipt);
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
    /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param {?=} item
     * @param {?=} type
     * @param {?=} parentMessageId
     * @return {?}
     */
    buildMessageRequestObject(item = null, type = null, parentMessageId = null) {
        /** @type {?} */
        let messageRequestBuilt;
        if (type === "user") {
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
        else if (type === "group") {
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
    /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param {?=} scrollToBottom
     * @param {?=} newConversation
     * @param {?=} scrollToTop
     * @return {?}
     */
    getMessages(scrollToBottom = false, newConversation = false, scrollToTop = false) {
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
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
                    this.decoratorMessage = STRING_MESSAGES.NO_MESSAGES_FOUND;
                }
                else {
                    this.decoratorMessage = "";
                }
                messageList.forEach((/**
                 * @param {?} message
                 * @return {?}
                 */
                (message) => {
                    if (message.category === "action" &&
                        message.sender.uid === "app_system") {
                        actionMessages.push(message);
                    }
                    //if the sender of the message is not the loggedin user, mark it as read.
                    if (message.getSender().getUid() !== user.getUid() &&
                        !message.getReadAt()) {
                        if (message.getReceiverType() === "user") {
                            CometChat.markAsRead(message.getId().toString(), message.getSender().getUid(), message.getReceiverType());
                        }
                        else if (message.getReceiverType() === "group") {
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
                let actionGeneratedType = "messageFetched";
                if (scrollToBottom === true) {
                    actionGeneratedType = "messageFetchedAgain";
                }
                if (scrollToTop) {
                    actionGeneratedType = "olderMessagesFetched";
                }
                // Only called when the active user changes the the conversation , that is switches to some other person
                // to chat with
                if (newConversation) {
                    actionGeneratedType = "newConversationOpened";
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
                    // Implement Scroll Logic from React
                    // this.lastScrollTop = this.messagesEnd.scrollHeight;
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
                // console.log("Message fetching failed with error:", error);
            }));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("No Logged In User Found", { error });
        }));
    }
    /**
     * @param {?=} key
     * @param {?=} message
     * @param {?=} group
     * @param {?=} options
     * @return {?}
     */
    messageUpdated(key = null, message = null, group = null, options = null) {
        //there are many cases to be filled Here
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
    /**
     * @param {?} message
     * @return {?}
     */
    messageReceived(message) {
        //new messages
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiverId() === this.item.guid) {
            if (!message.getReadAt()) {
                CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
            }
            this.actionGenerated.emit({
                type: enums.MESSAGE_RECEIVED,
                payLoad: [message],
            });
        }
        else if (this.type === "user" &&
            message.getReceiverType() === "user" &&
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
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    messageReadAndDelivered(message) {
        if (message.getReceiverType() === "user" &&
            message.getSender().getUid() === this.item.uid &&
            message.getReceiver() === this.loggedInUser.uid) {
            /** @type {?} */
            let messageList = [...this.messages];
            if (message.getReceiptType() === "delivery") {
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
            else if (message.getReceiptType() === "read") {
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
        else if (message.getReceiverType() === "group" &&
            message.getReceiver().guid === this.item.guid) {
            //not implemented in React Also
        }
    }
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param {?} message
     * @return {?}
     */
    messageDeleted(message) {
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiver().guid === this.item.guid) {
            this.actionGenerated.emit({
                type: enums.MESSAGE_DELETE,
                payLoad: [message],
            });
        }
        else if (this.type === "user" &&
            message.getReceiverType() === "user" &&
            message.getSender().uid === this.item.uid) {
            this.actionGenerated.emit({
                type: enums.MESSAGE_DELETE,
                payLoad: [message],
            });
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    customMessageReceived(message) {
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiverId() === this.item.guid) {
            if (!message.getReadAt()) {
                CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
            }
            if (message.hasOwnProperty("metadata") &&
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
        else if (this.type === "user" &&
            message.getReceiverType() === "user" &&
            message.getSender().uid === this.item.uid) {
            if (!message.getReadAt()) {
                CometChat.markAsRead(message.getId().toString(), message.getSender().uid, message.getReceiverType());
            }
            if (message.hasOwnProperty("metadata") &&
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
    /**
     * @param {?} message
     * @return {?}
     */
    callUpdated(message) {
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiverId() === this.item.guid) {
            if (!message.getReadAt()) {
                CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
            }
            this.actionGenerated.emit({
                type: enums.CALL_UPDATED,
                payLoad: message,
            });
        }
        else if (this.type === "user" &&
            message.getReceiverType() === "user" &&
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
    /**
     * Compares two dates and return true if they are not equal
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    isDateDifferent(firstDate, secondDate) {
        return (this.datepipe.transform(firstDate, "d mm yyyy").toString() !==
            this.datepipe.transform(secondDate, "d mm yyyy").toString());
    }
}
CometchatMessageListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-list",
                template: "<div class=\"chatListStyle\">\n  <!--Message Container-->\n  <div class=\"decoratorMessageStyle\">\n    <p class=\"decoratorMessageTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"listWrapperStyle\">\n    <!--message-->\n    <div *ngFor=\"let msg of messages; let i = index\">\n      <div class=\"messageDateContainerStyle\" *ngIf=\"i === 0\">\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <div\n        class=\"messageDateContainerStyle\"\n        *ngIf=\"\n          i > 0 && isDateDifferent(messages[i - 1]?.sentAt, messages[i]?.sentAt)\n        \"\n      >\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <!--CASE FOR CALL MESSAGES-->\n      <div *ngIf=\"msg?.category == 'call'\">\n        <cometchat-action-message-bubble\n          [MessageDetails]=\"msg\"\n          [loggedInUserUid]=\"loggedInUser?.uid\"\n        ></cometchat-action-message-bubble>\n      </div>\n      <!--CASE FOR CALL MESSAGES ENDS-->\n      <!-- CASE FOR DELETED MESSAGES -->\n      <div *ngIf=\"msg?.deletedAt; else elseBlock\">\n        <cometchat-delete-message-bubble\n          [MessageDetails]=\"msg\"\n          [loggedInUser]=\"loggedInUser\"\n        ></cometchat-delete-message-bubble>\n      </div>\n      <!-- CASE FOR DELETED MESSAGES ENDS -->\n\n      <ng-template #elseBlock>\n        <!-- NgSwitchCase for different Types Of Bubble -->\n        <div [ngSwitch]=\"msg.type\">\n          <!-- CASE FOR TEXT -->\n          <div *ngSwitchCase=\"'text'\">\n            <cometchat-receiver-text-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [item]=\"item\"\n              [type]=\"type\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-text-message-bubble>\n            <cometchat-sender-text-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-text-message-bubble>\n          </div>\n          <!--CASE FOR TEXT ENDS -->\n          <!--CASE FOR FILE-->\n          <div *ngSwitchCase=\"'file'\">\n            <cometchat-sender-file-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-file-message-bubble>\n            <cometchat-receiver-file-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-file-message-bubble>\n          </div>\n          <!--CASE FOR FILE ENDS-->\n          <!--CASE FOR IMAGE -->\n          <div *ngSwitchCase=\"'image'\">\n            <cometchat-sender-image-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-image-message-bubble>\n            <cometchat-receiver-image-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-image-message-bubble>\n          </div>\n          <!--CASE FOR IMAGE  ENDS-->\n          <!--CASE FOR VIDEO -->\n          <div *ngSwitchCase=\"'video'\">\n            <div *ngIf=\"msg.category !== 'call'\">\n              <cometchat-sender-video-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-video-message-bubble>\n              <cometchat-receiver-video-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-video-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR VIDEO ENDS -->\n\n          <!--CASE FOR AUDIO -->\n          <div *ngSwitchCase=\"'audio'\">\n            <div *ngIf=\"msg.category !== 'call'\">\n              <cometchat-sender-audio-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-audio-message-bubble>\n              <cometchat-receiver-audio-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-audio-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR AUDIO ENDS -->\n\n          <!--CASE FOR Action Messages -->\n          <div *ngSwitchCase=\"'groupMember'\">\n            <div class=\"actionMessageStyle\">\n              <p class=\"actionMessageTxtStyle\">{{ msg?.message }}</p>\n            </div>\n          </div>\n          <!--CASE FOR Action Messages -->\n          <!--CASE FOR STICKER -->\n          <div *ngSwitchCase=\"'extension_sticker'\">\n            <cometchat-sender-sticker-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-sticker-message-bubble>\n            <cometchat-receiver-sticker-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-sticker-message-bubble>\n          </div>\n          <!--CASE FOR STICKER ENDS -->\n\n          <!--CASE FOR POLLS -->\n          <div *ngSwitchCase=\"'extension_poll'\">\n            <cometchat-sender-poll-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-poll-message-bubble>\n            <cometchat-receiver-poll-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [loggedInUserUid]=\"loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-poll-message-bubble>\n          </div>\n          <!--CASE FOR  POLLS ENDS -->\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n",
                styles: [".chatListStyle{z-index:1;width:100%;flex:1 1 0;order:2;position:relative;height:100%}.listWrapperStyle{box-sizing:border-box;display:flex;flex-direction:column;position:absolute;top:0;width:100%;z-index:100;padding-top:14px}.actionMessageTxtStyle{padding:8px 12px;margin-bottom:16px;text-align:center}.messageDateContainerStyle{text-align:center;margin-bottom:16px}.messageDateStyle{padding:8px 12px;background-color:#f6f6f6;color:#141414;border-radius:10px}.decoratorMessageStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.decoratorMessageTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}"]
            }] }
];
/** @nocollapse */
CometchatMessageListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatePipe }
];
CometchatMessageListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    parentMessageId: [{ type: Input }],
    messages: [{ type: Input }],
    reachedTopOfConversation: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatMessageListComponent.prototype.item;
    /** @type {?} */
    CometchatMessageListComponent.prototype.type;
    /** @type {?} */
    CometchatMessageListComponent.prototype.parentMessageId;
    /** @type {?} */
    CometchatMessageListComponent.prototype.messages;
    /** @type {?} */
    CometchatMessageListComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometchatMessageListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageListComponent.prototype.messagesRequest;
    /** @type {?} */
    CometchatMessageListComponent.prototype.limit;
    /** @type {?} */
    CometchatMessageListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatMessageListComponent.prototype.times;
    /** @type {?} */
    CometchatMessageListComponent.prototype.lastScrollTop;
    /** @type {?} */
    CometchatMessageListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatMessageListComponent.prototype.msgListenerId;
    /** @type {?} */
    CometchatMessageListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatMessageListComponent.prototype.callListenerId;
    /** @type {?} */
    CometchatMessageListComponent.prototype.prevUser;
    /** @type {?} */
    CometchatMessageListComponent.prototype.categories;
    /** @type {?} */
    CometchatMessageListComponent.prototype.types;
    /**
     * Detects if the message that was edit is you current open conversation window
     * \@param Any message
     * @type {?}
     */
    CometchatMessageListComponent.prototype.messageEdited;
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * \@param Any message
     * @type {?}
     */
    CometchatMessageListComponent.prototype.updateEditedMessage;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * \@param
     * @type {?}
     */
    CometchatMessageListComponent.prototype.groupUpdated;
    /** @type {?} */
    CometchatMessageListComponent.prototype.addMetadataToCustomData;
    /**
     * @type {?}
     * @private
     */
    CometchatMessageListComponent.prototype.ref;
    /** @type {?} */
    CometchatMessageListComponent.prototype.datepipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZS1saXN0L2NvbWV0Y2hhdC1tZXNzYWdlLWxpc3QvY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUlaLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLE1BQU0sT0FBTyw2QkFBNkI7Ozs7O0lBeUN4QyxZQUFvQixHQUFzQixFQUFTLFFBQWtCO1FBQWpELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXZDNUQsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsNkJBQXdCLEdBQUcsRUFBRSxDQUFDO1FBRTdCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEUsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLHFCQUFnQixHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsa0JBQWEsR0FBRyxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsRCxvQkFBZSxHQUFHLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xELG1CQUFjLEdBQUcsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFHaEQsZUFBVSxHQUFHO1lBQ1gsS0FBSyxDQUFDLGdCQUFnQjtZQUN0QixLQUFLLENBQUMsZUFBZTtZQUNyQixLQUFLLENBQUMsZUFBZTtZQUNyQixLQUFLLENBQUMsYUFBYTtTQUNwQixDQUFDO1FBQ0YsVUFBSyxHQUFHO1lBQ04sS0FBSyxDQUFDLGlCQUFpQjtZQUN2QixLQUFLLENBQUMsa0JBQWtCO1lBQ3hCLEtBQUssQ0FBQyxrQkFBa0I7WUFDeEIsS0FBSyxDQUFDLGtCQUFrQjtZQUN4QixLQUFLLENBQUMsaUJBQWlCO1lBQ3ZCLEtBQUssQ0FBQyxnQkFBZ0I7WUFDdEIsS0FBSyxDQUFDLG1CQUFtQjtZQUN6QixLQUFLLENBQUMsdUJBQXVCO1lBQzdCLEtBQUssQ0FBQyxlQUFlO1lBQ3JCLEtBQUssQ0FBQyxlQUFlO1NBQ3RCLENBQUM7Ozs7O1FBMmhCRixrQkFBYTs7OztRQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUIsSUFDRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87Z0JBQ3JCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxPQUFPO2dCQUNyQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUM3QztnQkFDQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7aUJBQU0sSUFDTCxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07Z0JBQ3BCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxNQUFNO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUNqRCxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUN6QztnQkFDQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7aUJBQU0sSUFDTCxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07Z0JBQ3BCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxNQUFNO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRztnQkFDakQsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUN6QztnQkFDQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDLEVBQUM7Ozs7O1FBTUYsd0JBQW1COzs7O1FBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoQywwR0FBMEc7WUFDMUcsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLDZCQUE2QjtvQkFDekMsT0FBTyxFQUFFLE9BQU87aUJBQ2pCLENBQUMsQ0FBQzthQUNKOztrQkFDSyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O2dCQUNsQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUM7WUFFckUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O3NCQUNiLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDOztzQkFDcEMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBRTVELFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsZUFBZTtvQkFDM0IsT0FBTyxFQUFFLFdBQVc7aUJBQ3JCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFDOzs7OztRQU1GLGlCQUFZOzs7Ozs7O1FBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM5QyxJQUNFLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTztnQkFDckIsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLE9BQU87Z0JBQ3JDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQzdDO2dCQUNBLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWE7b0JBQ3pCLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtpQkFDMUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUM7UUFtRkYsNEJBQXVCOzs7O1FBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7a0JBQzlCLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVU7O2tCQUNwQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU87O2tCQUU1QixhQUFhLEdBQUcsRUFBRTtZQUN4QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDckIsS0FBSyxFQUFFLENBQUM7aUJBQ1QsQ0FBQzthQUNIOztrQkFFSyxLQUFLLEdBQUc7Z0JBQ1osRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUU7b0JBQ1AsS0FBSyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtpQkFDOUI7Z0JBQ0QsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2FBQzlCO1lBRUQseUJBQ0ssT0FBTyxJQUNWLFFBQVEsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQzNEO1FBQ0osQ0FBQyxFQUFDO1FBeHNCQSxXQUFXOzs7UUFBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLDBDQUEwQztZQUMxQyxTQUFTLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVyRCxJQUFJLENBQUMsd0NBQXdDLEVBQUUsQ0FBQztZQUVoRCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO1lBQ3RDLElBQUksTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsWUFBWSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7U0FDRjtRQUVELG9CQUFvQjtRQUNwQixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzdCLG9DQUFvQztZQUNwQyxTQUFTLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7WUFFaEQsbURBQW1EO1lBQ25ELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7UUFFaEQsK0JBQStCO1FBQy9CLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1Qsa0NBQWtDO1FBQ2xDLG9CQUFvQjtRQUVwQiw0QkFBNEI7UUFDNUIsU0FBUyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFNRCx3Q0FBd0M7UUFDdEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUNuRCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FDbkQsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBTUQsd0JBQXdCO1FBQ3RCLFNBQVMsQ0FBQyxrQkFBa0IsQ0FDMUIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDO1lBQzVCLHFCQUFxQjs7OztZQUFFLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3JDLGtFQUFrRTtnQkFDbEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFBO1lBQ0Qsc0JBQXNCOzs7O1lBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDdkMsb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUE7WUFDRCx1QkFBdUI7Ozs7WUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUN6QyxzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNsRSx3QkFBd0I7WUFDMUIsQ0FBQyxDQUFBO1lBQ0QsbUJBQW1COzs7O1lBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDdEMsdUVBQXVFO2dCQUV2RSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUE7WUFDRCxjQUFjOzs7O1lBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDakMsa0VBQWtFO2dCQUVsRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFBO1lBQ0QsZ0JBQWdCOzs7O1lBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQTtZQUNELGVBQWU7Ozs7WUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixTQUFTLENBQUMsZ0JBQWdCLENBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUMxQix5QkFBeUI7Ozs7Ozs7O1lBQUUsQ0FDekIsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFlBQVksRUFDWixFQUFFO2dCQUNGLElBQUksQ0FBQyxjQUFjLENBQ2pCLEtBQUssQ0FBQywwQkFBMEIsRUFDaEMsT0FBTyxFQUNQLFlBQVksRUFDWixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUN2QyxDQUFDO1lBQ0osQ0FBQyxDQUFBO1lBQ0QsbUJBQW1COzs7Ozs7O1lBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtvQkFDbEUsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxtQkFBbUI7Ozs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO29CQUNsRSxJQUFJLEVBQUUsVUFBVTtpQkFDakIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBQ0QscUJBQXFCOzs7Ozs7O1lBQUUsQ0FDckIsT0FBTyxFQUNQLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDakIsS0FBSyxDQUFDLHFCQUFxQixFQUMzQixPQUFPLEVBQ1AsWUFBWSxFQUNaLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUN2QixDQUFDO1lBQ0osQ0FBQyxDQUFBO1lBQ0Qsb0JBQW9COzs7Ozs7O1lBQUUsQ0FDcEIsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtvQkFDbEUsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQTtZQUNELGlCQUFpQjs7Ozs7O1lBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO29CQUMzRCxJQUFJLEVBQUUsV0FBVztpQkFDbEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBQ0QsbUJBQW1COzs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7b0JBQ25FLElBQUksRUFBRSxVQUFVO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLFNBQVMsQ0FBQyxlQUFlLENBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN6QixzQkFBc0I7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUE7WUFDRCx1QkFBdUI7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUE7WUFDRCxzQkFBc0I7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUE7WUFDRCxzQkFBc0I7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUE7U0FDRixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7O0lBTUQseUJBQXlCLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLGVBQWUsR0FBRyxJQUFJOztZQUNwRSxtQkFBbUI7UUFFdkIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ25CLElBQUksZUFBZSxFQUFFO2dCQUNuQixtQkFBbUIsR0FBRyxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRTtxQkFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ2hCLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztxQkFDbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7cUJBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3FCQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDcEIsS0FBSyxFQUFFLENBQUM7YUFDWjtpQkFBTTtnQkFDTCxtQkFBbUIsR0FBRyxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRTtxQkFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ2hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO3FCQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDcEIsV0FBVyxDQUFDLElBQUksQ0FBQztxQkFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ3BCLEtBQUssRUFBRSxDQUFDO2FBQ1o7U0FDRjthQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLGVBQWUsRUFBRTtnQkFDbkIsbUJBQW1CLEdBQUcsSUFBSSxTQUFTLENBQUMsc0JBQXNCLEVBQUU7cUJBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FCQUNsQixrQkFBa0IsQ0FBQyxlQUFlLENBQUM7cUJBQ25DLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO3FCQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ3BCLEtBQUssRUFBRSxDQUFDO2FBQ1o7aUJBQU07Z0JBQ0wsbUJBQW1CLEdBQUcsSUFBSSxTQUFTLENBQUMsc0JBQXNCLEVBQUU7cUJBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FCQUNsQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztxQkFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUM7cUJBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3FCQUNwQixLQUFLLEVBQUUsQ0FBQzthQUNaO1NBQ0Y7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7O0lBTUQsV0FBVyxDQUNULGNBQWMsR0FBRyxLQUFLLEVBQ3RCLGVBQWUsR0FBRyxLQUFLLEVBQ3ZCLFdBQVcsR0FBRyxLQUFLO1FBRW5CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7O2NBQ25ELGNBQWMsR0FBRyxFQUFFOztZQUVyQixJQUFJLEdBQUcsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUk7Ozs7UUFDekMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBRXpCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSTs7OztZQUN2QyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNkLG9CQUFvQjtnQkFDcEIsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsaUJBQWlCLENBQUM7aUJBQzNEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7aUJBQzVCO2dCQUVELFdBQVcsQ0FBQyxPQUFPOzs7O2dCQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzlCLElBQ0UsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRO3dCQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxZQUFZLEVBQ25DO3dCQUNBLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQzlCO29CQUVELHlFQUF5RTtvQkFDekUsSUFDRSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDOUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQ3BCO3dCQUNBLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLE1BQU0sRUFBRTs0QkFDeEMsU0FBUyxDQUFDLFVBQVUsQ0FDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQzVCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FDMUIsQ0FBQzt5QkFDSDs2QkFBTSxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxPQUFPLEVBQUU7NEJBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQ2xCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDMUIsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUN2QixPQUFPLENBQUMsZUFBZSxFQUFFLENBQzFCLENBQUM7eUJBQ0g7d0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7NEJBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsYUFBYTs0QkFDekIsT0FBTyxFQUFFLE9BQU87eUJBQ2pCLENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLEVBQUMsQ0FBQztnQkFFSCxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7O29CQUVULG1CQUFtQixHQUFHLGdCQUFnQjtnQkFDMUMsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO29CQUMzQixtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztpQkFDN0M7Z0JBRUQsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsbUJBQW1CLEdBQUcsc0JBQXNCLENBQUM7aUJBQzlDO2dCQUVELHdHQUF3RztnQkFDeEcsZUFBZTtnQkFDZixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsbUJBQW1CLEdBQUcsdUJBQXVCLENBQUM7aUJBQy9DO2dCQUVELElBQ0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0MsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxFQUNoRDtvQkFDQSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlO3dCQUMzQixPQUFPLEVBQUUsV0FBVztxQkFDckIsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTCxvQ0FBb0M7b0JBQ3BDLHNEQUFzRDtvQkFFdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ3hCLElBQUksRUFBRSxtQkFBbUI7d0JBQ3pCLE9BQU8sRUFBRSxXQUFXO3FCQUNyQixDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDOzs7O1lBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDUiw2REFBNkQ7WUFDL0QsQ0FBQyxFQUNGLENBQUM7UUFDSixDQUFDOzs7O1FBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFDRjtJQUNILENBQUM7Ozs7Ozs7O0lBRUQsY0FBYyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJO1FBQ3JFLHdDQUF3QztRQUV4QyxRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssS0FBSyxDQUFDLHFCQUFxQixDQUFDO1lBQ2pDLEtBQUssS0FBSyxDQUFDLHNCQUFzQjtnQkFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUIsTUFBTTtZQUNSLEtBQUssS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLEtBQUssS0FBSyxDQUFDLFlBQVk7Z0JBQ3JCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsMEJBQTBCLENBQUM7WUFDdEMsS0FBSyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDL0IsS0FBSyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsS0FBSyxLQUFLLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsS0FBSyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDL0IsS0FBSyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDL0IsS0FBSyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEQsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsdUJBQXVCO2dCQUNoQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNsQyxLQUFLLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUNuQyxLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNsQyxLQUFLLEtBQUssQ0FBQyxzQkFBc0I7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLE1BQU07U0FDVDtJQUNILENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLE9BQU87UUFDckIsY0FBYztRQUNkLElBQ0UsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPO1lBQ3JCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxPQUFPO1lBQ3JDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDMUM7WUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN4QixTQUFTLENBQUMsVUFBVSxDQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQzFCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFDdkIsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUMxQixDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNuQixDQUFDLENBQUM7U0FDSjthQUFNLElBQ0wsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQ3BCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxNQUFNO1lBQ3BDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ3pDO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDeEIsU0FBUyxDQUFDLFVBQVUsQ0FDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUN2QixPQUFPLENBQUMsZUFBZSxFQUFFLENBQzFCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtnQkFDNUIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxPQUFPO1FBQzdCLElBQ0UsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLE1BQU07WUFDcEMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztZQUM5QyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQy9DOztnQkFDSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFFcEMsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssVUFBVSxFQUFFOzs7b0JBRXZDLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUzs7OztnQkFDcEMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLFNBQVMsRUFDbEM7Z0JBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O3dCQUNmLFVBQVUscUJBQVEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFFOzt3QkFDM0MsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRTt3QkFDaEQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7cUJBQ3RDLENBQUM7b0JBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUVqRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlO3dCQUMzQixPQUFPLEVBQUUsV0FBVztxQkFDckIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLEtBQUssTUFBTSxFQUFFOzs7b0JBRTFDLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUzs7OztnQkFDcEMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLFNBQVMsRUFDbEM7Z0JBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O3dCQUNmLFVBQVUscUJBQVEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFFOzt3QkFDM0MsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRTt3QkFDaEQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUU7cUJBQzVCLENBQUM7b0JBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUVqRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlO3dCQUMzQixPQUFPLEVBQUUsV0FBVztxQkFDckIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7U0FDRjthQUFNLElBQ0wsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLE9BQU87WUFDckMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDN0M7WUFDQSwrQkFBK0I7U0FDaEM7SUFDSCxDQUFDOzs7Ozs7SUFNRCxjQUFjLENBQUMsT0FBTztRQUNwQixJQUNFLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTztZQUNyQixPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssT0FBTztZQUNyQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUM3QztZQUNBLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNuQixDQUFDLENBQUM7U0FDSjthQUFNLElBQ0wsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQ3BCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxNQUFNO1lBQ3BDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ3pDO1lBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsY0FBYztnQkFDMUIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUEwRUQscUJBQXFCLENBQUMsT0FBTztRQUMzQixJQUNFLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTztZQUNyQixPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssT0FBTztZQUNyQyxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQzFDO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDeEIsU0FBUyxDQUFDLFVBQVUsQ0FDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUMxQixPQUFPLENBQUMsYUFBYSxFQUFFLEVBQ3ZCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FDMUIsQ0FBQzthQUNIO1lBRUQsSUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsbUJBQW1CO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsRUFDdkM7Z0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsc0JBQXNCO29CQUNsQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ25CLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHNCQUFzQjtvQkFDbEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNuQixDQUFDLENBQUM7YUFDSjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGdCQUFnQixFQUFFO2dCQUNsRCxvREFBb0Q7Z0JBRXBELG9HQUFvRztnQkFDcEcsd0VBQXdFO2dCQUN4RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO29CQUNoRCxPQUFPLEtBQUssQ0FBQztpQkFDZDs7c0JBRUssVUFBVSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHNCQUFzQjtvQkFDbEMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUN0QixDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU0sSUFDTCxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDcEIsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLE1BQU07WUFDcEMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDekM7WUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN4QixTQUFTLENBQUMsVUFBVSxDQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQzFCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQ3ZCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FDMUIsQ0FBQzthQUNIO1lBRUQsSUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsbUJBQW1CO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsRUFDdkM7Z0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsc0JBQXNCO29CQUNsQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ25CLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHNCQUFzQjtvQkFDbEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNuQixDQUFDLENBQUM7YUFDSjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGdCQUFnQixFQUFFOzs7c0JBRzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxzQkFBc0I7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDdEIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Ozs7O0lBOEJELFdBQVcsQ0FBQyxPQUFPO1FBQ2pCLElBQ0UsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPO1lBQ3JCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxPQUFPO1lBQ3JDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDMUM7WUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN4QixTQUFTLENBQUMsVUFBVSxDQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQzFCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFDdkIsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUMxQixDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUN4QixPQUFPLEVBQUUsT0FBTzthQUNqQixDQUFDLENBQUM7U0FDSjthQUFNLElBQ0wsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQ3BCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxNQUFNO1lBQ3BDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ3pDO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDeEIsU0FBUyxDQUFDLFVBQVUsQ0FDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUMxQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUN2QixPQUFPLENBQUMsZUFBZSxFQUFFLENBQzFCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVk7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7OztJQUtELGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVTtRQUNuQyxPQUFPLENBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQzVELENBQUM7SUFDSixDQUFDOzs7WUF2eUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw0bVBBQXNEOzthQUV2RDs7OztZQVhDLGlCQUFpQjtZQUlWLFFBQVE7OzttQkFVZCxLQUFLO21CQUNMLEtBQUs7OEJBQ0wsS0FBSzt1QkFFTCxLQUFLO3VDQUNMLEtBQUs7OEJBRUwsTUFBTTs7OztJQVBQLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQix3REFBZ0M7O0lBRWhDLGlEQUF1Qjs7SUFDdkIsaUVBQXVDOztJQUV2Qyx3REFBa0U7O0lBRWxFLHdEQUFnQjs7SUFDaEIsOENBQVc7O0lBQ1gseURBQW9EOztJQUNwRCw4Q0FBVTs7SUFDVixzREFBa0I7O0lBQ2xCLHFEQUFhOztJQUNiLHNEQUFrRDs7SUFDbEQsd0RBQWtEOztJQUNsRCx1REFBZ0Q7O0lBQ2hELGlEQUFTOztJQUVULG1EQUtFOztJQUNGLDhDQVdFOzs7Ozs7SUEyaEJGLHNEQXNCRTs7Ozs7O0lBTUYsNERBcUJFOzs7Ozs7SUFNRixxREFXRTs7SUFtRkYsZ0VBMkJFOzs7OztJQXpzQlUsNENBQThCOztJQUFFLGlEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1tZXNzYWdlLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZS1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZS1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdE1lc3NhZ2VMaXN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgcGFyZW50TWVzc2FnZUlkID0gbnVsbDtcblxuICBASW5wdXQoKSBtZXNzYWdlcyA9IFtdO1xuICBASW5wdXQoKSByZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBbXTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtZXNzYWdlc1JlcXVlc3Q7XG4gIGxpbWl0ID0gNTA7XG4gIGRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgdGltZXMgPSAwO1xuICBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBtc2dMaXN0ZW5lcklkID0gXCJtZXNzYWdlX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IFwiZ3JvdXBfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY2FsbExpc3RlbmVySWQgPSBcImNhbGxfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgcHJldlVzZXI7XG5cbiAgY2F0ZWdvcmllcyA9IFtcbiAgICBlbnVtcy5DQVRFR09SWV9NRVNTQUdFLFxuICAgIGVudW1zLkNBVEVHT1JZX0NVU1RPTSxcbiAgICBlbnVtcy5DQVRFR09SWV9BQ1RJT04sXG4gICAgZW51bXMuQ0FURUdPUllfQ0FMTCxcbiAgXTtcbiAgdHlwZXMgPSBbXG4gICAgZW51bXMuTUVTU0FHRV9UWVBFX1RFWFQsXG4gICAgZW51bXMuTUVTU0FHRV9UWVBFX0lNQUdFLFxuICAgIGVudW1zLk1FU1NBR0VfVFlQRV9WSURFTyxcbiAgICBlbnVtcy5NRVNTQUdFX1RZUEVfQVVESU8sXG4gICAgZW51bXMuTUVTU0FHRV9UWVBFX0ZJTEUsXG4gICAgZW51bXMuQ1VTVE9NX1RZUEVfUE9MTCxcbiAgICBlbnVtcy5DVVNUT01fVFlQRV9TVElDS0VSLFxuICAgIGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgIGVudW1zLkNBTExfVFlQRV9BVURJTyxcbiAgICBlbnVtcy5DQUxMX1RZUEVfVklERU8sXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJlZltcImRlc3Ryb3llZFwiXSkge1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSwgMjUwMCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiaXRlbVwiXSkge1xuICAgICAgLy9SZW1vdmluZyBQcmV2aW91cyBDb252ZXJzYXRpb24gTGlzdGVuZXJzXG4gICAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubXNnTGlzdGVuZXJJZCk7XG4gICAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gICAgICBDb21ldENoYXQucmVtb3ZlQ2FsbExpc3RlbmVyKHRoaXMuY2FsbExpc3RlbmVySWQpO1xuXG4gICAgICB0aGlzLm1zZ0xpc3RlbmVySWQgPSBcIm1lc3NhZ2VfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkID0gXCJncm91cF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5jYWxsTGlzdGVuZXJJZCA9IFwiY2FsbF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICB0aGlzLmNyZWF0ZU1lc3NhZ2VSZXF1ZXN0T2JqZWN0QW5kR2V0TWVzc2FnZXMoKTtcblxuICAgICAgLy8gQXR0YWNoIE1lc3NhZ2VMaXN0ZW5lcnMgZm9yIHRoZSBuZXcgY29udmVyc2F0aW9uXG4gICAgICB0aGlzLmFkZE1lc3NhZ2VFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJyZWFjaGVkVG9wT2ZDb252ZXJzYXRpb25cIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJyZWFjaGVkVG9wT2ZDb252ZXJzYXRpb25cIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0TWVzc2FnZXMoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBuZXcgdGhyZWFkIG9wZW5lZFxuICAgIGlmIChjaGFuZ2VbXCJwYXJlbnRNZXNzYWdlSWRcIl0pIHtcbiAgICAgIC8vUmVtb3ZpbmcgUHJldmlvdXMgdGhyZWFkIExpc3RlbmVyc1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZU1lc3NhZ2VMaXN0ZW5lcih0aGlzLm1zZ0xpc3RlbmVySWQpO1xuICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkID0gXCJtZXNzYWdlX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmNyZWF0ZU1lc3NhZ2VSZXF1ZXN0T2JqZWN0QW5kR2V0TWVzc2FnZXMoKTtcblxuICAgICAgLy8gQXR0YWNoIE1lc3NhZ2VMaXN0ZW5lcnMgZm9yIHRoZSBuZXcgY29udmVyc2F0aW9uXG4gICAgICB0aGlzLmFkZE1lc3NhZ2VFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJtZXNzYWdlc1wiXSkge1xuICAgICAgaWYgKGNoYW5nZVtcIm1lc3NhZ2VzXCJdLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVNZXNzYWdlUmVxdWVzdE9iamVjdEFuZEdldE1lc3NhZ2VzKCk7XG5cbiAgICAvLyBBdHRhY2ggTWVzc2FnZUxpc3RlbmVycyBIZXJlXG4gICAgdGhpcy5hZGRNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIHJlbW92aW5mIHRoZSBjaGFuZ2VEZXRlY3RvciBSZWZcbiAgICAvL3RoaXMucmVmLmRldGFjaCgpO1xuXG4gICAgLy9SZW1vdmluZyBNZXNzYWdlIExpc3RlbmVyc1xuICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5tc2dMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgTWVzc2FnZSBSZXF1ZXN0IG9iamVjdCAoIGhvbGRpbmcgdGhlIGNvbmZpZyAsIHRoYXQgaXMgdGhlIHR3byB1c2VyIGludm9sdmVkIGluIGNvbnZlcnNhdGlvbiApIGFuZCBnZXRzIGFsbCB0aGUgbWVzc2FnZXNcbiAgICogQHBhcmFtXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlUmVxdWVzdE9iamVjdEFuZEdldE1lc3NhZ2VzKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgdGhpcy5tZXNzYWdlc1JlcXVlc3QgPSB0aGlzLmJ1aWxkTWVzc2FnZVJlcXVlc3RPYmplY3QoXG4gICAgICAgIHRoaXMuaXRlbSxcbiAgICAgICAgdGhpcy50eXBlLFxuICAgICAgICB0aGlzLnBhcmVudE1lc3NhZ2VJZFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlc1JlcXVlc3QgPSB0aGlzLmJ1aWxkTWVzc2FnZVJlcXVlc3RPYmplY3QoXG4gICAgICAgIHRoaXMuaXRlbSxcbiAgICAgICAgdGhpcy50eXBlXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0TWVzc2FnZXMoZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIFRvIFJlY2VpdmUgTWVzc2FnZXMgaW4gUmVhbCBUaW1lXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWRkTWVzc2FnZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5hZGRNZXNzYWdlTGlzdGVuZXIoXG4gICAgICB0aGlzLm1zZ0xpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgIG9uVGV4dE1lc3NhZ2VSZWNlaXZlZDogKHRleHRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUZXh0IG1lc3NhZ2UgcmVjZWl2ZWQgc3VjY2Vzc2Z1bGx5XCIsIHRleHRNZXNzYWdlKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLlRFWFRfTUVTU0FHRV9SRUNFSVZFRCwgdGV4dE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lZGlhTWVzc2FnZVJlY2VpdmVkOiAobWVkaWFNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJNZWRpYSBtZXNzYWdlIHJlY2VpdmVkIHN1Y2Nlc3NmdWxseVwiLCBtZWRpYU1lc3NhZ2UpO1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRCwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DdXN0b21NZXNzYWdlUmVjZWl2ZWQ6IChjdXN0b21NZXNzYWdlKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXN0b20gbWVzc2FnZSByZWNlaXZlZCBzdWNjZXNzZnVsbHlcIiwgY3VzdG9tTWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRCwgY3VzdG9tTWVzc2FnZSk7XG4gICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBtZXNzYWdlXG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVzc2FnZXNEZWxpdmVyZWQ6IChtZXNzYWdlUmVjZWlwdCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGV4dCBNZXNzYWdlIERlbGl2ZXJlZCBzdWNjZXNzZnVsbHkgXCIsIG1lc3NhZ2VSZWNlaXB0KTtcblxuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuTUVTU0FHRV9ERUxJVkVSRUQsIG1lc3NhZ2VSZWNlaXB0KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlc1JlYWQ6IChtZXNzYWdlUmVjZWlwdCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGV4dCBNZXNzYWdlIFJlYWQgc3VjY2Vzc2Z1bGx5IFwiLCBtZXNzYWdlUmVjZWlwdCk7XG5cbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfUkVBRCwgbWVzc2FnZVJlY2VpcHQpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VEZWxldGVkOiAoZGVsZXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfREVMRVRFRCwgZGVsZXRlZE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VFZGl0ZWQ6IChlZGl0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5NRVNTQUdFX0VESVRFRCwgZWRpdGVkTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoXG4gICAgICAgICAgICBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRCxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBjaGFuZ2VkR3JvdXAsXG4gICAgICAgICAgICB7IHVzZXI6IGNoYW5nZWRVc2VyLCBzY29wZTogbmV3U2NvcGUgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRCwgbWVzc2FnZSwga2lja2VkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjoga2lja2VkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgbWVzc2FnZSwgYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChcbiAgICAgICAgICAgIGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRCxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1bmJhbm5lZEZyb20sXG4gICAgICAgICAgICB7IHVzZXI6IHVuYmFubmVkVXNlciB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVzZXJBZGRlZCxcbiAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICApID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgbWVzc2FnZSwgdXNlckFkZGVkSW4sIHtcbiAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBtZXNzYWdlLCBncm91cCwge1xuICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCwgbWVzc2FnZSwgam9pbmVkR3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGpvaW5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkQ2FsbExpc3RlbmVyKFxuICAgICAgdGhpcy5jYWxsTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgb25JbmNvbWluZ0NhbGxSZWNlaXZlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PdXRnb2luZ0NhbGxBY2NlcHRlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk9VVEdPSU5HX0NBTExfQUNDRVBURUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbk91dGdvaW5nQ2FsbFJlamVjdGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBCdWlsZCBNZXNzYWdlIFJlcXVlc3QgQ29uZmlndXJhdGlvbiBPYmplY3QgLCB0aGF0IGhlbHBzIGluIGdldHRpbmcgbWVzc2FnZXMgb2YgYSBwYXJ0aWN1bGFyIGNvbnZlcnNhdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIGJ1aWxkTWVzc2FnZVJlcXVlc3RPYmplY3QoaXRlbSA9IG51bGwsIHR5cGUgPSBudWxsLCBwYXJlbnRNZXNzYWdlSWQgPSBudWxsKSB7XG4gICAgbGV0IG1lc3NhZ2VSZXF1ZXN0QnVpbHQ7XG5cbiAgICBpZiAodHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGlmIChwYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldFVJRChpdGVtLnVpZClcbiAgICAgICAgICAuc2V0UGFyZW50TWVzc2FnZUlkKHBhcmVudE1lc3NhZ2VJZClcbiAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgLnNldFR5cGVzKHRoaXMudHlwZXMpXG4gICAgICAgICAgLnNldExpbWl0KHRoaXMubGltaXQpXG4gICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlUmVxdWVzdEJ1aWx0ID0gbmV3IENvbWV0Q2hhdC5NZXNzYWdlc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgICAuc2V0VUlEKGl0ZW0udWlkKVxuICAgICAgICAgIC5zZXRDYXRlZ29yaWVzKHRoaXMuY2F0ZWdvcmllcylcbiAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAuaGlkZVJlcGxpZXModHJ1ZSlcbiAgICAgICAgICAuc2V0TGltaXQodGhpcy5saW1pdClcbiAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgaWYgKHBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgICBtZXNzYWdlUmVxdWVzdEJ1aWx0ID0gbmV3IENvbWV0Q2hhdC5NZXNzYWdlc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgICAuc2V0R1VJRChpdGVtLmd1aWQpXG4gICAgICAgICAgLnNldFBhcmVudE1lc3NhZ2VJZChwYXJlbnRNZXNzYWdlSWQpXG4gICAgICAgICAgLnNldENhdGVnb3JpZXModGhpcy5jYXRlZ29yaWVzKVxuICAgICAgICAgIC5zZXRUeXBlcyh0aGlzLnR5cGVzKVxuICAgICAgICAgIC5zZXRMaW1pdCh0aGlzLmxpbWl0KVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldEdVSUQoaXRlbS5ndWlkKVxuICAgICAgICAgIC5zZXRDYXRlZ29yaWVzKHRoaXMuY2F0ZWdvcmllcylcbiAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAuaGlkZVJlcGxpZXModHJ1ZSlcbiAgICAgICAgICAuc2V0TGltaXQodGhpcy5saW1pdClcbiAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZVJlcXVlc3RCdWlsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIE1lc3NhZ2VzIEZvciBhIHBhcnRpY3VsYXIgY29udmVyc2F0aW9uIGJhc2VzIG9uIE1lc3NhZ2VSZXF1ZXN0Q29uZmlnXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0TWVzc2FnZXMoXG4gICAgc2Nyb2xsVG9Cb3R0b20gPSBmYWxzZSxcbiAgICBuZXdDb252ZXJzYXRpb24gPSBmYWxzZSxcbiAgICBzY3JvbGxUb1RvcCA9IGZhbHNlXG4gICkge1xuICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5MT0FESU5HX01FU1NTQUdFO1xuICAgIGNvbnN0IGFjdGlvbk1lc3NhZ2VzID0gW107XG5cbiAgICBsZXQgdXNlciA9IENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKFxuICAgICAgKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZXNSZXF1ZXN0LmZldGNoUHJldmlvdXMoKS50aGVuKFxuICAgICAgICAgIChtZXNzYWdlTGlzdCkgPT4ge1xuICAgICAgICAgICAgLy8gTm8gTWVzc2FnZXMgRm91bmRcbiAgICAgICAgICAgIGlmIChtZXNzYWdlTGlzdC5sZW5ndGggPT09IDAgJiYgdGhpcy5tZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX01FU1NBR0VTX0ZPVU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVzc2FnZUxpc3QuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jYXRlZ29yeSA9PT0gXCJhY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uuc2VuZGVyLnVpZCA9PT0gXCJhcHBfc3lzdGVtXCJcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vaWYgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZSBpcyBub3QgdGhlIGxvZ2dlZGluIHVzZXIsIG1hcmsgaXQgYXMgcmVhZC5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkuZ2V0VWlkKCkgIT09IHVzZXIuZ2V0VWlkKCkgJiZcbiAgICAgICAgICAgICAgICAhbWVzc2FnZS5nZXRSZWFkQXQoKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgICAgICAgICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS5nZXRVaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIikge1xuICAgICAgICAgICAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfX1JFQUQsXG4gICAgICAgICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgKyt0aGlzLnRpbWVzO1xuXG4gICAgICAgICAgICBsZXQgYWN0aW9uR2VuZXJhdGVkVHlwZSA9IFwibWVzc2FnZUZldGNoZWRcIjtcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb0JvdHRvbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBhY3Rpb25HZW5lcmF0ZWRUeXBlID0gXCJtZXNzYWdlRmV0Y2hlZEFnYWluXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGxUb1RvcCkge1xuICAgICAgICAgICAgICBhY3Rpb25HZW5lcmF0ZWRUeXBlID0gXCJvbGRlck1lc3NhZ2VzRmV0Y2hlZFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbmx5IGNhbGxlZCB3aGVuIHRoZSBhY3RpdmUgdXNlciBjaGFuZ2VzIHRoZSB0aGUgY29udmVyc2F0aW9uICwgdGhhdCBpcyBzd2l0Y2hlcyB0byBzb21lIG90aGVyIHBlcnNvblxuICAgICAgICAgICAgLy8gdG8gY2hhdCB3aXRoXG4gICAgICAgICAgICBpZiAobmV3Q29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgICAgIGFjdGlvbkdlbmVyYXRlZFR5cGUgPSBcIm5ld0NvbnZlcnNhdGlvbk9wZW5lZFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICh0aGlzLnRpbWVzID09PSAxICYmIGFjdGlvbk1lc3NhZ2VzLmxlbmd0aCA+IDUpIHx8XG4gICAgICAgICAgICAgICh0aGlzLnRpbWVzID4gMSAmJiBhY3Rpb25NZXNzYWdlcy5sZW5ndGggPT09IDMwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfRkVUQ0hFRCxcbiAgICAgICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlTGlzdCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0TWVzc2FnZXModHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gSW1wbGVtZW50IFNjcm9sbCBMb2dpYyBmcm9tIFJlYWN0XG4gICAgICAgICAgICAgIC8vIHRoaXMubGFzdFNjcm9sbFRvcCA9IHRoaXMubWVzc2FnZXNFbmQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkdlbmVyYXRlZFR5cGUsXG4gICAgICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZmV0Y2hpbmcgZmFpbGVkIHdpdGggZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gTG9nZ2VkIEluIFVzZXIgRm91bmRcIiwgeyBlcnJvciB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbWVzc2FnZVVwZGF0ZWQoa2V5ID0gbnVsbCwgbWVzc2FnZSA9IG51bGwsIGdyb3VwID0gbnVsbCwgb3B0aW9ucyA9IG51bGwpIHtcbiAgICAvL3RoZXJlIGFyZSBtYW55IGNhc2VzIHRvIGJlIGZpbGxlZCBIZXJlXG5cbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICBjYXNlIGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICAgIHRoaXMubWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxJVkVSRUQ6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfUkVBRDpcbiAgICAgICAgdGhpcy5tZXNzYWdlUmVhZEFuZERlbGl2ZXJlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFRDoge1xuICAgICAgICB0aGlzLm1lc3NhZ2VEZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElURUQ6IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWRpdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9MRUZUOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRDoge1xuICAgICAgICB0aGlzLmdyb3VwVXBkYXRlZChrZXksIG1lc3NhZ2UsIGdyb3VwLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgICB0aGlzLmN1c3RvbU1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQ6XG4gICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0FDQ0VQVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgICB0aGlzLmNhbGxVcGRhdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBtZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSkge1xuICAgIC8vbmV3IG1lc3NhZ2VzXG4gICAgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9SRUNFSVZFRCxcbiAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICkge1xuICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfUkVDRUlWRUQsXG4gICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cblxuICBtZXNzYWdlUmVhZEFuZERlbGl2ZXJlZChtZXNzYWdlKSB7XG4gICAgaWYgKFxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkuZ2V0VWlkKCkgPT09IHRoaXMuaXRlbS51aWQgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKSA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkXG4gICAgKSB7XG4gICAgICBsZXQgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlc107XG5cbiAgICAgIGlmIChtZXNzYWdlLmdldFJlY2VpcHRUeXBlKCkgPT09IFwiZGVsaXZlcnlcIikge1xuICAgICAgICAvL3NlYXJjaCBmb3IgbWVzc2FnZVxuICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5tZXNzYWdlSWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IG1lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldIH07XG4gICAgICAgICAgbGV0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCB7XG4gICAgICAgICAgICBkZWxpdmVyZWRBdDogbWVzc2FnZS5nZXREZWxpdmVyZWRBdCgpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcblxuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9VUERBVEVELFxuICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5nZXRSZWNlaXB0VHlwZSgpID09PSBcInJlYWRcIikge1xuICAgICAgICAvL3NlYXJjaCBmb3IgbWVzc2FnZVxuICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5tZXNzYWdlSWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IG1lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldIH07XG4gICAgICAgICAgbGV0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCB7XG4gICAgICAgICAgICByZWFkQXQ6IG1lc3NhZ2UuZ2V0UmVhZEF0KCksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZUxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuXG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1VQREFURUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlTGlzdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZFxuICAgICkge1xuICAgICAgLy9ub3QgaW1wbGVtZW50ZWQgaW4gUmVhY3QgQWxzb1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IGEgbWVzc2FnZSB3YXMgZGVsZXRlZCBieSB0aGUgdXNlci9wZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZURlbGV0ZWQobWVzc2FnZSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZFxuICAgICkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfREVMRVRFLFxuICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkID09PSB0aGlzLml0ZW0udWlkXG4gICAgKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3RzIGlmIHRoZSBtZXNzYWdlIHRoYXQgd2FzIGVkaXQgaXMgeW91IGN1cnJlbnQgb3BlbiBjb252ZXJzYXRpb24gd2luZG93XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZUVkaXRlZCA9IChtZXNzYWdlKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVkaXRlZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVFZGl0ZWRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcInVzZXJcIiAmJlxuICAgICAgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS51aWRcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlRWRpdGVkTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIEFjdGlvbiBJbmRpY2F0aW5nIHRoYXQgYSBtZXNzYWdlIHdhcyBkZWxldGVkIGJ5IHRoZSB1c2VyL3BlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB1cGRhdGVFZGl0ZWRNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICAvL0lmIHRoZSB1cGRhdGVkIG1lc3NhZ2UgaXMgdGhlIGN1cnJlbnQgbWVzc2FnZSB0aGF0IGlzIG9wZW5lZCBpbiB0aHJlYWQgdmlldyB0aGVuIHVwZGF0ZSB0aHJlYWQgdmlldyBhbHNvXG4gICAgaWYgKG1lc3NhZ2UuaWQgPT0gdGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRCxcbiAgICAgICAgcGF5TG9hZDogbWVzc2FnZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VzXTtcbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSwgaykgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0gbWVzc2FnZUxpc3RbbWVzc2FnZUtleV07XG4gICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VMaXN0LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IEdyb3VwIERhdGEgaGFzIGJlZW4gdXBkYXRlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChrZXksIG1lc3NhZ2UsIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuR1JPVVBfVVBEQVRFRCxcbiAgICAgICAgcGF5TG9hZDogeyBtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY3VzdG9tTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICApIHtcbiAgICAgIGlmICghbWVzc2FnZS5nZXRSZWFkQXQoKSkge1xuICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSxcbiAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpICYmXG4gICAgICAgIG1lc3NhZ2UudHlwZSAhPT0gZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUiAmJlxuICAgICAgICBtZXNzYWdlLnR5cGUgIT09IGVudW1zLkNVU1RPTV9UWVBFX1BPTExcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUikge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gZW51bXMuQ1VTVE9NX1RZUEVfUE9MTCkge1xuICAgICAgICAvL2N1c3RvbWRhdGEgKHBvbGwgZXh0ZW5zaW9uKSBkb2VzIG5vdCBoYXZlIG1ldGFkYXRhXG5cbiAgICAgICAgLy9UaGUgcG9sbCBtZXNzYWdlIHRoYXQgIGlzIHJlY2VpdmVkIGJ5IHRoZSBtZXNzYWdlIGxpc3RlbmVycyAsIHdpbGwgbm90IGJlIGFwcGVuZGVkIHRvIG1lc3NhZ2UgbGlzdFxuICAgICAgICAvL2lmIHRoZSBjdXJyZW50IGxvZ2dlZEluIHVzZXIgaXMgdGhlIHNlbmRlci9jcmVhdG9yIG9mIHRoZSBwb2xsIG1lc3NhZ2VcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc2VuZGVyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3TWVzc2FnZSA9IHRoaXMuYWRkTWV0YWRhdGFUb0N1c3RvbURhdGEobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkUsXG4gICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkID09PSB0aGlzLml0ZW0udWlkXG4gICAgKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQsXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSAmJlxuICAgICAgICBtZXNzYWdlLnR5cGUgIT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIgJiZcbiAgICAgICAgbWVzc2FnZS50eXBlICE9PSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1BPTEwpIHtcbiAgICAgICAgLy9jdXN0b21kYXRhIChwb2xsIGV4dGVuc2lvbikgZG9lcyBub3QgaGF2ZSBtZXRhZGF0YVxuXG4gICAgICAgIGNvbnN0IG5ld01lc3NhZ2UgPSB0aGlzLmFkZE1ldGFkYXRhVG9DdXN0b21EYXRhKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgIHBheUxvYWQ6IFtuZXdNZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFkZE1ldGFkYXRhVG9DdXN0b21EYXRhID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBjdXN0b21EYXRhID0gbWVzc2FnZS5kYXRhLmN1c3RvbURhdGE7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGN1c3RvbURhdGEub3B0aW9ucztcblxuICAgIGNvbnN0IHJlc3VsdE9wdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICByZXN1bHRPcHRpb25zW29wdGlvbl0gPSB7XG4gICAgICAgIHRleHQ6IG9wdGlvbnNbb3B0aW9uXSxcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHBvbGxzID0ge1xuICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgcmVzdWx0czoge1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgb3B0aW9uczogcmVzdWx0T3B0aW9ucyxcbiAgICAgICAgcXVlc3Rpb246IGN1c3RvbURhdGEucXVlc3Rpb24sXG4gICAgICB9LFxuICAgICAgcXVlc3Rpb246IGN1c3RvbURhdGEucXVlc3Rpb24sXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5tZXNzYWdlLFxuICAgICAgbWV0YWRhdGE6IHsgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBwb2xscyB9IH0gfSxcbiAgICB9O1xuICB9O1xuXG4gIGNhbGxVcGRhdGVkKG1lc3NhZ2UpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICApIHtcbiAgICAgIGlmICghbWVzc2FnZS5nZXRSZWFkQXQoKSkge1xuICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSxcbiAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkID09PSB0aGlzLml0ZW0udWlkXG4gICAgKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQsXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuQ0FMTF9VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBkYXRlcyBhbmQgcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgbm90IGVxdWFsXG4gICAqL1xuICBpc0RhdGVEaWZmZXJlbnQoZmlyc3REYXRlLCBzZWNvbmREYXRlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKGZpcnN0RGF0ZSwgXCJkIG1tIHl5eXlcIikudG9TdHJpbmcoKSAhPT1cbiAgICAgIHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKHNlY29uZERhdGUsIFwiZCBtbSB5eXl5XCIpLnRvU3RyaW5nKClcbiAgICApO1xuICB9XG59XG4iXX0=