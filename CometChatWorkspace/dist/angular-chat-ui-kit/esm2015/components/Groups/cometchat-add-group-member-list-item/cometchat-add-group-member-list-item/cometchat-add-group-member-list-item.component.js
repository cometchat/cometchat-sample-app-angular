/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-add-group-member-list-item/cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
export class CometchatAddGroupMemberListItemComponent {
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
        this.checked = this.members.find((/**
         * @param {?} member
         * @return {?}
         */
        (member) => member.uid === this.user.uid));
    }
    /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param {?} event
     * @return {?}
     */
    handleCheck(event) {
        this.checked = !this.checked;
        this.actionGenerated.emit({
            type: enums.MEMBER_UPDATED,
            payLoad: { user: this.user, userState: this.checked },
        });
        // props.changed(props.user, value);
    }
}
CometchatAddGroupMemberListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-add-group-member-list-item",
                template: "<tr class=\"tableRowStyle\">\n  <td class=\"tableColumnStyle\">\n    <div class=\"avatarStyle\">\n      <cometchat-avatar\n        [item]=\"user\"\n        [userStatus]=\"user?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">{{ user?.name }}</div>\n  </td>\n  <td class=\"selectionColumnStyle\">\n    <!-- selectionBoxStyle -->\n    <input class=\"\" type=\"checkbox\" (change)=\"handleCheck($event)\" />\n    <label></label>\n  </td>\n</tr>\n",
                styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:15px}.tableColumnStyle{padding:8px;width:100%}.avatarStyle{float:left;margin-right:10px;height:35px;width:35px}.nameStyle{margin:10px 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.selectionColumnStyle{padding:8px;width:50px}.selectionBoxStyle{display:none}.selectionBoxStyle+label{display:block;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAAzmf8ymv8ymP80mP8zmv80mf8zmv8zmP8zmf8zmv8ymf8zmf8zmf8zmf8zmf8zmf81mv88nf8+n/9Vqv9lsv9ptP9qtf9ttv9wt/95vP9+v/+Av/+k0f+z2f+42//B4P/T6f/U6f/d7v/r9f/t9v/v9//3+//6/f////+liWmjAAAAEHRSTlMAS0xNT4OFiL2+v8Dx8vP02HWCqwAAAAFiS0dEKcq3hSQAAAB1SURBVBgZBcEHQsIAFAWwx94lVIayl5Z//wuaJBku1sB6PkiSCQCMkyEA0M8CAJilAXD8PbAKgG1XPwhA+6obBPv3iWu9Wgi+67M7V7cFgUv9dXUGApt71Q2QBr6ejxZYZg4ATDMAAHrJGABGSdKfNUAz7SX/8SYQ2ZGUTKMAAAAASUVORK5CYII=) right center/16px no-repeat;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:right;padding:.625em}.selectionBoxStyle:checked+label{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAALVBMVEWqqqqSkpKWlpaXl5eWlpaWlpaioqKhoaGWlpby8vKWlpby8vLz8/OWlpb///+3+yqOAAAADXRSTlMGB4iJiovKy+Xl5ubnmt/z4gAAAAFiS0dEDm+9ME8AAAA3SURBVBjTYxBdexcCbjkyhJ17BwFvihnWvIOBXQz34Oy3Q5K9Gs6eweC+D8p8XcQg3Av1+w0FAE4f12rhSontAAAAAElFTkSuQmCC) right center/16px no-repeat}"]
            }] }
];
/** @nocollapse */
CometchatAddGroupMemberListItemComponent.ctorParameters = () => [];
CometchatAddGroupMemberListItemComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    user: [{ type: Input }],
    members: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.item;
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.type;
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.user;
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.members;
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.checked;
    /** @type {?} */
    CometchatAddGroupMemberListItemComponent.prototype.actionGenerated;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0dyb3Vwcy9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFPOUMsTUFBTSxPQUFPLHdDQUF3QztJQVVuRDtRQVRTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUVmLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDO0lBQzdFLENBQUM7Ozs7OztJQU1ELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjO1lBQzFCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1NBQ3RELENBQUMsQ0FBQztRQUVILG9DQUFvQztJQUN0QyxDQUFDOzs7WUFsQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELHNlQUFvRTs7YUFFckU7Ozs7O21CQUVFLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7OEJBSUwsTUFBTTs7OztJQVBQLHdEQUFxQjs7SUFDckIsd0RBQXFCOztJQUNyQix3REFBcUI7O0lBQ3JCLDJEQUF3Qjs7SUFFeEIsMkRBQXlCOztJQUV6QixtRUFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0uY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0QWRkR3JvdXBNZW1iZXJMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgdXNlciA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbWJlcnMgPSBudWxsO1xuXG4gIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5tZW1iZXJzLmZpbmQoKG1lbWJlcikgPT4gbWVtYmVyLnVpZCA9PT0gdGhpcy51c2VyLnVpZCk7XG4gIH1cblxuICAvKipcbiAgICogdG9nZ2xlIHRoZSBjaGVja2JveCBmb3IgZWFjaCB1c2VycyAsIHRoYXQgaXMsIHRvIGFkZCB0aGVtIG9yIG5vdCB0byBhZGQgdGhlbSBpbiB0aGUgZ3JvdXBcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBoYW5kbGVDaGVjayhldmVudCkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLk1FTUJFUl9VUERBVEVELFxuICAgICAgcGF5TG9hZDogeyB1c2VyOiB0aGlzLnVzZXIsIHVzZXJTdGF0ZTogdGhpcy5jaGVja2VkIH0sXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wcy5jaGFuZ2VkKHByb3BzLnVzZXIsIHZhbHVlKTtcbiAgfVxufVxuIl19