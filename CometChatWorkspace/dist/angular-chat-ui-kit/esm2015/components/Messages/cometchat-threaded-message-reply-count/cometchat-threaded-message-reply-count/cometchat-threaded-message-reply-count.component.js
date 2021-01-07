/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatThreadedMessageReplyCountComponent {
    constructor() {
        this.MessageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.replies = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let replyCount = this.getReplyCount();
        if (replyCount === 1) {
            this.reply = replyCount + " " + STRING_MESSAGES.REPLY;
        }
        else if (replyCount > 1) {
            this.reply = replyCount + " " + STRING_MESSAGES.REPLIES;
        }
    }
    /**
     * get reply count for thread
     * @return {?}
     */
    getReplyCount() {
        if (this.MessageDetails.hasOwnProperty("replyCount") === false) {
            this.replies = null;
        }
        this.replies = this.MessageDetails.replyCount;
        return this.replies;
    }
    /**
     * Open thread when clicked
     * @return {?}
     */
    openThreadMessage() {
        this.actionGenerated.emit({
            type: enums.VIEW_MESSAGE_THREAD,
            payLoad: this.MessageDetails,
        });
    }
}
CometchatThreadedMessageReplyCountComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-threaded-message-reply-count",
                template: "<span class=\"replyCountStyle\" (click)=\"openThreadMessage()\">\n  {{ reply }}\n</span>\n",
                styles: [".replyCountStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:lowercase;padding:0 10px;cursor:pointer;color:#39f}.replyCountStyle:hover{text-decoration:underline}"]
            }] }
];
/** @nocollapse */
CometchatThreadedMessageReplyCountComponent.ctorParameters = () => [];
CometchatThreadedMessageReplyCountComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sMkNBQTJDO0lBTXREO1FBTFMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRUEsQ0FBQzs7OztJQUVoQixRQUFROztZQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ3JDLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztTQUN2RDthQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUN6RDtJQUNILENBQUM7Ozs7O0lBSUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFJRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLG1CQUFtQjtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCxzR0FBc0U7O2FBRXZFOzs7Ozs2QkFFRSxLQUFLOzhCQUNMLE1BQU07Ozs7SUFEUCxxRUFBK0I7O0lBQy9CLHNFQUFrRTs7SUFFbEUsOERBQWU7O0lBQ2YsNERBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50XCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFRocmVhZGVkTWVzc2FnZVJlcGx5Q291bnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHJlcGxpZXMgPSBudWxsO1xuICByZXBseTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IHJlcGx5Q291bnQgPSB0aGlzLmdldFJlcGx5Q291bnQoKTtcbiAgICBpZiAocmVwbHlDb3VudCA9PT0gMSkge1xuICAgICAgdGhpcy5yZXBseSA9IHJlcGx5Q291bnQgKyBcIiBcIiArIFNUUklOR19NRVNTQUdFUy5SRVBMWTtcbiAgICB9IGVsc2UgaWYgKHJlcGx5Q291bnQgPiAxKSB7XG4gICAgICB0aGlzLnJlcGx5ID0gcmVwbHlDb3VudCArIFwiIFwiICsgU1RSSU5HX01FU1NBR0VTLlJFUExJRVM7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBnZXQgcmVwbHkgY291bnQgZm9yIHRocmVhZFxuICAgKi9cbiAgZ2V0UmVwbHlDb3VudCgpIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcInJlcGx5Q291bnRcIikgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnJlcGxpZXMgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMucmVwbGllcyA9IHRoaXMuTWVzc2FnZURldGFpbHMucmVwbHlDb3VudDtcbiAgICByZXR1cm4gdGhpcy5yZXBsaWVzO1xuICB9XG4gIC8qKlxuICAgKiBPcGVuIHRocmVhZCB3aGVuIGNsaWNrZWRcbiAgICovXG4gIG9wZW5UaHJlYWRNZXNzYWdlKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRCxcbiAgICAgIHBheUxvYWQ6IHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==