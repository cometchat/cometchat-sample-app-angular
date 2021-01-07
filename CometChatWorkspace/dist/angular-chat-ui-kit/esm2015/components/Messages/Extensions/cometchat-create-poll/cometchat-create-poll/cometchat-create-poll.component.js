/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-create-poll/cometchat-create-poll/cometchat-create-poll.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, } from "@angular/forms";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
export class CometchatCreatePollComponent {
    /**
     * @param {?} fb
     */
    constructor(fb) {
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
    ngOnInit() { }
    /**
     * Used to add an extra option
     * @return {?}
     */
    addPollOption() {
        ((/** @type {?} */ (this.pollFormData.get("optionItems")))).push(this.fb.control(null));
    }
    /**
     * Used to remove an extra option
     * @param {?} index
     * @return {?}
     */
    removePollOption(index) {
        ((/** @type {?} */ (this.pollFormData.get("optionItems")))).removeAt(index);
    }
    /**
     * @return {?}
     */
    getOptionsFormControls() {
        return ((/** @type {?} */ (this.pollFormData.get("optionItems")))).controls;
    }
    /**
     * Creates the poll
     * @param {?} values
     * @return {?}
     */
    createPoll(values) {
        // console.log("create Poll View --> create poll with below data", values);
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
        let optionList = [
            values.firstOption,
            values.secondOption,
            ...values.optionItems,
        ];
        /** @type {?} */
        let receiverId;
        /** @type {?} */
        let receiverType = this.type;
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
        (response) => {
            //const data = response.message.data;
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
            // console.log(" create poll view --> poll created ", message);
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
            console.log("error", error);
            this.errorText = error.message.message;
        }))
            .finally((/**
         * @return {?}
         */
        () => {
            this.createBtnText = STRING_MESSAGES.CREATE;
        }));
        //this.resetPollFormData();
    }
    /**
     * Resets Information of poll to initial conditons
     * @return {?}
     */
    resetPollFormData() {
        this.pollFormData.reset();
    }
    /**
     * Emits an action to close the poll view
     * @return {?}
     */
    closePollView() {
        this.actionGenerated.emit({ type: enums.CLOSE_POLL_VIEW, payLoad: null });
    }
}
CometchatCreatePollComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-create-poll",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <form [formGroup]=\"pollFormData\" (ngSubmit)=\"createPoll(pollFormData.value)\">\n    <div class=\"modalWrapperStyle\">\n      <span class=\"modalCloseStyle\" (click)=\"closePollView()\"></span>\n      <div class=\"modalBodyStyle\">\n        <table class=\"modalTableStyle\">\n          <caption class=\"tableCaptionStyle\">\n            {{\n              CREATE_POLL\n            }}\n          </caption>\n          <tbody class=\"tableBodyStyle\">\n            <tr class=\"tableRowStyle\">\n              <td colSpan=\"3\" class=\"tableDataStyle\">\n                <div class=\"modalErrorStyle\">{{ errorText }}</div>\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ QUESTION }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  autoFocus\n                  tabIndex=\"1\"\n                  [placeholder]=\"ENTER_YOUR_QUESTION\"\n                  formControlName=\"question\"\n                />\n              </td>\n            </tr>\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">\n                <label class=\"tableDataLabelStyle\">{{ OPTIONS }}</label>\n              </td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"firstOption\"\n                />\n              </td>\n            </tr>\n\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  formControlName=\"secondOption\"\n                />\n              </td>\n            </tr>\n\n            <!--  POLL OPTION VIEW BELOW -->\n            <tr\n              class=\"tableRowStyle\"\n              *ngFor=\"let option of getOptionsFormControls(); let i = index\"\n            >\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td colSpan=\"2\" class=\"tableDataStyle\">\n                <input\n                  class=\"tableDataInputStyle\"\n                  type=\"text\"\n                  [placeholder]=\"ENTER_YOUR_OPTION\"\n                  [formControl]=\"option\"\n                />\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Remove Icon -->\n                <span\n                  class=\"optionIconStyle removeIcon\"\n                  (click)=\"removePollOption(i)\"\n                ></span>\n              </td>\n            </tr>\n            <!--  POLL OPTION VIEW ABOVE -->\n            <tr class=\"tableRowStyle\">\n              <td class=\"tableDataStyle tableDataWidthStyle\">&nbsp;</td>\n              <td class=\"tableDataStyle\">\n                <label class=\"tableDataLabelStyle\">{{ ADD_NEW_OPTION }}</label>\n              </td>\n              <td class=\"iconWrapperStyle tableDataStyle\">\n                <!-- Add Icon -->\n                <span\n                  class=\"optionIconStyle addIcon\"\n                  (click)=\"addPollOption()\"\n                ></span>\n              </td>\n            </tr>\n          </tbody>\n          <tfoot class=\"tableFootStyle\">\n            <tr>\n              <td colSpan=\"2\">\n                <button type=\"submit\">{{ createBtnText }}</button>\n              </td>\n            </tr>\n          </tfoot>\n        </table>\n      </div>\n    </div>\n  </form>\n</div>\n",
                styles: [".optionIconStyle{background-size:28px 28px;cursor:pointer;display:block;height:28px;width:28px}.addIcon{background:url(data:image/png;base64,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) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.removeIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFqADAAQAAAABAAAAFgAAAAA/6RFgAAABVUlEQVQ4Ea2VzUoCURSAr1qhi14gN0mLDETCCmrZyl24cR9EK9dBb9Jz9B7B2B8VRJRRa0FIIcm+M3FtZjgz5u0e+Ljec8/55qBzMWdmxMSYVUrqUIYveIduzphX1vkCWQGOIYBJChfkDyH/JzuFNbiFNGEy36V2PVNOQRMGc0jtQ/r07KtyDuqO0qi8GpMjXIQHsEWu6zWOwlTOpuNBaoc5iorvPYovQzHCDY9SO3VF3sHGdHR/HxoLuFYU34jcAfSUs2hqjc05iCcaZUloN+eTvFxdIStKHI4hKc5LQmteJn8DrvEm0/78iq4Kve8qTPNWPHl8M+5Ear/fM/3BTtlfF9MW4cXD1I84lmLjkNiF0T/kH/Rux6R2w0HbUT6kr2U96krBHvTAXs9Z6zO1O6osmaSwBKeQ9QARnkAx2S97/hOzg8YtKjZBrj7b8EIFNAZ8To1vlTPgMjYmAh4AAAAASUVORK5CYII=) 0 0/28px 28px;cursor:pointer;display:block;height:28px;width:28px}.iconWrapperStyle{width:50px}.modalWrapperStyle{display:block;min-width:350px;min-height:450px;width:50%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalErrorStyle{font-size:12px;color:red;text-align:center}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{border-bottom:1px solid #eaeaea;display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableDataStyle{padding:6px 12px;font-size:14px}.tableDataWidthStyle{width:110px}.tableRowStyle{padding:6px 12px}.tableDataInputStyle{width:100%;border:none;padding:6px 12px;font-size:14px}.tableDataInputStyle:focus{outline:0}.tableBodyStyle tr td label,.tableDataLabelStyle{padding:6px 12px}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{height:100%;width:100%}}"]
            }] }
];
/** @nocollapse */
CometchatCreatePollComponent.ctorParameters = () => [
    { type: FormBuilder }
];
CometchatCreatePollComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LWNyZWF0ZS1wb2xsL2NvbWV0Y2hhdC1jcmVhdGUtcG9sbC9jb21ldGNoYXQtY3JlYXRlLXBvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsV0FBVyxHQUlaLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBTWpELE1BQU0sT0FBTyw0QkFBNEI7Ozs7SUFnQnZDLFlBQW9CLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBZG5DLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDTixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsa0JBQWEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLGdCQUFXLEdBQVcsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNsRCxhQUFRLEdBQVcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUM1Qyx3QkFBbUIsR0FBVyxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFDbEUsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDMUMsc0JBQWlCLEdBQVcsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQzlE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QyxNQUFNLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7UUFFTCwyQkFBMkI7SUFDN0IsQ0FBQzs7Ozs7SUFNRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBTUQsYUFBYTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7O1lBcEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxvZ0lBQXFEOzthQUV0RDs7OztZQWJDLFdBQVc7OzttQkFpQlYsS0FBSzttQkFDTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFMUCxvREFBd0I7O0lBQ3hCLGlEQUFlOztJQUNmLDRDQUFxQjs7SUFDckIsNENBQXFCOztJQUVyQix1REFBa0U7O0lBRWxFLHFEQUF1Qzs7SUFDdkMsbURBQWtEOztJQUNsRCxnREFBNEM7O0lBQzVDLDJEQUFrRTs7SUFDbEUsK0NBQTBDOztJQUMxQyx5REFBOEQ7O0lBQzlELHNEQUF3RDs7Ozs7SUFFNUMsMENBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBGb3JtQnVpbGRlcixcbiAgRm9ybUdyb3VwLFxuICBGb3JtQXJyYXksXG4gIEFic3RyYWN0Q29udHJvbCxcbn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNyZWF0ZS1wb2xsXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNyZWF0ZS1wb2xsLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY3JlYXRlLXBvbGwuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Q3JlYXRlUG9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHBvbGxGb3JtRGF0YTogRm9ybUdyb3VwO1xuICBlcnJvclRleHQgPSBcIlwiO1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY3JlYXRlQnRuVGV4dCA9IFNUUklOR19NRVNTQUdFUy5DUkVBVEU7XG4gIENSRUFURV9QT0xMOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRFX1BPTEw7XG4gIFFVRVNUSU9OOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuUVVFU1RJT047XG4gIEVOVEVSX1lPVVJfUVVFU1RJT046IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5FTlRFUl9ZT1VSX1FVRVNUSU9OO1xuICBPUFRJT05TOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuT1BUSU9OUztcbiAgRU5URVJfWU9VUl9PUFRJT046IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5FTlRFUl9ZT1VSX09QVElPTjtcbiAgQUREX05FV19PUFRJT046IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5BRERfTkVXX09QVElPTjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMucG9sbEZvcm1EYXRhID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBxdWVzdGlvbjogXCJcIixcbiAgICAgIGZpcnN0T3B0aW9uOiBcIlwiLFxuICAgICAgc2Vjb25kT3B0aW9uOiBcIlwiLFxuICAgICAgb3B0aW9uSXRlbXM6IHRoaXMuZmIuYXJyYXkoW10pLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGFkZCBhbiBleHRyYSBvcHRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRQb2xsT3B0aW9uKCkge1xuICAgICh0aGlzLnBvbGxGb3JtRGF0YS5nZXQoXCJvcHRpb25JdGVtc1wiKSBhcyBGb3JtQXJyYXkpLnB1c2goXG4gICAgICB0aGlzLmZiLmNvbnRyb2wobnVsbClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcmVtb3ZlIGFuIGV4dHJhIG9wdGlvblxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4XG4gICAqL1xuICByZW1vdmVQb2xsT3B0aW9uKGluZGV4KSB7XG4gICAgKHRoaXMucG9sbEZvcm1EYXRhLmdldChcIm9wdGlvbkl0ZW1zXCIpIGFzIEZvcm1BcnJheSkucmVtb3ZlQXQoaW5kZXgpO1xuICB9XG5cbiAgZ2V0T3B0aW9uc0Zvcm1Db250cm9scygpOiBBYnN0cmFjdENvbnRyb2xbXSB7XG4gICAgcmV0dXJuICg8Rm9ybUFycmF5PnRoaXMucG9sbEZvcm1EYXRhLmdldChcIm9wdGlvbkl0ZW1zXCIpKS5jb250cm9scztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBwb2xsXG4gICAqIEBwYXJhbSBBbnkgdmFsdWVzXG4gICAqL1xuICBjcmVhdGVQb2xsKHZhbHVlcykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlIFBvbGwgVmlldyAtLT4gY3JlYXRlIHBvbGwgd2l0aCBiZWxvdyBkYXRhXCIsIHZhbHVlcyk7XG5cbiAgICBpZiAodmFsdWVzLnF1ZXN0aW9uLnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZXJyb3JUZXh0ID0gU1RSSU5HX01FU1NBR0VTLlBPTExfUVVFU1RJT05fQkxBTks7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdmFsdWVzLmZpcnN0T3B0aW9uLnRyaW0oKS5sZW5ndGggPT09IDAgfHxcbiAgICAgIHZhbHVlcy5zZWNvbmRPcHRpb24udHJpbSgpLmxlbmd0aCA9PT0gMFxuICAgICkge1xuICAgICAgdGhpcy5lcnJvclRleHQgPSBTVFJJTkdfTUVTU0FHRVMuUE9MTF9PUFRJT05fQkxBTks7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbkxpc3QgPSBbXG4gICAgICB2YWx1ZXMuZmlyc3RPcHRpb24sXG4gICAgICB2YWx1ZXMuc2Vjb25kT3B0aW9uLFxuICAgICAgLi4udmFsdWVzLm9wdGlvbkl0ZW1zLFxuICAgIF07XG5cbiAgICBsZXQgcmVjZWl2ZXJJZDtcbiAgICBsZXQgcmVjZWl2ZXJUeXBlID0gdGhpcy50eXBlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLnVpZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3JlYXRlQnRuVGV4dCA9PSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRJTkdfTUVTU1NBR0UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZUJ0blRleHQgPSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRJTkdfTUVTU1NBR0U7XG5cbiAgICBDb21ldENoYXQuY2FsbEV4dGVuc2lvbihcInBvbGxzXCIsIFwiUE9TVFwiLCBcInYxL2NyZWF0ZVwiLCB7XG4gICAgICBxdWVzdGlvbjogdmFsdWVzLnF1ZXN0aW9uLFxuICAgICAgb3B0aW9uczogb3B0aW9uTGlzdCxcbiAgICAgIHJlY2VpdmVyOiByZWNlaXZlcklkLFxuICAgICAgcmVjZWl2ZXJUeXBlOiByZWNlaXZlclR5cGUsXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc3QgZGF0YSA9IHJlc3BvbnNlLm1lc3NhZ2UuZGF0YTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLm1lc3NhZ2UuZGF0YTtcbiAgICAgICAgY29uc3QgY3VzdG9tRGF0YSA9IGRhdGEuZGF0YS5jdXN0b21EYXRhO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY3VzdG9tRGF0YS5vcHRpb25zO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgICAgIHJlc3VsdE9wdGlvbnNbb3B0aW9uXSA9IHtcbiAgICAgICAgICAgIHRleHQ6IG9wdGlvbnNbb3B0aW9uXSxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb2xscyA9IHtcbiAgICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgIHJlc3VsdHM6IHtcbiAgICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgICAgb3B0aW9uczogcmVzdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiBjdXN0b21EYXRhLnF1ZXN0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcXVlc3Rpb246IGN1c3RvbURhdGEucXVlc3Rpb24sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgIHNlbmRlcjogeyB1aWQ6IGRhdGEuc2VuZGVyIH0sXG4gICAgICAgICAgbWV0YWRhdGE6IHsgXCJAaW5qZWN0ZWRcIjogeyBleHRlbnNpb25zOiB7IHBvbGxzOiBwb2xscyB9IH0gfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBjcmVhdGUgcG9sbCB2aWV3IC0tPiBwb2xsIGNyZWF0ZWQgXCIsIG1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLlBPTExfQ1JFQVRFRCxcbiAgICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lcnJvclRleHQgPSBcIlwiO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIHRoaXMuZXJyb3JUZXh0ID0gZXJyb3IubWVzc2FnZS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkNSRUFURTtcbiAgICAgIH0pO1xuXG4gICAgLy90aGlzLnJlc2V0UG9sbEZvcm1EYXRhKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIEluZm9ybWF0aW9uIG9mIHBvbGwgdG8gaW5pdGlhbCBjb25kaXRvbnNcbiAgICogQHBhcmFtXG4gICAqL1xuICByZXNldFBvbGxGb3JtRGF0YSgpIHtcbiAgICB0aGlzLnBvbGxGb3JtRGF0YS5yZXNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGFjdGlvbiB0byBjbG9zZSB0aGUgcG9sbCB2aWV3XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VQb2xsVmlldygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQ0xPU0VfUE9MTF9WSUVXLCBwYXlMb2FkOiBudWxsIH0pO1xuICB9XG59XG4iXX0=