/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-group-list/cometchat-group-list/cometchat-group-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Output, EventEmitter, Input, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatGroupListComponent {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.enableSelectedGroupStyling = false;
        this.groupToUpdate = null;
        this.groupToLeave = null;
        this.groupToDelete = null;
        this.loggedInUser = null;
        this.decoratorMessage = "";
        this.searchKey = "";
        this.selectedGroup = null;
        this.groupList = [];
        this.groupRequest = null;
        this.groupListenerId = enums.GROUP_LIST_ + new Date().getTime();
        this.openCreateGroupView = false;
        this.GROUPS = COMETCHAT_CONSTANTS.GROUPS;
        this.SEARCH = COMETCHAT_CONSTANTS.SEARCH;
        this.onGroupClick = new EventEmitter();
        /**
         * Fetches list of groups according to the group request config , if a user is loggedIn correctly
         */
        this.getGroups = (/**
         * @return {?}
         */
        () => {
            try {
                this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
                CometChat.getLoggedinUser()
                    .then((/**
                 * @param {?} user
                 * @return {?}
                 */
                (user) => {
                    this.loggedInUser = user;
                    this.fetchNextGroups()
                        .then((/**
                     * @param {?} groupList
                     * @return {?}
                     */
                    (groupList) => {
                        if (groupList.length === 0) {
                            this.decoratorMessage = COMETCHAT_CONSTANTS.NO_GROUPS_FOUND;
                        }
                        this.groupList = [...this.groupList, ...groupList];
                        this.decoratorMessage = "";
                        if (this.groupList.length === 0) {
                            this.decoratorMessage = COMETCHAT_CONSTANTS.NO_GROUPS_FOUND;
                        }
                    }))
                        .catch((/**
                     * @param {?} error
                     * @return {?}
                     */
                    (error) => {
                        this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                        logger("[CometChatGroupList] getGroups fetchNextGroups error", error);
                    }));
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                    logger("[CometChatGroupList] getUsers getLoggedInUser error", error);
                }));
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Fetches list of groups according to the group request config
         * @param Event action
         */
        this.createGroupActionHandler = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            try {
                /** @type {?} */
                const groupList = [group, ...this.groupList];
                this.groupList = groupList;
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates group information based on activities in the group
         */
        this.groupUpdated = (/**
         * @param {?} key
         * @param {?} message
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (key, message, group, options) => {
            try {
                switch (key) {
                    case enums.GROUP_MEMBER_SCOPE_CHANGED:
                        this.updateMemberChanged(group, options);
                        break;
                    case enums.GROUP_MEMBER_KICKED:
                    case enums.GROUP_MEMBER_BANNED:
                    case enums.GROUP_MEMBER_LEFT:
                        this.updateMemberRemoved(group, options);
                        break;
                    case enums.GROUP_MEMBER_ADDED:
                        this.updateMemberAdded(group, options);
                        break;
                    case enums.GROUP_MEMBER_JOINED:
                        this.updateMemberJoined(group, options);
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
         * Updates the member count of a group when a person is removed from the group
         */
        this.updateMemberRemoved = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            try {
                /** @type {?} */
                let groupList = [...this.groupList];
                //search for group
                /** @type {?} */
                let groupKey = groupList.findIndex((/**
                 * @param {?} g
                 * @param {?} k
                 * @return {?}
                 */
                (g, k) => g.guid === group.guid));
                if (groupKey > -1) {
                    if (options && this.loggedInUser.uid === options.user.uid) {
                        /** @type {?} */
                        let groupObj = Object.assign({}, groupList[groupKey]);
                        /** @type {?} */
                        let newgroupObj = Object.assign({}, groupObj, group);
                        groupList.splice(groupKey, 1, newgroupObj);
                        this.groupList = groupList;
                    }
                    else {
                        /** @type {?} */
                        let groupObj = Object.assign({}, groupList[groupKey]);
                        /** @type {?} */
                        let membersCount = parseInt(group.membersCount);
                        /** @type {?} */
                        let newgroupObj = Object.assign({}, groupObj, {
                            membersCount: membersCount,
                        });
                        groupList.splice(groupKey, 1, newgroupObj);
                        this.groupList = groupList;
                    }
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates the member count of a group when a person (  or group of people  ) is added to the group
         */
        this.updateMemberAdded = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            try {
                /** @type {?} */
                let groupList = [...this.groupList];
                //search for group
                /** @type {?} */
                let groupKey = groupList.findIndex((/**
                 * @param {?} g
                 * @param {?} k
                 * @return {?}
                 */
                (g, k) => g.guid === group.guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    let groupObj = Object.assign({}, groupList[groupKey]);
                    /** @type {?} */
                    let membersCount = parseInt(group.membersCount);
                    /** @type {?} */
                    let scope = group.hasOwnProperty(enums.SCOPE) ? group.scope : "";
                    /** @type {?} */
                    let hasJoined = group.hasOwnProperty(enums.HAS_JOINED)
                        ? group.hasJoined
                        : false;
                    if (options && this.loggedInUser.uid === options.user.uid) {
                        scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                        hasJoined = true;
                    }
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        scope: scope,
                        hasJoined: hasJoined,
                    });
                    groupList.splice(groupKey, 1, newgroupObj);
                    this.groupList = groupList;
                }
                else {
                    /** @type {?} */
                    let groupObj = Object.assign({}, group);
                    /** @type {?} */
                    let scope = groupObj.hasOwnProperty(enums.SCOPE) ? groupObj.scope : {};
                    /** @type {?} */
                    let hasJoined = groupObj.hasOwnProperty(enums.HAS_JOINED)
                        ? groupObj.hasJoined
                        : false;
                    /** @type {?} */
                    let membersCount = parseInt(groupObj.membersCount);
                    if (options && this.loggedInUser.uid === options.user.uid) {
                        scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                        hasJoined = true;
                    }
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        scope: scope,
                        hasJoined: hasJoined,
                    });
                    /** @type {?} */
                    const groupList = [newgroupObj, ...this.groupList];
                    this.groupList = groupList;
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates the member count of a group based when a user joins the group
         */
        this.updateMemberJoined = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            try {
                /** @type {?} */
                let groupList = [...this.groupList];
                //search for group
                /** @type {?} */
                let groupKey = groupList.findIndex((/**
                 * @param {?} g
                 * @param {?} k
                 * @return {?}
                 */
                (g, k) => g.guid === group.guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    let groupObj = Object.assign({}, groupList[groupKey]);
                    /** @type {?} */
                    let scope = groupObj.scope;
                    /** @type {?} */
                    let membersCount = parseInt(group.membersCount);
                    if (options && this.loggedInUser.uid === options.user.uid) {
                        scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                    }
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        scope: scope,
                    });
                    groupList.splice(groupKey, 1, newgroupObj);
                    this.groupList = groupList;
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Updates the member count of a group based on activities happening in the group
         */
        this.updateMemberChanged = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            try {
                /** @type {?} */
                let groupList = [...this.groupList];
                //search for group
                /** @type {?} */
                let groupKey = groupList.findIndex((/**
                 * @param {?} g
                 * @param {?} k
                 * @return {?}
                 */
                (g, k) => g.guid === group.guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    let groupObj = Object.assign({}, groupList[groupKey]);
                    if (options && this.loggedInUser.uid === options.user.uid) {
                        /** @type {?} */
                        let newgroupObj = Object.assign({}, groupObj, {
                            scope: options.scope,
                        });
                        groupList.splice(groupKey, 1, newgroupObj);
                        this.groupList = groupList;
                    }
                }
            }
            catch (error) {
                logger(error);
            }
        });
        setInterval((/**
         * @return {?}
         */
        () => {
            if (!this.ref[enums.DESTROYED]) {
                this.ref.detectChanges();
            }
        }), 5000);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.GROUP_TO_UPDATE]) {
                /** @type {?} */
                let prevProps = { groupToUpdate: null };
                /** @type {?} */
                let props = { groupToUpdate: null };
                prevProps[enums.GROUP_TO_UPDATE] =
                    change[enums.GROUP_TO_UPDATE].previousValue;
                props[enums.GROUP_TO_UPDATE] =
                    change[enums.GROUP_TO_UPDATE].currentValue;
                if (prevProps.groupToUpdate &&
                    (prevProps.groupToUpdate.guid !== props.groupToUpdate.guid ||
                        (prevProps.groupToUpdate.guid === props.groupToUpdate.guid &&
                            (prevProps.groupToUpdate.membersCount !==
                                props.groupToUpdate.membersCount ||
                                prevProps.groupToUpdate.scope !== props.groupToUpdate.scope)))) {
                    /** @type {?} */
                    const groups = [...this.groupList];
                    /** @type {?} */
                    const groupToUpdate = this.groupToUpdate;
                    /** @type {?} */
                    const groupKey = groups.findIndex((/**
                     * @param {?} group
                     * @return {?}
                     */
                    (group) => group.guid === groupToUpdate.guid));
                    if (groupKey > -1) {
                        /** @type {?} */
                        const groupObj = groups[groupKey];
                        /** @type {?} */
                        const newGroupObj = Object.assign({}, groupObj, groupToUpdate, {
                            scope: groupToUpdate[enums.SCOPE],
                            membersCount: groupToUpdate[enums.MEMBERS_COUNT],
                        });
                        groups.splice(groupKey, 1, newGroupObj);
                        this.groupList = groups;
                    }
                }
            }
            if (change[enums.GROUP_TO_LEAVE]) {
                /** @type {?} */
                let prevProps = { groupToLeave: null };
                /** @type {?} */
                let props = { groupToLeave: null };
                prevProps[enums.GROUP_TO_LEAVE] =
                    change[enums.GROUP_TO_LEAVE].previousValue;
                props[enums.GROUP_TO_LEAVE] = change[enums.GROUP_TO_LEAVE].currentValue;
                if (prevProps.groupToLeave &&
                    prevProps.groupToLeave.guid !== props.groupToLeave.guid) {
                    /** @type {?} */
                    const groups = [...this.groupList];
                    /** @type {?} */
                    const groupKey = groups.findIndex((/**
                     * @param {?} member
                     * @return {?}
                     */
                    (member) => member.guid === props.groupToLeave.guid));
                    if (groupKey > -1) {
                        /** @type {?} */
                        const groupToLeave = props.groupToLeave;
                        /** @type {?} */
                        const groupObj = Object.assign({}, groups[groupKey]);
                        /** @type {?} */
                        const membersCount = parseInt(groupToLeave[enums.MEMBERS_COUNT]) - 1;
                        /** @type {?} */
                        let newgroupObj = Object.assign({}, groupObj, {
                            membersCount: membersCount,
                            hasJoined: false,
                        });
                        groups.splice(groupKey, 1, newgroupObj);
                        this.groupList = groups;
                    }
                }
            }
            if (change[enums.GROUP_TO_DELETE]) {
                /** @type {?} */
                let prevProps = { groupToDelete: null };
                /** @type {?} */
                let props = { groupToDelete: null };
                prevProps[enums.GROUP_TO_DELETE] =
                    change[enums.GROUP_TO_DELETE].previousValue;
                props[enums.GROUP_TO_DELETE] =
                    change[enums.GROUP_TO_DELETE].currentValue;
                if (prevProps.groupToDelete &&
                    prevProps.groupToDelete.guid !== props.groupToDelete.guid) {
                    /** @type {?} */
                    const groups = [...this.groupList];
                    /** @type {?} */
                    const groupKey = groups.findIndex((/**
                     * @param {?} member
                     * @return {?}
                     */
                    (member) => member.guid === props.groupToDelete.guid));
                    if (groupKey > -1) {
                        groups.splice(groupKey, 1);
                        this.groupList = groups;
                        if (groups.length === 0) {
                            this.decoratorMessage = COMETCHAT_CONSTANTS.NO_GROUPS_FOUND;
                        }
                    }
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.groupRequest = this.groupListRequestBuilder(this.searchKey);
            this.getGroups();
            this.attachListeners(this.groupUpdated);
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
            //Removing Group Listeners
            CometChat.removeGroupListener(this.groupListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listener for group activities happening in real time
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
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
                        hasJoined: false,
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Builds a request for fetching a list of group matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    groupListRequestBuilder(searchKey = "") {
        try {
            /** @type {?} */
            let groupRequest = null;
            if (searchKey !== "") {
                groupRequest = new CometChat.GroupsRequestBuilder()
                    .setLimit(30)
                    .setSearchKeyword(searchKey)
                    .build();
            }
            else {
                groupRequest = new CometChat.GroupsRequestBuilder()
                    .setLimit(30)
                    .build();
            }
            return groupRequest;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches list of groups according to the group request config
     * @return {?}
     */
    fetchNextGroups() {
        try {
            return this.groupRequest.fetchNext();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        try {
            if (group.hasJoined === false) {
                /** @type {?} */
                let password = "";
                if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
                    password = prompt(COMETCHAT_CONSTANTS.ENTER_YOUR_PASSWORD);
                }
                /** @type {?} */
                const guid = group.guid;
                /** @type {?} */
                const groupType = group.type;
                this.joinGroup(guid, groupType, password);
            }
            else {
                this.onGroupClick.emit(group);
                if (this.enableSelectedGroupStyling) {
                    this.selectedGroup = group;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param {?} guid
     * @param {?} groupType
     * @param {?} password
     * @return {?}
     */
    joinGroup(guid, groupType, password) {
        try {
            CometChat.joinGroup(guid, groupType, password)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                logger("Group joining success with response", response);
                /** @type {?} */
                const groups = [...this.groupList];
                /** @type {?} */
                let groupKey = groups.findIndex((/**
                 * @param {?} g
                 * @param {?} k
                 * @return {?}
                 */
                (g, k) => g.guid === guid));
                if (groupKey > -1) {
                    /** @type {?} */
                    const groupObj = groups[groupKey];
                    /** @type {?} */
                    const newGroupObj = Object.assign({}, groupObj, response, {
                        scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
                    });
                    groups.splice(groupKey, 1, newGroupObj);
                    this.groupList = groups;
                    if (this.enableSelectedGroupStyling) {
                        this.selectedGroup = newGroupObj;
                    }
                    this.onGroupClick.emit(newGroupObj);
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("Group joining failed with exception:", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Searches for a list of groups matching the search key
     * @param {?} event
     * @return {?}
     */
    searchGroup(event) {
        try {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            /** @type {?} */
            let val = event.target.value;
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => {
                this.groupRequest = this.groupListRequestBuilder(val);
                this.groupList = [];
                this.getGroups();
            }), 1000);
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
                case enums.CLOSE_CREATE_GROUP_VIEW: {
                    this.toggleCreateGroupView();
                    break;
                }
                case enums.GROUP_CREATED: {
                    this.toggleCreateGroupView();
                    this.createGroupActionHandler(data);
                    break;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
                Math.round(e.currentTarget.clientHeight);
            if (bottom)
                this.getGroups();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @return {?}
     */
    toggleCreateGroupView() {
        try {
            this.openCreateGroupView = !this.openCreateGroupView;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatGroupListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-list",
                template: "<div class=\"groupWrapperStyle\">\n  <div class=\"groupHeaderStyle\">\n    <!-- enableCloseMenu -->\n\n    <h4 class=\"groupHeaderTitleStyle\">{{ GROUPS }}</h4>\n    <div class=\"groupAddStyle\" (click)=\"toggleCreateGroupView()\"></div>\n  </div>\n  <div class=\"groupSearchStyle\">\n    <input\n      class=\"groupSearchInputStyle\"\n      type=\"text\"\n      autoComplete=\"off\"\n      [placeholder]=\"SEARCH\"\n      (keyup)=\"searchGroup($event)\"\n    />\n  </div>\n  <div class=\"groupMsgStyle\">\n    <p class=\"groupMsgTxtStyle\">{{ decoratorMessage }}</p>\n  </div>\n  <div class=\"groupListStyle\" (scroll)=\"handleScroll($event)\">\n    <div *ngFor=\"let group of groupList\">\n      <cometchat-group-list-item\n        [group]=\"group\"\n        [selectedGroup]=\"this.selectedGroup\"\n        (onGroupClick)=\"groupClicked($event)\"\n      ></cometchat-group-list-item>\n    </div>\n  </div>\n  <!-- create group component -->\n  <cometchat-create-group\n    *ngIf=\"openCreateGroupView\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-create-group>\n  <!-- create group component -->\n</div>\n",
                styles: [".groupWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.groupWrapperStyle *{box-sizing:border-box}.groupWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.groupWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.groupWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.groupWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.groupHeaderStyle{padding:19px 16px;position:relative;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.groupHeaderTitleStyle{margin:0;font-weight:700;display:inline-block;width:66%;text-align:left;font-size:20px}.groupAddStyle{display:block;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAeFBMVEUAAABAgP8rqv85jv8ul/8vl/8wmP8ym/8ym/81mv8zmf8ym/8ymv80mP8ymv8zmf8ymv8ymf8zmv8ymf80mf80mf8zmP8zmf8zmv8ymf8zmf8zmv8zmv80mf8zmv8zmf8zmf8zmf8zmf8zmf8zmf8zmf8zmf/////XSN39AAAAJnRSTlMABAYJFhslKTM6PD1HSkxQW3B0f4CFhoeIiYyNl7K13+Tl5uf5/CHECsUAAAABYktHRCctD6gjAAAAeElEQVQY063QRw7CQBBE0c8AJuc0RLsJdf8jsmBst+0tf/mkUksN7TaPQcfGH20J56fKdhCX63xIlLer3os+mCb19iIVGSDVdpReI5pYmcNke4+lyeEhbeVwnu428K48o423VY8OVv0DTVNvMxn41/06ASGaJ4sBvjRIFQwF9sW5AAAAAElFTkSuQmCC) right center no-repeat;cursor:pointer;width:35%}.groupSearchStyle{padding:16px;position:relative}.groupSearchInputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;line-height:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACeklEQVQ4EaWUz2sTURDH3U3SNAoqJWIRPVQwURAv5uChl0DxUA8RwZANSPHir4Mg8eJ/UPxBD2L0aiXZkFM1EgkeQhEVJQj+OJlbFXPzEg+FJLt+Zrtbdp/5gfTB5M3Md+Y78+a9jbZryCqXywdxLyELyBHbti1N0zbQG+FweDWbzf5GH7k0FSmVSjkIHkE0w/4DvI3oyHF8s+ydUCh0JZfLvUQfurZJq9VqqN/vPyPRgOwbctUwjHdeFn7NNM0F9if4juq6/hj8hof7d+nAWRDedQmLHPG0n1ACKGLn8/nX8Xj8FLppWdZ1xnRnKzv463RaqVRODgaDz0AfI5HIPDMbBMOCVrPZnO50Op9oYo6OEzQgY9peTqdUvUl1i1ktTSKUzHQ6vUn8ZdRp5Jr4/Ms7/iJV3zD8735wnE53H8C/0tCiGqdzQVM4D1H5iwpOsiUHmVPjpNMputSQTRWcZLs5MoLA0pnhH6qJ/FMxEDnEkByIf6mQN9N1wLO1Wm23GjDK5jnFweaRdTXGIYXwKcD+bre7rAaMsR+SJ/dRUmM0cQDK1/IW9Qzv7hyv4JUa6LeJvcStr3L8F3wQGT8mutMpoB2NRrPYHYJrfP/L7qsIxDcajT0QFoXQBbRWqxUJBGE4nXpOiA70ej35ti8gG8ga0qZ7HaITFD/PqWbZ2+zHwGQ9TyaTF1OpVG/LVEg9J5dgkHSL5JSMxvVb7O/hLzIek0+7QKF7LhYg9hI8vsBO5/v4ozksjcZisZ+ZTKbrD2AUt4cRjyX1E4zSOVWB09wXnJOtJRKJ7I5JhcxPjLni3L4AO1k8qwd0WUBseMb+bf53nXq9vleS/gKeNA5lPSUj0AAAAABJRU5ErkJggg==) 4px center no-repeat rgba(20,20,20,.04)}.groupMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.groupMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px;font-weight:600}.groupListStyle{height:calc(100% - 125px);overflow-y:scroll;margin:0;padding:0}@media (min-width:320px) and (max-width:767px){.groupHeaderCloseStyle{display:block!important}}"]
            }] }
];
/** @nocollapse */
CometChatGroupListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometChatGroupListComponent.propDecorators = {
    enableSelectedGroupStyling: [{ type: Input }],
    groupToUpdate: [{ type: Input }],
    groupToLeave: [{ type: Input }],
    groupToDelete: [{ type: Input }],
    onGroupClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatGroupListComponent.prototype.enableSelectedGroupStyling;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatGroupListComponent.prototype.timeout;
    /** @type {?} */
    CometChatGroupListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatGroupListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatGroupListComponent.prototype.searchKey;
    /** @type {?} */
    CometChatGroupListComponent.prototype.selectedGroup;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupList;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupRequest;
    /** @type {?} */
    CometChatGroupListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometChatGroupListComponent.prototype.openCreateGroupView;
    /** @type {?} */
    CometChatGroupListComponent.prototype.GROUPS;
    /** @type {?} */
    CometChatGroupListComponent.prototype.SEARCH;
    /** @type {?} */
    CometChatGroupListComponent.prototype.onGroupClick;
    /**
     * Fetches list of groups according to the group request config , if a user is loggedIn correctly
     * @type {?}
     */
    CometChatGroupListComponent.prototype.getGroups;
    /**
     * Fetches list of groups according to the group request config
     * \@param Event action
     * @type {?}
     */
    CometChatGroupListComponent.prototype.createGroupActionHandler;
    /**
     * Updates group information based on activities in the group
     * @type {?}
     */
    CometChatGroupListComponent.prototype.groupUpdated;
    /**
     * Updates the member count of a group when a person is removed from the group
     * @type {?}
     */
    CometChatGroupListComponent.prototype.updateMemberRemoved;
    /**
     * Updates the member count of a group when a person (  or group of people  ) is added to the group
     * @type {?}
     */
    CometChatGroupListComponent.prototype.updateMemberAdded;
    /**
     * Updates the member count of a group based when a user joins the group
     * @type {?}
     */
    CometChatGroupListComponent.prototype.updateMemberJoined;
    /**
     * Updates the member count of a group based on activities happening in the group
     * @type {?}
     */
    CometChatGroupListComponent.prototype.updateMemberChanged;
    /**
     * @type {?}
     * @private
     */
    CometChatGroupListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL0NvbWV0Q2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUdULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBc0J0QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXBCakMsK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRzlCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FB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a0JGLCtEQU9FOzs7OztJQTRGRixtREEwQkU7Ozs7O0lBS0YsMERBK0JFOzs7OztJQUtGLHdEQXdERTs7Ozs7SUFLRix5REE0QkU7Ozs7O0lBS0YsMERBcUJFOzs7OztJQXhqQlUsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtZ3JvdXAtbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtZ3JvdXAtbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRHcm91cExpc3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JvdXBUb1VwZGF0ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9MZWF2ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9EZWxldGUgPSBudWxsO1xuXG4gIHRpbWVvdXQ7XG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICBzZWFyY2hLZXkgPSBcIlwiO1xuICBzZWxlY3RlZEdyb3VwID0gbnVsbDtcbiAgZ3JvdXBMaXN0ID0gW107XG4gIGdyb3VwUmVxdWVzdCA9IG51bGw7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IGVudW1zLkdST1VQX0xJU1RfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgb3BlbkNyZWF0ZUdyb3VwVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICBHUk9VUFM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuR1JPVVBTO1xuICBTRUFSQ0g6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuU0VBUkNIO1xuXG4gIEBPdXRwdXQoKSBvbkdyb3VwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbZW51bXMuREVTVFJPWUVEXSkge1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSwgNTAwMCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5HUk9VUF9UT19VUERBVEVdKSB7XG4gICAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9VcGRhdGU6IG51bGwgfTtcbiAgICAgICAgbGV0IHByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG5cbiAgICAgICAgcHJldlByb3BzW2VudW1zLkdST1VQX1RPX1VQREFURV0gPVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5HUk9VUF9UT19VUERBVEVdLnByZXZpb3VzVmFsdWU7XG4gICAgICAgIHByb3BzW2VudW1zLkdST1VQX1RPX1VQREFURV0gPVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5HUk9VUF9UT19VUERBVEVdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUgJiZcbiAgICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkIHx8XG4gICAgICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkICYmXG4gICAgICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgIT09XG4gICAgICAgICAgICAgICAgcHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgfHxcbiAgICAgICAgICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5zY29wZSAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5zY29wZSkpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cExpc3RdO1xuICAgICAgICAgIGNvbnN0IGdyb3VwVG9VcGRhdGUgPSB0aGlzLmdyb3VwVG9VcGRhdGU7XG5cbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmd1aWQgPT09IGdyb3VwVG9VcGRhdGUuZ3VpZFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gZ3JvdXBzW2dyb3VwS2V5XTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIGdyb3VwVG9VcGRhdGUsIHtcbiAgICAgICAgICAgICAgc2NvcGU6IGdyb3VwVG9VcGRhdGVbZW51bXMuU0NPUEVdLFxuICAgICAgICAgICAgICBtZW1iZXJzQ291bnQ6IGdyb3VwVG9VcGRhdGVbZW51bXMuTUVNQkVSU19DT1VOVF0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuXG4gICAgICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5HUk9VUF9UT19MRUFWRV0pIHtcbiAgICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG4gICAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG5cbiAgICAgICAgcHJldlByb3BzW2VudW1zLkdST1VQX1RPX0xFQVZFXSA9XG4gICAgICAgICAgY2hhbmdlW2VudW1zLkdST1VQX1RPX0xFQVZFXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgICBwcm9wc1tlbnVtcy5HUk9VUF9UT19MRUFWRV0gPSBjaGFuZ2VbZW51bXMuR1JPVVBfVE9fTEVBVkVdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZSAmJlxuICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBMaXN0XTtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwVG9MZWF2ZSA9IHByb3BzLmdyb3VwVG9MZWF2ZTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0geyAuLi5ncm91cHNbZ3JvdXBLZXldIH07XG4gICAgICAgICAgICBjb25zdCBtZW1iZXJzQ291bnQgPVxuICAgICAgICAgICAgICBwYXJzZUludChncm91cFRvTGVhdmVbZW51bXMuTUVNQkVSU19DT1VOVF0pIC0gMTtcblxuICAgICAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5HUk9VUF9UT19ERUxFVEVdKSB7XG4gICAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcbiAgICAgICAgbGV0IHByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG5cbiAgICAgICAgcHJldlByb3BzW2VudW1zLkdST1VQX1RPX0RFTEVURV0gPVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5HUk9VUF9UT19ERUxFVEVdLnByZXZpb3VzVmFsdWU7XG4gICAgICAgIHByb3BzW2VudW1zLkdST1VQX1RPX0RFTEVURV0gPVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5HUk9VUF9UT19ERUxFVEVdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9EZWxldGUgJiZcbiAgICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkICE9PSBwcm9wcy5ncm91cFRvRGVsZXRlLmd1aWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBMaXN0XTtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZ3JvdXBzO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLk5PX0dST1VQU19GT1VORDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5ncm91cFJlcXVlc3QgPSB0aGlzLmdyb3VwTGlzdFJlcXVlc3RCdWlsZGVyKHRoaXMuc2VhcmNoS2V5KTtcbiAgICAgIHRoaXMuZ2V0R3JvdXBzKCk7XG4gICAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLmdyb3VwVXBkYXRlZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vUmVtb3ZpbmcgR3JvdXAgTGlzdGVuZXJzXG4gICAgICBDb21ldENoYXQucmVtb3ZlR3JvdXBMaXN0ZW5lcih0aGlzLmdyb3VwTGlzdGVuZXJJZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBncm91cCBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiByZWFsIHRpbWVcbiAgICogQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXG4gICAqL1xuICBhdHRhY2hMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmFkZEdyb3VwTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICAgIG9uR3JvdXBNZW1iZXJTY29wZUNoYW5nZWQ6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICAgIG5ld1Njb3BlLFxuICAgICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBtZXNzYWdlLCBjaGFuZ2VkR3JvdXAsIHtcbiAgICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICAgIHNjb3BlOiBuZXdTY29wZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlcktpY2tlZDogKG1lc3NhZ2UsIGtpY2tlZFVzZXIsIGtpY2tlZEJ5LCBraWNrZWRGcm9tKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBtZXNzYWdlLCBraWNrZWRGcm9tLCB7XG4gICAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgbWVzc2FnZSwgYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyVW5iYW5uZWQ6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICB1bmJhbm5lZEJ5LFxuICAgICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfVU5CQU5ORUQsIG1lc3NhZ2UsIHVuYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgICB1c2VyOiB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgICB1c2VyQWRkZWRJblxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCBtZXNzYWdlLCB1c2VyQWRkZWRJbiwge1xuICAgICAgICAgICAgICB1c2VyOiB1c2VyQWRkZWQsXG4gICAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBtZXNzYWdlLCBncm91cCwge1xuICAgICAgICAgICAgICB1c2VyOiBsZWF2aW5nVXNlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Hcm91cE1lbWJlckpvaW5lZDogKG1lc3NhZ2UsIGpvaW5lZFVzZXIsIGpvaW5lZEdyb3VwKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBtZXNzYWdlLCBqb2luZWRHcm91cCwge1xuICAgICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHJlcXVlc3QgZm9yIGZldGNoaW5nIGEgbGlzdCBvZiBncm91cCBtYXRjaGluZyB0aGUgc2VyYWNoIGtleVxuICAgKiBAcGFyYW0gU3RyaW5nIHNlYXJjaEtleVxuICAgKi9cbiAgZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIoc2VhcmNoS2V5ID0gXCJcIikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZ3JvdXBSZXF1ZXN0ID0gbnVsbDtcblxuICAgICAgaWYgKHNlYXJjaEtleSAhPT0gXCJcIikge1xuICAgICAgICBncm91cFJlcXVlc3QgPSBuZXcgQ29tZXRDaGF0Lkdyb3Vwc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cHNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdyb3VwUmVxdWVzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwcyBhY2NvcmRpbmcgdG8gdGhlIGdyb3VwIHJlcXVlc3QgY29uZmlnICwgaWYgYSB1c2VyIGlzIGxvZ2dlZEluIGNvcnJlY3RseVxuICAgKi9cbiAgZ2V0R3JvdXBzID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkxPQURJTkdfTUVTU1NBR0U7XG5cbiAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgICB0aGlzLmZldGNoTmV4dEdyb3VwcygpXG4gICAgICAgICAgICAudGhlbigoZ3JvdXBMaXN0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChncm91cExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IFsuLi50aGlzLmdyb3VwTGlzdCwgLi4uZ3JvdXBMaXN0XTtcblxuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLk5PX0dST1VQU19GT1VORDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5FUlJPUjtcbiAgICAgICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgICAgIFwiW0NvbWV0Q2hhdEdyb3VwTGlzdF0gZ2V0R3JvdXBzIGZldGNoTmV4dEdyb3VwcyBlcnJvclwiLFxuICAgICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuRVJST1I7XG4gICAgICAgICAgbG9nZ2VyKFwiW0NvbWV0Q2hhdEdyb3VwTGlzdF0gZ2V0VXNlcnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgZ3JvdXBzIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgZmV0Y2hOZXh0R3JvdXBzKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cFJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgbGlzdCBvZiBncm91cHMgYWNjb3JkaW5nIHRvIHRoZSBncm91cCByZXF1ZXN0IGNvbmZpZ1xuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBjcmVhdGVHcm91cEFjdGlvbkhhbmRsZXIgPSAoZ3JvdXApID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3JvdXBMaXN0ID0gW2dyb3VwLCAuLi50aGlzLmdyb3VwTGlzdF07XG4gICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwTGlzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBHcm91cCBjbGlja2VkIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgaW4gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgZ3JvdXBDbGlja2VkKGdyb3VwKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChncm91cC5oYXNKb2luZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGxldCBwYXNzd29yZCA9IFwiXCI7XG4gICAgICAgIGlmIChncm91cC50eXBlID09PSBDb21ldENoYXQuR1JPVVBfVFlQRS5QQVNTV09SRCkge1xuICAgICAgICAgIHBhc3N3b3JkID0gcHJvbXB0KENPTUVUQ0hBVF9DT05TVEFOVFMuRU5URVJfWU9VUl9QQVNTV09SRCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBndWlkID0gZ3JvdXAuZ3VpZDtcbiAgICAgICAgY29uc3QgZ3JvdXBUeXBlID0gZ3JvdXAudHlwZTtcblxuICAgICAgICB0aGlzLmpvaW5Hcm91cChndWlkLCBncm91cFR5cGUsIHBhc3N3b3JkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQoZ3JvdXApO1xuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVNlbGVjdGVkR3JvdXBTdHlsaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEdyb3VwID0gZ3JvdXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscHMgdGhlIGN1cnJlbnQgdXNlciB0byBqb2luIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGdyb3VwICwgaWYgdGhlIHBhc3N3b3JkIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgY29ycmVjdFxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIGpvaW5Hcm91cChndWlkOiBhbnksIGdyb3VwVHlwZTogYW55LCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5qb2luR3JvdXAoZ3VpZCwgZ3JvdXBUeXBlLCBwYXNzd29yZClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiR3JvdXAgam9pbmluZyBzdWNjZXNzIHdpdGggcmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBMaXN0XTtcblxuICAgICAgICAgIGxldCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3VpZCk7XG4gICAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gZ3JvdXBzW2dyb3VwS2V5XTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHJlc3BvbnNlLCB7XG4gICAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdyb3Vwcy5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgICAgdGhpcy5ncm91cExpc3QgPSBncm91cHM7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZykge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkR3JvdXAgPSBuZXdHcm91cE9iajtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkdyb3VwQ2xpY2suZW1pdChuZXdHcm91cE9iaik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiR3JvdXAgam9pbmluZyBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIGZvciBhIGxpc3Qgb2YgZ3JvdXBzIG1hdGNoaW5nIHRoZSBzZWFyY2gga2V5XG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgc2VhcmNoR3JvdXAoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmdyb3VwUmVxdWVzdCA9IHRoaXMuZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIodmFsKTtcblxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmdldEdyb3VwcygpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgZ3JvdXAgaW5mb3JtYXRpb24gYmFzZWQgb24gYWN0aXZpdGllcyBpbiB0aGUgZ3JvdXBcbiAgICovXG4gIGdyb3VwVXBkYXRlZCA9IChrZXksIG1lc3NhZ2UsIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJDaGFuZ2VkKGdyb3VwLCBvcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQ6XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQ6XG4gICAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJSZW1vdmVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlckFkZGVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJKb2luZWQoZ3JvdXAsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBtZW1iZXIgY291bnQgb2YgYSBncm91cCB3aGVuIGEgcGVyc29uIGlzIHJlbW92ZWQgZnJvbSB0aGUgZ3JvdXBcbiAgICovXG4gIHVwZGF0ZU1lbWJlclJlbW92ZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGdyb3VwTGlzdCA9IFsuLi50aGlzLmdyb3VwTGlzdF07XG5cbiAgICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBMaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cExpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXApO1xuXG4gICAgICAgICAgZ3JvdXBMaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgICAgdGhpcy5ncm91cExpc3QgPSBncm91cExpc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cExpc3RbZ3JvdXBLZXldIH07XG4gICAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwLm1lbWJlcnNDb3VudCk7XG5cbiAgICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBncm91cExpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAgICAgdGhpcy5ncm91cExpc3QgPSBncm91cExpc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1lbWJlciBjb3VudCBvZiBhIGdyb3VwIHdoZW4gYSBwZXJzb24gKCAgb3IgZ3JvdXAgb2YgcGVvcGxlICApIGlzIGFkZGVkIHRvIHRoZSBncm91cFxuICAgKi9cbiAgdXBkYXRlTWVtYmVyQWRkZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGdyb3VwTGlzdCA9IFsuLi50aGlzLmdyb3VwTGlzdF07XG5cbiAgICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBMaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cExpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwLm1lbWJlcnNDb3VudCk7XG5cbiAgICAgICAgbGV0IHNjb3BlID0gZ3JvdXAuaGFzT3duUHJvcGVydHkoZW51bXMuU0NPUEUpID8gZ3JvdXAuc2NvcGUgOiBcIlwiO1xuICAgICAgICBsZXQgaGFzSm9pbmVkID0gZ3JvdXAuaGFzT3duUHJvcGVydHkoZW51bXMuSEFTX0pPSU5FRClcbiAgICAgICAgICA/IGdyb3VwLmhhc0pvaW5lZFxuICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgICAgc2NvcGUgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICAgIGhhc0pvaW5lZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICBoYXNKb2luZWQ6IGhhc0pvaW5lZCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3JvdXBMaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwTGlzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXAgfTtcblxuICAgICAgICBsZXQgc2NvcGUgPSBncm91cE9iai5oYXNPd25Qcm9wZXJ0eShlbnVtcy5TQ09QRSkgPyBncm91cE9iai5zY29wZSA6IHt9O1xuICAgICAgICBsZXQgaGFzSm9pbmVkID0gZ3JvdXBPYmouaGFzT3duUHJvcGVydHkoZW51bXMuSEFTX0pPSU5FRClcbiAgICAgICAgICA/IGdyb3VwT2JqLmhhc0pvaW5lZFxuICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cE9iai5tZW1iZXJzQ291bnQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICAgIHNjb3BlID0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVDtcbiAgICAgICAgICBoYXNKb2luZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgaGFzSm9pbmVkOiBoYXNKb2luZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwTGlzdCA9IFtuZXdncm91cE9iaiwgLi4udGhpcy5ncm91cExpc3RdO1xuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwTGlzdDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1lbWJlciBjb3VudCBvZiBhIGdyb3VwIGJhc2VkIHdoZW4gYSB1c2VyIGpvaW5zIHRoZSBncm91cFxuICAgKi9cbiAgdXBkYXRlTWVtYmVySm9pbmVkID0gKGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBncm91cExpc3QgPSBbLi4udGhpcy5ncm91cExpc3RdO1xuXG4gICAgICAvL3NlYXJjaCBmb3IgZ3JvdXBcbiAgICAgIGxldCBncm91cEtleSA9IGdyb3VwTGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXBMaXN0W2dyb3VwS2V5XSB9O1xuXG4gICAgICAgIGxldCBzY29wZSA9IGdyb3VwT2JqLnNjb3BlO1xuICAgICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXAubWVtYmVyc0NvdW50KTtcblxuICAgICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ3JvdXBMaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGdyb3VwTGlzdDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1lbWJlciBjb3VudCBvZiBhIGdyb3VwIGJhc2VkIG9uIGFjdGl2aXRpZXMgaGFwcGVuaW5nIGluIHRoZSBncm91cFxuICAgKi9cbiAgdXBkYXRlTWVtYmVyQ2hhbmdlZCA9IChncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZ3JvdXBMaXN0ID0gWy4uLnRoaXMuZ3JvdXBMaXN0XTtcblxuICAgICAgLy9zZWFyY2ggZm9yIGdyb3VwXG4gICAgICBsZXQgZ3JvdXBLZXkgPSBncm91cExpc3QuZmluZEluZGV4KChnLCBrKSA9PiBnLmd1aWQgPT09IGdyb3VwLmd1aWQpO1xuXG4gICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwTGlzdFtncm91cEtleV0gfTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBMaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZ3JvdXBMaXN0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGVudW1zLkNMT1NFX0NSRUFURV9HUk9VUF9WSUVXOiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVDcmVhdGVHcm91cFZpZXcoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX0NSRUFURUQ6IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUNyZWF0ZUdyb3VwVmlldygpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlR3JvdXBBY3Rpb25IYW5kbGVyKGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2Nyb2xsIGFjdGlvbiBvbiBHcm91cExpc3QgYW5kIGZldGNoZXMgbW9yZSBncm91cHMgaWYgdXNlciBzY3JvbGxzIHRvIGJvdHRvbSBvZiBncm91cCBsaXN0XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuXG4gICAgICBpZiAoYm90dG9tKSB0aGlzLmdldEdyb3VwcygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0b2dnbGVzIGJldHdlZW4gb3BlbmluZyBhbmQgY2xvc2luZyBvZiBncm91cENyZWF0aW9uVmlldyAvIGdyb3VwIGNyZWF0aW9uIGZvcm1cbiAgICogQHBhcmFtXG4gICAqL1xuICB0b2dnbGVDcmVhdGVHcm91cFZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3BlbkNyZWF0ZUdyb3VwVmlldyA9ICF0aGlzLm9wZW5DcmVhdGVHcm91cFZpZXc7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=