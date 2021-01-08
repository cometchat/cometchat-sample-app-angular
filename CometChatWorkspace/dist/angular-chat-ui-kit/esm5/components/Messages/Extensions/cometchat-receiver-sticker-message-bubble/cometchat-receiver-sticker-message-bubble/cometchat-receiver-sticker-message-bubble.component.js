/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
var CometchatReceiverStickerMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverStickerMessageBubbleComponent() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.avatar = null;
        //Sets Username of Avatar
        this.name = null;
        //If Group then only show avatar
        //If Group then only show avatar
        this.avatarIfGroup = false;
        this.checkReaction = false;
        this.messageFrom = "receiver";
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatReceiverStickerMessageBubbleComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["MessageDetails"]) {
            if (change["MessageDetails"].previousValue !==
                change["MessageDetails"].currentValue) {
                /** @type {?} */
                var message = Object.assign({}, this.MessageDetails, {
                    messageFrom: this.messageFrom,
                });
                this.MessageDetails = message;
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatReceiverStickerMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            if (!this.MessageDetails.sender.avatar) {
                /** @type {?} */
                var uid = this.MessageDetails.sender.getUid();
                /** @type {?} */
                var char = this.MessageDetails.sender
                    .getName()
                    .charAt(0)
                    .toUpperCase();
            }
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.getSticker();
    };
    /**
     * Get Sticker Details
     */
    /**
     * Get Sticker Details
     * @return {?}
     */
    CometchatReceiverStickerMessageBubbleComponent.prototype.getSticker = /**
     * Get Sticker Details
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stickerData = null;
        if (this.MessageDetails.hasOwnProperty("data") &&
            this.MessageDetails.data.hasOwnProperty("customData")) {
            stickerData = this.MessageDetails.data.customData;
            if (stickerData.hasOwnProperty("sticker_url")) {
                this.stickerName = stickerData.hasOwnProperty("sticker_name")
                    ? stickerData.sticker_name
                    : "Sticker";
                this.stickerUrl = stickerData.sticker_url;
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
    CometchatReceiverStickerMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverStickerMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-sticker-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n\n    <div class=\"messageDetailStyle\">\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\">\n          <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:128px;height:128px;cursor:pointer}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{max-width:128px;height:128px;padding:2px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverStickerMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverStickerMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatReceiverStickerMessageBubbleComponent;
}());
export { CometchatReceiverStickerMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.stickerName;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.stickerUrl;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatReceiverStickerMessageBubbleComponent.prototype.messageFrom;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVyRTtJQTZCRTtRQXRCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFdBQU0sR0FBRyxJQUFJLENBQUM7O1FBRWQsU0FBSSxHQUFXLElBQUksQ0FBQzs7O1FBR3BCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGdCQUFXLEdBQUcsVUFBVSxDQUFDO0lBRVYsQ0FBQzs7Ozs7SUFFaEIsb0VBQVc7Ozs7SUFBWCxVQUFZLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDNUIsSUFDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhO2dCQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQ3JDOztvQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM5QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsaUVBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUVGOztXQUVHO1FBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7b0JBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O29CQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3FCQUNwQyxPQUFPLEVBQUU7cUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDVCxXQUFXLEVBQUU7YUFDakI7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsbUVBQVU7Ozs7SUFBVjs7WUFDTSxXQUFXLEdBQUcsSUFBSTtRQUN0QixJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQ3JEO1lBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsRCxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7b0JBQzNELENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7YUFDM0M7U0FDRjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHNFQUFhOzs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkEvRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELDZzREFBeUU7O2lCQUUxRTs7Ozs7aUNBR0UsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7aUNBRUwsS0FBSztrQ0FFTCxNQUFNOztJQW1GVCxxREFBQztDQUFBLEFBaEdELElBZ0dDO1NBM0ZZLDhDQUE4Qzs7O0lBRXpELHdFQUErQjs7SUFDL0IscUVBQTRCOztJQUM1QixzRUFBc0I7O0lBRXRCLHdFQUErQjs7SUFFL0IseUVBQWtFOztJQUVsRSxnRUFBYzs7SUFFZCw4REFBb0I7O0lBR3BCLHVFQUErQjs7SUFFL0IscUVBQW9COztJQUNwQixvRUFBbUI7O0lBRW5CLHVFQUErQjs7SUFFL0IscUVBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJTdGlja2VyTWVzc2FnZUJ1YmJsZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYXZhdGFyID0gbnVsbDtcbiAgLy9TZXRzIFVzZXJuYW1lIG9mIEF2YXRhclxuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuICAvL0lmIEdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICAvL0lmIEdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICBhdmF0YXJJZkdyb3VwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgc3RpY2tlck5hbWU6IHN0cmluZztcbiAgc3RpY2tlclVybDogc3RyaW5nO1xuXG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlRnJvbSA9IFwicmVjZWl2ZXJcIjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgICAgICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzID0gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqICBJZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgICAqL1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLnJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuXG4gICAgICBpZiAoIXRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICBjb25zdCB1aWQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXRVaWQoKTtcbiAgICAgICAgY29uc3QgY2hhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyXG4gICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgIC5jaGFyQXQoMClcbiAgICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcjtcbiAgICB9XG4gICAgdGhpcy5nZXRTdGlja2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFN0aWNrZXIgRGV0YWlsc1xuICAgKi9cbiAgZ2V0U3RpY2tlcigpIHtcbiAgICBsZXQgc3RpY2tlckRhdGEgPSBudWxsO1xuICAgIGlmIChcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJkYXRhXCIpICYmXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuaGFzT3duUHJvcGVydHkoXCJjdXN0b21EYXRhXCIpXG4gICAgKSB7XG4gICAgICBzdGlja2VyRGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5jdXN0b21EYXRhO1xuICAgICAgaWYgKHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl91cmxcIikpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyTmFtZSA9IHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl9uYW1lXCIpXG4gICAgICAgICAgPyBzdGlja2VyRGF0YS5zdGlja2VyX25hbWVcbiAgICAgICAgICA6IFwiU3RpY2tlclwiO1xuICAgICAgICB0aGlzLnN0aWNrZXJVcmwgPSBzdGlja2VyRGF0YS5zdGlja2VyX3VybDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=