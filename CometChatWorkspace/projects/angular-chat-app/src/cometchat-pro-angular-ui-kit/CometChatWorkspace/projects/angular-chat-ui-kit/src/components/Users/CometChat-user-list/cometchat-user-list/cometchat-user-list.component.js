/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/CometChat-user-list/cometchat-user-list/cometchat-user-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatUserListComponent {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.friendsOnly = false;
        this.hasActions = false;
        this.item = null;
        this.onUserClick = new EventEmitter();
        this.actionGenerated = new EventEmitter();
        this.userListenerId = enums.USER_LIST_ + new Date().getTime();
        this.decoratorMsg = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
        this.userSearches = false;
        this.loader = true;
        this.contactsNotFound = false;
        this.contacts = [];
        this.usersList = [];
        this.defaultAvatarImage = "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
        this.USERS = COMETCHAT_CONSTANTS.USERS;
        this.SEARCH = COMETCHAT_CONSTANTS.SEARCH;
        /**
         * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
         * @param Any user
         */
        this.userUpdated = (/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            try {
                /** @type {?} */
                let userlist = [...this.usersList];
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
                    let userObj = Object.assign({}, userlist[userKey]);
                    /** @type {?} */
                    let newUserObj = Object.assign({}, userObj, user);
                    userlist.splice(userKey, 1, newUserObj);
                    this.usersList = [...userlist];
                }
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Emitting the close Menu action to be used in parent component to handle screen logic
         * @param
         */
        this.handleMenuClose = (/**
         * @return {?}
         */
        () => {
            try {
                if (!this.hasActions) {
                    return false;
                }
                this.actionGenerated.emit({ type: enums.CLOSE_MENU_CLICKED });
            }
            catch (error) {
                logger(error);
            }
        });
        try {
            setInterval((/**
             * @return {?}
             */
            () => {
                if (!this.ref[enums.DESTROYED]) {
                    this.ref.detectChanges();
                }
            }), 5000);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                if (change[enums.ITEM].previousValue !== change[enums.ITEM].currentValue) {
                    /** @type {?} */
                    const userlist = [...this.usersList];
                    /** @type {?} */
                    let userKey = userlist.findIndex((/**
                     * @param {?} u
                     * @param {?} k
                     * @return {?}
                     */
                    (u, k) => u.uid === change[enums.ITEM].currentValue.uid));
                    //if found in the list, update user object
                    if (userKey > -1) {
                        /** @type {?} */
                        let userObj = userlist[userKey];
                        /** @type {?} */
                        let newUserObj = Object.assign({}, userObj, change[enums.ITEM].currentValue);
                        userlist.splice(userKey, 1, newUserObj);
                        this.usersList = [...userlist];
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
            this.usersRequest = new CometChat.UsersRequestBuilder()
                .friendsOnly(this.friendsOnly)
                .setLimit(60)
                .build();
            /** @type {?} */
            let user = CometChat.getLoggedinUser().then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.fetchNextContactList();
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("error getting details:", { error });
            }));
            //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
            CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
                onUserOnline: (/**
                 * @param {?} onlineUser
                 * @return {?}
                 */
                (onlineUser) => {
                    /* when someuser/friend comes online, user will be received here */
                    this.userUpdated(onlineUser);
                }),
                onUserOffline: (/**
                 * @param {?} offlineUser
                 * @return {?}
                 */
                (offlineUser) => {
                    /* when someuser/friend went offline, user will be received here */
                    this.userUpdated(offlineUser);
                }),
            }));
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
            // removinf the changeDetector Ref
            this.ref.detach();
            CometChat.removeUserListener(this.userListenerId);
            this.userListenerId = null;
            this.usersRequest = null;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Search User Based on their Name
     * @param {?} searchKey
     * @return {?}
     */
    searchUsers(searchKey) {
        try {
            this.contactsNotFound = false;
            this.decoratorMsg = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.userSearches = true;
            this.loader = true;
            /** @type {?} */
            let val = searchKey;
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => {
                //Empty Intial User List before searching user list according to search key
                this.usersList = [];
                this.usersRequest = new CometChat.UsersRequestBuilder()
                    .friendsOnly(this.friendsOnly)
                    .setSearchKeyword(searchKey)
                    .setLimit(30)
                    .build();
                this.fetchNextContactList();
            }), 500);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
                Math.round(e.currentTarget.clientHeight);
            if (bottom)
                this.fetchNextContactList();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get List of users that are contacts of the current user
     *
     * @return {?}
     */
    fetchNextContactList() {
        try {
            this.usersRequest.fetchNext().then((/**
             * @param {?} userList
             * @return {?}
             */
            (userList) => {
                if (userList.length === 0 && this.userSearches === true) {
                    this.contactsNotFound = true;
                    this.decoratorMsg = COMETCHAT_CONSTANTS.NO_USERS_FOUND;
                }
                else {
                    this.userSearches = false;
                    this.usersList = [...this.usersList, ...userList];
                    this.loader = false;
                }
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("User list fetching failed with error:", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param {?} userToEmit
     * @return {?}
     */
    onUserClicked(userToEmit) {
        try {
            this.onUserClick.emit(userToEmit);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatUserListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-list",
                template: "<div class=\"contactWrapperStyle\">\n  <div class=\"contactHeaderStyle\">\n    <h4 class=\"contactHeaderTitleStyle\">{{ USERS }}</h4>\n    <div></div>\n  </div>\n  <div class=\"contactSearchStyle\">\n    <input\n      class=\"contactSearchInputStyle\"\n      [placeholder]=\"SEARCH\"\n      #search\n      type=\"text\"\n      (keyup)=\"searchUsers(search.value)\"\n      autocomplete=\"off\"\n    />\n  </div>\n\n  <div *ngIf=\"loader\" class=\"contactMsgStyle\">\n    <p class=\"contactTxtMsgStyle\">\n      {{ decoratorMsg }}\n    </p>\n  </div>\n\n  <div class=\"contactListStyle\" (scroll)=\"handleScroll($event)\">\n    <div *ngIf=\"contactsNotFound\" class=\"contactMsgStyle\">\n      <p class=\"contactTxtMsgStyle\">\n        {{ decoratorMsg }}\n      </p>\n    </div>\n    <div\n      class=\"contactAlphabetStyle\"\n      *ngFor=\"let user of usersList; let i = index\"\n    >\n      <div *ngIf=\"i > 0; else elseBlock\">\n        <div\n          *ngIf=\"\n            usersList[i - 1].name[0].toUpperCase() !==\n            usersList[i].name[0].toUpperCase()\n          \"\n        >\n          {{ usersList[i].name[0].toUpperCase() }}\n        </div>\n      </div>\n      <ng-template #elseBlock>{{\n        usersList[i].name[0].toUpperCase()\n      }}</ng-template>\n\n      <div class=\"contactNameStyle\" (click)=\"onUserClicked(user)\">\n        <div class=\"listItem\">\n          <div class=\"itemThumbnailStyle\">\n            <cometchat-avatar\n              [item]=\"user\"\n              [userStatus]=\"user.status\"\n              class=\"avatarContact\"\n            ></cometchat-avatar>\n          </div>\n\n          <div class=\"itemDetailStyle\">\n            <div class=\"itemNameStyle\">\n              {{ user.name }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.contactWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.contactWrapperStyle *{box-sizing:border-box}.contactWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.contactWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.contactWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.contactWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.contactHeaderStyle{padding:19px 16px;position:relative;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.contactHeaderTitleStyle{margin:0;font-weight:700;display:inline-block;width:66%;text-align:left;font-size:20px}.contactSearchStyle{padding:16px;position:relative}.contactSearchInputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACeklEQVQ4EaWUz2sTURDH3U3SNAoqJWIRPVQwURAv5uChl0DxUA8RwZANSPHir4Mg8eJ/UPxBD2L0aiXZkFM1EgkeQhEVJQj+OJlbFXPzEg+FJLt+Zrtbdp/5gfTB5M3Md+Y78+a9jbZryCqXywdxLyELyBHbti1N0zbQG+FweDWbzf5GH7k0FSmVSjkIHkE0w/4DvI3oyHF8s+ydUCh0JZfLvUQfurZJq9VqqN/vPyPRgOwbctUwjHdeFn7NNM0F9if4juq6/hj8hof7d+nAWRDedQmLHPG0n1ACKGLn8/nX8Xj8FLppWdZ1xnRnKzv463RaqVRODgaDz0AfI5HIPDMbBMOCVrPZnO50Op9oYo6OEzQgY9peTqdUvUl1i1ktTSKUzHQ6vUn8ZdRp5Jr4/Ms7/iJV3zD8735wnE53H8C/0tCiGqdzQVM4D1H5iwpOsiUHmVPjpNMputSQTRWcZLs5MoLA0pnhH6qJ/FMxEDnEkByIf6mQN9N1wLO1Wm23GjDK5jnFweaRdTXGIYXwKcD+bre7rAaMsR+SJ/dRUmM0cQDK1/IW9Qzv7hyv4JUa6LeJvcStr3L8F3wQGT8mutMpoB2NRrPYHYJrfP/L7qsIxDcajT0QFoXQBbRWqxUJBGE4nXpOiA70ej35ti8gG8ga0qZ7HaITFD/PqWbZ2+zHwGQ9TyaTF1OpVG/LVEg9J5dgkHSL5JSMxvVb7O/hLzIek0+7QKF7LhYg9hI8vsBO5/v4ozksjcZisZ+ZTKbrD2AUt4cRjyX1E4zSOVWB09wXnJOtJRKJ7I5JhcxPjLni3L4AO1k8qwd0WUBseMb+bf53nXq9vleS/gKeNA5lPSUj0AAAAABJRU5ErkJggg==) 5px center no-repeat rgba(20,20,20,.04)}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.contactTxtMsgStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.contactNameStyle{display:flex;justify-content:left;align-items:center;width:100%;border-bottom:1px solid #eaeaea}.contactNameStyle:hover{background:#e6e6e6;cursor:pointer}.contactListStyle{width:100%;display:flex;flex-direction:column;height:calc(100% - 125px);overflow-y:auto;margin:0;padding:0}.contactAlphabetStyle{margin:5px 0;width:100%;font-size:14px;padding:0 15px}.itemDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.itemNameStyle{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;margin:5px 0 0}.listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:10px 20px}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}"]
            }] }
];
/** @nocollapse */
CometChatUserListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometChatUserListComponent.propDecorators = {
    friendsOnly: [{ type: Input }],
    hasActions: [{ type: Input }],
    item: [{ type: Input }],
    onUserClick: [{ type: Output }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatUserListComponent.prototype.friendsOnly;
    /** @type {?} */
    CometChatUserListComponent.prototype.hasActions;
    /** @type {?} */
    CometChatUserListComponent.prototype.item;
    /** @type {?} */
    CometChatUserListComponent.prototype.onUserClick;
    /** @type {?} */
    CometChatUserListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatUserListComponent.prototype.userListenerId;
    /** @type {?} */
    CometChatUserListComponent.prototype.decoratorMsg;
    /** @type {?} */
    CometChatUserListComponent.prototype.userSearches;
    /** @type {?} */
    CometChatUserListComponent.prototype.loader;
    /** @type {?} */
    CometChatUserListComponent.prototype.contactsNotFound;
    /** @type {?} */
    CometChatUserListComponent.prototype.contacts;
    /** @type {?} */
    CometChatUserListComponent.prototype.usersList;
    /** @type {?} */
    CometChatUserListComponent.prototype.usersRequest;
    /** @type {?} */
    CometChatUserListComponent.prototype.timeout;
    /** @type {?} */
    CometChatUserListComponent.prototype.defaultAvatarImage;
    /** @type {?} */
    CometChatUserListComponent.prototype.USERS;
    /** @type {?} */
    CometChatUserListComponent.prototype.SEARCH;
    /**
     * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
     * \@param Any user
     * @type {?}
     */
    CometChatUserListComponent.prototype.userUpdated;
    /**
     * Emitting the close Menu action to be used in parent component to handle screen logic
     * \@param
     * @type {?}
     */
    CometChatUserListComponent.prototype.handleMenuClose;
    /**
     * @type {?}
     * @private
     */
    CometChatUserListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2Vycy9Db21ldENoYXQtdXNlci1saXN0L2NvbWV0Y2hhdC11c2VyLWxpc3QvY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixHQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFNbEQsTUFBTSxPQUFPLDBCQUEwQjs7OztJQXlCckMsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2QmpDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxtQkFBYyxHQUFHLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV6RCxpQkFBWSxHQUFXLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQzVELGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIscUJBQWdCLEdBQVksS0FBSyxDQUFD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Qzs7OztZQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1IsTUFBTSxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pELENBQUMsRUFDRixDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBOEJELGFBQWEsQ0FBQyxVQUFVO1FBQ3RCLElBQUk7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF0T0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLG8wREFBbUQ7O2FBRXBEOzs7O1lBWEMsaUJBQWlCOzs7MEJBY2hCLEtBQUs7eUJBQ0wsS0FBSzttQkFDTCxLQUFLOzBCQUVMLE1BQU07OEJBQ04sTUFBTTs7OztJQUxQLGlEQUE2Qjs7SUFDN0IsZ0RBQTRCOztJQUM1QiwwQ0FBcUI7O0lBRXJCLGlEQUE4RDs7SUFDOUQscURBQWtFOztJQUVsRSxvREFBeUQ7O0lBRXpELGtEQUE0RDs7SUFDNUQsa0RBQThCOztJQUM5Qiw0Q0FBdUI7O0lBQ3ZCLHNEQUFrQzs7SUFDbEMsOENBQWM7O0lBQ2QsK0NBQWU7O0lBQ2Ysa0RBQWE7O0lBQ2IsNkNBQVE7O0lBQ1Isd0RBQ3FFOztJQUVyRSwyQ0FBMEM7O0lBQzFDLDRDQUE0Qzs7Ozs7O0lBNEs1QyxpREFrQkU7Ozs7OztJQWtCRixxREFVRTs7Ozs7SUF4TlUseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXVzZXItbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC11c2VyLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0VXNlckxpc3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZnJpZW5kc09ubHkgPSBmYWxzZTtcbiAgQElucHV0KCkgaGFzQWN0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcblxuICBAT3V0cHV0KCkgb25Vc2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB1c2VyTGlzdGVuZXJJZCA9IGVudW1zLlVTRVJfTElTVF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICBkZWNvcmF0b3JNc2c6IHN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTE9BRElOR19NRVNTU0FHRTtcbiAgdXNlclNlYXJjaGVzOiBib29sZWFuID0gZmFsc2U7XG4gIGxvYWRlcjogQm9vbGVhbiA9IHRydWU7XG4gIGNvbnRhY3RzTm90Rm91bmQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgY29udGFjdHMgPSBbXTtcbiAgdXNlcnNMaXN0ID0gW107XG4gIHVzZXJzUmVxdWVzdDtcbiAgdGltZW91dDtcbiAgZGVmYXVsdEF2YXRhckltYWdlID1cbiAgICBcImh0dHBzOi8vZGF0YS1ldS5jb21ldGNoYXQuaW8vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL3NwaWRlcm1hbi5wbmdcIjtcblxuICBVU0VSUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5VU0VSUztcbiAgU0VBUkNIOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlNFQVJDSDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0cnkge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucmVmW2VudW1zLkRFU1RST1lFRF0pIHtcbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMDApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2hhbmdlW2VudW1zLklURU1dKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjaGFuZ2VbZW51bXMuSVRFTV0ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlW2VudW1zLklURU1dLmN1cnJlbnRWYWx1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCB1c2VybGlzdCA9IFsuLi50aGlzLnVzZXJzTGlzdF07XG5cbiAgICAgICAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAgICh1LCBrKSA9PiB1LnVpZCA9PT0gY2hhbmdlW2VudW1zLklURU1dLmN1cnJlbnRWYWx1ZS51aWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy9pZiBmb3VuZCBpbiB0aGUgbGlzdCwgdXBkYXRlIHVzZXIgb2JqZWN0XG4gICAgICAgICAgaWYgKHVzZXJLZXkgPiAtMSkge1xuICAgICAgICAgICAgbGV0IHVzZXJPYmogPSB1c2VybGlzdFt1c2VyS2V5XTtcbiAgICAgICAgICAgIGxldCBuZXdVc2VyT2JqID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHVzZXJPYmosXG4gICAgICAgICAgICAgIGNoYW5nZVtlbnVtcy5JVEVNXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1c2VybGlzdC5zcGxpY2UodXNlcktleSwgMSwgbmV3VXNlck9iaik7XG4gICAgICAgICAgICB0aGlzLnVzZXJzTGlzdCA9IFsuLi51c2VybGlzdF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudXNlcnNSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5Vc2Vyc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLmZyaWVuZHNPbmx5KHRoaXMuZnJpZW5kc09ubHkpXG4gICAgICAgIC5zZXRMaW1pdCg2MClcbiAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgIGxldCB1c2VyID0gQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpLnRoZW4oXG4gICAgICAgICh1c2VyKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaE5leHRDb250YWN0TGlzdCgpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJlcnJvciBnZXR0aW5nIGRldGFpbHM6XCIsIHsgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIC8vQXR0YWNoaW5nIFVzZXIgTGlzdGVuZXJzIHRvIGR5bmFtaWxjYWxseSB1cGRhdGUgd2hlbiBhIHVzZXIgY29tZXMgb25saW5lIGFuZCBnb2VzIG9mZmxpbmVcbiAgICAgIENvbWV0Q2hhdC5hZGRVc2VyTGlzdGVuZXIoXG4gICAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuVXNlckxpc3RlbmVyKHtcbiAgICAgICAgICBvblVzZXJPbmxpbmU6IChvbmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG5cbiAgICAgICAgICAgIHRoaXMudXNlclVwZGF0ZWQob25saW5lVXNlcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cblxuICAgICAgICAgICAgdGhpcy51c2VyVXBkYXRlZChvZmZsaW5lVXNlcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHJlbW92aW5mIHRoZSBjaGFuZ2VEZXRlY3RvciBSZWZcbiAgICAgIHRoaXMucmVmLmRldGFjaCgpO1xuXG4gICAgICBDb21ldENoYXQucmVtb3ZlVXNlckxpc3RlbmVyKHRoaXMudXNlckxpc3RlbmVySWQpO1xuICAgICAgdGhpcy51c2VyTGlzdGVuZXJJZCA9IG51bGw7XG4gICAgICB0aGlzLnVzZXJzUmVxdWVzdCA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBVc2VyIEJhc2VkIG9uIHRoZWlyIE5hbWVcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIHNlYXJjaFVzZXJzKHNlYXJjaEtleSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRhY3RzTm90Rm91bmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVjb3JhdG9yTXNnID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5MT0FESU5HX01FU1NTQUdFO1xuXG4gICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgfVxuICAgICAgdGhpcy51c2VyU2VhcmNoZXMgPSB0cnVlO1xuICAgICAgdGhpcy5sb2FkZXIgPSB0cnVlO1xuICAgICAgbGV0IHZhbCA9IHNlYXJjaEtleTtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvL0VtcHR5IEludGlhbCBVc2VyIExpc3QgYmVmb3JlIHNlYXJjaGluZyB1c2VyIGxpc3QgYWNjb3JkaW5nIHRvIHNlYXJjaCBrZXlcbiAgICAgICAgdGhpcy51c2Vyc0xpc3QgPSBbXTtcblxuICAgICAgICB0aGlzLnVzZXJzUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuVXNlcnNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLmZyaWVuZHNPbmx5KHRoaXMuZnJpZW5kc09ubHkpXG4gICAgICAgICAgLnNldFNlYXJjaEtleXdvcmQoc2VhcmNoS2V5KVxuICAgICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICB0aGlzLmZldGNoTmV4dENvbnRhY3RMaXN0KCk7XG4gICAgICB9LCA1MDApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBVc2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY3VycmVudCBDb250YWN0IGxpc3QgdGhhbiBmZXRjaCBuZXh0IGl0ZW1zIG9mIHRoZSBjb250YWN0IGxpc3QgYW5kIGFwcGVuZFxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm90dG9tID1cbiAgICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG5cbiAgICAgIGlmIChib3R0b20pIHRoaXMuZmV0Y2hOZXh0Q29udGFjdExpc3QoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IExpc3Qgb2YgdXNlcnMgdGhhdCBhcmUgY29udGFjdHMgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgKlxuICAgKi9cbiAgZmV0Y2hOZXh0Q29udGFjdExpc3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudXNlcnNSZXF1ZXN0LmZldGNoTmV4dCgpLnRoZW4oXG4gICAgICAgICh1c2VyTGlzdCkgPT4ge1xuICAgICAgICAgIGlmICh1c2VyTGlzdC5sZW5ndGggPT09IDAgJiYgdGhpcy51c2VyU2VhcmNoZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFjdHNOb3RGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRlY29yYXRvck1zZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTk9fVVNFUlNfRk9VTkQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlclNlYXJjaGVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnVzZXJzTGlzdCA9IFsuLi50aGlzLnVzZXJzTGlzdCwgLi4udXNlckxpc3RdO1xuICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIlVzZXIgbGlzdCBmZXRjaGluZyBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHN0YXR1cyAoIG9ubGluZSAvIG9mZmxpbmUgKSAsIGluIHJlYWwtdGltZSB3aGVuIGdldHRpbmcgc2lnbmFscyBmcm9tIHRoZSBsaXN0ZXJuZXJzXG4gICAqIEBwYXJhbSBBbnkgdXNlclxuICAgKi9cbiAgdXNlclVwZGF0ZWQgPSAodXNlcikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdXNlcmxpc3QgPSBbLi4udGhpcy51c2Vyc0xpc3RdO1xuXG4gICAgICAvL3NlYXJjaCBmb3IgdXNlclxuICAgICAgbGV0IHVzZXJLZXkgPSB1c2VybGlzdC5maW5kSW5kZXgoKHUsIGspID0+IHUudWlkID09PSB1c2VyLnVpZCk7XG5cbiAgICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgICAgaWYgKHVzZXJLZXkgPiAtMSkge1xuICAgICAgICBsZXQgdXNlck9iaiA9IHsgLi4udXNlcmxpc3RbdXNlcktleV0gfTtcbiAgICAgICAgbGV0IG5ld1VzZXJPYmogPSB7IC4uLnVzZXJPYmosIC4uLnVzZXIgfTtcbiAgICAgICAgdXNlcmxpc3Quc3BsaWNlKHVzZXJLZXksIDEsIG5ld1VzZXJPYmopO1xuXG4gICAgICAgIHRoaXMudXNlcnNMaXN0ID0gWy4uLnVzZXJsaXN0XTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSB1c2VyIGNsaWNrZWQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gQW55IHVzZXJUb0VtaXRcbiAgICovXG4gIG9uVXNlckNsaWNrZWQodXNlclRvRW1pdCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm9uVXNlckNsaWNrLmVtaXQodXNlclRvRW1pdCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBjbG9zZSBNZW51IGFjdGlvbiB0byBiZSB1c2VkIGluIHBhcmVudCBjb21wb25lbnQgdG8gaGFuZGxlIHNjcmVlbiBsb2dpY1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGhhbmRsZU1lbnVDbG9zZSA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF0aGlzLmhhc0FjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQ0xPU0VfTUVOVV9DTElDS0VEIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==