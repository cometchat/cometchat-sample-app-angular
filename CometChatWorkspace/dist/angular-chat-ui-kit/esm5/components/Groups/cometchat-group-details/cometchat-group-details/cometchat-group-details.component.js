/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-details/cometchat-group-details/cometchat-group-details.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatGroupDetailsComponent = /** @class */ (function () {
    function CometchatGroupDetailsComponent() {
        var _this = this;
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.guid = null;
        this.groupMemberRequest = null;
        this.bannedGroupMemberRequest = null;
        this.userListenerId = "group_detail_user_" + new Date().getTime();
        this.groupListenerId = "group_detail_group_" + new Date().getTime();
        this.memberlist = [];
        this.bannedmemberlist = [];
        this.administratorslist = [];
        this.moderatorslist = [];
        this.loggedInUser = null;
        this.openViewMember = false;
        this.openBanMember = false;
        this.openAddMemberView = false;
        this.currentMemberScope = "";
        this.ADD_MEMBERS = STRING_MESSAGES.ADD_MEMBERS;
        this.DELETE_AND_EXIT = STRING_MESSAGES.DELETE_AND_EXIT;
        this.LEAVE_GROUP = STRING_MESSAGES.LEAVE_GROUP;
        this.BANNED_MEMBERS = STRING_MESSAGES.BANNED_MEMBERS;
        this.OPTIONS = STRING_MESSAGES.OPTIONS;
        this.VIEW_MEMBERS = STRING_MESSAGES.VIEW_MEMBERS;
        this.DETAILS = STRING_MESSAGES.DETAILS;
        /**
         * Fetches list of Banned members accroding to the  banned members request object
         * @param
         */
        this.getBannedGroupMembers = (/**
         * @return {?}
         */
        function () {
            if (_this.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
                return false;
            }
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                _this.fetchNextBannedGroupMembers()
                    .then((/**
                 * @param {?} bannedMembers
                 * @return {?}
                 */
                function (bannedMembers) {
                    _this.bannedmemberlist = tslib_1.__spread(_this.bannedmemberlist, bannedMembers);
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.error("[CometChatGroupDetail] getGroupMembers fetchNextGroupMembers error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("[CometChatGroupDetail] getGroupMembers getLoggedInUser error", error);
            }));
        });
        this.groupUpdated = (/**
         * @param {?=} key
         * @param {?=} message
         * @param {?=} group
         * @param {?=} options
         * @return {?}
         */
        function (key, message, group, options) {
            if (key === void 0) { key = null; }
            if (message === void 0) { message = null; }
            if (group === void 0) { group = null; }
            if (options === void 0) { options = null; }
            /** @type {?} */
            var guid = _this.item.guid;
            if (guid !== group.guid) {
                return false;
            }
            switch (key) {
                case enums.USER_ONLINE:
                case enums.USER_OFFLINE:
                    _this.groupMemberUpdated(options.user);
                    break;
                case enums.GROUP_MEMBER_ADDED:
                case enums.GROUP_MEMBER_JOINED:
                    {
                        /** @type {?} */
                        var member = options.user;
                        /** @type {?} */
                        var updatedMember = Object.assign({}, member, {
                            scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
                        });
                        _this.addParticipants([updatedMember], false);
                    }
                    break;
                case enums.GROUP_MEMBER_LEFT:
                case enums.GROUP_MEMBER_KICKED:
                    {
                        /** @type {?} */
                        var member = options.user;
                        _this.removeParticipants(member, false);
                    }
                    break;
                case enums.GROUP_MEMBER_BANNED:
                    {
                        /** @type {?} */
                        var member = options.user;
                        _this.banMembers([member]);
                        _this.removeParticipants(member, false);
                    }
                    break;
                case enums.GROUP_MEMBER_UNBANNED:
                    {
                        /** @type {?} */
                        var member = options.user;
                        _this.unbanMembers([member]);
                    }
                    break;
                case enums.GROUP_MEMBER_SCOPE_CHANGED:
                    {
                        /** @type {?} */
                        var member = options.user;
                        /** @type {?} */
                        var updatedMember = Object.assign({}, member, {
                            scope: options["scope"],
                        });
                        _this.updateParticipants(updatedMember);
                    }
                    break;
                default:
                    break;
            }
        });
        /**
         * Adds the members that are banned to bannedMemberList
         * @param any members
         */
        this.banMembers = (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            _this.bannedmemberlist = tslib_1.__spread(_this.bannedmemberlist, members);
        });
        /**
         * Updates group member data and information based on group actions
         * @param any member
         */
        this.groupMemberUpdated = (/**
         * @param {?} member
         * @return {?}
         */
        function (member) {
            /** @type {?} */
            var memberlist = tslib_1.__spread(_this.memberlist);
            //search for user
            /** @type {?} */
            var memberKey = memberlist.findIndex((/**
             * @param {?} m
             * @param {?} k
             * @return {?}
             */
            function (m, k) { return m.uid === member.uid; }));
            //if found in the list, update user object
            if (memberKey > -1) {
                /** @type {?} */
                var memberObj = memberlist[memberKey];
                /** @type {?} */
                var newMemberObj = Object.assign({}, memberObj, member);
                memberlist.splice(memberKey, 1, newMemberObj);
                _this.memberlist = memberlist;
            }
            /** @type {?} */
            var bannedmemberlist = tslib_1.__spread(_this.bannedmemberlist);
            //search for user
            /** @type {?} */
            var bannedMemberKey = bannedmemberlist.findIndex((/**
             * @param {?} m
             * @param {?} k
             * @return {?}
             */
            function (m, k) { return m.uid === member.uid; }));
            //if found in the list, update user object
            if (bannedMemberKey > -1) {
                /** @type {?} */
                var bannedMemberObj = bannedmemberlist[bannedMemberKey];
                /** @type {?} */
                var newBannedMemberObj = Object.assign({}, bannedMemberObj, member);
                bannedmemberlist.splice(bannedMemberKey, 1, newBannedMemberObj);
                _this.bannedmemberlist = bannedmemberlist;
            }
        });
        /**
         * Add Particpants to the current group
         * @param
         */
        this.addParticipants = (/**
         * @param {?} members
         * @param {?=} triggerUpdate
         * @return {?}
         */
        function (members, triggerUpdate) {
            if (triggerUpdate === void 0) { triggerUpdate = true; }
            /** @type {?} */
            var memberlist = tslib_1.__spread(_this.memberlist, members);
            _this.memberlist = memberlist;
            _this.actionGenerated.emit({ type: enums.MEMBERS_ADDED, payLoad: members });
            if (triggerUpdate) {
                _this.actionGenerated.emit({
                    type: enums.MEMBERS_UPDATED,
                    payLoad: { item: _this.item, count: memberlist.length },
                });
            }
        });
        /**
         * Updates Group Participant's data according to the group activities
         * @param
         */
        this.updateParticipants = (/**
         * @param {?} updatedMember
         * @return {?}
         */
        function (updatedMember) {
            /** @type {?} */
            var memberlist = tslib_1.__spread(_this.memberlist);
            /** @type {?} */
            var memberKey = memberlist.findIndex((/**
             * @param {?} member
             * @return {?}
             */
            function (member) { return member.uid === updatedMember.uid; }));
            if (memberKey > -1) {
                /** @type {?} */
                var memberObj = memberlist[memberKey];
                /** @type {?} */
                var newMemberObj = Object.assign({}, memberObj, updatedMember, {
                    scope: updatedMember["scope"],
                });
                memberlist.splice(memberKey, 1, newMemberObj);
                _this.actionGenerated.emit({
                    type: enums.MEMBER_SCOPE_CHANGED,
                    payLoad: [newMemberObj],
                });
                _this.memberlist = tslib_1.__spread(memberlist);
            }
        });
        /**
         * Removes the participant from the group member list , when the member is banned
         * @param Any member
         */
        this.removeParticipants = (/**
         * @param {?} member
         * @param {?=} triggerUpdate
         * @return {?}
         */
        function (member, triggerUpdate) {
            if (triggerUpdate === void 0) { triggerUpdate = true; }
            /** @type {?} */
            var groupmembers = tslib_1.__spread(_this.memberlist);
            /** @type {?} */
            var filteredMembers = groupmembers.filter((/**
             * @param {?} groupmember
             * @return {?}
             */
            function (groupmember) {
                if (groupmember.uid === member.uid) {
                    return false;
                }
                return true;
            }));
            _this.memberlist = tslib_1.__spread(filteredMembers);
            if (triggerUpdate) {
                _this.actionGenerated.emit({
                    type: enums.MEMBERS_UPDATED,
                    payLoad: {
                        item: _this.item,
                        count: filteredMembers.length,
                    },
                });
            }
        });
        /* helps the user to leave the group
           * @param
           */
        this.leaveGroup = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var guid = _this.item.guid;
            CometChat.leaveGroup(guid)
                .then((/**
             * @param {?} hasLeft
             * @return {?}
             */
            function (hasLeft) {
                console.log("Group left successfully:", hasLeft);
                _this.actionGenerated.emit({
                    type: enums.LEFT_GROUP,
                    payLoad: _this.item,
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("Group leaving failed with exception:", error);
            }));
        });
        /**
         * helps the user (that is admin of the group) to delete the group
         * @param
         */
        this.deleteGroup = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var guid = _this.item.guid;
            CometChat.deleteGroup(guid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                console.log("Groups deleted successfully:", response);
                _this.actionGenerated.emit({
                    type: enums.DELETE_GROUP,
                    payLoad: _this.item,
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("Group delete failed with exception:", error);
            }));
        });
        /**
         * Returns the role/scope that the current user has , for the group that is currently opened
         * @param Any member
         */
        this.checkMemberScope = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            //group.scope is key which holds the role of the current user in this group
            if (group.scope == STRING_MESSAGES.OWNER) {
                return "admin";
            }
            if (group.scope == CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
                return "admin";
            }
            else if (group.scope == CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
                return "moderator";
            }
            else {
                return "participant";
            }
        });
    }
    /**
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.groupMemberRequest = this.createGroupMemberRequest(this.item.guid);
        this.getGroupMembers();
        this.bannedGroupMemberRequest = this.createBannedMemberRequest(this.item.guid);
        this.getBannedGroupMembers();
        this.currentMemberScope = this.checkMemberScope(this.item);
        this.addEventListeners(this.groupUpdated);
    };
    /**
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
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
    CometchatGroupDetailsComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var data = action.payLoad;
        switch (action.type) {
            case enums.OPEN_VIEW_MEMBER: {
                this.toggleViewMember();
                break;
            }
            case enums.CLOSE_ADD_VIEW_MEMBER: {
                this.toggleAddMemberView(false);
                break;
            }
            case enums.UPDATE_GROUP_PARTICIPANTS: {
                this.updateParticipants(data);
                break;
            }
            case enums.ADD_GROUP_PARTICIPANTS: {
                this.addParticipants(data);
                break;
            }
            case enums.REMOVE_GROUP_PARTICIPANTS: {
                this.removeParticipants(data);
                break;
            }
            case enums.BAN_MEMBER: {
                this.toggleBanMember();
                break;
            }
            case enums.UNBAN_GROUP_MEMBERS:
                this.unbanMembers(data);
                break;
        }
    };
    /**
     * Listener for activities happening in group in real time
     * @param
     */
    /**
     * Listener for activities happening in group in real time
     * @param {?} callback
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.addEventListeners = /**
     * Listener for activities happening in group in real time
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
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
                callback(enums.GROUP_MEMBER_SCOPE_CHANGED, message, changedGroup, {
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
                callback(enums.GROUP_MEMBER_KICKED, message, kickedFrom, {
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
                callback(enums.GROUP_MEMBER_BANNED, message, bannedFrom, {
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
                callback(enums.GROUP_MEMBER_UNBANNED, message, unbannedFrom, {
                    user: unbannedUser,
                    hasJoined: false,
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
                callback(enums.GROUP_MEMBER_ADDED, message, userAddedIn, {
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
                callback(enums.GROUP_MEMBER_LEFT, message, group, {
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
                callback(enums.GROUP_MEMBER_JOINED, message, joinedGroup, {
                    user: joinedUser,
                });
            }),
        }));
        CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
            onUserOnline: (/**
             * @param {?} onlineUser
             * @return {?}
             */
            function (onlineUser) {
                /* when someuser/friend comes online, user will be received here */
                callback(enums.USER_ONLINE, null, { guid: _this.guid }, { user: onlineUser });
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            function (offlineUser) {
                /* when someuser/friend went offline, user will be received here */
                callback(enums.USER_OFFLINE, null, { guid: _this.guid }, { user: offlineUser });
            }),
        }));
    };
    /**
     * Removes all the real time group listeners attached to the group that is opened
     * @param
     */
    /**
     * Removes all the real time group listeners attached to the group that is opened
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.removeListeners = /**
     * Removes all the real time group listeners attached to the group that is opened
     * @return {?}
     */
    function () {
        CometChat.removeUserListener(this.userListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
    };
    /**
     * Creates a Group MemberList request object
     * @param
     */
    /**
     * Creates a Group MemberList request object
     * @param {?} guid
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.createGroupMemberRequest = /**
     * Creates a Group MemberList request object
     * @param {?} guid
     * @return {?}
     */
    function (guid) {
        /** @type {?} */
        var groupMemberRequest = new CometChat.GroupMembersRequestBuilder(guid)
            .setLimit(10)
            .build();
        return groupMemberRequest;
    };
    /**
     * Fetches list of group member accroding to the group member request object
     * @param
     */
    /**
     * Fetches list of group member accroding to the group member request object
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.getGroupMembers = /**
     * Fetches list of group member accroding to the group member request object
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var administratorslist = [];
        /** @type {?} */
        var moderatorslist = [];
        CometChat.getLoggedinUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
            _this.fetchNextGroupMembers()
                .then((/**
             * @param {?} groupMembers
             * @return {?}
             */
            function (groupMembers) {
                groupMembers.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) {
                    if (member.scope === "admin") {
                        administratorslist.push(member);
                    }
                    if (member.scope === "moderator") {
                        moderatorslist.push(member);
                    }
                }));
                _this.memberlist = tslib_1.__spread(_this.memberlist, groupMembers);
                _this.administratorslist = tslib_1.__spread(_this.administratorslist, administratorslist);
                _this.moderatorslist = tslib_1.__spread(_this.moderatorslist, moderatorslist);
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.error("[CometChatGroupDetail] getGroupMembers fetchNextGroupMembers error", error);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[CometChatGroupDetail] getGroupMembers getLoggedInUser error", error);
        }));
    };
    /**
     * Creates a Banned MemberList request object
     * @param
     */
    /**
     * Creates a Banned MemberList request object
     * @param {?} guid
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.createBannedMemberRequest = /**
     * Creates a Banned MemberList request object
     * @param {?} guid
     * @return {?}
     */
    function (guid) {
        /** @type {?} */
        var bannedGroupMemberRequest = new CometChat.BannedMembersRequestBuilder(guid)
            .setLimit(10)
            .build();
        return bannedGroupMemberRequest;
    };
    /**
     * fetches next list of group members as the user scrolls to the bottom
     * @param
     */
    /**
     * fetches next list of group members as the user scrolls to the bottom
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.fetchNextGroupMembers = /**
     * fetches next list of group members as the user scrolls to the bottom
     * @return {?}
     */
    function () {
        return this.groupMemberRequest.fetchNext();
    };
    /**
     * fetches next list of Banned members as the user scrolls to the bottom
     * @param
     */
    /**
     * fetches next list of Banned members as the user scrolls to the bottom
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.fetchNextBannedGroupMembers = /**
     * fetches next list of Banned members as the user scrolls to the bottom
     * @return {?}
     */
    function () {
        return this.bannedGroupMemberRequest.fetchNext();
    };
    /**
     * Removes the participant from the banned member list , when the member is unbanned
     * @param
     */
    /**
     * Removes the participant from the banned member list , when the member is unbanned
     * @param {?} members
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.unbanMembers = /**
     * Removes the participant from the banned member list , when the member is unbanned
     * @param {?} members
     * @return {?}
     */
    function (members) {
        /** @type {?} */
        var bannedMembers = tslib_1.__spread(this.bannedmemberlist);
        /** @type {?} */
        var unbannedMembers = [];
        /** @type {?} */
        var filteredBannedMembers = bannedMembers.filter((/**
         * @param {?} bannedmember
         * @return {?}
         */
        function (bannedmember) {
            /** @type {?} */
            var found = members.find((/**
             * @param {?} member
             * @return {?}
             */
            function (member) { return bannedmember.uid === member.uid; }));
            if (found) {
                unbannedMembers.push(found);
                return false;
            }
            return true;
        }));
        this.actionGenerated.emit({
            type: enums.MEMBER_UNBANNED,
            payLoad: unbannedMembers,
        });
        this.bannedmemberlist = tslib_1.__spread(filteredBannedMembers);
    };
    /**
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.toggleViewMember = /**
     * @return {?}
     */
    function () {
        this.openViewMember = !this.openViewMember;
    };
    /**
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.toggleBanMember = /**
     * @return {?}
     */
    function () {
        this.openBanMember = !this.openBanMember;
    };
    /**
     * @param {?} show
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.toggleAddMemberView = /**
     * @param {?} show
     * @return {?}
     */
    function (show) {
        this.openAddMemberView = show;
    };
    /**
     * Close thread when opened in small screen
     */
    /**
     * Close thread when opened in small screen
     * @return {?}
     */
    CometchatGroupDetailsComponent.prototype.closeThreadView = /**
     * Close thread when opened in small screen
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_DETAIL_CLICKED,
        });
    };
    CometchatGroupDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-group-details",
                    template: "<div class=\"detailStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerCloseStyle\" (click)=\"closeThreadView()\"></div>\n    <h4 class=\"headerTitleStyle\">{{ DETAILS }}</h4>\n  </div>\n  <div class=\"detailPaneStyle\">\n    <!-- MEMBER SECTION BELOW-->\n    <div class=\"sectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">Members</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleViewMember()\">\n            {{ VIEW_MEMBERS }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"sectionContentStyle\" *ngIf=\"currentMemberScope == 'admin'\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleAddMemberView(true)\">\n            {{ ADD_MEMBERS }}\n          </div>\n        </div>\n      </div>\n\n      <div\n        class=\"sectionContentStyle\"\n        *ngIf=\"\n          currentMemberScope == 'admin' || currentMemberScope == 'moderator'\n        \"\n      >\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleBanMember()\">\n            {{ BANNED_MEMBERS }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- MEMBER SECTION ABOVE-->\n\n    <!-- OPTION SECTION BELOW-->\n    <div class=\"sectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">{{ OPTIONS }}</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"leaveGroup()\">\n            {{ LEAVE_GROUP }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"sectionContentStyle\" *ngIf=\"currentMemberScope == 'admin'\">\n        <div class=\"contentItemStyle\">\n          <div\n            class=\"itemLinkStyle itemDeleteLinkStyle\"\n            (click)=\"deleteGroup()\"\n          >\n            {{ DELETE_AND_EXIT }}\n          </div>\n        </div>\n      </div>\n      <!-- SHARED MEDIA SECTION BELOW-->\n      <div class=\"sharedMedia\">\n        <cometchat-shared-media\n          [item]=\"item\"\n          [type]=\"type\"\n        ></cometchat-shared-media>\n      </div>\n      <!-- SHARED MEDIA SECTION ABOVE-->\n    </div>\n    <!-- OPTION SECTION ABOVE-->\n  </div>\n\n  <!-- VIEW MEMBERS COMPONENT -->\n  <cometchat-view-group-member-list\n    *ngIf=\"openViewMember\"\n    [item]=\"item\"\n    [type]=\"type\"\n    [memberlist]=\"memberlist\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-view-group-member-list>\n\n  <!-- ADD MEMBERS COMPONENT -->\n  <cometchat-add-group-member-list\n    *ngIf=\"openAddMemberView\"\n    [item]=\"item\"\n    [type]=\"type\"\n    [friendsOnly]=\"false\"\n    [memberlist]=\"memberlist\"\n    [bannedmemberlist]=\"bannedmemberlist\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-add-group-member-list>\n\n  <!-- BANNED MEMBERS COMPONENT -->\n  <cometchat-ban-group-member-list-item\n    *ngIf=\"openBanMember\"\n    [item]=\"item\"\n    [bannedmemberlist]=\"bannedmemberlist\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-ban-group-member-list-item>\n</div>\n",
                    styles: ["*{font-family:Inter,sans-serif}.detailStyle{height:100%;box-sizing:border-box}.detailStyle *{box-sizing:border-box}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea;display:flex;justify-content:flex-start;align-items:center}.headerCloseStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAlElEQVRIS+3TQQ6AIAwEwPZl+g56kZeJB/5pmmBCjEIXIfEAV5Mdu1CmwYcH59MEqg3/s6IY40ZEi4j42gjwBCl8T8FeREIJgYA8nJkP55xOUjxmoCVcZRPQGm4CvoTDABEFy8vJLwWuCEVMgP7R7XmaJzEDrQgEPCB9F+26PK2Lmdeui1bb2LfvcEUoNIFqY8MrOgHJVToZIc83egAAAABJRU5ErkJggg==) center center no-repeat;width:24px;height:24px}.headerTitleStyle{margin:0;font-weight:700;font-size:20px}.detailPaneStyle{margin:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;height:calc(100% - 70px)}.sectionStyle{width:100%;height:100%}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0}.sectionContentStyle:not(:last-of-type){margin-bottom:16px}.contentItemStyle{position:relative;display:flex;clear:both;width:100%;padding:6px 0}.contentItemStyle:first-of-type{padding-top:0}.contentItemStyle:last-of-type{padding-bottom:0}.itemLinkStyle{font-size:15px;line-height:20px;display:inline-block;cursor:pointer;font-weight:600}.itemDeleteLinkStyle{color:#ff3b30}.sharedMedia{height:100%;width:100%}@media (min-width:320px) and (max-width:767px){.headerCloseStyle{display:block}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatGroupDetailsComponent.ctorParameters = function () { return []; };
    CometchatGroupDetailsComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatGroupDetailsComponent;
}());
export { CometchatGroupDetailsComponent };
if (false) {
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.item;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.type;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.guid;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.groupMemberRequest;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.bannedGroupMemberRequest;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.memberlist;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.bannedmemberlist;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.administratorslist;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.moderatorslist;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.openViewMember;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.openBanMember;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.openAddMemberView;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.currentMemberScope;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.ADD_MEMBERS;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.DELETE_AND_EXIT;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.LEAVE_GROUP;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.BANNED_MEMBERS;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.OPTIONS;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.VIEW_MEMBERS;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.DETAILS;
    /**
     * Fetches list of Banned members accroding to the  banned members request object
     * \@param
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.getBannedGroupMembers;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.groupUpdated;
    /**
     * Adds the members that are banned to bannedMemberList
     * \@param any members
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.banMembers;
    /**
     * Updates group member data and information based on group actions
     * \@param any member
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.groupMemberUpdated;
    /**
     * Add Particpants to the current group
     * \@param
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.addParticipants;
    /**
     * Updates Group Participant's data according to the group activities
     * \@param
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.updateParticipants;
    /**
     * Removes the participant from the group member list , when the member is banned
     * \@param Any member
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.removeParticipants;
    /** @type {?} */
    CometchatGroupDetailsComponent.prototype.leaveGroup;
    /**
     * helps the user (that is admin of the group) to delete the group
     * \@param
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.deleteGroup;
    /**
     * Returns the role/scope that the current user has , for the group that is currently opened
     * \@param Any member
     * @type {?}
     */
    CometchatGroupDetailsComponent.prototype.checkMemberScope;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQXNDRTtRQUFBLGlCQUFnQjtRQWhDUCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQiw2QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFFaEMsbUJBQWMsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdELG9CQUFlLEdBQUcscUJBQXFCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUvRCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFF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NkJGLG9EQWFFOzs7Ozs7SUFNRixxREFhRTs7Ozs7O0lBTUYsMERBY0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLWRldGFpbHNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtZGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0R3JvdXBEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ3VpZCA9IG51bGw7XG4gIGdyb3VwTWVtYmVyUmVxdWVzdCA9IG51bGw7XG4gIGJhbm5lZEdyb3VwTWVtYmVyUmVxdWVzdCA9IG51bGw7XG5cbiAgdXNlckxpc3RlbmVySWQgPSBcImdyb3VwX2RldGFpbF91c2VyX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IFwiZ3JvdXBfZGV0YWlsX2dyb3VwX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgbWVtYmVybGlzdCA9IFtdO1xuICBiYW5uZWRtZW1iZXJsaXN0ID0gW107XG4gIGFkbWluaXN0cmF0b3JzbGlzdCA9IFtdO1xuICBtb2RlcmF0b3JzbGlzdCA9IFtdO1xuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuXG4gIG9wZW5WaWV3TWVtYmVyOiBib29sZWFuID0gZmFsc2U7XG4gIG9wZW5CYW5NZW1iZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgb3BlbkFkZE1lbWJlclZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjdXJyZW50TWVtYmVyU2NvcGUgPSBcIlwiO1xuXG4gIEFERF9NRU1CRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQUREX01FTUJFUlM7XG4gIERFTEVURV9BTkRfRVhJVDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkRFTEVURV9BTkRfRVhJVDtcbiAgTEVBVkVfR1JPVVA6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5MRUFWRV9HUk9VUDtcbiAgQkFOTkVEX01FTUJFUlM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5CQU5ORURfTUVNQkVSUztcbiAgT1BUSU9OUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk9QVElPTlM7XG4gIFZJRVdfTUVNQkVSUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlZJRVdfTUVNQkVSUztcbiAgREVUQUlMUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkRFVEFJTFM7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JvdXBNZW1iZXJSZXF1ZXN0ID0gdGhpcy5jcmVhdGVHcm91cE1lbWJlclJlcXVlc3QodGhpcy5pdGVtLmd1aWQpO1xuICAgIHRoaXMuZ2V0R3JvdXBNZW1iZXJzKCk7XG5cbiAgICB0aGlzLmJhbm5lZEdyb3VwTWVtYmVyUmVxdWVzdCA9IHRoaXMuY3JlYXRlQmFubmVkTWVtYmVyUmVxdWVzdChcbiAgICAgIHRoaXMuaXRlbS5ndWlkXG4gICAgKTtcbiAgICB0aGlzLmdldEJhbm5lZEdyb3VwTWVtYmVycygpO1xuXG4gICAgdGhpcy5jdXJyZW50TWVtYmVyU2NvcGUgPSB0aGlzLmNoZWNrTWVtYmVyU2NvcGUodGhpcy5pdGVtKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5ncm91cFVwZGF0ZWQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5PUEVOX1ZJRVdfTUVNQkVSOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVmlld01lbWJlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQ0xPU0VfQUREX1ZJRVdfTUVNQkVSOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQWRkTWVtYmVyVmlldyhmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VUERBVEVfR1JPVVBfUEFSVElDSVBBTlRTOiB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRzKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQUREX0dST1VQX1BBUlRJQ0lQQU5UUzoge1xuICAgICAgICB0aGlzLmFkZFBhcnRpY2lwYW50cyhkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlJFTU9WRV9HUk9VUF9QQVJUSUNJUEFOVFM6IHtcbiAgICAgICAgdGhpcy5yZW1vdmVQYXJ0aWNpcGFudHMoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5CQU5fTUVNQkVSOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQmFuTWVtYmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5VTkJBTl9HUk9VUF9NRU1CRVJTOlxuICAgICAgICB0aGlzLnVuYmFuTWVtYmVycyhkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiBncm91cCBpbiByZWFsIHRpbWVcbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRHcm91cExpc3RlbmVyKFxuICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICBvbkdyb3VwTWVtYmVyU2NvcGVDaGFuZ2VkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICBuZXdTY29wZSxcbiAgICAgICAgICBvbGRTY29wZSxcbiAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsIG1lc3NhZ2UsIGNoYW5nZWRHcm91cCwge1xuICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICBzY29wZTogbmV3U2NvcGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIG1lc3NhZ2UsIGtpY2tlZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELCBtZXNzYWdlLCBiYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyVW5iYW5uZWQ6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVuYmFubmVkVXNlcixcbiAgICAgICAgICB1bmJhbm5lZEJ5LFxuICAgICAgICAgIHVuYmFubmVkRnJvbVxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsIG1lc3NhZ2UsIHVuYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjogdW5iYW5uZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHVzZXJBZGRlZCxcbiAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIG1lc3NhZ2UsIHVzZXJBZGRlZEluLCB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJMZWZ0OiAobWVzc2FnZSwgbGVhdmluZ1VzZXIsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQsIG1lc3NhZ2UsIGdyb3VwLCB7XG4gICAgICAgICAgICB1c2VyOiBsZWF2aW5nVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckpvaW5lZDogKG1lc3NhZ2UsIGpvaW5lZFVzZXIsIGpvaW5lZEdyb3VwKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCwgbWVzc2FnZSwgam9pbmVkR3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGpvaW5lZFVzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkVXNlckxpc3RlbmVyKFxuICAgICAgdGhpcy51c2VyTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuVXNlckxpc3RlbmVyKHtcbiAgICAgICAgb25Vc2VyT25saW5lOiAob25saW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIGNvbWVzIG9ubGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIGVudW1zLlVTRVJfT05MSU5FLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHsgZ3VpZDogdGhpcy5ndWlkIH0sXG4gICAgICAgICAgICB7IHVzZXI6IG9ubGluZVVzZXIgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIGVudW1zLlVTRVJfT0ZGTElORSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB7IGd1aWQ6IHRoaXMuZ3VpZCB9LFxuICAgICAgICAgICAgeyB1c2VyOiBvZmZsaW5lVXNlciB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgcmVhbCB0aW1lIGdyb3VwIGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGUgZ3JvdXAgdGhhdCBpcyBvcGVuZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEdyb3VwIE1lbWJlckxpc3QgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBjcmVhdGVHcm91cE1lbWJlclJlcXVlc3QoZ3VpZCkge1xuICAgIGxldCBncm91cE1lbWJlclJlcXVlc3QgPSBuZXcgQ29tZXRDaGF0Lkdyb3VwTWVtYmVyc1JlcXVlc3RCdWlsZGVyKGd1aWQpXG4gICAgICAuc2V0TGltaXQoMTApXG4gICAgICAuYnVpbGQoKTtcblxuICAgIHJldHVybiBncm91cE1lbWJlclJlcXVlc3Q7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwIG1lbWJlciBhY2Nyb2RpbmcgdG8gdGhlIGdyb3VwIG1lbWJlciByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEdyb3VwTWVtYmVycygpIHtcbiAgICBjb25zdCBhZG1pbmlzdHJhdG9yc2xpc3QgPSBbXSxcbiAgICAgIG1vZGVyYXRvcnNsaXN0ID0gW107XG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICAgIHRoaXMuZmV0Y2hOZXh0R3JvdXBNZW1iZXJzKClcbiAgICAgICAgICAudGhlbigoZ3JvdXBNZW1iZXJzKSA9PiB7XG4gICAgICAgICAgICBncm91cE1lbWJlcnMuZm9yRWFjaCgobWVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChtZW1iZXIuc2NvcGUgPT09IFwiYWRtaW5cIikge1xuICAgICAgICAgICAgICAgIGFkbWluaXN0cmF0b3JzbGlzdC5wdXNoKG1lbWJlcik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobWVtYmVyLnNjb3BlID09PSBcIm1vZGVyYXRvclwiKSB7XG4gICAgICAgICAgICAgICAgbW9kZXJhdG9yc2xpc3QucHVzaChtZW1iZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5tZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdCwgLi4uZ3JvdXBNZW1iZXJzXTtcbiAgICAgICAgICAgIHRoaXMuYWRtaW5pc3RyYXRvcnNsaXN0ID0gW1xuICAgICAgICAgICAgICAuLi50aGlzLmFkbWluaXN0cmF0b3JzbGlzdCxcbiAgICAgICAgICAgICAgLi4uYWRtaW5pc3RyYXRvcnNsaXN0LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMubW9kZXJhdG9yc2xpc3QgPSBbLi4udGhpcy5tb2RlcmF0b3JzbGlzdCwgLi4ubW9kZXJhdG9yc2xpc3RdO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBmZXRjaE5leHRHcm91cE1lbWJlcnMgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRHcm91cERldGFpbF0gZ2V0R3JvdXBNZW1iZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQmFubmVkIE1lbWJlckxpc3QgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBjcmVhdGVCYW5uZWRNZW1iZXJSZXF1ZXN0KGd1aWQpIHtcbiAgICBsZXQgYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5CYW5uZWRNZW1iZXJzUmVxdWVzdEJ1aWxkZXIoXG4gICAgICBndWlkXG4gICAgKVxuICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgLmJ1aWxkKCk7XG5cbiAgICByZXR1cm4gYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgbGlzdCBvZiBCYW5uZWQgbWVtYmVycyBhY2Nyb2RpbmcgdG8gdGhlICBiYW5uZWQgbWVtYmVycyByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEJhbm5lZEdyb3VwTWVtYmVycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pdGVtLnNjb3BlID09PSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmZldGNoTmV4dEJhbm5lZEdyb3VwTWVtYmVycygpXG4gICAgICAgICAgLnRoZW4oKGJhbm5lZE1lbWJlcnMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IFtcbiAgICAgICAgICAgICAgLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0LFxuICAgICAgICAgICAgICAuLi5iYW5uZWRNZW1iZXJzLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiW0NvbWV0Q2hhdEdyb3VwRGV0YWlsXSBnZXRHcm91cE1lbWJlcnMgZmV0Y2hOZXh0R3JvdXBNZW1iZXJzIGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH07XG5cbiAgZ3JvdXBVcGRhdGVkID0gKGtleSA9IG51bGwsIG1lc3NhZ2UgPSBudWxsLCBncm91cCA9IG51bGwsIG9wdGlvbnMgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIGlmIChndWlkICE9PSBncm91cC5ndWlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9PTkxJTkU6XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT0ZGTElORTpcbiAgICAgICAgdGhpcy5ncm91cE1lbWJlclVwZGF0ZWQob3B0aW9ucy51c2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcblxuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHtcbiAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5hZGRQYXJ0aWNpcGFudHMoW3VwZGF0ZWRNZW1iZXJdLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9MRUZUOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIHRoaXMucmVtb3ZlUGFydGljaXBhbnRzKG1lbWJlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIHRoaXMuYmFuTWVtYmVycyhbbWVtYmVyXSk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVQYXJ0aWNpcGFudHMobWVtYmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcbiAgICAgICAgICB0aGlzLnVuYmFuTWVtYmVycyhbbWVtYmVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW1wic2NvcGVcIl0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudHModXBkYXRlZE1lbWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIG1lbWJlcnMgdGhhdCBhcmUgYmFubmVkIHRvIGJhbm5lZE1lbWJlckxpc3RcbiAgICogQHBhcmFtIGFueSBtZW1iZXJzXG4gICAqL1xuICBiYW5NZW1iZXJzID0gKG1lbWJlcnMpID0+IHtcbiAgICB0aGlzLmJhbm5lZG1lbWJlcmxpc3QgPSBbLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0LCAuLi5tZW1iZXJzXTtcbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBncm91cCBtZW1iZXIgZGF0YSBhbmQgaW5mb3JtYXRpb24gYmFzZWQgb24gZ3JvdXAgYWN0aW9uc1xuICAgKiBAcGFyYW0gYW55IG1lbWJlclxuICAgKi9cbiAgZ3JvdXBNZW1iZXJVcGRhdGVkID0gKG1lbWJlcikgPT4ge1xuICAgIGxldCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgbWVtYmVyS2V5ID0gbWVtYmVybGlzdC5maW5kSW5kZXgoKG0sIGspID0+IG0udWlkID09PSBtZW1iZXIudWlkKTtcbiAgICAvL2lmIGZvdW5kIGluIHRoZSBsaXN0LCB1cGRhdGUgdXNlciBvYmplY3RcbiAgICBpZiAobWVtYmVyS2V5ID4gLTEpIHtcbiAgICAgIGxldCBtZW1iZXJPYmogPSBtZW1iZXJsaXN0W21lbWJlcktleV07XG4gICAgICBsZXQgbmV3TWVtYmVyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVtYmVyT2JqLCBtZW1iZXIpO1xuICAgICAgbWVtYmVybGlzdC5zcGxpY2UobWVtYmVyS2V5LCAxLCBuZXdNZW1iZXJPYmopO1xuXG4gICAgICB0aGlzLm1lbWJlcmxpc3QgPSBtZW1iZXJsaXN0O1xuICAgIH1cblxuICAgIGxldCBiYW5uZWRtZW1iZXJsaXN0ID0gWy4uLnRoaXMuYmFubmVkbWVtYmVybGlzdF07XG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgYmFubmVkTWVtYmVyS2V5ID0gYmFubmVkbWVtYmVybGlzdC5maW5kSW5kZXgoXG4gICAgICAobSwgaykgPT4gbS51aWQgPT09IG1lbWJlci51aWRcbiAgICApO1xuICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgIGlmIChiYW5uZWRNZW1iZXJLZXkgPiAtMSkge1xuICAgICAgbGV0IGJhbm5lZE1lbWJlck9iaiA9IGJhbm5lZG1lbWJlcmxpc3RbYmFubmVkTWVtYmVyS2V5XTtcbiAgICAgIGxldCBuZXdCYW5uZWRNZW1iZXJPYmogPSBPYmplY3QuYXNzaWduKHt9LCBiYW5uZWRNZW1iZXJPYmosIG1lbWJlcik7XG4gICAgICBiYW5uZWRtZW1iZXJsaXN0LnNwbGljZShiYW5uZWRNZW1iZXJLZXksIDEsIG5ld0Jhbm5lZE1lbWJlck9iaik7XG5cbiAgICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IGJhbm5lZG1lbWJlcmxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBmZXRjaGVzIG5leHQgbGlzdCBvZiBncm91cCBtZW1iZXJzIGFzIHRoZSB1c2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGZldGNoTmV4dEdyb3VwTWVtYmVycygpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cE1lbWJlclJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogZmV0Y2hlcyBuZXh0IGxpc3Qgb2YgQmFubmVkIG1lbWJlcnMgYXMgdGhlIHVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZmV0Y2hOZXh0QmFubmVkR3JvdXBNZW1iZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmJhbm5lZEdyb3VwTWVtYmVyUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgUGFydGljcGFudHMgdG8gdGhlIGN1cnJlbnQgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRQYXJ0aWNpcGFudHMgPSAobWVtYmVycywgdHJpZ2dlclVwZGF0ZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdCwgLi4ubWVtYmVyc107XG5cbiAgICB0aGlzLm1lbWJlcmxpc3QgPSBtZW1iZXJsaXN0O1xuXG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLk1FTUJFUlNfQURERUQsIHBheUxvYWQ6IG1lbWJlcnMgfSk7XG4gICAgaWYgKHRyaWdnZXJVcGRhdGUpIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJTX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IHsgaXRlbTogdGhpcy5pdGVtLCBjb3VudDogbWVtYmVybGlzdC5sZW5ndGggfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBHcm91cCBQYXJ0aWNpcGFudCdzIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBncm91cCBhY3Rpdml0aWVzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHVwZGF0ZWRNZW1iZXIpID0+IHtcbiAgICBjb25zdCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG5cbiAgICBjb25zdCBtZW1iZXJLZXkgPSBtZW1iZXJsaXN0LmZpbmRJbmRleChcbiAgICAgIChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IHVwZGF0ZWRNZW1iZXIudWlkXG4gICAgKTtcbiAgICBpZiAobWVtYmVyS2V5ID4gLTEpIHtcbiAgICAgIGNvbnN0IG1lbWJlck9iaiA9IG1lbWJlcmxpc3RbbWVtYmVyS2V5XTtcbiAgICAgIGNvbnN0IG5ld01lbWJlck9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lbWJlck9iaiwgdXBkYXRlZE1lbWJlciwge1xuICAgICAgICBzY29wZTogdXBkYXRlZE1lbWJlcltcInNjb3BlXCJdLFxuICAgICAgfSk7XG5cbiAgICAgIG1lbWJlcmxpc3Quc3BsaWNlKG1lbWJlcktleSwgMSwgbmV3TWVtYmVyT2JqKTtcblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VELFxuICAgICAgICBwYXlMb2FkOiBbbmV3TWVtYmVyT2JqXSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1lbWJlcmxpc3QgPSBbLi4ubWVtYmVybGlzdF07XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBncm91cCBtZW1iZXIgbGlzdCAsIHdoZW4gdGhlIG1lbWJlciBpcyBiYW5uZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJcbiAgICovXG4gIHJlbW92ZVBhcnRpY2lwYW50cyA9IChtZW1iZXIsIHRyaWdnZXJVcGRhdGUgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBtZW1iZXJzID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG4gICAgY29uc3QgZmlsdGVyZWRNZW1iZXJzID0gZ3JvdXBtZW1iZXJzLmZpbHRlcigoZ3JvdXBtZW1iZXIpID0+IHtcbiAgICAgIGlmIChncm91cG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbWJlcmxpc3QgPSBbLi4uZmlsdGVyZWRNZW1iZXJzXTtcblxuICAgIGlmICh0cmlnZ2VyVXBkYXRlKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuTUVNQkVSU19VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiB7XG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICAgIGNvdW50OiBmaWx0ZXJlZE1lbWJlcnMubGVuZ3RoLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBiYW5uZWQgbWVtYmVyIGxpc3QgLCB3aGVuIHRoZSBtZW1iZXIgaXMgdW5iYW5uZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICB1bmJhbk1lbWJlcnMobWVtYmVycykge1xuICAgIGNvbnN0IGJhbm5lZE1lbWJlcnMgPSBbLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0XTtcbiAgICBjb25zdCB1bmJhbm5lZE1lbWJlcnMgPSBbXTtcblxuICAgIGNvbnN0IGZpbHRlcmVkQmFubmVkTWVtYmVycyA9IGJhbm5lZE1lbWJlcnMuZmlsdGVyKChiYW5uZWRtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kID0gbWVtYmVycy5maW5kKChtZW1iZXIpID0+IGJhbm5lZG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpO1xuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIHVuYmFubmVkTWVtYmVycy5wdXNoKGZvdW5kKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9VTkJBTk5FRCxcbiAgICAgIHBheUxvYWQ6IHVuYmFubmVkTWVtYmVycyxcbiAgICB9KTtcblxuICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IFsuLi5maWx0ZXJlZEJhbm5lZE1lbWJlcnNdO1xuICB9XG4gIC8qIGhlbHBzIHRoZSB1c2VyIHRvIGxlYXZlIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIENvbWV0Q2hhdC5sZWF2ZUdyb3VwKGd1aWQpXG4gICAgICAudGhlbigoaGFzTGVmdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxlZnQgc3VjY2Vzc2Z1bGx5OlwiLCBoYXNMZWZ0KTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTEVGVF9HUk9VUCxcbiAgICAgICAgICBwYXlMb2FkOiB0aGlzLml0ZW0sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsZWF2aW5nIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGhlbHBzIHRoZSB1c2VyICh0aGF0IGlzIGFkbWluIG9mIHRoZSBncm91cCkgdG8gZGVsZXRlIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGRlbGV0ZUdyb3VwID0gKCkgPT4ge1xuICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICBDb21ldENoYXQuZGVsZXRlR3JvdXAoZ3VpZClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwcyBkZWxldGVkIHN1Y2Nlc3NmdWxseTpcIiwgcmVzcG9uc2UpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5ERUxFVEVfR1JPVVAsXG4gICAgICAgICAgcGF5TG9hZDogdGhpcy5pdGVtLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgZGVsZXRlIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvbGUvc2NvcGUgdGhhdCB0aGUgY3VycmVudCB1c2VyIGhhcyAsIGZvciB0aGUgZ3JvdXAgdGhhdCBpcyBjdXJyZW50bHkgb3BlbmVkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyXG4gICAqL1xuICBjaGVja01lbWJlclNjb3BlID0gKGdyb3VwKSA9PiB7XG4gICAgLy9ncm91cC5zY29wZSBpcyBrZXkgd2hpY2ggaG9sZHMgdGhlIHJvbGUgb2YgdGhlIGN1cnJlbnQgdXNlciBpbiB0aGlzIGdyb3VwXG5cbiAgICBpZiAoZ3JvdXAuc2NvcGUgPT0gU1RSSU5HX01FU1NBR0VTLk9XTkVSKSB7XG4gICAgICByZXR1cm4gXCJhZG1pblwiO1xuICAgIH1cblxuICAgIGlmIChncm91cC5zY29wZSA9PSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLkFETUlOKSB7XG4gICAgICByZXR1cm4gXCJhZG1pblwiO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAuc2NvcGUgPT0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5NT0RFUkFUT1IpIHtcbiAgICAgIHJldHVybiBcIm1vZGVyYXRvclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJwYXJ0aWNpcGFudFwiO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVWaWV3TWVtYmVyKCkge1xuICAgIHRoaXMub3BlblZpZXdNZW1iZXIgPSAhdGhpcy5vcGVuVmlld01lbWJlcjtcbiAgfVxuICB0b2dnbGVCYW5NZW1iZXIoKSB7XG4gICAgdGhpcy5vcGVuQmFuTWVtYmVyID0gIXRoaXMub3BlbkJhbk1lbWJlcjtcbiAgfVxuICB0b2dnbGVBZGRNZW1iZXJWaWV3KHNob3cpIHtcbiAgICB0aGlzLm9wZW5BZGRNZW1iZXJWaWV3ID0gc2hvdztcbiAgfVxuICAvKipcbiAgICogQ2xvc2UgdGhyZWFkIHdoZW4gb3BlbmVkIGluIHNtYWxsIHNjcmVlblxuICAgKi9cbiAgY2xvc2VUaHJlYWRWaWV3KCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==