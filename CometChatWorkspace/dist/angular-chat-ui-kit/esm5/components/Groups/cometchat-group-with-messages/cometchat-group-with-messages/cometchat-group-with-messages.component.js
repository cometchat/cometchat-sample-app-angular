/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-with-messages/cometchat-group-with-messages/cometchat-group-with-messages.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostListener } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { trigger, state, style, transition, animate, } from "@angular/animations";
var CometchatGroupWithMessagesComponent = /** @class */ (function () {
    function CometchatGroupWithMessagesComponent() {
        var _this = this;
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
    CometchatGroupWithMessagesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.onResize();
        CometChat.getLoggedinUser().then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
        }));
    };
    /**
     * Listen to the group emitted by the groupList component
     * @param Event user
     */
    /**
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    CometchatGroupWithMessagesComponent.prototype.groupClicked = /**
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    function (group) {
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
    };
    /**
     * Checks when window size is changed in realtime
     */
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    CometchatGroupWithMessagesComponent.prototype.onResize = /**
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
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatGroupWithMessagesComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var message = action.payLoad;
        /** @type {?} */
        var data = action.payLoad;
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
            case enums.MENU_CLICKED: {
                this.checkAnimatedState = "normal";
                this.item = null;
                break;
            }
        }
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
    CometchatGroupWithMessagesComponent.prototype.viewMessageThread = /**
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
    /**
     * Close the thread window
     * @param Any parentMessage
     */
    /**
     * Close the thread window
     * @return {?}
     */
    CometchatGroupWithMessagesComponent.prototype.closeThreadMessages = /**
     * Close the thread window
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
    CometchatGroupWithMessagesComponent.prototype.toggleImageView = /**
     * Opens the clicked Image in full screen mode
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.imageView = message;
        this.fullScreenViewImage = !this.fullScreenViewImage;
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
    CometchatGroupWithMessagesComponent.prototype.memberUnbanned = /**
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
    CometchatGroupWithMessagesComponent.prototype.audioCall = /**
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
    CometchatGroupWithMessagesComponent.prototype.appendCallMessage = /**
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
    CometchatGroupWithMessagesComponent.prototype.outgoingCallEnded = /**
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
    CometchatGroupWithMessagesComponent.prototype.acceptIncomingCall = /**
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
    CometchatGroupWithMessagesComponent.prototype.callInitiated = /**
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
    CometchatGroupWithMessagesComponent.prototype.rejectedIncomingCall = /**
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
    CometchatGroupWithMessagesComponent.ctorParameters = function () { return []; };
    CometchatGroupWithMessagesComponent.propDecorators = {
        onResize: [{ type: HostListener, args: ["window:resize", [],] }]
    };
    return CometchatGroupWithMessagesComponent;
}());
export { CometchatGroupWithMessagesComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCO0lBNERFO1FBQUEsaUJBQWdCOztRQW5DaEIsU0FBSSxHQUFHLElBQUksQ0FBQzs7UUFHWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7O1FBRWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7O1FBR2pCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixpQkFBWSxHQUFH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WTs7SUFFWiwyREFBb0I7O0lBRXBCLGdFQUFtQzs7SUFDbkMsa0VBQTJCOztJQUMzQixnRUFBeUI7O0lBQ3pCLGdFQUF1Qjs7SUFDdkIsb0VBQTZCOztJQUM3QiwrREFBa0M7O0lBRWxDLHdEQUFpQjs7SUFHakIsa0VBQXFDOztJQUVyQyw0REFBbUI7O0lBQ25CLDJEQUFrQjs7SUFDbEIsNERBQW1COztJQUNuQiwyREFBa0I7O0lBR2xCLDJEQUFvQjs7SUFDcEIsMkRBQW9COztJQUNwQiwwREFBaUI7O0lBQ2pCLGdFQUFrQjs7SUFFbEIsOERBQWlDOztJQUNqQyxpRUFBbUI7O0lBQ25CLDhEQUFpQzs7SUFDakMseURBQVc7Ozs7OztJQWdOWCwrREFHRTs7Ozs7O0lBTUYsaUVBZ0JFOzs7Ozs7SUFNRiwyREFlRTs7Ozs7O0lBTUYsaUVBS0U7Ozs7OztJQU1GLDJEQTBCRTs7SUEwQkYseURBSUU7Ozs7OztJQU1GLDBEQUlFOzs7OztJQTRCRix3REFtQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWdyb3VwLXdpdGgtbWVzc2FnZXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC13aXRoLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIGxlZnQ6IFwiMCVcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgbGVmdDogXCItMTAwJVwiLFxuICAgICAgICAgIHpJbmRleDogXCIwXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbDw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoMzAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEdyb3VwV2l0aE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy9JdCBjYW4gYmUgYSB1c2VyIG9yIGEgZ3JvdXBcbiAgaXRlbSA9IG51bGw7XG5cbiAgLy8gRGVmaW5lcyB0aGUgdHlwZXMgb2YgaXRlbSB0aGF0IHdhcyBjbGlja2VkIC0tPiB0aGF0IGlzIC4uIGlmIGl0cyBhIHVzZXIgb3IgYSBncm91cFxuICB0eXBlID0gbnVsbDtcblxuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuXG4gIHRocmVhZE1lc3NhZ2VWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHRocmVhZE1lc3NhZ2VQYXJlbnQgPSBudWxsO1xuICB0aHJlYWRNZXNzYWdlSXRlbSA9IG51bGw7XG4gIHRocmVhZE1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgY29tcG9zZWR0aHJlYWRtZXNzYWdlID0gbnVsbDtcbiAgdmlld0RldGFpbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUbyBkaXNwbGF5IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGltYWdlVmlldyA9IG51bGw7XG5cbiAgLy9JZiBjbGlja2VkIHRoZW4gb25seSBzaG93IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gIGZ1bGxTY3JlZW5WaWV3SW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBncm91cFRvVXBkYXRlID0ge307XG4gIGdyb3VwVG9MZWF2ZSA9IHt9O1xuICBncm91cFRvRGVsZXRlID0ge307XG4gIGdyb3VwTWVzc2FnZSA9IFtdO1xuXG4gIC8vZm9yIGF1ZGlvIGNhbGxpbmdcbiAgb3V0Z29pbmdDYWxsID0gbnVsbDtcbiAgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgY2FsbE1lc3NhZ2UgPSB7fTtcbiAgbWVzc2FnZVRvTWFya1JlYWQ7XG5cbiAgY2FsbEluaXRpYWxpc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZTtcbiAgY2hlY2tJZkFuaW1hdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyV2lkdGg7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBncm91cCBlbWl0dGVkIGJ5IHRoZSBncm91cExpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICBpZiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG4gICAgfVxuICAgIHRoaXMuaXRlbSA9IGdyb3VwO1xuXG4gICAgLy9DbG9zZSBUaHJlYWQgQW5kIFVzZXIgRGV0YWlsIFNjcmVlbiBXaGVuIENoYXQgV2luZG93IElzIENoYW5nZWRcbiAgICB0aGlzLmNsb3NlVGhyZWFkTWVzc2FnZXMoKTtcbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikpIHtcbiAgICAgIHRoaXMudHlwZSA9IFwidXNlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZBbmltYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgICAgIHRoaXMuY2hlY2tJZkFuaW1hdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBudWxsO1xuICAgICAgdGhpcy5jaGVja0lmQW5pbWF0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLlZJRVdfTUVTU0FHRV9USFJFQUQ6IHtcbiAgICAgICAgdGhpcy52aWV3TWVzc2FnZVRocmVhZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX1RIUkVBRF9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2xvc2VUaHJlYWRNZXNzYWdlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklFV19BQ1RVQUxfSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcoYWN0aW9uLnBheUxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0U6IHtcbiAgICAgICAgdGhpcy50b2dnbGVJbWFnZVZpZXcobnVsbCk7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlZJRVdfREVUQUlMOlxuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRDoge1xuICAgICAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNIQU5HRV9USFJFQURfUEFSRU5UX01FU1NBR0VfUkVQTFlfQ09VTlQ6IHtcbiAgICAgICAgLy8gdGhpcy50b2dnbGVEZXRhaWxWaWV3KCk7XG5cbiAgICAgICAgdGhpcy5jb21wb3NlZHRocmVhZG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4udGhpcy50aHJlYWRNZXNzYWdlUGFyZW50LFxuICAgICAgICAgIHJlcGx5Q291bnQ6IGFjdGlvbi5wYXlMb2FkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyU2NvcGVDaGFuZ2VkKGFjdGlvbi5wYXlMb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUlNfQURERUQ6IHtcbiAgICAgICAgdGhpcy5tZW1iZXJzQWRkZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJTX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJzQ291bnQoZGF0YS5pdGVtLCBkYXRhLmNvdW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX1VQREFURUQ6XG4gICAgICAgIHRoaXMuZ3JvdXBVcGRhdGVkKGRhdGEubWVzc2FnZSwgZGF0YS5rZXksIGRhdGEuZ3JvdXAsIGRhdGEub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVU5CQU5ORUQ6XG4gICAgICAgIHRoaXMubWVtYmVyVW5iYW5uZWQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5MRUZUX0dST1VQOiB7XG4gICAgICAgIHRoaXMubGVhdmVHcm91cChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkRFTEVURV9HUk9VUDoge1xuICAgICAgICB0aGlzLmRlbGV0ZUdyb3VwKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQVVESU9fQ0FMTDoge1xuICAgICAgICB0aGlzLmF1ZGlvQ2FsbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVklERU9fQ0FMTDpcbiAgICAgICAgdGhpcy52aWRlb0NhbGwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOlxuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSOlxuICAgICAgY2FzZSBlbnVtcy5DQUxMX0VOREVEOiB7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsRW5kZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0pPSU5FRF9DQUxMOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX0xFRlRfQ0FMTDoge1xuICAgICAgICAvL3RoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UoaXRlbSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5BQ0NFUFRfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLmFjY2VwdEluY29taW5nQ2FsbChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEw6IHtcbiAgICAgICAgdGhpcy5jYWxsSW5pdGlhdGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTDoge1xuICAgICAgICB0aGlzLnJlamVjdGVkSW5jb21pbmdDYWxsKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0FMTF9FUlJPUjoge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlVzZXIgTGlzdCBzY3JlZW4gLS0+IGNhbGwgY291bGRuJ3QgY29tcGxldGUgZHVlIHRvIGVycm9yXCIsXG4gICAgICAgICAgYWN0aW9uLnBheUxvYWRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuTUVOVV9DTElDS0VEOiB7XG4gICAgICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQWxsIHRoZSBJbnRpYWwgQ29uZGl0aW9ucyBmb3IgdGhlIHRocmVhZGVkIFZpZXcgb2YgTWVzc2FnZXMgYW5kIE9wZW5zIHRocmVhZCBWaWV3XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgdmlld01lc3NhZ2VUaHJlYWQocGFyZW50TWVzc2FnZSkge1xuICAgIC8vT3BlbiBUaHJlYWQgU2NyZWVuXG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IHRydWU7XG5cbiAgICAvL2Nsb3NlIHVzZXIgKCB0aGUgcGVyc29uIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBzY3JlZW5cbiAgICB0aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIHRoaXMudGhyZWFkTWVzc2FnZVBhcmVudCA9IHBhcmVudE1lc3NhZ2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlSXRlbSA9IHRoaXMuaXRlbTtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gdGhpcy50eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSB0aHJlYWQgd2luZG93XG4gICAqIEBwYXJhbSBBbnkgcGFyZW50TWVzc2FnZVxuICAgKi9cbiAgY2xvc2VUaHJlYWRNZXNzYWdlcygpIHtcbiAgICAvL2Nsb3NlIFRocmVhZCBTY3JlZW5cbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VJdGVtID0gbnVsbDtcbiAgICB0aGlzLnRocmVhZE1lc3NhZ2VUeXBlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgY2xpY2tlZCBJbWFnZSBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgdG9nZ2xlSW1hZ2VWaWV3KG1lc3NhZ2UpIHtcbiAgICB0aGlzLmltYWdlVmlldyA9IG1lc3NhZ2U7XG4gICAgdGhpcy5mdWxsU2NyZWVuVmlld0ltYWdlID0gIXRoaXMuZnVsbFNjcmVlblZpZXdJbWFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBVc2VyIERldGFpbCBSaWdodCBTaWRlIGJhclxuICAgKiBAcGFyYW0gQW55IG1lc3NhZ2VcbiAgICovXG4gIHRvZ2dsZURldGFpbFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy50aHJlYWRNZXNzYWdlVmlldyA9IGZhbHNlO1xuICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9ICF0aGlzLnZpZXdEZXRhaWxTY3JlZW47XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIG1lc3NhZ2UgbGlzdCB3aXRoIGEgbWVzc2FnZSBub3RpZnlpbmcgdGhhdCAsIHNjb3BlIGEgc29tZSB1c2VyIGlzIGNoYW5nZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICBtZW1iZXJTY29wZUNoYW5nZWQgPSAobWVtYmVycykgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG5cbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBtYWRlICR7ZWFjaE1lbWJlci5uYW1lfSAke2VhY2hNZW1iZXIuc2NvcGV9YDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlT2JqID0ge1xuICAgICAgICBjYXRlZ29yeTogXCJhY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgdHlwZTogZW51bXMuQUNUSU9OX1RZUEVfR1JPVVBNRU1CRVIsXG4gICAgICAgIHNlbnRBdDogc2VudEF0LFxuICAgICAgfTtcbiAgICAgIG1lc3NhZ2VMaXN0LnB1c2gobWVzc2FnZU9iaik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdyb3VwTWVzc2FnZSA9IG1lc3NhZ2VMaXN0O1xuICB9O1xuXG4gIC8qKlxuICAgKiB1cGRhdGVzIHRoZSBtZXNzYWdlTGlzdCB3aXRoIG1lc3NhZ2VzIGFib3V0IHRoZSBtZW1iZXJzIHRoYXQgd2VyZSBhZGRlZFxuICAgKiBAcGFyYW0gQW55IG1lbWJlcnNcbiAgICovXG4gIG1lbWJlcnNBZGRlZCA9IChtZW1iZXJzKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbXTtcbiAgICBtZW1iZXJzLmZvckVhY2goKGVhY2hNZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLmxvZ2dlZEluVXNlci5uYW1lfSBhZGRlZCAke2VhY2hNZW1iZXIubmFtZX1gO1xuICAgICAgY29uc3Qgc2VudEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VPYmogPSB7XG4gICAgICAgIGNhdGVnb3J5OiBcImFjdGlvblwiLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiBlbnVtcy5BQ1RJT05fVFlQRV9HUk9VUE1FTUJFUixcbiAgICAgICAgc2VudEF0OiBzZW50QXQsXG4gICAgICB9O1xuICAgICAgbWVzc2FnZUxpc3QucHVzaChtZXNzYWdlT2JqKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ3JvdXBNZXNzYWdlID0gbWVzc2FnZUxpc3Q7XG4gIH07XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgVGhlIGNvdW50IG9mICBudW1iZXIgb2YgbWVtYmVycyBwcmVzZW50IGluIGEgZ3JvdXAgYmFzZWQgb24gZ3JvdXAgYWN0aXZpdGllcyAsIGxpa2UgYWRkaW5nIGEgbWVtYmVyIG9yIGtpY2tpbmcgYSBtZW1iZXJcbiAgICogQHBhcmFtIEFueSBtZW1iZXJzXG4gICAqL1xuICB1cGRhdGVNZW1iZXJzQ291bnQgPSAoaXRlbSwgY291bnQpID0+IHtcbiAgICBjb25zdCBncm91cCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaXRlbSwgeyBtZW1iZXJzQ291bnQ6IGNvdW50IH0pO1xuXG4gICAgdGhpcy5pdGVtID0gZ3JvdXA7XG4gICAgdGhpcy5ncm91cFRvVXBkYXRlID0gZ3JvdXA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ3VycmVudCBHcm91cCBJbmZvcm1hdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChtZXNzYWdlLCBrZXksIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDoge1xuICAgICAgICBpZiAob3B0aW9ucy51c2VyLnVpZCA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgICAgICAgdGhpcy52aWV3RGV0YWlsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOiB7XG4gICAgICAgIGlmIChvcHRpb25zLnVzZXIudWlkID09PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICBjb25zdCBuZXdPYmogPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW0sIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW1wic2NvcGVcIl0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLml0ZW0gPSBuZXdPYmo7XG4gICAgICAgICAgdGhpcy50eXBlID0gXCJncm91cFwiO1xuICAgICAgICAgIHRoaXMudmlld0RldGFpbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAgVW5iYW5zIHRoZSB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVtYmVyVW5iYW5uZWQobWVtYmVycykge1xuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gW107XG4gICAgbWVtYmVycy5mb3JFYWNoKChlYWNoTWVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5sb2dnZWRJblVzZXIubmFtZX0gdW5iYW5uZWQgJHtlYWNoTWVtYmVyLm5hbWV9YDtcbiAgICAgIGNvbnN0IGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBzZW50QXQ6IGFueSA9IChkYXRlIC8gMTAwMCkgfCAwO1xuICAgICAgY29uc3QgbWVzc2FnZU9iaiA9IHtcbiAgICAgICAgY2F0ZWdvcnk6IFwiYWN0aW9uXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6IGVudW1zLkFDVElPTl9UWVBFX0dST1VQTUVNQkVSLFxuICAgICAgICBzZW50QXQ6IHNlbnRBdCxcbiAgICAgIH07XG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG1lc3NhZ2VPYmopO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ncm91cE1lc3NhZ2UgPSBtZXNzYWdlTGlzdDtcbiAgfVxuICAvKiBDbG9zZXMgZ3JvdXAgc2NyZWVuIGFuZCBhbGwgLCBhZnRlciB1c2VyIGhhcyBsZWZ0IHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9MZWF2ZSA9IGdyb3VwO1xuICAgIHRoaXMudG9nZ2xlRGV0YWlsVmlldygpO1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBncm91cCBzY3JlZW4gYW5kIGFsbCAsIGFmdGVyIHVzZXIgaGFzIGRlbGV0ZWQgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZGVsZXRlR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICB0aGlzLmdyb3VwVG9EZWxldGUgPSBncm91cDtcbiAgICB0aGlzLnRvZ2dsZURldGFpbFZpZXcoKTtcbiAgICB0aGlzLml0ZW0gPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gYXVkaW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICBhdWRpb0NhbGwoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuQVVESU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IGNhbGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGwgaW5pdGlhbGl6YXRpb24gZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0aWF0ZXMgYW4gdmlkZW8gY2FsbCB3aXRoIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoXG4gICAqL1xuICB2aWRlb0NhbGwgPSAoKSA9PiB7XG4gICAgbGV0IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICByZWNlaXZlclR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIENvbWV0Q2hhdE1hbmFnZXIuY2FsbChyZWNlaXZlcklkLCByZWNlaXZlclR5cGUsIENvbWV0Q2hhdC5DQUxMX1RZUEUuVklERU8pXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZENhbGxNZXNzYWdlKGNhbGwpO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsID0gY2FsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsbCBpbml0aWFsaXphdGlvbiBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFwcGVuZENhbGxNZXNzYWdlKGNhbGwpIHtcbiAgICB0aGlzLmNhbGxNZXNzYWdlID0gY2FsbDtcbiAgfVxuXG4gIG91dGdvaW5nQ2FsbEVuZGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm91dGdvaW5nQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogQUNDUEVUUyBJTkNPTUlORyBDQUxMXG4gICAqL1xuICBhY2NlcHRJbmNvbWluZ0NhbGwoY2FsbCkge1xuICAgIHRoaXMuaW5jb21pbmdDYWxsID0gY2FsbDtcblxuICAgIGNvbnN0IHR5cGUgPSBjYWxsLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwidXNlclwiID8gY2FsbC5zZW5kZXIudWlkIDogY2FsbC5yZWNlaXZlcklkO1xuXG4gICAgQ29tZXRDaGF0LmdldENvbnZlcnNhdGlvbihpZCwgdHlwZSlcbiAgICAgIC50aGVuKChjb252ZXJzYXRpb246IGFueSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLmNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoIH07XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGEgY29udmVyc2F0aW9uXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2FsbCBpcyBhY2NlcHRlZCBhbmQgY29ubmVjdGVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2FsbEluaXRpYXRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5hcHBlbmRDYWxsTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNvbWluZ0NhbGwgUmVqZWN0ZWRcbiAgICovXG4gIHJlamVjdGVkSW5jb21pbmdDYWxsKGNhbGwpIHtcbiAgICBsZXQgaW5jb21pbmdDYWxsTWVzc2FnZSA9IGNhbGwuaW5jb21pbmdDYWxsO1xuICAgIGxldCByZWplY3RlZENhbGxNZXNzYWdlID0gY2FsbC5yZWplY3RlZENhbGw7XG4gICAgbGV0IHJlY2VpdmVyVHlwZSA9IGluY29taW5nQ2FsbE1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIGxldCByZWNlaXZlcklkID1cbiAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICAgICAgPyBpbmNvbWluZ0NhbGxNZXNzYWdlLnNlbmRlci51aWRcbiAgICAgICAgOiBpbmNvbWluZ0NhbGxNZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICAvL21hcmtpbmcgdGhlIGluY29taW5nIGNhbGwgbWVzc2FnZSBhcyByZWFkXG4gICAgaWYgKGluY29taW5nQ2FsbE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyZWFkQXRcIikgPT09IGZhbHNlKSB7XG4gICAgICBDb21ldENoYXQubWFya0FzUmVhZChpbmNvbWluZ0NhbGxNZXNzYWdlLmlkLCByZWNlaXZlcklkLCByZWNlaXZlclR5cGUpO1xuICAgIH1cblxuICAgIC8vdXBkYXRpbmcgdW5yZWFkY291bnQgaW4gY2hhdHMgbGlzdFxuICAgIHRoaXMubWVzc2FnZVRvTWFya1JlYWQgPSBpbmNvbWluZ0NhbGxNZXNzYWdlO1xuXG4gICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgbGV0IHR5cGUgPSB0aGlzLnR5cGU7XG5cbiAgICByZWNlaXZlclR5cGUgPSByZWplY3RlZENhbGxNZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICByZWNlaXZlcklkID0gcmVqZWN0ZWRDYWxsTWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgaWYgKFxuICAgICAgKHR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICByZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICByZWNlaXZlcklkID09PSBpdGVtLmd1aWQpIHx8XG4gICAgICAodHlwZSA9PT0gXCJ1c2VyXCIgJiYgcmVjZWl2ZXJUeXBlID09PSBcInVzZXJcIiAmJiByZWNlaXZlcklkID09PSBpdGVtLnVpZClcbiAgICApIHtcbiAgICAgIHRoaXMuYXBwZW5kQ2FsbE1lc3NhZ2UocmVqZWN0ZWRDYWxsTWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=