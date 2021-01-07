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
                // this.setState({ messageList: messagelist, scrollToBottom: false });
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
                    // this.setState({ replyCount: replyCount });
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
    chatWindow: [{ type: ViewChild, args: ["messageWindow", null,] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQvY29tZXRjaGF0LW1lc3NhZ2UtdGhyZWFkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsR0FHWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLCtCQUErQjtJQXFCMUM7UUFsQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixXQUFNLEdBQVcsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7Ozs7UUEwSnhDLGtCQUFhOzs7O1FBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTs7Z0JBQ3ZCLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUVqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUM7Ozs7O1FBY0YsbUJBQWM7Ozs7UUFBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzVCLHFDQUFxQztZQUVyQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNqQyxvQ0FBb0M7UUFDdEMsQ0FBQyxFQUFDOzs7OztRQXNDRixrQkFBYTs7OztRQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7O2tCQUNwQixTQUFTLEdBQUcsT0FBTyxDQUFDLEVBQUU7WUFDNUIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7aUJBQy9CLElBQUk7Ozs7WUFBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7c0JBRWhDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7b0JBQ3JDLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDO2dCQUVsRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7d0JBQzFCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztxQkFDMUIsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDO2lCQUNELEtBQUs7Ozs7WUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUM7Ozs7O1FBTUYsbUJBQWM7Ozs7UUFBRyxDQUFDLFFBQVEsRUFBRSxFQUFFOztrQkFDdEIsY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2tCQUM1QixXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O2dCQUVyQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7WUFDcEMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDLEVBQUUsRUFDOUM7WUFDRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTs7b0JBQ2YsVUFBVSxxQkFBUSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUU7O29CQUMzQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztnQkFFakUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRCxzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxFQUFDO0lBL1BhLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNsQyxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztTQUNqRDs7WUFFRyxJQUFJLEdBQUcsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUMsRUFBQztJQUNKLENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxNQUFNOztZQUNkLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTztRQUU3QixrRUFBa0U7UUFFbEUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ25CLEtBQUssS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztnQkFDeEMsNERBQTREO2dCQUM1RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztnQkFDOUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBRXBELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHdDQUF3QztvQkFDcEQsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QixDQUFDLENBQUM7Z0JBQ0gsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07YUFDUDtZQUVELEtBQUssS0FBSyxDQUFDLHNCQUFzQixDQUFDO1lBQ2xDLEtBQUssS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O3NCQUNyQixPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxPQUFPLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFO29CQUNyRCxnREFBZ0Q7b0JBQ2hELDZDQUE2QztvQkFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsd0NBQXdDO3dCQUNwRCxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7cUJBQ3pCLENBQUMsQ0FBQztpQkFDSjtnQkFDRCxNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO2dCQUV0QywwREFBMEQ7Z0JBQzFELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUFFLE1BQU07O29CQUU1QixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2dCQUVqRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUvQixVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxjQUFjO3dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ2xFLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztnQkFFTixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0IsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxjQUFjO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1IsS0FBSyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsaUJBQWlCO29CQUM3QixPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtvQkFDN0IsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGdCQUFnQjtnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUIsTUFBTTtTQUNUO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7WUFDaEMsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsUUFBUTtRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFrQkQsZUFBZSxDQUFDLFFBQVE7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQWlCRCxXQUFXLENBQUMsUUFBUTtRQUNsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxPQUFPOztjQUNiLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7WUFDckMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBQztRQUNsRSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTs7a0JBQ2IsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7O2tCQUVwQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUU1RCxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVk7b0JBQ3hCLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDekIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Ozs7O0lBZ0RELGlCQUFpQixDQUFDLFFBQVE7O2NBQ2xCLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRTNCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTs7a0JBQ2hDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTtZQUNqQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7O3NCQUNsQyxjQUFjLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDNUMsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFOzswQkFDekMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7OzhCQUM1QyxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO3dCQUNsRCxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxFQUFFOzRCQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQzt5QkFDN0I7NkJBQU07NEJBQ0wsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQzt5QkFDbEM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsZUFBZSxDQUFDLE9BQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLENBQUM7O2NBQ04sTUFBTSxHQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzs7Y0FFcEMsR0FBRyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLENBQUM7UUFFM0MsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsVUFBVTtRQUMxQixJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQzlCO2FBQU0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7SUFFRCwwQkFBMEI7UUFDeEIsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWM7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVk7b0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUMvQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxPQUFPO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7OztZQTVWRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsMGtRQUF3RDs7YUFFekQ7Ozs7O3lCQUVFLFNBQVMsU0FBQyxlQUFlLEVBQUUsSUFBSTttQkFFL0IsS0FBSzttQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBTlAscURBQXlEOztJQUV6RCwrQ0FBcUI7O0lBQ3JCLCtDQUFxQjs7SUFDckIsd0RBQThCOztJQUM5Qix1REFBNkI7O0lBQzdCLDBEQUFrRTs7SUFFbEUsc0RBQWlCOztJQUNqQixxREFBdUI7O0lBQ3ZCLG1FQUFpQzs7SUFDakMseURBQW1COztJQUNuQiw0REFBeUI7O0lBQ3pCLHVEQUFvQjs7SUFDcEIsb0RBQWlCOztJQUNqQiw4REFBcUM7O0lBRXJDLHlEQUFzQjs7SUFDdEIsaURBQXdDOzs7Ozs7SUEwSnhDLHdEQU1FOzs7Ozs7SUFjRix5REFLRTs7Ozs7O0lBc0NGLHdEQW1CRTs7Ozs7O0lBTUYseURBZUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS10aHJlYWRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZS10aHJlYWQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLXRocmVhZC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlVGhyZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKFwibWVzc2FnZVdpbmRvd1wiLCBudWxsKSBjaGF0V2luZG93OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgcGFyZW50TWVzc2FnZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VMaXN0ID0gW107XG4gIHJlcGx5Q291bnQ6IG51bWJlciA9IDA7XG4gIHJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IGZhbHNlO1xuICBzY3JvbGxWYXJpYWJsZSA9IDA7XG4gIG1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgcmVwbHlQcmV2aWV3ID0gbnVsbDtcbiAgaW1hZ2VWaWV3ID0gbnVsbDtcbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2VUb1JlYWN0ID0gbnVsbDtcbiAgVEhSRUFEOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuVEhSRUFEO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wicGFyZW50TWVzc2FnZVwiXSkge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IFtdO1xuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICAgICAgaWYgKGNoYW5nZVtcInBhcmVudE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlLmhhc093blByb3BlcnR5KFwicmVwbHlDb3VudFwiKSkge1xuICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSB0aGlzLnBhcmVudE1lc3NhZ2UucmVwbHlDb3VudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVwbHlDb3VudCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50TWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlcGx5Q291bnRcIikpIHtcbiAgICAgIHRoaXMucmVwbHlDb3VudCA9IHRoaXMucGFyZW50TWVzc2FnZS5yZXBseUNvdW50O1xuICAgIH1cblxuICAgIGxldCB1c2VyID0gQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgbWVzc2FnZXMgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiTWVzc2FnZVRocmVhZCAtLT4gYWN0aW9uIGdlbmVyYXRpb24gaXMgXCIsIGFjdGlvbik7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLk5FV19DT05WRVJTQVRJT05fT1BFTkVEOiB7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICB0aGlzLnJlcGx5Q291bnQgPSBtZXNzYWdlcy5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1lc3NhZ2VUaHJlYWQgLS0+IHVwZGF0aW5nIHRocmVhZCBwYXJlbnQgXCIpO1xuICAgICAgICB0aGlzLnBhcmVudE1lc3NhZ2UgPSBtZXNzYWdlcztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfQ09NUE9TRUQ6IHtcbiAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgdGhpcy5yZXBseUNvdW50ID0gdGhpcy5yZXBseUNvdW50ICsgbWVzc2FnZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQsXG4gICAgICAgICAgcGF5TG9hZDogdGhpcy5yZXBseUNvdW50LFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRTpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9SRUNFSVZFRDoge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgICAgIGlmIChtZXNzYWdlLnBhcmVudE1lc3NhZ2VJZCA9PT0gdGhpcy5wYXJlbnRNZXNzYWdlLmlkKSB7XG4gICAgICAgICAgLy8gY29uc3QgcmVwbHlDb3VudCA9IHRoaXMuc3RhdGUucmVwbHlDb3VudCArIDE7XG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHJlcGx5Q291bnQ6IHJlcGx5Q291bnQgfSk7XG4gICAgICAgICAgdGhpcy5zbWFydFJlcGx5UHJldmlldyhtZXNzYWdlcyk7XG4gICAgICAgICAgdGhpcy5yZXBseUNvdW50ID0gdGhpcy5yZXBseUNvdW50ICsgbWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5ULFxuICAgICAgICAgICAgcGF5TG9hZDogdGhpcy5yZXBseUNvdW50LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5PTERFUl9NRVNTQUdFU19GRVRDSEVEOiB7XG4gICAgICAgIHRoaXMucmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgLy9ObyBOZWVkIGZvciBiZWxvdyBhY3Rpb25zIGlmIHRoZXJlIGlzIG5vdGhpbmcgdG8gcHJlcGVuZFxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09IDApIGJyZWFrO1xuXG4gICAgICAgIGxldCBwcmV2U2Nyb2xsSGVpZ2h0ID0gdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucHJlcGVuZE1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFZhcmlhYmxlID1cbiAgICAgICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtIHByZXZTY3JvbGxIZWlnaHQ7XG4gICAgICAgIH0sIDEpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5FRElUX01FU1NBR0U6IHtcbiAgICAgICAgdGhpcy5lZGl0TWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVQ6IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWRpdGVkKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkRFTEVURV9NRVNTQUdFOiB7XG4gICAgICAgIHRoaXMuZGVsZXRlTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURTpcbiAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRToge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRSxcbiAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRSxcbiAgICAgICAgICBwYXlMb2FkOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlJFQUNUX1RPX01FU1NBR0U6XG4gICAgICAgIHRoaXMucmVhY3RUb01lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWN0aW9uIGlzIEdlbmVyYXRlZCB0byBpbmZvcm0gVXNlckxpc3RTY3JlZW4gdG8gY2xvc2UgdGhlIHRocmVhZCB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVRocmVhZCgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VELFxuICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgTWVzc2FnZXMgRGlyZWN0bHkgLCBjb3ogbmV3IGNvbnZlcnNhdGlvbiBpcyBvcGVuZWQgLCBoZW5jZSBubyBuZWVkIHRvIHByZXBlbmQgb3IgYXBwZW5kXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHNldE1lc3NhZ2VzKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG5cbiAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIE1lc3NhZ2VzIHRoYXQgYXJlIHNlbnRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgYXBwZW5kTWVzc2FnZSA9IChtZXNzYWdlcykgPT4ge1xuICAgIGxldCBkdW1teSA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4uZHVtbXksIC4uLm1lc3NhZ2VzXTtcblxuICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgfTtcblxuICAvKipcbiAgICogcHJlcGVuZCBGZXRjaGVkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXMsIC4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzdGF0dXMgb2YgbWVzc2FnZSBpZS4gcmVhZCBvciBkZWxpdlxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICB1cGRhdGVNZXNzYWdlcyA9IChtZXNzYWdlcykgPT4ge1xuICAgIC8vIGxldCBkdW1teSA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXNdO1xuICAgIC8vdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIFRoZSBtZXNzYWdlIHRvIGJlIGVkaXRlZCB0byBwYXNzIGl0IHRvIHRoZSBtZXNzYWdlIGNvbXBvc2VyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGVkaXRNZXNzYWdlKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG1lc3NhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBUaGUgTWVzc2FnZSBMaXN0IGFmdGVyIE1lc3NhZ2UgaGFzIGJlZW4gc3VjY2Vzc2Z1bGxseSBlZGl0ZWRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlRWRpdGVkKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuXG4gICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgIG1lc3NhZ2VMaXN0LnNwbGljZShtZXNzYWdlS2V5LCAxLCBuZXdNZXNzYWdlT2JqKTtcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMobWVzc2FnZUxpc3QpO1xuXG4gICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoIC0gbWVzc2FnZUtleSA9PT0gMSAmJiAhbWVzc2FnZS5yZXBseUNvdW50KSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfRURJVCxcbiAgICAgICAgICBwYXlMb2FkOiBbbmV3TWVzc2FnZU9ial0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBkZWxldGVNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBtZXNzYWdlLmlkO1xuICAgIENvbWV0Q2hhdC5kZWxldGVNZXNzYWdlKG1lc3NhZ2VJZClcbiAgICAgIC50aGVuKChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VzKFtkZWxldGVkTWVzc2FnZV0pO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCAtIG1lc3NhZ2VLZXkgPT09IDEgJiYgIW1lc3NhZ2UucmVwbHlDb3VudCkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgICAgICBwYXlMb2FkOiBbZGVsZXRlZE1lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZGVsZXRlIGZhaWxlZCB3aXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSWYgdGhlIG1lc3NhZ2UgZ2V0cyBkZWxldGVkIHN1Y2Nlc3NmdWxsICwgcmVtb3ZlIHRoZSBkZWxldGVkIG1lc3NhZ2UgaW4gZnJvbnRlbmQgdXNpbmcgdGhpcyBmdW5jdGlvblxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICByZW1vdmVNZXNzYWdlcyA9IChtZXNzYWdlcykgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZWRNZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgY29uc3QgbWVzc2FnZWxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VsaXN0LmZpbmRJbmRleChcbiAgICAgIChtZXNzYWdlKSA9PiBtZXNzYWdlLmlkID09PSBkZWxldGVkTWVzc2FnZS5pZFxuICAgICk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgbGV0IG1lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VsaXN0W21lc3NhZ2VLZXldIH07XG4gICAgICBsZXQgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIGRlbGV0ZWRNZXNzYWdlKTtcblxuICAgICAgbWVzc2FnZWxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2VMaXN0OiBtZXNzYWdlbGlzdCwgc2Nyb2xsVG9Cb3R0b206IGZhbHNlIH0pO1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlbGlzdF07XG4gICAgfVxuICB9O1xuXG4gIHNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuXG4gICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBtZXNzYWdlLm1ldGFkYXRhO1xuICAgICAgaWYgKG1ldGFkYXRhLmhhc093blByb3BlcnR5KFwiQGluamVjdGVkXCIpKSB7XG4gICAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgICAgIGlmIChpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICAgIGlmIChleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwic21hcnQtcmVwbHlcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHNtYXJ0UmVwbHkgPSBleHRlbnNpb25zT2JqZWN0W1wic21hcnQtcmVwbHlcIl07XG4gICAgICAgICAgICBpZiAoc21hcnRSZXBseS5oYXNPd25Qcm9wZXJ0eShcImVycm9yXCIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlcGx5UHJldmlldyA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLCAodGhpcy5yZXBseVByZXZpZXcgPSBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgdGhpcy5pbWFnZVZpZXcgPSBtZXNzYWdlO1xuICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gIH1cblxuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG5cbiAgICBjb25zdCB0b3AgPSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wID09PSAwO1xuXG4gICAgaWYgKHRvcCkge1xuICAgICAgdGhpcy5yZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSB0b3A7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRleHQgZm9yIFJlcGx5IENvdW50XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0UmVwbHlDb3VudFRleHQocmVwbHlDb3VudCkge1xuICAgIGlmIChyZXBseUNvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gcmVwbHlDb3VudCArIFwiIHJlcGx5XCI7XG4gICAgfSBlbHNlIGlmIChyZXBseUNvdW50ID4gMSkge1xuICAgICAgcmV0dXJuIHJlcGx5Q291bnQgKyBcIiByZXBsaWVzXCI7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbFZhcmlhYmxlID1cbiAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC1cbiAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH0sIDEpO1xuICB9XG5cbiAgcmVhY3RUb01lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZVRvUmVhY3QgPSBtZXNzYWdlO1xuICB9XG59XG4iXX0=