/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-ban-group-member-list-item/cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatBanGroupMemberListItemComponent {
    constructor() {
        this.item = null;
        this.bannedMemberList = [];
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
        this.displayDecoratorMessage = true;
        this.membersToBan = [];
        this.membersToUnban = [];
        this.BANNED_MEMBERS = COMETCHAT_CONSTANTS.BANNED_MEMBERS;
        this.NAME = COMETCHAT_CONSTANTS.NAME;
        this.SCOPE = COMETCHAT_CONSTANTS.SCOPE;
        this.UNBAN = COMETCHAT_CONSTANTS.UNBAN;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            if (this.bannedMemberList.length === 0) {
                this.decoratorMessage = COMETCHAT_CONSTANTS.NO_BANNED_MEMBERS_FOUND;
            }
            else if (this.bannedMemberList.length > 0) {
                this.displayDecoratorMessage = false;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get the detail of member to be unbanned
     * @param {?} memberToUnBan
     * @return {?}
     */
    unbanMember(memberToUnBan) {
        try {
            /** @type {?} */
            const guid = this.item.guid;
            CometChat.unbanGroupMember(guid, memberToUnBan.uid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response) {
                    logger("Group member unbanning success with response", response);
                    this.actionGenerated.emit({
                        type: enums.UNBAN_GROUP_MEMBERS,
                        payLoad: [memberToUnBan],
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("Group member banning failed with error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            /** @type {?} */
            let data = action.payLoad;
            switch (action.type) {
                case enums.UNBAN:
                    this.unbanMember(data.member);
                    break;
                default:
                    break;
            }
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
            if (bottom) {
                this.actionGenerated.emit({
                    type: enums.FETCH_BANNED_MEMBERS,
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits action to Close Ban member Window
     * @return {?}
     */
    closeBanMemberModal() {
        try {
            this.actionGenerated.emit({ type: enums.BAN_MEMBER, payLoad: [] });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatBanGroupMemberListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-ban-group-member-list-item",
                template: "<!--backdrop-->\n<div>\n  <cometchat-backdrop></cometchat-backdrop>\n\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeBanMemberModal()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            BANNED_MEMBERS\n          }}\n        </caption>\n        <thead>\n          <tr>\n            <th>{{ NAME }}</th>\n            <th class=\"roleColumnStyle\">{{ SCOPE }}</th>\n            <th class=\"actionColumnStyle\">{{ UNBAN }}</th>\n          </tr>\n        </thead>\n        <!--message container-->\n        <caption class=\"contactMsgStyle\" *ngIf=\"displayDecoratorMessage\">\n          <p class=\"contactMsgTxtStyle\">\n            {{ decoratorMessage }}\n          </p>\n        </caption>\n        <tbody class=\"tableBodyStyle\" (scroll)=\"handleScroll($event)\">\n          <!--banned members-->\n          <cometchat-ban-group-member-list\n            *ngFor=\"let member of bannedMemberList\"\n            [member]=\"member\"\n            [item]=\"item\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-ban-group-member-list>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{min-width:350px;min-height:450px;width:40%;height:40%;overflow:hidden;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%;background-color:#fff}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.modalTableStyle th{padding:8px;font-size:12px;text-align:left}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:340px;overflow-y:auto;display:block}.roleColumnStyle{width:150px}.actionColumnStyle{width:70px}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;height:55%}.contactMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.roleColumnStyle{width:115px}}"]
            }] }
];
/** @nocollapse */
CometChatBanGroupMemberListItemComponent.ctorParameters = () => [];
CometChatBanGroupMemberListItemComponent.propDecorators = {
    item: [{ type: Input }],
    bannedMemberList: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.bannedMemberList;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.displayDecoratorMessage;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.membersToBan;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.membersToUnban;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.BANNED_MEMBERS;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.NAME;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.SCOPE;
    /** @type {?} */
    CometChatBanGroupMemberListItemComponent.prototype.UNBAN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0dyb3Vwcy9Db21ldENoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sd0NBQXdDO0lBZW5EO1FBZFMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLHFCQUFnQixHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ3hELDRCQUF1QixHQUFZLElBQUksQ0FBQztRQUN4QyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixtQkFBYyxHQUFXLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1RCxTQUFJLEdBQVcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ3hDLFVBQUssR0FBVyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDMUMs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cXhDQUFvRTs7YUFFckU7Ozs7O21CQUVFLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBRlAsd0RBQXFCOztJQUNyQixvRUFBK0I7O0lBQy9CLG1FQUFrRTs7SUFFbEUsb0VBQXdEOztJQUN4RCwyRUFBd0M7O0lBQ3hDLGdFQUFrQjs7SUFDbEIsa0VBQW9COztJQUVwQixrRUFBNEQ7O0lBQzVELHdEQUF3Qzs7SUFDeEMseURBQTBDOztJQUMxQyx5REFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0QmFuR3JvdXBNZW1iZXJMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSBiYW5uZWRNZW1iZXJMaXN0ID0gW107XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRlY29yYXRvck1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkxPQURJTkdfTUVTU1NBR0U7XG4gIGRpc3BsYXlEZWNvcmF0b3JNZXNzYWdlOiBib29sZWFuID0gdHJ1ZTtcbiAgbWVtYmVyc1RvQmFuID0gW107XG4gIG1lbWJlcnNUb1VuYmFuID0gW107XG5cbiAgQkFOTkVEX01FTUJFUlM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQkFOTkVEX01FTUJFUlM7XG4gIE5BTUU6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTkFNRTtcbiAgU0NPUEU6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuU0NPUEU7XG4gIFVOQkFOOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlVOQkFOO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuYmFubmVkTWVtYmVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19CQU5ORURfTUVNQkVSU19GT1VORDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5iYW5uZWRNZW1iZXJMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGVjb3JhdG9yTWVzc2FnZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRldGFpbCBvZiBtZW1iZXIgdG8gYmUgdW5iYW5uZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICB1bmJhbk1lbWJlcihtZW1iZXJUb1VuQmFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIENvbWV0Q2hhdC51bmJhbkdyb3VwTWVtYmVyKGd1aWQsIG1lbWJlclRvVW5CYW4udWlkKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZ2dlcihcIkdyb3VwIG1lbWJlciB1bmJhbm5pbmcgc3VjY2VzcyB3aXRoIHJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5VTkJBTl9HUk9VUF9NRU1CRVJTLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBbbWVtYmVyVG9VbkJhbl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJHcm91cCBtZW1iZXIgYmFubmluZyBmYWlsZWQgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGVudW1zLlVOQkFOOlxuICAgICAgICAgIHRoaXMudW5iYW5NZW1iZXIoZGF0YS5tZW1iZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBVc2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY3VycmVudCBDb250YWN0IGxpc3QgdGhhbiBmZXRjaCBuZXh0IGl0ZW1zIG9mIHRoZSBjb250YWN0IGxpc3QgYW5kIGFwcGVuZFxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm90dG9tID1cbiAgICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICAgIE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCk7XG4gICAgICBpZiAoYm90dG9tKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkZFVENIX0JBTk5FRF9NRU1CRVJTLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYWN0aW9uIHRvIENsb3NlIEJhbiBtZW1iZXIgV2luZG93XG4gICAqL1xuICBjbG9zZUJhbk1lbWJlck1vZGFsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQkFOX01FTUJFUiwgcGF5TG9hZDogW10gfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=