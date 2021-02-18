/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../../utils/controller";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
export class CometChatConversationListWithMessagesComponent {
    constructor() {
        this.item = null;
        this.type = "";
        this.sidebarView = false;
        this.viewDetailScreen = false;
        this.threadMessageView = false;
        this.threadMessageItem = null;
        this.threadMessageType = "";
        this.threadMessageParent = null;
        this.composedThreadMessage = null;
        // To display image in full screen
        this.fullScreenViewImage = false;
        this.imageView = null;
        this.groupToUpdate = {};
        this.groupToLeave = {};
        this.groupToDelete = {};
        this.groupMessage = [];
        this.checkIfAnimated = false;
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = null;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
        this.USER = CometChat.RECEIVER_TYPE.USER;
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
         * Updates the thread message , if the currently open thread parent is deleted or is edited
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
     * Handles all the action propagated by the child components
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
                    break;
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
                default:
                    break;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates the last message , that should be updated in the conversation list component
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
     * Used to toggle the right side bar ( Thread View / Detail View )
     * @return {?}
     */
    toggleSideBar() {
        try {
            this.sidebarView = !this.sidebarView;
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
     * When User Block someone
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
     * When User UnBlock someone
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
     * Listen to the user emitted by the userList component
     * @param {?} event
     * @return {?}
     */
    userClicked(event) {
        try {
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
     * appends the call activities to messageList and as well updates them in conversation list
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
     * closes the call screen and appends the callEnded message to messageList
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
     * When call is accepted and connected
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
     * closes the call screen when IncomingCall Rejected
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
CometChatConversationListWithMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-conversation-list-with-messages",
                template: "<div class=\"chatScreenStyle\">\n  <div class=\"chatScreenSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-conversation-list\n      (onUserClick)=\"userClicked($event)\"\n      [item]=\"curentItem\"\n      [lastMessage]=\"lastMessage\"\n      [type]=\"type\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n    ></cometchat-conversation-list>\n  </div>\n  <div\n    class=\"chatScreenMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      chatScreenMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <!--Message List Screen-->\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [groupMessage]=\"groupMessage\"\n      [composedThreadMessage]=\"composedThreadMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-messages>\n    <!--Message List Screen ENDS-->\n  </div>\n\n  <!--DetailScreen-->\n\n  <div\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n    class=\"chatScreenSecondaryStyle\"\n  >\n    <!--IF USER-->\n    <div\n      *ngIf=\"type === USER\"\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      >\n      </cometchat-user-details>\n    </div>\n    <!--IF USER ENDS-->\n\n    <!--IF GROUP-->\n    <div *ngIf=\"type === GROUP\">\n      <cometchat-group-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-group-details>\n    </div>\n\n    <!--GROUP ENDS-->\n\n    <!--ThreadedMessageView-->\n\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [messageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
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
                styles: ["*{font-family:Inter,sans-serif;overflow:hidden}.chatScreenStyle{display:flex;height:100%;width:100%;box-sizing:border-box}.chatScreenStyle *{box-sizing:border-box}.chatScreenStyle::-webkit-scrollbar{width:8px;height:4px}.chatScreenStyle::-webkit-scrollbar-track{background:#ffffff00}.chatScreenStyle::-webkit-scrollbar-thumb{background:#ccc}.chatScreenStyle::-webkit-scrollbar-thumb:hover{background:#aaa}.chatScreenSidebarStyle{width:280px;border:1px solid #eaeaea;height:100%;position:relative}.chatScreenMainStyle{width:calc(100% - 280px);height:100%;order:2}.chatScreenMainSecondaryStyle{width:calc(100% - 500px)}.chatScreenSecondaryStyle{float:right;border-left:1px solid #eaeaea;height:100%;width:400px;display:flex;flex-direction:column;order:3}.detailScreenStyle{height:100%}@media (min-width:320px) and (max-width:767px){.chatScreenSidebarStyle{position:absolute!important;top:0;bottom:0;width:100%!important;background-color:#fff;z-index:2}.chatScreenMainStyle{width:100%!important;background-color:#fff}.chatScreenSecondaryStyle{position:absolute!important;right:0!important;top:0;bottom:0;width:100%!important;z-index:2;background-color:#fff}}"]
            }] }
];
/** @nocollapse */
CometChatConversationListWithMessagesComponent.ctorParameters = () => [];
CometChatConversationListWithMessagesComponent.propDecorators = {
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.curentItem;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.lastMessage;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.item;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.type;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.sidebarView;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.threadMessageView;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.threadMessageType;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.composedThreadMessage;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.imageView;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.groupMessage;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.innerWidth;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.outgoingCall;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.callMessage;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.GROUP;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.USER;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.toggleDetailView;
    /**
     * Updates the thread message , if the currently open thread parent is deleted or is edited
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.updateThreadMessage;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.groupUpdated;
    /** @type {?} */
    CometChatConversationListWithMessagesComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometChatConversationListWithMessagesComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvQ29tZXRDaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF5QmxELE1BQU0sT0FBTyw4Q0FBOEM7SUFtQ3pEO1FBaENBLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7O1FBRzdC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O0lBQzdCLDBFQUFrQzs7SUFDbEMsMkVBQW1DOztJQUNuQywyRUFBeUI7O0lBQ3pCLDJFQUF1Qjs7SUFDdkIsNkVBQTJCOztJQUMzQiwrRUFBNkI7O0lBRzdCLDZFQUFxQzs7SUFFckMsbUVBQWlCOztJQUNqQix1RUFBbUI7O0lBQ25CLHNFQUFrQjs7SUFDbEIsdUVBQW1COztJQUNuQixzRUFBa0I7O0lBRWxCLDRFQUFtQjs7SUFDbkIseUVBQWlDOztJQUNqQyxvRUFBVzs7SUFFWCxzRUFBb0I7O0lBQ3BCLHNFQUFvQjs7SUFDcEIscUVBQW1COztJQUNuQiwyRUFBa0I7O0lBRWxCLCtEQUE4Qzs7SUFDOUMsOERBQTRDOzs7Ozs7SUEwTTVDLDBFQU9FOzs7OztJQXlCRiw2RUFlRTs7Ozs7O0lBbUdGLDRFQXFCRTs7Ozs7O0lBTUYsc0VBb0JFOzs7Ozs7SUFNRiw0RUFTRTs7Ozs7O0lBTUYsc0VBOEJFOztJQWdDRixvRUFRRTs7Ozs7O0lBTUYscUVBUUU7Ozs7O0lBZ0NGLG1FQXVCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuXG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCItMTAwJVwiLFxuICAgICAgICAgIHpJbmRleDogXCIwXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RXaXRoTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjdXJlbnRJdGVtO1xuICBsYXN0TWVzc2FnZTtcbiAgaXRlbSA9IG51bGw7XG4gIHR5cGUgPSBcIlwiO1xuICBsb2dnZWRJblVzZXI7XG4gIHNpZGViYXJWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHZpZXdEZXRhaWxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZVZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGhyZWFkTWVzc2FnZUl0ZW0gPSBudWxsO1xuICB0aHJlYWRNZXNzYWdlVHlwZSA9IFwiXCI7XG4gIHRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICBjb21wb3NlZFRocmVhZE1lc3NhZ2UgPSBudWxsO1xuXG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGltYWdlVmlldyA9IG51bGw7XG4gIGdyb3VwVG9VcGRhdGUgPSB7fTtcbiAgZ3JvdXBUb0xlYXZlID0ge307XG4gIGdyb3VwVG9EZWxldGUgPSB7fTtcbiAgZ3JvdXBNZXNzYWdlID0gW107XG5cbiAgY2hlY2tBbmltYXRlZFN0YXRlO1xuICBjaGVja0lmQW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW5uZXJXaWR0aDtcblxuICBvdXRnb2luZ0NhbGwgPSBudWxsO1xuICBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBjYWxsTWVzc2FnZSA9IG51bGw7XG4gIG1lc3NhZ2VUb01hcmtSZWFkO1xuXG4gIEdST1VQOiBTdHJpbmcgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgVVNFUjogU3RyaW5nID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIltDb21ldENoYXRVbmlmaWVkXSBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaW5uZXJXaWR0aCA+PSBlbnVtcy5CUkVBS1BPSU5UX01JTl9XSURUSCAmJlxuICAgICAgICB0aGlzLmlubmVyV2lkdGggPD0gZW51bXMuQlJFQUtQT0lOVF9NQVhfV0lEVEhcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5jaGVja0lmQW5pbWF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9uIHByb3BhZ2F0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHNcbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uID0gbnVsbCwgaXRlbSA9IG51bGwsIGNvdW50ID0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZW51bXMuQkxPQ0tfVVNFUjpcbiAgICAgICAgICB0aGlzLmJsb2NrVXNlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLlVOQkxPQ0tfVVNFUjpcbiAgICAgICAgICB0aGlzLnVuYmxvY2tVc2VyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICAgIGNhc2UgZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQ6XG4gICAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICAgIHRoaXMudG9nZ2xlU2lkZUJhcigpO1xuICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9NRU5VX0NMSUNLRUQ6XG4gICAgICAgICAgdGhpcy50b2dnbGVTaWRlQmFyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDpcbiAgICAgICAgICB0aGlzLnZpZXdNZXNzYWdlVGhyZWFkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLlRIUkVBRF9QQVJFTlRfTUVTU0FHRV9VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVUaHJlYWRNZXNzYWdlKGFjdGlvbi5wYXlMb2FkWzBdLCBhY3Rpb24udXBkYXRlVHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9USFJFQURfQ0xJQ0tFRDpcbiAgICAgICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRTpcbiAgICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICAgIHRoaXMudG9nZ2xlSW1hZ2VWaWV3KG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVQ6XG4gICAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgICAgdGhpcy5jb21wb3NlZFRocmVhZE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQsXG4gICAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgICAgdGhpcy5tZW1iZXJTY29wZUNoYW5nZWQoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19BRERFRDoge1xuICAgICAgICAgIHRoaXMubWVtYmVyc0FkZGVkKGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJzQ291bnQoZGF0YS5pdGVtLCBkYXRhLmNvdW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoZGF0YS5tZXNzYWdlLCBkYXRhLmtleSwgZGF0YS5ncm91cCwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVU5CQU5ORUQ6XG4gICAgICAgICAgdGhpcy5tZW1iZXJVbmJhbm5lZChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5MRUZUX0dST1VQOiB7XG4gICAgICAgICAgdGhpcy5sZWF2ZUdyb3VwKGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuREVMRVRFX0dST1VQOiB7XG4gICAgICAgICAgdGhpcy5kZWxldGVHcm91cChkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgICB0aGlzLnZpZGVvQ2FsbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQ6XG4gICAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRU5ERUQ6IHtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuQUNDRVBUX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgICB0aGlzLmNhbGxJbml0aWF0ZWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5SRUpFQ1RFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgICAgdGhpcy5yZWplY3RlZEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkNBTExfRVJST1I6IHtcbiAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb24ucGF5TG9hZFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgbGFzdCBtZXNzYWdlICwgdGhhdCBzaG91bGQgYmUgdXBkYXRlZCBpbiB0aGUgY29udmVyc2F0aW9uIGxpc3QgY29tcG9uZW50XG4gICAqL1xuICB1cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHRvZ2dsZSB0aGUgcmlnaHQgc2lkZSBiYXIgKCBUaHJlYWQgVmlldyAvIERldGFpbCBWaWV3IClcbiAgICovXG4gIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2lkZWJhclZpZXcgPSAhdGhpcy5zaWRlYmFyVmlldztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgVXNlciBEZXRhaWwgUmlnaHQgU2lkZSBiYXJcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVEZXRhaWxWaWV3ID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSAhdGhpcy52aWV3RGV0YWlsU2NyZWVuO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBBbGwgdGhlIEludGlhbCBDb25kaXRpb25zIGZvciB0aGUgdGhyZWFkZWQgVmlldyBvZiBNZXNzYWdlcyBhbmQgT3BlbnMgdGhyZWFkIFZpZXdcbiAgICogQHBhcmFtIEFueSBwYXJlbnRNZXNzYWdlXG4gICAqL1xuICB2aWV3TWVzc2FnZVRocmVhZChwYXJlbnRNZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vT3BlbiBUaHJlYWQgU2NyZWVuXG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gdHJ1ZTtcblxuICAgICAgLy9jbG9zZSB1c2VyICggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGggKSBEZXRhaWwgc2NyZWVuXG4gICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gcGFyZW50TWVzc2FnZTtcbiAgICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSB0aGlzLml0ZW07XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gdGhpcy50eXBlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB0aHJlYWQgbWVzc2FnZSAsIGlmIHRoZSBjdXJyZW50bHkgb3BlbiB0aHJlYWQgcGFyZW50IGlzIGRlbGV0ZWQgb3IgaXMgZWRpdGVkXG4gICAqL1xuICB1cGRhdGVUaHJlYWRNZXNzYWdlID0gKG1lc3NhZ2UsIGFjdGlvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy50aHJlYWRNZXNzYWdlVmlldyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aW9uID09PSBlbnVtcy5ERUxFVEUpIHtcbiAgICAgICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0geyAuLi5tZXNzYWdlIH07XG4gICAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHsgLi4ubWVzc2FnZSB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICB0cnkge1xuICAgICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBCbG9jayBzb21lb25lXG4gICAqL1xuICBibG9ja1VzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIkJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgVW5CbG9jayBzb21lb25lXG4gICAqL1xuICB1bmJsb2NrVXNlcigpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHVzZXJzTGlzdCA9IFt0aGlzLml0ZW0udWlkXTtcbiAgICAgIENvbWV0Q2hhdE1hbmFnZXIudW5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLnRoaXMuaXRlbSwgYmxvY2tlZEJ5TWU6IGZhbHNlIH07XG4gICAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwidW5ibG9ja2luZyB1c2VyIGZhaWxzIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSB1c2VyIGVtaXR0ZWQgYnkgdGhlIHVzZXJMaXN0IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgdXNlclxuICAgKi9cbiAgdXNlckNsaWNrZWQoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgICA/ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwiYW5pbWF0ZWRcIilcbiAgICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5pdGVtID0gZXZlbnQuY29udmVyc2F0aW9uV2l0aDtcbiAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBldmVudC5sYXN0TWVzc2FnZTtcbiAgICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoZW51bXMuVUlEKSkge1xuICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2UgbGlzdCB3aXRoIGEgbWVzc2FnZSBub3RpZnlpbmcgdGhhdCAsIHNjb3BlIGEgc29tZSB1c2VyIGlzIGNoYW5nZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJTY29wZUNoYW5nZWQgPSAobWVtYmVycykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuXG4gICAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IG1hZGUgJHtlYWNoTWVtYmVyLm5hbWV9ICR7ZWFjaE1lbWJlci5zY29wZX1gO1xuICAgICAgICBjb25zdCBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBzZW50QXQ6IGFueSA9IChkYXRlIC8gMTAwMCkgfCAwO1xuICAgICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICAgIGNhdGVnb3J5OiBDb21ldENoYXQuQ0FURUdPUllfQUNUSU9OLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICAgIH07XG4gICAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2VMaXN0IHdpdGggbWVzc2FnZXMgYWJvdXQgdGhlIG1lbWJlcnMgdGhhdCB3ZXJlIGFkZGVkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyc0FkZGVkID0gKG1lbWJlcnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gYWRkZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcbiAgICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBjYXRlZ29yeTogQ29tZXRDaGF0LkNBVEVHT1JZX0FDVElPTixcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIFRoZSBjb3VudCBvZiAgbnVtYmVyIG9mIG1lbWJlcnMgcHJlc2VudCBpbiBhIGdyb3VwIGJhc2VkIG9uIGdyb3VwIGFjdGl2aXRpZXMgLCBsaWtlIGFkZGluZyBhIG1lbWJlciBvciBraWNraW5nIGEgbWVtYmVyXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgdXBkYXRlTWVtYmVyc0NvdW50ID0gKGl0ZW0sIGNvdW50KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdyb3VwID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7IG1lbWJlcnNDb3VudDogY291bnQgfSk7XG5cbiAgICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuICAgICAgdGhpcy5ncm91cFRvVXBkYXRlID0gZ3JvdXA7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIEN1cnJlbnQgR3JvdXAgSW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAobWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDoge1xuICAgICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMudXNlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgICAgY29uc3QgbmV3T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7XG4gICAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW2VudW1zLlNDT1BFXSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLml0ZW0gPSBuZXdPYmo7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIFVuYmFucyB0aGUgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lbWJlclVuYmFubmVkKG1lbWJlcnMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gdW5iYW5uZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcblxuICAgICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICAgIGNhdGVnb3J5OiBDb21ldENoYXQuQ0FURUdPUllfQUNUSU9OLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICAgIH07XG4gICAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ncm91cFRvTGVhdmUgPSBncm91cDtcbiAgICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ncm91cFRvRGVsZXRlID0gZ3JvdXA7XG4gICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgICBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSKSB7XG4gICAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQKSB7XG4gICAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICB9XG5cbiAgICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIHZpZGVvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgdmlkZW9DYWxsID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPKVxuICAgICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG5cbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGFwcGVuZHMgdGhlIGNhbGwgYWN0aXZpdGllcyB0byBtZXNzYWdlTGlzdCBhbmQgYXMgd2VsbCB1cGRhdGVzIHRoZW0gaW4gY29udmVyc2F0aW9uIGxpc3RcbiAgICovXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jYWxsTWVzc2FnZSA9IGNhbGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNsb3NlcyB0aGUgY2FsbCBzY3JlZW4gYW5kIGFwcGVuZHMgdGhlIGNhbGxFbmRlZCBtZXNzYWdlIHRvIG1lc3NhZ2VMaXN0XG4gICAqL1xuICBvdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFDQ1BFVFMgSU5DT01JTkcgQ0FMTCBhbmQgb3BlbnMgdGhlIGNhbGwgc2NyZWVuXG4gICAqL1xuICBhY2NlcHRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmluY29taW5nQ2FsbCA9IGNhbGw7XG5cbiAgICAgIGNvbnN0IHR5cGUgPSBjYWxsLnJlY2VpdmVyVHlwZTtcbiAgICAgIGNvbnN0IGlkID1cbiAgICAgICAgdHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUlxuICAgICAgICAgID8gY2FsbC5zZW5kZXIudWlkXG4gICAgICAgICAgOiBjYWxsLnJlY2VpdmVySWQ7XG5cbiAgICAgIENvbWV0Q2hhdC5nZXRDb252ZXJzYXRpb24oaWQsIHR5cGUpXG4gICAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IHsgLi4uY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGggfTtcbiAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYSBjb252ZXJzYXRpb25cIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjYWxsIGlzIGFjY2VwdGVkIGFuZCBjb25uZWN0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYWxsSW5pdGlhdGVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2xvc2VzIHRoZSBjYWxsIHNjcmVlbiB3aGVuIEluY29taW5nQ2FsbCBSZWplY3RlZFxuICAgKi9cbiAgcmVqZWN0ZWRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaW5jb21pbmdDYWxsTWVzc2FnZSA9IGNhbGwuaW5jb21pbmdDYWxsO1xuICAgICAgbGV0IHJlamVjdGVkQ2FsbE1lc3NhZ2UgPSBjYWxsLnJlamVjdGVkQ2FsbDtcbiAgICAgIGxldCByZWNlaXZlclR5cGUgPSBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICAgIGxldCByZWNlaXZlcklkID1cbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSXG4gICAgICAgICAgPyBpbmNvbWluZ0NhbGxNZXNzYWdlLnNlbmRlci51aWRcbiAgICAgICAgICA6IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgICAgLy9tYXJraW5nIHRoZSBpbmNvbWluZyBjYWxsIG1lc3NhZ2UgYXMgcmVhZFxuICAgICAgaWYgKGluY29taW5nQ2FsbE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuUkVBRF9BVCkgPT09IGZhbHNlKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKGluY29taW5nQ2FsbE1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIC8vdXBkYXRpbmcgdW5yZWFkY291bnQgaW4gY2hhdHMgbGlzdFxuICAgICAgdGhpcy5tZXNzYWdlVG9NYXJrUmVhZCA9IGluY29taW5nQ2FsbE1lc3NhZ2U7XG5cbiAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgICAgbGV0IHR5cGUgPSB0aGlzLnR5cGU7XG5cbiAgICAgIHJlY2VpdmVyVHlwZSA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgICAgcmVjZWl2ZXJJZCA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgICAgaWYgKFxuICAgICAgICAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICByZWNlaXZlclR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgICAgcmVjZWl2ZXJJZCA9PT0gaXRlbS5ndWlkKSB8fFxuICAgICAgICAodHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0udWlkKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UocmVqZWN0ZWRDYWxsTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=