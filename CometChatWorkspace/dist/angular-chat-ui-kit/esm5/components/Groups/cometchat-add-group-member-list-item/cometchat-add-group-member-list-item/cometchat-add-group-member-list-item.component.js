/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-add-group-member-list-item/cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
var CometchatAddGroupMemberListItemComponent = /** @class */ (function () {
    function CometchatAddGroupMemberListItemComponent() {
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
    CometchatAddGroupMemberListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.checked = this.members.find((/**
         * @param {?} member
         * @return {?}
         */
        function (member) { return member.uid === _this.user.uid; }));
    };
    /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param Event event
     */
    /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param {?} event
     * @return {?}
     */
    CometchatAddGroupMemberListItemComponent.prototype.handleCheck = /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.checked = !this.checked;
        this.actionGenerated.emit({
            type: enums.MEMBER_UPDATED,
            payLoad: { user: this.user, userState: this.checked },
        });
    };
    CometchatAddGroupMemberListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-add-group-member-list-item",
                    template: "<tr class=\"tableRowStyle\">\n  <td class=\"tableColumnStyle\">\n    <div class=\"avatarStyle\">\n      <cometchat-avatar\n        [item]=\"user\"\n        [userStatus]=\"user?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"nameStyle\">{{ user?.name }}</div>\n  </td>\n  <td class=\"selectionColumnStyle\">\n    <!-- selectionBoxStyle -->\n    <input class=\"\" type=\"checkbox\" (change)=\"handleCheck($event)\" />\n    <label></label>\n  </td>\n</tr>\n",
                    styles: [".tableRowStyle{border:1px solid #eaeaea;display:table;width:100%;table-layout:fixed;font-size:15px}.tableColumnStyle{padding:8px;width:100%}.avatarStyle{float:left;margin-right:10px;height:35px;width:35px}.nameStyle{margin:10px 0;width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.selectionColumnStyle{padding:8px;width:50px}.selectionBoxStyle{display:none}.selectionBoxStyle+label{display:block;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAAzmf8ymv8ymP80mP8zmv80mf8zmv8zmP8zmf8zmv8ymf8zmf8zmf8zmf8zmf8zmf81mv88nf8+n/9Vqv9lsv9ptP9qtf9ttv9wt/95vP9+v/+Av/+k0f+z2f+42//B4P/T6f/U6f/d7v/r9f/t9v/v9//3+//6/f////+liWmjAAAAEHRSTlMAS0xNT4OFiL2+v8Dx8vP02HWCqwAAAAFiS0dEKcq3hSQAAAB1SURBVBgZBcEHQsIAFAWwx94lVIayl5Z//wuaJBku1sB6PkiSCQCMkyEA0M8CAJilAXD8PbAKgG1XPwhA+6obBPv3iWu9Wgi+67M7V7cFgUv9dXUGApt71Q2QBr6ejxZYZg4ATDMAAHrJGABGSdKfNUAz7SX/8SYQ2ZGUTKMAAAAASUVORK5CYII=) right center/16px no-repeat;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:right;padding:.625em}.selectionBoxStyle:checked+label{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAALVBMVEWqqqqSkpKWlpaXl5eWlpaWlpaioqKhoaGWlpby8vKWlpby8vLz8/OWlpb///+3+yqOAAAADXRSTlMGB4iJiovKy+Xl5ubnmt/z4gAAAAFiS0dEDm+9ME8AAAA3SURBVBjTYxBdexcCbjkyhJ17BwFvihnWvIOBXQz34Oy3Q5K9Gs6eweC+D8p8XcQg3Av1+w0FAE4f12rhSontAAAAAElFTkSuQmCC) right center/16px no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    CometchatAddGroupMemberListItemComponent.ctorParameters = function () { return []; };
    CometchatAddGroupMemberListItemComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        user: [{ type: Input }],
        members: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatAddGroupMemberListItemComponent;
}());
export { CometchatAddGroupMemberListItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL0dyb3Vwcy9jb21ldGNoYXQtYWRkLWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFFOUM7SUFlRTtRQVRTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUVmLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkQsQ0FBQzs7OztJQUVoQiwyREFBUTs7O0lBQVI7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUE1QixDQUE0QixFQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsOERBQVc7Ozs7O0lBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjO1lBQzFCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQWhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsc2VBQW9FOztpQkFFckU7Ozs7O3VCQUVFLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7a0NBSUwsTUFBTTs7SUFvQlQsK0NBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQTVCWSx3Q0FBd0M7OztJQUNuRCx3REFBcUI7O0lBQ3JCLHdEQUFxQjs7SUFDckIsd0RBQXFCOztJQUNyQiwyREFBd0I7O0lBRXhCLDJEQUF5Qjs7SUFFekIsbUVBQWtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1hZGQtZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWFkZC1ncm91cC1tZW1iZXItbGlzdC1pdGVtLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEFkZEdyb3VwTWVtYmVyTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIHVzZXIgPSBudWxsO1xuICBASW5wdXQoKSBtZW1iZXJzID0gbnVsbDtcblxuICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMubWVtYmVycy5maW5kKChtZW1iZXIpID0+IG1lbWJlci51aWQgPT09IHRoaXMudXNlci51aWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRvZ2dsZSB0aGUgY2hlY2tib3ggZm9yIGVhY2ggdXNlcnMgLCB0aGF0IGlzLCB0byBhZGQgdGhlbSBvciBub3QgdG8gYWRkIHRoZW0gaW4gdGhlIGdyb3VwXG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgaGFuZGxlQ2hlY2soZXZlbnQpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuXG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5NRU1CRVJfVVBEQVRFRCxcbiAgICAgIHBheUxvYWQ6IHsgdXNlcjogdGhpcy51c2VyLCB1c2VyU3RhdGU6IHRoaXMuY2hlY2tlZCB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=