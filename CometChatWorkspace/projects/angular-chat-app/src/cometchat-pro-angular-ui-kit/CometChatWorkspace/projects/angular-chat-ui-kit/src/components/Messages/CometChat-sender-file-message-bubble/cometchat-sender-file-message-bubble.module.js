/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sender-file-message-bubble/cometchat-sender-file-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatSenderFileMessageBubbleComponent } from "./cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.component";
import { CometChatReadReceipt } from "../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatMessageActions } from "../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatThreadedMessageReplyCount } from "../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatMessageReactions } from "../Extensions/CometChat-message-reactions/cometchat-message-reactions.module";
export class CometChatSenderFileMessageBubble {
}
CometChatSenderFileMessageBubble.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatSenderFileMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometChatReadReceipt,
                    CometChatMessageActions,
                    CometChatThreadedMessageReplyCount,
                    CometChatMessageReactions,
                ],
                exports: [CometChatSenderFileMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sdUZBQXVGLENBQUM7QUFDbEosT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDeEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDN0ksT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFhekgsTUFBTSxPQUFPLGdDQUFnQzs7O1lBWDVDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztnQkFDekQsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQix1QkFBdUI7b0JBQ3ZCLGtDQUFrQztvQkFDbEMseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQzthQUNyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdFNlbmRlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdFJlYWRSZWNlaXB0IH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1yZWFkLXJlY2VpcHQvY29tZXRjaGF0LXJlYWQtcmVjZWlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zIH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQgfSBmcm9tIFwiLi4vQ29tZXRDaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNZXNzYWdlUmVhY3Rpb25zIH0gZnJvbSBcIi4uL0V4dGVuc2lvbnMvQ29tZXRDaGF0LW1lc3NhZ2UtcmVhY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29tZXRDaGF0U2VuZGVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Q2hhdFJlYWRSZWNlaXB0LFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zLFxuICAgIENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQsXG4gICAgQ29tZXRDaGF0TWVzc2FnZVJlYWN0aW9ucyxcbiAgXSxcbiAgZXhwb3J0czogW0NvbWV0Q2hhdFNlbmRlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0U2VuZGVyRmlsZU1lc3NhZ2VCdWJibGUgeyB9XG4iXX0=