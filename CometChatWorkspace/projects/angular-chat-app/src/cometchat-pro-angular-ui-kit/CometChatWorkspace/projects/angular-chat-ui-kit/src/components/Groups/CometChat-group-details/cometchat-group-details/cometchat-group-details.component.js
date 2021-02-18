/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-group-details/cometchat-group-details/cometchat-group-details.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatGroupDetailsComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.guid = null;
        this.groupMemberRequest = null;
        this.bannedGroupMemberRequest = null;
        this.userListenerId = enums.GROUP_DETAIL_USER_ + new Date().getTime();
        this.groupListenerId = enums.GROUP_DETAIL_GROUP_ + new Date().getTime();
        this.memberList = [];
        this.bannedMemberList = [];
        this.administratorsList = [];
        this.moderatorsList = [];
        this.loggedInUser = null;
        this.openViewMember = false;
        this.openBanMember = false;
        this.openAddMemberView = false;
        this.currentMemberScope = "";
        this.ADMIN = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        this.MODERATOR = COMETCHAT_CONSTANTS.MODERATOR;
        this.PARTICIPANT = COMETCHAT_CONSTANTS.PARTICIPANT;
        this.ADD_MEMBERS = COMETCHAT_CONSTANTS.ADD_MEMBERS;
        this.DELETE_AND_EXIT = COMETCHAT_CONSTANTS.DELETE_AND_EXIT;
        this.LEAVE_GROUP = COMETCHAT_CONSTANTS.LEAVE_GROUP;
        this.BANNED_MEMBERS = COMETCHAT_CONSTANTS.BANNED_MEMBERS;
        this.OPTIONS = COMETCHAT_CONSTANTS.OPTIONS;
        this.VIEW_MEMBERS = COMETCHAT_CONSTANTS.VIEW_MEMBERS;
        this.DETAILS = COMETCHAT_CONSTANTS.DETAILS;
        /**
         * Fetches list of Banned members accroding to the  banned members request object
         * @param
         */
        this.getBannedGroupMembers = (/**
         * @return {?}
         */
        () => {
            try {
                if (this.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
                    return false;
                }
                CometChat.getLoggedinUser()
                    .then((/**
                 * @param {?} user
                 * @return {?}
                 */
                (user) => {
                    this.fetchNextBannedGroupMembers()
                        .then((/**
                     * @param {?} bannedMembers
                     * @return {?}
                     */
                    (bannedMembers) => {
                        this.bannedMemberList = [
                            ...this.bannedMemberList,
                            ...bannedMembers,
                        ];
                    }))
                        .catch((/**
                     * @param {?} error
                     * @return {?}
                     */
                    (error) => {
                        logger("[CometChatGroupDetail] getGroupMembers fetchNextGroupMembers error", error);
                    }));
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("[CometChatGroupDetail] getGroupMembers getLoggedInUser error", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates group infomation based on activities happening in the group
         */
        this.groupUpdated = (/**
         * @param {?=} key
         * @param {?=} message
         * @param {?=} group
         * @param {?=} options
         * @return {?}
         */
        (key = null, message = null, group = null, options = null) => {
            try {
                /** @type {?} */
                const guid = this.item.guid;
                if (guid !== group.guid) {
                    return false;
                }
                switch (key) {
                    case enums.USER_ONLINE:
                    case enums.USER_OFFLINE:
                        this.groupMemberUpdated(options.user);
                        break;
                    case enums.GROUP_MEMBER_ADDED:
                    case enums.GROUP_MEMBER_JOINED:
                        {
                            /** @type {?} */
                            const member = options.user;
                            /** @type {?} */
                            const updatedMember = Object.assign({}, member, {
                                scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
                            });
                            this.addParticipants([updatedMember], false);
                        }
                        break;
                    case enums.GROUP_MEMBER_LEFT:
                    case enums.GROUP_MEMBER_KICKED:
                        {
                            /** @type {?} */
                            const member = options.user;
                            this.removeParticipants(member, false);
                        }
                        break;
                    case enums.GROUP_MEMBER_BANNED:
                        {
                            /** @type {?} */
                            const member = options.user;
                            this.banMembers([member]);
                            this.removeParticipants(member, false);
                        }
                        break;
                    case enums.GROUP_MEMBER_UNBANNED:
                        {
                            /** @type {?} */
                            const member = options.user;
                            this.unbanMembers([member]);
                        }
                        break;
                    case enums.GROUP_MEMBER_SCOPE_CHANGED:
                        {
                            /** @type {?} */
                            const member = options.user;
                            /** @type {?} */
                            const updatedMember = Object.assign({}, member, {
                                scope: options[enums.SCOPE],
                            });
                            this.updateParticipants(updatedMember);
                        }
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                logger(error);
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
        (members) => {
            try {
                this.bannedMemberList = [...this.bannedMemberList, ...members];
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates group member data and information based on group actions
         * @param any member
         */
        this.groupMemberUpdated = (/**
         * @param {?} member
         * @return {?}
         */
        (member) => {
            try {
                /** @type {?} */
                let memberList = [...this.memberList];
                //search for user
                /** @type {?} */
                let memberKey = memberList.findIndex((/**
                 * @param {?} m
                 * @param {?} k
                 * @return {?}
                 */
                (m, k) => m.uid === member.uid));
                //if found in the list, update user object
                if (memberKey > -1) {
                    /** @type {?} */
                    let memberObj = memberList[memberKey];
                    /** @type {?} */
                    let newMemberObj = Object.assign({}, memberObj, member);
                    memberList.splice(memberKey, 1, newMemberObj);
                    this.memberList = memberList;
                }
                /** @type {?} */
                let bannedMemberList = [...this.bannedMemberList];
                //search for user
                /** @type {?} */
                let bannedMemberKey = bannedMemberList.findIndex((/**
                 * @param {?} m
                 * @param {?} k
                 * @return {?}
                 */
                (m, k) => m.uid === member.uid));
                //if found in the list, update user object
                if (bannedMemberKey > -1) {
                    /** @type {?} */
                    let bannedMemberObj = bannedMemberList[bannedMemberKey];
                    /** @type {?} */
                    let newBannedMemberObj = Object.assign({}, bannedMemberObj, member);
                    bannedMemberList.splice(bannedMemberKey, 1, newBannedMemberObj);
                    this.bannedMemberList = bannedMemberList;
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Helps to Add Particpants to the current group
         */
        this.addParticipants = (/**
         * @param {?} members
         * @param {?=} triggerUpdate
         * @return {?}
         */
        (members, triggerUpdate = true) => {
            try {
                /** @type {?} */
                const memberList = [...this.memberList, ...members];
                this.memberList = memberList;
                this.actionGenerated.emit({
                    type: enums.MEMBERS_ADDED,
                    payLoad: members,
                });
                if (triggerUpdate) {
                    this.actionGenerated.emit({
                        type: enums.MEMBERS_UPDATED,
                        payLoad: { item: this.item, count: memberList.length },
                    });
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates Group Participant's data according to the group activities
         */
        this.updateParticipants = (/**
         * @param {?} updatedMember
         * @return {?}
         */
        (updatedMember) => {
            try {
                /** @type {?} */
                const memberList = [...this.memberList];
                /** @type {?} */
                const memberKey = memberList.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => member.uid === updatedMember.uid));
                if (memberKey > -1) {
                    /** @type {?} */
                    const memberObj = memberList[memberKey];
                    /** @type {?} */
                    const newMemberObj = Object.assign({}, memberObj, updatedMember, {
                        scope: updatedMember[enums.SCOPE],
                    });
                    memberList.splice(memberKey, 1, newMemberObj);
                    this.actionGenerated.emit({
                        type: enums.MEMBER_SCOPE_CHANGED,
                        payLoad: [newMemberObj],
                    });
                    this.memberList = [...memberList];
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Removes the participant from the group member list , when the member is banned
         */
        this.removeParticipants = (/**
         * @param {?} member
         * @param {?=} triggerUpdate
         * @return {?}
         */
        (member, triggerUpdate = true) => {
            try {
                /** @type {?} */
                const groupmembers = [...this.memberList];
                /** @type {?} */
                const filteredMembers = groupmembers.filter((/**
                 * @param {?} groupmember
                 * @return {?}
                 */
                (groupmember) => {
                    if (groupmember.uid === member.uid) {
                        return false;
                    }
                    return true;
                }));
                this.memberList = [...filteredMembers];
                if (triggerUpdate) {
                    this.actionGenerated.emit({
                        type: enums.MEMBERS_UPDATED,
                        payLoad: {
                            item: this.item,
                            count: filteredMembers.length,
                        },
                    });
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /* helps the user to leave the group
           * @param
           */
        this.leaveGroup = (/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                const guid = this.item.guid;
                CometChat.leaveGroup(guid)
                    .then((/**
                 * @param {?} hasLeft
                 * @return {?}
                 */
                (hasLeft) => {
                    logger("Group left successfully:", hasLeft);
                    this.actionGenerated.emit({
                        type: enums.LEFT_GROUP,
                        payLoad: this.item,
                    });
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("Group leaving failed with exception:", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * helps the user (that is admin of the group) to delete the group
         * @param
         */
        this.deleteGroup = (/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                const guid = this.item.guid;
                CometChat.deleteGroup(guid)
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    logger("Groups deleted successfully:", response);
                    this.actionGenerated.emit({
                        type: enums.DELETE_GROUP,
                        payLoad: this.item,
                    });
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("Group delete failed with exception:", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Returns the role/scope that the current user has , for the group that is currently opened
         * @param Any member
         */
        this.checkMemberScope = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            try {
                //group.scope is key which holds the role of the current user in this group
                if (group.scope == COMETCHAT_CONSTANTS.OWNER) {
                    return this.ADMIN;
                }
                if (group.scope == CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
                    return this.ADMIN;
                }
                else if (group.scope == CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
                    return this.MODERATOR;
                }
                else {
                    return this.PARTICIPANT;
                }
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
            this.groupMemberRequest = this.createGroupMemberRequest(this.item.guid);
            this.getGroupMembers();
            this.bannedGroupMemberRequest = this.createBannedMemberRequest(this.item.guid);
            this.getBannedGroupMembers();
            this.currentMemberScope = this.checkMemberScope(this.item);
            this.addEventListeners(this.groupUpdated);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            this.removeListeners();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            /** @type {?} */
            let data = action.payLoad;
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listener for activities happening in group in real time
     * @param {?} callback
     * @return {?}
     */
    addEventListeners(callback) {
        try {
            CometChat.addGroupListener(this.groupListenerId, new CometChat.GroupListener({
                onGroupMemberScopeChanged: (/**
                 * @param {?} message
                 * @param {?} changedUser
                 * @param {?} newScope
                 * @param {?} oldScope
                 * @param {?} changedGroup
                 * @return {?}
                 */
                (message, changedUser, newScope, oldScope, changedGroup) => {
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
                (message, kickedUser, kickedBy, kickedFrom) => {
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
                (message, bannedUser, bannedBy, bannedFrom) => {
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
                (message, unbannedUser, unbannedBy, unbannedFrom) => {
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
                (message, userAdded, userAddedBy, userAddedIn) => {
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
                (message, leavingUser, group) => {
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
                (message, joinedUser, joinedGroup) => {
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
                (onlineUser) => {
                    /* when someuser/friend comes online, user will be received here */
                    callback(enums.USER_ONLINE, null, { guid: this.guid }, { user: onlineUser });
                }),
                onUserOffline: (/**
                 * @param {?} offlineUser
                 * @return {?}
                 */
                (offlineUser) => {
                    /* when someuser/friend went offline, user will be received here */
                    callback(enums.USER_OFFLINE, null, { guid: this.guid }, { user: offlineUser });
                }),
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes all the real time group listeners attached to the group that is opened
     * @return {?}
     */
    removeListeners() {
        try {
            CometChat.removeUserListener(this.userListenerId);
            CometChat.removeGroupListener(this.groupListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Creates a Group MemberList request object
     * @param {?} guid
     * @return {?}
     */
    createGroupMemberRequest(guid) {
        try {
            /** @type {?} */
            let groupMemberRequest = new CometChat.GroupMembersRequestBuilder(guid)
                .setLimit(10)
                .build();
            return groupMemberRequest;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches list of group member accroding to the group member request object
     * @return {?}
     */
    getGroupMembers() {
        try {
            /** @type {?} */
            const administratorsList = [];
            /** @type {?} */
            const moderatorsList = [];
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.loggedInUser = user;
                this.fetchNextGroupMembers()
                    .then((/**
                 * @param {?} groupMembers
                 * @return {?}
                 */
                (groupMembers) => {
                    groupMembers.forEach((/**
                     * @param {?} member
                     * @return {?}
                     */
                    (member) => {
                        if (member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
                            administratorsList.push(member);
                        }
                        if (member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
                            moderatorsList.push(member);
                        }
                    }));
                    this.memberList = [...this.memberList, ...groupMembers];
                    this.administratorsList = [
                        ...this.administratorsList,
                        ...administratorsList,
                    ];
                    this.moderatorsList = [...this.moderatorsList, ...moderatorsList];
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    logger("[CometChatGroupDetail] getGroupMembers fetchNextGroupMembers error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("[CometChatGroupDetail] getGroupMembers getLoggedInUser error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Creates a Banned MemberList request object
     * @param {?} guid
     * @return {?}
     */
    createBannedMemberRequest(guid) {
        try {
            /** @type {?} */
            let bannedGroupMemberRequest = new CometChat.BannedMembersRequestBuilder(guid)
                .setLimit(10)
                .build();
            return bannedGroupMemberRequest;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * fetches next list of group members as the user scrolls to the bottom
     * @return {?}
     */
    fetchNextGroupMembers() {
        try {
            return this.groupMemberRequest.fetchNext();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * fetches next list of Banned members as the user scrolls to the bottom of banned member list
     * @return {?}
     */
    fetchNextBannedGroupMembers() {
        try {
            return this.bannedGroupMemberRequest.fetchNext();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes the participant from the banned member list , when the member is unbanned
     * @param {?} members
     * @return {?}
     */
    unbanMembers(members) {
        try {
            /** @type {?} */
            const bannedMembers = [...this.bannedMemberList];
            /** @type {?} */
            const unbannedMembers = [];
            /** @type {?} */
            const filteredBannedMembers = bannedMembers.filter((/**
             * @param {?} bannedmember
             * @return {?}
             */
            (bannedmember) => {
                /** @type {?} */
                const found = members.find((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => bannedmember.uid === member.uid));
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
            this.bannedMemberList = [...filteredBannedMembers];
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * opens/closes view member modal
     * @return {?}
     */
    toggleViewMember() {
        try {
            this.openViewMember = !this.openViewMember;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * opens/closes ban member view
     * @return {?}
     */
    toggleBanMember() {
        try {
            this.openBanMember = !this.openBanMember;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * opens/closes add member view
     * @param {?} show
     * @return {?}
     */
    toggleAddMemberView(show) {
        try {
            this.openAddMemberView = show;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Close thread when opened in small screen
     * @return {?}
     */
    closeThreadView() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_DETAIL_CLICKED,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatGroupDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-details",
                template: "<div class=\"detailStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerCloseStyle\" (click)=\"closeThreadView()\"></div>\n    <h4 class=\"headerTitleStyle\">{{ DETAILS }}</h4>\n  </div>\n  <div class=\"detailPaneStyle\">\n    <!-- MEMBER SECTION BELOW-->\n    <div class=\"sectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">Members</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleViewMember()\">\n            {{ VIEW_MEMBERS }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"sectionContentStyle\" *ngIf=\"currentMemberScope == ADMIN\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleAddMemberView(true)\">\n            {{ ADD_MEMBERS }}\n          </div>\n        </div>\n      </div>\n\n      <div\n        class=\"sectionContentStyle\"\n        *ngIf=\"currentMemberScope == ADMIN || currentMemberScope == MODERATOR\"\n      >\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleBanMember()\">\n            {{ BANNED_MEMBERS }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- MEMBER SECTION ABOVE-->\n\n    <!-- OPTION SECTION BELOW-->\n    <div class=\"sectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">{{ OPTIONS }}</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"leaveGroup()\">\n            {{ LEAVE_GROUP }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"sectionContentStyle\" *ngIf=\"currentMemberScope == ADMIN\">\n        <div class=\"contentItemStyle\">\n          <div\n            class=\"itemLinkStyle itemDeleteLinkStyle\"\n            (click)=\"deleteGroup()\"\n          >\n            {{ DELETE_AND_EXIT }}\n          </div>\n        </div>\n      </div>\n      <!-- SHARED MEDIA SECTION BELOW-->\n      <div class=\"sharedMedia\">\n        <cometchat-shared-media\n          [item]=\"item\"\n          [type]=\"type\"\n        ></cometchat-shared-media>\n      </div>\n      <!-- SHARED MEDIA SECTION ABOVE-->\n    </div>\n    <!-- OPTION SECTION ABOVE-->\n  </div>\n\n  <!-- VIEW MEMBERS COMPONENT -->\n  <cometchat-view-group-member-list\n    *ngIf=\"openViewMember\"\n    [item]=\"item\"\n    [type]=\"type\"\n    [memberList]=\"memberList\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-view-group-member-list>\n\n  <!-- ADD MEMBERS COMPONENT -->\n  <cometchat-add-group-member-list\n    *ngIf=\"openAddMemberView\"\n    [item]=\"item\"\n    [type]=\"type\"\n    [friendsOnly]=\"false\"\n    [memberList]=\"memberList\"\n    [bannedMemberList]=\"bannedMemberList\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-add-group-member-list>\n\n  <!-- BANNED MEMBERS COMPONENT -->\n  <cometchat-ban-group-member-list-item\n    *ngIf=\"openBanMember\"\n    [item]=\"item\"\n    [bannedMemberList]=\"bannedMemberList\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-ban-group-member-list-item>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.detailStyle{height:100%;box-sizing:border-box}.detailStyle *{box-sizing:border-box}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea;display:flex;justify-content:flex-start;align-items:center}.headerCloseStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAlElEQVRIS+3TQQ6AIAwEwPZl+g56kZeJB/5pmmBCjEIXIfEAV5Mdu1CmwYcH59MEqg3/s6IY40ZEi4j42gjwBCl8T8FeREIJgYA8nJkP55xOUjxmoCVcZRPQGm4CvoTDABEFy8vJLwWuCEVMgP7R7XmaJzEDrQgEPCB9F+26PK2Lmdeui1bb2LfvcEUoNIFqY8MrOgHJVToZIc83egAAAABJRU5ErkJggg==) center center no-repeat;width:24px;height:24px}.headerTitleStyle{margin:0;font-weight:700;font-size:20px}.detailPaneStyle{margin:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;height:calc(100% - 70px)}.sectionStyle{width:100%;height:100%}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0}.sectionContentStyle:not(:last-of-type){margin-bottom:16px}.contentItemStyle{position:relative;display:flex;clear:both;width:100%;padding:6px 0}.contentItemStyle:first-of-type{padding-top:0}.contentItemStyle:last-of-type{padding-bottom:0}.itemLinkStyle{font-size:15px;line-height:20px;display:inline-block;cursor:pointer;font-weight:600}.itemDeleteLinkStyle{color:#ff3b30}.sharedMedia{height:100%;width:100%}@media (min-width:320px) and (max-width:767px){.headerCloseStyle{display:block}}"]
            }] }
];
/** @nocollapse */
CometChatGroupDetailsComponent.ctorParameters = () => [];
CometChatGroupDetailsComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.item;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.type;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.guid;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.groupMemberRequest;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.bannedGroupMemberRequest;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.userListenerId;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.groupListenerId;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.memberList;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.bannedMemberList;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.administratorsList;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.moderatorsList;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.openViewMember;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.openBanMember;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.openAddMemberView;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.currentMemberScope;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.ADMIN;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.MODERATOR;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.PARTICIPANT;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.ADD_MEMBERS;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.DELETE_AND_EXIT;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.LEAVE_GROUP;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.BANNED_MEMBERS;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.OPTIONS;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.VIEW_MEMBERS;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.DETAILS;
    /**
     * Fetches list of Banned members accroding to the  banned members request object
     * \@param
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.getBannedGroupMembers;
    /**
     * Updates group infomation based on activities happening in the group
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.groupUpdated;
    /**
     * Adds the members that are banned to bannedMemberList
     * \@param any members
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.banMembers;
    /**
     * Updates group member data and information based on group actions
     * \@param any member
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.groupMemberUpdated;
    /**
     * Helps to Add Particpants to the current group
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.addParticipants;
    /**
     * Updates Group Participant's data according to the group activities
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.updateParticipants;
    /**
     * Removes the participant from the group member list , when the member is banned
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.removeParticipants;
    /** @type {?} */
    CometChatGroupDetailsComponent.prototype.leaveGroup;
    /**
     * helps the user (that is admin of the group) to delete the group
     * \@param
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.deleteGroup;
    /**
     * Returns the role/scope that the current user has , for the group that is currently opened
     * \@param Any member
     * @type {?}
     */
    CometChatGroupDetailsComponent.prototype.checkMemberScope;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL0NvbWV0Q2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzL2NvbWV0Y2hhdC1ncm91cC1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2xELE1BQU0sT0FBTyw4QkFBOEI7SUFvQ3pDO1FBbkNTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVgsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDZCQUF3QixHQUFHLElBQUksQ0FBQztRQUVoQyxtQkFBYyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pFLG9CQUFlLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkUsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdB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Wiw0REFBMEI7O0lBQzFCLGtFQUFnQzs7SUFFaEMsd0RBQWlFOztJQUNqRSx5REFBbUU7O0lBRW5FLG9EQUFnQjs7SUFDaEIsMERBQXNCOztJQUN0Qiw0REFBd0I7O0lBQ3hCLHdEQUFvQjs7SUFDcEIsc0RBQW9COztJQUVwQix3REFBZ0M7O0lBQ2hDLHVEQUErQjs7SUFDL0IsMkRBQW1DOztJQUVuQyw0REFBZ0M7O0lBRWhDLCtDQUFtRDs7SUFDbkQsbURBQWtEOztJQUNsRCxxREFBc0Q7O0lBQ3RELHFEQUFzRDs7SUFDdEQseURBQThEOztJQUM5RCxxREFBc0Q7O0lBQ3RELHdEQUE0RDs7SUFDNUQsaURBQThDOztJQUM5QyxzREFBd0Q7O0lBQ3hELGlEQUE4Qzs7Ozs7O0lBMFE5QywrREErQkU7Ozs7O0lBS0Ysc0RBMkRFOzs7Ozs7SUFNRixvREFNRTs7Ozs7O0lBTUYsNERBOEJFOzs7OztJQTZCRix5REFtQkU7Ozs7O0lBS0YsNERBeUJFOzs7OztJQUtGLDREQXdCRTs7SUFpQ0Ysb0RBaUJFOzs7Ozs7SUFNRixxREFpQkU7Ozs7OztJQU1GLDBEQWtCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLWRldGFpbHNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtZGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWdyb3VwLWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0R3JvdXBEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ3VpZCA9IG51bGw7XG4gIGdyb3VwTWVtYmVyUmVxdWVzdCA9IG51bGw7XG4gIGJhbm5lZEdyb3VwTWVtYmVyUmVxdWVzdCA9IG51bGw7XG5cbiAgdXNlckxpc3RlbmVySWQgPSBlbnVtcy5HUk9VUF9ERVRBSUxfVVNFUl8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gZW51bXMuR1JPVVBfREVUQUlMX0dST1VQXyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIG1lbWJlckxpc3QgPSBbXTtcbiAgYmFubmVkTWVtYmVyTGlzdCA9IFtdO1xuICBhZG1pbmlzdHJhdG9yc0xpc3QgPSBbXTtcbiAgbW9kZXJhdG9yc0xpc3QgPSBbXTtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcblxuICBvcGVuVmlld01lbWJlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBvcGVuQmFuTWVtYmVyOiBib29sZWFuID0gZmFsc2U7XG4gIG9wZW5BZGRNZW1iZXJWaWV3OiBib29sZWFuID0gZmFsc2U7XG5cbiAgY3VycmVudE1lbWJlclNjb3BlOiBTdHJpbmcgPSBcIlwiO1xuXG4gIEFETUlOOiBTdHJpbmcgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLkFETUlOO1xuICBNT0RFUkFUT1I6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTU9ERVJBVE9SO1xuICBQQVJUSUNJUEFOVDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5QQVJUSUNJUEFOVDtcbiAgQUREX01FTUJFUlM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQUREX01FTUJFUlM7XG4gIERFTEVURV9BTkRfRVhJVDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5ERUxFVEVfQU5EX0VYSVQ7XG4gIExFQVZFX0dST1VQOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkxFQVZFX0dST1VQO1xuICBCQU5ORURfTUVNQkVSUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5CQU5ORURfTUVNQkVSUztcbiAgT1BUSU9OUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5PUFRJT05TO1xuICBWSUVXX01FTUJFUlM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuVklFV19NRU1CRVJTO1xuICBERVRBSUxTOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkRFVEFJTFM7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdyb3VwTWVtYmVyUmVxdWVzdCA9IHRoaXMuY3JlYXRlR3JvdXBNZW1iZXJSZXF1ZXN0KHRoaXMuaXRlbS5ndWlkKTtcbiAgICAgIHRoaXMuZ2V0R3JvdXBNZW1iZXJzKCk7XG5cbiAgICAgIHRoaXMuYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0ID0gdGhpcy5jcmVhdGVCYW5uZWRNZW1iZXJSZXF1ZXN0KFxuICAgICAgICB0aGlzLml0ZW0uZ3VpZFxuICAgICAgKTtcbiAgICAgIHRoaXMuZ2V0QmFubmVkR3JvdXBNZW1iZXJzKCk7XG5cbiAgICAgIHRoaXMuY3VycmVudE1lbWJlclNjb3BlID0gdGhpcy5jaGVja01lbWJlclNjb3BlKHRoaXMuaXRlbSk7XG5cbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5ncm91cFVwZGF0ZWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGVudW1zLk9QRU5fVklFV19NRU1CRVI6IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVZpZXdNZW1iZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkNMT1NFX0FERF9WSUVXX01FTUJFUjoge1xuICAgICAgICAgIHRoaXMudG9nZ2xlQWRkTWVtYmVyVmlldyhmYWxzZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5VUERBVEVfR1JPVVBfUEFSVElDSVBBTlRTOiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudHMoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5BRERfR1JPVVBfUEFSVElDSVBBTlRTOiB7XG4gICAgICAgICAgdGhpcy5hZGRQYXJ0aWNpcGFudHMoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5SRU1PVkVfR1JPVVBfUEFSVElDSVBBTlRTOiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVQYXJ0aWNpcGFudHMoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5CQU5fTUVNQkVSOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVCYW5NZW1iZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlVOQkFOX0dST1VQX01FTUJFUlM6XG4gICAgICAgICAgdGhpcy51bmJhbk1lbWJlcnMoZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiBncm91cCBpbiByZWFsIHRpbWVcbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuR3JvdXBMaXN0ZW5lcih7XG4gICAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgICBvbGRTY29wZSxcbiAgICAgICAgICAgIGNoYW5nZWRHcm91cFxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsIG1lc3NhZ2UsIGNoYW5nZWRHcm91cCwge1xuICAgICAgICAgICAgICB1c2VyOiBjaGFuZ2VkVXNlcixcbiAgICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIG1lc3NhZ2UsIGtpY2tlZEZyb20sIHtcbiAgICAgICAgICAgICAgdXNlcjoga2lja2VkVXNlcixcbiAgICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELCBtZXNzYWdlLCBiYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICAgIHVzZXI6IGJhbm5lZFVzZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJVbmJhbm5lZDogKFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHVuYmFubmVkVXNlcixcbiAgICAgICAgICAgIHVuYmFubmVkQnksXG4gICAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRCwgbWVzc2FnZSwgdW5iYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIG1lc3NhZ2UsIHVzZXJBZGRlZEluLCB7XG4gICAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgICAgaGFzSm9pbmVkOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQsIG1lc3NhZ2UsIGdyb3VwLCB7XG4gICAgICAgICAgICAgIHVzZXI6IGxlYXZpbmdVc2VyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIG1lc3NhZ2UsIGpvaW5lZEdyb3VwLCB7XG4gICAgICAgICAgICAgIHVzZXI6IGpvaW5lZFVzZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgICAgdGhpcy51c2VyTGlzdGVuZXJJZCxcbiAgICAgICAgbmV3IENvbWV0Q2hhdC5Vc2VyTGlzdGVuZXIoe1xuICAgICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIGNvbWVzIG9ubGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBlbnVtcy5VU0VSX09OTElORSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgeyBndWlkOiB0aGlzLmd1aWQgfSxcbiAgICAgICAgICAgICAgeyB1c2VyOiBvbmxpbmVVc2VyIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBlbnVtcy5VU0VSX09GRkxJTkUsXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHsgZ3VpZDogdGhpcy5ndWlkIH0sXG4gICAgICAgICAgICAgIHsgdXNlcjogb2ZmbGluZVVzZXIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIHJlYWwgdGltZSBncm91cCBsaXN0ZW5lcnMgYXR0YWNoZWQgdG8gdGhlIGdyb3VwIHRoYXQgaXMgb3BlbmVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgR3JvdXAgTWVtYmVyTGlzdCByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNyZWF0ZUdyb3VwTWVtYmVyUmVxdWVzdChndWlkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBncm91cE1lbWJlclJlcXVlc3QgPSBuZXcgQ29tZXRDaGF0Lkdyb3VwTWVtYmVyc1JlcXVlc3RCdWlsZGVyKGd1aWQpXG4gICAgICAgIC5zZXRMaW1pdCgxMClcbiAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgIHJldHVybiBncm91cE1lbWJlclJlcXVlc3Q7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgbGlzdCBvZiBncm91cCBtZW1iZXIgYWNjcm9kaW5nIHRvIHRoZSBncm91cCBtZW1iZXIgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRHcm91cE1lbWJlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFkbWluaXN0cmF0b3JzTGlzdCA9IFtdLFxuICAgICAgICBtb2RlcmF0b3JzTGlzdCA9IFtdO1xuICAgICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICAgIHRoaXMuZmV0Y2hOZXh0R3JvdXBNZW1iZXJzKClcbiAgICAgICAgICAgIC50aGVuKChncm91cE1lbWJlcnMpID0+IHtcbiAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZW1iZXIuc2NvcGUgPT09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuQURNSU4pIHtcbiAgICAgICAgICAgICAgICAgIGFkbWluaXN0cmF0b3JzTGlzdC5wdXNoKG1lbWJlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lbWJlci5zY29wZSA9PT0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5NT0RFUkFUT1IpIHtcbiAgICAgICAgICAgICAgICAgIG1vZGVyYXRvcnNMaXN0LnB1c2gobWVtYmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHRoaXMubWVtYmVyTGlzdCA9IFsuLi50aGlzLm1lbWJlckxpc3QsIC4uLmdyb3VwTWVtYmVyc107XG4gICAgICAgICAgICAgIHRoaXMuYWRtaW5pc3RyYXRvcnNMaXN0ID0gW1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuYWRtaW5pc3RyYXRvcnNMaXN0LFxuICAgICAgICAgICAgICAgIC4uLmFkbWluaXN0cmF0b3JzTGlzdCxcbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlcmF0b3JzTGlzdCA9IFsuLi50aGlzLm1vZGVyYXRvcnNMaXN0LCAuLi5tb2RlcmF0b3JzTGlzdF07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBmZXRjaE5leHRHcm91cE1lbWJlcnMgZXJyb3JcIixcbiAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICBcIltDb21ldENoYXRHcm91cERldGFpbF0gZ2V0R3JvdXBNZW1iZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEJhbm5lZCBNZW1iZXJMaXN0IHJlcXVlc3Qgb2JqZWN0XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY3JlYXRlQmFubmVkTWVtYmVyUmVxdWVzdChndWlkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBiYW5uZWRHcm91cE1lbWJlclJlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LkJhbm5lZE1lbWJlcnNSZXF1ZXN0QnVpbGRlcihcbiAgICAgICAgZ3VpZFxuICAgICAgKVxuICAgICAgICAuc2V0TGltaXQoMTApXG4gICAgICAgIC5idWlsZCgpO1xuXG4gICAgICByZXR1cm4gYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgQmFubmVkIG1lbWJlcnMgYWNjcm9kaW5nIHRvIHRoZSAgYmFubmVkIG1lbWJlcnMgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRCYW5uZWRHcm91cE1lbWJlcnMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLml0ZW0uc2NvcGUgPT09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTmV4dEJhbm5lZEdyb3VwTWVtYmVycygpXG4gICAgICAgICAgICAudGhlbigoYmFubmVkTWVtYmVycykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmJhbm5lZE1lbWJlckxpc3QgPSBbXG4gICAgICAgICAgICAgICAgLi4udGhpcy5iYW5uZWRNZW1iZXJMaXN0LFxuICAgICAgICAgICAgICAgIC4uLmJhbm5lZE1lbWJlcnMsXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBEZXRhaWxdIGdldEdyb3VwTWVtYmVycyBmZXRjaE5leHRHcm91cE1lbWJlcnMgZXJyb3JcIixcbiAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICBcIltDb21ldENoYXRHcm91cERldGFpbF0gZ2V0R3JvdXBNZW1iZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgZ3JvdXAgaW5mb21hdGlvbiBiYXNlZCBvbiBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiB0aGUgZ3JvdXBcbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChrZXkgPSBudWxsLCBtZXNzYWdlID0gbnVsbCwgZ3JvdXAgPSBudWxsLCBvcHRpb25zID0gbnVsbCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBndWlkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICBpZiAoZ3VpZCAhPT0gZ3JvdXAuZ3VpZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9PTkxJTkU6XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9PRkZMSU5FOlxuICAgICAgICAgIHRoaXMuZ3JvdXBNZW1iZXJVcGRhdGVkKG9wdGlvbnMudXNlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTWVtYmVyID0gT2JqZWN0LmFzc2lnbih7fSwgbWVtYmVyLCB7XG4gICAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkUGFydGljaXBhbnRzKFt1cGRhdGVkTWVtYmVyXSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVDpcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGFydGljaXBhbnRzKG1lbWJlciwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcbiAgICAgICAgICAgIHRoaXMuYmFuTWVtYmVycyhbbWVtYmVyXSk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBhcnRpY2lwYW50cyhtZW1iZXIsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVEOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlciA9IG9wdGlvbnMudXNlcjtcbiAgICAgICAgICAgIHRoaXMudW5iYW5NZW1iZXJzKFttZW1iZXJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgbWVtYmVyID0gb3B0aW9ucy51c2VyO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZE1lbWJlciA9IE9iamVjdC5hc3NpZ24oe30sIG1lbWJlciwge1xuICAgICAgICAgICAgICBzY29wZTogb3B0aW9uc1tlbnVtcy5TQ09QRV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRzKHVwZGF0ZWRNZW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIG1lbWJlcnMgdGhhdCBhcmUgYmFubmVkIHRvIGJhbm5lZE1lbWJlckxpc3RcbiAgICogQHBhcmFtIGFueSBtZW1iZXJzXG4gICAqL1xuICBiYW5NZW1iZXJzID0gKG1lbWJlcnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5iYW5uZWRNZW1iZXJMaXN0ID0gWy4uLnRoaXMuYmFubmVkTWVtYmVyTGlzdCwgLi4ubWVtYmVyc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGdyb3VwIG1lbWJlciBkYXRhIGFuZCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBncm91cCBhY3Rpb25zXG4gICAqIEBwYXJhbSBhbnkgbWVtYmVyXG4gICAqL1xuICBncm91cE1lbWJlclVwZGF0ZWQgPSAobWVtYmVyKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBtZW1iZXJMaXN0ID0gWy4uLnRoaXMubWVtYmVyTGlzdF07XG4gICAgICAvL3NlYXJjaCBmb3IgdXNlclxuICAgICAgbGV0IG1lbWJlcktleSA9IG1lbWJlckxpc3QuZmluZEluZGV4KChtLCBrKSA9PiBtLnVpZCA9PT0gbWVtYmVyLnVpZCk7XG4gICAgICAvL2lmIGZvdW5kIGluIHRoZSBsaXN0LCB1cGRhdGUgdXNlciBvYmplY3RcbiAgICAgIGlmIChtZW1iZXJLZXkgPiAtMSkge1xuICAgICAgICBsZXQgbWVtYmVyT2JqID0gbWVtYmVyTGlzdFttZW1iZXJLZXldO1xuICAgICAgICBsZXQgbmV3TWVtYmVyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWVtYmVyT2JqLCBtZW1iZXIpO1xuICAgICAgICBtZW1iZXJMaXN0LnNwbGljZShtZW1iZXJLZXksIDEsIG5ld01lbWJlck9iaik7XG5cbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gbWVtYmVyTGlzdDtcbiAgICAgIH1cblxuICAgICAgbGV0IGJhbm5lZE1lbWJlckxpc3QgPSBbLi4udGhpcy5iYW5uZWRNZW1iZXJMaXN0XTtcbiAgICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgICBsZXQgYmFubmVkTWVtYmVyS2V5ID0gYmFubmVkTWVtYmVyTGlzdC5maW5kSW5kZXgoXG4gICAgICAgIChtLCBrKSA9PiBtLnVpZCA9PT0gbWVtYmVyLnVpZFxuICAgICAgKTtcbiAgICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgICAgaWYgKGJhbm5lZE1lbWJlcktleSA+IC0xKSB7XG4gICAgICAgIGxldCBiYW5uZWRNZW1iZXJPYmogPSBiYW5uZWRNZW1iZXJMaXN0W2Jhbm5lZE1lbWJlcktleV07XG4gICAgICAgIGxldCBuZXdCYW5uZWRNZW1iZXJPYmogPSBPYmplY3QuYXNzaWduKHt9LCBiYW5uZWRNZW1iZXJPYmosIG1lbWJlcik7XG4gICAgICAgIGJhbm5lZE1lbWJlckxpc3Quc3BsaWNlKGJhbm5lZE1lbWJlcktleSwgMSwgbmV3QmFubmVkTWVtYmVyT2JqKTtcblxuICAgICAgICB0aGlzLmJhbm5lZE1lbWJlckxpc3QgPSBiYW5uZWRNZW1iZXJMaXN0O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogZmV0Y2hlcyBuZXh0IGxpc3Qgb2YgZ3JvdXAgbWVtYmVycyBhcyB0aGUgdXNlciBzY3JvbGxzIHRvIHRoZSBib3R0b21cbiAgICogQHBhcmFtXG4gICAqL1xuICBmZXRjaE5leHRHcm91cE1lbWJlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmdyb3VwTWVtYmVyUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZmV0Y2hlcyBuZXh0IGxpc3Qgb2YgQmFubmVkIG1lbWJlcnMgYXMgdGhlIHVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tIG9mIGJhbm5lZCBtZW1iZXIgbGlzdFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGZldGNoTmV4dEJhbm5lZEdyb3VwTWVtYmVycygpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuYmFubmVkR3JvdXBNZW1iZXJSZXF1ZXN0LmZldGNoTmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwcyB0byBBZGQgUGFydGljcGFudHMgdG8gdGhlIGN1cnJlbnQgZ3JvdXBcbiAgICovXG4gIGFkZFBhcnRpY2lwYW50cyA9IChtZW1iZXJzLCB0cmlnZ2VyVXBkYXRlID0gdHJ1ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZW1iZXJMaXN0ID0gWy4uLnRoaXMubWVtYmVyTGlzdCwgLi4ubWVtYmVyc107XG5cbiAgICAgIHRoaXMubWVtYmVyTGlzdCA9IG1lbWJlckxpc3Q7XG5cbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJTX0FEREVELFxuICAgICAgICBwYXlMb2FkOiBtZW1iZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAodHJpZ2dlclVwZGF0ZSkge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJTX1VQREFURUQsXG4gICAgICAgICAgcGF5TG9hZDogeyBpdGVtOiB0aGlzLml0ZW0sIGNvdW50OiBtZW1iZXJMaXN0Lmxlbmd0aCB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgR3JvdXAgUGFydGljaXBhbnQncyBkYXRhIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgYWN0aXZpdGllc1xuICAgKi9cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHVwZGF0ZWRNZW1iZXIpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVtYmVyTGlzdCA9IFsuLi50aGlzLm1lbWJlckxpc3RdO1xuXG4gICAgICBjb25zdCBtZW1iZXJLZXkgPSBtZW1iZXJMaXN0LmZpbmRJbmRleChcbiAgICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLnVpZCA9PT0gdXBkYXRlZE1lbWJlci51aWRcbiAgICAgICk7XG4gICAgICBpZiAobWVtYmVyS2V5ID4gLTEpIHtcbiAgICAgICAgY29uc3QgbWVtYmVyT2JqID0gbWVtYmVyTGlzdFttZW1iZXJLZXldO1xuICAgICAgICBjb25zdCBuZXdNZW1iZXJPYmogPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXJPYmosIHVwZGF0ZWRNZW1iZXIsIHtcbiAgICAgICAgICBzY29wZTogdXBkYXRlZE1lbWJlcltlbnVtcy5TQ09QRV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lbWJlckxpc3Quc3BsaWNlKG1lbWJlcktleSwgMSwgbmV3TWVtYmVyT2JqKTtcblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJfU0NPUEVfQ0hBTkdFRCxcbiAgICAgICAgICBwYXlMb2FkOiBbbmV3TWVtYmVyT2JqXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gWy4uLm1lbWJlckxpc3RdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgcGFydGljaXBhbnQgZnJvbSB0aGUgZ3JvdXAgbWVtYmVyIGxpc3QgLCB3aGVuIHRoZSBtZW1iZXIgaXMgYmFubmVkXG4gICAqL1xuICByZW1vdmVQYXJ0aWNpcGFudHMgPSAobWVtYmVyLCB0cmlnZ2VyVXBkYXRlID0gdHJ1ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBncm91cG1lbWJlcnMgPSBbLi4udGhpcy5tZW1iZXJMaXN0XTtcbiAgICAgIGNvbnN0IGZpbHRlcmVkTWVtYmVycyA9IGdyb3VwbWVtYmVycy5maWx0ZXIoKGdyb3VwbWVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChncm91cG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gWy4uLmZpbHRlcmVkTWVtYmVyc107XG5cbiAgICAgIGlmICh0cmlnZ2VyVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLk1FTUJFUlNfVVBEQVRFRCxcbiAgICAgICAgICBwYXlMb2FkOiB7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgICAgICAgICBjb3VudDogZmlsdGVyZWRNZW1iZXJzLmxlbmd0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHBhcnRpY2lwYW50IGZyb20gdGhlIGJhbm5lZCBtZW1iZXIgbGlzdCAsIHdoZW4gdGhlIG1lbWJlciBpcyB1bmJhbm5lZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHVuYmFuTWVtYmVycyhtZW1iZXJzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhbm5lZE1lbWJlcnMgPSBbLi4udGhpcy5iYW5uZWRNZW1iZXJMaXN0XTtcbiAgICAgIGNvbnN0IHVuYmFubmVkTWVtYmVycyA9IFtdO1xuXG4gICAgICBjb25zdCBmaWx0ZXJlZEJhbm5lZE1lbWJlcnMgPSBiYW5uZWRNZW1iZXJzLmZpbHRlcigoYmFubmVkbWVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gbWVtYmVycy5maW5kKChtZW1iZXIpID0+IGJhbm5lZG1lbWJlci51aWQgPT09IG1lbWJlci51aWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICB1bmJhbm5lZE1lbWJlcnMucHVzaChmb3VuZCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5NRU1CRVJfVU5CQU5ORUQsXG4gICAgICAgIHBheUxvYWQ6IHVuYmFubmVkTWVtYmVycyxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmJhbm5lZE1lbWJlckxpc3QgPSBbLi4uZmlsdGVyZWRCYW5uZWRNZW1iZXJzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyogaGVscHMgdGhlIHVzZXIgdG8gbGVhdmUgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbGVhdmVHcm91cCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgQ29tZXRDaGF0LmxlYXZlR3JvdXAoZ3VpZClcbiAgICAgICAgLnRoZW4oKGhhc0xlZnQpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJHcm91cCBsZWZ0IHN1Y2Nlc3NmdWxseTpcIiwgaGFzTGVmdCk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5MRUZUX0dST1VQLFxuICAgICAgICAgICAgcGF5TG9hZDogdGhpcy5pdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiR3JvdXAgbGVhdmluZyBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBoZWxwcyB0aGUgdXNlciAodGhhdCBpcyBhZG1pbiBvZiB0aGUgZ3JvdXApIHRvIGRlbGV0ZSB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBkZWxldGVHcm91cCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgQ29tZXRDaGF0LmRlbGV0ZUdyb3VwKGd1aWQpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIkdyb3VwcyBkZWxldGVkIHN1Y2Nlc3NmdWxseTpcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuREVMRVRFX0dST1VQLFxuICAgICAgICAgICAgcGF5TG9hZDogdGhpcy5pdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiR3JvdXAgZGVsZXRlIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvbGUvc2NvcGUgdGhhdCB0aGUgY3VycmVudCB1c2VyIGhhcyAsIGZvciB0aGUgZ3JvdXAgdGhhdCBpcyBjdXJyZW50bHkgb3BlbmVkXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyXG4gICAqL1xuICBjaGVja01lbWJlclNjb3BlID0gKGdyb3VwKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vZ3JvdXAuc2NvcGUgaXMga2V5IHdoaWNoIGhvbGRzIHRoZSByb2xlIG9mIHRoZSBjdXJyZW50IHVzZXIgaW4gdGhpcyBncm91cFxuXG4gICAgICBpZiAoZ3JvdXAuc2NvcGUgPT0gQ09NRVRDSEFUX0NPTlNUQU5UUy5PV05FUikge1xuICAgICAgICByZXR1cm4gdGhpcy5BRE1JTjtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwLnNjb3BlID09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuQURNSU4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuQURNSU47XG4gICAgICB9IGVsc2UgaWYgKGdyb3VwLnNjb3BlID09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuTU9ERVJBVE9SKSB7XG4gICAgICAgIHJldHVybiB0aGlzLk1PREVSQVRPUjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLlBBUlRJQ0lQQU5UO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogb3BlbnMvY2xvc2VzIHZpZXcgbWVtYmVyIG1vZGFsXG4gICAqL1xuICB0b2dnbGVWaWV3TWVtYmVyKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm9wZW5WaWV3TWVtYmVyID0gIXRoaXMub3BlblZpZXdNZW1iZXI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG9wZW5zL2Nsb3NlcyBiYW4gbWVtYmVyIHZpZXdcbiAgICovXG4gIHRvZ2dsZUJhbk1lbWJlcigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5vcGVuQmFuTWVtYmVyID0gIXRoaXMub3BlbkJhbk1lbWJlcjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogb3BlbnMvY2xvc2VzIGFkZCBtZW1iZXIgdmlld1xuICAgKi9cbiAgdG9nZ2xlQWRkTWVtYmVyVmlldyhzaG93KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3BlbkFkZE1lbWJlclZpZXcgPSBzaG93O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aHJlYWQgd2hlbiBvcGVuZWQgaW4gc21hbGwgc2NyZWVuXG4gICAqL1xuICBjbG9zZVRocmVhZFZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19