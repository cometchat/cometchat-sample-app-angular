/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-delete-message-bubble/cometchat-delete-message-bubble/cometchat-delete-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
import { getSentAtTime } from "../../../../utils/common";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
export class CometChatDeleteMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.loggedInUser = null;
        this.loggedInUserDeletedThisMessage = false;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
        this.THIS_MESSAGE_DELETED = COMETCHAT_CONSTANTS.THIS_MESSAGE_DELETED;
        this.YOU_DELETED_THIS_MESSAGE = COMETCHAT_CONSTANTS.YOU_DELETED_THIS_MESSAGE;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            if (this.messageDetails.deletedBy === this.loggedInUser.uid) {
                this.loggedInUserDeletedThisMessage = true;
            }
            this.time = getSentAtTime(this.messageDetails);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatDeleteMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-delete-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"loggedInUserDeletedThisMessage\">\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\">\n      <p class=\"messageTxtStyle\">{{ YOU_DELETED_THIS_MESSAGE }}</p>\n    </div>\n    <div class=\"messageInfoWrapperStyle\">\n      <span class=\"messageTimeStampStyle\">\n        {{ time | date: \"shortTime\" }}\n      </span>\n    </div>\n  </div>\n</div>\n\n<!-- Received a Deleted Message Buubble -->\n<div\n  class=\"messageContainerStyle deletedMessageReceivedStyle\"\n  *ngIf=\"!loggedInUserDeletedThisMessage\"\n>\n  <div class=\"deletedMessageWrapperStyle\">\n    <div\n      class=\"messageThumbnailStyle\"\n      *ngIf=\"messageDetails?.receiverType == GROUP\"\n    >\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <div\n        class=\"nameWrapperStyle\"\n        *ngIf=\"messageDetails?.receiverType == GROUP\"\n      >\n        <span class=\"nameStyle\">\n          {{ messageDetails?.sender?.name }}\n        </span>\n      </div>\n      <div class=\"messageTxtWrapperStyle deletedMessageReceivedStyle\">\n        <p class=\"messageTxtStyle\">{{ THIS_MESSAGE_DELETED }}</p>\n      </div>\n      <div class=\"messageInfoWrapperStyle deletedMessageReceivedStyle\">\n        <span class=\"messageTimeStampStyle\">\n          {{ time | date: \"shortTime\" }}\n        </span>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Received a Deleted Message Buubble -->\n",
                styles: [".messageContainerStyle{margin-bottom:16px;max-width:100%;clear:both;flex-shrink:0;align-self:flex-end}.messageWrapperStyle{flex:1 1;position:relative;width:100%;display:flex;flex-direction:column}.messageWrapperDeletedMessageStyle{flex:1 1;position:relative;width:100%}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;padding:8px 12px;align-self:flex-start;width:auto;background-color:#f6f6f6;font-style:italic;align-self:flex-end}.messageTxtStyle{font-size:14px!important;margin:0;line-height:20px!important;color:rgba(20,20,20,.6)}.messageInfoWrapperStyle{align-self:flex-end}.messageTimeStampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.messageThumbnailStyle{width:36px;height:36px;margin:12px 5px;float:left}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column;position:relative}.nameWrapperStyle{align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.deletedMessageReceivedStyle{align-self:flex-start}.deletedMessageWrapperStyle{flex:1 1;position:relative;width:100%}"]
            }] }
];
/** @nocollapse */
CometChatDeleteMessageBubbleComponent.ctorParameters = () => [];
CometChatDeleteMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    loggedInUser: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.loggedInUserDeletedThisMessage;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.time;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.GROUP;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.THIS_MESSAGE_DELETED;
    /** @type {?} */
    CometChatDeleteMessageBubbleComponent.prototype.YOU_DELETED_THIS_MESSAGE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtZGVsZXRlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1kZWxldGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQU16RSxNQUFNLE9BQU8scUNBQXFDO0lBY2hEO1FBYlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFdEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFN0IsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBSWhELFVBQUssR0FBVyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM5Qyx5QkFBb0IsR0FBVyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUN4RSw2QkFBd0IsR0FDdEIsbUJBQW1CLENBQUMsd0JBQXdCLENBQUM7SUFFaEMsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7Z0JBQzNELElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDaEQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQywrbERBQStEOzthQUVoRTs7Ozs7NkJBRUUsS0FBSzsyQkFFTCxLQUFLOzs7O0lBRk4sK0RBQStCOztJQUUvQiw2REFBNkI7O0lBRTdCLCtFQUFnRDs7SUFFaEQscURBQUs7O0lBRUwsc0RBQThDOztJQUM5QyxxRUFBd0U7O0lBQ3hFLHlFQUMrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBnZXRTZW50QXRUaW1lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1kZWxldGUtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZGVsZXRlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtZGVsZXRlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdERlbGV0ZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG5cbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcblxuICBsb2dnZWRJblVzZXJEZWxldGVkVGhpc01lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICB0aW1lO1xuXG4gIEdST1VQOiBTdHJpbmcgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgVEhJU19NRVNTQUdFX0RFTEVURUQ6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuVEhJU19NRVNTQUdFX0RFTEVURUQ7XG4gIFlPVV9ERUxFVEVEX1RISVNfTUVTU0FHRTogU3RyaW5nID1cbiAgICBDT01FVENIQVRfQ09OU1RBTlRTLllPVV9ERUxFVEVEX1RISVNfTUVTU0FHRTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VEZXRhaWxzLmRlbGV0ZWRCeSA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyRGVsZXRlZFRoaXNNZXNzYWdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMudGltZSA9IGdldFNlbnRBdFRpbWUodGhpcy5tZXNzYWdlRGV0YWlscyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=