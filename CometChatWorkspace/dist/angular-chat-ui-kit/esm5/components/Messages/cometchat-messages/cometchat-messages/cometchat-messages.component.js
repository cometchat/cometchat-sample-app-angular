/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-messages/cometchat-messages/cometchat-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { INCOMING_MESSAGE_SOUND } from "../../../resources/audio/incomingMessageSound";
import * as enums from "../../../utils/enums";
var CometchatMessagesComponent = /** @class */ (function () {
    function CometchatMessagesComponent() {
        var _this = this;
        this.item = null;
        this.type = null;
        this.composedthreadmessage = null;
        this.groupMessage = null;
        this.callMessage = null;
        this.actionGenerated = new EventEmitter();
        this.messageList = [];
        this.messageToBeEdited = null;
        this.replyPreview = null;
        this.liveReaction = false;
        this.changeNumber = 0;
        this.reachedTopOfConversation = false;
        this.scrollVariable = 0;
        this.reactionName = "heart";
        this.messageToReact = null;
        /**
         * update status of message ie. read or deliv
         * @param Any messages
         */
        this.updateMessages = (/**
         * @param {?} messages
         * @return {?}
         */
        function (messages) {
            // let dummy = [...this.messageList];
            _this.messageList = tslib_1.__spread(messages);
            //this.scrollToBottomOfChatWindow();
        });
        /**
         * Delete the message
         * @param Any message
         */
        this.deleteMessage = (/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            /** @type {?} */
            var messageId = message.id;
            CometChat.deleteMessage(messageId)
                .then((/**
             * @param {?} deletedMessage
             * @return {?}
             */
            function (deletedMessage) {
                _this.removeMessages([deletedMessage]);
                /** @type {?} */
                var messageList = tslib_1.__spread(_this.messageList);
                /** @type {?} */
                var messageKey = messageList.findIndex((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) { return m.id === message.id; }));
                if (messageList.length - messageKey === 1 && !message.replyCount) {
                    _this.actionGenerated.emit({
                        type: enums.MESSAGE_DELETE,
                        payLoad: [deletedMessage],
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("Message delete failed with error:", error);
            }));
        });
        /**
         * If the message gets deleted successfull , remove the deleted message in frontend using this function
         * @param Any messages
         */
        this.removeMessages = (/**
         * @param {?} messages
         * @return {?}
         */
        function (messages) {
            /** @type {?} */
            var deletedMessage = messages[0];
            /** @type {?} */
            var messagelist = tslib_1.__spread(_this.messageList);
            /** @type {?} */
            var messageKey = messagelist.findIndex((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return message.id === deletedMessage.id; }));
            if (messageKey > -1) {
                /** @type {?} */
                var messageObj = tslib_1.__assign({}, messagelist[messageKey]);
                /** @type {?} */
                var newMessageObj = Object.assign({}, messageObj, deletedMessage);
                messagelist.splice(messageKey, 1, newMessageObj);
                // this.setState({ messageList: messagelist, scrollToBottom: false });
                _this.messageList = tslib_1.__spread(messagelist);
            }
        });
        /**
         * Emits an Action Indicating that Group Data has been updated
         * @param
         */
        this.groupUpdated = (/**
         * @param {?} message
         * @param {?} key
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        function (message, key, group, options) {
            _this.appendMessage([message]);
            _this.actionGenerated.emit({
                type: enums.GROUP_UPDATED,
                payLoad: { message: message, key: key, group: group, options: options },
            });
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatMessagesComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["composedthreadmessage"]) {
            // There is a valid Thread parent message , than update it's reply count
            if (change["composedthreadmessage"].currentValue) {
                this.messageEdited(change["composedthreadmessage"].currentValue);
            }
        }
        if (change["groupMessage"]) {
            if (change["groupMessage"].currentValue.length > 0) {
                this.appendMessage(change["groupMessage"].currentValue);
            }
        }
        // When There is call display proper call messages
        if (change["callMessage"]) {
            /** @type {?} */
            var prevProps = { callMessage: null };
            /** @type {?} */
            var props = { callMessage: null };
            prevProps["callMessage"] = change["callMessage"].previousValue;
            props["callMessage"] = change["callMessage"].currentValue;
            if (prevProps.callMessage !== props.callMessage && props.callMessage) {
                this.actionHandler({
                    type: enums.CALL_UPDATED,
                    payLoad: change["callMessage"].currentValue,
                });
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatMessagesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Updating the reply count of Thread Parent Message
     * @param Any message
     */
    /**
     * Updating the reply count of Thread Parent Message
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.updateReplyCount = /**
     * Updating the reply count of Thread Parent Message
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        /** @type {?} */
        var receivedMessage = messages[0];
        /** @type {?} */
        var messageList = tslib_1.__spread(this.messageList);
        /** @type {?} */
        var messageKey = messageList.findIndex((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m.id === receivedMessage.parentMessageId; }));
        if (messageKey > -1) {
            /** @type {?} */
            var messageObj = messageList[messageKey];
            /** @type {?} */
            var replyCount = messageObj.replyCount ? messageObj.replyCount : 0;
            replyCount = replyCount + 1;
            /** @type {?} */
            var newMessageObj = Object.assign({}, messageObj, {
                replyCount: replyCount,
            });
            messageList.splice(messageKey, 1, newMessageObj);
            this.messageList = tslib_1.__spread(messageList);
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
    CometchatMessagesComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
        var _this = this;
        //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
        // action.payLoad has the array of messages that is received
        /** @type {?} */
        var messages = action.payLoad;
        /** @type {?} */
        var data = action.payLoad;
        switch (action.type) {
            case enums.CUSTOM_MESSAGE_RECEIVE:
            case enums.MESSAGE_RECEIVED: {
                /** @type {?} */
                var message = messages[0];
                if (message.parentMessageId) {
                    // Implement while doing the threaded message feature
                    this.updateReplyCount(messages);
                }
                else {
                    // Smart Reply Feature
                    this.smartReplyPreview(messages);
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.scrollToBottomOfChatWindow();
                    }), 2500);
                    this.appendMessage(messages);
                }
                //play message received audio
                this.playAudio();
                break;
            }
            case enums.MESSAGE_FETCHED: {
                this.prependMessages(messages);
                break;
            }
            case enums.OLDER_MESSAGES_FETCHED: {
                this.reachedTopOfConversation = false;
                //No Need for below actions if there is nothing to prepend
                if (messages.length == 0)
                    break;
                /** @type {?} */
                var prevScrollHeight_1 = this.chatWindow.nativeElement.scrollHeight;
                this.prependMessages(messages);
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.chatWindow.nativeElement.scrollTop =
                        _this.chatWindow.nativeElement.scrollHeight - prevScrollHeight_1;
                    // this.scrollVariable =
                    //   this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
                }));
                break;
            }
            case enums.MESSAGE_COMPOSED: {
                this.appendMessage(messages);
                this.actionGenerated.emit({
                    type: enums.MESSAGE_COMPOSED,
                    payLoad: messages,
                });
                break;
            }
            case enums.MESSAGE_UPDATED: {
                this.updateMessages(messages);
                break;
            }
            case enums.VIEW_ACTUAL_IMAGE: {
                this.actionGenerated.emit({
                    type: enums.VIEW_ACTUAL_IMAGE,
                    payLoad: messages,
                });
                break;
            }
            case enums.NEW_CONVERSATION_OPENED: {
                this.resetPage();
                this.setMessages(messages);
                break;
            }
            case enums.VIEW_MESSAGE_THREAD: {
                this.actionGenerated.emit({
                    type: enums.VIEW_MESSAGE_THREAD,
                    payLoad: messages,
                });
                break;
            }
            case enums.THREAD_PARENT_MESSAGE_UPDATED: {
                this.actionGenerated.emit({
                    type: enums.THREAD_PARENT_MESSAGE_UPDATED,
                    payLoad: data,
                });
                break;
            }
            case enums.DELETE_MESSAGE: {
                this.deleteMessage(messages);
                break;
            }
            case enums.EDIT_MESSAGE: {
                this.editMessage(messages);
                break;
            }
            case enums.MESSAGE_EDIT: {
                this.messageEdited(messages);
                break;
            }
            case enums.AUDIO_CALL:
            case enums.VIDEO_CALL:
            case enums.VIEW_DETAIL:
            case enums.MENU_CLICKED: {
                this.actionGenerated.emit(action);
                break;
            }
            case enums.SEND_REACTION: {
                this.toggleReaction(true);
                break;
            }
            case enums.SHOW_REACTION: {
                this.showReaction(messages);
                break;
            }
            case enums.STOP_REACTION: {
                this.toggleReaction(false);
                break;
            }
            case enums.CLEAR_MESSAGE_TO_BE_UPDATED: {
                this.messageToBeEdited = null;
                break;
            }
            case enums.MESSAGE_UPDATED: {
                this.updateMessages(messages);
                break;
            }
            case enums.MESSAGE_DELETE: {
                this.removeMessages(messages);
                break;
            }
            case enums.GROUP_UPDATED:
                this.groupUpdated(data.message, data.key, data.group, data.options);
                break;
            case enums.POLL_CREATED: {
                this.appendPollMessage(messages);
                break;
            }
            case enums.POLL_ANSWERED: {
                this.updatePollMessage(messages);
                break;
            }
            case enums.CALL_UPDATED: {
                this.callUpdated(messages);
            }
            case enums.AUDIO_CALL:
            case enums.VIDEO_CALL:
            case enums.VIEW_DETAIL:
            case enums.MENU_CLICKED: {
                this.actionGenerated.emit(action);
                break;
            }
            case enums.REACT_TO_MESSAGE:
                this.reactToMessage(messages);
                break;
        }
    };
    /**
     * Sets the message to which reaction has to be set
     * @param
     */
    /**
     * Sets the message to which reaction has to be set
     * @param {?} message
     * @return {?}
     */
    CometchatMessagesComponent.prototype.reactToMessage = /**
     * Sets the message to which reaction has to be set
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.messageToReact = message;
    };
    /**
     * Resets The component to initial conditions
     * @param
     */
    /**
     * Resets The component to initial conditions
     * @return {?}
     */
    CometchatMessagesComponent.prototype.resetPage = /**
     * Resets The component to initial conditions
     * @return {?}
     */
    function () {
        this.messageToBeEdited = null;
        this.replyPreview = null;
    };
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param Any messages
     */
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.setMessages = /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        this.messageList = tslib_1.__spread(messages);
        this.scrollToBottomOfChatWindow();
    };
    /**
     * prepend Fetched Messages
     * @param Any messages
     */
    /**
     * prepend Fetched Messages
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.prependMessages = /**
     * prepend Fetched Messages
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        this.messageList = tslib_1.__spread(messages, this.messageList);
    };
    /**
     * append Messages that are sent
     * @param Any messages
     */
    /**
     * append Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.appendMessage = /**
     * append Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        /** @type {?} */
        var dummy = tslib_1.__spread(this.messageList);
        this.messageList = tslib_1.__spread(dummy, messages);
        this.scrollToBottomOfChatWindow();
    };
    /**
     * append Poll Messages that are sent
     * @param Any messages
     */
    /**
     * append Poll Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.appendPollMessage = /**
     * append Poll Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        this.appendMessage(messages);
    };
    /**
     * updates Poll Messages depending on answer given by user
     * @param Any messages
     */
    /**
     * updates Poll Messages depending on answer given by user
     * @param {?} message
     * @return {?}
     */
    CometchatMessagesComponent.prototype.updatePollMessage = /**
     * updates Poll Messages depending on answer given by user
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var messageList = tslib_1.__spread(this.messageList);
        /** @type {?} */
        var messageId = message.poll.id;
        /** @type {?} */
        var messageKey = messageList.findIndex((/**
         * @param {?} m
         * @param {?} k
         * @return {?}
         */
        function (m, k) { return m.id === messageId; }));
        if (messageKey > -1) {
            /** @type {?} */
            var messageObj = messageList[messageKey];
            /** @type {?} */
            var metadataObj = {
                "@injected": { extensions: { polls: message.poll } },
            };
            /** @type {?} */
            var newMessageObj = tslib_1.__assign({}, messageObj, { metadata: metadataObj });
            // messageList.splice(messageKey, 1, newMessageObj);
            this.messageEdited(newMessageObj);
        }
    };
    /**
     * Sets The message to be edited to pass it to the message composer
     * @param Any messages
     */
    /**
     * Sets The message to be edited to pass it to the message composer
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.editMessage = /**
     * Sets The message to be edited to pass it to the message composer
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        this.messageToBeEdited = messages;
    };
    /**
     * Render The Message List after Message has been successfullly edited
     * @param Any message
     */
    /**
     * Render The Message List after Message has been successfullly edited
     * @param {?} message
     * @return {?}
     */
    CometchatMessagesComponent.prototype.messageEdited = /**
     * Render The Message List after Message has been successfullly edited
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var messageList = tslib_1.__spread(this.messageList);
        /** @type {?} */
        var messageKey = messageList.findIndex((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m.id === message.id; }));
        if (messageKey > -1) {
            /** @type {?} */
            var messageObj = messageList[messageKey];
            /** @type {?} */
            var newMessageObj = Object.assign({}, messageObj, message);
            messageList.splice(messageKey, 1, newMessageObj);
            this.updateMessages(messageList);
            if (messageList.length - messageKey === 1 && !message.replyCount) {
                this.actionGenerated.emit({
                    type: enums.MESSAGE_EDIT,
                    payLoad: [newMessageObj],
                });
            }
        }
    };
    /**
     * @param {?} messages
     * @return {?}
     */
    CometchatMessagesComponent.prototype.smartReplyPreview = /**
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        /** @type {?} */
        var message = messages[0];
        if (message.hasOwnProperty("metadata")) {
            /** @type {?} */
            var metadata = message.metadata;
            if (metadata.hasOwnProperty("@injected")) {
                /** @type {?} */
                var injectedObject = metadata["@injected"];
                if (injectedObject.hasOwnProperty("extensions")) {
                    /** @type {?} */
                    var extensionsObject = injectedObject["extensions"];
                    if (extensionsObject.hasOwnProperty("smart-reply")) {
                        /** @type {?} */
                        var smartReply = extensionsObject["smart-reply"];
                        if (smartReply.hasOwnProperty("error") === false) {
                            this.replyPreview = message;
                        }
                        else {
                            this, (this.replyPreview = null);
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    CometchatMessagesComponent.prototype.handleScroll = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        /** @type {?} */
        var top = e.currentTarget.scrollTop === 0;
        if (top) {
            this.reachedTopOfConversation = top;
        }
    };
    /**
     * @return {?}
     */
    CometchatMessagesComponent.prototype.scrollToBottomOfChatWindow = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.chatWindow.nativeElement.scrollTop =
                _this.chatWindow.nativeElement.scrollHeight -
                    _this.chatWindow.nativeElement.clientHeight;
            // this.scrollVariable =
            //   this.chatWindow.nativeElement.scrollHeight -
            //   this.chatWindow.nativeElement.clientHeight;
        }));
    };
    /**
     * Toggle Reaction -> true/false
     * @param
     */
    /**
     * Toggle Reaction -> true/false
     * @param {?} flag
     * @return {?}
     */
    CometchatMessagesComponent.prototype.toggleReaction = /**
     * Toggle Reaction -> true/false
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        this.liveReaction = flag;
    };
    /**
     * Shows Reaction on receiving end
     * @param
     */
    /**
     * Shows Reaction on receiving end
     * @param {?} reaction
     * @return {?}
     */
    CometchatMessagesComponent.prototype.showReaction = /**
     * Shows Reaction on receiving end
     * @param {?} reaction
     * @return {?}
     */
    function (reaction) {
        if (!reaction.hasOwnProperty("metadata")) {
            return false;
        }
        if (reaction.metadata == undefined) {
            return false;
        }
        if (!reaction.metadata.hasOwnProperty("type") ||
            !reaction.metadata.hasOwnProperty("reaction")) {
            return false;
        }
        if (!enums.LIVE_REACTIONS.hasOwnProperty(reaction.metadata.reaction)) {
            return false;
        }
        if (reaction.metadata.type === enums.LIVE_REACTION_KEY) {
            this.reactionName = reaction.metadata.reaction;
            this.liveReaction = true;
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessagesComponent.prototype.callUpdated = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.appendMessage([message]);
    };
    /**
     * Plays Audio When Message is Sent
     */
    /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    CometchatMessagesComponent.prototype.playAudio = /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    function () {
        /** @type {?} */
        var audio = new Audio();
        audio.src = INCOMING_MESSAGE_SOUND;
        audio.play();
    };
    CometchatMessagesComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-messages",
                    template: "<div class=\"chatWrapperStyle\">\n  <!-- Add the Action To header to make it Dynamic -->\n  <cometchat-message-header\n    [item]=\"item\"\n    [type]=\"type\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-header>\n  <div\n    class=\"messageWindowStyle\"\n    (scroll)=\"handleScroll($event)\"\n    #messageWindow\n  >\n    <cometchat-message-list\n      [item]=\"item\"\n      [type]=\"type\"\n      [messages]=\"messageList\"\n      [reachedTopOfConversation]=\"reachedTopOfConversation\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-list>\n  </div>\n  <cometchat-live-reactions\n    [reactionName]=\"reactionName\"\n    *ngIf=\"liveReaction\"\n  ></cometchat-live-reactions>\n  <cometchat-message-composer\n    [item]=\"item\"\n    [type]=\"type\"\n    [replyPreview]=\"replyPreview\"\n    [messageToBeEdited]=\"messageToBeEdited\"\n    [messageToReact]=\"messageToReact\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-composer>\n</div>\n",
                    styles: ["*{font-family:Inter,sans-serif}.chatWrapperStyle{display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;position:relative}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.messageWindowStyle{padding:20px;height:101vh;overflow:hidden;overflow-y:scroll}"]
                }] }
    ];
    /** @nocollapse */
    CometchatMessagesComponent.ctorParameters = function () { return []; };
    CometchatMessagesComponent.propDecorators = {
        chatWindow: [{ type: ViewChild, args: ["messageWindow", { static: false },] }],
        item: [{ type: Input }],
        type: [{ type: Input }],
        composedthreadmessage: [{ type: Input }],
        groupMessage: [{ type: Input }],
        callMessage: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatMessagesComponent;
}());
export { CometchatMessagesComponent };
if (false) {
    /** @type {?} */
    CometchatMessagesComponent.prototype.chatWindow;
    /** @type {?} */
    CometchatMessagesComponent.prototype.item;
    /** @type {?} */
    CometchatMessagesComponent.prototype.type;
    /** @type {?} */
    CometchatMessagesComponent.prototype.composedthreadmessage;
    /** @type {?} */
    CometchatMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometchatMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometchatMessagesComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessagesComponent.prototype.messageList;
    /** @type {?} */
    CometchatMessagesComponent.prototype.scrollToBottom;
    /** @type {?} */
    CometchatMessagesComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometchatMessagesComponent.prototype.replyPreview;
    /** @type {?} */
    CometchatMessagesComponent.prototype.liveReaction;
    /** @type {?} */
    CometchatMessagesComponent.prototype.changeNumber;
    /** @type {?} */
    CometchatMessagesComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometchatMessagesComponent.prototype.scrollVariable;
    /** @type {?} */
    CometchatMessagesComponent.prototype.reactionName;
    /** @type {?} */
    CometchatMessagesComponent.prototype.messageToReact;
    /**
     * update status of message ie. read or deliv
     * \@param Any messages
     * @type {?}
     */
    CometchatMessagesComponent.prototype.updateMessages;
    /**
     * Delete the message
     * \@param Any message
     * @type {?}
     */
    CometchatMessagesComponent.prototype.deleteMessage;
    /**
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * \@param Any messages
     * @type {?}
     */
    CometchatMessagesComponent.prototype.removeMessages;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * \@param
     * @type {?}
     */
    CometchatMessagesComponent.prototype.groupUpdated;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZXMvY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEdBR1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZGLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUM7SUE0QkU7UUFBQSxpQkFBZ0I7UUFwQlAsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0IsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbEIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLGlCQUFZLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQUcsSUFBSSxDQUFDOzs7OztRQXVUdEIsbUJBQWM7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IE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IElOQ09NSU5HX01FU1NBR0VfU09VTkQgfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2F1ZGlvL2luY29taW5nTWVzc2FnZVNvdW5kXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZXNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlcy5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZChcIm1lc3NhZ2VXaW5kb3dcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGNoYXRXaW5kb3c6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBjb21wb3NlZHRocmVhZG1lc3NhZ2UgPSBudWxsO1xuICBASW5wdXQoKSBncm91cE1lc3NhZ2UgPSBudWxsO1xuICBASW5wdXQoKSBjYWxsTWVzc2FnZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWVzc2FnZUxpc3QgPSBbXTtcbiAgc2Nyb2xsVG9Cb3R0b206IHRydWU7XG4gIG1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgcmVwbHlQcmV2aWV3ID0gbnVsbDtcbiAgbGl2ZVJlYWN0aW9uID0gZmFsc2U7XG4gIGNoYW5nZU51bWJlciA9IDA7XG4gIHJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IGZhbHNlO1xuICBzY3JvbGxWYXJpYWJsZSA9IDA7XG5cbiAgcmVhY3Rpb25OYW1lID0gXCJoZWFydFwiO1xuICBtZXNzYWdlVG9SZWFjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJjb21wb3NlZHRocmVhZG1lc3NhZ2VcIl0pIHtcbiAgICAgIC8vIFRoZXJlIGlzIGEgdmFsaWQgVGhyZWFkIHBhcmVudCBtZXNzYWdlICwgdGhhbiB1cGRhdGUgaXQncyByZXBseSBjb3VudFxuICAgICAgaWYgKGNoYW5nZVtcImNvbXBvc2VkdGhyZWFkbWVzc2FnZVwiXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWRpdGVkKGNoYW5nZVtcImNvbXBvc2VkdGhyZWFkbWVzc2FnZVwiXS5jdXJyZW50VmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cE1lc3NhZ2VcIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJncm91cE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKGNoYW5nZVtcImdyb3VwTWVzc2FnZVwiXS5jdXJyZW50VmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gVGhlcmUgaXMgY2FsbCBkaXNwbGF5IHByb3BlciBjYWxsIG1lc3NhZ2VzXG4gICAgaWYgKGNoYW5nZVtcImNhbGxNZXNzYWdlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBjYWxsTWVzc2FnZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBjYWxsTWVzc2FnZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJjYWxsTWVzc2FnZVwiXSA9IGNoYW5nZVtcImNhbGxNZXNzYWdlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImNhbGxNZXNzYWdlXCJdID0gY2hhbmdlW1wiY2FsbE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAocHJldlByb3BzLmNhbGxNZXNzYWdlICE9PSBwcm9wcy5jYWxsTWVzc2FnZSAmJiBwcm9wcy5jYWxsTWVzc2FnZSkge1xuICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXIoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkNBTExfVVBEQVRFRCxcbiAgICAgICAgICBwYXlMb2FkOiBjaGFuZ2VbXCJjYWxsTWVzc2FnZVwiXS5jdXJyZW50VmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogVXBkYXRpbmcgdGhlIHJlcGx5IGNvdW50IG9mIFRocmVhZCBQYXJlbnQgTWVzc2FnZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHVwZGF0ZVJlcGx5Q291bnQobWVzc2FnZXMpIHtcbiAgICBjb25zdCByZWNlaXZlZE1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcblxuICAgIGxldCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleChcbiAgICAgIChtKSA9PiBtLmlkID09PSByZWNlaXZlZE1lc3NhZ2UucGFyZW50TWVzc2FnZUlkXG4gICAgKTtcbiAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0gbWVzc2FnZUxpc3RbbWVzc2FnZUtleV07XG4gICAgICBsZXQgcmVwbHlDb3VudCA9IG1lc3NhZ2VPYmoucmVwbHlDb3VudCA/IG1lc3NhZ2VPYmoucmVwbHlDb3VudCA6IDA7XG4gICAgICByZXBseUNvdW50ID0gcmVwbHlDb3VudCArIDE7XG4gICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwge1xuICAgICAgICByZXBseUNvdW50OiByZXBseUNvdW50LFxuICAgICAgfSk7XG5cbiAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZUxpc3RdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICAvL2hhbmRsZSBFdmVudHMvQWN0aW9ucyBnZW5lcmF0ZWQgZnJvbSBNZXNzYWdlSGVhZGVyICwgTWVzc2FnZUNvbXBvc2VyIGFuZCBNZXNzYWdlTGlzdCBIZXJlXG5cbiAgICAvLyBhY3Rpb24ucGF5TG9hZCBoYXMgdGhlIGFycmF5IG9mIG1lc3NhZ2VzIHRoYXQgaXMgcmVjZWl2ZWRcbiAgICBsZXQgbWVzc2FnZXMgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkU6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfUkVDRUlWRUQ6IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgICAvLyBJbXBsZW1lbnQgd2hpbGUgZG9pbmcgdGhlIHRocmVhZGVkIG1lc3NhZ2UgZmVhdHVyZVxuICAgICAgICAgIHRoaXMudXBkYXRlUmVwbHlDb3VudChtZXNzYWdlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU21hcnQgUmVwbHkgRmVhdHVyZVxuICAgICAgICAgIHRoaXMuc21hcnRSZXBseVByZXZpZXcobWVzc2FnZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gICAgICAgICAgfSwgMjUwMCk7XG5cbiAgICAgICAgICB0aGlzLmFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wbGF5IG1lc3NhZ2UgcmVjZWl2ZWQgYXVkaW9cbiAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0ZFVENIRUQ6IHtcbiAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuT0xERVJfTUVTU0FHRVNfRkVUQ0hFRDoge1xuICAgICAgICB0aGlzLnJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8vTm8gTmVlZCBmb3IgYmVsb3cgYWN0aW9ucyBpZiB0aGVyZSBpcyBub3RoaW5nIHRvIHByZXBlbmRcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PSAwKSBicmVhaztcblxuICAgICAgICBsZXQgcHJldlNjcm9sbEhlaWdodCA9IHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcblxuICAgICAgICB0aGlzLnByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cbiAgICAgICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtIHByZXZTY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgLy8gdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAgICAgLy8gICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBwcmV2U2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9KTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDoge1xuICAgICAgICB0aGlzLmFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0NPTVBPU0VELFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk5FV19DT05WRVJTQVRJT05fT1BFTkVEOiB7XG4gICAgICAgIHRoaXMucmVzZXRQYWdlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFEOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQsXG4gICAgICAgICAgcGF5TG9hZDogbWVzc2FnZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1VQREFURUQsXG4gICAgICAgICAgcGF5TG9hZDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfTUVTU0FHRToge1xuICAgICAgICB0aGlzLmRlbGV0ZU1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuRURJVF9NRVNTQUdFOiB7XG4gICAgICAgIHRoaXMuZWRpdE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElUOiB7XG4gICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BVURJT19DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5WSURFT19DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5WSUVXX0RFVEFJTDpcbiAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlNFTkRfUkVBQ1RJT046IHtcbiAgICAgICAgdGhpcy50b2dnbGVSZWFjdGlvbih0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlNIT1dfUkVBQ1RJT046IHtcbiAgICAgICAgdGhpcy5zaG93UmVhY3Rpb24obWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuU1RPUF9SRUFDVElPTjoge1xuICAgICAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMRUFSX01FU1NBR0VfVE9fQkVfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6IHtcbiAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9VUERBVEVEOlxuICAgICAgICB0aGlzLmdyb3VwVXBkYXRlZChkYXRhLm1lc3NhZ2UsIGRhdGEua2V5LCBkYXRhLmdyb3VwLCBkYXRhLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuUE9MTF9DUkVBVEVEOiB7XG4gICAgICAgIHRoaXMuYXBwZW5kUG9sbE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUE9MTF9BTlNXRVJFRDoge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvbGxNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNBTExfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLmNhbGxVcGRhdGVkKG1lc3NhZ2VzKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICBjYXNlIGVudW1zLk1FTlVfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5SRUFDVF9UT19NRVNTQUdFOlxuICAgICAgICB0aGlzLnJlYWN0VG9NZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1lc3NhZ2UgdG8gd2hpY2ggcmVhY3Rpb24gaGFzIHRvIGJlIHNldFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlYWN0VG9NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VUb1JlYWN0ID0gbWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgVGhlIGNvbXBvbmVudCB0byBpbml0aWFsIGNvbmRpdGlvbnNcbiAgICogQHBhcmFtXG4gICAqL1xuICByZXNldFBhZ2UoKSB7XG4gICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gICAgdGhpcy5yZXBseVByZXZpZXcgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBNZXNzYWdlcyBEaXJlY3RseSAsIGNveiBuZXcgY29udmVyc2F0aW9uIGlzIG9wZW5lZCAsIGhlbmNlIG5vIG5lZWQgdG8gcHJlcGVuZCBvciBhcHBlbmRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgc2V0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzXTtcblxuICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcmVwZW5kIEZldGNoZWQgTWVzc2FnZXNcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgcHJlcGVuZE1lc3NhZ2VzKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlcywgLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIE1lc3NhZ2VzIHRoYXQgYXJlIHNlbnRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgYXBwZW5kTWVzc2FnZShtZXNzYWdlcykge1xuICAgIGxldCBkdW1teSA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4uZHVtbXksIC4uLm1lc3NhZ2VzXTtcblxuICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgUG9sbCBNZXNzYWdlcyB0aGF0IGFyZSBzZW50XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGFwcGVuZFBvbGxNZXNzYWdlKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIFBvbGwgTWVzc2FnZXMgZGVwZW5kaW5nIG9uIGFuc3dlciBnaXZlbiBieSB1c2VyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHVwZGF0ZVBvbGxNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBtZXNzYWdlLnBvbGwuaWQ7XG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoKG0sIGspID0+IG0uaWQgPT09IG1lc3NhZ2VJZCk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YU9iaiA9IHtcbiAgICAgICAgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBtZXNzYWdlLnBvbGwgfSB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZU9iaiwgbWV0YWRhdGE6IG1ldGFkYXRhT2JqIH07XG5cbiAgICAgIC8vIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChuZXdNZXNzYWdlT2JqKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHN0YXR1cyBvZiBtZXNzYWdlIGllLiByZWFkIG9yIGRlbGl2XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgLy8gbGV0IGR1bW15ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG4gICAgLy90aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZSB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIGRlbGV0ZU1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XG4gICAgQ29tZXRDaGF0LmRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkKVxuICAgICAgLnRoZW4oKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMoW2RlbGV0ZWRNZXNzYWdlXSk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KChtKSA9PiBtLmlkID09PSBtZXNzYWdlLmlkKTtcblxuICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0RFTEVURSxcbiAgICAgICAgICAgIHBheUxvYWQ6IFtkZWxldGVkTWVzc2FnZV0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBkZWxldGUgZmFpbGVkIHdpdGggZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIFRoZSBtZXNzYWdlIHRvIGJlIGVkaXRlZCB0byBwYXNzIGl0IHRvIHRoZSBtZXNzYWdlIGNvbXBvc2VyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGVkaXRNZXNzYWdlKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG1lc3NhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBUaGUgTWVzc2FnZSBMaXN0IGFmdGVyIE1lc3NhZ2UgaGFzIGJlZW4gc3VjY2Vzc2Z1bGxseSBlZGl0ZWRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlRWRpdGVkKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuXG4gICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMobWVzc2FnZUxpc3QpO1xuXG4gICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfRURJVCxcbiAgICAgICAgICBwYXlMb2FkOiBbbmV3TWVzc2FnZU9ial0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgbWVzc2FnZSBnZXRzIGRlbGV0ZWQgc3VjY2Vzc2Z1bGwgLCByZW1vdmUgdGhlIGRlbGV0ZWQgbWVzc2FnZSBpbiBmcm9udGVuZCB1c2luZyB0aGlzIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHJlbW92ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgY29uc3QgZGVsZXRlZE1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICBjb25zdCBtZXNzYWdlbGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZWxpc3QuZmluZEluZGV4KFxuICAgICAgKG1lc3NhZ2UpID0+IG1lc3NhZ2UuaWQgPT09IGRlbGV0ZWRNZXNzYWdlLmlkXG4gICAgKTtcbiAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICBsZXQgbWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZWxpc3RbbWVzc2FnZUtleV0gfTtcbiAgICAgIGxldCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgZGVsZXRlZE1lc3NhZ2UpO1xuXG4gICAgICBtZXNzYWdlbGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICAvLyB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZUxpc3Q6IG1lc3NhZ2VsaXN0LCBzY3JvbGxUb0JvdHRvbTogZmFsc2UgfSk7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VsaXN0XTtcbiAgICB9XG4gIH07XG5cbiAgc21hcnRSZXBseVByZXZpZXcobWVzc2FnZXMpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbMF07XG5cbiAgICBpZiAobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IG1lc3NhZ2UubWV0YWRhdGE7XG4gICAgICBpZiAobWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJAaW5qZWN0ZWRcIikpIHtcbiAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtcIkBpbmplY3RlZFwiXTtcbiAgICAgICAgaWYgKGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtcImV4dGVuc2lvbnNcIl07XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbWFydC1yZXBseVwiKSkge1xuICAgICAgICAgICAgY29uc3Qgc21hcnRSZXBseSA9IGV4dGVuc2lvbnNPYmplY3RbXCJzbWFydC1yZXBseVwiXTtcbiAgICAgICAgICAgIGlmIChzbWFydFJlcGx5Lmhhc093blByb3BlcnR5KFwiZXJyb3JcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVwbHlQcmV2aWV3ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMsICh0aGlzLnJlcGx5UHJldmlldyA9IG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcblxuICAgIGNvbnN0IHRvcCA9IGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3AgPT09IDA7XG5cbiAgICBpZiAodG9wKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IHRvcDtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9XG4gICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgLy8gdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAvLyAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAvLyAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgUmVhY3Rpb24gLT4gdHJ1ZS9mYWxzZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHRvZ2dsZVJlYWN0aW9uKGZsYWcpIHtcbiAgICB0aGlzLmxpdmVSZWFjdGlvbiA9IGZsYWc7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgUmVhY3Rpb24gb24gcmVjZWl2aW5nIGVuZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNob3dSZWFjdGlvbihyZWFjdGlvbikge1xuICAgIGlmICghcmVhY3Rpb24uaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChyZWFjdGlvbi5tZXRhZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhcmVhY3Rpb24ubWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJ0eXBlXCIpIHx8XG4gICAgICAhcmVhY3Rpb24ubWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJyZWFjdGlvblwiKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWVudW1zLkxJVkVfUkVBQ1RJT05TLmhhc093blByb3BlcnR5KHJlYWN0aW9uLm1ldGFkYXRhLnJlYWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChyZWFjdGlvbi5tZXRhZGF0YS50eXBlID09PSBlbnVtcy5MSVZFX1JFQUNUSU9OX0tFWSkge1xuICAgICAgdGhpcy5yZWFjdGlvbk5hbWUgPSByZWFjdGlvbi5tZXRhZGF0YS5yZWFjdGlvbjtcbiAgICAgIHRoaXMubGl2ZVJlYWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjYWxsVXBkYXRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5hcHBlbmRNZXNzYWdlKFttZXNzYWdlXSk7XG4gIH1cblxuICAvKipcbiAgICogUGxheXMgQXVkaW8gV2hlbiBNZXNzYWdlIGlzIFNlbnRcbiAgICovXG4gIHBsYXlBdWRpbygpIHtcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICBhdWRpby5zcmMgPSBJTkNPTUlOR19NRVNTQUdFX1NPVU5EO1xuICAgIGF1ZGlvLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBBY3Rpb24gSW5kaWNhdGluZyB0aGF0IEdyb3VwIERhdGEgaGFzIGJlZW4gdXBkYXRlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgdGhpcy5hcHBlbmRNZXNzYWdlKFttZXNzYWdlXSk7XG5cbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkdST1VQX1VQREFURUQsXG4gICAgICBwYXlMb2FkOiB7IG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMgfSxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==