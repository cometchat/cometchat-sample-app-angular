/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverFileMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.avatar = null;
        this.avatarName = null;
        this.avatarIfGroup = false;
        this.checkReaction = [];
        this.showReplyCount = true;
        this.showToolTip = true;
        this.actionGenerated = new EventEmitter();
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            //If Group then displays Avatar And Name
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
                this.avatarName = this.messageDetails.sender.name;
                this.avatar = this.messageDetails.sender.avatar;
            }
            //Gets File name and file url
            this.name = this.messageDetails.data.attachments[0].name;
            this.url = this.messageDetails.data.attachments[0].url;
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
CometChatReceiverFileMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-file-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ avatarName }}\n        </span>\n      </div>\n      <div class=\"messageFileContainerStyle\">\n        <div class=\"messageFileWrapperStyle\">\n          <a [href]=\"url\" target=\"_blank\">\n            <span id=\"file\">&nbsp;</span>\n            {{ name }}\n          </a>\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}.messageFileContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageFileWrapperStyle{display:inline-block;border-radius:12px;color:#ccc;background-color:#f6f6f6;padding:8px 12px;align-self:flex-start;width:auto}.messageFileWrapperStyle>a{background:0 0;text-decoration:none;color:#141414;width:auto;font-size:14px}.messageFileWrapperStyle:active,.messageFileWrapperStyle:hover,.messageFileWrapperStyle:visited{color:#141414;text-decoration:none}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAACf0lEQVRIDe2Wv2sTYRjHn/dyUQelVBEXHVpBweog5hqHLg4KQkEotWCRgsXW3b8gLTq6dGtaSiVYqrUiCIqDIC5WY9xcXIrURUGH4mJ6udfPE3LQXO4CSTNJnvL2fX7d93mf73uX9zWCeEv2hPXlPmrWWuljTqu/QYxY/rbFSMlxZKZ427xryIlxmFqBL4AfioknuoyIT7HJT9OmkJhUC7h0cK9W4A++nGPkPeNv3IN+IHfxj1PglxU5QlfLXt4GxWnzKC4/9LkkZmtGrnTHPAgDcXMmb3+wIDFG5oifRJ/AfIi/Qkercc+ozyGpv6rQQVJS1A94ZXhKbuFfQU+x0MKFeXs9mhfaDkp1k5MoChOjc86YoL9XJqDuMQt1mVe8BTsSzVNbi7Qta2OmcvCU3IS+dS0UBLKaWbDXooB7KqJgby8ZH8puoD5npNGfDObtsMZC2XMRBeKF2WEag7IX7M++ipWnvAxXO1okLNTXK6NQ9xJ7P+MZL8MVjbXVCUApfTgq7FH56HEZ4SN9DW0HiK9nl+wZN5rYzGZzf2s8sDLKKr+hKk118nOL78iRNZwehQ77fOwtFeE9feWLzML7OUCW69B3GTbYZYgMtVTkw5QpeYv2MiDjrPJYHVSj0YNriNHTUhHF4Zf3DZOOppJZtOdtRT7TtdvWxjdFjwl2i8SQkuzq0pXMTUykS1cMKcmu/4kuI2VtlDNCT7OOCbcfPbT0jlZ2jJXNGrLXsQoA8Qs8qHgcdJsu/zbQT9PJTGaeUEo+tnoHU7BQlBFQLnLezKqPJjbavnCHoM1mbi/bKUcGnOKk2TKuDMBdgfGVhxrO7WZAMbEdxanipeUsp+n3fzx9zTKZd9H5AAAAAElFTkSuQmCC) 0 center/18px no-repeat #f6f6f6;height:30px;display:inline-block;padding:10px 0 0 20px}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}"]
            }] }
];
/** @nocollapse */
CometChatReceiverFileMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverFileMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    showToolTip: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.url;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.avatarName;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverFileMessageBubbleComponent.prototype.GROUP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPaEQsTUFBTSxPQUFPLDJDQUEyQztJQWlCdEQ7UUFoQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFHL0IsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFVixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUV0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVsQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFVBQUssR0FBVyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUUvQixDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJO1lBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyw2QkFBNkIsQ0FDaEQsSUFBSSxDQUFDLGNBQWMsRUFDbkIsS0FBSyxDQUFDLFNBQVMsQ0FDaEIsQ0FBQztZQUVGLHdDQUF3QztZQUN4QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7MEJBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7OzBCQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO3lCQUNwQyxPQUFPLEVBQUU7eUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDVCxXQUFXLEVBQUU7aUJBQ2pCO2dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNqRDtZQUNELDZCQUE2QjtZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3Q0FBd0M7Z0JBQ2xELDAxREFBc0U7O2FBRXZFOzs7Ozs2QkFFRSxLQUFLOzZCQVFMLEtBQUs7MEJBRUwsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFaUCxxRUFBK0I7O0lBQy9CLDJEQUFhOztJQUNiLDBEQUFZOztJQUNaLDZEQUFjOztJQUNkLGlFQUEwQjs7SUFDMUIsb0VBQStCOztJQUMvQixvRUFBbUI7O0lBRW5CLHFFQUErQjs7SUFFL0Isa0VBQTRCOztJQUM1QixtRUFBc0I7O0lBQ3RCLHNFQUFrRTs7SUFFbEUsNERBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWZpbGUtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1maWxlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFJlY2VpdmVyRmlsZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGF2YXRhciA9IG51bGw7XG4gIGF2YXRhck5hbWU6IHN0cmluZyA9IG51bGw7XG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tSZWFjdGlvbiA9IFtdO1xuXG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgR1JPVVA6IFN0cmluZyA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICAgIHRoaXMubWVzc2FnZURldGFpbHMsXG4gICAgICAgIGVudW1zLlJFQUNUSU9OU1xuICAgICAgKTtcblxuICAgICAgLy9JZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcikge1xuICAgICAgICAgIGNvbnN0IHVpZCA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLmdldFVpZCgpO1xuICAgICAgICAgIGNvbnN0IGNoYXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlclxuICAgICAgICAgICAgLmdldE5hbWUoKVxuICAgICAgICAgICAgLmNoYXJBdCgwKVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdmF0YXJOYW1lID0gdGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgICB9XG4gICAgICAvL0dldHMgRmlsZSBuYW1lIGFuZCBmaWxlIHVybFxuICAgICAgdGhpcy5uYW1lID0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLmF0dGFjaG1lbnRzWzBdLm5hbWU7XG4gICAgICB0aGlzLnVybCA9IHRoaXMubWVzc2FnZURldGFpbHMuZGF0YS5hdHRhY2htZW50c1swXS51cmw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=