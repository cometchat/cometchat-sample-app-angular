/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatThreadedMessageReplyCountComponent {
    constructor() {
        this.messageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.replies = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            /** @type {?} */
            let replyCount = this.getReplyCount();
            if (replyCount === 1) {
                this.reply = replyCount + " " + COMETCHAT_CONSTANTS.REPLY;
            }
            else if (replyCount > 1) {
                this.reply = replyCount + " " + COMETCHAT_CONSTANTS.REPLIES;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * get reply count for thread
     * @return {?}
     */
    getReplyCount() {
        try {
            if (this.messageDetails.hasOwnProperty(enums.REPLY_COUNT) === false) {
                this.replies = null;
            }
            this.replies = this.messageDetails.replyCount;
            return this.replies;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Open thread when clicked
     * @return {?}
     */
    openThreadMessage() {
        try {
            this.actionGenerated.emit({
                type: enums.VIEW_MESSAGE_THREAD,
                payLoad: this.messageDetails,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatThreadedMessageReplyCountComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-threaded-message-reply-count",
                template: "<span class=\"replyCountStyle\" (click)=\"openThreadMessage()\">\n  {{ reply }}\n</span>\n",
                styles: [".replyCountStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:lowercase;padding:0 10px;cursor:pointer;color:#39f}.replyCountStyle:hover{text-decoration:underline}"]
            }] }
];
/** @nocollapse */
CometChatThreadedMessageReplyCountComponent.ctorParameters = () => [];
CometChatThreadedMessageReplyCountComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatThreadedMessageReplyCountComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatThreadedMessageReplyCountComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatThreadedMessageReplyCountComponent.prototype.replies;
    /** @type {?} */
    CometChatThreadedMessageReplyCountComponent.prototype.reply;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQvY29tZXRjaGF0LXRocmVhZGVkLW1lc3NhZ2UtcmVwbHktY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sMkNBQTJDO0lBTXREO1FBTFMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRUEsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSTs7Z0JBQ0UsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckMsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO2FBQzNEO2lCQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQzthQUM3RDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsYUFBYTtRQUNYLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxpQkFBaUI7UUFDZixJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsbUJBQW1CO2dCQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBckRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCxzR0FBc0U7O2FBRXZFOzs7Ozs2QkFFRSxLQUFLOzhCQUNMLE1BQU07Ozs7SUFEUCxxRUFBK0I7O0lBQy9CLHNFQUFrRTs7SUFFbEUsOERBQWU7O0lBQ2YsNERBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC10aHJlYWRlZC1tZXNzYWdlLXJlcGx5LWNvdW50LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdGhyZWFkZWQtbWVzc2FnZS1yZXBseS1jb3VudC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRUaHJlYWRlZE1lc3NhZ2VSZXBseUNvdW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICByZXBsaWVzID0gbnVsbDtcbiAgcmVwbHk6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVwbHlDb3VudCA9IHRoaXMuZ2V0UmVwbHlDb3VudCgpO1xuICAgICAgaWYgKHJlcGx5Q291bnQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5yZXBseSA9IHJlcGx5Q291bnQgKyBcIiBcIiArIENPTUVUQ0hBVF9DT05TVEFOVFMuUkVQTFk7XG4gICAgICB9IGVsc2UgaWYgKHJlcGx5Q291bnQgPiAxKSB7XG4gICAgICAgIHRoaXMucmVwbHkgPSByZXBseUNvdW50ICsgXCIgXCIgKyBDT01FVENIQVRfQ09OU1RBTlRTLlJFUExJRVM7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGdldCByZXBseSBjb3VudCBmb3IgdGhyZWFkXG4gICAqL1xuICBnZXRSZXBseUNvdW50KCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5SRVBMWV9DT1VOVCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucmVwbGllcyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVwbGllcyA9IHRoaXMubWVzc2FnZURldGFpbHMucmVwbHlDb3VudDtcbiAgICAgIHJldHVybiB0aGlzLnJlcGxpZXM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBPcGVuIHRocmVhZCB3aGVuIGNsaWNrZWRcbiAgICovXG4gIG9wZW5UaHJlYWRNZXNzYWdlKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRCxcbiAgICAgICAgcGF5TG9hZDogdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19