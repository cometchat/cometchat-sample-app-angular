/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/cometchat-user-list/cometchat-user-list/cometchat-user-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatUserListComponent {
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
        this.userListenerId = "userlist_" + new Date().getTime();
        this.decoratorMsg = STRING_MESSAGES.LOADING_MESSSAGE;
        this.userSearches = false;
        this.loader = true;
        this.contactsNotFound = false;
        this.contacts = [];
        this.usersList = [];
        this.defaultAvatarImage = "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
        this.USERS = STRING_MESSAGES.USERS;
        this.SEARCH = STRING_MESSAGES.SEARCH;
        /**
         * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
         * @param Any user
         */
        this.userUpdated = (/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
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
        });
        /**
         * Emitting the close Menu action to be used in parent component to handle screen logic
         * @param
         */
        this.handleMenuClose = (/**
         * @return {?}
         */
        () => {
            if (!this.hasActions) {
                return false;
            }
            this.actionGenerated.emit("closeMenuClicked");
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
        if (change["item"]) {
            if (change["item"].previousValue !== change["item"].currentValue) {
                /** @type {?} */
                const userlist = [...this.usersList];
                /** @type {?} */
                let userKey = userlist.findIndex((/**
                 * @param {?} u
                 * @param {?} k
                 * @return {?}
                 */
                (u, k) => u.uid === change["item"].currentValue.uid));
                //if found in the list, update user object
                if (userKey > -1) {
                    /** @type {?} */
                    let userObj = userlist[userKey];
                    //{...userlist[userKey]};
                    /** @type {?} */
                    let newUserObj = Object.assign({}, userObj, change["item"].currentValue);
                    userlist.splice(userKey, 1, newUserObj);
                    this.usersList = [...userlist];
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
            console.log("error getting details:", { error });
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // removinf the changeDetector Ref
        this.ref.detach();
        CometChat.removeUserListener(this.userListenerId);
        this.userListenerId = null;
        this.usersRequest = null;
    }
    /**
     * Search User Based on their Name
     * @param {?} searchKey
     * @return {?}
     */
    searchUsers(searchKey) {
        this.contactsNotFound = false;
        this.decoratorMsg = STRING_MESSAGES.LOADING_MESSSAGE;
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
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom)
            this.fetchNextContactList();
    }
    /**
     * Get List of users that are contacts of the current user
     *
     * @return {?}
     */
    fetchNextContactList() {
        this.usersRequest.fetchNext().then((/**
         * @param {?} userList
         * @return {?}
         */
        (userList) => {
            if (userList.length === 0 && this.userSearches === true) {
                this.contactsNotFound = true;
                this.decoratorMsg = STRING_MESSAGES.NO_USERS_FOUND;
            }
            else {
                this.userSearches = false;
                /* userList will be the list of User class. */
                this.usersList = [...this.usersList, ...userList];
                this.loader = false;
            }
            /* retrived list can be used to display contact list. */
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("User list fetching failed with error:", error);
        }));
    }
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param {?} userToEmit
     * @return {?}
     */
    onUserClicked(userToEmit) {
        this.onUserClick.emit(userToEmit);
    }
}
CometchatUserListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-list",
                template: "<div class=\"contactWrapperStyle\">\n  <div class=\"contactHeaderStyle\">\n    <h4 class=\"contactHeaderTitleStyle\">{{ USERS }}</h4>\n    <div></div>\n  </div>\n  <div class=\"contactSearchStyle\">\n    <input\n      class=\"contactSearchInputStyle\"\n      [placeholder]=\"SEARCH\"\n      #search\n      type=\"text\"\n      (keyup)=\"searchUsers(search.value)\"\n      autocomplete=\"off\"\n    />\n  </div>\n\n  <div *ngIf=\"loader\" class=\"contactMsgStyle\">\n    <p class=\"contactTxtMsgStyle\">\n      {{ decoratorMsg }}\n    </p>\n  </div>\n\n  <div class=\"contactListStyle\" (scroll)=\"handleScroll($event)\">\n    <div *ngIf=\"contactsNotFound\" class=\"contactMsgStyle\">\n      <p class=\"contactTxtMsgStyle\">\n        {{ decoratorMsg }}\n      </p>\n    </div>\n    <div\n      class=\"contactAlphabetStyle\"\n      *ngFor=\"let user of usersList; let i = index\"\n    >\n      <div *ngIf=\"i > 0; else elseBlock\">\n        <div\n          *ngIf=\"\n            usersList[i - 1].name[0].toUpperCase() !==\n            usersList[i].name[0].toUpperCase()\n          \"\n        >\n          {{ usersList[i].name[0].toUpperCase() }}\n        </div>\n      </div>\n      <ng-template #elseBlock>{{\n        usersList[i].name[0].toUpperCase()\n      }}</ng-template>\n\n      <div class=\"contactNameStyle\" (click)=\"onUserClicked(user)\">\n        <div class=\"listItem\">\n          <div class=\"itemThumbnailStyle\">\n            <cometchat-avatar\n              [item]=\"user\"\n              [userStatus]=\"user.status\"\n              class=\"avatarContact\"\n            ></cometchat-avatar>\n          </div>\n\n          <div class=\"itemDetailStyle\">\n            <div class=\"itemNameStyle\">\n              {{ user.name }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.contactWrapperStyle{display:flex;flex-direction:column;height:100%;box-sizing:border-box}.contactWrapperStyle *{box-sizing:border-box}.contactWrapperStyle ::-webkit-scrollbar{width:8px;height:4px}.contactWrapperStyle ::-webkit-scrollbar-track{background:#ffffff00}.contactWrapperStyle ::-webkit-scrollbar-thumb{background:#ccc}.contactWrapperStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.contactHeaderStyle{padding:19px 16px;position:relative;display:flex;align-items:center;border-bottom:1px solid #eaeaea}.contactHeaderTitleStyle{margin:0;font-weight:700;display:inline-block;width:66%;text-align:left;font-size:20px}.contactSearchStyle{padding:16px;position:relative}.contactSearchInputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;padding:6px 8px 6px 35px;font-size:15px;outline:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACeklEQVQ4EaWUz2sTURDH3U3SNAoqJWIRPVQwURAv5uChl0DxUA8RwZANSPHir4Mg8eJ/UPxBD2L0aiXZkFM1EgkeQhEVJQj+OJlbFXPzEg+FJLt+Zrtbdp/5gfTB5M3Md+Y78+a9jbZryCqXywdxLyELyBHbti1N0zbQG+FweDWbzf5GH7k0FSmVSjkIHkE0w/4DvI3oyHF8s+ydUCh0JZfLvUQfurZJq9VqqN/vPyPRgOwbctUwjHdeFn7NNM0F9if4juq6/hj8hof7d+nAWRDedQmLHPG0n1ACKGLn8/nX8Xj8FLppWdZ1xnRnKzv463RaqVRODgaDz0AfI5HIPDMbBMOCVrPZnO50Op9oYo6OEzQgY9peTqdUvUl1i1ktTSKUzHQ6vUn8ZdRp5Jr4/Ms7/iJV3zD8735wnE53H8C/0tCiGqdzQVM4D1H5iwpOsiUHmVPjpNMputSQTRWcZLs5MoLA0pnhH6qJ/FMxEDnEkByIf6mQN9N1wLO1Wm23GjDK5jnFweaRdTXGIYXwKcD+bre7rAaMsR+SJ/dRUmM0cQDK1/IW9Qzv7hyv4JUa6LeJvcStr3L8F3wQGT8mutMpoB2NRrPYHYJrfP/L7qsIxDcajT0QFoXQBbRWqxUJBGE4nXpOiA70ej35ti8gG8ga0qZ7HaITFD/PqWbZ2+zHwGQ9TyaTF1OpVG/LVEg9J5dgkHSL5JSMxvVb7O/hLzIek0+7QKF7LhYg9hI8vsBO5/v4ozksjcZisZ+ZTKbrD2AUt4cRjyX1E4zSOVWB09wXnJOtJRKJ7I5JhcxPjLni3L4AO1k8qwd0WUBseMb+bf53nXq9vleS/gKeNA5lPSUj0AAAAABJRU5ErkJggg==) 5px center no-repeat rgba(20,20,20,.04)}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:50%}.contactTxtMsgStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.contactNameStyle{display:flex;justify-content:left;align-items:center;width:100%;border-bottom:1px solid #eaeaea}.contactNameStyle:hover{background:#e6e6e6;cursor:pointer}.contactListStyle{width:100%;display:flex;flex-direction:column;height:calc(100% - 125px);overflow-y:auto;margin:0;padding:0}.contactAlphabetStyle{margin:5px 0;width:100%;font-size:14px;padding:0 15px}.itemDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.itemNameStyle{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;margin:5px 0 0}.listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:10px 20px}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}"]
            }] }
];
/** @nocollapse */
CometchatUserListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
CometchatUserListComponent.propDecorators = {
    friendsOnly: [{ type: Input }],
    hasActions: [{ type: Input }],
    item: [{ type: Input }],
    onUserClick: [{ type: Output }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatUserListComponent.prototype.friendsOnly;
    /** @type {?} */
    CometchatUserListComponent.prototype.hasActions;
    /** @type {?} */
    CometchatUserListComponent.prototype.item;
    /** @type {?} */
    CometchatUserListComponent.prototype.onUserClick;
    /** @type {?} */
    CometchatUserListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatUserListComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatUserListComponent.prototype.decoratorMsg;
    /** @type {?} */
    CometchatUserListComponent.prototype.userSearches;
    /** @type {?} */
    CometchatUserListComponent.prototype.loader;
    /** @type {?} */
    CometchatUserListComponent.prototype.contactsNotFound;
    /** @type {?} */
    CometchatUserListComponent.prototype.contacts;
    /** @type {?} */
    CometchatUserListComponent.prototype.usersList;
    /** @type {?} */
    CometchatUserListComponent.prototype.usersRequest;
    /** @type {?} */
    CometchatUserListComponent.prototype.timeout;
    /** @type {?} */
    CometchatUserListComponent.prototype.defaultAvatarImage;
    /** @type {?} */
    CometchatUserListComponent.prototype.USERS;
    /** @type {?} */
    CometchatUserListComponent.prototype.SEARCH;
    /**
     * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
     * \@param Any user
     * @type {?}
     */
    CometchatUserListComponent.prototype.userUpdated;
    /**
     * Emitting the close Menu action to be used in parent component to handle screen logic
     * \@param
     * @type {?}
     */
    CometchatUserListComponent.prototype.handleMenuClose;
    /**
     * @type {?}
     * @private
     */
    CometchatUserListComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2Vycy9jb21ldGNoYXQtdXNlci1saXN0L2NvbWV0Y2hhdC11c2VyLWxpc3QvY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixHQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLE1BQU0sT0FBTywwQkFBMEI7Ozs7SUF5QnJDLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdkJqQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsbUJBQWMsR0FBRyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVwRCxpQkFBWSxHQUFXLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUdmLHVCQUFrQixHQUNoQixrRUFBa0UsQ0FBQztRQUVyRSxVQUFLLEdB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OUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtZQUNELHdEQUF3RDtRQUMxRCxDQUFDOzs7O1FBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxFQUNGLENBQUM7SUFDSixDQUFDOzs7Ozs7SUEwQkQsYUFBYSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBbk1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixvMERBQW1EOzthQUVwRDs7OztZQVRDLGlCQUFpQjs7OzBCQVloQixLQUFLO3lCQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFFTCxNQUFNOzhCQUNOLE1BQU07Ozs7SUFMUCxpREFBNkI7O0lBQzdCLGdEQUE0Qjs7SUFDNUIsMENBQXFCOztJQUVyQixpREFBOEQ7O0lBQzlELHFEQUFrRTs7SUFFbEUsb0RBQW9EOztJQUVwRCxrREFBd0Q7O0lBQ3hELGtEQUE4Qjs7SUFDOUIsNENBQXVCOztJQUN2QixzREFBa0M7O0lBQ2xDLDhDQUFjOztJQUNkLCtDQUFlOztJQUNmLGtEQUFhOztJQUNiLDZDQUFROztJQUNSLHdEQUNxRTs7SUFFckUsMkNBQXNDOztJQUN0Qyw0Q0FBd0M7Ozs7OztJQWlKeEMsaURBY0U7Ozs7OztJQWNGLHFEQU1FOzs7OztJQWpMVSx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdXNlci1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXVzZXItbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRVc2VyTGlzdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBmcmllbmRzT25seSA9IGZhbHNlO1xuICBASW5wdXQoKSBoYXNBY3Rpb25zID0gZmFsc2U7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBvblVzZXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHVzZXJMaXN0ZW5lcklkID0gXCJ1c2VybGlzdF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIGRlY29yYXRvck1zZzogc3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIHVzZXJTZWFyY2hlczogYm9vbGVhbiA9IGZhbHNlO1xuICBsb2FkZXI6IEJvb2xlYW4gPSB0cnVlO1xuICBjb250YWN0c05vdEZvdW5kOiBCb29sZWFuID0gZmFsc2U7XG4gIGNvbnRhY3RzID0gW107XG4gIHVzZXJzTGlzdCA9IFtdO1xuICB1c2Vyc1JlcXVlc3Q7XG4gIHRpbWVvdXQ7XG4gIGRlZmF1bHRBdmF0YXJJbWFnZSA9XG4gICAgXCJodHRwczovL2RhdGEtZXUuY29tZXRjaGF0LmlvL2Fzc2V0cy9pbWFnZXMvYXZhdGFycy9zcGlkZXJtYW4ucG5nXCI7XG5cbiAgVVNFUlM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5VU0VSUztcbiAgU0VBUkNIOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuU0VBUkNIO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWZbXCJkZXN0cm95ZWRcIl0pIHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIml0ZW1cIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHVzZXJsaXN0ID0gWy4uLnRoaXMudXNlcnNMaXN0XTtcblxuICAgICAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleChcbiAgICAgICAgICAodSwgaykgPT4gdS51aWQgPT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlLnVpZFxuICAgICAgICApO1xuXG4gICAgICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgICAgICBpZiAodXNlcktleSA+IC0xKSB7XG4gICAgICAgICAgbGV0IHVzZXJPYmogPSB1c2VybGlzdFt1c2VyS2V5XTsgLy97Li4udXNlcmxpc3RbdXNlcktleV19O1xuICAgICAgICAgIGxldCBuZXdVc2VyT2JqID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgdXNlck9iaixcbiAgICAgICAgICAgIGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB1c2VybGlzdC5zcGxpY2UodXNlcktleSwgMSwgbmV3VXNlck9iaik7XG4gICAgICAgICAgdGhpcy51c2Vyc0xpc3QgPSBbLi4udXNlcmxpc3RdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2Vyc1JlcXVlc3QgPSBuZXcgQ29tZXRDaGF0LlVzZXJzUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgLmZyaWVuZHNPbmx5KHRoaXMuZnJpZW5kc09ubHkpXG4gICAgICAuc2V0TGltaXQoNjApXG4gICAgICAuYnVpbGQoKTtcblxuICAgIGxldCB1c2VyID0gQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpLnRoZW4oXG4gICAgICAodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmZldGNoTmV4dENvbnRhY3RMaXN0KCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZ2V0dGluZyBkZXRhaWxzOlwiLCB7IGVycm9yIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvL0F0dGFjaGluZyBVc2VyIExpc3RlbmVycyB0byBkeW5hbWlsY2FsbHkgdXBkYXRlIHdoZW4gYSB1c2VyIGNvbWVzIG9ubGluZSBhbmQgZ29lcyBvZmZsaW5lXG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG5cbiAgICAgICAgICB0aGlzLnVzZXJVcGRhdGVkKG9ubGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvblVzZXJPZmZsaW5lOiAob2ZmbGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCB3ZW50IG9mZmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG5cbiAgICAgICAgICB0aGlzLnVzZXJVcGRhdGVkKG9mZmxpbmVVc2VyKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIHJlbW92aW5mIHRoZSBjaGFuZ2VEZXRlY3RvciBSZWZcbiAgICB0aGlzLnJlZi5kZXRhY2goKTtcblxuICAgIENvbWV0Q2hhdC5yZW1vdmVVc2VyTGlzdGVuZXIodGhpcy51c2VyTGlzdGVuZXJJZCk7XG4gICAgdGhpcy51c2VyTGlzdGVuZXJJZCA9IG51bGw7XG4gICAgdGhpcy51c2Vyc1JlcXVlc3QgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBVc2VyIEJhc2VkIG9uIHRoZWlyIE5hbWVcbiAgICogQHBhcmFtIFN0cmluZyBzZWFyY2hLZXlcbiAgICovXG4gIHNlYXJjaFVzZXJzKHNlYXJjaEtleSkge1xuICAgIHRoaXMuY29udGFjdHNOb3RGb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVjb3JhdG9yTXNnID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdGhpcy51c2VyU2VhcmNoZXMgPSB0cnVlO1xuICAgIHRoaXMubG9hZGVyID0gdHJ1ZTtcbiAgICBsZXQgdmFsID0gc2VhcmNoS2V5O1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy9FbXB0eSBJbnRpYWwgVXNlciBMaXN0IGJlZm9yZSBzZWFyY2hpbmcgdXNlciBsaXN0IGFjY29yZGluZyB0byBzZWFyY2gga2V5XG4gICAgICB0aGlzLnVzZXJzTGlzdCA9IFtdO1xuXG4gICAgICB0aGlzLnVzZXJzUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuVXNlcnNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5mcmllbmRzT25seSh0aGlzLmZyaWVuZHNPbmx5KVxuICAgICAgICAuc2V0U2VhcmNoS2V5d29yZChzZWFyY2hLZXkpXG4gICAgICAgIC5zZXRMaW1pdCgzMClcbiAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgIHRoaXMuZmV0Y2hOZXh0Q29udGFjdExpc3QoKTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIFVzZXIgc2Nyb2xscyB0byB0aGUgYm90dG9tIG9mIHRoZSBjdXJyZW50IENvbnRhY3QgbGlzdCB0aGFuIGZldGNoIG5leHQgaXRlbXMgb2YgdGhlIGNvbnRhY3QgbGlzdCBhbmQgYXBwZW5kXG4gICAqIEBwYXJhbSBFdmVudCBlXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IGJvdHRvbSA9XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT1cbiAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG5cbiAgICBpZiAoYm90dG9tKSB0aGlzLmZldGNoTmV4dENvbnRhY3RMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IExpc3Qgb2YgdXNlcnMgdGhhdCBhcmUgY29udGFjdHMgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgKlxuICAgKi9cbiAgZmV0Y2hOZXh0Q29udGFjdExpc3QoKSB7XG4gICAgdGhpcy51c2Vyc1JlcXVlc3QuZmV0Y2hOZXh0KCkudGhlbihcbiAgICAgICh1c2VyTGlzdCkgPT4ge1xuICAgICAgICBpZiAodXNlckxpc3QubGVuZ3RoID09PSAwICYmIHRoaXMudXNlclNlYXJjaGVzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5jb250YWN0c05vdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRlY29yYXRvck1zZyA9IFNUUklOR19NRVNTQUdFUy5OT19VU0VSU19GT1VORDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVzZXJTZWFyY2hlcyA9IGZhbHNlO1xuICAgICAgICAgIC8qIHVzZXJMaXN0IHdpbGwgYmUgdGhlIGxpc3Qgb2YgVXNlciBjbGFzcy4gKi9cblxuICAgICAgICAgIHRoaXMudXNlcnNMaXN0ID0gWy4uLnRoaXMudXNlcnNMaXN0LCAuLi51c2VyTGlzdF07XG4gICAgICAgICAgdGhpcy5sb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiByZXRyaXZlZCBsaXN0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgY29udGFjdCBsaXN0LiAqL1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbGlzdCBmZXRjaGluZyBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBzdGF0dXMgKCBvbmxpbmUgLyBvZmZsaW5lICkgLCBpbiByZWFsLXRpbWUgd2hlbiBnZXR0aW5nIHNpZ25hbHMgZnJvbSB0aGUgbGlzdGVybmVyc1xuICAgKiBAcGFyYW0gQW55IHVzZXJcbiAgICovXG4gIHVzZXJVcGRhdGVkID0gKHVzZXIpID0+IHtcbiAgICBsZXQgdXNlcmxpc3QgPSBbLi4udGhpcy51c2Vyc0xpc3RdO1xuXG4gICAgLy9zZWFyY2ggZm9yIHVzZXJcbiAgICBsZXQgdXNlcktleSA9IHVzZXJsaXN0LmZpbmRJbmRleCgodSwgaykgPT4gdS51aWQgPT09IHVzZXIudWlkKTtcblxuICAgIC8vaWYgZm91bmQgaW4gdGhlIGxpc3QsIHVwZGF0ZSB1c2VyIG9iamVjdFxuICAgIGlmICh1c2VyS2V5ID4gLTEpIHtcbiAgICAgIGxldCB1c2VyT2JqID0geyAuLi51c2VybGlzdFt1c2VyS2V5XSB9O1xuICAgICAgbGV0IG5ld1VzZXJPYmogPSB7IC4uLnVzZXJPYmosIC4uLnVzZXIgfTtcbiAgICAgIHVzZXJsaXN0LnNwbGljZSh1c2VyS2V5LCAxLCBuZXdVc2VyT2JqKTtcblxuICAgICAgdGhpcy51c2Vyc0xpc3QgPSBbLi4udXNlcmxpc3RdO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRW1pdHRpbmcgdGhlIHVzZXIgY2xpY2tlZCBzbyB0aGF0IGl0IGNhbiBiZSB1c2VkIGluIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBBbnkgdXNlclRvRW1pdFxuICAgKi9cbiAgb25Vc2VyQ2xpY2tlZCh1c2VyVG9FbWl0KSB7XG4gICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHVzZXJUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBjbG9zZSBNZW51IGFjdGlvbiB0byBiZSB1c2VkIGluIHBhcmVudCBjb21wb25lbnQgdG8gaGFuZGxlIHNjcmVlbiBsb2dpY1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGhhbmRsZU1lbnVDbG9zZSA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaGFzQWN0aW9ucykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoXCJjbG9zZU1lbnVDbGlja2VkXCIpO1xuICB9O1xufVxuIl19