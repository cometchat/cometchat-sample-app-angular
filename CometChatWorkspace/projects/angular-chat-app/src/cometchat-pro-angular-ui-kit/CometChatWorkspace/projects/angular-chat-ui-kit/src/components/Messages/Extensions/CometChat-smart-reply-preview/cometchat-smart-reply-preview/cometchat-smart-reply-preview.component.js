/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-smart-reply-preview/cometchat-smart-reply-preview/cometchat-smart-reply-preview.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";
import * as enums from "../../../../../utils/enums";
import { logger } from "../../../../../utils/common";
export class CometChatSmartReplyPreviewComponent {
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
        try {
            if (change[enums.REPLY_PREVIEW]) {
                if (change[enums.REPLY_PREVIEW].currentValue) {
                    this.generateSmartReplyOptions(change[enums.REPLY_PREVIEW].currentValue);
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            if (this.replyPreview) {
                this.generateSmartReplyOptions(this.replyPreview);
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Generate the quick replies that the current user can use
     * @param {?} message
     * @return {?}
     */
    generateSmartReplyOptions(message) {
        try {
            if (message.hasOwnProperty(enums.METADATA)) {
                /** @type {?} */
                const metadata = message[enums.METADATA];
                if (metadata.hasOwnProperty(enums.INJECTED)) {
                    /** @type {?} */
                    const injectedObject = metadata[enums.INJECTED];
                    if (injectedObject.hasOwnProperty(enums.EXTENSIONS)) {
                        /** @type {?} */
                        const extensionsObject = injectedObject[enums.EXTENSIONS];
                        if (extensionsObject.hasOwnProperty(enums.SMART_REPLY)) {
                            /** @type {?} */
                            const smartReplyObject = extensionsObject[enums.SMART_REPLY];
                            /** @type {?} */
                            const options = [
                                smartReplyObject[enums.REPLY_POSITIVE],
                                smartReplyObject[enums.REPLY_NEUTRAL],
                                smartReplyObject[enums.REPLY_NEGATIVE],
                            ];
                            this.options = options;
                        }
                    }
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sends the selected option as reply
     * @param {?} message
     * @return {?}
     */
    sendReplyMessage(message) {
        try {
            this.actionGenerated.emit({
                type: enums.SEND_SMART_REPLY,
                payLoad: message,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes the reply preview window
     * @return {?}
     */
    closeReplyPreview() {
        try {
            this.replyPreview = null;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatSmartReplyPreviewComponent.decorators = [
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
CometChatSmartReplyPreviewComponent.ctorParameters = () => [];
CometChatSmartReplyPreviewComponent.propDecorators = {
    replyPreview: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatSmartReplyPreviewComponent.prototype.replyPreview;
    /** @type {?} */
    CometChatSmartReplyPreviewComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSmartReplyPreviewComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNtYXJ0LXJlcGx5LXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvRXh0ZW5zaW9ucy9Db21ldENoYXQtc21hcnQtcmVwbHktcHJldmlldy9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEtBQUssS0FBSyxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQWNyRCxNQUFNLE9BQU8sbUNBQW1DO0lBTzlDO1FBTlMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFbkIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBRUUsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUk7WUFDRixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLEVBQUU7b0JBQzVDLElBQUksQ0FBQyx5QkFBeUIsQ0FDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQ3pDLENBQUM7aUJBQ0g7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuRDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQUtELHlCQUF5QixDQUFDLE9BQU87UUFDL0IsSUFBSTtZQUNGLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7O3NCQUNwQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3hDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7OzBCQUNyQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQy9DLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7OzhCQUM3QyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzt3QkFDekQsSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFOztrQ0FDaEQsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7a0NBRXRELE9BQU8sR0FBRztnQ0FDZCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dDQUN0QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO2dDQUNyQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDOzZCQUN2Qzs0QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt5QkFDeEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGdCQUFnQixDQUFDLE9BQU87UUFDdEIsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtnQkFDNUIsT0FBTyxFQUFFLE9BQU87YUFDakIsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxpQkFBaUI7UUFDZixJQUFJO1lBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBckdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6Qyw2Z0JBQTZEO2dCQUU3RCxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDcEIsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLENBQUM7NEJBQ3hDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQzt5QkFDakUsQ0FBQztxQkFDSCxDQUFDO2lCQUNIOzthQUNGOzs7OzsyQkFFRSxLQUFLOzhCQUVMLE1BQU07Ozs7SUFGUCwyREFBNkI7O0lBRTdCLDhEQUFrRTs7SUFFbEUsc0RBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlld1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zbWFydC1yZXBseS1wcmV2aWV3LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc21hcnQtcmVwbHktcHJldmlldy5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcInNsaWRlSW5PdXRcIiwgW1xuICAgICAgdHJhbnNpdGlvbihcIjplbnRlclwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoMTAwJSlcIiB9KSxcbiAgICAgICAgYW5pbWF0ZShcIjQwMG1zIGVhc2UtaW5cIiwgc3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgwJSlcIiB9KSksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0U21hcnRSZXBseVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByZXBseVByZXZpZXcgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG9wdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuUkVQTFlfUFJFVklFV10pIHtcbiAgICAgICAgaWYgKGNoYW5nZVtlbnVtcy5SRVBMWV9QUkVWSUVXXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlU21hcnRSZXBseU9wdGlvbnMoXG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuUkVQTFlfUFJFVklFV10uY3VycmVudFZhbHVlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5yZXBseVByZXZpZXcpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVNtYXJ0UmVwbHlPcHRpb25zKHRoaXMucmVwbHlQcmV2aWV3KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBxdWljayByZXBsaWVzIHRoYXQgdGhlIGN1cnJlbnQgdXNlciBjYW4gdXNlXG4gICAqIEBwYXJhbSBBbnkgbWVzc2FnZVxuICAgKi9cbiAgZ2VuZXJhdGVTbWFydFJlcGx5T3B0aW9ucyhtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChtZXNzYWdlLmhhc093blByb3BlcnR5KGVudW1zLk1FVEFEQVRBKSkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG1lc3NhZ2VbZW51bXMuTUVUQURBVEFdO1xuICAgICAgICBpZiAobWV0YWRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuSU5KRUNURUQpKSB7XG4gICAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtlbnVtcy5JTkpFQ1RFRF07XG4gICAgICAgICAgaWYgKGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLkVYVEVOU0lPTlMpKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbZW51bXMuRVhURU5TSU9OU107XG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5TTUFSVF9SRVBMWSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc21hcnRSZXBseU9iamVjdCA9IGV4dGVuc2lvbnNPYmplY3RbZW51bXMuU01BUlRfUkVQTFldO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgc21hcnRSZXBseU9iamVjdFtlbnVtcy5SRVBMWV9QT1NJVElWRV0sXG4gICAgICAgICAgICAgICAgc21hcnRSZXBseU9iamVjdFtlbnVtcy5SRVBMWV9ORVVUUkFMXSxcbiAgICAgICAgICAgICAgICBzbWFydFJlcGx5T2JqZWN0W2VudW1zLlJFUExZX05FR0FUSVZFXSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGFzIHJlcGx5XG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2VuZFJlcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5TRU5EX1NNQVJUX1JFUExZLFxuICAgICAgICBwYXlMb2FkOiBtZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcmVwbHkgcHJldmlldyB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZVJlcGx5UHJldmlldygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXBseVByZXZpZXcgPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19