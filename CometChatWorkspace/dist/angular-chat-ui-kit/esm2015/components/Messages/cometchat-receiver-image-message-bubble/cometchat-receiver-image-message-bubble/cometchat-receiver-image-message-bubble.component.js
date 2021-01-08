/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatReceiverImageMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = "receiver";
        this.messageAssign = Object.assign({}, this.MessageDetails, {
            messageFrom: this.messageFrom,
        });
        this.imageLoader = false;
        this.checkScreenSize = false;
        this.checkReaction = false;
        this.avatar = null;
        //Sets Username of Avatar
        this.name = null;
        //If Group then only show avatar
        //If Group then only show avatar
        this.avatarIfGroup = false;
        this.message = this.messageAssign;
        this.imageUrl = "";
        /**
         * If thumbnail-extension is not present then this works
         *
         */
        this.setMessageImageUrl = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let img = new Image();
            img.src = this.MessageDetails.data.url;
            img.onload = (/**
             * @return {?}
             */
            () => {
                this.imageLoader = false;
                this.imageUrl = img.src;
            });
        });
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
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.setImage();
    }
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    onResize() {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth >= "320" && this.innerWidth <= "767") {
            this.checkScreenSize = true;
        }
        else {
            if (this.checkScreenSize === true) {
                this.setImage();
            }
            this.checkScreenSize = false;
        }
    }
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     * @return {?}
     */
    setImage() {
        this.imageLoader = true;
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            /** @type {?} */
            const metadata = this.MessageDetails.metadata;
            /** @type {?} */
            const injectedObject = metadata["@injected"];
            if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
                /** @type {?} */
                const extensionsObject = injectedObject["extensions"];
                if (extensionsObject &&
                    extensionsObject.hasOwnProperty("thumbnail-generation")) {
                    /** @type {?} */
                    const thumbnailGenerationObject = extensionsObject["thumbnail-generation"];
                    /** @type {?} */
                    const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
                    /** @type {?} */
                    const imageToShow = this.chooseImage(thumbnailGenerationObject);
                    /** @type {?} */
                    let img = new Image();
                    img.src = imageToShow;
                    img.onload = (/**
                     * @return {?}
                     */
                    () => {
                        this.imageLoader = false;
                        this.imageUrl = img.src;
                        URL.revokeObjectURL(img.src);
                    });
                }
            }
        }
        else {
            this.setMessageImageUrl();
        }
    }
    /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    chooseImage(thumbnailGenerationObject) {
        /** @type {?} */
        const smallUrl = thumbnailGenerationObject["url_small"];
        /** @type {?} */
        const mediumUrl = thumbnailGenerationObject["url_medium"];
        /** @type {?} */
        const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
        /** @type {?} */
        let imageToShow = mediumUrl;
        if (mq.matches) {
            imageToShow = smallUrl;
        }
        return imageToShow;
    }
    /**
     *
     *   Emits action to view image in full screen
     * @return {?}
     */
    open() {
        this.actionGenerated.emit({
            type: enums.VIEW_ACTUAL_IMAGE,
            payLoad: Object.assign({}, this.message, this.MessageDetails),
        });
    }
    /**
     * Set Time-Stamp for receiving image
     *
     * @return {?}
     */
    getTime() {
        /** @type {?} */
        let msgSentAt = this.MessageDetails.sentAt;
        /** @type {?} */
        let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeStamp;
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
CometchatReceiverImageMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-image-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\" (click)=\"open()\">\n          <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n          <img [src]=\"imageUrl\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:300px;height:200px;cursor:pointer}.messageImgWrapperStyle img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometchatReceiverImageMessageBubbleComponent.ctorParameters = () => [];
CometchatReceiverImageMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.messageAssign;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.imageLoader;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.innerWidth;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.checkScreenSize;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.imageUrl;
    /**
     * If thumbnail-extension is not present then this works
     *
     * @type {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.setMessageImageUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLE1BQU0sT0FBTyw0Q0FBNEM7SUEwQnZEO1FBekJTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEUsZ0JBQVcsR0FBRyxVQUFVLENBQUM7UUFFekIsa0JBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7UUFDSCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixXQUFNLEdB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Q0FBQzs7O1lBaEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCx1MkRBQXVFOzthQUV4RTs7Ozs7NkJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNO3VCQTJDTixZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUU7Ozs7SUEvQ2pDLHNFQUErQjs7SUFDL0IsbUVBQTRCOztJQUM1QixzRUFBK0I7O0lBQy9CLG9FQUFzQjs7SUFDdEIsdUVBQWtFOztJQUNsRSxtRUFBeUI7O0lBRXpCLHFFQUVHOztJQUNILG1FQUE2Qjs7SUFDN0Isa0VBQVc7O0lBQ1gsdUVBQWlDOztJQUNqQyxxRUFBK0I7O0lBRS9CLDhEQUFjOztJQUVkLDREQUFvQjs7SUFHcEIscUVBQStCOztJQUUvQiwrREFBNkI7O0lBQzdCLGdFQUFjOzs7Ozs7SUE2RWQsMEVBT0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlY2VpdmVySW1hZ2VNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgbWVzc2FnZUZyb20gPSBcInJlY2VpdmVyXCI7XG5cbiAgbWVzc2FnZUFzc2lnbiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuTWVzc2FnZURldGFpbHMsIHtcbiAgICBtZXNzYWdlRnJvbTogdGhpcy5tZXNzYWdlRnJvbSxcbiAgfSk7XG4gIGltYWdlTG9hZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyV2lkdGg7XG4gIGNoZWNrU2NyZWVuU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgYXZhdGFyID0gbnVsbDtcbiAgLy9TZXRzIFVzZXJuYW1lIG9mIEF2YXRhclxuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuICAvL0lmIEdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICAvL0lmIEdyb3VwIHRoZW4gb25seSBzaG93IGF2YXRhclxuICBhdmF0YXJJZkdyb3VwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbWVzc2FnZSA9IHRoaXMubWVzc2FnZUFzc2lnbjtcbiAgaW1hZ2VVcmwgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqICBJZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgICAqL1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLnJlY2VpdmVyVHlwZSA9PT0gXCJncm91cFwiKSB7XG4gICAgICB0aGlzLmF2YXRhcklmR3JvdXAgPSB0cnVlO1xuICAgICAgdGhpcy5uYW1lID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIubmFtZTtcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyO1xuICAgIH1cbiAgICB0aGlzLnNldEltYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZW4gd2luZG93IHNpemUgaXMgY2hhbmdlZCBpbiByZWFsdGltZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIiwgW10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPj0gXCIzMjBcIiAmJiB0aGlzLmlubmVyV2lkdGggPD0gXCI3NjdcIikge1xuICAgICAgdGhpcy5jaGVja1NjcmVlblNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jaGVja1NjcmVlblNpemUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja1NjcmVlblNpemUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aHVtbmFpbC1nZW5lcmF0aW9uIGV4dGVuc2lvbiBpcyBwcmVzZW50IG9yIG5vdCBBbmQgdGhlbiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKi9cbiAgc2V0SW1hZ2UoKSB7XG4gICAgdGhpcy5pbWFnZUxvYWRlciA9IHRydWU7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLm1ldGFkYXRhO1xuXG4gICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdCAmJlxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJ0aHVtYm5haWwtZ2VuZXJhdGlvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCB0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0ID1cbiAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3RbXCJ0aHVtYm5haWwtZ2VuZXJhdGlvblwiXTtcblxuICAgICAgICAgIGNvbnN0IG1xID0gd2luZG93Lm1hdGNoTWVkaWEoXG4gICAgICAgICAgICBcIihtaW4td2lkdGg6MzYwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweClcIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBpbWFnZVRvU2hvdyA9IHRoaXMuY2hvb3NlSW1hZ2UodGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCk7XG4gICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVRvU2hvdztcbiAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRNZXNzYWdlSW1hZ2VVcmwoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIElmIHRodW1ibmFpbC1leHRlbnNpb24gaXMgbm90IHByZXNlbnQgdGhlbiB0aGlzIHdvcmtzXG4gICAqXG4gICAqL1xuICBzZXRNZXNzYWdlSW1hZ2VVcmwgPSAoKSA9PiB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRhdGEudXJsO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmltYWdlTG9hZGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlVXJsID0gaW1nLnNyYztcbiAgICB9O1xuICB9O1xuICAvKipcbiAgICogU2V0cyBpbWFnZSB1cmwgaS5lIG1lZGl1bS1zaXplIG9yIHNtYWxsLXNpemVcbiAgICogQHBhcmFtXG4gICAqL1xuICBjaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KSB7XG4gICAgY29uc3Qgc21hbGxVcmwgPSB0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0W1widXJsX3NtYWxsXCJdO1xuICAgIGNvbnN0IG1lZGl1bVVybCA9IHRodW1ibmFpbEdlbmVyYXRpb25PYmplY3RbXCJ1cmxfbWVkaXVtXCJdO1xuICAgIGNvbnN0IG1xID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOjM2MHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpXCIpO1xuICAgIGxldCBpbWFnZVRvU2hvdyA9IG1lZGl1bVVybDtcbiAgICBpZiAobXEubWF0Y2hlcykge1xuICAgICAgaW1hZ2VUb1Nob3cgPSBzbWFsbFVybDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1hZ2VUb1Nob3c7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqICAgRW1pdHMgYWN0aW9uIHRvIHZpZXcgaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5WSUVXX0FDVFVBTF9JTUFHRSxcbiAgICAgIHBheUxvYWQ6IHsgLi4udGhpcy5tZXNzYWdlLCAuLi50aGlzLk1lc3NhZ2VEZXRhaWxzIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFRpbWUtU3RhbXAgZm9yIHJlY2VpdmluZyBpbWFnZVxuICAgKlxuICAgKi9cbiAgZ2V0VGltZSgpIHtcbiAgICBsZXQgbXNnU2VudEF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW50QXQ7XG4gICAgbGV0IHRpbWVTdGFtcCA9IG5ldyBEYXRlKG1zZ1NlbnRBdCAqIDEwMDApLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICAgIGhvdXI6IFwibnVtZXJpY1wiLFxuICAgICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGltZVN0YW1wO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgfVxufVxuIl19