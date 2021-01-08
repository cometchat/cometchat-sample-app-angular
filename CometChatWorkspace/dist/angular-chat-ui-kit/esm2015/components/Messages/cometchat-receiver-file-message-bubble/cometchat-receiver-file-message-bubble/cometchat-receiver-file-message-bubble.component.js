/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatReceiverFileMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.avatar = null;
        //Sets Username of Avatar
        this.avatarName = null;
        //If Group then only show avatar
        this.avatarIfGroup = false;
        this.checkReaction = false;
        this.showReplyCount = true;
        this.showToolTip = true;
        this.actionGenerated = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        //If Group then displays Avatar And Name
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
            this.avatarName = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        //Gets File name and file url
        this.name = this.MessageDetails.data.attachments[0].name;
        this.url = this.MessageDetails.data.attachments[0].url;
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
CometchatReceiverFileMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-file-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ avatarName }}\n        </span>\n      </div>\n      <div class=\"messageFileContainerStyle\">\n        <div class=\"messageFileWrapperStyle\">\n          <a [href]=\"url\" target=\"_blank\"\n            >{{ name }}\n            <span id=\"file\">&nbsp;</span>\n          </a>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageFileContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageFileWrapperStyle{display:inline-block;border-radius:12px;color:#ccc;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageFileWrapperStyle>a{background:0 0;text-decoration:none;color:#141414;width:auto;font-size:14px}.messageFileWrapperStyle:active,.messageFileWrapperStyle:hover,.messageFileWrapperStyle:visited{color:#141414;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAACf0lEQVRIDe2Wv2sTYRjHn/dyUQelVBEXHVpBweog5hqHLg4KQkEotWCRgsXW3b8gLTq6dGtaSiVYqrUiCIqDIC5WY9xcXIrURUGH4mJ6udfPE3LQXO4CSTNJnvL2fX7d93mf73uX9zWCeEv2hPXlPmrWWuljTqu/QYxY/rbFSMlxZKZ427xryIlxmFqBL4AfioknuoyIT7HJT9OmkJhUC7h0cK9W4A++nGPkPeNv3IN+IHfxj1PglxU5QlfLXt4GxWnzKC4/9LkkZmtGrnTHPAgDcXMmb3+wIDFG5oifRJ/AfIi/Qkercc+ozyGpv6rQQVJS1A94ZXhKbuFfQU+x0MKFeXs9mhfaDkp1k5MoChOjc86YoL9XJqDuMQt1mVe8BTsSzVNbi7Qta2OmcvCU3IS+dS0UBLKaWbDXooB7KqJgby8ZH8puoD5npNGfDObtsMZC2XMRBeKF2WEag7IX7M++ipWnvAxXO1okLNTXK6NQ9xJ7P+MZL8MVjbXVCUApfTgq7FH56HEZ4SN9DW0HiK9nl+wZN5rYzGZzf2s8sDLKKr+hKk118nOL78iRNZwehQ77fOwtFeE9feWLzML7OUCW69B3GTbYZYgMtVTkw5QpeYv2MiDjrPJYHVSj0YNriNHTUhHF4Zf3DZOOppJZtOdtRT7TtdvWxjdFjwl2i8SQkuzq0pXMTUykS1cMKcmu/4kuI2VtlDNCT7OOCbcfPbT0jlZ2jJXNGrLXsQoA8Qs8qHgcdJsu/zbQT9PJTGaeUEo+tnoHU7BQlBFQLnLezKqPJjbavnCHoM1mbi/bKUcGnOKk2TKuDMBdgfGVhxrO7WZAMbEdxanipeUsp+n3fzx9zTKZd9H5AAAAAElFTkSuQmCC) 0 center/18px no-repeat #f6f6f6;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}"]
            }] }
];
/** @nocollapse */
CometchatReceiverFileMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverFileMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.url;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.avatarName;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverFileMessageBubbleComponent.prototype.actionGenerated;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLDJDQUEyQztJQWdCdEQ7UUFmUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUcvQixXQUFNLEdBQUcsSUFBSSxDQUFDOztRQUVkLGVBQVUsR0FBVyxJQUFJLENBQUM7O1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUVGLHdDQUF3QztRQUN4QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztzQkFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07cUJBQ3BDLE9BQU8sRUFBRTtxQkFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUNULFdBQVcsRUFBRTthQUNqQjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pEO1FBQ0QsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBTUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBckRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCw0MURBQXNFOzthQUV2RTs7Ozs7NkJBRUUsS0FBSzs2QkFVTCxLQUFLOzBCQUVMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBZFAscUVBQStCOztJQUMvQiwyREFBYTs7SUFDYiwwREFBWTs7SUFDWiw2REFBYzs7SUFFZCxpRUFBMEI7O0lBRTFCLG9FQUErQjs7SUFDL0Isb0VBQStCOztJQUUvQixxRUFBK0I7O0lBRS9CLGtFQUE0Qjs7SUFDNUIsbUVBQXNCOztJQUN0QixzRUFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGF2YXRhciA9IG51bGw7XG4gIC8vU2V0cyBVc2VybmFtZSBvZiBBdmF0YXJcbiAgYXZhdGFyTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgLy9JZiBHcm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgYXZhdGFySWZHcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuXG4gICAgLy9JZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLnJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgaWYgKCF0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXIpIHtcbiAgICAgICAgY29uc3QgdWlkID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuZ2V0VWlkKCk7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlclxuICAgICAgICAgIC5nZXROYW1lKClcbiAgICAgICAgICAuY2hhckF0KDApXG4gICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmF2YXRhck5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIC8vR2V0cyBGaWxlIG5hbWUgYW5kIGZpbGUgdXJsXG4gICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmF0dGFjaG1lbnRzWzBdLm5hbWU7XG4gICAgdGhpcy51cmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0udXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19