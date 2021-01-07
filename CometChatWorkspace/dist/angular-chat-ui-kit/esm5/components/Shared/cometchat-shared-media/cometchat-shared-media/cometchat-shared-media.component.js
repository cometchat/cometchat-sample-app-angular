/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/cometchat-shared-media/cometchat-shared-media/cometchat-shared-media.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatSharedMediaComponent = /** @class */ (function () {
    function CometchatSharedMediaComponent() {
        this.type = null;
        this.item = null;
        //Sets type of media message to be fetched
        this.messageType = "image";
        //To get all the media message that user requests
        this.messageList = [];
        this.mediaMessageListenerId = "messages_" + new Date().getTime();
        this.mediaMessageRequest = null;
        //If No speciifc type of media message is sent/received
        this.checkMediaMessage = false;
        this.scrollVariable = 0;
        this.imageClick = true;
        this.videoClick = false;
        this.docsClick = false;
        this.SHARED_MEDIA = STRING_MESSAGES.SHARED_MEDIA;
        this.PHOTOS = STRING_MESSAGES.PHOTOS;
        this.VIDEOS = STRING_MESSAGES.VIDEOS;
        this.DOCUMENT = STRING_MESSAGES.DOCUMENT;
    }
    /**
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.displaySharedMedia = this.mediaMessageRequestBuilder(this.item, this.type, this.messageType);
        this.getMessages(true);
        this.addMediaMessageEventListeners(this.messageUpdated);
    };
    /**
     * Removing Listeners
     */
    /**
     * Removing Listeners
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.ngOnDestroy = /**
     * Removing Listeners
     * @return {?}
     */
    function () {
        CometChat.removeMessageListener(this.mediaMessageListenerId);
    };
    /**
     * Builds the user request
     */
    /**
     * Builds the user request
     * @param {?} item
     * @param {?} type
     * @param {?} messageType
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.mediaMessageRequestBuilder = /**
     * Builds the user request
     * @param {?} item
     * @param {?} type
     * @param {?} messageType
     * @return {?}
     */
    function (item, type, messageType) {
        if (type === "user") {
            this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
                .setUID(item.uid)
                .setLimit(10)
                .setCategory("message")
                .setType(messageType)
                .build();
        }
        else {
            this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
                .setGUID(item.guid)
                .setLimit(10)
                .setCategory("message")
                .setType(messageType)
                .build();
        }
    };
    /**
     * Listener To Receive Media Messages in Real Time
     *  @param
     */
    /**
     * Listener To Receive Media Messages in Real Time
     * @param {?} callback
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.addMediaMessageEventListeners = /**
     * Listener To Receive Media Messages in Real Time
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        CometChat.addMessageListener(this.mediaMessageListenerId, new CometChat.MessageListener({
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            function (mediaMessage) {
                callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
            }),
            onMessageDeleted: (/**
             * @param {?} deletedMessage
             * @return {?}
             */
            function (deletedMessage) {
                callback(enums.MESSAGE_DELETED, deletedMessage);
            }),
        }));
    };
    /**
     * CallBack for listeners
     */
    /**
     * CallBack for listeners
     * @param {?} key
     * @param {?} message
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.messageUpdated = /**
     * CallBack for listeners
     * @param {?} key
     * @param {?} message
     * @return {?}
     */
    function (key, message) {
        switch (key) {
            case enums.MESSAGE_DELETED:
                this.messageDeleted(message);
                break;
            case enums.MEDIA_MESSAGE_RECEIVED:
                this.messageReceived(message);
                break;
            default:
                break;
        }
    };
    /**
     * If User Deletes Message
     * @param
     */
    /**
     * If User Deletes Message
     * @param {?} deletedMessage
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.messageDeleted = /**
     * If User Deletes Message
     * @param {?} deletedMessage
     * @return {?}
     */
    function (deletedMessage) {
        /** @type {?} */
        var messageType = deletedMessage.data.type;
        if (this.type === "group" &&
            deletedMessage.getReceiverType() === "group" &&
            deletedMessage.getReceiver().guid === this.item.guid &&
            messageType === this.messageType) {
            /** @type {?} */
            var messageList = tslib_1.__spread(this.messageList);
            /** @type {?} */
            var filteredMessages = messageList.filter((/**
             * @param {?} message
             * @return {?}
             */
            function (message) { return message.id !== deletedMessage.id; }));
            this.messageList = filteredMessages;
            this.scrolltoBottom = false;
        }
    };
    /**
     * When a message is recieved
     * @param
     */
    /**
     * When a message is recieved
     * @param {?} message
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.messageReceived = /**
     * When a message is recieved
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var messageType = message.data.type;
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiver().guid === this.item.guid &&
            messageType === this.messageType) {
            /** @type {?} */
            var messages = tslib_1.__spread(this.messageList);
            messages = messages.concat(message);
            this.messageList = messages;
            this.scrolltoBottom = true;
        }
    };
    /**
     *   Gets the Media Message that are displayed
     * @param
     */
    /**
     *   Gets the Media Message that are displayed
     * @param {?=} scrollToBottom
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.getMessages = /**
     *   Gets the Media Message that are displayed
     * @param {?=} scrollToBottom
     * @return {?}
     */
    function (scrollToBottom) {
        var _this = this;
        if (scrollToBottom === void 0) { scrollToBottom = false; }
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
            _this.fetchPreviousMessages()
                .then((/**
             * @param {?} messages
             * @return {?}
             */
            function (messages) {
                /** @type {?} */
                var messageList = tslib_1.__spread(messages, _this.messageList);
                if (messageList.length === 0) {
                    _this.checkMediaMessage = true;
                    _this.displayMessage = STRING_MESSAGES.NO_RECORDS_FOUND;
                }
                if (scrollToBottom) {
                    _this.messageList = messageList;
                    _this.scrollToBottom();
                }
                else {
                    //No Need for below actions if there is nothing to prepend
                    if (messages.length !== 0) {
                        /** @type {?} */
                        var prevScrollHeight_1 = _this.mediaWindow.nativeElement
                            .scrollHeight;
                        _this.messageList = messageList;
                        // this.prependMessages(messages);
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.scrollVariable =
                                _this.mediaWindow.nativeElement.scrollTop +
                                    _this.mediaWindow.nativeElement.scrollHeight -
                                    prevScrollHeight_1;
                        }));
                    }
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                //TODO Handle the erros in contact list.
                console.error("[SharedMediaView] getMessages fetchPrevious error", error);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[SharedMediaView] getMessages getLoggedInUser error", error);
        }));
    };
    /**
     * Fetches All the previous Messages
     */
    /**
     * Fetches All the previous Messages
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.fetchPreviousMessages = /**
     * Fetches All the previous Messages
     * @return {?}
     */
    function () {
        return this.mediaMessageRequest.fetchPrevious();
    };
    /**
     * Scrolls to Bottom of Chat Window
     */
    /**
     * Scrolls to Bottom of Chat Window
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.scrollToBottom = /**
     * Scrolls to Bottom of Chat Window
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.scrollVariable =
                _this.mediaWindow.nativeElement.scrollHeight -
                    _this.mediaWindow.nativeElement.clientHeight;
        }));
    };
    /**
     * Handles the scroll
     * @param
     */
    /**
     * Handles the scroll
     * @param {?} e
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.handleScroll = /**
     * Handles the scroll
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var top = Math.round(e.currentTarget.scrollTop) === 0;
        if (top && this.messageList.length) {
            this.getMessages();
        }
    };
    /**
     * Sets the type of message i.e image,video or file
     * @param
     */
    /**
     * Sets the type of message i.e image,video or file
     * @param {?} type
     * @return {?}
     */
    CometchatSharedMediaComponent.prototype.mediaClickHandler = /**
     * Sets the type of message i.e image,video or file
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === "image") {
            this.imageClick = true;
            this.videoClick = false;
            this.docsClick = false;
        }
        else if (type === "video") {
            this.imageClick = false;
            this.videoClick = true;
            this.docsClick = false;
        }
        else if (type === "file") {
            this.imageClick = false;
            this.videoClick = false;
            this.docsClick = true;
        }
        this.checkMediaMessage = false;
        this.messageList = [];
        this.messageType = type;
        this.displaySharedMedia = this.mediaMessageRequestBuilder(this.item, this.type, this.messageType);
        this.getMessages(true);
    };
    CometchatSharedMediaComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-shared-media",
                    template: "<div class=\"sectionStyle\">\n  <h6 class=\"sectionHeaderStyle\">{{ SHARED_MEDIA }}</h6>\n  <div class=\"sectionContentStyle\">\n    <div class=\"mediaBtnStyle\">\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('image')\"\n        [ngClass]=\"{\n          buttonActiveStyle: imageClick\n        }\"\n        >{{ PHOTOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('video')\"\n        [ngClass]=\"{\n          buttonActiveStyle: videoClick\n        }\"\n        >{{ VIDEOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('file')\"\n        [ngClass]=\"{\n          buttonActiveStyle: docsClick\n        }\"\n      >\n        {{ DOCUMENT }}\n      </span>\n    </div>\n\n    <div\n      class=\"mediaItemStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #mediaContainer\n      [scrollTop]=\"scrollVariable\"\n    >\n      <div class=\"mediaContainer\" *ngFor=\"let msg of messageList\">\n        <div [ngSwitch]=\"msg.type\" *ngIf=\"msg.data.url\">\n          <div *ngSwitchCase=\"'image'\">\n            <div class=\"itemStylePhotos\">\n              <img [src]=\"msg.data.url\" loading=\"lazy\" />\n            </div>\n          </div>\n\n          <div *ngSwitchCase=\"'video'\">\n            <div class=\"itemStyleVideo\">\n              <video [src]=\"msg.data.url\"></video>\n            </div>\n          </div>\n          <div *ngSwitchCase=\"'file'\">\n            <div class=\"itemStyleDocs file\">\n              <a [href]=\"msg.data.url\" target=\"_blank\">\n                {{ msg.data.attachments[0].name }}\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"checkMediaMessage\">\n        {{ displayMessage }}\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".sectionStyle{width:100%;height:calc(100% - 50px)}sectionStyle *{box-sizing:border-box}.sectionStyle ::-webkit-scrollbar{width:8px;height:4px}.sectionStyle ::-webkit-scrollbar-track{background:#ffffff00}.sectionStyle ::-webkit-scrollbar-thumb{background:#ccc}.sectionStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0;display:flex;flex-direction:column;height:calc(100% - 20px)}.mediaBtnStyle{border-radius:8px;background-color:rgba(20,20,20,.08);width:100%;padding:2px;margin:6px 0;clear:both}.buttonStyle{width:33.33%;font-size:13px;font-weight:500;line-height:18px;padding:5px;position:relative;text-align:center;float:left;cursor:pointer}.buttonActiveStyle{background-color:#fff;box-shadow:rgba(20,20,20,.04) 0 3px 1px,rgba(20,20,20,.12) 0 3px 8px;border-radius:7px}.buttonStyle::before{position:absolute;display:block;width:2px;height:16px;background-color:rgba(20,20,20,.12);right:-2px;top:6px}.buttonStyle:last-of-type::before{display:none}.mediaItemStyle{height:calc(100% - 45px);overflow-y:auto;overflow-x:hidden;display:flex;flex-wrap:wrap;font-size:14px;width:auto}.itemStylePhotos{height:120px;width:130px;background-color:rgba(20,20,20,.08);margin:.5rem;text-align:center;flex:1 0 auto}.itemStylePhotos>img{display:block;width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.itemStyleVideo{margin:.5rem;text-align:center;flex:1 0 auto;background-color:rgba(20,20,20,.08)}.itemStyleVideo>video{height:120px;width:130px;margin:auto}.itemStyleDocs{background-color:rgba(20,20,20,.08)}.itemStyleDocs>a{max-width:100%;max-height:100%;margin:auto;display:inline-block;padding:10px 10px 10px 35px;font-size:13px;color:#141414;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path fill=\"%2339f\" d=\"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>') 0 center no-repeat;white-space:pre-wrap;word-wrap:break-word;text-align:left;text-decoration:none!important}.itemStyleDocs>a:hover,.itemStyleDocs>a:visited{color:#141414}.mediaContainer{height:130px;display:flex;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    CometchatSharedMediaComponent.ctorParameters = function () { return []; };
    CometchatSharedMediaComponent.propDecorators = {
        mediaWindow: [{ type: ViewChild, args: ["mediaContainer", null,] }],
        type: [{ type: Input }],
        item: [{ type: Input }]
    };
    return CometchatSharedMediaComponent;
}());
export { CometchatSharedMediaComponent };
if (false) {
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.mediaWindow;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.type;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.item;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.messageType;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.messageList;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.displaySharedMedia;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.messageContainer;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.mediaMessageListenerId;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.mediaMessageRequest;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.checkMediaMessage;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.displayMessage;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.scrollVariable;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.scrolltoBottom;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.imageClick;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.videoClick;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.docsClick;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.SHARED_MEDIA;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.PHOTOS;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.VIDEOS;
    /** @type {?} */
    CometchatSharedMediaComponent.prototype.DOCUMENT;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvY29tZXRjaGF0LXNoYXJlZC1tZWRpYS9jb21ldGNoYXQtc2hhcmVkLW1lZGlhL2NvbWV0Y2hhdC1zaGFyZWQtbWVkaWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFO0lBc0NFO1FBOUJTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDOztRQUdyQixnQkFBVyxHQUFXLE9BQU8sQ0FBQzs7UUFFOUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFJakIsMkJBQXNCLEdBQUcsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUQsd0JBQW1CLEdBQUcsSUFBSSxDQUFDOztRQUkzQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFHbkMsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFHbkIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsaUJBQVksR0FBVyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQ3BELFdBQU0sR0FBVyxlQUFlLENBQUMsTUFBTSxDQUFDO1FB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WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2hhcmVkLW1lZGlhXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTaGFyZWRNZWRpYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJtZWRpYUNvbnRhaW5lclwiLCBudWxsKSBtZWRpYVdpbmRvdzogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG5cbiAgLy9TZXRzIHR5cGUgb2YgbWVkaWEgbWVzc2FnZSB0byBiZSBmZXRjaGVkXG4gIG1lc3NhZ2VUeXBlOiBzdHJpbmcgPSBcImltYWdlXCI7XG4gIC8vVG8gZ2V0IGFsbCB0aGUgbWVkaWEgbWVzc2FnZSB0aGF0IHVzZXIgcmVxdWVzdHNcbiAgbWVzc2FnZUxpc3QgPSBbXTtcblxuICBkaXNwbGF5U2hhcmVkTWVkaWE6IGFueTtcbiAgbWVzc2FnZUNvbnRhaW5lcjtcbiAgbWVkaWFNZXNzYWdlTGlzdGVuZXJJZCA9IFwibWVzc2FnZXNfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgbWVkaWFNZXNzYWdlUmVxdWVzdCA9IG51bGw7XG4gIGxvZ2dlZEluVXNlcjtcblxuICAvL0lmIE5vIHNwZWNpaWZjIHR5cGUgb2YgbWVkaWEgbWVzc2FnZSBpcyBzZW50L3JlY2VpdmVkXG4gIGNoZWNrTWVkaWFNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIGRpc3BsYXlNZXNzYWdlOiBzdHJpbmc7XG5cbiAgc2Nyb2xsVmFyaWFibGUgPSAwO1xuICBzY3JvbGx0b0JvdHRvbTogYm9vbGVhbjtcblxuICBpbWFnZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgdmlkZW9DbGljazogYm9vbGVhbiA9IGZhbHNlO1xuICBkb2NzQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBTSEFSRURfTUVESUE6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5TSEFSRURfTUVESUE7XG4gIFBIT1RPUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBIT1RPUztcbiAgVklERU9TOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuVklERU9TO1xuICBET0NVTUVOVDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkRPQ1VNRU5UO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpc3BsYXlTaGFyZWRNZWRpYSA9IHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdEJ1aWxkZXIoXG4gICAgICB0aGlzLml0ZW0sXG4gICAgICB0aGlzLnR5cGUsXG4gICAgICB0aGlzLm1lc3NhZ2VUeXBlXG4gICAgKTtcbiAgICB0aGlzLmdldE1lc3NhZ2VzKHRydWUpO1xuICAgIHRoaXMuYWRkTWVkaWFNZXNzYWdlRXZlbnRMaXN0ZW5lcnModGhpcy5tZXNzYWdlVXBkYXRlZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZpbmcgTGlzdGVuZXJzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubWVkaWFNZXNzYWdlTGlzdGVuZXJJZCk7XG4gIH1cbiAgLyoqXG4gICAqIEJ1aWxkcyB0aGUgdXNlciByZXF1ZXN0XG4gICAqL1xuICBtZWRpYU1lc3NhZ2VSZXF1ZXN0QnVpbGRlcihpdGVtLCB0eXBlLCBtZXNzYWdlVHlwZSkge1xuICAgIGlmICh0eXBlID09PSBcInVzZXJcIikge1xuICAgICAgdGhpcy5tZWRpYU1lc3NhZ2VSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5NZXNzYWdlc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldFVJRChpdGVtLnVpZClcbiAgICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgICAuc2V0Q2F0ZWdvcnkoXCJtZXNzYWdlXCIpXG4gICAgICAgIC5zZXRUeXBlKG1lc3NhZ2VUeXBlKVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZWRpYU1lc3NhZ2VSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5NZXNzYWdlc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgLnNldEdVSUQoaXRlbS5ndWlkKVxuICAgICAgICAuc2V0TGltaXQoMTApXG4gICAgICAgIC5zZXRDYXRlZ29yeShcIm1lc3NhZ2VcIilcbiAgICAgICAgLnNldFR5cGUobWVzc2FnZVR5cGUpXG4gICAgICAgIC5idWlsZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBUbyBSZWNlaXZlIE1lZGlhIE1lc3NhZ2VzIGluIFJlYWwgVGltZVxuICAgKiAgQHBhcmFtXG4gICAqL1xuICBhZGRNZWRpYU1lc3NhZ2VFdmVudExpc3RlbmVycyhjYWxsYmFjaykge1xuICAgIENvbWV0Q2hhdC5hZGRNZXNzYWdlTGlzdGVuZXIoXG4gICAgICB0aGlzLm1lZGlhTWVzc2FnZUxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgIG9uTWVkaWFNZXNzYWdlUmVjZWl2ZWQ6IChtZWRpYU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVELCBtZWRpYU1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lc3NhZ2VEZWxldGVkOiAoZGVsZXRlZE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhlbnVtcy5NRVNTQUdFX0RFTEVURUQsIGRlbGV0ZWRNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsQmFjayBmb3IgbGlzdGVuZXJzXG4gICAqL1xuICBtZXNzYWdlVXBkYXRlZChrZXksIG1lc3NhZ2UpIHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFX0RFTEVURUQ6XG4gICAgICAgIHRoaXMubWVzc2FnZURlbGV0ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5NRURJQV9NRVNTQUdFX1JFQ0VJVkVEOlxuICAgICAgICB0aGlzLm1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgVXNlciBEZWxldGVzIE1lc3NhZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBtZXNzYWdlRGVsZXRlZChkZWxldGVkTWVzc2FnZSkge1xuICAgIGNvbnN0IG1lc3NhZ2VUeXBlID0gZGVsZXRlZE1lc3NhZ2UuZGF0YS50eXBlO1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBkZWxldGVkTWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBkZWxldGVkTWVzc2FnZS5nZXRSZWNlaXZlcigpLmd1aWQgPT09IHRoaXMuaXRlbS5ndWlkICYmXG4gICAgICBtZXNzYWdlVHlwZSA9PT0gdGhpcy5tZXNzYWdlVHlwZVxuICAgICkge1xuICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICBjb25zdCBmaWx0ZXJlZE1lc3NhZ2VzID0gbWVzc2FnZUxpc3QuZmlsdGVyKFxuICAgICAgICAobWVzc2FnZSkgPT4gbWVzc2FnZS5pZCAhPT0gZGVsZXRlZE1lc3NhZ2UuaWRcbiAgICAgICk7XG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gZmlsdGVyZWRNZXNzYWdlcztcbiAgICAgIHRoaXMuc2Nyb2xsdG9Cb3R0b20gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFdoZW4gYSBtZXNzYWdlIGlzIHJlY2lldmVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBtZXNzYWdlVHlwZSA9IG1lc3NhZ2UuZGF0YS50eXBlO1xuICAgIGlmIChcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBcImdyb3VwXCIgJiZcbiAgICAgIG1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZCAmJlxuICAgICAgbWVzc2FnZVR5cGUgPT09IHRoaXMubWVzc2FnZVR5cGVcbiAgICApIHtcbiAgICAgIGxldCBtZXNzYWdlcyA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuY29uY2F0KG1lc3NhZ2UpO1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IG1lc3NhZ2VzO1xuICAgICAgdGhpcy5zY3JvbGx0b0JvdHRvbSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICAgR2V0cyB0aGUgTWVkaWEgTWVzc2FnZSB0aGF0IGFyZSBkaXNwbGF5ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRNZXNzYWdlcyhzY3JvbGxUb0JvdHRvbSA9IGZhbHNlKSB7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG5cbiAgICAgICAgdGhpcy5mZXRjaFByZXZpb3VzTWVzc2FnZXMoKVxuICAgICAgICAgIC50aGVuKChtZXNzYWdlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXMsIC4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgICAgICAgICBpZiAobWVzc2FnZUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tNZWRpYU1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk5PX1JFQ09SRFNfRk9VTkQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9Cb3R0b20pIHtcbiAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IG1lc3NhZ2VMaXN0O1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvL05vIE5lZWQgZm9yIGJlbG93IGFjdGlvbnMgaWYgdGhlcmUgaXMgbm90aGluZyB0byBwcmVwZW5kXG4gICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldlNjcm9sbEhlaWdodCA9IHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgLnNjcm9sbEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdDtcblxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHJlcGVuZE1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGlhV2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgcHJldlNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy9UT0RPIEhhbmRsZSB0aGUgZXJyb3MgaW4gY29udGFjdCBsaXN0LlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbU2hhcmVkTWVkaWFWaWV3XSBnZXRNZXNzYWdlcyBmZXRjaFByZXZpb3VzIGVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbU2hhcmVkTWVkaWFWaWV3XSBnZXRNZXNzYWdlcyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBBbGwgdGhlIHByZXZpb3VzIE1lc3NhZ2VzXG4gICAqL1xuICBmZXRjaFByZXZpb3VzTWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdC5mZXRjaFByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xscyB0byBCb3R0b20gb2YgQ2hhdCBXaW5kb3dcbiAgICovXG4gIHNjcm9sbFRvQm90dG9tKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxWYXJpYWJsZSA9XG4gICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICB0aGlzLm1lZGlhV2luZG93Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHNjcm9sbFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGhhbmRsZVNjcm9sbChlKSB7XG4gICAgY29uc3QgdG9wID0gTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT0gMDtcbiAgICBpZiAodG9wICYmIHRoaXMubWVzc2FnZUxpc3QubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdldE1lc3NhZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHR5cGUgb2YgbWVzc2FnZSBpLmUgaW1hZ2UsdmlkZW8gb3IgZmlsZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lZGlhQ2xpY2tIYW5kbGVyKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gXCJpbWFnZVwiKSB7XG4gICAgICB0aGlzLmltYWdlQ2xpY2sgPSB0cnVlO1xuICAgICAgdGhpcy52aWRlb0NsaWNrID0gZmFsc2U7XG4gICAgICB0aGlzLmRvY3NDbGljayA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICB0aGlzLmltYWdlQ2xpY2sgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlkZW9DbGljayA9IHRydWU7XG4gICAgICB0aGlzLmRvY3NDbGljayA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJmaWxlXCIpIHtcbiAgICAgIHRoaXMuaW1hZ2VDbGljayA9IGZhbHNlO1xuICAgICAgdGhpcy52aWRlb0NsaWNrID0gZmFsc2U7XG4gICAgICB0aGlzLmRvY3NDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja01lZGlhTWVzc2FnZSA9IGZhbHNlO1xuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbXTtcbiAgICB0aGlzLm1lc3NhZ2VUeXBlID0gdHlwZTtcbiAgICB0aGlzLmRpc3BsYXlTaGFyZWRNZWRpYSA9IHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdEJ1aWxkZXIoXG4gICAgICB0aGlzLml0ZW0sXG4gICAgICB0aGlzLnR5cGUsXG4gICAgICB0aGlzLm1lc3NhZ2VUeXBlXG4gICAgKTtcbiAgICB0aGlzLmdldE1lc3NhZ2VzKHRydWUpO1xuICB9XG59XG4iXX0=