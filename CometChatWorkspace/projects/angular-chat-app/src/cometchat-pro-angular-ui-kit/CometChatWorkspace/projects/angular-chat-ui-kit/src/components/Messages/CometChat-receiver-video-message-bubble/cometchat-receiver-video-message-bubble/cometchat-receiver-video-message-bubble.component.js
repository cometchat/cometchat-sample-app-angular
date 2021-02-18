/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble/cometchat-receiver-video-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverVideoMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.avatar = null;
        this.name = null;
        this.checkReaction = [];
        this.avatarIfGroup = false;
        this.message = Object.assign({}, this.messageDetails, {
            messageFrom: enums.RECEIVER,
        });
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            /**
             *  If Group then displays Avatar And Name
             */
            if (this.messageDetails.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
                this.avatarIfGroup = true;
                if (!this.messageDetails.sender.avatar) {
                    /** @type {?} */
                    const uid = this.messageDetails.sender.getUid();
                    /** @type {?} */
                    const char = this.messageDetails.sender.getName().charAt(0);
                }
                this.name = this.messageDetails.sender.name;
                this.avatar = this.messageDetails.sender.avatar;
            }
            this.getUrl();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets the url of video to be displayed
     * @return {?}
     */
    getUrl() {
        try {
            this.videoUrl = this.messageDetails.data.url;
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
CometChatReceiverVideoMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-video-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <!--Avatar Ends-->\n    <div class=\"messageDetailStyle\">\n      <!--Name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <!--Name End-->\n      <div class=\"messageVideoContainer\">\n        <div class=\"messageVideoWrapperStyle\">\n          <video controls>\n            <source [src]=\"videoUrl\" />\n          </video>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageVideoContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageVideoWrapperStyle{display:inline-block;align-self:flex-start}.messageVideoWrapperStyle>video{max-width:250px;border-radius:12px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.avatarStyle{border-radius:50%;border-width:1px}"]
            }] }
];
/** @nocollapse */
CometChatReceiverVideoMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverVideoMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.videoUrl;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometChatReceiverVideoMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItdmlkZW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT2hELE1BQU0sT0FBTyw0Q0FBNEM7SUFzQnZEO1FBckJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFNBQUksR0FBVyxJQUFJLENBQUM7UUFJcEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDL0MsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRO1NBQzVCLENBQUMsQ0FBQztRQUVILFVBQUssR0FBVyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUUvQixDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJO1lBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsS0FBSyxDQUFDLFNBQVMsQ0FDaEIsQ0FBQztZQUVGOztlQUVHO1lBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDdEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7OzBCQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOzswQkFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzVEO2dCQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsTUFBTTtRQUNKLElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUM5QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBM0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxzMURBQXVFOzthQUV4RTs7Ozs7NkJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBSlAsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUN0Qix1RUFBa0U7O0lBRWxFLDhEQUFjOztJQUNkLDREQUFvQjs7SUFFcEIsZ0VBQWlCOztJQUVqQixxRUFBbUI7O0lBRW5CLHFFQUErQjs7SUFFL0IsK0RBRUc7O0lBRUgsNkRBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci12aWRlby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLXZpZGVvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFJlY2VpdmVyVmlkZW9NZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhdmF0YXIgPSBudWxsO1xuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gIHZpZGVvVXJsOiBzdHJpbmc7XG5cbiAgY2hlY2tSZWFjdGlvbiA9IFtdO1xuXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tZXNzYWdlRGV0YWlscywge1xuICAgIG1lc3NhZ2VGcm9tOiBlbnVtcy5SRUNFSVZFUixcbiAgfSk7XG5cbiAgR1JPVVA6IFN0cmluZyA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMsXG4gICAgICAgIGVudW1zLlJFQUNUSU9OU1xuICAgICAgKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAgSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICAgICAqL1xuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICAgIGNvbnN0IHVpZCA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXROYW1lKCkuY2hhckF0KDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyO1xuICAgICAgfVxuICAgICAgdGhpcy5nZXRVcmwoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIG9mIHZpZGVvIHRvIGJlIGRpc3BsYXllZFxuICAgKi9cbiAgZ2V0VXJsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnZpZGVvVXJsID0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==