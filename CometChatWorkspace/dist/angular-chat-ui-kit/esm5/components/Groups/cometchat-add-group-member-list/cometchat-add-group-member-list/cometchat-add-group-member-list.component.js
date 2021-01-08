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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBNEJFO1FBQUEsaUJBQWdCO1FBdEJQLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFNUIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxxQkFBZ0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGVBQVUsR0FBVyxlQUFlLENBQUMsR0FBRyxDQUFDO1FBRXpDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsV0FBVyxHQUFH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Q0FDTCxLQUFLOzhCQUNMLEtBQUs7a0NBRUwsTUFBTTs7SUFtU1QsMkNBQUM7Q0FBQSxBQS9TRCxJQStTQztTQTFTWSxvQ0FBb0M7OztJQUMvQyxvREFBcUI7O0lBQ3JCLG9EQUFxQjs7SUFDckIsMERBQXlCOztJQUN6QixnRUFBK0I7O0lBQy9CLDJEQUFzQzs7SUFFdEMsK0RBQWtFOztJQUVsRSxnRUFBb0Q7O0lBQ3BELHdEQUFjOztJQUNkLDREQUFrQjs7SUFDbEIsK0RBQXFCOztJQUNyQiw0REFBa0I7O0lBQ2xCLHVEQUFROztJQUNSLDBEQUF5Qzs7SUFFekMsOERBQXNCOztJQUN0Qiw4REFBb0Q7O0lBRXBELHFEQUFzQzs7SUFDdEMsc0RBQXdDOzs7Ozs7SUE4Q3hDLDJEQWNFOzs7Ozs7SUE0QkYsMkRBaUJFOzs7Ozs7SUFNRix3REEyQ0U7Ozs7OztJQXVCRiw4REFlRTs7Ozs7O0lBTUYsNkRBb0RFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEFkZEdyb3VwTWVtYmVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXJsaXN0ID0gW107XG4gIEBJbnB1dCgpIGJhbm5lZG1lbWJlcmxpc3QgPSBbXTtcbiAgQElucHV0KCkgZnJpZW5kc09ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBkZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIHVzZXJsaXN0ID0gW107XG4gIG1lbWJlcnNUb0FkZCA9IFtdO1xuICBtZW1iZXJzVG9SZW1vdmUgPSBbXTtcbiAgZmlsdGVyZWRsaXN0ID0gW107XG4gIHRpbWVvdXQ7XG4gIGFkZEJ0blRleHQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5BREQ7XG5cbiAgbWVtYmVyc1JlcXVlc3QgPSBudWxsO1xuICB1c2VyTGlzdGVuZXJJZCA9IFwidXNlcmxpc3RfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBVU0VSUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlVTRVJTO1xuICBTRUFSQ0g6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TRUFSQ0g7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWVtYmVyc1JlcXVlc3QgPSB0aGlzLmNyZWF0ZU1lbWJlclJlcXVlc3QoKTtcbiAgICB0aGlzLmdldFVzZXJzKCk7XG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnModGhpcy51c2VyVXBkYXRlZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHRoZSB1c2VyIGxpc3RlbmVyc1xuICAgKiBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2tcbiAgICovXG4gIGF0dGFjaExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRVc2VyTGlzdGVuZXIoXG4gICAgICB0aGlzLnVzZXJMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Vc2VyTGlzdGVuZXIoe1xuICAgICAgICBvblVzZXJPbmxpbmU6IChvbmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgY29tZXMgb25saW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuICAgICAgICAgIGNhbGxiYWNrKG9ubGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2sob2ZmbGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBhdHRhY2hlZCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHVzZXIgLCBiYXNlZCBvbiB1c2VyIGFjdGl2aXR5IGRldGVjdGVkIHRocm91Z2ggbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBBbnkgdXNlclxuICAgKi9cbiAgdXNlclVwZGF0ZWQgPSAodXNlcikgPT4ge1xuICAgIGxldCB1c2VybGlzdCA9IFsuLi50aGlzLnVzZXJsaXN0XTtcblxuICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgbGV0IHVzZXJLZXkgPSB1c2VybGlzdC5maW5kSW5kZXgoKHUsIGspID0+IHUudWlkID09PSB1c2VyLnVpZCk7XG5cbiAgICAvL2lmIGZvdW5kIGluIHRoZSBsaXN0LCB1cGRhdGUgdXNlciBvYmplY3RcbiAgICBpZiAodXNlcktleSA+IC0xKSB7XG4gICAgICBsZXQgdXNlck9iaiA9IHVzZXJsaXN0W3VzZXJLZXldOyAvL3suLi51c2VybGlzdFt1c2VyS2V5XX07XG4gICAgICBsZXQgbmV3VXNlck9iaiA9IE9iamVjdC5hc3NpZ24oe30sIHVzZXJPYmosIHVzZXIpO1xuICAgICAgdXNlcmxpc3Quc3BsaWNlKHVzZXJLZXksIDEsIG5ld1VzZXJPYmopO1xuXG4gICAgICB0aGlzLnVzZXJsaXN0ID0gdXNlcmxpc3Q7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSByZXF1ZXN0IGZvciBmZXRjaGluZyBhIGxpc3Qgb2YgdXNlcnMgbWF0Y2hpbmcgdGhlIHNlcmFjaCBrZXlcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIGNyZWF0ZU1lbWJlclJlcXVlc3Qoc2VhcmNoS2V5ID0gXCJcIikge1xuICAgIGxldCBtZW1iZXJzUmVxdWVzdCA9IG51bGw7XG5cbiAgICBpZiAoc2VhcmNoS2V5ICE9PSBcIlwiKSB7XG4gICAgICBtZW1iZXJzUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuVXNlcnNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgLmZyaWVuZHNPbmx5KHRoaXMuZnJpZW5kc09ubHkpXG4gICAgICAgIC5zZXRTZWFyY2hLZXl3b3JkKHNlYXJjaEtleSlcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lbWJlcnNSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Vc2Vyc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgICAuZnJpZW5kc09ubHkodGhpcy5mcmllbmRzT25seSlcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuICAgIHJldHVybiBtZW1iZXJzUmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBsaXN0IG9mIHVzZXJzIG1hdGNoaW5nIHRoZSBzZWFyY2gga2V5XG4gICAqIEBwYXJhbSBFdmVudCBlXG4gICAqL1xuICBzZWFyY2hVc2VycyA9IChlKSA9PiB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgbGV0IHZhbCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG5cbiAgICAgIHRoaXMubWVtYmVyc1JlcXVlc3QgPSB0aGlzLmNyZWF0ZU1lbWJlclJlcXVlc3QodmFsKTtcblxuICAgICAgdGhpcy51c2VybGlzdCA9IFtdO1xuICAgICAgdGhpcy5tZW1iZXJzVG9BZGQgPSBbXTtcbiAgICAgIHRoaXMubWVtYmVyc1RvUmVtb3ZlID0gW107XG4gICAgICB0aGlzLmZpbHRlcmVkbGlzdCA9IFtdO1xuICAgICAgdGhpcy5nZXRVc2VycygpO1xuICAgIH0sIDUwMCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGZldGNoZXMgYSBsaXN0IG9mIHVzZXJzIGJhc2VkIG9uIHRoZSBtZW1iZXIgcmVxdWVzdCBjb25maWdcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRVc2VycyA9ICgpID0+IHtcbiAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hOZXh0VXNlcnMoKVxuICAgICAgICAgIC50aGVuKCh1c2VyTGlzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRVc2VyTGlzdCA9IHVzZXJMaXN0LmZpbHRlcigodXNlcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMubWVtYmVybGlzdC5maW5kKFxuICAgICAgICAgICAgICAgIChtZW1iZXIpID0+IHVzZXIudWlkID09PSBtZW1iZXIudWlkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kYmFubmVkID0gdGhpcy5iYW5uZWRtZW1iZXJsaXN0LmZpbmQoXG4gICAgICAgICAgICAgICAgKG1lbWJlcikgPT4gdXNlci51aWQgPT09IG1lbWJlci51aWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kIHx8IGZvdW5kYmFubmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudXNlcmxpc3QgPSBbLi4udGhpcy51c2VybGlzdCwgLi4udXNlckxpc3RdO1xuXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkbGlzdCA9IFsuLi50aGlzLmZpbHRlcmVkbGlzdCwgLi4uZmlsdGVyZWRVc2VyTGlzdF07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcmVkbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX1VTRVJTX0ZPVU5EO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5FUlJPUjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiW0NvbWV0Q2hhdEFkZE1lbWJlcnNdIGdldFVzZXJzIGZldGNoTmV4dCBlcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5FUlJPUjtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0QWRkTWVtYmVyc10gZ2V0VXNlcnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgZXZlbnRzIGVtaXR0ZWQgYnkgY2hpbGQgY29tcG9uZW50c1xuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcImNvbWV0IGNoYXQgYWRkIG1lbWJlcnMgLS0+IGFjdGlvbiBnZW5lcmF0ZWQgaXMgXCIsIGFjdGlvbik7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLk1FTUJFUl9VUERBVEVEOiB7XG4gICAgICAgIHRoaXMubWVtYmVyc1VwZGF0ZWQoZGF0YS51c2VyLCBkYXRhLnVzZXJTdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBtZW1iZXJUb0FkZCBsaXN0XG4gICAqIEBwYXJhbSBBbnkgdXNlclxuICAgKi9cbiAgbWVtYmVyc1VwZGF0ZWQgPSAodXNlciwgdXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKHVzZXJTdGF0ZSkge1xuICAgICAgY29uc3QgbWVtYmVycyA9IFsuLi50aGlzLm1lbWJlcnNUb0FkZF07XG4gICAgICBtZW1iZXJzLnB1c2godXNlcik7XG4gICAgICB0aGlzLm1lbWJlcnNUb0FkZCA9IFsuLi5tZW1iZXJzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWVtYmVyc1RvQWRkID0gWy4uLnRoaXMubWVtYmVyc1RvQWRkXTtcbiAgICAgIGNvbnN0IEluZGV4Rm91bmQgPSBtZW1iZXJzVG9BZGQuZmluZEluZGV4KFxuICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIudWlkID09PSB1c2VyLnVpZFxuICAgICAgKTtcbiAgICAgIGlmIChJbmRleEZvdW5kID4gLTEpIHtcbiAgICAgICAgbWVtYmVyc1RvQWRkLnNwbGljZShJbmRleEZvdW5kLCAxKTtcbiAgICAgICAgdGhpcy5tZW1iZXJzVG9BZGQgPSBbLi4ubWVtYmVyc1RvQWRkXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGFkZHMgYWxsIHRoZSBtZW1iZXJzIG9mIHRoZSBtZW1iZXJUb0FkZCBsaXN0IHRvIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHVwZGF0ZU1lbWJlcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYWRkQnRuVGV4dCA9PSBTVFJJTkdfTUVTU0FHRVMuQURESU5HX01FU1NTQUdFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGRCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkFERElOR19NRVNTU0FHRTtcblxuICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICBjb25zdCBtZW1iZXJzTGlzdCA9IFtdO1xuXG4gICAgdGhpcy5tZW1iZXJzVG9BZGQuZm9yRWFjaCgobmV3bWVtYmVyKSA9PiB7XG4gICAgICAvL2lmIGEgc2VsZWN0ZWQgbWVtYmVyIGlzIGFscmVhZHkgcGFydCBvZiB0aGUgbWVtYmVyIGxpc3QsIGRvbid0IGFkZFxuICAgICAgY29uc3QgSW5kZXhGb3VuZCA9IHRoaXMubWVtYmVybGlzdC5maW5kSW5kZXgoXG4gICAgICAgIChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IG5ld21lbWJlci51aWRcbiAgICAgICk7XG4gICAgICBpZiAoSW5kZXhGb3VuZCA9PT0gLTEpIHtcbiAgICAgICAgY29uc3QgbmV3TWVtYmVyID0gbmV3IENvbWV0Q2hhdC5Hcm91cE1lbWJlcihcbiAgICAgICAgICBuZXdtZW1iZXIudWlkLFxuICAgICAgICAgIENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlRcbiAgICAgICAgKTtcbiAgICAgICAgbWVtYmVyc0xpc3QucHVzaChuZXdNZW1iZXIpO1xuXG4gICAgICAgIG5ld21lbWJlcltcInR5cGVcIl0gPSBcImFkZFwiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1lbWJlcnNMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3QgbWVtYmVyc1RvQWRkID0gW107XG4gICAgICBDb21ldENoYXQuYWRkTWVtYmVyc1RvR3JvdXAoZ3VpZCwgbWVtYmVyc0xpc3QsIFtdKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzcG9uc2UpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZW1iZXIgaW4gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlW21lbWJlcl0gPT09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLnVzZXJsaXN0LmZpbmQoKHVzZXIpID0+IHVzZXIudWlkID09PSBtZW1iZXIpO1xuICAgICAgICAgICAgICAgIGZvdW5kW1wic2NvcGVcIl0gPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICAgICAgICAgICAgICAgIG1lbWJlcnNUb0FkZC5wdXNoKGZvdW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLkFERF9HUk9VUF9QQVJUSUNJUEFOVFMsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IG1lbWJlcnNUb0FkZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNsb3NlQWRkTWVtYmVyc1ZpZXcoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkTWVtYmVyc1RvR3JvdXAgZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZEJ0blRleHQgPSBTVFJJTkdfTUVTU0FHRVMuQUREO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGZldGNoZXMgYSBuZXh0cyBzZXQgb2YgbGlzdCAgb2YgdXNlcnMgYmFzZWQgb24gdGhlIG1lbWJlciByZXF1ZXN0IGNvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGZldGNoTmV4dFVzZXJzKCkge1xuICAgIHJldHVybiB0aGlzLm1lbWJlcnNSZXF1ZXN0LmZldGNoTmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2Nyb2xsIGFjdGlvbiBvbiBhZGRNZW1iZXJMaXN0IGFuZCBmZXRjaGVzIG1vcmUgbWVtYmVycyB0aGF0IGNhbiBiZSBhZGRlZCB0byBncm91cCAsICBpZiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tIG9mIG1lbWJlckxpc3RcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChib3R0b20pIHRoaXMuZ2V0VXNlcnMoKTtcbiAgfVxuXG4gIGNsb3NlQWRkTWVtYmVyc1ZpZXcoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5DTE9TRV9BRERfVklFV19NRU1CRVIsXG4gICAgICBwYXlMb2FkOiBudWxsLFxuICAgIH0pO1xuICB9XG59XG4iXX0=