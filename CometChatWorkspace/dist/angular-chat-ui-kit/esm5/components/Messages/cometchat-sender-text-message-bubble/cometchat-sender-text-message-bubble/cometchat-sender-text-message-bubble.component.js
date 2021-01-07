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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci10ZXh0LW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBb0JFO1FBZFMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUU1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUNoQixDQUFDOzs7O0lBRWhCLDREQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILG9FQUFnQjs7OztJQUFoQjtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7O2dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFROztnQkFDdkMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDNUMsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTs7b0JBQzNELGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JELElBQ0UsZ0JBQWdCO29CQUNoQixnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQy9DOzt3QkFDTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7b0JBQzFELElBQ0UsaUJBQWlCO3dCQUNqQixpQkFBaUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO3dCQUN6QyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQ2pDO3dCQUNBLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs0QkFDbEIsVUFBVSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7d0JBRTlDLElBQUksVUFBVSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUM5Qzs2QkFBTTs0QkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7eUJBQy9CO3dCQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQzs7NEJBQzVCLE9BQU8sR0FBRyx5REFBeUQ7OzRCQUNuRSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7NEJBQy9DLENBQUMsQ0FBQyxlQUFlLENBQUMsZUFBZTs0QkFDakMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLO3dCQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDekIscUNBQXFDO3FCQUN0QztpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpRUFBYTs7Ozs7SUFBYixVQUFjLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBL0VGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCw0ckVBQW9FOztpQkFFckU7Ozs7O2lDQUVFLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07OEJBRU4sS0FBSzs7SUFxRVIsZ0RBQUM7Q0FBQSxBQWhGRCxJQWdGQztTQTNFWSx5Q0FBeUM7OztJQUNwRCxtRUFBK0I7O0lBQy9CLG1FQUErQjs7SUFDL0IsaUVBQXNCOztJQUN0QixvRUFBa0U7O0lBRWxFLGdFQUE0Qjs7SUFFNUIsZ0VBQTZCOztJQUM3Qiw4REFBa0I7O0lBQ2xCLG9FQUF3Qjs7SUFDeEIsNERBQWdCOztJQUNoQiw2REFBaUI7O0lBQ2pCLDhEQUFrQjs7SUFDbEIsa0VBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLXRleHQtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItdGV4dC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTZW5kZXJUZXh0TWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcblxuICBsaW5rUHJldmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICBsaW5rVGl0bGU6IHN0cmluZztcbiAgbGlua0Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGxpbmtVcmw6IHN0cmluZztcbiAgbGlua1RleHQ6IHN0cmluZztcbiAgbGlua0ltYWdlOiBzdHJpbmc7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tMaW5rUHJldmlldygpO1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFwicmVhY3Rpb25zXCJcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIElmIGV4dGVuc2lvbiBoYXMgZW5hYmxlZCBMaW5rUHJldmlld1xuICAgKi9cbiAgY2hlY2tMaW5rUHJldmlldygpIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGE7XG4gICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdCAmJlxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJsaW5rLXByZXZpZXdcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbGlua1ByZXZpZXdPYmplY3QgPSBleHRlbnNpb25zT2JqZWN0W1wibGluay1wcmV2aWV3XCJdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxpbmtQcmV2aWV3T2JqZWN0ICYmXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdC5oYXNPd25Qcm9wZXJ0eShcImxpbmtzXCIpICYmXG4gICAgICAgICAgICBsaW5rUHJldmlld09iamVjdFtcImxpbmtzXCJdLmxlbmd0aFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBsaW5rT2JqZWN0ID0gbGlua1ByZXZpZXdPYmplY3RbXCJsaW5rc1wiXVswXTtcbiAgICAgICAgICAgIHRoaXMubGlua1RpdGxlID0gbGlua09iamVjdC50aXRsZTtcbiAgICAgICAgICAgIHRoaXMubGlua0Rlc2NyaXB0aW9uID0gbGlua09iamVjdC5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgaWYgKGxpbmtPYmplY3QudXJsICE9PSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudGV4dCkge1xuICAgICAgICAgICAgICB0aGlzLmxpbmtVcmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubGlua1VybCA9IGxpbmtPYmplY3QudXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxpbmtJbWFnZSA9IGxpbmtPYmplY3QuaW1hZ2U7XG4gICAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gLyhodHRwOnxodHRwczopP1xcL1xcLyh3d3dcXC4pPyh5b3V0dWJlLmNvbXx5b3V0dS5iZSkoXFxTKyk/LztcbiAgICAgICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gbGlua09iamVjdFtcInVybFwiXS5tYXRjaChwYXR0ZXJuKVxuICAgICAgICAgICAgICA/IFNUUklOR19NRVNTQUdFUy5WSUVXX09OX1lPVVRVQkVcbiAgICAgICAgICAgICAgOiBTVFJJTkdfTUVTU0FHRVMuVklTSVQ7XG4gICAgICAgICAgICB0aGlzLmxpbmtUZXh0ID0gbGlua1RleHQ7XG4gICAgICAgICAgICAvLyBjb25zdCBhY3R1YWxNZXNzYWdlID0gbWVzc2FnZVRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19