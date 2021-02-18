/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { checkMessageForExtensionsData } from "../../../../../utils/common";
import * as enums from "../../../../../utils/enums";
import { logger } from "../../../../../utils/common";
export class CometChatReceiverPollMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
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
        this.checkReaction = [];
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            this.checkPollExtension();
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
                /** @type {?} */
                const optionData = this.pollExtensionData.results.options[currentItem];
                /** @type {?} */
                const vote = optionData[enums.COUNT];
                /** @type {?} */
                let calculatedPercent = 0;
                if (this.totalVotes > 0) {
                    calculatedPercent = Math.round((vote / this.totalVotes) * 100);
                }
                /** @type {?} */
                let selectedByLoggedInUser = false;
                if (optionData.hasOwnProperty(enums.VOTERS)) {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * sends the  answer selected by the user for the  the poll question
     * @param {?} selectedOption
     * @return {?}
     */
    answerPollQuestion(selectedOption) {
        try {
            this.selectedOption = selectedOption;
            CometChat.callExtension(enums.POLLS, enums.POST, enums.V1_VOTE, {
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
                logger("answerPollQuestion error", error);
            }));
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
    /**
     * dynamically applies styles based on coditions
     * @param {?=} key
     * @param {?=} data
     * @return {?}
     */
    getStyles(key = null, data = null) {
        try {
            switch (key) {
                case enums.ANSWER_WRAPPER_STYLE: {
                    if (data.id !== this.selectedOption.id) {
                        return { background: "none" };
                    }
                    break;
                }
            }
            return {};
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatReceiverPollMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-poll-message-bubble",
                template: "<div class=\"messageContainerStyle\" *ngIf=\"isPollExtensionEnabled\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!-- Avatar for group -->\n    <div\n      class=\"messageThumbnailStyle\"\n      *ngIf=\"messageDetails?.receiverType == GROUP\"\n    >\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!-- Name -->\n      <div\n        class=\"nameWrapperStyle\"\n        *ngIf=\"messageDetails?.receiverType == GROUP\"\n      >\n        <span class=\"nameStyle\">\n          {{ messageDetails?.sender?.name }}\n        </span>\n      </div>\n      <div class=\"messageTxtContainerStyle\">\n        <div class=\"messageTxtWrapperStyle\">\n          <p class=\"pollQuestionStyle\">{{ pollExtensionData?.question }}</p>\n          <ul class=\"pollAnswerStyle\">\n            <!-- Options -->\n            <li\n              *ngFor=\"let option of pollOptions\"\n              (click)=\"answerPollQuestion(option)\"\n            >\n              <div\n                class=\"pollPercentStyle\"\n                [ngStyle]=\"{ width: option?.percent }\"\n              ></div>\n              <div\n                [ngClass]=\"{\n                  answerWrapperStyle: !option?.selectedByLoggedInUser,\n                  answerCheckedWrapperStyle: option?.selectedByLoggedInUser\n                }\"\n              >\n                <span> {{ option?.percent }}</span>\n                <p>{{ option?.text }}</p>\n              </div>\n            </li>\n\n            <!-- Options -->\n          </ul>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total === 1\"\n          >\n            {{ pollExtensionData?.results?.total }} vote\n          </p>\n          <p\n            class=\"pollTotalStyle\"\n            *ngIf=\"pollExtensionData?.results?.total !== 1\"\n          >\n            {{ pollExtensionData?.results?.total }} votes\n          </p>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;color:#141414;padding:8px 12px;align-self:flex-start;width:100%}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;cursor:pointer;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.answerCheckedWrapperStyle{background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z\"/></svg>') 10px center/20px 20px no-repeat;width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerCheckedWrapperStyle p{margin:0;padding:6px 12px 6px 35px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerCheckedWrapperStyle span{width:40px;padding:6px 6px 6px 40px;font-weight:700;display:inline-block;font-size:13px}.removeBackground{background:0 0}.messageInfoWrapperStyle{align-self:flex-start;padding:\"3px 5px\";display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:#555}.checkIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
            }] }
];
/** @nocollapse */
CometChatReceiverPollMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverPollMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUserUid: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.loggedInUserUid;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.isPollExtensionEnabled;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.pollId;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.pollExtensionData;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.pollOptions;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.totalVotes;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.selectedOption;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverPollMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9Db21ldENoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RSxPQUFPLEtBQUssS0FBSyxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU1yRCxNQUFNLE9BQU8sMkNBQTJDO0lBcUJ0RDtRQXBCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUV0QixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUdwQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTVCLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN4QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixVQUFLLEdBQVcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFFL0IsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLEtBQUssQ0FBQyxTQUFTLENBQ2hCLENBQUM7WUFFRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQUtELGtCQUFrQjtRQUNoQixJQUFJO1lBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RELElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDbEU7b0JBQ0EsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUNoRSxLQUFLLENBQUMsVUFBVSxDQUNqQixFQUNEO3dCQUNBLElBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNqRCxLQUFLLENBQUMsVUFBVSxDQUNqQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQzdCOzRCQUNBLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7NEJBQ25DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3lCQUM3QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxvQkFBb0I7UUFDbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDMUQsS0FBSyxDQUFDLFFBQVEsQ0FDZixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1lBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O2dCQUVuRCxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDOztnQkFFeEQsVUFBVSxHQUFHLEVBQUU7WUFDbkIsVUFBVSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLFdBQVcsRUFBRSxFQUFFOztzQkFDM0IsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7c0JBQ2hFLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7b0JBQ2hDLGlCQUFpQixHQUFHLENBQUM7Z0JBRXpCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7b0JBQ3ZCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNoRTs7b0JBRUcsc0JBQXNCLEdBQUcsS0FBSztnQkFDbEMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7d0JBQzFELHNCQUFzQixHQUFHLElBQUksQ0FBQztxQkFDL0I7aUJBQ0Y7Z0JBRUQsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDZCxFQUFFLEVBQUUsV0FBVztvQkFDZixPQUFPLEVBQUUsaUJBQWlCLEdBQUcsR0FBRztvQkFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO29CQUNqRCxzQkFBc0I7aUJBQ3ZCLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsa0JBQWtCLENBQUMsY0FBYztRQUMvQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFFckMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDOUQsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUN2QixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDaEIsQ0FBQztpQkFDQyxJQUFJOzs7O1lBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsYUFBYTtvQkFDekIsT0FBTyxFQUFFLFFBQVE7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZixNQUFNLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7OztJQU1ELFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJO1FBQy9CLElBQUk7WUFDRixRQUFRLEdBQUcsRUFBRTtnQkFDWCxLQUFLLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7cUJBQy9CO29CQUVELE1BQU07aUJBQ1A7YUFDRjtZQUVELE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBaExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCx3bUdBQXNFOzthQUV2RTs7Ozs7NkJBRUUsS0FBSzs2QkFDTCxLQUFLOzhCQUVMLEtBQUs7MkJBQ0wsS0FBSzs4QkFFTCxNQUFNOzBCQUVOLEtBQUs7Ozs7SUFSTixxRUFBK0I7O0lBQy9CLHFFQUErQjs7SUFFL0Isc0VBQThCOztJQUM5QixtRUFBc0I7O0lBRXRCLHNFQUFrRTs7SUFFbEUsa0VBQTRCOztJQUU1Qiw2RUFBd0M7O0lBQ3hDLDZEQUFZOztJQUNaLHdFQUF5Qjs7SUFDekIsa0VBQWlCOztJQUNqQixpRUFBZTs7SUFDZixxRUFBc0I7O0lBQ3RCLG9FQUFtQjs7SUFFbkIsNERBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRSZWNlaXZlclBvbGxNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG5cbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyVWlkID0gXCJcIjtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcblxuICBpc1BvbGxFeHRlbnNpb25FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHBvbGxJZCA9IFwiXCI7XG4gIHBvbGxFeHRlbnNpb25EYXRhID0gbnVsbDtcbiAgcG9sbE9wdGlvbnMgPSBbXTtcbiAgdG90YWxWb3RlcyA9IDA7XG4gIHNlbGVjdGVkT3B0aW9uID0gbnVsbDtcbiAgY2hlY2tSZWFjdGlvbiA9IFtdO1xuXG4gIEdST1VQOiBTdHJpbmcgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuY2hlY2tQb2xsRXh0ZW5zaW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIHRoZSBwb2xsIGNvbXBvbmVudCAsIG9ubHkgaWYgaXQgaXMgZW5hYmxlZFxuICAgKi9cbiAgY2hlY2tQb2xsRXh0ZW5zaW9uKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5NRVRBREFUQSkpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWVzc2FnZURldGFpbHNbZW51bXMuTUVUQURBVEFdLmhhc093blByb3BlcnR5KGVudW1zLklOSkVDVEVEKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzW2VudW1zLk1FVEFEQVRBXVtlbnVtcy5JTkpFQ1RFRF0uaGFzT3duUHJvcGVydHkoXG4gICAgICAgICAgICAgIGVudW1zLkVYVEVOU0lPTlNcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlsc1tlbnVtcy5NRVRBREFUQV1bZW51bXMuSU5KRUNURURdW1xuICAgICAgICAgICAgICAgIGVudW1zLkVYVEVOU0lPTlNcbiAgICAgICAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5QT0xMUylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLmlzUG9sbEV4dGVuc2lvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnNldFBvbGxFeHRlbnNpb25EYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgUG9sbCBEYXRhXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0UG9sbEV4dGVuc2lvbkRhdGEoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucG9sbEV4dGVuc2lvbkRhdGEgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzW2VudW1zLk1FVEFEQVRBXVtcbiAgICAgICAgZW51bXMuSU5KRUNURURcbiAgICAgIF1bZW51bXMuRVhURU5TSU9OU11bZW51bXMuUE9MTFNdO1xuXG4gICAgICB0aGlzLnBvbGxJZCA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEuaWQ7XG5cbiAgICAgIHRoaXMudG90YWxWb3RlcyA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEucmVzdWx0cy50b3RhbDtcblxuICAgICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyh0aGlzLnBvbGxFeHRlbnNpb25EYXRhLm9wdGlvbnMpO1xuXG4gICAgICBsZXQgb3B0aW9uTGlzdCA9IFtdO1xuICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKChjdXJyZW50SXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25EYXRhID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5yZXN1bHRzLm9wdGlvbnNbY3VycmVudEl0ZW1dO1xuICAgICAgICBjb25zdCB2b3RlID0gb3B0aW9uRGF0YVtlbnVtcy5DT1VOVF07XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUGVyY2VudCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudG90YWxWb3RlcyA+IDApIHtcbiAgICAgICAgICBjYWxjdWxhdGVkUGVyY2VudCA9IE1hdGgucm91bmQoKHZvdGUgLyB0aGlzLnRvdGFsVm90ZXMpICogMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RlZEJ5TG9nZ2VkSW5Vc2VyID0gZmFsc2U7XG4gICAgICAgIGlmIChvcHRpb25EYXRhLmhhc093blByb3BlcnR5KGVudW1zLlZPVEVSUykpIHtcbiAgICAgICAgICBpZiAob3B0aW9uRGF0YS52b3RlcnMuaGFzT3duUHJvcGVydHkodGhpcy5sb2dnZWRJblVzZXJVaWQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEJ5TG9nZ2VkSW5Vc2VyID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25MaXN0LnB1c2goe1xuICAgICAgICAgIGlkOiBjdXJyZW50SXRlbSxcbiAgICAgICAgICBwZXJjZW50OiBjYWxjdWxhdGVkUGVyY2VudCArIFwiJVwiLFxuICAgICAgICAgIHRleHQ6IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEub3B0aW9uc1tjdXJyZW50SXRlbV0sXG4gICAgICAgICAgc2VsZWN0ZWRCeUxvZ2dlZEluVXNlcixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5wb2xsT3B0aW9ucyA9IFsuLi5vcHRpb25MaXN0XTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2VuZHMgdGhlICBhbnN3ZXIgc2VsZWN0ZWQgYnkgdGhlIHVzZXIgZm9yIHRoZSAgdGhlIHBvbGwgcXVlc3Rpb25cbiAgICogQHBhcmFtIEFueSBzZWxlY3RlZE9wdGlvblxuICAgKi9cbiAgYW5zd2VyUG9sbFF1ZXN0aW9uKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSBzZWxlY3RlZE9wdGlvbjtcblxuICAgICAgQ29tZXRDaGF0LmNhbGxFeHRlbnNpb24oZW51bXMuUE9MTFMsIGVudW1zLlBPU1QsIGVudW1zLlYxX1ZPVEUsIHtcbiAgICAgICAgdm90ZTogc2VsZWN0ZWRPcHRpb24uaWQsXG4gICAgICAgIGlkOiB0aGlzLnBvbGxJZCxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuUE9MTF9BTlNXRVJFRCxcbiAgICAgICAgICAgIHBheUxvYWQ6IHJlc3BvbnNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiYW5zd2VyUG9sbFF1ZXN0aW9uIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGR5bmFtaWNhbGx5IGFwcGxpZXMgc3R5bGVzIGJhc2VkIG9uIGNvZGl0aW9uc1xuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBnZXRTdHlsZXMoa2V5ID0gbnVsbCwgZGF0YSA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5BTlNXRVJfV1JBUFBFUl9TVFlMRToge1xuICAgICAgICAgIGlmIChkYXRhLmlkICE9PSB0aGlzLnNlbGVjdGVkT3B0aW9uLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBiYWNrZ3JvdW5kOiBcIm5vbmVcIiB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7fTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==