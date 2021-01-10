/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
export class CometchatConversationListWithMessagesComponent {
    constructor() {
        this.item = null;
        this.type = "";
        this.sidebarview = false;
        this.viewDetailScreen = false;
        this.threadMessageView = false;
        this.threadMessageItem = null;
        this.threadMessageType = "";
        this.threadMessageParent = null;
        this.composedthreadmessage = null;
        this.fullScreenViewImage = false;
        // To display image in full screen
        this.imageView = null;
        this.groupToUpdate = {};
        this.groupToLeave = {};
        this.groupToDelete = {};
        this.groupMessage = [];
        this.checkIfAnimated = false;
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = {};
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
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.loggedInUser = user;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("[CometChatUnified] getLoggedInUser error", error);
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
     * @param {?=} action
     * @param {?=} item
     * @param {?=} count
     * @return {?}
     */
    actionHandler(action = null, item = null, count = null) {
        /** @type {?} */
        let message = action.payLoad;
        /** @type {?} */
        let data = action.payLoad;
        switch (action.type) {
            case enums.BLOCK_USER:
                this.blockUser();
                break;
            case enums.UNBLOCK_USER:
                this.unblockUser();
                break;
            case enums.VIEW_DETAIL:
            case enums.CLOSE_DETAIL_CLICKED:
                this.toggleDetailView();
                break;
            case enums.MENU_CLICKED: {
                this.checkAnimatedState = "normal";
                this.toggleSideBar();
                this.item = null;
                break;
            }
            case enums.CLOSE_MENU_CLICKED:
                this.toggleSideBar();
                break;
            case enums.VIEW_MESSAGE_THREAD:
                this.viewMessageThread(message);
                break;
            case enums.CLOSE_THREAD_CLICKED:
                this.closeThreadMessages();
                break;
            case enums.VIEW_ACTUAL_IMAGE:
                this.toggleImageView(message);
                break;
            case enums.CLOSE_FULL_SCREEN_IMAGE: {
                this.toggleImageView(null);
            }
            case enums.MESSAGE_COMPOSED:
            case enums.MESSAGE_EDIT:
            case enums.MESSAGE_DELETE:
                this.updateLastMessage(message);
                break;
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
            default:
                break;
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    updateLastMessage(message) {
        this.lastMessage = message;
    }
    /**
     * @return {?}
     */
    toggleSideBar() {
        /** @type {?} */
        const sidebarview = this.sidebarview;
        this.sidebarview = !sidebarview;
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
    /*
       * Close the thread window
       * @param Any parentMessage
       */
    /**
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
        // console.log("Conversationscreen toggleImageView ", message);
        this.imageView = message;
        this.fullScreenViewImage = !this.fullScreenViewImage;
    }
    /**
     * When User Block someone
     * @return {?}
     */
    blockUser() {
        /** @type {?} */
        let usersList = [this.item.uid];
        CometChatManager.blockUsers(usersList)
            .then((/**
         * @param {?} list
         * @return {?}
         */
        (list) => {
            this.item = Object.assign({}, this.item, { blockedByMe: true });
            this.curentItem = this.item;
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
        let usersList = [this.item.uid];
        CometChatManager.unblockUsers(usersList)
            .then((/**
         * @param {?} list
         * @return {?}
         */
        (list) => {
            this.item = Object.assign({}, this.item, { blockedByMe: false });
            this.curentItem = this.item;
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
     * Listen to the user emitted by the userList component
     * @param {?} event
     * @return {?}
     */
    userClicked(event) {
        if (this.checkAnimatedState !== null) {
            this.checkAnimatedState == "normal"
                ? (this.checkAnimatedState = "animated")
                : (this.checkAnimatedState = "normal");
        }
        this.closeThreadMessages();
        this.viewDetailScreen = false;
        this.item = event.conversationWith;
        this.curentItem = this.item;
        this.lastMessage = event.lastMessage;
        if (this.item.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
        }
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
CometchatConversationListWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-conversation-list-with-messages",
                template: "<div class=\"chatScreenStyle\">\n  <div class=\"chatScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-conversation-list\n      (onUserClick)=\"userClicked($event)\"\n      [item]=\"curentItem\"\n      [lastMessage]=\"lastMessage\"\n      [type]=\"type\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n    ></cometchat-conversation-list>\n  </div>\n  <div\n    class=\"chatScreenMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      chatScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <!--Message List Screen-->\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [groupMessage]=\"groupMessage\"\n      [composedthreadmessage]=\"composedthreadmessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-messages>\n    <!--Message List Screen ENDS-->\n  </div>\n\n  <!--DetailScreen-->\n\n  <div\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n    class=\"chatScreenSecondaryStyle\"\n  >\n    <!--IF USER-->\n    <div\n      *ngIf=\"type === 'user'\"\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      >\n      </cometchat-user-details>\n    </div>\n    <!--IF USER ENDS-->\n\n    <!--IF GROUP-->\n    <div *ngIf=\"type === 'group'\">\n      <cometchat-group-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-group-details>\n    </div>\n\n    <!--GROUP ENDS-->\n\n    <!--ThreadedMessageView-->\n\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [MessageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
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
                styles: ["*{font-family:Inter,sans-serif;overflow:hidden}.chatScreenStyle{display:flex;height:100%;width:100%;box-sizing:border-box}.chatScreenStyle *{box-sizing:border-box}.chatScreenStyle::-webkit-scrollbar{width:8px;height:4px}.chatScreenStyle::-webkit-scrollbar-track{background:#ffffff00}.chatScreenStyle::-webkit-scrollbar-thumb{background:#ccc}.chatScreenStyle::-webkit-scrollbar-thumb:hover{background:#aaa}.chatScreenSidebarStyle{width:280px;border:1px solid #eaeaea;height:100%;position:relative}.chatScreenMainStyle{width:calc(100% - 280px);display:flex;flex-direction:column;height:100%;order:2}.chatScreenMainSecondaryStyle{width:calc(100% - 500px)}.chatScreenSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}.detailScreenStyle{height:100%}@media (min-width:320px) and (max-width:767px){.chatScreenSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;background-color:#fff;z-index:2}.chatScreenMainStyle{width:100%!important;background-color:#fff}.chatScreenSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometchatConversationListWithMessagesComponent.ctorParameters = () => [];
CometchatConversationListWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.curentItem;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.sidebarview;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.composedthreadmessage;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.innerWidth;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.messageToMarkRead;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.toggleDetailView;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.groupUpdated;
    /** @type {?} */
    CometchatConversationListWithMessagesComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQXlCN0IsTUFBTSxPQUFPLDhDQUE4QztJQStCekQ7UUE1QkEsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3Qix3QkFBbUIsR0FBWSxLQUFLLENBQUM7O1FBRXJDLGNBQVMsR0FBRyxJQUFJ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O0lBQ3BCLHNFQUFvQjs7SUFDcEIscUVBQWlCOztJQUNqQiwyRUFBa0I7Ozs7OztJQTBLbEIsMEVBR0U7Ozs7OztJQW9HRiw0RUFnQkU7Ozs7OztJQU1GLHNFQWVFOzs7Ozs7SUFNRiw0RUFLRTs7Ozs7O0lBTUYsc0VBMEJFOztJQTJCRixvRUFJRTs7Ozs7O0lBTUYscUVBSUU7Ozs7O0lBMkJGLG1FQW1CRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuXG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCItMTAwJVwiLFxuICAgICAgICAgIHpJbmRleDogXCIwXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdENvbnZlcnNhdGlvbkxpc3RXaXRoTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjdXJlbnRJdGVtO1xuICBsYXN0TWVzc2FnZTtcbiAgaXRlbSA9IG51bGw7XG4gIHR5cGUgPSBcIlwiO1xuICBsb2dnZWRJblVzZXI7XG4gIHNpZGViYXJ2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHZpZXdEZXRhaWxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZUl0ZW0gPSBudWxsO1xuICB0aHJlYWRNZXNzYWdlVHlwZSA9IFwiXCI7XG4gIHRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICBjb21wb3NlZHRocmVhZG1lc3NhZ2UgPSBudWxsO1xuXG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gVG8gZGlzcGxheSBpbWFnZSBpbiBmdWxsIHNjcmVlblxuICBpbWFnZVZpZXcgPSBudWxsO1xuICBncm91cFRvVXBkYXRlID0ge307XG4gIGdyb3VwVG9MZWF2ZSA9IHt9O1xuICBncm91cFRvRGVsZXRlID0ge307XG4gIGdyb3VwTWVzc2FnZSA9IFtdO1xuXG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZTtcbiAgY2hlY2tJZkFuaW1hdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyV2lkdGg7XG5cbiAgb3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgY2FsbE1lc3NhZ2UgPSB7fTtcbiAgbWVzc2FnZVRvTWFya1JlYWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICBuZXcgQ29tZXRDaGF0TWFuYWdlcigpXG4gICAgICAuZ2V0TG9nZ2VkSW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0NvbWV0Q2hhdFVuaWZpZWRdIGdldExvZ2dlZEluVXNlciBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQ2hlY2tzIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZCBpbiByZWFsdGltZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIiwgW10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPj0gXCIzMjBcIiAmJiB0aGlzLmlubmVyV2lkdGggPD0gXCI3NjdcIikge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuXG4gICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gbnVsbDtcbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24gPSBudWxsLCBpdGVtID0gbnVsbCwgY291bnQgPSBudWxsKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLkJMT0NLX1VTRVI6XG4gICAgICAgIHRoaXMuYmxvY2tVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5VTkJMT0NLX1VTRVI6XG4gICAgICAgIHRoaXMudW5ibG9ja1VzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICB0aGlzLnRvZ2dsZVNpZGVCYXIoKTtcbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX01FTlVfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlQmFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFEOlxuICAgICAgICB0aGlzLnZpZXdNZXNzYWdlVGhyZWFkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQ6XG4gICAgICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6XG4gICAgICAgIHRoaXMudG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobnVsbCk7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfQ09NUE9TRUQ6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgIHRoaXMudXBkYXRlTGFzdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgIC8vIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuXG4gICAgICAgIHRoaXMuY29tcG9zZWR0aHJlYWRtZXNzYWdlID0ge1xuICAgICAgICAgIC4uLnRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCxcbiAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgfTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICB0aGlzLm1lbWJlclNjb3BlQ2hhbmdlZChhY3Rpb24ucGF5TG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX0FEREVEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyc0FkZGVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19VUERBVEVEOiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyc0NvdW50KGRhdGEuaXRlbSwgZGF0YS5jb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9VUERBVEVEOlxuICAgICAgICB0aGlzLmdyb3VwVXBkYXRlZChkYXRhLm1lc3NhZ2UsIGRhdGEua2V5LCBkYXRhLmdyb3VwLCBkYXRhLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgICB0aGlzLm1lbWJlclVuYmFubmVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTEVGVF9HUk9VUDoge1xuICAgICAgICB0aGlzLmxlYXZlR3JvdXAoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfR1JPVVA6IHtcbiAgICAgICAgdGhpcy5kZWxldGVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgIHRoaXMudmlkZW9DYWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICBjYXNlIGVudW1zLkNBTExfRU5ERURfQllfVVNFUjpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRDoge1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9MRUZUX0NBTEw6IHtcbiAgICAgICAgLy90aGlzLmFwcGVuZENhbGxNZXNzYWdlKGl0ZW0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUNDRVBUX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hY2NlcHRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMuY2FsbEluaXRpYXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlJFSkVDVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNBTExfRVJST1I6IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJVc2VyIExpc3Qgc2NyZWVuIC0tPiBjYWxsIGNvdWxkbid0IGNvbXBsZXRlIGR1ZSB0byBlcnJvclwiLFxuICAgICAgICAgIGFjdGlvbi5wYXlMb2FkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5sYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICB0b2dnbGVTaWRlQmFyKCkge1xuICAgIGNvbnN0IHNpZGViYXJ2aWV3ID0gdGhpcy5zaWRlYmFydmlldztcbiAgICB0aGlzLnNpZGViYXJ2aWV3ID0gIXNpZGViYXJ2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIFVzZXIgRGV0YWlsIFJpZ2h0IFNpZGUgYmFyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlRGV0YWlsVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gIXRoaXMudmlld0RldGFpbFNjcmVlbjtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBBbGwgdGhlIEludGlhbCBDb25kaXRpb25zIGZvciB0aGUgdGhyZWFkZWQgVmlldyBvZiBNZXNzYWdlcyBhbmQgT3BlbnMgdGhyZWFkIFZpZXdcbiAgICogQHBhcmFtIEFueSBwYXJlbnRNZXNzYWdlXG4gICAqL1xuICB2aWV3TWVzc2FnZVRocmVhZChwYXJlbnRNZXNzYWdlKSB7XG4gICAgLy9PcGVuIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gdHJ1ZTtcblxuICAgIC8vY2xvc2UgdXNlciAoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoICkgRGV0YWlsIHNjcmVlblxuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gcGFyZW50TWVzc2FnZTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gdGhpcy5pdGVtO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVR5cGUgPSB0aGlzLnR5cGU7XG4gIH1cblxuICAvKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIGNsb3NlVGhyZWFkTWVzc2FnZXMoKSB7XG4gICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb252ZXJzYXRpb25zY3JlZW4gdG9nZ2xlSW1hZ2VWaWV3IFwiLCBtZXNzYWdlKTtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgc3VjY2Vzc1wiKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBVbkJsb2NrIHNvbWVvbmVcbiAgICovXG4gIHVuYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci51bmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi50aGlzLml0ZW0sIGJsb2NrZWRCeU1lOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NrIHN1Y2Nlc3NcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVuYmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgdXNlciBlbWl0dGVkIGJ5IHRoZSB1c2VyTGlzdCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IHVzZXJcbiAgICovXG4gIHVzZXJDbGlja2VkKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgID8gKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJhbmltYXRlZFwiKVxuICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgIHRoaXMuaXRlbSA9IGV2ZW50LmNvbnZlcnNhdGlvbldpdGg7XG4gICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBldmVudC5sYXN0TWVzc2FnZTtcbiAgICBpZiAodGhpcy5pdGVtLmhhc093blByb3BlcnR5KFwidWlkXCIpKSB7XG4gICAgICB0aGlzLnR5cGUgPSBcInVzZXJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlIGxpc3Qgd2l0aCBhIG1lc3NhZ2Ugbm90aWZ5aW5nIHRoYXQgLCBzY29wZSBhIHNvbWUgdXNlciBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyU2NvcGVDaGFuZ2VkID0gKG1lbWJlcnMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuXG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gbWFkZSAke2VhY2hNZW1iZXIubmFtZX0gJHtlYWNoTWVtYmVyLnNjb3BlfWA7XG4gICAgICBjb25zdCBzZW50QXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyB0aGUgbWVzc2FnZUxpc3Qgd2l0aCBtZXNzYWdlcyBhYm91dCB0aGUgbWVtYmVycyB0aGF0IHdlcmUgYWRkZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJzQWRkZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gYWRkZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIFRoZSBjb3VudCBvZiAgbnVtYmVyIG9mIG1lbWJlcnMgcHJlc2VudCBpbiBhIGdyb3VwIGJhc2VkIG9uIGdyb3VwIGFjdGl2aXRpZXMgLCBsaWtlIGFkZGluZyBhIG1lbWJlciBvciBraWNraW5nIGEgbWVtYmVyXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgdXBkYXRlTWVtYmVyc0NvdW50ID0gKGl0ZW0sIGNvdW50KSA9PiB7XG4gICAgY29uc3QgZ3JvdXAgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHsgbWVtYmVyc0NvdW50OiBjb3VudCB9KTtcblxuICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuICAgIHRoaXMuZ3JvdXBUb1VwZGF0ZSA9IGdyb3VwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIEN1cnJlbnQgR3JvdXAgSW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAobWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6IHtcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgY29uc3QgbmV3T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7XG4gICAgICAgICAgICBzY29wZTogb3B0aW9uc1tcInNjb3BlXCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5pdGVtID0gbmV3T2JqO1xuICAgICAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIFVuYmFucyB0aGUgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lbWJlclVuYmFubmVkKG1lbWJlcnMpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IHVuYmFubmVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICBjb25zdCBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcblxuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfVxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9MZWF2ZSA9IGdyb3VwO1xuICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9EZWxldGUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIGF1ZGlvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIHZpZGVvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgdmlkZW9DYWxsID0gKCkgPT4ge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcblxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICBhcHBlbmRDYWxsTWVzc2FnZShjYWxsKSB7XG4gICAgdGhpcy5jYWxsTWVzc2FnZSA9IGNhbGw7XG4gIH1cblxuICBvdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFDQ1BFVFMgSU5DT01JTkcgQ0FMTFxuICAgKi9cbiAgYWNjZXB0SW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICB0aGlzLmluY29taW5nQ2FsbCA9IGNhbGw7XG5cbiAgICBjb25zdCB0eXBlID0gY2FsbC5yZWNlaXZlclR5cGU7XG4gICAgY29uc3QgaWQgPSB0eXBlID09PSBcInVzZXJcIiA/IGNhbGwuc2VuZGVyLnVpZCA6IGNhbGwucmVjZWl2ZXJJZDtcblxuICAgIENvbWV0Q2hhdC5nZXRDb252ZXJzYXRpb24oaWQsIHR5cGUpXG4gICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNhbGwgaXMgYWNjZXB0ZWQgYW5kIGNvbm5lY3RlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbGxJbml0aWF0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5jb21pbmdDYWxsIFJlamVjdGVkXG4gICAqL1xuICByZWplY3RlZEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgbGV0IGluY29taW5nQ2FsbE1lc3NhZ2UgPSBjYWxsLmluY29taW5nQ2FsbDtcbiAgICBsZXQgcmVqZWN0ZWRDYWxsTWVzc2FnZSA9IGNhbGwucmVqZWN0ZWRDYWxsO1xuICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBsZXQgcmVjZWl2ZXJJZCA9XG4gICAgICByZWNlaXZlclR5cGUgPT09IFwidXNlclwiXG4gICAgICAgID8gaW5jb21pbmdDYWxsTWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgIDogaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgIGlmIChpbmNvbWluZ0NhbGxNZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVhZEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoaW5jb21pbmdDYWxsTWVzc2FnZS5pZCwgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKTtcbiAgICB9XG5cbiAgICAvL3VwZGF0aW5nIHVucmVhZGNvdW50IGluIGNoYXRzIGxpc3RcbiAgICB0aGlzLm1lc3NhZ2VUb01hcmtSZWFkID0gaW5jb21pbmdDYWxsTWVzc2FnZTtcblxuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgcmVjZWl2ZXJUeXBlID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIGlmIChcbiAgICAgICh0eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgKHR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJJZCA9PT0gaXRlbS51aWQpXG4gICAgKSB7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKHJlamVjdGVkQ2FsbE1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19