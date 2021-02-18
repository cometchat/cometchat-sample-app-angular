/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-create-poll/cometchat-create-poll/cometchat-create-poll.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, } from "@angular/forms";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../../utils/messageConstants";
import * as enums from "../../../../../utils/enums";
import { logger } from "../../../../../utils/common";
export class CometChatCreatePollComponent {
    /**
     * @param {?} fb
     */
    constructor(fb) {
        this.fb = fb;
        this.errorText = "";
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.createBtnText = COMETCHAT_CONSTANTS.CREATE;
        this.CREATE_POLL = COMETCHAT_CONSTANTS.CREATE_POLL;
        this.QUESTION = COMETCHAT_CONSTANTS.QUESTION;
        this.ENTER_YOUR_QUESTION = COMETCHAT_CONSTANTS.ENTER_YOUR_QUESTION;
        this.OPTIONS = COMETCHAT_CONSTANTS.OPTIONS;
        this.ENTER_YOUR_OPTION = COMETCHAT_CONSTANTS.ENTER_YOUR_OPTION;
        this.ADD_NEW_OPTION = COMETCHAT_CONSTANTS.ADD_NEW_OPTION;
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
    ngOnInit() { }
    /**
     * Used to add an extra option
     * @return {?}
     */
    addPollOption() {
        try {
            ((/** @type {?} */ (this.pollFormData.get(enums.OPTION_ITEMS)))).push(this.fb.control(null));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Used to remove an extra option
     * @param {?} index
     * @return {?}
     */
    removePollOption(index) {
        try {
            ((/** @type {?} */ (this.pollFormData.get(enums.OPTION_ITEMS)))).removeAt(index);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * used to add options in poll dynamically as form control
     * @return {?}
     */
    getOptionsFormControls() {
        try {
            return ((/** @type {?} */ (this.pollFormData.get(enums.OPTION_ITEMS)))).controls;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Creates the poll
     * @param {?} values
     * @return {?}
     */
    createPoll(values) {
        try {
            if (values.question.trim().length === 0) {
                this.errorText = COMETCHAT_CONSTANTS.POLL_QUESTION_BLANK;
                return false;
            }
            if (values.firstOption.trim().length === 0 ||
                values.secondOption.trim().length === 0) {
                this.errorText = COMETCHAT_CONSTANTS.POLL_OPTION_BLANK;
                return false;
            }
            /** @type {?} */
            let optionList = [
                values.firstOption,
                values.secondOption,
                ...values.optionItems,
            ];
            /** @type {?} */
            let receiverId;
            /** @type {?} */
            let receiverType = this.type;
            if (this.type === CometChat.RECEIVER_TYPE.USER) {
                receiverId = this.item.uid;
            }
            else if (this.type === CometChat.RECEIVER_TYPE.GROUP) {
                receiverId = this.item.guid;
            }
            if (this.createBtnText == COMETCHAT_CONSTANTS.CREATING_MESSSAGE) {
                return;
            }
            this.createBtnText = COMETCHAT_CONSTANTS.CREATING_MESSSAGE;
            CometChat.callExtension(enums.POLLS, enums.POST, enums.V1_CREATE, {
                question: values.question,
                options: optionList,
                receiver: receiverId,
                receiverType: receiverType,
            })
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                /** @type {?} */
                const data = response.message.data;
                /** @type {?} */
                const customData = data.data.customData;
                /** @type {?} */
                const options = customData.options;
                /** @type {?} */
                const resultOptions = {};
                for (const option in options) {
                    resultOptions[option] = {
                        text: options[option],
                        count: 0,
                    };
                }
                /** @type {?} */
                const polls = {
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
                const message = Object.assign({}, data, { sender: { uid: data.sender }, metadata: { "@injected": { extensions: { polls: polls } } } });
                this.actionGenerated.emit({
                    type: enums.POLL_CREATED,
                    payLoad: message,
                });
                this.errorText = "";
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger(enums.ERROR, error);
                this.errorText = error.message.message;
            }))
                .finally((/**
             * @return {?}
             */
            () => {
                this.createBtnText = COMETCHAT_CONSTANTS.CREATE;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Resets Information of poll to initial conditons
     * @return {?}
     */
    resetPollFormData() {
        try {
            this.pollFormData.reset();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits an action to close the poll view
     * @return {?}
     */
    closePollView() {
        try {
            this.actionGenerated.emit({ type: enums.CLOSE_POLL_VIEW, payLoad: null });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatCreatePollComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-create-poll",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <form [formGroup]=\"pollFormData\" (ngSubmit)=\"createPoll(pollFormData.value)\">\n    <div class=\"modalWrapperStyle\">\n      <span class=\"modalCloseStyle\" (click)=\"closePollView()\"></span>\n      <div class=\"modalBodyStyle\">\n        <table class=\"modalTableStyle\">\n          <caption class=\"tableCaptionStyle\">\n            {{\n              CREATE_POLL\n            }}\n          </caption>\n          <tbody class=\"tableBodyStyle\">\n            <tr class=\"tableRowStyle\">\n              <td colSpan=\"3\" class=\"tableDataStyle\">\n                <div class=\"modalErrorStyle\">{{ errorText }}</div>\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ QUESTION }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  autoFocus\n                  tabIndex=\"1\"\n                  [placeholder]=\"ENTER_YOUR_QUESTION\"\n                  formControlName=\"question\"\n                />\n              </td>\n            </tr>\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ OPTIONS }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"firstOption\"\n                />\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"secondOption\"\n                />\n              </td>\n            </tr>\n\n            <!--  POLL OPTION VIEW BELOW -->\n            <tr\n              class=\"tableRowStyle\"\n              *ngFor=\"let option of getOptionsFormControls(); let i = index\"\n            >\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  [formControl]=\"option\"\n                />\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Remove Icon -->\n                <span\n                  class=\"optionIconStyle removeIcon\"\n                  (click)=\"removePollOption(i)\"\n                ></span>\n              </td>\n            </tr>\n            <!--  POLL OPTION VIEW ABOVE -->\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td class=\"tableDataStyle\">\n                <label class=\"tableDataLabelStyle\">{{ ADD_NEW_OPTION }}</label>\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Add Icon -->\n                <span\n                  class=\"optionIconStyle addIcon\"\n                  (click)=\"addPollOption()\"\n                ></span>\n              </td>\n            </tr>\n          </tbody>\n          <tfoot class=\"tableFootStyle\">\n            <tr>\n              <td colSpan=\"2\">\n                <button type=\"submit\">{{ createBtnText }}</button>\n              </td>\n            </tr>\n          </tfoot>\n        </table>\n      </div>\n    </div>\n  </form>\n</div>\n",
                styles: [".optionIconStyle{background-size:28px 28px;cursor:pointer;display:block;height:28px;width:28px}.addIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.removeIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAA/6RFgAAABVUlEQVQ4Ea2VzUoCURSAr1qhi14gN0mLDETCCmrZyl24cR9EK9dBb9Jz9B7B2B8VRJRRa0FIIcm+M3FtZjgz5u0e+Ljec8/55qBzMWdmxMSYVUrqUIYveIduzphX1vkCWQGOIYBJChfkDyH/JzuFNbiFNGEy36V2PVNOQRMGc0jtQ/r07KtyDuqO0qi8GpMjXIQHsEWu6zWOwlTOpuNBaoc5iorvPYovQzHCDY9SO3VF3sHGdHR/HxoLuFYU34jcAfSUs2hqjc05iCcaZUloN+eTvFxdIStKHI4hKc5LQmteJn8DrvEm0/78iq4Kve8qTPNWPHl8M+5Ear/fM/3BTtlfF9MW4cXD1I84lmLjkNiF0T/kH/Rux6R2w0HbUT6kr2U96krBHvTAXs9Z6zO1O6osmaSwBKeQ9QARnkAx2S97/hOzg8YtKjZBrj7b8EIFNAZ8To1vlTPgMjYmAh4AAAAASUVORK5CYII=) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.iconWrapperStyle{width:50px}.modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalErrorStyle{font-size:12px;color:red;text-align:center}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border-bottom:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableDataStyle{padding:6px 12px;font-size:14px}.tableDataWidthStyle{width:110px}.tableRowStyle{padding:6px 12px}.tableDataInputStyle{width:100%;border:none;padding:6px 12px;font-size:14px}.tableDataInputStyle:focus{outline:0}.tableBodyStyle tr td label,.tableDataLabelStyle{padding:6px 12px}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{height:100%;width:100%}}"]
            }] }
];
/** @nocollapse */
CometChatCreatePollComponent.ctorParameters = () => [
    { type: FormBuilder }
];
CometChatCreatePollComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatCreatePollComponent.prototype.pollFormData;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.errorText;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.item;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.type;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.createBtnText;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.CREATE_POLL;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.QUESTION;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.ENTER_YOUR_QUESTION;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.OPTIONS;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.ENTER_YOUR_OPTION;
    /** @type {?} */
    CometChatCreatePollComponent.prototype.ADD_NEW_OPTION;
    /**
     * @type {?}
     * @private
     */
    CometChatCreatePollComponent.prototype.fb;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvQ29tZXRDaGF0LWNyZWF0ZS1wb2xsL2NvbWV0Y2hhdC1jcmVhdGUtcG9sbC9jb21ldGNoYXQtY3JlYXRlLXBvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsV0FBVyxHQUlaLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sS0FBSyxLQUFLLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTXJELE1BQU0sT0FBTyw0QkFBNEI7Ozs7SUFnQnZDLFlBQW9CLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBZG5DLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDTixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsa0JBQWEsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7UUFDM0MsZ0JBQVcsR0FBVyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7UUFDdEQsYUFBUSxHQUFXLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztRQUNoRCx3QkFBbUIsR0FBVyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUN0RSxZQUFPLEdBQVcsbUJBQW1CLENBQUMs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V0FBVzs7O21CQWtCVixLQUFLO21CQUNMLEtBQUs7OEJBRUwsTUFBTTs7OztJQUxQLG9EQUF3Qjs7SUFDeEIsaURBQWU7O0lBQ2YsNENBQXFCOztJQUNyQiw0Q0FBcUI7O0lBRXJCLHVEQUFrRTs7SUFFbEUscURBQTJDOztJQUMzQyxtREFBc0Q7O0lBQ3RELGdEQUFnRDs7SUFDaEQsMkRBQXNFOztJQUN0RSwrQ0FBOEM7O0lBQzlDLHlEQUFrRTs7SUFDbEUsc0RBQTREOzs7OztJQUVoRCwwQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtR3JvdXAsXG4gIEZvcm1BcnJheSxcbiAgQWJzdHJhY3RDb250cm9sLFxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNyZWF0ZS1wb2xsXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY3JlYXRlLXBvbGwuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0Q3JlYXRlUG9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHBvbGxGb3JtRGF0YTogRm9ybUdyb3VwO1xuICBlcnJvclRleHQgPSBcIlwiO1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY3JlYXRlQnRuVGV4dCA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQ1JFQVRFO1xuICBDUkVBVEVfUE9MTDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVEVfUE9MTDtcbiAgUVVFU1RJT046IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuUVVFU1RJT047XG4gIEVOVEVSX1lPVVJfUVVFU1RJT046IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuRU5URVJfWU9VUl9RVUVTVElPTjtcbiAgT1BUSU9OUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5PUFRJT05TO1xuICBFTlRFUl9ZT1VSX09QVElPTjogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5FTlRFUl9ZT1VSX09QVElPTjtcbiAgQUREX05FV19PUFRJT046IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQUREX05FV19PUFRJT047XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLnBvbGxGb3JtRGF0YSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcXVlc3Rpb246IFwiXCIsXG4gICAgICBmaXJzdE9wdGlvbjogXCJcIixcbiAgICAgIHNlY29uZE9wdGlvbjogXCJcIixcbiAgICAgIG9wdGlvbkl0ZW1zOiB0aGlzLmZiLmFycmF5KFtdKSxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogVXNlZCB0byBhZGQgYW4gZXh0cmEgb3B0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWRkUG9sbE9wdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgKHRoaXMucG9sbEZvcm1EYXRhLmdldChlbnVtcy5PUFRJT05fSVRFTVMpIGFzIEZvcm1BcnJheSkucHVzaChcbiAgICAgICAgdGhpcy5mYi5jb250cm9sKG51bGwpXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHJlbW92ZSBhbiBleHRyYSBvcHRpb25cbiAgICogQHBhcmFtIG51bWJlciBpbmRleFxuICAgKi9cbiAgcmVtb3ZlUG9sbE9wdGlvbihpbmRleCkge1xuICAgIHRyeSB7XG4gICAgICAodGhpcy5wb2xsRm9ybURhdGEuZ2V0KGVudW1zLk9QVElPTl9JVEVNUykgYXMgRm9ybUFycmF5KS5yZW1vdmVBdChpbmRleCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVzZWQgdG8gYWRkIG9wdGlvbnMgaW4gcG9sbCBkeW5hbWljYWxseSBhcyBmb3JtIGNvbnRyb2xcbiAgICovXG4gIGdldE9wdGlvbnNGb3JtQ29udHJvbHMoKTogQWJzdHJhY3RDb250cm9sW10ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKDxGb3JtQXJyYXk+dGhpcy5wb2xsRm9ybURhdGEuZ2V0KGVudW1zLk9QVElPTl9JVEVNUykpLmNvbnRyb2xzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBwb2xsXG4gICAqIEBwYXJhbSBBbnkgdmFsdWVzXG4gICAqL1xuICBjcmVhdGVQb2xsKHZhbHVlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAodmFsdWVzLnF1ZXN0aW9uLnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lcnJvclRleHQgPSBDT01FVENIQVRfQ09OU1RBTlRTLlBPTExfUVVFU1RJT05fQkxBTks7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB2YWx1ZXMuZmlyc3RPcHRpb24udHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICB2YWx1ZXMuc2Vjb25kT3B0aW9uLnRyaW0oKS5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLmVycm9yVGV4dCA9IENPTUVUQ0hBVF9DT05TVEFOVFMuUE9MTF9PUFRJT05fQkxBTks7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbGV0IG9wdGlvbkxpc3QgPSBbXG4gICAgICAgIHZhbHVlcy5maXJzdE9wdGlvbixcbiAgICAgICAgdmFsdWVzLnNlY29uZE9wdGlvbixcbiAgICAgICAgLi4udmFsdWVzLm9wdGlvbkl0ZW1zLFxuICAgICAgXTtcblxuICAgICAgbGV0IHJlY2VpdmVySWQ7XG4gICAgICBsZXQgcmVjZWl2ZXJUeXBlID0gdGhpcy50eXBlO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUikge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUJ0blRleHQgPT0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVElOR19NRVNTU0FHRSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3JlYXRlQnRuVGV4dCA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQ1JFQVRJTkdfTUVTU1NBR0U7XG5cbiAgICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKGVudW1zLlBPTExTLCBlbnVtcy5QT1NULCBlbnVtcy5WMV9DUkVBVEUsIHtcbiAgICAgICAgcXVlc3Rpb246IHZhbHVlcy5xdWVzdGlvbixcbiAgICAgICAgb3B0aW9uczogb3B0aW9uTGlzdCxcbiAgICAgICAgcmVjZWl2ZXI6IHJlY2VpdmVySWQsXG4gICAgICAgIHJlY2VpdmVyVHlwZTogcmVjZWl2ZXJUeXBlLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UubWVzc2FnZS5kYXRhO1xuICAgICAgICAgIGNvbnN0IGN1c3RvbURhdGEgPSBkYXRhLmRhdGEuY3VzdG9tRGF0YTtcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gY3VzdG9tRGF0YS5vcHRpb25zO1xuXG4gICAgICAgICAgY29uc3QgcmVzdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdE9wdGlvbnNbb3B0aW9uXSA9IHtcbiAgICAgICAgICAgICAgdGV4dDogb3B0aW9uc1tvcHRpb25dLFxuICAgICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcG9sbHMgPSB7XG4gICAgICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICByZXN1bHRzOiB7XG4gICAgICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgICAgICBvcHRpb25zOiByZXN1bHRPcHRpb25zLFxuICAgICAgICAgICAgICBxdWVzdGlvbjogY3VzdG9tRGF0YS5xdWVzdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVzdGlvbjogY3VzdG9tRGF0YS5xdWVzdGlvbixcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICBzZW5kZXI6IHsgdWlkOiBkYXRhLnNlbmRlciB9LFxuICAgICAgICAgICAgbWV0YWRhdGE6IHsgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBwb2xscyB9IH0gfSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5QT0xMX0NSRUFURUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZXJyb3JUZXh0ID0gXCJcIjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihlbnVtcy5FUlJPUiwgZXJyb3IpO1xuICAgICAgICAgIHRoaXMuZXJyb3JUZXh0ID0gZXJyb3IubWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVCdG5UZXh0ID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVEU7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgSW5mb3JtYXRpb24gb2YgcG9sbCB0byBpbml0aWFsIGNvbmRpdG9uc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlc2V0UG9sbEZvcm1EYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnBvbGxGb3JtRGF0YS5yZXNldCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBhY3Rpb24gdG8gY2xvc2UgdGhlIHBvbGwgdmlld1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlUG9sbFZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoeyB0eXBlOiBlbnVtcy5DTE9TRV9QT0xMX1ZJRVcsIHBheUxvYWQ6IG51bGwgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=