/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-messages/cometchat-messages.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessagesComponent } from "./cometchat-messages/cometchat-messages.component";
import { CometChatMessageHeader } from "../CometChat-message-header/cometchat-message-header.module";
import { CometChatMessageList } from "../CometChat-message-list/cometchat-message-list.module";
import { CometChatMessageComposer } from "../CometChat-message-composer/cometchat-message-composer.module";
import { CometChatLiveReactions } from "../CometChat-live-reactions/cometchat-live-reactions.module";
export class CometChatMessages {
}
CometChatMessages.decorators = [
    { type: NgModule, args: [{
                declarations: [CometChatMessagesComponent],
                imports: [
                    CommonModule,
                    CometChatMessageHeader,
                    CometChatMessageComposer,
                    CometChatMessageList,
                    CometChatLiveReactions,
                ],
                exports: [CometChatMessagesComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1tZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDckcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDM0csT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFhckcsTUFBTSxPQUFPLGlCQUFpQjs7O1lBWDdCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztnQkFDMUMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0Qix3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VzQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LW1lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VIZWFkZXIgfSBmcm9tIFwiLi4vQ29tZXRDaGF0LW1lc3NhZ2UtaGVhZGVyL2NvbWV0Y2hhdC1tZXNzYWdlLWhlYWRlci5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VMaXN0IH0gZnJvbSBcIi4uL0NvbWV0Q2hhdC1tZXNzYWdlLWxpc3QvY29tZXRjaGF0LW1lc3NhZ2UtbGlzdC5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlciB9IGZyb20gXCIuLi9Db21ldENoYXQtbWVzc2FnZS1jb21wb3Nlci9jb21ldGNoYXQtbWVzc2FnZS1jb21wb3Nlci5tb2R1bGVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdExpdmVSZWFjdGlvbnMgfSBmcm9tIFwiLi4vQ29tZXRDaGF0LWxpdmUtcmVhY3Rpb25zL2NvbWV0Y2hhdC1saXZlLXJlYWN0aW9ucy5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29tZXRDaGF0TWVzc2FnZXNDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VIZWFkZXIsXG4gICAgQ29tZXRDaGF0TWVzc2FnZUNvbXBvc2VyLFxuICAgIENvbWV0Q2hhdE1lc3NhZ2VMaXN0LFxuICAgIENvbWV0Q2hhdExpdmVSZWFjdGlvbnMsXG4gIF0sXG4gIGV4cG9ydHM6IFtDb21ldENoYXRNZXNzYWdlc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdE1lc3NhZ2VzIHt9XG4iXX0=