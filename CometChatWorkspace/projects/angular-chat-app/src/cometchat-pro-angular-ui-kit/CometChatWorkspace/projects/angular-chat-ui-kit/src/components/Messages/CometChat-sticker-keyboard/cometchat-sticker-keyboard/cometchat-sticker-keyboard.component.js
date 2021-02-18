/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sticker-keyboard/cometchat-sticker-keyboard/cometchat-sticker-keyboard.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatStickerKeyboardComponent {
    constructor() {
        this.actionGenerated = new EventEmitter();
        this.decoratorMessage = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
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
        try {
            this.getStickers();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches all the information of stickers
     * @return {?}
     */
    getStickers() {
        try {
            CometChat.callExtension(enums.STICKERS, enums.GET, enums.V1_FETCH, null)
                .then((/**
             * @param {?} stickers
             * @return {?}
             */
            (stickers) => {
                // Stickers received
                /** @type {?} */
                let activeStickerSet = null;
                /** @type {?} */
                const customStickers = stickers.hasOwnProperty(enums.CUSTOM_STICKERS)
                    ? stickers[enums.CUSTOM_STICKERS]
                    : [];
                /** @type {?} */
                const defaultStickers = stickers.hasOwnProperty(enums.DEFAULT_STICKERS)
                    ? stickers[enums.DEFAULT_STICKERS]
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
                    this.decoratorMessage = COMETCHAT_CONSTANTS.NO_STICKERS_FOUND;
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
                this.decoratorMessage = COMETCHAT_CONSTANTS.NO_STICKERS_FOUND;
                this.activeStickerList = [];
                this.stickerSet = {};
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets The sticker collection when sticker category is changed
     * @param {?} sectionItem
     * @return {?}
     */
    stickerSetClicked(sectionItem) {
        try {
            this.activeStickerList = [];
            /** @type {?} */
            const stickerSet = Object.assign({}, this.stickerSet);
            /** @type {?} */
            const activeStickerList = stickerSet[sectionItem];
            this.activeStickerSet = sectionItem;
            this.activeStickerList = activeStickerList;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sends Sticker as Message
     * @param {?} stickerItem
     * @return {?}
     */
    sendStickerMessage(stickerItem) {
        try {
            this.actionGenerated.emit({
                type: enums.SEND_STICKER,
                payLoad: stickerItem,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Close Sticker Window
     * @param {?} message
     * @return {?}
     */
    closeStickerWindow(message) {
        try {
            this.actionGenerated.emit({
                type: message,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatStickerKeyboardComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sticker-keyboard",
                template: "<div class=\"stickerWrapperStyle\">\n  <!--Message container-->\n  <div class=\"stickerMsgStyle\" *ngIf=\"loading; else elseBlock\">\n    <p class=\"stickerMsgTxtStyle\">\n      {{ decoratorMessage }}\n    </p>\n  </div>\n  <ng-template #elseBlock>\n    <div\n      class=\"stickerCloseStyle\"\n      (click)=\"closeStickerWindow('closeSticker')\"\n    ></div>\n\n    <!--ActiveStickerList-->\n\n    <div class=\"stickerListStyle\">\n      <div\n        *ngFor=\"let stickers of activeStickerList\"\n        (click)=\"sendStickerMessage(stickers)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"stickerItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n\n    <!--Section Items-->\n    <div class=\"stickerSectionListStyle\">\n      <div\n        *ngFor=\"let stickers of categoryStickerUrl\"\n        (click)=\"stickerSetClicked(stickers.stickerSetName)\"\n      >\n        <img\n          [src]=\"stickers.stickerUrl\"\n          alt=\"stickers.stickerSetName\"\n          class=\"sectionListItemStyle\"\n          loading=\"lazy\"\n        />\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                styles: [".stickerWrapperStyle{border-radius:10px;margin-bottom:-15px;padding-bottom:15px;height:230px;display:flex;flex-direction:column;justify-content:center;background-color:rgba(20,20,20,.04);border:1px solid #eaeaea}.stickerSectionListStyle{display:flex;justify-content:space-between;align-items:center;text-transform:uppercase;overflow-x:auto;overflow-y:hidden;padding:17px;border-top:1px solid #eaeaea;background-color:#c4c4c4}.stickerListStyle::-webkit-scrollbar{background:#ffffff00;width:8px;height:4px}.stickerListStyle::-webkit-scrollbar-thumb{background:#ccc}.sectionListItemStyle{height:35px;width:35px;cursor:pointer;flex-shrink:0}.sectionListItemStyle:not(:first-of-type){margin-left:16px}.stickerListStyle{height:calc(100% - 50px);display:flex;overflow-x:hidden;overflow-y:auto;flex-wrap:wrap;justify-content:space-between;align-items:center}.stickerItemStyle{min-width:50px;min-height:50px;max-width:70px;max-width:70px;cursor:pointer;flex-shrink:0;margin-right:20px}.stickerMsgStyle{overflow:hidden;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:35%}.stickerMsgTxtStyle{margin:0;height:30px;font-size:24px!important;font-weight:600;color:#ccc}.stickerCloseStyle{width:20px;height:24px;border-radius:50%;align-self:flex-end;cursor:pointer;margin:10px 10px 0 0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat}"]
            }] }
];
/** @nocollapse */
CometChatStickerKeyboardComponent.ctorParameters = () => [];
CometChatStickerKeyboardComponent.propDecorators = {
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.decoratorMessage;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.loading;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.stickerList;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.stickerSet;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.activeStickerList;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.activeStickerSet;
    /** @type {?} */
    CometChatStickerKeyboardComponent.prototype.categoryStickerUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1sRCxNQUFNLE9BQU8saUNBQWlDO0lBVTVDO1FBVFUsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxxQkFBZ0IsR0FBVyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRSxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7SUFDVCxDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJO1lBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lB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QUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUN4QixPQUFPLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxrQkFBa0IsQ0FBQyxPQUFPO1FBQ3hCLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFqSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLGtzQ0FBMEQ7O2FBRTNEOzs7Ozs4QkFFRSxNQUFNOzs7O0lBQVAsNERBQWtFOztJQUVsRSw2REFBZ0U7O0lBQ2hFLG9EQUF3Qjs7SUFDeEIsd0RBQWlCOztJQUNqQix1REFBZ0I7O0lBQ2hCLDhEQUF1Qjs7SUFDdkIsNkRBQXdCOztJQUN4QiwrREFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc3RpY2tlci1rZXlib2FyZC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0U3RpY2tlcktleWJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZGVjb3JhdG9yTWVzc2FnZTogc3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5MT0FESU5HX01FU1NTQUdFO1xuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgc3RpY2tlckxpc3QgPSBbXTtcbiAgc3RpY2tlclNldCA9IHt9O1xuICBhY3RpdmVTdGlja2VyTGlzdCA9IFtdO1xuICBhY3RpdmVTdGlja2VyU2V0ID0gbnVsbDtcbiAgY2F0ZWdvcnlTdGlja2VyVXJsID0gW107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5nZXRTdGlja2VycygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGFsbCB0aGUgaW5mb3JtYXRpb24gb2Ygc3RpY2tlcnNcbiAgICovXG4gIGdldFN0aWNrZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQuY2FsbEV4dGVuc2lvbihlbnVtcy5TVElDS0VSUywgZW51bXMuR0VULCBlbnVtcy5WMV9GRVRDSCwgbnVsbClcbiAgICAgICAgLnRoZW4oKHN0aWNrZXJzKSA9PiB7XG4gICAgICAgICAgLy8gU3RpY2tlcnMgcmVjZWl2ZWRcbiAgICAgICAgICBsZXQgYWN0aXZlU3RpY2tlclNldCA9IG51bGw7XG4gICAgICAgICAgY29uc3QgY3VzdG9tU3RpY2tlcnMgPSBzdGlja2Vycy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5DVVNUT01fU1RJQ0tFUlMpXG4gICAgICAgICAgICA/IHN0aWNrZXJzW2VudW1zLkNVU1RPTV9TVElDS0VSU11cbiAgICAgICAgICAgIDogW107XG4gICAgICAgICAgY29uc3QgZGVmYXVsdFN0aWNrZXJzID0gc3RpY2tlcnMuaGFzT3duUHJvcGVydHkoXG4gICAgICAgICAgICBlbnVtcy5ERUZBVUxUX1NUSUNLRVJTXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBzdGlja2Vyc1tlbnVtcy5ERUZBVUxUX1NUSUNLRVJTXVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICBkZWZhdWx0U3RpY2tlcnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuc3RpY2tlclNldE9yZGVyIC0gYi5zdGlja2VyU2V0T3JkZXI7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjdXN0b21TdGlja2Vycy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5zdGlja2VyU2V0T3JkZXIgLSBiLnN0aWNrZXJTZXRPcmRlcjtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHN0aWNrZXJMaXN0ID0gWy4uLmRlZmF1bHRTdGlja2VycywgLi4uY3VzdG9tU3RpY2tlcnNdO1xuXG4gICAgICAgICAgaWYgKHN0aWNrZXJMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19TVElDS0VSU19GT1VORDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdGlja2VyU2V0ID0gc3RpY2tlckxpc3QucmVkdWNlKChyLCBzdGlja2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdGlja2VyU2V0TmFtZSB9ID0gc3RpY2tlcjtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICBhY3RpdmVTdGlja2VyU2V0ID0gc3RpY2tlclNldE5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJbc3RpY2tlclNldE5hbWVdID0gWy4uLihyW3N0aWNrZXJTZXROYW1lXSB8fCBbXSksIHsgLi4uc3RpY2tlciB9XTtcblxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgfSwge30pO1xuICAgICAgICAgIGxldCBhY3RpdmVTdGlja2VyTGlzdCA9IFtdO1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGlja2VyU2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0aWNrZXJTZXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICBzdGlja2VyU2V0W2tleV0uc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnN0aWNrZXJPcmRlciAtIGIuc3RpY2tlck9yZGVyO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhY3RpdmVTdGlja2VyTGlzdCA9IHN0aWNrZXJTZXRbYWN0aXZlU3RpY2tlclNldF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zdGlja2VyTGlzdCA9IHN0aWNrZXJMaXN0O1xuICAgICAgICAgIHRoaXMuc3RpY2tlclNldCA9IHN0aWNrZXJTZXQ7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTdGlja2VyTGlzdCA9IGFjdGl2ZVN0aWNrZXJMaXN0O1xuICAgICAgICAgIHRoaXMuYWN0aXZlU3RpY2tlclNldCA9IGFjdGl2ZVN0aWNrZXJTZXQ7XG5cbiAgICAgICAgICBpZiAoc3RpY2tlckxpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdGlja2VyU2V0KS5tYXAoKHNlY3Rpb25JdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnN0aWNrZXJTZXRbc2VjdGlvbkl0ZW1dWzBdO1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yeVN0aWNrZXJVcmwucHVzaCh1cmwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgLy8gU29tZSBlcnJvciBvY2N1cmVkXG4gICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgdGhpcy5kZWNvcmF0b3JNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19TVElDS0VSU19GT1VORDtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVN0aWNrZXJMaXN0ID0gW107XG4gICAgICAgICAgdGhpcy5zdGlja2VyU2V0ID0ge307XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIFRoZSBzdGlja2VyIGNvbGxlY3Rpb24gd2hlbiBzdGlja2VyIGNhdGVnb3J5IGlzIGNoYW5nZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGlja2VyU2V0Q2xpY2tlZChzZWN0aW9uSXRlbSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGl2ZVN0aWNrZXJMaXN0ID0gW107XG4gICAgICBjb25zdCBzdGlja2VyU2V0ID0geyAuLi50aGlzLnN0aWNrZXJTZXQgfTtcbiAgICAgIGNvbnN0IGFjdGl2ZVN0aWNrZXJMaXN0ID0gc3RpY2tlclNldFtzZWN0aW9uSXRlbV07XG4gICAgICB0aGlzLmFjdGl2ZVN0aWNrZXJTZXQgPSBzZWN0aW9uSXRlbTtcbiAgICAgIHRoaXMuYWN0aXZlU3RpY2tlckxpc3QgPSBhY3RpdmVTdGlja2VyTGlzdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgU3RpY2tlciBhcyBNZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2VuZFN0aWNrZXJNZXNzYWdlKHN0aWNrZXJJdGVtKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5TRU5EX1NUSUNLRVIsXG4gICAgICAgIHBheUxvYWQ6IHN0aWNrZXJJdGVtLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIFN0aWNrZXIgV2luZG93XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2xvc2VTdGlja2VyV2luZG93KG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IG1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==