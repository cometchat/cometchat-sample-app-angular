/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
var CometchatSenderPollMessageBubbleComponent = /** @class */ (function () {
    function CometchatSenderPollMessageBubbleComponent() {
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
    CometchatSenderPollMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkPollExtension();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
    };
    /**
     * Displays the poll component , only if it is enabled
     * @param
     */
    /**
     * Displays the poll component , only if it is enabled
     * @return {?}
     */
    CometchatSenderPollMessageBubbleComponent.prototype.checkPollExtension = /**
     * Displays the poll component , only if it is enabled
     * @return {?}
     */
    function () {
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
    };
    /**
     * Sets Poll Data
     * @param
     */
    /**
     * Sets Poll Data
     * @return {?}
     */
    CometchatSenderPollMessageBubbleComponent.prototype.setPollExtensionData = /**
     * Sets Poll Data
     * @return {?}
     */
    function () {
        var _this = this;
        this.pollExtensionData = this.MessageDetails.metadata["@injected"]["extensions"]["polls"];
        this.totalVotes = this.pollExtensionData.results.total;
        /** @type {?} */
        var optionKeys = Object.keys(this.pollExtensionData.options);
        /** @type {?} */
        var optionList = [];
        optionKeys.forEach((/**
         * @param {?} currentItem
         * @return {?}
         */
        function (currentItem) {
            // Add Percentage calculation logic
            /** @type {?} */
            var optionData = _this.pollExtensionData.results.options[currentItem];
            /** @type {?} */
            var vote = optionData["count"];
            /** @type {?} */
            var calculatedPercent = 0;
            if (_this.totalVotes > 0) {
                calculatedPercent = Math.round((vote / _this.totalVotes) * 100);
            }
            optionList.push({
                id: currentItem,
                percent: calculatedPercent + "%",
                text: _this.pollExtensionData.options[currentItem],
            });
        }));
        this.pollOptions = tslib_1.__spread(optionList);
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
    CometchatSenderPollMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatSenderPollMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sender-poll-message-bubble",
                    template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    *ngIf=\"showToolTip\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageTxtWrapperStyle\">\n      <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n      <ul class=\"pollAnswerStyle\">\n        <!-- Options -->\n        <li *ngFor=\"let option of pollOptions\">\n          <div\n            class=\"pollPercentStyle\"\n            [ngStyle]=\"{ width: option?.percent }\"\n          ></div>\n          <div class=\"answerWrapperStyle\">\n            <span>{{ option?.percent }}</span>\n            <p>{{ option?.text }}</p>\n          </div>\n        </li>\n        <!-- Options -->\n      </ul>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total === 1\">\n        {{ pollExtensionData?.results?.total }} vote\n      </p>\n      <p class=\"pollTotalStyle\" *ngIf=\"pollExtensionData?.results?.total !== 1\">\n        {{ pollExtensionData?.results?.total }} votes\n      </p>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;width:auto}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0;width:100%}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSenderPollMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatSenderPollMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        showToolTip: [{ type: Input }]
    };
    return CometchatSenderPollMessageBubbleComponent;
}());
export { CometchatSenderPollMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LXNlbmRlci1wb2xsLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXJFO0lBcUJFO1FBZlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFHckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUU1QiwyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFDeEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxDQUFDLENBQUM7SUFFQSxDQUFDOzs7O0lBRWhCLDREQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILHNFQUFrQjs7OztJQUFsQjtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzVELElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUN0RTtvQkFDQSxJQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUN2QyxZQUFZLENBQ2IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQ3pCO3dCQUNBLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7d0JBQ25DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3FCQUM3QjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILHdFQUFvQjs7OztJQUFwQjtRQUFBLGlCQTRCQztRQTNCQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQ2hFLFlBQVksQ0FDYixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRVgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7WUFFbkQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzs7WUFFeEQsVUFBVSxHQUFHLEVBQUU7UUFDbkIsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLFdBQVc7OztnQkFFdkIsVUFBVSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7Z0JBQ2hFLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDOztnQkFDNUIsaUJBQWlCLEdBQUcsQ0FBQztZQUV6QixJQUFJLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNoRTtZQUVELFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsRUFBRSxFQUFFLFdBQVc7Z0JBQ2YsT0FBTyxFQUFFLGlCQUFpQixHQUFHLEdBQUc7Z0JBQ2hDLElBQUksRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUNsRCxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLG9CQUFPLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGlFQUFhOzs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkE5RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELHd5REFBb0U7O2lCQUVyRTs7Ozs7aUNBRUUsS0FBSztpQ0FDTCxLQUFLOytCQUNMLEtBQUs7a0NBRUwsTUFBTTs4QkFFTixLQUFLOztJQW1GUixnREFBQztDQUFBLEFBL0ZELElBK0ZDO1NBMUZZLHlDQUF5Qzs7O0lBQ3BELG1FQUErQjs7SUFDL0IsbUVBQStCOztJQUMvQixpRUFBc0I7O0lBRXRCLG9FQUFrRTs7SUFFbEUsZ0VBQTRCOztJQUU1QiwyRUFBd0M7O0lBQ3hDLGtFQUErQjs7SUFFL0Isc0VBQXlCOztJQUN6QixnRUFBaUI7O0lBQ2pCLCtEQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTZW5kZXJQb2xsTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuXG4gIGlzUG9sbEV4dGVuc2lvbkVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHBvbGxFeHRlbnNpb25EYXRhID0gbnVsbDtcbiAgcG9sbE9wdGlvbnMgPSBbXTtcbiAgdG90YWxWb3RlcyA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tQb2xsRXh0ZW5zaW9uKCk7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheXMgdGhlIHBvbGwgY29tcG9uZW50ICwgb25seSBpZiBpdCBpcyBlbmFibGVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2hlY2tQb2xsRXh0ZW5zaW9uKCkge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhLmhhc093blByb3BlcnR5KFwiQGluamVjdGVkXCIpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdLmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdW1xuICAgICAgICAgICAgICBcImV4dGVuc2lvbnNcIlxuICAgICAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShcInBvbGxzXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmlzUG9sbEV4dGVuc2lvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXRQb2xsRXh0ZW5zaW9uRGF0YSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIFBvbGwgRGF0YVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldFBvbGxFeHRlbnNpb25EYXRhKCkge1xuICAgIHRoaXMucG9sbEV4dGVuc2lvbkRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdW1xuICAgICAgXCJleHRlbnNpb25zXCJcbiAgICBdW1wicG9sbHNcIl07XG5cbiAgICB0aGlzLnRvdGFsVm90ZXMgPSB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLnJlc3VsdHMudG90YWw7XG5cbiAgICBsZXQgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucG9sbEV4dGVuc2lvbkRhdGEub3B0aW9ucyk7XG5cbiAgICBsZXQgb3B0aW9uTGlzdCA9IFtdO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoY3VycmVudEl0ZW0pID0+IHtcbiAgICAgIC8vIEFkZCBQZXJjZW50YWdlIGNhbGN1bGF0aW9uIGxvZ2ljXG4gICAgICBjb25zdCBvcHRpb25EYXRhID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5yZXN1bHRzLm9wdGlvbnNbY3VycmVudEl0ZW1dO1xuICAgICAgY29uc3Qgdm90ZSA9IG9wdGlvbkRhdGFbXCJjb3VudFwiXTtcbiAgICAgIGxldCBjYWxjdWxhdGVkUGVyY2VudCA9IDA7XG5cbiAgICAgIGlmICh0aGlzLnRvdGFsVm90ZXMgPiAwKSB7XG4gICAgICAgIGNhbGN1bGF0ZWRQZXJjZW50ID0gTWF0aC5yb3VuZCgodm90ZSAvIHRoaXMudG90YWxWb3RlcykgKiAxMDApO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25MaXN0LnB1c2goe1xuICAgICAgICBpZDogY3VycmVudEl0ZW0sXG4gICAgICAgIHBlcmNlbnQ6IGNhbGN1bGF0ZWRQZXJjZW50ICsgXCIlXCIsXG4gICAgICAgIHRleHQ6IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEub3B0aW9uc1tjdXJyZW50SXRlbV0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucG9sbE9wdGlvbnMgPSBbLi4ub3B0aW9uTGlzdF07XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=