/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-ban-group-member-list/cometchat-ban-group-member-list/cometchat-ban-group-member-list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BAN_ICON } from "./resources/banIcon";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatBanGroupMemberListComponent {
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
     * propagates and action to unaban the current member
     * @return {?}
     */
    unbanMember() {
        try {
            this.actionGenerated.emit({
                type: enums.UNBAN,
                payLoad: { member: this.member },
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatBanGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-ban-group-member-list",
                template: "<tr class=\"tableRowStyle\">\n  <td>\n    <div class=\"avatarStyle\">\n      <!--avatar-->\n      <cometchat-avatar\n        [item]=\"member\"\n        [userStatus]=\"member?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">\n      <!--name-->\n      {{ member?.name }}\n    </div>\n  </td>\n  <td class=\"roleStyle\">\n    <!--scope-->\n    {{ member?.scope }}\n  </td>\n  <td class=\"actionStyle\">\n    <!--Unban-->\n    <span (click)=\"unbanMember()\">\n      <!-- ban icon -->\n      <img [src]=\"banIcon\" loading=\"lazy\" />\n    </span>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:14px}.tableRowStyle>td{padding:.625em}.tableRowStyle>img{width:36px;height:36px;float:left}.avatarStyle{float:left;height:35px;width:35px}.avatarStyle>span{top:26px;left:-8px}.nameStyle{margin:10px 0 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:4px}.roleStyle{width:150px;font-size:12px}.actionStyle{width:70px;cursor:pointer}.actionStyle>img{width:20px!important;height:20px!important;cursor:pointer}@media (min-width:320px) and (max-width:767px){.roleStyle{width:115px}}"]
            }] }
];
/** @nocollapse */
CometChatBanGroupMemberListComponent.ctorParameters = () => [];
CometChatBanGroupMemberListComponent.propDecorators = {
    item: [{ type: Input }],
    member: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.item;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.member;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.name;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.unban;
    /** @type {?} */
    CometChatBanGroupMemberListComponent.prototype.banIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvQ29tZXRDaGF0LWJhbi1ncm91cC1tZW1iZXItbGlzdC9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFNbEQsTUFBTSxPQUFPLG9DQUFvQztJQVUvQztRQVRTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUlsRSxZQUFPLEdBQUcsUUFBUSxDQUFDO0lBRUosQ0FBQzs7OztJQUVoQixRQUFRLEtBQUksQ0FBQzs7Ozs7SUFLYixXQUFXO1FBQ1QsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2pCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ2pDLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0MsNGxCQUErRDs7YUFFaEU7Ozs7O21CQUVFLEtBQUs7cUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFIUCxvREFBcUI7O0lBQ3JCLHNEQUF1Qjs7SUFDdkIsNERBQTZCOztJQUM3QiwrREFBa0U7O0lBRWxFLG9EQUFhOztJQUNiLHFEQUFNOztJQUNOLHVEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IEJBTl9JQ09OIH0gZnJvbSBcIi4vcmVzb3VyY2VzL2Jhbkljb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1iYW4tZ3JvdXAtbWVtYmVyLWxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtYmFuLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdEJhbkdyb3VwTWVtYmVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXIgPSBudWxsO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBuYW1lOiBzdHJpbmc7XG4gIHVuYmFuO1xuICBiYW5JY29uID0gQkFOX0lDT047XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogcHJvcGFnYXRlcyBhbmQgYWN0aW9uIHRvIHVuYWJhbiB0aGUgY3VycmVudCBtZW1iZXJcbiAgICovXG4gIHVuYmFuTWVtYmVyKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVU5CQU4sXG4gICAgICAgIHBheUxvYWQ6IHsgbWVtYmVyOiB0aGlzLm1lbWJlciB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=