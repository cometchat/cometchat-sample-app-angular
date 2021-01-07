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
export class CometchatReceiverTextMessageBubbleModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sMkZBQTJGLENBQUM7QUFDeEosT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFjL0gsTUFBTSxPQUFPLHdDQUF3Qzs7O1lBWnBELFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztnQkFDM0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osNkJBQTZCO29CQUM3Qix3Q0FBd0M7b0JBQ3hDLHFCQUFxQjtvQkFDckIsMEJBQTBCO29CQUMxQiwrQkFBK0I7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO2FBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVjZWl2ZXJUZXh0TWVzc2FnZUJ1YmJsZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci10ZXh0LW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1yZWNlaXZlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudE1vZHVsZSB9IGZyb20gXCIuLi9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Y2hhdEF2YXRhck1vZHVsZSB9IGZyb20gXCIuLi8uLi9TaGFyZWQvY29tZXRjaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVhZFJlY2llcHRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXJlYWQtcmVjaWVwdC9jb21ldGNoYXQtcmVhZC1yZWNpZXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZVJlYWN0aW9uc01vZHVsZSB9IGZyb20gXCIuLi9FeHRlbnNpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Y2hhdFJlY2VpdmVyVGV4dE1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Y2hhdE1lc3NhZ2VBY3Rpb25zTW9kdWxlLFxuICAgIENvbWV0Y2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnRNb2R1bGUsXG4gICAgQ29tZXRjaGF0QXZhdGFyTW9kdWxlLFxuICAgIENvbWV0Y2hhdFJlYWRSZWNpZXB0TW9kdWxlLFxuICAgIENvbWV0Y2hhdE1lc3NhZ2VSZWFjdGlvbnNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtDb21ldGNoYXRSZWNlaXZlclRleHRNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJUZXh0TWVzc2FnZUJ1YmJsZU1vZHVsZSB7fVxuIl19