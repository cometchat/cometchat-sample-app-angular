/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverImageMessageBubbleComponent } from "./cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";
var CometchatReceiverImageMessageBubbleModule = /** @class */ (function () {
    function CometchatReceiverImageMessageBubbleModule() {
    }
    CometchatReceiverImageMessageBubbleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CometchatReceiverImageMessageBubbleComponent],
                    imports: [
                        CommonModule,
                        CometchatMessageActionsModule,
                        CometchatAvatarModule,
                        CometchatThreadedMessageReplyCountModule,
                        CometchatReadRecieptModule,
                        CometchatMessageReactionsModule,
                    ],
                    exports: [CometchatReceiverImageMessageBubbleComponent],
                },] }
    ];
    return CometchatReceiverImageMessageBubbleModule;
}());
export { CometchatReceiverImageMessageBubbleModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sNkZBQTZGLENBQUM7QUFDM0osT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFFL0g7SUFBQTtJQVl3RCxDQUFDOztnQkFaeEQsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDRDQUE0QyxDQUFDO29CQUM1RCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWiw2QkFBNkI7d0JBQzdCLHFCQUFxQjt3QkFDckIsd0NBQXdDO3dCQUN4QywwQkFBMEI7d0JBQzFCLCtCQUErQjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsNENBQTRDLENBQUM7aUJBQ3hEOztJQUN1RCxnREFBQztDQUFBLEFBWnpELElBWXlEO1NBQTVDLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Y2hhdFJlY2VpdmVySW1hZ2VNZXNzYWdlQnViYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Y2hhdE1lc3NhZ2VBY3Rpb25zTW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRBdmF0YXJNb2R1bGUgfSBmcm9tIFwiLi4vLi4vU2hhcmVkL2NvbWV0Y2hhdC1hdmF0YXIvY29tZXRjaGF0LWF2YXRhci5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdFJlYWRSZWNpZXB0TW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQvY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdE1lc3NhZ2VSZWFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vRXh0ZW5zaW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb21ldGNoYXRSZWNlaXZlckltYWdlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUsXG4gICAgQ29tZXRjaGF0QXZhdGFyTW9kdWxlLFxuICAgIENvbWV0Y2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnRNb2R1bGUsXG4gICAgQ29tZXRjaGF0UmVhZFJlY2llcHRNb2R1bGUsXG4gICAgQ29tZXRjaGF0TWVzc2FnZVJlYWN0aW9uc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW0NvbWV0Y2hhdFJlY2VpdmVySW1hZ2VNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJJbWFnZU1lc3NhZ2VCdWJibGVNb2R1bGUge31cbiJdfQ==