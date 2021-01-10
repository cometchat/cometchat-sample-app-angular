/**
 * @fileoverview added by tsickle
 * Generated from: components/UnifiedChat/cometchat-unified-chat/cometchat-unified-chat/cometchat-unified-chat.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostListener } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import * as enums from "../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { trigger, state, style, transition, animate, } from "@angular/animations";
var CometchatUnifiedChatComponent = /** @class */ (function () {
    function CometchatUnifiedChatComponent() {
        var _this = this;
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
        this.composedthreadmessage = null;
        this.fullScreenViewImage = false;
        // To display image in full screen
        this.imageView = null;
        //for audio calling
        this.outgoingCall = null;
        this.incomingCall = null;
        this.callMessage = {};
        this.checkIfAnimated = false;
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
    CometchatUnifiedChatComponent.prototype.ngOnInit = /**
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
    CometchatUnifiedChatComponent.prototype.onResize = /**
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
    CometchatUnifiedChatComponent.prototype.actionHandler = /**
     * @param {?=} action
     * @param {?=} item
     * @param {?=} count
     * @return {?}
     */
    function (action, item, count) {
        // console.log("chat-unified  --> action generated is ", action);
        if (action === void 0) { action = null; }
        if (item === void 0) { item = null; }
        if (count === void 0) { count = null; }
        // console.log("chat-unified  --> action generated is ", action);
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
                // this.checkAnimatedState = "normal";
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatUnifiedChatComponent.prototype.updateLastMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.lastMessage = message;
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
    CometchatUnifiedChatComponent.prototype.viewMessageThread = /**
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
    CometchatUnifiedChatComponent.prototype.closeThreadMessages = /*
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
    CometchatUnifiedChatComponent.prototype.toggleImageView = /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
    CometchatUnifiedChatComponent.prototype.blockUser = /**
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
    CometchatUnifiedChatComponent.prototype.unblockUser = /**
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
            // console.log("unblock success");
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
     * @param {?} user
     * @return {?}
     */
    CometchatUnifiedChatComponent.prototype.userClicked = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        if (this.checkAnimatedState !== null) {
            this.checkAnimatedState == "normal"
                ? (this.checkAnimatedState = "animated")
                : (this.checkAnimatedState = "normal");
        }
        this.item = user;
        if (this.item.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
        }
        //close detail screen when switching between users/groups
        this.viewDetailScreen = false;
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
    CometchatUnifiedChatComponent.prototype.memberUnbanned = /**
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
    CometchatUnifiedChatComponent.prototype.audioCall = /**
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
    CometchatUnifiedChatComponent.prototype.appendCallMessage = /**
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
    CometchatUnifiedChatComponent.prototype.outgoingCallEnded = /**
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
    CometchatUnifiedChatComponent.prototype.acceptIncomingCall = /**
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
    CometchatUnifiedChatComponent.prototype.callInitiated = /**
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
    CometchatUnifiedChatComponent.prototype.rejectedIncomingCall = /**
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
    CometchatUnifiedChatComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-unified-chat",
                    template: "<div class=\"unifiedStyle\">\n  <div class=\"unifiedSidebarStyle\" [@FadeInFadeOut]=\"checkAnimatedState\">\n    <cometchat-nav-bar\n      [item]=\"item\"\n      [type]=\"type\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      [lastMessage]=\"lastMessage\"\n      (onUserClick)=\"userClicked($event)\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-nav-bar>\n  </div>\n  <div\n    class=\"unifiedMainStyle\"\n    *ngIf=\"item !== null\"\n    [ngClass]=\"{\n      unifiedMainSecondaryStyle: threadMessageView || viewDetailScreen\n    }\"\n  >\n    <cometchat-messages\n      [item]=\"item\"\n      [type]=\"type\"\n      [callMessage]=\"callMessage\"\n      [composedthreadmessage]=\"composedthreadmessage\"\n      [groupMessage]=\"groupMessage\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-messages>\n  </div>\n  <!--Detail Screen-->\n  <div\n    class=\"unifiedSecondaryStyle\"\n    *ngIf=\"threadMessageView || viewDetailScreen\"\n  >\n    <div\n      *ngIf=\"type === 'user'\"\n      [ngClass]=\"{\n        detailScreenStyle: viewDetailScreen\n      }\"\n    >\n      <cometchat-user-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      >\n      </cometchat-user-details>\n    </div>\n    <div *ngIf=\"type === 'group'\">\n      <cometchat-group-details\n        *ngIf=\"viewDetailScreen\"\n        [item]=\"item\"\n        [type]=\"type\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-group-details>\n    </div>\n\n    <cometchat-message-thread\n      *ngIf=\"threadMessageView\"\n      [item]=\"threadMessageItem\"\n      [type]=\"threadMessageType\"\n      [parentMessage]=\"threadMessageParent\"\n      [loggedInUser]=\"loggedInUser\"\n      (actionGenerated)=\"actionHandler($event)\"\n    ></cometchat-message-thread>\n  </div>\n  <cometchat-image-viewer\n    *ngIf=\"fullScreenViewImage\"\n    [MessageDetails]=\"imageView\"\n    [open]=\"true\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-image-viewer>\n  <cometchat-incoming-call\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-incoming-call>\n  <cometchat-outgoing-call\n    [item]=\"item\"\n    [type]=\"type\"\n    [incomingCall]=\"incomingCall\"\n    [outgoingCall]=\"outgoingCall\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-outgoing-call>\n</div>\n",
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
    CometchatUnifiedChatComponent.ctorParameters = function () { return []; };
    CometchatUnifiedChatComponent.propDecorators = {
        onResize: [{ type: HostListener, args: ["window:resize", [],] }]
    };
    return CometchatUnifiedChatComponent;
}());
export { CometchatUnifiedChatComponent };
if (false) {
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.item;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.curentItem;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.type;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.viewDetailScreen;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.threadMessageView;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.threadMessageItem;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.threadMessageType;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.threadMessageParent;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.groupMessage;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.composedthreadmessage;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.fullScreenViewImage;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.imageView;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.outgoingCall;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.callMessage;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.messageToMarkRead;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.checkIfAnimated;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.innerWidth;
    /**
     * Opens User Detail Right Side bar
     * \@param Any message
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.toggleDetailView;
    /**
     * updates the message list with a message notifying that , scope a some user is changed
     * \@param Any members
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.memberScopeChanged;
    /**
     * updates the messageList with messages about the members that were added
     * \@param Any members
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.membersAdded;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * \@param Any members
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.updateMembersCount;
    /**
     * Updates Current Group Information
     * \@param
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.groupUpdated;
    /** @type {?} */
    CometchatUnifiedChatComponent.prototype.leaveGroup;
    /**
     * Closes group screen and all , after user has deleted the group
     * \@param
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.deleteGroup;
    /**
     * initiates an video call with the person you are chatting with
     * @type {?}
     */
    CometchatUnifiedChatComponent.prototype.videoCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVuaWZpZWQtY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9VbmlmaWVkQ2hhdC9jb21ldGNoYXQtdW5pZmllZC1jaGF0L2NvbWV0Y2hhdC11bmlmaWVkLWNoYXQvY29tZXRjaGF0LXVuaWZpZWQtY2hhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QjtJQXFERTtRQUFBLGlCQUFnQjtRQTdCaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUdaLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2Qix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFHM0Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHdCQUFtQixHQUFZLEtBQUssQ0FBQzs7UUFFckMsY0FBUyxHQUFHLElBQUksQ0FBQzs7UUFHakIsaUJBQVks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LEVBQUU7d0JBQ1YsT0FBTyxDQUFDLGVBQWUsRUFBRTs0QkFDdkIsS0FBSyxDQUNILFFBQVEsRUFDUixLQUFLLENBQUM7Z0NBQ0osSUFBSSxFQUFFLElBQUk7NkJBQ1gsQ0FBQyxDQUNIOzRCQUNELEtBQUssQ0FDSCxVQUFVLEVBQ1YsS0FBSyxDQUFDO2dDQUNKLElBQUksRUFBRSxPQUFPO2dDQUNiLE1BQU0sRUFBRSxHQUFHOzZCQUNaLENBQUMsQ0FDSDs0QkFDRCxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUM5QyxDQUFDO3FCQUNIOztpQkFDRjs7Ozs7MkJBZ0RFLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7SUE2ZG5DLG9DQUFDO0NBQUEsQUFuaUJELElBbWlCQztTQTVnQlksNkJBQTZCOzs7SUFDeEMsNkNBQVk7O0lBQ1osbURBQVc7O0lBQ1gsNkNBQUs7O0lBQ0wseURBQWtDOztJQUNsQywwREFBbUM7O0lBQ25DLDBEQUF5Qjs7SUFDekIsMERBQXVCOztJQUN2Qiw0REFBMkI7O0lBQzNCLG9EQUFZOztJQUNaLHFEQUFhOztJQUNiLHNEQUFtQjs7SUFDbkIscURBQWtCOztJQUNsQixzREFBbUI7O0lBQ25CLHFEQUFrQjs7SUFDbEIsOERBQTZCOztJQUM3Qiw0REFBcUM7O0lBRXJDLGtEQUFpQjs7SUFHakIscURBQW9COztJQUNwQixxREFBb0I7O0lBQ3BCLG9EQUFpQjs7SUFDakIsMERBQWtCOztJQUVsQiwyREFBbUI7O0lBQ25CLHdEQUFpQzs7SUFDakMsbURBQVc7Ozs7OztJQTRMWCx5REFHRTs7Ozs7O0lBOERGLDJEQWdCRTs7Ozs7O0lBTUYscURBZUU7Ozs7OztJQU1GLDJEQUtFOzs7Ozs7SUFNRixxREEwQkU7O0lBMEJGLG1EQUlFOzs7Ozs7SUFNRixvREFJRTs7Ozs7SUE0QkYsa0RBb0JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdW5pZmllZC1jaGF0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVuaWZpZWQtY2hhdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXVuaWZpZWQtY2hhdC5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcIkZhZGVJbkZhZGVPdXRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwibm9ybWFsXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBsZWZ0OiBcIjAlXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwiYW5pbWF0ZWRcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiLTEwMCVcIixcbiAgICAgICAgICB6SW5kZXg6IFwiMFwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw8PT5hbmltYXRlZFwiLCBhbmltYXRlKDMwMCkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRVbmlmaWVkQ2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGl0ZW0gPSBudWxsO1xuICBjdXJlbnRJdGVtO1xuICB0eXBlO1xuICB2aWV3RGV0YWlsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgdGhyZWFkTWVzc2FnZVR5cGUgPSBcIlwiO1xuICB0aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgbGFzdE1lc3NhZ2U7XG4gIGxvZ2dlZEluVXNlcjtcbiAgZ3JvdXBUb1VwZGF0ZSA9IHt9O1xuICBncm91cFRvTGVhdmUgPSB7fTtcbiAgZ3JvdXBUb0RlbGV0ZSA9IHt9O1xuICBncm91cE1lc3NhZ2UgPSBbXTtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcbiAgZnVsbFNjcmVlblZpZXdJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUbyBkaXNwbGF5IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGltYWdlVmlldyA9IG51bGw7XG5cbiAgLy9mb3IgYXVkaW8gY2FsbGluZ1xuICBvdXRnb2luZ0NhbGwgPSBudWxsO1xuICBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBjYWxsTWVzc2FnZSA9IHt9O1xuICBtZXNzYWdlVG9NYXJrUmVhZDtcblxuICBjaGVja0FuaW1hdGVkU3RhdGU7XG4gIGNoZWNrSWZBbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbm5lcldpZHRoO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltDb21ldENoYXRVbmlmaWVkXSBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZCBpbiByZWFsdGltZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIiwgW10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPj0gXCIzMjBcIiAmJiB0aGlzLmlubmVyV2lkdGggPD0gXCI3NjdcIikge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25IYW5kbGVyKGFjdGlvbiA9IG51bGwsIGl0ZW0gPSBudWxsLCBjb3VudCA9IG51bGwpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNoYXQtdW5pZmllZCAgLS0+IGFjdGlvbiBnZW5lcmF0ZWQgaXMgXCIsIGFjdGlvbik7XG5cbiAgICBsZXQgbWVzc2FnZSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuQkxPQ0tfVVNFUjpcbiAgICAgICAgdGhpcy5ibG9ja1VzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlVOQkxPQ0tfVVNFUjpcbiAgICAgICAgdGhpcy51bmJsb2NrVXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVklFV19ERVRBSUw6XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VEOlxuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6XG4gICAgICAgIHRoaXMudmlld01lc3NhZ2VUaHJlYWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9USFJFQURfQ0xJQ0tFRDpcbiAgICAgICAgdGhpcy5jbG9zZVRocmVhZE1lc3NhZ2VzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRTpcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRToge1xuICAgICAgICB0aGlzLnRvZ2dsZUltYWdlVmlldyhudWxsKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9DT01QT1NFRDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElUOlxuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURTpcbiAgICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQ6IHtcbiAgICAgICAgdGhpcy5jb21wb3NlZHRocmVhZG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4udGhpcy50aHJlYWRNZXNzYWdlUGFyZW50LFxuICAgICAgICAgIHJlcGx5Q291bnQ6IGFjdGlvbi5wYXlMb2FkLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICB0aGlzLm1lbWJlclNjb3BlQ2hhbmdlZChhY3Rpb24ucGF5TG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX0FEREVEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyc0FkZGVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSU19VUERBVEVEOiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyc0NvdW50KGRhdGEuaXRlbSwgZGF0YS5jb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9VUERBVEVEOlxuICAgICAgICB0aGlzLmdyb3VwVXBkYXRlZChkYXRhLm1lc3NhZ2UsIGRhdGEua2V5LCBkYXRhLmdyb3VwLCBkYXRhLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgICB0aGlzLm1lbWJlclVuYmFubmVkKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTEVGVF9HUk9VUDoge1xuICAgICAgICB0aGlzLmxlYXZlR3JvdXAoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5ERUxFVEVfR1JPVVA6IHtcbiAgICAgICAgdGhpcy5kZWxldGVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFVRElPX0NBTEw6IHtcbiAgICAgICAgdGhpcy5hdWRpb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJREVPX0NBTEw6XG4gICAgICAgIHRoaXMudmlkZW9DYWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDpcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICBjYXNlIGVudW1zLkNBTExfRU5ERURfQllfVVNFUjpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRDoge1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVVNFUl9KT0lORURfQ0FMTDpcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9MRUZUX0NBTEw6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMuYWNjZXB0SW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUNDRVBURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmNhbGxJbml0aWF0ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5SRUpFQ1RFRF9JTkNPTUlOR19DQUxMOiB7XG4gICAgICAgIHRoaXMucmVqZWN0ZWRJbmNvbWluZ0NhbGwobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VSUk9SOiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiVXNlciBMaXN0IHNjcmVlbiAtLT4gY2FsbCBjb3VsZG4ndCBjb21wbGV0ZSBkdWUgdG8gZXJyb3JcIixcbiAgICAgICAgICBhY3Rpb24ucGF5TG9hZFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU5VX0NMSUNLRUQ6IHtcbiAgICAgICAgLy8gdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5UQUJfQ0hBTkdFRDoge1xuICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUxhc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmxhc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIEFsbCB0aGUgSW50aWFsIENvbmRpdGlvbnMgZm9yIHRoZSB0aHJlYWRlZCBWaWV3IG9mIE1lc3NhZ2VzIGFuZCBPcGVucyB0aHJlYWQgVmlld1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIHZpZXdNZXNzYWdlVGhyZWFkKHBhcmVudE1lc3NhZ2UpIHtcbiAgICAvL09wZW4gVGhyZWFkIFNjcmVlblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVZpZXcgPSB0cnVlO1xuXG4gICAgLy9jbG9zZSB1c2VyICggdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGggKSBEZXRhaWwgc2NyZWVuXG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VQYXJlbnQgPSBwYXJlbnRNZXNzYWdlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZUl0ZW0gPSB0aGlzLml0ZW07XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IHRoaXMudHlwZTtcbiAgfVxuICAvKlxuICAgKiBDbG9zZSB0aGUgdGhyZWFkIHdpbmRvd1xuICAgKiBAcGFyYW0gQW55IHBhcmVudE1lc3NhZ2VcbiAgICovXG4gIGNsb3NlVGhyZWFkTWVzc2FnZXMoKSB7XG4gICAgLy9jbG9zZSBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVHlwZSA9IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIE9wZW5zIFVzZXIgRGV0YWlsIFJpZ2h0IFNpZGUgYmFyXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlRGV0YWlsVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gIXRoaXMudmlld0RldGFpbFNjcmVlbjtcbiAgfTtcbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBjbGlja2VkIEltYWdlIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICogQHBhcmFtIEFueSBtZXNzYWdlXG4gICAqL1xuICB0b2dnbGVJbWFnZVZpZXcobWVzc2FnZSkge1xuICAgIHRoaXMuaW1hZ2VWaWV3ID0gbWVzc2FnZTtcbiAgICB0aGlzLmZ1bGxTY3JlZW5WaWV3SW1hZ2UgPSAhdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlO1xuICB9XG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgQmxvY2sgc29tZW9uZVxuICAgKi9cbiAgYmxvY2tVc2VyKCkge1xuICAgIGxldCB1c2Vyc0xpc3QgPSBbdGhpcy5pdGVtLnVpZF07XG4gICAgQ29tZXRDaGF0TWFuYWdlci5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogdHJ1ZSB9O1xuICAgICAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIFVzZXIgVW5CbG9jayBzb21lb25lXG4gICAqL1xuICB1bmJsb2NrVXNlcigpIHtcbiAgICBsZXQgdXNlcnNMaXN0ID0gW3RoaXMuaXRlbS51aWRdO1xuICAgIENvbWV0Q2hhdE1hbmFnZXIudW5ibG9ja1VzZXJzKHVzZXJzTGlzdClcbiAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4udGhpcy5pdGVtLCBibG9ja2VkQnlNZTogZmFsc2UgfTtcbiAgICAgICAgdGhpcy5jdXJlbnRJdGVtID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidW5ibG9jayBzdWNjZXNzXCIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmJsb2NraW5nIHVzZXIgZmFpbHMgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHVzZXJDbGlja2VkKHVzZXIpIHtcbiAgICBpZiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG4gICAgfVxuICAgIHRoaXMuaXRlbSA9IHVzZXI7XG4gICAgaWYgKHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSkge1xuICAgICAgdGhpcy50eXBlID0gXCJ1c2VyXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICB9XG5cbiAgICAvL2Nsb3NlIGRldGFpbCBzY3JlZW4gd2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiB1c2Vycy9ncm91cHNcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlIGxpc3Qgd2l0aCBhIG1lc3NhZ2Ugbm90aWZ5aW5nIHRoYXQgLCBzY29wZSBhIHNvbWUgdXNlciBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgbWVtYmVyU2NvcGVDaGFuZ2VkID0gKG1lbWJlcnMpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuXG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gbWFkZSAke2VhY2hNZW1iZXIubmFtZX0gJHtlYWNoTWVtYmVyLnNjb3BlfWA7XG4gICAgICBjb25zdCBzZW50QXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogdXBkYXRlcyB0aGUgbWVzc2FnZUxpc3Qgd2l0aCBtZXNzYWdlcyBhYm91dCB0aGUgbWVtYmVycyB0aGF0IHdlcmUgYWRkZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJzQWRkZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gYWRkZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIFRoZSBjb3VudCBvZiAgbnVtYmVyIG9mIG1lbWJlcnMgcHJlc2VudCBpbiBhIGdyb3VwIGJhc2VkIG9uIGdyb3VwIGFjdGl2aXRpZXMgLCBsaWtlIGFkZGluZyBhIG1lbWJlciBvciBraWNraW5nIGEgbWVtYmVyXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyc1xuICAgKi9cbiAgdXBkYXRlTWVtYmVyc0NvdW50ID0gKGl0ZW0sIGNvdW50KSA9PiB7XG4gICAgY29uc3QgZ3JvdXAgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHsgbWVtYmVyc0NvdW50OiBjb3VudCB9KTtcblxuICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuICAgIHRoaXMuZ3JvdXBUb1VwZGF0ZSA9IGdyb3VwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIEN1cnJlbnQgR3JvdXAgSW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBncm91cFVwZGF0ZWQgPSAobWVzc2FnZSwga2V5LCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQ6IHtcbiAgICAgICAgaWYgKG9wdGlvbnMudXNlci51aWQgPT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgY29uc3QgbmV3T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtLCB7XG4gICAgICAgICAgICBzY29wZTogb3B0aW9uc1tcInNjb3BlXCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5pdGVtID0gbmV3T2JqO1xuICAgICAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICAgICAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIFVuYmFucyB0aGUgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lbWJlclVuYmFubmVkKG1lbWJlcnMpIHtcbiAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFtdO1xuICAgIG1lbWJlcnMuZm9yRWFjaCgoZWFjaE1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubG9nZ2VkSW5Vc2VyLm5hbWV9IHVuYmFubmVkICR7ZWFjaE1lbWJlci5uYW1lfWA7XG4gICAgICBjb25zdCBkYXRlOiBhbnkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3Qgc2VudEF0OiBhbnkgPSAoZGF0ZSAvIDEwMDApIHwgMDtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH1cbiAgLyogQ2xvc2VzIGdyb3VwIHNjcmVlbiBhbmQgYWxsICwgYWZ0ZXIgdXNlciBoYXMgbGVmdCB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBsZWF2ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5ncm91cFRvTGVhdmUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBkZWxldGVkIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGRlbGV0ZUdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5ncm91cFRvRGVsZXRlID0gZ3JvdXA7XG4gICAgdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG4gICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIGF1ZGlvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLkFVRElPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBjYWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIGluaXRpYWxpemF0aW9uIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaW5pdGlhdGVzIGFuIHZpZGVvIGNhbGwgd2l0aCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aFxuICAgKi9cbiAgdmlkZW9DYWxsID0gKCkgPT4ge1xuICAgIGxldCByZWNlaXZlcklkLCByZWNlaXZlclR5cGU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICB9XG5cbiAgICBDb21ldENoYXRNYW5hZ2VyLmNhbGwocmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlLCBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShjYWxsKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IG91dGdvaW5nQ2FsbDogY2FsbCB9KTtcblxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICBhcHBlbmRDYWxsTWVzc2FnZShjYWxsKSB7XG4gICAgdGhpcy5jYWxsTWVzc2FnZSA9IGNhbGw7XG4gIH1cblxuICBvdXRnb2luZ0NhbGxFbmRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5vdXRnb2luZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFDQ1BFVFMgSU5DT01JTkcgQ0FMTFxuICAgKi9cbiAgYWNjZXB0SW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICB0aGlzLmluY29taW5nQ2FsbCA9IGNhbGw7XG5cbiAgICBjb25zdCB0eXBlID0gY2FsbC5yZWNlaXZlclR5cGU7XG4gICAgY29uc3QgaWQgPSB0eXBlID09PSBcInVzZXJcIiA/IGNhbGwuc2VuZGVyLnVpZCA6IGNhbGwucmVjZWl2ZXJJZDtcblxuICAgIENvbWV0Q2hhdC5nZXRDb252ZXJzYXRpb24oaWQsIHR5cGUpXG4gICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgLy8gdGhpcy5pdGVtQ2xpY2tlZChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aCwgdHlwZSk7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgLi4uY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGggfTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYSBjb252ZXJzYXRpb25cIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjYWxsIGlzIGFjY2VwdGVkIGFuZCBjb25uZWN0ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYWxsSW5pdGlhdGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY29taW5nQ2FsbCBSZWplY3RlZFxuICAgKi9cbiAgcmVqZWN0ZWRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIGxldCBpbmNvbWluZ0NhbGxNZXNzYWdlID0gY2FsbC5pbmNvbWluZ0NhbGw7XG4gICAgbGV0IHJlamVjdGVkQ2FsbE1lc3NhZ2UgPSBjYWxsLnJlamVjdGVkQ2FsbDtcbiAgICBsZXQgcmVjZWl2ZXJUeXBlID0gaW5jb21pbmdDYWxsTWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgbGV0IHJlY2VpdmVySWQgPVxuICAgICAgcmVjZWl2ZXJUeXBlID09PSBcInVzZXJcIlxuICAgICAgICA/IGluY29taW5nQ2FsbE1lc3NhZ2Uuc2VuZGVyLnVpZFxuICAgICAgICA6IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIC8vbWFya2luZyB0aGUgaW5jb21pbmcgY2FsbCBtZXNzYWdlIGFzIHJlYWRcbiAgICBpZiAoaW5jb21pbmdDYWxsTWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlYWRBdFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKGluY29taW5nQ2FsbE1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgfVxuXG4gICAgLy91cGRhdGluZyB1bnJlYWRjb3VudCBpbiBjaGF0cyBsaXN0XG4gICAgdGhpcy5tZXNzYWdlVG9NYXJrUmVhZCA9IGluY29taW5nQ2FsbE1lc3NhZ2U7XG5cbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgIHJlY2VpdmVyVHlwZSA9IHJlamVjdGVkQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIHJlY2VpdmVySWQgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICBpZiAoXG4gICAgICAodHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgIHJlY2VpdmVySWQgPT09IGl0ZW0uZ3VpZCkgfHxcbiAgICAgICh0eXBlID09PSBcInVzZXJcIiAmJiByZWNlaXZlclR5cGUgPT09IFwidXNlclwiICYmIHJlY2VpdmVySWQgPT09IGl0ZW0udWlkKVxuICAgICkge1xuICAgICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShyZWplY3RlZENhbGxNZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==