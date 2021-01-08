/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-list/cometchat-group-list/cometchat-group-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Output, EventEmitter, Input, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatGroupListComponent {
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
        this.grouplist = [];
        this.groupRequest = null;
        this.groupListenerId = "grouplist_" + new Date().getTime();
        this.openCreateGroupView = false;
        this.GROUPS = STRING_MESSAGES.GROUPS;
        this.SEARCH = STRING_MESSAGES.SEARCH;
        this.onGroupClick = new EventEmitter();
        this.getGroups = (/**
         * @return {?}
         */
        () => {
            this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
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
                        this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                    groupList.forEach((/**
                     * @param {?} group
                     * @return {?}
                     */
                    (group) => (group = this.setAvatar(group))));
                    this.grouplist = [...this.grouplist, ...groupList];
                    this.decoratorMessage = "";
                    if (this.grouplist.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.decoratorMessage = STRING_MESSAGES.ERROR;
                    console.error("[CometChatGroupList] getGroups fetchNextGroups error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.decoratorMessage = STRING_MESSAGES.ERROR;
                console.log("[CometChatGroupList] getUsers getLoggedInUser error", error);
            }));
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
            this.setAvatar(group);
            /** @type {?} */
            const groupList = [group, ...this.grouplist];
            // this.handleClick(group);
            this.grouplist = [group, ...this.grouplist];
        });
        this.groupUpdated = (/**
         * @param {?} key
         * @param {?} message
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (key, message, group, options) => {
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
        });
        this.updateMemberRemoved = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            /** @type {?} */
            let grouplist = [...this.grouplist];
            //search for group
            /** @type {?} */
            let groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            (g, k) => g.guid === group.guid));
            if (groupKey > -1) {
                if (options && this.loggedInUser.uid === options.user.uid) {
                    /** @type {?} */
                    let groupObj = Object.assign({}, grouplist[groupKey]);
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, group);
                    grouplist.splice(groupKey, 1, newgroupObj);
                    this.grouplist = grouplist;
                }
                else {
                    /** @type {?} */
                    let groupObj = Object.assign({}, grouplist[groupKey]);
                    /** @type {?} */
                    let membersCount = parseInt(group.membersCount);
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                    });
                    grouplist.splice(groupKey, 1, newgroupObj);
                    this.grouplist = grouplist;
                }
            }
        });
        this.updateMemberAdded = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            /** @type {?} */
            let grouplist = [...this.grouplist];
            //search for group
            /** @type {?} */
            let groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            (g, k) => g.guid === group.guid));
            if (groupKey > -1) {
                /** @type {?} */
                let groupObj = Object.assign({}, grouplist[groupKey]);
                /** @type {?} */
                let membersCount = parseInt(group.membersCount);
                /** @type {?} */
                let scope = group.hasOwnProperty("scope") ? group.scope : "";
                /** @type {?} */
                let hasJoined = group.hasOwnProperty("hasJoined")
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
                grouplist.splice(groupKey, 1, newgroupObj);
                this.grouplist = grouplist;
            }
            else {
                /** @type {?} */
                let groupObj = Object.assign({}, group);
                /** @type {?} */
                let scope = groupObj.hasOwnProperty("scope") ? groupObj.scope : {};
                /** @type {?} */
                let hasJoined = groupObj.hasOwnProperty("hasJoined")
                    ? groupObj.hasJoined
                    : false;
                /** @type {?} */
                let membersCount = parseInt(groupObj.membersCount);
                this.setAvatar(groupObj);
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
                const groupList = [newgroupObj, ...this.grouplist];
                this.grouplist = grouplist;
            }
        });
        this.updateMemberJoined = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            /** @type {?} */
            let grouplist = [...this.grouplist];
            //search for group
            /** @type {?} */
            let groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            (g, k) => g.guid === group.guid));
            if (groupKey > -1) {
                /** @type {?} */
                let groupObj = Object.assign({}, grouplist[groupKey]);
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
                grouplist.splice(groupKey, 1, newgroupObj);
                this.grouplist = grouplist;
            }
        });
        this.updateMemberChanged = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        (group, options) => {
            /** @type {?} */
            let grouplist = [...this.grouplist];
            //search for group
            /** @type {?} */
            let groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            (g, k) => g.guid === group.guid));
            if (groupKey > -1) {
                /** @type {?} */
                let groupObj = Object.assign({}, grouplist[groupKey]);
                if (options && this.loggedInUser.uid === options.user.uid) {
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, { scope: options.scope });
                    grouplist.splice(groupKey, 1, newgroupObj);
                    this.grouplist = grouplist;
                }
            }
        });
        setInterval((/**
         * @return {?}
         */
        () => {
            if (!this.ref["destroyed"]) {
                this.ref.detectChanges();
            }
        }), 5000);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["groupToUpdate"]) {
            /** @type {?} */
            let prevProps = { groupToUpdate: null };
            /** @type {?} */
            let props = { groupToUpdate: null };
            prevProps["groupToUpdate"] = change["groupToUpdate"].previousValue;
            props["groupToUpdate"] = change["groupToUpdate"].currentValue;
            if (prevProps.groupToUpdate &&
                (prevProps.groupToUpdate.guid !== props.groupToUpdate.guid ||
                    (prevProps.groupToUpdate.guid === props.groupToUpdate.guid &&
                        (prevProps.groupToUpdate.membersCount !==
                            props.groupToUpdate.membersCount ||
                            prevProps.groupToUpdate.scope !== props.groupToUpdate.scope)))) {
                /** @type {?} */
                const groups = [...this.grouplist];
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
                        scope: groupToUpdate["scope"],
                        membersCount: groupToUpdate["membersCount"],
                    });
                    groups.splice(groupKey, 1, newGroupObj);
                    this.grouplist = groups;
                }
            }
        }
        if (change["groupToLeave"]) {
            /** @type {?} */
            let prevProps = { groupToLeave: null };
            /** @type {?} */
            let props = { groupToLeave: null };
            prevProps["groupToLeave"] = change["groupToLeave"].previousValue;
            props["groupToLeave"] = change["groupToLeave"].currentValue;
            if (prevProps.groupToLeave &&
                prevProps.groupToLeave.guid !== props.groupToLeave.guid) {
                /** @type {?} */
                const groups = [...this.grouplist];
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
                    const membersCount = parseInt(groupToLeave["membersCount"]) - 1;
                    /** @type {?} */
                    let newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                        hasJoined: false,
                    });
                    groups.splice(groupKey, 1, newgroupObj);
                    this.grouplist = groups;
                }
            }
        }
        if (change["groupToDelete"]) {
            /** @type {?} */
            let prevProps = { groupToDelete: null };
            /** @type {?} */
            let props = { groupToDelete: null };
            prevProps["groupToDelete"] = change["groupToDelete"].previousValue;
            props["groupToDelete"] = change["groupToDelete"].currentValue;
            if (prevProps.groupToDelete &&
                prevProps.groupToDelete.guid !== props.groupToDelete.guid) {
                /** @type {?} */
                const groups = [...this.grouplist];
                /** @type {?} */
                const groupKey = groups.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => member.guid === props.groupToDelete.guid));
                if (groupKey > -1) {
                    groups.splice(groupKey, 1);
                    this.grouplist = groups;
                    if (groups.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.groupRequest = this.groupListRequestBuilder(this.searchKey);
        this.getGroups();
        this.attachListeners(this.groupUpdated);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        //Removing Group Listeners
        CometChat.removeGroupListener(this.groupListenerId);
    }
    /**
     * Listener for group activities happening in real time
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
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
    /**
     * Builds a request for fetching a list of group matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    groupListRequestBuilder(searchKey = "") {
        /** @type {?} */
        let groupRequest = null;
        if (searchKey !== "") {
            groupRequest = new CometChat.GroupsRequestBuilder()
                .setLimit(30)
                .setSearchKeyword(searchKey)
                .build();
        }
        else {
            groupRequest = new CometChat.GroupsRequestBuilder().setLimit(30).build();
        }
        return groupRequest;
    }
    /**
     * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
     * @param {?} group
     * @return {?}
     */
    setAvatar(group) {
        if (group.hasOwnProperty("icon") === false) {
            /** @type {?} */
            const guid = group.guid;
            /** @type {?} */
            const char = group.name.charAt(0).toUpperCase();
        }
        return group;
    }
    /**
     * Fetches list of groups according to the group request config
     * @return {?}
     */
    fetchNextGroups() {
        return this.groupRequest.fetchNext();
    }
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        if (group.hasJoined === false) {
            /** @type {?} */
            let password = "";
            if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
                password = prompt("Enter your password");
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
    /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param {?} guid
     * @param {?} groupType
     * @param {?} password
     * @return {?}
     */
    joinGroup(guid, groupType, password) {
        CometChat.joinGroup(guid, groupType, password)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            console.log("Group joining success with response", response);
            /** @type {?} */
            const groups = [...this.grouplist];
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
                this.grouplist = groups;
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
            console.log("Group joining failed with exception:", error);
        }));
    }
    /**
     * Searches for a list of groups matching the search key
     * @param {?} event
     * @return {?}
     */
    searchGroup(event) {
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
            this.grouplist = [];
            this.getGroups();
        }), 1000);
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        /** @type {?} */
        let data = action.payLoad;
        // console.log("Comet Chat Group List --> action generation is ", action);
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
    /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom)
            this.getGroups();
    }
    /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @return {?}
     */
    toggleCreateGroupView() {
        this.openCreateGroupView = !this.openCreateGroupView;
    }
}
CometchatGroupListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-list",
                template: "<div class=\"groupWrapperStyle\">\n  <div class=\"groupHeaderStyle\">\n    <!-- enableCloseMenu -->\n\n    <h4 class=\"groupHeaderTitleStyle\">{{ GROUPS }}</h4>\n    <div class=\"groupAddStyle\" (click)=\"toggleCreateGroupView()\"></div>\n  </div>\n  <div class=\"groupSearchStyle\">\n    <input\n      class=\"groupSearchInputStyle\"\n      type=\"text\"\n      autoComplete=\"off\"\n      [placeholder]=\"SEARCH\"\n      (keyup)=\"searchGroup($event)\"\n    />\n  </div>\n  <div class=\"groupMsgStyle\">\n    <p class=\"groupMsgTxtStyle\">{{ decoratorMessage }}</p>\n  </div>\n  <div class=\"groupListStyle\" (scroll)=\"handleScroll($event)\">\n    <div *ngFor=\"let group of grouplist\">\n      <cometchat-group-list-item\n        [group]=\"group\"\n        [selectedGroup]=\"this.selectedGroup\"\n        (onGroupClick)=\"groupClicked($event)\"\n      ></cometchat-group-list-item>\n    </div>\n  </div>\n  <!-- create group component -->\n  <cometchat-create-group\n    *ngIf=\"openCreateGroupView\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-create-group>\n  <!-- create group component -->\n</div>\n",
                styles: [".groupWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.groupWrapperStyle *{box-sizing:border-box}.groupWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.groupWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.groupWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.groupWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.groupHeaderStyle{padding:19px 16px;position:relative;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.groupHeaderTitleStyle{margin:0;font-weight:700;display:inline-block;width:66%;text-align:left;font-size:20px}.groupAddStyle{display:block;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAeFBMVEUAAABAgP8rqv85jv8ul/8vl/8wmP8ym/8ym/81mv8zmf8ym/8ymv80mP8ymv8zmf8ymv8ymf8zmv8ymf80mf80mf8zmP8zmf8zmv8ymf8zmf8zmv8zmv80mf8zmv8zmf8zmf8zmf8zmf8zmf8zmf8zmf8zmf/////XSN39AAAAJnRSTlMABAYJFhslKTM6PD1HSkxQW3B0f4CFhoeIiYyNl7K13+Tl5uf5/CHECsUAAAABYktHRCctD6gjAAAAeElEQVQY063QRw7CQBBE0c8AJuc0RLsJdf8jsmBst+0tf/mkUksN7TaPQcfGH20J56fKdhCX63xIlLer3os+mCb19iIVGSDVdpReI5pYmcNke4+lyeEhbeVwnu428K48o423VY8OVv0DTVNvMxn41/06ASGaJ4sBvjRIFQwF9sW5AAAAAElFTkSuQmCC) right center no-repeat;cursor:pointer;width:35%}.groupSearchStyle{padding:16px;position:relative}.groupSearchInputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;line-height:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACeklEQVQ4EaWUz2sTURDH3U3SNAoqJWIRPVQwURAv5uChl0DxUA8RwZANSPHir4Mg8eJ/UPxBD2L0aiXZkFM1EgkeQhEVJQj+OJlbFXPzEg+FJLt+Zrtbdp/5gfTB5M3Md+Y78+a9jbZryCqXywdxLyELyBHbti1N0zbQG+FweDWbzf5GH7k0FSmVSjkIHkE0w/4DvI3oyHF8s+ydUCh0JZfLvUQfurZJq9VqqN/vPyPRgOwbctUwjHdeFn7NNM0F9if4juq6/hj8hof7d+nAWRDedQmLHPG0n1ACKGLn8/nX8Xj8FLppWdZ1xnRnKzv463RaqVRODgaDz0AfI5HIPDMbBMOCVrPZnO50Op9oYo6OEzQgY9peTqdUvUl1i1ktTSKUzHQ6vUn8ZdRp5Jr4/Ms7/iJV3zD8735wnE53H8C/0tCiGqdzQVM4D1H5iwpOsiUHmVPjpNMputSQTRWcZLs5MoLA0pnhH6qJ/FMxEDnEkByIf6mQN9N1wLO1Wm23GjDK5jnFweaRdTXGIYXwKcD+bre7rAaMsR+SJ/dRUmM0cQDK1/IW9Qzv7hyv4JUa6LeJvcStr3L8F3wQGT8mutMpoB2NRrPYHYJrfP/L7qsIxDcajT0QFoXQBbRWqxUJBGE4nXpOiA70ej35ti8gG8ga0qZ7HaITFD/PqWbZ2+zHwGQ9TyaTF1OpVG/LVEg9J5dgkHSL5JSMxvVb7O/hLzIek0+7QKF7LhYg9hI8vsBO5/v4ozksjcZisZ+ZTKbrD2AUt4cRjyX1E4zSOVWB09wXnJOtJRKJ7I5JhcxPjLni3L4AO1k8qwd0WUBseMb+bf53nXq9vleS/gKeNA5lPSUj0AAAAABJRU5ErkJggg==) 4px center no-repeat rgba(20,20,20,.04)}.groupMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.groupMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px;font-weight:600}.groupListStyle{height:calc(100% - 125px);overflow-y:scroll;margin:0;padding:0}@media (min-width:320px) and (max-width:767px){.groupHeaderCloseStyle{display:block!important}}"]
            }] }
];
/** @nocollapse */
CometchatGroupListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometchatGroupListComponent.propDecorators = {
    enableSelectedGroupStyling: [{ type: Input }],
    groupToUpdate: [{ type: Input }],
    groupToLeave: [{ type: Input }],
    groupToDelete: [{ type: Input }],
    onGroupClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatGroupListComponent.prototype.enableSelectedGroupStyling;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatGroupListComponent.prototype.timeout;
    /** @type {?} */
    CometchatGroupListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatGroupListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatGroupListComponent.prototype.searchKey;
    /** @type {?} */
    CometchatGroupListComponent.prototype.selectedGroup;
    /** @type {?} */
    CometchatGroupListComponent.prototype.grouplist;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupRequest;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatGroupListComponent.prototype.openCreateGroupView;
    /** @type {?} */
    CometchatGroupListComponent.prototype.GROUPS;
    /** @type {?} */
    CometchatGroupListComponent.prototype.SEARCH;
    /** @type {?} */
    CometchatGroupListComponent.prototype.onGroupClick;
    /** @type {?} */
    CometchatGroupListComponent.prototype.getGroups;
    /**
     * Fetches list of groups according to the group request config
     * \@param Event action
     * @type {?}
     */
    CometchatGroupListComponent.prototype.createGroupActionHandler;
    /** @type {?} */
    CometchatGroupListComponent.prototype.groupUpdated;
    /** @type {?} */
    CometchatGroupListComponent.prototype.updateMemberRemoved;
    /** @type {?} */
    CometchatGroupListComponent.prototype.updateMemberAdded;
    /** @type {?} */
    CometchatGroupListComponent.prototype.updateMemberJoined;
    /** @type {?} */
    CometchatGroupListComponent.prototype.updateMemberChanged;
    /**
     * @type {?}
     * @private
     */
    CometchatGroupListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUdULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBc0J0QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXBCakMsK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRzlCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdEQsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLFdBQU0sR0FBVyxlQUFlLENBQUMsTUFB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LENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUUxQyxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFNRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7OztZQXJqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLG9uQ0FBb0Q7O2FBRXJEOzs7O1lBbEJDLGlCQUFpQjs7O3lDQXFCaEIsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFlTCxNQUFNOzs7O0lBbEJQLGlFQUE0Qzs7SUFDNUMsb0RBQThCOztJQUM5QixtREFBNkI7O0lBQzdCLG9EQUE4Qjs7SUFFOUIsOENBQVE7O0lBQ1IsbURBQW9COztJQUNwQix1REFBc0I7O0lBQ3RCLGdEQUFlOztJQUNmLG9EQUFxQjs7SUFDckIsZ0RBQWU7O0lBQ2YsbURBQW9COztJQUNwQixzREFBc0Q7O0lBRXRELDBEQUFxQzs7SUFDckMsNkNBQXdDOztJQUN4Qyw2Q0FBd0M7O0lBRXhDLG1EQUErRDs7SUF5Ti9ELGdEQW9DRTs7Ozs7O0lBY0YsK0RBTUU7O0lBNkVGLG1EQXNCRTs7SUFFRiwwREEyQkU7O0lBRUYsd0RBb0RFOztJQUVGLHlEQXdCRTs7SUFFRiwwREFlRTs7Ozs7SUFoZlUsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEdyb3VwTGlzdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBlbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBncm91cFRvVXBkYXRlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0xlYXZlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0RlbGV0ZSA9IG51bGw7XG5cbiAgdGltZW91dDtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gIHNlYXJjaEtleSA9IFwiXCI7XG4gIHNlbGVjdGVkR3JvdXAgPSBudWxsO1xuICBncm91cGxpc3QgPSBbXTtcbiAgZ3JvdXBSZXF1ZXN0ID0gbnVsbDtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gXCJncm91cGxpc3RfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBvcGVuQ3JlYXRlR3JvdXBWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIEdST1VQUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkdST1VQUztcbiAgU0VBUkNIOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuU0VBUkNIO1xuXG4gIEBPdXRwdXQoKSBvbkdyb3VwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9VcGRhdGVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9VcGRhdGU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUgJiZcbiAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCB8fFxuICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkID09PSBwcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgJiZcbiAgICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgIT09XG4gICAgICAgICAgICAgIHByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50IHx8XG4gICAgICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlICE9PSBwcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlKSkpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBUb1VwZGF0ZSA9IHRoaXMuZ3JvdXBUb1VwZGF0ZTtcblxuICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5ndWlkID09PSBncm91cFRvVXBkYXRlLmd1aWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IGdyb3Vwc1tncm91cEtleV07XG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXBUb1VwZGF0ZSwge1xuICAgICAgICAgICAgc2NvcGU6IGdyb3VwVG9VcGRhdGVbXCJzY29wZVwiXSxcbiAgICAgICAgICAgIG1lbWJlcnNDb3VudDogZ3JvdXBUb1VwZGF0ZVtcIm1lbWJlcnNDb3VudFwiXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGdyb3Vwcy5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvTGVhdmVcIl0gPSBjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICkge1xuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLmd1aWQgPT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cFRvTGVhdmUgPSBwcm9wcy5ncm91cFRvTGVhdmU7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSB7IC4uLmdyb3Vwc1tncm91cEtleV0gfTtcbiAgICAgICAgICBjb25zdCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cFRvTGVhdmVbXCJtZW1iZXJzQ291bnRcIl0pIC0gMTtcblxuICAgICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBncm91cHMuc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcblxuICAgICAgICAgIGlmIChncm91cHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fR1JPVVBTX0ZPVU5EO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JvdXBSZXF1ZXN0ID0gdGhpcy5ncm91cExpc3RSZXF1ZXN0QnVpbGRlcih0aGlzLnNlYXJjaEtleSk7XG4gICAgdGhpcy5nZXRHcm91cHMoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLmdyb3VwVXBkYXRlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL1JlbW92aW5nIEdyb3VwIExpc3RlbmVyc1xuICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgZ3JvdXAgYWN0aXZpdGllcyBoYXBwZW5pbmcgaW4gcmVhbCB0aW1lXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cblxuICBhdHRhY2hMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBtZXNzYWdlLCBjaGFuZ2VkR3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBtZXNzYWdlLCBraWNrZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBraWNrZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgbWVzc2FnZSwgYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJVbmJhbm5lZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdW5iYW5uZWRVc2VyLFxuICAgICAgICAgIHVuYmFubmVkQnksXG4gICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRCwgbWVzc2FnZSwgdW5iYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lbWJlckFkZGVkVG9Hcm91cDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgIHVzZXJBZGRlZEJ5LFxuICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgbWVzc2FnZSwgdXNlckFkZGVkSW4sIHtcbiAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgbWVzc2FnZSwgZ3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGxlYXZpbmdVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBtZXNzYWdlLCBqb2luZWRHcm91cCwge1xuICAgICAgICAgICAgdXNlcjogam9pbmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSByZXF1ZXN0IGZvciBmZXRjaGluZyBhIGxpc3Qgb2YgZ3JvdXAgbWF0Y2hpbmcgdGhlIHNlcmFjaCBrZXlcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIGdyb3VwTGlzdFJlcXVlc3RCdWlsZGVyKHNlYXJjaEtleSA9IFwiXCIpIHtcbiAgICBsZXQgZ3JvdXBSZXF1ZXN0ID0gbnVsbDtcblxuICAgIGlmIChzZWFyY2hLZXkgIT09IFwiXCIpIHtcbiAgICAgIGdyb3VwUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuR3JvdXBzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgIC5zZXRTZWFyY2hLZXl3b3JkKHNlYXJjaEtleSlcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuR3JvdXBzUmVxdWVzdEJ1aWxkZXIoKS5zZXRMaW1pdCgzMCkuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwUmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhIGdyb3VwIERvZXNudCBoYXZlIGFuIGljb24gLCBpdCB3aWxsIGdlbmVyYXRlIG9uZSBmb3IgaXQgLCB1c2luZyBmaXJzdCBMZXR0ZXIgb2YgdGhlIEdyb3VwIE5hbWVcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgc2V0QXZhdGFyKGdyb3VwKSB7XG4gICAgaWYgKGdyb3VwLmhhc093blByb3BlcnR5KFwiaWNvblwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGd1aWQgPSBncm91cC5ndWlkO1xuICAgICAgY29uc3QgY2hhciA9IGdyb3VwLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGdldEdyb3VwcyA9ICgpID0+IHtcbiAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcblxuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLmZldGNoTmV4dEdyb3VwcygpXG4gICAgICAgICAgLnRoZW4oKGdyb3VwTGlzdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyb3VwTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX0dST1VQU19GT1VORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXBMaXN0LmZvckVhY2goKGdyb3VwKSA9PiAoZ3JvdXAgPSB0aGlzLnNldEF2YXRhcihncm91cCkpKTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0LCAuLi5ncm91cExpc3RdO1xuXG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIltDb21ldENoYXRHcm91cExpc3RdIGdldEdyb3VwcyBmZXRjaE5leHRHcm91cHMgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW0NvbWV0Q2hhdEdyb3VwTGlzdF0gZ2V0VXNlcnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgZ3JvdXBzIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgZmV0Y2hOZXh0R3JvdXBzKCkge1xuICAgIHJldHVybiB0aGlzLmdyb3VwUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgZ3JvdXBzIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgY3JlYXRlR3JvdXBBY3Rpb25IYW5kbGVyID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5zZXRBdmF0YXIoZ3JvdXApO1xuICAgIGNvbnN0IGdyb3VwTGlzdCA9IFtncm91cCwgLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy8gdGhpcy5oYW5kbGVDbGljayhncm91cCk7XG4gICAgdGhpcy5ncm91cGxpc3QgPSBbZ3JvdXAsIC4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHRpbmcgdGhlIEdyb3VwIGNsaWNrZWQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gQW55IGdyb3VwXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICBpZiAoZ3JvdXAuaGFzSm9pbmVkID09PSBmYWxzZSkge1xuICAgICAgbGV0IHBhc3N3b3JkID0gXCJcIjtcbiAgICAgIGlmIChncm91cC50eXBlID09PSBDb21ldENoYXQuR1JPVVBfVFlQRS5QQVNTV09SRCkge1xuICAgICAgICBwYXNzd29yZCA9IHByb21wdChcIkVudGVyIHlvdXIgcGFzc3dvcmRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGd1aWQgPSBncm91cC5ndWlkO1xuICAgICAgY29uc3QgZ3JvdXBUeXBlID0gZ3JvdXAudHlwZTtcblxuICAgICAgdGhpcy5qb2luR3JvdXAoZ3VpZCwgZ3JvdXBUeXBlLCBwYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQoZ3JvdXApO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkR3JvdXAgPSBncm91cDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscHMgdGhlIGN1cnJlbnQgdXNlciB0byBqb2luIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGdyb3VwICwgaWYgdGhlIHBhc3N3b3JkIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgY29ycmVjdFxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIGpvaW5Hcm91cChndWlkOiBhbnksIGdyb3VwVHlwZTogYW55LCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgQ29tZXRDaGF0LmpvaW5Hcm91cChndWlkLCBncm91cFR5cGUsIHBhc3N3b3JkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgam9pbmluZyBzdWNjZXNzIHdpdGggcmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAgICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBndWlkKTtcbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IGdyb3Vwc1tncm91cEtleV07XG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgcmVzcG9uc2UsIHtcbiAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuXG4gICAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cHM7XG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRHcm91cCA9IG5ld0dyb3VwT2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQobmV3R3JvdXBPYmopO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGpvaW5pbmcgZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBsaXN0IG9mIGdyb3VwcyBtYXRjaGluZyB0aGUgc2VhcmNoIGtleVxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIHNlYXJjaEdyb3VwKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgbGV0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ3JvdXBSZXF1ZXN0ID0gdGhpcy5ncm91cExpc3RSZXF1ZXN0QnVpbGRlcih2YWwpO1xuXG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IFtdO1xuICAgICAgdGhpcy5nZXRHcm91cHMoKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIGdyb3VwVXBkYXRlZCA9IChrZXksIG1lc3NhZ2UsIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyQ2hhbmdlZChncm91cCwgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJSZW1vdmVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVEOlxuICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlckFkZGVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJKb2luZWQoZ3JvdXAsIG9wdGlvbnMpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlclJlbW92ZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXBsaXN0W2dyb3VwS2V5XSB9O1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cCk7XG5cbiAgICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckFkZGVkID0gKGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IGdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAvL3NlYXJjaCBmb3IgZ3JvdXBcbiAgICBsZXQgZ3JvdXBLZXkgPSBncm91cGxpc3QuZmluZEluZGV4KChnLCBrKSA9PiBnLmd1aWQgPT09IGdyb3VwLmd1aWQpO1xuXG4gICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXBsaXN0W2dyb3VwS2V5XSB9O1xuXG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXAubWVtYmVyc0NvdW50KTtcblxuICAgICAgbGV0IHNjb3BlID0gZ3JvdXAuaGFzT3duUHJvcGVydHkoXCJzY29wZVwiKSA/IGdyb3VwLnNjb3BlIDogXCJcIjtcbiAgICAgIGxldCBoYXNKb2luZWQgPSBncm91cC5oYXNPd25Qcm9wZXJ0eShcImhhc0pvaW5lZFwiKVxuICAgICAgICA/IGdyb3VwLmhhc0pvaW5lZFxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgc2NvcGUgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICBoYXNKb2luZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICBoYXNKb2luZWQ6IGhhc0pvaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cCB9O1xuXG4gICAgICBsZXQgc2NvcGUgPSBncm91cE9iai5oYXNPd25Qcm9wZXJ0eShcInNjb3BlXCIpID8gZ3JvdXBPYmouc2NvcGUgOiB7fTtcbiAgICAgIGxldCBoYXNKb2luZWQgPSBncm91cE9iai5oYXNPd25Qcm9wZXJ0eShcImhhc0pvaW5lZFwiKVxuICAgICAgICA/IGdyb3VwT2JqLmhhc0pvaW5lZFxuICAgICAgICA6IGZhbHNlO1xuICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwT2JqLm1lbWJlcnNDb3VudCk7XG4gICAgICB0aGlzLnNldEF2YXRhcihncm91cE9iaik7XG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgc2NvcGUgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICBoYXNKb2luZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICBoYXNKb2luZWQ6IGhhc0pvaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBncm91cExpc3QgPSBbbmV3Z3JvdXBPYmosIC4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVNZW1iZXJKb2luZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgIGxldCBzY29wZSA9IGdyb3VwT2JqLnNjb3BlO1xuICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwLm1lbWJlcnNDb3VudCk7XG5cbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICB9KTtcblxuICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckNoYW5nZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHsgc2NvcGU6IG9wdGlvbnMuc2NvcGUgfSk7XG5cbiAgICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbWV0IENoYXQgR3JvdXAgTGlzdCAtLT4gYWN0aW9uIGdlbmVyYXRpb24gaXMgXCIsIGFjdGlvbik7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0NSRUFURV9HUk9VUF9WSUVXOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9DUkVBVEVEOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JvdXBBY3Rpb25IYW5kbGVyKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzY3JvbGwgYWN0aW9uIG9uIEdyb3VwTGlzdCBhbmQgZmV0Y2hlcyBtb3JlIGdyb3VwcyBpZiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tIG9mIGdyb3VwIGxpc3RcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuXG4gICAgaWYgKGJvdHRvbSkgdGhpcy5nZXRHcm91cHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0b2dnbGVzIGJldHdlZW4gb3BlbmluZyBhbmQgY2xvc2luZyBvZiBncm91cENyZWF0aW9uVmlldyAvIGdyb3VwIGNyZWF0aW9uIGZvcm1cbiAgICogQHBhcmFtXG4gICAqL1xuICB0b2dnbGVDcmVhdGVHcm91cFZpZXcoKSB7XG4gICAgdGhpcy5vcGVuQ3JlYXRlR3JvdXBWaWV3ID0gIXRoaXMub3BlbkNyZWF0ZUdyb3VwVmlldztcbiAgfVxufVxuIl19