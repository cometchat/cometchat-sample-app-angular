/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-view-group-member-list/cometchat-view-group-member-list/cometchat-view-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatViewGroupMemberListComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.loggedInUser = null;
        this.memberList = [];
        this.PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        this.NAME = COMETCHAT_CONSTANTS.NAME;
        this.SCOPE = COMETCHAT_CONSTANTS.SCOPE;
        this.GROUP_MEMBERS = COMETCHAT_CONSTANTS.GROUP_MEMBERS;
        this.BAN = COMETCHAT_CONSTANTS.BAN;
        this.KICK = COMETCHAT_CONSTANTS.KICK;
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
            try {
                /** @type {?} */
                const guid = this.item.guid;
                CometChat.updateGroupMemberScope(guid, member.uid, scope)
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (response) {
                        logger("updateGroupMemberScope success with response: ", response);
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
                    logger("updateGroupMemberScope failed with error: ", error);
                }));
            }
            catch (error) {
                logger(error);
            }
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
            try {
                /** @type {?} */
                const guid = this.item.guid;
                CometChat.banGroupMember(guid, memberToBan.uid)
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (response) {
                        logger("banGroupMember success with response: ", response);
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
                    logger("banGroupMember failed with error: ", error);
                }));
            }
            catch (error) {
                logger(error);
            }
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
            try {
                /** @type {?} */
                const guid = this.item.guid;
                CometChat.kickGroupMember(guid, memberToKick.uid)
                    .then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (response) {
                        logger("kickGroupMember success with response: ", response);
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
                    logger("kickGroupMember failed with error: ", error);
                }));
            }
            catch (error) {
                logger(error);
            }
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
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits an action to indicate the parent component to close the view member modal
     * @return {?}
     */
    closeViewMemberModal() {
        try {
            this.actionGenerated.emit({
                type: enums.OPEN_VIEW_MEMBER,
                payLoad: null,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatViewGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-view-group-member-list",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeViewMemberModal()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            GROUP_MEMBERS\n          }}\n        </caption>\n        <thead>\n          <tr>\n            <th>{{ NAME }}</th>\n            <th class=\"scopeColumnStyle\">{{ SCOPE }}</th>\n\n            <!-- EDIT ACCESS -->\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ BAN }}</div>\n            </th>\n            <th class=\"actionColumnStyle\">\n              <div *ngIf=\"item?.scope !== PARTICIPANT\">{{ KICK }}</div>\n            </th>\n            <!-- EDIT ACCESS -->\n          </tr>\n        </thead>\n        <tbody class=\"tableBodyStyle\">\n          <cometchat-view-group-member-list-item\n            *ngFor=\"let member of memberList\"\n            [member]=\"member\"\n            [item]=\"item\"\n            [type]=\"type\"\n            [loggedInUser]=\"loggedInUser\"\n            (actionGenerated)=\"actionHandler($event)\"\n          ></cometchat-view-group-member-list-item>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.modalTableStyle tr th{padding:8px;font-size:12px;text-align:left}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:325px;overflow-y:auto;display:block}.actionColumnStyle{width:70px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}.scopeColumnStyle{width:170px}.actionColumnStyle{width:55px}}"]
            }] }
];
/** @nocollapse */
CometChatViewGroupMemberListComponent.ctorParameters = () => [];
CometChatViewGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    memberList: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.type;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.memberList;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.PARTICIPANT;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.NAME;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.SCOPE;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.GROUP_MEMBERS;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.BAN;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.KICK;
    /** @type {?} */
    CometChatViewGroupMemberListComponent.prototype.actionGenerated;
    /**
     * Changes the scope of a member of a group
     * \@param Any member
     * @type {?}
     */
    CometChatViewGroupMemberListComponent.prototype.changeScope;
    /**
     * Bans a  member of a group
     * \@param Any memberToBan
     * @type {?}
     */
    CometChatViewGroupMemberListComponent.prototype.banMember;
    /**
     * kicks the member member of a group
     * \@param Any memberToKick
     * @type {?}
     */
    CometChatViewGroupMemberListComponent.prototype.kickMember;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL0NvbWV0Q2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTWxELE1BQU0sT0FBTyxxQ0FBcUM7SUFlaEQ7UUFkUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ3ZELFNBQUksR0FBVyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDeEMsVUFBSyxHQUFXLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUMxQyxrQkFBYSxHQUFXLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxRCxRQUFHLEdBQVcsbUJBQW1CLENBQUMsR0FBRyxDQUFDO1FBQ3RDLFNBQUksR0FBVyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFFOUIsb0JB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LEtBQUs7eUJBQ0wsS0FBSzs4QkFTTCxNQUFNOzs7O0lBWlAscURBQXFCOztJQUNyQixxREFBcUI7O0lBQ3JCLDZEQUE2Qjs7SUFDN0IsMkRBQXlCOztJQUV6Qiw0REFBdUQ7O0lBQ3ZELHFEQUF3Qzs7SUFDeEMsc0RBQTBDOztJQUMxQyw4REFBMEQ7O0lBQzFELG9EQUFzQzs7SUFDdEMscURBQXdDOztJQUV4QyxnRUFBa0U7Ozs7OztJQXFDbEUsNERBcUJFOzs7Ozs7SUFNRiwwREFtQkU7Ozs7OztJQU1GLDJEQW1CRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtdmlldy1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0Vmlld0dyb3VwTWVtYmVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgQElucHV0KCkgbWVtYmVyTGlzdCA9IFtdO1xuXG4gIFBBUlRJQ0lQQU5UID0gQ29tZXRDaGF0LkdST1VQX01FTUJFUl9TQ09QRS5QQVJUSUNJUEFOVDtcbiAgTkFNRTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OQU1FO1xuICBTQ09QRTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5TQ09QRTtcbiAgR1JPVVBfTUVNQkVSUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5HUk9VUF9NRU1CRVJTO1xuICBCQU46IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQkFOO1xuICBLSUNLOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLktJQ0s7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBkYXRhID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5DSEFOR0VfU0NPUEU6IHtcbiAgICAgICAgICB0aGlzLmNoYW5nZVNjb3BlKGRhdGEubWVtYmVyLCBkYXRhLnNjb3BlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLkJBTjoge1xuICAgICAgICAgIHRoaXMuYmFuTWVtYmVyKGRhdGEubWVtYmVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLktJQ0s6IHtcbiAgICAgICAgICB0aGlzLmtpY2tNZW1iZXIoZGF0YS5tZW1iZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIHNjb3BlIG9mIGEgbWVtYmVyIG9mIGEgZ3JvdXBcbiAgICogQHBhcmFtIEFueSBtZW1iZXJcbiAgICovXG4gIGNoYW5nZVNjb3BlID0gKG1lbWJlciwgc2NvcGUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuXG4gICAgICBDb21ldENoYXQudXBkYXRlR3JvdXBNZW1iZXJTY29wZShndWlkLCBtZW1iZXIudWlkLCBzY29wZSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsb2dnZXIoXCJ1cGRhdGVHcm91cE1lbWJlclNjb3BlIHN1Y2Nlc3Mgd2l0aCByZXNwb25zZTogXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXIgPSBPYmplY3QuYXNzaWduKHt9LCBtZW1iZXIsIHsgc2NvcGU6IHNjb3BlIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLlVQREFURV9HUk9VUF9QQVJUSUNJUEFOVFMsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IHVwZGF0ZWRNZW1iZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJ1cGRhdGVHcm91cE1lbWJlclNjb3BlIGZhaWxlZCB3aXRoIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEJhbnMgYSAgbWVtYmVyIG9mIGEgZ3JvdXBcbiAgICogQHBhcmFtIEFueSBtZW1iZXJUb0JhblxuICAgKi9cbiAgYmFuTWVtYmVyID0gKG1lbWJlclRvQmFuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGd1aWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIENvbWV0Q2hhdC5iYW5Hcm91cE1lbWJlcihndWlkLCBtZW1iZXJUb0Jhbi51aWQpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgbG9nZ2VyKFwiYmFuR3JvdXBNZW1iZXIgc3VjY2VzcyB3aXRoIHJlc3BvbnNlOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLlJFTU9WRV9HUk9VUF9QQVJUSUNJUEFOVFMsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IG1lbWJlclRvQmFuLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiYmFuR3JvdXBNZW1iZXIgZmFpbGVkIHdpdGggZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICoga2lja3MgdGhlIG1lbWJlciBtZW1iZXIgb2YgYSBncm91cFxuICAgKiBAcGFyYW0gQW55IG1lbWJlclRvS2lja1xuICAgKi9cbiAga2lja01lbWJlciA9IChtZW1iZXJUb0tpY2spID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3VpZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgICAgQ29tZXRDaGF0LmtpY2tHcm91cE1lbWJlcihndWlkLCBtZW1iZXJUb0tpY2sudWlkKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZ2dlcihcImtpY2tHcm91cE1lbWJlciBzdWNjZXNzIHdpdGggcmVzcG9uc2U6IFwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuUkVNT1ZFX0dST1VQX1BBUlRJQ0lQQU5UUyxcbiAgICAgICAgICAgICAgcGF5TG9hZDogbWVtYmVyVG9LaWNrLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwia2lja0dyb3VwTWVtYmVyIGZhaWxlZCB3aXRoIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGFjdGlvbiB0byBpbmRpY2F0ZSB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBjbG9zZSB0aGUgdmlldyBtZW1iZXIgbW9kYWxcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVZpZXdNZW1iZXJNb2RhbCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk9QRU5fVklFV19NRU1CRVIsXG4gICAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==