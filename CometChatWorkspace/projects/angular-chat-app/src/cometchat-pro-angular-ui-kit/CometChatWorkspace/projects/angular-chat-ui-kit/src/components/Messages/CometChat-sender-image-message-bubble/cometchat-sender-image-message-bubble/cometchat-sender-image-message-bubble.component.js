/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-sender-image-message-bubble/cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { checkMessageForExtensionsData, logger, } from "../../../../utils/common";
export class CometChatSenderImageMessageBubbleComponent {
    constructor() {
        this.messageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.checkScreenSize = false;
        this.checkReaction = [];
        this.timer = null;
        this.messageFrom = enums.SENDER;
        this.imageLoader = false;
        this.messageAssign = Object.assign({}, this.messageDetails, {
            messageFrom: this.messageFrom,
        });
        this.message = this.messageAssign;
        this.imageUrl = "";
        this.fullScreenView = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.onResize();
            this.setImage();
            this.checkReaction = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
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
     * Checks if thumnail-generation extension is present And then Sets the image
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
                        const imageToDownload = this.chooseImage(thumbnailGenerationObject);
                        this.downloadImage(imageToDownload)
                            .then((/**
                         * @param {?} response
                         * @return {?}
                         */
                        (response) => {
                            this.img = new Image();
                            this.img.src = imageToDownload;
                            this.img.onload = (/**
                             * @return {?}
                             */
                            () => {
                                this.imageLoader = false;
                                this.imageUrl = this.img.src;
                                URL.revokeObjectURL(this.img.src);
                            });
                        }))
                            .catch((/**
                         * @param {?} err
                         * @return {?}
                         */
                        (err) => {
                            logger(err);
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
     * Sets image url ie. medium or small-size image
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
     * If thumnail-generation extension is not present then sets default URL
     * @return {?}
     */
    setMessageImageUrl() {
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
    }
    /**
     * Emits action to open image in full-screen view
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
                            resolve(imgUrl);
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
                                (response) => resolve(imgUrl)))
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
CometChatSenderImageMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-image-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [messageDetails]=\"messageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageImgWrapper\" (click)=\"open()\">\n      <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n      <img [src]=\"imageUrl\" loading=\"lazy\" />\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [messageDetails]=\"messageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [messageDetails]=\"messageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-receipt\n      [messageDetails]=\"messageDetails\"\n    ></cometchat-read-receipt>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageImgWrapper{display:inline-block;align-self:flex-end;max-width:300px;height:200px;cursor:pointer;flex-shrink:0;width:-webkit-fill-available}.messageImgWrapper img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{display:flex;align-self:flex-end}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}@media (min-width:320px) and (max-width:767px){.messageImgWrapper{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometChatSenderImageMessageBubbleComponent.ctorParameters = () => [];
CometChatSenderImageMessageBubbleComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.innerWidth;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.checkScreenSize;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.timer;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.imageLoader;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.messageAssign;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.imageUrl;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.fullScreenView;
    /** @type {?} */
    CometChatSenderImageMessageBubbleComponent.prototype.img;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtc2VuZGVyLWltYWdlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsTUFBTSxHQUNQLE1BQU0sMEJBQTBCLENBQUM7QUFPbEMsTUFBTSxPQUFPLDBDQUEwQztJQXdCckQ7UUF2QlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFHckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsZ0JBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLGtCQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsWUFBTyxHQUFHLElB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Qjs7SUFFN0IsbUVBRUc7O0lBRUgsNkRBQTZCOztJQUM3Qiw4REFBYzs7SUFDZCxvRUFBdUI7O0lBQ3ZCLHlEQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2VuZGVyLWltYWdlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRTZW5kZXJJbWFnZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGlubmVyV2lkdGg7XG4gIGNoZWNrU2NyZWVuU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjaGVja1JlYWN0aW9uID0gW107XG5cbiAgdGltZXIgPSBudWxsO1xuICBtZXNzYWdlRnJvbSA9IGVudW1zLlNFTkRFUjtcbiAgaW1hZ2VMb2FkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlQXNzaWduID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tZXNzYWdlRGV0YWlscywge1xuICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICB9KTtcblxuICBtZXNzYWdlID0gdGhpcy5tZXNzYWdlQXNzaWduO1xuICBpbWFnZVVybCA9IFwiXCI7XG4gIGZ1bGxTY3JlZW5WaWV3ID0gZmFsc2U7XG4gIGltZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgICB0aGlzLmNoZWNrUmVhY3Rpb24gPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgICAgZW51bXMuUkVBQ1RJT05TXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlubmVyV2lkdGggPj0gZW51bXMuQlJFQUtQT0lOVF9NSU5fV0lEVEggJiZcbiAgICAgICAgdGhpcy5pbm5lcldpZHRoIDw9IGVudW1zLkJSRUFLUE9JTlRfTUFYX1dJRFRIXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jaGVja1NjcmVlblNpemUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tTY3JlZW5TaXplID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aHVtbmFpbC1nZW5lcmF0aW9uIGV4dGVuc2lvbiBpcyBwcmVzZW50IEFuZCB0aGVuIFNldHMgdGhlIGltYWdlXG4gICAqL1xuICBzZXRJbWFnZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbWFnZUxvYWRlciA9IHRydWU7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5NRVRBREFUQSkpIHtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLm1lc3NhZ2VEZXRhaWxzW2VudW1zLk1FVEFEQVRBXTtcbiAgICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtlbnVtcy5JTkpFQ1RFRF07XG4gICAgICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShlbnVtcy5FWFRFTlNJT05TKSkge1xuICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtlbnVtcy5FWFRFTlNJT05TXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBleHRlbnNpb25zT2JqZWN0ICYmXG4gICAgICAgICAgICBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KGVudW1zLlRIVU1CTkFJTF9HRU5FUkFUSU9OKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCA9XG4gICAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3RbZW51bXMuVEhVTUJOQUlMX0dFTkVSQVRJT05dO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VUb0Rvd25sb2FkID0gdGhpcy5jaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRJbWFnZShpbWFnZVRvRG93bmxvYWQpXG4gICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWcuc3JjID0gaW1hZ2VUb0Rvd25sb2FkO1xuICAgICAgICAgICAgICAgIHRoaXMuaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VVcmwgPSB0aGlzLmltZy5zcmM7XG4gICAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuaW1nLnNyYyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dnZXIoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2VJbWFnZVVybCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIHVybCBpZS4gbWVkaXVtIG9yIHNtYWxsLXNpemUgaW1hZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBjaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNtYWxsVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtlbnVtcy5VUkxfU01BTExdO1xuICAgICAgY29uc3QgbWVkaXVtVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtlbnVtcy5VUkxfTUVESVVNXTtcblxuICAgICAgY29uc3QgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6MzYwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweClcIik7XG5cbiAgICAgIGxldCBpbWFnZVRvU2hvdyA9IG1lZGl1bVVybDtcbiAgICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICAgIGltYWdlVG9TaG93ID0gc21hbGxVcmw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbWFnZVRvU2hvdztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGh1bW5haWwtZ2VuZXJhdGlvbiBleHRlbnNpb24gaXMgbm90IHByZXNlbnQgdGhlbiBzZXRzIGRlZmF1bHQgVVJMXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0TWVzc2FnZUltYWdlVXJsKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcuc3JjID0gdGhpcy5tZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhY3Rpb24gdG8gb3BlbiBpbWFnZSBpbiBmdWxsLXNjcmVlbiB2aWV3XG4gICAqL1xuICBvcGVuKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICAgIHBheUxvYWQ6IHsgLi4udGhpcy5tZXNzYWdlLCAuLi50aGlzLm1lc3NhZ2VEZXRhaWxzIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoYWN0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRG93bmxvYWRzIGltYWdlIGZyb20gc2VydmVyXG4gICAqIEBwYXJhbSBpbWdVcmxcbiAgICovXG4gIGRvd25sb2FkSW1hZ2UoaW1nVXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihlbnVtcy5HRVQsIGltZ1VybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBlbnVtcy5CTE9CO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICByZXNvbHZlKGltZ1VybCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEltYWdlKGltZ1VybClcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzb2x2ZShpbWdVcmwpKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgICAgICAgIH0sIDgwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gKGV2ZW50KSA9PlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaGVyZSB3YXMgYSBuZXR3b3JrIGVycm9yLlwiKSk7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoZXZlbnQpID0+XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRoZXJlIHdhcyBhIHRpbWVvdXQgZXJyb3IuXCIpKTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==