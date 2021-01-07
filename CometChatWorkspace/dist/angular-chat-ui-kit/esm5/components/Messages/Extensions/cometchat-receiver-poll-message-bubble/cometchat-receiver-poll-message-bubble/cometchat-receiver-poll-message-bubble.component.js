/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
var CometchatReceiverPollMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverPollMessageBubbleComponent() {
        this.MessageDetails = null;
        this.showReplyCount = true;
        this.loggedInUserUid = "";
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.isPollExtensionEnabled = false;
        this.pollId = "";
        this.pollExtensionData = null;
        this.pollOptions = [];
        this.totalVotes = 0;
        this.selectedOption = null;
        this.checkReaction = false;
    }
    /**
     * @return {?}
     */
    CometchatReceiverPollMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
        this.checkPollExtension();
    };
    /**
     * Displays the poll component , only if it is enabled
     * @param Event action
     */
    /**
     * Displays the poll component , only if it is enabled
     * @return {?}
     */
    CometchatReceiverPollMessageBubbleComponent.prototype.checkPollExtension = /**
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
    CometchatReceiverPollMessageBubbleComponent.prototype.setPollExtensionData = /**
     * Sets Poll Data
     * @return {?}
     */
    function () {
        var _this = this;
        this.pollExtensionData = this.MessageDetails.metadata["@injected"]["extensions"]["polls"];
        this.pollId = this.pollExtensionData.id;
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
            /** @type {?} */
            var selectedByLoggedInUser = false;
            if (optionData.hasOwnProperty("voters")) {
                if (optionData.voters.hasOwnProperty(_this.loggedInUserUid)) {
                    selectedByLoggedInUser = true;
                }
            }
            optionList.push({
                id: currentItem,
                percent: calculatedPercent + "%",
                text: _this.pollExtensionData.options[currentItem],
                selectedByLoggedInUser: selectedByLoggedInUser,
            });
        }));
        this.pollOptions = tslib_1.__spread(optionList);
    };
    /**
     * sends the  answer selected by the user for the  the poll question
     * @param Any selectedOption
     */
    /**
     * sends the  answer selected by the user for the  the poll question
     * @param {?} selectedOption
     * @return {?}
     */
    CometchatReceiverPollMessageBubbleComponent.prototype.answerPollQuestion = /**
     * sends the  answer selected by the user for the  the poll question
     * @param {?} selectedOption
     * @return {?}
     */
    function (selectedOption) {
        var _this = this;
        this.selectedOption = selectedOption;
        CometChat.callExtension("polls", "POST", "v1/vote", {
            vote: selectedOption.id,
            id: this.pollId,
        })
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.actionGenerated.emit({
                type: enums.POLL_ANSWERED,
                payLoad: response,
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("answerPollQuestion error", error);
        }));
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
    CometchatReceiverPollMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    /**
     * dynamically applies styles based on coditions
     * @param Event action
     */
    /**
     * dynamically applies styles based on coditions
     * @param {?=} key
     * @param {?=} data
     * @return {?}
     */
    CometchatReceiverPollMessageBubbleComponent.prototype.getStyles = /**
     * dynamically applies styles based on coditions
     * @param {?=} key
     * @param {?=} data
     * @return {?}
     */
    function (key, data) {
        if (key === void 0) { key = null; }
        if (data === void 0) { data = null; }
        switch (key) {
            case "answerWrapperStyle": {
                if (data.id !== this.selectedOption.id) {
                    return { background: "none" };
                }
                break;
            }
        }
        //return { background: "none" };
        return {};
    };
    CometchatReceiverPollMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-poll-message-bubble",
                    template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!-- Avatar for group -->\n    <div\n      class=\"messageThumbnailStyle\"\n      *ngIf=\"MessageDetails?.receiverType == 'group'\"\n    >\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!-- Name -->\n      <div\n        class=\"nameWrapperStyle\"\n        *ngIf=\"MessageDetails?.receiverType == 'group'\"\n      >\n        <span class=\"nameStyle\">\n          {{ MessageDetails?.sender?.name }}\n        </span>\n      </div>\n      <div class=\"messageTxtContainerStyle\">\n        <div class=\"messageTxtWrapperStyle\">\n          <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n          <ul class=\"pollAnswerStyle\">\n            <!-- Options -->\n            <li\n              *ngFor=\"let option of pollOptions\"\n              (click)=\"answerPollQuestion(option)\"\n            >\n              <div\n                class=\"pollPercentStyle\"\n                [ngStyle]=\"{ width: option?.percent }\"\n              ></div>\n              <div\n                [ngClass]=\"{\n                  answerWrapperStyle: !option?.selectedByLoggedInUser,\n                  answerCheckedWrapperStyle: option?.selectedByLoggedInUser\n                }\"\n              >\n                <span> {{ option?.percent }}</span>\n                <p>{{ option?.text }}</p>\n              </div>\n            </li>\n\n            <!-- Options -->\n          </ul>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total === 1\"\n          >\n            {{ pollExtensionData?.results?.total }} vote\n          </p>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total !== 1\"\n          >\n            {{ pollExtensionData?.results?.total }} votes\n          </p>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;color:#141414;padding:8px 12px;align-self:flex-start;width:100%}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;cursor:pointer;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.answerCheckedWrapperStyle{background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z\"/></svg>') 10px center/20px 20px no-repeat;width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerCheckedWrapperStyle p{margin:0;padding:6px 12px 6px 35px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerCheckedWrapperStyle span{width:40px;padding:6px 6px 6px 40px;font-weight:700;display:inline-block;font-size:13px}.removeBackground{background:0 0}.messageInfoWrapperStyle{align-self:flex-start;padding:\"3px 5px\";display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:#555}.checkIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverPollMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverPollMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUserUid: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        showToolTip: [{ type: Input }]
    };
    return CometchatReceiverPollMessageBubbleComponent;
}());
export { CometchatReceiverPollMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.loggedInUserUid;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.isPollExtensionEnabled;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.pollId;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.pollExtensionData;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.pollOptions;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.totalVotes;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.selectedOption;
    /** @type {?} */
    CometchatReceiverPollMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRDtJQXdCRTtRQWxCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUV0QixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUdwQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUVoQixDQUFDOzs7O0lBRWhCLDhEQUFROzs7SUFBUjtRQUNFLElB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QUFNOzhCQUVOLEtBQUs7O0lBd0lSLGtEQUFDO0NBQUEsQUF0SkQsSUFzSkM7U0FqSlksMkNBQTJDOzs7SUFDdEQscUVBQStCOztJQUMvQixxRUFBK0I7O0lBRS9CLHNFQUE4Qjs7SUFDOUIsbUVBQXNCOztJQUV0QixzRUFBa0U7O0lBRWxFLGtFQUE0Qjs7SUFFNUIsNkVBQXdDOztJQUN4Qyw2REFBWTs7SUFDWix3RUFBeUI7O0lBQ3pCLGtFQUFpQjs7SUFDakIsaUVBQWU7O0lBQ2YscUVBQXNCOztJQUN0QixvRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1wb2xsLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyUG9sbE1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBsb2dnZWRJblVzZXJVaWQgPSBcIlwiO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuXG4gIGlzUG9sbEV4dGVuc2lvbkVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9sbElkID0gXCJcIjtcbiAgcG9sbEV4dGVuc2lvbkRhdGEgPSBudWxsO1xuICBwb2xsT3B0aW9ucyA9IFtdO1xuICB0b3RhbFZvdGVzID0gMDtcbiAgc2VsZWN0ZWRPcHRpb24gPSBudWxsO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFwicmVhY3Rpb25zXCJcbiAgICApO1xuXG4gICAgdGhpcy5jaGVja1BvbGxFeHRlbnNpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aGUgcG9sbCBjb21wb25lbnQgLCBvbmx5IGlmIGl0IGlzIGVuYWJsZWRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgY2hlY2tQb2xsRXh0ZW5zaW9uKCkge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhLmhhc093blByb3BlcnR5KFwiQGluamVjdGVkXCIpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdLmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdW1xuICAgICAgICAgICAgICBcImV4dGVuc2lvbnNcIlxuICAgICAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShcInBvbGxzXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmlzUG9sbEV4dGVuc2lvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXRQb2xsRXh0ZW5zaW9uRGF0YSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIFBvbGwgRGF0YVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldFBvbGxFeHRlbnNpb25EYXRhKCkge1xuICAgIHRoaXMucG9sbEV4dGVuc2lvbkRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhW1wiQGluamVjdGVkXCJdW1xuICAgICAgXCJleHRlbnNpb25zXCJcbiAgICBdW1wicG9sbHNcIl07XG5cbiAgICB0aGlzLnBvbGxJZCA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEuaWQ7XG5cbiAgICB0aGlzLnRvdGFsVm90ZXMgPSB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLnJlc3VsdHMudG90YWw7XG5cbiAgICBsZXQgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucG9sbEV4dGVuc2lvbkRhdGEub3B0aW9ucyk7XG5cbiAgICBsZXQgb3B0aW9uTGlzdCA9IFtdO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoY3VycmVudEl0ZW0pID0+IHtcbiAgICAgIC8vIEFkZCBQZXJjZW50YWdlIGNhbGN1bGF0aW9uIGxvZ2ljXG4gICAgICBjb25zdCBvcHRpb25EYXRhID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5yZXN1bHRzLm9wdGlvbnNbY3VycmVudEl0ZW1dO1xuICAgICAgY29uc3Qgdm90ZSA9IG9wdGlvbkRhdGFbXCJjb3VudFwiXTtcbiAgICAgIGxldCBjYWxjdWxhdGVkUGVyY2VudCA9IDA7XG5cbiAgICAgIGlmICh0aGlzLnRvdGFsVm90ZXMgPiAwKSB7XG4gICAgICAgIGNhbGN1bGF0ZWRQZXJjZW50ID0gTWF0aC5yb3VuZCgodm90ZSAvIHRoaXMudG90YWxWb3RlcykgKiAxMDApO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2VsZWN0ZWRCeUxvZ2dlZEluVXNlciA9IGZhbHNlO1xuICAgICAgaWYgKG9wdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoXCJ2b3RlcnNcIikpIHtcbiAgICAgICAgaWYgKG9wdGlvbkRhdGEudm90ZXJzLmhhc093blByb3BlcnR5KHRoaXMubG9nZ2VkSW5Vc2VyVWlkKSkge1xuICAgICAgICAgIHNlbGVjdGVkQnlMb2dnZWRJblVzZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbkxpc3QucHVzaCh7XG4gICAgICAgIGlkOiBjdXJyZW50SXRlbSxcbiAgICAgICAgcGVyY2VudDogY2FsY3VsYXRlZFBlcmNlbnQgKyBcIiVcIixcbiAgICAgICAgdGV4dDogdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5vcHRpb25zW2N1cnJlbnRJdGVtXSxcbiAgICAgICAgc2VsZWN0ZWRCeUxvZ2dlZEluVXNlcixcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wb2xsT3B0aW9ucyA9IFsuLi5vcHRpb25MaXN0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZW5kcyB0aGUgIGFuc3dlciBzZWxlY3RlZCBieSB0aGUgdXNlciBmb3IgdGhlICB0aGUgcG9sbCBxdWVzdGlvblxuICAgKiBAcGFyYW0gQW55IHNlbGVjdGVkT3B0aW9uXG4gICAqL1xuICBhbnN3ZXJQb2xsUXVlc3Rpb24oc2VsZWN0ZWRPcHRpb24pIHtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gc2VsZWN0ZWRPcHRpb247XG5cbiAgICBDb21ldENoYXQuY2FsbEV4dGVuc2lvbihcInBvbGxzXCIsIFwiUE9TVFwiLCBcInYxL3ZvdGVcIiwge1xuICAgICAgdm90ZTogc2VsZWN0ZWRPcHRpb24uaWQsXG4gICAgICBpZDogdGhpcy5wb2xsSWQsXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5QT0xMX0FOU1dFUkVELFxuICAgICAgICAgIHBheUxvYWQ6IHJlc3BvbnNlLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyUG9sbFF1ZXN0aW9uIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkeW5hbWljYWxseSBhcHBsaWVzIHN0eWxlcyBiYXNlZCBvbiBjb2RpdGlvbnNcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgZ2V0U3R5bGVzKGtleSA9IG51bGwsIGRhdGEgPSBudWxsKSB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgXCJhbnN3ZXJXcmFwcGVyU3R5bGVcIjoge1xuICAgICAgICBpZiAoZGF0YS5pZCAhPT0gdGhpcy5zZWxlY3RlZE9wdGlvbi5pZCkge1xuICAgICAgICAgIHJldHVybiB7IGJhY2tncm91bmQ6IFwibm9uZVwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3JldHVybiB7IGJhY2tncm91bmQ6IFwibm9uZVwiIH07XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4iXX0=