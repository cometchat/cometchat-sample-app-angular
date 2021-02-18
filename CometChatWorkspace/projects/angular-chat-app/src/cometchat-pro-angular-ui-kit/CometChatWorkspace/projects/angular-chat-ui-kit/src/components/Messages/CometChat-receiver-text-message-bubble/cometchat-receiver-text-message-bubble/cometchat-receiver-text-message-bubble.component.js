/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverTextMessageBubbleComponent {
    constructor() {
        this.item = null;
        this.type = "";
        this.messageDetails = null;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.linkPreview = false;
        this.checkReaction = [];
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkLinkPreview();
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Check If extension has enabled LinkPreview
     * @return {?}
     */
    checkLinkPreview() {
        try {
            if (this.messageDetails.hasOwnProperty(enums.METADATA)) {
                /** @type {?} */
                const metadata = this.messageDetails[enums.METADATA];
                /** @type {?} */
                const injectedObject = metadata[enums.INJECTED];
                if (injectedObject && injectedObject.hasOwnProperty(enums.EXTENSIONS)) {
                    /** @type {?} */
                    const extensionsObject = injectedObject[enums.EXTENSIONS];
                    if (extensionsObject &&
                        extensionsObject.hasOwnProperty(enums.LINK_PREVIEW)) {
                        /** @type {?} */
                        const linkPreviewObject = extensionsObject[enums.LINK_PREVIEW];
                        if (linkPreviewObject &&
                            linkPreviewObject.hasOwnProperty(enums.LINKS) &&
                            linkPreviewObject[enums.LINKS].length) {
                            this.linkPreview = true;
                            /** @type {?} */
                            const linkObject = linkPreviewObject[enums.LINKS][0];
                            this.linkTitle = linkObject.title;
                            this.linkDescription = linkObject.description;
                            this.linkUrl = linkObject.url;
                            this.linkImage = linkObject.image;
                            /** @type {?} */
                            const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
                            /** @type {?} */
                            const linkText = linkObject["url"].match(pattern)
                                ? COMETCHAT_CONSTANTS.VIEW_ON_YOUTUBE
                                : COMETCHAT_CONSTANTS.VISIT;
                            this.linkText = linkText;
                        }
                    }
                }
            }
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
CometChatReceiverTextMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-text-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: type == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <!--avatar component-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"type == GROUP\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name--->\n      <div class=\"nameWrapperStyle\" *ngIf=\"type == GROUP\">\n        <span class=\"nameStyle\"> {{ messageDetails?.sender?.name }} </span>\n      </div>\n\n      <div class=\"messageTxtContainerStyle\">\n        <!--messageTxt-->\n\n        <div class=\"messageWrapperStyle\" id=\"check\">\n          <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n            <p class=\"messageTxtStyle\">\n              {{ messageDetails.data.text }}\n            </p>\n          </div>\n          <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n            <div class=\"messagePreviewWrapperStyle\">\n              <div class=\"previewImageStyle\">\n                <img [src]=\"linkImage\" loading=\"lazy\" />\n              </div>\n              <div class=\"previewDataStyle\">\n                <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n                  <span>\n                    {{ linkTitle }}\n                  </span>\n                </div>\n                <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n                  <span>\n                    {{ linkDescription }}\n                  </span>\n                </div>\n                <div class=\"previewTextStyle\">\n                  <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n                </div>\n              </div>\n              <div class=\"previewLinkStyle\">\n                <a [href]=\"linkUrl\" target=\"_blank\">\n                  {{ linkText }}\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageTxtStyle a:hover{color:#0432ff}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}.nameWrapperStyle{align-self:flex-start;padding:3px 5px}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}"]
            }] }
];
/** @nocollapse */
CometChatReceiverTextMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverTextMessageBubbleComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    messageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.item;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.type;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkPreview;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkTitle;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkDescription;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkUrl;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkText;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.linkImage;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverTextMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPaEQsTUFBTSxPQUFPLDJDQUEyQztJQXFCdEQ7UUFwQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFHckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUU1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixVQUFLLEdBQVcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFFL0IsQ0FB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LDhEQUFnQjs7SUFDaEIsK0RBQWlCOztJQUNqQixnRUFBa0I7O0lBQ2xCLG9FQUFtQjs7SUFFbkIsNERBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0UmVjZWl2ZXJUZXh0TWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlOiBTdHJpbmcgPSBcIlwiO1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcblxuICBsaW5rUHJldmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICBsaW5rVGl0bGU6IHN0cmluZztcbiAgbGlua0Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGxpbmtVcmw6IHN0cmluZztcbiAgbGlua1RleHQ6IHN0cmluZztcbiAgbGlua0ltYWdlOiBzdHJpbmc7XG4gIGNoZWNrUmVhY3Rpb24gPSBbXTtcblxuICBHUk9VUDogU3RyaW5nID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNoZWNrTGlua1ByZXZpZXcoKTtcbiAgICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIElmIGV4dGVuc2lvbiBoYXMgZW5hYmxlZCBMaW5rUHJldmlld1xuICAgKi9cbiAgY2hlY2tMaW5rUHJldmlldygpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoZW51bXMuTUVUQURBVEEpKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5tZXNzYWdlRGV0YWlsc1tlbnVtcy5NRVRBREFUQV07XG4gICAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbZW51bXMuSU5KRUNURURdO1xuICAgICAgICBpZiAoaW5qZWN0ZWRPYmplY3QgJiYgaW5qZWN0ZWRPYmplY3QuaGFzT3duUHJvcGVydHkoZW51bXMuRVhURU5TSU9OUykpIHtcbiAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbZW51bXMuRVhURU5TSU9OU107XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZXh0ZW5zaW9uc09iamVjdCAmJlxuICAgICAgICAgICAgZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5MSU5LX1BSRVZJRVcpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5rUHJldmlld09iamVjdCA9IGV4dGVuc2lvbnNPYmplY3RbZW51bXMuTElOS19QUkVWSUVXXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3QgJiZcbiAgICAgICAgICAgICAgbGlua1ByZXZpZXdPYmplY3QuaGFzT3duUHJvcGVydHkoZW51bXMuTElOS1MpICYmXG4gICAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0W2VudW1zLkxJTktTXS5sZW5ndGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLmxpbmtQcmV2aWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29uc3QgbGlua09iamVjdCA9IGxpbmtQcmV2aWV3T2JqZWN0W2VudW1zLkxJTktTXVswXTtcbiAgICAgICAgICAgICAgdGhpcy5saW5rVGl0bGUgPSBsaW5rT2JqZWN0LnRpdGxlO1xuICAgICAgICAgICAgICB0aGlzLmxpbmtEZXNjcmlwdGlvbiA9IGxpbmtPYmplY3QuZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgIHRoaXMubGlua1VybCA9IGxpbmtPYmplY3QudXJsO1xuICAgICAgICAgICAgICB0aGlzLmxpbmtJbWFnZSA9IGxpbmtPYmplY3QuaW1hZ2U7XG4gICAgICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvKGh0dHA6fGh0dHBzOik/XFwvXFwvKHd3d1xcLik/KHlvdXR1YmUuY29tfHlvdXR1LmJlKShcXFMrKT8vO1xuICAgICAgICAgICAgICBjb25zdCBsaW5rVGV4dCA9IGxpbmtPYmplY3RbXCJ1cmxcIl0ubWF0Y2gocGF0dGVybilcbiAgICAgICAgICAgICAgICA/IENPTUVUQ0hBVF9DT05TVEFOVFMuVklFV19PTl9ZT1VUVUJFXG4gICAgICAgICAgICAgICAgOiBDT01FVENIQVRfQ09OU1RBTlRTLlZJU0lUO1xuICAgICAgICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=