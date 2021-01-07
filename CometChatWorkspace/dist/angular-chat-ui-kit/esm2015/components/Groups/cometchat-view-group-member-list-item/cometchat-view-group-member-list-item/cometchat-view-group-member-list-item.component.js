/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-view-group-member-list-item/cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { EDIT_SCOPE_ICON } from "../../../resources/icons/editScopeIcon";
import { BAN_ICON } from "../../../resources/icons/banIcon";
import { KICK_ICON } from "../../../resources/icons/kickIcon";
import { RIGHT_TICK_ICON } from "../../../resources/icons/rightTickIcon";
import { CLOSE_ICON } from "../../../resources/icons/closeIcon";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatViewGroupMemberListItemComponent {
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
        this.YOU = STRING_MESSAGES.YOU;
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
            this.actionGenerated.emit({
                type: enums.CHANGE_SCOPE,
                payLoad: { member: this.member, scope: this.scope },
            });
            this.toggleChangeScope(false);
        });
        /**
         * emits an event to ban  the current member
         * @param
         */
        this.banMember = (/**
         * @return {?}
         */
        () => {
            this.actionGenerated.emit({
                type: enums.BAN,
                payLoad: { member: this.member, scope: this.scope },
            });
        });
        /**
         * emits an event to kick the current member out of the group
         * @param
         */
        this.kickMember = (/**
         * @return {?}
         */
        () => {
            this.actionGenerated.emit({
                type: enums.KICK,
                payLoad: { member: this.member, scope: this.scope },
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        //this.getLoggedInUserInfo();
        this.scope = this.member.scope;
        //checking if logged in user is owner
        if (this.item.owner == this.loggedInUser.uid) {
            this.item.scope = STRING_MESSAGES.OWNER;
        }
        // checking if the current member passed to member view is an owner
        if (this.item.owner == this.member.uid) {
            this.member.scope = STRING_MESSAGES.OWNER;
        }
        this.setRoles();
        if (this.checkRoleAuthorityLevel(this.item) >
            this.checkRoleAuthorityLevel(this.member)) {
            this.hasGreaterRole = true;
        }
    }
    /**
     * returns the level of authority on current item on the group
     * @param {?} item
     * @return {?}
     */
    checkRoleAuthorityLevel(item) {
        if (item.scope == STRING_MESSAGES.OWNER) {
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
    /**
     * Sets the values for the roles dropdown
     * @return {?}
     */
    setRoles() {
        this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] =
            STRING_MESSAGES.ADMINISTRATOR;
        this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] =
            STRING_MESSAGES.MODERATOR;
        this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] =
            STRING_MESSAGES.PARTICIPANT;
        this.roleCodes = [
            CometChat.GROUP_MEMBER_SCOPE.ADMIN,
            CometChat.GROUP_MEMBER_SCOPE.MODERATOR,
            CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
        ];
    }
    /**
     * Closes or opens  the edit scope dropdown field
     * @param {?} show
     * @return {?}
     */
    toggleChangeScope(show) {
        this.showChangeScope = show;
    }
    /**
     * Closes or opens  the edit scope dropdown field
     * @param {?} event
     * @return {?}
     */
    scopeChangeHandler(event) {
        this.scope = event.target.value;
    }
}
CometchatViewGroupMemberListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-view-group-member-list-item",
                template: "<tr class=\"tableRowStyle\">\n  <td class=\"tableColumnStyle\">\n    <!-- TOOL TIP -->\n    <div class=\"avatarStyle\">\n      <cometchat-avatar\n        [item]=\"member\"\n        [userStatus]=\"member?.status\"\n      ></cometchat-avatar>\n    </div>\n\n    <div class=\"nameStyle\" *ngIf=\"loggedInUser?.uid !== member?.uid\">\n      {{ member?.name }}\n    </div>\n    <div class=\"nameStyle\" *ngIf=\"loggedInUser?.uid == member?.uid\">\n      {{ YOU }}\n    </div>\n  </td>\n  <td class=\"scopeStyle\">\n    <!-- Change Scope Below -->\n\n    <!-- class=\"scopeWrapperStyle\" -->\n    <div *ngIf=\"showChangeScope\">\n      <select class=\"scopeSelectionStyle\" (change)=\"scopeChangeHandler($event)\">\n        <option\n          *ngFor=\"let currentRoleCode of roleCodes\"\n          [value]=\"currentRoleCode\"\n          [selected]=\"currentRoleCode == member?.scope\"\n        >\n          {{ roles[currentRoleCode] }}\n        </option>\n      </select>\n\n      <img (click)=\"updateMemberScope()\" [src]=\"rightTick\" loading=\"lazy\" />\n\n      <img\n        (click)=\"toggleChangeScope(false)\"\n        [src]=\"closeIcon\"\n        loading=\"lazy\"\n      />\n    </div>\n\n    <!-- Change Scope Above -->\n\n    <!-- Current Scope -->\n    <span class=\"roleStyle\" *ngIf=\"!showChangeScope\">\n      {{ member?.scope }}\n    </span>\n    <img\n      *ngIf=\"!showChangeScope && hasGreaterRole\"\n      (click)=\"toggleChangeScope(true)\"\n      [src]=\"editScopeIcon\"\n      loading=\"lazy\"\n    />\n    <!-- Current Scope -->\n  </td>\n  <td class=\"actionColumnStyle\">\n    <span>\n      <!-- ban icon -->\n      <img\n        *ngIf=\"hasGreaterRole\"\n        (click)=\"banMember()\"\n        [src]=\"banIcon\"\n        loading=\"lazy\"\n      />\n    </span>\n  </td>\n  <td class=\"actionColumnStyle\">\n    <span>\n      <!-- kick icon -->\n      <img\n        *ngIf=\"hasGreaterRole\"\n        (click)=\"kickMember()\"\n        [src]=\"kickIcon\"\n        loading=\"lazy\"\n      />\n    </span>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:15px}.tableColumnStyle{padding:8px}.tableColumnStyle img{width:36px;height:36px;float:left}.avatarStyle{float:left;margin-right:10px;height:35px;width:35px}.avatarStyle span{top:26px;left:-8px}.nameStyle{margin:10px 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.roleStyle{padding:5px;float:left;font-size:12px}.scopeStyle img{width:20px;height:20px;cursor:pointer}.actionColumnStyle{width:70px;padding:8px}.actionColumnStyle img{width:20px;height:20px;cursor:pointer}.scopeWrapperStyle{float:left;width:100%}.scopeWrapperStyle img{margin:6px 3px;float:left}.scopeSelectionStyle{width:65%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,.04);padding:6px;color:rgba(20,20,20,.6);float:left}.headerCloseStyle{cursor:pointer;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z\"/></svg>') center center no-repeat;margin:6px 3px;float:left}@media (min-width:340px) and (max-width:767px){.nameStyle{width:60%}.scopeStyle{width:170px}.actionColumnStyle{width:55px}}"]
            }] }
];
/** @nocollapse */
CometchatViewGroupMemberListItemComponent.ctorParameters = () => [];
CometchatViewGroupMemberListItemComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    member: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.type;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.member;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.scope;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.showChangeScope;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.roles;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.roleCodes;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.hasGreaterRole;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.PARTICIPANT;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.YOU;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.editScopeIcon;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.banIcon;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.kickIcon;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.rightTick;
    /** @type {?} */
    CometchatViewGroupMemberListItemComponent.prototype.closeIcon;
    /**
     * emits an event to update the scope of the current member
     * \@param
     * @type {?}
     */
    CometchatViewGroupMemberListItemComponent.prototype.updateMemberScope;
    /**
     * emits an event to ban  the current member
     * \@param
     * @type {?}
     */
    CometchatViewGroupMemberListItemComponent.prototype.banMember;
    /**
     * emits an event to kick the current member out of the group
     * \@param
     * @type {?}
     */
    CometchatViewGroupMemberListItemComponent.prototype.kickMember;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU1sRSxNQUFNLE9BQU8seUNBQXlDO0lBdUJwRDtRQXRCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xFLG9CQUFlLEdBQVksS0FB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LGlFQUE2Qjs7SUFFN0Isb0VBQWtFOztJQUVsRSwwREFBTTs7SUFDTixvRUFBaUM7O0lBQ2pDLDBEQUFXOztJQUNYLDhEQUFlOztJQUNmLG1FQUFnQzs7SUFFaEMsZ0VBQXVEOztJQUN2RCx3REFBa0M7O0lBRWxDLGtFQUFnQzs7SUFDaEMsNERBQW1COztJQUNuQiw2REFBcUI7O0lBQ3JCLDhEQUE0Qjs7SUFDNUIsOERBQXVCOzs7Ozs7SUE0RnZCLHNFQU1FOzs7Ozs7SUFNRiw4REFLRTs7Ozs7O0lBTUYsK0RBS0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IEVESVRfU0NPUEVfSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvZWRpdFNjb3BlSWNvblwiO1xuaW1wb3J0IHsgQkFOX0lDT04gfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2ljb25zL2Jhbkljb25cIjtcbmltcG9ydCB7IEtJQ0tfSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMva2lja0ljb25cIjtcbmltcG9ydCB7IFJJR0hUX1RJQ0tfSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvcmlnaHRUaWNrSWNvblwiO1xuaW1wb3J0IHsgQ0xPU0VfSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvY2xvc2VJY29uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW1cIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFZpZXdHcm91cE1lbWJlckxpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXIgPSBudWxsO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXIgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNjb3BlO1xuICBzaG93Q2hhbmdlU2NvcGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcm9sZXMgPSB7fTtcbiAgcm9sZUNvZGVzID0gW107XG4gIGhhc0dyZWF0ZXJSb2xlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgUEFSVElDSVBBTlQgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICBZT1U6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ZT1U7XG5cbiAgZWRpdFNjb3BlSWNvbiA9IEVESVRfU0NPUEVfSUNPTjtcbiAgYmFuSWNvbiA9IEJBTl9JQ09OO1xuICBraWNrSWNvbiA9IEtJQ0tfSUNPTjtcbiAgcmlnaHRUaWNrID0gUklHSFRfVElDS19JQ09OO1xuICBjbG9zZUljb24gPSBDTE9TRV9JQ09OO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL3RoaXMuZ2V0TG9nZ2VkSW5Vc2VySW5mbygpO1xuXG4gICAgdGhpcy5zY29wZSA9IHRoaXMubWVtYmVyLnNjb3BlO1xuXG4gICAgLy9jaGVja2luZyBpZiBsb2dnZWQgaW4gdXNlciBpcyBvd25lclxuICAgIGlmICh0aGlzLml0ZW0ub3duZXIgPT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICB0aGlzLml0ZW0uc2NvcGUgPSBTVFJJTkdfTUVTU0FHRVMuT1dORVI7XG4gICAgfVxuXG4gICAgLy8gY2hlY2tpbmcgaWYgdGhlIGN1cnJlbnQgbWVtYmVyIHBhc3NlZCB0byBtZW1iZXIgdmlldyBpcyBhbiBvd25lclxuICAgIGlmICh0aGlzLml0ZW0ub3duZXIgPT0gdGhpcy5tZW1iZXIudWlkKSB7XG4gICAgICB0aGlzLm1lbWJlci5zY29wZSA9IFNUUklOR19NRVNTQUdFUy5PV05FUjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFJvbGVzKCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNoZWNrUm9sZUF1dGhvcml0eUxldmVsKHRoaXMuaXRlbSkgPlxuICAgICAgdGhpcy5jaGVja1JvbGVBdXRob3JpdHlMZXZlbCh0aGlzLm1lbWJlcilcbiAgICApIHtcbiAgICAgIHRoaXMuaGFzR3JlYXRlclJvbGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBsZXZlbCBvZiBhdXRob3JpdHkgb24gY3VycmVudCBpdGVtIG9uIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNoZWNrUm9sZUF1dGhvcml0eUxldmVsKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5zY29wZSA9PSBTVFJJTkdfTUVTU0FHRVMuT1dORVIpIHtcbiAgICAgIHJldHVybiA0O1xuICAgIH1cblxuICAgIGlmIChpdGVtLnNjb3BlID09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuQURNSU4pIHtcbiAgICAgIHJldHVybiAzO1xuICAgIH1cblxuICAgIGlmIChpdGVtLnNjb3BlID09IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuTU9ERVJBVE9SKSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5zY29wZSA9PSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZXMgZm9yIHRoZSByb2xlcyBkcm9wZG93blxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldFJvbGVzKCkge1xuICAgIHRoaXMucm9sZXNbQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5BRE1JTl0gPVxuICAgICAgU1RSSU5HX01FU1NBR0VTLkFETUlOSVNUUkFUT1I7XG4gICAgdGhpcy5yb2xlc1tDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLk1PREVSQVRPUl0gPVxuICAgICAgU1RSSU5HX01FU1NBR0VTLk1PREVSQVRPUjtcbiAgICB0aGlzLnJvbGVzW0NvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlRdID1cbiAgICAgIFNUUklOR19NRVNTQUdFUy5QQVJUSUNJUEFOVDtcblxuICAgIHRoaXMucm9sZUNvZGVzID0gW1xuICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5BRE1JTixcbiAgICAgIENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuTU9ERVJBVE9SLFxuICAgICAgQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVCxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBvciBvcGVucyAgdGhlIGVkaXQgc2NvcGUgZHJvcGRvd24gZmllbGRcbiAgICogQHBhcmFtXG4gICAqL1xuICB0b2dnbGVDaGFuZ2VTY29wZShzaG93KSB7XG4gICAgdGhpcy5zaG93Q2hhbmdlU2NvcGUgPSBzaG93O1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBvciBvcGVucyAgdGhlIGVkaXQgc2NvcGUgZHJvcGRvd24gZmllbGRcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBzY29wZUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLnNjb3BlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXRzIGFuIGV2ZW50IHRvIHVwZGF0ZSB0aGUgc2NvcGUgb2YgdGhlIGN1cnJlbnQgbWVtYmVyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlTWVtYmVyU2NvcGUgPSAoKSA9PiB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5DSEFOR0VfU0NPUEUsXG4gICAgICBwYXlMb2FkOiB7IG1lbWJlcjogdGhpcy5tZW1iZXIsIHNjb3BlOiB0aGlzLnNjb3BlIH0sXG4gICAgfSk7XG4gICAgdGhpcy50b2dnbGVDaGFuZ2VTY29wZShmYWxzZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGVtaXRzIGFuIGV2ZW50IHRvIGJhbiAgdGhlIGN1cnJlbnQgbWVtYmVyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYmFuTWVtYmVyID0gKCkgPT4ge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQkFOLFxuICAgICAgcGF5TG9hZDogeyBtZW1iZXI6IHRoaXMubWVtYmVyLCBzY29wZTogdGhpcy5zY29wZSB9LFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBlbWl0cyBhbiBldmVudCB0byBraWNrIHRoZSBjdXJyZW50IG1lbWJlciBvdXQgb2YgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAga2lja01lbWJlciA9ICgpID0+IHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLktJQ0ssXG4gICAgICBwYXlMb2FkOiB7IG1lbWJlcjogdGhpcy5tZW1iZXIsIHNjb3BlOiB0aGlzLnNjb3BlIH0sXG4gICAgfSk7XG4gIH07XG59XG4iXX0=