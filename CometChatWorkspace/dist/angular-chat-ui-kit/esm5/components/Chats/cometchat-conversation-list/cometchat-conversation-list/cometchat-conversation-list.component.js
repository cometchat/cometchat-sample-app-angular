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
        // this.audio = new Audio(incomingOtherMessageAlert);
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
                // case enums.INCOMING_CALL_RECEIVED:
                // case enums.INCOMING_CALL_CANCELLED:
                //   this.updateConversation(message, false);
                //   break;
                // case enums.GROUP_MEMBER_ADDED:
                //   this.updateGroupMemberAdded(message, options);
                //   break;
                // case enums.GROUP_MEMBER_KICKED:
                // case enums.GROUP_MEMBER_BANNED:
                // case enums.GROUP_MEMBER_LEFT:
                //   this.updateGroupMemberRemoved(message, options);
                //   break;
                // case enums.GROUP_MEMBER_SCOPE_CHANGED:
                //   this.updateGroupMemberScopeChanged(message, options);
                //   break;
                // case enums.GROUP_MEMBER_JOINED:
                //   this.updateGroupMemberChanged(message, options, "increment");
                //   break;
                // case enums.GROUP_MEMBER_UNBANNED:
                //   this.updateGroupMemberChanged(message, options, "");
                //   break;
                // default:
                //   break;
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
                        // this.setState({ conversationlist: conversationlist });
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
            // return SvgAvatar.getAvatar(uid, char);
        }
        else if (conversation.conversationType === "group" &&
            !conversation.conversationWith.icon) {
            /** @type {?} */
            var guid = conversation.conversationWith.guid;
            /** @type {?} */
            var char = conversation.conversationWith.name.charAt(0).toUpperCase();
            // return SvgAvatar.getAvatar(guid, char)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0NoYXRzL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUFpQ0UsNENBQW9CLEdBQXNCO1FBQTFDLGlCQU1DO1FBTm1CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0JqQyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFOUIscUJBQWdCLEdBQVcsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQzVELGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxH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QUVILHdEQUFXOzs7OztJQUFYLFVBQVksSUFBSTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRDs7T0FFRzs7Ozs7SUFDSCxzREFBUzs7OztJQUFUOztZQUNNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtRQUN2QixLQUFLLENBQUMsR0FBRyxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUM7O2dCQW51QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLGt4QkFBMkQ7O2lCQUU1RDs7OztnQkFkQyxpQkFBaUI7Ozt1QkFnQmhCLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07Z0NBQ04sS0FBSzsrQkFDTCxLQUFLO2dDQUNMLEtBQUs7O0lBd3RCUix5Q0FBQztDQUFBLEFBcHVCRCxJQW91QkM7U0EvdEJZLGtDQUFrQzs7O0lBQzdDLGtEQUFxQjs7SUFDckIsa0RBQXFCOztJQUNyQix5REFBcUI7O0lBQ3JCLHlEQUE4RDs7SUFDOUQsMkRBQThCOztJQUM5QiwwREFBNkI7O0lBQzdCLDJEQUE4Qjs7SUFFOUIsOERBQTREOztJQUM1RCwwREFBb0I7O0lBQ3BCLDhEQUFzQjs7SUFDdEIseURBQW1COztJQUNuQixrRUFBaUM7O0lBQ2pDLHFFQUF3Qjs7SUFDeEIsNkRBQWlDOztJQUlqQyxpRUFBMkI7O0lBRTNCLG9FQUE0RDs7SUFDNUQsNERBQXlEOztJQUN6RCw2REFBMkQ7O0lBQzNELDREQUF5RDs7SUFFekQsbURBQXNDOztJQXFidEMsaUVBNkNFOzs7OztJQWhlVSxpREFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBJTkNPTUlOR19PVEhFUl9NRVNTQUdFX1NPVU5EIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9pbmNvbWluZ090aGVyTWVzc2FnZVNvdW5kXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Q29udmVyc2F0aW9uTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBsYXN0TWVzc2FnZTtcbiAgQE91dHB1dCgpIG9uVXNlckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgZ3JvdXBUb1VwZGF0ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9MZWF2ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9EZWxldGUgPSBudWxsO1xuXG4gIGRlY29yYXRvck1lc3NhZ2U6IHN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5MT0FESU5HX01FU1NTQUdFO1xuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBjb252ZXJzYXRpb25MaXN0ID0gW107XG4gIG9uSXRlbUNsaWNrID0gbnVsbDtcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb24gPSB1bmRlZmluZWQ7XG4gIENvbnZlcnNhdGlvbkxpc3RNYW5hZ2VyO1xuICBjaGVja0l0ZW1DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKGluY29taW5nT3RoZXJNZXNzYWdlQWxlcnQpO1xuXG4gIGNvbnZlcnNhdGlvblJlcXVlc3QgPSBudWxsO1xuXG4gIGNvbnZlcnNhdGlvbkxpc3RlbmVySWQgPSBcImNoYXRsaXN0X1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHVzZXJMaXN0ZW5lcklkID0gXCJjaGF0bGlzdF91c2VyX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IFwiY2hhdGxpc3RfZ3JvdXBfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY2FsbExpc3RlbmVySWQgPSBcImNoYXRsaXN0X2NhbGxfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBDSEFUUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNIQVRTO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDE1MDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdKSB7XG4gICAgICB0aGlzLmNoZWNrSXRlbUNoYW5nZSA9IHRydWU7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUgJiZcbiAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIHRoaXMuY2hhdExpc3RSZWYuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29udmVyc2F0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9ubGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuXG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gY29udmVyc2F0aW9ubGlzdC5maW5kKChjKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChjLmNvbnZlcnNhdGlvblR5cGUgPT09IHRoaXMudHlwZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSB0aGlzLml0ZW0udWlkKSB8fFxuICAgICAgICAgICAgICAoYy5jb252ZXJzYXRpb25UeXBlID09PSB0aGlzLnR5cGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uT2JqKSB7XG4gICAgICAgICAgICBsZXQgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9ubGlzdC5pbmRleE9mKGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25PYmosXG4gICAgICAgICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb252ZXJzYXRpb25saXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25saXN0O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbiA9IG5ld0NvbnZlcnNhdGlvbk9iajtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB1c2VyIGlzIGJsb2NrZWQvdW5ibG9ja2VkLCB1cGRhdGUgY29udmVyc2F0aW9ubGlzdCBpLmUgdXNlciBpcyByZW1vdmVkIGZyb20gY29udmVyc2F0aW9uTGlzdFxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMoY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlKS5sZW5ndGggJiZcbiAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUudWlkID09PVxuICAgICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUudWlkICYmXG4gICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlLmJsb2NrZWRCeU1lICE9PVxuICAgICAgICAgICAgY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUuYmxvY2tlZEJ5TWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbmxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcblxuICAgICAgICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgICAgICAgbGV0IGNvbnZLZXkgPSBjb252ZXJzYXRpb25saXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjLCBrKSA9PlxuICAgICAgICAgICAgICBjLmNvbnZlcnNhdGlvblR5cGUgPT09IFwidXNlclwiICYmXG4gICAgICAgICAgICAgIGMuY29udmVyc2F0aW9uV2l0aC51aWQgPT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlLnVpZFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGNvbnZLZXkgPiAtMSkge1xuICAgICAgICAgICAgY29udmVyc2F0aW9ubGlzdC5zcGxpY2UoY29udktleSwgMSk7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25saXN0O1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGNvbnZlcnNhdGlvbmxpc3Q6IGNvbnZlcnNhdGlvbmxpc3QgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9VcGRhdGVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9VcGRhdGU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUgJiZcbiAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCB8fFxuICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkID09PSBwcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgJiZcbiAgICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgIT09XG4gICAgICAgICAgICAgIHByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50IHx8XG4gICAgICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlICE9PSBwcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlKSkpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICBjb25zdCBncm91cFRvVXBkYXRlID0gdGhpcy5ncm91cFRvVXBkYXRlO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gY29udmVyc2F0aW9uTGlzdC5maW5kSW5kZXgoXG4gICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5jb252ZXJzYXRpb25XaXRoLmd1aWQgPT09IGdyb3VwVG9VcGRhdGUuZ3VpZFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gY29udmVyc2F0aW9uTGlzdFtncm91cEtleV07XG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXBUb1VwZGF0ZSwge1xuICAgICAgICAgICAgc2NvcGU6IGdyb3VwVG9VcGRhdGVbXCJzY29wZVwiXSxcbiAgICAgICAgICAgIG1lbWJlcnNDb3VudDogZ3JvdXBUb1VwZGF0ZVtcIm1lbWJlcnNDb3VudFwiXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdHcm91cE9iaik7XG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7Z3JvdXBsaXN0OiBncm91cHN9KTtcblxuICAgICAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdCA9IGNvbnZlcnNhdGlvbkxpc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvTGVhdmVcIl0gPSBjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUgJiZcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkICE9PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmNvbnZlcnNhdGlvbldpdGguZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwVG9MZWF2ZSA9IHByb3BzLmdyb3VwVG9MZWF2ZTtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IHsgLi4uY29udmVyc2F0aW9uTGlzdFtncm91cEtleV0gfTtcbiAgICAgICAgICBjb25zdCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cFRvTGVhdmVbXCJtZW1iZXJzQ291bnRcIl0pIC0gMTtcblxuICAgICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb0RlbGV0ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvRGVsZXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0RlbGV0ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvRGVsZXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0RlbGV0ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9EZWxldGUgJiZcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGNvbnZlcnNhdGlvbkxpc3QuZmluZEluZGV4KFxuICAgICAgICAgIChncm91cCkgPT4gZ3JvdXAuY29udmVyc2F0aW9uV2l0aC5ndWlkID09PSBwcm9wcy5ncm91cFRvRGVsZXRlLmd1aWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxKTtcbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtncm91cGxpc3Q6IGdyb3Vwc30pO1xuXG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgIGlmIChjb252ZXJzYXRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX0NIQVRTX0ZPVU5EO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdXNlciBzZW5kcyBtZXNzYWdlIGNvbnZlcnNhdGlvbkxpc3QgaXMgdXBkYXRlZCB3aXRoIGxhdGVzdCBtZXNzYWdlXG4gICAgICovXG4gICAgaWYgKHRoaXMuY2hlY2tJdGVtQ2hhbmdlID09PSBmYWxzZSkge1xuICAgICAgaWYgKGNoYW5nZVtcImxhc3RNZXNzYWdlXCJdKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjaGFuZ2VbXCJsYXN0TWVzc2FnZVwiXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICAgIGNoYW5nZVtcImxhc3RNZXNzYWdlXCJdLmN1cnJlbnRWYWx1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBsYXN0TWVzc2FnZSA9IGNoYW5nZVtcImxhc3RNZXNzYWdlXCJdLmN1cnJlbnRWYWx1ZVswXTtcblxuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkxpc3QgPSBbLi4udGhpcy5jb252ZXJzYXRpb25MaXN0XTtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleCgoYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGMuY29udmVyc2F0aW9uSWQgPT0gbGFzdE1lc3NhZ2UuY29udmVyc2F0aW9uSWQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbk9iaiA9IGNvbnZlcnNhdGlvbkxpc3RbY29udmVyc2F0aW9uS2V5XTtcbiAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSB7XG4gICAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGxhc3RNZXNzYWdlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5zcGxpY2UoY29udmVyc2F0aW9uS2V5LCAxKTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3QudW5zaGlmdChuZXdDb252ZXJzYXRpb25PYmopO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja0l0ZW1DaGFuZ2UgPSBmYWxzZTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnZlcnNhdGlvblJlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LkNvbnZlcnNhdGlvbnNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAuc2V0TGltaXQoMzApXG4gICAgICAuYnVpbGQoKTtcbiAgICB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKHRoaXMuY29udmVyc2F0aW9uVXBkYXRlZCk7XG4gIH1cblxuICBmZXRjaE5leHRDb252ZXJzYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udmVyc2F0aW9uUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lcnMgZm9yIHJlc3BlY3RpdmUgZnVuY3Rpb25hbGl0eVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGF0dGFjaExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRVc2VyTGlzdGVuZXIoXG4gICAgICB0aGlzLnVzZXJMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Vc2VyTGlzdGVuZXIoe1xuICAgICAgICBvblVzZXJPbmxpbmU6IChvbmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgY29tZXMgb25saW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLlVTRVJfT05MSU5FLCBvbmxpbmVVc2VyKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Vc2VyT2ZmbGluZTogKG9mZmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgd2VudCBvZmZsaW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLlVTRVJfT0ZGTElORSwgb2ZmbGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZEdyb3VwTGlzdGVuZXIoXG4gICAgICB0aGlzLmdyb3VwTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuR3JvdXBMaXN0ZW5lcih7XG4gICAgICAgIG9uR3JvdXBNZW1iZXJTY29wZUNoYW5nZWQ6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGNoYW5nZWRVc2VyLFxuICAgICAgICAgIG5ld1Njb3BlLFxuICAgICAgICAgIG9sZFNjb3BlLFxuICAgICAgICAgIGNoYW5nZWRHcm91cFxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfU0NPUEVfQ0hBTkdFRCwgY2hhbmdlZEdyb3VwLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBjaGFuZ2VkVXNlcixcbiAgICAgICAgICAgIHNjb3BlOiBuZXdTY29wZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlcktpY2tlZDogKG1lc3NhZ2UsIGtpY2tlZFVzZXIsIGtpY2tlZEJ5LCBraWNrZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRCwga2lja2VkRnJvbSwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjoga2lja2VkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQsIGJhbm5lZEZyb20sIG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHVzZXI6IGJhbm5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJVbmJhbm5lZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdW5iYW5uZWRVc2VyLFxuICAgICAgICAgIHVuYmFubmVkQnksXG4gICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRCwgdW5iYW5uZWRGcm9tLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgdXNlckFkZGVkSW5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCB1c2VyQWRkZWRJbiwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogdXNlckFkZGVkLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBncm91cCwgbWVzc2FnZSwge1xuICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIGpvaW5lZEdyb3VwLCBtZXNzYWdlLCB7XG4gICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZE1lc3NhZ2VMaXN0ZW5lcihcbiAgICAgIHRoaXMuY29udmVyc2F0aW9uTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuTWVzc2FnZUxpc3RlbmVyKHtcbiAgICAgICAgb25UZXh0TWVzc2FnZVJlY2VpdmVkOiAodGV4dE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5URVhUX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIHRleHRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZWRpYU1lc3NhZ2VSZWNlaXZlZDogKG1lZGlhTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQsIG51bGwsIG1lZGlhTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ3VzdG9tTWVzc2FnZVJlY2VpdmVkOiAoY3VzdG9tTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkNVU1RPTV9NRVNTQUdFX1JFQ0VJVkVELCBudWxsLCBjdXN0b21NZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRGVsZXRlZDogKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVTU0FHRV9ERUxFVEVELCBudWxsLCBkZWxldGVkTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVzc2FnZUVkaXRlZDogKGVkaXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRVNTQUdFX0VESVRFRCwgbnVsbCwgZWRpdGVkTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkQ2FsbExpc3RlbmVyKFxuICAgICAgdGhpcy5jYWxsTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgb25JbmNvbWluZ0NhbGxSZWNlaXZlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVELCBudWxsLCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JbmNvbWluZ0NhbGxDYW5jZWxsZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQsIG51bGwsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVycyBSZW1vdmVkXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZU1lc3NhZ2VMaXN0ZW5lcih0aGlzLmNvbnZlcnNhdGlvbkxpc3RlbmVySWQpO1xuICAgIENvbWV0Q2hhdC5yZW1vdmVVc2VyTGlzdGVuZXIodGhpcy51c2VyTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBDb252ZXJzYXRpb25zIERldGFpbHMgd2l0aCBhbGwgdGhlIHVzZXJzXG4gICAqL1xuICBnZXRDb252ZXJzYXRpb24oKSB7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICAgIHRoaXMuZmV0Y2hOZXh0Q29udmVyc2F0aW9uKClcbiAgICAgICAgICAudGhlbigoY29udmVyc2F0aW9uTGlzdCkgPT4ge1xuICAgICAgICAgICAgY29udmVyc2F0aW9uTGlzdC5mb3JFYWNoKChjb252ZXJzYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgICAgICAgICAgICFjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5hdmF0YXJcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguYXZhdGFyID0gdGhpcy5zZXRBdmF0YXIoXG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICAgICAgICAgICAhY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaWNvblxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5pY29uID0gdGhpcy5zZXRBdmF0YXIoXG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGVcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgKGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0udWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC51aWQpIHx8XG4gICAgICAgICAgICAgICAgICAoY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguZ3VpZClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi51bnJlYWRNZXNzYWdlQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBbXG4gICAgICAgICAgICAgIC4uLnRoaXMuY29udmVyc2F0aW9uTGlzdCxcbiAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uTGlzdCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGhpcy5jb252ZXJzYXRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fQ0hBVFNfRk9VTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0Q29udmVyc2F0aW9uTGlzdF0gZ2V0Q29udmVyc2F0aW9ucyBmZXRjaE5leHQgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW0NvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RdIGdldENvbnZlcnNhdGlvbnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgVXNlciBBdmF0YXIgSWYgQXZhdGFyIGlzIG5vdCBwcmVzZW50XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0QXZhdGFyKGNvbnZlcnNhdGlvbikge1xuICAgIGlmIChcbiAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIiAmJlxuICAgICAgIWNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLmF2YXRhclxuICAgICkge1xuICAgICAgY29uc3QgdWlkID0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkO1xuICAgICAgY29uc3QgY2hhciA9IGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25XaXRoLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgIC8vIHJldHVybiBTdmdBdmF0YXIuZ2V0QXZhdGFyKHVpZCwgY2hhcik7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25UeXBlID09PSBcImdyb3VwXCIgJiZcbiAgICAgICFjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5pY29uXG4gICAgKSB7XG4gICAgICBjb25zdCBndWlkID0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguZ3VpZDtcbiAgICAgIGNvbnN0IGNoYXIgPSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAvLyByZXR1cm4gU3ZnQXZhdGFyLmdldEF2YXRhcihndWlkLCBjaGFyKVxuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnNhdGlvblVwZGF0ZWQgPSAoXG4gICAga2V5ID0gbnVsbCxcbiAgICBpdGVtID0gbnVsbCxcbiAgICBtZXNzYWdlID0gbnVsbCxcbiAgICBvcHRpb25zID0gbnVsbFxuICApID0+IHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5VU0VSX09OTElORTpcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9PRkZMSU5FOiB7XG4gICAgICAgIHRoaXMudXBkYXRlVXNlcihpdGVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlRFWFRfTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgIGNhc2UgZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgIGNhc2UgZW51bXMuQ1VTVE9NX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICAgIHRoaXMudXBkYXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9FRElURUQ6XG4gICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFRDpcbiAgICAgICAgdGhpcy5jb252ZXJzYXRpb25FZGl0ZWREZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIGNhc2UgZW51bXMuSU5DT01JTkdfQ0FMTF9SRUNFSVZFRDpcbiAgICAgIC8vIGNhc2UgZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICAvLyAgIHRoaXMudXBkYXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgIC8vICAgdGhpcy51cGRhdGVHcm91cE1lbWJlckFkZGVkKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDpcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQ6XG4gICAgICAvLyAgIHRoaXMudXBkYXRlR3JvdXBNZW1iZXJSZW1vdmVkKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICAvLyAgIHRoaXMudXBkYXRlR3JvdXBNZW1iZXJTY29wZUNoYW5nZWQobWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgICAvLyAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVEOlxuICAgICAgLy8gICB0aGlzLnVwZGF0ZUdyb3VwTWVtYmVyQ2hhbmdlZChtZXNzYWdlLCBvcHRpb25zLCBcImluY3JlbWVudFwiKTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRDpcbiAgICAgIC8vICAgdGhpcy51cGRhdGVHcm91cE1lbWJlckNoYW5nZWQobWVzc2FnZSwgb3B0aW9ucywgXCJcIik7XG4gICAgICAvLyAgIGJyZWFrO1xuICAgICAgLy8gZGVmYXVsdDpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIERldGFpbCB3aGVuIHVzZXIgY29tZXMgb25saW5lL29mZmxpbmVcbiAgICogQHBhcmFtXG4gICAqL1xuICB1cGRhdGVVc2VyKHVzZXIpIHtcbiAgICAvL3doZW4gdXNlciB1cGRhdGVzXG4gICAgY29uc3QgY29udmVyc2F0aW9ubGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuXG4gICAgLy9HZXRzIHRoZSBpbmRleCBvZiB1c2VyIHdoaWNoIGNvbWVzIG9mZmxpbmUvb25saW5lXG4gICAgY29uc3QgY29udmVyc2F0aW9uS2V5ID0gY29udmVyc2F0aW9ubGlzdC5maW5kSW5kZXgoXG4gICAgICAoY29udmVyc2F0aW9uT2JqKSA9PlxuICAgICAgICBjb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uVHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgY29udmVyc2F0aW9uT2JqLmNvbnZlcnNhdGlvbldpdGgudWlkID09PSB1c2VyLnVpZFxuICAgICk7XG4gICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICBsZXQgY29udmVyc2F0aW9uT2JqID0geyAuLi5jb252ZXJzYXRpb25saXN0W2NvbnZlcnNhdGlvbktleV0gfTtcbiAgICAgIGxldCBjb252ZXJzYXRpb25XaXRoT2JqID0ge1xuICAgICAgICAuLi5jb252ZXJzYXRpb25PYmouY29udmVyc2F0aW9uV2l0aCxcbiAgICAgICAgc3RhdHVzOiB1c2VyLmdldFN0YXR1cygpLFxuICAgICAgfTtcblxuICAgICAgbGV0IG5ld0NvbnZlcnNhdGlvbk9iaiA9IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICBjb252ZXJzYXRpb25XaXRoOiBjb252ZXJzYXRpb25XaXRoT2JqLFxuICAgICAgfTtcbiAgICAgIGNvbnZlcnNhdGlvbmxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSwgbmV3Q29udmVyc2F0aW9uT2JqKTtcblxuICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9ubGlzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogR2V0cyB0aGUgbGFzdCBtZXNzYWdlXG4gICAqIEBwYXJhbSBjb252ZXJzYXRpb25cbiAgICovXG4gIG1ha2VMYXN0TWVzc2FnZShtZXNzYWdlLCBjb252ZXJzYXRpb24gPSB7fSkge1xuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlKTtcbiAgICByZXR1cm4gbmV3TWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBVcGRhdGVzIENvbnZlcnNhdGlvbnMgYXMgVGV4dC9DdXN0b20gTWVzc2FnZXMgYXJlIHJlY2VpdmVkXG4gICAqIEBwYXJhbVxuICAgKlxuICAgKi9cbiAgdXBkYXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UsIG5vdGlmaWNhdGlvbiA9IHRydWUpIHtcbiAgICB0aGlzLm1ha2VDb252ZXJzYXRpb24obWVzc2FnZSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbktleTtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gcmVzcG9uc2UuY29udmVyc2F0aW9uT2JqO1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICBpZiAoY29udmVyc2F0aW9uS2V5ID4gLTEpIHtcbiAgICAgICAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gdGhpcy5tYWtlVW5yZWFkTWVzc2FnZUNvdW50KGNvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgbGV0IGxhc3RNZXNzYWdlT2JqID0gdGhpcy5tYWtlTGFzdE1lc3NhZ2UobWVzc2FnZSwgY29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGxhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiB1bnJlYWRNZXNzYWdlQ291bnQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Quc3BsaWNlKGNvbnZlcnNhdGlvbktleSwgMSk7XG4gICAgICAgICAgY29udmVyc2F0aW9uTGlzdC51bnNoaWZ0KG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgdGhpcy5jb252ZXJzYXRpb25MaXN0ID0gY29udmVyc2F0aW9uTGlzdDtcblxuICAgICAgICAgIGlmIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCB1bnJlYWRNZXNzYWdlQ291bnQgPSB0aGlzLm1ha2VVbnJlYWRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgICBsZXQgbGFzdE1lc3NhZ2VPYmogPSB0aGlzLm1ha2VMYXN0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICBsZXQgbmV3Q29udmVyc2F0aW9uT2JqID0ge1xuICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uT2JqLFxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGxhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50OiB1bnJlYWRNZXNzYWdlQ291bnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnVuc2hpZnQobmV3Q29udmVyc2F0aW9uT2JqKTtcbiAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuXG4gICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiVGhpcyBpcyBhbiBlcnJvciBpbiBjb252ZXJ0aW5nIG1lc3NhZ2UgdG8gY29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEdldHMgVGhlIENvdW50IG9mIFVucmVhZCBNZXNzYWdlc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIG1ha2VVbnJlYWRNZXNzYWdlQ291bnQoY29udmVyc2F0aW9uOiBhbnkgPSB7fSwgb3BlcmF0b3IgPSBudWxsKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGNvbnZlcnNhdGlvbikubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBsZXQgdW5yZWFkTWVzc2FnZUNvdW50ID0gcGFyc2VJbnQoY29udmVyc2F0aW9uLnVucmVhZE1lc3NhZ2VDb3VudCk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbiAmJlxuICAgICAgdGhpcy5zZWxlY3RlZENvbnZlcnNhdGlvbi5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgKSB7XG4gICAgICB1bnJlYWRNZXNzYWdlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAodGhpcy5pdGVtICYmXG4gICAgICAgIHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcImd1aWRcIikgJiZcbiAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaGFzT3duUHJvcGVydHkoXCJndWlkXCIpICYmXG4gICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uV2l0aC5ndWlkKSB8fFxuICAgICAgKHRoaXMuaXRlbSAmJlxuICAgICAgICB0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikgJiZcbiAgICAgICAgY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGguaGFzT3duUHJvcGVydHkoXCJ1aWRcIikgJiZcbiAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbldpdGgudWlkKVxuICAgICkge1xuICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wZXJhdG9yICYmIG9wZXJhdG9yID09PSBcImRlY3JlbWVudFwiKSB7XG4gICAgICAgIHVucmVhZE1lc3NhZ2VDb3VudCA9IHVucmVhZE1lc3NhZ2VDb3VudCA/IHVucmVhZE1lc3NhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5yZWFkTWVzc2FnZUNvdW50ID0gdW5yZWFkTWVzc2FnZUNvdW50ICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5yZWFkTWVzc2FnZUNvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgZGV0YWlsIG9mIGNvbnZlcnNhdGlvbnNcbiAgICogQHBhcmFtXG4gICAqL1xuICBtYWtlQ29udmVyc2F0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgQ29tZXRDaGF0LkNvbWV0Q2hhdEhlbHBlci5nZXRDb252ZXJzYXRpb25Gcm9tTWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAudGhlbigoY29udmVyc2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgY29udmVyc2F0aW9uTGlzdCA9IFsuLi50aGlzLmNvbnZlcnNhdGlvbkxpc3RdO1xuICAgICAgICAgIGxldCBjb252ZXJzYXRpb25LZXkgPSBjb252ZXJzYXRpb25MaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjKSA9PiBjLmNvbnZlcnNhdGlvbklkID09PSBjb252ZXJzYXRpb24uY29udmVyc2F0aW9uSWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGNvbnZlcnNhdGlvbk9iaiA9IHsgLi4uY29udmVyc2F0aW9uIH07XG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25PYmogPSB7IC4uLmNvbnZlcnNhdGlvbkxpc3RbY29udmVyc2F0aW9uS2V5XSB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uS2V5OiBjb252ZXJzYXRpb25LZXksXG4gICAgICAgICAgICBjb252ZXJzYXRpb25PYmo6IGNvbnZlcnNhdGlvbk9iaixcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxpc3Q6IGNvbnZlcnNhdGlvbkxpc3QsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgQ29udmVyc2F0aW9uIFZpZXcgd2hlbiBtZXNzYWdlIGlzIGVkaXRlZCBvciBkZWxldGVkXG4gICAqL1xuICBjb252ZXJzYXRpb25FZGl0ZWREZWxldGVkKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1ha2VDb252ZXJzYXRpb24obWVzc2FnZSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbktleSA9IHJlc3BvbnNlLmNvbnZlcnNhdGlvbktleTtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uT2JqID0gcmVzcG9uc2UuY29udmVyc2F0aW9uT2JqO1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25MaXN0ID0gcmVzcG9uc2UuY29udmVyc2F0aW9uTGlzdDtcbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbktleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IGxhc3RNZXNzYWdlT2JqID0gY29udmVyc2F0aW9uT2JqLmxhc3RNZXNzYWdlO1xuXG4gICAgICAgICAgaWYgKGxhc3RNZXNzYWdlT2JqLmlkID09PSBtZXNzYWdlLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdMYXN0TWVzc2FnZU9iaiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZU9iaixcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBuZXdDb252ZXJzYXRpb25PYmogPSBPYmplY3QuYXNzaWduKHt9LCBjb252ZXJzYXRpb25PYmosIHtcbiAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IG5ld0xhc3RNZXNzYWdlT2JqLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25MaXN0LnNwbGljZShjb252ZXJzYXRpb25LZXksIDEsIG5ld0NvbnZlcnNhdGlvbk9iaik7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnNhdGlvbkxpc3QgPSBjb252ZXJzYXRpb25MaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJUaGlzIGlzIGFuIGVycm9yIGluIGNvbnZlcnRpbmcgbWVzc2FnZSB0byBjb252ZXJzYXRpb25cIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgVXNlciBzY3JvbGxzIHRvIHRoZSBib3R0b20gb2YgdGhlIGN1cnJlbnQgQ29udmVyc2F0aW9uIGxpc3QgdGhhbiBmZXRjaCBuZXh0IGl0ZW1zIG9mIHRoZSBDb252ZXJzYXRpb24gbGlzdCBhbmQgYXBwZW5kXG4gICAqIEBwYXJhbSBFdmVudCBlXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG4gICAgaWYgKGJvdHRvbSkge1xuICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gICAgICB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBVc2VyIG9uIFVzZXIgQ2xpY2tcbiAgICogQHBhcmFtIHVzZXJcbiAgICovXG5cbiAgdXNlckNsaWNrZWQodXNlcikge1xuICAgIHRoaXMub25Vc2VyQ2xpY2suZW1pdCh1c2VyKTtcbiAgfVxuICAvKipcbiAgICogUGxheXMgQXVkaW8gV2hlbiBNZXNzYWdlIGlzIFJlY2VpdmVkXG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgYXVkaW8uc3JjID0gSU5DT01JTkdfT1RIRVJfTUVTU0FHRV9TT1VORDtcbiAgICBhdWRpby5wbGF5KCk7XG4gIH1cbn1cbiJdfQ==