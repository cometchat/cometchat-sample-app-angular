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
                // this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVyRTtJQTZCRTtRQXRCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFdBQU0sR0FBRyxJQUFJLENBQUM7O1FBRWQsU0FBSSxHQUFXLElBQUksQ0FBQzs7O1FBR3BCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGdCQUFXLEdBQUcsVUFBVSxDQUFDO0lBRVYsQ0FBQzs7Ozs7SUFFaEIsb0VBQVc7Ozs7SUFBWCxVQUFZLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDNUIsSUFDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhO2dCQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQ3JDOztvQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM5QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsaUVBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUVGOztXQUVHO1FBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7b0JBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O29CQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3FCQUNwQyxPQUFPLEVBQUU7cUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDVCxXQUFXLEVBQUU7Z0JBQ2hCLHdFQUF3RTthQUN6RTtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxtRUFBVTs7OztJQUFWOztZQUNNLFdBQVcsR0FBRyxJQUFJO1FBQ3RCLElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFDckQ7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xELElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztvQkFDM0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZO29CQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQzthQUMzQztTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsc0VBQWE7Ozs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQWhHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsNnNEQUF5RTs7aUJBRTFFOzs7OztpQ0FHRSxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FFTCxLQUFLO2tDQUVMLE1BQU07O0lBb0ZULHFEQUFDO0NBQUEsQUFqR0QsSUFpR0M7U0E1RlksOENBQThDOzs7SUFFekQsd0VBQStCOztJQUMvQixxRUFBNEI7O0lBQzVCLHNFQUFzQjs7SUFFdEIsd0VBQStCOztJQUUvQix5RUFBa0U7O0lBRWxFLGdFQUFjOztJQUVkLDhEQUFvQjs7SUFHcEIsdUVBQStCOztJQUUvQixxRUFBb0I7O0lBQ3BCLG9FQUFtQjs7SUFFbkIsdUVBQStCOztJQUUvQixxRUFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlclN0aWNrZXJNZXNzYWdlQnViYmxlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzdGlja2VyTmFtZTogc3RyaW5nO1xuICBzdGlja2VyVXJsOiBzdHJpbmc7XG5cbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2VGcm9tID0gXCJyZWNlaXZlclwiO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0ucHJldmlvdXNWYWx1ZSAhPT1cbiAgICAgICAgY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0uY3VycmVudFZhbHVlXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuTWVzc2FnZURldGFpbHMsIHtcbiAgICAgICAgICBtZXNzYWdlRnJvbTogdGhpcy5tZXNzYWdlRnJvbSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMgPSBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICovXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyKSB7XG4gICAgICAgIGNvbnN0IHVpZCA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICBjb25zdCBjaGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXJcbiAgICAgICAgICAuZ2V0TmFtZSgpXG4gICAgICAgICAgLmNoYXJBdCgwKVxuICAgICAgICAgIC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAvLyB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5zZXRBdmF0YXIoU3ZnQXZhdGFyLmdldEF2YXRhcih1aWQsIGNoYXIpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcjtcbiAgICB9XG4gICAgdGhpcy5nZXRTdGlja2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFN0aWNrZXIgRGV0YWlsc1xuICAgKi9cbiAgZ2V0U3RpY2tlcigpIHtcbiAgICBsZXQgc3RpY2tlckRhdGEgPSBudWxsO1xuICAgIGlmIChcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJkYXRhXCIpICYmXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuaGFzT3duUHJvcGVydHkoXCJjdXN0b21EYXRhXCIpXG4gICAgKSB7XG4gICAgICBzdGlja2VyRGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5jdXN0b21EYXRhO1xuICAgICAgaWYgKHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl91cmxcIikpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyTmFtZSA9IHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl9uYW1lXCIpXG4gICAgICAgICAgPyBzdGlja2VyRGF0YS5zdGlja2VyX25hbWVcbiAgICAgICAgICA6IFwiU3RpY2tlclwiO1xuICAgICAgICB0aGlzLnN0aWNrZXJVcmwgPSBzdGlja2VyRGF0YS5zdGlja2VyX3VybDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=