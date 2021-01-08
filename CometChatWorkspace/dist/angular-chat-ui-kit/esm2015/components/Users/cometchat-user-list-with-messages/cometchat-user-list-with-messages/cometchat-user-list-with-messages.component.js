/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/cometchat-user-list-with-messages/cometchat-user-list-with-messages/cometchat-user-list-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import * as enums from "../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { trigger, state, style, transition, animate, } from "@angular/animations";
export class CometchatUserListWithMessagesComponent {
    constructor() {
        //It can be a user or a group
        this.curentItem = null;
        // Defines the types of item that was clicked --> that is .. if its a user or a group
        this.type = null;
        this.threadMessageView = false;
        this.threadMessageParent = null;
        this.threadMessageItem = null;
        this.threadMessageType = "";
        this.composedthreadmessage = null;
        this.viewDetailScreen = false;
        // To display image in full screen
        this.imageView = null;
        //If clicked then only show image in full screen
        this.fullScreenViewImage = false;
        //for audio calling
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = {};
        this.callInitialised = false;
        this.checkIfAnimated = false;
        /**
         * Opens User Detail Right Side bar
         * @param Any message
         */
        this.toggleDetailView = (/**
         * @return {?}
         */
        () => {
            this.threadMessageView = false;
            this.viewDetailScreen = !this.viewDetailScreen;
        });
        /**
         * initiates an video call with the person you are chatting with
         */
        this.videoCall = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let receiverId;
            /** @type {?} */
            let receiverType;
            if (this.type === "user") {
                receiverId = this.curentItem.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (this.type === "group") {
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
                console.log("Call initialization failed with exception:", error);
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onResize();
        CometChat.getLoggedinUser().then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.loggedInUser = user;
        }));
    }
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    onResize() {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth >= "320" && this.innerWidth <= "767") {
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
    /**
     * Listen to the user emitted by the userList component
     * @param {?} user
     * @return {?}
     */
    userClicked(user) {
        if (this.checkAnimatedState !== null) {
            this.checkAnimatedState == "normal"
                ? (this.checkAnimatedState = "animated")
                : (this.checkAnimatedState = "normal");
        }
        this.curentItem = user;
        this.item = this.curentItem;
        //Close Thread And User Detail Screen When Chat Window Is Changed
        // this.closeThreadMessages();
        this.viewDetailScreen = false;
        if (this.curentItem.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
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
        let message = action.payLoad;
        // console.log("UserListScreen --> action generation is ", action);
        switch (action.type) {
            case enums.VIEW_MESSAGE_THREAD: {
                this.viewMessageThread(message);
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
                // this.toggleDetailView();
                this.composedthreadmessage = Object.assign({}, this.threadMessageParent, { replyCount: action.payLoad });
                break;
            }
            case enums.MENU_CLICKED: {
                this.checkAnimatedState = "normal";
                // this.toggleSideBar();
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
                console.log("User List screen --> call couldn't complete due to error", action.payLoad);
                break;
            }
        }
    }
    /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param {?} parentMessage
     * @return {?}
     */
    viewMessageThread(parentMessage) {
        //Open Thread Screen
        this.threadMessageView = true;
        //close user ( the person you are chatting with ) Detail screen
        this.viewDetailScreen = false;
        this.threadMessageParent = parentMessage;
        this.threadMessageItem = this.curentItem;
        this.threadMessageType = this.type;
    }
    /**
     * Close the thread window
     * @return {?}
     */
    closeThreadMessages() {
        //close Thread Screen
        this.threadMessageView = false;
        this.threadMessageParent = null;
        this.threadMessageItem = null;
        this.threadMessageType = null;
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
     * When User Block someone
     * @return {?}
     */
    blockUser() {
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
            console.log("block success");
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("Blocking user fails with error", error);
        }));
    }
    /**
     * When User UnBlock someone
     * @return {?}
     */
    unblockUser() {
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
            console.log("unblock success");
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("unblocking user fails with error", error);
        }));
    }
    /**
     * initiates an audio call with the person you are chatting with
     * @return {?}
     */
    audioCall() {
        /** @type {?} */
        let receiverId;
        /** @type {?} */
        let receiverType;
        if (this.type === "user") {
            receiverId = this.curentItem.uid;
            receiverType = CometChat.RECEIVER_TYPE.USER;
        }
        else if (this.type === "group") {
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
            console.log("Call initialization failed with exception:", error);
        }));
    }
    /**
     * @param {?} call
     * @return {?}
     */
    appendCallMessage(call) {
        this.callMessage = call;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    outgoingCallEnded(message) {
        this.outgoingCall = null;
        this.incomingCall = null;
        this.appendCallMessage(message);
    }
    /**
     * ACCPETS INCOMING CALL
     * @param {?} call
     * @return {?}
     */
    acceptIncomingCall(call) {
        this.incomingCall = call;
        /** @type {?} */
        const type = call.receiverType;
        /** @type {?} */
        const id = type === "user" ? call.sender.uid : call.receiverId;
        CometChat.getConversation(id, type)
            .then((/**
         * @param {?} conversation
         * @return {?}
         */
        (conversation) => {
            // this.itemClicked(conversation.conversationWith, type);
            this.curentItem = Object.assign({}, conversation.conversationWith);
            this.type = type;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("error while fetching a conversation", error);
        }));
    }
    /**
     * When call is accepted and connected
     * @param {?} message
     * @return {?}
     */
    callInitiated(message) {
        this.appendCallMessage(message);
    }
    /**
     * IncomingCall Rejected
     * @param {?} call
     * @return {?}
     */
    rejectedIncomingCall(call) {
        /** @type {?} */
        let incomingCallMessage = call.incomingCall;
        /** @type {?} */
        let rejectedCallMessage = call.rejectedCall;
        /** @type {?} */
        let receiverType = incomingCallMessage.receiverType;
        /** @type {?} */
        let receiverId = receiverType === "user"
            ? incomingCallMessage.sender.uid
            : incomingCallMessage.receiverId;
        //marking the incoming call message as read
        if (incomingCallMessage.hasOwnProperty("readAt") === false) {
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
        if ((type === "group" &&
            receiverType === "group" &&
            receiverId === item.guid) ||
            (type === "user" && receiverType === "user" && receiverId === item.uid)) {
            this.appendCallMessage(rejectedCallMessage);
        }
    }
}
CometchatUserListWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-list-with-messages",
                template: "<div class=\"userScreenStyle\">\n  <div class=\"userScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-user-list\n      [item]=\"item\"\n      (onUserClick)=\"userClicked($event)\"\n    ></cometchat-user-list>\n  </div>\n  <!-- Render this Chat Screen only if a user or a group is clicked -->\n  <div\n    class=\"userScreenMainStyle\"\n    *ngIf=\"curentItem !== null\"\n    [ngClass]=\"{\n      userScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"curentItem\"\n      [type]=\"type\"\n      [composedthreadmessage]=\"composedthreadmessage\"\n      [callMessage]=\"callMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-messages>\n  </div>\n\n  <!-- Message Thread View Below -->\n  <div\n    class=\"userScreenSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <div\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"curentItem\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-user-details>\n    </div>\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"curentItem\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [MessageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n</div>\n",
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
                styles: ["*{font-family:Inter,sans-serif;overflow:hidden}.userScreenStyle{display:flex;height:100%;width:100%;box-sizing:border-box}.userScreenStyle *{box-sizing:border-box}.userScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.userScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.userScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.userScreenSidebarStyle{width:280px;border-right:1px solid #eaeaea;height:100%;position:relative}.userScreenMainStyle{width:calc(100% - 280px);display:flex;flex-direction:column;height:100%;order:2}.userScreenMainSecondaryStyle{width:calc(100% - 500px)}.userScreenSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}.detailScreenStyle{height:100%}@media (min-width:320px) and (max-width:767px){.userScreenSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;background-color:#fff;z-index:2}.userScreenMainStyle{width:100%!important;background-color:#fff}.userScreenSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometchatUserListWithMessagesComponent.ctorParameters = () => [];
CometchatUserListWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.curentItem;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.composedthreadmessage;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.callInitialised;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometchatUserListWithMessagesComponent.prototype.innerWidth;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometchatUserListWithMessagesComponent.prototype.toggleDetailView;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometchatUserListWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1VzZXJzL2NvbWV0Y2hhdC11c2VyLWxpc3Qtd2l0aC1tZXNzYWdlcy9jb21ldGNoYXQtdXNlci1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUF3QjdCLE1BQU0sT0FBTyxzQ0FBc0M7SUFnQ2pEOztRQTlCQSxlQUFVLEdBQUcsSUFBSSxDQUFDOztRQUdsQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7O1FBRWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7O1FBR2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7UUFHckMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxJQUFJ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c0RBQUs7O0lBRUwsc0RBQVk7O0lBRVosbUVBQW1DOztJQUNuQyxxRUFBMkI7O0lBQzNCLG1FQUF5Qjs7SUFDekIsbUVBQXVCOztJQUN2Qix1RUFBNkI7O0lBQzdCLGtFQUFrQzs7SUFFbEMsMkRBQWlCOztJQUdqQixxRUFBcUM7O0lBR3JDLDhEQUFvQjs7SUFDcEIsOERBQW9COztJQUNwQiw4REFBYTs7SUFDYiw2REFBaUI7O0lBQ2pCLG1FQUFrQjs7SUFFbEIsaUVBQWlDOztJQUNqQyxvRUFBbUI7O0lBQ25CLGlFQUFpQzs7SUFFakMsNERBQVc7Ozs7OztJQWtNWCxrRUFHRTs7Ozs7SUE0REYsMkRBbUJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC11c2VyLWxpc3Qtd2l0aC1tZXNzYWdlc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC11c2VyLWxpc3Qtd2l0aC1tZXNzYWdlcy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCItMTAwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw8PT5hbmltYXRlZFwiLCBhbmltYXRlKDMwMCkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRVc2VyTGlzdFdpdGhNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vSXQgY2FuIGJlIGEgdXNlciBvciBhIGdyb3VwXG4gIGN1cmVudEl0ZW0gPSBudWxsO1xuICBpdGVtO1xuICAvLyBEZWZpbmVzIHRoZSB0eXBlcyBvZiBpdGVtIHRoYXQgd2FzIGNsaWNrZWQgLS0+IHRoYXQgaXMgLi4gaWYgaXRzIGEgdXNlciBvciBhIGdyb3VwXG4gIHR5cGUgPSBudWxsO1xuXG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICB0aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcbiAgdmlld0RldGFpbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUbyBkaXNwbGF5IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGltYWdlVmlldyA9IG51bGw7XG5cbiAgLy9JZiBjbGlja2VkIHRoZW4gb25seSBzaG93IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvL2ZvciBhdWRpbyBjYWxsaW5nXG4gIG91dGdvaW5nQ2FsbCA9IG51bGw7XG4gIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIGxvZ2dlZEluVXNlcjtcbiAgY2FsbE1lc3NhZ2UgPSB7fTtcbiAgbWVzc2FnZVRvTWFya1JlYWQ7XG5cbiAgY2FsbEluaXRpYWxpc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZTtcbiAgY2hlY2tJZkFuaW1hdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgaW5uZXJXaWR0aDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZCBpbiByZWFsdGltZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIiwgW10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPj0gXCIzMjBcIiAmJiB0aGlzLmlubmVyV2lkdGggPD0gXCI3NjdcIikge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIHVzZXIgZW1pdHRlZCBieSB0aGUgdXNlckxpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgID8gKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJhbmltYXRlZFwiKVxuICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY3VyZW50SXRlbSA9IHVzZXI7XG4gICAgdGhpcy5pdGVtID0gdGhpcy5jdXJlbnRJdGVtO1xuXG4gICAgLy9DbG9zZSBUaHJlYWQgQW5kIFVzZXIgRGV0YWlsIFNjcmVlbiBXaGVuIENoYXQgV2luZG93IElzIENoYW5nZWRcbiAgICAvLyB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmN1cmVudEl0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikpIHtcbiAgICAgIHRoaXMudHlwZSA9IFwidXNlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICAvL2hhbmRsZSBFdmVudHMvQWN0aW9ucyBnZW5lcmF0ZWQgZnJvbSBNZXNzYWdlSGVhZGVyICwgTWVzc2FnZUNvbXBvc2VyIGFuZCBNZXNzYWdlTGlzdCBIZXJlXG5cbiAgICAvLyBhY3Rpb24ucGF5TG9hZCBoYXMgdGhlIGFycmF5IG9mIG1lc3NhZ2VzIHRoYXQgaXMgcmVjZWl2ZWRcbiAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJVc2VyTGlzdFNjcmVlbiAtLT4gYWN0aW9uIGdlbmVyYXRpb24gaXMgXCIsIGFjdGlvbik7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6IHtcbiAgICAgICAgdGhpcy52aWV3TWVzc2FnZVRocmVhZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5WSUVXX0RFVEFJTDpcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgIC8vIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuXG4gICAgICAgIHRoaXMuY29tcG9zZWR0aHJlYWRtZXNzYWdlID0ge1xuICAgICAgICAgIC4uLnRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCxcbiAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgfTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgLy8gdGhpcy50b2dnbGVTaWRlQmFyKCk7XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5CTE9DS19VU0VSOiB7XG4gICAgICAgIHRoaXMuYmxvY2tVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VTkJMT0NLX1VTRVI6XG4gICAgICAgIHRoaXMudW5ibG9ja1VzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgIHRoaXMudmlkZW9DYWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICBjYXNlIGVudW1zLkNBTExfRU5ERURfQllfVVNFUjpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRDoge1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9MRUZUX0NBTEw6IHtcbiAgICAgICAgLy90aGlzLmFwcGVuZENhbGxNZXNzYWdlKGl0ZW0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUNDRVBUX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hY2NlcHRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMuY2FsbEluaXRpYXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlJFSkVDVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNBTExfRVJST1I6IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJVc2VyIExpc3Qgc2NyZWVuIC0tPiBjYWxsIGNvdWxkbid0IGNvbXBsZXRlIGR1ZSB0byBlcnJvclwiLFxuICAgICAgICAgIGFjdGlvbi5wYXlMb2FkXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIEFsbCB0aGUgSW50aWFsIENvbmRpdGlvbnMgZm9yIHRoZSB0aHJlYWRlZCBWaWV3IG9mIE1lc3NhZ2VzIGFuZCBPcGVucyB0aHJlYWQgVmlld1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIHZpZXdNZXNzYWdlVGhyZWFkKHBhcmVudE1lc3NhZ2UpIHtcbiAgICAvL09wZW4gVGhyZWFkIFNjcmVlblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSB0cnVlO1xuXG4gICAgLy9jbG9zZSB1c2VyICggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGggKSBEZXRhaWwgc2NyZWVuXG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBwYXJlbnRNZXNzYWdlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IHRoaXMudHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIGNsb3NlVGhyZWFkTWVzc2FnZXMoKSB7XG4gICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgdGhpcy5pbWFnZVZpZXcgPSBtZXNzYWdlO1xuICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgVXNlciBEZXRhaWwgUmlnaHQgU2lkZSBiYXJcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVEZXRhaWxWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSAhdGhpcy52aWV3RGV0YWlsU2NyZWVuO1xuICB9O1xuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5jdXJlbnRJdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHsgLi4udGhpcy5jdXJlbnRJdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgc3VjY2Vzc1wiKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBVbkJsb2NrIHNvbWVvbmVcbiAgICovXG4gIHVuYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5jdXJlbnRJdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci51bmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0geyAuLi50aGlzLmN1cmVudEl0ZW0sIGJsb2NrZWRCeU1lOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG4gICAgICAgIGNvbnNvbGUubG9nKFwidW5ibG9jayBzdWNjZXNzXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLmN1cmVudEl0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gdmlkZW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICB2aWRlb0NhbGwgPSAoKSA9PiB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLmN1cmVudEl0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuVklERU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0aGlzLmNhbGxNZXNzYWdlID0gY2FsbDtcbiAgfVxuXG4gIG91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogQUNDUEVUUyBJTkNPTUlORyBDQUxMXG4gICAqL1xuICBhY2NlcHRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgIGNvbnN0IHR5cGUgPSBjYWxsLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwidXNlclwiID8gY2FsbC5zZW5kZXIudWlkIDogY2FsbC5yZWNlaXZlcklkO1xuXG4gICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICAvLyB0aGlzLml0ZW1DbGlja2VkKGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLCB0eXBlKTtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNhbGwgaXMgYWNjZXB0ZWQgYW5kIGNvbm5lY3RlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbGxJbml0aWF0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5jb21pbmdDYWxsIFJlamVjdGVkXG4gICAqL1xuICByZWplY3RlZEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgbGV0IGluY29taW5nQ2FsbE1lc3NhZ2UgPSBjYWxsLmluY29taW5nQ2FsbDtcbiAgICBsZXQgcmVqZWN0ZWRDYWxsTWVzc2FnZSA9IGNhbGwucmVqZWN0ZWRDYWxsO1xuICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBsZXQgcmVjZWl2ZXJJZCA9XG4gICAgICByZWNlaXZlclR5cGUgPT09IFwidXNlclwiXG4gICAgICAgID8gaW5jb21pbmdDYWxsTWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgIDogaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgIGlmIChpbmNvbWluZ0NhbGxNZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVhZEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoaW5jb21pbmdDYWxsTWVzc2FnZS5pZCwgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKTtcbiAgICB9XG5cbiAgICAvL3VwZGF0aW5nIHVucmVhZGNvdW50IGluIGNoYXRzIGxpc3RcbiAgICB0aGlzLm1lc3NhZ2VUb01hcmtSZWFkID0gaW5jb21pbmdDYWxsTWVzc2FnZTtcblxuICAgIGxldCBpdGVtID0gdGhpcy5jdXJlbnRJdGVtO1xuICAgIGxldCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgcmVjZWl2ZXJUeXBlID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIGlmIChcbiAgICAgICh0eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgKHR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJJZCA9PT0gaXRlbS51aWQpXG4gICAgKSB7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKHJlamVjdGVkQ2FsbE1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19