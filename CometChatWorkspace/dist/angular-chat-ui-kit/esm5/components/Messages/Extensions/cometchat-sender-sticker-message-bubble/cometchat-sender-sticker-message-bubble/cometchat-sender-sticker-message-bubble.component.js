/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFckU7SUFxQkU7UUFkUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUduQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1FBSXZCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7O0lBRWhCLGtFQUFXOzs7O0lBQVgsVUFBWSxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzVCLElBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsYUFBYTtnQkFDdEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxFQUNyQzs7b0JBQ00sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3JELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDOUIsQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELCtEQUFROzs7SUFBUjs7WUFDTSxXQUFXLEdBQUcsSUFBSTtRQUN0QixJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQ3JEO1lBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsRCxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7b0JBQzNELENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7YUFDM0M7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7SUFDSixDQUFDOzs7OztJQUNELG9FQUFhOzs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztvQkFDbkQseWlDQUF1RTs7aUJBRXhFOzs7OztpQ0FHRSxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FFTCxLQUFLO2tDQUVMLE1BQU07O0lBOENULG1EQUFDO0NBQUEsQUEzREQsSUEyREM7U0F0RFksNENBQTRDOzs7SUFFdkQsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLG9FQUFzQjs7SUFFdEIsc0VBQStCOztJQUUvQix1RUFBa0U7O0lBRWxFLG1FQUF1Qjs7SUFDdkIsK0RBQVE7O0lBQ1Isa0VBQW1COztJQUNuQixtRUFBb0I7O0lBQ3BCLHFFQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNlbmRlclN0aWNrZXJNZXNzYWdlQnViYmxlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtZXNzYWdlRnJvbSA9IFwic2VuZGVyXCI7XG4gIG1lc3NhZ2U7XG4gIHN0aWNrZXJVcmw6IHN0cmluZztcbiAgc3RpY2tlck5hbWU6IHN0cmluZztcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0ucHJldmlvdXNWYWx1ZSAhPT1cbiAgICAgICAgY2hhbmdlW1wiTWVzc2FnZURldGFpbHNcIl0uY3VycmVudFZhbHVlXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuTWVzc2FnZURldGFpbHMsIHtcbiAgICAgICAgICBtZXNzYWdlRnJvbTogdGhpcy5tZXNzYWdlRnJvbSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMgPSBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBzdGlja2VyRGF0YSA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcImRhdGFcIikgJiZcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5oYXNPd25Qcm9wZXJ0eShcImN1c3RvbURhdGFcIilcbiAgICApIHtcbiAgICAgIHN0aWNrZXJEYXRhID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmN1c3RvbURhdGE7XG4gICAgICBpZiAoc3RpY2tlckRhdGEuaGFzT3duUHJvcGVydHkoXCJzdGlja2VyX3VybFwiKSkge1xuICAgICAgICB0aGlzLnN0aWNrZXJOYW1lID0gc3RpY2tlckRhdGEuaGFzT3duUHJvcGVydHkoXCJzdGlja2VyX25hbWVcIilcbiAgICAgICAgICA/IHN0aWNrZXJEYXRhLnN0aWNrZXJfbmFtZVxuICAgICAgICAgIDogXCJTdGlja2VyXCI7XG4gICAgICAgIHRoaXMuc3RpY2tlclVybCA9IHN0aWNrZXJEYXRhLnN0aWNrZXJfdXJsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcbiAgfVxuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19