/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-thread/cometchat-message-thread/cometchat-message-thread.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatMessageThreadComponent = /** @class */ (function () {
    function CometchatMessageThreadComponent() {
        var _this = this;
        this.item = null;
        this.type = null;
        this.parentMessage = null;
        this.loggedInUser = null;
        this.actionGenerated = new EventEmitter();
        this.messageList = [];
        this.replyCount = 0;
        this.reachedTopOfConversation = false;
        this.scrollVariable = 0;
        this.messageToBeEdited = null;
        this.replyPreview = null;
        this.imageView = null;
        this.fullScreenViewImage = false;
        this.messageToReact = null;
        this.THREAD = STRING_MESSAGES.THREAD;
        /**
         * append Messages that are sent
         * @param Any messages
         */
        this.appendMessage = (/**
         * @param {?} messages
         * @return {?}
         */
        function (messages) {
            /** @type {?} */
            var dummy = tslib_1.__spread(_this.messageList);
            _this.messageList = tslib_1.__spread(dummy, messages);
            _this.scrollToBottomOfChatWindow();
        });
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
                _this.messageList = tslib_1.__spread(messagelist);
            }
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["parentMessage"]) {
            this.messageList = [];
            this.scrollToBottomOfChatWindow();
            if (change["parentMessage"].currentValue.hasOwnProperty("replyCount")) {
                this.replyCount = this.parentMessage.replyCount;
            }
            else {
                this.replyCount = 0;
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.parentMessage.hasOwnProperty("replyCount")) {
            this.replyCount = this.parentMessage.replyCount;
        }
        /** @type {?} */
        var user = CometChat.getLoggedinUser().then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
        }));
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
    CometchatMessageThreadComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var _this = this;
        /** @type {?} */
        var messages = action.payLoad;
        // console.log("MessageThread --> action generation is ", action);
        switch (action.type) {
            case enums.NEW_CONVERSATION_OPENED: {
                this.setMessages(messages);
                this.replyCount = messages.length;
                break;
            }
            case enums.THREAD_PARENT_MESSAGE_UPDATED: {
                // console.log("messageThread --> updating thread parent ");
                this.parentMessage = messages;
                break;
            }
            case enums.MESSAGE_COMPOSED: {
                this.appendMessage(messages);
                this.replyCount = this.replyCount + messages.length;
                this.actionGenerated.emit({
                    type: enums.CHANGE_THREAD_PARENT_MESSAGE_REPLY_COUNT,
                    payLoad: this.replyCount,
                });
                break;
            }
            case enums.MESSAGE_UPDATED: {
                this.updateMessages(messages);
                break;
            }
            case enums.CUSTOM_MESSAGE_RECEIVE:
            case enums.MESSAGE_RECEIVED: {
                /** @type {?} */
                var message = messages[0];
                if (message.parentMessageId === this.parentMessage.id) {
                    // const replyCount = this.state.replyCount + 1;
                    this.smartReplyPreview(messages);
                    this.replyCount = this.replyCount + messages.length;
                    this.appendMessage(messages);
                    this.actionGenerated.emit({
                        type: enums.CHANGE_THREAD_PARENT_MESSAGE_REPLY_COUNT,
                        payLoad: this.replyCount,
                    });
                }
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
                    _this.scrollVariable =
                        _this.chatWindow.nativeElement.scrollHeight - prevScrollHeight_1;
                }), 1);
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
            case enums.DELETE_MESSAGE: {
                this.deleteMessage(messages);
                break;
            }
            case enums.MESSAGE_DELETE:
                this.removeMessages(messages);
                break;
            case enums.VIEW_ACTUAL_IMAGE: {
                this.actionGenerated.emit({
                    type: enums.VIEW_ACTUAL_IMAGE,
                    payLoad: messages,
                });
                break;
            }
            case enums.CLOSE_FULL_SCREEN_IMAGE: {
                this.actionGenerated.emit({
                    type: enums.VIEW_ACTUAL_IMAGE,
                    payLoad: null,
                });
                break;
            }
            case enums.REACT_TO_MESSAGE:
                this.reactToMessage(messages);
                break;
        }
    };
    /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @param
     */
    /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.closeThread = /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_THREAD_CLICKED,
            payLoad: null,
        });
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
    CometchatMessageThreadComponent.prototype.setMessages = /**
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
    CometchatMessageThreadComponent.prototype.prependMessages = /**
     * prepend Fetched Messages
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        this.messageList = tslib_1.__spread(messages, this.messageList);
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
    CometchatMessageThreadComponent.prototype.editMessage = /**
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
    CometchatMessageThreadComponent.prototype.messageEdited = /**
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
    CometchatMessageThreadComponent.prototype.smartReplyPreview = /**
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
     * Opens the clicked Image in full screen mode
     * @param Any message
     */
    /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.toggleImageView = /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.imageView = message;
        this.fullScreenViewImage = !this.fullScreenViewImage;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.handleScroll = /**
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
     * Sets the text for Reply Count
     * @param
     */
    /**
     * Sets the text for Reply Count
     * @param {?} replyCount
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.getReplyCountText = /**
     * Sets the text for Reply Count
     * @param {?} replyCount
     * @return {?}
     */
    function (replyCount) {
        if (replyCount === 1) {
            return replyCount + " reply";
        }
        else if (replyCount > 1) {
            return replyCount + " replies";
        }
    };
    /**
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.scrollToBottomOfChatWindow = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.scrollVariable =
                _this.chatWindow.nativeElement.scrollHeight -
                    _this.chatWindow.nativeElement.clientHeight;
        }), 1);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatMessageThreadComponent.prototype.reactToMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.messageToReact = message;
    };
    CometchatMessageThreadComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-message-thread",
                    template: "<div class=\"wrapperStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerWrapperStyle\">\n      <div class=\"headerDetailStyle\">\n        <h6 class=\"headerTitleStyle\">{{ THREAD }}</h6>\n        <span class=\"headerNameStyle\">{{ item.name }}</span>\n      </div>\n      <div class=\"headerCloseStyle\" (click)=\"closeThread()\"></div>\n    </div>\n  </div>\n\n  <div class=\"messageContainerStyle\">\n    <div class=\"parentMessageStyle\">\n      <div [ngSwitch]=\"parentMessage?.type\">\n        <!--CASE FOR STICKER -->\n        <div *ngSwitchCase=\"'extension_sticker'\">\n          <cometchat-sender-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-sticker-message-bubble>\n          <cometchat-receiver-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-sticker-message-bubble>\n        </div>\n        <!--CASE FOR STICKER ENDS -->\n\n        <!--CASE FOR POLL -->\n        <div *ngSwitchCase=\"'extension_poll'\">\n          <cometchat-sender-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-poll-message-bubble>\n          <cometchat-receiver-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [loggedInUserUid]=\"loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-poll-message-bubble>\n        </div>\n        <!--CASE FOR POLL ENDS -->\n\n        <!-- CASE FOR TEXT -->\n        <div *ngSwitchCase=\"'text'\">\n          <cometchat-receiver-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-text-message-bubble>\n\n          <cometchat-sender-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-text-message-bubble>\n        </div>\n        <!--CASE FOR TEXT ENDS -->\n\n        <!-- CASE FOR FILE -->\n        <div *ngSwitchCase=\"'file'\">\n          <cometchat-receiver-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-file-message-bubble>\n\n          <cometchat-sender-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-file-message-bubble>\n        </div>\n        <!--CASE FOR FILE ENDS -->\n\n        <!-- CASE FOR IMAGE -->\n        <div *ngSwitchCase=\"'image'\">\n          <cometchat-receiver-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-image-message-bubble>\n\n          <cometchat-sender-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-image-message-bubble>\n        </div>\n        <!--CASE FOR IMAGE ENDS -->\n\n        <!-- CASE FOR VIDEO -->\n        <div *ngSwitchCase=\"'video'\">\n          <cometchat-receiver-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-video-message-bubble>\n\n          <cometchat-sender-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-video-message-bubble>\n        </div>\n        <!--CASE FOR VIDEO ENDS -->\n\n        <!-- CASE FOR AUDIO -->\n        <div *ngSwitchCase=\"'audio'\">\n          <cometchat-receiver-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-audio-message-bubble>\n\n          <cometchat-sender-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-audio-message-bubble>\n        </div>\n        <!--CASE FOR AUDIO ENDS -->\n      </div>\n    </div>\n\n    <div class=\"messageSeparatorStyle\">\n      <span class=\"messageReplyStyle\" *ngIf=\"replyCount > 0\">\n        {{ getReplyCountText(replyCount) }}</span\n      >\n      <hr />\n    </div>\n    <div\n      class=\"messageWindowStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #messageWindow\n      [scrollTop]=\"scrollVariable\"\n    >\n      <cometchat-message-list\n        [item]=\"item\"\n        [type]=\"type\"\n        [parentMessageId]=\"parentMessage?.id\"\n        [messages]=\"messageList\"\n        [reachedTopOfConversation]=\"reachedTopOfConversation\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-list>\n    </div>\n\n    <cometchat-message-composer\n      [item]=\"item\"\n      [type]=\"type\"\n      [parentMessageId]=\"parentMessage?.id\"\n      [replyPreview]=\"replyPreview\"\n      [messageToBeEdited]=\"messageToBeEdited\"\n      [messageToReact]=\"messageToReact\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-composer>\n  </div>\n</div>\n",
                    styles: ["*{font-family:Inter,sans-serif}.wrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.wrapperStyle *,.wrapperStyle>*{box-sizing:border-box}.wrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.wrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.wrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.wrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:10px;width:100%;background-color:#fff;border-bottom:1px solid #eaeaea}.headerWrapperStyle{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%}.headerDetailStyle{display:flex;flex-direction:column;width:calc(100% - 40px)}.headerTitleStyle{margin:0;font-size:15px;font-weight:600;line-height:22px;width:100%}.headerNameStyle{font-size:13px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.headerCloseStyle{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;width:24px;height:24px}.messageContainerStyle{display:flex;flex-direction:column;height:100%;overflow-x:hidden;overflow-y:auto;width:100%;z-index:100;min-height:calc(100% - 68px);order:2}.messageContainerStyle .chatListStyle{min-height:250px}.messageContainerStyle .chatListStyle .listWrapperStyle ::-webkit-scrollbar{display:none}.parentMessageStyle{justify-content:flex-end;padding:14px 16px;align-items:center}.parentMessageStyle .sender__message__container,.receiver__message__container{max-width:100%}.parentMessageStyle .replycount{display:none}.messageSeparatorStyle{display:flex;align-items:center;position:relative;margin:7px 16px;height:15px}.messageSeparatorStyle hr{flex:1;margin:1px 0 0;border-top:1px solid #eaeaea}.messageReplyStyle{margin-right:12px;font-size:12px}.messageWindowStyle{padding:20px;height:101vh;overflow:hidden;overflow-y:scroll}"]
                }] }
    ];
    /** @nocollapse */
    CometchatMessageThreadComponent.ctorParameters = function () { return []; };
    CometchatMessageThreadComponent.propDecorators = {
        chatWindow: [{ type: ViewChild, args: ["messageWindow", { static: false },] }],
        item: [{ type: Input }],
        type: [{ type: Input }],
        parentMessage: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatMessageThreadComponent;
}());
export { CometchatMessageThreadComponent };
if (false) {
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.chatWindow;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.item;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.type;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.parentMessage;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.messageList;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.replyCount;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.scrollVariable;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.replyPreview;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.imageView;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.messageToReact;
    /** @type {?} */
    CometchatMessageThreadComponent.prototype.THREAD;
    /**
     * append Messages that are sent
     * \@param Any messages
     * @type {?}
     */
    CometchatMessageThreadComponent.prototype.appendMessage;
    /**
     * update status of message ie. read or deliv
     * \@param Any messages
     * @type {?}
     */
    CometchatMessageThreadComponent.prototype.updateMessages;
    /**
     * Delete the message
     * \@param Any message
     * @type {?}
     */
    CometchatMessageThreadComponent.prototype.deleteMessage;
    /**
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * \@param Any messages
     * @type {?}
     */
    CometchatMessageThreadComponent.prototype.removeMessages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQvY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEdBR1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBMEJFO1FBQUEsaUJBQWdCO1FBbEJQLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFckMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsV0FBTSxHQUFXLGVBQWUsQ0FB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Q0FBQzs7Z0JBMVZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQywwa1FBQXdEOztpQkFFekQ7Ozs7OzZCQUVFLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQUU1QyxLQUFLO3VCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07O0lBK1VULHNDQUFDO0NBQUEsQUEzVkQsSUEyVkM7U0F0VlksK0JBQStCOzs7SUFDMUMscURBQXNFOztJQUV0RSwrQ0FBcUI7O0lBQ3JCLCtDQUFxQjs7SUFDckIsd0RBQThCOztJQUM5Qix1REFBNkI7O0lBQzdCLDBEQUFrRTs7SUFFbEUsc0RBQWlCOztJQUNqQixxREFBdUI7O0lBQ3ZCLG1FQUFpQzs7SUFDakMseURBQW1COztJQUNuQiw0REFBeUI7O0lBQ3pCLHVEQUFvQjs7SUFDcEIsb0RBQWlCOztJQUNqQiw4REFBcUM7O0lBRXJDLHlEQUFzQjs7SUFDdEIsaURBQXdDOzs7Ozs7SUF5SnhDLHdEQU1FOzs7Ozs7SUFjRix5REFLRTs7Ozs7O0lBc0NGLHdEQW1CRTs7Ozs7O0lBTUYseURBY0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS10aHJlYWRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlVGhyZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKFwibWVzc2FnZVdpbmRvd1wiLCB7IHN0YXRpYzogZmFsc2UgfSkgY2hhdFdpbmRvdzogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIHBhcmVudE1lc3NhZ2UgPSBudWxsO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtZXNzYWdlTGlzdCA9IFtdO1xuICByZXBseUNvdW50OiBudW1iZXIgPSAwO1xuICByZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBmYWxzZTtcbiAgc2Nyb2xsVmFyaWFibGUgPSAwO1xuICBtZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gIHJlcGx5UHJldmlldyA9IG51bGw7XG4gIGltYWdlVmlldyA9IG51bGw7XG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlVG9SZWFjdCA9IG51bGw7XG4gIFRIUkVBRDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlRIUkVBRDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcInBhcmVudE1lc3NhZ2VcIl0pIHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgICAgIGlmIChjaGFuZ2VbXCJwYXJlbnRNZXNzYWdlXCJdLmN1cnJlbnRWYWx1ZS5oYXNPd25Qcm9wZXJ0eShcInJlcGx5Q291bnRcIikpIHtcbiAgICAgICAgdGhpcy5yZXBseUNvdW50ID0gdGhpcy5wYXJlbnRNZXNzYWdlLnJlcGx5Q291bnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyZXBseUNvdW50XCIpKSB7XG4gICAgICB0aGlzLnJlcGx5Q291bnQgPSB0aGlzLnBhcmVudE1lc3NhZ2UucmVwbHlDb3VudDtcbiAgICB9XG5cbiAgICBsZXQgdXNlciA9IENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IG1lc3NhZ2VzID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk1lc3NhZ2VUaHJlYWQgLS0+IGFjdGlvbiBnZW5lcmF0aW9uIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5ORVdfQ09OVkVSU0FUSU9OX09QRU5FRDoge1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgdGhpcy5yZXBseUNvdW50ID0gbWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJtZXNzYWdlVGhyZWFkIC0tPiB1cGRhdGluZyB0aHJlYWQgcGFyZW50IFwiKTtcbiAgICAgICAgdGhpcy5wYXJlbnRNZXNzYWdlID0gbWVzc2FnZXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0NPTVBPU0VEOiB7XG4gICAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucmVwbHlDb3VudCArIG1lc3NhZ2VzLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5ULFxuICAgICAgICAgIHBheUxvYWQ6IHRoaXMucmVwbHlDb3VudCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkU6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfUkVDRUlWRUQ6IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXJlbnRNZXNzYWdlSWQgPT09IHRoaXMucGFyZW50TWVzc2FnZS5pZCkge1xuICAgICAgICAgIC8vIGNvbnN0IHJlcGx5Q291bnQgPSB0aGlzLnN0YXRlLnJlcGx5Q291bnQgKyAxO1xuICAgICAgICAgIHRoaXMuc21hcnRSZXBseVByZXZpZXcobWVzc2FnZXMpO1xuICAgICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucmVwbHlDb3VudCArIG1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLmFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuQ0hBTkdFX1RIUkVBRF9QQVJFTlRfTUVTU0FHRV9SRVBMWV9DT1VOVCxcbiAgICAgICAgICAgIHBheUxvYWQ6IHRoaXMucmVwbHlDb3VudCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuT0xERVJfTUVTU0FHRVNfRkVUQ0hFRDoge1xuICAgICAgICB0aGlzLnJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8vTm8gTmVlZCBmb3IgYmVsb3cgYWN0aW9ucyBpZiB0aGVyZSBpcyBub3RoaW5nIHRvIHByZXBlbmRcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PSAwKSBicmVhaztcblxuICAgICAgICBsZXQgcHJldlNjcm9sbEhlaWdodCA9IHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcblxuICAgICAgICB0aGlzLnByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBwcmV2U2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9LCAxKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuRURJVF9NRVNTQUdFOiB7XG4gICAgICAgIHRoaXMuZWRpdE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElUOiB7XG4gICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfTUVTU0FHRToge1xuICAgICAgICB0aGlzLmRlbGV0ZU1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICAgICAgcGF5TG9hZDogbWVzc2FnZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5SRUFDVF9UT19NRVNTQUdFOlxuICAgICAgICB0aGlzLnJlYWN0VG9NZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjdGlvbiBpcyBHZW5lcmF0ZWQgdG8gaW5mb3JtIFVzZXJMaXN0U2NyZWVuIHRvIGNsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VUaHJlYWQoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5DTE9TRV9USFJFQURfQ0xJQ0tFRCxcbiAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0IE1lc3NhZ2VzIERpcmVjdGx5ICwgY296IG5ldyBjb252ZXJzYXRpb24gaXMgb3BlbmVkICwgaGVuY2Ugbm8gbmVlZCB0byBwcmVwZW5kIG9yIGFwcGVuZFxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBzZXRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXNdO1xuXG4gICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCBNZXNzYWdlcyB0aGF0IGFyZSBzZW50XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGFwcGVuZE1lc3NhZ2UgPSAobWVzc2FnZXMpID0+IHtcbiAgICBsZXQgZHVtbXkgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLmR1bW15LCAuLi5tZXNzYWdlc107XG5cbiAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHByZXBlbmQgRmV0Y2hlZCBNZXNzYWdlc1xuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBwcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzLCAuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgc3RhdHVzIG9mIG1lc3NhZ2UgaWUuIHJlYWQgb3IgZGVsaXZcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgdXBkYXRlTWVzc2FnZXMgPSAobWVzc2FnZXMpID0+IHtcbiAgICAvLyBsZXQgZHVtbXkgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzXTtcbiAgICAvL3RoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBUaGUgbWVzc2FnZSB0byBiZSBlZGl0ZWQgdG8gcGFzcyBpdCB0byB0aGUgbWVzc2FnZSBjb21wb3NlclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBlZGl0TWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZVRvQmVFZGl0ZWQgPSBtZXNzYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgVGhlIE1lc3NhZ2UgTGlzdCBhZnRlciBNZXNzYWdlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxsbHkgZWRpdGVkXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZUVkaXRlZChtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoKG0pID0+IG0uaWQgPT09IG1lc3NhZ2UuaWQpO1xuICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSBtZXNzYWdlTGlzdFttZXNzYWdlS2V5XTtcblxuICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIG1lc3NhZ2UpO1xuXG4gICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VMaXN0KTtcblxuICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCAtIG1lc3NhZ2VLZXkgPT09IDEgJiYgIW1lc3NhZ2UucmVwbHlDb3VudCkge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0VESVQsXG4gICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VPYmpdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgZGVsZXRlTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gbWVzc2FnZS5pZDtcbiAgICBDb21ldENoYXQuZGVsZXRlTWVzc2FnZShtZXNzYWdlSWQpXG4gICAgICAudGhlbigoZGVsZXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlcyhbZGVsZXRlZE1lc3NhZ2VdKTtcblxuICAgICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoKG0pID0+IG0uaWQgPT09IG1lc3NhZ2UuaWQpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGlzdC5sZW5ndGggLSBtZXNzYWdlS2V5ID09PSAxICYmICFtZXNzYWdlLnJlcGx5Q291bnQpIHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfREVMRVRFLFxuICAgICAgICAgICAgcGF5TG9hZDogW2RlbGV0ZWRNZXNzYWdlXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIGRlbGV0ZSBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElmIHRoZSBtZXNzYWdlIGdldHMgZGVsZXRlZCBzdWNjZXNzZnVsbCAsIHJlbW92ZSB0aGUgZGVsZXRlZCBtZXNzYWdlIGluIGZyb250ZW5kIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgcmVtb3ZlTWVzc2FnZXMgPSAobWVzc2FnZXMpID0+IHtcbiAgICBjb25zdCBkZWxldGVkTWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuICAgIGNvbnN0IG1lc3NhZ2VsaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlbGlzdC5maW5kSW5kZXgoXG4gICAgICAobWVzc2FnZSkgPT4gbWVzc2FnZS5pZCA9PT0gZGVsZXRlZE1lc3NhZ2UuaWRcbiAgICApO1xuICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgIGxldCBtZXNzYWdlT2JqID0geyAuLi5tZXNzYWdlbGlzdFttZXNzYWdlS2V5XSB9O1xuICAgICAgbGV0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCBkZWxldGVkTWVzc2FnZSk7XG5cbiAgICAgIG1lc3NhZ2VsaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZWxpc3RdO1xuICAgIH1cbiAgfTtcblxuICBzbWFydFJlcGx5UHJldmlldyhtZXNzYWdlcykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcblxuICAgIGlmIChtZXNzYWdlLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gbWVzc2FnZS5tZXRhZGF0YTtcbiAgICAgIGlmIChtZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShcIkBpbmplY3RlZFwiKSkge1xuICAgICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgICAgICBpZiAoaW5qZWN0ZWRPYmplY3QuaGFzT3duUHJvcGVydHkoXCJleHRlbnNpb25zXCIpKSB7XG4gICAgICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W1wiZXh0ZW5zaW9uc1wiXTtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNtYXJ0LXJlcGx5XCIpKSB7XG4gICAgICAgICAgICBjb25zdCBzbWFydFJlcGx5ID0gZXh0ZW5zaW9uc09iamVjdFtcInNtYXJ0LXJlcGx5XCJdO1xuICAgICAgICAgICAgaWYgKHNtYXJ0UmVwbHkuaGFzT3duUHJvcGVydHkoXCJlcnJvclwiKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZXBseVByZXZpZXcgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcywgKHRoaXMucmVwbHlQcmV2aWV3ID0gbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVJbWFnZVZpZXcobWVzc2FnZSkge1xuICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICB0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2UgPSAhdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlO1xuICB9XG5cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuXG4gICAgY29uc3QgdG9wID0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCA9PT0gMDtcblxuICAgIGlmICh0b3ApIHtcbiAgICAgIHRoaXMucmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gdG9wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGZvciBSZXBseSBDb3VudFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldFJlcGx5Q291bnRUZXh0KHJlcGx5Q291bnQpIHtcbiAgICBpZiAocmVwbHlDb3VudCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHJlcGx5Q291bnQgKyBcIiByZXBseVwiO1xuICAgIH0gZWxzZSBpZiAocmVwbHlDb3VudCA+IDEpIHtcbiAgICAgIHJldHVybiByZXBseUNvdW50ICsgXCIgcmVwbGllc1wiO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHJlYWN0VG9NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VUb1JlYWN0ID0gbWVzc2FnZTtcbiAgfVxufVxuIl19