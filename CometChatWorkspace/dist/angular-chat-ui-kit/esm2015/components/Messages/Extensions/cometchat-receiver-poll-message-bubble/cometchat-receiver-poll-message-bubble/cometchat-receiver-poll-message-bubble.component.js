/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
export class CometchatReceiverPollMessageBubbleComponent {
    constructor() {
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
    ngOnInit() {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
        this.checkPollExtension();
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
        this.pollId = this.pollExtensionData.id;
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
            /** @type {?} */
            let selectedByLoggedInUser = false;
            if (optionData.hasOwnProperty("voters")) {
                if (optionData.voters.hasOwnProperty(this.loggedInUserUid)) {
                    selectedByLoggedInUser = true;
                }
            }
            optionList.push({
                id: currentItem,
                percent: calculatedPercent + "%",
                text: this.pollExtensionData.options[currentItem],
                selectedByLoggedInUser,
            });
        }));
        this.pollOptions = [...optionList];
    }
    /**
     * sends the  answer selected by the user for the  the poll question
     * @param {?} selectedOption
     * @return {?}
     */
    answerPollQuestion(selectedOption) {
        this.selectedOption = selectedOption;
        CometChat.callExtension("polls", "POST", "v1/vote", {
            vote: selectedOption.id,
            id: this.pollId,
        })
            .then((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.actionGenerated.emit({
                type: enums.POLL_ANSWERED,
                payLoad: response,
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("answerPollQuestion error", error);
        }));
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
    /**
     * dynamically applies styles based on coditions
     * @param {?=} key
     * @param {?=} data
     * @return {?}
     */
    getStyles(key = null, data = null) {
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
    }
}
CometchatReceiverPollMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-poll-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!-- Avatar for group -->\n    <div\n      class=\"messageThumbnailStyle\"\n      *ngIf=\"MessageDetails?.receiverType == 'group'\"\n    >\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!-- Name -->\n      <div\n        class=\"nameWrapperStyle\"\n        *ngIf=\"MessageDetails?.receiverType == 'group'\"\n      >\n        <span class=\"nameStyle\">\n          {{ MessageDetails?.sender?.name }}\n        </span>\n      </div>\n      <div class=\"messageTxtContainerStyle\">\n        <div class=\"messageTxtWrapperStyle\">\n          <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n          <ul class=\"pollAnswerStyle\">\n            <!-- Options -->\n            <li\n              *ngFor=\"let option of pollOptions\"\n              (click)=\"answerPollQuestion(option)\"\n            >\n              <div\n                class=\"pollPercentStyle\"\n                [ngStyle]=\"{ width: option?.percent }\"\n              ></div>\n              <div\n                [ngClass]=\"{\n                  answerWrapperStyle: !option?.selectedByLoggedInUser,\n                  answerCheckedWrapperStyle: option?.selectedByLoggedInUser\n                }\"\n              >\n                <span> {{ option?.percent }}</span>\n                <p>{{ option?.text }}</p>\n              </div>\n            </li>\n\n            <!-- Options -->\n          </ul>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total === 1\"\n          >\n            {{ pollExtensionData?.results?.total }} vote\n          </p>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total !== 1\"\n          >\n            {{ pollExtensionData?.results?.total }} votes\n          </p>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;color:#141414;padding:8px 12px;align-self:flex-start;width:100%}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;cursor:pointer;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.answerCheckedWrapperStyle{background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z\"/></svg>') 10px center/20px 20px no-repeat;width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerCheckedWrapperStyle p{margin:0;padding:6px 12px 6px 35px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerCheckedWrapperStyle span{width:40px;padding:6px 6px 6px 40px;font-weight:700;display:inline-block;font-size:13px}.removeBackground{background:0 0}.messageInfoWrapperStyle{align-self:flex-start;padding:\"3px 5px\";display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:#555}.checkIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
            }] }
];
/** @nocollapse */
CometchatReceiverPollMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverPollMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUserUid: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBTWpELE1BQU0sT0FBTywyQ0FBMkM7SUFtQnREO1FBbEJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBR3BCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFNUIsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1FBQ3hDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBRWhCLENBQUM7Ozs7SUFFaEIsUUFB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O0lBQ3hDLDZEQUFZOztJQUNaLHdFQUF5Qjs7SUFDekIsa0VBQWlCOztJQUNqQixpRUFBZTs7SUFDZixxRUFBc0I7O0lBQ3RCLG9FQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJQb2xsTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlclVpZCA9IFwiXCI7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG5cbiAgaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwb2xsSWQgPSBcIlwiO1xuICBwb2xsRXh0ZW5zaW9uRGF0YSA9IG51bGw7XG4gIHBvbGxPcHRpb25zID0gW107XG4gIHRvdGFsVm90ZXMgPSAwO1xuICBzZWxlY3RlZE9wdGlvbiA9IG51bGw7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgXCJyZWFjdGlvbnNcIlxuICAgICk7XG5cbiAgICB0aGlzLmNoZWNrUG9sbEV4dGVuc2lvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIHRoZSBwb2xsIGNvbXBvbmVudCAsIG9ubHkgaWYgaXQgaXMgZW5hYmxlZFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBjaGVja1BvbGxFeHRlbnNpb24oKSB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGEuaGFzT3duUHJvcGVydHkoXCJAaW5qZWN0ZWRcIikpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl0uaGFzT3duUHJvcGVydHkoXCJleHRlbnNpb25zXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl1bXG4gICAgICAgICAgICAgIFwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICBdLmhhc093blByb3BlcnR5KFwicG9sbHNcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuaXNQb2xsRXh0ZW5zaW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFBvbGxFeHRlbnNpb25EYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgUG9sbCBEYXRhXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0UG9sbEV4dGVuc2lvbkRhdGEoKSB7XG4gICAgdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl1bXG4gICAgICBcImV4dGVuc2lvbnNcIlxuICAgIF1bXCJwb2xsc1wiXTtcblxuICAgIHRoaXMucG9sbElkID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5pZDtcblxuICAgIHRoaXMudG90YWxWb3RlcyA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEucmVzdWx0cy50b3RhbDtcblxuICAgIGxldCBvcHRpb25LZXlzID0gT2JqZWN0LmtleXModGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5vcHRpb25zKTtcblxuICAgIGxldCBvcHRpb25MaXN0ID0gW107XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChjdXJyZW50SXRlbSkgPT4ge1xuICAgICAgLy8gQWRkIFBlcmNlbnRhZ2UgY2FsY3VsYXRpb24gbG9naWNcbiAgICAgIGNvbnN0IG9wdGlvbkRhdGEgPSB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLnJlc3VsdHMub3B0aW9uc1tjdXJyZW50SXRlbV07XG4gICAgICBjb25zdCB2b3RlID0gb3B0aW9uRGF0YVtcImNvdW50XCJdO1xuICAgICAgbGV0IGNhbGN1bGF0ZWRQZXJjZW50ID0gMDtcblxuICAgICAgaWYgKHRoaXMudG90YWxWb3RlcyA+IDApIHtcbiAgICAgICAgY2FsY3VsYXRlZFBlcmNlbnQgPSBNYXRoLnJvdW5kKCh2b3RlIC8gdGhpcy50b3RhbFZvdGVzKSAqIDEwMCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBzZWxlY3RlZEJ5TG9nZ2VkSW5Vc2VyID0gZmFsc2U7XG4gICAgICBpZiAob3B0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eShcInZvdGVyc1wiKSkge1xuICAgICAgICBpZiAob3B0aW9uRGF0YS52b3RlcnMuaGFzT3duUHJvcGVydHkodGhpcy5sb2dnZWRJblVzZXJVaWQpKSB7XG4gICAgICAgICAgc2VsZWN0ZWRCeUxvZ2dlZEluVXNlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3B0aW9uTGlzdC5wdXNoKHtcbiAgICAgICAgaWQ6IGN1cnJlbnRJdGVtLFxuICAgICAgICBwZXJjZW50OiBjYWxjdWxhdGVkUGVyY2VudCArIFwiJVwiLFxuICAgICAgICB0ZXh0OiB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLm9wdGlvbnNbY3VycmVudEl0ZW1dLFxuICAgICAgICBzZWxlY3RlZEJ5TG9nZ2VkSW5Vc2VyLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBvbGxPcHRpb25zID0gWy4uLm9wdGlvbkxpc3RdO1xuICB9XG5cbiAgLyoqXG4gICAqIHNlbmRzIHRoZSAgYW5zd2VyIHNlbGVjdGVkIGJ5IHRoZSB1c2VyIGZvciB0aGUgIHRoZSBwb2xsIHF1ZXN0aW9uXG4gICAqIEBwYXJhbSBBbnkgc2VsZWN0ZWRPcHRpb25cbiAgICovXG4gIGFuc3dlclBvbGxRdWVzdGlvbihzZWxlY3RlZE9wdGlvbikge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSBzZWxlY3RlZE9wdGlvbjtcblxuICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKFwicG9sbHNcIiwgXCJQT1NUXCIsIFwidjEvdm90ZVwiLCB7XG4gICAgICB2b3RlOiBzZWxlY3RlZE9wdGlvbi5pZCxcbiAgICAgIGlkOiB0aGlzLnBvbGxJZCxcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlBPTExfQU5TV0VSRUQsXG4gICAgICAgICAgcGF5TG9hZDogcmVzcG9uc2UsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbnN3ZXJQb2xsUXVlc3Rpb24gZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIGR5bmFtaWNhbGx5IGFwcGxpZXMgc3R5bGVzIGJhc2VkIG9uIGNvZGl0aW9uc1xuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBnZXRTdHlsZXMoa2V5ID0gbnVsbCwgZGF0YSA9IG51bGwpIHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBcImFuc3dlcldyYXBwZXJTdHlsZVwiOiB7XG4gICAgICAgIGlmIChkYXRhLmlkICE9PSB0aGlzLnNlbGVjdGVkT3B0aW9uLmlkKSB7XG4gICAgICAgICAgcmV0dXJuIHsgYmFja2dyb3VuZDogXCJub25lXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vcmV0dXJuIHsgYmFja2dyb3VuZDogXCJub25lXCIgfTtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbiJdfQ==