/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatSenderVideoMessageBubbleComponent = /** @class */ (function () {
    function CometchatSenderVideoMessageBubbleComponent() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = "sender";
        this.message = Object.assign({}, this.MessageDetails, {
            messageFrom: this.messageFrom,
        });
        this.checkReaction = false;
    }
    /**
     * @return {?}
     */
    CometchatSenderVideoMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getUrl();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
    };
    /**
     * Gets the url of video to be displayed
     */
    /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    CometchatSenderVideoMessageBubbleComponent.prototype.getUrl = /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    function () {
        this.videoUrl = this.MessageDetails.data.url;
    };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatSenderVideoMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatSenderVideoMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sender-video-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageVideoWrapperStyle\">\n      <video controls>\n        <source [src]=\"videoUrl\" />\n      </video>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageVideoWrapperStyle{display:inline-block;align-self:flex-end}.messageVideoWrapperStyle>video{max-width:250px;border-radius:12px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSenderVideoMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatSenderVideoMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatSenderVideoMessageBubbleComponent;
}());
export { CometchatSenderVideoMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.videoUrl;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometchatSenderVideoMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtc2VuZGVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQXFCRTtRQWZTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBR3JCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEUsZ0JBQVcsR0FBRyxRQUFRLENBQUM7UUFFdkIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztRQUNILGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7SUFFaEIsNkRBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFDRDs7T0FFRzs7Ozs7SUFDSCwyREFBTTs7OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDL0MsQ0FBQztJQUNEOzs7T0FHRzs7Ozs7O0lBQ0gsa0VBQWE7Ozs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTFDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsNGlDQUFxRTs7aUJBRXRFOzs7OztpQ0FFRSxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUVMLE1BQU07O0lBZ0NULGlEQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0F0Q1ksMENBQTBDOzs7SUFDckQsb0VBQStCOztJQUMvQixpRUFBNEI7O0lBQzVCLG9FQUErQjs7SUFDL0Isa0VBQXNCOztJQUV0QixxRUFBa0U7O0lBRWxFLDhEQUFpQjs7SUFDakIsaUVBQXVCOztJQUV2Qiw2REFFRzs7SUFDSCxtRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItdmlkZW8tbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNlbmRlclZpZGVvTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy9TZXRzIFZpZGVvIFVybCB0byBiZSBkaXNwbGF5ZWRcbiAgdmlkZW9Vcmw6IHN0cmluZztcbiAgbWVzc2FnZUZyb20gPSBcInNlbmRlclwiO1xuXG4gIG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gIH0pO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0VXJsKCk7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVybCBvZiB2aWRlbyB0byBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIGdldFVybCgpIHtcbiAgICB0aGlzLnZpZGVvVXJsID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgfVxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=