/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-list/cometchat-message-list/cometchat-message-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { DatePipe } from "@angular/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatMessageListComponent = /** @class */ (function () {
    function CometchatMessageListComponent(ref, datepipe) {
        var _this = this;
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
        function (message) {
            if (_this.type === "group" &&
                message.getReceiverType() === "group" &&
                message.getReceiver().guid === _this.item.guid) {
                _this.updateEditedMessage(message);
            }
            else if (_this.type === "user" &&
                message.getReceiverType() === "user" &&
                _this.loggedInUser.uid === message.getReceiverId() &&
                message.getSender().uid === _this.item.uid) {
                _this.updateEditedMessage(message);
            }
            else if (_this.type === "user" &&
                message.getReceiverType() === "user" &&
                _this.loggedInUser.uid === message.getSender().uid &&
                message.getReceiverId() === _this.item.uid) {
                _this.updateEditedMessage(message);
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
        function (message) {
            //If the updated message is the current message that is opened in thread view then update thread view also
            if (message.id == _this.parentMessageId) {
                _this.actionGenerated.emit({
                    type: enums.THREAD_PARENT_MESSAGE_UPDATED,
                    payLoad: message,
                });
            }
            /** @type {?} */
            var messageList = tslib_1.__spread(_this.messages);
            /** @type {?} */
            var messageKey = messageList.findIndex((/**
             * @param {?} m
             * @param {?} k
             * @return {?}
             */
            function (m, k) { return m.id === message.id; }));
            if (messageKey > -1) {
                /** @type {?} */
                var messageObj = messageList[messageKey];
                /** @type {?} */
                var newMessageObj = Object.assign({}, messageObj, message);
                messageList.splice(messageKey, 1, newMessageObj);
                _this.actionGenerated.emit({
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
        function (key, message, group, options) {
            if (_this.type === "group" &&
                message.getReceiverType() === "group" &&
                message.getReceiver().guid === _this.item.guid) {
                _this.actionGenerated.emit({
                    type: enums.GROUP_UPDATED,
                    payLoad: { message: message, key: key, group: group, options: options },
                });
            }
        });
        this.addMetadataToCustomData = (/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var customData = message.data.customData;
            /** @type {?} */
            var options = customData.options;
            /** @type {?} */
            var resultOptions = {};
            for (var option in options) {
                resultOptions[option] = {
                    text: options[option],
                    count: 0,
                };
            }
            /** @type {?} */
            var polls = {
                id: message.id,
                options: options,
                results: {
                    total: 0,
                    options: resultOptions,
                    question: customData.question,
                },
                question: customData.question,
            };
            return tslib_1.__assign({}, message, { metadata: { "@injected": { extensions: { polls: polls } } } });
        });
        setInterval((/**
         * @return {?}
         */
        function () {
            if (!_this.ref["destroyed"]) {
                _this.ref.detectChanges();
            }
        }), 2500);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatMessageListComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
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
    };
    /**
     * @return {?}
     */
    CometchatMessageListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createMessageRequestObjectAndGetMessages();
        // Attach MessageListeners Here
        this.addMessageEventListeners();
    };
    /**
     * @return {?}
     */
    CometchatMessageListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // removinf the changeDetector Ref
        //this.ref.detach();
        //Removing Message Listeners
        CometChat.removeMessageListener(this.msgListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
        CometChat.removeCallListener(this.callListenerId);
    };
    /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @param
     */
    /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @return {?}
     */
    CometchatMessageListComponent.prototype.createMessageRequestObjectAndGetMessages = /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @return {?}
     */
    function () {
        if (this.parentMessageId) {
            this.messagesRequest = this.buildMessageRequestObject(this.item, this.type, this.parentMessageId);
        }
        else {
            this.messagesRequest = this.buildMessageRequestObject(this.item, this.type);
        }
        this.getMessages(false, true);
    };
    /**
     * Listener To Receive Messages in Real Time
     * @param
     */
    /**
     * Listener To Receive Messages in Real Time
     * @return {?}
     */
    CometchatMessageListComponent.prototype.addMessageEventListeners = /**
     * Listener To Receive Messages in Real Time
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.addMessageListener(this.msgListenerId, new CometChat.MessageListener({
            onTextMessageReceived: (/**
             * @param {?} textMessage
             * @return {?}
             */
            function (textMessage) {
                // console.log("Text message received successfully", textMessage);
                _this.messageUpdated(enums.TEXT_MESSAGE_RECEIVED, textMessage);
            }),
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            function (mediaMessage) {
                // console.log("Media message received successfully", mediaMessage);
                _this.messageUpdated(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
            }),
            onCustomMessageReceived: (/**
             * @param {?} customMessage
             * @return {?}
             */
            function (customMessage) {
                // console.log("Custom message received successfully", customMessage);
                _this.messageUpdated(enums.CUSTOM_MESSAGE_RECEIVED, customMessage);
                // Handle custom message
            }),
            onMessagesDelivered: (/**
             * @param {?} messageReceipt
             * @return {?}
             */
            function (messageReceipt) {
                // console.log("Text Message Delivered successfully ", messageReceipt);
                _this.messageUpdated(enums.MESSAGE_DELIVERED, messageReceipt);
            }),
            onMessagesRead: (/**
             * @param {?} messageReceipt
             * @return {?}
             */
            function (messageReceipt) {
                // console.log("Text Message Read successfully ", messageReceipt);
                _this.messageUpdated(enums.MESSAGE_READ, messageReceipt);
            }),
            onMessageDeleted: (/**
             * @param {?} deletedMessage
             * @return {?}
             */
            function (deletedMessage) {
                _this.messageUpdated(enums.MESSAGE_DELETED, deletedMessage);
            }),
            onMessageEdited: (/**
             * @param {?} editedMessage
             * @return {?}
             */
            function (editedMessage) {
                _this.messageUpdated(enums.MESSAGE_EDITED, editedMessage);
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
            function (message, changedUser, newScope, oldScope, changedGroup) {
                _this.messageUpdated(enums.GROUP_MEMBER_SCOPE_CHANGED, message, changedGroup, { user: changedUser, scope: newScope });
            }),
            onGroupMemberKicked: (/**
             * @param {?} message
             * @param {?} kickedUser
             * @param {?} kickedBy
             * @param {?} kickedFrom
             * @return {?}
             */
            function (message, kickedUser, kickedBy, kickedFrom) {
                _this.messageUpdated(enums.GROUP_MEMBER_KICKED, message, kickedFrom, {
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
            function (message, bannedUser, bannedBy, bannedFrom) {
                _this.messageUpdated(enums.GROUP_MEMBER_BANNED, message, bannedFrom, {
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
            function (message, unbannedUser, unbannedBy, unbannedFrom) {
                _this.messageUpdated(enums.GROUP_MEMBER_UNBANNED, message, unbannedFrom, { user: unbannedUser });
            }),
            onMemberAddedToGroup: (/**
             * @param {?} message
             * @param {?} userAdded
             * @param {?} userAddedBy
             * @param {?} userAddedIn
             * @return {?}
             */
            function (message, userAdded, userAddedBy, userAddedIn) {
                _this.messageUpdated(enums.GROUP_MEMBER_ADDED, message, userAddedIn, {
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
            function (message, leavingUser, group) {
                _this.messageUpdated(enums.GROUP_MEMBER_LEFT, message, group, {
                    user: leavingUser,
                });
            }),
            onGroupMemberJoined: (/**
             * @param {?} message
             * @param {?} joinedUser
             * @param {?} joinedGroup
             * @return {?}
             */
            function (message, joinedUser, joinedGroup) {
                _this.messageUpdated(enums.GROUP_MEMBER_JOINED, message, joinedGroup, {
                    user: joinedUser,
                });
            }),
        }));
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onIncomingCallReceived: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.messageUpdated(enums.INCOMING_CALL_RECEIVED, call);
            }),
            onIncomingCallCancelled: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.messageUpdated(enums.INCOMING_CALL_CANCELLED, call);
            }),
            onOutgoingCallAccepted: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.messageUpdated(enums.OUTGOING_CALL_ACCEPTED, call);
            }),
            onOutgoingCallRejected: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.messageUpdated(enums.OUTGOING_CALL_REJECTED, call);
            }),
        }));
    };
    /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param
     */
    /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param {?=} item
     * @param {?=} type
     * @param {?=} parentMessageId
     * @return {?}
     */
    CometchatMessageListComponent.prototype.buildMessageRequestObject = /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param {?=} item
     * @param {?=} type
     * @param {?=} parentMessageId
     * @return {?}
     */
    function (item, type, parentMessageId) {
        if (item === void 0) { item = null; }
        if (type === void 0) { type = null; }
        if (parentMessageId === void 0) { parentMessageId = null; }
        /** @type {?} */
        var messageRequestBuilt;
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
    };
    /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param
     */
    /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param {?=} scrollToBottom
     * @param {?=} newConversation
     * @param {?=} scrollToTop
     * @return {?}
     */
    CometchatMessageListComponent.prototype.getMessages = /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param {?=} scrollToBottom
     * @param {?=} newConversation
     * @param {?=} scrollToTop
     * @return {?}
     */
    function (scrollToBottom, newConversation, scrollToTop) {
        var _this = this;
        if (scrollToBottom === void 0) { scrollToBottom = false; }
        if (newConversation === void 0) { newConversation = false; }
        if (scrollToTop === void 0) { scrollToTop = false; }
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        /** @type {?} */
        var actionMessages = [];
        /** @type {?} */
        var user = CometChat.getLoggedinUser().then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
            _this.messagesRequest.fetchPrevious().then((/**
             * @param {?} messageList
             * @return {?}
             */
            function (messageList) {
                // No Messages Found
                if (messageList.length === 0 && _this.messages.length === 0) {
                    _this.decoratorMessage = STRING_MESSAGES.NO_MESSAGES_FOUND;
                }
                else {
                    _this.decoratorMessage = "";
                }
                messageList.forEach((/**
                 * @param {?} message
                 * @return {?}
                 */
                function (message) {
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
                        _this.actionGenerated.emit({
                            type: enums.MESSAGE__READ,
                            payLoad: message,
                        });
                    }
                }));
                ++_this.times;
                /** @type {?} */
                var actionGeneratedType = "messageFetched";
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
                if ((_this.times === 1 && actionMessages.length > 5) ||
                    (_this.times > 1 && actionMessages.length === 30)) {
                    _this.actionGenerated.emit({
                        type: enums.MESSAGE_FETCHED,
                        payLoad: messageList,
                    });
                    _this.getMessages(true, false);
                }
                else {
                    // Implement Scroll Logic from React
                    // this.lastScrollTop = this.messagesEnd.scrollHeight;
                    _this.actionGenerated.emit({
                        type: actionGeneratedType,
                        payLoad: messageList,
                    });
                }
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                // console.log("Message fetching failed with error:", error);
            }));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("No Logged In User Found", { error: error });
        }));
    };
    /**
     * @param {?=} key
     * @param {?=} message
     * @param {?=} group
     * @param {?=} options
     * @return {?}
     */
    CometchatMessageListComponent.prototype.messageUpdated = /**
     * @param {?=} key
     * @param {?=} message
     * @param {?=} group
     * @param {?=} options
     * @return {?}
     */
    function (key, message, group, options) {
        //there are many cases to be filled Here
        if (key === void 0) { key = null; }
        if (message === void 0) { message = null; }
        if (group === void 0) { group = null; }
        if (options === void 0) { options = null; }
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessageListComponent.prototype.messageReceived = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
    };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatMessageListComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessageListComponent.prototype.messageReadAndDelivered = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (message.getReceiverType() === "user" &&
            message.getSender().getUid() === this.item.uid &&
            message.getReceiver() === this.loggedInUser.uid) {
            /** @type {?} */
            var messageList = tslib_1.__spread(this.messages);
            if (message.getReceiptType() === "delivery") {
                //search for message
                /** @type {?} */
                var messageKey = messageList.findIndex((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return m.id === message.messageId; }));
                if (messageKey > -1) {
                    /** @type {?} */
                    var messageObj = tslib_1.__assign({}, messageList[messageKey]);
                    /** @type {?} */
                    var newMessageObj = Object.assign({}, messageObj, {
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
                var messageKey = messageList.findIndex((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return m.id === message.messageId; }));
                if (messageKey > -1) {
                    /** @type {?} */
                    var messageObj = tslib_1.__assign({}, messageList[messageKey]);
                    /** @type {?} */
                    var newMessageObj = Object.assign({}, messageObj, {
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
    };
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param Any message
     */
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param {?} message
     * @return {?}
     */
    CometchatMessageListComponent.prototype.messageDeleted = /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessageListComponent.prototype.customMessageReceived = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
                var newMessage = this.addMetadataToCustomData(message);
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
                var newMessage = this.addMetadataToCustomData(message);
                this.actionGenerated.emit({
                    type: enums.CUSTOM_MESSAGE_RECEIVE,
                    payLoad: [newMessage],
                });
            }
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessageListComponent.prototype.callUpdated = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
    };
    /**
     * Compares two dates and return true if they are not equal
     */
    /**
     * Compares two dates and return true if they are not equal
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    CometchatMessageListComponent.prototype.isDateDifferent = /**
     * Compares two dates and return true if they are not equal
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return (this.datepipe.transform(firstDate, "d mm yyyy").toString() !==
            this.datepipe.transform(secondDate, "d mm yyyy").toString());
    };
    CometchatMessageListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-message-list",
                    template: "<div class=\"chatListStyle\">\n  <!--Message Container-->\n  <div class=\"decoratorMessageStyle\">\n    <p class=\"decoratorMessageTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"listWrapperStyle\">\n    <!--message-->\n    <div *ngFor=\"let msg of messages; let i = index\">\n      <div class=\"messageDateContainerStyle\" *ngIf=\"i === 0\">\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <div\n        class=\"messageDateContainerStyle\"\n        *ngIf=\"\n          i > 0 && isDateDifferent(messages[i - 1]?.sentAt, messages[i]?.sentAt)\n        \"\n      >\n        <span class=\"messageDateStyle\">{{\n          msg?.sentAt * 1000 | date: \"dd/MM/yyyy\"\n        }}</span>\n      </div>\n      <!--CASE FOR CALL MESSAGES-->\n      <div *ngIf=\"msg?.category == 'call'\">\n        <cometchat-action-message-bubble\n          [MessageDetails]=\"msg\"\n          [loggedInUserUid]=\"loggedInUser?.uid\"\n        ></cometchat-action-message-bubble>\n      </div>\n      <!--CASE FOR CALL MESSAGES ENDS-->\n      <!-- CASE FOR DELETED MESSAGES -->\n      <div *ngIf=\"msg?.deletedAt; else elseBlock\">\n        <cometchat-delete-message-bubble\n          [MessageDetails]=\"msg\"\n          [loggedInUser]=\"loggedInUser\"\n        ></cometchat-delete-message-bubble>\n      </div>\n      <!-- CASE FOR DELETED MESSAGES ENDS -->\n\n      <ng-template #elseBlock>\n        <!-- NgSwitchCase for different Types Of Bubble -->\n        <div [ngSwitch]=\"msg.type\">\n          <!-- CASE FOR TEXT -->\n          <div *ngSwitchCase=\"'text'\">\n            <cometchat-receiver-text-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [item]=\"item\"\n              [type]=\"type\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-text-message-bubble>\n            <cometchat-sender-text-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-text-message-bubble>\n          </div>\n          <!--CASE FOR TEXT ENDS -->\n          <!--CASE FOR FILE-->\n          <div *ngSwitchCase=\"'file'\">\n            <cometchat-sender-file-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-file-message-bubble>\n            <cometchat-receiver-file-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-receiver-file-message-bubble>\n          </div>\n          <!--CASE FOR FILE ENDS-->\n          <!--CASE FOR IMAGE -->\n          <div *ngSwitchCase=\"'image'\">\n            <cometchat-sender-image-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            ></cometchat-sender-image-message-bubble>\n            <cometchat-receiver-image-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-image-message-bubble>\n          </div>\n          <!--CASE FOR IMAGE  ENDS-->\n          <!--CASE FOR VIDEO -->\n          <div *ngSwitchCase=\"'video'\">\n            <div *ngIf=\"msg.category !== 'call'\">\n              <cometchat-sender-video-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-video-message-bubble>\n              <cometchat-receiver-video-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-video-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR VIDEO ENDS -->\n\n          <!--CASE FOR AUDIO -->\n          <div *ngSwitchCase=\"'audio'\">\n            <div *ngIf=\"msg.category !== 'call'\">\n              <cometchat-sender-audio-message-bubble\n                *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-sender-audio-message-bubble>\n              <cometchat-receiver-audio-message-bubble\n                *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n                [MessageDetails]=\"msg\"\n                [loggedInUser]=\"loggedInUser\"\n                (actionGenerated)=\"actionHandler($event)\"\n              >\n              </cometchat-receiver-audio-message-bubble>\n            </div>\n          </div>\n          <!--CASE FOR AUDIO ENDS -->\n\n          <!--CASE FOR Action Messages -->\n          <div *ngSwitchCase=\"'groupMember'\">\n            <div class=\"actionMessageStyle\">\n              <p class=\"actionMessageTxtStyle\">{{ msg?.message }}</p>\n            </div>\n          </div>\n          <!--CASE FOR Action Messages -->\n          <!--CASE FOR STICKER -->\n          <div *ngSwitchCase=\"'extension_sticker'\">\n            <cometchat-sender-sticker-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-sticker-message-bubble>\n            <cometchat-receiver-sticker-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-sticker-message-bubble>\n          </div>\n          <!--CASE FOR STICKER ENDS -->\n\n          <!--CASE FOR POLLS -->\n          <div *ngSwitchCase=\"'extension_poll'\">\n            <cometchat-sender-poll-message-bubble\n              *ngIf=\"msg.sender.uid === loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-sender-poll-message-bubble>\n            <cometchat-receiver-poll-message-bubble\n              *ngIf=\"msg.sender.uid !== loggedInUser.uid\"\n              [loggedInUserUid]=\"loggedInUser.uid\"\n              [MessageDetails]=\"msg\"\n              [loggedInUser]=\"loggedInUser\"\n              (actionGenerated)=\"actionHandler($event)\"\n            >\n            </cometchat-receiver-poll-message-bubble>\n          </div>\n          <!--CASE FOR  POLLS ENDS -->\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n",
                    styles: [".chatListStyle{z-index:1;width:100%;flex:1 1 0;order:2;position:relative;height:100%}.listWrapperStyle{box-sizing:border-box;display:flex;flex-direction:column;position:absolute;top:0;width:100%;z-index:100;padding-top:14px}.actionMessageTxtStyle{padding:8px 12px;margin-bottom:16px;text-align:center}.messageDateContainerStyle{text-align:center;margin-bottom:16px}.messageDateStyle{padding:8px 12px;background-color:#f6f6f6;color:#141414;border-radius:10px}.decoratorMessageStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.decoratorMessageTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}"]
                }] }
    ];
    /** @nocollapse */
    CometchatMessageListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DatePipe }
    ]; };
    CometchatMessageListComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        parentMessageId: [{ type: Input }],
        messages: [{ type: Input }],
        reachedTopOfConversation: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatMessageListComponent;
}());
export { CometchatMessageListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZS1saXN0L2NvbWV0Y2hhdC1tZXNzYWdlLWxpc3QvY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFJWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQThDRSx1Q0FBb0IsR0FBc0IsRUFBUyxRQUFrQjtRQUFyRSxpQkFNQztRQU5tQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUF2QzVELFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLDZCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUU3QixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxxQkFBZ0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLGtCQUFhLEdBQUcsVUFB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Q0gsdURBQWU7Ozs7OztJQUFmLFVBQWdCLFNBQVMsRUFBRSxVQUFVO1FBQ25DLE9BQU8sQ0FDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDNUQsQ0FBQztJQUNKLENBQUM7O2dCQXZ5QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLDRtUEFBc0Q7O2lCQUV2RDs7OztnQkFYQyxpQkFBaUI7Z0JBSVYsUUFBUTs7O3VCQVVkLEtBQUs7dUJBQ0wsS0FBSztrQ0FDTCxLQUFLOzJCQUVMLEtBQUs7MkNBQ0wsS0FBSztrQ0FFTCxNQUFNOztJQTB4QlQsb0NBQUM7Q0FBQSxBQXh5QkQsSUF3eUJDO1NBbnlCWSw2QkFBNkI7OztJQUV4Qyw2Q0FBcUI7O0lBQ3JCLDZDQUFxQjs7SUFDckIsd0RBQWdDOztJQUVoQyxpREFBdUI7O0lBQ3ZCLGlFQUF1Qzs7SUFFdkMsd0RBQWtFOztJQUVsRSx3REFBZ0I7O0lBQ2hCLDhDQUFXOztJQUNYLHlEQUFvRDs7SUFDcEQsOENBQVU7O0lBQ1Ysc0RBQWtCOztJQUNsQixxREFBYTs7SUFDYixzREFBa0Q7O0lBQ2xELHdEQUFrRDs7SUFDbEQsdURBQWdEOztJQUNoRCxpREFBUzs7SUFFVCxtREFLRTs7SUFDRiw4Q0FXRTs7Ozs7O0lBMmhCRixzREFzQkU7Ozs7OztJQU1GLDREQXFCRTs7Ozs7O0lBTUYscURBV0U7O0lBbUZGLGdFQTJCRTs7Ozs7SUF6c0JVLDRDQUE4Qjs7SUFBRSxpREFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlTGlzdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIHBhcmVudE1lc3NhZ2VJZCA9IG51bGw7XG5cbiAgQElucHV0KCkgbWVzc2FnZXMgPSBbXTtcbiAgQElucHV0KCkgcmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gW107XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWVzc2FnZXNSZXF1ZXN0O1xuICBsaW1pdCA9IDUwO1xuICBkZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIHRpbWVzID0gMDtcbiAgbGFzdFNjcm9sbFRvcCA9IDA7XG4gIGxvZ2dlZEluVXNlcjtcbiAgbXNnTGlzdGVuZXJJZCA9IFwibWVzc2FnZV9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBncm91cExpc3RlbmVySWQgPSBcImdyb3VwX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNhbGxMaXN0ZW5lcklkID0gXCJjYWxsX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHByZXZVc2VyO1xuXG4gIGNhdGVnb3JpZXMgPSBbXG4gICAgZW51bXMuQ0FURUdPUllfTUVTU0FHRSxcbiAgICBlbnVtcy5DQVRFR09SWV9DVVNUT00sXG4gICAgZW51bXMuQ0FURUdPUllfQUNUSU9OLFxuICAgIGVudW1zLkNBVEVHT1JZX0NBTEwsXG4gIF07XG4gIHR5cGVzID0gW1xuICAgIGVudW1zLk1FU1NBR0VfVFlQRV9URVhULFxuICAgIGVudW1zLk1FU1NBR0VfVFlQRV9JTUFHRSxcbiAgICBlbnVtcy5NRVNTQUdFX1RZUEVfVklERU8sXG4gICAgZW51bXMuTUVTU0FHRV9UWVBFX0FVRElPLFxuICAgIGVudW1zLk1FU1NBR0VfVFlQRV9GSUxFLFxuICAgIGVudW1zLkNVU1RPTV9UWVBFX1BPTEwsXG4gICAgZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUixcbiAgICBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICBlbnVtcy5DQUxMX1RZUEVfQVVESU8sXG4gICAgZW51bXMuQ0FMTF9UWVBFX1ZJREVPLFxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDI1MDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIml0ZW1cIl0pIHtcbiAgICAgIC8vUmVtb3ZpbmcgUHJldmlvdXMgQ29udmVyc2F0aW9uIExpc3RlbmVyc1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZU1lc3NhZ2VMaXN0ZW5lcih0aGlzLm1zZ0xpc3RlbmVySWQpO1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcblxuICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkID0gXCJtZXNzYWdlX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmdyb3VwTGlzdGVuZXJJZCA9IFwiZ3JvdXBfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQgPSBcImNhbGxfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgdGhpcy5jcmVhdGVNZXNzYWdlUmVxdWVzdE9iamVjdEFuZEdldE1lc3NhZ2VzKCk7XG5cbiAgICAgIC8vIEF0dGFjaCBNZXNzYWdlTGlzdGVuZXJzIGZvciB0aGUgbmV3IGNvbnZlcnNhdGlvblxuICAgICAgdGhpcy5hZGRNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wicmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uXCJdKSB7XG4gICAgICBpZiAoY2hhbmdlW1wicmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uXCJdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmdldE1lc3NhZ2VzKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbmV3IHRocmVhZCBvcGVuZWRcbiAgICBpZiAoY2hhbmdlW1wicGFyZW50TWVzc2FnZUlkXCJdKSB7XG4gICAgICAvL1JlbW92aW5nIFByZXZpb3VzIHRocmVhZCBMaXN0ZW5lcnNcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5tc2dMaXN0ZW5lcklkKTtcbiAgICAgIHRoaXMubXNnTGlzdGVuZXJJZCA9IFwibWVzc2FnZV9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5jcmVhdGVNZXNzYWdlUmVxdWVzdE9iamVjdEFuZEdldE1lc3NhZ2VzKCk7XG5cbiAgICAgIC8vIEF0dGFjaCBNZXNzYWdlTGlzdGVuZXJzIGZvciB0aGUgbmV3IGNvbnZlcnNhdGlvblxuICAgICAgdGhpcy5hZGRNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wibWVzc2FnZXNcIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJtZXNzYWdlc1wiXS5jdXJyZW50VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlTWVzc2FnZVJlcXVlc3RPYmplY3RBbmRHZXRNZXNzYWdlcygpO1xuXG4gICAgLy8gQXR0YWNoIE1lc3NhZ2VMaXN0ZW5lcnMgSGVyZVxuICAgIHRoaXMuYWRkTWVzc2FnZUV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyByZW1vdmluZiB0aGUgY2hhbmdlRGV0ZWN0b3IgUmVmXG4gICAgLy90aGlzLnJlZi5kZXRhY2goKTtcblxuICAgIC8vUmVtb3ZpbmcgTWVzc2FnZSBMaXN0ZW5lcnNcbiAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubXNnTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIE1lc3NhZ2UgUmVxdWVzdCBvYmplY3QgKCBob2xkaW5nIHRoZSBjb25maWcgLCB0aGF0IGlzIHRoZSB0d28gdXNlciBpbnZvbHZlZCBpbiBjb252ZXJzYXRpb24gKSBhbmQgZ2V0cyBhbGwgdGhlIG1lc3NhZ2VzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY3JlYXRlTWVzc2FnZVJlcXVlc3RPYmplY3RBbmRHZXRNZXNzYWdlcygpIHtcbiAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgIHRoaXMubWVzc2FnZXNSZXF1ZXN0ID0gdGhpcy5idWlsZE1lc3NhZ2VSZXF1ZXN0T2JqZWN0KFxuICAgICAgICB0aGlzLml0ZW0sXG4gICAgICAgIHRoaXMudHlwZSxcbiAgICAgICAgdGhpcy5wYXJlbnRNZXNzYWdlSWRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVzc2FnZXNSZXF1ZXN0ID0gdGhpcy5idWlsZE1lc3NhZ2VSZXF1ZXN0T2JqZWN0KFxuICAgICAgICB0aGlzLml0ZW0sXG4gICAgICAgIHRoaXMudHlwZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmdldE1lc3NhZ2VzKGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBUbyBSZWNlaXZlIE1lc3NhZ2VzIGluIFJlYWwgVGltZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGFkZE1lc3NhZ2VFdmVudExpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQuYWRkTWVzc2FnZUxpc3RlbmVyKFxuICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5NZXNzYWdlTGlzdGVuZXIoe1xuICAgICAgICBvblRleHRNZXNzYWdlUmVjZWl2ZWQ6ICh0ZXh0TWVzc2FnZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGV4dCBtZXNzYWdlIHJlY2VpdmVkIHN1Y2Nlc3NmdWxseVwiLCB0ZXh0TWVzc2FnZSk7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQsIHRleHRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZWRpYU1lc3NhZ2VSZWNlaXZlZDogKG1lZGlhTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWVkaWEgbWVzc2FnZSByZWNlaXZlZCBzdWNjZXNzZnVsbHlcIiwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQsIG1lZGlhTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ3VzdG9tTWVzc2FnZVJlY2VpdmVkOiAoY3VzdG9tTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VzdG9tIG1lc3NhZ2UgcmVjZWl2ZWQgc3VjY2Vzc2Z1bGx5XCIsIGN1c3RvbU1lc3NhZ2UpO1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRUQsIGN1c3RvbU1lc3NhZ2UpO1xuICAgICAgICAgIC8vIEhhbmRsZSBjdXN0b20gbWVzc2FnZVxuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VzRGVsaXZlcmVkOiAobWVzc2FnZVJlY2VpcHQpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRleHQgTWVzc2FnZSBEZWxpdmVyZWQgc3VjY2Vzc2Z1bGx5IFwiLCBtZXNzYWdlUmVjZWlwdCk7XG5cbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk1FU1NBR0VfREVMSVZFUkVELCBtZXNzYWdlUmVjZWlwdCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVzc2FnZXNSZWFkOiAobWVzc2FnZVJlY2VpcHQpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRleHQgTWVzc2FnZSBSZWFkIHN1Y2Nlc3NmdWxseSBcIiwgbWVzc2FnZVJlY2VpcHQpO1xuXG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5NRVNTQUdFX1JFQUQsIG1lc3NhZ2VSZWNlaXB0KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRGVsZXRlZDogKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5NRVNTQUdFX0RFTEVURUQsIGRlbGV0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRWRpdGVkOiAoZWRpdGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoZW51bXMuTUVTU0FHRV9FRElURUQsIGVkaXRlZE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZEdyb3VwTGlzdGVuZXIoXG4gICAgICB0aGlzLmdyb3VwTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuR3JvdXBMaXN0ZW5lcih7XG4gICAgICAgIG9uR3JvdXBNZW1iZXJTY29wZUNoYW5nZWQ6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGNoYW5nZWRVc2VyLFxuICAgICAgICAgIG5ld1Njb3BlLFxuICAgICAgICAgIG9sZFNjb3BlLFxuICAgICAgICAgIGNoYW5nZWRHcm91cFxuICAgICAgICApID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKFxuICAgICAgICAgICAgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgY2hhbmdlZEdyb3VwLFxuICAgICAgICAgICAgeyB1c2VyOiBjaGFuZ2VkVXNlciwgc2NvcGU6IG5ld1Njb3BlIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIG1lc3NhZ2UsIGtpY2tlZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQsIG1lc3NhZ2UsIGJhbm5lZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IGJhbm5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJVbmJhbm5lZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdW5iYW5uZWRVc2VyLFxuICAgICAgICAgIHVuYmFubmVkQnksXG4gICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVVwZGF0ZWQoXG4gICAgICAgICAgICBlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgdW5iYW5uZWRGcm9tLFxuICAgICAgICAgICAgeyB1c2VyOiB1bmJhbm5lZFVzZXIgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgdXNlckFkZGVkSW5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIG1lc3NhZ2UsIHVzZXJBZGRlZEluLCB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJMZWZ0OiAobWVzc2FnZSwgbGVhdmluZ1VzZXIsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgbWVzc2FnZSwgZ3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGxlYXZpbmdVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIG1lc3NhZ2UsIGpvaW5lZEdyb3VwLCB7XG4gICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZENhbGxMaXN0ZW5lcihcbiAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LkNhbGxMaXN0ZW5lcih7XG4gICAgICAgIG9uSW5jb21pbmdDYWxsUmVjZWl2ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JbmNvbWluZ0NhbGxDYW5jZWxsZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3V0Z29pbmdDYWxsQWNjZXB0ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVXBkYXRlZChlbnVtcy5PVVRHT0lOR19DQUxMX0FDQ0VQVEVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PdXRnb2luZ0NhbGxSZWplY3RlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VVcGRhdGVkKGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgQnVpbGQgTWVzc2FnZSBSZXF1ZXN0IENvbmZpZ3VyYXRpb24gT2JqZWN0ICwgdGhhdCBoZWxwcyBpbiBnZXR0aW5nIG1lc3NhZ2VzIG9mIGEgcGFydGljdWxhciBjb252ZXJzYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBidWlsZE1lc3NhZ2VSZXF1ZXN0T2JqZWN0KGl0ZW0gPSBudWxsLCB0eXBlID0gbnVsbCwgcGFyZW50TWVzc2FnZUlkID0gbnVsbCkge1xuICAgIGxldCBtZXNzYWdlUmVxdWVzdEJ1aWx0O1xuXG4gICAgaWYgKHR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICBpZiAocGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgIG1lc3NhZ2VSZXF1ZXN0QnVpbHQgPSBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAgIC5zZXRVSUQoaXRlbS51aWQpXG4gICAgICAgICAgLnNldFBhcmVudE1lc3NhZ2VJZChwYXJlbnRNZXNzYWdlSWQpXG4gICAgICAgICAgLnNldENhdGVnb3JpZXModGhpcy5jYXRlZ29yaWVzKVxuICAgICAgICAgIC5zZXRUeXBlcyh0aGlzLnR5cGVzKVxuICAgICAgICAgIC5zZXRMaW1pdCh0aGlzLmxpbWl0KVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldFVJRChpdGVtLnVpZClcbiAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgLnNldFR5cGVzKHRoaXMudHlwZXMpXG4gICAgICAgICAgLmhpZGVSZXBsaWVzKHRydWUpXG4gICAgICAgICAgLnNldExpbWl0KHRoaXMubGltaXQpXG4gICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIGlmIChwYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RCdWlsdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldEdVSUQoaXRlbS5ndWlkKVxuICAgICAgICAgIC5zZXRQYXJlbnRNZXNzYWdlSWQocGFyZW50TWVzc2FnZUlkKVxuICAgICAgICAgIC5zZXRDYXRlZ29yaWVzKHRoaXMuY2F0ZWdvcmllcylcbiAgICAgICAgICAuc2V0VHlwZXModGhpcy50eXBlcylcbiAgICAgICAgICAuc2V0TGltaXQodGhpcy5saW1pdClcbiAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2VSZXF1ZXN0QnVpbHQgPSBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAgIC5zZXRHVUlEKGl0ZW0uZ3VpZClcbiAgICAgICAgICAuc2V0Q2F0ZWdvcmllcyh0aGlzLmNhdGVnb3JpZXMpXG4gICAgICAgICAgLnNldFR5cGVzKHRoaXMudHlwZXMpXG4gICAgICAgICAgLmhpZGVSZXBsaWVzKHRydWUpXG4gICAgICAgICAgLnNldExpbWl0KHRoaXMubGltaXQpXG4gICAgICAgICAgLmJ1aWxkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VSZXF1ZXN0QnVpbHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBNZXNzYWdlcyBGb3IgYSBwYXJ0aWN1bGFyIGNvbnZlcnNhdGlvbiBiYXNlcyBvbiBNZXNzYWdlUmVxdWVzdENvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldE1lc3NhZ2VzKFxuICAgIHNjcm9sbFRvQm90dG9tID0gZmFsc2UsXG4gICAgbmV3Q29udmVyc2F0aW9uID0gZmFsc2UsXG4gICAgc2Nyb2xsVG9Ub3AgPSBmYWxzZVxuICApIHtcbiAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgICBjb25zdCBhY3Rpb25NZXNzYWdlcyA9IFtdO1xuXG4gICAgbGV0IHVzZXIgPSBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbihcbiAgICAgICh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VzUmVxdWVzdC5mZXRjaFByZXZpb3VzKCkudGhlbihcbiAgICAgICAgICAobWVzc2FnZUxpc3QpID0+IHtcbiAgICAgICAgICAgIC8vIE5vIE1lc3NhZ2VzIEZvdW5kXG4gICAgICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoID09PSAwICYmIHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19NRVNTQUdFU19GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lc3NhZ2VMaXN0LmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2F0ZWdvcnkgPT09IFwiYWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnNlbmRlci51aWQgPT09IFwiYXBwX3N5c3RlbVwiXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGFjdGlvbk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvL2lmIHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UgaXMgbm90IHRoZSBsb2dnZWRpbiB1c2VyLCBtYXJrIGl0IGFzIHJlYWQuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLmdldFVpZCgpICE9PSB1c2VyLmdldFVpZCgpICYmXG4gICAgICAgICAgICAgICAgIW1lc3NhZ2UuZ2V0UmVhZEF0KClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiKSB7XG4gICAgICAgICAgICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkuZ2V0VWlkKCksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIpIHtcbiAgICAgICAgICAgICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX19SRUFELFxuICAgICAgICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICsrdGhpcy50aW1lcztcblxuICAgICAgICAgICAgbGV0IGFjdGlvbkdlbmVyYXRlZFR5cGUgPSBcIm1lc3NhZ2VGZXRjaGVkXCI7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9Cb3R0b20gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgYWN0aW9uR2VuZXJhdGVkVHlwZSA9IFwibWVzc2FnZUZldGNoZWRBZ2FpblwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9Ub3ApIHtcbiAgICAgICAgICAgICAgYWN0aW9uR2VuZXJhdGVkVHlwZSA9IFwib2xkZXJNZXNzYWdlc0ZldGNoZWRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT25seSBjYWxsZWQgd2hlbiB0aGUgYWN0aXZlIHVzZXIgY2hhbmdlcyB0aGUgdGhlIGNvbnZlcnNhdGlvbiAsIHRoYXQgaXMgc3dpdGNoZXMgdG8gc29tZSBvdGhlciBwZXJzb25cbiAgICAgICAgICAgIC8vIHRvIGNoYXQgd2l0aFxuICAgICAgICAgICAgaWYgKG5ld0NvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgICBhY3Rpb25HZW5lcmF0ZWRUeXBlID0gXCJuZXdDb252ZXJzYXRpb25PcGVuZWRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAodGhpcy50aW1lcyA9PT0gMSAmJiBhY3Rpb25NZXNzYWdlcy5sZW5ndGggPiA1KSB8fFxuICAgICAgICAgICAgICAodGhpcy50aW1lcyA+IDEgJiYgYWN0aW9uTWVzc2FnZXMubGVuZ3RoID09PSAzMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0ZFVENIRUQsXG4gICAgICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmdldE1lc3NhZ2VzKHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEltcGxlbWVudCBTY3JvbGwgTG9naWMgZnJvbSBSZWFjdFxuICAgICAgICAgICAgICAvLyB0aGlzLmxhc3RTY3JvbGxUb3AgPSB0aGlzLm1lc3NhZ2VzRW5kLnNjcm9sbEhlaWdodDtcblxuICAgICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25HZW5lcmF0ZWRUeXBlLFxuICAgICAgICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VMaXN0LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJNZXNzYWdlIGZldGNoaW5nIGZhaWxlZCB3aXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIExvZ2dlZCBJbiBVc2VyIEZvdW5kXCIsIHsgZXJyb3IgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG1lc3NhZ2VVcGRhdGVkKGtleSA9IG51bGwsIG1lc3NhZ2UgPSBudWxsLCBncm91cCA9IG51bGwsIG9wdGlvbnMgPSBudWxsKSB7XG4gICAgLy90aGVyZSBhcmUgbWFueSBjYXNlcyB0byBiZSBmaWxsZWQgSGVyZVxuXG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuVEVYVF9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgICB0aGlzLm1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMSVZFUkVEOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1JFQUQ6XG4gICAgICAgIHRoaXMubWVzc2FnZVJlYWRBbmREZWxpdmVyZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURUQ6IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlRGVsZXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVEVEOiB7XG4gICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQ6IHtcbiAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgdGhpcy5jdXN0b21NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9BQ0NFUFRFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgICAgdGhpcy5jYWxsVXBkYXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICAvL25ldyBtZXNzYWdlc1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpID09PSB0aGlzLml0ZW0uZ3VpZFxuICAgICkge1xuICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfUkVDRUlWRUQsXG4gICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcInVzZXJcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQgPT09IHRoaXMuaXRlbS51aWRcbiAgICApIHtcbiAgICAgIGlmICghbWVzc2FnZS5nZXRSZWFkQXQoKSkge1xuICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChcbiAgICAgICAgICBtZXNzYWdlLmdldElkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCxcbiAgICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX1JFQ0VJVkVELFxuICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG5cbiAgbWVzc2FnZVJlYWRBbmREZWxpdmVyZWQobWVzc2FnZSkge1xuICAgIGlmIChcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLmdldFVpZCgpID09PSB0aGlzLml0ZW0udWlkICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZFxuICAgICkge1xuICAgICAgbGV0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZXNdO1xuXG4gICAgICBpZiAobWVzc2FnZS5nZXRSZWNlaXB0VHlwZSgpID09PSBcImRlbGl2ZXJ5XCIpIHtcbiAgICAgICAgLy9zZWFyY2ggZm9yIG1lc3NhZ2VcbiAgICAgICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgKG0pID0+IG0uaWQgPT09IG1lc3NhZ2UubWVzc2FnZUlkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICAgIGxldCBtZXNzYWdlT2JqID0geyAuLi5tZXNzYWdlTGlzdFttZXNzYWdlS2V5XSB9O1xuICAgICAgICAgIGxldCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwge1xuICAgICAgICAgICAgZGVsaXZlcmVkQXQ6IG1lc3NhZ2UuZ2V0RGVsaXZlcmVkQXQoKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG5cbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfVVBEQVRFRCxcbiAgICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VMaXN0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZ2V0UmVjZWlwdFR5cGUoKSA9PT0gXCJyZWFkXCIpIHtcbiAgICAgICAgLy9zZWFyY2ggZm9yIG1lc3NhZ2VcbiAgICAgICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgKG0pID0+IG0uaWQgPT09IG1lc3NhZ2UubWVzc2FnZUlkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICAgIGxldCBtZXNzYWdlT2JqID0geyAuLi5tZXNzYWdlTGlzdFttZXNzYWdlS2V5XSB9O1xuICAgICAgICAgIGxldCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwge1xuICAgICAgICAgICAgcmVhZEF0OiBtZXNzYWdlLmdldFJlYWRBdCgpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcblxuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9VUERBVEVELFxuICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZUxpc3QsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICApIHtcbiAgICAgIC8vbm90IGltcGxlbWVudGVkIGluIFJlYWN0IEFsc29cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYW4gQWN0aW9uIEluZGljYXRpbmcgdGhhdCBhIG1lc3NhZ2Ugd2FzIGRlbGV0ZWQgYnkgdGhlIHVzZXIvcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VEZWxldGVkKG1lc3NhZ2UpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWRcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0RFTEVURSxcbiAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfREVMRVRFLFxuICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0cyBpZiB0aGUgbWVzc2FnZSB0aGF0IHdhcyBlZGl0IGlzIHlvdSBjdXJyZW50IG9wZW4gY29udmVyc2F0aW9uIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VFZGl0ZWQgPSAobWVzc2FnZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZFxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVFZGl0ZWRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcInVzZXJcIiAmJlxuICAgICAgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBtZXNzYWdlLmdldFJlY2VpdmVySWQoKSAmJlxuICAgICAgbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQgPT09IHRoaXMuaXRlbS51aWRcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlRWRpdGVkTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gbWVzc2FnZS5nZXRTZW5kZXIoKS51aWQgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJJZCgpID09PSB0aGlzLml0ZW0udWlkXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVkaXRlZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IGEgbWVzc2FnZSB3YXMgZGVsZXRlZCBieSB0aGUgdXNlci9wZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdXBkYXRlRWRpdGVkTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgLy9JZiB0aGUgdXBkYXRlZCBtZXNzYWdlIGlzIHRoZSBjdXJyZW50IG1lc3NhZ2UgdGhhdCBpcyBvcGVuZWQgaW4gdGhyZWFkIHZpZXcgdGhlbiB1cGRhdGUgdGhyZWFkIHZpZXcgYWxzb1xuICAgIGlmIChtZXNzYWdlLmlkID09IHRoaXMucGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlc107XG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoKG0sIGspID0+IG0uaWQgPT09IG1lc3NhZ2UuaWQpO1xuXG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIG1lc3NhZ2UpO1xuXG4gICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiBtZXNzYWdlTGlzdCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gQWN0aW9uIEluZGljYXRpbmcgdGhhdCBHcm91cCBEYXRhIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZFxuICAgICkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkdST1VQX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IHsgbWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucyB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGN1c3RvbU1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSAmJlxuICAgICAgICBtZXNzYWdlLnR5cGUgIT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIgJiZcbiAgICAgICAgbWVzc2FnZS50eXBlICE9PSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVIpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IGVudW1zLkNVU1RPTV9UWVBFX1BPTEwpIHtcbiAgICAgICAgLy9jdXN0b21kYXRhIChwb2xsIGV4dGVuc2lvbikgZG9lcyBub3QgaGF2ZSBtZXRhZGF0YVxuXG4gICAgICAgIC8vVGhlIHBvbGwgbWVzc2FnZSB0aGF0ICBpcyByZWNlaXZlZCBieSB0aGUgbWVzc2FnZSBsaXN0ZW5lcnMgLCB3aWxsIG5vdCBiZSBhcHBlbmRlZCB0byBtZXNzYWdlIGxpc3RcbiAgICAgICAgLy9pZiB0aGUgY3VycmVudCBsb2dnZWRJbiB1c2VyIGlzIHRoZSBzZW5kZXIvY3JlYXRvciBvZiB0aGUgcG9sbCBtZXNzYWdlXG4gICAgICAgIGlmIChtZXNzYWdlLnNlbmRlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld01lc3NhZ2UgPSB0aGlzLmFkZE1ldGFkYXRhVG9DdXN0b21EYXRhKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFLFxuICAgICAgICAgIHBheUxvYWQ6IFtuZXdNZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICkge1xuICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikgJiZcbiAgICAgICAgbWVzc2FnZS50eXBlICE9PSBlbnVtcy5DVVNUT01fVFlQRV9TVElDS0VSICYmXG4gICAgICAgIG1lc3NhZ2UudHlwZSAhPT0gZW51bXMuQ1VTVE9NX1RZUEVfUE9MTFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkUsXG4gICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSBlbnVtcy5DVVNUT01fVFlQRV9TVElDS0VSKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkUsXG4gICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMKSB7XG4gICAgICAgIC8vY3VzdG9tZGF0YSAocG9sbCBleHRlbnNpb24pIGRvZXMgbm90IGhhdmUgbWV0YWRhdGFcblxuICAgICAgICBjb25zdCBuZXdNZXNzYWdlID0gdGhpcy5hZGRNZXRhZGF0YVRvQ3VzdG9tRGF0YShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRSxcbiAgICAgICAgICBwYXlMb2FkOiBbbmV3TWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhZGRNZXRhZGF0YVRvQ3VzdG9tRGF0YSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRGF0YSA9IG1lc3NhZ2UuZGF0YS5jdXN0b21EYXRhO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjdXN0b21EYXRhLm9wdGlvbnM7XG5cbiAgICBjb25zdCByZXN1bHRPcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgcmVzdWx0T3B0aW9uc1tvcHRpb25dID0ge1xuICAgICAgICB0ZXh0OiBvcHRpb25zW29wdGlvbl0sXG4gICAgICAgIGNvdW50OiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBwb2xscyA9IHtcbiAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIHJlc3VsdHM6IHtcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICAgIG9wdGlvbnM6IHJlc3VsdE9wdGlvbnMsXG4gICAgICAgIHF1ZXN0aW9uOiBjdXN0b21EYXRhLnF1ZXN0aW9uLFxuICAgICAgfSxcbiAgICAgIHF1ZXN0aW9uOiBjdXN0b21EYXRhLnF1ZXN0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubWVzc2FnZSxcbiAgICAgIG1ldGFkYXRhOiB7IFwiQGluamVjdGVkXCI6IHsgZXh0ZW5zaW9uczogeyBwb2xsczogcG9sbHMgfSB9IH0sXG4gICAgfTtcbiAgfTtcblxuICBjYWxsVXBkYXRlZChtZXNzYWdlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCkgPT09IHRoaXMuaXRlbS5ndWlkXG4gICAgKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UuZ2V0UmVhZEF0KCkpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoXG4gICAgICAgICAgbWVzc2FnZS5nZXRJZCgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlcklkKCksXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuQ0FMTF9VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwidXNlclwiICYmXG4gICAgICBtZXNzYWdlLmdldFNlbmRlcigpLnVpZCA9PT0gdGhpcy5pdGVtLnVpZFxuICAgICkge1xuICAgICAgaWYgKCFtZXNzYWdlLmdldFJlYWRBdCgpKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0SWQoKS50b1N0cmluZygpLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0U2VuZGVyKCkudWlkLFxuICAgICAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkNBTExfVVBEQVRFRCxcbiAgICAgICAgcGF5TG9hZDogbWVzc2FnZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gZGF0ZXMgYW5kIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIG5vdCBlcXVhbFxuICAgKi9cbiAgaXNEYXRlRGlmZmVyZW50KGZpcnN0RGF0ZSwgc2Vjb25kRGF0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmRhdGVwaXBlLnRyYW5zZm9ybShmaXJzdERhdGUsIFwiZCBtbSB5eXl5XCIpLnRvU3RyaW5nKCkgIT09XG4gICAgICB0aGlzLmRhdGVwaXBlLnRyYW5zZm9ybShzZWNvbmREYXRlLCBcImQgbW0geXl5eVwiKS50b1N0cmluZygpXG4gICAgKTtcbiAgfVxufVxuIl19