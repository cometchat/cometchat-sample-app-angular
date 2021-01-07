/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/cometchat-nav-bar/cometchat-nav-bar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatNavBarComponent } from "./cometchat-nav-bar/cometchat-nav-bar.component";
import { CometchatUserProfileModule } from "../cometchat-user-profile/cometchat-user-profile.module";
import { CometchatUserListModule } from "../../Users/cometchat-user-list/cometchat-user-list.module";
import { CometchatGroupListModule } from "../../Groups/cometchat-group-list/cometchat-group-list.module";
import { CometchatConversationListModule } from "../../Chats/cometchat-conversation-list/cometchat-conversation-list.module";
var CometchatNavBarModule = /** @class */ (function () {
    function CometchatNavBarModule() {
    }
    CometchatNavBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CometchatNavBarComponent],
                    imports: [
                        CommonModule,
                        CometchatUserProfileModule,
                        CometchatUserListModule,
                        CometchatGroupListModule,
                        CometchatConversationListModule,
                    ],
                    exports: [CometchatNavBarComponent],
                },] }
    ];
    return CometchatNavBarModule;
}());
export { CometchatNavBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW5hdi1iYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVXNlclByb2ZpbGUvY29tZXRjaGF0LW5hdi1iYXIvY29tZXRjaGF0LW5hdi1iYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDckcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDekcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDN0g7SUFBQTtJQVdvQyxDQUFDOztnQkFYcEMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUN4QyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWiwwQkFBMEI7d0JBQzFCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QiwrQkFBK0I7cUJBQ2hDO29CQUNELE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNwQzs7SUFDbUMsNEJBQUM7Q0FBQSxBQVhyQyxJQVdxQztTQUF4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBDb21ldGNoYXROYXZCYXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtbmF2LWJhci9jb21ldGNoYXQtbmF2LWJhci5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFVzZXJQcm9maWxlTW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUvY29tZXRjaGF0LXVzZXItcHJvZmlsZS5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFVzZXJMaXN0TW9kdWxlIH0gZnJvbSBcIi4uLy4uL1VzZXJzL2NvbWV0Y2hhdC11c2VyLWxpc3QvY29tZXRjaGF0LXVzZXItbGlzdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdEdyb3VwTGlzdE1vZHVsZSB9IGZyb20gXCIuLi8uLi9Hcm91cHMvY29tZXRjaGF0LWdyb3VwLWxpc3QvY29tZXRjaGF0LWdyb3VwLWxpc3QubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0TW9kdWxlIH0gZnJvbSBcIi4uLy4uL0NoYXRzL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QubW9kdWxlXCI7XG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb21ldGNoYXROYXZCYXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Y2hhdFVzZXJQcm9maWxlTW9kdWxlLFxuICAgIENvbWV0Y2hhdFVzZXJMaXN0TW9kdWxlLFxuICAgIENvbWV0Y2hhdEdyb3VwTGlzdE1vZHVsZSxcbiAgICBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRjaGF0TmF2QmFyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TmF2QmFyTW9kdWxlIHt9XG4iXX0=