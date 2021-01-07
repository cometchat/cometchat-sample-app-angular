/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
var CometchatSenderStickerMessageBubbleComponent = /** @class */ (function () {
    function CometchatSenderStickerMessageBubbleComponent() {
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
    CometchatSenderStickerMessageBubbleComponent.prototype.ngOnChanges = /**
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
    CometchatSenderStickerMessageBubbleComponent.prototype.ngOnInit = /**
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
    };
    /**
     * @param {?} action
     * @return {?}
     */
    CometchatSenderStickerMessageBubbleComponent.prototype.actionHandler = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatSenderStickerMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sender-sticker-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageImgWrapper\">\n      <!--sticker img-->\n      <img [src]=\"stickerUrl\" [alt]=\"stickerName\" loading=\"lazy\" />\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageImgWrapper{display:inline-block;align-self:flex-end;max-width:128px;height:128px;cursor:pointer;flex-shrink:0}.messageInfoWrapperStyle{display:flex;align-self:flex-end}@media (min-width:320px) and (max-width:767px){.messageImgWrapper{max-width:128px;height:128px;padding:2px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSenderStickerMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatSenderStickerMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatSenderStickerMessageBubbleComponent;
}());
export { CometchatSenderStickerMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RTtJQXFCRTtRQWRTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsZ0JBQVcsR0FBRyxRQUFRLENBQUM7UUFJdkIsa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFFaEIsQ0FBQzs7Ozs7SUFFaEIsa0VBQVc7Ozs7SUFBWCxVQUFZLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDNUIsSUFDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhO2dCQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQ3JDOztvQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM5QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsK0RBQVE7OztJQUFSOztZQUNNLFdBQVcsR0FBRyxJQUFJO1FBQ3RCLElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFDckQ7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xELElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztvQkFDM0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZO29CQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQzthQUMzQztTQUNGO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsV0FBVyxDQUNaLENBQUM7SUFDSixDQUFDOzs7OztJQUNELG9FQUFhOzs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztvQkFDbkQseWlDQUF1RTs7aUJBRXhFOzs7OztpQ0FHRSxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FFTCxLQUFLO2tDQUVMLE1BQU07O0lBOENULG1EQUFDO0NBQUEsQUEzREQsSUEyREM7U0F0RFksNENBQTRDOzs7SUFFdkQsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLG9FQUFzQjs7SUFFdEIsc0VBQStCOztJQUUvQix1RUFBa0U7O0lBRWxFLG1FQUF1Qjs7SUFDdkIsK0RBQVE7O0lBQ1Isa0VBQW1COztJQUNuQixtRUFBb0I7O0lBQ3BCLHFFQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U2VuZGVyU3RpY2tlck1lc3NhZ2VCdWJibGVDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1lc3NhZ2VGcm9tID0gXCJzZW5kZXJcIjtcbiAgbWVzc2FnZTtcbiAgc3RpY2tlclVybDogc3RyaW5nO1xuICBzdGlja2VyTmFtZTogc3RyaW5nO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXSkge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICBjaGFuZ2VbXCJNZXNzYWdlRGV0YWlsc1wiXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5NZXNzYWdlRGV0YWlscywge1xuICAgICAgICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IHN0aWNrZXJEYXRhID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSAmJlxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmhhc093blByb3BlcnR5KFwiY3VzdG9tRGF0YVwiKVxuICAgICkge1xuICAgICAgc3RpY2tlckRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuY3VzdG9tRGF0YTtcbiAgICAgIGlmIChzdGlja2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShcInN0aWNrZXJfdXJsXCIpKSB7XG4gICAgICAgIHRoaXMuc3RpY2tlck5hbWUgPSBzdGlja2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShcInN0aWNrZXJfbmFtZVwiKVxuICAgICAgICAgID8gc3RpY2tlckRhdGEuc3RpY2tlcl9uYW1lXG4gICAgICAgICAgOiBcIlN0aWNrZXJcIjtcbiAgICAgICAgdGhpcy5zdGlja2VyVXJsID0gc3RpY2tlckRhdGEuc3RpY2tlcl91cmw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFwicmVhY3Rpb25zXCJcbiAgICApO1xuICB9XG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=