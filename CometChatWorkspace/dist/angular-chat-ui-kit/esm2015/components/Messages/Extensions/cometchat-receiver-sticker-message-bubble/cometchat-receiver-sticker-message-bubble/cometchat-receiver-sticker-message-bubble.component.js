/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
export class CometchatReceiverStickerMessageBubbleComponent {
    constructor() {
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
    ngOnChanges(change) {
        if (change["MessageDetails"]) {
            if (change["MessageDetails"].previousValue !==
                change["MessageDetails"].currentValue) {
                /** @type {?} */
                const message = Object.assign({}, this.MessageDetails, {
                    messageFrom: this.messageFrom,
                });
                this.MessageDetails = message;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            if (!this.MessageDetails.sender.avatar) {
                /** @type {?} */
                const uid = this.MessageDetails.sender.getUid();
                /** @type {?} */
                const char = this.MessageDetails.sender
                    .getName()
                    .charAt(0)
                    .toUpperCase();
                // this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
            }
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.getSticker();
    }
    /**
     * Get Sticker Details
     * @return {?}
     */
    getSticker() {
        /** @type {?} */
        let stickerData = null;
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
CometchatReceiverStickerMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-sticker-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n\n    <div class=\"messageDetailStyle\">\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\">\n          <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:128px;height:128px;cursor:pointer}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{max-width:128px;height:128px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometchatReceiverStickerMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverStickerMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQU9yRSxNQUFNLE9BQU8sOENBQThDO0lBd0J6RDtRQXRCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFdBQU0sR0FBRyxJQUFJLENBQUM7O1FBRWQsU0FBSSxHQUFXLElBQUksQ0FBQzs7O1FBR3BCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGdCQUFXLEdBQUcsVUFBVSxDQUFDO0lBRVYsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDNUIsSUFDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhO2dCQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQ3JDOztzQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM5QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7UUFFRjs7V0FFRztRQUNILElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O3NCQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztzQkFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTtxQkFDcEMsT0FBTyxFQUFFO3FCQUNULE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ1QsV0FBVyxFQUFFO2dCQUNoQix3RUFBd0U7YUFDekU7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUtELFVBQVU7O1lBQ0osV0FBVyxHQUFHLElBQUk7UUFDdEIsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUNyRDtZQUNBLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEQsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO29CQUMzRCxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVk7b0JBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2FBQzNDO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFoR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQ0FBMkM7Z0JBQ3JELDZzREFBeUU7O2FBRTFFOzs7Ozs2QkFHRSxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFOUCx3RUFBK0I7O0lBQy9CLHFFQUE0Qjs7SUFDNUIsc0VBQXNCOztJQUV0Qix3RUFBK0I7O0lBRS9CLHlFQUFrRTs7SUFFbEUsZ0VBQWM7O0lBRWQsOERBQW9COztJQUdwQix1RUFBK0I7O0lBRS9CLHFFQUFvQjs7SUFDcEIsb0VBQW1COztJQUVuQix1RUFBK0I7O0lBRS9CLHFFQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyU3RpY2tlck1lc3NhZ2VCdWJibGVDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGF2YXRhciA9IG51bGw7XG4gIC8vU2V0cyBVc2VybmFtZSBvZiBBdmF0YXJcbiAgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgLy9JZiBHcm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgLy9JZiBHcm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgYXZhdGFySWZHcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHN0aWNrZXJOYW1lOiBzdHJpbmc7XG4gIHN0aWNrZXJVcmw6IHN0cmluZztcblxuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWVzc2FnZUZyb20gPSBcInJlY2VpdmVyXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXSkge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5NZXNzYWdlRGV0YWlscywge1xuICAgICAgICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiAgSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICAgKi9cbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5yZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgdGhpcy5hdmF0YXJJZkdyb3VwID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXIpIHtcbiAgICAgICAgY29uc3QgdWlkID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuZ2V0VWlkKCk7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlclxuICAgICAgICAgIC5nZXROYW1lKClcbiAgICAgICAgICAuY2hhckF0KDApXG4gICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIC8vIHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLnNldEF2YXRhcihTdmdBdmF0YXIuZ2V0QXZhdGFyKHVpZCwgY2hhcikpO1xuICAgICAgfVxuICAgICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyO1xuICAgIH1cbiAgICB0aGlzLmdldFN0aWNrZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgU3RpY2tlciBEZXRhaWxzXG4gICAqL1xuICBnZXRTdGlja2VyKCkge1xuICAgIGxldCBzdGlja2VyRGF0YSA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcImRhdGFcIikgJiZcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5oYXNPd25Qcm9wZXJ0eShcImN1c3RvbURhdGFcIilcbiAgICApIHtcbiAgICAgIHN0aWNrZXJEYXRhID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmN1c3RvbURhdGE7XG4gICAgICBpZiAoc3RpY2tlckRhdGEuaGFzT3duUHJvcGVydHkoXCJzdGlja2VyX3VybFwiKSkge1xuICAgICAgICB0aGlzLnN0aWNrZXJOYW1lID0gc3RpY2tlckRhdGEuaGFzT3duUHJvcGVydHkoXCJzdGlja2VyX25hbWVcIilcbiAgICAgICAgICA/IHN0aWNrZXJEYXRhLnN0aWNrZXJfbmFtZVxuICAgICAgICAgIDogXCJTdGlja2VyXCI7XG4gICAgICAgIHRoaXMuc3RpY2tlclVybCA9IHN0aWNrZXJEYXRhLnN0aWNrZXJfdXJsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==