/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatReceiverAudioMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        //Sets the User Avatar if group
        this.avatar = null;
        //Sets Username of Avatar
        this.name = null;
        //If Group then only show avatar
        this.avatarIfGroup = false;
        this.checkReaction = false;
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
                const char = this.MessageDetails.sender
                    .getName()
                    .charAt(0)
                    .toUpperCase();
            }
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.getUrl();
    }
    /**
     * Gets the url of audio to be displayed
     * @return {?}
     */
    getUrl() {
        this.audioUrl = this.MessageDetails.data.url;
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
CometchatReceiverAudioMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-audio-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageAudioContainerStyle\">\n        <div class=\"messageAudioWrapperStyle\">\n          <audio controls>\n            <source [src]=\"audioUrl\" />\n          </audio>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start;align-self:flex-start}.messageAudioContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageAudioWrapperStyle{display:inline-block;border-radius:12px;align-self:flex-start}.messageAudioWrapperStyle>audio{max-width:250px;display:inherit;outline:0!important}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.avatarStyle{border-radius:50%;border-width:1px}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}"]
            }] }
];
/** @nocollapse */
CometchatReceiverAudioMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverAudioMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.audioUrl;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverAudioMessageBubbleComponent.prototype.checkReaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1hdWRpby1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItYXVkaW8tbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLE1BQU0sT0FBTyw0Q0FBNEM7SUFrQnZEO1FBakJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBR3JCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7O1FBSWxFLFdBQU0sR0FBRyxJQUFJLENBQUM7O1FBRWQsU0FBSSxHQUFXLElBQUksQ0FBQzs7UUFFcEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFFaEIsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUVGOztXQUVHO1FBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O3NCQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3FCQUNwQyxPQUFPLEVBQUU7cUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDVCxXQUFXLEVBQUU7YUFDakI7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7OztJQUtELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELG14REFBdUU7O2FBRXhFOzs7Ozs2QkFFRSxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFMUCxzRUFBK0I7O0lBQy9CLG1FQUE0Qjs7SUFDNUIsc0VBQStCOztJQUMvQixvRUFBc0I7O0lBRXRCLHVFQUFrRTs7SUFFbEUsZ0VBQWlCOztJQUVqQiw4REFBYzs7SUFFZCw0REFBb0I7O0lBRXBCLHFFQUErQjs7SUFFL0IscUVBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWF1ZGlvLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItYXVkaW8tbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJBdWRpb01lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYXVkaW9Vcmw6IHN0cmluZztcbiAgLy9TZXRzIHRoZSBVc2VyIEF2YXRhciBpZiBncm91cFxuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICovXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICBjb25zdCB1aWQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXRVaWQoKTtcbiAgICAgICAgY29uc3QgY2hhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyXG4gICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgIC5jaGFyQXQoMClcbiAgICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcjtcbiAgICB9XG4gICAgdGhpcy5nZXRVcmwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgb2YgYXVkaW8gdG8gYmUgZGlzcGxheWVkXG4gICAqL1xuICBnZXRVcmwoKSB7XG4gICAgdGhpcy5hdWRpb1VybCA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS51cmw7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=