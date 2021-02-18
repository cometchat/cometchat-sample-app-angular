/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sender-text-message-bubble/cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../utils/common";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
export class CometChatSenderTextMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.linkPreview = false;
        this.checkReaction = [];
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
                            if (linkObject.url !== this.messageDetails.data.text) {
                                this.linkUrl = this.messageDetails.data.text;
                            }
                            else {
                                this.linkUrl = linkObject.url;
                            }
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
CometChatSenderTextMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-text-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip Component-->\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\" *ngIf=\"linkPreview === false\">\n      <p class=\"messageTxtStyle message__txt\">\n        {{ messageDetails.data.text }}\n      </p>\n    </div>\n    <div class=\"messagePreviewContainerStyle\" *ngIf=\"linkPreview\">\n      <div class=\"messagePreviewWrapperStyle\">\n        <div class=\"previewImageStyle\">\n          <img [src]=\"linkImage\" loading=\"lazy\" />\n        </div>\n        <div class=\"previewDataStyle\">\n          <div class=\"previewTitleStyle\" *ngIf=\"linkTitle !== ''\">\n            <span>\n              <!--titile-->\n              {{ linkTitle }}\n            </span>\n          </div>\n          <div class=\"previewDescStyle\" *ngIf=\"linkDescription !== ''\">\n            <span>\n              <!--descript-->\n              {{ linkDescription }}\n            </span>\n          </div>\n          <div class=\"previewTextStyle\">\n            <!--actual msg-->\n            <a [href]=\"linkUrl\" target=\"_blank\"> {{ linkUrl }} </a>\n          </div>\n        </div>\n        <div class=\"previewLinkStyle\">\n          <a [href]=\"linkUrl\" target=\"_blank\">\n            {{ linkText }}\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount component-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <!--ReadReciept component-->\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.messageTxtStyle{margin:0;font-size:14px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto}.messageInfoWrapperStyle{display:flex;align-self:flex-end}.messagePreviewContainerStyle{display:inline-block;border-radius:12px;background-color:#fff;box-shadow:0 1px 2px 1px rgba(0,0,0,.18);align-self:flex-start;width:auto}.messagePreviewWrapperStyle{display:flex;flex-direction:column}.previewImageStyle{-ms-grid-row-align:center;align-self:center;height:150px;margin:12px 0}.previewImageStyle>img{background-size:contain;height:150px;margin:12px 0}.previewDataStyle{border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;padding:12px}.previewTitleStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-weight:700;margin-bottom:8px}.previewDescStyle{white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:rgba(20,20,20,.6);font-size:13px}.previewTextStyle{margin-top:5px;white-space:pre-wrap;word-break:break-word;text-align:left;width:auto;color:#0432ff}.previewTextStyle+.messageTxtWrapperStyle{background-color:transparent;color:rgba(20,20,20,.6);font-style:normal;padding:8px 0}.previewTextStyle>a{text-decoration:none;color:#0432ff}.previewTextStyle>a:hover{color:#04009d}.previewLinkStyle{display:flex;align-items:center;justify-content:center;padding:12px}.previewLinkStyle>a{display:inline-block;color:#39f;font-weight:700;text-decoration:none}"]
            }] }
];
/** @nocollapse */
CometChatSenderTextMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderTextMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkPreview;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkTitle;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkDescription;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkUrl;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkText;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.linkImage;
    /** @type {?} */
    CometChatSenderTextMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUNMLDZCQUE2QixFQUM3QixNQUFNLEdBQ1AsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBT2pELE1BQU0sT0FBTyx5Q0FBeUM7SUFlcEQ7UUFkUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ0osQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLEtBQUssQ0FBQyxTQUFTLENBQ2hCLENBQUM7U0FDSDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFD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IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0U2VuZGVyVGV4dE1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgbGlua1ByZXZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGlua1RpdGxlOiBzdHJpbmc7XG4gIGxpbmtEZXNjcmlwdGlvbjogc3RyaW5nO1xuICBsaW5rVXJsOiBzdHJpbmc7XG4gIGxpbmtUZXh0OiBzdHJpbmc7XG4gIGxpbmtJbWFnZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uID0gW107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja0xpbmtQcmV2aWV3KCk7XG4gICAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgICAgZW51bXMuUkVBQ1RJT05TXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBJZiBleHRlbnNpb24gaGFzIGVuYWJsZWQgTGlua1ByZXZpZXdcbiAgICovXG4gIGNoZWNrTGlua1ByZXZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KGVudW1zLk1FVEFEQVRBKSkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMubWVzc2FnZURldGFpbHNbZW51bXMuTUVUQURBVEFdO1xuICAgICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW2VudW1zLklOSkVDVEVEXTtcbiAgICAgICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLkVYVEVOU0lPTlMpKSB7XG4gICAgICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W2VudW1zLkVYVEVOU0lPTlNdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QgJiZcbiAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoZW51bXMuTElOS19QUkVWSUVXKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgbGlua1ByZXZpZXdPYmplY3QgPSBleHRlbnNpb25zT2JqZWN0W2VudW1zLkxJTktfUFJFVklFV107XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0ICYmXG4gICAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLkxJTktTKSAmJlxuICAgICAgICAgICAgICBsaW5rUHJldmlld09iamVjdFtlbnVtcy5MSU5LU10ubGVuZ3RoXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldyA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbnN0IGxpbmtPYmplY3QgPSBsaW5rUHJldmlld09iamVjdFtlbnVtcy5MSU5LU11bMF07XG4gICAgICAgICAgICAgIHRoaXMubGlua1RpdGxlID0gbGlua09iamVjdC50aXRsZTtcbiAgICAgICAgICAgICAgdGhpcy5saW5rRGVzY3JpcHRpb24gPSBsaW5rT2JqZWN0LmRlc2NyaXB0aW9uO1xuXG4gICAgICAgICAgICAgIGlmIChsaW5rT2JqZWN0LnVybCAhPT0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtVcmwgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLmRhdGEudGV4dDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtVcmwgPSBsaW5rT2JqZWN0LnVybDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubGlua0ltYWdlID0gbGlua09iamVjdC5pbWFnZTtcbiAgICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IC8oaHR0cDp8aHR0cHM6KT9cXC9cXC8od3d3XFwuKT8oeW91dHViZS5jb218eW91dHUuYmUpKFxcUyspPy87XG4gICAgICAgICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gbGlua09iamVjdFtcInVybFwiXS5tYXRjaChwYXR0ZXJuKVxuICAgICAgICAgICAgICAgID8gQ09NRVRDSEFUX0NPTlNUQU5UUy5WSUVXX09OX1lPVVRVQkVcbiAgICAgICAgICAgICAgICA6IENPTUVUQ0hBVF9DT05TVEFOVFMuVklTSVQ7XG4gICAgICAgICAgICAgIHRoaXMubGlua1RleHQgPSBsaW5rVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==