/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-group-with-messages/cometchat-group-with-messages/cometchat-group-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { CometChatManager } from "../../../../utils/controller";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
export class CometChatGroupWithMessagesComponent {
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
        this.composedThreadMessage = null;
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
         * updates the message list with a message notifying that , scope a some user is changed
         * @param Any members
         */
        this.memberScopeChanged = (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            try {
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
                    const date = new Date();
                    /** @type {?} */
                    const sentAt = (date / 1000) | 0;
                    /** @type {?} */
                    const messageObj = {
                        category: CometChat.CATEGORY_ACTION,
                        message: message,
                        type: enums.ACTION_TYPE_GROUPMEMBER,
                        sentAt: sentAt,
                    };
                    messageList.push(messageObj);
                }));
                this.groupMessage = messageList;
            }
            catch (error) {
                logger(error);
            }
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
            try {
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
                    const date = new Date();
                    /** @type {?} */
                    const sentAt = (date / 1000) | 0;
                    /** @type {?} */
                    const messageObj = {
                        category: CometChat.CATEGORY_ACTION,
                        message: message,
                        type: enums.ACTION_TYPE_GROUPMEMBER,
                        sentAt: sentAt,
                    };
                    messageList.push(messageObj);
                }));
                this.groupMessage = messageList;
            }
            catch (error) {
                logger(error);
            }
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
            try {
                /** @type {?} */
                const group = Object.assign({}, this.item, { membersCount: count });
                this.item = group;
                this.groupToUpdate = group;
            }
            catch (error) {
                logger(error);
            }
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
            try {
                switch (key) {
                    case enums.GROUP_MEMBER_BANNED:
                    case enums.GROUP_MEMBER_KICKED: {
                        if (options.user.uid === this.loggedInUser.uid) {
                            this.item = null;
                            this.type = CometChat.RECEIVER_TYPE.GROUP;
                            this.viewDetailScreen = false;
                        }
                        break;
                    }
                    case enums.GROUP_MEMBER_SCOPE_CHANGED: {
                        if (options.user.uid === this.loggedInUser.uid) {
                            /** @type {?} */
                            const newObj = Object.assign({}, this.item, {
                                scope: options[enums.SCOPE],
                            });
                            this.item = newObj;
                            this.type = CometChat.RECEIVER_TYPE.GROUP;
                            this.viewDetailScreen = false;
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
            catch (error) {
                logger(error);
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
            try {
                this.groupToLeave = group;
                this.toggleDetailView();
                this.item = null;
            }
            catch (error) {
                logger(error);
            }
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
            try {
                this.groupToDelete = group;
                this.toggleDetailView();
                this.item = null;
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
                    receiverId = this.item.uid;
                    receiverType = CometChat.RECEIVER_TYPE.USER;
                }
                else if (this.type === CometChat.RECEIVER_TYPE.GROUP) {
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
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        try {
            if (this.checkAnimatedState !== null) {
                this.checkAnimatedState == "normal"
                    ? (this.checkAnimatedState = "animated")
                    : (this.checkAnimatedState = "normal");
            }
            this.item = group;
            //Close Thread And User Detail Screen When Chat Window Is Changed
            this.closeThreadMessages();
            this.viewDetailScreen = false;
            if (this.item.hasOwnProperty(enums.UID)) {
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
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            /** @type {?} */
            let message = action.payLoad;
            /** @type {?} */
            let data = action.payLoad;
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
                }
                case enums.MENU_CLICKED: {
                    this.checkAnimatedState = "normal";
                    this.item = null;
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
            this.threadMessageItem = this.item;
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
     *  Unbans the user
     * @param {?} members
     * @return {?}
     */
    memberUnbanned(members) {
        try {
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
                    category: CometChat.CATEGORY_ACTION,
                    message: message,
                    type: enums.ACTION_TYPE_GROUPMEMBER,
                    sentAt: sentAt,
                };
                messageList.push(messageObj);
            }));
            this.groupMessage = messageList;
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
                receiverId = this.item.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (this.type === CometChat.RECEIVER_TYPE.GROUP) {
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
                logger("Call initialization failed with exception:", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Appends call activities as messages to messageList
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
     * closes call screen
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
     * opens call screen when user accepts the incoming call
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
                this.item = Object.assign({}, conversation.conversationWith);
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
     * appends call accepted message , When call is accepted and connected
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
     * closes call screen and sets call settings to initial when IncomingCall Rejected
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
            let item = this.item;
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
CometChatGroupWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-with-messages",
                template: "<div class=\"groupScreenStyle\">\n  <div class=\"groupScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <!-- Group List left side bar -->\n    <cometchat-group-list\n      [enableSelectedGroupStyling]=\"true\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      (onGroupClick)=\"groupClicked($event)\"\n    ></cometchat-group-list>\n  </div>\n\n  <div\n    class=\"groupScreenMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      groupScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [groupMessage]=\"groupMessage\"\n      [composedThreadMessage]=\"composedThreadMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-messages>\n  </div>\n\n  <div\n    class=\"groupScreenSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <!-- Message Thread Right side bar -->\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n\n    <!-- Detail sceen -->\n    <cometchat-group-details\n      *ngIf=\"viewDetailScreen\"\n      [item]=\"item\"\n      [type]=\"type\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-group-details>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [messageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
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
CometChatGroupWithMessagesComponent.ctorParameters = () => [];
CometChatGroupWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.composedThreadMessage;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.callInitialised;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.innerWidth;
    /**
     * Updates the thread message , it the currently open thread parent is deleted or is edited
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.updateThreadMessage;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.toggleDetailView;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.groupUpdated;
    /** @type {?} */
    CometChatGroupWithMessagesComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometChatGroupWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL0NvbWV0Q2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBd0JsRCxNQUFNLE9BQU8sbUNBQW1DO0lBcUM5Qzs7UUFuQ0EsU0FBSSxHQUFHLElBQUksQ0FBQzs7UUFHWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7O1FBRWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7O1FBR2pCLHdCQUFtQixHQUFZLEtBQUss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Qjs7SUFDbEIsNERBQW1COztJQUNuQiwyREFBa0I7O0lBR2xCLDJEQUFvQjs7SUFDcEIsMkRBQW9COztJQUNwQiwwREFBbUI7O0lBQ25CLGdFQUFrQjs7SUFFbEIsOERBQWlDOztJQUNqQyxpRUFBbUI7O0lBQ25CLDhEQUFpQzs7SUFDakMseURBQVc7Ozs7O0lBbU5YLGtFQWVFOzs7Ozs7SUFtQ0YsK0RBT0U7Ozs7OztJQU1GLGlFQXFCRTs7Ozs7O0lBTUYsMkRBb0JFOzs7Ozs7SUFNRixpRUFTRTs7Ozs7O0lBTUYsMkRBOEJFOztJQThCRix5REFRRTs7Ozs7O0lBTUYsMERBUUU7Ozs7O0lBZ0NGLHdEQXVCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtd2l0aC1tZXNzYWdlcy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIi0xMDAlXCIsXG4gICAgICAgICAgekluZGV4OiBcIjBcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFwibm9ybWFsPD0+YW5pbWF0ZWRcIiwgYW5pbWF0ZSgzMDApKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0R3JvdXBXaXRoTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvL0l0IGNhbiBiZSBhIHVzZXIgb3IgYSBncm91cFxuICBpdGVtID0gbnVsbDtcblxuICAvLyBEZWZpbmVzIHRoZSB0eXBlcyBvZiBpdGVtIHRoYXQgd2FzIGNsaWNrZWQgLS0+IHRoYXQgaXMgLi4gaWYgaXRzIGEgdXNlciBvciBhIGdyb3VwXG4gIHR5cGUgPSBudWxsO1xuXG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG5cbiAgdGhyZWFkTWVzc2FnZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICBjb21wb3NlZFRocmVhZE1lc3NhZ2UgPSBudWxsO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgaW1hZ2VWaWV3ID0gbnVsbDtcblxuICAvL0lmIGNsaWNrZWQgdGhlbiBvbmx5IHNob3cgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdyb3VwVG9VcGRhdGUgPSB7fTtcbiAgZ3JvdXBUb0xlYXZlID0ge307XG4gIGdyb3VwVG9EZWxldGUgPSB7fTtcbiAgZ3JvdXBNZXNzYWdlID0gW107XG5cbiAgLy9mb3IgYXVkaW8gY2FsbGluZ1xuICBvdXRnb2luZ0NhbGwgPSBudWxsO1xuICBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBjYWxsTWVzc2FnZSA9IG51bGw7XG4gIG1lc3NhZ2VUb01hcmtSZWFkO1xuXG4gIGNhbGxJbml0aWFsaXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja0FuaW1hdGVkU3RhdGU7XG4gIGNoZWNrSWZBbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbm5lcldpZHRoO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBncm91cCBlbWl0dGVkIGJ5IHRoZSBncm91cExpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgICA/ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwiYW5pbWF0ZWRcIilcbiAgICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5pdGVtID0gZ3JvdXA7XG5cbiAgICAgIC8vQ2xvc2UgVGhyZWFkIEFuZCBVc2VyIERldGFpbCBTY3JlZW4gV2hlbiBDaGF0IFdpbmRvdyBJcyBDaGFuZ2VkXG4gICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5pdGVtLmhhc093blByb3BlcnR5KGVudW1zLlVJRCkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlubmVyV2lkdGggPj0gZW51bXMuQlJFQUtQT0lOVF9NSU5fV0lEVEggJiZcbiAgICAgICAgdGhpcy5pbm5lcldpZHRoIDw9IGVudW1zLkJSRUFLUE9JTlRfTUFYX1dJRFRIXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJZkFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcblxuICAgICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDoge1xuICAgICAgICAgIHRoaXMudmlld01lc3NhZ2VUaHJlYWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMudXBkYXRlVGhyZWFkTWVzc2FnZShhY3Rpb24ucGF5TG9hZFswXSwgYWN0aW9uLnVwZGF0ZVR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQ6IHtcbiAgICAgICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgICBjYXNlIGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VEOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgICAgdGhpcy5jb21wb3NlZFRocmVhZE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQsXG4gICAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgICAgdGhpcy5tZW1iZXJTY29wZUNoYW5nZWQoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19BRERFRDoge1xuICAgICAgICAgIHRoaXMubWVtYmVyc0FkZGVkKGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJzQ291bnQoZGF0YS5pdGVtLCBkYXRhLmNvdW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoZGF0YS5tZXNzYWdlLCBkYXRhLmtleSwgZGF0YS5ncm91cCwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVU5CQU5ORUQ6XG4gICAgICAgICAgdGhpcy5tZW1iZXJVbmJhbm5lZChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5MRUZUX0dST1VQOiB7XG4gICAgICAgICAgdGhpcy5sZWF2ZUdyb3VwKGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuREVMRVRFX0dST1VQOiB7XG4gICAgICAgICAgdGhpcy5kZWxldGVHcm91cChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgICB0aGlzLnZpZGVvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQ6XG4gICAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRU5ERUQ6IHtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQUNDRVBUX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmNhbGxJbml0aWF0ZWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5SRUpFQ1RFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5yZWplY3RlZEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRVJST1I6IHtcbiAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb24ucGF5TG9hZFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIEFsbCB0aGUgSW50aWFsIENvbmRpdGlvbnMgZm9yIHRoZSB0aHJlYWRlZCBWaWV3IG9mIE1lc3NhZ2VzIGFuZCBPcGVucyB0aHJlYWQgVmlld1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIHZpZXdNZXNzYWdlVGhyZWFkKHBhcmVudE1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgLy9PcGVuIFRocmVhZCBTY3JlZW5cbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSB0cnVlO1xuXG4gICAgICAvL2Nsb3NlIHVzZXIgKCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBzY3JlZW5cbiAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBwYXJlbnRNZXNzYWdlO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVR5cGUgPSB0aGlzLnR5cGU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHRocmVhZCBtZXNzYWdlICwgaXQgdGhlIGN1cnJlbnRseSBvcGVuIHRocmVhZCBwYXJlbnQgaXMgZGVsZXRlZCBvciBpcyBlZGl0ZWRcbiAgICovXG4gIHVwZGF0ZVRocmVhZE1lc3NhZ2UgPSAobWVzc2FnZSwgYWN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IGVudW1zLkRFTEVURSkge1xuICAgICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSB7IC4uLm1lc3NhZ2UgfTtcbiAgICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0geyAuLi5tZXNzYWdlIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIGNsb3NlVGhyZWFkTWVzc2FnZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vY2xvc2UgVGhyZWFkIFNjcmVlblxuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSBudWxsO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVJbWFnZVZpZXcobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2UgPSAhdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZURldGFpbFZpZXcgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9ICF0aGlzLnZpZXdEZXRhaWxTY3JlZW47XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlIGxpc3Qgd2l0aCBhIG1lc3NhZ2Ugbm90aWZ5aW5nIHRoYXQgLCBzY29wZSBhIHNvbWUgdXNlciBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyU2NvcGVDaGFuZ2VkID0gKG1lbWJlcnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcblxuICAgICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBtYWRlICR7ZWFjaE1lbWJlci5uYW1lfSAke2VhY2hNZW1iZXIuc2NvcGV9YDtcbiAgICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBjYXRlZ29yeTogQ29tZXRDaGF0LkNBVEVHT1JZX0FDVElPTixcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlTGlzdCB3aXRoIG1lc3NhZ2VzIGFib3V0IHRoZSBtZW1iZXJzIHRoYXQgd2VyZSBhZGRlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlcnNBZGRlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IGFkZGVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHNlbnRBdDogYW55ID0gKGRhdGUgLyAxMDAwKSB8IDA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgICAgY2F0ZWdvcnk6IENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT04sXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgICAgfTtcbiAgICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyBUaGUgY291bnQgb2YgIG51bWJlciBvZiBtZW1iZXJzIHByZXNlbnQgaW4gYSBncm91cCBiYXNlZCBvbiBncm91cCBhY3Rpdml0aWVzICwgbGlrZSBhZGRpbmcgYSBtZW1iZXIgb3Iga2lja2luZyBhIG1lbWJlclxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIHVwZGF0ZU1lbWJlcnNDb3VudCA9IChpdGVtLCBjb3VudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBncm91cCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwgeyBtZW1iZXJzQ291bnQ6IGNvdW50IH0pO1xuXG4gICAgICB0aGlzLml0ZW0gPSBncm91cDtcbiAgICAgIHRoaXMuZ3JvdXBUb1VwZGF0ZSA9IGdyb3VwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBDdXJyZW50IEdyb3VwIEluZm9ybWF0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ3JvdXBVcGRhdGVkID0gKG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6IHtcbiAgICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwge1xuICAgICAgICAgICAgICBzY29wZTogb3B0aW9uc1tlbnVtcy5TQ09QRV0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pdGVtID0gbmV3T2JqO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqICBVbmJhbnMgdGhlIHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBtZW1iZXJVbmJhbm5lZChtZW1iZXJzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IHVuYmFubmVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHNlbnRBdDogYW55ID0gKGRhdGUgLyAxMDAwKSB8IDA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgICAgY2F0ZWdvcnk6IENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT04sXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgICAgfTtcbiAgICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ncm91cFRvTGVhdmUgPSBncm91cDtcbiAgICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ncm91cFRvRGVsZXRlID0gZ3JvdXA7XG4gICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgICBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSKSB7XG4gICAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQKSB7XG4gICAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICB9XG5cbiAgICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIHZpZGVvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgdmlkZW9DYWxsID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPKVxuICAgICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG5cbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgY2FsbCBhY3Rpdml0aWVzIGFzIG1lc3NhZ2VzIHRvIG1lc3NhZ2VMaXN0XG4gICAqL1xuICBhcHBlbmRDYWxsTWVzc2FnZShjYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2FsbE1lc3NhZ2UgPSBjYWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjbG9zZXMgY2FsbCBzY3JlZW5cbiAgICovXG4gIG91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogb3BlbnMgY2FsbCBzY3JlZW4gd2hlbiB1c2VyIGFjY2VwdHMgdGhlIGluY29taW5nIGNhbGxcbiAgICovXG4gIGFjY2VwdEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgICAgY29uc3QgdHlwZSA9IGNhbGwucmVjZWl2ZXJUeXBlO1xuICAgICAgY29uc3QgaWQgPVxuICAgICAgICB0eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSXG4gICAgICAgICAgPyBjYWxsLnNlbmRlci51aWRcbiAgICAgICAgICA6IGNhbGwucmVjZWl2ZXJJZDtcblxuICAgICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5pdGVtID0geyAuLi5jb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCB9O1xuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJlcnJvciB3aGlsZSBmZXRjaGluZyBhIGNvbnZlcnNhdGlvblwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmRzIGNhbGwgYWNjZXB0ZWQgbWVzc2FnZSAsIFdoZW4gY2FsbCBpcyBhY2NlcHRlZCBhbmQgY29ubmVjdGVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2FsbEluaXRpYXRlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNsb3NlcyBjYWxsIHNjcmVlbiBhbmQgc2V0cyBjYWxsIHNldHRpbmdzIHRvIGluaXRpYWwgd2hlbiBJbmNvbWluZ0NhbGwgUmVqZWN0ZWRcbiAgICovXG4gIHJlamVjdGVkSW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGluY29taW5nQ2FsbE1lc3NhZ2UgPSBjYWxsLmluY29taW5nQ2FsbDtcbiAgICAgIGxldCByZWplY3RlZENhbGxNZXNzYWdlID0gY2FsbC5yZWplY3RlZENhbGw7XG4gICAgICBsZXQgcmVjZWl2ZXJUeXBlID0gaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgICBsZXQgcmVjZWl2ZXJJZCA9XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUlxuICAgICAgICAgID8gaW5jb21pbmdDYWxsTWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgICAgOiBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICAgIC8vbWFya2luZyB0aGUgaW5jb21pbmcgY2FsbCBtZXNzYWdlIGFzIHJlYWRcbiAgICAgIGlmIChpbmNvbWluZ0NhbGxNZXNzYWdlLmhhc093blByb3BlcnR5KGVudW1zLlJFQURfQVQpID09PSBmYWxzZSkge1xuICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChpbmNvbWluZ0NhbGxNZXNzYWdlLmlkLCByZWNlaXZlcklkLCByZWNlaXZlclR5cGUpO1xuICAgICAgfVxuXG4gICAgICAvL3VwZGF0aW5nIHVucmVhZGNvdW50IGluIGNoYXRzIGxpc3RcbiAgICAgIHRoaXMubWVzc2FnZVRvTWFya1JlYWQgPSBpbmNvbWluZ0NhbGxNZXNzYWdlO1xuXG4gICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgIGxldCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgICByZWNlaXZlclR5cGUgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICAgIHJlY2VpdmVySWQgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0uZ3VpZCkgfHxcbiAgICAgICAgKHR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgICByZWNlaXZlclR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIgJiZcbiAgICAgICAgICByZWNlaXZlcklkID09PSBpdGVtLnVpZClcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKHJlamVjdGVkQ2FsbE1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19