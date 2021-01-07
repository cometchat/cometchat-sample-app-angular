/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverTextMessageBubbleComponent } from "./cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";
var CometchatReceiverTextMessageBubbleModule = /** @class */ (function () {
    function CometchatReceiverTextMessageBubbleModule() {
    }
    CometchatReceiverTextMessageBubbleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CometchatReceiverTextMessageBubbleComponent],
                    imports: [
                        CommonModule,
                        CometchatMessageActionsModule,
                        CometchatThreadedMessageReplyCountModule,
                        CometchatAvatarModule,
                        CometchatReadRecieptModule,
                        CometchatMessageReactionsModule,
                    ],
                    exports: [CometchatReceiverTextMessageBubbleComponent],
                },] }
    ];
    return CometchatReceiverTextMessageBubbleModule;
}());
export { CometchatReceiverTextMessageBubbleModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sMkZBQTJGLENBQUM7QUFDeEosT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFFL0g7SUFBQTtJQVl1RCxDQUFDOztnQkFadkQsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDJDQUEyQyxDQUFDO29CQUMzRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWiw2QkFBNkI7d0JBQzdCLHdDQUF3Qzt3QkFDeEMscUJBQXFCO3dCQUNyQiwwQkFBMEI7d0JBQzFCLCtCQUErQjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsMkNBQTJDLENBQUM7aUJBQ3ZEOztJQUNzRCwrQ0FBQztDQUFBLEFBWnhELElBWXdEO1NBQTNDLHdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Y2hhdFJlY2VpdmVyVGV4dE1lc3NhZ2VCdWJibGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Y2hhdE1lc3NhZ2VBY3Rpb25zTW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRBdmF0YXJNb2R1bGUgfSBmcm9tIFwiLi4vLi4vU2hhcmVkL2NvbWV0Y2hhdC1hdmF0YXIvY29tZXRjaGF0LWF2YXRhci5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFJlYWRSZWNpZXB0TW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQvY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdE1lc3NhZ2VSZWFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vRXh0ZW5zaW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb21ldGNoYXRSZWNlaXZlclRleHRNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb21ldGNoYXRNZXNzYWdlQWN0aW9uc01vZHVsZSxcbiAgICBDb21ldGNoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50TW9kdWxlLFxuICAgIENvbWV0Y2hhdEF2YXRhck1vZHVsZSxcbiAgICBDb21ldGNoYXRSZWFkUmVjaWVwdE1vZHVsZSxcbiAgICBDb21ldGNoYXRNZXNzYWdlUmVhY3Rpb25zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRjaGF0UmVjZWl2ZXJUZXh0TWVzc2FnZUJ1YmJsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyVGV4dE1lc3NhZ2VCdWJibGVNb2R1bGUge31cbiJdfQ==