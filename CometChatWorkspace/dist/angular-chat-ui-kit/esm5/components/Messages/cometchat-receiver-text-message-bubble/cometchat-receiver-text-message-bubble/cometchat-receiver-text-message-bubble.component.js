/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatReceiverTextMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverTextMessageBubbleComponent() {
        this.item = null;
        this.type = "";
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
    CometchatReceiverTextMessageBubbleComponent.prototype.ngOnInit = /**
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
    CometchatReceiverTextMessageBubbleComponent.prototype.checkLinkPreview = /**
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
                        this.linkUrl = linkObject.url;
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
    CometchatReceiverTextMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverTextMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-text-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: type == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <!--avatar component-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"type == 'group'\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name--->\n      <div class=\"nameWrapperStyle\" *ngIf=\"type == 'group'\">\n        <span class=\"nameStyle\"> {{ MessageDetails?.sender?.name }} </span>\n      </div>\n\n      <div class=\"messageTxtContainerStyle\">\n        <!--messageTxt-->\n\n        <div class=\"messageWrapperStyle\" id=\"check\">\n          <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n            <p class=\"messageTxtStyle\">\n              {{ MessageDetails.data.text }}\n            </p>\n          </div>\n          <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n            <div class=\"messagePreviewWrapperStyle\">\n              <div class=\"previewImageStyle\">\n                <img [src]=\"linkImage\" loading=\"lazy\" />\n              </div>\n              <div class=\"previewDataStyle\">\n                <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n                  <span>\n                    {{ linkTitle }}\n                  </span>\n                </div>\n                <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n                  <span>\n                    {{ linkDescription }}\n                  </span>\n                </div>\n                <div class=\"previewTextStyle\">\n                  <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n                </div>\n              </div>\n              <div class=\"previewLinkStyle\">\n                <a [href]=\"linkUrl\" target=\"_blank\">\n                  {{ linkText }}\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageTxtStyle a:hover{color:#0432ff}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}.nameWrapperStyle{align-self:flex-start;padding:3px 5px}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverTextMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverTextMessageBubbleComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        MessageDetails: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        showToolTip: [{ type: Input }]
    };
    return CometchatReceiverTextMessageBubbleComponent;
}());
export { CometchatReceiverTextMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.item;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.type;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkPreview;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkTitle;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkDescription;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkUrl;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkText;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.linkImage;
    /** @type {?} */
    CometchatReceiverTextMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUF3QkU7UUFsQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUdyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7SUFFaEIsOERBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzRUFBZ0I7Ozs7SUFBaEI7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztnQkFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUTs7Z0JBQ3ZDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzVDLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7O29CQUMzRCxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxJQUNFLGdCQUFnQjtvQkFDaEIsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUMvQzs7d0JBQ00saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO29CQUMxRCxJQUNFLGlCQUFpQjt3QkFDakIsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzt3QkFDekMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUNqQzt3QkFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzs7NEJBQ2xCLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO3dCQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7d0JBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQzs7NEJBQzVCLE9BQU8sR0FBRyx5REFBeUQ7OzRCQUNuRSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7NEJBQy9DLENBQUMsQ0FBQyxlQUFlLENBQUMsZUFBZTs0QkFDakMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLO3dCQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDekIscUNBQXFDO3FCQUN0QztpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxtRUFBYTs7Ozs7SUFBYixVQUFjLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBN0VGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCwrL0ZBQXNFOztpQkFFdkU7Ozs7O3VCQUVFLEtBQUs7dUJBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7K0JBQ0wsS0FBSztrQ0FFTCxNQUFNOzhCQUVOLEtBQUs7O0lBZ0VSLGtEQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0F6RVksMkNBQTJDOzs7SUFDdEQsMkRBQXFCOztJQUNyQiwyREFBbUI7O0lBQ25CLHFFQUErQjs7SUFDL0IscUVBQStCOztJQUMvQixtRUFBc0I7O0lBRXRCLHNFQUFrRTs7SUFFbEUsa0VBQTRCOztJQUU1QixrRUFBNkI7O0lBQzdCLGdFQUFrQjs7SUFDbEIsc0VBQXdCOztJQUN4Qiw4REFBZ0I7O0lBQ2hCLCtEQUFpQjs7SUFDakIsZ0VBQWtCOztJQUNsQixvRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci10ZXh0LW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyVGV4dE1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IFwiXCI7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuXG4gIGxpbmtQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIGxpbmtUaXRsZTogc3RyaW5nO1xuICBsaW5rRGVzY3JpcHRpb246IHN0cmluZztcbiAgbGlua1VybDogc3RyaW5nO1xuICBsaW5rVGV4dDogc3RyaW5nO1xuICBsaW5rSW1hZ2U6IHN0cmluZztcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrTGlua1ByZXZpZXcoKTtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBJZiBleHRlbnNpb24gaGFzIGVuYWJsZWQgTGlua1ByZXZpZXdcbiAgICovXG4gIGNoZWNrTGlua1ByZXZpZXcoKSB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhO1xuICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtcIkBpbmplY3RlZFwiXTtcbiAgICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W1wiZXh0ZW5zaW9uc1wiXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QgJiZcbiAgICAgICAgICBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwibGluay1wcmV2aWV3XCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGxpbmtQcmV2aWV3T2JqZWN0ID0gZXh0ZW5zaW9uc09iamVjdFtcImxpbmstcHJldmlld1wiXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdCAmJlxuICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3QuaGFzT3duUHJvcGVydHkoXCJsaW5rc1wiKSAmJlxuICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3RbXCJsaW5rc1wiXS5sZW5ndGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubGlua1ByZXZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbGlua09iamVjdCA9IGxpbmtQcmV2aWV3T2JqZWN0W1wibGlua3NcIl1bMF07XG4gICAgICAgICAgICB0aGlzLmxpbmtUaXRsZSA9IGxpbmtPYmplY3QudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNjcmlwdGlvbiA9IGxpbmtPYmplY3QuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLmxpbmtVcmwgPSBsaW5rT2JqZWN0LnVybDtcbiAgICAgICAgICAgIHRoaXMubGlua0ltYWdlID0gbGlua09iamVjdC5pbWFnZTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvKGh0dHA6fGh0dHBzOik/XFwvXFwvKHd3d1xcLik/KHlvdXR1YmUuY29tfHlvdXR1LmJlKShcXFMrKT8vO1xuICAgICAgICAgICAgY29uc3QgbGlua1RleHQgPSBsaW5rT2JqZWN0W1widXJsXCJdLm1hdGNoKHBhdHRlcm4pXG4gICAgICAgICAgICAgID8gU1RSSU5HX01FU1NBR0VTLlZJRVdfT05fWU9VVFVCRVxuICAgICAgICAgICAgICA6IFNUUklOR19NRVNTQUdFUy5WSVNJVDtcbiAgICAgICAgICAgIHRoaXMubGlua1RleHQgPSBsaW5rVGV4dDtcbiAgICAgICAgICAgIC8vIGNvbnN0IGFjdHVhbE1lc3NhZ2UgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=