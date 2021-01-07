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
                // this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLDJDQUEyQztJQWdCdEQ7UUFmUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUcvQixXQUFNLEdBQUcsSUFBSSxDQUFDOztRQUVkLGVBQVUsR0FBVyxJQUFJLENBQUM7O1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUVGLHdDQUF3QztRQUN4QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztzQkFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7c0JBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07cUJBQ3BDLE9BQU8sRUFBRTtxQkFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUNULFdBQVcsRUFBRTtnQkFDaEIsd0VBQXdFO2FBQ3pFO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDakQ7UUFDRCw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7SUFNRCxhQUFhLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3Q0FBd0M7Z0JBQ2xELDQxREFBc0U7O2FBRXZFOzs7Ozs2QkFFRSxLQUFLOzZCQVVMLEtBQUs7MEJBRUwsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFkUCxxRUFBK0I7O0lBQy9CLDJEQUFhOztJQUNiLDBEQUFZOztJQUNaLDZEQUFjOztJQUVkLGlFQUEwQjs7SUFFMUIsb0VBQStCOztJQUMvQixvRUFBK0I7O0lBRS9CLHFFQUErQjs7SUFFL0Isa0VBQTRCOztJQUM1QixtRUFBc0I7O0lBQ3RCLHNFQUFrRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJGaWxlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgbmFtZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgYXZhdGFyID0gbnVsbDtcbiAgLy9TZXRzIFVzZXJuYW1lIG9mIEF2YXRhclxuICBhdmF0YXJOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAvL0lmIEdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICBhdmF0YXJJZkdyb3VwOiBib29sZWFuID0gZmFsc2U7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OU1xuICAgICk7XG5cbiAgICAvL0lmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICBjb25zdCB1aWQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5nZXRVaWQoKTtcbiAgICAgICAgY29uc3QgY2hhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyXG4gICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgIC5jaGFyQXQoMClcbiAgICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgICAgLy8gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuc2V0QXZhdGFyKFN2Z0F2YXRhci5nZXRBdmF0YXIodWlkLCBjaGFyKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmF2YXRhck5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIC8vR2V0cyBGaWxlIG5hbWUgYW5kIGZpbGUgdXJsXG4gICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLmF0dGFjaG1lbnRzWzBdLm5hbWU7XG4gICAgdGhpcy51cmwgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0udXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19