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
                //  this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid,char))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEU7SUEwQkU7UUFwQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFHbEUsV0FBTSxHQUFHLElBQUksQ0FBQzs7UUFFZCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBSXBCLGtCQUFhLEdBQVksS0FBSyxDQUFDOztRQUcvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBRS9ELENBQUM7Ozs7SUFFaEIsK0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsV0FBVyxDQUNaLENBQUM7UUFFRjs7V0FFRztRQUNILElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O29CQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztvQkFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRTNELHVFQUF1RTthQUN4RTtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2REFBTTs7OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0VBQWE7Ozs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQWhFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztvQkFDbkQsdzFEQUF1RTs7aUJBRXhFOzs7OztpQ0FFRSxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07O0lBdURULG1EQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0E1RFksNENBQTRDOzs7SUFDdkQsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUN0Qix1RUFBa0U7O0lBR2xFLDhEQUFjOztJQUVkLDREQUFvQjs7SUFFcEIsZ0VBQWlCOztJQUVqQixxRUFBK0I7O0lBRy9CLHFFQUErQjs7SUFFL0IsK0RBQThFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyVmlkZW9NZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvL1NldHMgdGhlIFVzZXIgQXZhdGFyIGlmIGdyb3VwXG4gIGF2YXRhciA9IG51bGw7XG4gIC8vU2V0cyBVc2VybmFtZSBvZiBBdmF0YXJcbiAgbmFtZTogc3RyaW5nID0gbnVsbDtcblxuICB2aWRlb1VybDogc3RyaW5nO1xuXG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvL2lmIGdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICBhdmF0YXJJZkdyb3VwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuTWVzc2FnZURldGFpbHMsIHsgbWVzc2FnZUZyb206IFwicmVjZWl2ZXJcIiB9KTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgXCJyZWFjdGlvbnNcIlxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiAgSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICAgKi9cbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5yZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgdGhpcy5hdmF0YXJJZkdyb3VwID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyKSB7XG4gICAgICAgIGNvbnN0IHVpZCA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICBjb25zdCBjaGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuZ2V0TmFtZSgpLmNoYXJBdCgwKTtcblxuICAgICAgICAvLyAgdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuc2V0QXZhdGFyKFN2Z0F2YXRhci5nZXRBdmF0YXIodWlkLGNoYXIpKVxuICAgICAgfVxuICAgICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyO1xuICAgIH1cbiAgICB0aGlzLmdldFVybCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVybCBvZiB2aWRlbyB0byBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIGdldFVybCgpIHtcbiAgICB0aGlzLnZpZGVvVXJsID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==