/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-messages/cometchat-messages/cometchat-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { INCOMING_MESSAGE_SOUND } from "../../../resources/audio/incomingMessageSound";
import * as enums from "../../../utils/enums";
export class CometchatMessagesComponent {
    constructor() {
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
            this.appendMessage([message]);
            this.actionGenerated.emit({
                type: enums.GROUP_UPDATED,
                payLoad: { message, key, group, options },
            });
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
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
            let prevProps = { callMessage: null };
            /** @type {?} */
            let props = { callMessage: null };
            prevProps["callMessage"] = change["callMessage"].previousValue;
            props["callMessage"] = change["callMessage"].currentValue;
            if (prevProps.callMessage !== props.callMessage && props.callMessage) {
                this.actionHandler({
                    type: enums.CALL_UPDATED,
                    payLoad: change["callMessage"].currentValue,
                });
            }
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
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
        //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
        // action.payLoad has the array of messages that is received
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
                    // Implement while doing the threaded message feature
                    this.updateReplyCount(messages);
                }
                else {
                    // Smart Reply Feature
                    this.smartReplyPreview(messages);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.scrollToBottomOfChatWindow();
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
                let prevScrollHeight = this.chatWindow.nativeElement.scrollHeight;
                this.prependMessages(messages);
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.chatWindow.nativeElement.scrollTop =
                        this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
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
    }
    /**
     * Sets the message to which reaction has to be set
     * @param {?} message
     * @return {?}
     */
    reactToMessage(message) {
        this.messageToReact = message;
    }
    /**
     * Resets The component to initial conditions
     * @return {?}
     */
    resetPage() {
        this.messageToBeEdited = null;
        this.replyPreview = null;
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
     * append Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    appendMessage(messages) {
        /** @type {?} */
        let dummy = [...this.messageList];
        this.messageList = [...dummy, ...messages];
        this.scrollToBottomOfChatWindow();
    }
    /**
     * append Poll Messages that are sent
     * @param {?} messages
     * @return {?}
     */
    appendPollMessage(messages) {
        this.appendMessage(messages);
    }
    /**
     * updates Poll Messages depending on answer given by user
     * @param {?} message
     * @return {?}
     */
    updatePollMessage(message) {
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
            // messageList.splice(messageKey, 1, newMessageObj);
            this.messageEdited(newMessageObj);
        }
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
     * @return {?}
     */
    scrollToBottomOfChatWindow() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.chatWindow.nativeElement.scrollTop =
                this.chatWindow.nativeElement.scrollHeight -
                    this.chatWindow.nativeElement.clientHeight;
            // this.scrollVariable =
            //   this.chatWindow.nativeElement.scrollHeight -
            //   this.chatWindow.nativeElement.clientHeight;
        }));
    }
    /**
     * Toggle Reaction -> true/false
     * @param {?} flag
     * @return {?}
     */
    toggleReaction(flag) {
        this.liveReaction = flag;
    }
    /**
     * Shows Reaction on receiving end
     * @param {?} reaction
     * @return {?}
     */
    showReaction(reaction) {
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
    }
    /**
     * @param {?} message
     * @return {?}
     */
    callUpdated(message) {
        this.appendMessage([message]);
    }
    /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    playAudio() {
        /** @type {?} */
        let audio = new Audio();
        audio.src = INCOMING_MESSAGE_SOUND;
        audio.play();
    }
}
CometchatMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-messages",
                template: "<div class=\"chatWrapperStyle\">\n  <!-- Add the Action To header to make it Dynamic -->\n  <cometchat-message-header\n    [item]=\"item\"\n    [type]=\"type\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-header>\n  <div\n    class=\"messageWindowStyle\"\n    (scroll)=\"handleScroll($event)\"\n    #messageWindow\n  >\n    <cometchat-message-list\n      [item]=\"item\"\n      [type]=\"type\"\n      [messages]=\"messageList\"\n      [reachedTopOfConversation]=\"reachedTopOfConversation\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-list>\n  </div>\n  <cometchat-live-reactions\n    [reactionName]=\"reactionName\"\n    *ngIf=\"liveReaction\"\n  ></cometchat-live-reactions>\n  <cometchat-message-composer\n    [item]=\"item\"\n    [type]=\"type\"\n    [replyPreview]=\"replyPreview\"\n    [messageToBeEdited]=\"messageToBeEdited\"\n    [messageToReact]=\"messageToReact\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-composer>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.chatWrapperStyle{display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;position:relative}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.messageWindowStyle{padding:20px;height:101vh;overflow:hidden;overflow-y:scroll}"]
            }] }
];
/** @nocollapse */
CometchatMessagesComponent.ctorParameters = () => [];
CometchatMessagesComponent.propDecorators = {
    chatWindow: [{ type: ViewChild, args: ["messageWindow", null,] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    composedthreadmessage: [{ type: Input }],
    groupMessage: [{ type: Input }],
    callMessage: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZXMvY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsR0FHWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDdkYsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQU05QyxNQUFNLE9BQU8sMEJBQTBCO0lBdUJyQztRQXBCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVsQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFFbkIsaUJBQVksR0FBRyxPQUFPLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7Ozs7O1FBdVR0QixtQkFBYzs7OztRQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDNUIscUNBQXFDO1lBRXJDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLG9DQUFvQztRQUN0QyxDQUFDLEVBQUM7Ozs7O1FBTUYsa0JBQWE7Ozs7UUFBRyxDQUFDLE9BQU8sRUFBRSxFQUFFOztrQkFDcEIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxFQUFFO1lBQzVCLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2lCQUMvQixJQUFJOzs7O1lBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7O3NCQUVoQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O29CQUNyQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBQztnQkFFbEUsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLFVBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjO3dCQUMxQixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7cUJBQzFCLENBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDOzs7OztRQXNDRixtQkFBYzs7OztRQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7O2tCQUN0QixjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQzs7a0JBQzVCLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Z0JBRXJDLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUzs7OztZQUNwQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUMsRUFBRSxFQUM5QztZQUNELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFOztvQkFDZixVQUFVLHFCQUFRLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBRTs7b0JBQzNDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDO2dCQUVqRSxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pELHNFQUFzRTtnQkFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUM7Ozs7O1FBc0dGLGlCQUFZOzs7Ozs7O1FBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxhQUFhO2dCQUN6QixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7YUFDMUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDO0lBcmZhLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQ25DLHdFQUF3RTtZQUN4RSxJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNsRTtTQUNGO1FBRUQsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7UUFFRCxrREFBa0Q7UUFDbEQsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUU7O2dCQUNyQixTQUFTLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOztnQkFDakMsS0FBSyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtZQUVqQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMvRCxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUUxRCxJQUFJLFNBQVMsQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUNwRSxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUNqQixJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVk7b0JBQ3hCLE9BQU8sRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWTtpQkFDNUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRLEtBQUksQ0FBQzs7Ozs7O0lBTWIsZ0JBQWdCLENBQUMsUUFBUTs7Y0FDakIsZUFBZSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBRS9CLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7WUFDbkMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQ3BDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxlQUFlLEVBQ2hEO1FBQ0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O2tCQUNiLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDOztnQkFDdEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsVUFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7O2tCQUN0QixhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFO2dCQUNsRCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO1lBRUYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsMkZBQTJGOzs7O1lBR3ZGLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTzs7WUFFekIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBRXpCLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNsQyxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztzQkFDckIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtvQkFDM0IscURBQXFEO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNMLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVqQyxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUNkLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO29CQUNwQyxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7b0JBRVQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUI7Z0JBRUQsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRWpCLE1BQU07YUFDUDtZQUVELEtBQUssS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO2dCQUV0QywwREFBMEQ7Z0JBQzFELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUFFLE1BQU07O29CQUU1QixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZO2dCQUVqRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUvQixVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVM7d0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztvQkFDaEUsd0JBQXdCO29CQUN4QixtRUFBbUU7Z0JBQ3JFLENBQUMsRUFBQyxDQUFDO2dCQUVILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtvQkFDNUIsT0FBTyxFQUFFLFFBQVE7aUJBQ2xCLENBQUMsQ0FBQztnQkFDSCxNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsaUJBQWlCO29CQUM3QixPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0IsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsbUJBQW1CO29CQUMvQixPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLDZCQUE2QjtvQkFDekMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0IsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN0QixLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDdEIsS0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDOUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07YUFDUDtZQUVELEtBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxhQUFhO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEUsTUFBTTtZQUNSLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3RCLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN0QixLQUFLLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDdkIsS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07U0FDVDtJQUNILENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxPQUFPO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBTUQsU0FBUztRQUNQLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBTUQsV0FBVyxDQUFDLFFBQVE7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBTUQsZUFBZSxDQUFDLFFBQVE7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxRQUFROztZQUNoQixLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsUUFBUTtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQU1ELGlCQUFpQixDQUFDLE9BQU87O2NBQ2pCLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Y0FDbkMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDN0IsVUFBVSxHQUFHLFdBQVcsQ0FBQyxTQUFTOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUM7UUFDcEUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O2tCQUNiLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDOztrQkFFcEMsV0FBVyxHQUFHO2dCQUNsQixXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFO2FBQ3JEOztrQkFFSyxhQUFhLHFCQUFRLFVBQVUsSUFBRSxRQUFRLEVBQUUsV0FBVyxHQUFFO1lBRTlELG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7Ozs7O0lBMENELFdBQVcsQ0FBQyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE9BQU87O2NBQ2IsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOztZQUNyQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFDO1FBQ2xFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFOztrQkFDYixVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQzs7a0JBRXBDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO1lBRTVELFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWpDLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWTtvQkFDeEIsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUN6QixDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUF1QkQsaUJBQWlCLENBQUMsUUFBUTs7Y0FDbEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQkFDaEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRO1lBQ2pDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTs7c0JBQ2xDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUM1QyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7OzBCQUN6QyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTs7OEJBQzVDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7d0JBQ2xELElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7NEJBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO3lCQUM3Qjs2QkFBTTs0QkFDTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO3lCQUNsQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxDQUFDOztjQUNOLE1BQU0sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7O2NBRXBDLEdBQUcsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxDQUFDO1FBRTNDLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7SUFFRCwwQkFBMEI7UUFDeEIsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUztnQkFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWTtvQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBRTdDLHdCQUF3QjtZQUN4QixpREFBaUQ7WUFDakQsZ0RBQWdEO1FBQ2xELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsY0FBYyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBTUQsWUFBWSxDQUFDLFFBQVE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQ0UsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDekMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDN0M7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFPO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBS0QsU0FBUzs7WUFDSCxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDdkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQztRQUNuQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDOzs7WUFwZ0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixnaENBQWtEOzthQUVuRDs7Ozs7eUJBRUUsU0FBUyxTQUFDLGVBQWUsRUFBRSxJQUFJO21CQUUvQixLQUFLO21CQUNMLEtBQUs7b0NBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBRUwsTUFBTTs7OztJQVJQLGdEQUF5RDs7SUFFekQsMENBQXFCOztJQUNyQiwwQ0FBcUI7O0lBQ3JCLDJEQUFzQzs7SUFDdEMsa0RBQTZCOztJQUM3QixpREFBNEI7O0lBRTVCLHFEQUFrRTs7SUFFbEUsaURBQWlCOztJQUNqQixvREFBcUI7O0lBQ3JCLHVEQUF5Qjs7SUFDekIsa0RBQW9COztJQUNwQixrREFBcUI7O0lBQ3JCLGtEQUFpQjs7SUFDakIsOERBQWlDOztJQUNqQyxvREFBbUI7O0lBRW5CLGtEQUF1Qjs7SUFDdkIsb0RBQXNCOzs7Ozs7SUF1VHRCLG9EQUtFOzs7Ozs7SUFNRixtREFtQkU7Ozs7OztJQXNDRixvREFlRTs7Ozs7O0lBc0dGLGtEQU9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHsgSU5DT01JTkdfTUVTU0FHRV9TT1VORCB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvYXVkaW8vaW5jb21pbmdNZXNzYWdlU291bmRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1tZXNzYWdlc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlcy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKFwibWVzc2FnZVdpbmRvd1wiLCBudWxsKSBjaGF0V2luZG93OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBNZXNzYWdlID0gbnVsbDtcbiAgQElucHV0KCkgY2FsbE1lc3NhZ2UgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VMaXN0ID0gW107XG4gIHNjcm9sbFRvQm90dG9tOiB0cnVlO1xuICBtZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gIHJlcGx5UHJldmlldyA9IG51bGw7XG4gIGxpdmVSZWFjdGlvbiA9IGZhbHNlO1xuICBjaGFuZ2VOdW1iZXIgPSAwO1xuICByZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBmYWxzZTtcbiAgc2Nyb2xsVmFyaWFibGUgPSAwO1xuXG4gIHJlYWN0aW9uTmFtZSA9IFwiaGVhcnRcIjtcbiAgbWVzc2FnZVRvUmVhY3QgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiY29tcG9zZWR0aHJlYWRtZXNzYWdlXCJdKSB7XG4gICAgICAvLyBUaGVyZSBpcyBhIHZhbGlkIFRocmVhZCBwYXJlbnQgbWVzc2FnZSAsIHRoYW4gdXBkYXRlIGl0J3MgcmVwbHkgY291bnRcbiAgICAgIGlmIChjaGFuZ2VbXCJjb21wb3NlZHRocmVhZG1lc3NhZ2VcIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUVkaXRlZChjaGFuZ2VbXCJjb21wb3NlZHRocmVhZG1lc3NhZ2VcIl0uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBNZXNzYWdlXCJdKSB7XG4gICAgICBpZiAoY2hhbmdlW1wiZ3JvdXBNZXNzYWdlXCJdLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kTWVzc2FnZShjaGFuZ2VbXCJncm91cE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIFRoZXJlIGlzIGNhbGwgZGlzcGxheSBwcm9wZXIgY2FsbCBtZXNzYWdlc1xuICAgIGlmIChjaGFuZ2VbXCJjYWxsTWVzc2FnZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgY2FsbE1lc3NhZ2U6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgY2FsbE1lc3NhZ2U6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiY2FsbE1lc3NhZ2VcIl0gPSBjaGFuZ2VbXCJjYWxsTWVzc2FnZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJjYWxsTWVzc2FnZVwiXSA9IGNoYW5nZVtcImNhbGxNZXNzYWdlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKHByZXZQcm9wcy5jYWxsTWVzc2FnZSAhPT0gcHJvcHMuY2FsbE1lc3NhZ2UgJiYgcHJvcHMuY2FsbE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyKHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX1VQREFURUQsXG4gICAgICAgICAgcGF5TG9hZDogY2hhbmdlW1wiY2FsbE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0aW5nIHRoZSByZXBseSBjb3VudCBvZiBUaHJlYWQgUGFyZW50IE1lc3NhZ2VcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB1cGRhdGVSZXBseUNvdW50KG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgcmVjZWl2ZWRNZXNzYWdlID0gbWVzc2FnZXNbMF07XG5cbiAgICBsZXQgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoXG4gICAgICAobSkgPT4gbS5pZCA9PT0gcmVjZWl2ZWRNZXNzYWdlLnBhcmVudE1lc3NhZ2VJZFxuICAgICk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IG1lc3NhZ2VMaXN0W21lc3NhZ2VLZXldO1xuICAgICAgbGV0IHJlcGx5Q291bnQgPSBtZXNzYWdlT2JqLnJlcGx5Q291bnQgPyBtZXNzYWdlT2JqLnJlcGx5Q291bnQgOiAwO1xuICAgICAgcmVwbHlDb3VudCA9IHJlcGx5Q291bnQgKyAxO1xuICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIHtcbiAgICAgICAgcmVwbHlDb3VudDogcmVwbHlDb3VudCxcbiAgICAgIH0pO1xuXG4gICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VMaXN0XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgLy9oYW5kbGUgRXZlbnRzL0FjdGlvbnMgZ2VuZXJhdGVkIGZyb20gTWVzc2FnZUhlYWRlciAsIE1lc3NhZ2VDb21wb3NlciBhbmQgTWVzc2FnZUxpc3QgSGVyZVxuXG4gICAgLy8gYWN0aW9uLnBheUxvYWQgaGFzIHRoZSBhcnJheSBvZiBtZXNzYWdlcyB0aGF0IGlzIHJlY2VpdmVkXG4gICAgbGV0IG1lc3NhZ2VzID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1JFQ0VJVkVEOiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1swXTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgICAgLy8gSW1wbGVtZW50IHdoaWxlIGRvaW5nIHRoZSB0aHJlYWRlZCBtZXNzYWdlIGZlYXR1cmVcbiAgICAgICAgICB0aGlzLnVwZGF0ZVJlcGx5Q291bnQobWVzc2FnZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNtYXJ0IFJlcGx5IEZlYXR1cmVcbiAgICAgICAgICB0aGlzLnNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICAgICAgICAgIH0sIDI1MDApO1xuXG4gICAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcGxheSBtZXNzYWdlIHJlY2VpdmVkIGF1ZGlvXG4gICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9GRVRDSEVEOiB7XG4gICAgICAgIHRoaXMucHJlcGVuZE1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk9MREVSX01FU1NBR0VTX0ZFVENIRUQ6IHtcbiAgICAgICAgdGhpcy5yZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSBmYWxzZTtcblxuICAgICAgICAvL05vIE5lZWQgZm9yIGJlbG93IGFjdGlvbnMgaWYgdGhlcmUgaXMgbm90aGluZyB0byBwcmVwZW5kXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT0gMCkgYnJlYWs7XG5cbiAgICAgICAgbGV0IHByZXZTY3JvbGxIZWlnaHQgPSB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5wcmVwZW5kTWVzc2FnZXMobWVzc2FnZXMpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hhdFdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9XG4gICAgICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBwcmV2U2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIC8vIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgIC8vICAgdGhpcy5jaGF0V2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gcHJldlNjcm9sbEhlaWdodDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfQ09NUE9TRUQ6IHtcbiAgICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9DT01QT1NFRCxcbiAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRToge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRSxcbiAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ORVdfQ09OVkVSU0FUSU9OX09QRU5FRDoge1xuICAgICAgICB0aGlzLnJlc2V0UGFnZSgpO1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDoge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFELFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVELFxuICAgICAgICAgIHBheUxvYWQ6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuREVMRVRFX01FU1NBR0U6IHtcbiAgICAgICAgdGhpcy5kZWxldGVNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkVESVRfTUVTU0FHRToge1xuICAgICAgICB0aGlzLmVkaXRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVDoge1xuICAgICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICBjYXNlIGVudW1zLk1FTlVfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5TRU5EX1JFQUNUSU9OOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlUmVhY3Rpb24odHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5TSE9XX1JFQUNUSU9OOiB7XG4gICAgICAgIHRoaXMuc2hvd1JlYWN0aW9uKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlNUT1BfUkVBQ1RJT046IHtcbiAgICAgICAgdGhpcy50b2dnbGVSZWFjdGlvbihmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DTEVBUl9NRVNTQUdFX1RPX0JFX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFOiB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZXMobWVzc2FnZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfVVBEQVRFRDpcbiAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoZGF0YS5tZXNzYWdlLCBkYXRhLmtleSwgZGF0YS5ncm91cCwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlBPTExfQ1JFQVRFRDoge1xuICAgICAgICB0aGlzLmFwcGVuZFBvbGxNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlBPTExfQU5TV0VSRUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVQb2xsTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DQUxMX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy5jYWxsVXBkYXRlZChtZXNzYWdlcyk7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6XG4gICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVBQ1RfVE9fTUVTU0FHRTpcbiAgICAgICAgdGhpcy5yZWFjdFRvTWVzc2FnZShtZXNzYWdlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBtZXNzYWdlIHRvIHdoaWNoIHJlYWN0aW9uIGhhcyB0byBiZSBzZXRcbiAgICogQHBhcmFtXG4gICAqL1xuICByZWFjdFRvTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlVG9SZWFjdCA9IG1lc3NhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIFRoZSBjb21wb25lbnQgdG8gaW5pdGlhbCBjb25kaXRpb25zXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVzZXRQYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZVRvQmVFZGl0ZWQgPSBudWxsO1xuICAgIHRoaXMucmVwbHlQcmV2aWV3ID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgTWVzc2FnZXMgRGlyZWN0bHkgLCBjb3ogbmV3IGNvbnZlcnNhdGlvbiBpcyBvcGVuZWQgLCBoZW5jZSBubyBuZWVkIHRvIHByZXBlbmQgb3IgYXBwZW5kXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHNldE1lc3NhZ2VzKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlc107XG5cbiAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH1cblxuICAvKipcbiAgICogcHJlcGVuZCBGZXRjaGVkIE1lc3NhZ2VzXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIHByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXMsIC4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCBNZXNzYWdlcyB0aGF0IGFyZSBzZW50XG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZXNcbiAgICovXG4gIGFwcGVuZE1lc3NhZ2UobWVzc2FnZXMpIHtcbiAgICBsZXQgZHVtbXkgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gWy4uLmR1bW15LCAuLi5tZXNzYWdlc107XG5cbiAgICB0aGlzLnNjcm9sbFRvQm90dG9tT2ZDaGF0V2luZG93KCk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIFBvbGwgTWVzc2FnZXMgdGhhdCBhcmUgc2VudFxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBhcHBlbmRQb2xsTWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRoaXMuYXBwZW5kTWVzc2FnZShtZXNzYWdlcyk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlcyBQb2xsIE1lc3NhZ2VzIGRlcGVuZGluZyBvbiBhbnN3ZXIgZ2l2ZW4gYnkgdXNlclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICB1cGRhdGVQb2xsTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgY29uc3QgbWVzc2FnZUlkID0gbWVzc2FnZS5wb2xsLmlkO1xuICAgIGxldCBtZXNzYWdlS2V5ID0gbWVzc2FnZUxpc3QuZmluZEluZGV4KChtLCBrKSA9PiBtLmlkID09PSBtZXNzYWdlSWQpO1xuICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSBtZXNzYWdlTGlzdFttZXNzYWdlS2V5XTtcblxuICAgICAgY29uc3QgbWV0YWRhdGFPYmogPSB7XG4gICAgICAgIFwiQGluamVjdGVkXCI6IHsgZXh0ZW5zaW9uczogeyBwb2xsczogbWVzc2FnZS5wb2xsIH0gfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG5ld01lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VPYmosIG1ldGFkYXRhOiBtZXRhZGF0YU9iaiB9O1xuXG4gICAgICAvLyBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLm1lc3NhZ2VFZGl0ZWQobmV3TWVzc2FnZU9iaik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzdGF0dXMgb2YgbWVzc2FnZSBpZS4gcmVhZCBvciBkZWxpdlxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICB1cGRhdGVNZXNzYWdlcyA9IChtZXNzYWdlcykgPT4ge1xuICAgIC8vIGxldCBkdW1teSA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXNdO1xuICAgIC8vdGhpcy5zY3JvbGxUb0JvdHRvbU9mQ2hhdFdpbmRvdygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGUgdGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICBkZWxldGVNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBtZXNzYWdlLmlkO1xuICAgIENvbWV0Q2hhdC5kZWxldGVNZXNzYWdlKG1lc3NhZ2VJZClcbiAgICAgIC50aGVuKChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VzKFtkZWxldGVkTWVzc2FnZV0pO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICAgICAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VMaXN0LmZpbmRJbmRleCgobSkgPT4gbS5pZCA9PT0gbWVzc2FnZS5pZCk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCAtIG1lc3NhZ2VLZXkgPT09IDEgJiYgIW1lc3NhZ2UucmVwbHlDb3VudCkge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9ERUxFVEUsXG4gICAgICAgICAgICBwYXlMb2FkOiBbZGVsZXRlZE1lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZGVsZXRlIGZhaWxlZCB3aXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBUaGUgbWVzc2FnZSB0byBiZSBlZGl0ZWQgdG8gcGFzcyBpdCB0byB0aGUgbWVzc2FnZSBjb21wb3NlclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICBlZGl0TWVzc2FnZShtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZVRvQmVFZGl0ZWQgPSBtZXNzYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgVGhlIE1lc3NhZ2UgTGlzdCBhZnRlciBNZXNzYWdlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxsbHkgZWRpdGVkXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZUVkaXRlZChtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgbGV0IG1lc3NhZ2VLZXkgPSBtZXNzYWdlTGlzdC5maW5kSW5kZXgoKG0pID0+IG0uaWQgPT09IG1lc3NhZ2UuaWQpO1xuICAgIGlmIChtZXNzYWdlS2V5ID4gLTEpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSBtZXNzYWdlTGlzdFttZXNzYWdlS2V5XTtcblxuICAgICAgY29uc3QgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIG1lc3NhZ2UpO1xuXG4gICAgICBtZXNzYWdlTGlzdC5zcGxpY2UobWVzc2FnZUtleSwgMSwgbmV3TWVzc2FnZU9iaik7XG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKG1lc3NhZ2VMaXN0KTtcblxuICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCAtIG1lc3NhZ2VLZXkgPT09IDEgJiYgIW1lc3NhZ2UucmVwbHlDb3VudCkge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0VESVQsXG4gICAgICAgICAgcGF5TG9hZDogW25ld01lc3NhZ2VPYmpdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIG1lc3NhZ2UgZ2V0cyBkZWxldGVkIHN1Y2Nlc3NmdWxsICwgcmVtb3ZlIHRoZSBkZWxldGVkIG1lc3NhZ2UgaW4gZnJvbnRlbmQgdXNpbmcgdGhpcyBmdW5jdGlvblxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VzXG4gICAqL1xuICByZW1vdmVNZXNzYWdlcyA9IChtZXNzYWdlcykgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZWRNZXNzYWdlID0gbWVzc2FnZXNbMF07XG4gICAgY29uc3QgbWVzc2FnZWxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG5cbiAgICBsZXQgbWVzc2FnZUtleSA9IG1lc3NhZ2VsaXN0LmZpbmRJbmRleChcbiAgICAgIChtZXNzYWdlKSA9PiBtZXNzYWdlLmlkID09PSBkZWxldGVkTWVzc2FnZS5pZFxuICAgICk7XG4gICAgaWYgKG1lc3NhZ2VLZXkgPiAtMSkge1xuICAgICAgbGV0IG1lc3NhZ2VPYmogPSB7IC4uLm1lc3NhZ2VsaXN0W21lc3NhZ2VLZXldIH07XG4gICAgICBsZXQgbmV3TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2VPYmosIGRlbGV0ZWRNZXNzYWdlKTtcblxuICAgICAgbWVzc2FnZWxpc3Quc3BsaWNlKG1lc3NhZ2VLZXksIDEsIG5ld01lc3NhZ2VPYmopO1xuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2VMaXN0OiBtZXNzYWdlbGlzdCwgc2Nyb2xsVG9Cb3R0b206IGZhbHNlIH0pO1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IFsuLi5tZXNzYWdlbGlzdF07XG4gICAgfVxuICB9O1xuXG4gIHNtYXJ0UmVwbHlQcmV2aWV3KG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzWzBdO1xuXG4gICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBtZXNzYWdlLm1ldGFkYXRhO1xuICAgICAgaWYgKG1ldGFkYXRhLmhhc093blByb3BlcnR5KFwiQGluamVjdGVkXCIpKSB7XG4gICAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgICAgIGlmIChpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICAgIGlmIChleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwic21hcnQtcmVwbHlcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHNtYXJ0UmVwbHkgPSBleHRlbnNpb25zT2JqZWN0W1wic21hcnQtcmVwbHlcIl07XG4gICAgICAgICAgICBpZiAoc21hcnRSZXBseS5oYXNPd25Qcm9wZXJ0eShcImVycm9yXCIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlcGx5UHJldmlldyA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLCAodGhpcy5yZXBseVByZXZpZXcgPSBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG5cbiAgICBjb25zdCB0b3AgPSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wID09PSAwO1xuXG4gICAgaWYgKHRvcCkge1xuICAgICAgdGhpcy5yZWFjaGVkVG9wT2ZDb252ZXJzYXRpb24gPSB0b3A7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9Cb3R0b21PZkNoYXRXaW5kb3coKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPVxuICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgIC8vIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgLy8gICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgLy8gICB0aGlzLmNoYXRXaW5kb3cubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIFJlYWN0aW9uIC0+IHRydWUvZmFsc2VcbiAgICogQHBhcmFtXG4gICAqL1xuICB0b2dnbGVSZWFjdGlvbihmbGFnKSB7XG4gICAgdGhpcy5saXZlUmVhY3Rpb24gPSBmbGFnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIFJlYWN0aW9uIG9uIHJlY2VpdmluZyBlbmRcbiAgICogQHBhcmFtXG4gICAqL1xuICBzaG93UmVhY3Rpb24ocmVhY3Rpb24pIHtcbiAgICBpZiAoIXJlYWN0aW9uLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocmVhY3Rpb24ubWV0YWRhdGEgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXJlYWN0aW9uLm1ldGFkYXRhLmhhc093blByb3BlcnR5KFwidHlwZVwiKSB8fFxuICAgICAgIXJlYWN0aW9uLm1ldGFkYXRhLmhhc093blByb3BlcnR5KFwicmVhY3Rpb25cIilcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFlbnVtcy5MSVZFX1JFQUNUSU9OUy5oYXNPd25Qcm9wZXJ0eShyZWFjdGlvbi5tZXRhZGF0YS5yZWFjdGlvbikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocmVhY3Rpb24ubWV0YWRhdGEudHlwZSA9PT0gZW51bXMuTElWRV9SRUFDVElPTl9LRVkpIHtcbiAgICAgIHRoaXMucmVhY3Rpb25OYW1lID0gcmVhY3Rpb24ubWV0YWRhdGEucmVhY3Rpb247XG4gICAgICB0aGlzLmxpdmVSZWFjdGlvbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2FsbFVwZGF0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMuYXBwZW5kTWVzc2FnZShbbWVzc2FnZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIFdoZW4gTWVzc2FnZSBpcyBTZW50XG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgYXVkaW8uc3JjID0gSU5DT01JTkdfTUVTU0FHRV9TT1VORDtcbiAgICBhdWRpby5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYW4gQWN0aW9uIEluZGljYXRpbmcgdGhhdCBHcm91cCBEYXRhIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAobWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHRoaXMuYXBwZW5kTWVzc2FnZShbbWVzc2FnZV0pO1xuXG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5HUk9VUF9VUERBVEVELFxuICAgICAgcGF5TG9hZDogeyBtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zIH0sXG4gICAgfSk7XG4gIH07XG59XG4iXX0=