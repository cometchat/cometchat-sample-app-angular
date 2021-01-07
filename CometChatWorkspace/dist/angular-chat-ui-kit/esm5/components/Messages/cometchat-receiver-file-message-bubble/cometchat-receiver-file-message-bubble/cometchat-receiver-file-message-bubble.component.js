/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatReceiverFileMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverFileMessageBubbleComponent() {
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
    CometchatReceiverFileMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        //If Group then displays Avatar And Name
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            if (!this.MessageDetails.sender.avatar) {
                /** @type {?} */
                var uid = this.MessageDetails.sender.getUid();
                /** @type {?} */
                var char = this.MessageDetails.sender
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
    CometchatReceiverFileMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverFileMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-file-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ avatarName }}\n        </span>\n      </div>\n      <div class=\"messageFileContainerStyle\">\n        <div class=\"messageFileWrapperStyle\">\n          <a [href]=\"url\" target=\"_blank\"\n            >{{ name }}\n            <span id=\"file\">&nbsp;</span>\n          </a>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageFileContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageFileWrapperStyle{display:inline-block;border-radius:12px;color:#ccc;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageFileWrapperStyle>a{background:0 0;text-decoration:none;color:#141414;width:auto;font-size:14px}.messageFileWrapperStyle:active,.messageFileWrapperStyle:hover,.messageFileWrapperStyle:visited{color:#141414;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAACf0lEQVRIDe2Wv2sTYRjHn/dyUQelVBEXHVpBweog5hqHLg4KQkEotWCRgsXW3b8gLTq6dGtaSiVYqrUiCIqDIC5WY9xcXIrURUGH4mJ6udfPE3LQXO4CSTNJnvL2fX7d93mf73uX9zWCeEv2hPXlPmrWWuljTqu/QYxY/rbFSMlxZKZ427xryIlxmFqBL4AfioknuoyIT7HJT9OmkJhUC7h0cK9W4A++nGPkPeNv3IN+IHfxj1PglxU5QlfLXt4GxWnzKC4/9LkkZmtGrnTHPAgDcXMmb3+wIDFG5oifRJ/AfIi/Qkercc+ozyGpv6rQQVJS1A94ZXhKbuFfQU+x0MKFeXs9mhfaDkp1k5MoChOjc86YoL9XJqDuMQt1mVe8BTsSzVNbi7Qta2OmcvCU3IS+dS0UBLKaWbDXooB7KqJgby8ZH8puoD5npNGfDObtsMZC2XMRBeKF2WEag7IX7M++ipWnvAxXO1okLNTXK6NQ9xJ7P+MZL8MVjbXVCUApfTgq7FH56HEZ4SN9DW0HiK9nl+wZN5rYzGZzf2s8sDLKKr+hKk118nOL78iRNZwehQ77fOwtFeE9feWLzML7OUCW69B3GTbYZYgMtVTkw5QpeYv2MiDjrPJYHVSj0YNriNHTUhHF4Zf3DZOOppJZtOdtRT7TtdvWxjdFjwl2i8SQkuzq0pXMTUykS1cMKcmu/4kuI2VtlDNCT7OOCbcfPbT0jlZ2jJXNGrLXsQoA8Qs8qHgcdJsu/zbQT9PJTGaeUEo+tnoHU7BQlBFQLnLezKqPJjbavnCHoM1mbi/bKUcGnOKk2TKuDMBdgfGVhxrO7WZAMbEdxanipeUsp+n3fzx9zTKZd9H5AAAAAElFTkSuQmCC) 0 center/18px no-repeat #f6f6f6;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverFileMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverFileMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        showToolTip: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatReceiverFileMessageBubbleComponent;
}());
export { CometchatReceiverFileMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUFxQkU7UUFmUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUcvQixXQUFNLEdBQUcsSUFBSSxDQUFDOztRQUVkLGVBQVUsR0FBVyxJQUFJLENBQUM7O1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVoQiw4REFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUNoRCxJQUFJLENBQUMsY0FBYyxFQUNuQixlQUFlLENBQUMsU0FBUyxDQUMxQixDQUFDO1FBRUYsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O29CQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOztvQkFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTtxQkFDcEMsT0FBTyxFQUFFO3FCQUNULE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ1QsV0FBVyxFQUFFO2dCQUNoQix3RUFBd0U7YUFDekU7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqRDtRQUNELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1FQUFhOzs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkF0REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELDQxREFBc0U7O2lCQUV2RTs7Ozs7aUNBRUUsS0FBSztpQ0FVTCxLQUFLOzhCQUVMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxNQUFNOztJQW1DVCxrREFBQztDQUFBLEFBdkRELElBdURDO1NBbERZLDJDQUEyQzs7O0lBQ3RELHFFQUErQjs7SUFDL0IsMkRBQWE7O0lBQ2IsMERBQVk7O0lBQ1osNkRBQWM7O0lBRWQsaUVBQTBCOztJQUUxQixvRUFBK0I7O0lBQy9CLG9FQUErQjs7SUFFL0IscUVBQStCOztJQUUvQixrRUFBNEI7O0lBQzVCLG1FQUFzQjs7SUFDdEIsc0VBQWtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItZmlsZS1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItZmlsZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlckZpbGVNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBuYW1lOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIGF2YXRhck5hbWU6IHN0cmluZyA9IG51bGw7XG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcblxuICAgIC8vSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5yZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgdGhpcy5hdmF0YXJJZkdyb3VwID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyKSB7XG4gICAgICAgIGNvbnN0IHVpZCA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICBjb25zdCBjaGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXJcbiAgICAgICAgICAuZ2V0TmFtZSgpXG4gICAgICAgICAgLmNoYXJBdCgwKVxuICAgICAgICAgIC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAvLyB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5zZXRBdmF0YXIoU3ZnQXZhdGFyLmdldEF2YXRhcih1aWQsIGNoYXIpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXZhdGFyTmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcjtcbiAgICB9XG4gICAgLy9HZXRzIEZpbGUgbmFtZSBhbmQgZmlsZSB1cmxcbiAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEuYXR0YWNobWVudHNbMF0ubmFtZTtcbiAgICB0aGlzLnVybCA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS5hdHRhY2htZW50c1swXS51cmw7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=