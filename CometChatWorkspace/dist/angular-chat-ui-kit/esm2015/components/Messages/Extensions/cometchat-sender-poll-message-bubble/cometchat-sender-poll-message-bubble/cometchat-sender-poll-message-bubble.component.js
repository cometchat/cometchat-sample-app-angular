/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
export class CometchatSenderPollMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.isPollExtensionEnabled = false;
        this.checkReaction = false;
        this.pollExtensionData = null;
        this.pollOptions = [];
        this.totalVotes = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkPollExtension();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
    }
    /**
     * Displays the poll component , only if it is enabled
     * @return {?}
     */
    checkPollExtension() {
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            if (this.MessageDetails.metadata.hasOwnProperty("@injected")) {
                if (this.MessageDetails.metadata["@injected"].hasOwnProperty("extensions")) {
                    if (this.MessageDetails.metadata["@injected"]["extensions"].hasOwnProperty("polls")) {
                        this.isPollExtensionEnabled = true;
                        this.setPollExtensionData();
                    }
                }
            }
        }
    }
    /**
     * Sets Poll Data
     * @return {?}
     */
    setPollExtensionData() {
        this.pollExtensionData = this.MessageDetails.metadata["@injected"]["extensions"]["polls"];
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
            // Add Percentage calculation logic
            /** @type {?} */
            const optionData = this.pollExtensionData.results.options[currentItem];
            /** @type {?} */
            const vote = optionData["count"];
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
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
}
CometchatSenderPollMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-poll-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\">\n      <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n      <ul class=\"pollAnswerStyle\">\n        <!-- Options -->\n        <li *ngFor=\"let option of pollOptions\">\n          <div\n            class=\"pollPercentStyle\"\n            [ngStyle]=\"{ width: option?.percent }\"\n          ></div>\n          <div class=\"answerWrapperStyle\">\n            <span>{{ option?.percent }}</span>\n            <p>{{ option?.text }}</p>\n          </div>\n        </li>\n        <!-- Options -->\n      </ul>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total === 1\">\n        {{ pollExtensionData?.results?.total }} vote\n      </p>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total !== 1\">\n        {{ pollExtensionData?.results?.total }} votes\n      </p>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0;width:100%}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
            }] }
];
/** @nocollapse */
CometchatSenderPollMessageBubbleComponent.ctorParameters = () => [];
CometchatSenderPollMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.isPollExtensionEnabled;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.pollExtensionData;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.pollOptions;
    /** @type {?} */
    CometchatSenderPollMessageBubbleComponent.prototype.totalVotes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFPckUsTUFBTSxPQUFPLHlDQUF5QztJQWdCcEQ7UUFmUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUdyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLENBQUMsQ0FBQztJQUVBLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7SUFDSixDQUFDOzs7OztJQU1ELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM1RCxJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFDdEU7b0JBQ0EsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FDdkMsWUFBWSxDQUNiLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUN6Qjt3QkFDQSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO3dCQUNuQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQkFDN0I7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUNoRSxZQUFZLENBQ2IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O1lBRW5ELFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7O1lBRXhELFVBQVUsR0FBRyxFQUFFO1FBQ25CLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7O2tCQUUzQixVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDOztrQkFDaEUsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7O2dCQUM1QixpQkFBaUIsR0FBRyxDQUFDO1lBRXpCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO1lBRUQsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDZCxFQUFFLEVBQUUsV0FBVztnQkFDZixPQUFPLEVBQUUsaUJBQWlCLEdBQUcsR0FBRztnQkFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ2xELENBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBOUZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCx3eURBQW9FOzthQUVyRTs7Ozs7NkJBRUUsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBRUwsTUFBTTswQkFFTixLQUFLOzs7O0lBTk4sbUVBQStCOztJQUMvQixtRUFBK0I7O0lBQy9CLGlFQUFzQjs7SUFFdEIsb0VBQWtFOztJQUVsRSxnRUFBNEI7O0lBRTVCLDJFQUF3Qzs7SUFDeEMsa0VBQStCOztJQUUvQixzRUFBeUI7O0lBQ3pCLGdFQUFpQjs7SUFDakIsK0RBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNlbmRlclBvbGxNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcG9sbEV4dGVuc2lvbkRhdGEgPSBudWxsO1xuICBwb2xsT3B0aW9ucyA9IFtdO1xuICB0b3RhbFZvdGVzID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1BvbGxFeHRlbnNpb24oKTtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aGUgcG9sbCBjb21wb25lbnQgLCBvbmx5IGlmIGl0IGlzIGVuYWJsZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBjaGVja1BvbGxFeHRlbnNpb24oKSB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJAaW5qZWN0ZWRcIikpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl0uaGFzT3duUHJvcGVydHkoXCJleHRlbnNpb25zXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl1bXG4gICAgICAgICAgICAgIFwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICBdLmhhc093blByb3BlcnR5KFwicG9sbHNcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFBvbGxFeHRlbnNpb25EYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgUG9sbCBEYXRhXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0UG9sbEV4dGVuc2lvbkRhdGEoKSB7XG4gICAgdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl1bXG4gICAgICBcImV4dGVuc2lvbnNcIlxuICAgIF1bXCJwb2xsc1wiXTtcblxuICAgIHRoaXMudG90YWxWb3RlcyA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEucmVzdWx0cy50b3RhbDtcblxuICAgIGxldCBvcHRpb25LZXlzID0gT2JqZWN0LmtleXModGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5vcHRpb25zKTtcblxuICAgIGxldCBvcHRpb25MaXN0ID0gW107XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChjdXJyZW50SXRlbSkgPT4ge1xuICAgICAgLy8gQWRkIFBlcmNlbnRhZ2UgY2FsY3VsYXRpb24gbG9naWNcbiAgICAgIGNvbnN0IG9wdGlvbkRhdGEgPSB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLnJlc3VsdHMub3B0aW9uc1tjdXJyZW50SXRlbV07XG4gICAgICBjb25zdCB2b3RlID0gb3B0aW9uRGF0YVtcImNvdW50XCJdO1xuICAgICAgbGV0IGNhbGN1bGF0ZWRQZXJjZW50ID0gMDtcblxuICAgICAgaWYgKHRoaXMudG90YWxWb3RlcyA+IDApIHtcbiAgICAgICAgY2FsY3VsYXRlZFBlcmNlbnQgPSBNYXRoLnJvdW5kKCh2b3RlIC8gdGhpcy50b3RhbFZvdGVzKSAqIDEwMCk7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbkxpc3QucHVzaCh7XG4gICAgICAgIGlkOiBjdXJyZW50SXRlbSxcbiAgICAgICAgcGVyY2VudDogY2FsY3VsYXRlZFBlcmNlbnQgKyBcIiVcIixcbiAgICAgICAgdGV4dDogdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5vcHRpb25zW2N1cnJlbnRJdGVtXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wb2xsT3B0aW9ucyA9IFsuLi5vcHRpb25MaXN0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==