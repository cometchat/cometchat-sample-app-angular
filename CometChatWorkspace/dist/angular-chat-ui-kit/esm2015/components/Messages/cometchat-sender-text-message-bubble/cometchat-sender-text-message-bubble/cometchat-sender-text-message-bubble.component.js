/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatSenderTextMessageBubbleComponent {
    constructor() {
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
    ngOnInit() {
        this.checkLinkPreview();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
    }
    /**
     * Check If extension has enabled LinkPreview
     * @return {?}
     */
    checkLinkPreview() {
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            /** @type {?} */
            const metadata = this.MessageDetails.metadata;
            /** @type {?} */
            const injectedObject = metadata["@injected"];
            if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
                /** @type {?} */
                const extensionsObject = injectedObject["extensions"];
                if (extensionsObject &&
                    extensionsObject.hasOwnProperty("link-preview")) {
                    /** @type {?} */
                    const linkPreviewObject = extensionsObject["link-preview"];
                    if (linkPreviewObject &&
                        linkPreviewObject.hasOwnProperty("links") &&
                        linkPreviewObject["links"].length) {
                        this.linkPreview = true;
                        /** @type {?} */
                        const linkObject = linkPreviewObject["links"][0];
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
                        const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
                        /** @type {?} */
                        const linkText = linkObject["url"].match(pattern)
                            ? STRING_MESSAGES.VIEW_ON_YOUTUBE
                            : STRING_MESSAGES.VISIT;
                        this.linkText = linkText;
                        // const actualMessage = messageText;
                    }
                }
            }
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
}
CometchatSenderTextMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-text-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n      <p class=\"messageTxtStyle message__txt\">\n        {{ MessageDetails.data.text }}\n      </p>\n    </div>\n    <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n      <div class=\"messagePreviewWrapperStyle\">\n        <div class=\"previewImageStyle\">\n          <img [src]=\"linkImage\" loading=\"lazy\" />\n        </div>\n        <div class=\"previewDataStyle\">\n          <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n            <span>\n              <!--titile-->\n              {{ linkTitle }}\n            </span>\n          </div>\n          <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n            <span>\n              <!--descript-->\n              {{ linkDescription }}\n            </span>\n          </div>\n          <div class=\"previewTextStyle\">\n            <!--actual msg-->\n            <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n          </div>\n        </div>\n        <div class=\"previewLinkStyle\">\n          <a [href]=\"linkUrl\" target=\"_blank\">\n            {{ linkText }}\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount component-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <!--ReadReciept component-->\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageInfoWrapperStyle{display:flex;align-self:flex-end}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}"]
            }] }
];
/** @nocollapse */
CometchatSenderTextMessageBubbleComponent.ctorParameters = () => [];
CometchatSenderTextMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLE1BQU0sT0FBTyx5Q0FBeUM7SUFlcEQ7UUFkUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFLRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQkFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUTs7a0JBQ3ZDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzVDLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7O3NCQUMzRCxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxJQUNFLGdCQUFnQjtvQkFDaEIsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUMvQzs7MEJBQ00saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO29CQUMxRCxJQUNFLGlCQUFpQjt3QkFDakIsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzt3QkFDekMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUNqQzt3QkFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzs7OEJBQ2xCLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO3dCQUU5QyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDOUM7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO3lCQUMvQjt3QkFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7OzhCQUM1QixPQUFPLEdBQUcseURBQXlEOzs4QkFDbkUsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzRCQUMvQyxDQUFDLENBQUMsZUFBZSxDQUFDLGVBQWU7NEJBQ2pDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSzt3QkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7d0JBQ3pCLHFDQUFxQztxQkFDdEM7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBL0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCw0ckVBQW9FOzthQUVyRTs7Ozs7NkJBRUUsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsTUFBTTswQkFFTixLQUFLOzs7O0lBTE4sbUVBQStCOztJQUMvQixtRUFBK0I7O0lBQy9CLGlFQUFzQjs7SUFDdEIsb0VBQWtFOztJQUVsRSxnRUFBNEI7O0lBRTVCLGdFQUE2Qjs7SUFDN0IsOERBQWtCOztJQUNsQixvRUFBd0I7O0lBQ3hCLDREQUFnQjs7SUFDaEIsNkRBQWlCOztJQUNqQiw4REFBa0I7O0lBQ2xCLGtFQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U2VuZGVyVGV4dE1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgbGlua1ByZXZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGlua1RpdGxlOiBzdHJpbmc7XG4gIGxpbmtEZXNjcmlwdGlvbjogc3RyaW5nO1xuICBsaW5rVXJsOiBzdHJpbmc7XG4gIGxpbmtUZXh0OiBzdHJpbmc7XG4gIGxpbmtJbWFnZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrTGlua1ByZXZpZXcoKTtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBcInJlYWN0aW9uc1wiXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBJZiBleHRlbnNpb24gaGFzIGVuYWJsZWQgTGlua1ByZXZpZXdcbiAgICovXG4gIGNoZWNrTGlua1ByZXZpZXcoKSB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhO1xuICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtcIkBpbmplY3RlZFwiXTtcbiAgICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W1wiZXh0ZW5zaW9uc1wiXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QgJiZcbiAgICAgICAgICBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwibGluay1wcmV2aWV3XCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGxpbmtQcmV2aWV3T2JqZWN0ID0gZXh0ZW5zaW9uc09iamVjdFtcImxpbmstcHJldmlld1wiXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdCAmJlxuICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3QuaGFzT3duUHJvcGVydHkoXCJsaW5rc1wiKSAmJlxuICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3RbXCJsaW5rc1wiXS5sZW5ndGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubGlua1ByZXZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbGlua09iamVjdCA9IGxpbmtQcmV2aWV3T2JqZWN0W1wibGlua3NcIl1bMF07XG4gICAgICAgICAgICB0aGlzLmxpbmtUaXRsZSA9IGxpbmtPYmplY3QudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNjcmlwdGlvbiA9IGxpbmtPYmplY3QuZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgIGlmIChsaW5rT2JqZWN0LnVybCAhPT0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLnRleHQpIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5rVXJsID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxpbmtVcmwgPSBsaW5rT2JqZWN0LnVybDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5saW5rSW1hZ2UgPSBsaW5rT2JqZWN0LmltYWdlO1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IC8oaHR0cDp8aHR0cHM6KT9cXC9cXC8od3d3XFwuKT8oeW91dHViZS5jb218eW91dHUuYmUpKFxcUyspPy87XG4gICAgICAgICAgICBjb25zdCBsaW5rVGV4dCA9IGxpbmtPYmplY3RbXCJ1cmxcIl0ubWF0Y2gocGF0dGVybilcbiAgICAgICAgICAgICAgPyBTVFJJTkdfTUVTU0FHRVMuVklFV19PTl9ZT1VUVUJFXG4gICAgICAgICAgICAgIDogU1RSSU5HX01FU1NBR0VTLlZJU0lUO1xuICAgICAgICAgICAgdGhpcy5saW5rVGV4dCA9IGxpbmtUZXh0O1xuICAgICAgICAgICAgLy8gY29uc3QgYWN0dWFsTWVzc2FnZSA9IG1lc3NhZ2VUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==