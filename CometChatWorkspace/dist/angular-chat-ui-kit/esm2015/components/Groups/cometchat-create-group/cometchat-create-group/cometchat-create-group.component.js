/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-create-group/cometchat-create-group/cometchat-create-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatCreateGroupComponent {
    constructor() {
        this.error = null;
        this.passwordInput = false;
        this.name = "";
        this.type = "";
        this.password = "";
        this.createBtnText = STRING_MESSAGES.CREATE;
        this.SELECT_GROUP_TYPE = STRING_MESSAGES.SELECT_GROUP_TYPE;
        this.ENTER_GROUP_NAME = STRING_MESSAGES.ENTER_GROUP_NAME;
        this.PUBLIC = STRING_MESSAGES.PUBLIC;
        this.PRIVATE = STRING_MESSAGES.PRIVATE;
        this.PASSWORD_PROTECTED = STRING_MESSAGES.PASSWORD_PROTECTED;
        this.ENTER_GROUP_PASSWORD = STRING_MESSAGES.ENTER_GROUP_PASSWORD;
        this.CREATE_GROUP = STRING_MESSAGES.CREATE_GROUP;
        this.actionGenerated = new EventEmitter();
        /**
         * Validates all the group details that were entered before creating the group
         * @param
         */
        this.validate = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const groupName = this.name.trim();
            /** @type {?} */
            const groupType = this.type.trim();
            if (!groupName) {
                this.error = STRING_MESSAGES.GROUP_NAME_BLANK;
                return false;
            }
            if (!groupType) {
                this.error = STRING_MESSAGES.GROUP_TYPE_BLANK;
                return false;
            }
            /** @type {?} */
            let password = "";
            if (groupType === "protected") {
                /** @type {?} */
                const password = this.password;
                if (!password.length) {
                    this.error = STRING_MESSAGES.GROUP_PASSWORD_BLANK;
                    return false;
                }
            }
            return true;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Changes the password according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    passwordChangeHandler(event) {
        this.password = event.target.value;
    }
    /**
     * Changes the Group Name according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    nameChangeHandler(event) {
        this.name = event.target.value;
    }
    /**
     * Changes the Type of  according to the option seletced by the user by the user
     * @param {?} event
     * @return {?}
     */
    typeChangeHandler(event) {
        /** @type {?} */
        const type = event.target.value;
        this.type = event.target.value;
        if (type === "protected") {
            this.passwordInput = true;
        }
        else {
            this.passwordInput = false;
        }
    }
    /**
     * If the Group Data is successfully validated , below function creates the group
     * @return {?}
     */
    createGroup() {
        if (!this.validate()) {
            return false;
        }
        if (this.createBtnText == STRING_MESSAGES.CREATING_MESSSAGE) {
            return;
        }
        this.createBtnText = STRING_MESSAGES.CREATING_MESSSAGE;
        /** @type {?} */
        const groupType = this.type.trim();
        /** @type {?} */
        const password = this.password;
        /** @type {?} */
        const guid = "group_" + new Date().getTime();
        /** @type {?} */
        const name = this.name.trim();
        /** @type {?} */
        let type = CometChat.GROUP_TYPE.PUBLIC;
        switch (groupType) {
            case enums.PUBLIC_GROUP:
                type = CometChat.GROUP_TYPE.PUBLIC;
                break;
            case enums.PRIVATE_GROUP:
                type = CometChat.GROUP_TYPE.PRIVATE;
                break;
            case enums.PROTECTED_GROUP:
                type = CometChat.GROUP_TYPE.PASSWORD;
                break;
            default:
                break;
        }
        /** @type {?} */
        const group = new CometChat.Group(guid, name, type, password);
        CometChat.createGroup(group)
            .then((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            this.resetGroupData();
            this.actionGenerated.emit({
                type: enums.GROUP_CREATED,
                payLoad: group,
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.error = error;
        }))
            .finally((/**
         * @return {?}
         */
        () => {
            this.createBtnText = STRING_MESSAGES.CREATE;
        }));
    }
    /**
     * Emits an action indicating the parent to close the create group view
     * @return {?}
     */
    closeCreateGroupView() {
        this.actionGenerated.emit({
            type: enums.CLOSE_CREATE_GROUP_VIEW,
            payLoad: null,
        });
    }
    /**
     * Resets all the Group creation form data to initial values
     * @return {?}
     */
    resetGroupData() {
        this.error = null;
        this.passwordInput = false;
        this.name = "";
        this.type = "";
        this.password = "";
    }
}
CometchatCreateGroupComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-create-group",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <!-- <p>test</p> -->\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeCreateGroupView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            CREATE_GROUP\n          }}\n        </caption>\n        <tbody class=\"tableBodyStyle\">\n          <tr>\n            <td>\n              <div class=\"tableErrorStyle\" *ngIf=\"error\">{{ error }}</div>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_NAME\"\n                type=\"text\"\n                tabIndex=\"1\"\n                (keyup)=\"nameChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <select\n                class=\"inputStyle\"\n                tabIndex=\"2\"\n                (change)=\"typeChangeHandler($event)\"\n              >\n                <option value=\"\">{{ SELECT_GROUP_TYPE }}</option>\n                <option value=\"public\">{{ PUBLIC }}</option>\n                <option value=\"private\">{{ PRIVATE }}</option>\n                <option value=\"protected\">{{ PASSWORD_PROTECTED }}</option>\n              </select>\n            </td>\n          </tr>\n          <!-- Password -->\n          <tr *ngIf=\"passwordInput\">\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_PASSWORD\"\n                type=\"password\"\n                tabIndex=\"3\"\n                (keyup)=\"passwordChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <!-- Password -->\n        </tbody>\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td>\n              <button tabIndex=\"4\" (click)=\"createGroup()\">\n                {{ createBtnText }}\n              </button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:350px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableBodyStyle tr td{padding:8px;font-size:14px}.tableBodyStyle tr td input{width:100%;border:none;padding:10px 14px;font-size:14px;outline:0}.tableBodyStyle tr td select{outline:0;padding:10px}.tableErrorStyle{font-size:12px;color:red;text-align:center;display:block}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;color:#fff;border-radius:5px;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}.inputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,.04);padding:6px 8px 6px 30px;color:rgba(20,20,20,.6);font-size:15px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}}"]
            }] }
];
/** @nocollapse */
CometchatCreateGroupComponent.ctorParameters = () => [];
CometchatCreateGroupComponent.propDecorators = {
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.error;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.passwordInput;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.name;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.type;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.password;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.createBtnText;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.SELECT_GROUP_TYPE;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.ENTER_GROUP_NAME;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.PUBLIC;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.PRIVATE;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.PASSWORD_PROTECTED;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.ENTER_GROUP_PASSWORD;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.CREATE_GROUP;
    /** @type {?} */
    CometchatCreateGroupComponent.prototype.actionGenerated;
    /**
     * Validates all the group details that were entered before creating the group
     * \@param
     * @type {?}
     */
    CometchatCreateGroupComponent.prototype.validate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWNyZWF0ZS1ncm91cC9jb21ldGNoYXQtY3JlYXRlLWdyb3VwL2NvbWV0Y2hhdC1jcmVhdGUtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sNkJBQTZCO0lBa0J4QztRQWpCQSxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZCxrQkFBYSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDL0Msc0JBQWlCLEdBQVcsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBQzlELHFCQUFnQixHQUFXLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RCxXQUFNLEdBQVcsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxZQUFPLEdBQVcsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUMxQyx1QkFBa0IsR0FBVyxlQUFlLENBQUMsa0JBQWtCLENBQUM7UUFDaEUseUJBQW9CLEdBQVcsZUFBZSxDQUFDLG9CQUFvQixDQUFDO1FBQ3BFLGlCQUFZLEdBQVcsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUUxQyxvQkFB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OztJQWZQLDhDQUFhOztJQUNiLHNEQUErQjs7SUFDL0IsNkNBQWtCOztJQUNsQiw2Q0FBa0I7O0lBQ2xCLGlEQUFjOztJQUVkLHNEQUErQzs7SUFDL0MsMERBQThEOztJQUM5RCx5REFBNEQ7O0lBQzVELCtDQUF3Qzs7SUFDeEMsZ0RBQTBDOztJQUMxQywyREFBZ0U7O0lBQ2hFLDZEQUFvRTs7SUFDcEUscURBQW9EOztJQUVwRCx3REFBa0U7Ozs7OztJQXlDbEUsaURBMEJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY3JlYXRlLWdyb3VwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDcmVhdGVHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGVycm9yID0gbnVsbDtcbiAgcGFzc3dvcmRJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBuYW1lOiBTdHJpbmcgPSBcIlwiO1xuICB0eXBlOiBTdHJpbmcgPSBcIlwiO1xuICBwYXNzd29yZCA9IFwiXCI7XG5cbiAgY3JlYXRlQnRuVGV4dDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNSRUFURTtcbiAgU0VMRUNUX0dST1VQX1RZUEU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TRUxFQ1RfR1JPVVBfVFlQRTtcbiAgRU5URVJfR1JPVVBfTkFNRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkVOVEVSX0dST1VQX05BTUU7XG4gIFBVQkxJQzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBVQkxJQztcbiAgUFJJVkFURTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBSSVZBVEU7XG4gIFBBU1NXT1JEX1BST1RFQ1RFRDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBBU1NXT1JEX1BST1RFQ1RFRDtcbiAgRU5URVJfR1JPVVBfUEFTU1dPUkQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5FTlRFUl9HUk9VUF9QQVNTV09SRDtcbiAgQ1JFQVRFX0dST1VQOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRFX0dST1VQO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIHBhc3N3b3JkIGFjY29yZGluZyB0byB0aGUgdGV4dCBlbnRlcmVkIGJ5IHRoZSB1c2VyXG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgcGFzc3dvcmRDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5wYXNzd29yZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBHcm91cCBOYW1lIGFjY29yZGluZyB0byB0aGUgdGV4dCBlbnRlcmVkIGJ5IHRoZSB1c2VyXG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgbmFtZUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLm5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgVHlwZSBvZiAgYWNjb3JkaW5nIHRvIHRoZSBvcHRpb24gc2VsZXRjZWQgYnkgdGhlIHVzZXIgYnkgdGhlIHVzZXJcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICB0eXBlQ2hhbmdlSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IHR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy50eXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgaWYgKHR5cGUgPT09IFwicHJvdGVjdGVkXCIpIHtcbiAgICAgIHRoaXMucGFzc3dvcmRJbnB1dCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFzc3dvcmRJbnB1dCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgYWxsIHRoZSBncm91cCBkZXRhaWxzIHRoYXQgd2VyZSBlbnRlcmVkIGJlZm9yZSBjcmVhdGluZyB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICB2YWxpZGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLm5hbWUudHJpbSgpO1xuICAgIGNvbnN0IGdyb3VwVHlwZSA9IHRoaXMudHlwZS50cmltKCk7XG5cbiAgICBpZiAoIWdyb3VwTmFtZSkge1xuICAgICAgdGhpcy5lcnJvciA9IFNUUklOR19NRVNTQUdFUy5HUk9VUF9OQU1FX0JMQU5LO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghZ3JvdXBUeXBlKSB7XG4gICAgICB0aGlzLmVycm9yID0gU1RSSU5HX01FU1NBR0VTLkdST1VQX1RZUEVfQkxBTks7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgcGFzc3dvcmQgPSBcIlwiO1xuICAgIGlmIChncm91cFR5cGUgPT09IFwicHJvdGVjdGVkXCIpIHtcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcblxuICAgICAgaWYgKCFwYXNzd29yZC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IFNUUklOR19NRVNTQUdFUy5HUk9VUF9QQVNTV09SRF9CTEFOSztcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgR3JvdXAgRGF0YSBpcyBzdWNjZXNzZnVsbHkgdmFsaWRhdGVkICwgYmVsb3cgZnVuY3Rpb24gY3JlYXRlcyB0aGUgZ3JvdXBcbiAgICogQHBhcmFtXG4gICAqL1xuICBjcmVhdGVHcm91cCgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNyZWF0ZUJ0blRleHQgPT0gU1RSSU5HX01FU1NBR0VTLkNSRUFUSU5HX01FU1NTQUdFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkNSRUFUSU5HX01FU1NTQUdFO1xuXG4gICAgY29uc3QgZ3JvdXBUeXBlID0gdGhpcy50eXBlLnRyaW0oKTtcblxuICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcbiAgICBjb25zdCBndWlkID0gXCJncm91cF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWUudHJpbSgpO1xuICAgIGxldCB0eXBlID0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUFVCTElDO1xuXG4gICAgc3dpdGNoIChncm91cFR5cGUpIHtcbiAgICAgIGNhc2UgZW51bXMuUFVCTElDX0dST1VQOlxuICAgICAgICB0eXBlID0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUFVCTElDO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuUFJJVkFURV9HUk9VUDpcbiAgICAgICAgdHlwZSA9IENvbWV0Q2hhdC5HUk9VUF9UWVBFLlBSSVZBVEU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5QUk9URUNURURfR1JPVVA6XG4gICAgICAgIHR5cGUgPSBDb21ldENoYXQuR1JPVVBfVFlQRS5QQVNTV09SRDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBncm91cCA9IG5ldyBDb21ldENoYXQuR3JvdXAoZ3VpZCwgbmFtZSwgdHlwZSwgcGFzc3dvcmQpO1xuXG4gICAgQ29tZXRDaGF0LmNyZWF0ZUdyb3VwKGdyb3VwKVxuICAgICAgLnRoZW4oKGdyb3VwKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRHcm91cERhdGEoKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuR1JPVVBfQ1JFQVRFRCxcbiAgICAgICAgICBwYXlMb2FkOiBncm91cCxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZUJ0blRleHQgPSBTVFJJTkdfTUVTU0FHRVMuQ1JFQVRFO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYW4gYWN0aW9uIGluZGljYXRpbmcgdGhlIHBhcmVudCB0byBjbG9zZSB0aGUgY3JlYXRlIGdyb3VwIHZpZXdcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZUNyZWF0ZUdyb3VwVmlldygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkNMT1NFX0NSRUFURV9HUk9VUF9WSUVXLFxuICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgYWxsIHRoZSBHcm91cCBjcmVhdGlvbiBmb3JtIGRhdGEgdG8gaW5pdGlhbCB2YWx1ZXNcbiAgICogQHBhcmFtXG4gICAqL1xuICByZXNldEdyb3VwRGF0YSgpIHtcbiAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICB0aGlzLnBhc3N3b3JkSW5wdXQgPSBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgIHRoaXMudHlwZSA9IFwiXCI7XG4gICAgdGhpcy5wYXNzd29yZCA9IFwiXCI7XG4gIH1cbn1cbiJdfQ==