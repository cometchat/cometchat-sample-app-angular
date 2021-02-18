/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatSenderPollMessageBubbleComponent } from "./cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component";
import { CometChatMessageActions } from "../../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatReadReceipt } from "../../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatThreadedMessageReplyCount } from "../../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatMessageReactions } from "../CometChat-message-reactions/cometchat-message-reactions.module";
export class CometChatSenderPollMessageBubble {
}
CometChatSenderPollMessageBubble.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatSenderPollMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometChatMessageActions,
                    CometChatReadReceipt,
                    CometChatThreadedMessageReplyCount,
                    CometChatMessageReactions,
                ],
                exports: [CometChatSenderPollMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvQ29tZXRDaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNsSixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMzRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw0RkFBNEYsQ0FBQztBQUNoSixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQWE5RyxNQUFNLE9BQU8sZ0NBQWdDOzs7WUFYNUMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2dCQUN6RCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWix1QkFBdUI7b0JBQ3ZCLG9CQUFvQjtvQkFDcEIsa0NBQWtDO29CQUNsQyx5QkFBeUI7aUJBQzFCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2FBQ3JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0U2VuZGVyUG9sbE1lc3NhZ2VCdWJibGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWVzc2FnZUFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vQ29tZXRDaGF0LW1lc3NhZ2UtYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0UmVhZFJlY2VpcHQgfSBmcm9tIFwiLi4vLi4vQ29tZXRDaGF0LXJlYWQtcmVjZWlwdC9jb21ldGNoYXQtcmVhZC1yZWNlaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudCB9IGZyb20gXCIuLi8uLi9Db21ldENoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VSZWFjdGlvbnMgfSBmcm9tIFwiLi4vQ29tZXRDaGF0LW1lc3NhZ2UtcmVhY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29tZXRDaGF0U2VuZGVyUG9sbE1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zLFxuICAgIENvbWV0Q2hhdFJlYWRSZWNlaXB0LFxuICAgIENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQsXG4gICAgQ29tZXRDaGF0TWVzc2FnZVJlYWN0aW9ucyxcbiAgXSxcbiAgZXhwb3J0czogW0NvbWV0Q2hhdFNlbmRlclBvbGxNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0U2VuZGVyUG9sbE1lc3NhZ2VCdWJibGUgeyB9XG4iXX0=