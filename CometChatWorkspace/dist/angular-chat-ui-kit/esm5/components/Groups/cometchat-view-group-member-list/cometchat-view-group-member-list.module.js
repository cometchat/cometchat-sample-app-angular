/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-view-group-member-list/cometchat-view-group-member-list.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewGroupMemberListComponent } from "./cometchat-view-group-member-list/cometchat-view-group-member-list.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatViewGroupMemberListItemModule } from "../cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.module";
var CometchatViewGroupMemberListModule = /** @class */ (function () {
    function CometchatViewGroupMemberListModule() {
    }
    CometchatViewGroupMemberListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CometchatViewGroupMemberListComponent],
                    imports: [
                        CommonModule,
                        CometchatBackdropModule,
                        CometchatViewGroupMemberListItemModule,
                    ],
                    exports: [CometchatViewGroupMemberListComponent],
                },] }
    ];
    return CometchatViewGroupMemberListModule;
}());
export { CometchatViewGroupMemberListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvR3JvdXBzL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0L2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLHVGQUF1RixDQUFDO0FBRS9JO0lBQUE7SUFTaUQsQ0FBQzs7Z0JBVGpELFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztvQkFDckQsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osdUJBQXVCO3dCQUN2QixzQ0FBc0M7cUJBQ3ZDO29CQUNELE9BQU8sRUFBRSxDQUFDLHFDQUFxQyxDQUFDO2lCQUNqRDs7SUFDZ0QseUNBQUM7Q0FBQSxBQVRsRCxJQVNrRDtTQUFyQyxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRWaWV3R3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QvY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb21ldGNoYXRCYWNrZHJvcE1vZHVsZSB9IGZyb20gXCIuLi8uLi9TaGFyZWQvY29tZXRjaGF0LWJhY2tkcm9wL2NvbWV0Y2hhdC1iYWNrZHJvcC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFZpZXdHcm91cE1lbWJlckxpc3RJdGVtTW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC12aWV3LWdyb3VwLW1lbWJlci1saXN0LWl0ZW0vY29tZXRjaGF0LXZpZXctZ3JvdXAtbWVtYmVyLWxpc3QtaXRlbS5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29tZXRjaGF0Vmlld0dyb3VwTWVtYmVyTGlzdENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29tZXRjaGF0QmFja2Ryb3BNb2R1bGUsXG4gICAgQ29tZXRjaGF0Vmlld0dyb3VwTWVtYmVyTGlzdEl0ZW1Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtDb21ldGNoYXRWaWV3R3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Vmlld0dyb3VwTWVtYmVyTGlzdE1vZHVsZSB7fVxuIl19