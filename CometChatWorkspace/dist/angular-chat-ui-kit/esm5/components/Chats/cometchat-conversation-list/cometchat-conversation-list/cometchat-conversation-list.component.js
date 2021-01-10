/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/cometchat-conversation-list/cometchat-conversation-list/cometchat-conversation-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { INCOMING_OTHER_MESSAGE_SOUND } from "../../../resources/audio/incomingOtherMessageSound";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatConversationListComponent = /** @class */ (function () {
    function CometchatConversationListComponent(ref) {
        var _this = this;
        this.ref = ref;
        this.item = null;
        this.type = null;
        this.onUserClick = new EventEmitter();
        this.groupToUpdate = null;
        this.groupToLeave = null;
        this.groupToDelete = null;
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.loggedInUser = null;
        this.conversationList = [];
        this.onItemClick = null;
        this.selectedConversation = undefined;
        this.checkItemChange = false;
        this.conversationRequest = null;
        this.conversationListenerId = "chatlist_" + new Date().getTime();
        this.userListenerId = "chatlist_user_" + new Date().getTime();
        this.groupListenerId = "chatlist_group_" + new Date().getTime();
        this.callListenerId = "chatlist_call_" + new Date().getTime();
        this.CHATS = STRING_MESSAGES.CHATS;
        this.conversationUpdated = (/**
         * @param {?=} key
         * @param {?=} item
         * @param {?=} message
         * @param {?=} options
         * @return {?}
         */
        function (key, item, message, options) {
            if (key === void 0) { key = null; }
            if (item === void 0) { item = null; }
            if (message === void 0) { message = null; }
            if (options === void 0) { options = null; }
            switch (key) {
                case enums.USER_ONLINE:
                case enums.USER_OFFLINE: {
                    _this.updateUser(item);
                    break;
                }
                case enums.TEXT_MESSAGE_RECEIVED:
                case enums.MEDIA_MESSAGE_RECEIVED:
                case enums.CUSTOM_MESSAGE_RECEIVED:
                    _this.updateConversation(message);
                    break;
                case enums.MESSAGE_EDITED:
                case enums.MESSAGE_DELETED:
                    _this.conversationEditedDeleted(message);
                    break;
            }
        });
        setInterval((/**
         * @return {?}
         */
        function () {
            if (!_this.ref["destroyed"]) {
                _this.ref.detectChanges();
            }
        }), 1500);
    }
    /**
     * @return {?}
     */
    CometchatConversationListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
    };
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatConversationListComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        var _this = this;
        if (change["item"]) {
            this.checkItemChange = true;
            if (change["item"].previousValue !== change["item"].currentValue &&
                change["item"].currentValue) {
                if (Object.keys(change["item"].currentValue).length === 0) {
                    // this.chatListRef.scrollTop = 0;
                    this.selectedConversation = {};
                }
                else {
                    /** @type {?} */
                    var conversationlist = tslib_1.__spread(this.conversationList);
                    /** @type {?} */
                    var conversationObj = conversationlist.find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        if ((c.conversationType === _this.type &&
                            _this.type === "user" &&
                            c.conversationWith.uid === _this.item.uid) ||
                            (c.conversationType === _this.type &&
                                _this.type === "group" &&
                                c.conversationWith.guid === _this.item.guid)) {
                            return c;
                        }
                        return false;
                    }));
                    if (conversationObj) {
                        /** @type {?} */
                        var conversationKey = conversationlist.indexOf(conversationObj);
                        /** @type {?} */
                        var newConversationObj = tslib_1.__assign({}, conversationObj, { unreadMessageCount: 0 });
                        conversationlist.splice(conversationKey, 1, newConversationObj);
                        this.conversationList = conversationlist;
                        this.selectedConversation = newConversationObj;
                    }
                }
                // if user is blocked/unblocked, update conversationlist i.e user is removed from conversationList
                if (change["item"].previousValue &&
                    Object.keys(change["item"].previousValue).length &&
                    change["item"].previousValue.uid ===
                        change["item"].currentValue.uid &&
                    change["item"].previousValue.blockedByMe !==
                        change["item"].currentValue.blockedByMe) {
                    /** @type {?} */
                    var conversationlist = tslib_1.__spread(this.conversationList);
                    //search for user
                    /** @type {?} */
                    var convKey = conversationlist.findIndex((/**
                     * @param {?} c
                     * @param {?} k
                     * @return {?}
                     */
                    function (c, k) {
                        return c.conversationType === "user" &&
                            c.conversationWith.uid === change["item"].currentValue.uid;
                    }));
                    if (convKey > -1) {
                        conversationlist.splice(convKey, 1);
                        this.conversationList = conversationlist;
                    }
                }
            }
        }
        if (change["groupToUpdate"]) {
            /** @type {?} */
            var prevProps = { groupToUpdate: null };
            /** @type {?} */
            var props = { groupToUpdate: null };
            prevProps["groupToUpdate"] = change["groupToUpdate"].previousValue;
            props["groupToUpdate"] = change["groupToUpdate"].currentValue;
            if (prevProps.groupToUpdate &&
                (prevProps.groupToUpdate.guid !== props.groupToUpdate.guid ||
                    (prevProps.groupToUpdate.guid === props.groupToUpdate.guid &&
                        (prevProps.groupToUpdate.membersCount !==
                            props.groupToUpdate.membersCount ||
                            prevProps.groupToUpdate.scope !== props.groupToUpdate.scope)))) {
                /** @type {?} */
                var conversationList = tslib_1.__spread(this.conversationList);
                /** @type {?} */
                var groupToUpdate_1 = this.groupToUpdate;
                /** @type {?} */
                var groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) { return group.conversationWith.guid === groupToUpdate_1.guid; }));
                if (groupKey > -1) {
                    /** @type {?} */
                    var groupObj = conversationList[groupKey];
                    /** @type {?} */
                    var newGroupObj = Object.assign({}, groupObj, groupToUpdate_1, {
                        scope: groupToUpdate_1["scope"],
                        membersCount: groupToUpdate_1["membersCount"],
                    });
                    conversationList.splice(groupKey, 1, newGroupObj);
                    this.conversationList = conversationList;
                }
            }
        }
        if (change["groupToLeave"]) {
            /** @type {?} */
            var prevProps = { groupToLeave: null };
            /** @type {?} */
            var props_1 = { groupToLeave: null };
            prevProps["groupToLeave"] = change["groupToLeave"].previousValue;
            props_1["groupToLeave"] = change["groupToLeave"].currentValue;
            if (prevProps.groupToLeave &&
                prevProps.groupToLeave.guid !== props_1.groupToLeave.guid) {
                /** @type {?} */
                var conversationList = tslib_1.__spread(this.conversationList);
                /** @type {?} */
                var groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) { return group.conversationWith.guid === props_1.groupToLeave.guid; }));
                if (groupKey > -1) {
                    /** @type {?} */
                    var groupToLeave = props_1.groupToLeave;
                    /** @type {?} */
                    var groupObj = tslib_1.__assign({}, conversationList[groupKey]);
                    /** @type {?} */
                    var membersCount = parseInt(groupToLeave["membersCount"]) - 1;
                    /** @type {?} */
                    var newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        hasJoined: false,
                    });
                    conversationList.splice(groupKey, 1, newgroupObj);
                    this.conversationList = conversationList;
                }
            }
        }
        if (change["groupToDelete"]) {
            /** @type {?} */
            var prevProps = { groupToDelete: null };
            /** @type {?} */
            var props_2 = { groupToDelete: null };
            prevProps["groupToDelete"] = change["groupToDelete"].previousValue;
            props_2["groupToDelete"] = change["groupToDelete"].currentValue;
            if (prevProps.groupToDelete &&
                prevProps.groupToDelete.guid !== props_2.groupToDelete.guid) {
                /** @type {?} */
                var conversationList = tslib_1.__spread(this.conversationList);
                /** @type {?} */
                var groupKey = conversationList.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) { return group.conversationWith.guid === props_2.groupToDelete.guid; }));
                if (groupKey > -1) {
                    conversationList.splice(groupKey, 1);
                    this.conversationList = conversationList;
                    if (conversationList.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_CHATS_FOUND;
                    }
                }
            }
        }
        /**
         * When user sends message conversationList is updated with latest message
         */
        if (this.checkItemChange === false) {
            if (change["lastMessage"]) {
                if (change["lastMessage"].previousValue !==
                    change["lastMessage"].currentValue) {
                    /** @type {?} */
                    var lastMessage_1 = change["lastMessage"].currentValue[0];
                    /** @type {?} */
                    var conversationList = tslib_1.__spread(this.conversationList);
                    /** @type {?} */
                    var conversationKey = conversationList.findIndex((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        return c.conversationId == lastMessage_1.conversationId;
                    }));
                    if (conversationKey > -1) {
                        /** @type {?} */
                        var conversationObj = conversationList[conversationKey];
                        /** @type {?} */
                        var newConversationObj = tslib_1.__assign({}, conversationObj, { lastMessage: lastMessage_1 });
                        conversationList.splice(conversationKey, 1);
                        conversationList.unshift(newConversationObj);
                        this.conversationList = conversationList;
                    }
                }
            }
        }
        this.checkItemChange = false;
    };
    /**
     * @return {?}
     */
    CometchatConversationListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.conversationRequest = new CometChat.ConversationsRequestBuilder()
            .setLimit(30)
            .build();
        this.getConversation();
        this.attachListeners(this.conversationUpdated);
    };
    /**
     * @return {?}
     */
    CometchatConversationListComponent.prototype.fetchNextConversation = /**
     * @return {?}
     */
    function () {
        return this.conversationRequest.fetchNext();
    };
    /**
     * Listeners for respective functionality
     * @param callback
     */
    /**
     * Listeners for respective functionality
     * @param {?} callback
     * @return {?}
     */
    CometchatConversationListComponent.prototype.attachListeners = /**
     * Listeners for respective functionality
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
            onUserOnline: (/**
             * @param {?} onlineUser
             * @return {?}
             */
            function (onlineUser) {
                /* when someuser/friend comes online, user will be received here */
                callback(enums.USER_ONLINE, onlineUser);
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            function (offlineUser) {
                /* when someuser/friend went offline, user will be received here */
                callback(enums.USER_OFFLINE, offlineUser);
            }),
        }));
        CometChat.addGroupListener(this.groupListenerId, new CometChat.GroupListener({
            onGroupMemberScopeChanged: (/**
             * @param {?} message
             * @param {?} changedUser
             * @param {?} newScope
             * @param {?} oldScope
             * @param {?} changedGroup
             * @return {?}
             */
            function (message, changedUser, newScope, oldScope, changedGroup) {
                callback(enums.GROUP_MEMBER_SCOPE_CHANGED, changedGroup, message, {
                    user: changedUser,
                    scope: newScope,
                });
            }),
            onGroupMemberKicked: (/**
             * @param {?} message
             * @param {?} kickedUser
             * @param {?} kickedBy
             * @param {?} kickedFrom
             * @return {?}
             */
            function (message, kickedUser, kickedBy, kickedFrom) {
                callback(enums.GROUP_MEMBER_KICKED, kickedFrom, message, {
                    user: kickedUser,
                    hasJoined: false,
                });
            }),
            onGroupMemberBanned: (/**
             * @param {?} message
             * @param {?} bannedUser
             * @param {?} bannedBy
             * @param {?} bannedFrom
             * @return {?}
             */
            function (message, bannedUser, bannedBy, bannedFrom) {
                callback(enums.GROUP_MEMBER_BANNED, bannedFrom, message, {
                    user: bannedUser,
                });
            }),
            onGroupMemberUnbanned: (/**
             * @param {?} message
             * @param {?} unbannedUser
             * @param {?} unbannedBy
             * @param {?} unbannedFrom
             * @return {?}
             */
            function (message, unbannedUser, unbannedBy, unbannedFrom) {
                callback(enums.GROUP_MEMBER_UNBANNED, unbannedFrom, message, {
                    user: unbannedUser,
                });
            }),
            onMemberAddedToGroup: (/**
             * @param {?} message
             * @param {?} userAdded
             * @param {?} userAddedBy
             * @param {?} userAddedIn
             * @return {?}
             */
            function (message, userAdded, userAddedBy, userAddedIn) {
                callback(enums.GROUP_MEMBER_ADDED, userAddedIn, message, {
                    user: userAdded,
                    hasJoined: true,
                });
            }),
            onGroupMemberLeft: (/**
             * @param {?} message
             * @param {?} leavingUser
             * @param {?} group
             * @return {?}
             */
            function (message, leavingUser, group) {
                callback(enums.GROUP_MEMBER_LEFT, group, message, {
                    user: leavingUser,
                });
            }),
            onGroupMemberJoined: (/**
             * @param {?} message
             * @param {?} joinedUser
             * @param {?} joinedGroup
             * @return {?}
             */
            function (message, joinedUser, joinedGroup) {
                callback(enums.GROUP_MEMBER_JOINED, joinedGroup, message, {
                    user: joinedUser,
                });
            }),
        }));
        CometChat.addMessageListener(this.conversationListenerId, new CometChat.MessageListener({
            onTextMessageReceived: (/**
             * @param {?} textMessage
             * @return {?}
             */
            function (textMessage) {
                callback(enums.TEXT_MESSAGE_RECEIVED, null, textMessage);
            }),
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            function (mediaMessage) {
                callback(enums.MEDIA_MESSAGE_RECEIVED, null, mediaMessage);
            }),
            onCustomMessageReceived: (/**
             * @param {?} customMessage
             * @return {?}
             */
            function (customMessage) {
                callback(enums.CUSTOM_MESSAGE_RECEIVED, null, customMessage);
            }),
            onMessageDeleted: (/**
             * @param {?} deletedMessage
             * @return {?}
             */
            function (deletedMessage) {
                callback(enums.MESSAGE_DELETED, null, deletedMessage);
            }),
            onMessageEdited: (/**
             * @param {?} editedMessage
             * @return {?}
             */
            function (editedMessage) {
                callback(enums.MESSAGE_EDITED, null, editedMessage);
            }),
        }));
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onIncomingCallReceived: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                callback(enums.INCOMING_CALL_RECEIVED, null, call);
            }),
            onIncomingCallCancelled: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                callback(enums.INCOMING_CALL_CANCELLED, null, call);
            }),
        }));
    };
    /**
     * Listeners Removed
     */
    /**
     * Listeners Removed
     * @return {?}
     */
    CometchatConversationListComponent.prototype.removeListeners = /**
     * Listeners Removed
     * @return {?}
     */
    function () {
        CometChat.removeMessageListener(this.conversationListenerId);
        CometChat.removeUserListener(this.userListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
        CometChat.removeCallListener(this.callListenerId);
    };
    /**
     * Fetches Conversations Details with all the users
     */
    /**
     * Fetches Conversations Details with all the users
     * @return {?}
     */
    CometchatConversationListComponent.prototype.getConversation = /**
     * Fetches Conversations Details with all the users
     * @return {?}
     */
    function () {
        var _this = this;
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
            _this.fetchNextConversation()
                .then((/**
             * @param {?} conversationList
             * @return {?}
             */
            function (conversationList) {
                conversationList.forEach((/**
                 * @param {?} conversation
                 * @return {?}
                 */
                function (conversation) {
                    if (conversation.conversationType === "user" &&
                        !conversation.conversationWith.avatar) {
                        conversation.conversationWith.avatar = _this.setAvatar(conversation);
                    }
                    else if (conversation.conversationType === "group" &&
                        !conversation.conversationWith.icon) {
                        conversation.conversationWith.icon = _this.setAvatar(conversation);
                    }
                    if (_this.type !== null &&
                        _this.item !== null &&
                        _this.type === conversation.conversationType) {
                        if ((conversation.conversationType === "user" &&
                            _this.item.uid === conversation.conversationWith.uid) ||
                            (conversation.conversationType === "group" &&
                                _this.item.guid === conversation.conversationWith.guid)) {
                            conversation.unreadMessageCount = 0;
                        }
                    }
                }));
                _this.conversationList = tslib_1.__spread(_this.conversationList, conversationList);
                if (_this.conversationList.length === 0) {
                    _this.decoratorMessage = STRING_MESSAGES.NO_CHATS_FOUND;
                }
                else {
                    _this.decoratorMessage = "";
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.decoratorMessage = STRING_MESSAGES.ERROR;
                console.error("[CometChatConversationList] getConversations fetchNext error", error);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.decoratorMessage = STRING_MESSAGES.ERROR;
            console.log("[CometChatConversationList] getConversations getLoggedInUser error", error);
        }));
    };
    /**
     * Sets User Avatar If Avatar is not present
     * @param
     */
    /**
     * Sets User Avatar If Avatar is not present
     * @param {?} conversation
     * @return {?}
     */
    CometchatConversationListComponent.prototype.setAvatar = /**
     * Sets User Avatar If Avatar is not present
     * @param {?} conversation
     * @return {?}
     */
    function (conversation) {
        if (conversation.conversationType === "user" &&
            !conversation.conversationWith.avatar) {
            /** @type {?} */
            var uid = conversation.conversationWith.uid;
            /** @type {?} */
            var char = conversation.conversationWith.name.charAt(0).toUpperCase();
        }
        else if (conversation.conversationType === "group" &&
            !conversation.conversationWith.icon) {
            /** @type {?} */
            var guid = conversation.conversationWith.guid;
            /** @type {?} */
            var char = conversation.conversationWith.name.charAt(0).toUpperCase();
        }
    };
    /**
     * Updates Detail when user comes online/offline
     * @param
     */
    /**
     * Updates Detail when user comes online/offline
     * @param {?} user
     * @return {?}
     */
    CometchatConversationListComponent.prototype.updateUser = /**
     * Updates Detail when user comes online/offline
     * @param {?} user
     * @return {?}
     */
    function (user) {
        //when user updates
        /** @type {?} */
        var conversationlist = tslib_1.__spread(this.conversationList);
        //Gets the index of user which comes offline/online
        /** @type {?} */
        var conversationKey = conversationlist.findIndex((/**
         * @param {?} conversationObj
         * @return {?}
         */
        function (conversationObj) {
            return conversationObj.conversationType === "user" &&
                conversationObj.conversationWith.uid === user.uid;
        }));
        if (conversationKey > -1) {
            /** @type {?} */
            var conversationObj = tslib_1.__assign({}, conversationlist[conversationKey]);
            /** @type {?} */
            var conversationWithObj = tslib_1.__assign({}, conversationObj.conversationWith, { status: user.getStatus() });
            /** @type {?} */
            var newConversationObj = tslib_1.__assign({}, conversationObj, { conversationWith: conversationWithObj });
            conversationlist.splice(conversationKey, 1, newConversationObj);
            this.conversationList = conversationlist;
        }
    };
    /**
     *
     * Gets the last message
     * @param conversation
     */
    /**
     *
     * Gets the last message
     * @param {?} message
     * @param {?=} conversation
     * @return {?}
     */
    CometchatConversationListComponent.prototype.makeLastMessage = /**
     *
     * Gets the last message
     * @param {?} message
     * @param {?=} conversation
     * @return {?}
     */
    function (message, conversation) {
        if (conversation === void 0) { conversation = {}; }
        /** @type {?} */
        var newMessage = Object.assign({}, message);
        return newMessage;
    };
    /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param
     *
     */
    /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param {?} message
     * @param {?=} notification
     * @return {?}
     */
    CometchatConversationListComponent.prototype.updateConversation = /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param {?} message
     * @param {?=} notification
     * @return {?}
     */
    function (message, notification) {
        var _this = this;
        if (notification === void 0) { notification = true; }
        this.makeConversation(message)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var conversationKey = response.conversationKey;
            /** @type {?} */
            var conversationObj = response.conversationObj;
            /** @type {?} */
            var conversationList = response.conversationList;
            if (conversationKey > -1) {
                /** @type {?} */
                var unreadMessageCount = _this.makeUnreadMessageCount(conversationObj);
                /** @type {?} */
                var lastMessageObj = _this.makeLastMessage(message, conversationObj);
                /** @type {?} */
                var newConversationObj = tslib_1.__assign({}, conversationObj, { lastMessage: lastMessageObj, unreadMessageCount: unreadMessageCount });
                conversationList.splice(conversationKey, 1);
                conversationList.unshift(newConversationObj);
                _this.conversationList = conversationList;
                if (notification) {
                    _this.playAudio();
                }
            }
            else {
                /** @type {?} */
                var unreadMessageCount = _this.makeUnreadMessageCount();
                /** @type {?} */
                var lastMessageObj = _this.makeLastMessage(message);
                /** @type {?} */
                var newConversationObj = tslib_1.__assign({}, conversationObj, { lastMessage: lastMessageObj, unreadMessageCount: unreadMessageCount });
                conversationList.unshift(newConversationObj);
                _this.conversationList = conversationList;
                if (notification) {
                    _this.playAudio();
                }
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("This is an error in converting message to conversation", error);
        }));
    };
    /**
     *
     * Gets The Count of Unread Messages
     * @param
     */
    /**
     *
     * Gets The Count of Unread Messages
     * @param {?=} conversation
     * @param {?=} operator
     * @return {?}
     */
    CometchatConversationListComponent.prototype.makeUnreadMessageCount = /**
     *
     * Gets The Count of Unread Messages
     * @param {?=} conversation
     * @param {?=} operator
     * @return {?}
     */
    function (conversation, operator) {
        if (conversation === void 0) { conversation = {}; }
        if (operator === void 0) { operator = null; }
        if (Object.keys(conversation).length === 0) {
            return 1;
        }
        /** @type {?} */
        var unreadMessageCount = parseInt(conversation.unreadMessageCount);
        if (this.selectedConversation &&
            this.selectedConversation.conversationId === conversation.conversationId) {
            unreadMessageCount = 0;
        }
        else if ((this.item &&
            this.item.hasOwnProperty("guid") &&
            conversation.conversationWith.hasOwnProperty("guid") &&
            this.item.guid === conversation.conversationWith.guid) ||
            (this.item &&
                this.item.hasOwnProperty("uid") &&
                conversation.conversationWith.hasOwnProperty("uid") &&
                this.item.uid === conversation.conversationWith.uid)) {
            unreadMessageCount = 0;
        }
        else {
            if (operator && operator === "decrement") {
                unreadMessageCount = unreadMessageCount ? unreadMessageCount - 1 : 0;
            }
            else {
                unreadMessageCount = unreadMessageCount + 1;
            }
        }
        return unreadMessageCount;
    };
    /**
     * Changes detail of conversations
     * @param
     */
    /**
     * Changes detail of conversations
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListComponent.prototype.makeConversation = /**
     * Changes detail of conversations
     * @param {?} message
     * @return {?}
     */
    function (message) {
        var _this = this;
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            CometChat.CometChatHelper.getConversationFromMessage(message)
                .then((/**
             * @param {?} conversation
             * @return {?}
             */
            function (conversation) {
                /** @type {?} */
                var conversationList = tslib_1.__spread(_this.conversationList);
                /** @type {?} */
                var conversationKey = conversationList.findIndex((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.conversationId === conversation.conversationId; }));
                /** @type {?} */
                var conversationObj = tslib_1.__assign({}, conversation);
                if (conversationKey > -1) {
                    conversationObj = tslib_1.__assign({}, conversationList[conversationKey]);
                }
                resolve({
                    conversationKey: conversationKey,
                    conversationObj: conversationObj,
                    conversationList: conversationList,
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Updates Conversation View when message is edited or deleted
     */
    /**
     * Updates Conversation View when message is edited or deleted
     * @param {?} message
     * @return {?}
     */
    CometchatConversationListComponent.prototype.conversationEditedDeleted = /**
     * Updates Conversation View when message is edited or deleted
     * @param {?} message
     * @return {?}
     */
    function (message) {
        var _this = this;
        this.makeConversation(message)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var conversationKey = response.conversationKey;
            /** @type {?} */
            var conversationObj = response.conversationObj;
            /** @type {?} */
            var conversationList = response.conversationList;
            if (conversationKey > -1) {
                /** @type {?} */
                var lastMessageObj = conversationObj.lastMessage;
                if (lastMessageObj.id === message.id) {
                    /** @type {?} */
                    var newLastMessageObj = Object.assign({}, lastMessageObj, message);
                    /** @type {?} */
                    var newConversationObj = Object.assign({}, conversationObj, {
                        lastMessage: newLastMessageObj,
                    });
                    conversationList.splice(conversationKey, 1, newConversationObj);
                    _this.conversationList = conversationList;
                }
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("This is an error in converting message to conversation", error);
        }));
    };
    /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param Event e
     */
    /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param {?} e
     * @return {?}
     */
    CometchatConversationListComponent.prototype.handleScroll = /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom) {
            this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
            this.getConversation();
        }
    };
    /**
     * Emits User on User Click
     * @param user
     */
    /**
     * Emits User on User Click
     * @param {?} user
     * @return {?}
     */
    CometchatConversationListComponent.prototype.userClicked = /**
     * Emits User on User Click
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.onUserClick.emit(user);
    };
    /**
     * Plays Audio When Message is Received
     */
    /**
     * Plays Audio When Message is Received
     * @return {?}
     */
    CometchatConversationListComponent.prototype.playAudio = /**
     * Plays Audio When Message is Received
     * @return {?}
     */
    function () {
        /** @type {?} */
        var audio = new Audio();
        audio.src = INCOMING_OTHER_MESSAGE_SOUND;
        audio.play();
    };
    CometchatConversationListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-conversation-list",
                    template: "<div class=\"chatWrapperStyle\">\n  <div class=\"chatsHeaderStyle\">\n    <!--Close Btn-->\n    <h4 class=\"chatsHeaderTitleStyle\">{{ CHATS }}</h4>\n    <div></div>\n  </div>\n  <!--Message Container-->\n  <div class=\"chatsMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n    <p class=\"chatsMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <div class=\"chatsListStyle\" (scroll)=\"handleScroll($event)\">\n    <!--Conversation List-->\n    <div *ngFor=\"let conversation of conversationList\">\n      <cometchat-conversation-list-item\n        [ConversationDetails]=\"conversation\"\n        [loggedInUser]=\"loggedInUser\"\n        (onUserClick)=\"userClicked($event)\"\n      >\n      </cometchat-conversation-list-item>\n    </div>\n  </div>\n</div>\n",
                    styles: [".chatWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.chatWrapperStyle *{box-sizing:border-box}.chatWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.chatWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.chatWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.chatWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.chatsHeaderStyle{padding:19px 16px;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.chatsHeaderTitleStyle{margin:0;display:inline-block;width:66%;text-align:left;font-size:20px}.chatsMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.chatsMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.chatsListStyle{height:calc(100% - 65px);width:100%;overflow-y:auto;margin:0;padding:0}"]
                }] }
    ];
    /** @nocollapse */
    CometchatConversationListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    CometchatConversationListComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        lastMessage: [{ type: Input }],
        onUserClick: [{ type: Output }],
        groupToUpdate: [{ type: Input }],
        groupToLeave: [{ type: Input }],
        groupToDelete: [{ type: Input }]
    };
    return CometchatConversationListComponent;
}());
export { CometchatConversationListComponent };
if (false) {
    /** @type {?} */
    CometchatConversationListComponent.prototype.item;
    /** @type {?} */
    CometchatConversationListComponent.prototype.type;
    /** @type {?} */
    CometchatConversationListComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatConversationListComponent.prototype.onUserClick;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatConversationListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatConversationListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationList;
    /** @type {?} */
    CometchatConversationListComponent.prototype.onItemClick;
    /** @type {?} */
    CometchatConversationListComponent.prototype.selectedConversation;
    /** @type {?} */
    CometchatConversationListComponent.prototype.ConversationListManager;
    /** @type {?} */
    CometchatConversationListComponent.prototype.checkItemChange;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationRequest;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.callListenerId;
    /** @type {?} */
    CometchatConversationListComponent.prototype.CHATS;
    /** @type {?} */
    CometchatConversationListComponent.prototype.conversationUpdated;
    /**
     * @type {?}
     * @private
     */
    CometchatConversationListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NoYXRzL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUErQkUsNENBQW9CLEdBQXNCO1FBQTFDLGlCQU1DO1FBTm1CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBekJqQyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFOUIscUJBQWdCLEdBQVcsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQzVELGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxH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QUFLO2dDQUNMLEtBQUs7O0lBdXJCUix5Q0FBQztDQUFBLEFBbnNCRCxJQW1zQkM7U0E5ckJZLGtDQUFrQzs7O0lBQzdDLGtEQUFxQjs7SUFDckIsa0RBQXFCOztJQUNyQix5REFBcUI7O0lBQ3JCLHlEQUE4RDs7SUFDOUQsMkRBQThCOztJQUM5QiwwREFBNkI7O0lBQzdCLDJEQUE4Qjs7SUFFOUIsOERBQTREOztJQUM1RCwwREFBb0I7O0lBQ3BCLDhEQUFzQjs7SUFDdEIseURBQW1COztJQUNuQixrRUFBaUM7O0lBQ2pDLHFFQUF3Qjs7SUFDeEIsNkRBQWlDOztJQUVqQyxpRUFBMkI7O0lBRTNCLG9FQUE0RDs7SUFDNUQsNERBQXlEOztJQUN6RCw2REFBMkQ7O0lBQzNELDREQUF5RDs7SUFFekQsbURBQXNDOztJQTZhdEMsaUVBc0JFOzs7OztJQWpjVSxpREFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBJTkNPTUlOR19PVEhFUl9NRVNTQUdFX1NPVU5EIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9pbmNvbWluZ090aGVyTWVzc2FnZVNvdW5kXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Q29udmVyc2F0aW9uTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBsYXN0TWVzc2FnZTtcbiAgQE91dHB1dCgpIG9uVXNlckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgZ3JvdXBUb1VwZGF0ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9MZWF2ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9EZWxldGUgPSBudWxsO1xuXG4gIGRlY29yYXRvck1lc3NhZ2U6IHN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5MT0FESU5HX01FU1NTQUdFO1xuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBjb252ZXJzYXRpb25MaXN0ID0gW107XG4gIG9uSXRlbUNsaWNrID0gbnVsbDtcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb24gPSB1bmRlZmluZWQ7XG4gIENvbnZlcnNhdGlvbkxpc3RNYW5hZ2VyO1xuICBjaGVja0l0ZW1DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb252ZXJzYXRpb25SZXF1ZXN0ID0gbnVsbDtcblxuICBjb252ZXJzYXRpb25MaXN0ZW5lcklkID0gXCJjaGF0bGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB1c2VyTGlzdGVuZXJJZCA9IFwiY2hhdGxpc3RfdXNlcl9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBncm91cExpc3RlbmVySWQgPSBcImNoYXRsaXN0X2dyb3VwX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNhbGxMaXN0ZW5lcklkID0gXCJjaGF0bGlzdF9jYWxsX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgQ0hBVFM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5DSEFUUztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucmVmW1wiZGVzdHJveWVkXCJdKSB7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9LCAxNTAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiaXRlbVwiXSkge1xuICAgICAgdGhpcy5jaGVja0l0ZW1DaGFuZ2UgPSB0cnVlO1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlICYmXG4gICAgICAgIGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlXG4gICAgICApIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAvLyB0aGlzLmNoYXRMaXN0UmVmLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbiA9IHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbk9iaiA9IGNvbnZlcnNhdGlvbmxpc3QuZmluZCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoYy5jb252ZXJzYXRpb25UeXBlID09PSB0aGlzLnR5cGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgICAgYy5jb252ZXJzYXRpb25XaXRoLnVpZCA9PT0gdGhpcy5pdGVtLnVpZCkgfHxcbiAgICAgICAgICAgICAgKGMuY29udmVyc2F0aW9uVHlwZSA9PT0gdGhpcy50eXBlICYmXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbk9iaikge1xuICAgICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbmxpc3QuaW5kZXhPZihjb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICB1bnJlYWRNZXNzYWdlQ291bnQ6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29udmVyc2F0aW9ubGlzdC5zcGxpY2UoY29udmVyc2F0aW9uS2V5LCAxLCBuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9ubGlzdDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24gPSBuZXdDb252ZXJzYXRpb25PYmo7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdXNlciBpcyBibG9ja2VkL3VuYmxvY2tlZCwgdXBkYXRlIGNvbnZlcnNhdGlvbmxpc3QgaS5lIHVzZXIgaXMgcmVtb3ZlZCBmcm9tIGNvbnZlcnNhdGlvbkxpc3RcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZSAmJlxuICAgICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZSkubGVuZ3RoICYmXG4gICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlLnVpZCA9PT1cbiAgICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlLnVpZCAmJlxuICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZS5ibG9ja2VkQnlNZSAhPT1cbiAgICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlLmJsb2NrZWRCeU1lXG4gICAgICAgICkge1xuICAgICAgICAgIGxldCBjb252ZXJzYXRpb25saXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG5cbiAgICAgICAgICAvL3NlYXJjaCBmb3IgdXNlclxuICAgICAgICAgIGxldCBjb252S2V5ID0gY29udmVyc2F0aW9ubGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgICAoYywgaykgPT5cbiAgICAgICAgICAgICAgYy5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSBjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZS51aWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChjb252S2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbmxpc3Quc3BsaWNlKGNvbnZLZXksIDEpO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9ubGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZSAmJlxuICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkIHx8XG4gICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgPT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAmJlxuICAgICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLm1lbWJlcnNDb3VudCAhPT1cbiAgICAgICAgICAgICAgcHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgfHxcbiAgICAgICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUpKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gWy4uLnRoaXMuY29udmVyc2F0aW9uTGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwVG9VcGRhdGUgPSB0aGlzLmdyb3VwVG9VcGRhdGU7XG5cbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gZ3JvdXBUb1VwZGF0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSBjb252ZXJzYXRpb25MaXN0W2dyb3VwS2V5XTtcbiAgICAgICAgICBjb25zdCBuZXdHcm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cFRvVXBkYXRlLCB7XG4gICAgICAgICAgICBzY29wZTogZ3JvdXBUb1VwZGF0ZVtcInNjb3BlXCJdLFxuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBncm91cFRvVXBkYXRlW1wibWVtYmVyc0NvdW50XCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvTGVhdmVcIl0gPSBjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUgJiZcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkICE9PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwVG9MZWF2ZSA9IHByb3BzLmdyb3VwVG9MZWF2ZTtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IHsgLi4uY29udmVyc2F0aW9uTGlzdFtncm91cEtleV0gfTtcbiAgICAgICAgICBjb25zdCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cFRvTGVhdmVbXCJtZW1iZXJzQ291bnRcIl0pIC0gMTtcblxuICAgICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShncm91cEtleSwgMSk7XG5cbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fQ0hBVFNfRk9VTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB1c2VyIHNlbmRzIG1lc3NhZ2UgY29udmVyc2F0aW9uTGlzdCBpcyB1cGRhdGVkIHdpdGggbGF0ZXN0IG1lc3NhZ2VcbiAgICAgKi9cbiAgICBpZiAodGhpcy5jaGVja0l0ZW1DaGFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtcImxhc3RNZXNzYWdlXCJdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgICAgY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gY2hhbmdlW1wibGFzdE1lc3NhZ2VcIl0uY3VycmVudFZhbHVlWzBdO1xuXG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KChjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYy5jb252ZXJzYXRpb25JZCA9PSBsYXN0TWVzc2FnZS5jb252ZXJzYXRpb25JZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gY29udmVyc2F0aW9uTGlzdFtjb252ZXJzYXRpb25LZXldO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbGFzdE1lc3NhZ2UsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEpO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrSXRlbUNoYW5nZSA9IGZhbHNlO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29udmVyc2F0aW9uUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuQ29udmVyc2F0aW9uc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgIC5idWlsZCgpO1xuICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnModGhpcy5jb252ZXJzYXRpb25VcGRhdGVkKTtcbiAgfVxuXG4gIGZldGNoTmV4dENvbnZlcnNhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb252ZXJzYXRpb25SZXF1ZXN0LmZldGNoTmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVycyBmb3IgcmVzcGVjdGl2ZSBmdW5jdGlvbmFsaXR5XG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKGNhbGxiYWNrKSB7XG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuVVNFUl9PTkxJTkUsIG9ubGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuVVNFUl9PRkZMSU5FLCBvZmZsaW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBjaGFuZ2VkR3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBraWNrZWRGcm9tLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBraWNrZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgYmFubmVkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVELCB1bmJhbm5lZEZyb20sIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVzZXJBZGRlZCxcbiAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIHVzZXJBZGRlZEluLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJMZWZ0OiAobWVzc2FnZSwgbGVhdmluZ1VzZXIsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQsIGdyb3VwLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBsZWF2aW5nVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckpvaW5lZDogKG1lc3NhZ2UsIGpvaW5lZFVzZXIsIGpvaW5lZEdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCwgam9pbmVkR3JvdXAsIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGpvaW5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkTWVzc2FnZUxpc3RlbmVyKFxuICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5NZXNzYWdlTGlzdGVuZXIoe1xuICAgICAgICBvblRleHRNZXNzYWdlUmVjZWl2ZWQ6ICh0ZXh0TWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLlRFWFRfTUVTU0FHRV9SRUNFSVZFRCwgbnVsbCwgdGV4dE1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lZGlhTWVzc2FnZVJlY2VpdmVkOiAobWVkaWFNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRCwgbnVsbCwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DdXN0b21NZXNzYWdlUmVjZWl2ZWQ6IChjdXN0b21NZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIGN1c3RvbU1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VEZWxldGVkOiAoZGVsZXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRVNTQUdFX0RFTEVURUQsIG51bGwsIGRlbGV0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRWRpdGVkOiAoZWRpdGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLk1FU1NBR0VfRURJVEVELCBudWxsLCBlZGl0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5DYWxsTGlzdGVuZXIoe1xuICAgICAgICBvbkluY29taW5nQ2FsbFJlY2VpdmVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQsIG51bGwsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRCwgbnVsbCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXJzIFJlbW92ZWRcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMuY29udmVyc2F0aW9uTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIENvbnZlcnNhdGlvbnMgRGV0YWlscyB3aXRoIGFsbCB0aGUgdXNlcnNcbiAgICovXG4gIGdldENvbnZlcnNhdGlvbigpIHtcbiAgICBuZXcgQ29tZXRDaGF0TWFuYWdlcigpXG4gICAgICAuZ2V0TG9nZ2VkSW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRDb252ZXJzYXRpb24oKVxuICAgICAgICAgIC50aGVuKChjb252ZXJzYXRpb25MaXN0KSA9PiB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LmZvckVhY2goKGNvbnZlcnNhdGlvbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmF2YXRhclxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5hdmF0YXIgPSB0aGlzLnNldEF2YXRhcihcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgICAgICAgICFjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5pY29uXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmljb24gPSB0aGlzLnNldEF2YXRhcihcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAoY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbS51aWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLnVpZCkgfHxcbiAgICAgICAgICAgICAgICAgIChjb252ZXJzYXRpb24uY29udmVyc2F0aW9uVHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLnVucmVhZE1lc3NhZ2VDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IFtcbiAgICAgICAgICAgICAgLi4udGhpcy5jb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnZlcnNhdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19DSEFUU19GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIltDb21ldENoYXRDb252ZXJzYXRpb25MaXN0XSBnZXRDb252ZXJzYXRpb25zIGZldGNoTmV4dCBlcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5FUlJPUjtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0Q29udmVyc2F0aW9uTGlzdF0gZ2V0Q29udmVyc2F0aW9ucyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBVc2VyIEF2YXRhciBJZiBBdmF0YXIgaXMgbm90IHByZXNlbnRcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRBdmF0YXIoY29udmVyc2F0aW9uKSB7XG4gICAgaWYgKFxuICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAhY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguYXZhdGFyXG4gICAgKSB7XG4gICAgICBjb25zdCB1aWQgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC51aWQ7XG4gICAgICBjb25zdCBjaGFyID0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmljb25cbiAgICApIHtcbiAgICAgIGNvbnN0IGd1aWQgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkO1xuICAgICAgY29uc3QgY2hhciA9IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgY29udmVyc2F0aW9uVXBkYXRlZCA9IChcbiAgICBrZXkgPSBudWxsLFxuICAgIGl0ZW0gPSBudWxsLFxuICAgIG1lc3NhZ2UgPSBudWxsLFxuICAgIG9wdGlvbnMgPSBudWxsXG4gICkgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT05MSU5FOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX09GRkxJTkU6IHtcbiAgICAgICAgdGhpcy51cGRhdGVVc2VyKGl0ZW0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVEVYVF9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgY2FzZSBlbnVtcy5DVVNUT01fTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgdGhpcy51cGRhdGVDb252ZXJzYXRpb24obWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0VESVRFRDpcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEVEOlxuICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkVkaXRlZERlbGV0ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBEZXRhaWwgd2hlbiB1c2VyIGNvbWVzIG9ubGluZS9vZmZsaW5lXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlVXNlcih1c2VyKSB7XG4gICAgLy93aGVuIHVzZXIgdXBkYXRlc1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgIC8vR2V0cyB0aGUgaW5kZXggb2YgdXNlciB3aGljaCBjb21lcyBvZmZsaW5lL29ubGluZVxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IGNvbnZlcnNhdGlvbmxpc3QuZmluZEluZGV4KFxuICAgICAgKGNvbnZlcnNhdGlvbk9iaikgPT5cbiAgICAgICAgY29udmVyc2F0aW9uT2JqLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbk9iai5jb252ZXJzYXRpb25XaXRoLnVpZCA9PT0gdXNlci51aWRcbiAgICApO1xuICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgbGV0IGNvbnZlcnNhdGlvbk9iaiA9IHsgLi4uY29udmVyc2F0aW9ubGlzdFtjb252ZXJzYXRpb25LZXldIH07XG4gICAgICBsZXQgY29udmVyc2F0aW9uV2l0aE9iaiA9IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLmNvbnZlcnNhdGlvbldpdGgsXG4gICAgICAgIHN0YXR1czogdXNlci5nZXRTdGF0dXMoKSxcbiAgICAgIH07XG5cbiAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgY29udmVyc2F0aW9uV2l0aDogY29udmVyc2F0aW9uV2l0aE9iaixcbiAgICAgIH07XG4gICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG5cbiAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbmxpc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEdldHMgdGhlIGxhc3QgbWVzc2FnZVxuICAgKiBAcGFyYW0gY29udmVyc2F0aW9uXG4gICAqL1xuICBtYWtlTGFzdE1lc3NhZ2UobWVzc2FnZSwgY29udmVyc2F0aW9uID0ge30pIHtcbiAgICBjb25zdCBuZXdNZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZSk7XG4gICAgcmV0dXJuIG5ld01lc3NhZ2U7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXBkYXRlcyBDb252ZXJzYXRpb25zIGFzIFRleHQvQ3VzdG9tIE1lc3NhZ2VzIGFyZSByZWNlaXZlZFxuICAgKiBAcGFyYW1cbiAgICpcbiAgICovXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbihtZXNzYWdlLCBub3RpZmljYXRpb24gPSB0cnVlKSB7XG4gICAgdGhpcy5tYWtlQ29udmVyc2F0aW9uKG1lc3NhZ2UpXG4gICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25LZXkgPSByZXNwb25zZS5jb252ZXJzYXRpb25LZXk7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbk9iaiA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbk9iajtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbkxpc3Q7XG5cbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IHVucmVhZE1lc3NhZ2VDb3VudCA9IHRoaXMubWFrZVVucmVhZE1lc3NhZ2VDb3VudChjb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IHRoaXMubWFrZUxhc3RNZXNzYWdlKG1lc3NhZ2UsIGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudDogdW5yZWFkTWVzc2FnZUNvdW50LFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEpO1xuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3QudW5zaGlmdChuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG5cbiAgICAgICAgICBpZiAobm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gdGhpcy5tYWtlVW5yZWFkTWVzc2FnZUNvdW50KCk7XG4gICAgICAgICAgbGV0IGxhc3RNZXNzYWdlT2JqID0gdGhpcy5tYWtlTGFzdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudDogdW5yZWFkTWVzc2FnZUNvdW50LFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgIGlmIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIlRoaXMgaXMgYW4gZXJyb3IgaW4gY29udmVydGluZyBtZXNzYWdlIHRvIGNvbnZlcnNhdGlvblwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBHZXRzIFRoZSBDb3VudCBvZiBVbnJlYWQgTWVzc2FnZXNcbiAgICogQHBhcmFtXG4gICAqL1xuICBtYWtlVW5yZWFkTWVzc2FnZUNvdW50KGNvbnZlcnNhdGlvbjogYW55ID0ge30sIG9wZXJhdG9yID0gbnVsbCkge1xuICAgIGlmIChPYmplY3Qua2V5cyhjb252ZXJzYXRpb24pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgbGV0IHVucmVhZE1lc3NhZ2VDb3VudCA9IHBhcnNlSW50KGNvbnZlcnNhdGlvbi51bnJlYWRNZXNzYWdlQ291bnQpO1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24gJiZcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb252ZXJzYXRpb24uY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZFxuICAgICkge1xuICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHRoaXMuaXRlbSAmJlxuICAgICAgICB0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJndWlkXCIpICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmhhc093blByb3BlcnR5KFwiZ3VpZFwiKSAmJlxuICAgICAgICB0aGlzLml0ZW0uZ3VpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguZ3VpZCkgfHxcbiAgICAgICh0aGlzLml0ZW0gJiZcbiAgICAgICAgdGhpcy5pdGVtLmhhc093blByb3BlcnR5KFwidWlkXCIpICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmhhc093blByb3BlcnR5KFwidWlkXCIpICYmXG4gICAgICAgIHRoaXMuaXRlbS51aWQgPT09IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLnVpZClcbiAgICApIHtcbiAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciA9PT0gXCJkZWNyZW1lbnRcIikge1xuICAgICAgICB1bnJlYWRNZXNzYWdlQ291bnQgPSB1bnJlYWRNZXNzYWdlQ291bnQgPyB1bnJlYWRNZXNzYWdlQ291bnQgLSAxIDogMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IHVucmVhZE1lc3NhZ2VDb3VudCArIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVucmVhZE1lc3NhZ2VDb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIGRldGFpbCBvZiBjb252ZXJzYXRpb25zXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWFrZUNvbnZlcnNhdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENvbWV0Q2hhdC5Db21ldENoYXRIZWxwZXIuZ2V0Q29udmVyc2F0aW9uRnJvbU1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgLnRoZW4oKGNvbnZlcnNhdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgICBsZXQgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9uTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgICAoYykgPT4gYy5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxldCBjb252ZXJzYXRpb25PYmogPSB7IC4uLmNvbnZlcnNhdGlvbiB9O1xuICAgICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgICAgY29udmVyc2F0aW9uT2JqID0geyAuLi5jb252ZXJzYXRpb25MaXN0W2NvbnZlcnNhdGlvbktleV0gfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbktleTogY29udmVyc2F0aW9uS2V5LFxuICAgICAgICAgICAgY29udmVyc2F0aW9uT2JqOiBjb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0OiBjb252ZXJzYXRpb25MaXN0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIENvbnZlcnNhdGlvbiBWaWV3IHdoZW4gbWVzc2FnZSBpcyBlZGl0ZWQgb3IgZGVsZXRlZFxuICAgKi9cbiAgY29udmVyc2F0aW9uRWRpdGVkRGVsZXRlZChtZXNzYWdlKSB7XG4gICAgdGhpcy5tYWtlQ29udmVyc2F0aW9uKG1lc3NhZ2UpXG4gICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25LZXkgPSByZXNwb25zZS5jb252ZXJzYXRpb25LZXk7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbk9iaiA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbk9iajtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgIGlmIChjb252ZXJzYXRpb25LZXkgPiAtMSkge1xuICAgICAgICAgIGxldCBsYXN0TWVzc2FnZU9iaiA9IGNvbnZlcnNhdGlvbk9iai5sYXN0TWVzc2FnZTtcblxuICAgICAgICAgIGlmIChsYXN0TWVzc2FnZU9iai5pZCA9PT0gbWVzc2FnZS5pZCkge1xuICAgICAgICAgICAgY29uc3QgbmV3TGFzdE1lc3NhZ2VPYmogPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgbGFzdE1lc3NhZ2VPYmosXG4gICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgY29udmVyc2F0aW9uT2JqLCB7XG4gICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBuZXdMYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoY29udmVyc2F0aW9uS2V5LCAxLCBuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiVGhpcyBpcyBhbiBlcnJvciBpbiBjb252ZXJ0aW5nIG1lc3NhZ2UgdG8gY29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIFVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tIG9mIHRoZSBjdXJyZW50IENvbnZlcnNhdGlvbiBsaXN0IHRoYW4gZmV0Y2ggbmV4dCBpdGVtcyBvZiB0aGUgQ29udmVyc2F0aW9uIGxpc3QgYW5kIGFwcGVuZFxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChib3R0b20pIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5MT0FESU5HX01FU1NTQUdFO1xuICAgICAgdGhpcy5nZXRDb252ZXJzYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgVXNlciBvbiBVc2VyIENsaWNrXG4gICAqIEBwYXJhbSB1c2VyXG4gICAqL1xuXG4gIHVzZXJDbGlja2VkKHVzZXIpIHtcbiAgICB0aGlzLm9uVXNlckNsaWNrLmVtaXQodXNlcik7XG4gIH1cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIFdoZW4gTWVzc2FnZSBpcyBSZWNlaXZlZFxuICAgKi9cbiAgcGxheUF1ZGlvKCkge1xuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgIGF1ZGlvLnNyYyA9IElOQ09NSU5HX09USEVSX01FU1NBR0VfU09VTkQ7XG4gICAgYXVkaW8ucGxheSgpO1xuICB9XG59XG4iXX0=