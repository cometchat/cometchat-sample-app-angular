/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../../utils/common";
import * as enums from "../../../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverStickerMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.avatar = null;
        this.name = null;
        this.avatarIfGroup = false;
        this.checkReaction = [];
        this.messageFrom = enums.RECEIVER;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.MESSAGE_DETAILS]) {
                if (change[enums.MESSAGE_DETAILS].previousValue !==
                    change[enums.MESSAGE_DETAILS].currentValue) {
                    /** @type {?} */
                    const message = Object.assign({}, this.messageDetails, {
                        messageFrom: this.messageFrom,
                    });
                    this.messageDetails = message;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            /**
             *  If Group then displays Avatar And Name
             */
            if (this.messageDetails.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
                this.avatarIfGroup = true;
                if (!this.messageDetails.sender.avatar) {
                    /** @type {?} */
                    const uid = this.messageDetails.sender.getUid();
                    /** @type {?} */
                    const char = this.messageDetails.sender
                        .getName()
                        .charAt(0)
                        .toUpperCase();
                }
                this.name = this.messageDetails.sender.name;
                this.avatar = this.messageDetails.sender.avatar;
            }
            this.getSticker();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get Sticker Details
     * @return {?}
     */
    getSticker() {
        try {
            /** @type {?} */
            let stickerData = null;
            if (this.messageDetails.hasOwnProperty(enums.DATA) &&
                this.messageDetails.data.hasOwnProperty(enums.CUSTOM_DATA)) {
                stickerData = this.messageDetails.data.customData;
                if (stickerData.hasOwnProperty(enums.STICKER_URL)) {
                    this.stickerName = stickerData.hasOwnProperty(enums.STICKER_NAME)
                        ? stickerData.sticker_name
                        : enums.STICKER;
                    this.stickerUrl = stickerData.sticker_url;
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
CometChatReceiverStickerMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-sticker-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n\n    <div class=\"messageDetailStyle\">\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\">\n          <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:128px;height:128px;cursor:pointer}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{max-width:128px;height:128px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometChatReceiverStickerMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverStickerMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.stickerName;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.stickerUrl;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometChatReceiverStickerMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9Db21ldENoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsTUFBTSxHQUNQLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxLQUFLLEtBQUssTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPaEQsTUFBTSxPQUFPLDhDQUE4QztJQXVCekQ7UUFyQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFHbkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUsvQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixnQkFBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFFN0IsVUFBSyxHQUFXLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRS9CLENBQUM7Ozs7O0lBRWhCLFdBQVcs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LENBQUM7OztZQTlHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJDQUEyQztnQkFDckQsMnNEQUF5RTs7YUFFMUU7Ozs7OzZCQUdFLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzZCQUVMLEtBQUs7OEJBRUwsTUFBTTs7OztJQU5QLHdFQUErQjs7SUFDL0IscUVBQTRCOztJQUM1QixzRUFBc0I7O0lBRXRCLHdFQUErQjs7SUFFL0IseUVBQWtFOztJQUVsRSxnRUFBYzs7SUFDZCw4REFBb0I7O0lBQ3BCLHVFQUErQjs7SUFFL0IscUVBQW9COztJQUNwQixvRUFBbUI7O0lBRW5CLHVFQUFtQjs7SUFFbkIscUVBQTZCOztJQUU3QiwrREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRSZWNlaXZlclN0aWNrZXJNZXNzYWdlQnViYmxlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhdmF0YXIgPSBudWxsO1xuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuICBhdmF0YXJJZkdyb3VwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgc3RpY2tlck5hbWU6IHN0cmluZztcbiAgc3RpY2tlclVybDogc3RyaW5nO1xuXG4gIGNoZWNrUmVhY3Rpb24gPSBbXTtcblxuICBtZXNzYWdlRnJvbSA9IGVudW1zLlJFQ0VJVkVSO1xuXG4gIEdST1VQOiBTdHJpbmcgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuTUVTU0FHRV9ERVRBSUxTXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW2VudW1zLk1FU1NBR0VfREVUQUlMU10ucHJldmlvdXNWYWx1ZSAhPT1cbiAgICAgICAgICBjaGFuZ2VbZW51bXMuTUVTU0FHRV9ERVRBSUxTXS5jdXJyZW50VmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubWVzc2FnZURldGFpbHMsIHtcbiAgICAgICAgICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG5cbiAgICAgIC8qKlxuICAgICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICAgKi9cbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VEZXRhaWxzLnJlY2VpdmVyVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgdGhpcy5hdmF0YXJJZkdyb3VwID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICAgIGNvbnN0IHVpZCA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlclxuICAgICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgICAgLmNoYXJBdCgwKVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgICB9XG4gICAgICB0aGlzLmdldFN0aWNrZXIoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFN0aWNrZXIgRGV0YWlsc1xuICAgKi9cbiAgZ2V0U3RpY2tlcigpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHN0aWNrZXJEYXRhID0gbnVsbDtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5EQVRBKSAmJlxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLmRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuQ1VTVE9NX0RBVEEpXG4gICAgICApIHtcbiAgICAgICAgc3RpY2tlckRhdGEgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLmRhdGEuY3VzdG9tRGF0YTtcbiAgICAgICAgaWYgKHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KGVudW1zLlNUSUNLRVJfVVJMKSkge1xuICAgICAgICAgIHRoaXMuc3RpY2tlck5hbWUgPSBzdGlja2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5TVElDS0VSX05BTUUpXG4gICAgICAgICAgICA/IHN0aWNrZXJEYXRhLnN0aWNrZXJfbmFtZVxuICAgICAgICAgICAgOiBlbnVtcy5TVElDS0VSO1xuICAgICAgICAgIHRoaXMuc3RpY2tlclVybCA9IHN0aWNrZXJEYXRhLnN0aWNrZXJfdXJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=