/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverVideoMessageBubbleComponent } from "./cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component";
import { CometChatMessageActions } from "../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatThreadedMessageReplyCount } from "../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatReadReceipt } from "../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatMessageReactions } from "../Extensions/CometChat-message-reactions/cometchat-message-reactions.module";
export class CometChatReceiverVideoMessageBubble {
}
CometChatReceiverVideoMessageBubble.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatReceiverVideoMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometChatAvatar,
                    CometChatMessageActions,
                    CometChatThreadedMessageReplyCount,
                    CometChatReadReceipt,
                    CometChatMessageReactions,
                ],
                exports: [CometChatReceiverVideoMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sNkZBQTZGLENBQUM7QUFDM0osT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDeEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlGQUF5RixDQUFDO0FBQzdJLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhFQUE4RSxDQUFDO0FBY3pILE1BQU0sT0FBTyxtQ0FBbUM7OztZQVovQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsNENBQTRDLENBQUM7Z0JBQzVELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsdUJBQXVCO29CQUN2QixrQ0FBa0M7b0JBQ2xDLG9CQUFvQjtvQkFDcEIseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQzthQUN4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdFJlY2VpdmVyVmlkZW9NZXNzYWdlQnViYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zIH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdEF2YXRhciB9IGZyb20gXCIuLi8uLi9TaGFyZWQvQ29tZXRDaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudCB9IGZyb20gXCIuLi9Db21ldENoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdFJlYWRSZWNlaXB0IH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1yZWFkLXJlY2VpcHQvY29tZXRjaGF0LXJlYWQtcmVjZWlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VSZWFjdGlvbnMgfSBmcm9tIFwiLi4vRXh0ZW5zaW9ucy9Db21ldENoYXQtbWVzc2FnZS1yZWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb21ldENoYXRSZWNlaXZlclZpZGVvTWVzc2FnZUJ1YmJsZUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29tZXRDaGF0QXZhdGFyLFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zLFxuICAgIENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQsXG4gICAgQ29tZXRDaGF0UmVhZFJlY2VpcHQsXG4gICAgQ29tZXRDaGF0TWVzc2FnZVJlYWN0aW9ucyxcbiAgXSxcbiAgZXhwb3J0czogW0NvbWV0Q2hhdFJlY2VpdmVyVmlkZW9NZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0UmVjZWl2ZXJWaWRlb01lc3NhZ2VCdWJibGUgeyB9XG4iXX0=