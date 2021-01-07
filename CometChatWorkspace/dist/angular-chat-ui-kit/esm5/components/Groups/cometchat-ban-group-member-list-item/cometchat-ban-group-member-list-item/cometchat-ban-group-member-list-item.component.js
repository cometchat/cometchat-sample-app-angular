/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatBanGroupMemberListItemComponent = /** @class */ (function () {
    function CometchatBanGroupMemberListItemComponent() {
        this.item = null;
        this.bannedmemberlist = [];
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.displayDecoratorMessage = true;
        this.membersToBan = [];
        this.membersToUnban = [];
        this.BANNED_MEMBERS = STRING_MESSAGES.BANNED_MEMBERS;
        this.NAME = STRING_MESSAGES.NAME;
        this.SCOPE = STRING_MESSAGES.SCOPE;
        this.UNBAN = STRING_MESSAGES.UNBAN;
    }
    /**
     * @return {?}
     */
    CometchatBanGroupMemberListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.bannedmemberlist.length === 0) {
            this.decoratorMessage = STRING_MESSAGES.NO_BANNED_MEMBERS_FOUND;
        }
        else if (this.bannedmemberlist.length > 0) {
            this.displayDecoratorMessage = false;
        }
    };
    /**
     * Get the detail of member to be unbanned
     * @param
     */
    /**
     * Get the detail of member to be unbanned
     * @param {?} memberToUnBan
     * @return {?}
     */
    CometchatBanGroupMemberListItemComponent.prototype.unbanMember = /**
     * Get the detail of member to be unbanned
     * @param {?} memberToUnBan
     * @return {?}
     */
    function (memberToUnBan) {
        // const group = this.context;
        var _this = this;
        // const group = this.context;
        /** @type {?} */
        var guid = this.item.guid;
        CometChat.unbanGroupMember(guid, memberToUnBan.uid)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (response) {
                console.log("Group member unbanning success with response", response);
                _this.actionGenerated.emit({
                    type: enums.UNBAN_GROUP_MEMBERS,
                    payLoad: [memberToUnBan],
                });
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Group member banning failed with error", error);
        }));
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
    CometchatBanGroupMemberListItemComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var data = action.payLoad;
        switch (action.type) {
            case enums.UNBAN:
                this.unbanMember(data.member);
                break;
            default:
                break;
        }
    };
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param Event e
     */
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param {?} e
     * @return {?}
     */
    CometchatBanGroupMemberListItemComponent.prototype.handleScroll = /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
            Math.round(e.currentTarget.clientHeight);
        if (bottom) {
            this.actionGenerated.emit({
                type: enums.FETCH_BANNED_MEMBERS,
            });
        }
    };
    /**
     * Emits action to Close Ban member Window
     */
    /**
     * Emits action to Close Ban member Window
     * @return {?}
     */
    CometchatBanGroupMemberListItemComponent.prototype.closeBanMemberModal = /**
     * Emits action to Close Ban member Window
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.BAN_MEMBER, payLoad: [] });
    };
    CometchatBanGroupMemberListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-ban-group-member-list-item",
                    template: "<!--backdrop-->\n<div>\n  <cometchat-backdrop></cometchat-backdrop>\n\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeBanMemberModal()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            BANNED_MEMBERS\n          }}\n        </caption>\n        <thead>\n          <tr>\n            <th>{{ NAME }}</th>\n            <th class=\"roleColumnStyle\">{{ SCOPE }}</th>\n            <th class=\"actionColumnStyle\">{{ UNBAN }}</th>\n          </tr>\n        </thead>\n        <!--message container-->\n        <caption class=\"contactMsgStyle\" *ngIf=\"displayDecoratorMessage\">\n          <p class=\"contactMsgTxtStyle\">\n            {{ decoratorMessage }}\n          </p>\n        </caption>\n        <tbody class=\"tableBodyStyle\" (scroll)=\"handleScroll($event)\">\n          <!--banned members-->\n          <cometchat-ban-group-member-list\n            *ngFor=\"let member of bannedmemberlist\"\n            [member]=\"member\"\n            [item]=\"item\"\n            (actionGenerated)=\"actionHandler($event)\"\n          >\n          </cometchat-ban-group-member-list>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n",
                    styles: [".modalWrapperStyle{min-width:350px;min-height:450px;width:40%;height:40%;overflow:hidden;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%;background-color:#fff}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.modalTableStyle th{padding:8px;font-size:12px;text-align:left}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:340px;overflow-y:auto;display:block}.roleColumnStyle{width:150px}.actionColumnStyle{width:70px}.contactMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;height:55%}.contactMsgTxtStyle{margin:0;height:30px;color:#ccc;font-size:24px!important;font-weight:600}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.roleColumnStyle{width:115px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatBanGroupMemberListItemComponent.ctorParameters = function () { return []; };
    CometchatBanGroupMemberListItemComponent.propDecorators = {
        item: [{ type: Input }],
        bannedmemberlist: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatBanGroupMemberListItemComponent;
}());
export { CometchatBanGroupMemberListItemComponent };
if (false) {
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.bannedmemberlist;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.displayDecoratorMessage;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.membersToBan;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.membersToUnban;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.BANNED_MEMBERS;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.NAME;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.SCOPE;
    /** @type {?} */
    CometchatBanGroupMemberListItemComponent.prototype.UNBAN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0dyb3Vwcy9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQW9CRTtRQWRTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxxQkFBZ0IsR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBQ3hDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLG1CQUFjLEdBQVcsZUFBZSxDQUFDLGNBQWMsQ0FBQztRQUN4RCxTQUFJLEdBQVcsZUFBZSxDQUFDLElBQUksQ0FBQztRQUNwQyxVQUFLLEdBQVcsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUN0QyxVQUFLLEdBQVcsZUFBZSxDQUFDLEtBQUssQ0FBQztJQUV2QixDQUFDOzs7O0lBRWhCLDJEQUFROzs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNqRTthQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDhEQUFXOzs7OztJQUFYLFVBQVksYUFBYTtRQUN2Qiw4QkFBOEI7UUFEaEMsaUJBaUJDOzs7WUFkTyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQzNCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQzthQUNoRCxJQUFJOzs7O1FBQUMsVUFBQyxRQUFRO1lBQ2IsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsbUJBQW1CO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7aUJBQ3pCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFDO2FBQ0QsS0FBSzs7OztRQUFDLFVBQUMsS0FBSztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxnRUFBYTs7Ozs7SUFBYixVQUFjLE1BQU07O1lBQ2QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBRXpCLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLEtBQUssQ0FBQyxLQUFLO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUNEOzs7T0FHRzs7Ozs7O0lBQ0gsK0RBQVk7Ozs7O0lBQVosVUFBYSxDQUFDOztZQUNOLE1BQU0sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDMUMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7YUFDakMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0VBQW1COzs7O0lBQW5CO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDOztnQkF4RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELHF4Q0FBb0U7O2lCQUVyRTs7Ozs7dUJBRUUsS0FBSzttQ0FDTCxLQUFLO2tDQUNMLE1BQU07O0lBaUZULCtDQUFDO0NBQUEsQUF6RkQsSUF5RkM7U0FwRlksd0NBQXdDOzs7SUFDbkQsd0RBQXFCOztJQUNyQixvRUFBK0I7O0lBQy9CLG1FQUFrRTs7SUFFbEUsb0VBQW9EOztJQUNwRCwyRUFBd0M7O0lBQ3hDLGdFQUFrQjs7SUFDbEIsa0VBQW9COztJQUVwQixrRUFBd0Q7O0lBQ3hELHdEQUFvQzs7SUFDcEMseURBQXNDOztJQUN0Qyx5REFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LWl0ZW1cIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRCYW5Hcm91cE1lbWJlckxpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIGJhbm5lZG1lbWJlcmxpc3QgPSBbXTtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZGVjb3JhdG9yTWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5MT0FESU5HX01FU1NTQUdFO1xuICBkaXNwbGF5RGVjb3JhdG9yTWVzc2FnZTogYm9vbGVhbiA9IHRydWU7XG4gIG1lbWJlcnNUb0JhbiA9IFtdO1xuICBtZW1iZXJzVG9VbmJhbiA9IFtdO1xuXG4gIEJBTk5FRF9NRU1CRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQkFOTkVEX01FTUJFUlM7XG4gIE5BTUU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5OQU1FO1xuICBTQ09QRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlNDT1BFO1xuICBVTkJBTjogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlVOQkFOO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5iYW5uZWRtZW1iZXJsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX0JBTk5FRF9NRU1CRVJTX0ZPVU5EO1xuICAgIH0gZWxzZSBpZiAodGhpcy5iYW5uZWRtZW1iZXJsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGlzcGxheURlY29yYXRvck1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXRhaWwgb2YgbWVtYmVyIHRvIGJlIHVuYmFubmVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdW5iYW5NZW1iZXIobWVtYmVyVG9VbkJhbikge1xuICAgIC8vIGNvbnN0IGdyb3VwID0gdGhpcy5jb250ZXh0O1xuXG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIENvbWV0Q2hhdC51bmJhbkdyb3VwTWVtYmVyKGd1aWQsIG1lbWJlclRvVW5CYW4udWlkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgbWVtYmVyIHVuYmFubmluZyBzdWNjZXNzIHdpdGggcmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuVU5CQU5fR1JPVVBfTUVNQkVSUyxcbiAgICAgICAgICAgIHBheUxvYWQ6IFttZW1iZXJUb1VuQmFuXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBtZW1iZXIgYmFubmluZyBmYWlsZWQgd2l0aCBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5VTkJBTjpcbiAgICAgICAgdGhpcy51bmJhbk1lbWJlcihkYXRhLm1lbWJlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBJZiBVc2VyIHNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY3VycmVudCBDb250YWN0IGxpc3QgdGhhbiBmZXRjaCBuZXh0IGl0ZW1zIG9mIHRoZSBjb250YWN0IGxpc3QgYW5kIGFwcGVuZFxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0IC0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09XG4gICAgICBNYXRoLnJvdW5kKGUuY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChib3R0b20pIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5GRVRDSF9CQU5ORURfTUVNQkVSUyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhY3Rpb24gdG8gQ2xvc2UgQmFuIG1lbWJlciBXaW5kb3dcbiAgICovXG4gIGNsb3NlQmFuTWVtYmVyTW9kYWwoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkJBTl9NRU1CRVIsIHBheUxvYWQ6IFtdIH0pO1xuICB9XG59XG4iXX0=