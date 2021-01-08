/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-thread/cometchat-message-thread/cometchat-message-thread.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatMessageThreadComponent {
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
        (messages) => {
            /** @type {?} */
            let dummy = [...this.messageList];
            this.messageList = [...dummy, ...messages];
            this.scrollToBottomOfChatWindow();
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
            // let dummy = [...this.messageList];
            this.messageList = [...messages];
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
        (message) => {
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
        (messages) => {
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
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.parentMessage.hasOwnProperty("replyCount")) {
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
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        /** @type {?} */
        let messages = action.payLoad;
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
                const message = messages[0];
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
    /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @return {?}
     */
    closeThread() {
        this.actionGenerated.emit({
            type: enums.CLOSE_THREAD_CLICKED,
            payLoad: null,
        });
    }
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param {?} messages
     * @return {?}
     */
    setMessages(messages) {
        this.messageList = [...messages];
        this.scrollToBottomOfChatWindow();
    }
    /**
     * prepend Fetched Messages
     * @param {?} messages
     * @return {?}
     */
    prependMessages(messages) {
        this.messageList = [...messages, ...this.messageList];
    }
    /**
     * Sets The message to be edited to pass it to the message composer
     * @param {?} messages
     * @return {?}
     */
    editMessage(messages) {
        this.messageToBeEdited = messages;
    }
    /**
     * Render The Message List after Message has been successfullly edited
     * @param {?} message
     * @return {?}
     */
    messageEdited(message) {
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
    /**
     * @param {?} messages
     * @return {?}
     */
    smartReplyPreview(messages) {
        /** @type {?} */
        const message = messages[0];
        if (message.hasOwnProperty("metadata")) {
            /** @type {?} */
            const metadata = message.metadata;
            if (metadata.hasOwnProperty("@injected")) {
                /** @type {?} */
                const injectedObject = metadata["@injected"];
                if (injectedObject.hasOwnProperty("extensions")) {
                    /** @type {?} */
                    const extensionsObject = injectedObject["extensions"];
                    if (extensionsObject.hasOwnProperty("smart-reply")) {
                        /** @type {?} */
                        const smartReply = extensionsObject["smart-reply"];
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
    }
    /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    toggleImageView(message) {
        this.imageView = message;
        this.fullScreenViewImage = !this.fullScreenViewImage;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        /** @type {?} */
        const top = e.currentTarget.scrollTop === 0;
        if (top) {
            this.reachedTopOfConversation = top;
        }
    }
    /**
     * Sets the text for Reply Count
     * @param {?} replyCount
     * @return {?}
     */
    getReplyCountText(replyCount) {
        if (replyCount === 1) {
            return replyCount + " reply";
        }
        else if (replyCount > 1) {
            return replyCount + " replies";
        }
    }
    /**
     * @return {?}
     */
    scrollToBottomOfChatWindow() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.scrollVariable =
                this.chatWindow.nativeElement.scrollHeight -
                    this.chatWindow.nativeElement.clientHeight;
        }), 1);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    reactToMessage(message) {
        this.messageToReact = message;
    }
}
CometchatMessageThreadComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-thread",
                template: "<div class=\"wrapperStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerWrapperStyle\">\n      <div class=\"headerDetailStyle\">\n        <h6 class=\"headerTitleStyle\">{{ THREAD }}</h6>\n        <span class=\"headerNameStyle\">{{ item.name }}</span>\n      </div>\n      <div class=\"headerCloseStyle\" (click)=\"closeThread()\"></div>\n    </div>\n  </div>\n\n  <div class=\"messageContainerStyle\">\n    <div class=\"parentMessageStyle\">\n      <div [ngSwitch]=\"parentMessage?.type\">\n        <!--CASE FOR STICKER -->\n        <div *ngSwitchCase=\"'extension_sticker'\">\n          <cometchat-sender-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-sticker-message-bubble>\n          <cometchat-receiver-sticker-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-sticker-message-bubble>\n        </div>\n        <!--CASE FOR STICKER ENDS -->\n\n        <!--CASE FOR POLL -->\n        <div *ngSwitchCase=\"'extension_poll'\">\n          <cometchat-sender-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-sender-poll-message-bubble>\n          <cometchat-receiver-poll-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [loggedInUserUid]=\"loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-receiver-poll-message-bubble>\n        </div>\n        <!--CASE FOR POLL ENDS -->\n\n        <!-- CASE FOR TEXT -->\n        <div *ngSwitchCase=\"'text'\">\n          <cometchat-receiver-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-text-message-bubble>\n\n          <cometchat-sender-text-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-text-message-bubble>\n        </div>\n        <!--CASE FOR TEXT ENDS -->\n\n        <!-- CASE FOR FILE -->\n        <div *ngSwitchCase=\"'file'\">\n          <cometchat-receiver-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-file-message-bubble>\n\n          <cometchat-sender-file-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-file-message-bubble>\n        </div>\n        <!--CASE FOR FILE ENDS -->\n\n        <!-- CASE FOR IMAGE -->\n        <div *ngSwitchCase=\"'image'\">\n          <cometchat-receiver-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-image-message-bubble>\n\n          <cometchat-sender-image-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-image-message-bubble>\n        </div>\n        <!--CASE FOR IMAGE ENDS -->\n\n        <!-- CASE FOR VIDEO -->\n        <div *ngSwitchCase=\"'video'\">\n          <cometchat-receiver-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-video-message-bubble>\n\n          <cometchat-sender-video-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-video-message-bubble>\n        </div>\n        <!--CASE FOR VIDEO ENDS -->\n\n        <!-- CASE FOR AUDIO -->\n        <div *ngSwitchCase=\"'audio'\">\n          <cometchat-receiver-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid !== loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-receiver-audio-message-bubble>\n\n          <cometchat-sender-audio-message-bubble\n            *ngIf=\"parentMessage?.sender?.uid === loggedInUser?.uid\"\n            [MessageDetails]=\"parentMessage\"\n            [showToolTip]=\"false\"\n            [showReplyCount]=\"false\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-sender-audio-message-bubble>\n        </div>\n        <!--CASE FOR AUDIO ENDS -->\n      </div>\n    </div>\n\n    <div class=\"messageSeparatorStyle\">\n      <span class=\"messageReplyStyle\" *ngIf=\"replyCount > 0\">\n        {{ getReplyCountText(replyCount) }}</span\n      >\n      <hr />\n    </div>\n    <div\n      class=\"messageWindowStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #messageWindow\n      [scrollTop]=\"scrollVariable\"\n    >\n      <cometchat-message-list\n        [item]=\"item\"\n        [type]=\"type\"\n        [parentMessageId]=\"parentMessage?.id\"\n        [messages]=\"messageList\"\n        [reachedTopOfConversation]=\"reachedTopOfConversation\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-list>\n    </div>\n\n    <cometchat-message-composer\n      [item]=\"item\"\n      [type]=\"type\"\n      [parentMessageId]=\"parentMessage?.id\"\n      [replyPreview]=\"replyPreview\"\n      [messageToBeEdited]=\"messageToBeEdited\"\n      [messageToReact]=\"messageToReact\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-composer>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.wrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.wrapperStyle *,.wrapperStyle>*{box-sizing:border-box}.wrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.wrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.wrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.wrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:10px;width:100%;background-color:#fff;border-bottom:1px solid #eaeaea}.headerWrapperStyle{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%}.headerDetailStyle{display:flex;flex-direction:column;width:calc(100% - 40px)}.headerTitleStyle{margin:0;font-size:15px;font-weight:600;line-height:22px;width:100%}.headerNameStyle{font-size:13px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.headerCloseStyle{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;width:24px;height:24px}.messageContainerStyle{display:flex;flex-direction:column;height:100%;overflow-x:hidden;overflow-y:auto;width:100%;z-index:100;min-height:calc(100% - 68px);order:2}.messageContainerStyle .chatListStyle{min-height:250px}.messageContainerStyle .chatListStyle .listWrapperStyle ::-webkit-scrollbar{display:none}.parentMessageStyle{justify-content:flex-end;padding:14px 16px;align-items:center}.parentMessageStyle .sender__message__container,.receiver__message__container{max-width:100%}.parentMessageStyle .replycount{display:none}.messageSeparatorStyle{display:flex;align-items:center;position:relative;margin:7px 16px;height:15px}.messageSeparatorStyle hr{flex:1;margin:1px 0 0;border-top:1px solid #eaeaea}.messageReplyStyle{margin-right:12px;font-size:12px}.messageWindowStyle{padding:20px;height:101vh;overflow:hidden;overflow-y:scroll}"]
            }] }
];
/** @nocollapse */
CometchatMessageThreadComponent.ctorParameters = () => [];
CometchatMessageThreadComponent.propDecorators = {
    chatWindow: [{ type: ViewChild, args: ["messageWindow", { static: false },] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    parentMessage: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQvY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsR0FHWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLCtCQUErQjtJQXFCMUM7UUFsQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixXQUFNLEdBQVcsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7Ozs7UUF5SnhDLGtCQUFhOzs7O1FBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTs7Z0JBQ3ZCLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUVqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUM7Ozs7O1FBY0YsbUJBQWM7Ozs7UUFBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzVCLHFDQUFxQztZQUVyQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNqQyxvQ0FBb0M7UUFDdEMsQ0FBQyxFQUFDOzs7OztRQXNDRixrQkFBYTs7OztRQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUNwQixTQUFTLEdBQUcsT0FBTyxDQUFDLEVBQUU7WUFDNUIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7aUJBQy9CLElBQUk7Ozs7WUFBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7c0JBRWhDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7b0JBQ3JDLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDO2dCQUVsRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7d0JBQzFCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztxQkFDMUIsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDO2lCQUNELEtBQUs7Ozs7WUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUM7Ozs7O1FBTUYsbUJBQWM7Ozs7UUFBRyxDQUFDLFFBQVEsRUFBRSxFQUFFOztrQkFDdEIsY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2tCQUM1QixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O2dCQUVyQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7WUFDcEMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDLEVBQUUsRUFDOUM7WUFDRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTs7b0JBQ2YsVUFBVSxxQkFBUSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUU7O29CQUMzQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztnQkFFakUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsRUFBQztJQTdQYSxDQUFDOzs7OztJQUVoQixXQUFXLENBQUMsTUFBcUI7UUFDL0IsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbEMsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUNyQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7U0FDakQ7O1lBRUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTs7WUFDZCxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU87UUFFN0Isa0VBQWtFO1FBRWxFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xDLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBQ3hDLDREQUE0RDtnQkFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7Z0JBQzlCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUVwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyx3Q0FBd0M7b0JBQ3BELE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO2FBQ1A7WUFFRCxLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNsQyxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztzQkFDckIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksT0FBTyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRTtvQkFDckQsZ0RBQWdEO29CQUNoRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyx3Q0FBd0M7d0JBQ3BELE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtxQkFDekIsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Z0JBRXRDLDBEQUEwRDtnQkFDMUQsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQUUsTUFBTTs7b0JBRTVCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVk7Z0JBRWpFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRS9CLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLGNBQWM7d0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztnQkFDbEUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVOLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0IsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGNBQWM7Z0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUixLQUFLLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxpQkFBaUI7b0JBQzdCLE9BQU8sRUFBRSxRQUFRO2lCQUNsQixDQUFDLENBQUM7Z0JBQ0gsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsaUJBQWlCO29CQUM3QixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsZ0JBQWdCO2dCQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7OztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLG9CQUFvQjtZQUNoQyxPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQU1ELFdBQVcsQ0FBQyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQWtCRCxlQUFlLENBQUMsUUFBUTtRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBaUJELFdBQVcsQ0FBQyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE9BQU87O2NBQ2IsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOztZQUNyQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDO1FBQ2xFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFOztrQkFDYixVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQzs7a0JBRXBDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO1lBRTVELFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWpDLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWTtvQkFDeEIsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUN6QixDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUErQ0QsaUJBQWlCLENBQUMsUUFBUTs7Y0FDbEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQkFDaEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRO1lBQ2pDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTs7c0JBQ2xDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUM1QyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7OzBCQUN6QyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTs7OEJBQzVDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7d0JBQ2xELElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7NEJBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO3lCQUM3Qjs2QkFBTTs0QkFDTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO3lCQUNsQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxlQUFlLENBQUMsT0FBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsQ0FBQzs7Y0FDTixNQUFNLEdBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDOztjQUVwQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssQ0FBQztRQUUzQyxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxVQUFVO1FBQzFCLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDOUI7YUFBTSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7OztJQUVELDBCQUEwQjtRQUN4QixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYztnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWTtvQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQy9DLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQU87UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDaEMsQ0FBQzs7O1lBMVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywwa1FBQXdEOzthQUV6RDs7Ozs7eUJBRUUsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7bUJBRTVDLEtBQUs7bUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsTUFBTTs7OztJQU5QLHFEQUFzRTs7SUFFdEUsK0NBQXFCOztJQUNyQiwrQ0FBcUI7O0lBQ3JCLHdEQUE4Qjs7SUFDOUIsdURBQTZCOztJQUM3QiwwREFBa0U7O0lBRWxFLHNEQUFpQjs7SUFDakIscURBQXVCOztJQUN2QixtRUFBaUM7O0lBQ2pDLHlEQUFtQjs7SUFDbkIsNERBQXlCOztJQUN6Qix1REFBb0I7O0lBQ3BCLG9EQUFpQjs7SUFDakIsOERBQXFDOztJQUVyQyx5REFBc0I7O0lBQ3RCLGlEQUF3Qzs7Ozs7O0lBeUp4Qyx3REFNRTs7Ozs7O0lBY0YseURBS0U7Ozs7OztJQXNDRix3REFtQkU7Ozs7OztJQU1GLHlEQWNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TWVzc2FnZVRocmVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZChcIm1lc3NhZ2VXaW5kb3dcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGNoYXRXaW5kb3c6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBwYXJlbnRNZXNzYWdlID0gbnVsbDtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWVzc2FnZUxpc3QgPSBbXTtcbiAgcmVwbHlDb3VudDogbnVtYmVyID0gMDtcbiAgcmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gZmFsc2U7XG4gIHNjcm9sbFZhcmlhYmxlID0gMDtcbiAgbWVzc2FnZVRvQmVFZGl0ZWQgPSBudWxsO1xuICByZXBseVByZXZpZXcgPSBudWxsO1xuICBpbWFnZVZpZXcgPSBudWxsO1xuICBmdWxsU2NyZWVuVmlld0ltYWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWVzc2FnZVRvUmVhY3QgPSBudWxsO1xuICBUSFJFQUQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5USFJFQUQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJwYXJlbnRNZXNzYWdlXCJdKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gW107XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gICAgICBpZiAoY2hhbmdlW1wicGFyZW50TWVzc2FnZVwiXS5jdXJyZW50VmFsdWUuaGFzT3duUHJvcGVydHkoXCJyZXBseUNvdW50XCIpKSB7XG4gICAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucGFyZW50TWVzc2FnZS5yZXBseUNvdW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXBseUNvdW50ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVwbHlDb3VudFwiKSkge1xuICAgICAgdGhpcy5yZXBseUNvdW50ID0gdGhpcy5wYXJlbnRNZXNzYWdlLnJlcGx5Q291bnQ7XG4gICAgfVxuXG4gICAgbGV0IHVzZXIgPSBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIGxldCBtZXNzYWdlcyA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJNZXNzYWdlVGhyZWFkIC0tPiBhY3Rpb24gZ2VuZXJhdGlvbiBpcyBcIiwgYWN0aW9uKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuTkVXX0NPTlZFUlNBVElPTl9PUEVORUQ6IHtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIHRoaXMucmVwbHlDb3VudCA9IG1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWVzc2FnZVRocmVhZCAtLT4gdXBkYXRpbmcgdGhyZWFkIHBhcmVudCBcIik7XG4gICAgICAgIHRoaXMucGFyZW50TWVzc2FnZSA9IG1lc3NhZ2VzO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDoge1xuICAgICAgICB0aGlzLmFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSB0aGlzLnJlcGx5Q291bnQgKyBtZXNzYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQ0hBTkdFX1RIUkVBRF9QQVJFTlRfTUVTU0FHRV9SRVBMWV9DT1VOVCxcbiAgICAgICAgICBwYXlMb2FkOiB0aGlzLnJlcGx5Q291bnQsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1JFQ0VJVkVEOiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGFyZW50TWVzc2FnZUlkID09PSB0aGlzLnBhcmVudE1lc3NhZ2UuaWQpIHtcbiAgICAgICAgICAvLyBjb25zdCByZXBseUNvdW50ID0gdGhpcy5zdGF0ZS5yZXBseUNvdW50ICsgMTtcbiAgICAgICAgICB0aGlzLnNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKTtcbiAgICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSB0aGlzLnJlcGx5Q291bnQgKyBtZXNzYWdlcy5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQsXG4gICAgICAgICAgICBwYXlMb2FkOiB0aGlzLnJlcGx5Q291bnQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk9MREVSX01FU1NBR0VTX0ZFVENIRUQ6IHtcbiAgICAgICAgdGhpcy5yZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBmYWxzZTtcblxuICAgICAgICAvL05vIE5lZWQgZm9yIGJlbG93IGFjdGlvbnMgaWYgdGhlcmUgaXMgbm90aGluZyB0byBwcmVwZW5kXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT0gMCkgYnJlYWs7XG5cbiAgICAgICAgbGV0IHByZXZTY3JvbGxIZWlnaHQgPSB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gcHJldlNjcm9sbEhlaWdodDtcbiAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkVESVRfTUVTU0FHRToge1xuICAgICAgICB0aGlzLmVkaXRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVDoge1xuICAgICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuREVMRVRFX01FU1NBR0U6IHtcbiAgICAgICAgdGhpcy5kZWxldGVNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFOlxuICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0ZVTExfU0NSRUVOX0lNQUdFOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVBQ1RfVE9fTUVTU0FHRTpcbiAgICAgICAgdGhpcy5yZWFjdFRvTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3Rpb24gaXMgR2VuZXJhdGVkIHRvIGluZm9ybSBVc2VyTGlzdFNjcmVlbiB0byBjbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlVGhyZWFkKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQsXG4gICAgICBwYXlMb2FkOiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBNZXNzYWdlcyBEaXJlY3RseSAsIGNveiBuZXcgY29udmVyc2F0aW9uIGlzIG9wZW5lZCAsIGhlbmNlIG5vIG5lZWQgdG8gcHJlcGVuZCBvciBhcHBlbmRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgc2V0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzXTtcblxuICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgTWVzc2FnZXMgdGhhdCBhcmUgc2VudFxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBhcHBlbmRNZXNzYWdlID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgbGV0IGR1bW15ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5kdW1teSwgLi4ubWVzc2FnZXNdO1xuXG4gICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBwcmVwZW5kIEZldGNoZWQgTWVzc2FnZXNcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgcHJlcGVuZE1lc3NhZ2VzKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlcywgLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHN0YXR1cyBvZiBtZXNzYWdlIGllLiByZWFkIG9yIGRlbGl2XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgLy8gbGV0IGR1bW15ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG4gICAgLy90aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgVGhlIG1lc3NhZ2UgdG8gYmUgZWRpdGVkIHRvIHBhc3MgaXQgdG8gdGhlIG1lc3NhZ2UgY29tcG9zZXJcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgZWRpdE1lc3NhZ2UobWVzc2FnZXMpIHtcbiAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbWVzc2FnZXM7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIFRoZSBNZXNzYWdlIExpc3QgYWZ0ZXIgTWVzc2FnZSBoYXMgYmVlbiBzdWNjZXNzZnVsbGx5IGVkaXRlZFxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VFZGl0ZWQobWVzc2FnZSkge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KChtKSA9PiBtLmlkID09PSBtZXNzYWdlLmlkKTtcbiAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0gbWVzc2FnZUxpc3RbbWVzc2FnZUtleV07XG5cbiAgICAgIGNvbnN0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCBtZXNzYWdlKTtcblxuICAgICAgbWVzc2FnZUxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyhtZXNzYWdlTGlzdCk7XG5cbiAgICAgIGlmIChtZXNzYWdlTGlzdC5sZW5ndGggLSBtZXNzYWdlS2V5ID09PSAxICYmICFtZXNzYWdlLnJlcGx5Q291bnQpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9FRElULFxuICAgICAgICAgIHBheUxvYWQ6IFtuZXdNZXNzYWdlT2JqXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIGRlbGV0ZU1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XG4gICAgQ29tZXRDaGF0LmRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkKVxuICAgICAgLnRoZW4oKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMoW2RlbGV0ZWRNZXNzYWdlXSk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KChtKSA9PiBtLmlkID09PSBtZXNzYWdlLmlkKTtcblxuICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0RFTEVURSxcbiAgICAgICAgICAgIHBheUxvYWQ6IFtkZWxldGVkTWVzc2FnZV0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBkZWxldGUgZmFpbGVkIHdpdGggZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgbWVzc2FnZSBnZXRzIGRlbGV0ZWQgc3VjY2Vzc2Z1bGwgLCByZW1vdmUgdGhlIGRlbGV0ZWQgbWVzc2FnZSBpbiBmcm9udGVuZCB1c2luZyB0aGlzIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHJlbW92ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgY29uc3QgZGVsZXRlZE1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICBjb25zdCBtZXNzYWdlbGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZWxpc3QuZmluZEluZGV4KFxuICAgICAgKG1lc3NhZ2UpID0+IG1lc3NhZ2UuaWQgPT09IGRlbGV0ZWRNZXNzYWdlLmlkXG4gICAgKTtcbiAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICBsZXQgbWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZWxpc3RbbWVzc2FnZUtleV0gfTtcbiAgICAgIGxldCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgZGVsZXRlZE1lc3NhZ2UpO1xuXG4gICAgICBtZXNzYWdlbGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VsaXN0XTtcbiAgICB9XG4gIH07XG5cbiAgc21hcnRSZXBseVByZXZpZXcobWVzc2FnZXMpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbMF07XG5cbiAgICBpZiAobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IG1lc3NhZ2UubWV0YWRhdGE7XG4gICAgICBpZiAobWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJAaW5qZWN0ZWRcIikpIHtcbiAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtcIkBpbmplY3RlZFwiXTtcbiAgICAgICAgaWYgKGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtcImV4dGVuc2lvbnNcIl07XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbWFydC1yZXBseVwiKSkge1xuICAgICAgICAgICAgY29uc3Qgc21hcnRSZXBseSA9IGV4dGVuc2lvbnNPYmplY3RbXCJzbWFydC1yZXBseVwiXTtcbiAgICAgICAgICAgIGlmIChzbWFydFJlcGx5Lmhhc093blByb3BlcnR5KFwiZXJyb3JcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVwbHlQcmV2aWV3ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMsICh0aGlzLnJlcGx5UHJldmlldyA9IG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgY2xpY2tlZCBJbWFnZSBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpIHtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcblxuICAgIGNvbnN0IHRvcCA9IGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3AgPT09IDA7XG5cbiAgICBpZiAodG9wKSB7XG4gICAgICB0aGlzLnJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IHRvcDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBmb3IgUmVwbHkgQ291bnRcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRSZXBseUNvdW50VGV4dChyZXBseUNvdW50KSB7XG4gICAgaWYgKHJlcGx5Q291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiByZXBseUNvdW50ICsgXCIgcmVwbHlcIjtcbiAgICB9IGVsc2UgaWYgKHJlcGx5Q291bnQgPiAxKSB7XG4gICAgICByZXR1cm4gcmVwbHlDb3VudCArIFwiIHJlcGxpZXNcIjtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfSwgMSk7XG4gIH1cblxuICByZWFjdFRvTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlVG9SZWFjdCA9IG1lc3NhZ2U7XG4gIH1cbn1cbiJdfQ==