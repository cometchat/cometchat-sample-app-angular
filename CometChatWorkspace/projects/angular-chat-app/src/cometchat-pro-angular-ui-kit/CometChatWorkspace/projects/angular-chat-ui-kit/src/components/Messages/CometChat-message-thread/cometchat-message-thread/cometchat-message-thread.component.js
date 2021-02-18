/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-message-thread/cometchat-message-thread/cometchat-message-thread.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatMessageThreadComponent {
    constructor() {
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
        this.typeOfMessage = "";
        this.messageToReact = null;
        this.THREAD = COMETCHAT_CONSTANTS.THREAD;
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
        /**
         * append Messages that are sent
         * @param Any messages
         */
        this.appendMessage = (/**
         * @param {?} messages
         * @return {?}
         */
        (messages) => {
            try {
                /** @type {?} */
                let dummy = [...this.messageList];
                this.messageList = [...dummy, ...messages];
                this.scrollToBottomOfChatWindow();
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * update status of message ie. read or deliv
         * @param Any messages
         */
        this.updateMessages = (/**
         * @param {?} messages
         * @return {?}
         */
        (messages) => {
            try {
                this.messageList = [...messages];
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Delete the message
         * @param Any message
         */
        this.deleteMessage = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            try {
                /** @type {?} */
                const messageId = message.id;
                CometChat.deleteMessage(messageId)
                    .then((/**
                 * @param {?} deletedMessage
                 * @return {?}
                 */
                (deletedMessage) => {
                    this.removeMessages([deletedMessage]);
                    /** @type {?} */
                    const messageList = [...this.messageList];
                    /** @type {?} */
                    let messageKey = messageList.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    (m) => m.id === message.id));
                    if (messageList.length - messageKey === 1 && !message.replyCount) {
                        this.actionGenerated.emit({
                            type: enums.MESSAGE_DELETE,
                            payLoad: [deletedMessage],
                        });
                    }
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("Message delete failed with error:", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * If the message gets deleted successfull , remove the deleted message in frontend using this function
         * @param Any messages
         */
        this.removeMessages = (/**
         * @param {?} messages
         * @return {?}
         */
        (messages) => {
            try {
                /** @type {?} */
                const deletedMessage = messages[0];
                /** @type {?} */
                const messagelist = [...this.messageList];
                /** @type {?} */
                let messageKey = messagelist.findIndex((/**
                 * @param {?} message
                 * @return {?}
                 */
                (message) => message.id === deletedMessage.id));
                if (messageKey > -1) {
                    /** @type {?} */
                    let messageObj = Object.assign({}, messagelist[messageKey]);
                    /** @type {?} */
                    let newMessageObj = Object.assign({}, messageObj, deletedMessage);
                    messagelist.splice(messageKey, 1, newMessageObj);
                    this.messageList = [...messagelist];
                }
            }
            catch (error) {
                logger(error);
            }
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.PARENT_MESSAGE]) {
                if (change[enums.PARENT_MESSAGE].previousValue &&
                    change[enums.PARENT_MESSAGE].previousValue.id !==
                        change[enums.PARENT_MESSAGE].currentValue.id) {
                    /** @type {?} */
                    let type = change[enums.PARENT_MESSAGE].currentValue.type;
                    this.typeOfMessage = "";
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.typeOfMessage = type;
                    }), 200);
                    this.messageList = [];
                }
                this.scrollToBottomOfChatWindow();
                if (change[enums.PARENT_MESSAGE].currentValue.hasOwnProperty(enums.REPLY_COUNT)) {
                    this.replyCount = this.parentMessage.replyCount;
                }
                else {
                    this.replyCount = 0;
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
            this.typeOfMessage = this.parentMessage.type;
            if (this.parentMessage.hasOwnProperty(enums.REPLY_COUNT)) {
                this.replyCount = this.parentMessage.replyCount;
            }
            /** @type {?} */
            let user = CometChat.getLoggedinUser().then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.loggedInUser = user;
            }));
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
            /** @type {?} */
            let messages = action.payLoad;
            switch (action.type) {
                case enums.NEW_CONVERSATION_OPENED: {
                    this.setMessages(messages);
                    this.replyCount = messages.length;
                    break;
                }
                case enums.THREAD_PARENT_MESSAGE_UPDATED: {
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
                    const message = messages[0];
                    if (message.parentMessageId === this.parentMessage.id) {
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
                    let prevScrollHeight = this.chatWindow.nativeElement.scrollHeight;
                    this.prependMessages(messages);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.scrollVariable =
                            this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @return {?}
     */
    closeThread() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_THREAD_CLICKED,
                payLoad: null,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param {?} messages
     * @return {?}
     */
    setMessages(messages) {
        try {
            this.messageList = [...messages];
            this.scrollToBottomOfChatWindow();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * prepend Fetched Messages
     * @param {?} messages
     * @return {?}
     */
    prependMessages(messages) {
        try {
            this.messageList = [...messages, ...this.messageList];
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets The message to be edited to pass it to the message composer
     * @param {?} messages
     * @return {?}
     */
    editMessage(messages) {
        try {
            this.messageToBeEdited = messages;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Render The Message List after Message has been successfullly edited
     * @param {?} message
     * @return {?}
     */
    messageEdited(message) {
        try {
            /** @type {?} */
            const messageList = [...this.messageList];
            /** @type {?} */
            let messageKey = messageList.findIndex((/**
             * @param {?} m
             * @return {?}
             */
            (m) => m.id === message.id));
            if (messageKey > -1) {
                /** @type {?} */
                const messageObj = messageList[messageKey];
                /** @type {?} */
                const newMessageObj = Object.assign({}, messageObj, message);
                messageList.splice(messageKey, 1, newMessageObj);
                this.updateMessages(messageList);
                if (messageList.length - messageKey === 1 && !message.replyCount) {
                    this.actionGenerated.emit({
                        type: enums.MESSAGE_EDIT,
                        payLoad: [newMessageObj],
                    });
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Checks smartReplyPreview Extension
     * @param {?} messages
     * @return {?}
     */
    smartReplyPreview(messages) {
        try {
            /** @type {?} */
            const message = messages[0];
            if (message.hasOwnProperty(enums.METADATA)) {
                /** @type {?} */
                const metadata = message[enums.METADATA];
                if (metadata.hasOwnProperty(enums.INJECTED)) {
                    /** @type {?} */
                    const injectedObject = metadata[enums.INJECTED];
                    if (injectedObject.hasOwnProperty(enums.EXTENSIONS)) {
                        /** @type {?} */
                        const extensionsObject = injectedObject[enums.EXTENSIONS];
                        if (extensionsObject.hasOwnProperty(enums.SMART_REPLY)) {
                            /** @type {?} */
                            const smartReply = extensionsObject[enums.SMART_REPLY];
                            if (smartReply.hasOwnProperty(enums.ERROR) === false) {
                                this.replyPreview = message;
                            }
                            else {
                                this, (this.replyPreview = null);
                            }
                        }
                    }
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    toggleImageView(message) {
        try {
            this.imageView = message;
            this.fullScreenViewImage = !this.fullScreenViewImage;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles Scroll of window
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
                Math.round(e.currentTarget.clientHeight);
            /** @type {?} */
            const top = e.currentTarget.scrollTop === 0;
            if (top) {
                this.reachedTopOfConversation = top;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets the text for Reply Count
     * @param {?} replyCount
     * @return {?}
     */
    getReplyCountText(replyCount) {
        try {
            if (replyCount === 1) {
                return replyCount + " " + COMETCHAT_CONSTANTS.REPLY;
            }
            else if (replyCount > 1) {
                return replyCount + " " + COMETCHAT_CONSTANTS.REPLIES;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Scrolls to bottom of chat window
     * @return {?}
     */
    scrollToBottomOfChatWindow() {
        try {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.scrollVariable =
                    this.chatWindow.nativeElement.scrollHeight -
                        this.chatWindow.nativeElement.clientHeight;
            }), 1);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets reaction to message
     * @param {?} message
     * @return {?}
     */
    reactToMessage(message) {
        try {
            this.messageToReact = message;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessageThreadComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-thread",
                template: "<div class=\"wrapperStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerWrapperStyle\">\n      <div class=\"headerDetailStyle\">\n        <h6 class=\"headerTitleStyle\">{{ THREAD }}</h6>\n        <span class=\"headerNameStyle\">{{ item.name }}</span>\n      </div>\n      <div class=\"headerCloseStyle\" (click)=\"closeThread()\"></div>\n    </div>\n  </div>\n\n  <div class=\"messageContainerStyle\">\n    <div class=\"parentMessageStyle\">\n      <div [ngSwitch]=\"typeOfMessage\">\n        <!--CASE FOR STICKER -->\n        <div *ngSwitchCase=\"'extension_sticker'\">\n          <cometchat-sender-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-sticker-message-bubble>\n          <cometchat-receiver-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-sticker-message-bubble>\n        </div>\n        <!--CASE FOR STICKER ENDS -->\n\n        <!--CASE FOR POLL -->\n        <div *ngSwitchCase=\"'extension_poll'\">\n          <cometchat-sender-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-poll-message-bubble>\n          <cometchat-receiver-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [loggedInUserUid]=\"loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-poll-message-bubble>\n        </div>\n        <!--CASE FOR POLL ENDS -->\n\n        <!-- CASE FOR TEXT -->\n        <div *ngSwitchCase=\"MESSAGE_TYPE_TEXT\">\n          <cometchat-receiver-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-text-message-bubble>\n\n          <cometchat-sender-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-text-message-bubble>\n        </div>\n        <!--CASE FOR TEXT ENDS -->\n\n        <!-- CASE FOR FILE -->\n        <div *ngSwitchCase=\"MESSAGE_TYPE_FILE\">\n          <cometchat-receiver-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-file-message-bubble>\n\n          <cometchat-sender-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-file-message-bubble>\n        </div>\n        <!--CASE FOR FILE ENDS -->\n\n        <!-- CASE FOR IMAGE -->\n        <div *ngSwitchCase=\"MESSAGE_TYPE_IMAGE\">\n          <cometchat-receiver-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-image-message-bubble>\n\n          <cometchat-sender-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-image-message-bubble>\n        </div>\n        <!--CASE FOR IMAGE ENDS -->\n\n        <!-- CASE FOR VIDEO -->\n        <div *ngSwitchCase=\"MESSAGE_TYPE_VIDEO\">\n          <cometchat-receiver-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-video-message-bubble>\n\n          <cometchat-sender-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-video-message-bubble>\n        </div>\n        <!--CASE FOR VIDEO ENDS -->\n\n        <!-- CASE FOR AUDIO -->\n        <div *ngSwitchCase=\"MESSAGE_TYPE_AUDIO\">\n          <cometchat-receiver-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-audio-message-bubble>\n\n          <cometchat-sender-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [messageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-audio-message-bubble>\n        </div>\n        <!--CASE FOR AUDIO ENDS -->\n      </div>\n    </div>\n\n    <div class=\"messageSeparatorStyle\">\n      <span class=\"messageReplyStyle\" *ngIf=\"replyCount > 0\">\n        {{ getReplyCountText(replyCount) }}</span\n      >\n      <hr />\n    </div>\n    <div\n      class=\"messageWindowStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #messageWindow\n      [scrollTop]=\"scrollVariable\"\n    >\n      <cometchat-message-list\n        [item]=\"item\"\n        [type]=\"type\"\n        [parentMessageId]=\"parentMessage?.id\"\n        [messages]=\"messageList\"\n        [reachedTopOfConversation]=\"reachedTopOfConversation\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-list>\n    </div>\n\n    <cometchat-message-composer\n      [item]=\"item\"\n      [type]=\"type\"\n      [parentMessageId]=\"parentMessage?.id\"\n      [replyPreview]=\"replyPreview\"\n      [messageToBeEdited]=\"messageToBeEdited\"\n      [messageToReact]=\"messageToReact\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-composer>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.wrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.wrapperStyle *,.wrapperStyle>*{box-sizing:border-box}.wrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.wrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.wrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.wrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:10px;width:100%;background-color:#fff;border-bottom:1px solid #eaeaea}.headerWrapperStyle{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%}.headerDetailStyle{display:flex;flex-direction:column;width:calc(100% - 40px)}.headerTitleStyle{margin:0;font-size:15px;font-weight:600;line-height:22px;width:100%}.headerNameStyle{font-size:13px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.headerCloseStyle{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;width:24px;height:24px}.messageContainerStyle{display:flex;flex-direction:column;height:100%;overflow-x:hidden;overflow-y:auto;width:100%;z-index:100;min-height:calc(100% - 68px);order:2}.messageContainerStyle .chatListStyle{min-height:250px}.messageContainerStyle .chatListStyle .listWrapperStyle ::-webkit-scrollbar{display:none}.parentMessageStyle{justify-content:flex-end;padding:14px 16px;align-items:center}.parentMessageStyle .sender__message__container,.receiver__message__container{max-width:100%}.parentMessageStyle .replycount{display:none}.messageSeparatorStyle{display:flex;align-items:center;position:relative;margin:7px 16px;height:15px}.messageSeparatorStyle hr{flex:1;margin:1px 0 0;border-top:1px solid #eaeaea}.messageReplyStyle{margin-right:12px;font-size:12px}.messageWindowStyle{padding:20px;min-height:250px;height:101vh;overflow:hidden;overflow-y:scroll}"]
            }] }
];
/** @nocollapse */
CometChatMessageThreadComponent.ctorParameters = () => [];
CometChatMessageThreadComponent.propDecorators = {
    chatWindow: [{ type: ViewChild, args: ["messageWindow", { static: false },] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    parentMessage: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.chatWindow;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.item;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.type;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.parentMessage;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.messageList;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.replyCount;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.scrollVariable;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.replyPreview;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.imageView;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.typeOfMessage;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.messageToReact;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.THREAD;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_TEXT;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_IMAGE;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_VIDEO;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_AUDIO;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_FILE;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.MESSAGE_TYPE_CUSTOM;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.CALL_TYPE_AUDIO;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.CALL_TYPE_VIDEO;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.CATEGORY_MESSAGE;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.CATEGORY_ACTION;
    /** @type {?} */
    CometChatMessageThreadComponent.prototype.CATEGORY_CALL;
    /**
     * append Messages that are sent
     * \@param Any messages
     * @type {?}
     */
    CometChatMessageThreadComponent.prototype.appendMessage;
    /**
     * update status of message ie. read or deliv
     * \@param Any messages
     * @type {?}
     */
    CometChatMessageThreadComponent.prototype.updateMessages;
    /**
     * Delete the message
     * \@param Any message
     * @type {?}
     */
    CometChatMessageThreadComponent.prototype.deleteMessage;
    /**
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * \@param Any messages
     * @type {?}
     */
    CometChatMessageThreadComponent.prototype.removeMessages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1tZXNzYWdlLXRocmVhZC9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQvY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsR0FHWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPbEQsTUFBTSxPQUFPLCtCQUErQjtJQWtDMUM7UUEvQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztR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REFBaUI7O0lBQ2pCLDhEQUFxQzs7SUFDckMsd0RBQTJCOztJQUUzQix5REFBc0I7O0lBQ3RCLGlEQUE0Qzs7SUFFNUMsNERBQXdEOztJQUN4RCw2REFBMEQ7O0lBQzFELDZEQUEwRDs7SUFDMUQsNkRBQTBEOztJQUMxRCw0REFBd0Q7O0lBQ3hELDhEQUE0RDs7SUFDNUQsMERBQW9EOztJQUNwRCwwREFBb0Q7O0lBQ3BELDJEQUFzRDs7SUFDdEQsMERBQW9EOztJQUNwRCx3REFBZ0Q7Ozs7OztJQThMaEQsd0RBVUU7Ozs7OztJQWtCRix5REFNRTs7Ozs7O0lBOENGLHdEQXVCRTs7Ozs7O0lBTUYseURBa0JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdE1lc3NhZ2VUaHJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoXCJtZXNzYWdlV2luZG93XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBjaGF0V2luZG93OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgcGFyZW50TWVzc2FnZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VMaXN0ID0gW107XG4gIHJlcGx5Q291bnQ6IG51bWJlciA9IDA7XG4gIHJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IGZhbHNlO1xuICBzY3JvbGxWYXJpYWJsZSA9IDA7XG4gIG1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgcmVwbHlQcmV2aWV3ID0gbnVsbDtcbiAgaW1hZ2VWaWV3ID0gbnVsbDtcbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICB0eXBlT2ZNZXNzYWdlOiBTdHJpbmcgPSBcIlwiO1xuXG4gIG1lc3NhZ2VUb1JlYWN0ID0gbnVsbDtcbiAgVEhSRUFEOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlRIUkVBRDtcblxuICBNRVNTQUdFX1RZUEVfVEVYVDogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5URVhUO1xuICBNRVNTQUdFX1RZUEVfSU1BR0U6IFN0cmluZyA9IENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuSU1BR0U7XG4gIE1FU1NBR0VfVFlQRV9WSURFTzogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5WSURFTztcbiAgTUVTU0FHRV9UWVBFX0FVRElPOiBTdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkFVRElPO1xuICBNRVNTQUdFX1RZUEVfRklMRTogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5GSUxFO1xuICBNRVNTQUdFX1RZUEVfQ1VTVE9NOiBTdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkNVU1RPTTtcbiAgQ0FMTF9UWVBFX0FVRElPOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPO1xuICBDQUxMX1RZUEVfVklERU86IFN0cmluZyA9IENvbWV0Q2hhdC5DQUxMX1RZUEUuVklERU87XG4gIENBVEVHT1JZX01FU1NBR0U6IFN0cmluZyA9IENvbWV0Q2hhdC5DQVRFR09SWV9NRVNTQUdFO1xuICBDQVRFR09SWV9BQ1RJT046IFN0cmluZyA9IENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT047XG4gIENBVEVHT1JZX0NBTEw6IFN0cmluZyA9IENvbWV0Q2hhdC5DQVRFR09SWV9DQUxMO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5QQVJFTlRfTUVTU0FHRV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5QQVJFTlRfTUVTU0FHRV0ucHJldmlvdXNWYWx1ZSAmJlxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5QQVJFTlRfTUVTU0FHRV0ucHJldmlvdXNWYWx1ZS5pZCAhPT1cbiAgICAgICAgICAgIGNoYW5nZVtlbnVtcy5QQVJFTlRfTUVTU0FHRV0uY3VycmVudFZhbHVlLmlkXG4gICAgICAgICkge1xuICAgICAgICAgIGxldCB0eXBlID0gY2hhbmdlW2VudW1zLlBBUkVOVF9NRVNTQUdFXS5jdXJyZW50VmFsdWUudHlwZTtcblxuICAgICAgICAgIHRoaXMudHlwZU9mTWVzc2FnZSA9IFwiXCI7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHlwZU9mTWVzc2FnZSA9IHR5cGU7XG4gICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5QQVJFTlRfTUVTU0FHRV0uY3VycmVudFZhbHVlLmhhc093blByb3BlcnR5KFxuICAgICAgICAgICAgZW51bXMuUkVQTFlfQ09VTlRcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucGFyZW50TWVzc2FnZS5yZXBseUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbHlDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50eXBlT2ZNZXNzYWdlID0gdGhpcy5wYXJlbnRNZXNzYWdlLnR5cGU7XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuUkVQTFlfQ09VTlQpKSB7XG4gICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucGFyZW50TWVzc2FnZS5yZXBseUNvdW50O1xuICAgICAgfVxuXG4gICAgICBsZXQgdXNlciA9IENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2VzID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5ORVdfQ09OVkVSU0FUSU9OX09QRU5FRDoge1xuICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICAgIHRoaXMucmVwbHlDb3VudCA9IG1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRNZXNzYWdlID0gbWVzc2FnZXM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0NPTVBPU0VEOiB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSB0aGlzLnJlcGx5Q291bnQgKyBtZXNzYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQsXG4gICAgICAgICAgICBwYXlMb2FkOiB0aGlzLnJlcGx5Q291bnQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRTpcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1JFQ0VJVkVEOiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuICAgICAgICAgIGlmIChtZXNzYWdlLnBhcmVudE1lc3NhZ2VJZCA9PT0gdGhpcy5wYXJlbnRNZXNzYWdlLmlkKSB7XG4gICAgICAgICAgICB0aGlzLnNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucmVwbHlDb3VudCArIG1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuQ0hBTkdFX1RIUkVBRF9QQVJFTlRfTUVTU0FHRV9SRVBMWV9DT1VOVCxcbiAgICAgICAgICAgICAgcGF5TG9hZDogdGhpcy5yZXBseUNvdW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuT0xERVJfTUVTU0FHRVNfRkVUQ0hFRDoge1xuICAgICAgICAgIHRoaXMucmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAvL05vIE5lZWQgZm9yIGJlbG93IGFjdGlvbnMgaWYgdGhlcmUgaXMgbm90aGluZyB0byBwcmVwZW5kXG4gICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PSAwKSBicmVhaztcblxuICAgICAgICAgIGxldCBwcmV2U2Nyb2xsSGVpZ2h0ID0gdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZhcmlhYmxlID1cbiAgICAgICAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gcHJldlNjcm9sbEhlaWdodDtcbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuRURJVF9NRVNTQUdFOiB7XG4gICAgICAgICAgdGhpcy5lZGl0TWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVQ6IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQobWVzc2FnZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuREVMRVRFX01FU1NBR0U6IHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZU1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZXMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICAgICAgICBwYXlMb2FkOiBudWxsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuUkVBQ1RfVE9fTUVTU0FHRTpcbiAgICAgICAgICB0aGlzLnJlYWN0VG9NZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWN0aW9uIGlzIEdlbmVyYXRlZCB0byBpbmZvcm0gVXNlckxpc3RTY3JlZW4gdG8gY2xvc2UgdGhlIHRocmVhZCB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVRocmVhZCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VELFxuICAgICAgICBwYXlMb2FkOiBudWxsLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNldCBNZXNzYWdlcyBEaXJlY3RseSAsIGNveiBuZXcgY29udmVyc2F0aW9uIGlzIG9wZW5lZCAsIGhlbmNlIG5vIG5lZWQgdG8gcHJlcGVuZCBvciBhcHBlbmRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgc2V0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG5cbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIE1lc3NhZ2VzIHRoYXQgYXJlIHNlbnRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgYXBwZW5kTWVzc2FnZSA9IChtZXNzYWdlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZHVtbXkgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4uZHVtbXksIC4uLm1lc3NhZ2VzXTtcblxuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogcHJlcGVuZCBGZXRjaGVkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzLCAuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHN0YXR1cyBvZiBtZXNzYWdlIGllLiByZWFkIG9yIGRlbGl2XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXNdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBUaGUgbWVzc2FnZSB0byBiZSBlZGl0ZWQgdG8gcGFzcyBpdCB0byB0aGUgbWVzc2FnZSBjb21wb3NlclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBlZGl0TWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbWVzc2FnZXM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBUaGUgTWVzc2FnZSBMaXN0IGFmdGVyIE1lc3NhZ2UgaGFzIGJlZW4gc3VjY2Vzc2Z1bGxseSBlZGl0ZWRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlRWRpdGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG4gICAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSBtZXNzYWdlTGlzdFttZXNzYWdlS2V5XTtcblxuICAgICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgICAgbWVzc2FnZUxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VMaXN0KTtcblxuICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0VESVQsXG4gICAgICAgICAgICBwYXlMb2FkOiBbbmV3TWVzc2FnZU9ial0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgZGVsZXRlTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XG4gICAgICBDb21ldENoYXQuZGVsZXRlTWVzc2FnZShtZXNzYWdlSWQpXG4gICAgICAgIC50aGVuKChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMoW2RlbGV0ZWRNZXNzYWdlXSk7XG5cbiAgICAgICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IFtkZWxldGVkTWVzc2FnZV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJNZXNzYWdlIGRlbGV0ZSBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIElmIHRoZSBtZXNzYWdlIGdldHMgZGVsZXRlZCBzdWNjZXNzZnVsbCAsIHJlbW92ZSB0aGUgZGVsZXRlZCBtZXNzYWdlIGluIGZyb250ZW5kIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgcmVtb3ZlTWVzc2FnZXMgPSAobWVzc2FnZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZE1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VsaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VsaXN0LmZpbmRJbmRleChcbiAgICAgICAgKG1lc3NhZ2UpID0+IG1lc3NhZ2UuaWQgPT09IGRlbGV0ZWRNZXNzYWdlLmlkXG4gICAgICApO1xuICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICBsZXQgbWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZWxpc3RbbWVzc2FnZUtleV0gfTtcbiAgICAgICAgbGV0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCBkZWxldGVkTWVzc2FnZSk7XG5cbiAgICAgICAgbWVzc2FnZWxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VsaXN0XTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBzbWFydFJlcGx5UHJldmlldyBFeHRlbnNpb25cbiAgICogQHBhcmFtIG1lc3NhZ2VzXG4gICAqL1xuICBzbWFydFJlcGx5UHJldmlldyhtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbMF07XG5cbiAgICAgIGlmIChtZXNzYWdlLmhhc093blByb3BlcnR5KGVudW1zLk1FVEFEQVRBKSkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG1lc3NhZ2VbZW51bXMuTUVUQURBVEFdO1xuICAgICAgICBpZiAobWV0YWRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuSU5KRUNURUQpKSB7XG4gICAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtlbnVtcy5JTkpFQ1RFRF07XG4gICAgICAgICAgaWYgKGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLkVYVEVOU0lPTlMpKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbZW51bXMuRVhURU5TSU9OU107XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5TTUFSVF9SRVBMWSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc21hcnRSZXBseSA9IGV4dGVuc2lvbnNPYmplY3RbZW51bXMuU01BUlRfUkVQTFldO1xuICAgICAgICAgICAgICBpZiAoc21hcnRSZXBseS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5FUlJPUikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBseVByZXZpZXcgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMsICh0aGlzLnJlcGx5UHJldmlldyA9IG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVJbWFnZVZpZXcobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2UgPSAhdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIFNjcm9sbCBvZiB3aW5kb3dcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuXG4gICAgICBjb25zdCB0b3AgPSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wID09PSAwO1xuXG4gICAgICBpZiAodG9wKSB7XG4gICAgICAgIHRoaXMucmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gdG9wO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0ZXh0IGZvciBSZXBseSBDb3VudFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldFJlcGx5Q291bnRUZXh0KHJlcGx5Q291bnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHJlcGx5Q291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlcGx5Q291bnQgKyBcIiBcIiArIENPTUVUQ0hBVF9DT05TVEFOVFMuUkVQTFk7XG4gICAgICB9IGVsc2UgaWYgKHJlcGx5Q291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiByZXBseUNvdW50ICsgXCIgXCIgKyBDT01FVENIQVRfQ09OU1RBTlRTLlJFUExJRVM7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gYm90dG9tIG9mIGNoYXQgd2luZG93XG4gICAqL1xuICBzY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpIHtcbiAgICB0cnkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgfSwgMSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgcmVhY3Rpb24gdG8gbWVzc2FnZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgcmVhY3RUb01lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lc3NhZ2VUb1JlYWN0ID0gbWVzc2FnZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==