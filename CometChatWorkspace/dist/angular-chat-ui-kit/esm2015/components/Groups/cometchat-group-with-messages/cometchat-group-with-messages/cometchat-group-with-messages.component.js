/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-with-messages/cometchat-group-with-messages/cometchat-group-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { trigger, state, style, transition, animate, } from "@angular/animations";
export class CometchatGroupWithMessagesComponent {
    constructor() {
        //It can be a user or a group
        this.item = null;
        // Defines the types of item that was clicked --> that is .. if its a user or a group
        this.type = null;
        this.loggedInUser = null;
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
        this.groupToUpdate = {};
        this.groupToLeave = {};
        this.groupToDelete = {};
        this.groupMessage = [];
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
         * updates the message list with a message notifying that , scope a some user is changed
         * @param Any members
         */
        this.memberScopeChanged = (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            /** @type {?} */
            const messageList = [];
            members.forEach((/**
             * @param {?} eachMember
             * @return {?}
             */
            (eachMember) => {
                /** @type {?} */
                const message = `${this.loggedInUser.name} made ${eachMember.name} ${eachMember.scope}`;
                /** @type {?} */
                const sentAt = new Date();
                /** @type {?} */
                const messageObj = {
                    category: "action",
                    message: message,
                    type: enums.ACTION_TYPE_GROUPMEMBER,
                    sentAt: sentAt,
                };
                messageList.push(messageObj);
            }));
            this.groupMessage = messageList;
        });
        /**
         * updates the messageList with messages about the members that were added
         * @param Any members
         */
        this.membersAdded = (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            /** @type {?} */
            const messageList = [];
            members.forEach((/**
             * @param {?} eachMember
             * @return {?}
             */
            (eachMember) => {
                /** @type {?} */
                const message = `${this.loggedInUser.name} added ${eachMember.name}`;
                /** @type {?} */
                const sentAt = new Date();
                /** @type {?} */
                const messageObj = {
                    category: "action",
                    message: message,
                    type: enums.ACTION_TYPE_GROUPMEMBER,
                    sentAt: sentAt,
                };
                messageList.push(messageObj);
            }));
            this.groupMessage = messageList;
        });
        /**
         * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
         * @param Any members
         */
        this.updateMembersCount = (/**
         * @param {?} item
         * @param {?} count
         * @return {?}
         */
        (item, count) => {
            /** @type {?} */
            const group = Object.assign({}, this.item, { membersCount: count });
            this.item = group;
            this.groupToUpdate = group;
        });
        /**
         * Updates Current Group Information
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
            switch (key) {
                case enums.GROUP_MEMBER_BANNED:
                case enums.GROUP_MEMBER_KICKED: {
                    if (options.user.uid === this.loggedInUser.uid) {
                        this.item = null;
                        this.type = "group";
                        this.viewDetailScreen = false;
                    }
                    break;
                }
                case enums.GROUP_MEMBER_SCOPE_CHANGED: {
                    if (options.user.uid === this.loggedInUser.uid) {
                        /** @type {?} */
                        const newObj = Object.assign({}, this.item, {
                            scope: options["scope"],
                        });
                        this.item = newObj;
                        this.type = "group";
                        this.viewDetailScreen = false;
                    }
                    break;
                }
                default:
                    break;
            }
        });
        /* Closes group screen and all , after user has left the group
           * @param
           */
        this.leaveGroup = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            this.groupToLeave = group;
            this.toggleDetailView();
            this.item = null;
        });
        /**
         * Closes group screen and all , after user has deleted the group
         * @param
         */
        this.deleteGroup = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            this.groupToDelete = group;
            this.toggleDetailView();
            this.item = null;
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
                receiverId = this.item.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (this.type === "group") {
                receiverId = this.item.guid;
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
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        if (this.checkAnimatedState !== null) {
            this.checkAnimatedState == "normal"
                ? (this.checkAnimatedState = "animated")
                : (this.checkAnimatedState = "normal");
        }
        this.item = group;
        //Close Thread And User Detail Screen When Chat Window Is Changed
        this.closeThreadMessages();
        this.viewDetailScreen = false;
        if (this.item.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
        }
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
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        /** @type {?} */
        let message = action.payLoad;
        /** @type {?} */
        let data = action.payLoad;
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
            case enums.MEMBER_SCOPE_CHANGED: {
                this.memberScopeChanged(action.payLoad);
                break;
            }
            case enums.MEMBERS_ADDED: {
                this.membersAdded(data);
                break;
            }
            case enums.MEMBERS_UPDATED: {
                this.updateMembersCount(data.item, data.count);
                break;
            }
            case enums.GROUP_UPDATED:
                this.groupUpdated(data.message, data.key, data.group, data.options);
                break;
            case enums.MEMBER_UNBANNED:
                this.memberUnbanned(data);
                break;
            case enums.LEFT_GROUP: {
                this.leaveGroup(data);
                break;
            }
            case enums.DELETE_GROUP: {
                this.deleteGroup(data);
                break;
            }
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
            }
            case enums.MENU_CLICKED: {
                this.checkAnimatedState = "normal";
                this.item = null;
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
        this.threadMessageItem = this.item;
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
     *  Unbans the user
     * @param {?} members
     * @return {?}
     */
    memberUnbanned(members) {
        /** @type {?} */
        const messageList = [];
        members.forEach((/**
         * @param {?} eachMember
         * @return {?}
         */
        (eachMember) => {
            /** @type {?} */
            const message = `${this.loggedInUser.name} unbanned ${eachMember.name}`;
            /** @type {?} */
            const date = new Date();
            /** @type {?} */
            const sentAt = (date / 1000) | 0;
            /** @type {?} */
            const messageObj = {
                category: "action",
                message: message,
                type: enums.ACTION_TYPE_GROUPMEMBER,
                sentAt: sentAt,
            };
            messageList.push(messageObj);
        }));
        this.groupMessage = messageList;
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
            receiverId = this.item.uid;
            receiverType = CometChat.RECEIVER_TYPE.USER;
        }
        else if (this.type === "group") {
            receiverId = this.item.guid;
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
            this.item = Object.assign({}, conversation.conversationWith);
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
        let item = this.item;
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
CometchatGroupWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-with-messages",
                template: "<div class=\"groupScreenStyle\">\n  <div class=\"groupScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <!-- Group List left side bar -->\n    <cometchat-group-list\n      [enableSelectedGroupStyling]=\"true\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      (onGroupClick)=\"groupClicked($event)\"\n    ></cometchat-group-list>\n  </div>\n\n  <div\n    class=\"groupScreenMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      groupScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [groupMessage]=\"groupMessage\"\n      [composedthreadmessage]=\"composedthreadmessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-messages>\n  </div>\n\n  <div\n    class=\"groupScreenSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <!-- Message Thread Right side bar -->\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n\n    <!-- Detail sceen -->\n    <cometchat-group-details\n      *ngIf=\"viewDetailScreen\"\n      [item]=\"item\"\n      [type]=\"type\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-group-details>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [MessageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
                animations: [
                    trigger("FadeInFadeOut", [
                        state("normal", style({
                            left: "0%",
                        })),
                        state("animated", style({
                            left: "-100%",
                            zIndex: "0",
                        })),
                        transition("normal<=>animated", animate(300)),
                    ]),
                ],
                styles: ["*{font-family:Inter,sans-serif;overflow:hidden}.groupScreenStyle{display:flex;height:100%;width:100%;box-sizing:border-box}.groupScreenStyle *{box-sizing:border-box}.groupScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.groupScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.groupScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.groupScreenStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.groupScreenSidebarStyle{width:280px;border-right:1px solid #eaeaea;height:100%;position:relative;display:flex;flex-direction:column}.groupScreenSidebarStyle .css-15jyeqi{height:calc(100% - 130px)}.groupScreenMainStyle{width:calc(100% - 280px);height:100%;order:2}.groupScreenMainSecondaryStyle{width:calc(100% - 500px)}.groupScreenSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}@media (min-width:320px) and (max-width:767px){.groupScreenSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}.groupScreenMainStyle{width:100%!important;background-color:#fff}.groupScreenSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometchatGroupWithMessagesComponent.ctorParameters = () => [];
CometchatGroupWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.composedthreadmessage;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.callInitialised;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.innerWidth;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.toggleDetailView;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.groupUpdated;
    /** @type {?} */
    CometchatGroupWithMessagesComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometchatGroupWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUF3QjdCLE1BQU0sT0FBTyxtQ0FBbUM7SUFxQzlDOztRQW5DQSxTQUFJLEdBQUcsSUFBSSxDQUFDOztRQUdaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVwQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFZLEtBQUssQ0FBQzs7UUFFbEMsY0FBUyxHQUFHLElBQUksQ0FBQzs7UUFHakIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBRXJDLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGlCQUFZ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akIsa0VBQXFDOztJQUVyQyw0REFBbUI7O0lBQ25CLDJEQUFrQjs7SUFDbEIsNERBQW1COztJQUNuQiwyREFBa0I7O0lBR2xCLDJEQUFvQjs7SUFDcEIsMkRBQW9COztJQUNwQiwwREFBaUI7O0lBQ2pCLGdFQUFrQjs7SUFFbEIsOERBQWlDOztJQUNqQyxpRUFBbUI7O0lBQ25CLDhEQUFpQzs7SUFDakMseURBQVc7Ozs7OztJQWdOWCwrREFHRTs7Ozs7O0lBTUYsaUVBZ0JFOzs7Ozs7SUFNRiwyREFlRTs7Ozs7O0lBTUYsaUVBS0U7Ozs7OztJQU1GLDJEQTBCRTs7SUEwQkYseURBSUU7Ozs7OztJQU1GLDBEQUlFOzs7OztJQTRCRix3REFvQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCItMTAwJVwiLFxuICAgICAgICAgIHpJbmRleDogXCIwXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEdyb3VwV2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy9JdCBjYW4gYmUgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgaXRlbSA9IG51bGw7XG5cbiAgLy8gRGVmaW5lcyB0aGUgdHlwZXMgb2YgaXRlbSB0aGF0IHdhcyBjbGlja2VkIC0tPiB0aGF0IGlzIC4uIGlmIGl0cyBhIHVzZXIgb3IgYSBncm91cFxuICB0eXBlID0gbnVsbDtcblxuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuXG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICB0aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcbiAgdmlld0RldGFpbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUbyBkaXNwbGF5IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGltYWdlVmlldyA9IG51bGw7XG5cbiAgLy9JZiBjbGlja2VkIHRoZW4gb25seSBzaG93IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBncm91cFRvVXBkYXRlID0ge307XG4gIGdyb3VwVG9MZWF2ZSA9IHt9O1xuICBncm91cFRvRGVsZXRlID0ge307XG4gIGdyb3VwTWVzc2FnZSA9IFtdO1xuXG4gIC8vZm9yIGF1ZGlvIGNhbGxpbmdcbiAgb3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgY2FsbE1lc3NhZ2UgPSB7fTtcbiAgbWVzc2FnZVRvTWFya1JlYWQ7XG5cbiAgY2FsbEluaXRpYWxpc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZTtcbiAgY2hlY2tJZkFuaW1hdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyV2lkdGg7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBncm91cCBlbWl0dGVkIGJ5IHRoZSBncm91cExpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICBpZiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG4gICAgfVxuICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuXG4gICAgLy9DbG9zZSBUaHJlYWQgQW5kIFVzZXIgRGV0YWlsIFNjcmVlbiBXaGVuIENoYXQgV2luZG93IElzIENoYW5nZWRcbiAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikpIHtcbiAgICAgIHRoaXMudHlwZSA9IFwidXNlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZBbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6IHtcbiAgICAgICAgdGhpcy52aWV3TWVzc2FnZVRocmVhZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobnVsbCk7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQ6IHtcbiAgICAgICAgLy8gdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5jb21wb3NlZHRocmVhZG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4udGhpcy50aHJlYWRNZXNzYWdlUGFyZW50LFxuICAgICAgICAgIHJlcGx5Q291bnQ6IGFjdGlvbi5wYXlMb2FkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyU2NvcGVDaGFuZ2VkKGFjdGlvbi5wYXlMb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUlNfQURERUQ6IHtcbiAgICAgICAgdGhpcy5tZW1iZXJzQWRkZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJzQ291bnQoZGF0YS5pdGVtLCBkYXRhLmNvdW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgIHRoaXMuZ3JvdXBVcGRhdGVkKGRhdGEubWVzc2FnZSwgZGF0YS5rZXksIGRhdGEuZ3JvdXAsIGRhdGEub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVU5CQU5ORUQ6XG4gICAgICAgIHRoaXMubWVtYmVyVW5iYW5uZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5MRUZUX0dST1VQOiB7XG4gICAgICAgIHRoaXMubGVhdmVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkRFTEVURV9HUk9VUDoge1xuICAgICAgICB0aGlzLmRlbGV0ZUdyb3VwKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDoge1xuICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEOiB7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0pPSU5FRF9DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAvL3RoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLnJlamVjdGVkSW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FUlJPUjoge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQWxsIHRoZSBJbnRpYWwgQ29uZGl0aW9ucyBmb3IgdGhlIHRocmVhZGVkIFZpZXcgb2YgTWVzc2FnZXMgYW5kIE9wZW5zIHRocmVhZCBWaWV3XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIC8vT3BlbiBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAvL2Nsb3NlIHVzZXIgKCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBzY3JlZW5cbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IHRoaXMuaXRlbTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gdGhpcy50eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICAvL2Nsb3NlIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgY2xpY2tlZCBJbWFnZSBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpIHtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZURldGFpbFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9ICF0aGlzLnZpZXdEZXRhaWxTY3JlZW47XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2UgbGlzdCB3aXRoIGEgbWVzc2FnZSBub3RpZnlpbmcgdGhhdCAsIHNjb3BlIGEgc29tZSB1c2VyIGlzIGNoYW5nZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJTY29wZUNoYW5nZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG5cbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBtYWRlICR7ZWFjaE1lbWJlci5uYW1lfSAke2VhY2hNZW1iZXIuc2NvcGV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlTGlzdCB3aXRoIG1lc3NhZ2VzIGFib3V0IHRoZSBtZW1iZXJzIHRoYXQgd2VyZSBhZGRlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlcnNBZGRlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBhZGRlZCAke2VhY2hNZW1iZXIubmFtZX1gO1xuICAgICAgY29uc3Qgc2VudEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgVGhlIGNvdW50IG9mICBudW1iZXIgb2YgbWVtYmVycyBwcmVzZW50IGluIGEgZ3JvdXAgYmFzZWQgb24gZ3JvdXAgYWN0aXZpdGllcyAsIGxpa2UgYWRkaW5nIGEgbWVtYmVyIG9yIGtpY2tpbmcgYSBtZW1iZXJcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICB1cGRhdGVNZW1iZXJzQ291bnQgPSAoaXRlbSwgY291bnQpID0+IHtcbiAgICBjb25zdCBncm91cCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwgeyBtZW1iZXJzQ291bnQ6IGNvdW50IH0pO1xuXG4gICAgdGhpcy5pdGVtID0gZ3JvdXA7XG4gICAgdGhpcy5ncm91cFRvVXBkYXRlID0gZ3JvdXA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ3VycmVudCBHcm91cCBJbmZvcm1hdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICBjb25zdCBuZXdPYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW1wic2NvcGVcIl0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLml0ZW0gPSBuZXdPYmo7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAgVW5iYW5zIHRoZSB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVtYmVyVW5iYW5uZWQobWVtYmVycykge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gdW5iYW5uZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBzZW50QXQ6IGFueSA9IChkYXRlIC8gMTAwMCkgfCAwO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfVxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9MZWF2ZSA9IGdyb3VwO1xuICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9EZWxldGUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gdmlkZW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICB2aWRlb0NhbGwgPSAoKSA9PiB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuVklERU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgb3V0Z29pbmdDYWxsOiBjYWxsIH0pO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0aGlzLmNhbGxNZXNzYWdlID0gY2FsbDtcbiAgfVxuXG4gIG91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogQUNDUEVUUyBJTkNPTUlORyBDQUxMXG4gICAqL1xuICBhY2NlcHRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgIGNvbnN0IHR5cGUgPSBjYWxsLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwidXNlclwiID8gY2FsbC5zZW5kZXIudWlkIDogY2FsbC5yZWNlaXZlcklkO1xuXG4gICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICAvLyB0aGlzLml0ZW1DbGlja2VkKGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLCB0eXBlKTtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNhbGwgaXMgYWNjZXB0ZWQgYW5kIGNvbm5lY3RlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbGxJbml0aWF0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5jb21pbmdDYWxsIFJlamVjdGVkXG4gICAqL1xuICByZWplY3RlZEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgbGV0IGluY29taW5nQ2FsbE1lc3NhZ2UgPSBjYWxsLmluY29taW5nQ2FsbDtcbiAgICBsZXQgcmVqZWN0ZWRDYWxsTWVzc2FnZSA9IGNhbGwucmVqZWN0ZWRDYWxsO1xuICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBsZXQgcmVjZWl2ZXJJZCA9XG4gICAgICByZWNlaXZlclR5cGUgPT09IFwidXNlclwiXG4gICAgICAgID8gaW5jb21pbmdDYWxsTWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgIDogaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgIGlmIChpbmNvbWluZ0NhbGxNZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVhZEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoaW5jb21pbmdDYWxsTWVzc2FnZS5pZCwgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKTtcbiAgICB9XG5cbiAgICAvL3VwZGF0aW5nIHVucmVhZGNvdW50IGluIGNoYXRzIGxpc3RcbiAgICB0aGlzLm1lc3NhZ2VUb01hcmtSZWFkID0gaW5jb21pbmdDYWxsTWVzc2FnZTtcblxuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgcmVjZWl2ZXJUeXBlID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIGlmIChcbiAgICAgICh0eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgKHR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJJZCA9PT0gaXRlbS51aWQpXG4gICAgKSB7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKHJlamVjdGVkQ2FsbE1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19