/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtc2VuZGVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPdEUsTUFBTSxPQUFPLHlDQUF5QztJQVVwRDtRQVRTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRS9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsV0FBVyxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUtELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsbW1DQUFvRTs7YUFFckU7Ozs7OzZCQUVFLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBR0wsTUFBTTs7OztJQU5QLG1FQUErQjs7SUFDL0IsZ0VBQTRCOztJQUM1QixtRUFBK0I7O0lBQy9CLGlFQUFzQjs7SUFDdEIsa0VBQStCOztJQUUvQixvRUFBa0U7O0lBQ2xFLHdEQUFZOztJQUNaLHlEQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFNlbmRlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHVybDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBcInJlYWN0aW9uc1wiXG4gICAgKTtcbiAgICB0aGlzLnVybCA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5hdHRhY2htZW50c1swXS51cmw7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmF0dGFjaG1lbnRzWzBdLm5hbWU7XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19