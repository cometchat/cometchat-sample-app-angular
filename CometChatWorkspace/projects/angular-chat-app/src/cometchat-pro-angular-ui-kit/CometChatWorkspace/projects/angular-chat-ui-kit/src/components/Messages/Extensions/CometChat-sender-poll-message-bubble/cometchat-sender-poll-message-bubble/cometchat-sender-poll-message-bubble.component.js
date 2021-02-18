/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../../utils/common";
import * as enums from "../../../../../utils/enums";
export class CometChatSenderPollMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.isPollExtensionEnabled = false;
        this.checkReaction = [];
        this.pollExtensionData = null;
        this.pollOptions = [];
        this.totalVotes = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkPollExtension();
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Displays the poll component , only if it is enabled
     * @return {?}
     */
    checkPollExtension() {
        try {
            if (this.messageDetails.hasOwnProperty(enums.METADATA)) {
                if (this.messageDetails[enums.METADATA].hasOwnProperty(enums.INJECTED)) {
                    if (this.messageDetails[enums.METADATA][enums.INJECTED].hasOwnProperty(enums.EXTENSIONS)) {
                        if (this.messageDetails[enums.METADATA][enums.INJECTED][enums.EXTENSIONS].hasOwnProperty(enums.POLLS)) {
                            this.isPollExtensionEnabled = true;
                            this.setPollExtensionData();
                        }
                    }
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets Poll Data
     * @return {?}
     */
    setPollExtensionData() {
        try {
            this.pollExtensionData = this.messageDetails[enums.METADATA][enums.INJECTED][enums.EXTENSIONS][enums.POLLS];
            this.totalVotes = this.pollExtensionData.results.total;
            /** @type {?} */
            let optionKeys = Object.keys(this.pollExtensionData.options);
            /** @type {?} */
            let optionList = [];
            optionKeys.forEach((/**
             * @param {?} currentItem
             * @return {?}
             */
            (currentItem) => {
                /** @type {?} */
                const optionData = this.pollExtensionData.results.options[currentItem];
                /** @type {?} */
                const vote = optionData[enums.COUNT];
                /** @type {?} */
                let calculatedPercent = 0;
                if (this.totalVotes > 0) {
                    calculatedPercent = Math.round((vote / this.totalVotes) * 100);
                }
                optionList.push({
                    id: currentItem,
                    percent: calculatedPercent + "%",
                    text: this.pollExtensionData.options[currentItem],
                });
            }));
            this.pollOptions = [...optionList];
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
CometChatSenderPollMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-poll-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\">\n      <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n      <ul class=\"pollAnswerStyle\">\n        <!-- Options -->\n        <li *ngFor=\"let option of pollOptions\">\n          <div\n            class=\"pollPercentStyle\"\n            [ngStyle]=\"{ width: option?.percent }\"\n          ></div>\n          <div class=\"answerWrapperStyle\">\n            <span>{{ option?.percent }}</span>\n            <p>{{ option?.text }}</p>\n          </div>\n        </li>\n        <!-- Options -->\n      </ul>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total === 1\">\n        {{ pollExtensionData?.results?.total }} vote\n      </p>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total !== 1\">\n        {{ pollExtensionData?.results?.total }} votes\n      </p>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0;width:100%}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
            }] }
];
/** @nocollapse */
CometChatSenderPollMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderPollMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.isPollExtensionEnabled;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.pollExtensionData;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.pollOptions;
    /** @type {?} */
    CometChatSenderPollMessageBubbleComponent.prototype.totalVotes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvQ29tZXRDaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLE1BQU0sR0FDUCxNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sS0FBSyxLQUFLLE1BQU0sNEJBQTRCLENBQUM7QUFPcEQsTUFBTSxPQUFPLHlDQUF5QztJQWdCcEQ7UUFmUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUdyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLENBQUMsQ0FBQztJQUVBLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixLQUFLLENBQUMsU0FBUyxD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QUM7U0FDZjtJQUNILENBQUM7OztZQWpIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsd3lEQUFvRTs7YUFFckU7Ozs7OzZCQUVFLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUVMLE1BQU07MEJBRU4sS0FBSzs7OztJQU5OLG1FQUErQjs7SUFDL0IsbUVBQStCOztJQUMvQixpRUFBc0I7O0lBRXRCLG9FQUFrRTs7SUFFbEUsZ0VBQTRCOztJQUU1QiwyRUFBd0M7O0lBQ3hDLGtFQUFtQjs7SUFFbkIsc0VBQXlCOztJQUN6QixnRUFBaUI7O0lBQ2pCLCtEQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFNlbmRlclBvbGxNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uID0gW107XG5cbiAgcG9sbEV4dGVuc2lvbkRhdGEgPSBudWxsO1xuICBwb2xsT3B0aW9ucyA9IFtdO1xuICB0b3RhbFZvdGVzID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2hlY2tQb2xsRXh0ZW5zaW9uKCk7XG4gICAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgICAgZW51bXMuUkVBQ1RJT05TXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aGUgcG9sbCBjb21wb25lbnQgLCBvbmx5IGlmIGl0IGlzIGVuYWJsZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjaGVja1BvbGxFeHRlbnNpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KGVudW1zLk1FVEFEQVRBKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlsc1tlbnVtcy5NRVRBREFUQV0uaGFzT3duUHJvcGVydHkoZW51bXMuSU5KRUNURUQpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZURldGFpbHNbZW51bXMuTUVUQURBVEFdW2VudW1zLklOSkVDVEVEXS5oYXNPd25Qcm9wZXJ0eShcbiAgICAgICAgICAgICAgZW51bXMuRVhURU5TSU9OU1xuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzW2VudW1zLk1FVEFEQVRBXVtlbnVtcy5JTkpFQ1RFRF1bXG4gICAgICAgICAgICAgICAgZW51bXMuRVhURU5TSU9OU1xuICAgICAgICAgICAgICBdLmhhc093blByb3BlcnR5KGVudW1zLlBPTExTKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuc2V0UG9sbEV4dGVuc2lvbkRhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBQb2xsIERhdGFcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRQb2xsRXh0ZW5zaW9uRGF0YSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YSA9IHRoaXMubWVzc2FnZURldGFpbHNbZW51bXMuTUVUQURBVEFdW1xuICAgICAgICBlbnVtcy5JTkpFQ1RFRFxuICAgICAgXVtlbnVtcy5FWFRFTlNJT05TXVtlbnVtcy5QT0xMU107XG5cbiAgICAgIHRoaXMudG90YWxWb3RlcyA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEucmVzdWx0cy50b3RhbDtcblxuICAgICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyh0aGlzLnBvbGxFeHRlbnNpb25EYXRhLm9wdGlvbnMpO1xuXG4gICAgICBsZXQgb3B0aW9uTGlzdCA9IFtdO1xuICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKChjdXJyZW50SXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25EYXRhID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5yZXN1bHRzLm9wdGlvbnNbY3VycmVudEl0ZW1dO1xuICAgICAgICBjb25zdCB2b3RlID0gb3B0aW9uRGF0YVtlbnVtcy5DT1VOVF07XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUGVyY2VudCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudG90YWxWb3RlcyA+IDApIHtcbiAgICAgICAgICBjYWxjdWxhdGVkUGVyY2VudCA9IE1hdGgucm91bmQoKHZvdGUgLyB0aGlzLnRvdGFsVm90ZXMpICogMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbkxpc3QucHVzaCh7XG4gICAgICAgICAgaWQ6IGN1cnJlbnRJdGVtLFxuICAgICAgICAgIHBlcmNlbnQ6IGNhbGN1bGF0ZWRQZXJjZW50ICsgXCIlXCIsXG4gICAgICAgICAgdGV4dDogdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5vcHRpb25zW2N1cnJlbnRJdGVtXSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5wb2xsT3B0aW9ucyA9IFsuLi5vcHRpb25MaXN0XTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==