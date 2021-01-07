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
                    // bannedMembers.forEach(member => this.setAvatar(member));
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
                    // this.setAvatar(member);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQXNDRTtRQUFBLGlCQUFnQjtRQWhDUCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQiw2QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFFaEMsbUJBQWMsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdELG9CQUFlLEdBQUcscUJBQXFCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUvRCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFF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LDREQXFCRTs7Ozs7O0lBTUYsNERBb0JFOztJQTZCRixvREFhRTs7Ozs7O0lBTUYscURBYUU7Ozs7OztJQU1GLDBEQWNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC1kZXRhaWxzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEdyb3VwRGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGd1aWQgPSBudWxsO1xuICBncm91cE1lbWJlclJlcXVlc3QgPSBudWxsO1xuICBiYW5uZWRHcm91cE1lbWJlclJlcXVlc3QgPSBudWxsO1xuXG4gIHVzZXJMaXN0ZW5lcklkID0gXCJncm91cF9kZXRhaWxfdXNlcl9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBncm91cExpc3RlbmVySWQgPSBcImdyb3VwX2RldGFpbF9ncm91cF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIG1lbWJlcmxpc3QgPSBbXTtcbiAgYmFubmVkbWVtYmVybGlzdCA9IFtdO1xuICBhZG1pbmlzdHJhdG9yc2xpc3QgPSBbXTtcbiAgbW9kZXJhdG9yc2xpc3QgPSBbXTtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcblxuICBvcGVuVmlld01lbWJlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBvcGVuQmFuTWVtYmVyOiBib29sZWFuID0gZmFsc2U7XG4gIG9wZW5BZGRNZW1iZXJWaWV3OiBib29sZWFuID0gZmFsc2U7XG5cbiAgY3VycmVudE1lbWJlclNjb3BlID0gXCJcIjtcblxuICBBRERfTUVNQkVSUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkFERF9NRU1CRVJTO1xuICBERUxFVEVfQU5EX0VYSVQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ERUxFVEVfQU5EX0VYSVQ7XG4gIExFQVZFX0dST1VQOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuTEVBVkVfR1JPVVA7XG4gIEJBTk5FRF9NRU1CRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQkFOTkVEX01FTUJFUlM7XG4gIE9QVElPTlM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5PUFRJT05TO1xuICBWSUVXX01FTUJFUlM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5WSUVXX01FTUJFUlM7XG4gIERFVEFJTFM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ERVRBSUxTO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdyb3VwTWVtYmVyUmVxdWVzdCA9IHRoaXMuY3JlYXRlR3JvdXBNZW1iZXJSZXF1ZXN0KHRoaXMuaXRlbS5ndWlkKTtcbiAgICB0aGlzLmdldEdyb3VwTWVtYmVycygpO1xuXG4gICAgdGhpcy5iYW5uZWRHcm91cE1lbWJlclJlcXVlc3QgPSB0aGlzLmNyZWF0ZUJhbm5lZE1lbWJlclJlcXVlc3QoXG4gICAgICB0aGlzLml0ZW0uZ3VpZFxuICAgICk7XG4gICAgdGhpcy5nZXRCYW5uZWRHcm91cE1lbWJlcnMoKTtcblxuICAgIHRoaXMuY3VycmVudE1lbWJlclNjb3BlID0gdGhpcy5jaGVja01lbWJlclNjb3BlKHRoaXMuaXRlbSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZ3JvdXBVcGRhdGVkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuT1BFTl9WSUVXX01FTUJFUjoge1xuICAgICAgICB0aGlzLnRvZ2dsZVZpZXdNZW1iZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0FERF9WSUVXX01FTUJFUjoge1xuICAgICAgICB0aGlzLnRvZ2dsZUFkZE1lbWJlclZpZXcoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVVBEQVRFX0dST1VQX1BBUlRJQ0lQQU5UUzoge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50cyhkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkFERF9HUk9VUF9QQVJUSUNJUEFOVFM6IHtcbiAgICAgICAgdGhpcy5hZGRQYXJ0aWNpcGFudHMoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5SRU1PVkVfR1JPVVBfUEFSVElDSVBBTlRTOiB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGFydGljaXBhbnRzKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQkFOX01FTUJFUjoge1xuICAgICAgICB0aGlzLnRvZ2dsZUJhbk1lbWJlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuVU5CQU5fR1JPVVBfTUVNQkVSUzpcbiAgICAgICAgdGhpcy51bmJhbk1lbWJlcnMoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgYWN0aXZpdGllcyBoYXBwZW5pbmcgaW4gZ3JvdXAgaW4gcmVhbCB0aW1lXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBtZXNzYWdlLCBjaGFuZ2VkR3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBtZXNzYWdlLCBraWNrZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBraWNrZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgbWVzc2FnZSwgYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVELCBtZXNzYWdlLCB1bmJhbm5lZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgdXNlckFkZGVkSW5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCBtZXNzYWdlLCB1c2VyQWRkZWRJbiwge1xuICAgICAgICAgICAgdXNlcjogdXNlckFkZGVkLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBtZXNzYWdlLCBncm91cCwge1xuICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIG1lc3NhZ2UsIGpvaW5lZEdyb3VwLCB7XG4gICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICBlbnVtcy5VU0VSX09OTElORSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB7IGd1aWQ6IHRoaXMuZ3VpZCB9LFxuICAgICAgICAgICAgeyB1c2VyOiBvbmxpbmVVc2VyIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICBlbnVtcy5VU0VSX09GRkxJTkUsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgeyBndWlkOiB0aGlzLmd1aWQgfSxcbiAgICAgICAgICAgIHsgdXNlcjogb2ZmbGluZVVzZXIgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIHJlYWwgdGltZSBncm91cCBsaXN0ZW5lcnMgYXR0YWNoZWQgdG8gdGhlIGdyb3VwIHRoYXQgaXMgb3BlbmVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5yZW1vdmVVc2VyTGlzdGVuZXIodGhpcy51c2VyTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBHcm91cCBNZW1iZXJMaXN0IHJlcXVlc3Qgb2JqZWN0XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY3JlYXRlR3JvdXBNZW1iZXJSZXF1ZXN0KGd1aWQpIHtcbiAgICBsZXQgZ3JvdXBNZW1iZXJSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cE1lbWJlcnNSZXF1ZXN0QnVpbGRlcihndWlkKVxuICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgLmJ1aWxkKCk7XG5cbiAgICByZXR1cm4gZ3JvdXBNZW1iZXJSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgbGlzdCBvZiBncm91cCBtZW1iZXIgYWNjcm9kaW5nIHRvIHRoZSBncm91cCBtZW1iZXIgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRHcm91cE1lbWJlcnMoKSB7XG4gICAgY29uc3QgYWRtaW5pc3RyYXRvcnNsaXN0ID0gW10sXG4gICAgICBtb2RlcmF0b3JzbGlzdCA9IFtdO1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLmZldGNoTmV4dEdyb3VwTWVtYmVycygpXG4gICAgICAgICAgLnRoZW4oKGdyb3VwTWVtYmVycykgPT4ge1xuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAvLyB0aGlzLnNldEF2YXRhcihtZW1iZXIpO1xuXG4gICAgICAgICAgICAgIGlmIChtZW1iZXIuc2NvcGUgPT09IFwiYWRtaW5cIikge1xuICAgICAgICAgICAgICAgIGFkbWluaXN0cmF0b3JzbGlzdC5wdXNoKG1lbWJlcik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobWVtYmVyLnNjb3BlID09PSBcIm1vZGVyYXRvclwiKSB7XG4gICAgICAgICAgICAgICAgbW9kZXJhdG9yc2xpc3QucHVzaChtZW1iZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5tZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdCwgLi4uZ3JvdXBNZW1iZXJzXTtcbiAgICAgICAgICAgIHRoaXMuYWRtaW5pc3RyYXRvcnNsaXN0ID0gW1xuICAgICAgICAgICAgICAuLi50aGlzLmFkbWluaXN0cmF0b3JzbGlzdCxcbiAgICAgICAgICAgICAgLi4uYWRtaW5pc3RyYXRvcnNsaXN0LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMubW9kZXJhdG9yc2xpc3QgPSBbLi4udGhpcy5tb2RlcmF0b3JzbGlzdCwgLi4ubW9kZXJhdG9yc2xpc3RdO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBmZXRjaE5leHRHcm91cE1lbWJlcnMgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRHcm91cERldGFpbF0gZ2V0R3JvdXBNZW1iZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQmFubmVkIE1lbWJlckxpc3QgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBjcmVhdGVCYW5uZWRNZW1iZXJSZXF1ZXN0KGd1aWQpIHtcbiAgICBsZXQgYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5CYW5uZWRNZW1iZXJzUmVxdWVzdEJ1aWxkZXIoXG4gICAgICBndWlkXG4gICAgKVxuICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgLmJ1aWxkKCk7XG5cbiAgICByZXR1cm4gYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgbGlzdCBvZiBCYW5uZWQgbWVtYmVycyBhY2Nyb2RpbmcgdG8gdGhlICBiYW5uZWQgbWVtYmVycyByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEJhbm5lZEdyb3VwTWVtYmVycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pdGVtLnNjb3BlID09PSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmZldGNoTmV4dEJhbm5lZEdyb3VwTWVtYmVycygpXG4gICAgICAgICAgLnRoZW4oKGJhbm5lZE1lbWJlcnMpID0+IHtcbiAgICAgICAgICAgIC8vIGJhbm5lZE1lbWJlcnMuZm9yRWFjaChtZW1iZXIgPT4gdGhpcy5zZXRBdmF0YXIobWVtYmVyKSk7XG5cbiAgICAgICAgICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IFtcbiAgICAgICAgICAgICAgLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0LFxuICAgICAgICAgICAgICAuLi5iYW5uZWRNZW1iZXJzLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiW0NvbWV0Q2hhdEdyb3VwRGV0YWlsXSBnZXRHcm91cE1lbWJlcnMgZmV0Y2hOZXh0R3JvdXBNZW1iZXJzIGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH07XG5cbiAgZ3JvdXBVcGRhdGVkID0gKGtleSA9IG51bGwsIG1lc3NhZ2UgPSBudWxsLCBncm91cCA9IG51bGwsIG9wdGlvbnMgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIGlmIChndWlkICE9PSBncm91cC5ndWlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuVVNFUl9PTkxJTkU6XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT0ZGTElORTpcbiAgICAgICAgdGhpcy5ncm91cE1lbWJlclVwZGF0ZWQob3B0aW9ucy51c2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcblxuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHtcbiAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5hZGRQYXJ0aWNpcGFudHMoW3VwZGF0ZWRNZW1iZXJdLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9MRUZUOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIHRoaXMucmVtb3ZlUGFydGljaXBhbnRzKG1lbWJlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIHRoaXMuYmFuTWVtYmVycyhbbWVtYmVyXSk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVQYXJ0aWNpcGFudHMobWVtYmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcbiAgICAgICAgICB0aGlzLnVuYmFuTWVtYmVycyhbbWVtYmVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zW1wic2NvcGVcIl0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudHModXBkYXRlZE1lbWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIG1lbWJlcnMgdGhhdCBhcmUgYmFubmVkIHRvIGJhbm5lZE1lbWJlckxpc3RcbiAgICogQHBhcmFtIGFueSBtZW1iZXJzXG4gICAqL1xuICBiYW5NZW1iZXJzID0gKG1lbWJlcnMpID0+IHtcbiAgICB0aGlzLmJhbm5lZG1lbWJlcmxpc3QgPSBbLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0LCAuLi5tZW1iZXJzXTtcbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBncm91cCBtZW1iZXIgZGF0YSBhbmQgaW5mb3JtYXRpb24gYmFzZWQgb24gZ3JvdXAgYWN0aW9uc1xuICAgKiBAcGFyYW0gYW55IG1lbWJlclxuICAgKi9cbiAgZ3JvdXBNZW1iZXJVcGRhdGVkID0gKG1lbWJlcikgPT4ge1xuICAgIGxldCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgbWVtYmVyS2V5ID0gbWVtYmVybGlzdC5maW5kSW5kZXgoKG0sIGspID0+IG0udWlkID09PSBtZW1iZXIudWlkKTtcbiAgICAvL2lmIGZvdW5kIGluIHRoZSBsaXN0LCB1cGRhdGUgdXNlciBvYmplY3RcbiAgICBpZiAobWVtYmVyS2V5ID4gLTEpIHtcbiAgICAgIGxldCBtZW1iZXJPYmogPSBtZW1iZXJsaXN0W21lbWJlcktleV07XG4gICAgICBsZXQgbmV3TWVtYmVyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVtYmVyT2JqLCBtZW1iZXIpO1xuICAgICAgbWVtYmVybGlzdC5zcGxpY2UobWVtYmVyS2V5LCAxLCBuZXdNZW1iZXJPYmopO1xuXG4gICAgICB0aGlzLm1lbWJlcmxpc3QgPSBtZW1iZXJsaXN0O1xuICAgIH1cblxuICAgIGxldCBiYW5uZWRtZW1iZXJsaXN0ID0gWy4uLnRoaXMuYmFubmVkbWVtYmVybGlzdF07XG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgYmFubmVkTWVtYmVyS2V5ID0gYmFubmVkbWVtYmVybGlzdC5maW5kSW5kZXgoXG4gICAgICAobSwgaykgPT4gbS51aWQgPT09IG1lbWJlci51aWRcbiAgICApO1xuICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgIGlmIChiYW5uZWRNZW1iZXJLZXkgPiAtMSkge1xuICAgICAgbGV0IGJhbm5lZE1lbWJlck9iaiA9IGJhbm5lZG1lbWJlcmxpc3RbYmFubmVkTWVtYmVyS2V5XTtcbiAgICAgIGxldCBuZXdCYW5uZWRNZW1iZXJPYmogPSBPYmplY3QuYXNzaWduKHt9LCBiYW5uZWRNZW1iZXJPYmosIG1lbWJlcik7XG4gICAgICBiYW5uZWRtZW1iZXJsaXN0LnNwbGljZShiYW5uZWRNZW1iZXJLZXksIDEsIG5ld0Jhbm5lZE1lbWJlck9iaik7XG5cbiAgICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IGJhbm5lZG1lbWJlcmxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBmZXRjaGVzIG5leHQgbGlzdCBvZiBncm91cCBtZW1iZXJzIGFzIHRoZSB1c2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGZldGNoTmV4dEdyb3VwTWVtYmVycygpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cE1lbWJlclJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogZmV0Y2hlcyBuZXh0IGxpc3Qgb2YgQmFubmVkIG1lbWJlcnMgYXMgdGhlIHVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZmV0Y2hOZXh0QmFubmVkR3JvdXBNZW1iZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmJhbm5lZEdyb3VwTWVtYmVyUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgUGFydGljcGFudHMgdG8gdGhlIGN1cnJlbnQgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRQYXJ0aWNpcGFudHMgPSAobWVtYmVycywgdHJpZ2dlclVwZGF0ZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdCwgLi4ubWVtYmVyc107XG5cbiAgICB0aGlzLm1lbWJlcmxpc3QgPSBtZW1iZXJsaXN0O1xuXG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLk1FTUJFUlNfQURERUQsIHBheUxvYWQ6IG1lbWJlcnMgfSk7XG4gICAgaWYgKHRyaWdnZXJVcGRhdGUpIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJTX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IHsgaXRlbTogdGhpcy5pdGVtLCBjb3VudDogbWVtYmVybGlzdC5sZW5ndGggfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVXBkYXRlcyBHcm91cCBQYXJ0aWNpcGFudCdzIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBncm91cCBhY3Rpdml0aWVzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHVwZGF0ZWRNZW1iZXIpID0+IHtcbiAgICBjb25zdCBtZW1iZXJsaXN0ID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG5cbiAgICBjb25zdCBtZW1iZXJLZXkgPSBtZW1iZXJsaXN0LmZpbmRJbmRleChcbiAgICAgIChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IHVwZGF0ZWRNZW1iZXIudWlkXG4gICAgKTtcbiAgICBpZiAobWVtYmVyS2V5ID4gLTEpIHtcbiAgICAgIGNvbnN0IG1lbWJlck9iaiA9IG1lbWJlcmxpc3RbbWVtYmVyS2V5XTtcbiAgICAgIGNvbnN0IG5ld01lbWJlck9iaiA9IE9iamVjdC5hc3NpZ24oe30sIG1lbWJlck9iaiwgdXBkYXRlZE1lbWJlciwge1xuICAgICAgICBzY29wZTogdXBkYXRlZE1lbWJlcltcInNjb3BlXCJdLFxuICAgICAgfSk7XG5cbiAgICAgIG1lbWJlcmxpc3Quc3BsaWNlKG1lbWJlcktleSwgMSwgbmV3TWVtYmVyT2JqKTtcblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9TQ09QRV9DSEFOR0VELFxuICAgICAgICBwYXlMb2FkOiBbbmV3TWVtYmVyT2JqXSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1lbWJlcmxpc3QgPSBbLi4ubWVtYmVybGlzdF07XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBncm91cCBtZW1iZXIgbGlzdCAsIHdoZW4gdGhlIG1lbWJlciBpcyBiYW5uZWRcbiAgICogQHBhcmFtIEFueSBtZW1iZXJcbiAgICovXG4gIHJlbW92ZVBhcnRpY2lwYW50cyA9IChtZW1iZXIsIHRyaWdnZXJVcGRhdGUgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBtZW1iZXJzID0gWy4uLnRoaXMubWVtYmVybGlzdF07XG4gICAgY29uc3QgZmlsdGVyZWRNZW1iZXJzID0gZ3JvdXBtZW1iZXJzLmZpbHRlcigoZ3JvdXBtZW1iZXIpID0+IHtcbiAgICAgIGlmIChncm91cG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbWJlcmxpc3QgPSBbLi4uZmlsdGVyZWRNZW1iZXJzXTtcblxuICAgIGlmICh0cmlnZ2VyVXBkYXRlKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuTUVNQkVSU19VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiB7XG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICAgIGNvdW50OiBmaWx0ZXJlZE1lbWJlcnMubGVuZ3RoLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwYXJ0aWNpcGFudCBmcm9tIHRoZSBiYW5uZWQgbWVtYmVyIGxpc3QgLCB3aGVuIHRoZSBtZW1iZXIgaXMgdW5iYW5uZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICB1bmJhbk1lbWJlcnMobWVtYmVycykge1xuICAgIGNvbnN0IGJhbm5lZE1lbWJlcnMgPSBbLi4udGhpcy5iYW5uZWRtZW1iZXJsaXN0XTtcbiAgICBjb25zdCB1bmJhbm5lZE1lbWJlcnMgPSBbXTtcblxuICAgIGNvbnN0IGZpbHRlcmVkQmFubmVkTWVtYmVycyA9IGJhbm5lZE1lbWJlcnMuZmlsdGVyKChiYW5uZWRtZW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kID0gbWVtYmVycy5maW5kKChtZW1iZXIpID0+IGJhbm5lZG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpO1xuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIHVuYmFubmVkTWVtYmVycy5wdXNoKGZvdW5kKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9VTkJBTk5FRCxcbiAgICAgIHBheUxvYWQ6IHVuYmFubmVkTWVtYmVycyxcbiAgICB9KTtcblxuICAgIHRoaXMuYmFubmVkbWVtYmVybGlzdCA9IFsuLi5maWx0ZXJlZEJhbm5lZE1lbWJlcnNdO1xuICB9XG4gIC8qIGhlbHBzIHRoZSB1c2VyIHRvIGxlYXZlIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGxlYXZlR3JvdXAgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIENvbWV0Q2hhdC5sZWF2ZUdyb3VwKGd1aWQpXG4gICAgICAudGhlbigoaGFzTGVmdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxlZnQgc3VjY2Vzc2Z1bGx5OlwiLCBoYXNMZWZ0KTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTEVGVF9HUk9VUCxcbiAgICAgICAgICBwYXlMb2FkOiB0aGlzLml0ZW0sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsZWF2aW5nIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGhlbHBzIHRoZSB1c2VyICh0aGF0IGlzIGFkbWluIG9mIHRoZSBncm91cCkgdG8gZGVsZXRlIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGRlbGV0ZUdyb3VwID0gKCkgPT4ge1xuICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICBDb21ldENoYXQuZGVsZXRlR3JvdXAoZ3VpZClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwcyBkZWxldGVkIHN1Y2Nlc3NmdWxseTpcIiwgcmVzcG9uc2UpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5ERUxFVEVfR1JPVVAsXG4gICAgICAgICAgcGF5TG9hZDogdGhpcy5pdGVtLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgZGVsZXRlIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvbGUvc2NvcGUgdGhhdCB0aGUgY3VycmVudCB1c2VyIGhhcyAsIGZvciB0aGUgZ3JvdXAgdGhhdCBpcyBjdXJyZW50bHkgb3BlbmVkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyXG4gICAqL1xuICBjaGVja01lbWJlclNjb3BlID0gKGdyb3VwKSA9PiB7XG4gICAgLy9ncm91cC5zY29wZSBpcyBrZXkgd2hpY2ggaG9sZHMgdGhlIHJvbGUgb2YgdGhlIGN1cnJlbnQgdXNlciBpbiB0aGlzIGdyb3VwXG5cbiAgICBpZiAoZ3JvdXAuc2NvcGUgPT0gU1RSSU5HX01FU1NBR0VTLk9XTkVSKSB7XG4gICAgICByZXR1cm4gXCJhZG1pblwiO1xuICAgIH1cblxuICAgIGlmIChncm91cC5zY29wZSA9PSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLkFETUlOKSB7XG4gICAgICByZXR1cm4gXCJhZG1pblwiO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAuc2NvcGUgPT0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5NT0RFUkFUT1IpIHtcbiAgICAgIHJldHVybiBcIm1vZGVyYXRvclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJwYXJ0aWNpcGFudFwiO1xuICAgIH1cbiAgfTtcblxuICB0b2dnbGVWaWV3TWVtYmVyKCkge1xuICAgIHRoaXMub3BlblZpZXdNZW1iZXIgPSAhdGhpcy5vcGVuVmlld01lbWJlcjtcbiAgfVxuICB0b2dnbGVCYW5NZW1iZXIoKSB7XG4gICAgdGhpcy5vcGVuQmFuTWVtYmVyID0gIXRoaXMub3BlbkJhbk1lbWJlcjtcbiAgfVxuICB0b2dnbGVBZGRNZW1iZXJWaWV3KHNob3cpIHtcbiAgICB0aGlzLm9wZW5BZGRNZW1iZXJWaWV3ID0gc2hvdztcbiAgfVxuICAvKipcbiAgICogQ2xvc2UgdGhyZWFkIHdoZW4gb3BlbmVkIGluIHNtYWxsIHNjcmVlblxuICAgKi9cbiAgY2xvc2VUaHJlYWRWaWV3KCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==