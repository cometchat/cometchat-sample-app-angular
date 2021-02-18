/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-image-viewer/cometchat-image-viewer/cometchat-image-viewer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatImageViewerComponent {
    constructor() {
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.getUrl();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets the Url of image
     * @return {?}
     */
    getUrl() {
        try {
            /** @type {?} */
            let img = new Image();
            img.src = this.messageDetails.data.url;
            this.imageUrl = img.src;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits action to close full screen view
     * @return {?}
     */
    close() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_FULL_SCREEN_IMAGE,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatImageViewerComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-image-viewer",
                template: "<!--Backdrop-->\n<cometchat-backdrop [show]=\"open\"></cometchat-backdrop>\n<div class=\"imageWrapperStyle\" (click)=\"close()\">\n  <img\n    [src]=\"imageUrl\"\n    class=\"imgStyle\"\n    alt=\"Full Screen View\"\n    loading=\"lazy\"\n  />\n</div>\n",
                styles: [".imageWrapperStyle{position:absolute;top:0;left:0;width:100%;height:100%;padding:2%;z-index:9999;display:flex;justify-content:center;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) right top no-repeat #fff;cursor:pointer}.imgStyle{-o-object-fit:contain;object-fit:contain}"]
            }] }
];
/** @nocollapse */
CometChatImageViewerComponent.ctorParameters = () => [];
CometChatImageViewerComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    open: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatImageViewerComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatImageViewerComponent.prototype.open;
    /** @type {?} */
    CometChatImageViewerComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatImageViewerComponent.prototype.imageUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtaW1hZ2Utdmlld2VyL2NvbWV0Y2hhdC1pbWFnZS12aWV3ZXIvY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2xELE1BQU0sT0FBTyw2QkFBNkI7SUFNeEM7UUFIVSxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR25ELENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQUtELE1BQU07UUFDSixJQUFJOztnQkFDRSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ3pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsS0FBSztRQUNILElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyx1QkFBdUI7YUFDcEMsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBN0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyx5UUFBc0Q7O2FBRXZEOzs7Ozs2QkFFRSxLQUFLO21CQUNMLEtBQUs7OEJBQ0wsTUFBTTs7OztJQUZQLHVEQUF3Qjs7SUFDeEIsNkNBQWM7O0lBQ2Qsd0RBQWtFOztJQUVsRSxpREFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWltYWdlLXZpZXdlclwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1pbWFnZS12aWV3ZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1pbWFnZS12aWV3ZXIuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0SW1hZ2VWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscztcbiAgQElucHV0KCkgb3BlbjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaW1hZ2VVcmw6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdldFVybCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBVcmwgb2YgaW1hZ2VcbiAgICovXG4gIGdldFVybCgpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLnNyYyA9IHRoaXMubWVzc2FnZURldGFpbHMuZGF0YS51cmw7XG4gICAgICB0aGlzLmltYWdlVXJsID0gaW1nLnNyYztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYWN0aW9uIHRvIGNsb3NlIGZ1bGwgc2NyZWVuIHZpZXdcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuQ0xPU0VfRlVMTF9TQ1JFRU5fSU1BR0UsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==