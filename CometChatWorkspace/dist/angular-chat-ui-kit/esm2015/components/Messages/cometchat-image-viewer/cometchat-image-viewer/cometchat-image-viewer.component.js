/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-image-viewer/cometchat-image-viewer/cometchat-image-viewer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
export class CometchatImageViewerComponent {
    constructor() {
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getUrl();
    }
    /**
     * @return {?}
     */
    getUrl() {
        /** @type {?} */
        let img = new Image();
        img.src = this.MessageDetails.data.url;
        this.imageUrl = img.src;
    }
    /**
     * @return {?}
     */
    close() {
        this.actionGenerated.emit({
            type: enums.CLOSE_FULL_SCREEN_IMAGE,
        });
    }
}
CometchatImageViewerComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-image-viewer",
                template: "<!--Backdrop-->\n<cometchat-backdrop [show]=\"open\"></cometchat-backdrop>\n<div class=\"imageWrapperStyle\" (click)=\"close()\">\n  <img\n    [src]=\"imageUrl\"\n    class=\"imgStyle\"\n    alt=\"Full Screen View\"\n    loading=\"lazy\"\n  />\n</div>\n",
                styles: [".imageWrapperStyle{position:absolute;top:0;left:0;width:100%;height:100%;padding:2%;z-index:9999;display:flex;justify-content:center;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) right top no-repeat #fff;cursor:pointer}.imgStyle{-o-object-fit:contain;object-fit:contain}"]
            }] }
];
/** @nocollapse */
CometchatImageViewerComponent.ctorParameters = () => [];
CometchatImageViewerComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    open: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtaW1hZ2Utdmlld2VyL2NvbWV0Y2hhdC1pbWFnZS12aWV3ZXIvY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFPOUMsTUFBTSxPQUFPLDZCQUE2QjtJQU14QztRQUhVLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFDRCxNQUFNOztZQUNBLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLHVCQUF1QjtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUExQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHlRQUFzRDs7YUFFdkQ7Ozs7OzZCQUVFLEtBQUs7bUJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBRlAsdURBQXdCOztJQUN4Qiw2Q0FBYzs7SUFDZCx3REFBa0U7O0lBRWxFLGlEQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtaW1hZ2Utdmlld2VyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWltYWdlLXZpZXdlci5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRJbWFnZVZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzO1xuICBASW5wdXQoKSBvcGVuO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbWFnZVVybDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRVcmwoKTtcbiAgfVxuICBnZXRVcmwoKSB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWcuc3JjO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5DTE9TRV9GVUxMX1NDUkVFTl9JTUFHRSxcbiAgICB9KTtcbiAgfVxufVxuIl19