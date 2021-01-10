/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatSenderFileMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.checkReaction = false;
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        this.url = this.MessageDetails.data.attachments[0].url;
        this.name = this.MessageDetails.data.attachments[0].name;
    }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        this.actionGenerated.emit(action);
    }
}
CometchatSenderFileMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-file-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageFileWrapper\">\n      <a [href]=\"url\" target=\"_blank\"\n        >{{ name }}\n        <span id=\"file\">&nbsp;</span>\n      </a>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageFileWrapper{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;max-width:100%}.messageFileWrapper>a{background:0 0;text-decoration:none;color:#fff;max-width:100%;font-size:14px}.messageFileWrapper:active,.messageFileWrapper:hover,.messageFileWrapper:visited{color:#fff;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAAB2UlEQVRIDe2XzStEURjGZ3xvNMXCysZGsdJEFrKjlFIaQij/AnuhWfsbfGTyNVJKWViblKViNdkq0mRjPv2emUOjOYe5M7PSPPXrPc557/vMea/uudfnQ7lcrhv24BGS4FKWhTe4hlFdW5ZIlkECvCrFBUvlmDSRFIZ2eIcNuIEPsGmVyQV4gU7YwSjr9/sPGLtF0oPZwpo7q7BC3rbJXSfumnGaOPfbtQ0s9pgE7aBcZUhcgQg0wj5GM0SrZNJsVlwtsl5Ii7IsLMMRqO0RjKaJJZJJxcJIO1qEKMjoEKMp4g9VZaJKGKUJ83AO6soxRpPEb1VtokoYpQizcAEtcIrRBDGvmpiokjEKMbyEVjjDaJzoq9RE/1ElwijJpG7+FbRBFKM+3SwvejXJIS5+Yqw22XTC5CB0QFjPrS8FbdnFcyQGQc8vL3r2tBPacUf1MYz1aOkq/gGWcYC5EQh42omlkHOKHzNgtpup9MY7i9sW6ia2rjjn6u1ytsa2UG+XrSvOuf/VLh00kk6zWkqHlpRUu+L5YeGQMcOahCFTJa7zJAa9sMmjWa84t+DpHYz8Yqkjw7BlJmN+Cnfzxz3ofbjWSlCwP19URlDOpwNpf0qfHvoEUT1twPcJ93ifHl8MOSIAAAAASUVORK5CYII=) 0 center/18px no-repeat;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
            }] }
];
/** @nocollapse */
CometchatSenderFileMessageBubbleComponent.ctorParameters = () => [];
CometchatSenderFileMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.url;
    /** @type {?} */
    CometchatSenderFileMessageBubbleComponent.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLE1BQU0sT0FBTyx5Q0FBeUM7SUFVcEQ7UUFUUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUUvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR25ELENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUtELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsbW1DQUFvRTs7YUFFckU7Ozs7OzZCQUVFLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBR0wsTUFBTTs7OztJQU5QLG1FQUErQjs7SUFDL0IsZ0VBQTRCOztJQUM1QixtRUFBK0I7O0lBQy9CLGlFQUFzQjs7SUFDdEIsa0VBQStCOztJQUUvQixvRUFBa0U7O0lBQ2xFLHdEQUFZOztJQUNaLHlEQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTZW5kZXJGaWxlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB1cmw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG4gICAgdGhpcy51cmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0udXJsO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5hdHRhY2htZW50c1swXS5uYW1lO1xuICB9XG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==