/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sticker-keyboard/cometchat-sticker-keyboard/cometchat-sticker-keyboard.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
import * as enums from "../../../utils/enums";
export class CometchatStickerKeyboardComponent {
    constructor() {
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
    ngOnInit() {
        this.getStickers();
    }
    /**
     * Fetches all the information of stickers
     * @return {?}
     */
    getStickers() {
        CometChat.callExtension("stickers", "GET", "v1/fetch", null)
            .then((/**
         * @param {?} stickers
         * @return {?}
         */
        (stickers) => {
            // Stickers received
            /** @type {?} */
            let activeStickerSet = null;
            /** @type {?} */
            const customStickers = stickers.hasOwnProperty("customStickers")
                ? stickers["customStickers"]
                : [];
            /** @type {?} */
            const defaultStickers = stickers.hasOwnProperty("defaultStickers")
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
            const stickerList = [...defaultStickers, ...customStickers];
            if (stickerList.length === 0) {
                this.decoratorMessage = STRING_MESSAGES.NO_STICKERS_FOUND;
            }
            /** @type {?} */
            const stickerSet = stickerList.reduce((/**
             * @param {?} r
             * @param {?} sticker
             * @param {?} index
             * @return {?}
             */
            (r, sticker, index) => {
                const { stickerSetName } = sticker;
                if (index === 0) {
                    activeStickerSet = stickerSetName;
                }
                r[stickerSetName] = [...(r[stickerSetName] || []), Object.assign({}, sticker)];
                return r;
            }), {});
            /** @type {?} */
            let activeStickerList = [];
            if (Object.keys(stickerSet).length) {
                Object.keys(stickerSet).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => {
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
            this.stickerList = stickerList;
            this.stickerSet = stickerSet;
            this.activeStickerList = activeStickerList;
            this.activeStickerSet = activeStickerSet;
            if (stickerList.length !== 0) {
                this.loading = false;
            }
            Object.keys(this.stickerSet).map((/**
             * @param {?} sectionItem
             * @return {?}
             */
            (sectionItem) => {
                /** @type {?} */
                const url = this.stickerSet[sectionItem][0];
                this.categoryStickerUrl.push(url);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            // Some error occured
            console.warn("Error: ", error);
            this.decoratorMessage = STRING_MESSAGES.NO_STICKERS_FOUND;
            this.activeStickerList = [];
            this.stickerSet = {};
        }));
    }
    /**
     * Gets The sticker collection when sticker category is changed
     * @param {?} sectionItem
     * @return {?}
     */
    stickerSetClicked(sectionItem) {
        // sectionItem = "bear";
        this.activeStickerList = [];
        /** @type {?} */
        const stickerSet = Object.assign({}, this.stickerSet);
        /** @type {?} */
        const activeStickerList = stickerSet[sectionItem];
        this.activeStickerSet = sectionItem;
        this.activeStickerList = activeStickerList;
    }
    /**
     * Sends Sticker as Message
     * @param {?} stickerItem
     * @return {?}
     */
    sendStickerMessage(stickerItem) {
        this.actionGenerated.emit({
            type: enums.SEND_STICKER,
            payLoad: stickerItem,
        });
    }
    /**
     * Close Sticker Window
     * @param {?} message
     * @return {?}
     */
    closeStickerWindow(message) {
        this.actionGenerated.emit({
            type: message,
        });
    }
}
CometchatStickerKeyboardComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sticker-keyboard",
                template: "<div class=\"stickerWrapperStyle\">\n  <!--Message container-->\n  <div class=\"stickerMsgStyle\" *ngIf=\"loading; else elseBlock\">\n    <p class=\"stickerMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <ng-template #elseBlock>\n    <div\n      class=\"stickerCloseStyle\"\n      (click)=\"closeStickerWindow('closeSticker')\"\n    ></div>\n\n    <!--ActiveStickerList-->\n\n    <div class=\"stickerListStyle\">\n      <div\n        *ngFor=\"let stickers of activeStickerList\"\n        (click)=\"sendStickerMessage(stickers)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"stickerItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n\n    <!--Section Items-->\n    <div class=\"stickerSectionListStyle\">\n      <div\n        *ngFor=\"let stickers of categoryStickerUrl\"\n        (click)=\"stickerSetClicked(stickers.stickerSetName)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"sectionListItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                styles: [".stickerWrapperStyle{border-radius:10px;margin-bottom:-15px;padding-bottom:15px;height:230px;display:flex;flex-direction:column;justify-content:center;background-color:rgba(20,20,20,.04);border:1px solid #eaeaea}.stickerSectionListStyle{display:flex;justify-content:space-between;align-items:center;text-transform:uppercase;overflow-x:auto;overflow-y:hidden;padding:17px;border-top:1px solid #eaeaea;background-color:#c4c4c4}.stickerListStyle::-webkit-scrollbar{background:#ffffff00;width:8px;height:4px}.stickerListStyle::-webkit-scrollbar-thumb{background:#ccc}.sectionListItemStyle{height:35px;width:35px;cursor:pointer;flex-shrink:0}.sectionListItemStyle:not(:first-of-type){margin-left:16px}.stickerListStyle{height:calc(100% - 50px);display:flex;overflow-x:hidden;overflow-y:auto;flex-wrap:wrap;justify-content:space-between;align-items:center}.stickerItemStyle{min-width:50px;min-height:50px;max-width:70px;max-width:70px;cursor:pointer;flex-shrink:0;margin-right:20px}.stickerMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:35%}.stickerMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.stickerCloseStyle{width:20px;height:24px;border-radius:50%;align-self:flex-end;cursor:pointer;margin:10px 10px 0 0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat}"]
            }] }
];
/** @nocollapse */
CometchatStickerKeyboardComponent.ctorParameters = () => [];
CometchatStickerKeyboardComponent.propDecorators = {
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQU05QyxNQUFNLE9BQU8saUNBQWlDO0lBVTVDO1FBVFUsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxxQkFBZ0IsR0FBVyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDNUQsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQ1QsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBS0QsV0FBVztRQUNULFNBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ3pELElBQUk7Ozs7UUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOzs7Z0JB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QWdCOztJQUNoQiw4REFBdUI7O0lBQ3ZCLDZEQUF3Qjs7SUFDeEIsK0RBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc3RpY2tlci1rZXlib2FyZC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U3RpY2tlcktleWJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZGVjb3JhdG9yTWVzc2FnZTogc3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkxPQURJTkdfTUVTU1NBR0U7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICBzdGlja2VyTGlzdCA9IFtdO1xuICBzdGlja2VyU2V0ID0ge307XG4gIGFjdGl2ZVN0aWNrZXJMaXN0ID0gW107XG4gIGFjdGl2ZVN0aWNrZXJTZXQgPSBudWxsO1xuICBjYXRlZ29yeVN0aWNrZXJVcmwgPSBbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0U3RpY2tlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGFsbCB0aGUgaW5mb3JtYXRpb24gb2Ygc3RpY2tlcnNcbiAgICovXG4gIGdldFN0aWNrZXJzKCkge1xuICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKFwic3RpY2tlcnNcIiwgXCJHRVRcIiwgXCJ2MS9mZXRjaFwiLCBudWxsKVxuICAgICAgLnRoZW4oKHN0aWNrZXJzKSA9PiB7XG4gICAgICAgIC8vIFN0aWNrZXJzIHJlY2VpdmVkXG4gICAgICAgIGxldCBhY3RpdmVTdGlja2VyU2V0ID0gbnVsbDtcbiAgICAgICAgY29uc3QgY3VzdG9tU3RpY2tlcnMgPSBzdGlja2Vycy5oYXNPd25Qcm9wZXJ0eShcImN1c3RvbVN0aWNrZXJzXCIpXG4gICAgICAgICAgPyBzdGlja2Vyc1tcImN1c3RvbVN0aWNrZXJzXCJdXG4gICAgICAgICAgOiBbXTtcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0aWNrZXJzID0gc3RpY2tlcnMuaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0U3RpY2tlcnNcIilcbiAgICAgICAgICA/IHN0aWNrZXJzW1wiZGVmYXVsdFN0aWNrZXJzXCJdXG4gICAgICAgICAgOiBbXTtcbiAgICAgICAgZGVmYXVsdFN0aWNrZXJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYS5zdGlja2VyU2V0T3JkZXIgLSBiLnN0aWNrZXJTZXRPcmRlcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3VzdG9tU3RpY2tlcnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhLnN0aWNrZXJTZXRPcmRlciAtIGIuc3RpY2tlclNldE9yZGVyO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdGlja2VyTGlzdCA9IFsuLi5kZWZhdWx0U3RpY2tlcnMsIC4uLmN1c3RvbVN0aWNrZXJzXTtcblxuICAgICAgICBpZiAoc3RpY2tlckxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX1NUSUNLRVJTX0ZPVU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RpY2tlclNldCA9IHN0aWNrZXJMaXN0LnJlZHVjZSgociwgc3RpY2tlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHN0aWNrZXJTZXROYW1lIH0gPSBzdGlja2VyO1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgYWN0aXZlU3RpY2tlclNldCA9IHN0aWNrZXJTZXROYW1lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJbc3RpY2tlclNldE5hbWVdID0gWy4uLihyW3N0aWNrZXJTZXROYW1lXSB8fCBbXSksIHsgLi4uc3RpY2tlciB9XTtcblxuICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCBhY3RpdmVTdGlja2VyTGlzdCA9IFtdO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3RpY2tlclNldCkubGVuZ3RoKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoc3RpY2tlclNldCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBzdGlja2VyU2V0W2tleV0uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICByZXR1cm4gYS5zdGlja2VyT3JkZXIgLSBiLnN0aWNrZXJPcmRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYWN0aXZlU3RpY2tlckxpc3QgPSBzdGlja2VyU2V0W2FjdGl2ZVN0aWNrZXJTZXRdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGlja2VyTGlzdCA9IHN0aWNrZXJMaXN0O1xuICAgICAgICB0aGlzLnN0aWNrZXJTZXQgPSBzdGlja2VyU2V0O1xuICAgICAgICB0aGlzLmFjdGl2ZVN0aWNrZXJMaXN0ID0gYWN0aXZlU3RpY2tlckxpc3Q7XG4gICAgICAgIHRoaXMuYWN0aXZlU3RpY2tlclNldCA9IGFjdGl2ZVN0aWNrZXJTZXQ7XG5cbiAgICAgICAgaWYgKHN0aWNrZXJMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3RpY2tlclNldCkubWFwKChzZWN0aW9uSXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc3RpY2tlclNldFtzZWN0aW9uSXRlbV1bMF07XG4gICAgICAgICAgdGhpcy5jYXRlZ29yeVN0aWNrZXJVcmwucHVzaCh1cmwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIFNvbWUgZXJyb3Igb2NjdXJlZFxuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX1NUSUNLRVJTX0ZPVU5EO1xuICAgICAgICB0aGlzLmFjdGl2ZVN0aWNrZXJMaXN0ID0gW107XG4gICAgICAgIHRoaXMuc3RpY2tlclNldCA9IHt9O1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBUaGUgc3RpY2tlciBjb2xsZWN0aW9uIHdoZW4gc3RpY2tlciBjYXRlZ29yeSBpcyBjaGFuZ2VkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc3RpY2tlclNldENsaWNrZWQoc2VjdGlvbkl0ZW0pIHtcbiAgICAvLyBzZWN0aW9uSXRlbSA9IFwiYmVhclwiO1xuICAgIHRoaXMuYWN0aXZlU3RpY2tlckxpc3QgPSBbXTtcbiAgICBjb25zdCBzdGlja2VyU2V0ID0geyAuLi50aGlzLnN0aWNrZXJTZXQgfTtcbiAgICBjb25zdCBhY3RpdmVTdGlja2VyTGlzdCA9IHN0aWNrZXJTZXRbc2VjdGlvbkl0ZW1dO1xuICAgIHRoaXMuYWN0aXZlU3RpY2tlclNldCA9IHNlY3Rpb25JdGVtO1xuICAgIHRoaXMuYWN0aXZlU3RpY2tlckxpc3QgPSBhY3RpdmVTdGlja2VyTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBTdGlja2VyIGFzIE1lc3NhZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZW5kU3RpY2tlck1lc3NhZ2Uoc3RpY2tlckl0ZW0pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlNFTkRfU1RJQ0tFUixcbiAgICAgIHBheUxvYWQ6IHN0aWNrZXJJdGVtLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIFN0aWNrZXIgV2luZG93XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VTdGlja2VyV2luZG93KG1lc3NhZ2UpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IG1lc3NhZ2UsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==