/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverFileMessageBubbleComponent } from "./cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component";
import { CometChatReadReceipt } from "../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatMessageActions } from "../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatThreadedMessageReplyCount } from "../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatMessageReactions } from "../Extensions/CometChat-message-reactions/cometchat-message-reactions.module";
export class CometChatReceiverFileMessageBubble {
}
CometChatReceiverFileMessageBubble.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatReceiverFileMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometChatMessageActions,
                    CometChatAvatar,
                    CometChatReadReceipt,
                    CometChatThreadedMessageReplyCount,
                    CometChatMessageReactions,
                ],
                exports: [CometChatReceiverFileMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sMkZBQTJGLENBQUM7QUFDeEosT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDeEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlGQUF5RixDQUFDO0FBQzdJLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhFQUE4RSxDQUFDO0FBY3pILE1BQU0sT0FBTyxrQ0FBa0M7OztZQVo5QyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsMkNBQTJDLENBQUM7Z0JBQzNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLGtDQUFrQztvQkFDbEMseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQzthQUN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdFJlY2VpdmVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdFJlYWRSZWNlaXB0IH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1yZWFkLXJlY2VpcHQvY29tZXRjaGF0LXJlYWQtcmVjZWlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zIH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdEF2YXRhciB9IGZyb20gXCIuLi8uLi9TaGFyZWQvQ29tZXRDaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudCB9IGZyb20gXCIuLi9Db21ldENoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VSZWFjdGlvbnMgfSBmcm9tIFwiLi4vRXh0ZW5zaW9ucy9Db21ldENoYXQtbWVzc2FnZS1yZWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb21ldENoYXRSZWNlaXZlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb21ldENoYXRNZXNzYWdlQWN0aW9ucyxcbiAgICBDb21ldENoYXRBdmF0YXIsXG4gICAgQ29tZXRDaGF0UmVhZFJlY2VpcHQsXG4gICAgQ29tZXRDaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudCxcbiAgICBDb21ldENoYXRNZXNzYWdlUmVhY3Rpb25zLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRDaGF0UmVjZWl2ZXJGaWxlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFJlY2VpdmVyRmlsZU1lc3NhZ2VCdWJibGUgeyB9XG4iXX0=