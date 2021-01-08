/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatSenderTextMessageBubbleComponent = /** @class */ (function () {
    function CometchatSenderTextMessageBubbleComponent() {
        this.MessageDetails = null;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.linkPreview = false;
        this.checkReaction = false;
    }
    /**
     * @return {?}
     */
    CometchatSenderTextMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkLinkPreview();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
    };
    /**
     * Check If extension has enabled LinkPreview
     */
    /**
     * Check If extension has enabled LinkPreview
     * @return {?}
     */
    CometchatSenderTextMessageBubbleComponent.prototype.checkLinkPreview = /**
     * Check If extension has enabled LinkPreview
     * @return {?}
     */
    function () {
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            /** @type {?} */
            var metadata = this.MessageDetails.metadata;
            /** @type {?} */
            var injectedObject = metadata["@injected"];
            if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
                /** @type {?} */
                var extensionsObject = injectedObject["extensions"];
                if (extensionsObject &&
                    extensionsObject.hasOwnProperty("link-preview")) {
                    /** @type {?} */
                    var linkPreviewObject = extensionsObject["link-preview"];
                    if (linkPreviewObject &&
                        linkPreviewObject.hasOwnProperty("links") &&
                        linkPreviewObject["links"].length) {
                        this.linkPreview = true;
                        /** @type {?} */
                        var linkObject = linkPreviewObject["links"][0];
                        this.linkTitle = linkObject.title;
                        this.linkDescription = linkObject.description;
                        if (linkObject.url !== this.MessageDetails.data.text) {
                            this.linkUrl = this.MessageDetails.data.text;
                        }
                        else {
                            this.linkUrl = linkObject.url;
                        }
                        this.linkImage = linkObject.image;
                        /** @type {?} */
                        var pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
                        /** @type {?} */
                        var linkText = linkObject["url"].match(pattern)
                            ? STRING_MESSAGES.VIEW_ON_YOUTUBE
                            : STRING_MESSAGES.VISIT;
                        this.linkText = linkText;
                        // const actualMessage = messageText;
                    }
                }
            }
        }
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
    CometchatSenderTextMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatSenderTextMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sender-text-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n      <p class=\"messageTxtStyle message__txt\">\n        {{ MessageDetails.data.text }}\n      </p>\n    </div>\n    <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n      <div class=\"messagePreviewWrapperStyle\">\n        <div class=\"previewImageStyle\">\n          <img [src]=\"linkImage\" loading=\"lazy\" />\n        </div>\n        <div class=\"previewDataStyle\">\n          <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n            <span>\n              <!--titile-->\n              {{ linkTitle }}\n            </span>\n          </div>\n          <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n            <span>\n              <!--descript-->\n              {{ linkDescription }}\n            </span>\n          </div>\n          <div class=\"previewTextStyle\">\n            <!--actual msg-->\n            <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n          </div>\n        </div>\n        <div class=\"previewLinkStyle\">\n          <a [href]=\"linkUrl\" target=\"_blank\">\n            {{ linkText }}\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount component-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <!--ReadReciept component-->\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageInfoWrapperStyle{display:flex;align-self:flex-end}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSenderTextMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatSenderTextMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        showToolTip: [{ type: Input }]
    };
    return CometchatSenderTextMessageBubbleComponent;
}());
export { CometchatSenderTextMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkPreview;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkTitle;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkDescription;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkUrl;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkText;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.linkImage;
    /** @type {?} */
    CometchatSenderTextMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBb0JFO1FBZFMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUU1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUNoQixDQUFDOzs7O0lBRWhCLDREQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsb0VBQWdCOzs7O0lBQWhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTs7Z0JBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7O2dCQUN2QyxjQUFjLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUM1QyxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFOztvQkFDM0QsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztnQkFDckQsSUFDRSxnQkFBZ0I7b0JBQ2hCLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFDL0M7O3dCQUNNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztvQkFDMUQsSUFDRSxpQkFBaUI7d0JBQ2pCLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7d0JBQ3pDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFDakM7d0JBQ0EsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7OzRCQUNsQixVQUFVLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQzt3QkFFOUMsSUFBSSxVQUFVLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs0QkFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQzlDOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQzt5QkFDL0I7d0JBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDOzs0QkFDNUIsT0FBTyxHQUFHLHlEQUF5RDs7NEJBQ25FLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDL0MsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxlQUFlOzRCQUNqQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUs7d0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN6QixxQ0FBcUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGlFQUFhOzs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkEvRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELDRyRUFBb0U7O2lCQUVyRTs7Ozs7aUNBRUUsS0FBSztpQ0FDTCxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsTUFBTTs4QkFFTixLQUFLOztJQXFFUixnREFBQztDQUFBLEFBaEZELElBZ0ZDO1NBM0VZLHlDQUF5Qzs7O0lBQ3BELG1FQUErQjs7SUFDL0IsbUVBQStCOztJQUMvQixpRUFBc0I7O0lBQ3RCLG9FQUFrRTs7SUFFbEUsZ0VBQTRCOztJQUU1QixnRUFBNkI7O0lBQzdCLDhEQUFrQjs7SUFDbEIsb0VBQXdCOztJQUN4Qiw0REFBZ0I7O0lBQ2hCLDZEQUFpQjs7SUFDakIsOERBQWtCOztJQUNsQixrRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNlbmRlclRleHRNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuXG4gIGxpbmtQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIGxpbmtUaXRsZTogc3RyaW5nO1xuICBsaW5rRGVzY3JpcHRpb246IHN0cmluZztcbiAgbGlua1VybDogc3RyaW5nO1xuICBsaW5rVGV4dDogc3RyaW5nO1xuICBsaW5rSW1hZ2U6IHN0cmluZztcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja0xpbmtQcmV2aWV3KCk7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgSWYgZXh0ZW5zaW9uIGhhcyBlbmFibGVkIExpbmtQcmV2aWV3XG4gICAqL1xuICBjaGVja0xpbmtQcmV2aWV3KCkge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YTtcbiAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgICBpZiAoaW5qZWN0ZWRPYmplY3QgJiYgaW5qZWN0ZWRPYmplY3QuaGFzT3duUHJvcGVydHkoXCJleHRlbnNpb25zXCIpKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtcImV4dGVuc2lvbnNcIl07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBleHRlbnNpb25zT2JqZWN0ICYmXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShcImxpbmstcHJldmlld1wiKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBsaW5rUHJldmlld09iamVjdCA9IGV4dGVuc2lvbnNPYmplY3RbXCJsaW5rLXByZXZpZXdcIl07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3QgJiZcbiAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0Lmhhc093blByb3BlcnR5KFwibGlua3NcIikgJiZcbiAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0W1wibGlua3NcIl0ubGVuZ3RoXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtQcmV2aWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtPYmplY3QgPSBsaW5rUHJldmlld09iamVjdFtcImxpbmtzXCJdWzBdO1xuICAgICAgICAgICAgdGhpcy5saW5rVGl0bGUgPSBsaW5rT2JqZWN0LnRpdGxlO1xuICAgICAgICAgICAgdGhpcy5saW5rRGVzY3JpcHRpb24gPSBsaW5rT2JqZWN0LmRlc2NyaXB0aW9uO1xuXG4gICAgICAgICAgICBpZiAobGlua09iamVjdC51cmwgIT09IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS50ZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMubGlua1VybCA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5rVXJsID0gbGlua09iamVjdC51cmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGlua0ltYWdlID0gbGlua09iamVjdC5pbWFnZTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvKGh0dHA6fGh0dHBzOik/XFwvXFwvKHd3d1xcLik/KHlvdXR1YmUuY29tfHlvdXR1LmJlKShcXFMrKT8vO1xuICAgICAgICAgICAgY29uc3QgbGlua1RleHQgPSBsaW5rT2JqZWN0W1widXJsXCJdLm1hdGNoKHBhdHRlcm4pXG4gICAgICAgICAgICAgID8gU1RSSU5HX01FU1NBR0VTLlZJRVdfT05fWU9VVFVCRVxuICAgICAgICAgICAgICA6IFNUUklOR19NRVNTQUdFUy5WSVNJVDtcbiAgICAgICAgICAgIHRoaXMubGlua1RleHQgPSBsaW5rVGV4dDtcbiAgICAgICAgICAgIC8vIGNvbnN0IGFjdHVhbE1lc3NhZ2UgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=