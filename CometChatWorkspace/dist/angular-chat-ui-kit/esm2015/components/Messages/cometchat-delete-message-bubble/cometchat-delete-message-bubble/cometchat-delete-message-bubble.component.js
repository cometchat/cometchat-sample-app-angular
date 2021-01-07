/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-delete-message-bubble/cometchat-delete-message-bubble/cometchat-delete-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
export class CometchatDeleteMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.loggedInUser = null;
        this.loggedInUserDeletedThisMessage = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.MessageDetails.deletedBy === this.loggedInUser.uid) {
            this.loggedInUserDeletedThisMessage = true;
        }
    }
    /**
     * @return {?}
     */
    getTime() {
        /** @type {?} */
        let msgSentAt = this.MessageDetails.sentAt;
        msgSentAt = msgSentAt * 1000;
        return msgSentAt;
    }
}
CometchatDeleteMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-delete-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"loggedInUserDeletedThisMessage\">\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\">\n      <p class=\"messageTxtStyle\">You deleted this message.</p>\n    </div>\n    <div class=\"messageInfoWrapperStyle\">\n      <span class=\"messageTimeStampStyle\">\n        {{ getTime() | date: \"shortTime\" }}\n      </span>\n    </div>\n  </div>\n</div>\n\n<!-- Received a Deleted Message Buubble -->\n<div\n  class=\"messageContainerStyle deletedMessageReceivedStyle\"\n  *ngIf=\"!loggedInUserDeletedThisMessage\"\n>\n  <div class=\"deletedMessageWrapperStyle\">\n    <div\n      class=\"messageThumbnailStyle\"\n      *ngIf=\"MessageDetails?.receiverType == 'group'\"\n    >\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ MessageDetails?.sender?.name }}\n        </span>\n      </div>\n      <div class=\"messageTxtWrapperStyle deletedMessageReceivedStyle\">\n        <p class=\"messageTxtStyle\">This message was deleted.</p>\n      </div>\n      <div class=\"messageInfoWrapperStyle deletedMessageReceivedStyle\">\n        <span class=\"messageTimeStampStyle\">\n          {{ getTime() | date: \"shortTime\" }}\n        </span>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Received a Deleted Message Buubble -->\n",
                styles: [".messageContainerStyle{margin-bottom:16px;max-width:100%;clear:both;flex-shrink:0;align-self:flex-end}.messageWrapperStyle{flex:1 1;position:relative;width:100%;display:flex;flex-direction:column}.messageWrapperDeletedMessageStyle{flex:1 1;position:relative;width:100%}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;padding:8px 12px;align-self:flex-start;width:auto;background-color:#f6f6f6;font-style:italic;align-self:flex-end}.messageTxtStyle{font-size:14px!important;margin:0;line-height:20px!important;color:rgba(20,20,20,.6)}.messageInfoWrapperStyle{align-self:flex-end}.messageTimeStampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.messageThumbnailStyle{width:36px;height:36px;margin:12px 5px;float:left}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column;position:relative}.nameWrapperStyle{align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.deletedMessageReceivedStyle{align-self:flex-start}.deletedMessageWrapperStyle{flex:1 1;position:relative;width:100%}"]
            }] }
];
/** @nocollapse */
CometchatDeleteMessageBubbleComponent.ctorParameters = () => [];
CometchatDeleteMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    loggedInUser: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometchatDeleteMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatDeleteMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatDeleteMessageBubbleComponent.prototype.loggedInUserDeletedThisMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtZGVsZXRlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1kZWxldGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQU96RCxNQUFNLE9BQU8scUNBQXFDO0lBT2hEO1FBTlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFdEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFN0IsbUNBQThCLEdBQVksS0FBSyxDQUFDO0lBRWpDLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDM0QsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7SUFFRCxPQUFPOztZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07UUFDMUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFN0IsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQywyaERBQStEOzthQUVoRTs7Ozs7NkJBRUUsS0FBSzsyQkFFTCxLQUFLOzs7O0lBRk4sK0RBQStCOztJQUUvQiw2REFBNkI7O0lBRTdCLCtFQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtZGVsZXRlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWRlbGV0ZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXREZWxldGVNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuXG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG5cbiAgbG9nZ2VkSW5Vc2VyRGVsZXRlZFRoaXNNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmRlbGV0ZWRCeSA9PT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlckRlbGV0ZWRUaGlzTWVzc2FnZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGltZSgpIHtcbiAgICBsZXQgbXNnU2VudEF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW50QXQ7XG4gICAgbXNnU2VudEF0ID0gbXNnU2VudEF0ICogMTAwMDtcblxuICAgIHJldHVybiBtc2dTZW50QXQ7XG4gIH1cbn1cbiJdfQ==