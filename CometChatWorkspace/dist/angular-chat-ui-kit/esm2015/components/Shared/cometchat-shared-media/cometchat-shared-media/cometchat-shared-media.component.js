/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/cometchat-shared-media/cometchat-shared-media/cometchat-shared-media.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatSharedMediaComponent {
    constructor() {
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
    ngOnInit() {
        this.displaySharedMedia = this.mediaMessageRequestBuilder(this.item, this.type, this.messageType);
        this.getMessages(true);
        this.addMediaMessageEventListeners(this.messageUpdated);
    }
    /**
     * Removing Listeners
     * @return {?}
     */
    ngOnDestroy() {
        CometChat.removeMessageListener(this.mediaMessageListenerId);
    }
    /**
     * Builds the user request
     * @param {?} item
     * @param {?} type
     * @param {?} messageType
     * @return {?}
     */
    mediaMessageRequestBuilder(item, type, messageType) {
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
    }
    /**
     * Listener To Receive Media Messages in Real Time
     * @param {?} callback
     * @return {?}
     */
    addMediaMessageEventListeners(callback) {
        CometChat.addMessageListener(this.mediaMessageListenerId, new CometChat.MessageListener({
            onMediaMessageReceived: (/**
             * @param {?} mediaMessage
             * @return {?}
             */
            (mediaMessage) => {
                callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
            }),
            onMessageDeleted: (/**
             * @param {?} deletedMessage
             * @return {?}
             */
            (deletedMessage) => {
                callback(enums.MESSAGE_DELETED, deletedMessage);
            }),
        }));
    }
    /**
     * CallBack for listeners
     * @param {?} key
     * @param {?} message
     * @return {?}
     */
    messageUpdated(key, message) {
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
    }
    /**
     * If User Deletes Message
     * @param {?} deletedMessage
     * @return {?}
     */
    messageDeleted(deletedMessage) {
        /** @type {?} */
        const messageType = deletedMessage.data.type;
        if (this.type === "group" &&
            deletedMessage.getReceiverType() === "group" &&
            deletedMessage.getReceiver().guid === this.item.guid &&
            messageType === this.messageType) {
            /** @type {?} */
            const messageList = [...this.messageList];
            /** @type {?} */
            const filteredMessages = messageList.filter((/**
             * @param {?} message
             * @return {?}
             */
            (message) => message.id !== deletedMessage.id));
            this.messageList = filteredMessages;
            this.scrolltoBottom = false;
        }
    }
    /**
     * When a message is recieved
     * @param {?} message
     * @return {?}
     */
    messageReceived(message) {
        /** @type {?} */
        const messageType = message.data.type;
        if (this.type === "group" &&
            message.getReceiverType() === "group" &&
            message.getReceiver().guid === this.item.guid &&
            messageType === this.messageType) {
            /** @type {?} */
            let messages = [...this.messageList];
            messages = messages.concat(message);
            this.messageList = messages;
            this.scrolltoBottom = true;
        }
    }
    /**
     *   Gets the Media Message that are displayed
     * @param {?=} scrollToBottom
     * @return {?}
     */
    getMessages(scrollToBottom = false) {
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.loggedInUser = user;
            this.fetchPreviousMessages()
                .then((/**
             * @param {?} messages
             * @return {?}
             */
            (messages) => {
                /** @type {?} */
                const messageList = [...messages, ...this.messageList];
                if (messageList.length === 0) {
                    this.checkMediaMessage = true;
                    this.displayMessage = STRING_MESSAGES.NO_RECORDS_FOUND;
                }
                if (scrollToBottom) {
                    this.messageList = messageList;
                    this.scrollToBottom();
                }
                else {
                    //No Need for below actions if there is nothing to prepend
                    if (messages.length !== 0) {
                        /** @type {?} */
                        let prevScrollHeight = this.mediaWindow.nativeElement
                            .scrollHeight;
                        this.messageList = messageList;
                        // this.prependMessages(messages);
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            this.scrollVariable =
                                this.mediaWindow.nativeElement.scrollTop +
                                    this.mediaWindow.nativeElement.scrollHeight -
                                    prevScrollHeight;
                        }));
                    }
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                //TODO Handle the erros in contact list.
                console.error("[SharedMediaView] getMessages fetchPrevious error", error);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("[SharedMediaView] getMessages getLoggedInUser error", error);
        }));
    }
    /**
     * Fetches All the previous Messages
     * @return {?}
     */
    fetchPreviousMessages() {
        return this.mediaMessageRequest.fetchPrevious();
    }
    /**
     * Scrolls to Bottom of Chat Window
     * @return {?}
     */
    scrollToBottom() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.scrollVariable =
                this.mediaWindow.nativeElement.scrollHeight -
                    this.mediaWindow.nativeElement.clientHeight;
        }));
    }
    /**
     * Handles the scroll
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        /** @type {?} */
        const top = Math.round(e.currentTarget.scrollTop) === 0;
        if (top && this.messageList.length) {
            this.getMessages();
        }
    }
    /**
     * Sets the type of message i.e image,video or file
     * @param {?} type
     * @return {?}
     */
    mediaClickHandler(type) {
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
    }
}
CometchatSharedMediaComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-shared-media",
                template: "<div class=\"sectionStyle\">\n  <h6 class=\"sectionHeaderStyle\">{{ SHARED_MEDIA }}</h6>\n  <div class=\"sectionContentStyle\">\n    <div class=\"mediaBtnStyle\">\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('image')\"\n        [ngClass]=\"{\n          buttonActiveStyle: imageClick\n        }\"\n        >{{ PHOTOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('video')\"\n        [ngClass]=\"{\n          buttonActiveStyle: videoClick\n        }\"\n        >{{ VIDEOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler('file')\"\n        [ngClass]=\"{\n          buttonActiveStyle: docsClick\n        }\"\n      >\n        {{ DOCUMENT }}\n      </span>\n    </div>\n\n    <div\n      class=\"mediaItemStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #mediaContainer\n      [scrollTop]=\"scrollVariable\"\n    >\n      <div class=\"mediaContainer\" *ngFor=\"let msg of messageList\">\n        <div [ngSwitch]=\"msg.type\" *ngIf=\"msg.data.url\">\n          <div *ngSwitchCase=\"'image'\">\n            <div class=\"itemStylePhotos\">\n              <img [src]=\"msg.data.url\" loading=\"lazy\" />\n            </div>\n          </div>\n\n          <div *ngSwitchCase=\"'video'\">\n            <div class=\"itemStyleVideo\">\n              <video [src]=\"msg.data.url\"></video>\n            </div>\n          </div>\n          <div *ngSwitchCase=\"'file'\">\n            <div class=\"itemStyleDocs file\">\n              <a [href]=\"msg.data.url\" target=\"_blank\">\n                {{ msg.data.attachments[0].name }}\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"checkMediaMessage\">\n        {{ displayMessage }}\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".sectionStyle{width:100%;height:calc(100% - 50px)}sectionStyle *{box-sizing:border-box}.sectionStyle ::-webkit-scrollbar{width:8px;height:4px}.sectionStyle ::-webkit-scrollbar-track{background:#ffffff00}.sectionStyle ::-webkit-scrollbar-thumb{background:#ccc}.sectionStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0;display:flex;flex-direction:column;height:calc(100% - 20px)}.mediaBtnStyle{border-radius:8px;background-color:rgba(20,20,20,.08);width:100%;padding:2px;margin:6px 0;clear:both}.buttonStyle{width:33.33%;font-size:13px;font-weight:500;line-height:18px;padding:5px;position:relative;text-align:center;float:left;cursor:pointer}.buttonActiveStyle{background-color:#fff;box-shadow:rgba(20,20,20,.04) 0 3px 1px,rgba(20,20,20,.12) 0 3px 8px;border-radius:7px}.buttonStyle::before{position:absolute;display:block;width:2px;height:16px;background-color:rgba(20,20,20,.12);right:-2px;top:6px}.buttonStyle:last-of-type::before{display:none}.mediaItemStyle{height:calc(100% - 45px);overflow-y:auto;overflow-x:hidden;display:flex;flex-wrap:wrap;font-size:14px;width:auto}.itemStylePhotos{height:120px;width:130px;background-color:rgba(20,20,20,.08);margin:.5rem;text-align:center;flex:1 0 auto}.itemStylePhotos>img{display:block;width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.itemStyleVideo{margin:.5rem;text-align:center;flex:1 0 auto;background-color:rgba(20,20,20,.08)}.itemStyleVideo>video{height:120px;width:130px;margin:auto}.itemStyleDocs{background-color:rgba(20,20,20,.08)}.itemStyleDocs>a{max-width:100%;max-height:100%;margin:auto;display:inline-block;padding:10px 10px 10px 35px;font-size:13px;color:#141414;background:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path fill=\"%2339f\" d=\"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>') 0 center no-repeat;white-space:pre-wrap;word-wrap:break-word;text-align:left;text-decoration:none!important}.itemStyleDocs>a:hover,.itemStyleDocs>a:visited{color:#141414}.mediaContainer{height:130px;display:flex;flex-direction:column}"]
            }] }
];
/** @nocollapse */
CometchatSharedMediaComponent.ctorParameters = () => [];
CometchatSharedMediaComponent.propDecorators = {
    mediaWindow: [{ type: ViewChild, args: ["mediaContainer", { static: false },] }],
    type: [{ type: Input }],
    item: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvY29tZXRjaGF0LXNoYXJlZC1tZWRpYS9jb21ldGNoYXQtc2hhcmVkLW1lZGlhL2NvbWV0Y2hhdC1zaGFyZWQtbWVkaWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEUsTUFBTSxPQUFPLDZCQUE2QjtJQWlDeEM7UUE5QlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7O1FBR3JCLGdCQUFXLEdBQVcsT0FBTyxDQUFDOztRQUU5QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUlqQiwyQkFBc0IsR0FBRyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1RCx3QkFBbUIsR0FBRyxJQUFJLENBQUM7O1FBSTNCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUduQyxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUduQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixpQkFBWSxHQUFXLGVBQWUsQ0FBQyxZQUFZLENBQUM7UUFDcEQsV0FBTSxHQUFXLGVBQWUs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QixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUN2RCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7O1lBdlFGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw0MURBQXNEOzthQUV2RDs7Ozs7MEJBRUUsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTttQkFFN0MsS0FBSzttQkFDTCxLQUFLOzs7O0lBSE4sb0RBQXdFOztJQUV4RSw2Q0FBcUI7O0lBQ3JCLDZDQUFxQjs7SUFHckIsb0RBQThCOztJQUU5QixvREFBaUI7O0lBRWpCLDJEQUF3Qjs7SUFDeEIseURBQWlCOztJQUNqQiwrREFBNEQ7O0lBQzVELDREQUEyQjs7SUFDM0IscURBQWE7O0lBR2IsMERBQW1DOztJQUNuQyx1REFBdUI7O0lBRXZCLHVEQUFtQjs7SUFDbkIsdURBQXdCOztJQUV4QixtREFBMkI7O0lBQzNCLG1EQUE0Qjs7SUFDNUIsa0RBQTJCOztJQUUzQixxREFBb0Q7O0lBQ3BELCtDQUF3Qzs7SUFDeEMsK0NBQXdDOztJQUN4QyxpREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtc2hhcmVkLW1lZGlhXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRTaGFyZWRNZWRpYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJtZWRpYUNvbnRhaW5lclwiLCB7IHN0YXRpYzogZmFsc2UgfSkgbWVkaWFXaW5kb3c6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuXG4gIC8vU2V0cyB0eXBlIG9mIG1lZGlhIG1lc3NhZ2UgdG8gYmUgZmV0Y2hlZFxuICBtZXNzYWdlVHlwZTogc3RyaW5nID0gXCJpbWFnZVwiO1xuICAvL1RvIGdldCBhbGwgdGhlIG1lZGlhIG1lc3NhZ2UgdGhhdCB1c2VyIHJlcXVlc3RzXG4gIG1lc3NhZ2VMaXN0ID0gW107XG5cbiAgZGlzcGxheVNoYXJlZE1lZGlhOiBhbnk7XG4gIG1lc3NhZ2VDb250YWluZXI7XG4gIG1lZGlhTWVzc2FnZUxpc3RlbmVySWQgPSBcIm1lc3NhZ2VzX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIG1lZGlhTWVzc2FnZVJlcXVlc3QgPSBudWxsO1xuICBsb2dnZWRJblVzZXI7XG5cbiAgLy9JZiBObyBzcGVjaWlmYyB0eXBlIG9mIG1lZGlhIG1lc3NhZ2UgaXMgc2VudC9yZWNlaXZlZFxuICBjaGVja01lZGlhTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNwbGF5TWVzc2FnZTogc3RyaW5nO1xuXG4gIHNjcm9sbFZhcmlhYmxlID0gMDtcbiAgc2Nyb2xsdG9Cb3R0b206IGJvb2xlYW47XG5cbiAgaW1hZ2VDbGljazogYm9vbGVhbiA9IHRydWU7XG4gIHZpZGVvQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZG9jc0NsaWNrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgU0hBUkVEX01FRElBOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuU0hBUkVEX01FRElBO1xuICBQSE9UT1M6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QSE9UT1M7XG4gIFZJREVPUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlZJREVPUztcbiAgRE9DVU1FTlQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ET0NVTUVOVDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kaXNwbGF5U2hhcmVkTWVkaWEgPSB0aGlzLm1lZGlhTWVzc2FnZVJlcXVlc3RCdWlsZGVyKFxuICAgICAgdGhpcy5pdGVtLFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5tZXNzYWdlVHlwZVxuICAgICk7XG4gICAgdGhpcy5nZXRNZXNzYWdlcyh0cnVlKTtcbiAgICB0aGlzLmFkZE1lZGlhTWVzc2FnZUV2ZW50TGlzdGVuZXJzKHRoaXMubWVzc2FnZVVwZGF0ZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92aW5nIExpc3RlbmVyc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZU1lc3NhZ2VMaXN0ZW5lcih0aGlzLm1lZGlhTWVzc2FnZUxpc3RlbmVySWQpO1xuICB9XG4gIC8qKlxuICAgKiBCdWlsZHMgdGhlIHVzZXIgcmVxdWVzdFxuICAgKi9cbiAgbWVkaWFNZXNzYWdlUmVxdWVzdEJ1aWxkZXIoaXRlbSwgdHlwZSwgbWVzc2FnZVR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5zZXRVSUQoaXRlbS51aWQpXG4gICAgICAgIC5zZXRMaW1pdCgxMClcbiAgICAgICAgLnNldENhdGVnb3J5KFwibWVzc2FnZVwiKVxuICAgICAgICAuc2V0VHlwZShtZXNzYWdlVHlwZSlcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIC5zZXRHVUlEKGl0ZW0uZ3VpZClcbiAgICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgICAuc2V0Q2F0ZWdvcnkoXCJtZXNzYWdlXCIpXG4gICAgICAgIC5zZXRUeXBlKG1lc3NhZ2VUeXBlKVxuICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgVG8gUmVjZWl2ZSBNZWRpYSBNZXNzYWdlcyBpbiBSZWFsIFRpbWVcbiAgICogIEBwYXJhbVxuICAgKi9cbiAgYWRkTWVkaWFNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICBDb21ldENoYXQuYWRkTWVzc2FnZUxpc3RlbmVyKFxuICAgICAgdGhpcy5tZWRpYU1lc3NhZ2VMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5NZXNzYWdlTGlzdGVuZXIoe1xuICAgICAgICBvbk1lZGlhTWVzc2FnZVJlY2VpdmVkOiAobWVkaWFNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRCwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25NZXNzYWdlRGVsZXRlZDogKGRlbGV0ZWRNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVTU0FHRV9ERUxFVEVELCBkZWxldGVkTWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbEJhY2sgZm9yIGxpc3RlbmVyc1xuICAgKi9cbiAgbWVzc2FnZVVwZGF0ZWQoa2V5LCBtZXNzYWdlKSB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuTUVTU0FHRV9ERUxFVEVEOlxuICAgICAgICB0aGlzLm1lc3NhZ2VEZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRDpcbiAgICAgICAgdGhpcy5tZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIFVzZXIgRGVsZXRlcyBNZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVzc2FnZURlbGV0ZWQoZGVsZXRlZE1lc3NhZ2UpIHtcbiAgICBjb25zdCBtZXNzYWdlVHlwZSA9IGRlbGV0ZWRNZXNzYWdlLmRhdGEudHlwZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgZGVsZXRlZE1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgZGVsZXRlZE1lc3NhZ2UuZ2V0UmVjZWl2ZXIoKS5ndWlkID09PSB0aGlzLml0ZW0uZ3VpZCAmJlxuICAgICAgbWVzc2FnZVR5cGUgPT09IHRoaXMubWVzc2FnZVR5cGVcbiAgICApIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gWy4uLnRoaXMubWVzc2FnZUxpc3RdO1xuICAgICAgY29uc3QgZmlsdGVyZWRNZXNzYWdlcyA9IG1lc3NhZ2VMaXN0LmZpbHRlcihcbiAgICAgICAgKG1lc3NhZ2UpID0+IG1lc3NhZ2UuaWQgIT09IGRlbGV0ZWRNZXNzYWdlLmlkXG4gICAgICApO1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IGZpbHRlcmVkTWVzc2FnZXM7XG4gICAgICB0aGlzLnNjcm9sbHRvQm90dG9tID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBXaGVuIGEgbWVzc2FnZSBpcyByZWNpZXZlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlKSB7XG4gICAgY29uc3QgbWVzc2FnZVR5cGUgPSBtZXNzYWdlLmRhdGEudHlwZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlclR5cGUoKSA9PT0gXCJncm91cFwiICYmXG4gICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWQgJiZcbiAgICAgIG1lc3NhZ2VUeXBlID09PSB0aGlzLm1lc3NhZ2VUeXBlXG4gICAgKSB7XG4gICAgICBsZXQgbWVzc2FnZXMgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlKTtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlcztcbiAgICAgIHRoaXMuc2Nyb2xsdG9Cb3R0b20gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgIEdldHMgdGhlIE1lZGlhIE1lc3NhZ2UgdGhhdCBhcmUgZGlzcGxheWVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0TWVzc2FnZXMoc2Nyb2xsVG9Cb3R0b20gPSBmYWxzZSkge1xuICAgIG5ldyBDb21ldENoYXRNYW5hZ2VyKClcbiAgICAgIC5nZXRMb2dnZWRJblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuXG4gICAgICAgIHRoaXMuZmV0Y2hQcmV2aW91c01lc3NhZ2VzKClcbiAgICAgICAgICAudGhlbigobWVzc2FnZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VMaXN0ID0gWy4uLm1lc3NhZ2VzLCAuLi50aGlzLm1lc3NhZ2VMaXN0XTtcblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmNoZWNrTWVkaWFNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5OT19SRUNPUkRTX0ZPVU5EO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvQm90dG9tKSB7XG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdDtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9ObyBOZWVkIGZvciBiZWxvdyBhY3Rpb25zIGlmIHRoZXJlIGlzIG5vdGhpbmcgdG8gcHJlcGVuZFxuICAgICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZTY3JvbGxIZWlnaHQgPSB0aGlzLm1lZGlhV2luZG93Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgIC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gbWVzc2FnZUxpc3Q7XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByZXBlbmRNZXNzYWdlcyhtZXNzYWdlcyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGlhV2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYVdpbmRvdy5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgIHByZXZTY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIC8vVE9ETyBIYW5kbGUgdGhlIGVycm9zIGluIGNvbnRhY3QgbGlzdC5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiW1NoYXJlZE1lZGlhVmlld10gZ2V0TWVzc2FnZXMgZmV0Y2hQcmV2aW91cyBlcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW1NoYXJlZE1lZGlhVmlld10gZ2V0TWVzc2FnZXMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgQWxsIHRoZSBwcmV2aW91cyBNZXNzYWdlc1xuICAgKi9cbiAgZmV0Y2hQcmV2aW91c01lc3NhZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLm1lZGlhTWVzc2FnZVJlcXVlc3QuZmV0Y2hQcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gQm90dG9tIG9mIENoYXQgV2luZG93XG4gICAqL1xuICBzY3JvbGxUb0JvdHRvbSgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICB0aGlzLm1lZGlhV2luZG93Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC1cbiAgICAgICAgdGhpcy5tZWRpYVdpbmRvdy5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBzY3JvbGxcbiAgICogQHBhcmFtXG4gICAqL1xuICBoYW5kbGVTY3JvbGwoZSkge1xuICAgIGNvbnN0IHRvcCA9IE1hdGgucm91bmQoZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCkgPT09IDA7XG4gICAgaWYgKHRvcCAmJiB0aGlzLm1lc3NhZ2VMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0eXBlIG9mIG1lc3NhZ2UgaS5lIGltYWdlLHZpZGVvIG9yIGZpbGVcbiAgICogQHBhcmFtXG4gICAqL1xuICBtZWRpYUNsaWNrSGFuZGxlcih0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09IFwiaW1hZ2VcIikge1xuICAgICAgdGhpcy5pbWFnZUNsaWNrID0gdHJ1ZTtcbiAgICAgIHRoaXMudmlkZW9DbGljayA9IGZhbHNlO1xuICAgICAgdGhpcy5kb2NzQ2xpY2sgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidmlkZW9cIikge1xuICAgICAgdGhpcy5pbWFnZUNsaWNrID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZGVvQ2xpY2sgPSB0cnVlO1xuICAgICAgdGhpcy5kb2NzQ2xpY2sgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZmlsZVwiKSB7XG4gICAgICB0aGlzLmltYWdlQ2xpY2sgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlkZW9DbGljayA9IGZhbHNlO1xuICAgICAgdGhpcy5kb2NzQ2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tNZWRpYU1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gW107XG4gICAgdGhpcy5tZXNzYWdlVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5kaXNwbGF5U2hhcmVkTWVkaWEgPSB0aGlzLm1lZGlhTWVzc2FnZVJlcXVlc3RCdWlsZGVyKFxuICAgICAgdGhpcy5pdGVtLFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5tZXNzYWdlVHlwZVxuICAgICk7XG4gICAgdGhpcy5nZXRNZXNzYWdlcyh0cnVlKTtcbiAgfVxufVxuIl19