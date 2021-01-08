/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
export class CometchatSenderStickerMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = "sender";
        this.checkReaction = false;
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
}
CometchatSenderStickerMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-sticker-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageImgWrapper\">\n      <!--sticker img-->\n      <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageImgWrapper{display:inline-block;align-self:flex-end;max-width:128px;height:128px;cursor:pointer;flex-shrink:0}.messageInfoWrapperStyle{display:flex;align-self:flex-end}@media (min-width:320px) and (max-width:767px){.messageImgWrapper{max-width:128px;height:128px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometchatSenderStickerMessageBubbleComponent.ctorParameters = () => [];
CometchatSenderStickerMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.stickerUrl;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.stickerName;
    /** @type {?} */
    CometchatSenderStickerMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFPckUsTUFBTSxPQUFPLDRDQUE0QztJQWdCdkQ7UUFkUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1FBSXZCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzVCLElBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsYUFBYTtnQkFDdEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxFQUNyQzs7c0JBQ00sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3JELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDOUIsQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7O1lBQ0YsV0FBVyxHQUFHLElBQUk7UUFDdEIsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUNyRDtZQUNBLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEQsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO29CQUMzRCxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVk7b0JBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2FBQzNDO1NBQ0Y7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixlQUFlLENBQUMsU0FBUyxDQUMxQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFDRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUExREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELHlpQ0FBdUU7O2FBRXhFOzs7Ozs2QkFHRSxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFOUCxzRUFBK0I7O0lBQy9CLG1FQUE0Qjs7SUFDNUIsb0VBQXNCOztJQUV0QixzRUFBK0I7O0lBRS9CLHVFQUFrRTs7SUFFbEUsbUVBQXVCOztJQUN2QiwrREFBUTs7SUFDUixrRUFBbUI7O0lBQ25CLG1FQUFvQjs7SUFDcEIscUVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U2VuZGVyU3RpY2tlck1lc3NhZ2VCdWJibGVDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VGcm9tID0gXCJzZW5kZXJcIjtcbiAgbWVzc2FnZTtcbiAgc3RpY2tlclVybDogc3RyaW5nO1xuICBzdGlja2VyTmFtZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXSkge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5NZXNzYWdlRGV0YWlscywge1xuICAgICAgICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IHN0aWNrZXJEYXRhID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSAmJlxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmhhc093blByb3BlcnR5KFwiY3VzdG9tRGF0YVwiKVxuICAgICkge1xuICAgICAgc3RpY2tlckRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuY3VzdG9tRGF0YTtcbiAgICAgIGlmIChzdGlja2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShcInN0aWNrZXJfdXJsXCIpKSB7XG4gICAgICAgIHRoaXMuc3RpY2tlck5hbWUgPSBzdGlja2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShcInN0aWNrZXJfbmFtZVwiKVxuICAgICAgICAgID8gc3RpY2tlckRhdGEuc3RpY2tlcl9uYW1lXG4gICAgICAgICAgOiBcIlN0aWNrZXJcIjtcbiAgICAgICAgdGhpcy5zdGlja2VyVXJsID0gc3RpY2tlckRhdGEuc3RpY2tlcl91cmw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuICB9XG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=