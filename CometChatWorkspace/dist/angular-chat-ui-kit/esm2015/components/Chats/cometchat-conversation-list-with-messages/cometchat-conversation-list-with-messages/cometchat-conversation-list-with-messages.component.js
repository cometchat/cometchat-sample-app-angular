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
            //   case "audioCall":
            //     this.audioCall();
            //   break;
            //   case "videoCall":
            //     this.videoCall();
            //   break;
            case enums.VIEW_DETAIL:
            case enums.CLOSE_DETAIL_CLICKED:
                this.toggleDetailView();
                break;
            //   // eslint-disable-next-line no-lone-blocks
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQXlCN0IsTUFBTSxPQUFPLDhDQUE4QztJQStCekQ7UUE1QkEsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3Qix3QkFBbUIsR0FBWSxLQUFLLENBQUM7O1FBRXJDLGNBQVMsR0FBRyxJQUFJ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Qjs7SUFDakIsdUVBQW1COztJQUNuQixzRUFBa0I7O0lBQ2xCLHVFQUFtQjs7SUFDbkIsc0VBQWtCOztJQUVsQiw0RUFBbUI7O0lBQ25CLHlFQUFpQzs7SUFDakMsb0VBQVc7O0lBRVgsc0VBQW9COztJQUNwQixzRUFBb0I7O0lBQ3BCLHFFQUFpQjs7SUFDakIsMkVBQWtCOzs7Ozs7SUFrTGxCLDBFQUdFOzs7Ozs7SUFvR0YsNEVBZ0JFOzs7Ozs7SUFNRixzRUFlRTs7Ozs7O0lBTUYsNEVBS0U7Ozs7OztJQU1GLHNFQTBCRTs7SUEyQkYsb0VBSUU7Ozs7OztJQU1GLHFFQUlFOzs7OztJQTJCRixtRUFvQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3Qtd2l0aC1tZXNzYWdlc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3Qtd2l0aC1tZXNzYWdlcy5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcIkZhZGVJbkZhZGVPdXRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwibm9ybWFsXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIjAlXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwiYW5pbWF0ZWRcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiLTEwMCVcIixcbiAgICAgICAgICB6SW5kZXg6IFwiMFwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw8PT5hbmltYXRlZFwiLCBhbmltYXRlKDMwMCkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0V2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY3VyZW50SXRlbTtcbiAgbGFzdE1lc3NhZ2U7XG4gIGl0ZW0gPSBudWxsO1xuICB0eXBlID0gXCJcIjtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBzaWRlYmFydmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICB0aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcblxuICBmdWxsU2NyZWVuVmlld0ltYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgaW1hZ2VWaWV3ID0gbnVsbDtcbiAgZ3JvdXBUb1VwZGF0ZSA9IHt9O1xuICBncm91cFRvTGVhdmUgPSB7fTtcbiAgZ3JvdXBUb0RlbGV0ZSA9IHt9O1xuICBncm91cE1lc3NhZ2UgPSBbXTtcblxuICBjaGVja0FuaW1hdGVkU3RhdGU7XG4gIGNoZWNrSWZBbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbm5lcldpZHRoO1xuXG4gIG91dGdvaW5nQ2FsbCA9IG51bGw7XG4gIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIGNhbGxNZXNzYWdlID0ge307XG4gIG1lc3NhZ2VUb01hcmtSZWFkO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltDb21ldENoYXRVbmlmaWVkXSBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZBbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcblxuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uID0gbnVsbCwgaXRlbSA9IG51bGwsIGNvdW50ID0gbnVsbCkge1xuICAgIGxldCBtZXNzYWdlID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5CTE9DS19VU0VSOlxuICAgICAgICB0aGlzLmJsb2NrVXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVU5CTE9DS19VU0VSOlxuICAgICAgICB0aGlzLnVuYmxvY2tVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gICBjYXNlIFwiYXVkaW9DYWxsXCI6XG4gICAgICAvLyAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyAgIGNhc2UgXCJ2aWRlb0NhbGxcIjpcbiAgICAgIC8vICAgICB0aGlzLnZpZGVvQ2FsbCgpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VEOlxuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gICAgICBjYXNlIGVudW1zLk1FTlVfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgIHRoaXMudG9nZ2xlU2lkZUJhcigpO1xuICAgICAgICB0aGlzLml0ZW0gPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfTUVOVV9DTElDS0VEOlxuICAgICAgICB0aGlzLnRvZ2dsZVNpZGVCYXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6XG4gICAgICAgIHRoaXMudmlld01lc3NhZ2VUaHJlYWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9USFJFQURfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy5jbG9zZVRocmVhZE1lc3NhZ2VzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRTpcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhudWxsKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElUOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURTpcbiAgICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQ6IHtcbiAgICAgICAgLy8gdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5jb21wb3NlZHRocmVhZG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4udGhpcy50aHJlYWRNZXNzYWdlUGFyZW50LFxuICAgICAgICAgIHJlcGx5Q291bnQ6IGFjdGlvbi5wYXlMb2FkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyU2NvcGVDaGFuZ2VkKGFjdGlvbi5wYXlMb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUlNfQURERUQ6IHtcbiAgICAgICAgdGhpcy5tZW1iZXJzQWRkZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJzQ291bnQoZGF0YS5pdGVtLCBkYXRhLmNvdW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgIHRoaXMuZ3JvdXBVcGRhdGVkKGRhdGEubWVzc2FnZSwgZGF0YS5rZXksIGRhdGEuZ3JvdXAsIGRhdGEub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVU5CQU5ORUQ6XG4gICAgICAgIHRoaXMubWVtYmVyVW5iYW5uZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5MRUZUX0dST1VQOiB7XG4gICAgICAgIHRoaXMubGVhdmVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkRFTEVURV9HUk9VUDoge1xuICAgICAgICB0aGlzLmRlbGV0ZUdyb3VwKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDoge1xuICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEOiB7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0pPSU5FRF9DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAvL3RoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLnJlamVjdGVkSW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FUlJPUjoge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUxhc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmxhc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuXG4gIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgY29uc3Qgc2lkZWJhcnZpZXcgPSB0aGlzLnNpZGViYXJ2aWV3O1xuICAgIHRoaXMuc2lkZWJhcnZpZXcgPSAhc2lkZWJhcnZpZXc7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgVXNlciBEZXRhaWwgUmlnaHQgU2lkZSBiYXJcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVEZXRhaWxWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSAhdGhpcy52aWV3RGV0YWlsU2NyZWVuO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIEFsbCB0aGUgSW50aWFsIENvbmRpdGlvbnMgZm9yIHRoZSB0aHJlYWRlZCBWaWV3IG9mIE1lc3NhZ2VzIGFuZCBPcGVucyB0aHJlYWQgVmlld1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIHZpZXdNZXNzYWdlVGhyZWFkKHBhcmVudE1lc3NhZ2UpIHtcbiAgICAvL09wZW4gVGhyZWFkIFNjcmVlblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSB0cnVlO1xuXG4gICAgLy9jbG9zZSB1c2VyICggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGggKSBEZXRhaWwgc2NyZWVuXG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBwYXJlbnRNZXNzYWdlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSB0aGlzLml0ZW07XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IHRoaXMudHlwZTtcbiAgfVxuXG4gIC8qXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICAvL2Nsb3NlIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgY2xpY2tlZCBJbWFnZSBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnZlcnNhdGlvbnNjcmVlbiB0b2dnbGVJbWFnZVZpZXcgXCIsIG1lc3NhZ2UpO1xuICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICB0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2UgPSAhdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBCbG9jayBzb21lb25lXG4gICAqL1xuICBibG9ja1VzZXIoKSB7XG4gICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLml0ZW0udWlkXTtcbiAgICBDb21ldENoYXRNYW5hZ2VyLmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi50aGlzLml0ZW0sIGJsb2NrZWRCeU1lOiB0cnVlIH07XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgY29uc29sZS5sb2coXCJibG9jayBzdWNjZXNzXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCbG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBVc2VyIFVuQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgdW5ibG9ja1VzZXIoKSB7XG4gICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLml0ZW0udWlkXTtcbiAgICBDb21ldENoYXRNYW5hZ2VyLnVuYmxvY2tVc2Vycyh1c2Vyc0xpc3QpXG4gICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLnRoaXMuaXRlbSwgYmxvY2tlZEJ5TWU6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInVuYmxvY2sgc3VjY2Vzc1wiKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidW5ibG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSB1c2VyIGVtaXR0ZWQgYnkgdGhlIHVzZXJMaXN0IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgdXNlclxuICAgKi9cbiAgdXNlckNsaWNrZWQoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZVRocmVhZE1lc3NhZ2VzKCk7XG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG4gICAgdGhpcy5pdGVtID0gZXZlbnQuY29udmVyc2F0aW9uV2l0aDtcbiAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG4gICAgdGhpcy5sYXN0TWVzc2FnZSA9IGV2ZW50Lmxhc3RNZXNzYWdlO1xuICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikpIHtcbiAgICAgIHRoaXMudHlwZSA9IFwidXNlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2UgbGlzdCB3aXRoIGEgbWVzc2FnZSBub3RpZnlpbmcgdGhhdCAsIHNjb3BlIGEgc29tZSB1c2VyIGlzIGNoYW5nZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJTY29wZUNoYW5nZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG5cbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBtYWRlICR7ZWFjaE1lbWJlci5uYW1lfSAke2VhY2hNZW1iZXIuc2NvcGV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlTGlzdCB3aXRoIG1lc3NhZ2VzIGFib3V0IHRoZSBtZW1iZXJzIHRoYXQgd2VyZSBhZGRlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlcnNBZGRlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBhZGRlZCAke2VhY2hNZW1iZXIubmFtZX1gO1xuICAgICAgY29uc3Qgc2VudEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgVGhlIGNvdW50IG9mICBudW1iZXIgb2YgbWVtYmVycyBwcmVzZW50IGluIGEgZ3JvdXAgYmFzZWQgb24gZ3JvdXAgYWN0aXZpdGllcyAsIGxpa2UgYWRkaW5nIGEgbWVtYmVyIG9yIGtpY2tpbmcgYSBtZW1iZXJcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICB1cGRhdGVNZW1iZXJzQ291bnQgPSAoaXRlbSwgY291bnQpID0+IHtcbiAgICBjb25zdCBncm91cCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwgeyBtZW1iZXJzQ291bnQ6IGNvdW50IH0pO1xuXG4gICAgdGhpcy5pdGVtID0gZ3JvdXA7XG4gICAgdGhpcy5ncm91cFRvVXBkYXRlID0gZ3JvdXA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ3VycmVudCBHcm91cCBJbmZvcm1hdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICBjb25zdCBuZXdPYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW1wic2NvcGVcIl0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLml0ZW0gPSBuZXdPYmo7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAgVW5iYW5zIHRoZSB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVtYmVyVW5iYW5uZWQobWVtYmVycykge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gdW5iYW5uZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBzZW50QXQ6IGFueSA9IChkYXRlIC8gMTAwMCkgfCAwO1xuXG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9XG4gIC8qIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGxlZnQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbGVhdmVHcm91cCA9IChncm91cCkgPT4ge1xuICAgIHRoaXMuZ3JvdXBUb0xlYXZlID0gZ3JvdXA7XG4gICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGdyb3VwIHNjcmVlbiBhbmQgYWxsICwgYWZ0ZXIgdXNlciBoYXMgZGVsZXRlZCB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBkZWxldGVHcm91cCA9IChncm91cCkgPT4ge1xuICAgIHRoaXMuZ3JvdXBUb0RlbGV0ZSA9IGdyb3VwO1xuICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gIH07XG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gdmlkZW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICB2aWRlb0NhbGwgPSAoKSA9PiB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuVklERU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgb3V0Z29pbmdDYWxsOiBjYWxsIH0pO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0aGlzLmNhbGxNZXNzYWdlID0gY2FsbDtcbiAgfVxuXG4gIG91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogQUNDUEVUUyBJTkNPTUlORyBDQUxMXG4gICAqL1xuICBhY2NlcHRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgIGNvbnN0IHR5cGUgPSBjYWxsLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwidXNlclwiID8gY2FsbC5zZW5kZXIudWlkIDogY2FsbC5yZWNlaXZlcklkO1xuXG4gICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICAvLyB0aGlzLml0ZW1DbGlja2VkKGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLCB0eXBlKTtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNhbGwgaXMgYWNjZXB0ZWQgYW5kIGNvbm5lY3RlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbGxJbml0aWF0ZWQobWVzc2FnZSkge1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5jb21pbmdDYWxsIFJlamVjdGVkXG4gICAqL1xuICByZWplY3RlZEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgbGV0IGluY29taW5nQ2FsbE1lc3NhZ2UgPSBjYWxsLmluY29taW5nQ2FsbDtcbiAgICBsZXQgcmVqZWN0ZWRDYWxsTWVzc2FnZSA9IGNhbGwucmVqZWN0ZWRDYWxsO1xuICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBsZXQgcmVjZWl2ZXJJZCA9XG4gICAgICByZWNlaXZlclR5cGUgPT09IFwidXNlclwiXG4gICAgICAgID8gaW5jb21pbmdDYWxsTWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgIDogaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgIGlmIChpbmNvbWluZ0NhbGxNZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVhZEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoaW5jb21pbmdDYWxsTWVzc2FnZS5pZCwgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKTtcbiAgICB9XG5cbiAgICAvL3VwZGF0aW5nIHVucmVhZGNvdW50IGluIGNoYXRzIGxpc3RcbiAgICB0aGlzLm1lc3NhZ2VUb01hcmtSZWFkID0gaW5jb21pbmdDYWxsTWVzc2FnZTtcblxuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgcmVjZWl2ZXJUeXBlID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIGlmIChcbiAgICAgICh0eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgKHR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJJZCA9PT0gaXRlbS51aWQpXG4gICAgKSB7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKHJlamVjdGVkQ2FsbE1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19