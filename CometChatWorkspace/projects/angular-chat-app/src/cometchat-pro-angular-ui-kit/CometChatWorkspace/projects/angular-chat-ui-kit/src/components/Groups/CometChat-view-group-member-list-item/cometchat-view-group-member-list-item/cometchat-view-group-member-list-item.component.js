/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-view-group-member-list-item/cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { EDIT_SCOPE_ICON } from "./resources/editScopeIcon";
import { BAN_ICON } from "./resources/banIcon";
import { KICK_ICON } from "./resources/kickIcon";
import { RIGHT_TICK_ICON } from "./resources/rightTickIcon";
import { CLOSE_ICON } from "./resources/closeIcon";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatViewGroupMemberListItemComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.member = null;
        this.loggedInUser = null;
        this.actionGenerated = new EventEmitter();
        this.showChangeScope = false;
        this.roles = {};
        this.roleCodes = [];
        this.hasGreaterRole = false;
        this.PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        this.YOU = COMETCHAT_CONSTANTS.YOU;
        this.editScopeIcon = EDIT_SCOPE_ICON;
        this.banIcon = BAN_ICON;
        this.kickIcon = KICK_ICON;
        this.rightTick = RIGHT_TICK_ICON;
        this.closeIcon = CLOSE_ICON;
        /**
         * emits an event to update the scope of the current member
         * @param
         */
        this.updateMemberScope = (/**
         * @return {?}
         */
        () => {
            try {
                this.actionGenerated.emit({
                    type: enums.CHANGE_SCOPE,
                    payLoad: { member: this.member, scope: this.scope },
                });
                this.toggleChangeScope(false);
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * emits an event to ban  the current member
         * @param
         */
        this.banMember = (/**
         * @return {?}
         */
        () => {
            try {
                this.actionGenerated.emit({
                    type: enums.BAN,
                    payLoad: { member: this.member, scope: this.scope },
                });
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * emits an event to kick the current member out of the group
         * @param
         */
        this.kickMember = (/**
         * @return {?}
         */
        () => {
            try {
                this.actionGenerated.emit({
                    type: enums.KICK,
                    payLoad: { member: this.member, scope: this.scope },
                });
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
            this.scope = this.member.scope;
            //checking if logged in user is owner
            if (this.item.owner == this.loggedInUser.uid) {
                this.item.scope = COMETCHAT_CONSTANTS.OWNER;
            }
            // checking if the current member passed to member view is an owner
            if (this.item.owner == this.member.uid) {
                this.member.scope = COMETCHAT_CONSTANTS.OWNER;
            }
            this.setRoles();
            if (this.checkRoleAuthorityLevel(this.item) >
                this.checkRoleAuthorityLevel(this.member)) {
                this.hasGreaterRole = true;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * returns the level of authority on current item on the group
     * @param {?} item
     * @return {?}
     */
    checkRoleAuthorityLevel(item) {
        try {
            if (item.scope == COMETCHAT_CONSTANTS.OWNER) {
                return 4;
            }
            if (item.scope == CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
                return 3;
            }
            if (item.scope == CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
                return 2;
            }
            if (item.scope == CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
                return 1;
            }
            return 1;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets the values for the roles dropdown
     * @return {?}
     */
    setRoles() {
        try {
            this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] =
                COMETCHAT_CONSTANTS.ADMINISTRATOR;
            this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] =
                COMETCHAT_CONSTANTS.MODERATOR;
            this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] =
                COMETCHAT_CONSTANTS.PARTICIPANT;
            this.roleCodes = [
                CometChat.GROUP_MEMBER_SCOPE.ADMIN,
                CometChat.GROUP_MEMBER_SCOPE.MODERATOR,
                CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
            ];
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes or opens  the edit scope dropdown field
     * @param {?} show
     * @return {?}
     */
    toggleChangeScope(show) {
        try {
            this.showChangeScope = show;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes or opens  the edit scope dropdown field
     * @param {?} event
     * @return {?}
     */
    scopeChangeHandler(event) {
        try {
            this.scope = event.target.value;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatViewGroupMemberListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-view-group-member-list-item",
                template: "<tr class=\"tableRowStyle\">\n  <td class=\"tableColumnStyle\">\n    <!-- TOOL TIP -->\n    <div class=\"avatarStyle\">\n      <cometchat-avatar\n        [item]=\"member\"\n        [userStatus]=\"member?.status\"\n      ></cometchat-avatar>\n    </div>\n\n    <div class=\"nameStyle\" *ngIf=\"loggedInUser?.uid !== member?.uid\">\n      {{ member?.name }}\n    </div>\n    <div class=\"nameStyle\" *ngIf=\"loggedInUser?.uid == member?.uid\">\n      {{ YOU }}\n    </div>\n  </td>\n  <td class=\"scopeStyle\">\n    <!-- Change Scope Below -->\n\n    <!-- class=\"scopeWrapperStyle\" -->\n    <div *ngIf=\"showChangeScope\">\n      <select class=\"scopeSelectionStyle\" (change)=\"scopeChangeHandler($event)\">\n        <option\n          *ngFor=\"let currentRoleCode of roleCodes\"\n          [value]=\"currentRoleCode\"\n          [selected]=\"currentRoleCode == member?.scope\"\n        >\n          {{ roles[currentRoleCode] }}\n        </option>\n      </select>\n\n      <img (click)=\"updateMemberScope()\" [src]=\"rightTick\" loading=\"lazy\" />\n\n      <img\n        (click)=\"toggleChangeScope(false)\"\n        [src]=\"closeIcon\"\n        loading=\"lazy\"\n      />\n    </div>\n\n    <!-- Change Scope Above -->\n\n    <!-- Current Scope -->\n    <span class=\"roleStyle\" *ngIf=\"!showChangeScope\">\n      {{ member?.scope }}\n    </span>\n    <img\n      *ngIf=\"!showChangeScope && hasGreaterRole\"\n      (click)=\"toggleChangeScope(true)\"\n      [src]=\"editScopeIcon\"\n      loading=\"lazy\"\n    />\n    <!-- Current Scope -->\n  </td>\n  <td class=\"actionColumnStyle\">\n    <span>\n      <!-- ban icon -->\n      <img\n        *ngIf=\"hasGreaterRole\"\n        (click)=\"banMember()\"\n        [src]=\"banIcon\"\n        loading=\"lazy\"\n      />\n    </span>\n  </td>\n  <td class=\"actionColumnStyle\">\n    <span>\n      <!-- kick icon -->\n      <img\n        *ngIf=\"hasGreaterRole\"\n        (click)=\"kickMember()\"\n        [src]=\"kickIcon\"\n        loading=\"lazy\"\n      />\n    </span>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:15px}.tableColumnStyle{padding:8px}.tableColumnStyle img{width:36px;height:36px;float:left}.avatarStyle{float:left;margin-right:10px;height:35px;width:35px}.avatarStyle span{top:26px;left:-8px}.nameStyle{margin:10px 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.roleStyle{padding:5px;float:left;font-size:12px}.scopeStyle img{width:20px;height:20px;cursor:pointer}.actionColumnStyle{width:70px;padding:8px}.actionColumnStyle img{width:20px;height:20px;cursor:pointer}.scopeWrapperStyle{float:left;width:100%}.scopeWrapperStyle img{margin:6px 3px;float:left}.scopeSelectionStyle{width:65%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,.04);padding:6px;color:rgba(20,20,20,.6);float:left}.headerCloseStyle{cursor:pointer;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z\"/></svg>') center center no-repeat;margin:6px 3px;float:left}@media (min-width:340px) and (max-width:767px){.nameStyle{width:60%}.scopeStyle{width:170px}.actionColumnStyle{width:55px}}"]
            }] }
];
/** @nocollapse */
CometChatViewGroupMemberListItemComponent.ctorParameters = () => [];
CometChatViewGroupMemberListItemComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    member: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.type;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.member;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.scope;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.showChangeScope;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.roles;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.roleCodes;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.hasGreaterRole;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.PARTICIPANT;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.YOU;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.editScopeIcon;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.banIcon;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.kickIcon;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.rightTick;
    /** @type {?} */
    CometChatViewGroupMemberListItemComponent.prototype.closeIcon;
    /**
     * emits an event to update the scope of the current member
     * \@param
     * @type {?}
     */
    CometChatViewGroupMemberListItemComponent.prototype.updateMemberScope;
    /**
     * emits an event to ban  the current member
     * \@param
     * @type {?}
     */
    CometChatViewGroupMemberListItemComponent.prototype.banMember;
    /**
     * emits an event to kick the current member out of the group
     * \@param
     * @type {?}
     */
    CometChatViewGroupMemberListItemComponent.prototype.kickMember;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvQ29tZXRDaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1sRCxNQUFNLE9BQU8seUNBQXlDO0lBdUJwRDtRQXRCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVuQixvQkFBZSxH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bnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IEVESVRfU0NPUEVfSUNPTiB9IGZyb20gXCIuL3Jlc291cmNlcy9lZGl0U2NvcGVJY29uXCI7XG5pbXBvcnQgeyBCQU5fSUNPTiB9IGZyb20gXCIuL3Jlc291cmNlcy9iYW5JY29uXCI7XG5pbXBvcnQgeyBLSUNLX0lDT04gfSBmcm9tIFwiLi9yZXNvdXJjZXMva2lja0ljb25cIjtcbmltcG9ydCB7IFJJR0hUX1RJQ0tfSUNPTiB9IGZyb20gXCIuL3Jlc291cmNlcy9yaWdodFRpY2tJY29uXCI7XG5pbXBvcnQgeyBDTE9TRV9JQ09OIH0gZnJvbSBcIi4vcmVzb3VyY2VzL2Nsb3NlSWNvblwiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0Vmlld0dyb3VwTWVtYmVyTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlciA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2NvcGU7XG4gIHNob3dDaGFuZ2VTY29wZTogYm9vbGVhbiA9IGZhbHNlO1xuICByb2xlcyA9IHt9O1xuICByb2xlQ29kZXMgPSBbXTtcbiAgaGFzR3JlYXRlclJvbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBQQVJUSUNJUEFOVCA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gIFlPVTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5ZT1U7XG5cbiAgZWRpdFNjb3BlSWNvbiA9IEVESVRfU0NPUEVfSUNPTjtcbiAgYmFuSWNvbiA9IEJBTl9JQ09OO1xuICBraWNrSWNvbiA9IEtJQ0tfSUNPTjtcbiAgcmlnaHRUaWNrID0gUklHSFRfVElDS19JQ09OO1xuICBjbG9zZUljb24gPSBDTE9TRV9JQ09OO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zY29wZSA9IHRoaXMubWVtYmVyLnNjb3BlO1xuXG4gICAgICAvL2NoZWNraW5nIGlmIGxvZ2dlZCBpbiB1c2VyIGlzIG93bmVyXG4gICAgICBpZiAodGhpcy5pdGVtLm93bmVyID09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCkge1xuICAgICAgICB0aGlzLml0ZW0uc2NvcGUgPSBDT01FVENIQVRfQ09OU1RBTlRTLk9XTkVSO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVja2luZyBpZiB0aGUgY3VycmVudCBtZW1iZXIgcGFzc2VkIHRvIG1lbWJlciB2aWV3IGlzIGFuIG93bmVyXG4gICAgICBpZiAodGhpcy5pdGVtLm93bmVyID09IHRoaXMubWVtYmVyLnVpZCkge1xuICAgICAgICB0aGlzLm1lbWJlci5zY29wZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuT1dORVI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Um9sZXMoKTtcblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNoZWNrUm9sZUF1dGhvcml0eUxldmVsKHRoaXMuaXRlbSkgPlxuICAgICAgICB0aGlzLmNoZWNrUm9sZUF1dGhvcml0eUxldmVsKHRoaXMubWVtYmVyKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaGFzR3JlYXRlclJvbGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBsZXZlbCBvZiBhdXRob3JpdHkgb24gY3VycmVudCBpdGVtIG9uIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNoZWNrUm9sZUF1dGhvcml0eUxldmVsKGl0ZW0pIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGl0ZW0uc2NvcGUgPT0gQ09NRVRDSEFUX0NPTlNUQU5UUy5PV05FUikge1xuICAgICAgICByZXR1cm4gNDtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0uc2NvcGUgPT0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5BRE1JTikge1xuICAgICAgICByZXR1cm4gMztcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0uc2NvcGUgPT0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5NT0RFUkFUT1IpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtLnNjb3BlID09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZXMgZm9yIHRoZSByb2xlcyBkcm9wZG93blxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldFJvbGVzKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJvbGVzW0NvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuQURNSU5dID1cbiAgICAgICAgQ09NRVRDSEFUX0NPTlNUQU5UUy5BRE1JTklTVFJBVE9SO1xuICAgICAgdGhpcy5yb2xlc1tDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLk1PREVSQVRPUl0gPVxuICAgICAgICBDT01FVENIQVRfQ09OU1RBTlRTLk1PREVSQVRPUjtcbiAgICAgIHRoaXMucm9sZXNbQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVF0gPVxuICAgICAgICBDT01FVENIQVRfQ09OU1RBTlRTLlBBUlRJQ0lQQU5UO1xuXG4gICAgICB0aGlzLnJvbGVDb2RlcyA9IFtcbiAgICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5BRE1JTixcbiAgICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5NT0RFUkFUT1IsXG4gICAgICAgIENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQsXG4gICAgICBdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgb3Igb3BlbnMgIHRoZSBlZGl0IHNjb3BlIGRyb3Bkb3duIGZpZWxkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdG9nZ2xlQ2hhbmdlU2NvcGUoc2hvdykge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNob3dDaGFuZ2VTY29wZSA9IHNob3c7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBvciBvcGVucyAgdGhlIGVkaXQgc2NvcGUgZHJvcGRvd24gZmllbGRcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBzY29wZUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zY29wZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZW1pdHMgYW4gZXZlbnQgdG8gdXBkYXRlIHRoZSBzY29wZSBvZiB0aGUgY3VycmVudCBtZW1iZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICB1cGRhdGVNZW1iZXJTY29wZSA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkNIQU5HRV9TQ09QRSxcbiAgICAgICAgcGF5TG9hZDogeyBtZW1iZXI6IHRoaXMubWVtYmVyLCBzY29wZTogdGhpcy5zY29wZSB9LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnRvZ2dsZUNoYW5nZVNjb3BlKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGVtaXRzIGFuIGV2ZW50IHRvIGJhbiAgdGhlIGN1cnJlbnQgbWVtYmVyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYmFuTWVtYmVyID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuQkFOLFxuICAgICAgICBwYXlMb2FkOiB7IG1lbWJlcjogdGhpcy5tZW1iZXIsIHNjb3BlOiB0aGlzLnNjb3BlIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGVtaXRzIGFuIGV2ZW50IHRvIGtpY2sgdGhlIGN1cnJlbnQgbWVtYmVyIG91dCBvZiB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBraWNrTWVtYmVyID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuS0lDSyxcbiAgICAgICAgcGF5TG9hZDogeyBtZW1iZXI6IHRoaXMubWVtYmVyLCBzY29wZTogdGhpcy5zY29wZSB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19