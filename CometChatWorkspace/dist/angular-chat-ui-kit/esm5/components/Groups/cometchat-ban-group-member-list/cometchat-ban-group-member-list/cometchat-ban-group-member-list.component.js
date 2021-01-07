/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-ban-group-member-list/cometchat-ban-group-member-list/cometchat-ban-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BAN_ICON } from "../../../resources/icons/banIcon";
import * as enums from "../../../utils/enums";
var CometchatBanGroupMemberListComponent = /** @class */ (function () {
    function CometchatBanGroupMemberListComponent() {
        this.item = null;
        this.member = null;
        this.loggedInUser = null;
        this.actionGenerated = new EventEmitter();
        this.banIcon = BAN_ICON;
    }
    /**
     * @return {?}
     */
    CometchatBanGroupMemberListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    CometchatBanGroupMemberListComponent.prototype.unbanMember = /**
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.UNBAN,
            payLoad: { member: this.member },
        });
    };
    CometchatBanGroupMemberListComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-ban-group-member-list",
                    template: "<tr class=\"tableRowStyle\">\n  <td>\n    <div class=\"avatarStyle\">\n      <!--avatar-->\n      <cometchat-avatar\n        [item]=\"member\"\n        [userStatus]=\"member?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">\n      <!--name-->\n      {{ member?.name }}\n    </div>\n  </td>\n  <td class=\"roleStyle\">\n    <!--scope-->\n    {{ member?.scope }}\n  </td>\n  <td class=\"actionStyle\">\n    <!--Unban-->\n    <span (click)=\"unbanMember()\">\n      <!-- ban icon -->\n      <img [src]=\"banIcon\" loading=\"lazy\" />\n    </span>\n  </td>\n</tr>\n",
                    styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:14px}.tableRowStyle>td{padding:.625em}.tableRowStyle>img{width:36px;height:36px;float:left}.avatarStyle{float:left;height:35px;width:35px}.avatarStyle>span{top:26px;left:-8px}.nameStyle{margin:10px 0 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:4px}.roleStyle{width:150px;font-size:12px}.actionStyle{width:70px;cursor:pointer}.actionStyle>img{width:20px!important;height:20px!important;cursor:pointer}@media (min-width:320px) and (max-width:767px){.roleStyle{width:115px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatBanGroupMemberListComponent.ctorParameters = function () { return []; };
    CometchatBanGroupMemberListComponent.propDecorators = {
        item: [{ type: Input }],
        member: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatBanGroupMemberListComponent;
}());
export { CometchatBanGroupMemberListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUU5QztJQWVFO1FBVFMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWxFLFlBQU8sR0FBRyxRQUFRLENBQUM7SUFFSixDQUFDOzs7O0lBRWhCLHVEQUFROzs7SUFBUixjQUFZLENBQUM7Ozs7SUFDYiwwREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBdkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyw0bEJBQStEOztpQkFFaEU7Ozs7O3VCQUVFLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07O0lBZVQsMkNBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQW5CWSxvQ0FBb0M7OztJQUMvQyxvREFBcUI7O0lBQ3JCLHNEQUF1Qjs7SUFDdkIsNERBQTZCOztJQUM3QiwrREFBa0U7O0lBRWxFLG9EQUFhOztJQUNiLHFEQUFNOztJQUNOLHVEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IEJBTl9JQ09OIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc291cmNlcy9pY29ucy9iYW5JY29uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEJhbkdyb3VwTWVtYmVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXIgPSBudWxsO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBuYW1lOiBzdHJpbmc7XG4gIHVuYmFuO1xuICBiYW5JY29uID0gQkFOX0lDT047XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cbiAgdW5iYW5NZW1iZXIoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5VTkJBTixcbiAgICAgIHBheUxvYWQ6IHsgbWVtYmVyOiB0aGlzLm1lbWJlciB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=