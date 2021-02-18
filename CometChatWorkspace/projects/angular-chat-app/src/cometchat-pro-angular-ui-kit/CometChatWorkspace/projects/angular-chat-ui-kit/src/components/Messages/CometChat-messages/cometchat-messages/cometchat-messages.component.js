/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-messages/cometchat-messages/cometchat-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { INCOMING_MESSAGE_SOUND } from "../../../../resources/audio/incomingMessageSound";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatMessagesComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.composedThreadMessage = null;
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
        this.reactionName = COMETCHAT_CONSTANTS.HEART;
        this.messageToReact = null;
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
                    this.actionGenerated.emit({
                        type: enums.THREAD_PARENT_MESSAGE_UPDATED,
                        updateType: enums.DELETE,
                        payLoad: [deletedMessage],
                    });
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
        (message, key, group, options) => {
            try {
                this.appendMessage([message]);
                this.actionGenerated.emit({
                    type: enums.GROUP_UPDATED,
                    payLoad: { message, key, group, options },
                });
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
            if (change[enums.COMPOSED_THREAD_MESSAGE]) {
                // There is a valid Thread parent message , than update it's reply count
                if (change[enums.COMPOSED_THREAD_MESSAGE].currentValue) {
                    this.messageEdited(change[enums.COMPOSED_THREAD_MESSAGE].currentValue);
                }
            }
            if (change[enums.GROUP_MESSAGE]) {
                if (change[enums.GROUP_MESSAGE].currentValue.length > 0) {
                    this.appendMessage(change[enums.GROUP_MESSAGE].currentValue);
                }
            }
            // When There is call display proper call messages
            if (change[enums.CALL_MESSAGE]) {
                /** @type {?} */
                let prevProps = { callMessage: null };
                /** @type {?} */
                let props = { callMessage: null };
                prevProps[enums.CALL_MESSAGE] =
                    change[enums.CALL_MESSAGE].previousValue;
                props[enums.CALL_MESSAGE] = change[enums.CALL_MESSAGE].currentValue;
                if (prevProps.callMessage !== props.callMessage && props.callMessage) {
                    this.actionHandler({
                        type: enums.CALL_UPDATED,
                        payLoad: change[enums.CALL_MESSAGE].currentValue,
                    });
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
    ngOnInit() { }
    /**
     * Updating the reply count of Thread Parent Message
     * @param {?} messages
     * @return {?}
     */
    updateReplyCount(messages) {
        try {
            /** @type {?} */
            const receivedMessage = messages[0];
            /** @type {?} */
            let messageList = [...this.messageList];
            /** @type {?} */
            let messageKey = messageList.findIndex((/**
             * @param {?} m
             * @return {?}
             */
            (m) => m.id === receivedMessage.parentMessageId));
            if (messageKey > -1) {
                /** @type {?} */
                const messageObj = messageList[messageKey];
                /** @type {?} */
                let replyCount = messageObj.replyCount ? messageObj.replyCount : 0;
                replyCount = replyCount + 1;
                /** @type {?} */
                const newMessageObj = Object.assign({}, messageObj, {
                    replyCount: replyCount,
                });
                messageList.splice(messageKey, 1, newMessageObj);
                this.messageList = [...messageList];
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
            /** @type {?} */
            let messages = action.payLoad;
            /** @type {?} */
            let data = action.payLoad;
            switch (action.type) {
                case enums.CUSTOM_MESSAGE_RECEIVE:
                case enums.MESSAGE_RECEIVED: {
                    /** @type {?} */
                    const message = messages[0];
                    if (message.parentMessageId) {
                        this.updateReplyCount(messages);
                    }
                    else {
                        this.smartReplyPreview(messages);
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            this.scrollToBottomOfChatWindow();
                        }), 2500);
                        this.appendMessage(messages);
                    }
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
                    let prevScrollHeight = this.chatWindow.nativeElement.scrollHeight;
                    this.prependMessages(messages);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.chatWindow.nativeElement.scrollTop =
                            this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets the message to which reaction has to be set
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
    /**
     * Resets The component to initial conditions
     * @return {?}
     */
    resetPage() {
        try {
            this.messageToBeEdited = null;
            this.replyPreview = null;
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
     * append Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    appendMessage(messages) {
        try {
            /** @type {?} */
            let dummy = [...this.messageList];
            this.messageList = [...dummy, ...messages];
            this.scrollToBottomOfChatWindow();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * append Poll Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    appendPollMessage(messages) {
        try {
            this.appendMessage(messages);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * updates Poll Messages depending on answer given by user
     * @param {?} message
     * @return {?}
     */
    updatePollMessage(message) {
        try {
            /** @type {?} */
            const messageList = [...this.messageList];
            /** @type {?} */
            const messageId = message.poll.id;
            /** @type {?} */
            let messageKey = messageList.findIndex((/**
             * @param {?} m
             * @param {?} k
             * @return {?}
             */
            (m, k) => m.id === messageId));
            if (messageKey > -1) {
                /** @type {?} */
                const messageObj = messageList[messageKey];
                /** @type {?} */
                const metadataObj = {
                    "@injected": { extensions: { polls: message.poll } },
                };
                /** @type {?} */
                const newMessageObj = Object.assign({}, messageObj, { metadata: metadataObj });
                this.messageEdited(newMessageObj);
            }
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
                this.actionGenerated.emit({
                    type: enums.THREAD_PARENT_MESSAGE_UPDATED,
                    updateType: enums.EDIT,
                    payLoad: [newMessageObj],
                });
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
     * Checks extension smartReplyPreview
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
     * Handles scroll of window
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
     * Scrolls to bottom of chat window
     * @return {?}
     */
    scrollToBottomOfChatWindow() {
        try {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.chatWindow.nativeElement.scrollTop =
                    this.chatWindow.nativeElement.scrollHeight -
                        this.chatWindow.nativeElement.clientHeight;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Toggle Reaction -> true/false
     * @param {?} flag
     * @return {?}
     */
    toggleReaction(flag) {
        try {
            this.liveReaction = flag;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Shows Reaction on receiving end
     * @param {?} reaction
     * @return {?}
     */
    showReaction(reaction) {
        try {
            if (!reaction.hasOwnProperty(enums.METADATA)) {
                return false;
            }
            if (reaction[enums.METADATA] == undefined) {
                return false;
            }
            if (!reaction[enums.METADATA].hasOwnProperty(enums.TYPE) ||
                !reaction[enums.METADATA].hasOwnProperty(enums.REACTION)) {
                return false;
            }
            if (!enums.LIVE_REACTIONS.hasOwnProperty(reaction[enums.METADATA].reaction)) {
                return false;
            }
            if (reaction[enums.METADATA].type === enums.LIVE_REACTION_KEY) {
                this.reactionName = reaction[enums.METADATA].reaction;
                this.liveReaction = true;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Appends call message
     * @param {?} message
     * @return {?}
     */
    callUpdated(message) {
        try {
            this.appendMessage([message]);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    playAudio() {
        try {
            /** @type {?} */
            let audio = new Audio();
            audio.src = INCOMING_MESSAGE_SOUND;
            audio.play();
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-messages",
                template: "<div class=\"chatWrapperStyle\">\n  <!-- Add the Action To header to make it Dynamic -->\n  <cometchat-message-header\n    [item]=\"item\"\n    [type]=\"type\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-header>\n  <div\n    class=\"messageWindowStyle\"\n    (scroll)=\"handleScroll($event)\"\n    #messageWindow\n  >\n    <cometchat-message-list\n      [item]=\"item\"\n      [type]=\"type\"\n      [messages]=\"messageList\"\n      [reachedTopOfConversation]=\"reachedTopOfConversation\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-list>\n  </div>\n  <cometchat-live-reactions\n    [reactionName]=\"reactionName\"\n    *ngIf=\"liveReaction\"\n  ></cometchat-live-reactions>\n  <cometchat-message-composer\n    [item]=\"item\"\n    [type]=\"type\"\n    [replyPreview]=\"replyPreview\"\n    [messageToBeEdited]=\"messageToBeEdited\"\n    [messageToReact]=\"messageToReact\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-composer>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.chatWrapperStyle{display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;position:relative}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.messageWindowStyle{padding:20px;height:101vh;overflow:hidden;overflow-y:scroll}"]
            }] }
];
/** @nocollapse */
CometChatMessagesComponent.ctorParameters = () => [];
CometChatMessagesComponent.propDecorators = {
    chatWindow: [{ type: ViewChild, args: ["messageWindow", { static: false },] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    composedThreadMessage: [{ type: Input }],
    groupMessage: [{ type: Input }],
    callMessage: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatMessagesComponent.prototype.chatWindow;
    /** @type {?} */
    CometChatMessagesComponent.prototype.item;
    /** @type {?} */
    CometChatMessagesComponent.prototype.type;
    /** @type {?} */
    CometChatMessagesComponent.prototype.composedThreadMessage;
    /** @type {?} */
    CometChatMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometChatMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometChatMessagesComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessagesComponent.prototype.messageList;
    /** @type {?} */
    CometChatMessagesComponent.prototype.scrollToBottom;
    /** @type {?} */
    CometChatMessagesComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometChatMessagesComponent.prototype.replyPreview;
    /** @type {?} */
    CometChatMessagesComponent.prototype.liveReaction;
    /** @type {?} */
    CometChatMessagesComponent.prototype.changeNumber;
    /** @type {?} */
    CometChatMessagesComponent.prototype.reachedTopOfConversation;
    /** @type {?} */
    CometChatMessagesComponent.prototype.scrollVariable;
    /** @type {?} */
    CometChatMessagesComponent.prototype.reactionName;
    /** @type {?} */
    CometChatMessagesComponent.prototype.messageToReact;
    /**
     * update status of message ie. read or deliv
     * \@param Any messages
     * @type {?}
     */
    CometChatMessagesComponent.prototype.updateMessages;
    /**
     * Delete the message
     * \@param Any message
     * @type {?}
     */
    CometChatMessagesComponent.prototype.deleteMessage;
    /**
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * \@param Any messages
     * @type {?}
     */
    CometChatMessagesComponent.prototype.removeMessages;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * \@param
     * @type {?}
     */
    CometChatMessagesComponent.prototype.groupUpdated;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1tZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZXMvY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsR0FHWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFNbEQsTUFBTSxPQUFPLDBCQUEwQjtJQXVCckM7UUFwQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0IsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbEIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pD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b0I7O0lBQ3BCLGtEQUFxQjs7SUFDckIsa0RBQWlCOztJQUNqQiw4REFBaUM7O0lBQ2pDLG9EQUFtQjs7SUFFbkIsa0RBQXlDOztJQUN6QyxvREFBc0I7Ozs7OztJQXlWdEIsb0RBTUU7Ozs7OztJQU1GLG1EQTZCRTs7Ozs7O0lBb0RGLG9EQW1CRTs7Ozs7O0lBK0lGLGtEQVdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHsgSU5DT01JTkdfTUVTU0FHRV9TT1VORCB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXNvdXJjZXMvYXVkaW8vaW5jb21pbmdNZXNzYWdlU291bmRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZXMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoXCJtZXNzYWdlV2luZG93XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBjaGF0V2luZG93OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgY29tcG9zZWRUaHJlYWRNZXNzYWdlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBNZXNzYWdlID0gbnVsbDtcbiAgQElucHV0KCkgY2FsbE1lc3NhZ2UgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VMaXN0ID0gW107XG4gIHNjcm9sbFRvQm90dG9tOiB0cnVlO1xuICBtZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gIHJlcGx5UHJldmlldyA9IG51bGw7XG4gIGxpdmVSZWFjdGlvbiA9IGZhbHNlO1xuICBjaGFuZ2VOdW1iZXIgPSAwO1xuICByZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBmYWxzZTtcbiAgc2Nyb2xsVmFyaWFibGUgPSAwO1xuXG4gIHJlYWN0aW9uTmFtZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuSEVBUlQ7XG4gIG1lc3NhZ2VUb1JlYWN0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuQ09NUE9TRURfVEhSRUFEX01FU1NBR0VdKSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGEgdmFsaWQgVGhyZWFkIHBhcmVudCBtZXNzYWdlICwgdGhhbiB1cGRhdGUgaXQncyByZXBseSBjb3VudFxuICAgICAgICBpZiAoY2hhbmdlW2VudW1zLkNPTVBPU0VEX1RIUkVBRF9NRVNTQUdFXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQoXG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuQ09NUE9TRURfVEhSRUFEX01FU1NBR0VdLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5HUk9VUF9NRVNTQUdFXSkge1xuICAgICAgICBpZiAoY2hhbmdlW2VudW1zLkdST1VQX01FU1NBR0VdLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKGNoYW5nZVtlbnVtcy5HUk9VUF9NRVNTQUdFXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gVGhlcmUgaXMgY2FsbCBkaXNwbGF5IHByb3BlciBjYWxsIG1lc3NhZ2VzXG4gICAgICBpZiAoY2hhbmdlW2VudW1zLkNBTExfTUVTU0FHRV0pIHtcbiAgICAgICAgbGV0IHByZXZQcm9wcyA9IHsgY2FsbE1lc3NhZ2U6IG51bGwgfTtcbiAgICAgICAgbGV0IHByb3BzID0geyBjYWxsTWVzc2FnZTogbnVsbCB9O1xuXG4gICAgICAgIHByZXZQcm9wc1tlbnVtcy5DQUxMX01FU1NBR0VdID1cbiAgICAgICAgICBjaGFuZ2VbZW51bXMuQ0FMTF9NRVNTQUdFXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgICBwcm9wc1tlbnVtcy5DQUxMX01FU1NBR0VdID0gY2hhbmdlW2VudW1zLkNBTExfTUVTU0FHRV0uY3VycmVudFZhbHVlO1xuXG4gICAgICAgIGlmIChwcmV2UHJvcHMuY2FsbE1lc3NhZ2UgIT09IHByb3BzLmNhbGxNZXNzYWdlICYmIHByb3BzLmNhbGxNZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyKHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkNBTExfVVBEQVRFRCxcbiAgICAgICAgICAgIHBheUxvYWQ6IGNoYW5nZVtlbnVtcy5DQUxMX01FU1NBR0VdLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogVXBkYXRpbmcgdGhlIHJlcGx5IGNvdW50IG9mIFRocmVhZCBQYXJlbnQgTWVzc2FnZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHVwZGF0ZVJlcGx5Q291bnQobWVzc2FnZXMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVjZWl2ZWRNZXNzYWdlID0gbWVzc2FnZXNbMF07XG5cbiAgICAgIGxldCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KFxuICAgICAgICAobSkgPT4gbS5pZCA9PT0gcmVjZWl2ZWRNZXNzYWdlLnBhcmVudE1lc3NhZ2VJZFxuICAgICAgKTtcbiAgICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuICAgICAgICBsZXQgcmVwbHlDb3VudCA9IG1lc3NhZ2VPYmoucmVwbHlDb3VudCA/IG1lc3NhZ2VPYmoucmVwbHlDb3VudCA6IDA7XG4gICAgICAgIHJlcGx5Q291bnQgPSByZXBseUNvdW50ICsgMTtcbiAgICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIHtcbiAgICAgICAgICByZXBseUNvdW50OiByZXBseUNvdW50LFxuICAgICAgICB9KTtcblxuICAgICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZUxpc3RdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2VzID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFOlxuICAgICAgICBjYXNlIGVudW1zLk1FU1NBR0VfUkVDRUlWRUQ6IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgICAgICAgaWYgKG1lc3NhZ2UucGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlcGx5Q291bnQobWVzc2FnZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuXG4gICAgICAgICAgICB0aGlzLmFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9GRVRDSEVEOiB7XG4gICAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuT0xERVJfTUVTU0FHRVNfRkVUQ0hFRDoge1xuICAgICAgICAgIHRoaXMucmVhY2hlZFRvcE9mQ29udmVyc2F0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAvL05vIE5lZWQgZm9yIGJlbG93IGFjdGlvbnMgaWYgdGhlcmUgaXMgbm90aGluZyB0byBwcmVwZW5kXG4gICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PSAwKSBicmVhaztcblxuICAgICAgICAgIGxldCBwcmV2U2Nyb2xsSGVpZ2h0ID0gdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPVxuICAgICAgICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBwcmV2U2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0NPTVBPU0VEOiB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfQ09NUE9TRUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLk1FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgICAgICAgcGF5TG9hZDogbWVzc2FnZXMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5ORVdfQ09OVkVSU0FUSU9OX09QRU5FRDoge1xuICAgICAgICAgIHRoaXMucmVzZXRQYWdlKCk7XG4gICAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6IHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRCxcbiAgICAgICAgICAgIHBheUxvYWQ6IGRhdGEsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfTUVTU0FHRToge1xuICAgICAgICAgIHRoaXMuZGVsZXRlTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5FRElUX01FU1NBR0U6IHtcbiAgICAgICAgICB0aGlzLmVkaXRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVDoge1xuICAgICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChtZXNzYWdlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5BVURJT19DQUxMOlxuICAgICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuU0VORF9SRUFDVElPTjoge1xuICAgICAgICAgIHRoaXMudG9nZ2xlUmVhY3Rpb24odHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5TSE9XX1JFQUNUSU9OOiB7XG4gICAgICAgICAgdGhpcy5zaG93UmVhY3Rpb24obWVzc2FnZXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuU1RPUF9SRUFDVElPTjoge1xuICAgICAgICAgIHRoaXMudG9nZ2xlUmVhY3Rpb24oZmFsc2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQ0xFQVJfTUVTU0FHRV9UT19CRV9VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoZGF0YS5tZXNzYWdlLCBkYXRhLmtleSwgZGF0YS5ncm91cCwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5QT0xMX0NSRUFURUQ6IHtcbiAgICAgICAgICB0aGlzLmFwcGVuZFBvbGxNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlBPTExfQU5TV0VSRUQ6IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBvbGxNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkNBTExfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMuY2FsbFVwZGF0ZWQobWVzc2FnZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDpcbiAgICAgICAgY2FzZSBlbnVtcy5WSURFT19DQUxMOlxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgICBjYXNlIGVudW1zLk1FTlVfQ0xJQ0tFRDoge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlJFQUNUX1RPX01FU1NBR0U6XG4gICAgICAgICAgdGhpcy5yZWFjdFRvTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG1lc3NhZ2UgdG8gd2hpY2ggcmVhY3Rpb24gaGFzIHRvIGJlIHNldFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlYWN0VG9NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tZXNzYWdlVG9SZWFjdCA9IG1lc3NhZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBUaGUgY29tcG9uZW50IHRvIGluaXRpYWwgY29uZGl0aW9uc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlc2V0UGFnZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gICAgICB0aGlzLnJlcGx5UHJldmlldyA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNldCBNZXNzYWdlcyBEaXJlY3RseSAsIGNveiBuZXcgY29udmVyc2F0aW9uIGlzIG9wZW5lZCAsIGhlbmNlIG5vIG5lZWQgdG8gcHJlcGVuZCBvciBhcHBlbmRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgc2V0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG5cbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcHJlcGVuZCBGZXRjaGVkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzLCAuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIE1lc3NhZ2VzIHRoYXQgYXJlIHNlbnRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgYXBwZW5kTWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZHVtbXkgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4uZHVtbXksIC4uLm1lc3NhZ2VzXTtcblxuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgUG9sbCBNZXNzYWdlcyB0aGF0IGFyZSBzZW50XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGFwcGVuZFBvbGxNZXNzYWdlKG1lc3NhZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgUG9sbCBNZXNzYWdlcyBkZXBlbmRpbmcgb24gYW5zd2VyIGdpdmVuIGJ5IHVzZXJcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgdXBkYXRlUG9sbE1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UucG9sbC5pZDtcbiAgICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KChtLCBrKSA9PiBtLmlkID09PSBtZXNzYWdlSWQpO1xuICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlT2JqID0gbWVzc2FnZUxpc3RbbWVzc2FnZUtleV07XG5cbiAgICAgICAgY29uc3QgbWV0YWRhdGFPYmogPSB7XG4gICAgICAgICAgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBtZXNzYWdlLnBvbGwgfSB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG5ld01lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VPYmosIG1ldGFkYXRhOiBtZXRhZGF0YU9iaiB9O1xuXG4gICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChuZXdNZXNzYWdlT2JqKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHN0YXR1cyBvZiBtZXNzYWdlIGllLiByZWFkIG9yIGRlbGl2XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKG1lc3NhZ2VzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXNdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgZGVsZXRlTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XG4gICAgICBDb21ldENoYXQuZGVsZXRlTWVzc2FnZShtZXNzYWdlSWQpXG4gICAgICAgIC50aGVuKChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMoW2RlbGV0ZWRNZXNzYWdlXSk7XG5cbiAgICAgICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVELFxuICAgICAgICAgICAgdXBkYXRlVHlwZTogZW51bXMuREVMRVRFLFxuICAgICAgICAgICAgcGF5TG9hZDogW2RlbGV0ZWRNZXNzYWdlXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChtZXNzYWdlTGlzdC5sZW5ndGggLSBtZXNzYWdlS2V5ID09PSAxICYmICFtZXNzYWdlLnJlcGx5Q291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0RFTEVURSxcbiAgICAgICAgICAgICAgcGF5TG9hZDogW2RlbGV0ZWRNZXNzYWdlXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIk1lc3NhZ2UgZGVsZXRlIGZhaWxlZCB3aXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBUaGUgbWVzc2FnZSB0byBiZSBlZGl0ZWQgdG8gcGFzcyBpdCB0byB0aGUgbWVzc2FnZSBjb21wb3NlclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBlZGl0TWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbWVzc2FnZXM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBUaGUgTWVzc2FnZSBMaXN0IGFmdGVyIE1lc3NhZ2UgaGFzIGJlZW4gc3VjY2Vzc2Z1bGxseSBlZGl0ZWRcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlRWRpdGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG4gICAgICBpZiAobWVzc2FnZUtleSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSBtZXNzYWdlTGlzdFttZXNzYWdlS2V5XTtcblxuICAgICAgICBjb25zdCBuZXdNZXNzYWdlT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZU9iaiwgbWVzc2FnZSk7XG5cbiAgICAgICAgbWVzc2FnZUxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VMaXN0KTtcblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRCxcbiAgICAgICAgICB1cGRhdGVUeXBlOiBlbnVtcy5FRElULFxuICAgICAgICAgIHBheUxvYWQ6IFtuZXdNZXNzYWdlT2JqXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCAtIG1lc3NhZ2VLZXkgPT09IDEgJiYgIW1lc3NhZ2UucmVwbHlDb3VudCkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9FRElULFxuICAgICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VPYmpdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBtZXNzYWdlIGdldHMgZGVsZXRlZCBzdWNjZXNzZnVsbCAsIHJlbW92ZSB0aGUgZGVsZXRlZCBtZXNzYWdlIGluIGZyb250ZW5kIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICogQHBhcmFtIEFueSBtZXNzYWdlc1xuICAgKi9cbiAgcmVtb3ZlTWVzc2FnZXMgPSAobWVzc2FnZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZE1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VsaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VsaXN0LmZpbmRJbmRleChcbiAgICAgICAgKG1lc3NhZ2UpID0+IG1lc3NhZ2UuaWQgPT09IGRlbGV0ZWRNZXNzYWdlLmlkXG4gICAgICApO1xuICAgICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgICBsZXQgbWVzc2FnZU9iaiA9IHsgLi4ubWVzc2FnZWxpc3RbbWVzc2FnZUtleV0gfTtcbiAgICAgICAgbGV0IG5ld01lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlT2JqLCBkZWxldGVkTWVzc2FnZSk7XG5cbiAgICAgICAgbWVzc2FnZWxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZWxpc3RdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGV4dGVuc2lvbiBzbWFydFJlcGx5UHJldmlld1xuICAgKiBAcGFyYW0gbWVzc2FnZXNcbiAgICovXG4gIHNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcblxuICAgICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuTUVUQURBVEEpKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gbWVzc2FnZVtlbnVtcy5NRVRBREFUQV07XG4gICAgICAgIGlmIChtZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5JTkpFQ1RFRCkpIHtcbiAgICAgICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW2VudW1zLklOSkVDVEVEXTtcbiAgICAgICAgICBpZiAoaW5qZWN0ZWRPYmplY3QuaGFzT3duUHJvcGVydHkoZW51bXMuRVhURU5TSU9OUykpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtlbnVtcy5FWFRFTlNJT05TXTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLlNNQVJUX1JFUExZKSkge1xuICAgICAgICAgICAgICBjb25zdCBzbWFydFJlcGx5ID0gZXh0ZW5zaW9uc09iamVjdFtlbnVtcy5TTUFSVF9SRVBMWV07XG4gICAgICAgICAgICAgIGlmIChzbWFydFJlcGx5Lmhhc093blByb3BlcnR5KGVudW1zLkVSUk9SKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGx5UHJldmlldyA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcywgKHRoaXMucmVwbHlQcmV2aWV3ID0gbnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzY3JvbGwgb2Ygd2luZG93XG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBib3R0b20gPVxuICAgICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcblxuICAgICAgY29uc3QgdG9wID0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCA9PT0gMDtcblxuICAgICAgaWYgKHRvcCkge1xuICAgICAgICB0aGlzLnJlYWNoZWRUb3BPZkNvbnZlcnNhdGlvbiA9IHRvcDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xscyB0byBib3R0b20gb2YgY2hhdCB3aW5kb3dcbiAgICovXG4gIHNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCkge1xuICAgIHRyeSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cbiAgICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgUmVhY3Rpb24gLT4gdHJ1ZS9mYWxzZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHRvZ2dsZVJlYWN0aW9uKGZsYWcpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5saXZlUmVhY3Rpb24gPSBmbGFnO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBSZWFjdGlvbiBvbiByZWNlaXZpbmcgZW5kXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2hvd1JlYWN0aW9uKHJlYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghcmVhY3Rpb24uaGFzT3duUHJvcGVydHkoZW51bXMuTUVUQURBVEEpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlYWN0aW9uW2VudW1zLk1FVEFEQVRBXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICFyZWFjdGlvbltlbnVtcy5NRVRBREFUQV0uaGFzT3duUHJvcGVydHkoZW51bXMuVFlQRSkgfHxcbiAgICAgICAgIXJlYWN0aW9uW2VudW1zLk1FVEFEQVRBXS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5SRUFDVElPTilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFlbnVtcy5MSVZFX1JFQUNUSU9OUy5oYXNPd25Qcm9wZXJ0eShyZWFjdGlvbltlbnVtcy5NRVRBREFUQV0ucmVhY3Rpb24pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVhY3Rpb25bZW51bXMuTUVUQURBVEFdLnR5cGUgPT09IGVudW1zLkxJVkVfUkVBQ1RJT05fS0VZKSB7XG4gICAgICAgIHRoaXMucmVhY3Rpb25OYW1lID0gcmVhY3Rpb25bZW51bXMuTUVUQURBVEFdLnJlYWN0aW9uO1xuICAgICAgICB0aGlzLmxpdmVSZWFjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgY2FsbCBtZXNzYWdlXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBjYWxsVXBkYXRlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShbbWVzc2FnZV0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5cyBBdWRpbyBXaGVuIE1lc3NhZ2UgaXMgU2VudFxuICAgKi9cbiAgcGxheUF1ZGlvKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICAgIGF1ZGlvLnNyYyA9IElOQ09NSU5HX01FU1NBR0VfU09VTkQ7XG4gICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIEFjdGlvbiBJbmRpY2F0aW5nIHRoYXQgR3JvdXAgRGF0YSBoYXMgYmVlbiB1cGRhdGVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ3JvdXBVcGRhdGVkID0gKG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKFttZXNzYWdlXSk7XG5cbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5HUk9VUF9VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiB7IG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==