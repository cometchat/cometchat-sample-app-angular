/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
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
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
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
                //  this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid,char))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPdEUsTUFBTSxPQUFPLDRDQUE0QztJQXFCdkQ7UUFwQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHbEUsV0FBTSxHQUFHLElBQUksQ0FBQzs7UUFFZCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBSXBCLGtCQUFhLEdBQVksS0FBSyxDQUFDOztRQUcvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBRS9ELENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsNkJBQTZCLENBQ2hELElBQUksQ0FBQyxjQUFjLEVBQ25CLFdBQVcsQ0FDWixDQUFDO1FBRUY7O1dBRUc7UUFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztzQkFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCx1RUFBdUU7YUFDeEU7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7OztJQUtELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFoRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELHcxREFBdUU7O2FBRXhFOzs7Ozs2QkFFRSxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFKUCxzRUFBK0I7O0lBQy9CLG1FQUE0Qjs7SUFDNUIsc0VBQStCOztJQUMvQixvRUFBc0I7O0lBQ3RCLHVFQUFrRTs7SUFHbEUsOERBQWM7O0lBRWQsNERBQW9COztJQUVwQixnRUFBaUI7O0lBRWpCLHFFQUErQjs7SUFHL0IscUVBQStCOztJQUUvQiwrREFBOEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJWaWRlb01lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vU2V0cyB0aGUgVXNlciBBdmF0YXIgaWYgZ3JvdXBcbiAgYXZhdGFyID0gbnVsbDtcbiAgLy9TZXRzIFVzZXJuYW1lIG9mIEF2YXRhclxuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gIHZpZGVvVXJsOiBzdHJpbmc7XG5cbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vaWYgZ3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5NZXNzYWdlRGV0YWlscywgeyBtZXNzYWdlRnJvbTogXCJyZWNlaXZlclwiIH0pO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBcInJlYWN0aW9uc1wiXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqICBJZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgICAqL1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLnJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgaWYgKCF0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXIpIHtcbiAgICAgICAgY29uc3QgdWlkID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuZ2V0VWlkKCk7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXROYW1lKCkuY2hhckF0KDApO1xuXG4gICAgICAgIC8vICB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5zZXRBdmF0YXIoU3ZnQXZhdGFyLmdldEF2YXRhcih1aWQsY2hhcikpXG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIHRoaXMuZ2V0VXJsKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIG9mIHZpZGVvIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgZ2V0VXJsKCkge1xuICAgIHRoaXMudmlkZW9VcmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19