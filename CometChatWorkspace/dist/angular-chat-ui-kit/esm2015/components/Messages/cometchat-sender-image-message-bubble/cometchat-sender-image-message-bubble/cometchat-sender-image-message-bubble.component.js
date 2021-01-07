/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import * as enums from "../../../utils/enums";
import { checkMessageForExtensionsData } from "../../../utils/common";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatSenderImageMessageBubbleComponent {
    constructor() {
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.checkScreenSize = false;
        this.checkReaction = false;
        this.timer = null;
        this.messageFrom = "sender";
        this.imageLoader = false;
        this.messageAssign = Object.assign({}, this.MessageDetails, {
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
        this.onResize();
        this.setImage();
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
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
     * Checks if thumnail-generation extension is present And then Sets the image
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
     * Sets image url ie. medium or small-size image
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
     * If thumnail-generation extension is not present
     * @return {?}
     */
    setMessageImageUrl() {
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
    }
    /**
     * Emits action to open image in full-screen view
     *
     * @return {?}
     */
    open() {
        this.actionGenerated.emit({
            type: enums.VIEW_ACTUAL_IMAGE,
            payLoad: Object.assign({}, this.message, this.MessageDetails),
        });
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
CometchatSenderImageMessageBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-sender-image-message-bubble",
                template: "<div class=\"messageContainerStyle\">\n  <cometchat-message-actions\n    class=\"tool\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <div class=\"messageImgWrapper\" (click)=\"open()\">\n      <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n      <img [src]=\"imageUrl\" loading=\"lazy\" />\n    </div>\n  </div>\n  <cometchat-message-reactions\n    *ngIf=\"checkReaction\"\n    [MessageDetails]=\"MessageDetails\"\n    [loggedInUser]=\"loggedInUser\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-message-reactions>\n  <div class=\"messageInfoWrapperStyle\">\n    <!--ReplyCount-->\n    <cometchat-threaded-message-reply-count\n      *ngIf=\"showReplyCount\"\n      [MessageDetails]=\"MessageDetails\"\n      (actionGenerated)=\"actionHandler($event)\"\n    >\n    </cometchat-threaded-message-reply-count>\n    <cometchat-read-reciept\n      [MessageDetails]=\"MessageDetails\"\n    ></cometchat-read-reciept>\n  </div>\n</div>\n",
                styles: [".messageContainerStyle{align-self:flex-end;margin-bottom:16px;padding-left:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:right}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-end;display:flex}.messageImgWrapper{display:inline-block;align-self:flex-end;width:300px;height:200px;cursor:pointer;flex-shrink:0}.messageImgWrapper img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{display:flex;align-self:flex-end}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}@media (min-width:320px) and (max-width:767px){.messageImgWrapper{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
            }] }
];
/** @nocollapse */
CometchatSenderImageMessageBubbleComponent.ctorParameters = () => [];
CometchatSenderImageMessageBubbleComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    showToolTip: [{ type: Input }],
    showReplyCount: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    onResize: [{ type: HostListener, args: ["window:resize", [],] }]
};
if (false) {
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.innerWidth;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.checkScreenSize;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.timer;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.imageLoader;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.messageAssign;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.imageUrl;
    /** @type {?} */
    CometchatSenderImageMessageBubbleComponent.prototype.fullScreenView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtc2VuZGVyLWltYWdlLW1lc3NhZ2UtYnViYmxlL2NvbWV0Y2hhdC1zZW5kZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sMENBQTBDO0lBdUJyRDtRQXRCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUdyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixnQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixrQkFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMs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R0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzFCLENBQUMsQ0FBQSxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBTUQsSUFBSTtRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsaUJBQWlCO1lBQzdCLE9BQU8sb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBSyxJQUFJLENBQUMsY0FBYyxDQUFFO1NBQ3JELENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUtELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQXZJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsMm1DQUFxRTs7YUFFdEU7Ozs7OzZCQUVFLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBRUwsTUFBTTt1QkFnQ04sWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFOzs7O0lBckNqQyxvRUFBK0I7O0lBQy9CLGlFQUE0Qjs7SUFDNUIsb0VBQStCOztJQUMvQixrRUFBc0I7O0lBRXRCLHFFQUFrRTs7SUFDbEUsZ0VBQVc7O0lBQ1gscUVBQWlDOztJQUNqQyxtRUFBK0I7O0lBRS9CLDJEQUFhOztJQUNiLGlFQUF1Qjs7SUFDdkIsaUVBQTZCOztJQUU3QixtRUFFRzs7SUFFSCw2REFBNkI7O0lBQzdCLDhEQUFjOztJQUNkLG9FQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXNlbmRlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1zZW5kZXItaW1hZ2UtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1zZW5kZXItaW1hZ2UtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0U2VuZGVySW1hZ2VNZXNzYWdlQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBzaG93VG9vbFRpcCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dSZXBseUNvdW50ID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBpbm5lcldpZHRoO1xuICBjaGVja1NjcmVlblNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHRpbWVyID0gbnVsbDtcbiAgbWVzc2FnZUZyb20gPSBcInNlbmRlclwiO1xuICBpbWFnZUxvYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2VBc3NpZ24gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gIH0pO1xuXG4gIG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VBc3NpZ247XG4gIGltYWdlVXJsID0gXCJcIjtcbiAgZnVsbFNjcmVlblZpZXcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2hlY2tTY3JlZW5TaXplID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aHVtbmFpbC1nZW5lcmF0aW9uIGV4dGVuc2lvbiBpcyBwcmVzZW50IEFuZCB0aGVuIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqL1xuICBzZXRJbWFnZSgpIHtcbiAgICB0aGlzLmltYWdlTG9hZGVyID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGE7XG4gICAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zT2JqZWN0ID0gaW5qZWN0ZWRPYmplY3RbXCJleHRlbnNpb25zXCJdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdCAmJlxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoXCJ0aHVtYm5haWwtZ2VuZXJhdGlvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCB0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0ID1cbiAgICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3RbXCJ0aHVtYm5haWwtZ2VuZXJhdGlvblwiXTtcbiAgICAgICAgICBjb25zdCBpbWFnZVRvU2hvdyA9IHRoaXMuY2hvb3NlSW1hZ2UodGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCk7XG4gICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVRvU2hvdztcbiAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRNZXNzYWdlSW1hZ2VVcmwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpbWFnZSB1cmwgaWUuIG1lZGl1bSBvciBzbWFsbC1zaXplIGltYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2hvb3NlSW1hZ2UodGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCkge1xuICAgIGNvbnN0IHNtYWxsVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtcInVybF9zbWFsbFwiXTtcbiAgICBjb25zdCBtZWRpdW1VcmwgPSB0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0W1widXJsX21lZGl1bVwiXTtcblxuICAgIGNvbnN0IG1xID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOjM2MHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpXCIpO1xuXG4gICAgbGV0IGltYWdlVG9TaG93ID0gbWVkaXVtVXJsO1xuICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICBpbWFnZVRvU2hvdyA9IHNtYWxsVXJsO1xuICAgIH1cblxuICAgIHJldHVybiBpbWFnZVRvU2hvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aHVtbmFpbC1nZW5lcmF0aW9uIGV4dGVuc2lvbiBpcyBub3QgcHJlc2VudFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldE1lc3NhZ2VJbWFnZVVybCgpIHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS51cmw7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWcuc3JjO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYWN0aW9uIHRvIG9wZW4gaW1hZ2UgaW4gZnVsbC1zY3JlZW4gdmlld1xuICAgKlxuICAgKi9cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgcGF5TG9hZDogeyAuLi50aGlzLm1lc3NhZ2UsIC4uLnRoaXMuTWVzc2FnZURldGFpbHMgfSxcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=