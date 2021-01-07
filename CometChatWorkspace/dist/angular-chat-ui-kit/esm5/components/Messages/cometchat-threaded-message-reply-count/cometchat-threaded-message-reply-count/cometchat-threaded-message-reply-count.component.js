/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatThreadedMessageReplyCountComponent = /** @class */ (function () {
    function CometchatThreadedMessageReplyCountComponent() {
        this.MessageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.replies = null;
    }
    /**
     * @return {?}
     */
    CometchatThreadedMessageReplyCountComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var replyCount = this.getReplyCount();
        if (replyCount === 1) {
            this.reply = replyCount + " " + STRING_MESSAGES.REPLY;
        }
        else if (replyCount > 1) {
            this.reply = replyCount + " " + STRING_MESSAGES.REPLIES;
        }
    };
    /**
     * get reply count for thread
     */
    /**
     * get reply count for thread
     * @return {?}
     */
    CometchatThreadedMessageReplyCountComponent.prototype.getReplyCount = /**
     * get reply count for thread
     * @return {?}
     */
    function () {
        if (this.MessageDetails.hasOwnProperty("replyCount") === false) {
            this.replies = null;
        }
        this.replies = this.MessageDetails.replyCount;
        return this.replies;
    };
    /**
     * Open thread when clicked
     */
    /**
     * Open thread when clicked
     * @return {?}
     */
    CometchatThreadedMessageReplyCountComponent.prototype.openThreadMessage = /**
     * Open thread when clicked
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.VIEW_MESSAGE_THREAD,
            payLoad: this.MessageDetails,
        });
    };
    CometchatThreadedMessageReplyCountComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-threaded-message-reply-count",
                    template: "<span class=\"replyCountStyle\" (click)=\"openThreadMessage()\">\n  {{ reply }}\n</span>\n",
                    styles: [".replyCountStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:lowercase;padding:0 10px;cursor:pointer;color:#39f}.replyCountStyle:hover{text-decoration:underline}"]
                }] }
    ];
    /** @nocollapse */
    CometchatThreadedMessageReplyCountComponent.ctorParameters = function () { return []; };
    CometchatThreadedMessageReplyCountComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatThreadedMessageReplyCountComponent;
}());
export { CometchatThreadedMessageReplyCountComponent };
if (false) {
    /** @type {?} */
    CometchatThreadedMessageReplyCountComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatThreadedMessageReplyCountComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatThreadedMessageReplyCountComponent.prototype.replies;
    /** @type {?} */
    CometchatThreadedMessageReplyCountComponent.prototype.reply;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQVdFO1FBTFMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRUEsQ0FBQzs7OztJQUVoQiw4REFBUTs7O0lBQVI7O1lBQ00sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDckMsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO1NBQ3ZEO2FBQU0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUNEOztPQUVHOzs7OztJQUNILG1FQUFhOzs7O0lBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7T0FFRzs7Ozs7SUFDSCx1RUFBaUI7Ozs7SUFBakI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLG1CQUFtQjtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBeENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCxzR0FBc0U7O2lCQUV2RTs7Ozs7aUNBRUUsS0FBSztrQ0FDTCxNQUFNOztJQWtDVCxrREFBQztDQUFBLEFBekNELElBeUNDO1NBcENZLDJDQUEyQzs7O0lBQ3RELHFFQUErQjs7SUFDL0Isc0VBQWtFOztJQUVsRSw4REFBZTs7SUFDZiw0REFBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0VGhyZWFkZWRNZXNzYWdlUmVwbHlDb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcmVwbGllcyA9IG51bGw7XG4gIHJlcGx5OiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgcmVwbHlDb3VudCA9IHRoaXMuZ2V0UmVwbHlDb3VudCgpO1xuICAgIGlmIChyZXBseUNvdW50ID09PSAxKSB7XG4gICAgICB0aGlzLnJlcGx5ID0gcmVwbHlDb3VudCArIFwiIFwiICsgU1RSSU5HX01FU1NBR0VTLlJFUExZO1xuICAgIH0gZWxzZSBpZiAocmVwbHlDb3VudCA+IDEpIHtcbiAgICAgIHRoaXMucmVwbHkgPSByZXBseUNvdW50ICsgXCIgXCIgKyBTVFJJTkdfTUVTU0FHRVMuUkVQTElFUztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIGdldCByZXBseSBjb3VudCBmb3IgdGhyZWFkXG4gICAqL1xuICBnZXRSZXBseUNvdW50KCkge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwicmVwbHlDb3VudFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVwbGllcyA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5yZXBsaWVzID0gdGhpcy5NZXNzYWdlRGV0YWlscy5yZXBseUNvdW50O1xuICAgIHJldHVybiB0aGlzLnJlcGxpZXM7XG4gIH1cbiAgLyoqXG4gICAqIE9wZW4gdGhyZWFkIHdoZW4gY2xpY2tlZFxuICAgKi9cbiAgb3BlblRocmVhZE1lc3NhZ2UoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFELFxuICAgICAgcGF5TG9hZDogdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxufVxuIl19