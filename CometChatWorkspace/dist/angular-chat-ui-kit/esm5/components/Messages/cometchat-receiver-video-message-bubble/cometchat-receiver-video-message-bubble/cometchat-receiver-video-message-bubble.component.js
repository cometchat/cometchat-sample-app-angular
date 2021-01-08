/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
var CometchatReceiverVideoMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverVideoMessageBubbleComponent() {
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
    CometchatReceiverVideoMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            if (!this.MessageDetails.sender.avatar) {
                /** @type {?} */
                var uid = this.MessageDetails.sender.getUid();
                /** @type {?} */
                var char = this.MessageDetails.sender.getName().charAt(0);
            }
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.getUrl();
    };
    /**
     * Gets the url of video to be displayed
     */
    /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    CometchatReceiverVideoMessageBubbleComponent.prototype.getUrl = /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    function () {
        this.videoUrl = this.MessageDetails.data.url;
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
    CometchatReceiverVideoMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverVideoMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-video-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <!--Avatar Ends-->\n    <div class=\"messageDetailStyle\">\n      <!--Name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <!--Name End-->\n      <div class=\"messageVideoContainer\">\n        <div class=\"messageVideoWrapperStyle\">\n          <video controls>\n            <source [src]=\"videoUrl\" />\n          </video>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageVideoContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageVideoWrapperStyle{display:inline-block;align-self:flex-start}.messageVideoWrapperStyle>video{max-width:250px;border-radius:12px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.avatarStyle{border-radius:50%;border-width:1px}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverVideoMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverVideoMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatReceiverVideoMessageBubbleComponent;
}());
export { CometchatReceiverVideoMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEU7SUEwQkU7UUFwQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHbEUsV0FBTSxHQUFHLElBQUksQ0FBQzs7UUFFZCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBSXBCLGtCQUFhLEdBQVksS0FBSyxDQUFDOztRQUcvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBRS9ELENBQUM7Ozs7SUFFaEIsK0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsV0FBVyxDQUNaLENBQUM7UUFFRjs7V0FFRztRQUNILElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O29CQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztvQkFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkRBQU07Ozs7SUFBTjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILG9FQUFhOzs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5Q0FBeUM7b0JBQ25ELHcxREFBdUU7O2lCQUV4RTs7Ozs7aUNBRUUsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxNQUFNOztJQXFEVCxtREFBQztDQUFBLEFBL0RELElBK0RDO1NBMURZLDRDQUE0Qzs7O0lBQ3ZELHNFQUErQjs7SUFDL0IsbUVBQTRCOztJQUM1QixzRUFBK0I7O0lBQy9CLG9FQUFzQjs7SUFDdEIsdUVBQWtFOztJQUdsRSw4REFBYzs7SUFFZCw0REFBb0I7O0lBRXBCLGdFQUFpQjs7SUFFakIscUVBQStCOztJQUcvQixxRUFBK0I7O0lBRS9CLCtEQUE4RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlclZpZGVvTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy9TZXRzIHRoZSBVc2VyIEF2YXRhciBpZiBncm91cFxuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG5cbiAgdmlkZW9Vcmw6IHN0cmluZztcblxuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy9pZiBncm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgYXZhdGFySWZHcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7IG1lc3NhZ2VGcm9tOiBcInJlY2VpdmVyXCIgfSk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFwicmVhY3Rpb25zXCJcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICovXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICBjb25zdCB1aWQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXRVaWQoKTtcbiAgICAgICAgY29uc3QgY2hhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmdldE5hbWUoKS5jaGFyQXQoMCk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIHRoaXMuZ2V0VXJsKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIG9mIHZpZGVvIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgZ2V0VXJsKCkge1xuICAgIHRoaXMudmlkZW9VcmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19