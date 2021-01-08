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
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
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
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{align-self:flex-start}.messageTxtContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageTxtWrapperStyle{display:inline-block;border-radius:12px;background-color:#f6f6f6;color:#141414;padding:8px 12px;align-self:flex-start;width:100%}.pollQuestionStyle{margin:0;white-space:pre-wrap;word-wrap:break-word;text-align:left;width:100%;font-size:14px}.pollAnswerStyle{list-style-type:none;padding:0;margin:0}.pollAnswerStyle>li{background-color:#fff;margin:10px 0;border-radius:8px;display:flex;width:100%;cursor:pointer;position:relative}.pollTotalStyle{font-size:13px;margin:0;align-self:flex-end}.pollPercentStyle{max-width:100%;width:100%;border-radius:8px;background-color:#e6e6e6;min-height:35px;height:100%;position:absolute;z-index:1}.answerWrapperStyle{width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerWrapperStyle p{margin:0;padding:6px 12px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerWrapperStyle span{width:40px;padding:6px 12px;font-weight:700;display:inline-block;font-size:13px}.answerCheckedWrapperStyle{background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z\"/></svg>') 10px center/20px 20px no-repeat;width:100%;color:#141414;display:flex;align-items:center;min-height:35px;height:100%;z-index:2}.answerCheckedWrapperStyle p{margin:0;padding:6px 12px 6px 35px;width:calc(100% - 40px);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.answerCheckedWrapperStyle span{width:40px;padding:6px 6px 6px 40px;font-weight:700;display:inline-block;font-size:13px}.removeBackground{background:0 0}.messageInfoWrapperStyle{align-self:flex-start;padding:\"3px 5px\";display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:#555}.checkIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAS6ADAAQAAAABAAAASwAAAACnw0WBAAAIxUlEQVR4Ae1ca2wc1RW+Z+5uDEkcCgmopa0KakNMK1WQJoVW/dE2RDwbQpACXjuBOLYlJCCt+qc0oU0LVaX+aqnUSl6nIYkfgEggLU2BEPhTiQLl0R9QO0LgprwqmUdeRrb3zul3ZjX27uzs7uzO7KzX2ZHsuffcc88595v7PPfeJVWHZ/Me/nxmyqxSTG3K4ja2+RIitRTxJaxUqyJ1Nik1gfBJYj4BE8cV0SgrGlXEI4tYv9jfQ/+L23TYVPvnrkPcMv6euday1VomXsOsVoTWSup1GH+EmA4vWqmf6ltF06FllhFQU7A60nwlK3ObYnULKz63jC1VJ5OicSY1nLD03n1b6Z9VCyqTMXKwmJk6+s06gLMDIK0qoz/yZDTn58mi+wa3Jv4WtfBIwerclVlnbL4PIH09akMrlYeCvWJZavtAd/LJSvMW448ErNt380VTGfN71KobiimqF52IDpDS2wZ76J2wNlhhBDhNLm1+PDlt3piLQEnZYNcG9JsjHX3mrjBllbxV1ywM/0unJ80emHN9WCNiy0/0WEtCdz24hT6pRmdVYHXs5tV2xuzHZ/tiNUrrm4fGkpbesLebXq3UjorB6uyfvsZmehTVe1GlyuYKP/qxk0R802B38kglNlXUZ6X6Mh22TX9uZKAEHNjfig9+qLMvs7ESsALXLAEKE7990BQ4TyWG1IMXk1kbtaV9oDfxSBD9gQqe6pu+GmPBXzDRTAYR2lA8RFMW8XVBmmRZsKQz54x5rtGbXqkPKH2YpfV3B7rolZJ8pRK39vN5E2xea8xRr1TJ/NJorCWpLy81rSjawaMm0aeMeVRDTg/8wChHc1YhD5biKgpWKm3/CIDNueVLqcKETUN5b0ylzd3F5Pj2Wal+/pKysYRRvLBYxvlKR/91ukXrS3d30X+9ZfStWWybB85EoAQcGcgmM+YBL1ASLwCrvT/zA2RZ58ccD40m8XXfghvZxKOvUAsqyvpUOnOdN6UALCX+qDo9pKx7VyzXi4d6El9OtOhzANof62QKXHJ8v1d3Xp/lOO8MH/QyxREHME8AJNTq2UdG5I505gVsXKyepcYX0hbdMNCd+KurMa9m2TZvdxPifmMRVfCRACCTZT0Wty2uPnh973XD8p4Ba9Of+ArsunwzNzHOMJYcx/z0YStszI8eE+0KWcG4umbAMga7MPV84M70VV+M7sscPRFLvRlcHLB2PsIL0C/cEr2qxpcIXNoFHymJA9bR4+ZaTDDOa/yi1aAEwOXNk+aaGbAQWFsDNfNGpG2y+GT7LOY186ZkNSiIHDkQsVbXLr4Q7bKtBjrmj0hWl3bu489ZUwqnWZpPeQSmzGoLk+RmrSoPFcY/agNY3AQrEFjchg6eLwnA22QBTgmgsCxqJLDF9Jyy6CBW7v+BbP+ZuUepvVD/y0Nyogu0/jvc24FcRjgsl2CLLlJsb8TS7Uo/eSFoy6g9nXkXDfLCEELysqKq/nKwN/nzPGIdIvBH/QFdzB2RqSZ6z4KPpjUygYqOL+9J/CI6edVLorP1T+BAxKwomkdwsiAtMj87KT66k8iOxrxwUgY76QSg+iCclNncgpPUrIlZUsgQ0fKdzNlVQUhRYbN3DPAS+Mg+G1aOm19wkpp10iWEfaOP+MzR/szPwsqJJP+E+Y1MjiKRBSGCE6XS0yORHLXOscoZDYkex5rqGMiBRkO1UD8/nKLxHDFOUJZjGA2/4aX7xXNGw1ujdmTiYO+oTB3EwPDn0nOsx5The/iq+MshlglaE5mrwHLEyzZlzHfwXR/20v3iTmdpV6DUT0hx2rgsd0aLpzdTXAQEJwvD64hLaL6LI2BZAEtb3KxZxTGaScGUbcTCFY4XZyjNQHEEFuiXLJxH+gDj6xvFuZopgs/AJnrfmUAyUcEo1IQoFwF6VmLZ2Tapw7lJzXA+AliTPC0UB6wVS/RT2Cr/MJ+lGXMQIPpI8JGwA9bOjTSFCeRwE55CBNBfDTv4uGAJi9Z6TyFrfBRc6T3fT5tt0QV+9LholJjFJdtnQbPcAJWLjXEZUaDHZl/PJhbn3y7gjYkAPP4xuIVectXNgJUlUMEBLpex1m/UrN5NuzhvW05O38EnVbczGBbl44Emmf/gNsXLWIquzKfGFMNtB4BzCN6KMdzo+Bq0XhWlm6WiUpB6dbgnmYeDeB3yHrkqa2wV+f3iPCXFIuyc5lmf9VbUzHtQTHseHW6mHXkERDzNUCm5UwzG/V7GMyqOS5w4snnIW+YCsISBSP8Q/095mc+EOOabp8/SeptfWX3BksvXuO5/j1+G+U+jn/pdGJByF3TwuWBgNNqPoXtDLm0+h1GrDqL5rS9WRt+a5TIvPkd3QcDbbnx+v2kM+wBbSpWxJFh9G+m4Yr0BgEW2A1TKmPql0Smd0DcPddDHpWwoCZZkHOql1zSuZ6DFTpYS1LBpMrdL8E3lLmZK+cqCJUz7epLPYje2E1OKObHbLDZF8Uh5AMDmoa7kM0HkBQJLBA32JB7FWglLj3lSw6RGkUqhXIG22QSDkqOhMHifTenp7xuFDVRc9/emNU6cTknTC1qj3HJVDJZkTPXxZYrMAQB2sSuocd40Jp15kD7KW6bAzTA3o3T6mFZcjlHyQC59rodlHkWL9MpqgJKyVVWzckFJ9Zs78Zt9v8YW++Jc+lwKA6TTWMNtH+rWvwtjV2iwRDl+ru4LzOa3OONwcxhjapEXI97jibP0tr2b6VhY+ZGA5Rrh/KiPrX5VN3+Ya4i84Y8CUDv8vAe5bJWEIwXLVZy9X8w7cOznWy4txvcLOMBx/2Bv4omoddYELNdIcRM79xhJtWPkXOrSI39juwqn8h5iS+8Z6qaaHUeoKVguKHJfb/SEuRoe0LW4mboGzfSrblrVb1L/xqXgI5ZWh7/Sqp90t6uqlhcgYyxgee2QS0MKd2HkigfuZa/ACRU5TLcMmxatMKgVYC7EO/sLuIplEY8Dd3QUo9qInGZROKQhZw+8cmsd/z/CqtkRNEO6JAAAAABJRU5ErkJggg==) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXBvbGwtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckU7SUF3QkU7UUFsQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFdEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFHcEIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUU1QiwyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFDeEMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsa0JBQWEsR0FBWSxLQUFLLENB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Ozs7aUNBRUUsS0FBSztpQ0FDTCxLQUFLO2tDQUVMLEtBQUs7K0JBQ0wsS0FBSztrQ0FFTCxNQUFNOzhCQUVOLEtBQUs7O0lBd0lSLGtEQUFDO0NBQUEsQUF0SkQsSUFzSkM7U0FqSlksMkNBQTJDOzs7SUFDdEQscUVBQStCOztJQUMvQixxRUFBK0I7O0lBRS9CLHNFQUE4Qjs7SUFDOUIsbUVBQXNCOztJQUV0QixzRUFBa0U7O0lBRWxFLGtFQUE0Qjs7SUFFNUIsNkVBQXdDOztJQUN4Qyw2REFBWTs7SUFDWix3RUFBeUI7O0lBQ3pCLGtFQUFpQjs7SUFDakIsaUVBQWU7O0lBQ2YscUVBQXNCOztJQUN0QixvRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1wb2xsLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItcG9sbC1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlclBvbGxNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG5cbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyVWlkID0gXCJcIjtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcblxuICBpc1BvbGxFeHRlbnNpb25FbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHBvbGxJZCA9IFwiXCI7XG4gIHBvbGxFeHRlbnNpb25EYXRhID0gbnVsbDtcbiAgcG9sbE9wdGlvbnMgPSBbXTtcbiAgdG90YWxWb3RlcyA9IDA7XG4gIHNlbGVjdGVkT3B0aW9uID0gbnVsbDtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcblxuICAgIHRoaXMuY2hlY2tQb2xsRXh0ZW5zaW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheXMgdGhlIHBvbGwgY29tcG9uZW50ICwgb25seSBpZiBpdCBpcyBlbmFibGVkXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGNoZWNrUG9sbEV4dGVuc2lvbigpIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShcIkBpbmplY3RlZFwiKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YVtcIkBpbmplY3RlZFwiXS5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YVtcIkBpbmplY3RlZFwiXVtcbiAgICAgICAgICAgICAgXCJleHRlbnNpb25zXCJcbiAgICAgICAgICAgIF0uaGFzT3duUHJvcGVydHkoXCJwb2xsc1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5pc1BvbGxFeHRlbnNpb25FbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0UG9sbEV4dGVuc2lvbkRhdGEoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBQb2xsIERhdGFcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRQb2xsRXh0ZW5zaW9uRGF0YSgpIHtcbiAgICB0aGlzLnBvbGxFeHRlbnNpb25EYXRhID0gdGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YVtcIkBpbmplY3RlZFwiXVtcbiAgICAgIFwiZXh0ZW5zaW9uc1wiXG4gICAgXVtcInBvbGxzXCJdO1xuXG4gICAgdGhpcy5wb2xsSWQgPSB0aGlzLnBvbGxFeHRlbnNpb25EYXRhLmlkO1xuXG4gICAgdGhpcy50b3RhbFZvdGVzID0gdGhpcy5wb2xsRXh0ZW5zaW9uRGF0YS5yZXN1bHRzLnRvdGFsO1xuXG4gICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyh0aGlzLnBvbGxFeHRlbnNpb25EYXRhLm9wdGlvbnMpO1xuXG4gICAgbGV0IG9wdGlvbkxpc3QgPSBbXTtcbiAgICBvcHRpb25LZXlzLmZvckVhY2goKGN1cnJlbnRJdGVtKSA9PiB7XG4gICAgICAvLyBBZGQgUGVyY2VudGFnZSBjYWxjdWxhdGlvbiBsb2dpY1xuICAgICAgY29uc3Qgb3B0aW9uRGF0YSA9IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEucmVzdWx0cy5vcHRpb25zW2N1cnJlbnRJdGVtXTtcbiAgICAgIGNvbnN0IHZvdGUgPSBvcHRpb25EYXRhW1wiY291bnRcIl07XG4gICAgICBsZXQgY2FsY3VsYXRlZFBlcmNlbnQgPSAwO1xuXG4gICAgICBpZiAodGhpcy50b3RhbFZvdGVzID4gMCkge1xuICAgICAgICBjYWxjdWxhdGVkUGVyY2VudCA9IE1hdGgucm91bmQoKHZvdGUgLyB0aGlzLnRvdGFsVm90ZXMpICogMTAwKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlbGVjdGVkQnlMb2dnZWRJblVzZXIgPSBmYWxzZTtcbiAgICAgIGlmIChvcHRpb25EYXRhLmhhc093blByb3BlcnR5KFwidm90ZXJzXCIpKSB7XG4gICAgICAgIGlmIChvcHRpb25EYXRhLnZvdGVycy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmxvZ2dlZEluVXNlclVpZCkpIHtcbiAgICAgICAgICBzZWxlY3RlZEJ5TG9nZ2VkSW5Vc2VyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvcHRpb25MaXN0LnB1c2goe1xuICAgICAgICBpZDogY3VycmVudEl0ZW0sXG4gICAgICAgIHBlcmNlbnQ6IGNhbGN1bGF0ZWRQZXJjZW50ICsgXCIlXCIsXG4gICAgICAgIHRleHQ6IHRoaXMucG9sbEV4dGVuc2lvbkRhdGEub3B0aW9uc1tjdXJyZW50SXRlbV0sXG4gICAgICAgIHNlbGVjdGVkQnlMb2dnZWRJblVzZXIsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucG9sbE9wdGlvbnMgPSBbLi4ub3B0aW9uTGlzdF07XG4gIH1cblxuICAvKipcbiAgICogc2VuZHMgdGhlICBhbnN3ZXIgc2VsZWN0ZWQgYnkgdGhlIHVzZXIgZm9yIHRoZSAgdGhlIHBvbGwgcXVlc3Rpb25cbiAgICogQHBhcmFtIEFueSBzZWxlY3RlZE9wdGlvblxuICAgKi9cbiAgYW5zd2VyUG9sbFF1ZXN0aW9uKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IHNlbGVjdGVkT3B0aW9uO1xuXG4gICAgQ29tZXRDaGF0LmNhbGxFeHRlbnNpb24oXCJwb2xsc1wiLCBcIlBPU1RcIiwgXCJ2MS92b3RlXCIsIHtcbiAgICAgIHZvdGU6IHNlbGVjdGVkT3B0aW9uLmlkLFxuICAgICAgaWQ6IHRoaXMucG9sbElkLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuUE9MTF9BTlNXRVJFRCxcbiAgICAgICAgICBwYXlMb2FkOiByZXNwb25zZSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFuc3dlclBvbGxRdWVzdGlvbiBlcnJvclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogZHluYW1pY2FsbHkgYXBwbGllcyBzdHlsZXMgYmFzZWQgb24gY29kaXRpb25zXG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGdldFN0eWxlcyhrZXkgPSBudWxsLCBkYXRhID0gbnVsbCkge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIFwiYW5zd2VyV3JhcHBlclN0eWxlXCI6IHtcbiAgICAgICAgaWYgKGRhdGEuaWQgIT09IHRoaXMuc2VsZWN0ZWRPcHRpb24uaWQpIHtcbiAgICAgICAgICByZXR1cm4geyBiYWNrZ3JvdW5kOiBcIm5vbmVcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9yZXR1cm4geyBiYWNrZ3JvdW5kOiBcIm5vbmVcIiB9O1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuIl19