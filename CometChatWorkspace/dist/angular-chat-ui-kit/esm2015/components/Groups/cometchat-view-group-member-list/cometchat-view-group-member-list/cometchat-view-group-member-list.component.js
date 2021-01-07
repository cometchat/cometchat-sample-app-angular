/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-view-group-member-list/cometchat-view-group-member-list/cometchat-view-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatViewGroupMemberListComponent {
    constructor() {
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
        (member, scope) => {
            /** @type {?} */
            const guid = this.item.guid;
            CometChat.updateGroupMemberScope(guid, member.uid, scope)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response) {
                    console.log("updateGroupMemberScope success with response: ", response);
                    /** @type {?} */
                    const updatedMember = Object.assign({}, member, { scope: scope });
                    this.actionGenerated.emit({
                        type: enums.UPDATE_GROUP_PARTICIPANTS,
                        payLoad: updatedMember,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
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
        (memberToBan) => {
            /** @type {?} */
            const guid = this.item.guid;
            CometChat.banGroupMember(guid, memberToBan.uid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response) {
                    console.log("banGroupMember success with response: ", response);
                    this.actionGenerated.emit({
                        type: enums.REMOVE_GROUP_PARTICIPANTS,
                        payLoad: memberToBan,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
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
        (memberToKick) => {
            /** @type {?} */
            const guid = this.item.guid;
            CometChat.kickGroupMember(guid, memberToKick.uid)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response) {
                    console.log("kickGroupMember success with response: ", response);
                    this.actionGenerated.emit({
                        type: enums.REMOVE_GROUP_PARTICIPANTS,
                        payLoad: memberToKick,
                    });
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                console.log("kickGroupMember failed with error: ", error);
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        /** @type {?} */
        let data = action.payLoad;
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
    }
    /**
     * Emits an action to indicate the parent component to close the view member modal
     * @return {?}
     */
    closeViewMemberModal() {
        // console.log("cometchat view member --> close view member clicked");
        this.actionGenerated.emit({ type: enums.OPEN_VIEW_MEMBER, payLoad: null });
    }
}
CometchatViewGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-view-group-member-list",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeViewMemberModal()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            GROUP_MEMBERS\n          }}\n        </caption>\n        <thead>\n          <tr>\n            <th>{{ NAME }}</th>\n            <th class=\"scopeColumnStyle\">{{ SCOPE }}</th>\n\n            <!-- EDIT ACCESS -->\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ BAN }}</div>\n            </th>\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ KICK }}</div>\n            </th>\n            <!-- EDIT ACCESS -->\n          </tr>\n        </thead>\n        <tbody class=\"tableBodyStyle\">\n          <cometchat-view-group-member-list-item\n            *ngFor=\"let member of memberlist\"\n            [member]=\"member\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-view-group-member-list-item>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.modalTableStyle tr th{padding:8px;font-size:12px;text-align:left}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:325px;overflow-y:auto;display:block}.actionColumnStyle{width:70px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.scopeColumnStyle{width:170px}.actionColumnStyle{width:55px}}"]
            }] }
];
/** @nocollapse */
CometchatViewGroupMemberListComponent.ctorParameters = () => [];
CometchatViewGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    memberlist: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLE1BQU0sT0FBTyxxQ0FBcUM7SUFlaEQ7UUFkUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ3ZELFNBQUksR0FBVyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFVBQUssR0FBVyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQ3RDLGtCQUFhLEdBQVcsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxRQUFHLEdBQVcsZUFBZSxDQUFDLEdBQUcsQ0FBQztRQUNsQyxTQUFJLEdBQVcsZUFBZSxDQUFDLElBQUksQ0FBQztRQUUxQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDOzs7OztRQWlDbEUsZ0JBQVc7Ozs7O1FBQUcs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QUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLE1BQU07YUFDUDtZQUNELEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixNQUFNO2FBQ1A7WUFDRCxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsTUFBTTthQUNQO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQTBFRCxvQkFBb0I7UUFDbEIsc0VBQXNFO1FBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7WUExSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLDh6Q0FBZ0U7O2FBRWpFOzs7OzttQkFFRSxLQUFLO21CQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQVNMLE1BQU07Ozs7SUFaUCxxREFBcUI7O0lBQ3JCLHFEQUFxQjs7SUFDckIsNkRBQTZCOztJQUM3QiwyREFBeUI7O0lBRXpCLDREQUF1RDs7SUFDdkQscURBQW9DOztJQUNwQyxzREFBc0M7O0lBQ3RDLDhEQUFzRDs7SUFDdEQsb0RBQWtDOztJQUNsQyxxREFBb0M7O0lBRXBDLGdFQUFrRTs7Ozs7O0lBaUNsRSw0REFvQkU7Ozs7OztJQU1GLDBEQWVFOzs7Ozs7SUFNRiwyREFlRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRWaWV3R3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXJsaXN0ID0gW107XG5cbiAgUEFSVElDSVBBTlQgPSBDb21ldENoYXQuR1JPVVBfTUVNQkVSX1NDT1BFLlBBUlRJQ0lQQU5UO1xuICBOQU1FOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuTkFNRTtcbiAgU0NPUEU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TQ09QRTtcbiAgR1JPVVBfTUVNQkVSUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkdST1VQX01FTUJFUlM7XG4gIEJBTjogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkJBTjtcbiAgS0lDSzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLktJQ0s7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgbGV0IGRhdGEgPSBhY3Rpb24ucGF5TG9hZDtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuQ0hBTkdFX1NDT1BFOiB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2NvcGUoZGF0YS5tZW1iZXIsIGRhdGEuc2NvcGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuQkFOOiB7XG4gICAgICAgIHRoaXMuYmFuTWVtYmVyKGRhdGEubWVtYmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLktJQ0s6IHtcbiAgICAgICAgdGhpcy5raWNrTWVtYmVyKGRhdGEubWVtYmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIHNjb3BlIG9mIGEgbWVtYmVyIG9mIGEgZ3JvdXBcbiAgICogQHBhcmFtIEFueSBtZW1iZXJcbiAgICovXG4gIGNoYW5nZVNjb3BlID0gKG1lbWJlciwgc2NvcGUpID0+IHtcbiAgICBjb25zdCBndWlkID0gdGhpcy5pdGVtLmd1aWQ7XG5cbiAgICBDb21ldENoYXQudXBkYXRlR3JvdXBNZW1iZXJTY29wZShndWlkLCBtZW1iZXIudWlkLCBzY29wZSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIFwidXBkYXRlR3JvdXBNZW1iZXJTY29wZSBzdWNjZXNzIHdpdGggcmVzcG9uc2U6IFwiLFxuICAgICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHsgc2NvcGU6IHNjb3BlIH0pO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuVVBEQVRFX0dST1VQX1BBUlRJQ0lQQU5UUyxcbiAgICAgICAgICAgIHBheUxvYWQ6IHVwZGF0ZWRNZW1iZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlR3JvdXBNZW1iZXJTY29wZSBmYWlsZWQgd2l0aCBlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCYW5zIGEgIG1lbWJlciBvZiBhIGdyb3VwXG4gICAqIEBwYXJhbSBBbnkgbWVtYmVyVG9CYW5cbiAgICovXG4gIGJhbk1lbWJlciA9IChtZW1iZXJUb0JhbikgPT4ge1xuICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICBDb21ldENoYXQuYmFuR3JvdXBNZW1iZXIoZ3VpZCwgbWVtYmVyVG9CYW4udWlkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFuR3JvdXBNZW1iZXIgc3VjY2VzcyB3aXRoIHJlc3BvbnNlOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuUkVNT1ZFX0dST1VQX1BBUlRJQ0lQQU5UUyxcbiAgICAgICAgICAgIHBheUxvYWQ6IG1lbWJlclRvQmFuLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImJhbkdyb3VwTWVtYmVyIGZhaWxlZCB3aXRoIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGtpY2tzIHRoZSBtZW1iZXIgbWVtYmVyIG9mIGEgZ3JvdXBcbiAgICogQHBhcmFtIEFueSBtZW1iZXJUb0tpY2tcbiAgICovXG4gIGtpY2tNZW1iZXIgPSAobWVtYmVyVG9LaWNrKSA9PiB7XG4gICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIENvbWV0Q2hhdC5raWNrR3JvdXBNZW1iZXIoZ3VpZCwgbWVtYmVyVG9LaWNrLnVpZClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImtpY2tHcm91cE1lbWJlciBzdWNjZXNzIHdpdGggcmVzcG9uc2U6IFwiLCByZXNwb25zZSk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5SRU1PVkVfR1JPVVBfUEFSVElDSVBBTlRTLFxuICAgICAgICAgICAgcGF5TG9hZDogbWVtYmVyVG9LaWNrLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImtpY2tHcm91cE1lbWJlciBmYWlsZWQgd2l0aCBlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBhY3Rpb24gdG8gaW5kaWNhdGUgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gY2xvc2UgdGhlIHZpZXcgbWVtYmVyIG1vZGFsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VWaWV3TWVtYmVyTW9kYWwoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjb21ldGNoYXQgdmlldyBtZW1iZXIgLS0+IGNsb3NlIHZpZXcgbWVtYmVyIGNsaWNrZWRcIik7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLk9QRU5fVklFV19NRU1CRVIsIHBheUxvYWQ6IG51bGwgfSk7XG4gIH1cbn1cbiJdfQ==