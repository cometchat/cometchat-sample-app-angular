/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioMessageBubbleComponent } from "./cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";
export class CometchatReceiverAudioMessageBubbleModule {
}
CometchatReceiverAudioMessageBubbleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CometchatReceiverAudioMessageBubbleComponent],
                imports: [
                    CommonModule,
                    CometchatMessageActionsModule,
                    CometchatAvatarModule,
                    CometchatReadRecieptModule,
                    CometchatThreadedMessageReplyCountModule,
                    CometchatMessageReactionsModule,
                ],
                exports: [CometchatReceiverAudioMessageBubbleComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1hdWRpby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItYXVkaW8tbWVzc2FnZS1idWJibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sNkZBQTZGLENBQUM7QUFDM0osT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDOUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDckcsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0seUZBQXlGLENBQUM7QUFDbkosT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOEVBQThFLENBQUM7QUFjL0gsTUFBTSxPQUFPLHlDQUF5Qzs7O1lBWnJELFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztnQkFDNUQsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osNkJBQTZCO29CQUM3QixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIsd0NBQXdDO29CQUN4QywrQkFBK0I7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLDRDQUE0QyxDQUFDO2FBQ3hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0UmVjZWl2ZXJBdWRpb01lc3NhZ2VCdWJibGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItYXVkaW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zLm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0QXZhdGFyTW9kdWxlIH0gZnJvbSBcIi4uLy4uL1NoYXJlZC9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRSZWFkUmVjaWVwdE1vZHVsZSB9IGZyb20gXCIuLi9jb21ldGNoYXQtcmVhZC1yZWNpZXB0L2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50TW9kdWxlIH0gZnJvbSBcIi4uL2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50L2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZVJlYWN0aW9uc01vZHVsZSB9IGZyb20gXCIuLi9FeHRlbnNpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Y2hhdFJlY2VpdmVyQXVkaW9NZXNzYWdlQnViYmxlQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb21ldGNoYXRNZXNzYWdlQWN0aW9uc01vZHVsZSxcbiAgICBDb21ldGNoYXRBdmF0YXJNb2R1bGUsXG4gICAgQ29tZXRjaGF0UmVhZFJlY2llcHRNb2R1bGUsXG4gICAgQ29tZXRjaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudE1vZHVsZSxcbiAgICBDb21ldGNoYXRNZXNzYWdlUmVhY3Rpb25zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRjaGF0UmVjZWl2ZXJBdWRpb01lc3NhZ2VCdWJibGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlckF1ZGlvTWVzc2FnZUJ1YmJsZU1vZHVsZSB7fVxuIl19