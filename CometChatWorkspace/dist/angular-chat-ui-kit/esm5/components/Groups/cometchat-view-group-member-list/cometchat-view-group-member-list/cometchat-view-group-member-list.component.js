/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-view-group-member-list/cometchat-view-group-member-list/cometchat-view-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatViewGroupMemberListComponent = /** @class */ (function () {
    function CometchatViewGroupMemberListComponent() {
        var _this = this;
        this.item = null;
        this.type = null;
        this.loggedInUser = null;
        this.memberlist = [];
        this.PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        this.NAME = STRING_MESSAGES.NAME;
        this.SCOPE = STRING_MESSAGES.SCOPE;
        this.GROUP_MEMBERS = STRING_MESSAGES.GROUP_MEMBERS;
        this.BAN = STRING_MESSAGES.BAN;
        this.KICK = STRING_MESSAGES.KICK;
        this.actionGenerated = new EventEmitter();
        /**
         * Changes the scope of a member of a group
         * @param Any member
         */
        this.changeScope = (/**
         * @param {?} member
         * @param {?} scope
         * @return {?}
         */
        function (member, scope) {
            /** @type {?} */
            var guid = _this.item.guid;
            CometChat.updateGroupMemberScope(guid, member.uid, scope)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                if (response) {
                    console.log("updateGroupMemberScope success with response: ", response);
                    /** @type {?} */
                    var updatedMember = Object.assign({}, member, { scope: scope });
                    _this.actionGenerated.emit({
                        type: enums.UPDATE_GROUP_PARTICIPANTS,
                        payLoad: updatedMember,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("updateGroupMemberScope failed with error: ", error);
            }));
        });
        /**
         * Bans a  member of a group
         * @param Any memberToBan
         */
        this.banMember = (/**
         * @param {?} memberToBan
         * @return {?}
         */
        function (memberToBan) {
            /** @type {?} */
            var guid = _this.item.guid;
            CometChat.banGroupMember(guid, memberToBan.uid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                if (response) {
                    console.log("banGroupMember success with response: ", response);
                    _this.actionGenerated.emit({
                        type: enums.REMOVE_GROUP_PARTICIPANTS,
                        payLoad: memberToBan,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("banGroupMember failed with error: ", error);
            }));
        });
        /**
         * kicks the member member of a group
         * @param Any memberToKick
         */
        this.kickMember = (/**
         * @param {?} memberToKick
         * @return {?}
         */
        function (memberToKick) {
            /** @type {?} */
            var guid = _this.item.guid;
            CometChat.kickGroupMember(guid, memberToKick.uid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                if (response) {
                    console.log("kickGroupMember success with response: ", response);
                    _this.actionGenerated.emit({
                        type: enums.REMOVE_GROUP_PARTICIPANTS,
                        payLoad: memberToKick,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log("kickGroupMember failed with error: ", error);
            }));
        });
    }
    /**
     * @return {?}
     */
    CometchatViewGroupMemberListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatViewGroupMemberListComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var data = action.payLoad;
        switch (action.type) {
            case enums.CHANGE_SCOPE: {
                this.changeScope(data.member, data.scope);
                break;
            }
            case enums.BAN: {
                this.banMember(data.member);
                break;
            }
            case enums.KICK: {
                this.kickMember(data.member);
                break;
            }
        }
    };
    /**
     * Emits an action to indicate the parent component to close the view member modal
     * @param
     */
    /**
     * Emits an action to indicate the parent component to close the view member modal
     * @return {?}
     */
    CometchatViewGroupMemberListComponent.prototype.closeViewMemberModal = /**
     * Emits an action to indicate the parent component to close the view member modal
     * @return {?}
     */
    function () {
        // console.log("cometchat view member --> close view member clicked");
        this.actionGenerated.emit({ type: enums.OPEN_VIEW_MEMBER, payLoad: null });
    };
    CometchatViewGroupMemberListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-view-group-member-list",
                    template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeViewMemberModal()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            GROUP_MEMBERS\n          }}\n        </caption>\n        <thead>\n          <tr>\n            <th>{{ NAME }}</th>\n            <th class=\"scopeColumnStyle\">{{ SCOPE }}</th>\n\n            <!-- EDIT ACCESS -->\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ BAN }}</div>\n            </th>\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ KICK }}</div>\n            </th>\n            <!-- EDIT ACCESS -->\n          </tr>\n        </thead>\n        <tbody class=\"tableBodyStyle\">\n          <cometchat-view-group-member-list-item\n            *ngFor=\"let member of memberlist\"\n            [member]=\"member\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-view-group-member-list-item>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n",
                    styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.modalTableStyle tr th{padding:8px;font-size:12px;text-align:left}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:325px;overflow-y:auto;display:block}.actionColumnStyle{width:70px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.scopeColumnStyle{width:170px}.actionColumnStyle{width:55px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatViewGroupMemberListComponent.ctorParameters = function () { return []; };
    CometchatViewGroupMemberListComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        memberlist: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatViewGroupMemberListComponent;
}());
export { CometchatViewGroupMemberListComponent };
if (false) {
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.type;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.memberlist;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.PARTICIPANT;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.NAME;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.SCOPE;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.GROUP_MEMBERS;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.BAN;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.KICK;
    /** @type {?} */
    CometchatViewGroupMemberListComponent.prototype.actionGenerated;
    /**
     * Changes the scope of a member of a group
     * \@param Any member
     * @type {?}
     */
    CometchatViewGroupMemberListComponent.prototype.changeScope;
    /**
     * Bans a  member of a group
     * \@param Any memberToBan
     * @type {?}
     */
    CometchatViewGroupMemberListComponent.prototype.banMember;
    /**
     * kicks the member member of a group
     * \@param Any memberToKick
     * @type {?}
     */
    CometchatViewGroupMemberListComponent.prototype.kickMember;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFO0lBb0JFO1FBQUEsaUJBQWdCO1FBZFAsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXpCLGdCQUFXLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztRQUN2RCxTQUFJLEdBQVcsZUFBZSxDQUFDLElBQUksQ0FBQztRQUNwQyxVQUFLLEdBQVcsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUN0QyxrQkFBYSxHQUFXLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDdEQsUUFBRyxHQUFXLGVBQWUsQ0FBQyxHQUFHLENBQUM7UUFDbEMsU0FBSSxHQUFXLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFFMUIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7UUFpQ2xFLGdCQUFXOzs7OztRQUFHLFVBQUMs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QyxNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDUDtTQUNGO0lBQ0gsQ0FBQztJQXNFRDs7O09BR0c7Ozs7O0lBQ0gsb0VBQW9COzs7O0lBQXBCO1FBQ0Usc0VBQXNFO1FBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDOztnQkExSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLDh6Q0FBZ0U7O2lCQUVqRTs7Ozs7dUJBRUUsS0FBSzt1QkFDTCxLQUFLOytCQUNMLEtBQUs7NkJBQ0wsS0FBSztrQ0FTTCxNQUFNOztJQXlHVCw0Q0FBQztDQUFBLEFBM0hELElBMkhDO1NBdEhZLHFDQUFxQzs7O0lBQ2hELHFEQUFxQjs7SUFDckIscURBQXFCOztJQUNyQiw2REFBNkI7O0lBQzdCLDJEQUF5Qjs7SUFFekIsNERBQXVEOztJQUN2RCxxREFBb0M7O0lBQ3BDLHNEQUFzQzs7SUFDdEMsOERBQXNEOztJQUN0RCxvREFBa0M7O0lBQ2xDLHFEQUFvQzs7SUFFcEMsZ0VBQWtFOzs7Ozs7SUFpQ2xFLDREQW9CRTs7Ozs7O0lBTUYsMERBZUU7Ozs7OztJQU1GLDJEQWVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFZpZXdHcm91cE1lbWJlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlcmxpc3QgPSBbXTtcblxuICBQQVJUSUNJUEFOVCA9IENvbWV0Q2hhdC5HUk9VUF9NRU1CRVJfU0NPUEUuUEFSVElDSVBBTlQ7XG4gIE5BTUU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5OQU1FO1xuICBTQ09QRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlNDT1BFO1xuICBHUk9VUF9NRU1CRVJTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuR1JPVVBfTUVNQkVSUztcbiAgQkFOOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQkFOO1xuICBLSUNLOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuS0lDSztcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICBsZXQgZGF0YSA9IGFjdGlvbi5wYXlMb2FkO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfU0NPUEU6IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTY29wZShkYXRhLm1lbWJlciwgZGF0YS5zY29wZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5CQU46IHtcbiAgICAgICAgdGhpcy5iYW5NZW1iZXIoZGF0YS5tZW1iZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuS0lDSzoge1xuICAgICAgICB0aGlzLmtpY2tNZW1iZXIoZGF0YS5tZW1iZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgc2NvcGUgb2YgYSBtZW1iZXIgb2YgYSBncm91cFxuICAgKiBAcGFyYW0gQW55IG1lbWJlclxuICAgKi9cbiAgY2hhbmdlU2NvcGUgPSAobWVtYmVyLCBzY29wZSkgPT4ge1xuICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcblxuICAgIENvbWV0Q2hhdC51cGRhdGVHcm91cE1lbWJlclNjb3BlKGd1aWQsIG1lbWJlci51aWQsIHNjb3BlKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJ1cGRhdGVHcm91cE1lbWJlclNjb3BlIHN1Y2Nlc3Mgd2l0aCByZXNwb25zZTogXCIsXG4gICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZE1lbWJlciA9IE9iamVjdC5hc3NpZ24oe30sIG1lbWJlciwgeyBzY29wZTogc2NvcGUgfSk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5VUERBVEVfR1JPVVBfUEFSVElDSVBBTlRTLFxuICAgICAgICAgICAgcGF5TG9hZDogdXBkYXRlZE1lbWJlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVHcm91cE1lbWJlclNjb3BlIGZhaWxlZCB3aXRoIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJhbnMgYSAgbWVtYmVyIG9mIGEgZ3JvdXBcbiAgICogQHBhcmFtIEFueSBtZW1iZXJUb0JhblxuICAgKi9cbiAgYmFuTWVtYmVyID0gKG1lbWJlclRvQmFuKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIENvbWV0Q2hhdC5iYW5Hcm91cE1lbWJlcihndWlkLCBtZW1iZXJUb0Jhbi51aWQpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJiYW5Hcm91cE1lbWJlciBzdWNjZXNzIHdpdGggcmVzcG9uc2U6IFwiLCByZXNwb25zZSk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5SRU1PVkVfR1JPVVBfUEFSVElDSVBBTlRTLFxuICAgICAgICAgICAgcGF5TG9hZDogbWVtYmVyVG9CYW4sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmFuR3JvdXBNZW1iZXIgZmFpbGVkIHdpdGggZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICoga2lja3MgdGhlIG1lbWJlciBtZW1iZXIgb2YgYSBncm91cFxuICAgKiBAcGFyYW0gQW55IG1lbWJlclRvS2lja1xuICAgKi9cbiAga2lja01lbWJlciA9IChtZW1iZXJUb0tpY2spID0+IHtcbiAgICBjb25zdCBndWlkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgQ29tZXRDaGF0LmtpY2tHcm91cE1lbWJlcihndWlkLCBtZW1iZXJUb0tpY2sudWlkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwia2lja0dyb3VwTWVtYmVyIHN1Y2Nlc3Mgd2l0aCByZXNwb25zZTogXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlJFTU9WRV9HUk9VUF9QQVJUSUNJUEFOVFMsXG4gICAgICAgICAgICBwYXlMb2FkOiBtZW1iZXJUb0tpY2ssXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwia2lja0dyb3VwTWVtYmVyIGZhaWxlZCB3aXRoIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGFjdGlvbiB0byBpbmRpY2F0ZSB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBjbG9zZSB0aGUgdmlldyBtZW1iZXIgbW9kYWxcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVZpZXdNZW1iZXJNb2RhbCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNvbWV0Y2hhdCB2aWV3IG1lbWJlciAtLT4gY2xvc2UgdmlldyBtZW1iZXIgY2xpY2tlZFwiKTtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuT1BFTl9WSUVXX01FTUJFUiwgcGF5TG9hZDogbnVsbCB9KTtcbiAgfVxufVxuIl19