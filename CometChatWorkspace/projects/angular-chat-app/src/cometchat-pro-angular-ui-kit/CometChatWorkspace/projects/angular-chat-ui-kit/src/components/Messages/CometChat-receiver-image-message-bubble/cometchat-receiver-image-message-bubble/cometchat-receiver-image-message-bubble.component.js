/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatReceiverImageMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = enums.RECEIVER;
        this.messageAssign = Object.assign({}, this.messageDetails, {
            messageFrom: this.messageFrom,
        });
        this.imageLoader = false;
        this.checkScreenSize = false;
        this.checkReaction = [];
        this.avatar = null;
        this.name = null;
        this.avatarIfGroup = false;
        this.message = this.messageAssign;
        this.imageUrl = "";
        this.timer = null;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
        /**
         * If thumbnail-extension is not present then set default URL
         */
        this.setMessageImageUrl = (/**
         * @return {?}
         */
        () => {
            try {
                /** @type {?} */
                let img = new Image();
                img.src = this.messageDetails.data.url;
                img.onload = (/**
                 * @return {?}
                 */
                () => {
                    this.imageLoader = false;
                    this.imageUrl = img.src;
                });
            }
            catch (error) {
                logger(error);
            }
        });
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
                this.name = this.messageDetails.sender.name;
                this.avatar = this.messageDetails.sender.avatar;
            }
            this.setImage();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    onResize() {
        try {
            this.innerWidth = window.innerWidth;
            if (this.innerWidth >= enums.BREAKPOINT_MIN_WIDTH &&
                this.innerWidth <= enums.BREAKPOINT_MAX_WIDTH) {
                this.checkScreenSize = true;
            }
            else {
                if (this.checkScreenSize === true) {
                    this.setImage();
                }
                this.checkScreenSize = false;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     * @return {?}
     */
    setImage() {
        try {
            this.imageLoader = true;
            if (this.messageDetails.hasOwnProperty(enums.METADATA)) {
                /** @type {?} */
                const metadata = this.messageDetails[enums.METADATA];
                /** @type {?} */
                const injectedObject = metadata[enums.INJECTED];
                if (injectedObject && injectedObject.hasOwnProperty(enums.EXTENSIONS)) {
                    /** @type {?} */
                    const extensionsObject = injectedObject[enums.EXTENSIONS];
                    if (extensionsObject &&
                        extensionsObject.hasOwnProperty(enums.THUMBNAIL_GENERATION)) {
                        /** @type {?} */
                        const thumbnailGenerationObject = extensionsObject[enums.THUMBNAIL_GENERATION];
                        /** @type {?} */
                        const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
                        /** @type {?} */
                        const imageToDownload = this.chooseImage(thumbnailGenerationObject);
                        this.downloadImage(imageToDownload).then((/**
                         * @param {?} response
                         * @return {?}
                         */
                        (response) => {
                            /** @type {?} */
                            let img = new Image();
                            img.src = imageToDownload;
                            img.onload = (/**
                             * @return {?}
                             */
                            () => {
                                this.imageLoader = false;
                                this.imageUrl = img.src;
                                URL.revokeObjectURL(img.src);
                            });
                        }));
                    }
                }
            }
            else {
                this.setMessageImageUrl();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    chooseImage(thumbnailGenerationObject) {
        try {
            /** @type {?} */
            const smallUrl = thumbnailGenerationObject[enums.URL_SMALL];
            /** @type {?} */
            const mediumUrl = thumbnailGenerationObject[enums.URL_MEDIUM];
            /** @type {?} */
            const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
            /** @type {?} */
            let imageToShow = mediumUrl;
            if (mq.matches) {
                imageToShow = smallUrl;
            }
            return imageToShow;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *   Emits action to view image in full screen
     * @return {?}
     */
    open() {
        try {
            this.actionGenerated.emit({
                type: enums.VIEW_ACTUAL_IMAGE,
                payLoad: Object.assign({}, this.message, this.messageDetails),
            });
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
    /**
     * Downloads image from server
     * @param {?} imgUrl
     * @return {?}
     */
    downloadImage(imgUrl) {
        try {
            /** @type {?} */
            const promise = new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const xhr = new XMLHttpRequest();
                xhr.open(enums.GET, imgUrl, true);
                xhr.responseType = enums.BLOB;
                xhr.onload = (/**
                 * @return {?}
                 */
                () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            this.timer = null;
                            resolve(xhr.response);
                        }
                        else if (xhr.status === 403) {
                            this.timer = setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                this.downloadImage(imgUrl)
                                    .then((/**
                                 * @param {?} response
                                 * @return {?}
                                 */
                                (response) => resolve(response)))
                                    .catch((/**
                                 * @param {?} error
                                 * @return {?}
                                 */
                                (error) => reject(error)));
                            }), 800);
                        }
                    }
                    else {
                        reject(xhr.statusText);
                    }
                });
                xhr.onerror = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => reject(new Error("There was a network error.")));
                xhr.ontimeout = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => reject(new Error("There was a timeout error.")));
                xhr.send();
            }));
            return promise;
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatReceiverImageMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-receiver-image-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: messageDetails?.receiverType == GROUP\n    }\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"messageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\" (click)=\"open()\">\n          <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n          <img [src]=\"imageUrl\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [messageDetails]=\"messageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-receipt\n          [messageDetails]=\"messageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-receipt>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [messageDetails]=\"messageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:300px;height:200px;cursor:pointer}.messageImgWrapperStyle img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometChatReceiverImageMessageBubbleComponent.ctorParameters = () => [];
CometChatReceiverImageMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.messageAssign;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.imageLoader;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.innerWidth;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.checkScreenSize;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.imageUrl;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.timer;
    /** @type {?} */
    CometChatReceiverImageMessageBubbleComponent.prototype.GROUP;
    /**
     * If thumbnail-extension is not present then set default URL
     * @type {?}
     */
    CometChatReceiverImageMessageBubbleComponent.prototype.setMessageImageUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU9oRCxNQUFNLE9BQU8sNENBQTRDO0lBeUJ2RDtRQXhCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xFLGdCQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUU3QixrQkFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztRQUNILGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLG9CQUFlLEdB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RUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBNU5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxxMkRBQXVFOzthQUV4RTs7Ozs7NkJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNO3VCQThDTixZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUU7Ozs7SUFsRGpDLHNFQUErQjs7SUFDL0IsbUVBQTRCOztJQUM1QixzRUFBK0I7O0lBQy9CLG9FQUFzQjs7SUFDdEIsdUVBQWtFOztJQUNsRSxtRUFBNkI7O0lBRTdCLHFFQUVHOztJQUNILG1FQUE2Qjs7SUFDN0Isa0VBQVc7O0lBQ1gsdUVBQWlDOztJQUNqQyxxRUFBbUI7O0lBQ25CLDhEQUFjOztJQUNkLDREQUFvQjs7SUFDcEIscUVBQStCOztJQUUvQiwrREFBNkI7O0lBQzdCLGdFQUFjOztJQUNkLDZEQUFhOztJQUViLDZEQUE4Qzs7Ozs7SUE4RjlDLDBFQVdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRSZWNlaXZlckltYWdlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG1lc3NhZ2VGcm9tID0gZW51bXMuUkVDRUlWRVI7XG5cbiAgbWVzc2FnZUFzc2lnbiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubWVzc2FnZURldGFpbHMsIHtcbiAgICBtZXNzYWdlRnJvbTogdGhpcy5tZXNzYWdlRnJvbSxcbiAgfSk7XG4gIGltYWdlTG9hZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGlubmVyV2lkdGg7XG4gIGNoZWNrU2NyZWVuU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uID0gW107XG4gIGF2YXRhciA9IG51bGw7XG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlID0gdGhpcy5tZXNzYWdlQXNzaWduO1xuICBpbWFnZVVybCA9IFwiXCI7XG4gIHRpbWVyID0gbnVsbDtcblxuICBHUk9VUDogU3RyaW5nID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgICAgZW51bXMuUkVBQ1RJT05TXG4gICAgICApO1xuXG4gICAgICAvKipcbiAgICAgICAqICBJZiBHcm91cCB0aGVuIGRpc3BsYXlzIEF2YXRhciBBbmQgTmFtZVxuICAgICAgICovXG4gICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5yZWNlaXZlclR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQKSB7XG4gICAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIuYXZhdGFyO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlubmVyV2lkdGggPj0gZW51bXMuQlJFQUtQT0lOVF9NSU5fV0lEVEggJiZcbiAgICAgICAgdGhpcy5pbm5lcldpZHRoIDw9IGVudW1zLkJSRUFLUE9JTlRfTUFYX1dJRFRIXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jaGVja1NjcmVlblNpemUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tTY3JlZW5TaXplID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aHVtbmFpbC1nZW5lcmF0aW9uIGV4dGVuc2lvbiBpcyBwcmVzZW50IG9yIG5vdCBBbmQgdGhlbiBTZXRzIHRoZSBpbWFnZVxuICAgKi9cbiAgc2V0SW1hZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoZW51bXMuTUVUQURBVEEpKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5tZXNzYWdlRGV0YWlsc1tlbnVtcy5NRVRBREFUQV07XG5cbiAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtlbnVtcy5JTkpFQ1RFRF07XG4gICAgICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5FWFRFTlNJT05TKSkge1xuICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtlbnVtcy5FWFRFTlNJT05TXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBleHRlbnNpb25zT2JqZWN0ICYmXG4gICAgICAgICAgICBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLlRIVU1CTkFJTF9HRU5FUkFUSU9OKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCA9XG4gICAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3RbZW51bXMuVEhVTUJOQUlMX0dFTkVSQVRJT05dO1xuXG4gICAgICAgICAgICBjb25zdCBtcSA9IHdpbmRvdy5tYXRjaE1lZGlhKFxuICAgICAgICAgICAgICBcIihtaW4td2lkdGg6MzYwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweClcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2VUb0Rvd25sb2FkID0gdGhpcy5jaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRJbWFnZShpbWFnZVRvRG93bmxvYWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1nLnNyYyA9IGltYWdlVG9Eb3dubG9hZDtcbiAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlSW1hZ2VVcmwoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGh1bWJuYWlsLWV4dGVuc2lvbiBpcyBub3QgcHJlc2VudCB0aGVuIHNldCBkZWZhdWx0IFVSTFxuICAgKi9cbiAgc2V0TWVzc2FnZUltYWdlVXJsID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcuc3JjID0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBpbWFnZSB1cmwgaS5lIG1lZGl1bS1zaXplIG9yIHNtYWxsLXNpemVcbiAgICogQHBhcmFtXG4gICAqL1xuICBjaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNtYWxsVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtlbnVtcy5VUkxfU01BTExdO1xuICAgICAgY29uc3QgbWVkaXVtVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtlbnVtcy5VUkxfTUVESVVNXTtcbiAgICAgIGNvbnN0IG1xID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOjM2MHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpXCIpO1xuICAgICAgbGV0IGltYWdlVG9TaG93ID0gbWVkaXVtVXJsO1xuICAgICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgICAgaW1hZ2VUb1Nob3cgPSBzbWFsbFVybDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGltYWdlVG9TaG93O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgIEVtaXRzIGFjdGlvbiB0byB2aWV3IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICAgIHBheUxvYWQ6IHsgLi4udGhpcy5tZXNzYWdlLCAuLi50aGlzLm1lc3NhZ2VEZXRhaWxzIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRG93bmxvYWRzIGltYWdlIGZyb20gc2VydmVyXG4gICAqIEBwYXJhbSBpbWdVcmxcbiAgICovXG4gIGRvd25sb2FkSW1hZ2UoaW1nVXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihlbnVtcy5HRVQsIGltZ1VybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBlbnVtcy5CTE9CO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEltYWdlKGltZ1VybClcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoZXZlbnQpID0+XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRoZXJlIHdhcyBhIG5ldHdvcmsgZXJyb3IuXCIpKTtcbiAgICAgICAgeGhyLm9udGltZW91dCA9IChldmVudCkgPT5cbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGhlcmUgd2FzIGEgdGltZW91dCBlcnJvci5cIikpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19