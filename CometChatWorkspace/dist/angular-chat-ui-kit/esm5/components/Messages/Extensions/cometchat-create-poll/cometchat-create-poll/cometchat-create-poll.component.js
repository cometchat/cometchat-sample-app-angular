/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-create-poll/cometchat-create-poll/cometchat-create-poll.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, } from "@angular/forms";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
var CometchatCreatePollComponent = /** @class */ (function () {
    function CometchatCreatePollComponent(fb) {
        this.fb = fb;
        this.errorText = "";
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.createBtnText = STRING_MESSAGES.CREATE;
        this.CREATE_POLL = STRING_MESSAGES.CREATE_POLL;
        this.QUESTION = STRING_MESSAGES.QUESTION;
        this.ENTER_YOUR_QUESTION = STRING_MESSAGES.ENTER_YOUR_QUESTION;
        this.OPTIONS = STRING_MESSAGES.OPTIONS;
        this.ENTER_YOUR_OPTION = STRING_MESSAGES.ENTER_YOUR_OPTION;
        this.ADD_NEW_OPTION = STRING_MESSAGES.ADD_NEW_OPTION;
        this.pollFormData = this.fb.group({
            question: "",
            firstOption: "",
            secondOption: "",
            optionItems: this.fb.array([]),
        });
    }
    /**
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Used to add an extra option
     * @param
     */
    /**
     * Used to add an extra option
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.addPollOption = /**
     * Used to add an extra option
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.pollFormData.get("optionItems")))).push(this.fb.control(null));
    };
    /**
     * Used to remove an extra option
     * @param number index
     */
    /**
     * Used to remove an extra option
     * @param {?} index
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.removePollOption = /**
     * Used to remove an extra option
     * @param {?} index
     * @return {?}
     */
    function (index) {
        ((/** @type {?} */ (this.pollFormData.get("optionItems")))).removeAt(index);
    };
    /**
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.getOptionsFormControls = /**
     * @return {?}
     */
    function () {
        return ((/** @type {?} */ (this.pollFormData.get("optionItems")))).controls;
    };
    /**
     * Creates the poll
     * @param Any values
     */
    /**
     * Creates the poll
     * @param {?} values
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.createPoll = /**
     * Creates the poll
     * @param {?} values
     * @return {?}
     */
    function (values) {
        // console.log("create Poll View --> create poll with below data", values);
        var _this = this;
        if (values.question.trim().length === 0) {
            this.errorText = STRING_MESSAGES.POLL_QUESTION_BLANK;
            return false;
        }
        if (values.firstOption.trim().length === 0 ||
            values.secondOption.trim().length === 0) {
            this.errorText = STRING_MESSAGES.POLL_OPTION_BLANK;
            return false;
        }
        /** @type {?} */
        var optionList = tslib_1.__spread([
            values.firstOption,
            values.secondOption
        ], values.optionItems);
        /** @type {?} */
        var receiverId;
        /** @type {?} */
        var receiverType = this.type;
        if (this.type === "user") {
            receiverId = this.item.uid;
        }
        else if (this.type === "group") {
            receiverId = this.item.guid;
        }
        if (this.createBtnText == STRING_MESSAGES.CREATING_MESSSAGE) {
            return;
        }
        this.createBtnText = STRING_MESSAGES.CREATING_MESSSAGE;
        CometChat.callExtension("polls", "POST", "v1/create", {
            question: values.question,
            options: optionList,
            receiver: receiverId,
            receiverType: receiverType,
        })
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            //const data = response.message.data;
            /** @type {?} */
            var data = response.message.data;
            /** @type {?} */
            var customData = data.data.customData;
            /** @type {?} */
            var options = customData.options;
            /** @type {?} */
            var resultOptions = {};
            for (var option in options) {
                resultOptions[option] = {
                    text: options[option],
                    count: 0,
                };
            }
            /** @type {?} */
            var polls = {
                id: data.id,
                options: options,
                results: {
                    total: 0,
                    options: resultOptions,
                    question: customData.question,
                },
                question: customData.question,
            };
            /** @type {?} */
            var message = tslib_1.__assign({}, data, { sender: { uid: data.sender }, metadata: { "@injected": { extensions: { polls: polls } } } });
            // console.log(" create poll view --> poll created ", message);
            _this.actionGenerated.emit({
                type: enums.POLL_CREATED,
                payLoad: message,
            });
            _this.errorText = "";
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("error", error);
            _this.errorText = error.message.message;
        }))
            .finally((/**
         * @return {?}
         */
        function () {
            _this.createBtnText = STRING_MESSAGES.CREATE;
        }));
        //this.resetPollFormData();
    };
    /**
     * Resets Information of poll to initial conditons
     * @param
     */
    /**
     * Resets Information of poll to initial conditons
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.resetPollFormData = /**
     * Resets Information of poll to initial conditons
     * @return {?}
     */
    function () {
        this.pollFormData.reset();
    };
    /**
     * Emits an action to close the poll view
     * @param
     */
    /**
     * Emits an action to close the poll view
     * @return {?}
     */
    CometchatCreatePollComponent.prototype.closePollView = /**
     * Emits an action to close the poll view
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.CLOSE_POLL_VIEW, payLoad: null });
    };
    CometchatCreatePollComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-create-poll",
                    template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <form [formGroup]=\"pollFormData\" (ngSubmit)=\"createPoll(pollFormData.value)\">\n    <div class=\"modalWrapperStyle\">\n      <span class=\"modalCloseStyle\" (click)=\"closePollView()\"></span>\n      <div class=\"modalBodyStyle\">\n        <table class=\"modalTableStyle\">\n          <caption class=\"tableCaptionStyle\">\n            {{\n              CREATE_POLL\n            }}\n          </caption>\n          <tbody class=\"tableBodyStyle\">\n            <tr class=\"tableRowStyle\">\n              <td colSpan=\"3\" class=\"tableDataStyle\">\n                <div class=\"modalErrorStyle\">{{ errorText }}</div>\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ QUESTION }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  autoFocus\n                  tabIndex=\"1\"\n                  [placeholder]=\"ENTER_YOUR_QUESTION\"\n                  formControlName=\"question\"\n                />\n              </td>\n            </tr>\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ OPTIONS }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"firstOption\"\n                />\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"secondOption\"\n                />\n              </td>\n            </tr>\n\n            <!--  POLL OPTION VIEW BELOW -->\n            <tr\n              class=\"tableRowStyle\"\n              *ngFor=\"let option of getOptionsFormControls(); let i = index\"\n            >\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  [formControl]=\"option\"\n                />\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Remove Icon -->\n                <span\n                  class=\"optionIconStyle removeIcon\"\n                  (click)=\"removePollOption(i)\"\n                ></span>\n              </td>\n            </tr>\n            <!--  POLL OPTION VIEW ABOVE -->\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td class=\"tableDataStyle\">\n                <label class=\"tableDataLabelStyle\">{{ ADD_NEW_OPTION }}</label>\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Add Icon -->\n                <span\n                  class=\"optionIconStyle addIcon\"\n                  (click)=\"addPollOption()\"\n                ></span>\n              </td>\n            </tr>\n          </tbody>\n          <tfoot class=\"tableFootStyle\">\n            <tr>\n              <td colSpan=\"2\">\n                <button type=\"submit\">{{ createBtnText }}</button>\n              </td>\n            </tr>\n          </tfoot>\n        </table>\n      </div>\n    </div>\n  </form>\n</div>\n",
                    styles: [".optionIconStyle{background-size:28px 28px;cursor:pointer;display:block;height:28px;width:28px}.addIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.removeIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAA/6RFgAAABVUlEQVQ4Ea2VzUoCURSAr1qhi14gN0mLDETCCmrZyl24cR9EK9dBb9Jz9B7B2B8VRJRRa0FIIcm+M3FtZjgz5u0e+Ljec8/55qBzMWdmxMSYVUrqUIYveIduzphX1vkCWQGOIYBJChfkDyH/JzuFNbiFNGEy36V2PVNOQRMGc0jtQ/r07KtyDuqO0qi8GpMjXIQHsEWu6zWOwlTOpuNBaoc5iorvPYovQzHCDY9SO3VF3sHGdHR/HxoLuFYU34jcAfSUs2hqjc05iCcaZUloN+eTvFxdIStKHI4hKc5LQmteJn8DrvEm0/78iq4Kve8qTPNWPHl8M+5Ear/fM/3BTtlfF9MW4cXD1I84lmLjkNiF0T/kH/Rux6R2w0HbUT6kr2U96krBHvTAXs9Z6zO1O6osmaSwBKeQ9QARnkAx2S97/hOzg8YtKjZBrj7b8EIFNAZ8To1vlTPgMjYmAh4AAAAASUVORK5CYII=) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.iconWrapperStyle{width:50px}.modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalErrorStyle{font-size:12px;color:red;text-align:center}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border-bottom:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableDataStyle{padding:6px 12px;font-size:14px}.tableDataWidthStyle{width:110px}.tableRowStyle{padding:6px 12px}.tableDataInputStyle{width:100%;border:none;padding:6px 12px;font-size:14px}.tableDataInputStyle:focus{outline:0}.tableBodyStyle tr td label,.tableDataLabelStyle{padding:6px 12px}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{height:100%;width:100%}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatCreatePollComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    CometchatCreatePollComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatCreatePollComponent;
}());
export { CometchatCreatePollComponent };
if (false) {
    /** @type {?} */
    CometchatCreatePollComponent.prototype.pollFormData;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.errorText;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.item;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.type;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.createBtnText;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.CREATE_POLL;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.QUESTION;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.ENTER_YOUR_QUESTION;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.OPTIONS;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.ENTER_YOUR_OPTION;
    /** @type {?} */
    CometchatCreatePollComponent.prototype.ADD_NEW_OPTION;
    /**
     * @type {?}
     * @private
     */
    CometchatCreatePollComponent.prototype.fb;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LWNyZWF0ZS1wb2xsL2NvbWV0Y2hhdC1jcmVhdGUtcG9sbC9jb21ldGNoYXQtY3JlYXRlLXBvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUNMLFdBQVcsR0FJWixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRDtJQXFCRSxzQ0FBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUFkbkMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNOLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVgsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxrQkFBYSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDdkMsZ0JBQVcsR0FBVyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ2xELGFBQVEsR0FBVyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzVDLHdCQUFtQixHQUFXLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQztRQUNsRSxZQUFPLEdBQVcsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxzQkFBaUIsR0FBVyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDOUQsbUJBQWMsR0FBVyxlQUFlLENB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O1lBQ1AsS0FBSSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUFDO1FBRUwsMkJBQTJCO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsd0RBQWlCOzs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILG9EQUFhOzs7O0lBQWI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7O2dCQXBLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsb2dJQUFxRDs7aUJBRXREOzs7O2dCQWJDLFdBQVc7Ozt1QkFpQlYsS0FBSzt1QkFDTCxLQUFLO2tDQUVMLE1BQU07O0lBMEpULG1DQUFDO0NBQUEsQUFyS0QsSUFxS0M7U0FoS1ksNEJBQTRCOzs7SUFDdkMsb0RBQXdCOztJQUN4QixpREFBZTs7SUFDZiw0Q0FBcUI7O0lBQ3JCLDRDQUFxQjs7SUFFckIsdURBQWtFOztJQUVsRSxxREFBdUM7O0lBQ3ZDLG1EQUFrRDs7SUFDbEQsZ0RBQTRDOztJQUM1QywyREFBa0U7O0lBQ2xFLCtDQUEwQzs7SUFDMUMseURBQThEOztJQUM5RCxzREFBd0Q7Ozs7O0lBRTVDLDBDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Hcm91cCxcbiAgRm9ybUFycmF5LFxuICBBYnN0cmFjdENvbnRyb2wsXG59IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1jcmVhdGUtcG9sbFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jcmVhdGUtcG9sbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdENyZWF0ZVBvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwb2xsRm9ybURhdGE6IEZvcm1Hcm91cDtcbiAgZXJyb3JUZXh0ID0gXCJcIjtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNyZWF0ZUJ0blRleHQgPSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRFO1xuICBDUkVBVEVfUE9MTDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNSRUFURV9QT0xMO1xuICBRVUVTVElPTjogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlFVRVNUSU9OO1xuICBFTlRFUl9ZT1VSX1FVRVNUSU9OOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuRU5URVJfWU9VUl9RVUVTVElPTjtcbiAgT1BUSU9OUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk9QVElPTlM7XG4gIEVOVEVSX1lPVVJfT1BUSU9OOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuRU5URVJfWU9VUl9PUFRJT047XG4gIEFERF9ORVdfT1BUSU9OOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQUREX05FV19PUFRJT047XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLnBvbGxGb3JtRGF0YSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcXVlc3Rpb246IFwiXCIsXG4gICAgICBmaXJzdE9wdGlvbjogXCJcIixcbiAgICAgIHNlY29uZE9wdGlvbjogXCJcIixcbiAgICAgIG9wdGlvbkl0ZW1zOiB0aGlzLmZiLmFycmF5KFtdKSxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogVXNlZCB0byBhZGQgYW4gZXh0cmEgb3B0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWRkUG9sbE9wdGlvbigpIHtcbiAgICAodGhpcy5wb2xsRm9ybURhdGEuZ2V0KFwib3B0aW9uSXRlbXNcIikgYXMgRm9ybUFycmF5KS5wdXNoKFxuICAgICAgdGhpcy5mYi5jb250cm9sKG51bGwpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHJlbW92ZSBhbiBleHRyYSBvcHRpb25cbiAgICogQHBhcmFtIG51bWJlciBpbmRleFxuICAgKi9cbiAgcmVtb3ZlUG9sbE9wdGlvbihpbmRleCkge1xuICAgICh0aGlzLnBvbGxGb3JtRGF0YS5nZXQoXCJvcHRpb25JdGVtc1wiKSBhcyBGb3JtQXJyYXkpLnJlbW92ZUF0KGluZGV4KTtcbiAgfVxuXG4gIGdldE9wdGlvbnNGb3JtQ29udHJvbHMoKTogQWJzdHJhY3RDb250cm9sW10ge1xuICAgIHJldHVybiAoPEZvcm1BcnJheT50aGlzLnBvbGxGb3JtRGF0YS5nZXQoXCJvcHRpb25JdGVtc1wiKSkuY29udHJvbHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcG9sbFxuICAgKiBAcGFyYW0gQW55IHZhbHVlc1xuICAgKi9cbiAgY3JlYXRlUG9sbCh2YWx1ZXMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZSBQb2xsIFZpZXcgLS0+IGNyZWF0ZSBwb2xsIHdpdGggYmVsb3cgZGF0YVwiLCB2YWx1ZXMpO1xuXG4gICAgaWYgKHZhbHVlcy5xdWVzdGlvbi50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmVycm9yVGV4dCA9IFNUUklOR19NRVNTQUdFUy5QT0xMX1FVRVNUSU9OX0JMQU5LO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHZhbHVlcy5maXJzdE9wdGlvbi50cmltKCkubGVuZ3RoID09PSAwIHx8XG4gICAgICB2YWx1ZXMuc2Vjb25kT3B0aW9uLnRyaW0oKS5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIHRoaXMuZXJyb3JUZXh0ID0gU1RSSU5HX01FU1NBR0VTLlBPTExfT1BUSU9OX0JMQU5LO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25MaXN0ID0gW1xuICAgICAgdmFsdWVzLmZpcnN0T3B0aW9uLFxuICAgICAgdmFsdWVzLnNlY29uZE9wdGlvbixcbiAgICAgIC4uLnZhbHVlcy5vcHRpb25JdGVtcyxcbiAgICBdO1xuXG4gICAgbGV0IHJlY2VpdmVySWQ7XG4gICAgbGV0IHJlY2VpdmVyVHlwZSA9IHRoaXMudHlwZTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInVzZXJcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS5ndWlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNyZWF0ZUJ0blRleHQgPT0gU1RSSU5HX01FU1NBR0VTLkNSRUFUSU5HX01FU1NTQUdFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkNSRUFUSU5HX01FU1NTQUdFO1xuXG4gICAgQ29tZXRDaGF0LmNhbGxFeHRlbnNpb24oXCJwb2xsc1wiLCBcIlBPU1RcIiwgXCJ2MS9jcmVhdGVcIiwge1xuICAgICAgcXVlc3Rpb246IHZhbHVlcy5xdWVzdGlvbixcbiAgICAgIG9wdGlvbnM6IG9wdGlvbkxpc3QsXG4gICAgICByZWNlaXZlcjogcmVjZWl2ZXJJZCxcbiAgICAgIHJlY2VpdmVyVHlwZTogcmVjZWl2ZXJUeXBlLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAvL2NvbnN0IGRhdGEgPSByZXNwb25zZS5tZXNzYWdlLmRhdGE7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5tZXNzYWdlLmRhdGE7XG4gICAgICAgIGNvbnN0IGN1c3RvbURhdGEgPSBkYXRhLmRhdGEuY3VzdG9tRGF0YTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGN1c3RvbURhdGEub3B0aW9ucztcblxuICAgICAgICBjb25zdCByZXN1bHRPcHRpb25zID0ge307XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICByZXN1bHRPcHRpb25zW29wdGlvbl0gPSB7XG4gICAgICAgICAgICB0ZXh0OiBvcHRpb25zW29wdGlvbl0sXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9sbHMgPSB7XG4gICAgICAgICAgaWQ6IGRhdGEuaWQsXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICByZXN1bHRzOiB7XG4gICAgICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHJlc3VsdE9wdGlvbnMsXG4gICAgICAgICAgICBxdWVzdGlvbjogY3VzdG9tRGF0YS5xdWVzdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHF1ZXN0aW9uOiBjdXN0b21EYXRhLnF1ZXN0aW9uLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICBzZW5kZXI6IHsgdWlkOiBkYXRhLnNlbmRlciB9LFxuICAgICAgICAgIG1ldGFkYXRhOiB7IFwiQGluamVjdGVkXCI6IHsgZXh0ZW5zaW9uczogeyBwb2xsczogcG9sbHMgfSB9IH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgY3JlYXRlIHBvbGwgdmlldyAtLT4gcG9sbCBjcmVhdGVkIFwiLCBtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5QT0xMX0NSRUFURUQsXG4gICAgICAgICAgcGF5TG9hZDogbWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0ID0gXCJcIjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB0aGlzLmVycm9yVGV4dCA9IGVycm9yLm1lc3NhZ2UubWVzc2FnZTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlQnRuVGV4dCA9IFNUUklOR19NRVNTQUdFUy5DUkVBVEU7XG4gICAgICB9KTtcblxuICAgIC8vdGhpcy5yZXNldFBvbGxGb3JtRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBJbmZvcm1hdGlvbiBvZiBwb2xsIHRvIGluaXRpYWwgY29uZGl0b25zXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVzZXRQb2xsRm9ybURhdGEoKSB7XG4gICAgdGhpcy5wb2xsRm9ybURhdGEucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBhY3Rpb24gdG8gY2xvc2UgdGhlIHBvbGwgdmlld1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlUG9sbFZpZXcoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNMT1NFX1BPTExfVklFVywgcGF5TG9hZDogbnVsbCB9KTtcbiAgfVxufVxuIl19