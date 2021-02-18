/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../../utils/common";
import * as enums from "../../../../../utils/enums";
export class CometChatSenderStickerMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = enums.SENDER;
        this.checkReaction = [];
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
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the events emitted by child components
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
CometChatSenderStickerMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-sticker-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageImgWrapper\">\n      <!--sticker img-->\n      <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageImgWrapper{display:inline-block;align-self:flex-end;max-width:128px;height:128px;cursor:pointer;flex-shrink:0}.messageInfoWrapperStyle{display:flex;align-self:flex-end}@media (min-width:320px) and (max-width:767px){.messageImgWrapper{max-width:128px;height:128px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometChatSenderStickerMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderStickerMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.stickerUrl;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.stickerName;
    /** @type {?} */
    CometChatSenderStickerMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvQ29tZXRDaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLE1BQU0sR0FDUCxNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sS0FBSyxLQUFLLE1BQU0sNEJBQTRCLENBQUM7QUFPcEQsTUFBTSxPQUFPLDRDQUE0QztJQWdCdkQ7UUFkUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUkzQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUVKLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJO1lBQ0YsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNqQyxJQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYTtvQkFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLEVBQzFDOzswQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTt3QkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO3FCQUM5QixDQUFDO29CQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2lCQUMvQjthQUNGO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJOztnQkFDRSxXQUFXLEdBQUcsSUFBSTtZQUN0QixJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzFEO2dCQUNBLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2xELElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO3dCQUMvRCxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVk7d0JBQzFCLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7aUJBQzNDO2FBQ0Y7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixLQUFLLENBQUMsU0FBUyxDQUNoQixDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBS0QsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7OztZQTFFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztnQkFDbkQseWlDQUF1RTs7YUFFeEU7Ozs7OzZCQUdFLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzZCQUVMLEtBQUs7OEJBRUwsTUFBTTs7OztJQU5QLHNFQUErQjs7SUFDL0IsbUVBQTRCOztJQUM1QixvRUFBc0I7O0lBRXRCLHNFQUErQjs7SUFFL0IsdUVBQWtFOztJQUVsRSxtRUFBMkI7O0lBQzNCLCtEQUFROztJQUNSLGtFQUFtQjs7SUFDbkIsbUVBQW9COztJQUNwQixxRUFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFNlbmRlclN0aWNrZXJNZXNzYWdlQnViYmxlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtZXNzYWdlRnJvbSA9IGVudW1zLlNFTkRFUjtcbiAgbWVzc2FnZTtcbiAgc3RpY2tlclVybDogc3RyaW5nO1xuICBzdGlja2VyTmFtZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2hhbmdlW2VudW1zLk1FU1NBR0VfREVUQUlMU10pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5NRVNTQUdFX0RFVEFJTFNdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgICAgY2hhbmdlW2VudW1zLk1FU1NBR0VfREVUQUlMU10uY3VycmVudFZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgICAgICAgICBtZXNzYWdlRnJvbTogdGhpcy5tZXNzYWdlRnJvbSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc3RpY2tlckRhdGEgPSBudWxsO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KGVudW1zLkRBVEEpICYmXG4gICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMuZGF0YS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5DVVNUT01fREFUQSlcbiAgICAgICkge1xuICAgICAgICBzdGlja2VyRGF0YSA9IHRoaXMubWVzc2FnZURldGFpbHMuZGF0YS5jdXN0b21EYXRhO1xuICAgICAgICBpZiAoc3RpY2tlckRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuU1RJQ0tFUl9VUkwpKSB7XG4gICAgICAgICAgdGhpcy5zdGlja2VyTmFtZSA9IHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KGVudW1zLlNUSUNLRVJfTkFNRSlcbiAgICAgICAgICAgID8gc3RpY2tlckRhdGEuc3RpY2tlcl9uYW1lXG4gICAgICAgICAgICA6IGVudW1zLlNUSUNLRVI7XG4gICAgICAgICAgdGhpcy5zdGlja2VyVXJsID0gc3RpY2tlckRhdGEuc3RpY2tlcl91cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBldmVudHMgZW1pdHRlZCBieSBjaGlsZCBjb21wb25lbnRzXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=