/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sticker-keyboard/cometchat-sticker-keyboard/cometchat-sticker-keyboard.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
import * as enums from "../../../utils/enums";
var CometchatStickerKeyboardComponent = /** @class */ (function () {
    function CometchatStickerKeyboardComponent() {
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = STRING_MESSAGES.LOADING_MESSSAGE;
        this.loading = true;
        this.stickerList = [];
        this.stickerSet = {};
        this.activeStickerList = [];
        this.activeStickerSet = null;
        this.categoryStickerUrl = [];
    }
    /**
     * @return {?}
     */
    CometchatStickerKeyboardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getStickers();
    };
    /**
     * Fetches all the information of stickers
     */
    /**
     * Fetches all the information of stickers
     * @return {?}
     */
    CometchatStickerKeyboardComponent.prototype.getStickers = /**
     * Fetches all the information of stickers
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.callExtension("stickers", "GET", "v1/fetch", null)
            .then((/**
         * @param {?} stickers
         * @return {?}
         */
        function (stickers) {
            // Stickers received
            /** @type {?} */
            var activeStickerSet = null;
            /** @type {?} */
            var customStickers = stickers.hasOwnProperty("customStickers")
                ? stickers["customStickers"]
                : [];
            /** @type {?} */
            var defaultStickers = stickers.hasOwnProperty("defaultStickers")
                ? stickers["defaultStickers"]
                : [];
            defaultStickers.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return a.stickerSetOrder - b.stickerSetOrder;
            }));
            customStickers.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return a.stickerSetOrder - b.stickerSetOrder;
            }));
            /** @type {?} */
            var stickerList = tslib_1.__spread(defaultStickers, customStickers);
            if (stickerList.length === 0) {
                _this.decoratorMessage = STRING_MESSAGES.NO_STICKERS_FOUND;
            }
            /** @type {?} */
            var stickerSet = stickerList.reduce((/**
             * @param {?} r
             * @param {?} sticker
             * @param {?} index
             * @return {?}
             */
            function (r, sticker, index) {
                var stickerSetName = sticker.stickerSetName;
                if (index === 0) {
                    activeStickerSet = stickerSetName;
                }
                r[stickerSetName] = tslib_1.__spread((r[stickerSetName] || []), [tslib_1.__assign({}, sticker)]);
                return r;
            }), {});
            /** @type {?} */
            var activeStickerList = [];
            if (Object.keys(stickerSet).length) {
                Object.keys(stickerSet).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    stickerSet[key].sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) {
                        return a.stickerOrder - b.stickerOrder;
                    }));
                }));
                activeStickerList = stickerSet[activeStickerSet];
            }
            _this.stickerList = stickerList;
            _this.stickerSet = stickerSet;
            _this.activeStickerList = activeStickerList;
            _this.activeStickerSet = activeStickerSet;
            if (stickerList.length !== 0) {
                _this.loading = false;
            }
            Object.keys(_this.stickerSet).map((/**
             * @param {?} sectionItem
             * @return {?}
             */
            function (sectionItem) {
                /** @type {?} */
                var url = _this.stickerSet[sectionItem][0];
                _this.categoryStickerUrl.push(url);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            // Some error occured
            console.warn("Error: ", error);
            _this.decoratorMessage = STRING_MESSAGES.NO_STICKERS_FOUND;
            _this.activeStickerList = [];
            _this.stickerSet = {};
        }));
    };
    /**
     * Gets The sticker collection when sticker category is changed
     * @param
     */
    /**
     * Gets The sticker collection when sticker category is changed
     * @param {?} sectionItem
     * @return {?}
     */
    CometchatStickerKeyboardComponent.prototype.stickerSetClicked = /**
     * Gets The sticker collection when sticker category is changed
     * @param {?} sectionItem
     * @return {?}
     */
    function (sectionItem) {
        // sectionItem = "bear";
        this.activeStickerList = [];
        /** @type {?} */
        var stickerSet = tslib_1.__assign({}, this.stickerSet);
        /** @type {?} */
        var activeStickerList = stickerSet[sectionItem];
        this.activeStickerSet = sectionItem;
        this.activeStickerList = activeStickerList;
    };
    /**
     * Sends Sticker as Message
     * @param
     */
    /**
     * Sends Sticker as Message
     * @param {?} stickerItem
     * @return {?}
     */
    CometchatStickerKeyboardComponent.prototype.sendStickerMessage = /**
     * Sends Sticker as Message
     * @param {?} stickerItem
     * @return {?}
     */
    function (stickerItem) {
        this.actionGenerated.emit({
            type: enums.SEND_STICKER,
            payLoad: stickerItem,
        });
    };
    /**
     * Close Sticker Window
     * @param
     */
    /**
     * Close Sticker Window
     * @param {?} message
     * @return {?}
     */
    CometchatStickerKeyboardComponent.prototype.closeStickerWindow = /**
     * Close Sticker Window
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.actionGenerated.emit({
            type: message,
        });
    };
    CometchatStickerKeyboardComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sticker-keyboard",
                    template: "<div class=\"stickerWrapperStyle\">\n  <!--Message container-->\n  <div class=\"stickerMsgStyle\" *ngIf=\"loading; else elseBlock\">\n    <p class=\"stickerMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <ng-template #elseBlock>\n    <div\n      class=\"stickerCloseStyle\"\n      (click)=\"closeStickerWindow('closeSticker')\"\n    ></div>\n\n    <!--ActiveStickerList-->\n\n    <div class=\"stickerListStyle\">\n      <div\n        *ngFor=\"let stickers of activeStickerList\"\n        (click)=\"sendStickerMessage(stickers)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"stickerItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n\n    <!--Section Items-->\n    <div class=\"stickerSectionListStyle\">\n      <div\n        *ngFor=\"let stickers of categoryStickerUrl\"\n        (click)=\"stickerSetClicked(stickers.stickerSetName)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"sectionListItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                    styles: [".stickerWrapperStyle{border-radius:10px;margin-bottom:-15px;padding-bottom:15px;height:230px;display:flex;flex-direction:column;justify-content:center;background-color:rgba(20,20,20,.04);border:1px solid #eaeaea}.stickerSectionListStyle{display:flex;justify-content:space-between;align-items:center;text-transform:uppercase;overflow-x:auto;overflow-y:hidden;padding:17px;border-top:1px solid #eaeaea;background-color:#c4c4c4}.stickerListStyle::-webkit-scrollbar{background:#ffffff00;width:8px;height:4px}.stickerListStyle::-webkit-scrollbar-thumb{background:#ccc}.sectionListItemStyle{height:35px;width:35px;cursor:pointer;flex-shrink:0}.sectionListItemStyle:not(:first-of-type){margin-left:16px}.stickerListStyle{height:calc(100% - 50px);display:flex;overflow-x:hidden;overflow-y:auto;flex-wrap:wrap;justify-content:space-between;align-items:center}.stickerItemStyle{min-width:50px;min-height:50px;max-width:70px;max-width:70px;cursor:pointer;flex-shrink:0;margin-right:20px}.stickerMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:35%}.stickerMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.stickerCloseStyle{width:20px;height:24px;border-radius:50%;align-self:flex-end;cursor:pointer;margin:10px 10px 0 0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    CometchatStickerKeyboardComponent.ctorParameters = function () { return []; };
    CometchatStickerKeyboardComponent.propDecorators = {
        actionGenerated: [{ type: Output }]
    };
    return CometchatStickerKeyboardComponent;
}());
export { CometchatStickerKeyboardComponent };
if (false) {
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.loading;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.stickerList;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.stickerSet;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.activeStickerList;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.activeStickerSet;
    /** @type {?} */
    CometchatStickerKeyboardComponent.prototype.categoryStickerUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUM7SUFlRTtRQVRVLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUscUJBQWdCLEdBQVcsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQzVELFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUNULENBQUM7Ozs7SUFFaEIsb0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1REFBVzs7OztJQUFYO1FBQUEsaUJBa0VDO1FBakVDLFNBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ3pELElBQUk7Ozs7UUFBQyxV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QUVsRSw2REFBNEQ7O0lBQzVELG9EQUF3Qjs7SUFDeEIsd0RBQWlCOztJQUNqQix1REFBZ0I7O0lBQ2hCLDhEQUF1Qjs7SUFDdkIsNkRBQXdCOztJQUN4QiwrREFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc3RpY2tlci1rZXlib2FyZFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zdGlja2VyLWtleWJvYXJkLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc3RpY2tlci1rZXlib2FyZC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTdGlja2VyS2V5Ym9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBkZWNvcmF0b3JNZXNzYWdlOiBzdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuTE9BRElOR19NRVNTU0FHRTtcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIHN0aWNrZXJMaXN0ID0gW107XG4gIHN0aWNrZXJTZXQgPSB7fTtcbiAgYWN0aXZlU3RpY2tlckxpc3QgPSBbXTtcbiAgYWN0aXZlU3RpY2tlclNldCA9IG51bGw7XG4gIGNhdGVnb3J5U3RpY2tlclVybCA9IFtdO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRTdGlja2VycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgYWxsIHRoZSBpbmZvcm1hdGlvbiBvZiBzdGlja2Vyc1xuICAgKi9cbiAgZ2V0U3RpY2tlcnMoKSB7XG4gICAgQ29tZXRDaGF0LmNhbGxFeHRlbnNpb24oXCJzdGlja2Vyc1wiLCBcIkdFVFwiLCBcInYxL2ZldGNoXCIsIG51bGwpXG4gICAgICAudGhlbigoc3RpY2tlcnMpID0+IHtcbiAgICAgICAgLy8gU3RpY2tlcnMgcmVjZWl2ZWRcbiAgICAgICAgbGV0IGFjdGl2ZVN0aWNrZXJTZXQgPSBudWxsO1xuICAgICAgICBjb25zdCBjdXN0b21TdGlja2VycyA9IHN0aWNrZXJzLmhhc093blByb3BlcnR5KFwiY3VzdG9tU3RpY2tlcnNcIilcbiAgICAgICAgICA/IHN0aWNrZXJzW1wiY3VzdG9tU3RpY2tlcnNcIl1cbiAgICAgICAgICA6IFtdO1xuICAgICAgICBjb25zdCBkZWZhdWx0U3RpY2tlcnMgPSBzdGlja2Vycy5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRTdGlja2Vyc1wiKVxuICAgICAgICAgID8gc3RpY2tlcnNbXCJkZWZhdWx0U3RpY2tlcnNcIl1cbiAgICAgICAgICA6IFtdO1xuICAgICAgICBkZWZhdWx0U3RpY2tlcnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhLnN0aWNrZXJTZXRPcmRlciAtIGIuc3RpY2tlclNldE9yZGVyO1xuICAgICAgICB9KTtcblxuICAgICAgICBjdXN0b21TdGlja2Vycy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEuc3RpY2tlclNldE9yZGVyIC0gYi5zdGlja2VyU2V0T3JkZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0aWNrZXJMaXN0ID0gWy4uLmRlZmF1bHRTdGlja2VycywgLi4uY3VzdG9tU3RpY2tlcnNdO1xuXG4gICAgICAgIGlmIChzdGlja2VyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fU1RJQ0tFUlNfRk9VTkQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGlja2VyU2V0ID0gc3RpY2tlckxpc3QucmVkdWNlKChyLCBzdGlja2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgc3RpY2tlclNldE5hbWUgfSA9IHN0aWNrZXI7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBhY3RpdmVTdGlja2VyU2V0ID0gc3RpY2tlclNldE5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcltzdGlja2VyU2V0TmFtZV0gPSBbLi4uKHJbc3RpY2tlclNldE5hbWVdIHx8IFtdKSwgeyAuLi5zdGlja2VyIH1dO1xuXG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgbGV0IGFjdGl2ZVN0aWNrZXJMaXN0ID0gW107XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGlja2VyU2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhzdGlja2VyU2V0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHN0aWNrZXJTZXRba2V5XS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhLnN0aWNrZXJPcmRlciAtIGIuc3RpY2tlck9yZGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhY3RpdmVTdGlja2VyTGlzdCA9IHN0aWNrZXJTZXRbYWN0aXZlU3RpY2tlclNldF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0aWNrZXJMaXN0ID0gc3RpY2tlckxpc3Q7XG4gICAgICAgIHRoaXMuc3RpY2tlclNldCA9IHN0aWNrZXJTZXQ7XG4gICAgICAgIHRoaXMuYWN0aXZlU3RpY2tlckxpc3QgPSBhY3RpdmVTdGlja2VyTGlzdDtcbiAgICAgICAgdGhpcy5hY3RpdmVTdGlja2VyU2V0ID0gYWN0aXZlU3RpY2tlclNldDtcblxuICAgICAgICBpZiAoc3RpY2tlckxpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdGlja2VyU2V0KS5tYXAoKHNlY3Rpb25JdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zdGlja2VyU2V0W3NlY3Rpb25JdGVtXVswXTtcbiAgICAgICAgICB0aGlzLmNhdGVnb3J5U3RpY2tlclVybC5wdXNoKHVybCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gU29tZSBlcnJvciBvY2N1cmVkXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICB0aGlzLmRlY29yYXRvck1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTk9fU1RJQ0tFUlNfRk9VTkQ7XG4gICAgICAgIHRoaXMuYWN0aXZlU3RpY2tlckxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5zdGlja2VyU2V0ID0ge307XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIFRoZSBzdGlja2VyIGNvbGxlY3Rpb24gd2hlbiBzdGlja2VyIGNhdGVnb3J5IGlzIGNoYW5nZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGlja2VyU2V0Q2xpY2tlZChzZWN0aW9uSXRlbSkge1xuICAgIC8vIHNlY3Rpb25JdGVtID0gXCJiZWFyXCI7XG4gICAgdGhpcy5hY3RpdmVTdGlja2VyTGlzdCA9IFtdO1xuICAgIGNvbnN0IHN0aWNrZXJTZXQgPSB7IC4uLnRoaXMuc3RpY2tlclNldCB9O1xuICAgIGNvbnN0IGFjdGl2ZVN0aWNrZXJMaXN0ID0gc3RpY2tlclNldFtzZWN0aW9uSXRlbV07XG4gICAgdGhpcy5hY3RpdmVTdGlja2VyU2V0ID0gc2VjdGlvbkl0ZW07XG4gICAgdGhpcy5hY3RpdmVTdGlja2VyTGlzdCA9IGFjdGl2ZVN0aWNrZXJMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIFN0aWNrZXIgYXMgTWVzc2FnZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNlbmRTdGlja2VyTWVzc2FnZShzdGlja2VySXRlbSkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuU0VORF9TVElDS0VSLFxuICAgICAgcGF5TG9hZDogc3RpY2tlckl0ZW0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgU3RpY2tlciBXaW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVN0aWNrZXJXaW5kb3cobWVzc2FnZSkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogbWVzc2FnZSxcbiAgICB9KTtcbiAgfVxufVxuIl19