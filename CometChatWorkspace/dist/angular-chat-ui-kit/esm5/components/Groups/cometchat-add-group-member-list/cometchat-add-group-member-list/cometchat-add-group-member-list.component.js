/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-add-group-member-list/cometchat-add-group-member-list/cometchat-add-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatAddGroupMemberListComponent = /** @class */ (function () {
    function CometchatAddGroupMemberListComponent() {
        var _this = this;
        this.item = null;
        this.type = null;
        this.memberlist = [];
        this.bannedmemberlist = [];
        this.friendsOnly = false;
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.userlist = [];
        this.membersToAdd = [];
        this.membersToRemove = [];
        this.filteredlist = [];
        this.addBtnText = STRING_MESSAGES.ADD;
        this.membersRequest = null;
        this.userListenerId = "userlist_" + new Date().getTime();
        this.USERS = STRING_MESSAGES.USERS;
        this.SEARCH = STRING_MESSAGES.SEARCH;
        /**
         * Updates user , based on user activity detected through listeners
         * @param Any user
         */
        this.userUpdated = (/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            /** @type {?} */
            var userlist = tslib_1.__spread(_this.userlist);
            //search for user
            /** @type {?} */
            var userKey = userlist.findIndex((/**
             * @param {?} u
             * @param {?} k
             * @return {?}
             */
            function (u, k) { return u.uid === user.uid; }));
            //if found in the list, update user object
            if (userKey > -1) {
                /** @type {?} */
                var userObj = userlist[userKey];
                //{...userlist[userKey]};
                /** @type {?} */
                var newUserObj = Object.assign({}, userObj, user);
                userlist.splice(userKey, 1, newUserObj);
                _this.userlist = userlist;
            }
        });
        /**
         * Searches for a list of users matching the search key
         * @param Event e
         */
        this.searchUsers = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this.timeout) {
                clearTimeout(_this.timeout);
            }
            /** @type {?} */
            var val = e.target.value;
            _this.timeout = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
                _this.membersRequest = _this.createMemberRequest(val);
                _this.userlist = [];
                _this.membersToAdd = [];
                _this.membersToRemove = [];
                _this.filteredlist = [];
                _this.getUsers();
            }), 500);
        });
        /**
         * fetches a list of users based on the member request config
         * @param
         */
        this.getUsers = (/**
         * @return {?}
         */
        function () {
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                _this.fetchNextUsers()
                    .then((/**
                 * @param {?} userList
                 * @return {?}
                 */
                function (userList) {
                    // userList.forEach(user => user = this.setAvatar(user));
                    // userList.forEach(user => user = this.setAvatar(user));
                    /** @type {?} */
                    var filteredUserList = userList.filter((/**
                     * @param {?} user
                     * @return {?}
                     */
                    function (user) {
                        /** @type {?} */
                        var found = _this.memberlist.find((/**
                         * @param {?} member
                         * @return {?}
                         */
                        function (member) { return user.uid === member.uid; }));
                        /** @type {?} */
                        var foundbanned = _this.bannedmemberlist.find((/**
                         * @param {?} member
                         * @return {?}
                         */
                        function (member) { return user.uid === member.uid; }));
                        if (found || foundbanned) {
                            return false;
                        }
                        return true;
                    }));
                    // this.setState({ userlist: [...this.state.userlist, ...userList], filteredlist: [...this.state.filteredlist, ...filteredUserList] });
                    _this.userlist = tslib_1.__spread(_this.userlist, userList);
                    _this.filteredlist = tslib_1.__spread(_this.filteredlist, filteredUserList);
                    if (_this.filteredlist.length === 0) {
                        _this.decoratorMessage = STRING_MESSAGES.NO_USERS_FOUND;
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
                    console.error("[CometChatAddMembers] getUsers fetchNext error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.decoratorMessage = STRING_MESSAGES.ERROR;
                console.log("[CometChatAddMembers] getUsers getLoggedInUser error", error);
            }));
        });
        /**
         * Updates the memberToAdd list
         * @param Any user
         */
        this.membersUpdated = (/**
         * @param {?} user
         * @param {?} userState
         * @return {?}
         */
        function (user, userState) {
            if (userState) {
                /** @type {?} */
                var members = tslib_1.__spread(_this.membersToAdd);
                members.push(user);
                _this.membersToAdd = tslib_1.__spread(members);
            }
            else {
                /** @type {?} */
                var membersToAdd = tslib_1.__spread(_this.membersToAdd);
                /** @type {?} */
                var IndexFound = membersToAdd.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) { return member.uid === user.uid; }));
                if (IndexFound > -1) {
                    membersToAdd.splice(IndexFound, 1);
                    _this.membersToAdd = tslib_1.__spread(membersToAdd);
                }
            }
        });
        /**
         * adds all the members of the memberToAdd list to the group
         * @param
         */
        this.updateMembers = (/**
         * @return {?}
         */
        function () {
            if (_this.addBtnText == STRING_MESSAGES.ADDING_MESSSAGE) {
                return;
            }
            _this.addBtnText = STRING_MESSAGES.ADDING_MESSSAGE;
            /** @type {?} */
            var guid = _this.item.guid;
            /** @type {?} */
            var membersList = [];
            _this.membersToAdd.forEach((/**
             * @param {?} newmember
             * @return {?}
             */
            function (newmember) {
                //if a selected member is already part of the member list, don't add
                /** @type {?} */
                var IndexFound = _this.memberlist.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) { return member.uid === newmember.uid; }));
                if (IndexFound === -1) {
                    /** @type {?} */
                    var newMember = new CometChat.GroupMember(newmember.uid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT);
                    membersList.push(newMember);
                    newmember["type"] = "add";
                }
            }));
            if (membersList.length) {
                /** @type {?} */
                var membersToAdd_1 = [];
                CometChat.addMembersToGroup(guid, membersList, [])
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (Object.keys(response).length) {
                        var _loop_1 = function (member) {
                            if (response[member] === "success") {
                                /** @type {?} */
                                var found = _this.userlist.find((/**
                                 * @param {?} user
                                 * @return {?}
                                 */
                                function (user) { return user.uid === member; }));
                                found["scope"] = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                                membersToAdd_1.push(found);
                            }
                        };
                        for (var member in response) {
                            _loop_1(member);
                        }
                        _this.actionGenerated.emit({
                            type: enums.ADD_GROUP_PARTICIPANTS,
                            payLoad: membersToAdd_1,
                        });
                    }
                    _this.closeAddMembersView();
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log("addMembersToGroup failed with exception:", error);
                }))
                    .finally((/**
                 * @return {?}
                 */
                function () {
                    _this.addBtnText = STRING_MESSAGES.ADD;
                }));
            }
        });
    }
    /**
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.membersRequest = this.createMemberRequest();
        this.getUsers();
        this.attachListeners(this.userUpdated);
    };
    /**
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
    };
    /**
     * Attaches the user listeners
     * @param function callback
     */
    /**
     * Attaches the user listeners
     * @param {?} callback
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.attachListeners = /**
     * Attaches the user listeners
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
                callback(onlineUser);
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            function (offlineUser) {
                /* when someuser/friend went offline, user will be received here */
                callback(offlineUser);
            }),
        }));
    };
    /**
     * Removes all the attached listeners
     * @param
     */
    /**
     * Removes all the attached listeners
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.removeListeners = /**
     * Removes all the attached listeners
     * @return {?}
     */
    function () {
        CometChat.removeUserListener(this.userListenerId);
    };
    /**
     * Builds a request for fetching a list of users matching the serach key
     * @param String searchKey
     */
    /**
     * Builds a request for fetching a list of users matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.createMemberRequest = /**
     * Builds a request for fetching a list of users matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    function (searchKey) {
        if (searchKey === void 0) { searchKey = ""; }
        /** @type {?} */
        var membersRequest = null;
        if (searchKey !== "") {
            membersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(30)
                .friendsOnly(this.friendsOnly)
                .setSearchKeyword(searchKey)
                .build();
        }
        else {
            membersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(30)
                .friendsOnly(this.friendsOnly)
                .build();
        }
        return membersRequest;
    };
    /**
     * Handles all the events emitted by child components
     * @param Event action
     */
    /**
     * Handles all the events emitted by child components
     * @param {?} action
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.actionHandler = /**
     * Handles all the events emitted by child components
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var data = action.payLoad;
        // console.log("comet chat add members --> action generated is ", action);
        switch (action.type) {
            case enums.MEMBER_UPDATED: {
                this.membersUpdated(data.user, data.userState);
                break;
            }
        }
    };
    /**
     * fetches a nexts set of list  of users based on the member request config
     * @param
     */
    /**
     * fetches a nexts set of list  of users based on the member request config
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.fetchNextUsers = /**
     * fetches a nexts set of list  of users based on the member request config
     * @return {?}
     */
    function () {
        return this.membersRequest.fetchNext();
    };
    /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param Event action
     */
    /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param {?} e
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.handleScroll = /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom)
            this.getUsers();
    };
    /**
     * @return {?}
     */
    CometchatAddGroupMemberListComponent.prototype.closeAddMembersView = /**
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_ADD_VIEW_MEMBER,
            payLoad: null,
        });
    };
    CometchatAddGroupMemberListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-add-group-member-list",
                    template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeAddMembersView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            USERS\n          }}\n        </caption>\n        <caption class=\"tableSearchStyle\">\n          <input\n            class=\"searchInputStyle\"\n            type=\"text\"\n            autoComplete=\"off\"\n            [placeholder]=\"SEARCH\"\n            (keyup)=\"searchUsers($event)\"\n          />\n        </caption>\n\n        <caption class=\"contactMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n          <p class=\"contactMsgTxtStyle\">{{ decoratorMessage }}</p>\n        </caption>\n\n        <tbody class=\"tableBodyStyle\" (scroll)=\"handleScroll($event)\">\n          <cometchat-add-group-member-list-item\n            *ngFor=\"let user of filteredlist\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [user]=\"user\"\n            [members]=\"memberlist\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-add-group-member-list-item>\n        </tbody>\n\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td colSpan=\"2\" (click)=\"updateMembers()\">\n              <button>{{ addBtnText }}</button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                    styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:80%}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableSearchStyle{font-weight:400;margin-bottom:15px}.searchInputStyle{width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><g><g><path fill=\"%23141414\" fill-opacity=\".4\" d=\"M5.338 9.028a3.69 3.69 0 0 1-3.695-3.693 3.69 3.69 0 0 1 3.695-3.693 3.69 3.69 0 0 1 3.696 3.693 3.69 3.69 0 0 1-3.696 3.693zm4.928 0h-.65l-.23-.221a5.333 5.333 0 0 0 1.216-4.383C10.216 2.143 8.312.321 6.012.042a5.34 5.34 0 0 0-5.97 5.966c.279 2.298 2.102 4.202 4.385 4.588a5.34 5.34 0 0 0 4.385-1.215l.222.23v.649l3.49 3.488a.868.868 0 0 0 1.223 0 .867.867 0 0 0 0-1.223z\"/></g></g></svg>') 10px center no-repeat rgba(20,20,20,.04)}.tableBodyStyle{height:100%;overflow-y:auto;display:block}.tableBodyStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle td{text-align:center}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;height:45%}.contactMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.tableBodyStyle{height:100%}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatAddGroupMemberListComponent.ctorParameters = function () { return []; };
    CometchatAddGroupMemberListComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        memberlist: [{ type: Input }],
        bannedmemberlist: [{ type: Input }],
        friendsOnly: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatAddGroupMemberListComponent;
}());
export { CometchatAddGroupMemberListComponent };
if (false) {
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.type;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.memberlist;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.bannedmemberlist;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.friendsOnly;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.userlist;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.membersToAdd;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.membersToRemove;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.filteredlist;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.timeout;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.addBtnText;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.membersRequest;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.USERS;
    /** @type {?} */
    CometchatAddGroupMemberListComponent.prototype.SEARCH;
    /**
     * Updates user , based on user activity detected through listeners
     * \@param Any user
     * @type {?}
     */
    CometchatAddGroupMemberListComponent.prototype.userUpdated;
    /**
     * Searches for a list of users matching the search key
     * \@param Event e
     * @type {?}
     */
    CometchatAddGroupMemberListComponent.prototype.searchUsers;
    /**
     * fetches a list of users based on the member request config
     * \@param
     * @type {?}
     */
    CometchatAddGroupMemberListComponent.prototype.getUsers;
    /**
     * Updates the memberToAdd list
     * \@param Any user
     * @type {?}
     */
    CometchatAddGroupMemberListComponent.prototype.membersUpdated;
    /**
     * adds all the members of the memberToAdd list to the group
     * \@param
     * @type {?}
     */
    CometchatAddGroupMemberListComponent.prototype.updateMembers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBNEJFO1FBQUEsaUJBQWdCO1FBdEJQLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFNUIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxxQkFBZ0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGVBQVUsR0FBVyxlQUFlLENBQUMsR0FBRyxDQUFDO1FBRXpDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsV0FBVyxHQUFH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LEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FFTCxNQUFNOztJQXVTVCwyQ0FBQztDQUFBLEFBblRELElBbVRDO1NBOVNZLG9DQUFvQzs7O0lBQy9DLG9EQUFxQjs7SUFDckIsb0RBQXFCOztJQUNyQiwwREFBeUI7O0lBQ3pCLGdFQUErQjs7SUFDL0IsMkRBQXNDOztJQUV0QywrREFBa0U7O0lBRWxFLGdFQUFvRDs7SUFDcEQsd0RBQWM7O0lBQ2QsNERBQWtCOztJQUNsQiwrREFBcUI7O0lBQ3JCLDREQUFrQjs7SUFDbEIsdURBQVE7O0lBQ1IsMERBQXlDOztJQUV6Qyw4REFBc0I7O0lBQ3RCLDhEQUFvRDs7SUFFcEQscURBQXNDOztJQUN0QyxzREFBd0M7Ozs7OztJQThDeEMsMkRBY0U7Ozs7OztJQTRCRiwyREFpQkU7Ozs7OztJQU1GLHdEQStDRTs7Ozs7O0lBdUJGLDhEQWVFOzs7Ozs7SUFNRiw2REFvREUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0QWRkR3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlcmxpc3QgPSBbXTtcbiAgQElucHV0KCkgYmFubmVkbWVtYmVybGlzdCA9IFtdO1xuICBASW5wdXQoKSBmcmllbmRzT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgdXNlcmxpc3QgPSBbXTtcbiAgbWVtYmVyc1RvQWRkID0gW107XG4gIG1lbWJlcnNUb1JlbW92ZSA9IFtdO1xuICBmaWx0ZXJlZGxpc3QgPSBbXTtcbiAgdGltZW91dDtcbiAgYWRkQnRuVGV4dDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkFERDtcblxuICBtZW1iZXJzUmVxdWVzdCA9IG51bGw7XG4gIHVzZXJMaXN0ZW5lcklkID0gXCJ1c2VybGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIFVTRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuVVNFUlM7XG4gIFNFQVJDSDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlNFQVJDSDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tZW1iZXJzUmVxdWVzdCA9IHRoaXMuY3JlYXRlTWVtYmVyUmVxdWVzdCgpO1xuICAgIHRoaXMuZ2V0VXNlcnMoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLnVzZXJVcGRhdGVkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgdGhlIHVzZXIgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKGNhbGxiYWNrKSB7XG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2sob25saW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhvZmZsaW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGF0dGFjaGVkIGxpc3RlbmVyc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdXNlciAsIGJhc2VkIG9uIHVzZXIgYWN0aXZpdHkgZGV0ZWN0ZWQgdGhyb3VnaCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIEFueSB1c2VyXG4gICAqL1xuICB1c2VyVXBkYXRlZCA9ICh1c2VyKSA9PiB7XG4gICAgbGV0IHVzZXJsaXN0ID0gWy4uLnRoaXMudXNlcmxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleCgodSwgaykgPT4gdS51aWQgPT09IHVzZXIudWlkKTtcblxuICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgIGlmICh1c2VyS2V5ID4gLTEpIHtcbiAgICAgIGxldCB1c2VyT2JqID0gdXNlcmxpc3RbdXNlcktleV07IC8vey4uLnVzZXJsaXN0W3VzZXJLZXldfTtcbiAgICAgIGxldCBuZXdVc2VyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdXNlck9iaiwgdXNlcik7XG4gICAgICB1c2VybGlzdC5zcGxpY2UodXNlcktleSwgMSwgbmV3VXNlck9iaik7XG5cbiAgICAgIHRoaXMudXNlcmxpc3QgPSB1c2VybGlzdDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHJlcXVlc3QgZm9yIGZldGNoaW5nIGEgbGlzdCBvZiB1c2VycyBtYXRjaGluZyB0aGUgc2VyYWNoIGtleVxuICAgKiBAcGFyYW0gU3RyaW5nIHNlYXJjaEtleVxuICAgKi9cbiAgY3JlYXRlTWVtYmVyUmVxdWVzdChzZWFyY2hLZXkgPSBcIlwiKSB7XG4gICAgbGV0IG1lbWJlcnNSZXF1ZXN0ID0gbnVsbDtcblxuICAgIGlmIChzZWFyY2hLZXkgIT09IFwiXCIpIHtcbiAgICAgIG1lbWJlcnNSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Vc2Vyc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgICAuZnJpZW5kc09ubHkodGhpcy5mcmllbmRzT25seSlcbiAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVtYmVyc1JlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LlVzZXJzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgIC5mcmllbmRzT25seSh0aGlzLmZyaWVuZHNPbmx5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbWJlcnNSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIGZvciBhIGxpc3Qgb2YgdXNlcnMgbWF0Y2hpbmcgdGhlIHNlYXJjaCBrZXlcbiAgICogQHBhcmFtIEV2ZW50IGVcbiAgICovXG4gIHNlYXJjaFVzZXJzID0gKGUpID0+IHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICBsZXQgdmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcblxuICAgICAgdGhpcy5tZW1iZXJzUmVxdWVzdCA9IHRoaXMuY3JlYXRlTWVtYmVyUmVxdWVzdCh2YWwpO1xuXG4gICAgICB0aGlzLnVzZXJsaXN0ID0gW107XG4gICAgICB0aGlzLm1lbWJlcnNUb0FkZCA9IFtdO1xuICAgICAgdGhpcy5tZW1iZXJzVG9SZW1vdmUgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVyZWRsaXN0ID0gW107XG4gICAgICB0aGlzLmdldFVzZXJzKCk7XG4gICAgfSwgNTAwKTtcbiAgfTtcblxuICAvKipcbiAgICogZmV0Y2hlcyBhIGxpc3Qgb2YgdXNlcnMgYmFzZWQgb24gdGhlIG1lbWJlciByZXF1ZXN0IGNvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldFVzZXJzID0gKCkgPT4ge1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRVc2VycygpXG4gICAgICAgICAgLnRoZW4oKHVzZXJMaXN0KSA9PiB7XG4gICAgICAgICAgICAvLyB1c2VyTGlzdC5mb3JFYWNoKHVzZXIgPT4gdXNlciA9IHRoaXMuc2V0QXZhdGFyKHVzZXIpKTtcblxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRVc2VyTGlzdCA9IHVzZXJMaXN0LmZpbHRlcigodXNlcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMubWVtYmVybGlzdC5maW5kKFxuICAgICAgICAgICAgICAgIChtZW1iZXIpID0+IHVzZXIudWlkID09PSBtZW1iZXIudWlkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kYmFubmVkID0gdGhpcy5iYW5uZWRtZW1iZXJsaXN0LmZpbmQoXG4gICAgICAgICAgICAgICAgKG1lbWJlcikgPT4gdXNlci51aWQgPT09IG1lbWJlci51aWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kIHx8IGZvdW5kYmFubmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB1c2VybGlzdDogWy4uLnRoaXMuc3RhdGUudXNlcmxpc3QsIC4uLnVzZXJMaXN0XSwgZmlsdGVyZWRsaXN0OiBbLi4udGhpcy5zdGF0ZS5maWx0ZXJlZGxpc3QsIC4uLmZpbHRlcmVkVXNlckxpc3RdIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVzZXJsaXN0ID0gWy4uLnRoaXMudXNlcmxpc3QsIC4uLnVzZXJMaXN0XTtcblxuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZGxpc3QgPSBbLi4udGhpcy5maWx0ZXJlZGxpc3QsIC4uLmZpbHRlcmVkVXNlckxpc3RdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJlZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19VU0VSU19GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIltDb21ldENoYXRBZGRNZW1iZXJzXSBnZXRVc2VycyBmZXRjaE5leHQgZXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuRVJST1I7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW0NvbWV0Q2hhdEFkZE1lbWJlcnNdIGdldFVzZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGV2ZW50cyBlbWl0dGVkIGJ5IGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJjb21ldCBjaGF0IGFkZCBtZW1iZXJzIC0tPiBhY3Rpb24gZ2VuZXJhdGVkIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5NRU1CRVJfVVBEQVRFRDoge1xuICAgICAgICB0aGlzLm1lbWJlcnNVcGRhdGVkKGRhdGEudXNlciwgZGF0YS51c2VyU3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgbWVtYmVyVG9BZGQgbGlzdFxuICAgKiBAcGFyYW0gQW55IHVzZXJcbiAgICovXG4gIG1lbWJlcnNVcGRhdGVkID0gKHVzZXIsIHVzZXJTdGF0ZSkgPT4ge1xuICAgIGlmICh1c2VyU3RhdGUpIHtcbiAgICAgIGNvbnN0IG1lbWJlcnMgPSBbLi4udGhpcy5tZW1iZXJzVG9BZGRdO1xuICAgICAgbWVtYmVycy5wdXNoKHVzZXIpO1xuICAgICAgdGhpcy5tZW1iZXJzVG9BZGQgPSBbLi4ubWVtYmVyc107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1lbWJlcnNUb0FkZCA9IFsuLi50aGlzLm1lbWJlcnNUb0FkZF07XG4gICAgICBjb25zdCBJbmRleEZvdW5kID0gbWVtYmVyc1RvQWRkLmZpbmRJbmRleChcbiAgICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLnVpZCA9PT0gdXNlci51aWRcbiAgICAgICk7XG4gICAgICBpZiAoSW5kZXhGb3VuZCA+IC0xKSB7XG4gICAgICAgIG1lbWJlcnNUb0FkZC5zcGxpY2UoSW5kZXhGb3VuZCwgMSk7XG4gICAgICAgIHRoaXMubWVtYmVyc1RvQWRkID0gWy4uLm1lbWJlcnNUb0FkZF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBhZGRzIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgbWVtYmVyVG9BZGQgbGlzdCB0byB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICB1cGRhdGVNZW1iZXJzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmFkZEJ0blRleHQgPT0gU1RSSU5HX01FU1NBR0VTLkFERElOR19NRVNTU0FHRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQnRuVGV4dCA9IFNUUklOR19NRVNTQUdFUy5BRERJTkdfTUVTU1NBR0U7XG5cbiAgICBjb25zdCBndWlkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgY29uc3QgbWVtYmVyc0xpc3QgPSBbXTtcblxuICAgIHRoaXMubWVtYmVyc1RvQWRkLmZvckVhY2goKG5ld21lbWJlcikgPT4ge1xuICAgICAgLy9pZiBhIHNlbGVjdGVkIG1lbWJlciBpcyBhbHJlYWR5IHBhcnQgb2YgdGhlIG1lbWJlciBsaXN0LCBkb24ndCBhZGRcbiAgICAgIGNvbnN0IEluZGV4Rm91bmQgPSB0aGlzLm1lbWJlcmxpc3QuZmluZEluZGV4KFxuICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIudWlkID09PSBuZXdtZW1iZXIudWlkXG4gICAgICApO1xuICAgICAgaWYgKEluZGV4Rm91bmQgPT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG5ld01lbWJlciA9IG5ldyBDb21ldENoYXQuR3JvdXBNZW1iZXIoXG4gICAgICAgICAgbmV3bWVtYmVyLnVpZCxcbiAgICAgICAgICBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UXG4gICAgICAgICk7XG4gICAgICAgIG1lbWJlcnNMaXN0LnB1c2gobmV3TWVtYmVyKTtcblxuICAgICAgICBuZXdtZW1iZXJbXCJ0eXBlXCJdID0gXCJhZGRcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtZW1iZXJzTGlzdC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1lbWJlcnNUb0FkZCA9IFtdO1xuICAgICAgQ29tZXRDaGF0LmFkZE1lbWJlcnNUb0dyb3VwKGd1aWQsIG1lbWJlcnNMaXN0LCBbXSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3BvbnNlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVtYmVyIGluIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZVttZW1iZXJdID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy51c2VybGlzdC5maW5kKCh1c2VyKSA9PiB1c2VyLnVpZCA9PT0gbWVtYmVyKTtcbiAgICAgICAgICAgICAgICBmb3VuZFtcInNjb3BlXCJdID0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVDtcbiAgICAgICAgICAgICAgICBtZW1iZXJzVG9BZGQucHVzaChmb3VuZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5BRERfR1JPVVBfUEFSVElDSVBBTlRTLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBtZW1iZXJzVG9BZGQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jbG9zZUFkZE1lbWJlcnNWaWV3KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZE1lbWJlcnNUb0dyb3VwIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkFERDtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBmZXRjaGVzIGEgbmV4dHMgc2V0IG9mIGxpc3QgIG9mIHVzZXJzIGJhc2VkIG9uIHRoZSBtZW1iZXIgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtXG4gICAqL1xuICBmZXRjaE5leHRVc2VycygpIHtcbiAgICByZXR1cm4gdGhpcy5tZW1iZXJzUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHNjcm9sbCBhY3Rpb24gb24gYWRkTWVtYmVyTGlzdCBhbmQgZmV0Y2hlcyBtb3JlIG1lbWJlcnMgdGhhdCBjYW4gYmUgYWRkZWQgdG8gZ3JvdXAgLCAgaWYgdXNlciBzY3JvbGxzIHRvIGJvdHRvbSBvZiBtZW1iZXJMaXN0XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgYm90dG9tID1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUuY3VycmVudFRhcmdldC5zY3JvbGxUb3ApID09PVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcbiAgICBpZiAoYm90dG9tKSB0aGlzLmdldFVzZXJzKCk7XG4gIH1cblxuICBjbG9zZUFkZE1lbWJlcnNWaWV3KCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xPU0VfQUREX1ZJRVdfTUVNQkVSLFxuICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfVxufVxuIl19