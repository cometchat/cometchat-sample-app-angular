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
                // this.setState({ outgoingCall: call });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1VzZXJzL2NvbWV0Y2hhdC11c2VyLWxpc3Qtd2l0aC1tZXNzYWdlcy9jb21ldGNoYXQtdXNlci1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUF3QjdCLE1BQU0sT0FBTyxzQ0FBc0M7SUFnQ2pEOztRQTlCQSxlQUFVLEdBQUcsSUFBSSxDQUFDOztRQUdsQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7O1FBRWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7O1FBR2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7UUFHckMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxJQUFJ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NERBQWtCOztJQUNsQixzREFBSzs7SUFFTCxzREFBWTs7SUFFWixtRUFBbUM7O0lBQ25DLHFFQUEyQjs7SUFDM0IsbUVBQXlCOztJQUN6QixtRUFBdUI7O0lBQ3ZCLHVFQUE2Qjs7SUFDN0Isa0VBQWtDOztJQUVsQywyREFBaUI7O0lBR2pCLHFFQUFxQzs7SUFHckMsOERBQW9COztJQUNwQiw4REFBb0I7O0lBQ3BCLDhEQUFhOztJQUNiLDZEQUFpQjs7SUFDakIsbUVBQWtCOztJQUVsQixpRUFBaUM7O0lBQ2pDLG9FQUFtQjs7SUFDbkIsaUVBQWlDOztJQUVqQyw0REFBVzs7Ozs7O0lBa01YLGtFQUdFOzs7OztJQTRERiwyREFvQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVzZXItbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdXNlci1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIi0xMDAlXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFVzZXJMaXN0V2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy9JdCBjYW4gYmUgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgY3VyZW50SXRlbSA9IG51bGw7XG4gIGl0ZW07XG4gIC8vIERlZmluZXMgdGhlIHR5cGVzIG9mIGl0ZW0gdGhhdCB3YXMgY2xpY2tlZCAtLT4gdGhhdCBpcyAuLiBpZiBpdHMgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgdHlwZSA9IG51bGw7XG5cbiAgdGhyZWFkTWVzc2FnZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICBjb21wb3NlZHRocmVhZG1lc3NhZ2UgPSBudWxsO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgaW1hZ2VWaWV3ID0gbnVsbDtcblxuICAvL0lmIGNsaWNrZWQgdGhlbiBvbmx5IHNob3cgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vZm9yIGF1ZGlvIGNhbGxpbmdcbiAgb3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBjYWxsTWVzc2FnZSA9IHt9O1xuICBtZXNzYWdlVG9NYXJrUmVhZDtcblxuICBjYWxsSW5pdGlhbGlzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tBbmltYXRlZFN0YXRlO1xuICBjaGVja0lmQW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpbm5lcldpZHRoO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5pbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuaW5uZXJXaWR0aCA+PSBcIjMyMFwiICYmIHRoaXMuaW5uZXJXaWR0aCA8PSBcIjc2N1wiKSB7XG4gICAgICBpZiAodGhpcy5jaGVja0lmQW5pbWF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gbnVsbDtcbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgdXNlciBlbWl0dGVkIGJ5IHRoZSB1c2VyTGlzdCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IHVzZXJcbiAgICovXG4gIHVzZXJDbGlja2VkKHVzZXIpIHtcbiAgICBpZiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJlbnRJdGVtID0gdXNlcjtcbiAgICB0aGlzLml0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG5cbiAgICAvL0Nsb3NlIFRocmVhZCBBbmQgVXNlciBEZXRhaWwgU2NyZWVuIFdoZW4gQ2hhdCBXaW5kb3cgSXMgQ2hhbmdlZFxuICAgIC8vIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuY3VyZW50SXRlbS5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSkge1xuICAgICAgdGhpcy50eXBlID0gXCJ1c2VyXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIC8vaGFuZGxlIEV2ZW50cy9BY3Rpb25zIGdlbmVyYXRlZCBmcm9tIE1lc3NhZ2VIZWFkZXIgLCBNZXNzYWdlQ29tcG9zZXIgYW5kIE1lc3NhZ2VMaXN0IEhlcmVcblxuICAgIC8vIGFjdGlvbi5wYXlMb2FkIGhhcyB0aGUgYXJyYXkgb2YgbWVzc2FnZXMgdGhhdCBpcyByZWNlaXZlZFxuICAgIGxldCBtZXNzYWdlID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlVzZXJMaXN0U2NyZWVuIC0tPiBhY3Rpb24gZ2VuZXJhdGlvbiBpcyBcIiwgYWN0aW9uKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDoge1xuICAgICAgICB0aGlzLnZpZXdNZXNzYWdlVGhyZWFkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy5jbG9zZVRocmVhZE1lc3NhZ2VzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRToge1xuICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhhY3Rpb24ucGF5TG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhudWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQ6IHtcbiAgICAgICAgLy8gdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5jb21wb3NlZHRocmVhZG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4udGhpcy50aHJlYWRNZXNzYWdlUGFyZW50LFxuICAgICAgICAgIHJlcGx5Q291bnQ6IGFjdGlvbi5wYXlMb2FkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICAvLyB0aGlzLnRvZ2dsZVNpZGVCYXIoKTtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkJMT0NLX1VTRVI6IHtcbiAgICAgICAgdGhpcy5ibG9ja1VzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlVOQkxPQ0tfVVNFUjpcbiAgICAgICAgdGhpcy51bmJsb2NrVXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDoge1xuICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEOiB7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0pPSU5FRF9DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAvL3RoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLnJlamVjdGVkSW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FUlJPUjoge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQWxsIHRoZSBJbnRpYWwgQ29uZGl0aW9ucyBmb3IgdGhlIHRocmVhZGVkIFZpZXcgb2YgTWVzc2FnZXMgYW5kIE9wZW5zIHRocmVhZCBWaWV3XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIC8vT3BlbiBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAvL2Nsb3NlIHVzZXIgKCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBzY3JlZW5cbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IHRoaXMuY3VyZW50SXRlbTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gdGhpcy50eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICAvL2Nsb3NlIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgY2xpY2tlZCBJbWFnZSBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpIHtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZURldGFpbFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9ICF0aGlzLnZpZXdEZXRhaWxTY3JlZW47XG4gIH07XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBCbG9jayBzb21lb25lXG4gICAqL1xuICBibG9ja1VzZXIoKSB7XG4gICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLmN1cmVudEl0ZW0udWlkXTtcbiAgICBDb21ldENoYXRNYW5hZ2VyLmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0geyAuLi50aGlzLmN1cmVudEl0ZW0sIGJsb2NrZWRCeU1lOiB0cnVlIH07XG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuY3VyZW50SXRlbTtcbiAgICAgICAgY29uc29sZS5sb2coXCJibG9jayBzdWNjZXNzXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCbG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBVc2VyIFVuQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgdW5ibG9ja1VzZXIoKSB7XG4gICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLmN1cmVudEl0ZW0udWlkXTtcbiAgICBDb21ldENoYXRNYW5hZ2VyLnVuYmxvY2tVc2Vycyh1c2Vyc0xpc3QpXG4gICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB7IC4uLnRoaXMuY3VyZW50SXRlbSwgYmxvY2tlZEJ5TWU6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuY3VyZW50SXRlbTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NrIHN1Y2Nlc3NcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVuYmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiBhdWRpbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIGF1ZGlvQ2FsbCgpIHtcbiAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5jdXJlbnRJdGVtLnVpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS5ndWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5BVURJTylcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiB2aWRlbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIHZpZGVvQ2FsbCA9ICgpID0+IHtcbiAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5jdXJlbnRJdGVtLnVpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuY3VyZW50SXRlbS5ndWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5WSURFTylcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBvdXRnb2luZ0NhbGw6IGNhbGwgfSk7XG5cbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCkge1xuICAgIHRoaXMuY2FsbE1lc3NhZ2UgPSBjYWxsO1xuICB9XG5cbiAgb3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSkge1xuICAgIHRoaXMub3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgICB0aGlzLmluY29taW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBQ0NQRVRTIElOQ09NSU5HIENBTExcbiAgICovXG4gIGFjY2VwdEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBjYWxsO1xuXG4gICAgY29uc3QgdHlwZSA9IGNhbGwucmVjZWl2ZXJUeXBlO1xuICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJ1c2VyXCIgPyBjYWxsLnNlbmRlci51aWQgOiBjYWxsLnJlY2VpdmVySWQ7XG5cbiAgICBDb21ldENoYXQuZ2V0Q29udmVyc2F0aW9uKGlkLCB0eXBlKVxuICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgIC8vIHRoaXMuaXRlbUNsaWNrZWQoY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgsIHR5cGUpO1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB7IC4uLmNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoIH07XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGEgY29udmVyc2F0aW9uXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2FsbCBpcyBhY2NlcHRlZCBhbmQgY29ubmVjdGVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2FsbEluaXRpYXRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNvbWluZ0NhbGwgUmVqZWN0ZWRcbiAgICovXG4gIHJlamVjdGVkSW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICBsZXQgaW5jb21pbmdDYWxsTWVzc2FnZSA9IGNhbGwuaW5jb21pbmdDYWxsO1xuICAgIGxldCByZWplY3RlZENhbGxNZXNzYWdlID0gY2FsbC5yZWplY3RlZENhbGw7XG4gICAgbGV0IHJlY2VpdmVyVHlwZSA9IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIGxldCByZWNlaXZlcklkID1cbiAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICAgICAgPyBpbmNvbWluZ0NhbGxNZXNzYWdlLnNlbmRlci51aWRcbiAgICAgICAgOiBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICAvL21hcmtpbmcgdGhlIGluY29taW5nIGNhbGwgbWVzc2FnZSBhcyByZWFkXG4gICAgaWYgKGluY29taW5nQ2FsbE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyZWFkQXRcIikgPT09IGZhbHNlKSB7XG4gICAgICBDb21ldENoYXQubWFya0FzUmVhZChpbmNvbWluZ0NhbGxNZXNzYWdlLmlkLCByZWNlaXZlcklkLCByZWNlaXZlclR5cGUpO1xuICAgIH1cblxuICAgIC8vdXBkYXRpbmcgdW5yZWFkY291bnQgaW4gY2hhdHMgbGlzdFxuICAgIHRoaXMubWVzc2FnZVRvTWFya1JlYWQgPSBpbmNvbWluZ0NhbGxNZXNzYWdlO1xuXG4gICAgbGV0IGl0ZW0gPSB0aGlzLmN1cmVudEl0ZW07XG4gICAgbGV0IHR5cGUgPSB0aGlzLnR5cGU7XG5cbiAgICByZWNlaXZlclR5cGUgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICByZWNlaXZlcklkID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgaWYgKFxuICAgICAgKHR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICByZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICByZWNlaXZlcklkID09PSBpdGVtLmd1aWQpIHx8XG4gICAgICAodHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJUeXBlID09PSBcInVzZXJcIiAmJiByZWNlaXZlcklkID09PSBpdGVtLnVpZClcbiAgICApIHtcbiAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UocmVqZWN0ZWRDYWxsTWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=