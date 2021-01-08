/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-add-group-member-list/cometchat-add-group-member-list/cometchat-add-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatAddGroupMemberListComponent {
    constructor() {
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
        (user) => {
            /** @type {?} */
            let userlist = [...this.userlist];
            //search for user
            /** @type {?} */
            let userKey = userlist.findIndex((/**
             * @param {?} u
             * @param {?} k
             * @return {?}
             */
            (u, k) => u.uid === user.uid));
            //if found in the list, update user object
            if (userKey > -1) {
                /** @type {?} */
                let userObj = userlist[userKey];
                //{...userlist[userKey]};
                /** @type {?} */
                let newUserObj = Object.assign({}, userObj, user);
                userlist.splice(userKey, 1, newUserObj);
                this.userlist = userlist;
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
        (e) => {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            /** @type {?} */
            let val = e.target.value;
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => {
                this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
                this.membersRequest = this.createMemberRequest(val);
                this.userlist = [];
                this.membersToAdd = [];
                this.membersToRemove = [];
                this.filteredlist = [];
                this.getUsers();
            }), 500);
        });
        /**
         * fetches a list of users based on the member request config
         * @param
         */
        this.getUsers = (/**
         * @return {?}
         */
        () => {
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.fetchNextUsers()
                    .then((/**
                 * @param {?} userList
                 * @return {?}
                 */
                (userList) => {
                    /** @type {?} */
                    const filteredUserList = userList.filter((/**
                     * @param {?} user
                     * @return {?}
                     */
                    (user) => {
                        /** @type {?} */
                        const found = this.memberlist.find((/**
                         * @param {?} member
                         * @return {?}
                         */
                        (member) => user.uid === member.uid));
                        /** @type {?} */
                        const foundbanned = this.bannedmemberlist.find((/**
                         * @param {?} member
                         * @return {?}
                         */
                        (member) => user.uid === member.uid));
                        if (found || foundbanned) {
                            return false;
                        }
                        return true;
                    }));
                    this.userlist = [...this.userlist, ...userList];
                    this.filteredlist = [...this.filteredlist, ...filteredUserList];
                    if (this.filteredlist.length === 0) {
                        this.decoratorMessage = STRING_MESSAGES.NO_USERS_FOUND;
                    }
                    else {
                        this.decoratorMessage = "";
                    }
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.decoratorMessage = STRING_MESSAGES.ERROR;
                    console.error("[CometChatAddMembers] getUsers fetchNext error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.decoratorMessage = STRING_MESSAGES.ERROR;
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
        (user, userState) => {
            if (userState) {
                /** @type {?} */
                const members = [...this.membersToAdd];
                members.push(user);
                this.membersToAdd = [...members];
            }
            else {
                /** @type {?} */
                const membersToAdd = [...this.membersToAdd];
                /** @type {?} */
                const IndexFound = membersToAdd.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => member.uid === user.uid));
                if (IndexFound > -1) {
                    membersToAdd.splice(IndexFound, 1);
                    this.membersToAdd = [...membersToAdd];
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
        () => {
            if (this.addBtnText == STRING_MESSAGES.ADDING_MESSSAGE) {
                return;
            }
            this.addBtnText = STRING_MESSAGES.ADDING_MESSSAGE;
            /** @type {?} */
            const guid = this.item.guid;
            /** @type {?} */
            const membersList = [];
            this.membersToAdd.forEach((/**
             * @param {?} newmember
             * @return {?}
             */
            (newmember) => {
                //if a selected member is already part of the member list, don't add
                /** @type {?} */
                const IndexFound = this.memberlist.findIndex((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => member.uid === newmember.uid));
                if (IndexFound === -1) {
                    /** @type {?} */
                    const newMember = new CometChat.GroupMember(newmember.uid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT);
                    membersList.push(newMember);
                    newmember["type"] = "add";
                }
            }));
            if (membersList.length) {
                /** @type {?} */
                const membersToAdd = [];
                CometChat.addMembersToGroup(guid, membersList, [])
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (Object.keys(response).length) {
                        for (const member in response) {
                            if (response[member] === "success") {
                                /** @type {?} */
                                const found = this.userlist.find((/**
                                 * @param {?} user
                                 * @return {?}
                                 */
                                (user) => user.uid === member));
                                found["scope"] = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                                membersToAdd.push(found);
                            }
                        }
                        this.actionGenerated.emit({
                            type: enums.ADD_GROUP_PARTICIPANTS,
                            payLoad: membersToAdd,
                        });
                    }
                    this.closeAddMembersView();
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    console.log("addMembersToGroup failed with exception:", error);
                }))
                    .finally((/**
                 * @return {?}
                 */
                () => {
                    this.addBtnText = STRING_MESSAGES.ADD;
                }));
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.membersRequest = this.createMemberRequest();
        this.getUsers();
        this.attachListeners(this.userUpdated);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListeners();
    }
    /**
     * Attaches the user listeners
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
        CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
            onUserOnline: (/**
             * @param {?} onlineUser
             * @return {?}
             */
            (onlineUser) => {
                /* when someuser/friend comes online, user will be received here */
                callback(onlineUser);
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            (offlineUser) => {
                /* when someuser/friend went offline, user will be received here */
                callback(offlineUser);
            }),
        }));
    }
    /**
     * Removes all the attached listeners
     * @return {?}
     */
    removeListeners() {
        CometChat.removeUserListener(this.userListenerId);
    }
    /**
     * Builds a request for fetching a list of users matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    createMemberRequest(searchKey = "") {
        /** @type {?} */
        let membersRequest = null;
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
    }
    /**
     * Handles all the events emitted by child components
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        /** @type {?} */
        let data = action.payLoad;
        // console.log("comet chat add members --> action generated is ", action);
        switch (action.type) {
            case enums.MEMBER_UPDATED: {
                this.membersUpdated(data.user, data.userState);
                break;
            }
        }
    }
    /**
     * fetches a nexts set of list  of users based on the member request config
     * @return {?}
     */
    fetchNextUsers() {
        return this.membersRequest.fetchNext();
    }
    /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom)
            this.getUsers();
    }
    /**
     * @return {?}
     */
    closeAddMembersView() {
        this.actionGenerated.emit({
            type: enums.CLOSE_ADD_VIEW_MEMBER,
            payLoad: null,
        });
    }
}
CometchatAddGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-add-group-member-list",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeAddMembersView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            USERS\n          }}\n        </caption>\n        <caption class=\"tableSearchStyle\">\n          <input\n            class=\"searchInputStyle\"\n            type=\"text\"\n            autoComplete=\"off\"\n            [placeholder]=\"SEARCH\"\n            (keyup)=\"searchUsers($event)\"\n          />\n        </caption>\n\n        <caption class=\"contactMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n          <p class=\"contactMsgTxtStyle\">{{ decoratorMessage }}</p>\n        </caption>\n\n        <tbody class=\"tableBodyStyle\" (scroll)=\"handleScroll($event)\">\n          <cometchat-add-group-member-list-item\n            *ngFor=\"let user of filteredlist\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [user]=\"user\"\n            [members]=\"memberlist\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-add-group-member-list-item>\n        </tbody>\n\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td colSpan=\"2\" (click)=\"updateMembers()\">\n              <button>{{ addBtnText }}</button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:80%}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableSearchStyle{font-weight:400;margin-bottom:15px}.searchInputStyle{width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><g><g><path fill=\"%23141414\" fill-opacity=\".4\" d=\"M5.338 9.028a3.69 3.69 0 0 1-3.695-3.693 3.69 3.69 0 0 1 3.695-3.693 3.69 3.69 0 0 1 3.696 3.693 3.69 3.69 0 0 1-3.696 3.693zm4.928 0h-.65l-.23-.221a5.333 5.333 0 0 0 1.216-4.383C10.216 2.143 8.312.321 6.012.042a5.34 5.34 0 0 0-5.97 5.966c.279 2.298 2.102 4.202 4.385 4.588a5.34 5.34 0 0 0 4.385-1.215l.222.23v.649l3.49 3.488a.868.868 0 0 0 1.223 0 .867.867 0 0 0 0-1.223z\"/></g></g></svg>') 10px center no-repeat rgba(20,20,20,.04)}.tableBodyStyle{height:100%;overflow-y:auto;display:block}.tableBodyStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle td{text-align:center}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;height:45%}.contactMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.tableBodyStyle{height:100%}}"]
            }] }
];
/** @nocollapse */
CometchatAddGroupMemberListComponent.ctorParameters = () => [];
CometchatAddGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    memberlist: [{ type: Input }],
    bannedmemberlist: [{ type: Input }],
    friendsOnly: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLG9DQUFvQztJQXVCL0M7UUF0QlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU1QixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLHFCQUFnQixHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsZUFBVSxHQUFXLGVBQWUsQ0FBQyxHQUFHLENBQUM7UUFFekMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxXQUFX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O21CQUNMLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBRUwsTUFBTTs7OztJQU5QLG9EQUFxQjs7SUFDckIsb0RBQXFCOztJQUNyQiwwREFBeUI7O0lBQ3pCLGdFQUErQjs7SUFDL0IsMkRBQXNDOztJQUV0QywrREFBa0U7O0lBRWxFLGdFQUFvRDs7SUFDcEQsd0RBQWM7O0lBQ2QsNERBQWtCOztJQUNsQiwrREFBcUI7O0lBQ3JCLDREQUFrQjs7SUFDbEIsdURBQVE7O0lBQ1IsMERBQXlDOztJQUV6Qyw4REFBc0I7O0lBQ3RCLDhEQUFvRDs7SUFFcEQscURBQXNDOztJQUN0QyxzREFBd0M7Ozs7OztJQThDeEMsMkRBY0U7Ozs7OztJQTRCRiwyREFpQkU7Ozs7OztJQU1GLHdEQTJDRTs7Ozs7O0lBdUJGLDhEQWVFOzs7Ozs7SUFNRiw2REFvREUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0QWRkR3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlcmxpc3QgPSBbXTtcbiAgQElucHV0KCkgYmFubmVkbWVtYmVybGlzdCA9IFtdO1xuICBASW5wdXQoKSBmcmllbmRzT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgdXNlcmxpc3QgPSBbXTtcbiAgbWVtYmVyc1RvQWRkID0gW107XG4gIG1lbWJlcnNUb1JlbW92ZSA9IFtdO1xuICBmaWx0ZXJlZGxpc3QgPSBbXTtcbiAgdGltZW91dDtcbiAgYWRkQnRuVGV4dDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkFERDtcblxuICBtZW1iZXJzUmVxdWVzdCA9IG51bGw7XG4gIHVzZXJMaXN0ZW5lcklkID0gXCJ1c2VybGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIFVTRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuVVNFUlM7XG4gIFNFQVJDSDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlNFQVJDSDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tZW1iZXJzUmVxdWVzdCA9IHRoaXMuY3JlYXRlTWVtYmVyUmVxdWVzdCgpO1xuICAgIHRoaXMuZ2V0VXNlcnMoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLnVzZXJVcGRhdGVkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgdGhlIHVzZXIgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKGNhbGxiYWNrKSB7XG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgY2FsbGJhY2sob25saW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cbiAgICAgICAgICBjYWxsYmFjayhvZmZsaW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGF0dGFjaGVkIGxpc3RlbmVyc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdXNlciAsIGJhc2VkIG9uIHVzZXIgYWN0aXZpdHkgZGV0ZWN0ZWQgdGhyb3VnaCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIEFueSB1c2VyXG4gICAqL1xuICB1c2VyVXBkYXRlZCA9ICh1c2VyKSA9PiB7XG4gICAgbGV0IHVzZXJsaXN0ID0gWy4uLnRoaXMudXNlcmxpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleCgodSwgaykgPT4gdS51aWQgPT09IHVzZXIudWlkKTtcblxuICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgIGlmICh1c2VyS2V5ID4gLTEpIHtcbiAgICAgIGxldCB1c2VyT2JqID0gdXNlcmxpc3RbdXNlcktleV07IC8vey4uLnVzZXJsaXN0W3VzZXJLZXldfTtcbiAgICAgIGxldCBuZXdVc2VyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdXNlck9iaiwgdXNlcik7XG4gICAgICB1c2VybGlzdC5zcGxpY2UodXNlcktleSwgMSwgbmV3VXNlck9iaik7XG5cbiAgICAgIHRoaXMudXNlcmxpc3QgPSB1c2VybGlzdDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHJlcXVlc3QgZm9yIGZldGNoaW5nIGEgbGlzdCBvZiB1c2VycyBtYXRjaGluZyB0aGUgc2VyYWNoIGtleVxuICAgKiBAcGFyYW0gU3RyaW5nIHNlYXJjaEtleVxuICAgKi9cbiAgY3JlYXRlTWVtYmVyUmVxdWVzdChzZWFyY2hLZXkgPSBcIlwiKSB7XG4gICAgbGV0IG1lbWJlcnNSZXF1ZXN0ID0gbnVsbDtcblxuICAgIGlmIChzZWFyY2hLZXkgIT09IFwiXCIpIHtcbiAgICAgIG1lbWJlcnNSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Vc2Vyc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldExpbWl0KDMwKVxuICAgICAgICAuZnJpZW5kc09ubHkodGhpcy5mcmllbmRzT25seSlcbiAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVtYmVyc1JlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LlVzZXJzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgIC5mcmllbmRzT25seSh0aGlzLmZyaWVuZHNPbmx5KVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbWJlcnNSZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIGZvciBhIGxpc3Qgb2YgdXNlcnMgbWF0Y2hpbmcgdGhlIHNlYXJjaCBrZXlcbiAgICogQHBhcmFtIEV2ZW50IGVcbiAgICovXG4gIHNlYXJjaFVzZXJzID0gKGUpID0+IHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICBsZXQgdmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcblxuICAgICAgdGhpcy5tZW1iZXJzUmVxdWVzdCA9IHRoaXMuY3JlYXRlTWVtYmVyUmVxdWVzdCh2YWwpO1xuXG4gICAgICB0aGlzLnVzZXJsaXN0ID0gW107XG4gICAgICB0aGlzLm1lbWJlcnNUb0FkZCA9IFtdO1xuICAgICAgdGhpcy5tZW1iZXJzVG9SZW1vdmUgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVyZWRsaXN0ID0gW107XG4gICAgICB0aGlzLmdldFVzZXJzKCk7XG4gICAgfSwgNTAwKTtcbiAgfTtcblxuICAvKipcbiAgICogZmV0Y2hlcyBhIGxpc3Qgb2YgdXNlcnMgYmFzZWQgb24gdGhlIG1lbWJlciByZXF1ZXN0IGNvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldFVzZXJzID0gKCkgPT4ge1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaE5leHRVc2VycygpXG4gICAgICAgICAgLnRoZW4oKHVzZXJMaXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFVzZXJMaXN0ID0gdXNlckxpc3QuZmlsdGVyKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5tZW1iZXJsaXN0LmZpbmQoXG4gICAgICAgICAgICAgICAgKG1lbWJlcikgPT4gdXNlci51aWQgPT09IG1lbWJlci51aWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRiYW5uZWQgPSB0aGlzLmJhbm5lZG1lbWJlcmxpc3QuZmluZChcbiAgICAgICAgICAgICAgICAobWVtYmVyKSA9PiB1c2VyLnVpZCA9PT0gbWVtYmVyLnVpZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoZm91bmQgfHwgZm91bmRiYW5uZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51c2VybGlzdCA9IFsuLi50aGlzLnVzZXJsaXN0LCAuLi51c2VyTGlzdF07XG5cbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRsaXN0ID0gWy4uLnRoaXMuZmlsdGVyZWRsaXN0LCAuLi5maWx0ZXJlZFVzZXJMaXN0XTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fVVNFUlNfRk9VTkQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbQ29tZXRDaGF0QWRkTWVtYmVyc10gZ2V0VXNlcnMgZmV0Y2hOZXh0IGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLkVSUk9SO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIltDb21ldENoYXRBZGRNZW1iZXJzXSBnZXRVc2VycyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBldmVudHMgZW1pdHRlZCBieSBjaGlsZCBjb21wb25lbnRzXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiY29tZXQgY2hhdCBhZGQgbWVtYmVycyAtLT4gYWN0aW9uIGdlbmVyYXRlZCBpcyBcIiwgYWN0aW9uKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuTUVNQkVSX1VQREFURUQ6IHtcbiAgICAgICAgdGhpcy5tZW1iZXJzVXBkYXRlZChkYXRhLnVzZXIsIGRhdGEudXNlclN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1lbWJlclRvQWRkIGxpc3RcbiAgICogQHBhcmFtIEFueSB1c2VyXG4gICAqL1xuICBtZW1iZXJzVXBkYXRlZCA9ICh1c2VyLCB1c2VyU3RhdGUpID0+IHtcbiAgICBpZiAodXNlclN0YXRlKSB7XG4gICAgICBjb25zdCBtZW1iZXJzID0gWy4uLnRoaXMubWVtYmVyc1RvQWRkXTtcbiAgICAgIG1lbWJlcnMucHVzaCh1c2VyKTtcbiAgICAgIHRoaXMubWVtYmVyc1RvQWRkID0gWy4uLm1lbWJlcnNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtZW1iZXJzVG9BZGQgPSBbLi4udGhpcy5tZW1iZXJzVG9BZGRdO1xuICAgICAgY29uc3QgSW5kZXhGb3VuZCA9IG1lbWJlcnNUb0FkZC5maW5kSW5kZXgoXG4gICAgICAgIChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IHVzZXIudWlkXG4gICAgICApO1xuICAgICAgaWYgKEluZGV4Rm91bmQgPiAtMSkge1xuICAgICAgICBtZW1iZXJzVG9BZGQuc3BsaWNlKEluZGV4Rm91bmQsIDEpO1xuICAgICAgICB0aGlzLm1lbWJlcnNUb0FkZCA9IFsuLi5tZW1iZXJzVG9BZGRdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogYWRkcyBhbGwgdGhlIG1lbWJlcnMgb2YgdGhlIG1lbWJlclRvQWRkIGxpc3QgdG8gdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlTWVtYmVycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5hZGRCdG5UZXh0ID09IFNUUklOR19NRVNTQUdFUy5BRERJTkdfTUVTU1NBR0UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEJ0blRleHQgPSBTVFJJTkdfTUVTU0FHRVMuQURESU5HX01FU1NTQUdFO1xuXG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIGNvbnN0IG1lbWJlcnNMaXN0ID0gW107XG5cbiAgICB0aGlzLm1lbWJlcnNUb0FkZC5mb3JFYWNoKChuZXdtZW1iZXIpID0+IHtcbiAgICAgIC8vaWYgYSBzZWxlY3RlZCBtZW1iZXIgaXMgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtZW1iZXIgbGlzdCwgZG9uJ3QgYWRkXG4gICAgICBjb25zdCBJbmRleEZvdW5kID0gdGhpcy5tZW1iZXJsaXN0LmZpbmRJbmRleChcbiAgICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLnVpZCA9PT0gbmV3bWVtYmVyLnVpZFxuICAgICAgKTtcbiAgICAgIGlmIChJbmRleEZvdW5kID09PSAtMSkge1xuICAgICAgICBjb25zdCBuZXdNZW1iZXIgPSBuZXcgQ29tZXRDaGF0Lkdyb3VwTWVtYmVyKFxuICAgICAgICAgIG5ld21lbWJlci51aWQsXG4gICAgICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVFxuICAgICAgICApO1xuICAgICAgICBtZW1iZXJzTGlzdC5wdXNoKG5ld01lbWJlcik7XG5cbiAgICAgICAgbmV3bWVtYmVyW1widHlwZVwiXSA9IFwiYWRkXCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobWVtYmVyc0xpc3QubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtZW1iZXJzVG9BZGQgPSBbXTtcbiAgICAgIENvbWV0Q2hhdC5hZGRNZW1iZXJzVG9Hcm91cChndWlkLCBtZW1iZXJzTGlzdCwgW10pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNwb25zZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lbWJlciBpbiByZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2VbbWVtYmVyXSA9PT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMudXNlcmxpc3QuZmluZCgodXNlcikgPT4gdXNlci51aWQgPT09IG1lbWJlcik7XG4gICAgICAgICAgICAgICAgZm91bmRbXCJzY29wZVwiXSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgICAgICAgICAgbWVtYmVyc1RvQWRkLnB1c2goZm91bmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuQUREX0dST1VQX1BBUlRJQ0lQQU5UUyxcbiAgICAgICAgICAgICAgcGF5TG9hZDogbWVtYmVyc1RvQWRkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2xvc2VBZGRNZW1iZXJzVmlldygpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZGRNZW1iZXJzVG9Hcm91cCBmYWlsZWQgd2l0aCBleGNlcHRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkQnRuVGV4dCA9IFNUUklOR19NRVNTQUdFUy5BREQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogZmV0Y2hlcyBhIG5leHRzIHNldCBvZiBsaXN0ICBvZiB1c2VycyBiYXNlZCBvbiB0aGUgbWVtYmVyIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZmV0Y2hOZXh0VXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVtYmVyc1JlcXVlc3QuZmV0Y2hOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzY3JvbGwgYWN0aW9uIG9uIGFkZE1lbWJlckxpc3QgYW5kIGZldGNoZXMgbW9yZSBtZW1iZXJzIHRoYXQgY2FuIGJlIGFkZGVkIHRvIGdyb3VwICwgIGlmIHVzZXIgc2Nyb2xscyB0byBib3R0b20gb2YgbWVtYmVyTGlzdFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG4gICAgaWYgKGJvdHRvbSkgdGhpcy5nZXRVc2VycygpO1xuICB9XG5cbiAgY2xvc2VBZGRNZW1iZXJzVmlldygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkNMT1NFX0FERF9WSUVXX01FTUJFUixcbiAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==