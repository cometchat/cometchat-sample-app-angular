/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
var CometchatConversationListWithMessagesComponent = /** @class */ (function () {
    function CometchatConversationListWithMessagesComponent() {
        var _this = this;
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
        function () {
            _this.threadMessageView = false;
            _this.viewDetailScreen = !_this.viewDetailScreen;
        });
        /**
         * updates the message list with a message notifying that , scope a some user is changed
         * @param Any members
         */
        this.memberScopeChanged = (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            /** @type {?} */
            var messageList = [];
            members.forEach((/**
             * @param {?} eachMember
             * @return {?}
             */
            function (eachMember) {
                /** @type {?} */
                var message = _this.loggedInUser.name + " made " + eachMember.name + " " + eachMember.scope;
                /** @type {?} */
                var sentAt = new Date();
                /** @type {?} */
                var messageObj = {
                    category: "action",
                    message: message,
                    type: enums.ACTION_TYPE_GROUPMEMBER,
                    sentAt: sentAt,
                };
                messageList.push(messageObj);
            }));
            _this.groupMessage = messageList;
        });
        /**
         * updates the messageList with messages about the members that were added
         * @param Any members
         */
        this.membersAdded = (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            /** @type {?} */
            var messageList = [];
            members.forEach((/**
             * @param {?} eachMember
             * @return {?}
             */
            function (eachMember) {
                /** @type {?} */
                var message = _this.loggedInUser.name + " added " + eachMember.name;
                /** @type {?} */
                var sentAt = new Date();
                /** @type {?} */
                var messageObj = {
                    category: "action",
                    message: message,
                    type: enums.ACTION_TYPE_GROUPMEMBER,
                    sentAt: sentAt,
                };
                messageList.push(messageObj);
            }));
            _this.groupMessage = messageList;
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
        function (item, count) {
            /** @type {?} */
            var group = Object.assign({}, _this.item, { membersCount: count });
            _this.item = group;
            _this.groupToUpdate = group;
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
        function (message, key, group, options) {
            switch (key) {
                case enums.GROUP_MEMBER_BANNED:
                case enums.GROUP_MEMBER_KICKED: {
                    if (options.user.uid === _this.loggedInUser.uid) {
                        _this.item = null;
                        _this.type = "group";
                        _this.viewDetailScreen = false;
                    }
                    break;
                }
                case enums.GROUP_MEMBER_SCOPE_CHANGED: {
                    if (options.user.uid === _this.loggedInUser.uid) {
                        /** @type {?} */
                        var newObj = Object.assign({}, _this.item, {
                            scope: options["scope"],
                        });
                        _this.item = newObj;
                        _this.type = "group";
                        _this.viewDetailScreen = false;
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
        function (group) {
            _this.groupToLeave = group;
            _this.toggleDetailView();
            _this.item = null;
        });
        /**
         * Closes group screen and all , after user has deleted the group
         * @param
         */
        this.deleteGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            _this.groupToDelete = group;
            _this.toggleDetailView();
            _this.item = null;
        });
        /**
         * initiates an video call with the person you are chatting with
         */
        this.videoCall = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var receiverId;
            /** @type {?} */
            var receiverType;
            if (_this.type === "user") {
                receiverId = _this.item.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (_this.type === "group") {
                receiverId = _this.item.guid;
                receiverType = CometChat.RECEIVER_TYPE.GROUP;
            }
            CometChatManager.call(receiverId, receiverType, CometChat.CALL_TYPE.VIDEO)
                .then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.appendCallMessage(call);
                _this.outgoingCall = call;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("Call initialization failed with exception:", error);
            }));
        });
    }
    /**
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.onResize();
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[CometChatUnified] getLoggedInUser error", error);
        }));
    };
    /**
     * Checks when window size is changed in realtime
     */
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.onResize = /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?=} action
     * @param {?=} item
     * @param {?=} count
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.actionHandler = /**
     * @param {?=} action
     * @param {?=} item
     * @param {?=} count
     * @return {?}
     */
    function (action, item, count) {
        if (action === void 0) { action = null; }
        if (item === void 0) { item = null; }
        if (count === void 0) { count = null; }
        /** @type {?} */
        var message = action.payLoad;
        /** @type {?} */
        var data = action.payLoad;
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
                this.composedthreadmessage = tslib_1.__assign({}, this.threadMessageParent, { replyCount: action.payLoad });
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.updateLastMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.lastMessage = message;
    };
    /**
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.toggleSideBar = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sidebarview = this.sidebarview;
        this.sidebarview = !sidebarview;
    };
    /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param Any parentMessage
     */
    /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param {?} parentMessage
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.viewMessageThread = /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param {?} parentMessage
     * @return {?}
     */
    function (parentMessage) {
        //Open Thread Screen
        this.threadMessageView = true;
        //close user ( the person you are chatting with ) Detail screen
        this.viewDetailScreen = false;
        this.threadMessageParent = parentMessage;
        this.threadMessageItem = this.item;
        this.threadMessageType = this.type;
    };
    /*
     * Close the thread window
     * @param Any parentMessage
     */
    /*
       * Close the thread window
       * @param Any parentMessage
       */
    /**
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.closeThreadMessages = /*
       * Close the thread window
       * @param Any parentMessage
       */
    /**
     * @return {?}
     */
    function () {
        //close Thread Screen
        this.threadMessageView = false;
        this.threadMessageParent = null;
        this.threadMessageItem = null;
        this.threadMessageType = null;
    };
    /**
     * Opens the clicked Image in full screen mode
     * @param Any message
     */
    /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.toggleImageView = /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    function (message) {
        // console.log("Conversationscreen toggleImageView ", message);
        this.imageView = message;
        this.fullScreenViewImage = !this.fullScreenViewImage;
    };
    /**
     * When User Block someone
     */
    /**
     * When User Block someone
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.blockUser = /**
     * When User Block someone
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var usersList = [this.item.uid];
        CometChatManager.blockUsers(usersList)
            .then((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            _this.item = tslib_1.__assign({}, _this.item, { blockedByMe: true });
            _this.curentItem = _this.item;
            console.log("block success");
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Blocking user fails with error", error);
        }));
    };
    /**
     * When User UnBlock someone
     */
    /**
     * When User UnBlock someone
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.unblockUser = /**
     * When User UnBlock someone
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var usersList = [this.item.uid];
        CometChatManager.unblockUsers(usersList)
            .then((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            _this.item = tslib_1.__assign({}, _this.item, { blockedByMe: false });
            _this.curentItem = _this.item;
            console.log("unblock success");
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("unblocking user fails with error", error);
        }));
    };
    /**
     * Listen to the user emitted by the userList component
     * @param Event user
     */
    /**
     * Listen to the user emitted by the userList component
     * @param {?} event
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.userClicked = /**
     * Listen to the user emitted by the userList component
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     *  Unbans the user
     * @param
     */
    /**
     *  Unbans the user
     * @param {?} members
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.memberUnbanned = /**
     *  Unbans the user
     * @param {?} members
     * @return {?}
     */
    function (members) {
        var _this = this;
        /** @type {?} */
        var messageList = [];
        members.forEach((/**
         * @param {?} eachMember
         * @return {?}
         */
        function (eachMember) {
            /** @type {?} */
            var message = _this.loggedInUser.name + " unbanned " + eachMember.name;
            /** @type {?} */
            var date = new Date();
            /** @type {?} */
            var sentAt = (date / 1000) | 0;
            /** @type {?} */
            var messageObj = {
                category: "action",
                message: message,
                type: enums.ACTION_TYPE_GROUPMEMBER,
                sentAt: sentAt,
            };
            messageList.push(messageObj);
        }));
        this.groupMessage = messageList;
    };
    /**
     * initiates an audio call with the person you are chatting with
     */
    /**
     * initiates an audio call with the person you are chatting with
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.audioCall = /**
     * initiates an audio call with the person you are chatting with
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var receiverId;
        /** @type {?} */
        var receiverType;
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
        function (call) {
            _this.appendCallMessage(call);
            _this.outgoingCall = call;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Call initialization failed with exception:", error);
        }));
    };
    /**
     * @param {?} call
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.appendCallMessage = /**
     * @param {?} call
     * @return {?}
     */
    function (call) {
        this.callMessage = call;
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.outgoingCallEnded = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.outgoingCall = null;
        this.incomingCall = null;
        this.appendCallMessage(message);
    };
    /**
     * ACCPETS INCOMING CALL
     */
    /**
     * ACCPETS INCOMING CALL
     * @param {?} call
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.acceptIncomingCall = /**
     * ACCPETS INCOMING CALL
     * @param {?} call
     * @return {?}
     */
    function (call) {
        var _this = this;
        this.incomingCall = call;
        /** @type {?} */
        var type = call.receiverType;
        /** @type {?} */
        var id = type === "user" ? call.sender.uid : call.receiverId;
        CometChat.getConversation(id, type)
            .then((/**
         * @param {?} conversation
         * @return {?}
         */
        function (conversation) {
            _this.item = tslib_1.__assign({}, conversation.conversationWith);
            _this.type = type;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("error while fetching a conversation", error);
        }));
    };
    /**
     * When call is accepted and connected
     * @param
     */
    /**
     * When call is accepted and connected
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.callInitiated = /**
     * When call is accepted and connected
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.appendCallMessage(message);
    };
    /**
     * IncomingCall Rejected
     */
    /**
     * IncomingCall Rejected
     * @param {?} call
     * @return {?}
     */
    CometchatConversationListWithMessagesComponent.prototype.rejectedIncomingCall = /**
     * IncomingCall Rejected
     * @param {?} call
     * @return {?}
     */
    function (call) {
        /** @type {?} */
        var incomingCallMessage = call.incomingCall;
        /** @type {?} */
        var rejectedCallMessage = call.rejectedCall;
        /** @type {?} */
        var receiverType = incomingCallMessage.receiverType;
        /** @type {?} */
        var receiverId = receiverType === "user"
            ? incomingCallMessage.sender.uid
            : incomingCallMessage.receiverId;
        //marking the incoming call message as read
        if (incomingCallMessage.hasOwnProperty("readAt") === false) {
            CometChat.markAsRead(incomingCallMessage.id, receiverId, receiverType);
        }
        //updating unreadcount in chats list
        this.messageToMarkRead = incomingCallMessage;
        /** @type {?} */
        var item = this.item;
        /** @type {?} */
        var type = this.type;
        receiverType = rejectedCallMessage.receiverType;
        receiverId = rejectedCallMessage.receiverId;
        if ((type === "group" &&
            receiverType === "group" &&
            receiverId === item.guid) ||
            (type === "user" && receiverType === "user" && receiverId === item.uid)) {
            this.appendCallMessage(rejectedCallMessage);
        }
    };
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
    CometchatConversationListWithMessagesComponent.ctorParameters = function () { return []; };
    CometchatConversationListWithMessagesComponent.propDecorators = {
        onResize: [{ type: HostListener, args: ["window:resize", [],] }]
    };
    return CometchatConversationListWithMessagesComponent;
}());
export { CometchatConversationListWithMessagesComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7SUFzREU7UUFBQSxpQkFBZ0I7UUE1QmhCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFFN0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDOztRQUVyQyxjQUFTLEdBQUcsSUFBSSxDQUFD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LDJFQUFtQzs7SUFDbkMsMkVBQXlCOztJQUN6QiwyRUFBdUI7O0lBQ3ZCLDZFQUEyQjs7SUFDM0IsK0VBQTZCOztJQUU3Qiw2RUFBcUM7O0lBRXJDLG1FQUFpQjs7SUFDakIsdUVBQW1COztJQUNuQixzRUFBa0I7O0lBQ2xCLHVFQUFtQjs7SUFDbkIsc0VBQWtCOztJQUVsQiw0RUFBbUI7O0lBQ25CLHlFQUFpQzs7SUFDakMsb0VBQVc7O0lBRVgsc0VBQW9COztJQUNwQixzRUFBb0I7O0lBQ3BCLHFFQUFpQjs7SUFDakIsMkVBQWtCOzs7Ozs7SUEwS2xCLDBFQUdFOzs7Ozs7SUFvR0YsNEVBZ0JFOzs7Ozs7SUFNRixzRUFlRTs7Ozs7O0lBTUYsNEVBS0U7Ozs7OztJQU1GLHNFQTBCRTs7SUEyQkYsb0VBSUU7Ozs7OztJQU1GLHFFQUlFOzs7OztJQTJCRixtRUFtQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3Qtd2l0aC1tZXNzYWdlc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3Qtd2l0aC1tZXNzYWdlcy5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcIkZhZGVJbkZhZGVPdXRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwibm9ybWFsXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIjAlXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwiYW5pbWF0ZWRcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiLTEwMCVcIixcbiAgICAgICAgICB6SW5kZXg6IFwiMFwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw8PT5hbmltYXRlZFwiLCBhbmltYXRlKDMwMCkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0V2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY3VyZW50SXRlbTtcbiAgbGFzdE1lc3NhZ2U7XG4gIGl0ZW0gPSBudWxsO1xuICB0eXBlID0gXCJcIjtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBzaWRlYmFydmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICB0aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcblxuICBmdWxsU2NyZWVuVmlld0ltYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRvIGRpc3BsYXkgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgaW1hZ2VWaWV3ID0gbnVsbDtcbiAgZ3JvdXBUb1VwZGF0ZSA9IHt9O1xuICBncm91cFRvTGVhdmUgPSB7fTtcbiAgZ3JvdXBUb0RlbGV0ZSA9IHt9O1xuICBncm91cE1lc3NhZ2UgPSBbXTtcblxuICBjaGVja0FuaW1hdGVkU3RhdGU7XG4gIGNoZWNrSWZBbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbm5lcldpZHRoO1xuXG4gIG91dGdvaW5nQ2FsbCA9IG51bGw7XG4gIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIGNhbGxNZXNzYWdlID0ge307XG4gIG1lc3NhZ2VUb01hcmtSZWFkO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltDb21ldENoYXRVbmlmaWVkXSBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZBbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcblxuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLmNoZWNrSWZBbmltYXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uID0gbnVsbCwgaXRlbSA9IG51bGwsIGNvdW50ID0gbnVsbCkge1xuICAgIGxldCBtZXNzYWdlID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5CTE9DS19VU0VSOlxuICAgICAgICB0aGlzLmJsb2NrVXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVU5CTE9DS19VU0VSOlxuICAgICAgICB0aGlzLnVuYmxvY2tVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX0RFVEFJTDpcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQ6XG4gICAgICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlQmFyKCk7XG4gICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9NRU5VX0NMSUNLRUQ6XG4gICAgICAgIHRoaXMudG9nZ2xlU2lkZUJhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRDpcbiAgICAgICAgdGhpcy52aWV3TWVzc2FnZVRocmVhZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VEOlxuICAgICAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFOlxuICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0ZVTExfU0NSRUVOX0lNQUdFOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlSW1hZ2VWaWV3KG51bGwpO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0NPTVBPU0VEOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVQ6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFOlxuICAgICAgICB0aGlzLnVwZGF0ZUxhc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQ0hBTkdFX1RIUkVBRF9QQVJFTlRfTUVTU0FHRV9SRVBMWV9DT1VOVDoge1xuICAgICAgICAvLyB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcblxuICAgICAgICB0aGlzLmNvbXBvc2VkdGhyZWFkbWVzc2FnZSA9IHtcbiAgICAgICAgICAuLi50aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQsXG4gICAgICAgICAgcmVwbHlDb3VudDogYWN0aW9uLnBheUxvYWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1NDT1BFX0NIQU5HRUQ6IHtcbiAgICAgICAgdGhpcy5tZW1iZXJTY29wZUNoYW5nZWQoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19BRERFRDoge1xuICAgICAgICB0aGlzLm1lbWJlcnNBZGRlZChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUlNfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlcnNDb3VudChkYXRhLml0ZW0sIGRhdGEuY291bnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfVVBEQVRFRDpcbiAgICAgICAgdGhpcy5ncm91cFVwZGF0ZWQoZGF0YS5tZXNzYWdlLCBkYXRhLmtleSwgZGF0YS5ncm91cCwgZGF0YS5vcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUl9VTkJBTk5FRDpcbiAgICAgICAgdGhpcy5tZW1iZXJVbmJhbm5lZChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkxFRlRfR1JPVVA6IHtcbiAgICAgICAgdGhpcy5sZWF2ZUdyb3VwKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuREVMRVRFX0dST1VQOiB7XG4gICAgICAgIHRoaXMuZGVsZXRlR3JvdXAoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BVURJT19DQUxMOiB7XG4gICAgICAgIHRoaXMuYXVkaW9DYWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5WSURFT19DQUxMOlxuICAgICAgICB0aGlzLnZpZGVvQ2FsbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuT1VUX0dPSU5HX0NBTExfUkVKRUNURUQ6XG4gICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQ6XG4gICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEX0JZX1VTRVI6XG4gICAgICBjYXNlIGVudW1zLkNBTExfRU5ERUQ6IHtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlVTRVJfSk9JTkVEX0NBTEw6XG4gICAgICBjYXNlIGVudW1zLlVTRVJfTEVGVF9DQUxMOiB7XG4gICAgICAgIC8vdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShpdGVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMuYWNjZXB0SW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUNDRVBURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmNhbGxJbml0aWF0ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5SRUpFQ1RFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMucmVqZWN0ZWRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VSUk9SOiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiVXNlciBMaXN0IHNjcmVlbiAtLT4gY2FsbCBjb3VsZG4ndCBjb21wbGV0ZSBkdWUgdG8gZXJyb3JcIixcbiAgICAgICAgICBhY3Rpb24ucGF5TG9hZFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTGFzdE1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgdG9nZ2xlU2lkZUJhcigpIHtcbiAgICBjb25zdCBzaWRlYmFydmlldyA9IHRoaXMuc2lkZWJhcnZpZXc7XG4gICAgdGhpcy5zaWRlYmFydmlldyA9ICFzaWRlYmFydmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZURldGFpbFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9ICF0aGlzLnZpZXdEZXRhaWxTY3JlZW47XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgQWxsIHRoZSBJbnRpYWwgQ29uZGl0aW9ucyBmb3IgdGhlIHRocmVhZGVkIFZpZXcgb2YgTWVzc2FnZXMgYW5kIE9wZW5zIHRocmVhZCBWaWV3XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIC8vT3BlbiBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAvL2Nsb3NlIHVzZXIgKCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBzY3JlZW5cbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IHRoaXMuaXRlbTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gdGhpcy50eXBlO1xuICB9XG5cbiAgLypcbiAgICogQ2xvc2UgdGhlIHRocmVhZCB3aW5kb3dcbiAgICogQHBhcmFtIEFueSBwYXJlbnRNZXNzYWdlXG4gICAqL1xuICBjbG9zZVRocmVhZE1lc3NhZ2VzKCkge1xuICAgIC8vY2xvc2UgVGhyZWFkIFNjcmVlblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSBmYWxzZTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSBudWxsO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVR5cGUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVJbWFnZVZpZXcobWVzc2FnZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udmVyc2F0aW9uc2NyZWVuIHRvZ2dsZUltYWdlVmlldyBcIiwgbWVzc2FnZSk7XG4gICAgdGhpcy5pbWFnZVZpZXcgPSBtZXNzYWdlO1xuICAgIHRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZSA9ICF0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2U7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBVc2VyIEJsb2NrIHNvbWVvbmVcbiAgICovXG4gIGJsb2NrVXNlcigpIHtcbiAgICBsZXQgdXNlcnNMaXN0ID0gW3RoaXMuaXRlbS51aWRdO1xuICAgIENvbWV0Q2hhdE1hbmFnZXIuYmxvY2tVc2Vycyh1c2Vyc0xpc3QpXG4gICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLnRoaXMuaXRlbSwgYmxvY2tlZEJ5TWU6IHRydWUgfTtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgICBjb25zb2xlLmxvZyhcImJsb2NrIHN1Y2Nlc3NcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgVW5CbG9jayBzb21lb25lXG4gICAqL1xuICB1bmJsb2NrVXNlcigpIHtcbiAgICBsZXQgdXNlcnNMaXN0ID0gW3RoaXMuaXRlbS51aWRdO1xuICAgIENvbWV0Q2hhdE1hbmFnZXIudW5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogZmFsc2UgfTtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwidW5ibG9jayBzdWNjZXNzXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIHVzZXIgZW1pdHRlZCBieSB0aGUgdXNlckxpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICB1c2VyQ2xpY2tlZChldmVudCkge1xuICAgIGlmICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPT0gXCJub3JtYWxcIlxuICAgICAgICA/ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwiYW5pbWF0ZWRcIilcbiAgICAgICAgOiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLml0ZW0gPSBldmVudC5jb252ZXJzYXRpb25XaXRoO1xuICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICB0aGlzLmxhc3RNZXNzYWdlID0gZXZlbnQubGFzdE1lc3NhZ2U7XG4gICAgaWYgKHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSkge1xuICAgICAgdGhpcy50eXBlID0gXCJ1c2VyXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlcyB0aGUgbWVzc2FnZSBsaXN0IHdpdGggYSBtZXNzYWdlIG5vdGlmeWluZyB0aGF0ICwgc2NvcGUgYSBzb21lIHVzZXIgaXMgY2hhbmdlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlclNjb3BlQ2hhbmdlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcblxuICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IG1hZGUgJHtlYWNoTWVtYmVyLm5hbWV9ICR7ZWFjaE1lbWJlci5zY29wZX1gO1xuICAgICAgY29uc3Qgc2VudEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2VMaXN0IHdpdGggbWVzc2FnZXMgYWJvdXQgdGhlIG1lbWJlcnMgdGhhdCB3ZXJlIGFkZGVkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyc0FkZGVkID0gKG1lbWJlcnMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IGFkZGVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICBjb25zdCBzZW50QXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyBUaGUgY291bnQgb2YgIG51bWJlciBvZiBtZW1iZXJzIHByZXNlbnQgaW4gYSBncm91cCBiYXNlZCBvbiBncm91cCBhY3Rpdml0aWVzICwgbGlrZSBhZGRpbmcgYSBtZW1iZXIgb3Iga2lja2luZyBhIG1lbWJlclxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIHVwZGF0ZU1lbWJlcnNDb3VudCA9IChpdGVtLCBjb3VudCkgPT4ge1xuICAgIGNvbnN0IGdyb3VwID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7IG1lbWJlcnNDb3VudDogY291bnQgfSk7XG5cbiAgICB0aGlzLml0ZW0gPSBncm91cDtcbiAgICB0aGlzLmdyb3VwVG9VcGRhdGUgPSBncm91cDtcbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBDdXJyZW50IEdyb3VwIEluZm9ybWF0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ3JvdXBVcGRhdGVkID0gKG1lc3NhZ2UsIGtleSwgZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOiB7XG4gICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICB0aGlzLml0ZW0gPSBudWxsO1xuICAgICAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6IHtcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwge1xuICAgICAgICAgICAgc2NvcGU6IG9wdGlvbnNbXCJzY29wZVwiXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuaXRlbSA9IG5ld09iajtcbiAgICAgICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqICBVbmJhbnMgdGhlIHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBtZW1iZXJVbmJhbm5lZChtZW1iZXJzKSB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSB1bmJhbm5lZCAke2VhY2hNZW1iZXIubmFtZX1gO1xuICAgICAgY29uc3QgZGF0ZTogYW55ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IHNlbnRBdDogYW55ID0gKGRhdGUgLyAxMDAwKSB8IDA7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH1cbiAgLyogQ2xvc2VzIGdyb3VwIHNjcmVlbiBhbmQgYWxsICwgYWZ0ZXIgdXNlciBoYXMgbGVmdCB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBsZWF2ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5ncm91cFRvTGVhdmUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBkZWxldGVkIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGRlbGV0ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5ncm91cFRvRGVsZXRlID0gZ3JvdXA7XG4gICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgfTtcbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiBhdWRpbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIGF1ZGlvQ2FsbCgpIHtcbiAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5BVURJTylcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXRpYXRlcyBhbiB2aWRlbyBjYWxsIHdpdGggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGhcbiAgICovXG4gIHZpZGVvQ2FsbCA9ICgpID0+IHtcbiAgICBsZXQgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0TWFuYWdlci5jYWxsKHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSwgQ29tZXRDaGF0LkNBTExfVFlQRS5WSURFTylcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCk7XG5cbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgYXBwZW5kQ2FsbE1lc3NhZ2UoY2FsbCkge1xuICAgIHRoaXMuY2FsbE1lc3NhZ2UgPSBjYWxsO1xuICB9XG5cbiAgb3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSkge1xuICAgIHRoaXMub3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgICB0aGlzLmluY29taW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBQ0NQRVRTIElOQ09NSU5HIENBTExcbiAgICovXG4gIGFjY2VwdEluY29taW5nQ2FsbChjYWxsKSB7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBjYWxsO1xuXG4gICAgY29uc3QgdHlwZSA9IGNhbGwucmVjZWl2ZXJUeXBlO1xuICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJ1c2VyXCIgPyBjYWxsLnNlbmRlci51aWQgOiBjYWxsLnJlY2VpdmVySWQ7XG5cbiAgICBDb21ldENoYXQuZ2V0Q29udmVyc2F0aW9uKGlkLCB0eXBlKVxuICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4uY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGggfTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYSBjb252ZXJzYXRpb25cIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjYWxsIGlzIGFjY2VwdGVkIGFuZCBjb25uZWN0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYWxsSW5pdGlhdGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY29taW5nQ2FsbCBSZWplY3RlZFxuICAgKi9cbiAgcmVqZWN0ZWRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIGxldCBpbmNvbWluZ0NhbGxNZXNzYWdlID0gY2FsbC5pbmNvbWluZ0NhbGw7XG4gICAgbGV0IHJlamVjdGVkQ2FsbE1lc3NhZ2UgPSBjYWxsLnJlamVjdGVkQ2FsbDtcbiAgICBsZXQgcmVjZWl2ZXJUeXBlID0gaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgbGV0IHJlY2VpdmVySWQgPVxuICAgICAgcmVjZWl2ZXJUeXBlID09PSBcInVzZXJcIlxuICAgICAgICA/IGluY29taW5nQ2FsbE1lc3NhZ2Uuc2VuZGVyLnVpZFxuICAgICAgICA6IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIC8vbWFya2luZyB0aGUgaW5jb21pbmcgY2FsbCBtZXNzYWdlIGFzIHJlYWRcbiAgICBpZiAoaW5jb21pbmdDYWxsTWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlYWRBdFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKGluY29taW5nQ2FsbE1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgfVxuXG4gICAgLy91cGRhdGluZyB1bnJlYWRjb3VudCBpbiBjaGF0cyBsaXN0XG4gICAgdGhpcy5tZXNzYWdlVG9NYXJrUmVhZCA9IGluY29taW5nQ2FsbE1lc3NhZ2U7XG5cbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgIHJlY2VpdmVyVHlwZSA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIHJlY2VpdmVySWQgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICBpZiAoXG4gICAgICAodHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0uZ3VpZCkgfHxcbiAgICAgICh0eXBlID09PSBcInVzZXJcIiAmJiByZWNlaXZlclR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVySWQgPT09IGl0ZW0udWlkKVxuICAgICkge1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShyZWplY3RlZENhbGxNZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==