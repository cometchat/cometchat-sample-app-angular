/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import * as enums from "../../../utils/enums";
var CometchatReceiverImageMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverImageMessageBubbleComponent() {
        var _this = this;
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
        function () {
            /** @type {?} */
            var img = new Image();
            img.src = _this.MessageDetails.data.url;
            img.onload = (/**
             * @return {?}
             */
            function () {
                _this.imageLoader = false;
                _this.imageUrl = img.src;
            });
        });
    }
    /**
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, "reactions");
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.setImage();
    };
    /**
     * Checks when window size is changed in realtime
     */
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.onResize = /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    function () {
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
    };
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     */
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.setImage = /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.imageLoader = true;
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            /** @type {?} */
            var metadata = this.MessageDetails.metadata;
            /** @type {?} */
            var injectedObject = metadata["@injected"];
            if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
                /** @type {?} */
                var extensionsObject = injectedObject["extensions"];
                if (extensionsObject &&
                    extensionsObject.hasOwnProperty("thumbnail-generation")) {
                    /** @type {?} */
                    var thumbnailGenerationObject = extensionsObject["thumbnail-generation"];
                    /** @type {?} */
                    var mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
                    /** @type {?} */
                    var imageToShow = this.chooseImage(thumbnailGenerationObject);
                    /** @type {?} */
                    var img_1 = new Image();
                    img_1.src = imageToShow;
                    img_1.onload = (/**
                     * @return {?}
                     */
                    function () {
                        _this.imageLoader = false;
                        _this.imageUrl = img_1.src;
                        URL.revokeObjectURL(img_1.src);
                    });
                }
            }
        }
        else {
            this.setMessageImageUrl();
        }
    };
    /**
     * Sets image url i.e medium-size or small-size
     * @param
     */
    /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.chooseImage = /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    function (thumbnailGenerationObject) {
        /** @type {?} */
        var smallUrl = thumbnailGenerationObject["url_small"];
        /** @type {?} */
        var mediumUrl = thumbnailGenerationObject["url_medium"];
        /** @type {?} */
        var mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
        /** @type {?} */
        var imageToShow = mediumUrl;
        if (mq.matches) {
            imageToShow = smallUrl;
        }
        return imageToShow;
    };
    /**
     *
     *   Emits action to view image in full screen
     */
    /**
     *
     *   Emits action to view image in full screen
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.open = /**
     *
     *   Emits action to view image in full screen
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.VIEW_ACTUAL_IMAGE,
            payLoad: tslib_1.__assign({}, this.message, this.MessageDetails),
        });
    };
    /**
     * Set Time-Stamp for receiving image
     *
     */
    /**
     * Set Time-Stamp for receiving image
     *
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.getTime = /**
     * Set Time-Stamp for receiving image
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var msgSentAt = this.MessageDetails.sentAt;
        /** @type {?} */
        var timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeStamp;
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
    CometchatReceiverImageMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverImageMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-image-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\" (click)=\"open()\">\n          <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n          <img [src]=\"imageUrl\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:300px;height:200px;cursor:pointer}.messageImgWrapperStyle img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverImageMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverImageMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        onResize: [{ type: HostListener, args: ["window:resize", [],] }]
    };
    return CometchatReceiverImageMessageBubbleComponent;
}());
export { CometchatReceiverImageMessageBubbleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBRTlDO0lBK0JFO1FBQUEsaUJBQWdCO1FBekJQLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXJCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEUsZ0JBQVcsR0FBRyxVQUFVLENBQUM7UUFFekIsa0JBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7UUFDSCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixXQUFNLEdBQUcsSUFBSSxDQUFDOztRQUVkLFNBQUksR0FBVyxJQUFJLENBQUM7OztRQUdwQixr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O1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQWhLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztvQkFDbkQsdTJEQUF1RTs7aUJBRXhFOzs7OztpQ0FFRSxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07MkJBMkNOLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7SUE0R25DLG1EQUFDO0NBQUEsQUFqS0QsSUFpS0M7U0E1SlksNENBQTRDOzs7SUFDdkQsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUN0Qix1RUFBa0U7O0lBQ2xFLG1FQUF5Qjs7SUFFekIscUVBRUc7O0lBQ0gsbUVBQTZCOztJQUM3QixrRUFBVzs7SUFDWCx1RUFBaUM7O0lBQ2pDLHFFQUErQjs7SUFFL0IsOERBQWM7O0lBRWQsNERBQW9COztJQUdwQixxRUFBK0I7O0lBRS9CLCtEQUE2Qjs7SUFDN0IsZ0VBQWM7Ozs7OztJQTZFZCwwRUFPRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRSZWNlaXZlckltYWdlTWVzc2FnZUJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1Rvb2xUaXAgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmVwbHlDb3VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG1lc3NhZ2VGcm9tID0gXCJyZWNlaXZlclwiO1xuXG4gIG1lc3NhZ2VBc3NpZ24gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLk1lc3NhZ2VEZXRhaWxzLCB7XG4gICAgbWVzc2FnZUZyb206IHRoaXMubWVzc2FnZUZyb20sXG4gIH0pO1xuICBpbWFnZUxvYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBpbm5lcldpZHRoO1xuICBjaGVja1NjcmVlblNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2hlY2tSZWFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGF2YXRhciA9IG51bGw7XG4gIC8vU2V0cyBVc2VybmFtZSBvZiBBdmF0YXJcbiAgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgLy9JZiBHcm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgLy9JZiBHcm91cCB0aGVuIG9ubHkgc2hvdyBhdmF0YXJcbiAgYXZhdGFySWZHcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VBc3NpZ247XG4gIGltYWdlVXJsID0gXCJcIjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1JlYWN0aW9uID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgICAgXCJyZWFjdGlvbnNcIlxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiAgSWYgR3JvdXAgdGhlbiBkaXNwbGF5cyBBdmF0YXIgQW5kIE5hbWVcbiAgICAgKi9cbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5yZWNlaXZlclR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgdGhpcy5hdmF0YXJJZkdyb3VwID0gdHJ1ZTtcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLm5hbWU7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLmF2YXRhcjtcbiAgICB9XG4gICAgdGhpcy5zZXRJbWFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWQgaW4gcmVhbHRpbWVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIsIFtdKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBpZiAodGhpcy5pbm5lcldpZHRoID49IFwiMzIwXCIgJiYgdGhpcy5pbm5lcldpZHRoIDw9IFwiNzY3XCIpIHtcbiAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2hlY2tTY3JlZW5TaXplID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaXplID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGh1bW5haWwtZ2VuZXJhdGlvbiBleHRlbnNpb24gaXMgcHJlc2VudCBvciBub3QgQW5kIHRoZW4gU2V0cyB0aGUgaW1hZ2VcbiAgICpcbiAgICovXG4gIHNldEltYWdlKCkge1xuICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSB0cnVlO1xuICAgIGlmICh0aGlzLk1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5NZXNzYWdlRGV0YWlscy5tZXRhZGF0YTtcblxuICAgICAgY29uc3QgaW5qZWN0ZWRPYmplY3QgPSBtZXRhZGF0YVtcIkBpbmplY3RlZFwiXTtcbiAgICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W1wiZXh0ZW5zaW9uc1wiXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGV4dGVuc2lvbnNPYmplY3QgJiZcbiAgICAgICAgICBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KFwidGh1bWJuYWlsLWdlbmVyYXRpb25cIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCA9XG4gICAgICAgICAgICBleHRlbnNpb25zT2JqZWN0W1widGh1bWJuYWlsLWdlbmVyYXRpb25cIl07XG5cbiAgICAgICAgICBjb25zdCBtcSA9IHdpbmRvdy5tYXRjaE1lZGlhKFxuICAgICAgICAgICAgXCIobWluLXdpZHRoOjM2MHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpXCJcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgaW1hZ2VUb1Nob3cgPSB0aGlzLmNob29zZUltYWdlKHRodW1ibmFpbEdlbmVyYXRpb25PYmplY3QpO1xuICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWcuc3JjID0gaW1hZ2VUb1Nob3c7XG4gICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWcuc3JjO1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0TWVzc2FnZUltYWdlVXJsKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBJZiB0aHVtYm5haWwtZXh0ZW5zaW9uIGlzIG5vdCBwcmVzZW50IHRoZW4gdGhpcyB3b3Jrc1xuICAgKlxuICAgKi9cbiAgc2V0TWVzc2FnZUltYWdlVXJsID0gKCkgPT4ge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kYXRhLnVybDtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbWFnZUxvYWRlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZVVybCA9IGltZy5zcmM7XG4gICAgfTtcbiAgfTtcbiAgLyoqXG4gICAqIFNldHMgaW1hZ2UgdXJsIGkuZSBtZWRpdW0tc2l6ZSBvciBzbWFsbC1zaXplXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2hvb3NlSW1hZ2UodGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdCkge1xuICAgIGNvbnN0IHNtYWxsVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtcInVybF9zbWFsbFwiXTtcbiAgICBjb25zdCBtZWRpdW1VcmwgPSB0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0W1widXJsX21lZGl1bVwiXTtcbiAgICBjb25zdCBtcSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDozNjBweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KVwiKTtcbiAgICBsZXQgaW1hZ2VUb1Nob3cgPSBtZWRpdW1Vcmw7XG4gICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgIGltYWdlVG9TaG93ID0gc21hbGxVcmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlVG9TaG93O1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiAgIEVtaXRzIGFjdGlvbiB0byB2aWV3IGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuVklFV19BQ1RVQUxfSU1BR0UsXG4gICAgICBwYXlMb2FkOiB7IC4uLnRoaXMubWVzc2FnZSwgLi4udGhpcy5NZXNzYWdlRGV0YWlscyB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBUaW1lLVN0YW1wIGZvciByZWNlaXZpbmcgaW1hZ2VcbiAgICpcbiAgICovXG4gIGdldFRpbWUoKSB7XG4gICAgbGV0IG1zZ1NlbnRBdCA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VudEF0O1xuICAgIGxldCB0aW1lU3RhbXAgPSBuZXcgRGF0ZShtc2dTZW50QXQgKiAxMDAwKS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXG4gICAgICBob3VyMTI6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRpbWVTdGFtcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCB0aGUgYWN0aW9ucyBlbWl0dGVkIGJ5IHRoZSBjaGlsZCBjb21wb25lbnRzIHRoYXQgbWFrZSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IGFjdGlvblxuICAgKi9cbiAgYWN0aW9uSGFuZGxlcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KGFjdGlvbik7XG4gIH1cbn1cbiJdfQ==