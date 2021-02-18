/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-add-group-member-list-item/cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatAddGroupMemberListItemComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.user = null;
        this.members = null;
        this.checked = false;
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checked = this.members.find((/**
             * @param {?} member
             * @return {?}
             */
            (member) => member.uid === this.user.uid));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param {?} event
     * @return {?}
     */
    handleCheck(event) {
        try {
            this.checked = !this.checked;
            this.actionGenerated.emit({
                type: enums.MEMBER_UPDATED,
                payLoad: { user: this.user, userState: this.checked },
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatAddGroupMemberListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-add-group-member-list-item",
                template: "<tr class=\"tableRowStyle\">\n  <td class=\"tableColumnStyle\">\n    <div class=\"avatarStyle\">\n      <cometchat-avatar\n        [item]=\"user\"\n        [userStatus]=\"user?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">{{ user?.name }}</div>\n  </td>\n  <td class=\"selectionColumnStyle\">\n    <!-- selectionBoxStyle -->\n    <input class=\"\" type=\"checkbox\" (change)=\"handleCheck($event)\" />\n    <label></label>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:15px}.tableColumnStyle{padding:8px;width:100%}.avatarStyle{float:left;margin-right:10px;height:35px;width:35px}.nameStyle{margin:10px 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.selectionColumnStyle{padding:8px;width:50px}.selectionBoxStyle{display:none}.selectionBoxStyle+label{display:block;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAAzmf8ymv8ymP80mP8zmv80mf8zmv8zmP8zmf8zmv8ymf8zmf8zmf8zmf8zmf8zmf81mv88nf8+n/9Vqv9lsv9ptP9qtf9ttv9wt/95vP9+v/+Av/+k0f+z2f+42//B4P/T6f/U6f/d7v/r9f/t9v/v9//3+//6/f////+liWmjAAAAEHRSTlMAS0xNT4OFiL2+v8Dx8vP02HWCqwAAAAFiS0dEKcq3hSQAAAB1SURBVBgZBcEHQsIAFAWwx94lVIayl5Z//wuaJBku1sB6PkiSCQCMkyEA0M8CAJilAXD8PbAKgG1XPwhA+6obBPv3iWu9Wgi+67M7V7cFgUv9dXUGApt71Q2QBr6ejxZYZg4ATDMAAHrJGABGSdKfNUAz7SX/8SYQ2ZGUTKMAAAAASUVORK5CYII=) right center/16px no-repeat;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:right;padding:.625em}.selectionBoxStyle:checked+label{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAALVBMVEWqqqqSkpKWlpaXl5eWlpaWlpaioqKhoaGWlpby8vKWlpby8vLz8/OWlpb///+3+yqOAAAADXRSTlMGB4iJiovKy+Xl5ubnmt/z4gAAAAFiS0dEDm+9ME8AAAA3SURBVBjTYxBdexcCbjkyhJ17BwFvihnWvIOBXQz34Oy3Q5K9Gs6eweC+D8p8XcQg3Av1+w0FAE4f12rhSontAAAAAElFTkSuQmCC) right center/16px no-repeat}"]
            }] }
];
/** @nocollapse */
CometChatAddGroupMemberListItemComponent.ctorParameters = () => [];
CometChatAddGroupMemberListItemComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    user: [{ type: Input }],
    members: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.type;
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.user;
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.members;
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.checked;
    /** @type {?} */
    CometChatAddGroupMemberListItemComponent.prototype.actionGenerated;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0dyb3Vwcy9Db21ldENoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2xELE1BQU0sT0FBTyx3Q0FBd0M7SUFVbkQ7UUFUUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXhCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFZixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5ELENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztZQUM5QixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDekMsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSTtZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRTdCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzFCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO2FBQ3RELENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7OztZQTFDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsc2VBQW9FOzthQUVyRTs7Ozs7bUJBRUUsS0FBSzttQkFDTCxLQUFLO21CQUNMLEtBQUs7c0JBQ0wsS0FBSzs4QkFJTCxNQUFNOzs7O0lBUFAsd0RBQXFCOztJQUNyQix3REFBcUI7O0lBQ3JCLHdEQUFxQjs7SUFDckIsMkRBQXdCOztJQUV4QiwyREFBeUI7O0lBRXpCLG1FQUFrRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW1cIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRBZGRHcm91cE1lbWJlckxpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSB1c2VyID0gbnVsbDtcbiAgQElucHV0KCkgbWVtYmVycyA9IG51bGw7XG5cbiAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5tZW1iZXJzLmZpbmQoXG4gICAgICAgIChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IHRoaXMudXNlci51aWRcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRvZ2dsZSB0aGUgY2hlY2tib3ggZm9yIGVhY2ggdXNlcnMgLCB0aGF0IGlzLCB0byBhZGQgdGhlbSBvciBub3QgdG8gYWRkIHRoZW0gaW4gdGhlIGdyb3VwXG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgaGFuZGxlQ2hlY2soZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9VUERBVEVELFxuICAgICAgICBwYXlMb2FkOiB7IHVzZXI6IHRoaXMudXNlciwgdXNlclN0YXRlOiB0aGlzLmNoZWNrZWQgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19