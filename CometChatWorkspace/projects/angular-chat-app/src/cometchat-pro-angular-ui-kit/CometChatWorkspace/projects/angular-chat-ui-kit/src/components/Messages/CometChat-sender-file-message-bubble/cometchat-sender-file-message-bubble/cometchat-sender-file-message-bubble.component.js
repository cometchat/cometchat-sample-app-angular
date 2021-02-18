/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sender-file-message-bubble/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData, logger, } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
export class CometChatSenderFileMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.checkReaction = [];
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            this.url = this.messageDetails.data.attachments[0].url;
            this.name = this.messageDetails.data.attachments[0].name;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            this.actionGenerated.emit(action);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatSenderFileMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-file-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageFileWrapper\">\n      <a [href]=\"url\" target=\"_blank\">\n        <span id=\"file\">&nbsp;</span>\n        {{ name }}\n      </a>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageFileWrapper{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;max-width:100%}.messageFileWrapper>a{background:0 0;text-decoration:none;color:#fff;max-width:100%;font-size:14px}.messageFileWrapper:active,.messageFileWrapper:hover,.messageFileWrapper:visited{color:#fff;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAAB2UlEQVRIDe2XzStEURjGZ3xvNMXCysZGsdJEFrKjlFIaQij/AnuhWfsbfGTyNVJKWViblKViNdkq0mRjPv2emUOjOYe5M7PSPPXrPc557/vMea/uudfnQ7lcrhv24BGS4FKWhTe4hlFdW5ZIlkECvCrFBUvlmDSRFIZ2eIcNuIEPsGmVyQV4gU7YwSjr9/sPGLtF0oPZwpo7q7BC3rbJXSfumnGaOPfbtQ0s9pgE7aBcZUhcgQg0wj5GM0SrZNJsVlwtsl5Ii7IsLMMRqO0RjKaJJZJJxcJIO1qEKMjoEKMp4g9VZaJKGKUJ83AO6soxRpPEb1VtokoYpQizcAEtcIrRBDGvmpiokjEKMbyEVjjDaJzoq9RE/1ElwijJpG7+FbRBFKM+3SwvejXJIS5+Yqw22XTC5CB0QFjPrS8FbdnFcyQGQc8vL3r2tBPacUf1MYz1aOkq/gGWcYC5EQh42omlkHOKHzNgtpup9MY7i9sW6ia2rjjn6u1ytsa2UG+XrSvOuf/VLh00kk6zWkqHlpRUu+L5YeGQMcOahCFTJa7zJAa9sMmjWa84t+DpHYz8Yqkjw7BlJmN+Cnfzxz3ofbjWSlCwP19URlDOpwNpf0qfHvoEUT1twPcJ93ifHl8MOSIAAAAASUVORK5CYII=) 0 center/18px no-repeat;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
            }] }
];
/** @nocollapse */
CometChatSenderFileMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderFileMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.url;
    /** @type {?} */
    CometChatSenderFileMessageBubbleComponent.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUNMLDZCQUE2QixFQUM3QixNQUFNLEdBQ1AsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBT2pELE1BQU0sT0FBTyx5Q0FBeUM7SUFVcEQ7UUFUUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUUvQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVULG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLEtBQUssQ0FBQyxTQUFTLENBQ2hCLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQzFEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELG1tQ0FBb0U7O2FBRXJFOzs7Ozs2QkFFRSxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUdMLE1BQU07Ozs7SUFOUCxtRUFBK0I7O0lBQy9CLGdFQUE0Qjs7SUFDNUIsbUVBQStCOztJQUMvQixpRUFBc0I7O0lBQ3RCLGtFQUFtQjs7SUFFbkIsb0VBQWtFOztJQUNsRSx3REFBWTs7SUFDWix5REFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEsXG4gIGxvZ2dlcixcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRTZW5kZXJGaWxlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgY2hlY2tSZWFjdGlvbiA9IFtdO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB1cmw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG4gICAgICB0aGlzLnVybCA9IHRoaXMubWVzc2FnZURldGFpbHMuZGF0YS5hdHRhY2htZW50c1swXS51cmw7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0ubmFtZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==