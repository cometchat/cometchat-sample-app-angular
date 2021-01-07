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
                // this.setState({ outgoingCall: call });
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
            // this.itemClicked(conversation.conversationWith, type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7SUFzREU7UUFBQSxpQkFBZ0I7UUE1QmhCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFFN0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDOztRQUVyQyxjQUFTLEdBQUcsSUFBSSxDQUFD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QkM7U0F6aUJZLDhDQUE4Qzs7O0lBQ3pELG9FQUFXOztJQUNYLHFFQUFZOztJQUNaLDhEQUFZOztJQUNaLDhEQUFVOztJQUNWLHNFQUFhOztJQUNiLHFFQUE2Qjs7SUFDN0IsMEVBQWtDOztJQUNsQywyRUFBbUM7O0lBQ25DLDJFQUF5Qjs7SUFDekIsMkVBQXVCOztJQUN2Qiw2RUFBMkI7O0lBQzNCLCtFQUE2Qjs7SUFFN0IsNkVBQXFDOztJQUVyQyxtRUFBaUI7O0lBQ2pCLHVFQUFtQjs7SUFDbkIsc0VBQWtCOztJQUNsQix1RUFBbUI7O0lBQ25CLHNFQUFrQjs7SUFFbEIsNEVBQW1COztJQUNuQix5RUFBaUM7O0lBQ2pDLG9FQUFXOztJQUVYLHNFQUFvQjs7SUFDcEIsc0VBQW9COztJQUNwQixxRUFBaUI7O0lBQ2pCLDJFQUFrQjs7Ozs7O0lBa0xsQiwwRUFHRTs7Ozs7O0lBb0dGLDRFQWdCRTs7Ozs7O0lBTUYsc0VBZUU7Ozs7OztJQU1GLDRFQUtFOzs7Ozs7SUFNRixzRUEwQkU7O0lBMkJGLG9FQUlFOzs7Ozs7SUFNRixxRUFJRTs7Ozs7SUEyQkYsbUVBb0JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5cbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3Qtd2l0aC1tZXNzYWdlcy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCIwJVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIi0xMDAlXCIsXG4gICAgICAgICAgekluZGV4OiBcIjBcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFwibm9ybWFsPD0+YW5pbWF0ZWRcIiwgYW5pbWF0ZSgzMDApKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Q29udmVyc2F0aW9uTGlzdFdpdGhNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGN1cmVudEl0ZW07XG4gIGxhc3RNZXNzYWdlO1xuICBpdGVtID0gbnVsbDtcbiAgdHlwZSA9IFwiXCI7XG4gIGxvZ2dlZEluVXNlcjtcbiAgc2lkZWJhcnZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdmlld0RldGFpbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICB0aHJlYWRNZXNzYWdlVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICB0aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgdGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gIGNvbXBvc2VkdGhyZWFkbWVzc2FnZSA9IG51bGw7XG5cbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUbyBkaXNwbGF5IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGltYWdlVmlldyA9IG51bGw7XG4gIGdyb3VwVG9VcGRhdGUgPSB7fTtcbiAgZ3JvdXBUb0xlYXZlID0ge307XG4gIGdyb3VwVG9EZWxldGUgPSB7fTtcbiAgZ3JvdXBNZXNzYWdlID0gW107XG5cbiAgY2hlY2tBbmltYXRlZFN0YXRlO1xuICBjaGVja0lmQW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW5uZXJXaWR0aDtcblxuICBvdXRnb2luZ0NhbGwgPSBudWxsO1xuICBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBjYWxsTWVzc2FnZSA9IHt9O1xuICBtZXNzYWdlVG9NYXJrUmVhZDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIG5ldyBDb21ldENoYXRNYW5hZ2VyKClcbiAgICAgIC5nZXRMb2dnZWRJblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbQ29tZXRDaGF0VW5pZmllZF0gZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5pbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuaW5uZXJXaWR0aCA+PSBcIjMyMFwiICYmIHRoaXMuaW5uZXJXaWR0aCA8PSBcIjc2N1wiKSB7XG4gICAgICBpZiAodGhpcy5jaGVja0lmQW5pbWF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25IYW5kbGVyKGFjdGlvbiA9IG51bGwsIGl0ZW0gPSBudWxsLCBjb3VudCA9IG51bGwpIHtcbiAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuQkxPQ0tfVVNFUjpcbiAgICAgICAgdGhpcy5ibG9ja1VzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlVOQkxPQ0tfVVNFUjpcbiAgICAgICAgdGhpcy51bmJsb2NrVXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vICAgY2FzZSBcImF1ZGlvQ2FsbFwiOlxuICAgICAgLy8gICAgIHRoaXMuYXVkaW9DYWxsKCk7XG4gICAgICAvLyAgIGJyZWFrO1xuICAgICAgLy8gICBjYXNlIFwidmlkZW9DYWxsXCI6XG4gICAgICAvLyAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICB0aGlzLnRvZ2dsZVNpZGVCYXIoKTtcbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX01FTlVfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy50b2dnbGVTaWRlQmFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFEOlxuICAgICAgICB0aGlzLnZpZXdNZXNzYWdlVGhyZWFkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfVEhSRUFEX0NMSUNLRUQ6XG4gICAgICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6XG4gICAgICAgIHRoaXMudG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobnVsbCk7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfQ09NUE9TRUQ6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfRURJVDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEU6XG4gICAgICAgIHRoaXMudXBkYXRlTGFzdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfVEhSRUFEX1BBUkVOVF9NRVNTQUdFX1JFUExZX0NPVU5UOiB7XG4gICAgICAgIC8vIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuXG4gICAgICAgIHRoaXMuY29tcG9zZWR0aHJlYWRtZXNzYWdlID0ge1xuICAgICAgICAgIC4uLnRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCxcbiAgICAgICAgICByZXBseUNvdW50OiBhY3Rpb24ucGF5TG9hZCxcbiAgICAgICAgfTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICB0aGlzLm1lbWJlclNjb3BlQ2hhbmdlZChhY3Rpb24ucGF5TG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX0FEREVEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyc0FkZGVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19VUERBVEVEOiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyc0NvdW50KGRhdGEuaXRlbSwgZGF0YS5jb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9VUERBVEVEOlxuICAgICAgICB0aGlzLmdyb3VwVXBkYXRlZChkYXRhLm1lc3NhZ2UsIGRhdGEua2V5LCBkYXRhLmdyb3VwLCBkYXRhLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgICB0aGlzLm1lbWJlclVuYmFubmVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTEVGVF9HUk9VUDoge1xuICAgICAgICB0aGlzLmxlYXZlR3JvdXAoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfR1JPVVA6IHtcbiAgICAgICAgdGhpcy5kZWxldGVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgIHRoaXMudmlkZW9DYWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICBjYXNlIGVudW1zLkNBTExfRU5ERURfQllfVVNFUjpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRDoge1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9MRUZUX0NBTEw6IHtcbiAgICAgICAgLy90aGlzLmFwcGVuZENhbGxNZXNzYWdlKGl0ZW0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUNDRVBUX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hY2NlcHRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMuY2FsbEluaXRpYXRlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlJFSkVDVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNBTExfRVJST1I6IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJVc2VyIExpc3Qgc2NyZWVuIC0tPiBjYWxsIGNvdWxkbid0IGNvbXBsZXRlIGR1ZSB0byBlcnJvclwiLFxuICAgICAgICAgIGFjdGlvbi5wYXlMb2FkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5sYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICB0b2dnbGVTaWRlQmFyKCkge1xuICAgIGNvbnN0IHNpZGViYXJ2aWV3ID0gdGhpcy5zaWRlYmFydmlldztcbiAgICB0aGlzLnNpZGViYXJ2aWV3ID0gIXNpZGViYXJ2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIFVzZXIgRGV0YWlsIFJpZ2h0IFNpZGUgYmFyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlRGV0YWlsVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gIXRoaXMudmlld0RldGFpbFNjcmVlbjtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBBbGwgdGhlIEludGlhbCBDb25kaXRpb25zIGZvciB0aGUgdGhyZWFkZWQgVmlldyBvZiBNZXNzYWdlcyBhbmQgT3BlbnMgdGhyZWFkIFZpZXdcbiAgICogQHBhcmFtIEFueSBwYXJlbnRNZXNzYWdlXG4gICAqL1xuICB2aWV3TWVzc2FnZVRocmVhZChwYXJlbnRNZXNzYWdlKSB7XG4gICAgLy9PcGVuIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gdHJ1ZTtcblxuICAgIC8vY2xvc2UgdXNlciAoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoICkgRGV0YWlsIHNjcmVlblxuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gcGFyZW50TWVzc2FnZTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gdGhpcy5pdGVtO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVR5cGUgPSB0aGlzLnR5cGU7XG4gIH1cblxuICAvKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIGNsb3NlVGhyZWFkTWVzc2FnZXMoKSB7XG4gICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGNsaWNrZWQgSW1hZ2UgaW4gZnVsbCBzY3JlZW4gbW9kZVxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZUltYWdlVmlldyhtZXNzYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb252ZXJzYXRpb25zY3JlZW4gdG9nZ2xlSW1hZ2VWaWV3IFwiLCBtZXNzYWdlKTtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgc3VjY2Vzc1wiKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gVXNlciBVbkJsb2NrIHNvbWVvbmVcbiAgICovXG4gIHVuYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci51bmJsb2NrVXNlcnModXNlcnNMaXN0KVxuICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0geyAuLi50aGlzLml0ZW0sIGJsb2NrZWRCeU1lOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NrIHN1Y2Nlc3NcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVuYmxvY2tpbmcgdXNlciBmYWlscyB3aXRoIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgdXNlciBlbWl0dGVkIGJ5IHRoZSB1c2VyTGlzdCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IHVzZXJcbiAgICovXG4gIHVzZXJDbGlja2VkKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgID8gKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJhbmltYXRlZFwiKVxuICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgIHRoaXMuaXRlbSA9IGV2ZW50LmNvbnZlcnNhdGlvbldpdGg7XG4gICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBldmVudC5sYXN0TWVzc2FnZTtcbiAgICBpZiAodGhpcy5pdGVtLmhhc093blByb3BlcnR5KFwidWlkXCIpKSB7XG4gICAgICB0aGlzLnR5cGUgPSBcInVzZXJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlIGxpc3Qgd2l0aCBhIG1lc3NhZ2Ugbm90aWZ5aW5nIHRoYXQgLCBzY29wZSBhIHNvbWUgdXNlciBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyU2NvcGVDaGFuZ2VkID0gKG1lbWJlcnMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuXG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gbWFkZSAke2VhY2hNZW1iZXIubmFtZX0gJHtlYWNoTWVtYmVyLnNjb3BlfWA7XG4gICAgICBjb25zdCBzZW50QXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyB0aGUgbWVzc2FnZUxpc3Qgd2l0aCBtZXNzYWdlcyBhYm91dCB0aGUgbWVtYmVycyB0aGF0IHdlcmUgYWRkZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJzQWRkZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gYWRkZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIFRoZSBjb3VudCBvZiAgbnVtYmVyIG9mIG1lbWJlcnMgcHJlc2VudCBpbiBhIGdyb3VwIGJhc2VkIG9uIGdyb3VwIGFjdGl2aXRpZXMgLCBsaWtlIGFkZGluZyBhIG1lbWJlciBvciBraWNraW5nIGEgbWVtYmVyXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgdXBkYXRlTWVtYmVyc0NvdW50ID0gKGl0ZW0sIGNvdW50KSA9PiB7XG4gICAgY29uc3QgZ3JvdXAgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHsgbWVtYmVyc0NvdW50OiBjb3VudCB9KTtcblxuICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuICAgIHRoaXMuZ3JvdXBUb1VwZGF0ZSA9IGdyb3VwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIEN1cnJlbnQgR3JvdXAgSW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAobWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6IHtcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgY29uc3QgbmV3T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7XG4gICAgICAgICAgICBzY29wZTogb3B0aW9uc1tcInNjb3BlXCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5pdGVtID0gbmV3T2JqO1xuICAgICAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIFVuYmFucyB0aGUgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lbWJlclVuYmFubmVkKG1lbWJlcnMpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IHVuYmFubmVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICBjb25zdCBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcblxuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfVxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9MZWF2ZSA9IGdyb3VwO1xuICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9EZWxldGUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIGF1ZGlvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIHZpZGVvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgdmlkZW9DYWxsID0gKCkgPT4ge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IG91dGdvaW5nQ2FsbDogY2FsbCB9KTtcblxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICBhcHBlbmRDYWxsTWVzc2FnZShjYWxsKSB7XG4gICAgdGhpcy5jYWxsTWVzc2FnZSA9IGNhbGw7XG4gIH1cblxuICBvdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFDQ1BFVFMgSU5DT01JTkcgQ0FMTFxuICAgKi9cbiAgYWNjZXB0SW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICB0aGlzLmluY29taW5nQ2FsbCA9IGNhbGw7XG5cbiAgICBjb25zdCB0eXBlID0gY2FsbC5yZWNlaXZlclR5cGU7XG4gICAgY29uc3QgaWQgPSB0eXBlID09PSBcInVzZXJcIiA/IGNhbGwuc2VuZGVyLnVpZCA6IGNhbGwucmVjZWl2ZXJJZDtcblxuICAgIENvbWV0Q2hhdC5nZXRDb252ZXJzYXRpb24oaWQsIHR5cGUpXG4gICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgLy8gdGhpcy5pdGVtQ2xpY2tlZChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCwgdHlwZSk7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4uY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGggfTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYSBjb252ZXJzYXRpb25cIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjYWxsIGlzIGFjY2VwdGVkIGFuZCBjb25uZWN0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYWxsSW5pdGlhdGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY29taW5nQ2FsbCBSZWplY3RlZFxuICAgKi9cbiAgcmVqZWN0ZWRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIGxldCBpbmNvbWluZ0NhbGxNZXNzYWdlID0gY2FsbC5pbmNvbWluZ0NhbGw7XG4gICAgbGV0IHJlamVjdGVkQ2FsbE1lc3NhZ2UgPSBjYWxsLnJlamVjdGVkQ2FsbDtcbiAgICBsZXQgcmVjZWl2ZXJUeXBlID0gaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgbGV0IHJlY2VpdmVySWQgPVxuICAgICAgcmVjZWl2ZXJUeXBlID09PSBcInVzZXJcIlxuICAgICAgICA/IGluY29taW5nQ2FsbE1lc3NhZ2Uuc2VuZGVyLnVpZFxuICAgICAgICA6IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIC8vbWFya2luZyB0aGUgaW5jb21pbmcgY2FsbCBtZXNzYWdlIGFzIHJlYWRcbiAgICBpZiAoaW5jb21pbmdDYWxsTWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlYWRBdFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKGluY29taW5nQ2FsbE1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgfVxuXG4gICAgLy91cGRhdGluZyB1bnJlYWRjb3VudCBpbiBjaGF0cyBsaXN0XG4gICAgdGhpcy5tZXNzYWdlVG9NYXJrUmVhZCA9IGluY29taW5nQ2FsbE1lc3NhZ2U7XG5cbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgIHJlY2VpdmVyVHlwZSA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIHJlY2VpdmVySWQgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICBpZiAoXG4gICAgICAodHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0uZ3VpZCkgfHxcbiAgICAgICh0eXBlID09PSBcInVzZXJcIiAmJiByZWNlaXZlclR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVySWQgPT09IGl0ZW0udWlkKVxuICAgICkge1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShyZWplY3RlZENhbGxNZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==