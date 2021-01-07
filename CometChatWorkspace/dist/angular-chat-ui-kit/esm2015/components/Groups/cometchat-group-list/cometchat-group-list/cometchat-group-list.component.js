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
                    // this.setState({ grouplist: [...this.state.grouplist, ...groupList] });
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
            // this.setState({ grouplist: groupList, createGroup: false });
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
                    // this.setState({ grouplist: grouplist });
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
                    // this.setState({ grouplist: grouplist });
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
                // this.setState({ grouplist: grouplist });
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
                // this.setState({ grouplist: groupList });
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
                // this.setState({ grouplist: grouplist });
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
                    // this.setState({ grouplist: grouplist });
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
            // group.icon = SvgAvatar.getAvatar(guid, char);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUdULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBc0J0QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXBCakMsK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRzlCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdEQsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLFdBQU0sR0FBVyxlQUFlLENBQUMsTUFB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U0FDRjtJQUNILENBQUM7Ozs7OztJQU1ELFlBQVksQ0FBQyxDQUFDOztjQUNOLE1BQU0sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFMUMsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBTUQscUJBQXFCO1FBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDOzs7WUFqa0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxvbkNBQW9EOzthQUVyRDs7OztZQWxCQyxpQkFBaUI7Ozt5Q0FxQmhCLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBZUwsTUFBTTs7OztJQWxCUCxpRUFBNEM7O0lBQzVDLG9EQUE4Qjs7SUFDOUIsbURBQTZCOztJQUM3QixvREFBOEI7O0lBRTlCLDhDQUFROztJQUNSLG1EQUFvQjs7SUFDcEIsdURBQXNCOztJQUN0QixnREFBZTs7SUFDZixvREFBcUI7O0lBQ3JCLGdEQUFlOztJQUNmLG1EQUFvQjs7SUFDcEIsc0RBQXNEOztJQUV0RCwwREFBcUM7O0lBQ3JDLDZDQUF3Qzs7SUFDeEMsNkNBQXdDOztJQUV4QyxtREFBK0Q7O0lBNk4vRCxnREFxQ0U7Ozs7OztJQWNGLCtEQU9FOztJQTZFRixtREFzQkU7O0lBRUYsMERBNkJFOztJQUVGLHdEQXNERTs7SUFFRix5REF5QkU7O0lBRUYsMERBZ0JFOzs7OztJQTVmVSwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0R3JvdXBMaXN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGVuYWJsZVNlbGVjdGVkR3JvdXBTdHlsaW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyb3VwVG9VcGRhdGUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvTGVhdmUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvRGVsZXRlID0gbnVsbDtcblxuICB0aW1lb3V0O1xuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBkZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgc2VhcmNoS2V5ID0gXCJcIjtcbiAgc2VsZWN0ZWRHcm91cCA9IG51bGw7XG4gIGdyb3VwbGlzdCA9IFtdO1xuICBncm91cFJlcXVlc3QgPSBudWxsO1xuICBncm91cExpc3RlbmVySWQgPSBcImdyb3VwbGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIG9wZW5DcmVhdGVHcm91cFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgR1JPVVBTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuR1JPVVBTO1xuICBTRUFSQ0g6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TRUFSQ0g7XG5cbiAgQE91dHB1dCgpIG9uR3JvdXBDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJlZltcImRlc3Ryb3llZFwiXSkge1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSwgNTAwMCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZSAmJlxuICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkIHx8XG4gICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgPT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAmJlxuICAgICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLm1lbWJlcnNDb3VudCAhPT1cbiAgICAgICAgICAgICAgcHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgfHxcbiAgICAgICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUpKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgICBjb25zdCBncm91cFRvVXBkYXRlID0gdGhpcy5ncm91cFRvVXBkYXRlO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmd1aWQgPT09IGdyb3VwVG9VcGRhdGUuZ3VpZFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gZ3JvdXBzW2dyb3VwS2V5XTtcbiAgICAgICAgICBjb25zdCBuZXdHcm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cFRvVXBkYXRlLCB7XG4gICAgICAgICAgICBzY29wZTogZ3JvdXBUb1VwZGF0ZVtcInNjb3BlXCJdLFxuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBncm91cFRvVXBkYXRlW1wibWVtYmVyc0NvdW50XCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZSAmJlxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBncm91cHMuZmluZEluZGV4KFxuICAgICAgICAgIChtZW1iZXIpID0+IG1lbWJlci5ndWlkID09PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBUb0xlYXZlID0gcHJvcHMuZ3JvdXBUb0xlYXZlO1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0geyAuLi5ncm91cHNbZ3JvdXBLZXldIH07XG4gICAgICAgICAgY29uc3QgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXBUb0xlYXZlW1wibWVtYmVyc0NvdW50XCJdKSAtIDE7XG5cbiAgICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSk7XG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7Z3JvdXBsaXN0OiBncm91cHN9KTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuXG4gICAgICAgICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncm91cFJlcXVlc3QgPSB0aGlzLmdyb3VwTGlzdFJlcXVlc3RCdWlsZGVyKHRoaXMuc2VhcmNoS2V5KTtcbiAgICB0aGlzLmdldEdyb3VwcygpO1xuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKHRoaXMuZ3JvdXBVcGRhdGVkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vUmVtb3ZpbmcgR3JvdXAgTGlzdGVuZXJzXG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBncm91cCBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiByZWFsIHRpbWVcbiAgICogQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXG4gICAqL1xuXG4gIGF0dGFjaExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRHcm91cExpc3RlbmVyKFxuICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICBvbkdyb3VwTWVtYmVyU2NvcGVDaGFuZ2VkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICBuZXdTY29wZSxcbiAgICAgICAgICBvbGRTY29wZSxcbiAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsIG1lc3NhZ2UsIGNoYW5nZWRHcm91cCwge1xuICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICBzY29wZTogbmV3U2NvcGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIG1lc3NhZ2UsIGtpY2tlZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELCBtZXNzYWdlLCBiYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVELCBtZXNzYWdlLCB1bmJhbm5lZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgdXNlckFkZGVkSW5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCBtZXNzYWdlLCB1c2VyQWRkZWRJbiwge1xuICAgICAgICAgICAgdXNlcjogdXNlckFkZGVkLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBtZXNzYWdlLCBncm91cCwge1xuICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIG1lc3NhZ2UsIGpvaW5lZEdyb3VwLCB7XG4gICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHJlcXVlc3QgZm9yIGZldGNoaW5nIGEgbGlzdCBvZiBncm91cCBtYXRjaGluZyB0aGUgc2VyYWNoIGtleVxuICAgKiBAcGFyYW0gU3RyaW5nIHNlYXJjaEtleVxuICAgKi9cbiAgZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIoc2VhcmNoS2V5ID0gXCJcIikge1xuICAgIGxldCBncm91cFJlcXVlc3QgPSBudWxsO1xuXG4gICAgaWYgKHNlYXJjaEtleSAhPT0gXCJcIikge1xuICAgICAgZ3JvdXBSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cHNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXBSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cHNSZXF1ZXN0QnVpbGRlcigpLnNldExpbWl0KDMwKS5idWlsZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGEgZ3JvdXAgRG9lc250IGhhdmUgYW4gaWNvbiAsIGl0IHdpbGwgZ2VuZXJhdGUgb25lIGZvciBpdCAsIHVzaW5nIGZpcnN0IExldHRlciBvZiB0aGUgR3JvdXAgTmFtZVxuICAgKiBAcGFyYW0gQW55IGdyb3VwXG4gICAqL1xuICBzZXRBdmF0YXIoZ3JvdXApIHtcbiAgICBpZiAoZ3JvdXAuaGFzT3duUHJvcGVydHkoXCJpY29uXCIpID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgZ3VpZCA9IGdyb3VwLmd1aWQ7XG4gICAgICBjb25zdCBjaGFyID0gZ3JvdXAubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICAgIC8vIGdyb3VwLmljb24gPSBTdmdBdmF0YXIuZ2V0QXZhdGFyKGd1aWQsIGNoYXIpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBnZXRHcm91cHMgPSAoKSA9PiB7XG4gICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG5cbiAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRHcm91cHMoKVxuICAgICAgICAgIC50aGVuKChncm91cExpc3QpID0+IHtcbiAgICAgICAgICAgIGlmIChncm91cExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3VwTGlzdC5mb3JFYWNoKChncm91cCkgPT4gKGdyb3VwID0gdGhpcy5zZXRBdmF0YXIoZ3JvdXApKSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgZ3JvdXBsaXN0OiBbLi4udGhpcy5zdGF0ZS5ncm91cGxpc3QsIC4uLmdyb3VwTGlzdF0gfSk7XG4gICAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdCwgLi4uZ3JvdXBMaXN0XTtcblxuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXBsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fR1JPVVBTX0ZPVU5EO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBMaXN0XSBnZXRHcm91cHMgZmV0Y2hOZXh0R3JvdXBzIGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRHcm91cExpc3RdIGdldFVzZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwcyBhY2NvcmRpbmcgdG8gdGhlIGdyb3VwIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGZldGNoTmV4dEdyb3VwcygpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cFJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwcyBhY2NvcmRpbmcgdG8gdGhlIGdyb3VwIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGNyZWF0ZUdyb3VwQWN0aW9uSGFuZGxlciA9IChncm91cCkgPT4ge1xuICAgIHRoaXMuc2V0QXZhdGFyKGdyb3VwKTtcbiAgICBjb25zdCBncm91cExpc3QgPSBbZ3JvdXAsIC4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vIHRoaXMuaGFuZGxlQ2xpY2soZ3JvdXApO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwTGlzdCwgY3JlYXRlR3JvdXA6IGZhbHNlIH0pO1xuICAgIHRoaXMuZ3JvdXBsaXN0ID0gW2dyb3VwLCAuLi50aGlzLmdyb3VwbGlzdF07XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBHcm91cCBjbGlja2VkIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgaW4gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgZ3JvdXBDbGlja2VkKGdyb3VwKSB7XG4gICAgaWYgKGdyb3VwLmhhc0pvaW5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBwYXNzd29yZCA9IFwiXCI7XG4gICAgICBpZiAoZ3JvdXAudHlwZSA9PT0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUEFTU1dPUkQpIHtcbiAgICAgICAgcGFzc3dvcmQgPSBwcm9tcHQoXCJFbnRlciB5b3VyIHBhc3N3b3JkXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBndWlkID0gZ3JvdXAuZ3VpZDtcbiAgICAgIGNvbnN0IGdyb3VwVHlwZSA9IGdyb3VwLnR5cGU7XG5cbiAgICAgIHRoaXMuam9pbkdyb3VwKGd1aWQsIGdyb3VwVHlwZSwgcGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uR3JvdXBDbGljay5lbWl0KGdyb3VwKTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEdyb3VwID0gZ3JvdXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBzIHRoZSBjdXJyZW50IHVzZXIgdG8gam9pbiBhIHBhc3N3b3JkIHByb3RlY3RlZCBncm91cCAsIGlmIHRoZSBwYXNzd29yZCBlbnRlcmVkIGJ5IHRoZSB1c2VyIGlzIGNvcnJlY3RcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBqb2luR3JvdXAoZ3VpZDogYW55LCBncm91cFR5cGU6IGFueSwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIENvbWV0Q2hhdC5qb2luR3JvdXAoZ3VpZCwgZ3JvdXBUeXBlLCBwYXNzd29yZClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGpvaW5pbmcgc3VjY2VzcyB3aXRoIHJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcblxuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgICAgIGxldCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3VpZCk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSBncm91cHNbZ3JvdXBLZXldO1xuICAgICAgICAgIGNvbnN0IG5ld0dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHJlc3BvbnNlLCB7XG4gICAgICAgICAgICBzY29wZTogQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGdyb3Vwcy5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVNlbGVjdGVkR3JvdXBTdHlsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkR3JvdXAgPSBuZXdHcm91cE9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLm9uR3JvdXBDbGljay5lbWl0KG5ld0dyb3VwT2JqKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBqb2luaW5nIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgbGlzdCBvZiBncm91cHMgbWF0Y2hpbmcgdGhlIHNlYXJjaCBrZXlcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBzZWFyY2hHcm91cChldmVudCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIGxldCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdyb3VwUmVxdWVzdCA9IHRoaXMuZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIodmFsKTtcblxuICAgICAgdGhpcy5ncm91cGxpc3QgPSBbXTtcbiAgICAgIHRoaXMuZ2V0R3JvdXBzKCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBncm91cFVwZGF0ZWQgPSAoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOlxuICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlckNoYW5nZWQoZ3JvdXAsIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyUmVtb3ZlZChncm91cCwgb3B0aW9ucyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJBZGRlZChncm91cCwgb3B0aW9ucyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVySm9pbmVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVNZW1iZXJSZW1vdmVkID0gKGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IGdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAvL3NlYXJjaCBmb3IgZ3JvdXBcbiAgICBsZXQgZ3JvdXBLZXkgPSBncm91cGxpc3QuZmluZEluZGV4KChnLCBrKSA9PiBnLmd1aWQgPT09IGdyb3VwLmd1aWQpO1xuXG4gICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcblxuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXApO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBsaXN0IH0pO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBsaXN0IH0pO1xuICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyQWRkZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICBsZXQgc2NvcGUgPSBncm91cC5oYXNPd25Qcm9wZXJ0eShcInNjb3BlXCIpID8gZ3JvdXAuc2NvcGUgOiBcIlwiO1xuICAgICAgbGV0IGhhc0pvaW5lZCA9IGdyb3VwLmhhc093blByb3BlcnR5KFwiaGFzSm9pbmVkXCIpXG4gICAgICAgID8gZ3JvdXAuaGFzSm9pbmVkXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgIGhhc0pvaW5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgIGhhc0pvaW5lZDogaGFzSm9pbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwbGlzdCB9KTtcbiAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwIH07XG5cbiAgICAgIGxldCBzY29wZSA9IGdyb3VwT2JqLmhhc093blByb3BlcnR5KFwic2NvcGVcIikgPyBncm91cE9iai5zY29wZSA6IHt9O1xuICAgICAgbGV0IGhhc0pvaW5lZCA9IGdyb3VwT2JqLmhhc093blByb3BlcnR5KFwiaGFzSm9pbmVkXCIpXG4gICAgICAgID8gZ3JvdXBPYmouaGFzSm9pbmVkXG4gICAgICAgIDogZmFsc2U7XG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXBPYmoubWVtYmVyc0NvdW50KTtcbiAgICAgIHRoaXMuc2V0QXZhdGFyKGdyb3VwT2JqKTtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgIGhhc0pvaW5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgIGhhc0pvaW5lZDogaGFzSm9pbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGdyb3VwTGlzdCA9IFtuZXdncm91cE9iaiwgLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBMaXN0IH0pO1xuICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckpvaW5lZCA9IChncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBncm91cGxpc3QgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIGdyb3VwXG4gICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBsaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcblxuICAgICAgbGV0IHNjb3BlID0gZ3JvdXBPYmouc2NvcGU7XG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXAubWVtYmVyc0NvdW50KTtcblxuICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgIHNjb3BlID0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVDtcbiAgICAgIH1cblxuICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIH0pO1xuXG4gICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAvLyB0aGlzLnNldFN0YXRlKHsgZ3JvdXBsaXN0OiBncm91cGxpc3QgfSk7XG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyQ2hhbmdlZCA9IChncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBncm91cGxpc3QgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIGdyb3VwXG4gICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBsaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgeyBzY29wZTogb3B0aW9ucy5zY29wZSB9KTtcblxuICAgICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwbGlzdCB9KTtcbiAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb21ldCBDaGF0IEdyb3VwIExpc3QgLS0+IGFjdGlvbiBnZW5lcmF0aW9uIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9DUkVBVEVfR1JPVVBfVklFVzoge1xuICAgICAgICB0aGlzLnRvZ2dsZUNyZWF0ZUdyb3VwVmlldygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfQ1JFQVRFRDoge1xuICAgICAgICB0aGlzLnRvZ2dsZUNyZWF0ZUdyb3VwVmlldygpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyb3VwQWN0aW9uSGFuZGxlcihkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2Nyb2xsIGFjdGlvbiBvbiBHcm91cExpc3QgYW5kIGZldGNoZXMgbW9yZSBncm91cHMgaWYgdXNlciBzY3JvbGxzIHRvIGJvdHRvbSBvZiBncm91cCBsaXN0XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcblxuICAgIGlmIChib3R0b20pIHRoaXMuZ2V0R3JvdXBzKCk7XG4gIH1cblxuICAvKipcbiAgICogdG9nZ2xlcyBiZXR3ZWVuIG9wZW5pbmcgYW5kIGNsb3Npbmcgb2YgZ3JvdXBDcmVhdGlvblZpZXcgLyBncm91cCBjcmVhdGlvbiBmb3JtXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCkge1xuICAgIHRoaXMub3BlbkNyZWF0ZUdyb3VwVmlldyA9ICF0aGlzLm9wZW5DcmVhdGVHcm91cFZpZXc7XG4gIH1cbn1cbiJdfQ==