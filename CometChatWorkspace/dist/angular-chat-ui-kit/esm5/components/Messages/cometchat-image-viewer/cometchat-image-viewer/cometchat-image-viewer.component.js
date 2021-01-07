/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-image-viewer/cometchat-image-viewer/cometchat-image-viewer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
var CometchatImageViewerComponent = /** @class */ (function () {
    function CometchatImageViewerComponent() {
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CometchatImageViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getUrl();
    };
    /**
     * @return {?}
     */
    CometchatImageViewerComponent.prototype.getUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = new Image();
        img.src = this.MessageDetails.data.url;
        this.imageUrl = img.src;
    };
    /**
     * @return {?}
     */
    CometchatImageViewerComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_FULL_SCREEN_IMAGE,
        });
    };
    CometchatImageViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-image-viewer",
                    template: "<!--Backdrop-->\n<cometchat-backdrop [show]=\"open\"></cometchat-backdrop>\n<div class=\"imageWrapperStyle\" (click)=\"close()\">\n  <img\n    [src]=\"imageUrl\"\n    class=\"imgStyle\"\n    alt=\"Full Screen View\"\n    loading=\"lazy\"\n  />\n</div>\n",
                    styles: [".imageWrapperStyle{position:absolute;top:0;left:0;width:100%;height:100%;padding:2%;z-index:9999;display:flex;justify-content:center;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) right top no-repeat #fff;cursor:pointer}.imgStyle{-o-object-fit:contain;object-fit:contain}"]
                }] }
    ];
    /** @nocollapse */
    CometchatImageViewerComponent.ctorParameters = function () { return []; };
    CometchatImageViewerComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        open: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatImageViewerComponent;
}());
export { CometchatImageViewerComponent };
if (false) {
    /** @type {?} */
    CometchatImageViewerComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatImageViewerComponent.prototype.open;
    /** @type {?} */
    CometchatImageViewerComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatImageViewerComponent.prototype.imageUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtaW1hZ2Utdmlld2VyL2NvbWV0Y2hhdC1pbWFnZS12aWV3ZXIvY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFFOUM7SUFXRTtRQUhVLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHbkQsQ0FBQzs7OztJQUVoQixnREFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7OztJQUNELDhDQUFNOzs7SUFBTjs7WUFDTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCw2Q0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHVCQUF1QjtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLHlRQUFzRDs7aUJBRXZEOzs7OztpQ0FFRSxLQUFLO3VCQUNMLEtBQUs7a0NBQ0wsTUFBTTs7SUFtQlQsb0NBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXRCWSw2QkFBNkI7OztJQUN4Qyx1REFBd0I7O0lBQ3hCLDZDQUFjOztJQUNkLHdEQUFrRTs7SUFFbEUsaURBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1pbWFnZS12aWV3ZXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtaW1hZ2Utdmlld2VyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtaW1hZ2Utdmlld2VyLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEltYWdlVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHM7XG4gIEBJbnB1dCgpIG9wZW47XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFVybCgpO1xuICB9XG4gIGdldFVybCgpIHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS51cmw7XG4gICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkNMT1NFX0ZVTExfU0NSRUVOX0lNQUdFLFxuICAgIH0pO1xuICB9XG59XG4iXX0=