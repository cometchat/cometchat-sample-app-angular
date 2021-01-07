/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverVideoMessageBubbleComponent } from "./cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";
export class CometchatReceiverVideoMessageBubbleModule {
}
CometchatReceiverVideoMessageBubbleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CometchatReceiverVideoMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometchatAvatarModule,
                    CometchatMessageActionsModule,
                    CometchatThreadedMessageReplyCountModule,
                    CometchatReadRecieptModule,
                    CometchatMessageReactionsModule,
                ],
                exports: [CometchatReceiverVideoMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sNkZBQTZGLENBQUM7QUFDM0osT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFjL0gsTUFBTSxPQUFPLHlDQUF5Qzs7O1lBWnJELFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztnQkFDNUQsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1oscUJBQXFCO29CQUNyQiw2QkFBNkI7b0JBQzdCLHdDQUF3QztvQkFDeEMsMEJBQTBCO29CQUMxQiwrQkFBK0I7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLDRDQUE0QyxDQUFDO2FBQ3hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVjZWl2ZXJWaWRlb01lc3NhZ2VCdWJibGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0QXZhdGFyTW9kdWxlIH0gZnJvbSBcIi4uLy4uL1NoYXJlZC9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50TW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50L2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVhZFJlY2llcHRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXJlYWQtcmVjaWVwdC9jb21ldGNoYXQtcmVhZC1yZWNpZXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZVJlYWN0aW9uc01vZHVsZSB9IGZyb20gXCIuLi9FeHRlbnNpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Y2hhdFJlY2VpdmVyVmlkZW9NZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb21ldGNoYXRBdmF0YXJNb2R1bGUsXG4gICAgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUsXG4gICAgQ29tZXRjaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudE1vZHVsZSxcbiAgICBDb21ldGNoYXRSZWFkUmVjaWVwdE1vZHVsZSxcbiAgICBDb21ldGNoYXRNZXNzYWdlUmVhY3Rpb25zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRjaGF0UmVjZWl2ZXJWaWRlb01lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlclZpZGVvTWVzc2FnZUJ1YmJsZU1vZHVsZSB7fVxuIl19