/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatReceiverVideoMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        //Sets the User Avatar if group
        this.avatar = null;
        //Sets Username of Avatar
        this.name = null;
        this.checkReaction = false;
        //if group then only show avatar
        this.avatarIfGroup = false;
        this.message = Object.assign({}, this.MessageDetails, { messageFrom: "receiver" });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            if (!this.MessageDetails.sender.avatar) {
                /** @type {?} */
                const uid = this.MessageDetails.sender.getUid();
                /** @type {?} */
                const char = this.MessageDetails.sender.getName().charAt(0);
            }
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.getUrl();
    }
    /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    getUrl() {
        this.videoUrl = this.MessageDetails.data.url;
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
CometchatReceiverVideoMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-video-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <!--Avatar Ends-->\n    <div class=\"messageDetailStyle\">\n      <!--Name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <!--Name End-->\n      <div class=\"messageVideoContainer\">\n        <div class=\"messageVideoWrapperStyle\">\n          <video controls>\n            <source [src]=\"videoUrl\" />\n          </video>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageVideoContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageVideoWrapperStyle{display:inline-block;align-self:flex-start}.messageVideoWrapperStyle>video{max-width:250px;border-radius:12px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.avatarStyle{border-radius:50%;border-width:1px}"]
            }] }
];
/** @nocollapse */
CometchatReceiverVideoMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverVideoMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.videoUrl;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverVideoMessageBubbleComponent.prototype.message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLE1BQU0sT0FBTyw0Q0FBNEM7SUFxQnZEO1FBcEJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7O1FBR2xFLFdBQU0sR0FBRyxJQUFJLENBQUM7O1FBRWQsU0FBSSxHQUFXLElBQUksQ0FBQztRQUlwQixrQkFBYSxHQUFZLEtBQUssQ0FBQzs7UUFHL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUUvRCxDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixlQUFlLENBQUMsU0FBUyxDQUMxQixDQUFDO1FBRUY7O1dBRUc7UUFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztzQkFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFLRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBOURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCx3MURBQXVFOzthQUV4RTs7Ozs7NkJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBSlAsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUN0Qix1RUFBa0U7O0lBR2xFLDhEQUFjOztJQUVkLDREQUFvQjs7SUFFcEIsZ0VBQWlCOztJQUVqQixxRUFBK0I7O0lBRy9CLHFFQUErQjs7SUFFL0IsK0RBQThFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlclZpZGVvTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy9TZXRzIHRoZSBVc2VyIEF2YXRhciBpZiBncm91cFxuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG5cbiAgdmlkZW9Vcmw6IHN0cmluZztcblxuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy9pZiBncm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgYXZhdGFySWZHcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7IG1lc3NhZ2VGcm9tOiBcInJlY2VpdmVyXCIgfSk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICovXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICBjb25zdCB1aWQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXRVaWQoKTtcbiAgICAgICAgY29uc3QgY2hhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmdldE5hbWUoKS5jaGFyQXQoMCk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIHRoaXMuZ2V0VXJsKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIG9mIHZpZGVvIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgZ2V0VXJsKCkge1xuICAgIHRoaXMudmlkZW9VcmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19