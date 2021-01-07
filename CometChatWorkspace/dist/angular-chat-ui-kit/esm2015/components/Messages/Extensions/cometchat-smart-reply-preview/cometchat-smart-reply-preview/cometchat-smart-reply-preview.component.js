/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-smart-reply-preview/cometchat-smart-reply-preview/cometchat-smart-reply-preview.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";
import * as enums from "../../../../utils/enums";
export class CometchatSmartReplyPreviewComponent {
    constructor() {
        this.replyPreview = null;
        this.actionGenerated = new EventEmitter();
        this.options = [];
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["replyPreview"]) {
            if (change["replyPreview"].currentValue) {
                this.generateSmartReplyOptions(change["replyPreview"].currentValue);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.replyPreview) {
            this.generateSmartReplyOptions(this.replyPreview);
        }
    }
    /**
     * Generate the quick replies that the current user can use
     * @param {?} message
     * @return {?}
     */
    generateSmartReplyOptions(message) {
        if (message.hasOwnProperty("metadata")) {
            /** @type {?} */
            const metadata = message.metadata;
            if (metadata.hasOwnProperty("@injected")) {
                /** @type {?} */
                const injectedObject = metadata["@injected"];
                if (injectedObject.hasOwnProperty("extensions")) {
                    /** @type {?} */
                    const extensionsObject = injectedObject["extensions"];
                    if (extensionsObject.hasOwnProperty("smart-reply")) {
                        /** @type {?} */
                        const smartReplyObject = extensionsObject["smart-reply"];
                        /** @type {?} */
                        const options = [
                            smartReplyObject["reply_positive"],
                            smartReplyObject["reply_neutral"],
                            smartReplyObject["reply_negative"],
                        ];
                        this.options = options;
                    }
                }
            }
        }
    }
    /**
     * Sends the selected option as reply
     * @param {?} message
     * @return {?}
     */
    sendReplyMessage(message) {
        this.actionGenerated.emit({
            type: enums.SEND_SMART_REPLY,
            payLoad: message,
        });
    }
    /**
     * Closes the reply preview window
     * @return {?}
     */
    closeReplyPreview() {
        this.replyPreview = null;
    }
}
CometchatSmartReplyPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-smart-reply-preview",
                template: "<div class=\"previewWrapperStyle\" *ngIf=\"replyPreview\" [@slideInOut]>\n  <div class=\"previewHeadingStyle\" (click)=\"closeReplyPreview()\">\n    <div class=\"previewCloseStyle\"></div>\n  </div>\n  <div class=\"previewOptionsWrapperStyle\">\n    <!-- SMART REPLY OPTION BELOW -->\n    <div *ngFor=\"let option of options\">\n      <div class=\"previewOptionStyle\" (click)=\"sendReplyMessage(option)\">\n        {{ option }}\n      </div>\n    </div>\n    <!-- SMART REPLY OPTION ABOVE -->\n  </div>\n</div>\n",
                animations: [
                    trigger("slideInOut", [
                        transition(":enter", [
                            style({ transform: "translateY(100%)" }),
                            animate("400ms ease-in", style({ transform: "translateY(0%)" })),
                        ]),
                    ]),
                ],
                styles: [".previewWrapperStyle{padding:7px;background-color:#fff;border:1px solid #eaeaea;font-size:13px;display:flex;flex-direction:row-reverse;justify-content:space-between;position:relative}.previewHeadingStyle{width:24px;height:24px;border-radius:50%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer}.previewOptionsWrapperStyle{display:flex;align-items:center;justify-content:space-around;width:100%}.previewOptionStyle{padding:10px;background-color:rgba(20,20,20,.04);border:1px solid #eaeaea;border-radius:10px;cursor:pointer}"]
            }] }
];
/** @nocollapse */
CometchatSmartReplyPreviewComponent.ctorParameters = () => [];
CometchatSmartReplyPreviewComponent.propDecorators = {
    replyPreview: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatSmartReplyPreviewComponent.prototype.replyPreview;
    /** @type {?} */
    CometchatSmartReplyPreviewComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSmartReplyPreviewComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNtYXJ0LXJlcGx5LXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBY2pELE1BQU0sT0FBTyxtQ0FBbUM7SUFPOUM7UUFOUyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVuQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFFRSxDQUFDOzs7OztJQUVoQixXQUFXLENBQUMsTUFBcUI7UUFDL0IsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxFQUFFO2dCQUN2QyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JFO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQseUJBQXlCLENBQUMsT0FBTztRQUMvQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7O2tCQUNoQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVE7WUFDakMsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFOztzQkFDbEMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQzVDLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTs7MEJBQ3pDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7b0JBQ3JELElBQUksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzs4QkFDNUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDOzs4QkFFbEQsT0FBTyxHQUFHOzRCQUNkLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDOzRCQUNsQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7NEJBQ2pDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO3lCQUNuQzt3QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztxQkFDeEI7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsT0FBTztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtZQUM1QixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQU1ELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7OztZQWhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsNmdCQUE2RDtnQkFFN0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ25CLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDOzRCQUN4QyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7eUJBQ2pFLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDs7YUFDRjs7Ozs7MkJBRUUsS0FBSzs4QkFFTCxNQUFNOzs7O0lBRlAsMkRBQTZCOztJQUU3Qiw4REFBa0U7O0lBRWxFLHNEQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNtYXJ0LXJlcGx5LXByZXZpZXdcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNtYXJ0LXJlcGx5LXByZXZpZXcuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJzbGlkZUluT3V0XCIsIFtcbiAgICAgIHRyYW5zaXRpb24oXCI6ZW50ZXJcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKDEwMCUpXCIgfSksXG4gICAgICAgIGFuaW1hdGUoXCI0MDBtcyBlYXNlLWluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoMCUpXCIgfSkpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNtYXJ0UmVwbHlQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcmVwbHlQcmV2aWV3ID0gbnVsbDtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBvcHRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJyZXBseVByZXZpZXdcIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJyZXBseVByZXZpZXdcIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVTbWFydFJlcGx5T3B0aW9ucyhjaGFuZ2VbXCJyZXBseVByZXZpZXdcIl0uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5yZXBseVByZXZpZXcpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVTbWFydFJlcGx5T3B0aW9ucyh0aGlzLnJlcGx5UHJldmlldyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBxdWljayByZXBsaWVzIHRoYXQgdGhlIGN1cnJlbnQgdXNlciBjYW4gdXNlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgZ2VuZXJhdGVTbWFydFJlcGx5T3B0aW9ucyhtZXNzYWdlKSB7XG4gICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBtZXNzYWdlLm1ldGFkYXRhO1xuICAgICAgaWYgKG1ldGFkYXRhLmhhc093blByb3BlcnR5KFwiQGluamVjdGVkXCIpKSB7XG4gICAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgICAgIGlmIChpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICAgIGlmIChleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwic21hcnQtcmVwbHlcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHNtYXJ0UmVwbHlPYmplY3QgPSBleHRlbnNpb25zT2JqZWN0W1wic21hcnQtcmVwbHlcIl07XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgIHNtYXJ0UmVwbHlPYmplY3RbXCJyZXBseV9wb3NpdGl2ZVwiXSxcbiAgICAgICAgICAgICAgc21hcnRSZXBseU9iamVjdFtcInJlcGx5X25ldXRyYWxcIl0sXG4gICAgICAgICAgICAgIHNtYXJ0UmVwbHlPYmplY3RbXCJyZXBseV9uZWdhdGl2ZVwiXSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIHRoZSBzZWxlY3RlZCBvcHRpb24gYXMgcmVwbHlcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZW5kUmVwbHlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlNFTkRfU01BUlRfUkVQTFksXG4gICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcmVwbHkgcHJldmlldyB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVJlcGx5UHJldmlldygpIHtcbiAgICB0aGlzLnJlcGx5UHJldmlldyA9IG51bGw7XG4gIH1cbn1cbiJdfQ==