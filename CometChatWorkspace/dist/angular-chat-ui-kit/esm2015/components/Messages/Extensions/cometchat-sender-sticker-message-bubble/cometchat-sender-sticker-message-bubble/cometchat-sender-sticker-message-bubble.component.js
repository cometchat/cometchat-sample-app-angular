/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1zdGlja2VyLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU96RSxNQUFNLE9BQU8sNENBQTRDO0lBZ0J2RDtRQWRTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsZ0JBQVcsR0FBRyxRQUFRLENBQUM7UUFJdkIsa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFFaEIsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDNUIsSUFDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhO2dCQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEVBQ3JDOztzQkFDTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUM5QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTs7WUFDRixXQUFXLEdBQUcsSUFBSTtRQUN0QixJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQ3JEO1lBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsRCxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7b0JBQzNELENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7YUFDM0M7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFDRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUExREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELHlpQ0FBdUU7O2FBRXhFOzs7Ozs2QkFHRSxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFOUCxzRUFBK0I7O0lBQy9CLG1FQUE0Qjs7SUFDNUIsb0VBQXNCOztJQUV0QixzRUFBK0I7O0lBRS9CLHVFQUFrRTs7SUFFbEUsbUVBQXVCOztJQUN2QiwrREFBUTs7SUFDUixrRUFBbUI7O0lBQ25CLG1FQUFvQjs7SUFDcEIscUVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLXN0aWNrZXItbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItc3RpY2tlci1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTZW5kZXJTdGlja2VyTWVzc2FnZUJ1YmJsZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWVzc2FnZUZyb20gPSBcInNlbmRlclwiO1xuICBtZXNzYWdlO1xuICBzdGlja2VyVXJsOiBzdHJpbmc7XG4gIHN0aWNrZXJOYW1lOiBzdHJpbmc7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgICAgICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzID0gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgc3RpY2tlckRhdGEgPSBudWxsO1xuICAgIGlmIChcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJkYXRhXCIpICYmXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuaGFzT3duUHJvcGVydHkoXCJjdXN0b21EYXRhXCIpXG4gICAgKSB7XG4gICAgICBzdGlja2VyRGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5jdXN0b21EYXRhO1xuICAgICAgaWYgKHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl91cmxcIikpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyTmFtZSA9IHN0aWNrZXJEYXRhLmhhc093blByb3BlcnR5KFwic3RpY2tlcl9uYW1lXCIpXG4gICAgICAgICAgPyBzdGlja2VyRGF0YS5zdGlja2VyX25hbWVcbiAgICAgICAgICA6IFwiU3RpY2tlclwiO1xuICAgICAgICB0aGlzLnN0aWNrZXJVcmwgPSBzdGlja2VyRGF0YS5zdGlja2VyX3VybDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgXCJyZWFjdGlvbnNcIlxuICAgICk7XG4gIH1cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==