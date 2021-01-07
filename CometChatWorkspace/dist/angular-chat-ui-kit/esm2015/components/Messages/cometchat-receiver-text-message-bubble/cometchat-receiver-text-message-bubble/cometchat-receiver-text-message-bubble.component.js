/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatReceiverTextMessageBubbleComponent {
    constructor() {
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
    ngOnInit() {
        this.checkLinkPreview();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
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
                        this.linkUrl = linkObject.url;
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
CometchatReceiverTextMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-text-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: type == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <!--avatar component-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"type == 'group'\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name--->\n      <div class=\"nameWrapperStyle\" *ngIf=\"type == 'group'\">\n        <span class=\"nameStyle\"> {{ MessageDetails?.sender?.name }} </span>\n      </div>\n\n      <div class=\"messageTxtContainerStyle\">\n        <!--messageTxt-->\n\n        <div class=\"messageWrapperStyle\" id=\"check\">\n          <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n            <p class=\"messageTxtStyle\">\n              {{ MessageDetails.data.text }}\n            </p>\n          </div>\n          <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n            <div class=\"messagePreviewWrapperStyle\">\n              <div class=\"previewImageStyle\">\n                <img [src]=\"linkImage\" loading=\"lazy\" />\n              </div>\n              <div class=\"previewDataStyle\">\n                <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n                  <span>\n                    {{ linkTitle }}\n                  </span>\n                </div>\n                <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n                  <span>\n                    {{ linkDescription }}\n                  </span>\n                </div>\n                <div class=\"previewTextStyle\">\n                  <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n                </div>\n              </div>\n              <div class=\"previewLinkStyle\">\n                <a [href]=\"linkUrl\" target=\"_blank\">\n                  {{ linkText }}\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageTxtStyle a:hover{color:#0432ff}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}.nameWrapperStyle{align-self:flex-start;padding:3px 5px}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}"]
            }] }
];
/** @nocollapse */
CometchatReceiverTextMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverTextMessageBubbleComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    MessageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLDJDQUEyQztJQW1CdEQ7UUFsQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUdyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7SUFDSixDQUFDOzs7OztJQUtELGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7O2tCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFROztrQkFDdkMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDNUMsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTs7c0JBQzNELGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JELElBQ0UsZ0JBQWdCO29CQUNoQixnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQy9DOzswQkFDTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7b0JBQzFELElBQ0UsaUJBQWlCO3dCQUNqQixpQkFBaUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO3dCQUN6QyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQ2pDO3dCQUNBLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs4QkFDbEIsVUFBVSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7d0JBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDOzs4QkFDNUIsT0FBTyxHQUFHLHlEQUF5RDs7OEJBQ25FLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDL0MsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxlQUFlOzRCQUNqQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUs7d0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN6QixxQ0FBcUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQTdFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdDQUF3QztnQkFDbEQsKy9GQUFzRTs7YUFFdkU7Ozs7O21CQUVFLEtBQUs7bUJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFFTCxNQUFNOzBCQUVOLEtBQUs7Ozs7SUFSTiwyREFBcUI7O0lBQ3JCLDJEQUFtQjs7SUFDbkIscUVBQStCOztJQUMvQixxRUFBK0I7O0lBQy9CLG1FQUFzQjs7SUFFdEIsc0VBQWtFOztJQUVsRSxrRUFBNEI7O0lBRTVCLGtFQUE2Qjs7SUFDN0IsZ0VBQWtCOztJQUNsQixzRUFBd0I7O0lBQ3hCLDhEQUFnQjs7SUFDaEIsK0RBQWlCOztJQUNqQixnRUFBa0I7O0lBQ2xCLG9FQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJUZXh0TWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gXCJcIjtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgbGlua1ByZXZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGlua1RpdGxlOiBzdHJpbmc7XG4gIGxpbmtEZXNjcmlwdGlvbjogc3RyaW5nO1xuICBsaW5rVXJsOiBzdHJpbmc7XG4gIGxpbmtUZXh0OiBzdHJpbmc7XG4gIGxpbmtJbWFnZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tMaW5rUHJldmlldygpO1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIElmIGV4dGVuc2lvbiBoYXMgZW5hYmxlZCBMaW5rUHJldmlld1xuICAgKi9cbiAgY2hlY2tMaW5rUHJldmlldygpIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGE7XG4gICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdCAmJlxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJsaW5rLXByZXZpZXdcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbGlua1ByZXZpZXdPYmplY3QgPSBleHRlbnNpb25zT2JqZWN0W1wibGluay1wcmV2aWV3XCJdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0ICYmXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdC5oYXNPd25Qcm9wZXJ0eShcImxpbmtzXCIpICYmXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdFtcImxpbmtzXCJdLmxlbmd0aFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBsaW5rT2JqZWN0ID0gbGlua1ByZXZpZXdPYmplY3RbXCJsaW5rc1wiXVswXTtcbiAgICAgICAgICAgIHRoaXMubGlua1RpdGxlID0gbGlua09iamVjdC50aXRsZTtcbiAgICAgICAgICAgIHRoaXMubGlua0Rlc2NyaXB0aW9uID0gbGlua09iamVjdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMubGlua1VybCA9IGxpbmtPYmplY3QudXJsO1xuICAgICAgICAgICAgdGhpcy5saW5rSW1hZ2UgPSBsaW5rT2JqZWN0LmltYWdlO1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IC8oaHR0cDp8aHR0cHM6KT9cXC9cXC8od3d3XFwuKT8oeW91dHViZS5jb218eW91dHUuYmUpKFxcUyspPy87XG4gICAgICAgICAgICBjb25zdCBsaW5rVGV4dCA9IGxpbmtPYmplY3RbXCJ1cmxcIl0ubWF0Y2gocGF0dGVybilcbiAgICAgICAgICAgICAgPyBTVFJJTkdfTUVTU0FHRVMuVklFV19PTl9ZT1VUVUJFXG4gICAgICAgICAgICAgIDogU1RSSU5HX01FU1NBR0VTLlZJU0lUO1xuICAgICAgICAgICAgdGhpcy5saW5rVGV4dCA9IGxpbmtUZXh0O1xuICAgICAgICAgICAgLy8gY29uc3QgYWN0dWFsTWVzc2FnZSA9IG1lc3NhZ2VUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==