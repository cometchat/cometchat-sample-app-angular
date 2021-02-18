/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sender-video-message-bubble/cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
export class CometChatSenderVideoMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = enums.SENDER;
        this.message = Object.assign({}, this.messageDetails, {
            messageFrom: this.messageFrom,
        });
        this.checkReaction = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.getUrl();
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    getUrl() {
        try {
            this.videoUrl = this.messageDetails.data.url;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            this.actionGenerated.emit(action);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatSenderVideoMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-video-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageVideoWrapperStyle\">\n      <video controls>\n        <source [src]=\"videoUrl\" />\n      </video>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageVideoWrapperStyle{display:inline-block;align-self:flex-end}.messageVideoWrapperStyle>video{max-width:250px;border-radius:12px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
            }] }
];
/** @nocollapse */
CometChatSenderVideoMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderVideoMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.videoUrl;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometChatSenderVideoMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtc2VuZGVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsTUFBTSxHQUNQLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQU9qRCxNQUFNLE9BQU8sMENBQTBDO0lBZ0JyRDtRQWZTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBR3JCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEUsZ0JBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRTNCLFlBQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQy9DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7UUFDSCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUVKLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixLQUFLLENBQUMsU0FBUyxDQUNoQixDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxNQUFNO1FBQ0osSUFBSTtZQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQzlDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQUtELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF2REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELDRpQ0FBcUU7O2FBRXRFOzs7Ozs2QkFFRSxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFMUCxvRUFBK0I7O0lBQy9CLGlFQUE0Qjs7SUFDNUIsb0VBQStCOztJQUMvQixrRUFBc0I7O0lBRXRCLHFFQUFrRTs7SUFFbEUsOERBQWlCOztJQUNqQixpRUFBMkI7O0lBRTNCLDZEQUVHOztJQUNILG1FQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEsXG4gIGxvZ2dlcixcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRTZW5kZXJWaWRlb01lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vU2V0cyBWaWRlbyBVcmwgdG8gYmUgZGlzcGxheWVkXG4gIHZpZGVvVXJsOiBzdHJpbmc7XG4gIG1lc3NhZ2VGcm9tID0gZW51bXMuU0VOREVSO1xuXG4gIG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gIH0pO1xuICBjaGVja1JlYWN0aW9uID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdldFVybCgpO1xuICAgICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMsXG4gICAgICAgIGVudW1zLlJFQUNUSU9OU1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIG9mIHZpZGVvIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgZ2V0VXJsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnZpZGVvVXJsID0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=