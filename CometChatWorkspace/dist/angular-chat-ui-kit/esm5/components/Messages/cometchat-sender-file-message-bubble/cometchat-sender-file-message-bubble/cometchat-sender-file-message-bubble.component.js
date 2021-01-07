/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
var CometchatSenderFileMessageBubbleComponent = /** @class */ (function () {
    function CometchatSenderFileMessageBubbleComponent() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.checkReaction = false;
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CometchatSenderFileMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
        this.url = this.MessageDetails.data.attachments[0].url;
        this.name = this.MessageDetails.data.attachments[0].name;
    };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatSenderFileMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatSenderFileMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-sender-file-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageFileWrapper\">\n      <a [href]=\"url\" target=\"_blank\"\n        >{{ name }}\n        <span id=\"file\">&nbsp;</span>\n      </a>\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:100%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageFileWrapper{display:inline-block;border-radius:12px;background-color:#39f;color:#fff;padding:8px 12px;align-self:flex-end;max-width:100%}.messageFileWrapper>a{background:0 0;text-decoration:none;color:#fff;max-width:100%;font-size:14px}.messageFileWrapper:active,.messageFileWrapper:hover,.messageFileWrapper:visited{color:#fff;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAAB2UlEQVRIDe2XzStEURjGZ3xvNMXCysZGsdJEFrKjlFIaQij/AnuhWfsbfGTyNVJKWViblKViNdkq0mRjPv2emUOjOYe5M7PSPPXrPc557/vMea/uudfnQ7lcrhv24BGS4FKWhTe4hlFdW5ZIlkECvCrFBUvlmDSRFIZ2eIcNuIEPsGmVyQV4gU7YwSjr9/sPGLtF0oPZwpo7q7BC3rbJXSfumnGaOPfbtQ0s9pgE7aBcZUhcgQg0wj5GM0SrZNJsVlwtsl5Ii7IsLMMRqO0RjKaJJZJJxcJIO1qEKMjoEKMp4g9VZaJKGKUJ83AO6soxRpPEb1VtokoYpQizcAEtcIrRBDGvmpiokjEKMbyEVjjDaJzoq9RE/1ElwijJpG7+FbRBFKM+3SwvejXJIS5+Yqw22XTC5CB0QFjPrS8FbdnFcyQGQc8vL3r2tBPacUf1MYz1aOkq/gGWcYC5EQh42omlkHOKHzNgtpup9MY7i9sW6ia2rjjn6u1ytsa2UG+XrSvOuf/VLh00kk6zWkqHlpRUu+L5YeGQMcOahCFTJa7zJAa9sMmjWa84t+DpHYz8Yqkjw7BlJmN+Cnfzxz3ofbjWSlCwP19URlDOpwNpf0qfHvoEUT1twPcJ93ifHl8MOSIAAAAASUVORK5CYII=) 0 center/18px no-repeat;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-end;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSenderFileMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatSenderFileMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatSenderFileMessageBubbleComponent;
}());
export { CometchatSenderFileMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEU7SUFlRTtRQVRTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRS9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHbkQsQ0FBQzs7OztJQUVoQiw0REFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixXQUFXLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQztJQUNEOzs7T0FHRzs7Ozs7O0lBQ0gsaUVBQWE7Ozs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQS9CRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsbW1DQUFvRTs7aUJBRXJFOzs7OztpQ0FFRSxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUdMLE1BQU07O0lBb0JULGdEQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7U0EzQlkseUNBQXlDOzs7SUFDcEQsbUVBQStCOztJQUMvQixnRUFBNEI7O0lBQzVCLG1FQUErQjs7SUFDL0IsaUVBQXNCOztJQUN0QixrRUFBK0I7O0lBRS9CLG9FQUFrRTs7SUFDbEUsd0RBQVk7O0lBQ1oseURBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U2VuZGVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgdXJsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFwicmVhY3Rpb25zXCJcbiAgICApO1xuICAgIHRoaXMudXJsID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmF0dGFjaG1lbnRzWzBdLnVybDtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0ubmFtZTtcbiAgfVxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=