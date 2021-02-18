/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-add-group-member-list/cometchat-add-group-member-list/cometchat-add-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatAddGroupMemberListComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.memberList = [];
        this.bannedMemberList = [];
        this.friendsOnly = false;
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
        this.userlist = [];
        this.membersToAdd = [];
        this.membersToRemove = [];
        this.filteredList = [];
        this.addBtnText = COMETCHAT_CONSTANTS.ADD;
        this.membersRequest = null;
        this.userListenerId = enums.USER_LIST_ + new Date().getTime();
        this.USERS = COMETCHAT_CONSTANTS.USERS;
        this.SEARCH = COMETCHAT_CONSTANTS.SEARCH;
        /**
         * Updates user , based on user activity detected through listeners
         * @param Any user
         */
        this.userUpdated = (/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            try {
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
                    /** @type {?} */
                    let newUserObj = Object.assign({}, userObj, user);
                    userlist.splice(userKey, 1, newUserObj);
                    this.userlist = userlist;
                }
            }
            catch (error) {
                logger(error);
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
            try {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                /** @type {?} */
                let val = e.target.value;
                this.timeout = setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
                    this.membersRequest = this.createMemberRequest(val);
                    this.userlist = [];
                    this.membersToAdd = [];
                    this.membersToRemove = [];
                    this.filteredList = [];
                    this.getUsers();
                }), 500);
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * fetches a list of users based on the member request config
         * @param
         */
        this.getUsers = (/**
         * @return {?}
         */
        () => {
            try {
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
                            const found = this.memberList.find((/**
                             * @param {?} member
                             * @return {?}
                             */
                            (member) => user.uid === member.uid));
                            /** @type {?} */
                            const foundBanned = this.bannedMemberList.find((/**
                             * @param {?} member
                             * @return {?}
                             */
                            (member) => user.uid === member.uid));
                            if (found || foundBanned) {
                                return false;
                            }
                            return true;
                        }));
                        this.userlist = [...this.userlist, ...userList];
                        this.filteredList = [...this.filteredList, ...filteredUserList];
                        if (this.filteredList.length === 0) {
                            this.decoratorMessage = COMETCHAT_CONSTANTS.NO_USERS_FOUND;
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
                        this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                        logger("[CometChatAddMembers] getUsers fetchNext error", error);
                    }));
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
                    logger("[CometChatAddMembers] getUsers getLoggedInUser error", error);
                }));
            }
            catch (error) {
                logger(error);
            }
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
            try {
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
            }
            catch (error) {
                logger(error);
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
            try {
                if (this.addBtnText == COMETCHAT_CONSTANTS.ADDING_MESSSAGE) {
                    return;
                }
                this.addBtnText = COMETCHAT_CONSTANTS.ADDING_MESSSAGE;
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
                    const IndexFound = this.memberList.findIndex((/**
                     * @param {?} member
                     * @return {?}
                     */
                    (member) => member.uid === newmember.uid));
                    if (IndexFound === -1) {
                        /** @type {?} */
                        const newMember = new CometChat.GroupMember(newmember.uid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT);
                        membersList.push(newMember);
                        newmember[enums.TYPE] = enums.ADD;
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
                                if (response[member] === enums.SUCCESS) {
                                    /** @type {?} */
                                    const found = this.userlist.find((/**
                                     * @param {?} user
                                     * @return {?}
                                     */
                                    (user) => user.uid === member));
                                    found[enums.SCOPE] = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
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
                        logger("addMembersToGroup failed with exception:", error);
                    }))
                        .finally((/**
                     * @return {?}
                     */
                    () => {
                        this.addBtnText = COMETCHAT_CONSTANTS.ADD;
                    }));
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
            this.membersRequest = this.createMemberRequest();
            this.getUsers();
            this.attachListeners(this.userUpdated);
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
     * Attaches the user listeners
     * @param {?} callback
     * @return {?}
     */
    attachListeners(callback) {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes all the attached listeners
     * @return {?}
     */
    removeListeners() {
        try {
            CometChat.removeUserListener(this.userListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Builds a request for fetching a list of users matching the serach key
     * @param {?=} searchKey
     * @return {?}
     */
    createMemberRequest(searchKey = "") {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the events emitted by child components
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            /** @type {?} */
            let data = action.payLoad;
            switch (action.type) {
                case enums.MEMBER_UPDATED: {
                    this.membersUpdated(data.user, data.userState);
                    break;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * fetches a nexts set of list  of users based on the member request config
     * @return {?}
     */
    fetchNextUsers() {
        try {
            return this.membersRequest.fetchNext();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
                Math.round(e.currentTarget.clientHeight);
            if (bottom)
                this.getUsers();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * emits an action to close the addMember modal
     * @return {?}
     */
    closeAddMembersView() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_ADD_VIEW_MEMBER,
                payLoad: null,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatAddGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-add-group-member-list",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeAddMembersView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            USERS\n          }}\n        </caption>\n        <caption class=\"tableSearchStyle\">\n          <input\n            class=\"searchInputStyle\"\n            type=\"text\"\n            autoComplete=\"off\"\n            [placeholder]=\"SEARCH\"\n            (keyup)=\"searchUsers($event)\"\n          />\n        </caption>\n\n        <caption class=\"contactMsgStyle\" *ngIf=\"decoratorMessage !== ''\">\n          <p class=\"contactMsgTxtStyle\">{{ decoratorMessage }}</p>\n        </caption>\n\n        <tbody class=\"tableBodyStyle\" (scroll)=\"handleScroll($event)\">\n          <cometchat-add-group-member-list-item\n            *ngFor=\"let user of filteredList\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [user]=\"user\"\n            [members]=\"memberList\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-add-group-member-list-item>\n        </tbody>\n\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td colSpan=\"2\" (click)=\"updateMembers()\">\n              <button>{{ addBtnText }}</button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:80%}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableSearchStyle{font-weight:400;margin-bottom:15px}.searchInputStyle{width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;color:#141414;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><g><g><path fill=\"%23141414\" fill-opacity=\".4\" d=\"M5.338 9.028a3.69 3.69 0 0 1-3.695-3.693 3.69 3.69 0 0 1 3.695-3.693 3.69 3.69 0 0 1 3.696 3.693 3.69 3.69 0 0 1-3.696 3.693zm4.928 0h-.65l-.23-.221a5.333 5.333 0 0 0 1.216-4.383C10.216 2.143 8.312.321 6.012.042a5.34 5.34 0 0 0-5.97 5.966c.279 2.298 2.102 4.202 4.385 4.588a5.34 5.34 0 0 0 4.385-1.215l.222.23v.649l3.49 3.488a.868.868 0 0 0 1.223 0 .867.867 0 0 0 0-1.223z\"/></g></g></svg>') 10px center no-repeat rgba(20,20,20,.04)}.tableBodyStyle{height:100%;overflow-y:auto;display:block}.tableBodyStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle td{text-align:center}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;height:45%}.contactMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.tableBodyStyle{height:100%}}"]
            }] }
];
/** @nocollapse */
CometChatAddGroupMemberListComponent.ctorParameters = () => [];
CometChatAddGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    memberList: [{ type: Input }],
    bannedMemberList: [{ type: Input }],
    friendsOnly: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.type;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.memberList;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.bannedMemberList;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.friendsOnly;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.userlist;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.membersToAdd;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.membersToRemove;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.filteredList;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.timeout;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.addBtnText;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.membersRequest;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.userListenerId;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.USERS;
    /** @type {?} */
    CometChatAddGroupMemberListComponent.prototype.SEARCH;
    /**
     * Updates user , based on user activity detected through listeners
     * \@param Any user
     * @type {?}
     */
    CometChatAddGroupMemberListComponent.prototype.userUpdated;
    /**
     * Searches for a list of users matching the search key
     * \@param Event e
     * @type {?}
     */
    CometChatAddGroupMemberListComponent.prototype.searchUsers;
    /**
     * fetches a list of users based on the member request config
     * \@param
     * @type {?}
     */
    CometChatAddGroupMemberListComponent.prototype.getUsers;
    /**
     * Updates the memberToAdd list
     * \@param Any user
     * @type {?}
     */
    CometChatAddGroupMemberListComponent.prototype.membersUpdated;
    /**
     * adds all the members of the memberToAdd list to the group
     * \@param
     * @type {?}
     */
    CometChatAddGroupMemberListComponent.prototype.updateMembers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvQ29tZXRDaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPbEQsTUFBTSxPQUFPLG9DQUFvQztJQXVCL0M7UUF0QlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU1QixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLHFCQUFnQixHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ3hELGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixlQUFVLEdBQVcsbUJBQW1CLENBQUMsR0FBRyxDQUFD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QUUsS0FBSyxDQUFDLHFCQUFxQjtnQkFDakMsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFuV0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLGkvQ0FBK0Q7O2FBRWhFOzs7OzttQkFFRSxLQUFLO21CQUNMLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBRUwsTUFBTTs7OztJQU5QLG9EQUFxQjs7SUFDckIsb0RBQXFCOztJQUNyQiwwREFBeUI7O0lBQ3pCLGdFQUErQjs7SUFDL0IsMkRBQXNDOztJQUV0QywrREFBa0U7O0lBRWxFLGdFQUF3RDs7SUFDeEQsd0RBQWM7O0lBQ2QsNERBQWtCOztJQUNsQiwrREFBcUI7O0lBQ3JCLDREQUFrQjs7SUFDbEIsdURBQVE7O0lBQ1IsMERBQTZDOztJQUU3Qyw4REFBc0I7O0lBQ3RCLDhEQUF5RDs7SUFFekQscURBQTBDOztJQUMxQyxzREFBNEM7Ozs7OztJQThENUMsMkRBa0JFOzs7Ozs7SUFnQ0YsMkRBcUJFOzs7Ozs7SUFNRix3REF5Q0U7Ozs7OztJQXlCRiw4REFtQkU7Ozs7OztJQU1GLDZEQTBERSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0QWRkR3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlckxpc3QgPSBbXTtcbiAgQElucHV0KCkgYmFubmVkTWVtYmVyTGlzdCA9IFtdO1xuICBASW5wdXQoKSBmcmllbmRzT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkxPQURJTkdfTUVTU1NBR0U7XG4gIHVzZXJsaXN0ID0gW107XG4gIG1lbWJlcnNUb0FkZCA9IFtdO1xuICBtZW1iZXJzVG9SZW1vdmUgPSBbXTtcbiAgZmlsdGVyZWRMaXN0ID0gW107XG4gIHRpbWVvdXQ7XG4gIGFkZEJ0blRleHQ6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQUREO1xuXG4gIG1lbWJlcnNSZXF1ZXN0ID0gbnVsbDtcbiAgdXNlckxpc3RlbmVySWQgPSBlbnVtcy5VU0VSX0xJU1RfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgVVNFUlM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuVVNFUlM7XG4gIFNFQVJDSDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5TRUFSQ0g7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1lbWJlcnNSZXF1ZXN0ID0gdGhpcy5jcmVhdGVNZW1iZXJSZXF1ZXN0KCk7XG4gICAgICB0aGlzLmdldFVzZXJzKCk7XG4gICAgICB0aGlzLmF0dGFjaExpc3RlbmVycyh0aGlzLnVzZXJVcGRhdGVkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgdGhlIHVzZXIgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKGNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5hZGRVc2VyTGlzdGVuZXIoXG4gICAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuVXNlckxpc3RlbmVyKHtcbiAgICAgICAgICBvblVzZXJPbmxpbmU6IChvbmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG4gICAgICAgICAgICBjYWxsYmFjayhvbmxpbmVVc2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgd2VudCBvZmZsaW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuICAgICAgICAgICAgY2FsbGJhY2sob2ZmbGluZVVzZXIpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgYXR0YWNoZWQgbGlzdGVuZXJzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHVzZXIgLCBiYXNlZCBvbiB1c2VyIGFjdGl2aXR5IGRldGVjdGVkIHRocm91Z2ggbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBBbnkgdXNlclxuICAgKi9cbiAgdXNlclVwZGF0ZWQgPSAodXNlcikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdXNlcmxpc3QgPSBbLi4udGhpcy51c2VybGlzdF07XG5cbiAgICAgIC8vc2VhcmNoIGZvciB1c2VyXG4gICAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleCgodSwgaykgPT4gdS51aWQgPT09IHVzZXIudWlkKTtcblxuICAgICAgLy9pZiBmb3VuZCBpbiB0aGUgbGlzdCwgdXBkYXRlIHVzZXIgb2JqZWN0XG4gICAgICBpZiAodXNlcktleSA+IC0xKSB7XG4gICAgICAgIGxldCB1c2VyT2JqID0gdXNlcmxpc3RbdXNlcktleV07XG4gICAgICAgIGxldCBuZXdVc2VyT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgdXNlck9iaiwgdXNlcik7XG4gICAgICAgIHVzZXJsaXN0LnNwbGljZSh1c2VyS2V5LCAxLCBuZXdVc2VyT2JqKTtcblxuICAgICAgICB0aGlzLnVzZXJsaXN0ID0gdXNlcmxpc3Q7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSByZXF1ZXN0IGZvciBmZXRjaGluZyBhIGxpc3Qgb2YgdXNlcnMgbWF0Y2hpbmcgdGhlIHNlcmFjaCBrZXlcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIGNyZWF0ZU1lbWJlclJlcXVlc3Qoc2VhcmNoS2V5ID0gXCJcIikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVtYmVyc1JlcXVlc3QgPSBudWxsO1xuXG4gICAgICBpZiAoc2VhcmNoS2V5ICE9PSBcIlwiKSB7XG4gICAgICAgIG1lbWJlcnNSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Vc2Vyc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgICAuc2V0TGltaXQoMzApXG4gICAgICAgICAgLmZyaWVuZHNPbmx5KHRoaXMuZnJpZW5kc09ubHkpXG4gICAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVtYmVyc1JlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LlVzZXJzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgICAuZnJpZW5kc09ubHkodGhpcy5mcmllbmRzT25seSlcbiAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW1iZXJzUmVxdWVzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgbGlzdCBvZiB1c2VycyBtYXRjaGluZyB0aGUgc2VhcmNoIGtleVxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgc2VhcmNoVXNlcnMgPSAoZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5MT0FESU5HX01FU1NTQUdFO1xuXG4gICAgICAgIHRoaXMubWVtYmVyc1JlcXVlc3QgPSB0aGlzLmNyZWF0ZU1lbWJlclJlcXVlc3QodmFsKTtcblxuICAgICAgICB0aGlzLnVzZXJsaXN0ID0gW107XG4gICAgICAgIHRoaXMubWVtYmVyc1RvQWRkID0gW107XG4gICAgICAgIHRoaXMubWVtYmVyc1RvUmVtb3ZlID0gW107XG4gICAgICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuZ2V0VXNlcnMoKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBmZXRjaGVzIGEgbGlzdCBvZiB1c2VycyBiYXNlZCBvbiB0aGUgbWVtYmVyIHJlcXVlc3QgY29uZmlnXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0VXNlcnMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hOZXh0VXNlcnMoKVxuICAgICAgICAgICAgLnRoZW4oKHVzZXJMaXN0KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkVXNlckxpc3QgPSB1c2VyTGlzdC5maWx0ZXIoKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMubWVtYmVyTGlzdC5maW5kKFxuICAgICAgICAgICAgICAgICAgKG1lbWJlcikgPT4gdXNlci51aWQgPT09IG1lbWJlci51aWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kQmFubmVkID0gdGhpcy5iYW5uZWRNZW1iZXJMaXN0LmZpbmQoXG4gICAgICAgICAgICAgICAgICAobWVtYmVyKSA9PiB1c2VyLnVpZCA9PT0gbWVtYmVyLnVpZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kIHx8IGZvdW5kQmFubmVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICB0aGlzLnVzZXJsaXN0ID0gWy4uLnRoaXMudXNlcmxpc3QsIC4uLnVzZXJMaXN0XTtcblxuICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IFsuLi50aGlzLmZpbHRlcmVkTGlzdCwgLi4uZmlsdGVyZWRVc2VyTGlzdF07XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTk9fVVNFUlNfRk9VTkQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5FUlJPUjtcbiAgICAgICAgICAgICAgbG9nZ2VyKFwiW0NvbWV0Q2hhdEFkZE1lbWJlcnNdIGdldFVzZXJzIGZldGNoTmV4dCBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuZGVjb3JhdG9yTWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuRVJST1I7XG4gICAgICAgICAgbG9nZ2VyKFwiW0NvbWV0Q2hhdEFkZE1lbWJlcnNdIGdldFVzZXJzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGV2ZW50cyBlbWl0dGVkIGJ5IGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGVudW1zLk1FTUJFUl9VUERBVEVEOiB7XG4gICAgICAgICAgdGhpcy5tZW1iZXJzVXBkYXRlZChkYXRhLnVzZXIsIGRhdGEudXNlclN0YXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBtZW1iZXJUb0FkZCBsaXN0XG4gICAqIEBwYXJhbSBBbnkgdXNlclxuICAgKi9cbiAgbWVtYmVyc1VwZGF0ZWQgPSAodXNlciwgdXNlclN0YXRlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh1c2VyU3RhdGUpIHtcbiAgICAgICAgY29uc3QgbWVtYmVycyA9IFsuLi50aGlzLm1lbWJlcnNUb0FkZF07XG4gICAgICAgIG1lbWJlcnMucHVzaCh1c2VyKTtcbiAgICAgICAgdGhpcy5tZW1iZXJzVG9BZGQgPSBbLi4ubWVtYmVyc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZW1iZXJzVG9BZGQgPSBbLi4udGhpcy5tZW1iZXJzVG9BZGRdO1xuICAgICAgICBjb25zdCBJbmRleEZvdW5kID0gbWVtYmVyc1RvQWRkLmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIudWlkID09PSB1c2VyLnVpZFxuICAgICAgICApO1xuICAgICAgICBpZiAoSW5kZXhGb3VuZCA+IC0xKSB7XG4gICAgICAgICAgbWVtYmVyc1RvQWRkLnNwbGljZShJbmRleEZvdW5kLCAxKTtcbiAgICAgICAgICB0aGlzLm1lbWJlcnNUb0FkZCA9IFsuLi5tZW1iZXJzVG9BZGRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBhZGRzIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgbWVtYmVyVG9BZGQgbGlzdCB0byB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICB1cGRhdGVNZW1iZXJzID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5hZGRCdG5UZXh0ID09IENPTUVUQ0hBVF9DT05TVEFOVFMuQURESU5HX01FU1NTQUdFKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGRCdG5UZXh0ID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5BRERJTkdfTUVTU1NBR0U7XG5cbiAgICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIGNvbnN0IG1lbWJlcnNMaXN0ID0gW107XG5cbiAgICAgIHRoaXMubWVtYmVyc1RvQWRkLmZvckVhY2goKG5ld21lbWJlcikgPT4ge1xuICAgICAgICAvL2lmIGEgc2VsZWN0ZWQgbWVtYmVyIGlzIGFscmVhZHkgcGFydCBvZiB0aGUgbWVtYmVyIGxpc3QsIGRvbid0IGFkZFxuICAgICAgICBjb25zdCBJbmRleEZvdW5kID0gdGhpcy5tZW1iZXJMaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAobWVtYmVyKSA9PiBtZW1iZXIudWlkID09PSBuZXdtZW1iZXIudWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChJbmRleEZvdW5kID09PSAtMSkge1xuICAgICAgICAgIGNvbnN0IG5ld01lbWJlciA9IG5ldyBDb21ldENoYXQuR3JvdXBNZW1iZXIoXG4gICAgICAgICAgICBuZXdtZW1iZXIudWlkLFxuICAgICAgICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVFxuICAgICAgICAgICk7XG4gICAgICAgICAgbWVtYmVyc0xpc3QucHVzaChuZXdNZW1iZXIpO1xuXG4gICAgICAgICAgbmV3bWVtYmVyW2VudW1zLlRZUEVdID0gZW51bXMuQUREO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKG1lbWJlcnNMaXN0Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBtZW1iZXJzVG9BZGQgPSBbXTtcbiAgICAgICAgQ29tZXRDaGF0LmFkZE1lbWJlcnNUb0dyb3VwKGd1aWQsIG1lbWJlcnNMaXN0LCBbXSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNwb25zZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbWVtYmVyIGluIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlW21lbWJlcl0gPT09IGVudW1zLlNVQ0NFU1MpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy51c2VybGlzdC5maW5kKFxuICAgICAgICAgICAgICAgICAgICAodXNlcikgPT4gdXNlci51aWQgPT09IG1lbWJlclxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGZvdW5kW2VudW1zLlNDT1BFXSA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gICAgICAgICAgICAgICAgICBtZW1iZXJzVG9BZGQucHVzaChmb3VuZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGVudW1zLkFERF9HUk9VUF9QQVJUSUNJUEFOVFMsXG4gICAgICAgICAgICAgICAgcGF5TG9hZDogbWVtYmVyc1RvQWRkLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xvc2VBZGRNZW1iZXJzVmlldygpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9nZ2VyKFwiYWRkTWVtYmVyc1RvR3JvdXAgZmFpbGVkIHdpdGggZXhjZXB0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZEJ0blRleHQgPSBDT01FVENIQVRfQ09OU1RBTlRTLkFERDtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGZldGNoZXMgYSBuZXh0cyBzZXQgb2YgbGlzdCAgb2YgdXNlcnMgYmFzZWQgb24gdGhlIG1lbWJlciByZXF1ZXN0IGNvbmZpZ1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGZldGNoTmV4dFVzZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5tZW1iZXJzUmVxdWVzdC5mZXRjaE5leHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzY3JvbGwgYWN0aW9uIG9uIGFkZE1lbWJlckxpc3QgYW5kIGZldGNoZXMgbW9yZSBtZW1iZXJzIHRoYXQgY2FuIGJlIGFkZGVkIHRvIGdyb3VwICwgIGlmIHVzZXIgc2Nyb2xscyB0byBib3R0b20gb2YgbWVtYmVyTGlzdFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBib3R0b20gPVxuICAgICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIGlmIChib3R0b20pIHRoaXMuZ2V0VXNlcnMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZW1pdHMgYW4gYWN0aW9uIHRvIGNsb3NlIHRoZSBhZGRNZW1iZXIgbW9kYWxcbiAgICovXG4gIGNsb3NlQWRkTWVtYmVyc1ZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5DTE9TRV9BRERfVklFV19NRU1CRVIsXG4gICAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==