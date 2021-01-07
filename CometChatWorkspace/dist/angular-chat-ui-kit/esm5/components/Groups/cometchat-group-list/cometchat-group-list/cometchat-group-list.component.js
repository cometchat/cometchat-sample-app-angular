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
                    // this.setState({ grouplist: [...this.state.grouplist, ...groupList] });
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
            // this.setState({ grouplist: groupList, createGroup: false });
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
                    // this.setState({ grouplist: grouplist });
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
                    // this.setState({ grouplist: grouplist });
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
                // this.setState({ grouplist: grouplist });
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
                // this.setState({ grouplist: groupList });
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
                // this.setState({ grouplist: grouplist });
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
                    // this.setState({ grouplist: grouplist });
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
                    // this.setState({grouplist: groups});
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
            // group.icon = SvgAvatar.getAvatar(guid, char);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0L2NvbWV0Y2hhdC1ncm91cC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFHVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUEyQkUscUNBQW9CLEdBQXNCO1FBQTFDLGlCQU1DO1FBTm1CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBcEJqQywrQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFHOUIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV0RCx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsV0FBTSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEMsV0FBTSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFFOUIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTZOL0QsY0FBUzs7O1FBQUc7WUFDVixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBRXpELFNBQVMsQ0FBQyxlQUFlLEVBQUU7aUJBQ3hCLElBQUk7Ozs7WUFBQyxVQUFDLElBQUk7Z0JBQ1QsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxlQUFlLEVBQUU7cUJBQ25CLElBQUk7Ozs7Z0JBQUMsVUFBQyxTQUFTO29CQUNkLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDO3FCQUN6RDtvQkFFRCxTQUFTLENBQUMsT0FBTzs7OztvQkFBQyxVQUFDLEtBQUssSUFBSyxPQUFBLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBL0IsQ0FBK0IsRUFBQyxDQUFDO29CQUM5RCx5RUFBeUU7b0JBQ3pFLEtBQUksQ0FBQyxTQUFTLG9CQUFPLEtBQUksQ0FBQyxTQUFTLEVBQUssU0FBUyxDQUFDLENBQUM7b0JBRW5ELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7b0JBRTNCLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUMvQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQztxQkFDekQ7Z0JBQ0gsQ0FBQyxFQUFDO3FCQUNELEtBQUs7Ozs7Z0JBQUMsVUFBQyxLQUFLO29CQUNYLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO29CQUM5QyxPQUFPLENBQUMsS0FBSyxDQUNYLHNEQUFzRCxFQUN0RCxLQUFLLENBQ04sQ0FBQztnQkFDSixDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsVUFBQyxLQUFLO2dCQUNYLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUNULHFEQUFxRCxFQUNyRCxLQUFLLENBQ04sQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDOzs7OztRQWNGLDZCQUF3Qjs7OztRQUFHLFVBQUMsS0FBSztZQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOztnQkFDaEIsU0FBUyxxQkFBSSxLQUFLLEdBQUssS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUU1QywyQkFBMkI7WUFDM0IsK0RBQStEO1lBQy9ELEtBQUksQ0FBQyxTQUFTLHFCQUFJLEtBQUssR0FBSyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDO1FBNkVGLGlCQUFZOzs7Ozs7O1FBQUcsVUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPO1lBQzFDLFFBQVEsR0FBRyxFQUFFO2dCQUNYLEtBQUssS0FBSyxDQUFDLDBCQUEwQjtvQkFDbkMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDekMsTUFBTTtnQkFDUixLQUFLLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztnQkFDL0IsS0FBSyxLQUFLLENBQUMsbUJBQW1CLENBQUM7Z0JBQy9CLEtBQUssS0FBSyxDQUFDLGlCQUFpQjtvQkFDMUIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFekMsTUFBTTtnQkFDUixLQUFLLEtBQUssQ0FBQyxrQkFBa0I7b0JBQzNCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRXZDLE1BQU07Z0JBQ1IsS0FBSyxLQUFLLENBQUMsbUJBQW1CO29CQUM1QixLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUV4QyxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtRQUNILENBQUMsRUFBQztRQUVGLHdCQUFtQjs7Ozs7UUFBRyxVQUFDLEtBQUssRUFBRSxPQUFPOztnQkFDL0IsU0FBUyxvQkFBTyxLQUFJLENBQUMsU0FBUyxDQUFDOzs7Z0JBRy9CLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUzs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQXJCLENBQXFCLEVBQUM7WUFFbkUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksT0FBTyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOzt3QkFDckQsUUFBUSx3QkFBUSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUU7O3dCQUVyQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztvQkFFcEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUMzQywyQ0FBMkM7b0JBRTNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2lCQUM1QjtxQkFBTTs7d0JBQ0QsUUFBUSx3QkFBUSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUU7O3dCQUNyQyxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7O3dCQUUzQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO3dCQUM1QyxZQUFZLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQztvQkFFRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzNDLDJDQUEyQztvQkFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7aUJBQzVCO2FBQ0Y7UUFDSCxDQUFDLEVBQUM7UUFFRixzQkFBaUI7Ozs7O1FBQUcsVUFBQyxLQUFLLEVBQUUsT0FBTzs7Z0JBQzdCLFNBQVMsb0JBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQzs7O2dCQUcvQixRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVM7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFyQixDQUFxQixFQUFDO1lBRW5FLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFOztvQkFDYixRQUFRLHdCQUFRLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBRTs7b0JBRXJDLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQzs7b0JBRTNDLEtBQUssR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztvQkFDeEQsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO29CQUMvQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVM7b0JBQ2pCLENBQUMsQ0FBQyxLQUFLO2dCQUVULElBQUksT0FBTyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUN6RCxLQUFLLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztvQkFDakQsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDbEI7O29CQUVHLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUU7b0JBQzVDLFlBQVksRUFBRSxZQUFZO29CQUMxQixLQUFLLEVBQUUsS0FBSztvQkFDWixTQUFTLEVBQUUsU0FBUztpQkFDckIsQ0FBQztnQkFFRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzNDLDJDQUEyQztnQkFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7YUFDNUI7aUJBQU07O29CQUNELFFBQVEsd0JBQVEsS0FBSyxDQUFFOztvQkFFdkIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O29CQUM5RCxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7b0JBQ2xELENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUztvQkFDcEIsQ0FBQyxDQUFDLEtBQUs7O29CQUNMLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDbEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekIsSUFBSSxPQUFPLElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3pELEtBQUssR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO29CQUNqRCxTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjs7b0JBRUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtvQkFDNUMsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLEtBQUssRUFBRSxLQUFLO29CQUNaLFNBQVMsRUFBRSxTQUFTO2lCQUNyQixDQUFDOztvQkFFSSxTQUFTLHFCQUFJLFdBQVcsR0FBSyxLQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNsRCwyQ0FBMkM7Z0JBQzNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxFQUFDO1FBRUYsdUJBQWtCOzs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLE9BQU87O2dCQUM5QixTQUFTLG9CQUFPLEtBQUksQ0FBQyxTQUFTLENBQUM7OztnQkFHL0IsUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBckIsQ0FBcUIsRUFBQztZQUVuRSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRTs7b0JBQ2IsUUFBUSx3QkFBUSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUU7O29CQUVyQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUs7O29CQUN0QixZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBRS9DLElBQUksT0FBTyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUN6RCxLQUFLLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztpQkFDbEQ7O29CQUVHLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUU7b0JBQzVDLFlBQVksRUFBRSxZQUFZO29CQUMxQixLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDO2dCQUVGLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDM0MsMkNBQTJDO2dCQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUM1QjtRQUNILENBQUMsRUFBQztRQUVGLHdCQUFtQjs7Ozs7UUFBRyxVQUFDLEtBQUssRUFBRSxPQUFPOztnQkFDL0IsU0FBUyxvQkFBTyxLQUFJLENBQUMsU0FBUyxDQUFDOzs7Z0JBRy9CLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUzs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQXJCLENBQXFCLEVBQUM7WUFFbkUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O29CQUNiLFFBQVEsd0JBQVEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFFO2dCQUN6QyxJQUFJLE9BQU8sSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTs7d0JBQ3JELFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV2RSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzNDLDJDQUEyQztvQkFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7aUJBQzVCO2FBQ0Y7UUFDSCxDQUFDLEVBQUM7UUEzZkEsV0FBVzs7O1FBQUM7WUFDVixJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDMUIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBRUQsaURBQVc7Ozs7SUFBWCxVQUFZLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztnQkFDdkIsU0FBUyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRTs7Z0JBQ25DLEtBQUssR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7WUFFbkMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDbkUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFOUQsSUFDRSxTQUFTLENBQUMsYUFBYTtnQkFDdkIsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUk7b0JBQ3hELENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJO3dCQUN4RCxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWTs0QkFDbkMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZOzRCQUNoQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDcEU7O29CQUNNLE1BQU0sb0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzs7b0JBQzVCLGVBQWEsR0FBRyxJQUFJLENBQUMsYUFBYTs7b0JBRWxDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUzs7OztnQkFDL0IsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQWEsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLEVBQzdDO2dCQUNELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFOzt3QkFDWCxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7d0JBQzNCLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsZUFBYSxFQUFFO3dCQUM3RCxLQUFLLEVBQUUsZUFBYSxDQUFDLE9BQU8sQ0FBQzt3QkFDN0IsWUFBWSxFQUFFLGVBQWEsQ0FBQyxjQUFjLENBQUM7cUJBQzVDLENBQUM7b0JBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUN4QyxzQ0FBc0M7b0JBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRTs7Z0JBQ3RCLFNBQVMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7O2dCQUNsQyxPQUFLLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO1lBRWxDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2pFLE9BQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRTVELElBQ0UsU0FBUyxDQUFDLFlBQVk7Z0JBQ3RCLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLE9BQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUN2RDs7b0JBQ00sTUFBTSxvQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDOztvQkFDNUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTOzs7O2dCQUMvQixVQUFDLE1BQU0sSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQXZDLENBQXVDLEVBQ3BEO2dCQUVELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFOzt3QkFDWCxZQUFZLEdBQUcsT0FBSyxDQUFDLFlBQVk7O3dCQUNqQyxRQUFRLHdCQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBRTs7d0JBQ2xDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7d0JBRTNELFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUU7d0JBQzVDLFlBQVksRUFBRSxZQUFZO3dCQUMxQixTQUFTLEVBQUUsS0FBSztxQkFDakIsQ0FBQztvQkFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ3hDLHNDQUFzQztvQkFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7aUJBQ3pCO2FBQ0Y7U0FDRjtRQUVELElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztnQkFDdkIsU0FBUyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRTs7Z0JBQ25DLE9BQUssR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7WUFFbkMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDbkUsT0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFOUQsSUFDRSxTQUFTLENBQUMsYUFBYTtnQkFDdkIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssT0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQ3pEOztvQkFDTSxNQUFNLG9CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7O29CQUM1QixRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVM7Ozs7Z0JBQy9CLFVBQUMsTUFBTSxJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksS0FBSyxPQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBeEMsQ0FBd0MsRUFDckQ7Z0JBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzQixzQ0FBc0M7b0JBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO29CQUV4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQztxQkFDekQ7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELGlEQUFXOzs7SUFBWDtRQUNFLDBCQUEwQjtRQUMxQixTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUVILHFEQUFlOzs7OztJQUFmLFVBQWdCLFFBQVE7UUFDdEIsU0FBUyxDQUFDLGdCQUFnQixDQUN4QixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDMUIseUJBQXlCOzs7Ozs7OztZQUFFLFVBQ3pCLE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZO2dCQUVaLFFBQVEsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRTtvQkFDaEUsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEtBQUssRUFBRSxRQUFRO2lCQUNoQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxtQkFBbUI7Ozs7Ozs7WUFBRSxVQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVU7Z0JBQzdELFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtvQkFDdkQsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxtQkFBbUI7Ozs7Ozs7WUFBRSxVQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVU7Z0JBQzdELFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtvQkFDdkQsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxxQkFBcUI7Ozs7Ozs7WUFBRSxVQUNyQixPQUFPLEVBQ1AsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZO2dCQUVaLFFBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRTtvQkFDM0QsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxvQkFBb0I7Ozs7Ozs7WUFBRSxVQUNwQixPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXO2dCQUVYLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtvQkFDdkQsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQTtZQUNELGlCQUFpQjs7Ozs7O1lBQUUsVUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUs7Z0JBQzdDLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtvQkFDaEQsSUFBSSxFQUFFLFdBQVc7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQTtZQUNELG1CQUFtQjs7Ozs7O1lBQUUsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVc7Z0JBQ3BELFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtvQkFDeEQsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQTtTQUNGLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNkRBQXVCOzs7OztJQUF2QixVQUF3QixTQUFjO1FBQWQsMEJBQUEsRUFBQSxjQUFjOztZQUNoQyxZQUFZLEdBQUcsSUFBSTtRQUV2QixJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDcEIsWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFO2lCQUNoRCxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUNaLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztpQkFDM0IsS0FBSyxFQUFFLENBQUM7U0FDWjthQUFNO1lBQ0wsWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFFO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFLO1FBQ2IsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRTs7Z0JBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTs7Z0JBQ2pCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDL0MsZ0RBQWdEO1NBQ2pEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBeUNEOzs7T0FHRzs7Ozs7SUFDSCxxREFBZTs7OztJQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFlRDs7O09BR0c7Ozs7OztJQUNILGtEQUFZOzs7OztJQUFaLFVBQWEsS0FBSztRQUNoQixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFOztnQkFDekIsUUFBUSxHQUFHLEVBQUU7WUFDakIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxRQUFRLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDMUM7O2dCQUVLLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTs7Z0JBQ2pCLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSTtZQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTlCLElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM1QjtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7Ozs7SUFDSCwrQ0FBUzs7Ozs7OztJQUFULFVBQVUsSUFBUyxFQUFFLFNBQWMsRUFBRSxRQUFnQjtRQUFyRCxpQkEyQkM7UUExQkMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQzthQUMzQyxJQUFJOzs7O1FBQUMsVUFBQyxRQUFRO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0JBRXZELE1BQU0sb0JBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQzs7Z0JBRTlCLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUzs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBZixDQUFlLEVBQUM7WUFDMUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O29CQUNYLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDOztvQkFDM0IsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7b0JBQ3hELEtBQUssRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVztpQkFDaEQsQ0FBQztnQkFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRXhDLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixJQUFJLEtBQUksQ0FBQywwQkFBMEIsRUFBRTtvQkFDbkMsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7aUJBQ2xDO2dCQUVELEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxFQUFDO2FBQ0QsS0FBSzs7OztRQUFDLFVBQUMsS0FBSztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpREFBVzs7Ozs7SUFBWCxVQUFZLEtBQUs7UUFBakIsaUJBWUM7UUFYQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1Qjs7WUFFRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdEQsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUE4SkQ7OztPQUdHOzs7Ozs7SUFDSCxtREFBYTs7Ozs7SUFBYixVQUFjLE1BQU07O1lBQ2QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBRXpCLDBFQUEwRTtRQUUxRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO2FBQ1A7U0FDRjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGtEQUFZOzs7OztJQUFaLFVBQWEsQ0FBQzs7WUFDTixNQUFNLEdBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBRTFDLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILDJEQUFxQjs7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RCxDQUFDOztnQkFqa0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxvbkNBQW9EOztpQkFFckQ7Ozs7Z0JBbEJDLGlCQUFpQjs7OzZDQXFCaEIsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsrQkFlTCxNQUFNOztJQXlpQlQsa0NBQUM7Q0FBQSxBQWxrQkQsSUFra0JDO1NBN2pCWSwyQkFBMkI7OztJQUV0QyxpRUFBNEM7O0lBQzVDLG9EQUE4Qjs7SUFDOUIsbURBQTZCOztJQUM3QixvREFBOEI7O0lBRTlCLDhDQUFROztJQUNSLG1EQUFvQjs7SUFDcEIsdURBQXNCOztJQUN0QixnREFBZTs7SUFDZixvREFBcUI7O0lBQ3JCLGdEQUFlOztJQUNmLG1EQUFvQjs7SUFDcEIsc0RBQXNEOztJQUV0RCwwREFBcUM7O0lBQ3JDLDZDQUF3Qzs7SUFDeEMsNkNBQXdDOztJQUV4QyxtREFBK0Q7O0lBNk4vRCxnREFxQ0U7Ozs7OztJQWNGLCtEQU9FOztJQTZFRixtREFzQkU7O0lBRUYsMERBNkJFOztJQUVGLHdEQXNERTs7SUFFRix5REF5QkU7O0lBRUYsMERBZ0JFOzs7OztJQTVmVSwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWdyb3VwLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0R3JvdXBMaXN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGVuYWJsZVNlbGVjdGVkR3JvdXBTdHlsaW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyb3VwVG9VcGRhdGUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvTGVhdmUgPSBudWxsO1xuICBASW5wdXQoKSBncm91cFRvRGVsZXRlID0gbnVsbDtcblxuICB0aW1lb3V0O1xuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBkZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgc2VhcmNoS2V5ID0gXCJcIjtcbiAgc2VsZWN0ZWRHcm91cCA9IG51bGw7XG4gIGdyb3VwbGlzdCA9IFtdO1xuICBncm91cFJlcXVlc3QgPSBudWxsO1xuICBncm91cExpc3RlbmVySWQgPSBcImdyb3VwbGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIG9wZW5DcmVhdGVHcm91cFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgR1JPVVBTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuR1JPVVBTO1xuICBTRUFSQ0g6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TRUFSQ0g7XG5cbiAgQE91dHB1dCgpIG9uR3JvdXBDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJlZltcImRlc3Ryb3llZFwiXSkge1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSwgNTAwMCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiZ3JvdXBUb1VwZGF0ZVwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgZ3JvdXBUb1VwZGF0ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvVXBkYXRlOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9VcGRhdGVcIl0gPSBjaGFuZ2VbXCJncm91cFRvVXBkYXRlXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb1VwZGF0ZSAmJlxuICAgICAgICAocHJldlByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAhPT0gcHJvcHMuZ3JvdXBUb1VwZGF0ZS5ndWlkIHx8XG4gICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLmd1aWQgPT09IHByb3BzLmdyb3VwVG9VcGRhdGUuZ3VpZCAmJlxuICAgICAgICAgICAgKHByZXZQcm9wcy5ncm91cFRvVXBkYXRlLm1lbWJlcnNDb3VudCAhPT1cbiAgICAgICAgICAgICAgcHJvcHMuZ3JvdXBUb1VwZGF0ZS5tZW1iZXJzQ291bnQgfHxcbiAgICAgICAgICAgICAgcHJldlByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUgIT09IHByb3BzLmdyb3VwVG9VcGRhdGUuc2NvcGUpKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgICBjb25zdCBncm91cFRvVXBkYXRlID0gdGhpcy5ncm91cFRvVXBkYXRlO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmd1aWQgPT09IGdyb3VwVG9VcGRhdGUuZ3VpZFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0gZ3JvdXBzW2dyb3VwS2V5XTtcbiAgICAgICAgICBjb25zdCBuZXdHcm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCBncm91cFRvVXBkYXRlLCB7XG4gICAgICAgICAgICBzY29wZTogZ3JvdXBUb1VwZGF0ZVtcInNjb3BlXCJdLFxuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBncm91cFRvVXBkYXRlW1wibWVtYmVyc0NvdW50XCJdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3R3JvdXBPYmopO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvTGVhdmVcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGdyb3VwVG9MZWF2ZTogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBncm91cFRvTGVhdmU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0xlYXZlXCJdID0gY2hhbmdlW1wiZ3JvdXBUb0xlYXZlXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcImdyb3VwVG9MZWF2ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9MZWF2ZVwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJldlByb3BzLmdyb3VwVG9MZWF2ZSAmJlxuICAgICAgICBwcmV2UHJvcHMuZ3JvdXBUb0xlYXZlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9MZWF2ZS5ndWlkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcbiAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBncm91cHMuZmluZEluZGV4KFxuICAgICAgICAgIChtZW1iZXIpID0+IG1lbWJlci5ndWlkID09PSBwcm9wcy5ncm91cFRvTGVhdmUuZ3VpZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBUb0xlYXZlID0gcHJvcHMuZ3JvdXBUb0xlYXZlO1xuICAgICAgICAgIGNvbnN0IGdyb3VwT2JqID0geyAuLi5ncm91cHNbZ3JvdXBLZXldIH07XG4gICAgICAgICAgY29uc3QgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXBUb0xlYXZlW1wibWVtYmVyc0NvdW50XCJdKSAtIDE7XG5cbiAgICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwge1xuICAgICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSwgbmV3Z3JvdXBPYmopO1xuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2dyb3VwbGlzdDogZ3JvdXBzfSk7XG5cbiAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJncm91cFRvRGVsZXRlXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBncm91cFRvRGVsZXRlOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGdyb3VwVG9EZWxldGU6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wiZ3JvdXBUb0RlbGV0ZVwiXSA9IGNoYW5nZVtcImdyb3VwVG9EZWxldGVcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlICYmXG4gICAgICAgIHByZXZQcm9wcy5ncm91cFRvRGVsZXRlLmd1aWQgIT09IHByb3BzLmdyb3VwVG9EZWxldGUuZ3VpZFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG4gICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gZ3JvdXBzLmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIuZ3VpZCA9PT0gcHJvcHMuZ3JvdXBUb0RlbGV0ZS5ndWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgZ3JvdXBzLnNwbGljZShncm91cEtleSwgMSk7XG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7Z3JvdXBsaXN0OiBncm91cHN9KTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuXG4gICAgICAgICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncm91cFJlcXVlc3QgPSB0aGlzLmdyb3VwTGlzdFJlcXVlc3RCdWlsZGVyKHRoaXMuc2VhcmNoS2V5KTtcbiAgICB0aGlzLmdldEdyb3VwcygpO1xuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKHRoaXMuZ3JvdXBVcGRhdGVkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vUmVtb3ZpbmcgR3JvdXAgTGlzdGVuZXJzXG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBncm91cCBhY3Rpdml0aWVzIGhhcHBlbmluZyBpbiByZWFsIHRpbWVcbiAgICogQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXG4gICAqL1xuXG4gIGF0dGFjaExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRHcm91cExpc3RlbmVyKFxuICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICBvbkdyb3VwTWVtYmVyU2NvcGVDaGFuZ2VkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBjaGFuZ2VkVXNlcixcbiAgICAgICAgICBuZXdTY29wZSxcbiAgICAgICAgICBvbGRTY29wZSxcbiAgICAgICAgICBjaGFuZ2VkR3JvdXBcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1NDT1BFX0NIQU5HRUQsIG1lc3NhZ2UsIGNoYW5nZWRHcm91cCwge1xuICAgICAgICAgICAgdXNlcjogY2hhbmdlZFVzZXIsXG4gICAgICAgICAgICBzY29wZTogbmV3U2NvcGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsIG1lc3NhZ2UsIGtpY2tlZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IGtpY2tlZFVzZXIsXG4gICAgICAgICAgICBoYXNKb2luZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELCBtZXNzYWdlLCBiYW5uZWRGcm9tLCB7XG4gICAgICAgICAgICB1c2VyOiBiYW5uZWRVc2VyLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Hcm91cE1lbWJlclVuYmFubmVkOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1bmJhbm5lZFVzZXIsXG4gICAgICAgICAgdW5iYW5uZWRCeSxcbiAgICAgICAgICB1bmJhbm5lZEZyb21cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX1VOQkFOTkVELCBtZXNzYWdlLCB1bmJhbm5lZEZyb20sIHtcbiAgICAgICAgICAgIHVzZXI6IHVuYmFubmVkVXNlcixcbiAgICAgICAgICAgIGhhc0pvaW5lZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVtYmVyQWRkZWRUb0dyb3VwOiAoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgdXNlckFkZGVkQnksXG4gICAgICAgICAgdXNlckFkZGVkSW5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCBtZXNzYWdlLCB1c2VyQWRkZWRJbiwge1xuICAgICAgICAgICAgdXNlcjogdXNlckFkZGVkLFxuICAgICAgICAgICAgaGFzSm9pbmVkOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBtZXNzYWdlLCBncm91cCwge1xuICAgICAgICAgICAgdXNlcjogbGVhdmluZ1VzZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQsIG1lc3NhZ2UsIGpvaW5lZEdyb3VwLCB7XG4gICAgICAgICAgICB1c2VyOiBqb2luZWRVc2VyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHJlcXVlc3QgZm9yIGZldGNoaW5nIGEgbGlzdCBvZiBncm91cCBtYXRjaGluZyB0aGUgc2VyYWNoIGtleVxuICAgKiBAcGFyYW0gU3RyaW5nIHNlYXJjaEtleVxuICAgKi9cbiAgZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIoc2VhcmNoS2V5ID0gXCJcIikge1xuICAgIGxldCBncm91cFJlcXVlc3QgPSBudWxsO1xuXG4gICAgaWYgKHNlYXJjaEtleSAhPT0gXCJcIikge1xuICAgICAgZ3JvdXBSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cHNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXBSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Hcm91cHNSZXF1ZXN0QnVpbGRlcigpLnNldExpbWl0KDMwKS5idWlsZCgpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGEgZ3JvdXAgRG9lc250IGhhdmUgYW4gaWNvbiAsIGl0IHdpbGwgZ2VuZXJhdGUgb25lIGZvciBpdCAsIHVzaW5nIGZpcnN0IExldHRlciBvZiB0aGUgR3JvdXAgTmFtZVxuICAgKiBAcGFyYW0gQW55IGdyb3VwXG4gICAqL1xuICBzZXRBdmF0YXIoZ3JvdXApIHtcbiAgICBpZiAoZ3JvdXAuaGFzT3duUHJvcGVydHkoXCJpY29uXCIpID09PSBmYWxzZSkge1xuICAgICAgY29uc3QgZ3VpZCA9IGdyb3VwLmd1aWQ7XG4gICAgICBjb25zdCBjaGFyID0gZ3JvdXAubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICAgIC8vIGdyb3VwLmljb24gPSBTdmdBdmF0YXIuZ2V0QXZhdGFyKGd1aWQsIGNoYXIpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBnZXRHcm91cHMgPSAoKSA9PiB7XG4gICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG5cbiAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRHcm91cHMoKVxuICAgICAgICAgIC50aGVuKChncm91cExpc3QpID0+IHtcbiAgICAgICAgICAgIGlmIChncm91cExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19HUk9VUFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3VwTGlzdC5mb3JFYWNoKChncm91cCkgPT4gKGdyb3VwID0gdGhpcy5zZXRBdmF0YXIoZ3JvdXApKSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgZ3JvdXBsaXN0OiBbLi4udGhpcy5zdGF0ZS5ncm91cGxpc3QsIC4uLmdyb3VwTGlzdF0gfSk7XG4gICAgICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdCwgLi4uZ3JvdXBMaXN0XTtcblxuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXBsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fR1JPVVBTX0ZPVU5EO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBMaXN0XSBnZXRHcm91cHMgZmV0Y2hOZXh0R3JvdXBzIGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRHcm91cExpc3RdIGdldFVzZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwcyBhY2NvcmRpbmcgdG8gdGhlIGdyb3VwIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGZldGNoTmV4dEdyb3VwcygpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cFJlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBsaXN0IG9mIGdyb3VwcyBhY2NvcmRpbmcgdG8gdGhlIGdyb3VwIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGNyZWF0ZUdyb3VwQWN0aW9uSGFuZGxlciA9IChncm91cCkgPT4ge1xuICAgIHRoaXMuc2V0QXZhdGFyKGdyb3VwKTtcbiAgICBjb25zdCBncm91cExpc3QgPSBbZ3JvdXAsIC4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vIHRoaXMuaGFuZGxlQ2xpY2soZ3JvdXApO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwTGlzdCwgY3JlYXRlR3JvdXA6IGZhbHNlIH0pO1xuICAgIHRoaXMuZ3JvdXBsaXN0ID0gW2dyb3VwLCAuLi50aGlzLmdyb3VwbGlzdF07XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBHcm91cCBjbGlja2VkIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgaW4gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgZ3JvdXBDbGlja2VkKGdyb3VwKSB7XG4gICAgaWYgKGdyb3VwLmhhc0pvaW5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBwYXNzd29yZCA9IFwiXCI7XG4gICAgICBpZiAoZ3JvdXAudHlwZSA9PT0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUEFTU1dPUkQpIHtcbiAgICAgICAgcGFzc3dvcmQgPSBwcm9tcHQoXCJFbnRlciB5b3VyIHBhc3N3b3JkXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBndWlkID0gZ3JvdXAuZ3VpZDtcbiAgICAgIGNvbnN0IGdyb3VwVHlwZSA9IGdyb3VwLnR5cGU7XG5cbiAgICAgIHRoaXMuam9pbkdyb3VwKGd1aWQsIGdyb3VwVHlwZSwgcGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uR3JvdXBDbGljay5lbWl0KGdyb3VwKTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEdyb3VwID0gZ3JvdXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBzIHRoZSBjdXJyZW50IHVzZXIgdG8gam9pbiBhIHBhc3N3b3JkIHByb3RlY3RlZCBncm91cCAsIGlmIHRoZSBwYXNzd29yZCBlbnRlcmVkIGJ5IHRoZSB1c2VyIGlzIGNvcnJlY3RcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBqb2luR3JvdXAoZ3VpZDogYW55LCBncm91cFR5cGU6IGFueSwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIENvbWV0Q2hhdC5qb2luR3JvdXAoZ3VpZCwgZ3JvdXBUeXBlLCBwYXNzd29yZClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGpvaW5pbmcgc3VjY2VzcyB3aXRoIHJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcblxuICAgICAgICBjb25zdCBncm91cHMgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgICAgIGxldCBncm91cEtleSA9IGdyb3Vwcy5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3VpZCk7XG4gICAgICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBPYmogPSBncm91cHNbZ3JvdXBLZXldO1xuICAgICAgICAgIGNvbnN0IG5ld0dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHJlc3BvbnNlLCB7XG4gICAgICAgICAgICBzY29wZTogQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGdyb3Vwcy5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld0dyb3VwT2JqKTtcblxuICAgICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBzO1xuICAgICAgICAgIGlmICh0aGlzLmVuYWJsZVNlbGVjdGVkR3JvdXBTdHlsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkR3JvdXAgPSBuZXdHcm91cE9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLm9uR3JvdXBDbGljay5lbWl0KG5ld0dyb3VwT2JqKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBqb2luaW5nIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgbGlzdCBvZiBncm91cHMgbWF0Y2hpbmcgdGhlIHNlYXJjaCBrZXlcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBzZWFyY2hHcm91cChldmVudCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIGxldCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdyb3VwUmVxdWVzdCA9IHRoaXMuZ3JvdXBMaXN0UmVxdWVzdEJ1aWxkZXIodmFsKTtcblxuICAgICAgdGhpcy5ncm91cGxpc3QgPSBbXTtcbiAgICAgIHRoaXMuZ2V0R3JvdXBzKCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBncm91cFVwZGF0ZWQgPSAoa2V5LCBtZXNzYWdlLCBncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9TQ09QRV9DSEFOR0VEOlxuICAgICAgICB0aGlzLnVwZGF0ZU1lbWJlckNoYW5nZWQoZ3JvdXAsIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVyUmVtb3ZlZChncm91cCwgb3B0aW9ucyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgICAgdGhpcy51cGRhdGVNZW1iZXJBZGRlZChncm91cCwgb3B0aW9ucyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWVtYmVySm9pbmVkKGdyb3VwLCBvcHRpb25zKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVNZW1iZXJSZW1vdmVkID0gKGdyb3VwLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IGdyb3VwbGlzdCA9IFsuLi50aGlzLmdyb3VwbGlzdF07XG5cbiAgICAvL3NlYXJjaCBmb3IgZ3JvdXBcbiAgICBsZXQgZ3JvdXBLZXkgPSBncm91cGxpc3QuZmluZEluZGV4KChnLCBrKSA9PiBnLmd1aWQgPT09IGdyb3VwLmd1aWQpO1xuXG4gICAgaWYgKGdyb3VwS2V5ID4gLTEpIHtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcblxuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgZ3JvdXApO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBsaXN0IH0pO1xuXG4gICAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG4gICAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBsaXN0IH0pO1xuICAgICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyQWRkZWQgPSAoZ3JvdXAsIG9wdGlvbnMpID0+IHtcbiAgICBsZXQgZ3JvdXBsaXN0ID0gWy4uLnRoaXMuZ3JvdXBsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciBncm91cFxuICAgIGxldCBncm91cEtleSA9IGdyb3VwbGlzdC5maW5kSW5kZXgoKGcsIGspID0+IGcuZ3VpZCA9PT0gZ3JvdXAuZ3VpZCk7XG5cbiAgICBpZiAoZ3JvdXBLZXkgPiAtMSkge1xuICAgICAgbGV0IGdyb3VwT2JqID0geyAuLi5ncm91cGxpc3RbZ3JvdXBLZXldIH07XG5cbiAgICAgIGxldCBtZW1iZXJzQ291bnQgPSBwYXJzZUludChncm91cC5tZW1iZXJzQ291bnQpO1xuXG4gICAgICBsZXQgc2NvcGUgPSBncm91cC5oYXNPd25Qcm9wZXJ0eShcInNjb3BlXCIpID8gZ3JvdXAuc2NvcGUgOiBcIlwiO1xuICAgICAgbGV0IGhhc0pvaW5lZCA9IGdyb3VwLmhhc093blByb3BlcnR5KFwiaGFzSm9pbmVkXCIpXG4gICAgICAgID8gZ3JvdXAuaGFzSm9pbmVkXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgIGhhc0pvaW5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgIGhhc0pvaW5lZDogaGFzSm9pbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGdyb3VwbGlzdC5zcGxpY2UoZ3JvdXBLZXksIDEsIG5ld2dyb3VwT2JqKTtcbiAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwbGlzdCB9KTtcbiAgICAgIHRoaXMuZ3JvdXBsaXN0ID0gZ3JvdXBsaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwIH07XG5cbiAgICAgIGxldCBzY29wZSA9IGdyb3VwT2JqLmhhc093blByb3BlcnR5KFwic2NvcGVcIikgPyBncm91cE9iai5zY29wZSA6IHt9O1xuICAgICAgbGV0IGhhc0pvaW5lZCA9IGdyb3VwT2JqLmhhc093blByb3BlcnR5KFwiaGFzSm9pbmVkXCIpXG4gICAgICAgID8gZ3JvdXBPYmouaGFzSm9pbmVkXG4gICAgICAgIDogZmFsc2U7XG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXBPYmoubWVtYmVyc0NvdW50KTtcbiAgICAgIHRoaXMuc2V0QXZhdGFyKGdyb3VwT2JqKTtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBzY29wZSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgIGhhc0pvaW5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdncm91cE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGdyb3VwT2JqLCB7XG4gICAgICAgIG1lbWJlcnNDb3VudDogbWVtYmVyc0NvdW50LFxuICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgIGhhc0pvaW5lZDogaGFzSm9pbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGdyb3VwTGlzdCA9IFtuZXdncm91cE9iaiwgLi4udGhpcy5ncm91cGxpc3RdO1xuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IGdyb3VwbGlzdDogZ3JvdXBMaXN0IH0pO1xuICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1lbWJlckpvaW5lZCA9IChncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBncm91cGxpc3QgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIGdyb3VwXG4gICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBsaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcblxuICAgICAgbGV0IHNjb3BlID0gZ3JvdXBPYmouc2NvcGU7XG4gICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoZ3JvdXAubWVtYmVyc0NvdW50KTtcblxuICAgICAgaWYgKG9wdGlvbnMgJiYgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBvcHRpb25zLnVzZXIudWlkKSB7XG4gICAgICAgIHNjb3BlID0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVDtcbiAgICAgIH1cblxuICAgICAgbGV0IG5ld2dyb3VwT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JvdXBPYmosIHtcbiAgICAgICAgbWVtYmVyc0NvdW50OiBtZW1iZXJzQ291bnQsXG4gICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIH0pO1xuXG4gICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAvLyB0aGlzLnNldFN0YXRlKHsgZ3JvdXBsaXN0OiBncm91cGxpc3QgfSk7XG4gICAgICB0aGlzLmdyb3VwbGlzdCA9IGdyb3VwbGlzdDtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyQ2hhbmdlZCA9IChncm91cCwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBncm91cGxpc3QgPSBbLi4udGhpcy5ncm91cGxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIGdyb3VwXG4gICAgbGV0IGdyb3VwS2V5ID0gZ3JvdXBsaXN0LmZpbmRJbmRleCgoZywgaykgPT4gZy5ndWlkID09PSBncm91cC5ndWlkKTtcblxuICAgIGlmIChncm91cEtleSA+IC0xKSB7XG4gICAgICBsZXQgZ3JvdXBPYmogPSB7IC4uLmdyb3VwbGlzdFtncm91cEtleV0gfTtcbiAgICAgIGlmIChvcHRpb25zICYmIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCA9PT0gb3B0aW9ucy51c2VyLnVpZCkge1xuICAgICAgICBsZXQgbmV3Z3JvdXBPYmogPSBPYmplY3QuYXNzaWduKHt9LCBncm91cE9iaiwgeyBzY29wZTogb3B0aW9ucy5zY29wZSB9KTtcblxuICAgICAgICBncm91cGxpc3Quc3BsaWNlKGdyb3VwS2V5LCAxLCBuZXdncm91cE9iaik7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBncm91cGxpc3Q6IGdyb3VwbGlzdCB9KTtcbiAgICAgICAgdGhpcy5ncm91cGxpc3QgPSBncm91cGxpc3Q7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJDb21ldCBDaGF0IEdyb3VwIExpc3QgLS0+IGFjdGlvbiBnZW5lcmF0aW9uIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9DUkVBVEVfR1JPVVBfVklFVzoge1xuICAgICAgICB0aGlzLnRvZ2dsZUNyZWF0ZUdyb3VwVmlldygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfQ1JFQVRFRDoge1xuICAgICAgICB0aGlzLnRvZ2dsZUNyZWF0ZUdyb3VwVmlldygpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyb3VwQWN0aW9uSGFuZGxlcihkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2Nyb2xsIGFjdGlvbiBvbiBHcm91cExpc3QgYW5kIGZldGNoZXMgbW9yZSBncm91cHMgaWYgdXNlciBzY3JvbGxzIHRvIGJvdHRvbSBvZiBncm91cCBsaXN0XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcblxuICAgIGlmIChib3R0b20pIHRoaXMuZ2V0R3JvdXBzKCk7XG4gIH1cblxuICAvKipcbiAgICogdG9nZ2xlcyBiZXR3ZWVuIG9wZW5pbmcgYW5kIGNsb3Npbmcgb2YgZ3JvdXBDcmVhdGlvblZpZXcgLyBncm91cCBjcmVhdGlvbiBmb3JtXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdG9nZ2xlQ3JlYXRlR3JvdXBWaWV3KCkge1xuICAgIHRoaXMub3BlbkNyZWF0ZUdyb3VwVmlldyA9ICF0aGlzLm9wZW5DcmVhdGVHcm91cFZpZXc7XG4gIH1cbn1cbiJdfQ==