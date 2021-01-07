/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-create-group/cometchat-create-group/cometchat-create-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatCreateGroupComponent = /** @class */ (function () {
    function CometchatCreateGroupComponent() {
        var _this = this;
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
        function () {
            /** @type {?} */
            var groupName = _this.name.trim();
            /** @type {?} */
            var groupType = _this.type.trim();
            if (!groupName) {
                _this.error = STRING_MESSAGES.GROUP_NAME_BLANK;
                return false;
            }
            if (!groupType) {
                _this.error = STRING_MESSAGES.GROUP_TYPE_BLANK;
                return false;
            }
            /** @type {?} */
            var password = "";
            if (groupType === "protected") {
                /** @type {?} */
                var password_1 = _this.password;
                if (!password_1.length) {
                    _this.error = STRING_MESSAGES.GROUP_PASSWORD_BLANK;
                    return false;
                }
            }
            return true;
        });
    }
    /**
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Changes the password according to the text entered by the user
     * @param Event event
     */
    /**
     * Changes the password according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.passwordChangeHandler = /**
     * Changes the password according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.password = event.target.value;
    };
    /**
     * Changes the Group Name according to the text entered by the user
     * @param Event event
     */
    /**
     * Changes the Group Name according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.nameChangeHandler = /**
     * Changes the Group Name according to the text entered by the user
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.name = event.target.value;
    };
    /**
     * Changes the Type of  according to the option seletced by the user by the user
     * @param Event event
     */
    /**
     * Changes the Type of  according to the option seletced by the user by the user
     * @param {?} event
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.typeChangeHandler = /**
     * Changes the Type of  according to the option seletced by the user by the user
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var type = event.target.value;
        this.type = event.target.value;
        if (type === "protected") {
            this.passwordInput = true;
        }
        else {
            this.passwordInput = false;
        }
    };
    /**
     * If the Group Data is successfully validated , below function creates the group
     * @param
     */
    /**
     * If the Group Data is successfully validated , below function creates the group
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.createGroup = /**
     * If the Group Data is successfully validated , below function creates the group
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.validate()) {
            return false;
        }
        if (this.createBtnText == STRING_MESSAGES.CREATING_MESSSAGE) {
            return;
        }
        this.createBtnText = STRING_MESSAGES.CREATING_MESSSAGE;
        /** @type {?} */
        var groupType = this.type.trim();
        /** @type {?} */
        var password = this.password;
        /** @type {?} */
        var guid = "group_" + new Date().getTime();
        /** @type {?} */
        var name = this.name.trim();
        /** @type {?} */
        var type = CometChat.GROUP_TYPE.PUBLIC;
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
        var group = new CometChat.Group(guid, name, type, password);
        CometChat.createGroup(group)
            .then((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            _this.resetGroupData();
            _this.actionGenerated.emit({
                type: enums.GROUP_CREATED,
                payLoad: group,
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.error = error;
        }))
            .finally((/**
         * @return {?}
         */
        function () {
            _this.createBtnText = STRING_MESSAGES.CREATE;
        }));
    };
    /**
     * Emits an action indicating the parent to close the create group view
     * @param
     */
    /**
     * Emits an action indicating the parent to close the create group view
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.closeCreateGroupView = /**
     * Emits an action indicating the parent to close the create group view
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_CREATE_GROUP_VIEW,
            payLoad: null,
        });
    };
    /**
     * Resets all the Group creation form data to initial values
     * @param
     */
    /**
     * Resets all the Group creation form data to initial values
     * @return {?}
     */
    CometchatCreateGroupComponent.prototype.resetGroupData = /**
     * Resets all the Group creation form data to initial values
     * @return {?}
     */
    function () {
        this.error = null;
        this.passwordInput = false;
        this.name = "";
        this.type = "";
        this.password = "";
    };
    CometchatCreateGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-create-group",
                    template: "<div>\n  <cometchat-backdrop></cometchat-backdrop>\n  <!-- <p>test</p> -->\n  <div class=\"modalWrapperStyle\">\n    <span class=\"modalCloseStyle\" (click)=\"closeCreateGroupView()\"></span>\n    <div class=\"modalBodyStyle\">\n      <table class=\"modalTableStyle\">\n        <caption class=\"tableCaptionStyle\">\n          {{\n            CREATE_GROUP\n          }}\n        </caption>\n        <tbody class=\"tableBodyStyle\">\n          <tr>\n            <td>\n              <div class=\"tableErrorStyle\" *ngIf=\"error\">{{ error }}</div>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_NAME\"\n                type=\"text\"\n                tabIndex=\"1\"\n                (keyup)=\"nameChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <select\n                class=\"inputStyle\"\n                tabIndex=\"2\"\n                (change)=\"typeChangeHandler($event)\"\n              >\n                <option value=\"\">{{ SELECT_GROUP_TYPE }}</option>\n                <option value=\"public\">{{ PUBLIC }}</option>\n                <option value=\"private\">{{ PRIVATE }}</option>\n                <option value=\"protected\">{{ PASSWORD_PROTECTED }}</option>\n              </select>\n            </td>\n          </tr>\n          <!-- Password -->\n          <tr *ngIf=\"passwordInput\">\n            <td>\n              <input\n                class=\"inputStyle\"\n                autoComplete=\"off\"\n                [placeholder]=\"ENTER_GROUP_PASSWORD\"\n                type=\"password\"\n                tabIndex=\"3\"\n                (keyup)=\"passwordChangeHandler($event)\"\n              />\n            </td>\n          </tr>\n          <!-- Password -->\n        </tbody>\n        <tfoot class=\"tableFootStyle\">\n          <tr>\n            <td>\n              <button tabIndex=\"4\" (click)=\"createGroup()\">\n                {{ createBtnText }}\n              </button>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n",
                    styles: [".modalWrapperStyle{display:block;min-width:350px;min-height:350px;width:40%;height:40%;overflow:hidden;background-color:#fff;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1002;margin:0 auto;box-shadow:rgba(20,20,20,.2) 0 16px 32px,rgba(20,20,20,.04) 0 0 0 1px;border-radius:12px}.modalCloseStyle{position:absolute;width:32px;height:32px;border-radius:50%;top:16px;right:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.modalBodyStyle{padding:25px;height:100%;width:100%}.modalTableStyle{border-collapse:collapse;margin:0;padding:0;width:100%;height:90%}.modalTableStyle tr{display:table;width:100%;table-layout:fixed}.tableCaptionStyle{font-size:20px;margin-bottom:15px;font-weight:700;text-align:left}.tableBodyStyle{height:calc(100% - 40px);overflow-y:auto;display:block}.tableBodyStyle tr td{padding:8px;font-size:14px}.tableBodyStyle tr td input{width:100%;border:none;padding:10px 14px;font-size:14px;outline:0}.tableBodyStyle tr td select{outline:0;padding:10px}.tableErrorStyle{font-size:12px;color:red;text-align:center;display:block}.tableFootStyle{display:inline-block}.tableFootStyle button{cursor:pointer;padding:10px 20px;background-color:#39f;color:#fff;border-radius:5px;font-size:14px;outline:0;border:0}.tableFootStyle tr{border:none}.tableFootStyle tr td{text-align:center}.inputStyle{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,.04);padding:6px 8px 6px 30px;color:rgba(20,20,20,.6);font-size:15px}@media (min-width:320px) and (max-width:767px){.modalWrapperStyle{width:100%;height:100%}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatCreateGroupComponent.ctorParameters = function () { return []; };
    CometchatCreateGroupComponent.propDecorators = {
        actionGenerated: [{ type: Output }]
    };
    return CometchatCreateGroupComponent;
}());
export { CometchatCreateGroupComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNyZWF0ZS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWNyZWF0ZS1ncm91cC9jb21ldGNoYXQtY3JlYXRlLWdyb3VwL2NvbWV0Y2hhdC1jcmVhdGUtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQXVCRTtRQUFBLGlCQUFnQjtRQWpCaEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQsa0JBQWEsR0FBVyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQy9DLHNCQUFpQixHQUFXLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5RCxxQkFBZ0IsR0FBVyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDNUQsV0FBTSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEMsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDMUMsdUJBQWtCLEdBQVcsZUFBZSxDQUFDLGtCQUFrQixDQUFDO1FBQ2hFLHlCQUFvQixHQUFXLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQztRQUNwRSxpQkFBWSxHQUFXLGVBQWUsQ0FBQyxZQUFZLENBQUM7UUFFMUMsb0JBQWUsR0FB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LEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O2dCQXJLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMscXRFQUFzRDs7aUJBRXZEOzs7OztrQ0FpQkUsTUFBTTs7SUFpSlQsb0NBQUM7Q0FBQSxBQXRLRCxJQXNLQztTQWpLWSw2QkFBNkI7OztJQUN4Qyw4Q0FBYTs7SUFDYixzREFBK0I7O0lBQy9CLDZDQUFrQjs7SUFDbEIsNkNBQWtCOztJQUNsQixpREFBYzs7SUFFZCxzREFBK0M7O0lBQy9DLDBEQUE4RDs7SUFDOUQseURBQTREOztJQUM1RCwrQ0FBd0M7O0lBQ3hDLGdEQUEwQzs7SUFDMUMsMkRBQWdFOztJQUNoRSw2REFBb0U7O0lBQ3BFLHFEQUFvRDs7SUFFcEQsd0RBQWtFOzs7Ozs7SUF5Q2xFLGlEQTBCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWNyZWF0ZS1ncm91cFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jcmVhdGUtZ3JvdXAuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jcmVhdGUtZ3JvdXAuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0Q3JlYXRlR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlcnJvciA9IG51bGw7XG4gIHBhc3N3b3JkSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbmFtZTogU3RyaW5nID0gXCJcIjtcbiAgdHlwZTogU3RyaW5nID0gXCJcIjtcbiAgcGFzc3dvcmQgPSBcIlwiO1xuXG4gIGNyZWF0ZUJ0blRleHQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5DUkVBVEU7XG4gIFNFTEVDVF9HUk9VUF9UWVBFOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuU0VMRUNUX0dST1VQX1RZUEU7XG4gIEVOVEVSX0dST1VQX05BTUU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5FTlRFUl9HUk9VUF9OQU1FO1xuICBQVUJMSUM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QVUJMSUM7XG4gIFBSSVZBVEU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QUklWQVRFO1xuICBQQVNTV09SRF9QUk9URUNURUQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QQVNTV09SRF9QUk9URUNURUQ7XG4gIEVOVEVSX0dST1VQX1BBU1NXT1JEOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuRU5URVJfR1JPVVBfUEFTU1dPUkQ7XG4gIENSRUFURV9HUk9VUDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNSRUFURV9HUk9VUDtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBwYXNzd29yZCBhY2NvcmRpbmcgdG8gdGhlIHRleHQgZW50ZXJlZCBieSB0aGUgdXNlclxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIHBhc3N3b3JkQ2hhbmdlSGFuZGxlcihldmVudCkge1xuICAgIHRoaXMucGFzc3dvcmQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgR3JvdXAgTmFtZSBhY2NvcmRpbmcgdG8gdGhlIHRleHQgZW50ZXJlZCBieSB0aGUgdXNlclxuICAgKiBAcGFyYW0gRXZlbnQgZXZlbnRcbiAgICovXG4gIG5hbWVDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5uYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIFR5cGUgb2YgIGFjY29yZGluZyB0byB0aGUgb3B0aW9uIHNlbGV0Y2VkIGJ5IHRoZSB1c2VyIGJ5IHRoZSB1c2VyXG4gICAqIEBwYXJhbSBFdmVudCBldmVudFxuICAgKi9cbiAgdHlwZUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB0eXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMudHlwZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgIGlmICh0eXBlID09PSBcInByb3RlY3RlZFwiKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkSW5wdXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhc3N3b3JkSW5wdXQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIGFsbCB0aGUgZ3JvdXAgZGV0YWlscyB0aGF0IHdlcmUgZW50ZXJlZCBiZWZvcmUgY3JlYXRpbmcgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdmFsaWRhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5uYW1lLnRyaW0oKTtcbiAgICBjb25zdCBncm91cFR5cGUgPSB0aGlzLnR5cGUudHJpbSgpO1xuXG4gICAgaWYgKCFncm91cE5hbWUpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBTVFJJTkdfTUVTU0FHRVMuR1JPVVBfTkFNRV9CTEFOSztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWdyb3VwVHlwZSkge1xuICAgICAgdGhpcy5lcnJvciA9IFNUUklOR19NRVNTQUdFUy5HUk9VUF9UWVBFX0JMQU5LO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHBhc3N3b3JkID0gXCJcIjtcbiAgICBpZiAoZ3JvdXBUeXBlID09PSBcInByb3RlY3RlZFwiKSB7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQ7XG5cbiAgICAgIGlmICghcGFzc3dvcmQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBTVFJJTkdfTUVTU0FHRVMuR1JPVVBfUEFTU1dPUkRfQkxBTks7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogSWYgdGhlIEdyb3VwIERhdGEgaXMgc3VjY2Vzc2Z1bGx5IHZhbGlkYXRlZCAsIGJlbG93IGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jcmVhdGVCdG5UZXh0ID09IFNUUklOR19NRVNTQUdFUy5DUkVBVElOR19NRVNTU0FHRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlQnRuVGV4dCA9IFNUUklOR19NRVNTQUdFUy5DUkVBVElOR19NRVNTU0FHRTtcblxuICAgIGNvbnN0IGdyb3VwVHlwZSA9IHRoaXMudHlwZS50cmltKCk7XG5cbiAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQ7XG4gICAgY29uc3QgZ3VpZCA9IFwiZ3JvdXBfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5uYW1lLnRyaW0oKTtcbiAgICBsZXQgdHlwZSA9IENvbWV0Q2hhdC5HUk9VUF9UWVBFLlBVQkxJQztcblxuICAgIHN3aXRjaCAoZ3JvdXBUeXBlKSB7XG4gICAgICBjYXNlIGVudW1zLlBVQkxJQ19HUk9VUDpcbiAgICAgICAgdHlwZSA9IENvbWV0Q2hhdC5HUk9VUF9UWVBFLlBVQkxJQztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLlBSSVZBVEVfR1JPVVA6XG4gICAgICAgIHR5cGUgPSBDb21ldENoYXQuR1JPVVBfVFlQRS5QUklWQVRFO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuUFJPVEVDVEVEX0dST1VQOlxuICAgICAgICB0eXBlID0gQ29tZXRDaGF0LkdST1VQX1RZUEUuUEFTU1dPUkQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgQ29tZXRDaGF0Lkdyb3VwKGd1aWQsIG5hbWUsIHR5cGUsIHBhc3N3b3JkKTtcblxuICAgIENvbWV0Q2hhdC5jcmVhdGVHcm91cChncm91cClcbiAgICAgIC50aGVuKChncm91cCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0R3JvdXBEYXRhKCk7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkdST1VQX0NSRUFURUQsXG4gICAgICAgICAgcGF5TG9hZDogZ3JvdXAsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdG5UZXh0ID0gU1RSSU5HX01FU1NBR0VTLkNSRUFURTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGFjdGlvbiBpbmRpY2F0aW5nIHRoZSBwYXJlbnQgdG8gY2xvc2UgdGhlIGNyZWF0ZSBncm91cCB2aWV3XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VDcmVhdGVHcm91cFZpZXcoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5DTE9TRV9DUkVBVEVfR1JPVVBfVklFVyxcbiAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIGFsbCB0aGUgR3JvdXAgY3JlYXRpb24gZm9ybSBkYXRhIHRvIGluaXRpYWwgdmFsdWVzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVzZXRHcm91cERhdGEoKSB7XG4gICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgdGhpcy5wYXNzd29yZElucHV0ID0gZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICB0aGlzLnR5cGUgPSBcIlwiO1xuICAgIHRoaXMucGFzc3dvcmQgPSBcIlwiO1xuICB9XG59XG4iXX0=