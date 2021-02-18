/**
 * @fileoverview added by tsickle
 * Generated from: components/CometChatUI/CometChat-Ui/cometchat-ui/cometchat-ui.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../../utils/controller";
import * as enums from "../../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
export class CometChatUIComponent {
    constructor() {
        this.item = null;
        this.viewDetailScreen = false;
        this.threadMessageView = false;
        this.threadMessageItem = null;
        this.threadMessageType = "";
        this.threadMessageParent = null;
        this.groupToUpdate = {};
        this.groupToLeave = {};
        this.groupToDelete = {};
        this.groupMessage = [];
        this.composedThreadMessage = null;
        this.fullScreenViewImage = false;
        this.imageView = null;
        //for audio calling
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = null;
        this.checkIfAnimated = false;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
        this.USER = CometChat.RECEIVER_TYPE.USER;
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
            CometChat.getLoggedinUser()
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
                logger("[CometChatUnified] getLoggedInUser error", error);
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
     * Handles all the actions propagated from the child component
     * @param {?=} action
     * @param {?=} item
     * @param {?=} count
     * @return {?}
     */
    actionHandler(action = null, item = null, count = null) {
        try {
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
                case enums.VIEW_MESSAGE_THREAD:
                    this.viewMessageThread(message);
                    break;
                case enums.THREAD_PARENT_MESSAGE_UPDATED: {
                    this.updateThreadMessage(action.payLoad[0], action.updateType);
                    break;
                }
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
                case enums.TAB_CHANGED: {
                    this.viewDetailScreen = false;
                }
                default:
                    break;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * updates lastMessage , so that it can be updated in the conversationList
     * @param {?} message
     * @return {?}
     */
    updateLastMessage(message) {
        try {
            this.lastMessage = message;
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
    /*
       * Close the thread window
       */
    /**
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
     * When loggedInUser Blocks someone
     * @return {?}
     */
    blockUser() {
        try {
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
     * When loggedInUser UnBlocks someone
     * @return {?}
     */
    unblockUser() {
        try {
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
     * Sets the item information with the item that was clicked from userList , conversationList or groupList
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
            this.item = user;
            if (this.item.hasOwnProperty(enums.UID)) {
                this.type = CometChat.RECEIVER_TYPE.USER;
            }
            else {
                this.type = CometChat.RECEIVER_TYPE.GROUP;
            }
            //close detail screen when switching between users/groups
            this.viewDetailScreen = false;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *  Unbans the user , that was previously banned from the group
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
     * appends call activities as messages to messageList
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
     * closes the call screen and resets all call settings to initial stage as current call ended
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
     * ACCPETS INCOMING CALL and opens the call screen
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
     * When call is accepted and connected , appends the activity of accepting the call as message
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
     * closes call screen and all resets all call settings as  IncomingCall was Rejected
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
CometChatUIComponent.decorators = [
    { type: Component, args: [{
                selector: "CometChatUI",
                template: "<div class=\"unifiedStyle\">\n  <div class=\"unifiedSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-nav-bar\n      [item]=\"item\"\n      [type]=\"type\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      [lastMessage]=\"lastMessage\"\n      (onUserClick)=\"userClicked($event)\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-nav-bar>\n  </div>\n  <div\n    class=\"unifiedMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      unifiedMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [composedThreadMessage]=\"composedThreadMessage\"\n      [groupMessage]=\"groupMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-messages>\n  </div>\n  <!--Detail Screen-->\n  <div\n    class=\"unifiedSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <div\n      *ngIf=\"type === USER\"\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      >\n      </cometchat-user-details>\n    </div>\n    <div *ngIf=\"type === GROUP\">\n      <cometchat-group-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-group-details>\n    </div>\n\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [messageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
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
                styles: ["*{overflow:hidden}.unifiedStyle{display:flex;height:100%;width:100%;box-sizing:border-box;font-family:Inter,sans-serif;position:relative}.unifiedStyle *{box-sizing:border-box;font-family:Inter,sans-serif}.unifiedStyle * ::-webkit-scrollbar{width:8px;height:4px}.unifiedStyle ::-webkit-scrollbar-track{background-color:#ffffff00}.unifiedStyle ::-webkit-scrollbar-thumb{background:#ccc}.unifiedSidebarStyle{width:280px;border-right:1px solid #eaeaea;height:100%;position:relative}.unifiedMainStyle{width:calc(100% - 280px);height:100%;order:2}.unifiedMainSecondaryStyle{width:calc(100% - 500px)}.unifiedSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}.detailScreenStyle{height:100%}@media (min-width:320px) and (max-width:767px){.unifiedSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}.unifiedMainStyle{width:100%!important;background-color:#fff}.unifiedSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometChatUIComponent.ctorParameters = () => [];
CometChatUIComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatUIComponent.prototype.item;
    /** @type {?} */
    CometChatUIComponent.prototype.curentItem;
    /** @type {?} */
    CometChatUIComponent.prototype.type;
    /** @type {?} */
    CometChatUIComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometChatUIComponent.prototype.threadMessageView;
    /** @type {?} */
    CometChatUIComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometChatUIComponent.prototype.threadMessageType;
    /** @type {?} */
    CometChatUIComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometChatUIComponent.prototype.lastMessage;
    /** @type {?} */
    CometChatUIComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatUIComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatUIComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatUIComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatUIComponent.prototype.groupMessage;
    /** @type {?} */
    CometChatUIComponent.prototype.composedThreadMessage;
    /** @type {?} */
    CometChatUIComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometChatUIComponent.prototype.imageView;
    /** @type {?} */
    CometChatUIComponent.prototype.outgoingCall;
    /** @type {?} */
    CometChatUIComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatUIComponent.prototype.callMessage;
    /** @type {?} */
    CometChatUIComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometChatUIComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatUIComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometChatUIComponent.prototype.innerWidth;
    /** @type {?} */
    CometChatUIComponent.prototype.GROUP;
    /** @type {?} */
    CometChatUIComponent.prototype.USER;
    /**
     * Updates the thread message , it the currently open thread parent is deleted or is edited
     * @type {?}
     */
    CometChatUIComponent.prototype.updateThreadMessage;
    /**
     * Opens User Detail Right Side bar
     * @type {?}
     */
    CometChatUIComponent.prototype.toggleDetailView;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometChatUIComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometChatUIComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometChatUIComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometChatUIComponent.prototype.groupUpdated;
    /** @type {?} */
    CometChatUIComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometChatUIComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometChatUIComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NvbWV0Q2hhdFVJL0NvbWV0Q2hhdC1VaS9jb21ldGNoYXQtdWkvY29tZXRjaGF0LXVpLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBd0JsRCxNQUFNLE9BQU8sb0JBQW9CO0lBZ0MvQjtRQS9CQSxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBR1oscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUczQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxJQUFJLENBQUM7O1FBR2pC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SW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIkNvbWV0Q2hhdFVJXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVpLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdWkuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIi0xMDAlXCIsXG4gICAgICAgICAgekluZGV4OiBcIjBcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFwibm9ybWFsPD0+YW5pbWF0ZWRcIiwgYW5pbWF0ZSgzMDApKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0VUlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpdGVtID0gbnVsbDtcbiAgY3VyZW50SXRlbTtcbiAgdHlwZTtcbiAgdmlld0RldGFpbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICB0aHJlYWRNZXNzYWdlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICB0aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgdGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gIGxhc3RNZXNzYWdlO1xuICBsb2dnZWRJblVzZXI7XG4gIGdyb3VwVG9VcGRhdGUgPSB7fTtcbiAgZ3JvdXBUb0xlYXZlID0ge307XG4gIGdyb3VwVG9EZWxldGUgPSB7fTtcbiAgZ3JvdXBNZXNzYWdlID0gW107XG4gIGNvbXBvc2VkVGhyZWFkTWVzc2FnZSA9IG51bGw7XG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW1hZ2VWaWV3ID0gbnVsbDtcblxuICAvL2ZvciBhdWRpbyBjYWxsaW5nXG4gIG91dGdvaW5nQ2FsbCA9IG51bGw7XG4gIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIGNhbGxNZXNzYWdlID0gbnVsbDtcbiAgbWVzc2FnZVRvTWFya1JlYWQ7XG5cbiAgY2hlY2tBbmltYXRlZFN0YXRlO1xuICBjaGVja0lmQW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW5uZXJXaWR0aDtcblxuICBHUk9VUDogU3RyaW5nID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gIFVTRVI6IFN0cmluZyA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJbQ29tZXRDaGF0VW5pZmllZF0gZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaW5uZXJXaWR0aCA+PSBlbnVtcy5CUkVBS1BPSU5UX01JTl9XSURUSCAmJlxuICAgICAgICB0aGlzLmlubmVyV2lkdGggPD0gZW51bXMuQlJFQUtQT0lOVF9NQVhfV0lEVEhcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5jaGVja0lmQW5pbWF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIHByb3BhZ2F0ZWQgZnJvbSB0aGUgY2hpbGQgY29tcG9uZW50XG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbiA9IG51bGwsIGl0ZW0gPSBudWxsLCBjb3VudCA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGVudW1zLkJMT0NLX1VTRVI6XG4gICAgICAgICAgdGhpcy5ibG9ja1VzZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5VTkJMT0NLX1VTRVI6XG4gICAgICAgICAgdGhpcy51bmJsb2NrVXNlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgICBjYXNlIGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VEOlxuICAgICAgICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6XG4gICAgICAgICAgdGhpcy52aWV3TWVzc2FnZVRocmVhZChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5USFJFQURfUEFSRU5UX01FU1NBR0VfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMudXBkYXRlVGhyZWFkTWVzc2FnZShhY3Rpb24ucGF5TG9hZFswXSwgYWN0aW9uLnVwZGF0ZVR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9USFJFQURfQ0xJQ0tFRDpcbiAgICAgICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRTpcbiAgICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICAgIHRoaXMudG9nZ2xlSW1hZ2VWaWV3KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVQ6XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgICAgdGhpcy5jb21wb3NlZFRocmVhZE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQsXG4gICAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICAgIHRoaXMubWVtYmVyU2NvcGVDaGFuZ2VkKGFjdGlvbi5wYXlMb2FkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLk1FTUJFUlNfQURERUQ6IHtcbiAgICAgICAgICB0aGlzLm1lbWJlcnNBZGRlZChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLk1FTUJFUlNfVVBEQVRFRDoge1xuICAgICAgICAgIHRoaXMudXBkYXRlTWVtYmVyc0NvdW50KGRhdGEuaXRlbSwgZGF0YS5jb3VudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9VUERBVEVEOlxuICAgICAgICAgIHRoaXMuZ3JvdXBVcGRhdGVkKGRhdGEubWVzc2FnZSwgZGF0YS5rZXksIGRhdGEuZ3JvdXAsIGRhdGEub3B0aW9ucyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgICAgIHRoaXMubWVtYmVyVW5iYW5uZWQoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuTEVGVF9HUk9VUDoge1xuICAgICAgICAgIHRoaXMubGVhdmVHcm91cChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkRFTEVURV9HUk9VUDoge1xuICAgICAgICAgIHRoaXMuZGVsZXRlR3JvdXAoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5BVURJT19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRU5ERURfQllfVVNFUjpcbiAgICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEOiB7XG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlVTRVJfSk9JTkVEX0NBTEw6XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9MRUZUX0NBTEw6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5hY2NlcHRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICAgIHRoaXMucmVqZWN0ZWRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DQUxMX0VSUk9SOiB7XG4gICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgXCJVc2VyIExpc3Qgc2NyZWVuIC0tPiBjYWxsIGNvdWxkbid0IGNvbXBsZXRlIGR1ZSB0byBlcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5UQUJfQ0hBTkdFRDoge1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgbGFzdE1lc3NhZ2UgLCBzbyB0aGF0IGl0IGNhbiBiZSB1cGRhdGVkIGluIHRoZSBjb252ZXJzYXRpb25MaXN0XG4gICAqL1xuICB1cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIEFsbCB0aGUgSW50aWFsIENvbmRpdGlvbnMgZm9yIHRoZSB0aHJlYWRlZCBWaWV3IG9mIE1lc3NhZ2VzIGFuZCBPcGVucyB0aHJlYWQgVmlld1xuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICAvL09wZW4gVGhyZWFkIFNjcmVlblxuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAgIC8vY2xvc2UgdXNlciAoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoICkgRGV0YWlsIHNjcmVlblxuICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IHRoaXMudHlwZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHRocmVhZCBtZXNzYWdlICwgaXQgdGhlIGN1cnJlbnRseSBvcGVuIHRocmVhZCBwYXJlbnQgaXMgZGVsZXRlZCBvciBpcyBlZGl0ZWRcbiAgICovXG4gIHVwZGF0ZVRocmVhZE1lc3NhZ2UgPSAobWVzc2FnZSwgYWN0aW9uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IGVudW1zLkRFTEVURSkge1xuICAgICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSB7IC4uLm1lc3NhZ2UgfTtcbiAgICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0geyAuLi5tZXNzYWdlIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqL1xuICBjbG9zZVRocmVhZE1lc3NhZ2VzKCkge1xuICAgIHRyeSB7XG4gICAgICAvL2Nsb3NlIFRocmVhZCBTY3JlZW5cbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVR5cGUgPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKi9cbiAgdG9nZ2xlRGV0YWlsVmlldyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gIXRoaXMudmlld0RldGFpbFNjcmVlbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gbG9nZ2VkSW5Vc2VyIEJsb2NrcyBzb21lb25lXG4gICAqL1xuICBibG9ja1VzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIkJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGxvZ2dlZEluVXNlciBVbkJsb2NrcyBzb21lb25lXG4gICAqL1xuICB1bmJsb2NrVXNlcigpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLml0ZW0udWlkXTtcbiAgICAgIENvbWV0Q2hhdE1hbmFnZXIudW5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLnRoaXMuaXRlbSwgYmxvY2tlZEJ5TWU6IGZhbHNlIH07XG4gICAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwidW5ibG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaXRlbSBpbmZvcm1hdGlvbiB3aXRoIHRoZSBpdGVtIHRoYXQgd2FzIGNsaWNrZWQgZnJvbSB1c2VyTGlzdCAsIGNvbnZlcnNhdGlvbkxpc3Qgb3IgZ3JvdXBMaXN0XG4gICAqL1xuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgICAgOiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbSA9IHVzZXI7XG4gICAgICBpZiAodGhpcy5pdGVtLmhhc093blByb3BlcnR5KGVudW1zLlVJRCkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICAvL2Nsb3NlIGRldGFpbCBzY3JlZW4gd2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiB1c2Vycy9ncm91cHNcbiAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlIGxpc3Qgd2l0aCBhIG1lc3NhZ2Ugbm90aWZ5aW5nIHRoYXQgLCBzY29wZSBhIHNvbWUgdXNlciBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyU2NvcGVDaGFuZ2VkID0gKG1lbWJlcnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcblxuICAgICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBtYWRlICR7ZWFjaE1lbWJlci5uYW1lfSAke2VhY2hNZW1iZXIuc2NvcGV9YDtcbiAgICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBjYXRlZ29yeTogQ29tZXRDaGF0LkNBVEVHT1JZX0FDVElPTixcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlTGlzdCB3aXRoIG1lc3NhZ2VzIGFib3V0IHRoZSBtZW1iZXJzIHRoYXQgd2VyZSBhZGRlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlcnNBZGRlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IGFkZGVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHNlbnRBdDogYW55ID0gKGRhdGUgLyAxMDAwKSB8IDA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgICAgY2F0ZWdvcnk6IENvbWV0Q2hhdC5DQVRFR09SWV9BQ1RJT04sXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgICAgfTtcbiAgICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyBUaGUgY291bnQgb2YgIG51bWJlciBvZiBtZW1iZXJzIHByZXNlbnQgaW4gYSBncm91cCBiYXNlZCBvbiBncm91cCBhY3Rpdml0aWVzICwgbGlrZSBhZGRpbmcgYSBtZW1iZXIgb3Iga2lja2luZyBhIG1lbWJlclxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIHVwZGF0ZU1lbWJlcnNDb3VudCA9IChpdGVtLCBjb3VudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBncm91cCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwgeyBtZW1iZXJzQ291bnQ6IGNvdW50IH0pO1xuXG4gICAgICB0aGlzLml0ZW0gPSBncm91cDtcbiAgICAgIHRoaXMuZ3JvdXBUb1VwZGF0ZSA9IGdyb3VwO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBDdXJyZW50IEdyb3VwIEluZm9ybWF0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ3JvdXBVcGRhdGVkID0gKG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6IHtcbiAgICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwge1xuICAgICAgICAgICAgICBzY29wZTogb3B0aW9uc1tlbnVtcy5TQ09QRV0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pdGVtID0gbmV3T2JqO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqICBVbmJhbnMgdGhlIHVzZXIgLCB0aGF0IHdhcyBwcmV2aW91c2x5IGJhbm5lZCBmcm9tIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lbWJlclVuYmFubmVkKG1lbWJlcnMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gdW5iYW5uZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBjYXRlZ29yeTogQ29tZXRDaGF0LkNBVEVHT1JZX0FDVElPTixcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyogQ2xvc2VzIGdyb3VwIHNjcmVlbiBhbmQgYWxsICwgYWZ0ZXIgdXNlciBoYXMgbGVmdCB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBsZWF2ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZ3JvdXBUb0xlYXZlID0gZ3JvdXA7XG4gICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBkZWxldGVkIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGRlbGV0ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZ3JvdXBUb0RlbGV0ZSA9IGdyb3VwO1xuICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICB0aGlzLml0ZW0gPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIGF1ZGlvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPKVxuICAgICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiB2aWRlbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIHZpZGVvQ2FsbCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIpIHtcbiAgICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICAgIH1cblxuICAgICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5WSURFTylcbiAgICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogYXBwZW5kcyBjYWxsIGFjdGl2aXRpZXMgYXMgbWVzc2FnZXMgdG8gbWVzc2FnZUxpc3RcbiAgICovXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jYWxsTWVzc2FnZSA9IGNhbGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNsb3NlcyB0aGUgY2FsbCBzY3JlZW4gYW5kIHJlc2V0cyBhbGwgY2FsbCBzZXR0aW5ncyB0byBpbml0aWFsIHN0YWdlIGFzIGN1cnJlbnQgY2FsbCBlbmRlZFxuICAgKi9cbiAgb3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgICB0aGlzLmluY29taW5nQ2FsbCA9IG51bGw7XG4gICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBQ0NQRVRTIElOQ09NSU5HIENBTEwgYW5kIG9wZW5zIHRoZSBjYWxsIHNjcmVlblxuICAgKi9cbiAgYWNjZXB0SW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBjYWxsO1xuXG4gICAgICBjb25zdCB0eXBlID0gY2FsbC5yZWNlaXZlclR5cGU7XG4gICAgICBjb25zdCBpZCA9XG4gICAgICAgIHR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVJcbiAgICAgICAgICA/IGNhbGwuc2VuZGVyLnVpZFxuICAgICAgICAgIDogY2FsbC5yZWNlaXZlcklkO1xuXG4gICAgICBDb21ldENoYXQuZ2V0Q29udmVyc2F0aW9uKGlkLCB0eXBlKVxuICAgICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLmNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoIH07XG4gICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcImVycm9yIHdoaWxlIGZldGNoaW5nIGEgY29udmVyc2F0aW9uXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2FsbCBpcyBhY2NlcHRlZCBhbmQgY29ubmVjdGVkICwgYXBwZW5kcyB0aGUgYWN0aXZpdHkgb2YgYWNjZXB0aW5nIHRoZSBjYWxsIGFzIG1lc3NhZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYWxsSW5pdGlhdGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2xvc2VzIGNhbGwgc2NyZWVuIGFuZCBhbGwgcmVzZXRzIGFsbCBjYWxsIHNldHRpbmdzIGFzICBJbmNvbWluZ0NhbGwgd2FzIFJlamVjdGVkXG4gICAqL1xuICByZWplY3RlZEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpbmNvbWluZ0NhbGxNZXNzYWdlID0gY2FsbC5pbmNvbWluZ0NhbGw7XG4gICAgICBsZXQgcmVqZWN0ZWRDYWxsTWVzc2FnZSA9IGNhbGwucmVqZWN0ZWRDYWxsO1xuICAgICAgbGV0IHJlY2VpdmVyVHlwZSA9IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgICAgbGV0IHJlY2VpdmVySWQgPVxuICAgICAgICByZWNlaXZlclR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVJcbiAgICAgICAgICA/IGluY29taW5nQ2FsbE1lc3NhZ2Uuc2VuZGVyLnVpZFxuICAgICAgICAgIDogaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgICAvL21hcmtpbmcgdGhlIGluY29taW5nIGNhbGwgbWVzc2FnZSBhcyByZWFkXG4gICAgICBpZiAoaW5jb21pbmdDYWxsTWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5SRUFEX0FUKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQoaW5jb21pbmdDYWxsTWVzc2FnZS5pZCwgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlKTtcbiAgICAgIH1cblxuICAgICAgLy91cGRhdGluZyB1bnJlYWRjb3VudCBpbiBjaGF0cyBsaXN0XG4gICAgICB0aGlzLm1lc3NhZ2VUb01hcmtSZWFkID0gaW5jb21pbmdDYWxsTWVzc2FnZTtcblxuICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgICBsZXQgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgICAgcmVjZWl2ZXJUeXBlID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgICByZWNlaXZlcklkID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICByZWNlaXZlcklkID09PSBpdGVtLmd1aWQpIHx8XG4gICAgICAgICh0eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS51aWQpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShyZWplY3RlZENhbGxNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==