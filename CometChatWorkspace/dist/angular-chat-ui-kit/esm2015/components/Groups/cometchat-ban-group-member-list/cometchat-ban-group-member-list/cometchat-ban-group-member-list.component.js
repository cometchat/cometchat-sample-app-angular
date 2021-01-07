/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-ban-group-member-list/cometchat-ban-group-member-list/cometchat-ban-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BAN_ICON } from "../../../resources/icons/banIcon";
import * as enums from "../../../utils/enums";
export class CometchatBanGroupMemberListComponent {
    constructor() {
        this.item = null;
        this.member = null;
        this.loggedInUser = null;
        this.actionGenerated = new EventEmitter();
        this.banIcon = BAN_ICON;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    unbanMember() {
        this.actionGenerated.emit({
            type: enums.UNBAN,
            payLoad: { member: this.member },
        });
    }
}
CometchatBanGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-ban-group-member-list",
                template: "<tr class=\"tableRowStyle\">\n  <td>\n    <div class=\"avatarStyle\">\n      <!--avatar-->\n      <cometchat-avatar\n        [item]=\"member\"\n        [userStatus]=\"member?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">\n      <!--name-->\n      {{ member?.name }}\n    </div>\n  </td>\n  <td class=\"roleStyle\">\n    <!--scope-->\n    {{ member?.scope }}\n  </td>\n  <td class=\"actionStyle\">\n    <!--Unban-->\n    <span (click)=\"unbanMember()\">\n      <!-- ban icon -->\n      <img [src]=\"banIcon\" loading=\"lazy\" />\n    </span>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:14px}.tableRowStyle>td{padding:.625em}.tableRowStyle>img{width:36px;height:36px;float:left}.avatarStyle{float:left;height:35px;width:35px}.avatarStyle>span{top:26px;left:-8px}.nameStyle{margin:10px 0 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:4px}.roleStyle{width:150px;font-size:12px}.actionStyle{width:70px;cursor:pointer}.actionStyle>img{width:20px!important;height:20px!important;cursor:pointer}@media (min-width:320px) and (max-width:767px){.roleStyle{width:115px}}"]
            }] }
];
/** @nocollapse */
CometchatBanGroupMemberListComponent.ctorParameters = () => [];
CometchatBanGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    member: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.member;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.name;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.unban;
    /** @type {?} */
    CometchatBanGroupMemberListComponent.prototype.banIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQU85QyxNQUFNLE9BQU8sb0NBQW9DO0lBVS9DO1FBVFMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWxFLFlBQU8sR0FBRyxRQUFRLENBQUM7SUFFSixDQUFDOzs7O0lBRWhCLFFBQVEsS0FBSSxDQUFDOzs7O0lBQ2IsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLDRsQkFBK0Q7O2FBRWhFOzs7OzttQkFFRSxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBSFAsb0RBQXFCOztJQUNyQixzREFBdUI7O0lBQ3ZCLDREQUE2Qjs7SUFDN0IsK0RBQWtFOztJQUVsRSxvREFBYTs7SUFDYixxREFBTTs7SUFDTix1REFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBCQU5fSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvYmFuSWNvblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRCYW5Hcm91cE1lbWJlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgbWVtYmVyID0gbnVsbDtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbmFtZTogc3RyaW5nO1xuICB1bmJhbjtcbiAgYmFuSWNvbiA9IEJBTl9JQ09OO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG4gIHVuYmFuTWVtYmVyKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuVU5CQU4sXG4gICAgICBwYXlMb2FkOiB7IG1lbWJlcjogdGhpcy5tZW1iZXIgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19