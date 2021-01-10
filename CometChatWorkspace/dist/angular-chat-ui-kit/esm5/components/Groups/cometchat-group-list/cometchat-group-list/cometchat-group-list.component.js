/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-list/cometchat-group-list/cometchat-group-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Output, EventEmitter, Input, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatGroupListComponent = /** @class */ (function () {
    function CometchatGroupListComponent(ref) {
        var _this = this;
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
        function () {
            _this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                _this.loggedInUser = user;
                _this.fetchNextGroups()
                    .then((/**
                 * @param {?} groupList
                 * @return {?}
                 */
                function (groupList) {
                    if (groupList.length === 0) {
                        _this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                    groupList.forEach((/**
                     * @param {?} group
                     * @return {?}
                     */
                    function (group) { return (group = _this.setAvatar(group)); }));
                    _this.grouplist = tslib_1.__spread(_this.grouplist, groupList);
                    _this.decoratorMessage = "";
                    if (_this.grouplist.length === 0) {
                        _this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.decoratorMessage = STRING_MESSAGES.ERROR;
                    console.error("[CometChatGroupList] getGroups fetchNextGroups error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.decoratorMessage = STRING_MESSAGES.ERROR;
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
        function (group) {
            _this.setAvatar(group);
            /** @type {?} */
            var groupList = tslib_1.__spread([group], _this.grouplist);
            // this.handleClick(group);
            _this.grouplist = tslib_1.__spread([group], _this.grouplist);
        });
        this.groupUpdated = (/**
         * @param {?} key
         * @param {?} message
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        function (key, message, group, options) {
            switch (key) {
                case enums.GROUP_MEMBER_SCOPE_CHANGED:
                    _this.updateMemberChanged(group, options);
                    break;
                case enums.GROUP_MEMBER_KICKED:
                case enums.GROUP_MEMBER_BANNED:
                case enums.GROUP_MEMBER_LEFT:
                    _this.updateMemberRemoved(group, options);
                    break;
                case enums.GROUP_MEMBER_ADDED:
                    _this.updateMemberAdded(group, options);
                    break;
                case enums.GROUP_MEMBER_JOINED:
                    _this.updateMemberJoined(group, options);
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
        function (group, options) {
            /** @type {?} */
            var grouplist = tslib_1.__spread(_this.grouplist);
            //search for group
            /** @type {?} */
            var groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            function (g, k) { return g.guid === group.guid; }));
            if (groupKey > -1) {
                if (options && _this.loggedInUser.uid === options.user.uid) {
                    /** @type {?} */
                    var groupObj = tslib_1.__assign({}, grouplist[groupKey]);
                    /** @type {?} */
                    var newgroupObj = Object.assign({}, groupObj, group);
                    grouplist.splice(groupKey, 1, newgroupObj);
                    _this.grouplist = grouplist;
                }
                else {
                    /** @type {?} */
                    var groupObj = tslib_1.__assign({}, grouplist[groupKey]);
                    /** @type {?} */
                    var membersCount = parseInt(group.membersCount);
                    /** @type {?} */
                    var newgroupObj = Object.assign({}, groupObj, {
                        membersCount: membersCount,
                    });
                    grouplist.splice(groupKey, 1, newgroupObj);
                    _this.grouplist = grouplist;
                }
            }
        });
        this.updateMemberAdded = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        function (group, options) {
            /** @type {?} */
            var grouplist = tslib_1.__spread(_this.grouplist);
            //search for group
            /** @type {?} */
            var groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            function (g, k) { return g.guid === group.guid; }));
            if (groupKey > -1) {
                /** @type {?} */
                var groupObj = tslib_1.__assign({}, grouplist[groupKey]);
                /** @type {?} */
                var membersCount = parseInt(group.membersCount);
                /** @type {?} */
                var scope = group.hasOwnProperty("scope") ? group.scope : "";
                /** @type {?} */
                var hasJoined = group.hasOwnProperty("hasJoined")
                    ? group.hasJoined
                    : false;
                if (options && _this.loggedInUser.uid === options.user.uid) {
                    scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                    hasJoined = true;
                }
                /** @type {?} */
                var newgroupObj = Object.assign({}, groupObj, {
                    membersCount: membersCount,
                    scope: scope,
                    hasJoined: hasJoined,
                });
                grouplist.splice(groupKey, 1, newgroupObj);
                _this.grouplist = grouplist;
            }
            else {
                /** @type {?} */
                var groupObj = tslib_1.__assign({}, group);
                /** @type {?} */
                var scope = groupObj.hasOwnProperty("scope") ? groupObj.scope : {};
                /** @type {?} */
                var hasJoined = groupObj.hasOwnProperty("hasJoined")
                    ? groupObj.hasJoined
                    : false;
                /** @type {?} */
                var membersCount = parseInt(groupObj.membersCount);
                _this.setAvatar(groupObj);
                if (options && _this.loggedInUser.uid === options.user.uid) {
                    scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                    hasJoined = true;
                }
                /** @type {?} */
                var newgroupObj = Object.assign({}, groupObj, {
                    membersCount: membersCount,
                    scope: scope,
                    hasJoined: hasJoined,
                });
                /** @type {?} */
                var groupList = tslib_1.__spread([newgroupObj], _this.grouplist);
                _this.grouplist = grouplist;
            }
        });
        this.updateMemberJoined = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        function (group, options) {
            /** @type {?} */
            var grouplist = tslib_1.__spread(_this.grouplist);
            //search for group
            /** @type {?} */
            var groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            function (g, k) { return g.guid === group.guid; }));
            if (groupKey > -1) {
                /** @type {?} */
                var groupObj = tslib_1.__assign({}, grouplist[groupKey]);
                /** @type {?} */
                var scope = groupObj.scope;
                /** @type {?} */
                var membersCount = parseInt(group.membersCount);
                if (options && _this.loggedInUser.uid === options.user.uid) {
                    scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                }
                /** @type {?} */
                var newgroupObj = Object.assign({}, groupObj, {
                    membersCount: membersCount,
                    scope: scope,
                });
                grouplist.splice(groupKey, 1, newgroupObj);
                _this.grouplist = grouplist;
            }
        });
        this.updateMemberChanged = (/**
         * @param {?} group
         * @param {?} options
         * @return {?}
         */
        function (group, options) {
            /** @type {?} */
            var grouplist = tslib_1.__spread(_this.grouplist);
            //search for group
            /** @type {?} */
            var groupKey = grouplist.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            function (g, k) { return g.guid === group.guid; }));
            if (groupKey > -1) {
                /** @type {?} */
                var groupObj = tslib_1.__assign({}, grouplist[groupKey]);
                if (options && _this.loggedInUser.uid === options.user.uid) {
                    /** @type {?} */
                    var newgroupObj = Object.assign({}, groupObj, { scope: options.scope });
                    grouplist.splice(groupKey, 1, newgroupObj);
                    _this.grouplist = grouplist;
                }
            }
        });
        setInterval((/**
         * @return {?}
         */
        function () {
            if (!_this.ref["destroyed"]) {
                _this.ref.detectChanges();
            }
        }), 5000);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatGroupListComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
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
                var groups = tslib_1.__spread(this.grouplist);
                /** @type {?} */
                var groupToUpdate_1 = this.groupToUpdate;
                /** @type {?} */
                var groupKey = groups.findIndex((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) { return group.guid === groupToUpdate_1.guid; }));
                if (groupKey > -1) {
                    /** @type {?} */
                    var groupObj = groups[groupKey];
                    /** @type {?} */
                    var newGroupObj = Object.assign({}, groupObj, groupToUpdate_1, {
                        scope: groupToUpdate_1["scope"],
                        membersCount: groupToUpdate_1["membersCount"],
                    });
                    groups.splice(groupKey, 1, newGroupObj);
                    this.grouplist = groups;
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
                var groups = tslib_1.__spread(this.grouplist);
                /** @type {?} */
                var groupKey = groups.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) { return member.guid === props_1.groupToLeave.guid; }));
                if (groupKey > -1) {
                    /** @type {?} */
                    var groupToLeave = props_1.groupToLeave;
                    /** @type {?} */
                    var groupObj = tslib_1.__assign({}, groups[groupKey]);
                    /** @type {?} */
                    var membersCount = parseInt(groupToLeave["membersCount"]) - 1;
                    /** @type {?} */
                    var newgroupObj = Object.assign({}, groupObj, {
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
            var prevProps = { groupToDelete: null };
            /** @type {?} */
            var props_2 = { groupToDelete: null };
            prevProps["groupToDelete"] = change["groupToDelete"].previousValue;
            props_2["groupToDelete"] = change["groupToDelete"].currentValue;
            if (prevProps.groupToDelete &&
                prevProps.groupToDelete.guid !== props_2.groupToDelete.guid) {
                /** @type {?} */
                var groups = tslib_1.__spread(this.grouplist);
                /** @type {?} */
                var groupKey = groups.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) { return member.guid === props_2.groupToDelete.guid; }));
                if (groupKey > -1) {
                    groups.splice(groupKey, 1);
                    this.grouplist = groups;
                    if (groups.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_GROUPS_FOUND;
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatGroupListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.groupRequest = this.groupListRequestBuilder(this.searchKey);
        this.getGroups();
        this.attachListeners(this.groupUpdated);
    };
    /**
     * @return {?}
     */
    CometchatGroupListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        //Removing Group Listeners
        CometChat.removeGroupListener(this.groupListenerId);
    };
    /**
     * Listener for group activities happening in real time
     * @param function callback
     */
    /**
     * Listener for group activities happening in real time
     * @param {?} callback
     * @return {?}
     */
    CometchatGroupListComponent.prototype.attachListeners = /**
     * Listener for group activities happening in real time
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
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
    };
    /**
     * Builds a request for fetching a list of group matching the serach key
     * @param String searchKey
     */
    /**
     * Builds a request for fetching a list of group matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    CometchatGroupListComponent.prototype.groupListRequestBuilder = /**
     * Builds a request for fetching a list of group matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    function (searchKey) {
        if (searchKey === void 0) { searchKey = ""; }
        /** @type {?} */
        var groupRequest = null;
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
    };
    /**
     * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
     * @param Any group
     */
    /**
     * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
     * @param {?} group
     * @return {?}
     */
    CometchatGroupListComponent.prototype.setAvatar = /**
     * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
     * @param {?} group
     * @return {?}
     */
    function (group) {
        if (group.hasOwnProperty("icon") === false) {
            /** @type {?} */
            var guid = group.guid;
            /** @type {?} */
            var char = group.name.charAt(0).toUpperCase();
        }
        return group;
    };
    /**
     * Fetches list of groups according to the group request config
     * @param Event action
     */
    /**
     * Fetches list of groups according to the group request config
     * @return {?}
     */
    CometchatGroupListComponent.prototype.fetchNextGroups = /**
     * Fetches list of groups according to the group request config
     * @return {?}
     */
    function () {
        return this.groupRequest.fetchNext();
    };
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param Any group
     */
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    CometchatGroupListComponent.prototype.groupClicked = /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    function (group) {
        if (group.hasJoined === false) {
            /** @type {?} */
            var password = "";
            if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
                password = prompt("Enter your password");
            }
            /** @type {?} */
            var guid = group.guid;
            /** @type {?} */
            var groupType = group.type;
            this.joinGroup(guid, groupType, password);
        }
        else {
            this.onGroupClick.emit(group);
            if (this.enableSelectedGroupStyling) {
                this.selectedGroup = group;
            }
        }
    };
    /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param Event event
     */
    /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param {?} guid
     * @param {?} groupType
     * @param {?} password
     * @return {?}
     */
    CometchatGroupListComponent.prototype.joinGroup = /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param {?} guid
     * @param {?} groupType
     * @param {?} password
     * @return {?}
     */
    function (guid, groupType, password) {
        var _this = this;
        CometChat.joinGroup(guid, groupType, password)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            console.log("Group joining success with response", response);
            /** @type {?} */
            var groups = tslib_1.__spread(_this.grouplist);
            /** @type {?} */
            var groupKey = groups.findIndex((/**
             * @param {?} g
             * @param {?} k
             * @return {?}
             */
            function (g, k) { return g.guid === guid; }));
            if (groupKey > -1) {
                /** @type {?} */
                var groupObj = groups[groupKey];
                /** @type {?} */
                var newGroupObj = Object.assign({}, groupObj, response, {
                    scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
                });
                groups.splice(groupKey, 1, newGroupObj);
                _this.grouplist = groups;
                if (_this.enableSelectedGroupStyling) {
                    _this.selectedGroup = newGroupObj;
                }
                _this.onGroupClick.emit(newGroupObj);
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Group joining failed with exception:", error);
        }));
    };
    /**
     * Searches for a list of groups matching the search key
     * @param Event event
     */
    /**
     * Searches for a list of groups matching the search key
     * @param {?} event
     * @return {?}
     */
    CometchatGroupListComponent.prototype.searchGroup = /**
     * Searches for a list of groups matching the search key
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        /** @type {?} */
        var val = event.target.value;
        this.timeout = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.groupRequest = _this.groupListRequestBuilder(val);
            _this.grouplist = [];
            _this.getGroups();
        }), 1000);
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
    CometchatGroupListComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var data = action.payLoad;
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
    };
    /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param Event action
     */
    /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param {?} e
     * @return {?}
     */
    CometchatGroupListComponent.prototype.handleScroll = /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom)
            this.getGroups();
    };
    /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @param
     */
    /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @return {?}
     */
    CometchatGroupListComponent.prototype.toggleCreateGroupView = /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @return {?}
     */
    function () {
        this.openCreateGroupView = !this.openCreateGroupView;
    };
    CometchatGroupListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-group-list",
                    template: "<div class=\"groupWrapperStyle\">\n  <div class=\"groupHeaderStyle\">\n    <!-- enableCloseMenu -->\n\n    <h4 class=\"groupHeaderTitleStyle\">{{ GROUPS }}</h4>\n    <div class=\"groupAddStyle\" (click)=\"toggleCreateGroupView()\"></div>\n  </div>\n  <div class=\"groupSearchStyle\">\n    <input\n      class=\"groupSearchInputStyle\"\n      type=\"text\"\n      autoComplete=\"off\"\n      [placeholder]=\"SEARCH\"\n      (keyup)=\"searchGroup($event)\"\n    />\n  </div>\n  <div class=\"groupMsgStyle\">\n    <p class=\"groupMsgTxtStyle\">{{ decoratorMessage }}</p>\n  </div>\n  <div class=\"groupListStyle\" (scroll)=\"handleScroll($event)\">\n    <div *ngFor=\"let group of grouplist\">\n      <cometchat-group-list-item\n        [group]=\"group\"\n        [selectedGroup]=\"this.selectedGroup\"\n        (onGroupClick)=\"groupClicked($event)\"\n      ></cometchat-group-list-item>\n    </div>\n  </div>\n  <!-- create group component -->\n  <cometchat-create-group\n    *ngIf=\"openCreateGroupView\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-create-group>\n  <!-- create group component -->\n</div>\n",
                    styles: [".groupWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.groupWrapperStyle *{box-sizing:border-box}.groupWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.groupWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.groupWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.groupWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.groupHeaderStyle{padding:19px 16px;position:relative;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.groupHeaderTitleStyle{margin:0;font-weight:700;display:inline-block;width:66%;text-align:left;font-size:20px}.groupAddStyle{display:block;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAeFBMVEUAAABAgP8rqv85jv8ul/8vl/8wmP8ym/8ym/81mv8zmf8ym/8ymv80mP8ymv8zmf8ymv8ymf8zmv8ymf80mf80mf8zmP8zmf8zmv8ymf8zmf8zmv8zmv80mf8zmv8zmf8zmf8zmf8zmf8zmf8zmf8zmf8zmf/////XSN39AAAAJnRSTlMABAYJFhslKTM6PD1HSkxQW3B0f4CFhoeIiYyNl7K13+Tl5uf5/CHECsUAAAABYktHRCctD6gjAAAAeElEQVQY063QRw7CQBBE0c8AJuc0RLsJdf8jsmBst+0tf/mkUksN7TaPQcfGH20J56fKdhCX63xIlLer3os+mCb19iIVGSDVdpReI5pYmcNke4+lyeEhbeVwnu428K48o423VY8OVv0DTVNvMxn41/06ASGaJ4sBvjRIFQwF9sW5AAAAAElFTkSuQmCC) right center no-repeat;cursor:pointer;width:35%}.groupSearchStyle{padding:16px;position:relative}.groupSearchInputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;line-height:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACeklEQVQ4EaWUz2sTURDH3U3SNAoqJWIRPVQwURAv5uChl0DxUA8RwZANSPHir4Mg8eJ/UPxBD2L0aiXZkFM1EgkeQhEVJQj+OJlbFXPzEg+FJLt+Zrtbdp/5gfTB5M3Md+Y78+a9jbZryCqXywdxLyELyBHbti1N0zbQG+FweDWbzf5GH7k0FSmVSjkIHkE0w/4DvI3oyHF8s+ydUCh0JZfLvUQfurZJq9VqqN/vPyPRgOwbctUwjHdeFn7NNM0F9if4juq6/hj8hof7d+nAWRDedQmLHPG0n1ACKGLn8/nX8Xj8FLppWdZ1xnRnKzv463RaqVRODgaDz0AfI5HIPDMbBMOCVrPZnO50Op9oYo6OEzQgY9peTqdUvUl1i1ktTSKUzHQ6vUn8ZdRp5Jr4/Ms7/iJV3zD8735wnE53H8C/0tCiGqdzQVM4D1H5iwpOsiUHmVPjpNMputSQTRWcZLs5MoLA0pnhH6qJ/FMxEDnEkByIf6mQN9N1wLO1Wm23GjDK5jnFweaRdTXGIYXwKcD+bre7rAaMsR+SJ/dRUmM0cQDK1/IW9Qzv7hyv4JUa6LeJvcStr3L8F3wQGT8mutMpoB2NRrPYHYJrfP/L7qsIxDcajT0QFoXQBbRWqxUJBGE4nXpOiA70ej35ti8gG8ga0qZ7HaITFD/PqWbZ2+zHwGQ9TyaTF1OpVG/LVEg9J5dgkHSL5JSMxvVb7O/hLzIek0+7QKF7LhYg9hI8vsBO5/v4ozksjcZisZ+ZTKbrD2AUt4cRjyX1E4zSOVWB09wXnJOtJRKJ7I5JhcxPjLni3L4AO1k8qwd0WUBseMb+bf53nXq9vleS/gKeNA5lPSUj0AAAAABJRU5ErkJggg==) 4px center no-repeat rgba(20,20,20,.04)}.groupMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.groupMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px;font-weight:600}.groupListStyle{height:calc(100% - 125px);overflow-y:scroll;margin:0;padding:0}@media (min-width:320px) and (max-width:767px){.groupHeaderCloseStyle{display:block!important}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatGroupListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    CometchatGroupListComponent.propDecorators = {
        enableSelectedGroupStyling: [{ type: Input }],
        groupToUpdate: [{ type: Input }],
        groupToLeave: [{ type: Input }],
        groupToDelete: [{ type: Input }],
        onGroupClick: [{ type: Output }]
    };
    return CometchatGroupListComponent;
}());
export { CometchatGroupListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFHVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUEyQkUscUNBQW9CLEdBQXNCO1FBQTFDLGlCQU1DO1FBTm1CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBcEJqQywrQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFHOUIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV0RCx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsV0FBTSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7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LENBQUM7UUFFMUMsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsMkRBQXFCOzs7O0lBQXJCO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7O2dCQXJqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLG9uQ0FBb0Q7O2lCQUVyRDs7OztnQkFsQkMsaUJBQWlCOzs7NkNBcUJoQixLQUFLO2dDQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQWVMLE1BQU07O0lBNmhCVCxrQ0FBQztDQUFBLEFBdGpCRCxJQXNqQkM7U0FqakJZLDJCQUEyQjs7O0lBRXRDLGlFQUE0Qzs7SUFDNUMsb0RBQThCOztJQUM5QixtREFBNkI7O0lBQzdCLG9EQUE4Qjs7SUFFOUIsOENBQVE7O0lBQ1IsbURBQW9COztJQUNwQix1REFBc0I7O0lBQ3RCLGdEQUFlOztJQUNmLG9EQUFxQjs7SUFDckIsZ0RBQWU7O0lBQ2YsbURBQW9COztJQUNwQixzREFBc0Q7O0lBRXRELDBEQUFxQzs7SUFDckMsNkNBQXdDOztJQUN4Qyw2Q0FBd0M7O0lBRXhDLG1EQUErRDs7SUF5Ti9ELGdEQW9DRTs7Ozs7O0lBY0YsK0RBTUU7O0lBNkVGLG1EQXNCRTs7SUFFRiwwREEyQkU7O0lBRUYsd0RBb0RFOztJQUVGLHlEQXdCRTs7SUFFRiwwREFlRTs7Ozs7SUFoZlUsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEdyb3VwTGlzdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBlbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBncm91cFRvVXBkYXRlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0xlYXZlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0RlbGV0ZSA9IG51bGw7XG5cbiAgdGltZW91dDtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gIHNlYXJjaEtleSA9IFwiXCI7XG4gIHNlbGVjdGVkR3JvdXAgPSBudWxsO1xuICBncm91cGxpc3QgPSBbXTtcbiAgZ3JvdXBSZXF1ZXN0ID0gbnVsbDtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gXCJncm91cGxpc3RfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBvcGVuQ3JlYXRlR3JvdXBWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIEdST1VQUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkdST1VQUztcbiAgU0VBUkNIOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuU0VBUkNIO1xuXG4gIEBPdXRwdXQoKSBvbkdyb3VwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9VcGRhdGVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9VcGRhdGU6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJncm91cFRvVXBkYXRlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUgJiZcbiAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCB8fFxuICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkID09PSBwcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgJiZcbiAgICAgICAgICAgIChwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgIT09XG4gICAgICAgICAgICAgIHByb3BzLmdyb3VwVG9VcGRhdGUubWVtYmVyc0NvdW50IHx8XG4gICAgICAgICAgICAgIHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlICE9PSBwcm9wcy5ncm91cFRvVXBkYXRlLnNjb3BlKSkpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBUb1VwZGF0ZSA9IHRoaXMuZ3JvdXBUb1VwZGF0ZTtcblxuICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5ndWlkID09PSBncm91cFRvVXBkYXRlLmd1aWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IGdyb3Vwc1tncm91cEtleV07XG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXBUb1VwZGF0ZSwge1xuICAgICAgICAgICAgc2NvcGU6IGdyb3VwVG9VcGRhdGVbXCJzY29wZVwiXSxcbiAgICAgICAgICAgIG1lbWJlcnNDb3VudDogZ3JvdXBUb1VwZGF0ZVtcIm1lbWJlcnNDb3VudFwiXSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGdyb3Vwcy5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb0xlYXZlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJncm91cFRvTGVhdmVcIl0gPSBjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvTGVhdmUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWRcbiAgICAgICkge1xuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgICBjb25zdCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoXG4gICAgICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLmd1aWQgPT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cFRvTGVhdmUgPSBwcm9wcy5ncm91cFRvTGVhdmU7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSB7IC4uLmdyb3Vwc1tncm91cEtleV0gfTtcbiAgICAgICAgICBjb25zdCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cFRvTGVhdmVbXCJtZW1iZXJzQ291bnRcIl0pIC0gMTtcblxuICAgICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBncm91cHMuc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcblxuICAgICAgICAgIGlmIChncm91cHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fR1JPVVBTX0ZPVU5EO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JvdXBSZXF1ZXN0ID0gdGhpcy5ncm91cExpc3RSZXF1ZXN0QnVpbGRlcih0aGlzLnNlYXJjaEtleSk7XG4gICAgdGhpcy5nZXRHcm91cHMoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLmdyb3VwVXBkYXRlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL1JlbW92aW5nIEdyb3VwIExpc3RlbmVyc1xuICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgZ3JvdXAgYWN0aXZpdGllcyBoYXBwZW5pbmcgaW4gcmVhbCB0aW1lXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cblxuICBhdHRhY2hMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlclNjb3BlQ2hhbmdlZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY2hhbmdlZFVzZXIsXG4gICAgICAgICAgbmV3U2NvcGUsXG4gICAgICAgICAgb2xkU2NvcGUsXG4gICAgICAgICAgY2hhbmdlZEdyb3VwXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VELCBtZXNzYWdlLCBjaGFuZ2VkR3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGNoYW5nZWRVc2VyLFxuICAgICAgICAgICAgc2NvcGU6IG5ld1Njb3BlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyS2lja2VkOiAobWVzc2FnZSwga2lja2VkVXNlciwga2lja2VkQnksIGtpY2tlZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VELCBtZXNzYWdlLCBraWNrZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBraWNrZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckJhbm5lZDogKG1lc3NhZ2UsIGJhbm5lZFVzZXIsIGJhbm5lZEJ5LCBiYW5uZWRGcm9tKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRCwgbWVzc2FnZSwgYmFubmVkRnJvbSwge1xuICAgICAgICAgICAgdXNlcjogYmFubmVkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJVbmJhbm5lZDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdW5iYW5uZWRVc2VyLFxuICAgICAgICAgIHVuYmFubmVkQnksXG4gICAgICAgICAgdW5iYW5uZWRGcm9tXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9VTkJBTk5FRCwgbWVzc2FnZSwgdW5iYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lbWJlckFkZGVkVG9Hcm91cDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgIHVzZXJBZGRlZEJ5LFxuICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgbWVzc2FnZSwgdXNlckFkZGVkSW4sIHtcbiAgICAgICAgICAgIHVzZXI6IHVzZXJBZGRlZCxcbiAgICAgICAgICAgIGhhc0pvaW5lZDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlckxlZnQ6IChtZXNzYWdlLCBsZWF2aW5nVXNlciwgZ3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgbWVzc2FnZSwgZ3JvdXAsIHtcbiAgICAgICAgICAgIHVzZXI6IGxlYXZpbmdVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBtZXNzYWdlLCBqb2luZWRHcm91cCwge1xuICAgICAgICAgICAgdXNlcjogam9pbmVkVXNlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSByZXF1ZXN0IGZvciBmZXRjaGluZyBhIGxpc3Qgb2YgZ3JvdXAgbWF0Y2hpbmcgdGhlIHNlcmFjaCBrZXlcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIGdyb3VwTGlzdFJlcXVlc3RCdWlsZGVyKHNlYXJjaEtleSA9IFwiXCIpIHtcbiAgICBsZXQgZ3JvdXBSZXF1ZXN0ID0gbnVsbDtcblxuICAgIGlmIChzZWFyY2hLZXkgIT09IFwiXCIpIHtcbiAgICAgIGdyb3VwUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuR3JvdXBzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgIC5zZXRTZWFyY2hLZXl3b3JkKHNlYXJjaEtleSlcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuR3JvdXBzUmVxdWVzdEJ1aWxkZXIoKS5zZXRMaW1pdCgzMCkuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwUmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhIGdyb3VwIERvZXNudCBoYXZlIGFuIGljb24gLCBpdCB3aWxsIGdlbmVyYXRlIG9uZSBmb3IgaXQgLCB1c2luZyBmaXJzdCBMZXR0ZXIgb2YgdGhlIEdyb3VwIE5hbWVcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgc2V0QXZhdGFyKGdyb3VwKSB7XG4gICAgaWYgKGdyb3VwLmhhc093blByb3BlcnR5KFwiaWNvblwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGd1aWQgPSBncm91cC5ndWlkO1xuICAgICAgY29uc3QgY2hhciA9IGdyb3VwLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGdldEdyb3VwcyA9ICgpID0+IHtcbiAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcblxuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLmZldGNoTmV4dEdyb3VwcygpXG4gICAgICAgICAgLnRoZW4oKGdyb3VwTGlzdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyb3VwTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX0dST1VQU19GT1VORDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXBMaXN0LmZvckVhY2goKGdyb3VwKSA9PiAoZ3JvdXAgPSB0aGlzLnNldEF2YXRhcihncm91cCkpKTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0LCAuLi5ncm91cExpc3RdO1xuXG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIltDb21ldENoYXRHcm91cExpc3RdIGdldEdyb3VwcyBmZXRjaE5leHRHcm91cHMgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW0NvbWV0Q2hhdEdyb3VwTGlzdF0gZ2V0VXNlcnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgZ3JvdXBzIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgZmV0Y2hOZXh0R3JvdXBzKCkge1xuICAgIHJldHVybiB0aGlzLmdyb3VwUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGxpc3Qgb2YgZ3JvdXBzIGFjY29yZGluZyB0byB0aGUgZ3JvdXAgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgY3JlYXRlR3JvdXBBY3Rpb25IYW5kbGVyID0gKGdyb3VwKSA9PiB7XG4gICAgdGhpcy5zZXRBdmF0YXIoZ3JvdXApO1xuICAgIGNvbnN0IGdyb3VwTGlzdCA9IFtncm91cCwgLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy8gdGhpcy5oYW5kbGVDbGljayhncm91cCk7XG4gICAgdGhpcy5ncm91cGxpc3QgPSBbZ3JvdXAsIC4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHRpbmcgdGhlIEdyb3VwIGNsaWNrZWQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gQW55IGdyb3VwXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICBpZiAoZ3JvdXAuaGFzSm9pbmVkID09PSBmYWxzZSkge1xuICAgICAgbGV0IHBhc3N3b3JkID0gXCJcIjtcbiAgICAgIGlmIChncm91cC50eXBlID09PSBDb21ldENoYXQuR1JPVVBfVFlQRS5QQVNTV09SRCkge1xuICAgICAgICBwYXNzd29yZCA9IHByb21wdChcIkVudGVyIHlvdXIgcGFzc3dvcmRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGd1aWQgPSBncm91cC5ndWlkO1xuICAgICAgY29uc3QgZ3JvdXBUeXBlID0gZ3JvdXAudHlwZTtcblxuICAgICAgdGhpcy5qb2luR3JvdXAoZ3VpZCwgZ3JvdXBUeXBlLCBwYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQoZ3JvdXApO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkR3JvdXAgPSBncm91cDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscHMgdGhlIGN1cnJlbnQgdXNlciB0byBqb2luIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGdyb3VwICwgaWYgdGhlIHBhc3N3b3JkIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgY29ycmVjdFxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIGpvaW5Hcm91cChndWlkOiBhbnksIGdyb3VwVHlwZTogYW55LCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgQ29tZXRDaGF0LmpvaW5Hcm91cChndWlkLCBncm91cFR5cGUsIHBhc3N3b3JkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgam9pbmluZyBzdWNjZXNzIHdpdGggcmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAgICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBndWlkKTtcbiAgICAgICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBncm91cE9iaiA9IGdyb3Vwc1tncm91cEtleV07XG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgcmVzcG9uc2UsIHtcbiAgICAgICAgICAgIHNjb3BlOiBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5ULFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuXG4gICAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cHM7XG4gICAgICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRHcm91cCA9IG5ld0dyb3VwT2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQobmV3R3JvdXBPYmopO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGpvaW5pbmcgZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBsaXN0IG9mIGdyb3VwcyBtYXRjaGluZyB0aGUgc2VhcmNoIGtleVxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIHNlYXJjaEdyb3VwKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgbGV0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ3JvdXBSZXF1ZXN0ID0gdGhpcy5ncm91cExpc3RSZXF1ZXN0QnVpbGRlcih2YWwpO1xuXG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IFtdO1xuICAgICAgdGhpcy5nZXRHcm91cHMoKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIGdyb3VwVXBkYXRlZCA9IChrZXksIG1lc3NhZ2UsIGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyQ2hhbmdlZChncm91cCwgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfS0lDS0VEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJSZW1vdmVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0FEREVEOlxuICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlckFkZGVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJKb2luZWQoZ3JvdXAsIG9wdGlvbnMpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlclJlbW92ZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXBsaXN0W2dyb3VwS2V5XSB9O1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cCk7XG5cbiAgICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckFkZGVkID0gKGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IGdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAvL3NlYXJjaCBmb3IgZ3JvdXBcbiAgICBsZXQgZ3JvdXBLZXkgPSBncm91cGxpc3QuZmluZEluZGV4KChnLCBrKSA9PiBnLmd1aWQgPT09IGdyb3VwLmd1aWQpO1xuXG4gICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgIGxldCBncm91cE9iaiA9IHsgLi4uZ3JvdXBsaXN0W2dyb3VwS2V5XSB9O1xuXG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXAubWVtYmVyc0NvdW50KTtcblxuICAgICAgbGV0IHNjb3BlID0gZ3JvdXAuaGFzT3duUHJvcGVydHkoXCJzY29wZVwiKSA/IGdyb3VwLnNjb3BlIDogXCJcIjtcbiAgICAgIGxldCBoYXNKb2luZWQgPSBncm91cC5oYXNPd25Qcm9wZXJ0eShcImhhc0pvaW5lZFwiKVxuICAgICAgICA/IGdyb3VwLmhhc0pvaW5lZFxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgc2NvcGUgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICBoYXNKb2luZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICBoYXNKb2luZWQ6IGhhc0pvaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cCB9O1xuXG4gICAgICBsZXQgc2NvcGUgPSBncm91cE9iai5oYXNPd25Qcm9wZXJ0eShcInNjb3BlXCIpID8gZ3JvdXBPYmouc2NvcGUgOiB7fTtcbiAgICAgIGxldCBoYXNKb2luZWQgPSBncm91cE9iai5oYXNPd25Qcm9wZXJ0eShcImhhc0pvaW5lZFwiKVxuICAgICAgICA/IGdyb3VwT2JqLmhhc0pvaW5lZFxuICAgICAgICA6IGZhbHNlO1xuICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwT2JqLm1lbWJlcnNDb3VudCk7XG4gICAgICB0aGlzLnNldEF2YXRhcihncm91cE9iaik7XG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgc2NvcGUgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICBoYXNKb2luZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICBtZW1iZXJzQ291bnQ6IG1lbWJlcnNDb3VudCxcbiAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICBoYXNKb2luZWQ6IGhhc0pvaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBncm91cExpc3QgPSBbbmV3Z3JvdXBPYmosIC4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVNZW1iZXJKb2luZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgIGxldCBzY29wZSA9IGdyb3VwT2JqLnNjb3BlO1xuICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGdyb3VwLm1lbWJlcnNDb3VudCk7XG5cbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICB9KTtcblxuICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckNoYW5nZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICBpZiAob3B0aW9ucyAmJiB0aGlzLmxvZ2dlZEluVXNlci51aWQgPT09IG9wdGlvbnMudXNlci51aWQpIHtcbiAgICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHsgc2NvcGU6IG9wdGlvbnMuc2NvcGUgfSk7XG5cbiAgICAgICAgZ3JvdXBsaXN0LnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbWV0IENoYXQgR3JvdXAgTGlzdCAtLT4gYWN0aW9uIGdlbmVyYXRpb24gaXMgXCIsIGFjdGlvbik7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX0NSRUFURV9HUk9VUF9WSUVXOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9DUkVBVEVEOiB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JvdXBBY3Rpb25IYW5kbGVyKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzY3JvbGwgYWN0aW9uIG9uIEdyb3VwTGlzdCBhbmQgZmV0Y2hlcyBtb3JlIGdyb3VwcyBpZiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tIG9mIGdyb3VwIGxpc3RcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuXG4gICAgaWYgKGJvdHRvbSkgdGhpcy5nZXRHcm91cHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0b2dnbGVzIGJldHdlZW4gb3BlbmluZyBhbmQgY2xvc2luZyBvZiBncm91cENyZWF0aW9uVmlldyAvIGdyb3VwIGNyZWF0aW9uIGZvcm1cbiAgICogQHBhcmFtXG4gICAqL1xuICB0b2dnbGVDcmVhdGVHcm91cFZpZXcoKSB7XG4gICAgdGhpcy5vcGVuQ3JlYXRlR3JvdXBWaWV3ID0gIXRoaXMub3BlbkNyZWF0ZUdyb3VwVmlldztcbiAgfVxufVxuIl19