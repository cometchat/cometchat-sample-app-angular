/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverAudioMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.avatar = null;
        this.name = null;
        this.avatarIfGroup = false;
        this.checkReaction = [];
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
                    const char = this.messageDetails.sender
                        .getName()
                        .charAt(0)
                        .toUpperCase();
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
     * Gets the url of audio to be displayed
     * @return {?}
     */
    getUrl() {
        try {
            this.audioUrl = this.messageDetails.data.url;
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
CometChatReceiverAudioMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-audio-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageAudioContainerStyle\">\n        <div class=\"messageAudioWrapperStyle\">\n          <audio controls>\n            <source [src]=\"audioUrl\" />\n          </audio>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start;align-self:flex-start}.messageAudioContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageAudioWrapperStyle{display:inline-block;border-radius:12px;align-self:flex-start}.messageAudioWrapperStyle>audio{max-width:250px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.avatarStyle{border-radius:50%;border-width:1px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
            }] }
];
/** @nocollapse */
CometChatReceiverAudioMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverAudioMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.audioUrl;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverAudioMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1yZWNlaXZlci1hdWRpby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItYXVkaW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT2hELE1BQU0sT0FBTyw0Q0FBNEM7SUFpQnZEO1FBaEJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBR3JCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEUsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsVUFBSyxHQUFXLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRS9CLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixLQUFLLENBQUMsU0FBUyxDQUNoQixDQUFDO1lBRUY7O2VBRUc7WUFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7MEJBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7OzBCQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3lCQUNwQyxPQUFPLEVBQUU7eUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDVCxXQUFXLEVBQUU7aUJBQ2pCO2dCQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsTUFBTTtRQUNKLElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUM5QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxpeERBQXVFOzthQUV4RTs7Ozs7NkJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFFTCxNQUFNOzs7O0lBTFAsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUV0Qix1RUFBa0U7O0lBRWxFLGdFQUFpQjs7SUFDakIsOERBQWM7O0lBQ2QsNERBQW9COztJQUNwQixxRUFBK0I7O0lBRS9CLHFFQUFtQjs7SUFFbkIsNkRBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1hdWRpby1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1hdWRpby1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFJlY2VpdmVyQXVkaW9NZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGF1ZGlvVXJsOiBzdHJpbmc7XG4gIGF2YXRhciA9IG51bGw7XG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjaGVja1JlYWN0aW9uID0gW107XG5cbiAgR1JPVVA6IFN0cmluZyA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMsXG4gICAgICAgIGVudW1zLlJFQUNUSU9OU1xuICAgICAgKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAgSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICAgICAqL1xuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICAgIGNvbnN0IHVpZCA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlclxuICAgICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgICAgLmNoYXJBdCgwKVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgICB9XG4gICAgICB0aGlzLmdldFVybCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgb2YgYXVkaW8gdG8gYmUgZGlzcGxheWVkXG4gICAqL1xuICBnZXRVcmwoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXVkaW9VcmwgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19