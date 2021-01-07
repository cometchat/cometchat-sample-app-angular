/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverFileMessageBubbleComponent } from "./cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";
export class CometchatReceiverFileMessageBubbleModule {
}
CometchatReceiverFileMessageBubbleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CometchatReceiverFileMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometchatMessageActionsModule,
                    CometchatAvatarModule,
                    CometchatReadRecieptModule,
                    CometchatThreadedMessageReplyCountModule,
                    CometchatMessageReactionsModule,
                ],
                exports: [CometchatReceiverFileMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sMkZBQTJGLENBQUM7QUFDeEosT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFjL0gsTUFBTSxPQUFPLHdDQUF3Qzs7O1lBWnBELFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztnQkFDM0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osNkJBQTZCO29CQUM3QixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIsd0NBQXdDO29CQUN4QywrQkFBK0I7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO2FBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVjZWl2ZXJGaWxlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVhZFJlY2llcHRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXJlYWQtcmVjaWVwdC9jb21ldGNoYXQtcmVhZC1yZWNpZXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0QXZhdGFyTW9kdWxlIH0gZnJvbSBcIi4uLy4uL1NoYXJlZC9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50TW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50L2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZVJlYWN0aW9uc01vZHVsZSB9IGZyb20gXCIuLi9FeHRlbnNpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Y2hhdFJlY2VpdmVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Y2hhdE1lc3NhZ2VBY3Rpb25zTW9kdWxlLFxuICAgIENvbWV0Y2hhdEF2YXRhck1vZHVsZSxcbiAgICBDb21ldGNoYXRSZWFkUmVjaWVwdE1vZHVsZSxcbiAgICBDb21ldGNoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50TW9kdWxlLFxuICAgIENvbWV0Y2hhdE1lc3NhZ2VSZWFjdGlvbnNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtDb21ldGNoYXRSZWNlaXZlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJGaWxlTWVzc2FnZUJ1YmJsZU1vZHVsZSB7fVxuIl19