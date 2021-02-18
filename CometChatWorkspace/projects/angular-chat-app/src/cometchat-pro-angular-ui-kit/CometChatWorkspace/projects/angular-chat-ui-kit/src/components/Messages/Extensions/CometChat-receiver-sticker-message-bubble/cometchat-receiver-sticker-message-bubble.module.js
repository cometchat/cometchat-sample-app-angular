/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverStickerMessageBubbleComponent } from "./cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.component";
import { CometChatMessageActions } from "../../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatThreadedMessageReplyCount } from "../../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatAvatar } from "../../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatReadReceipt } from "../../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatMessageReactions } from "../CometChat-message-reactions/cometchat-message-reactions.module";
export class CometChatReceiverStickerMessageBubble {
}
CometChatReceiverStickerMessageBubble.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatReceiverStickerMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometChatMessageActions,
                    CometChatThreadedMessageReplyCount,
                    CometChatAvatar,
                    CometChatThreadedMessageReplyCount,
                    CometChatReadReceipt,
                    CometChatMessageReactions,
                ],
                exports: [CometChatReceiverStickerMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9Db21ldENoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOENBQThDLEVBQUUsTUFBTSxpR0FBaUcsQ0FBQztBQUNqSyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMzRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw0RkFBNEYsQ0FBQztBQUNoSixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDM0YsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDbEcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFlOUcsTUFBTSxPQUFPLHFDQUFxQzs7O1lBYmpELFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyw4Q0FBOEMsQ0FBQztnQkFDOUQsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osdUJBQXVCO29CQUN2QixrQ0FBa0M7b0JBQ2xDLGVBQWU7b0JBQ2Ysa0NBQWtDO29CQUNsQyxvQkFBb0I7b0JBQ3BCLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsOENBQThDLENBQUM7YUFDMUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBDb21ldENoYXRSZWNlaXZlclN0aWNrZXJNZXNzYWdlQnViYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb21ldENoYXRNZXNzYWdlQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9Db21ldENoYXQtbWVzc2FnZS1hY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50IH0gZnJvbSBcIi4uLy4uL0NvbWV0Q2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50L2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0QXZhdGFyIH0gZnJvbSBcIi4uLy4uLy4uL1NoYXJlZC9Db21ldENoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRSZWFkUmVjZWlwdCB9IGZyb20gXCIuLi8uLi9Db21ldENoYXQtcmVhZC1yZWNlaXB0L2NvbWV0Y2hhdC1yZWFkLXJlY2VpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNZXNzYWdlUmVhY3Rpb25zIH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Q2hhdFJlY2VpdmVyU3RpY2tlck1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VBY3Rpb25zLFxuICAgIENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQsXG4gICAgQ29tZXRDaGF0QXZhdGFyLFxuICAgIENvbWV0Q2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnQsXG4gICAgQ29tZXRDaGF0UmVhZFJlY2VpcHQsXG4gICAgQ29tZXRDaGF0TWVzc2FnZVJlYWN0aW9ucyxcbiAgXSxcbiAgZXhwb3J0czogW0NvbWV0Q2hhdFJlY2VpdmVyU3RpY2tlck1lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRSZWNlaXZlclN0aWNrZXJNZXNzYWdlQnViYmxlIHsgfVxuIl19