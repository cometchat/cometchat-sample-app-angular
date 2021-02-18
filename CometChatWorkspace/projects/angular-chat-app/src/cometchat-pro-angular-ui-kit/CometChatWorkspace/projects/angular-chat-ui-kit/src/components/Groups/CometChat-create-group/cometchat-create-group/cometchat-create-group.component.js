/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-create-group/cometchat-create-group/cometchat-create-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatCreateGroupComponent {
    constructor() {
        this.error = null;
        this.passwordInput = false;
        this.name = "";
        this.type = "";
        this.password = "";
        this.createBtnText = COMETCHAT_CONSTANTS.CREATE;
        this.SELECT_GROUP_TYPE = COMETCHAT_CONSTANTS.SELECT_GROUP_TYPE;
        this.ENTER_GROUP_NAME = COMETCHAT_CONSTANTS.ENTER_GROUP_NAME;
        this.PUBLIC = COMETCHAT_CONSTANTS.PUBLIC;
        this.PRIVATE = COMETCHAT_CONSTANTS.PRIVATE;
        this.PASSWORD_PROTECTED = COMETCHAT_CONSTANTS.PASSWORD_PROTECTED;
        this.ENTER_GROUP_PASSWORD = COMETCHAT_CONSTANTS.ENTER_GROUP_PASSWORD;
        this.CREATE_GROUP = COMETCHAT_CONSTANTS.CREATE_GROUP;
        this.actionGenerated = new EventEmitter();
        /**
         * Validates all the group details that were entered before creating the group
         * @param
         */
        this.validate = (/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                const groupName = this.name.trim();
                /** @type {?} */
                const groupType = this.type.trim();
                if (!groupName) {
                    this.error = COMETCHAT_CONSTANTS.GROUP_NAME_BLANK;
                    return false;
                }
                if (!groupType) {
                    this.error = COMETCHAT_CONSTANTS.GROUP_TYPE_BLANK;
                    return false;
                }
                if (groupType === enums.PROTECTED_GROUP) {
                    /** @type {?} */
                    const password = this.password;
                    if (!password.length) {
                        this.error = COMETCHAT_CONSTANTS.GROUP_PASSWORD_BLANK;
                        return false;
                    }
                }
                return true;
            }
            catch (error) {
                logger(error);
            }
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
        try {
            this.password = event.target.value;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Changes the Group Name according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    nameChangeHandler(event) {
        try {
            this.name = event.target.value;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Changes the Type of group ,   according to the option seletced by the user by the user
     * @param {?} event
     * @return {?}
     */
    typeChangeHandler(event) {
        try {
            this.type = event.target.value;
            if (this.type === enums.PROTECTED_GROUP) {
                this.passwordInput = true;
            }
            else {
                this.passwordInput = false;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * If the Group Data is successfully validated , below function creates the group
     * @return {?}
     */
    createGroup() {
        try {
            if (!this.validate()) {
                return false;
            }
            if (this.createBtnText == COMETCHAT_CONSTANTS.CREATING_MESSSAGE) {
                return;
            }
            this.createBtnText = COMETCHAT_CONSTANTS.CREATING_MESSSAGE;
            /** @type {?} */
            const groupType = this.type.trim();
            /** @type {?} */
            const password = this.password;
            /** @type {?} */
            const guid = enums.GROUP_ + new Date().getTime();
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
                this.createBtnText = COMETCHAT_CONSTANTS.CREATE;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits an action indicating the parent to close the create group view
     * @return {?}
     */
    closeCreateGroupView() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_CREATE_GROUP_VIEW,
                payLoad: null,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Resets all the Group creation form data to initial values
     * @return {?}
     */
    resetGroupData() {
        try {
            this.error = null;
            this.passwordInput = false;
            this.name = "";
            this.type = "";
            this.password = "";
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatCreateGroupComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-create-group",
                template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <!-- <p>test</p> -->\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeCreateGroupView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            CREATE_GROUP\n          }}\n        </caption>\n        <tbody class=\"tableBodyStyle\">\n          <tr>\n            <td>\n              <div class=\"tableErrorStyle\" *ngIf=\"error\">{{ error }}</div>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_NAME\"\n                type=\"text\"\n                tabIndex=\"1\"\n                (keyup)=\"nameChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <select\n                class=\"inputStyle\"\n                tabIndex=\"2\"\n                (change)=\"typeChangeHandler($event)\"\n              >\n                <option value=\"\">{{ SELECT_GROUP_TYPE }}</option>\n                <option value=\"public\">{{ PUBLIC }}</option>\n                <option value=\"private\">{{ PRIVATE }}</option>\n                <option value=\"protected\">{{ PASSWORD_PROTECTED }}</option>\n              </select>\n            </td>\n          </tr>\n          <!-- Password -->\n          <tr *ngIf=\"passwordInput\">\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_PASSWORD\"\n                type=\"password\"\n                tabIndex=\"3\"\n                (keyup)=\"passwordChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <!-- Password -->\n        </tbody>\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td>\n              <button tabIndex=\"4\" (click)=\"createGroup()\">\n                {{ createBtnText }}\n              </button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:350px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableBodyStyle tr td{padding:8px;font-size:14px}.tableBodyStyle tr td input{width:100%;border:none;padding:10px 14px;font-size:14px;outline:0}.tableBodyStyle tr td select{outline:0;padding:10px}.tableErrorStyle{font-size:12px;color:red;text-align:center;display:block}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;color:#fff;border-radius:5px;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}.inputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,.04);padding:6px 8px 6px 30px;color:rgba(20,20,20,.6);font-size:15px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}}"]
            }] }
];
/** @nocollapse */
CometChatCreateGroupComponent.ctorParameters = () => [];
CometChatCreateGroupComponent.propDecorators = {
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.error;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.passwordInput;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.name;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.type;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.password;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.createBtnText;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.SELECT_GROUP_TYPE;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.ENTER_GROUP_NAME;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.PUBLIC;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.PRIVATE;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.PASSWORD_PROTECTED;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.ENTER_GROUP_PASSWORD;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.CREATE_GROUP;
    /** @type {?} */
    CometChatCreateGroupComponent.prototype.actionGenerated;
    /**
     * Validates all the group details that were entered before creating the group
     * \@param
     * @type {?}
     */
    CometChatCreateGroupComponent.prototype.validate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvQ29tZXRDaGF0LWNyZWF0ZS1ncm91cC9jb21ldGNoYXQtY3JlYXRlLWdyb3VwL2NvbWV0Y2hhdC1jcmVhdGUtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sNkJBQTZCO0lBa0J4QztRQWpCQSxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZCxrQkFBYSxHQUFXLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUNuRCxzQkFBaUIsR0FBVyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRSxxQkFBZ0IsR0FBVyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRSxXQUFNLEdBQVcsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1FBQzVDLFlBQU8sR0FBVyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7UUFDOUMsdUJBQWtCLEdBQVcsbUJBQW1CLENBQUMsa0JBQWtCLENBQUM7UUFDcEUseUJBQW9CLEdBQVcsbUJBQW1CLENBQUMs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QztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxvQkFBb0I7UUFDbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHVCQUF1QjtnQkFDbkMsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQU1ELGNBQWM7UUFDWixJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7OztZQS9MRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMscXRFQUFzRDs7YUFFdkQ7Ozs7OzhCQWlCRSxNQUFNOzs7O0lBZlAsOENBQWE7O0lBQ2Isc0RBQStCOztJQUMvQiw2Q0FBa0I7O0lBQ2xCLDZDQUFrQjs7SUFDbEIsaURBQWM7O0lBRWQsc0RBQW1EOztJQUNuRCwwREFBa0U7O0lBQ2xFLHlEQUFnRTs7SUFDaEUsK0NBQTRDOztJQUM1QyxnREFBOEM7O0lBQzlDLDJEQUFvRTs7SUFDcEUsNkRBQXdFOztJQUN4RSxxREFBd0Q7O0lBRXhELHdEQUFrRTs7Ozs7O0lBb0RsRSxpREE2QkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY3JlYXRlLWdyb3VwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRDcmVhdGVHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGVycm9yID0gbnVsbDtcbiAgcGFzc3dvcmRJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBuYW1lOiBTdHJpbmcgPSBcIlwiO1xuICB0eXBlOiBTdHJpbmcgPSBcIlwiO1xuICBwYXNzd29yZCA9IFwiXCI7XG5cbiAgY3JlYXRlQnRuVGV4dDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVEU7XG4gIFNFTEVDVF9HUk9VUF9UWVBFOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlNFTEVDVF9HUk9VUF9UWVBFO1xuICBFTlRFUl9HUk9VUF9OQU1FOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkVOVEVSX0dST1VQX05BTUU7XG4gIFBVQkxJQzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5QVUJMSUM7XG4gIFBSSVZBVEU6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuUFJJVkFURTtcbiAgUEFTU1dPUkRfUFJPVEVDVEVEOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlBBU1NXT1JEX1BST1RFQ1RFRDtcbiAgRU5URVJfR1JPVVBfUEFTU1dPUkQ6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuRU5URVJfR1JPVVBfUEFTU1dPUkQ7XG4gIENSRUFURV9HUk9VUDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVEVfR1JPVVA7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgcGFzc3dvcmQgYWNjb3JkaW5nIHRvIHRoZSB0ZXh0IGVudGVyZWQgYnkgdGhlIHVzZXJcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICBwYXNzd29yZENoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wYXNzd29yZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgR3JvdXAgTmFtZSBhY2NvcmRpbmcgdG8gdGhlIHRleHQgZW50ZXJlZCBieSB0aGUgdXNlclxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIG5hbWVDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgVHlwZSBvZiBncm91cCAsICAgYWNjb3JkaW5nIHRvIHRoZSBvcHRpb24gc2VsZXRjZWQgYnkgdGhlIHVzZXIgYnkgdGhlIHVzZXJcbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50XG4gICAqL1xuICB0eXBlQ2hhbmdlSGFuZGxlcihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgIGlmICh0aGlzLnR5cGUgPT09IGVudW1zLlBST1RFQ1RFRF9HUk9VUCkge1xuICAgICAgICB0aGlzLnBhc3N3b3JkSW5wdXQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZElucHV0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBhbGwgdGhlIGdyb3VwIGRldGFpbHMgdGhhdCB3ZXJlIGVudGVyZWQgYmVmb3JlIGNyZWF0aW5nIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHZhbGlkYXRlID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLm5hbWUudHJpbSgpO1xuICAgICAgY29uc3QgZ3JvdXBUeXBlID0gdGhpcy50eXBlLnRyaW0oKTtcblxuICAgICAgaWYgKCFncm91cE5hbWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IENPTUVUQ0hBVF9DT05TVEFOVFMuR1JPVVBfTkFNRV9CTEFOSztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdyb3VwVHlwZSkge1xuICAgICAgICB0aGlzLmVycm9yID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5HUk9VUF9UWVBFX0JMQU5LO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwVHlwZSA9PT0gZW51bXMuUFJPVEVDVEVEX0dST1VQKSB7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcblxuICAgICAgICBpZiAoIXBhc3N3b3JkLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBDT01FVENIQVRfQ09OU1RBTlRTLkdST1VQX1BBU1NXT1JEX0JMQU5LO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIElmIHRoZSBHcm91cCBEYXRhIGlzIHN1Y2Nlc3NmdWxseSB2YWxpZGF0ZWQgLCBiZWxvdyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNyZWF0ZUdyb3VwKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUJ0blRleHQgPT0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DUkVBVElOR19NRVNTU0FHRSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3JlYXRlQnRuVGV4dCA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQ1JFQVRJTkdfTUVTU1NBR0U7XG5cbiAgICAgIGNvbnN0IGdyb3VwVHlwZSA9IHRoaXMudHlwZS50cmltKCk7XG5cbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcbiAgICAgIGNvbnN0IGd1aWQgPSBlbnVtcy5HUk9VUF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWUudHJpbSgpO1xuICAgICAgbGV0IHR5cGUgPSBDb21ldENoYXQuR1JPVVBfVFlQRS5QVUJMSUM7XG5cbiAgICAgIHN3aXRjaCAoZ3JvdXBUeXBlKSB7XG4gICAgICAgIGNhc2UgZW51bXMuUFVCTElDX0dST1VQOlxuICAgICAgICAgIHR5cGUgPSBDb21ldENoYXQuR1JPVVBfVFlQRS5QVUJMSUM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuUFJJVkFURV9HUk9VUDpcbiAgICAgICAgICB0eXBlID0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUFJJVkFURTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5QUk9URUNURURfR1JPVVA6XG4gICAgICAgICAgdHlwZSA9IENvbWV0Q2hhdC5HUk9VUF9UWVBFLlBBU1NXT1JEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncm91cCA9IG5ldyBDb21ldENoYXQuR3JvdXAoZ3VpZCwgbmFtZSwgdHlwZSwgcGFzc3dvcmQpO1xuXG4gICAgICBDb21ldENoYXQuY3JlYXRlR3JvdXAoZ3JvdXApXG4gICAgICAgIC50aGVuKChncm91cCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzZXRHcm91cERhdGEoKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkdST1VQX0NSRUFURUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBncm91cCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3JlYXRlQnRuVGV4dCA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQ1JFQVRFO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYW4gYWN0aW9uIGluZGljYXRpbmcgdGhlIHBhcmVudCB0byBjbG9zZSB0aGUgY3JlYXRlIGdyb3VwIHZpZXdcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZUNyZWF0ZUdyb3VwVmlldygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkNMT1NFX0NSRUFURV9HUk9VUF9WSUVXLFxuICAgICAgICBwYXlMb2FkOiBudWxsLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBhbGwgdGhlIEdyb3VwIGNyZWF0aW9uIGZvcm0gZGF0YSB0byBpbml0aWFsIHZhbHVlc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIHJlc2V0R3JvdXBEYXRhKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgIHRoaXMucGFzc3dvcmRJbnB1dCA9IGZhbHNlO1xuICAgICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgIHRoaXMudHlwZSA9IFwiXCI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==