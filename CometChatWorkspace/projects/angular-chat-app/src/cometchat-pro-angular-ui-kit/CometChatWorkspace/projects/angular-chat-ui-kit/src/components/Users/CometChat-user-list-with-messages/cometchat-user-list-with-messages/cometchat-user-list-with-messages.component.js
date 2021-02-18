/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/CometChat-user-list-with-messages/cometchat-user-list-with-messages/cometchat-user-list-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../../utils/controller";
import * as enums from "../../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
export class CometChatUserListWithMessagesComponent {
    constructor() {
        //It can be a user or a group
        this.curentItem = null;
        // Defines the types of item that was clicked --> that is .. if its a user or a group
        this.type = null;
        this.threadMessageView = false;
        this.threadMessageParent = null;
        this.threadMessageItem = null;
        this.threadMessageType = "";
        this.composedThreadMessage = null;
        this.viewDetailScreen = false;
        // To display image in full screen
        this.imageView = null;
        //If clicked then only show image in full screen
        this.fullScreenViewImage = false;
        //for audio calling
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = null;
        this.callInitialised = false;
        this.checkIfAnimated = false;
        /**
         * Updates the thread message , it the currently open thread parent is deleted or is edited
         */
        this.updateThreadMessage = (/**
         * @param {?} message
         * @param {?} action
         * @return {?}
         */
        (message, action) => {
            try {
                if (this.threadMessageView === false) {
                    return false;
                }
                if (action === enums.DELETE) {
                    this.threadMessageParent = Object.assign({}, message);
                    this.threadMessageView = false;
                }
                else {
                    this.threadMessageParent = Object.assign({}, message);
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Opens User Detail Right Side bar
         * @param Any message
         */
        this.toggleDetailView = (/**
         * @return {?}
         */
        () => {
            try {
                this.threadMessageView = false;
                this.viewDetailScreen = !this.viewDetailScreen;
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * initiates an video call with the person you are chatting with
         */
        this.videoCall = (/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                let receiverId;
                /** @type {?} */
                let receiverType;
                if (this.type === CometChat.RECEIVER_TYPE.USER) {
                    receiverId = this.curentItem.uid;
                    receiverType = CometChat.RECEIVER_TYPE.USER;
                }
                else if (this.type === CometChat.RECEIVER_TYPE.GROUP) {
                    receiverId = this.curentItem.guid;
                    receiverType = CometChat.RECEIVER_TYPE.GROUP;
                }
                CometChatManager.call(receiverId, receiverType, CometChat.CALL_TYPE.VIDEO)
                    .then((/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.appendCallMessage(call);
                    this.outgoingCall = call;
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("Call initialization failed with exception:", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.onResize();
            CometChat.getLoggedinUser().then((/**
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
     * Checks when window size is changed in realtime
     * @return {?}
     */
    onResize() {
        try {
            this.innerWidth = window.innerWidth;
            if (this.innerWidth >= enums.BREAKPOINT_MIN_WIDTH &&
                this.innerWidth <= enums.BREAKPOINT_MAX_WIDTH) {
                if (this.checkIfAnimated === true) {
                    return false;
                }
                this.checkAnimatedState = "normal";
                this.checkIfAnimated = true;
            }
            else {
                this.checkAnimatedState = null;
                this.checkIfAnimated = false;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listen to the user emitted by the userList component
     * @param {?} user
     * @return {?}
     */
    userClicked(user) {
        try {
            if (this.checkAnimatedState !== null) {
                this.checkAnimatedState == "normal"
                    ? (this.checkAnimatedState = "animated")
                    : (this.checkAnimatedState = "normal");
            }
            this.curentItem = user;
            this.item = this.curentItem;
            this.viewDetailScreen = false;
            if (this.curentItem.hasOwnProperty(enums.UID)) {
                this.type = CometChat.RECEIVER_TYPE.USER;
            }
            else {
                this.type = CometChat.RECEIVER_TYPE.GROUP;
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
            let message = action.payLoad;
            switch (action.type) {
                case enums.VIEW_MESSAGE_THREAD: {
                    this.viewMessageThread(message);
                    break;
                }
                case enums.THREAD_PARENT_MESSAGE_UPDATED: {
                    this.updateThreadMessage(action.payLoad[0], action.updateType);
                    break;
                }
                case enums.CLOSE_THREAD_CLICKED: {
                    this.closeThreadMessages();
                    break;
                }
                case enums.VIEW_ACTUAL_IMAGE: {
                    this.toggleImageView(action.payLoad);
                    break;
                }
                case enums.CLOSE_FULL_SCREEN_IMAGE: {
                    this.toggleImageView(null);
                    break;
                }
                case enums.VIEW_DETAIL:
                case enums.CLOSE_DETAIL_CLICKED: {
                    this.toggleDetailView();
                    break;
                }
                case enums.CHANGE_THREAD_PARENT_MESSAGE_REPLY_COUNT: {
                    this.composedThreadMessage = Object.assign({}, this.threadMessageParent, { replyCount: action.payLoad });
                    break;
                }
                case enums.MENU_CLICKED: {
                    this.checkAnimatedState = "normal";
                    this.curentItem = null;
                    break;
                }
                case enums.BLOCK_USER: {
                    this.blockUser();
                    break;
                }
                case enums.UNBLOCK_USER:
                    this.unblockUser();
                    break;
                case enums.AUDIO_CALL: {
                    this.audioCall();
                    break;
                }
                case enums.VIDEO_CALL:
                    this.videoCall();
                    break;
                case enums.OUT_GOING_CALL_REJECTED:
                case enums.OUTGOING_CALL_REJECTED:
                case enums.OUTGOING_CALL_CANCELLED:
                case enums.CALL_ENDED_BY_USER:
                case enums.CALL_ENDED: {
                    this.outgoingCallEnded(message);
                    break;
                }
                case enums.USER_JOINED_CALL:
                case enums.USER_LEFT_CALL: {
                    //this.appendCallMessage(item);
                    break;
                }
                case enums.ACCEPT_INCOMING_CALL: {
                    this.acceptIncomingCall(message);
                    break;
                }
                case enums.ACCEPTED_INCOMING_CALL: {
                    this.callInitiated(message);
                    break;
                }
                case enums.REJECTED_INCOMING_CALL: {
                    this.rejectedIncomingCall(message);
                    break;
                }
                case enums.CALL_ERROR: {
                    logger("User List screen --> call couldn't complete due to error", action.payLoad);
                    break;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param {?} parentMessage
     * @return {?}
     */
    viewMessageThread(parentMessage) {
        try {
            //Open Thread Screen
            this.threadMessageView = true;
            //close user ( the person you are chatting with ) Detail screen
            this.viewDetailScreen = false;
            this.threadMessageParent = parentMessage;
            this.threadMessageItem = this.curentItem;
            this.threadMessageType = this.type;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Close the thread window
     * @return {?}
     */
    closeThreadMessages() {
        try {
            //close Thread Screen
            this.threadMessageView = false;
            this.threadMessageParent = null;
            this.threadMessageItem = null;
            this.threadMessageType = null;
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
     * When User Block someone
     * @return {?}
     */
    blockUser() {
        try {
            /** @type {?} */
            let usersList = [this.curentItem.uid];
            CometChatManager.blockUsers(usersList)
                .then((/**
             * @param {?} list
             * @return {?}
             */
            (list) => {
                this.curentItem = Object.assign({}, this.curentItem, { blockedByMe: true });
                this.item = this.curentItem;
                logger("block success");
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("Blocking user fails with error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When User UnBlock someone
     * @return {?}
     */
    unblockUser() {
        try {
            /** @type {?} */
            let usersList = [this.curentItem.uid];
            CometChatManager.unblockUsers(usersList)
                .then((/**
             * @param {?} list
             * @return {?}
             */
            (list) => {
                this.curentItem = Object.assign({}, this.curentItem, { blockedByMe: false });
                this.item = this.curentItem;
                logger("unblock success");
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("unblocking user fails with error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * initiates an audio call with the person you are chatting with
     * @return {?}
     */
    audioCall() {
        try {
            /** @type {?} */
            let receiverId;
            /** @type {?} */
            let receiverType;
            if (this.type === CometChat.RECEIVER_TYPE.USER) {
                receiverId = this.curentItem.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (this.type === CometChat.RECEIVER_TYPE.GROUP) {
                receiverId = this.curentItem.guid;
                receiverType = CometChat.RECEIVER_TYPE.GROUP;
            }
            CometChatManager.call(receiverId, receiverType, CometChat.CALL_TYPE.AUDIO)
                .then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                this.appendCallMessage(call);
                this.outgoingCall = call;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("Call initialization failed with exception:", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Appends Call Messages
     * @param {?} call
     * @return {?}
     */
    appendCallMessage(call) {
        try {
            this.callMessage = call;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When Outgoing call is ended append Call Message
     * @param {?} message
     * @return {?}
     */
    outgoingCallEnded(message) {
        try {
            this.outgoingCall = null;
            this.incomingCall = null;
            this.appendCallMessage(message);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * ACCPETS INCOMING CALL
     * @param {?} call
     * @return {?}
     */
    acceptIncomingCall(call) {
        try {
            this.incomingCall = call;
            /** @type {?} */
            const type = call.receiverType;
            /** @type {?} */
            const id = type === CometChat.RECEIVER_TYPE.USER
                ? call.sender.uid
                : call.receiverId;
            CometChat.getConversation(id, type)
                .then((/**
             * @param {?} conversation
             * @return {?}
             */
            (conversation) => {
                this.curentItem = Object.assign({}, conversation.conversationWith);
                this.type = type;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("error while fetching a conversation", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When call is accepted and connected append call message
     * @param {?} message
     * @return {?}
     */
    callInitiated(message) {
        try {
            this.appendCallMessage(message);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * IncomingCall Rejected
     * @param {?} call
     * @return {?}
     */
    rejectedIncomingCall(call) {
        try {
            /** @type {?} */
            let incomingCallMessage = call.incomingCall;
            /** @type {?} */
            let rejectedCallMessage = call.rejectedCall;
            /** @type {?} */
            let receiverType = incomingCallMessage.receiverType;
            /** @type {?} */
            let receiverId = receiverType === CometChat.RECEIVER_TYPE.USER
                ? incomingCallMessage.sender.uid
                : incomingCallMessage.receiverId;
            //marking the incoming call message as read
            if (incomingCallMessage.hasOwnProperty(enums.READ_AT) === false) {
                CometChat.markAsRead(incomingCallMessage.id, receiverId, receiverType);
            }
            //updating unreadcount in chats list
            this.messageToMarkRead = incomingCallMessage;
            /** @type {?} */
            let item = this.curentItem;
            /** @type {?} */
            let type = this.type;
            receiverType = rejectedCallMessage.receiverType;
            receiverId = rejectedCallMessage.receiverId;
            if ((type === CometChat.RECEIVER_TYPE.GROUP &&
                receiverType === CometChat.RECEIVER_TYPE.GROUP &&
                receiverId === item.guid) ||
                (type === CometChat.RECEIVER_TYPE.USER &&
                    receiverType === CometChat.RECEIVER_TYPE.USER &&
                    receiverId === item.uid)) {
                this.appendCallMessage(rejectedCallMessage);
            }
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatUserListWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-list-with-messages",
                template: "<div class=\"userScreenStyle\">\n  <div class=\"userScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-user-list\n      [item]=\"item\"\n      (onUserClick)=\"userClicked($event)\"\n    ></cometchat-user-list>\n  </div>\n  <!-- Render this Chat Screen only if a user or a group is clicked -->\n  <div\n    class=\"userScreenMainStyle\"\n    *ngIf=\"curentItem !== null\"\n    [ngClass]=\"{\n      userScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"curentItem\"\n      [type]=\"type\"\n      [composedThreadMessage]=\"composedThreadMessage\"\n      [callMessage]=\"callMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-messages>\n  </div>\n\n  <!-- Message Thread View Below -->\n  <div\n    class=\"userScreenSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <div\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"curentItem\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-user-details>\n    </div>\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"curentItem\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [messageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n</div>\n",
                animations: [
                    trigger("FadeInFadeOut", [
                        state("normal", style({
                            left: "0%",
                        })),
                        state("animated", style({
                            left: "-100%",
                        })),
                        transition("normal<=>animated", animate(300)),
                    ]),
                ],
                styles: ["*{font-family:Inter,sans-serif;overflow:hidden}.userScreenStyle{display:flex;height:100%;width:100%;box-sizing:border-box}.userScreenStyle *{box-sizing:border-box}.userScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.userScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.userScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.userScreenSidebarStyle{width:280px;border-right:1px solid #eaeaea;height:100%;position:relative}.userScreenMainStyle{width:calc(100% - 280px);height:100%;order:2}.userScreenMainSecondaryStyle{width:calc(100% - 500px)}.userScreenSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}.detailScreenStyle{height:100%}@media (min-width:320px) and (max-width:767px){.userScreenSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;background-color:#fff;z-index:2}.userScreenMainStyle{width:100%!important;background-color:#fff}.userScreenSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometChatUserListWithMessagesComponent.ctorParameters = () => [];
CometChatUserListWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.curentItem;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.composedThreadMessage;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.callInitialised;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometChatUserListWithMessagesComponent.prototype.innerWidth;
    /**
     * Updates the thread message , it the currently open thread parent is deleted or is edited
     * @type {?}
     */
    CometChatUserListWithMessagesComponent.prototype.updateThreadMessage;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometChatUserListWithMessagesComponent.prototype.toggleDetailView;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometChatUserListWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1VzZXJzL0NvbWV0Q2hhdC11c2VyLWxpc3Qtd2l0aC1tZXNzYWdlcy9jb21ldGNoYXQtdXNlci1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBdUJsRCxNQUFNLE9BQU8sc0NBQXNDO0lBZ0NqRDs7UUE5QkEsZUFBVSxHQUFHLElBQUksQ0FBQzs7UUFHbEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVaLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0Isc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0IscUJBQWdCLEdBQVksS0FBSyxDQUFDOztRQUVsQyxjQUFTLEdBQUcsSUFBSSxDQUFDOztRQUdqQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7O1FBR3JD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Q0g7d0JBQ0QsS0FBSyxDQUNILFVBQVUsRUFDVixLQUFLLENBQUM7NEJBQ0osSUFBSSxFQUFFLE9BQU87eUJBQ2QsQ0FBQyxDQUNIO3dCQUNELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlDLENBQUM7aUJBQ0g7O2FBQ0Y7Ozs7O3VCQWlERSxZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUU7Ozs7SUE5Q2pDLDREQUFrQjs7SUFDbEIsc0RBQUs7O0lBRUwsc0RBQVk7O0lBRVosbUVBQW1DOztJQUNuQyxxRUFBMkI7O0lBQzNCLG1FQUF5Qjs7SUFDekIsbUVBQXVCOztJQUN2Qix1RUFBNkI7O0lBQzdCLGtFQUFrQzs7SUFFbEMsMkRBQWlCOztJQUdqQixxRUFBcUM7O0lBR3JDLDhEQUFvQjs7SUFDcEIsOERBQW9COztJQUNwQiw4REFBYTs7SUFDYiw2REFBbUI7O0lBQ25CLG1FQUFrQjs7SUFFbEIsaUVBQWlDOztJQUNqQyxvRUFBbUI7O0lBQ25CLGlFQUFpQzs7SUFFakMsNERBQVc7Ozs7O0lBK0xYLHFFQWVFOzs7Ozs7SUFtQ0Ysa0VBT0U7Ozs7O0lBd0VGLDJEQXVCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdXNlci1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIi0xMDAlXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFVzZXJMaXN0V2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy9JdCBjYW4gYmUgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgY3VyZW50SXRlbSA9IG51bGw7XG4gIGl0ZW07XG4gIC8vIERlZmluZXMgdGhlIHR5cGVzIG9mIGl0ZW0gdGhhdCB3YXMgY2xpY2tlZCAtLT4gdGhhdCBpcyAuLiBpZiBpdHMgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgdHlwZSA9IG51bGw7XG5cbiAgdGhyZWFkTWVzc2FnZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICBjb21wb3NlZFRocmVhZE1lc3NhZ2UgPSBudWxsO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgaW1hZ2VWaWV3ID0gbnVsbDtcblxuICAvL0lmIGNsaWNrZWQgdGhlbiBvbmx5IHNob3cgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vZm9yIGF1ZGlvIGNhbGxpbmdcbiAgb3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBjYWxsTWVzc2FnZSA9IG51bGw7XG4gIG1lc3NhZ2VUb01hcmtSZWFkO1xuXG4gIGNhbGxJbml0aWFsaXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja0FuaW1hdGVkU3RhdGU7XG4gIGNoZWNrSWZBbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGlubmVyV2lkdGg7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZCBpbiByZWFsdGltZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIiwgW10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pbm5lcldpZHRoID49IGVudW1zLkJSRUFLUE9JTlRfTUlOX1dJRFRIICYmXG4gICAgICAgIHRoaXMuaW5uZXJXaWR0aCA8PSBlbnVtcy5CUkVBS1BPSU5UX01BWF9XSURUSFxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSWZBbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIHVzZXIgZW1pdHRlZCBieSB0aGUgdXNlckxpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgICAgOiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdXNlcjtcbiAgICAgIHRoaXMuaXRlbSA9IHRoaXMuY3VyZW50SXRlbTtcblxuICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLmN1cmVudEl0ZW0uaGFzT3duUHJvcGVydHkoZW51bXMuVUlEKSkge1xuICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDoge1xuICAgICAgICAgIHRoaXMudmlld01lc3NhZ2VUaHJlYWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMudXBkYXRlVGhyZWFkTWVzc2FnZShhY3Rpb24ucGF5TG9hZFswXSwgYWN0aW9uLnVwZGF0ZVR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQ6IHtcbiAgICAgICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgICBjYXNlIGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VEOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgICAgdGhpcy5jb21wb3NlZFRocmVhZE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQsXG4gICAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQkxPQ0tfVVNFUjoge1xuICAgICAgICAgIHRoaXMuYmxvY2tVc2VyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5VTkJMT0NLX1VTRVI6XG4gICAgICAgICAgdGhpcy51bmJsb2NrVXNlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgICB0aGlzLnZpZGVvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQ6XG4gICAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRU5ERUQ6IHtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAgIC8vdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShpdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5hY2NlcHRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICAgIHRoaXMucmVqZWN0ZWRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DQUxMX0VSUk9SOiB7XG4gICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgXCJVc2VyIExpc3Qgc2NyZWVuIC0tPiBjYWxsIGNvdWxkbid0IGNvbXBsZXRlIGR1ZSB0byBlcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQWxsIHRoZSBJbnRpYWwgQ29uZGl0aW9ucyBmb3IgdGhlIHRocmVhZGVkIFZpZXcgb2YgTWVzc2FnZXMgYW5kIE9wZW5zIHRocmVhZCBWaWV3XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICAvL09wZW4gVGhyZWFkIFNjcmVlblxuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAgIC8vY2xvc2UgdXNlciAoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoICkgRGV0YWlsIHNjcmVlblxuICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gdGhpcy5jdXJlbnRJdGVtO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IHRoaXMudHlwZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdGhyZWFkIG1lc3NhZ2UgLCBpdCB0aGUgY3VycmVudGx5IG9wZW4gdGhyZWFkIHBhcmVudCBpcyBkZWxldGVkIG9yIGlzIGVkaXRlZFxuICAgKi9cbiAgdXBkYXRlVGhyZWFkTWVzc2FnZSA9IChtZXNzYWdlLCBhY3Rpb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGlvbiA9PT0gZW51bXMuREVMRVRFKSB7XG4gICAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHsgLi4ubWVzc2FnZSB9O1xuICAgICAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSB7IC4uLm1lc3NhZ2UgfTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICB0cnkge1xuICAgICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIFVzZXIgRGV0YWlsIFJpZ2h0IFNpZGUgYmFyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlRGV0YWlsVmlldyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gIXRoaXMudmlld0RldGFpbFNjcmVlbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBCbG9jayBzb21lb25lXG4gICAqL1xuICBibG9ja1VzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5jdXJlbnRJdGVtLnVpZF07XG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHsgLi4udGhpcy5jdXJlbnRJdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuY3VyZW50SXRlbTtcbiAgICAgICAgICBsb2dnZXIoXCJibG9jayBzdWNjZXNzXCIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiQmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBVbkJsb2NrIHNvbWVvbmVcbiAgICovXG4gIHVuYmxvY2tVc2VyKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdXNlcnNMaXN0ID0gW3RoaXMuY3VyZW50SXRlbS51aWRdO1xuICAgICAgQ29tZXRDaGF0TWFuYWdlci51bmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHsgLi4udGhpcy5jdXJlbnRJdGVtLCBibG9ja2VkQnlNZTogZmFsc2UgfTtcbiAgICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG4gICAgICAgICAgbG9nZ2VyKFwidW5ibG9jayBzdWNjZXNzXCIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwidW5ibG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIGF1ZGlvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5jdXJlbnRJdGVtLnVpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5jdXJlbnRJdGVtLmd1aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPKVxuICAgICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiB2aWRlbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIHZpZGVvQ2FsbCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIpIHtcbiAgICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS51aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS5ndWlkO1xuICAgICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICAgIH1cblxuICAgICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5WSURFTylcbiAgICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuXG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIENhbGwgTWVzc2FnZXNcbiAgICogQHBhcmFtXG4gICAqL1xuICBhcHBlbmRDYWxsTWVzc2FnZShjYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2FsbE1lc3NhZ2UgPSBjYWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIE91dGdvaW5nIGNhbGwgaXMgZW5kZWQgYXBwZW5kIENhbGwgTWVzc2FnZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgb3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgICB0aGlzLmluY29taW5nQ2FsbCA9IG51bGw7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBQ0NQRVRTIElOQ09NSU5HIENBTExcbiAgICovXG4gIGFjY2VwdEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgICAgY29uc3QgdHlwZSA9IGNhbGwucmVjZWl2ZXJUeXBlO1xuICAgICAgY29uc3QgaWQgPVxuICAgICAgICB0eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSXG4gICAgICAgICAgPyBjYWxsLnNlbmRlci51aWRcbiAgICAgICAgICA6IGNhbGwucmVjZWl2ZXJJZDtcblxuICAgICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNhbGwgaXMgYWNjZXB0ZWQgYW5kIGNvbm5lY3RlZCBhcHBlbmQgY2FsbCBtZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2FsbEluaXRpYXRlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluY29taW5nQ2FsbCBSZWplY3RlZFxuICAgKi9cbiAgcmVqZWN0ZWRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaW5jb21pbmdDYWxsTWVzc2FnZSA9IGNhbGwuaW5jb21pbmdDYWxsO1xuICAgICAgbGV0IHJlamVjdGVkQ2FsbE1lc3NhZ2UgPSBjYWxsLnJlamVjdGVkQ2FsbDtcbiAgICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICAgIGxldCByZWNlaXZlcklkID1cbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSXG4gICAgICAgICAgPyBpbmNvbWluZ0NhbGxNZXNzYWdlLnNlbmRlci51aWRcbiAgICAgICAgICA6IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgICAgaWYgKGluY29taW5nQ2FsbE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuUkVBRF9BVCkgPT09IGZhbHNlKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKGluY29taW5nQ2FsbE1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIC8vdXBkYXRpbmcgdW5yZWFkY291bnQgaW4gY2hhdHMgbGlzdFxuICAgICAgdGhpcy5tZXNzYWdlVG9NYXJrUmVhZCA9IGluY29taW5nQ2FsbE1lc3NhZ2U7XG5cbiAgICAgIGxldCBpdGVtID0gdGhpcy5jdXJlbnRJdGVtO1xuICAgICAgbGV0IHR5cGUgPSB0aGlzLnR5cGU7XG5cbiAgICAgIHJlY2VpdmVyVHlwZSA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgICAgaWYgKFxuICAgICAgICAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICByZWNlaXZlclR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgICAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0udWlkKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UocmVqZWN0ZWRDYWxsTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=