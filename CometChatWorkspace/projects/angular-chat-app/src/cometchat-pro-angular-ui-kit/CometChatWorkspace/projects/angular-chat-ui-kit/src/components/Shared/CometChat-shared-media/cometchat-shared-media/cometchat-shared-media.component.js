/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/CometChat-shared-media/cometchat-shared-media/cometchat-shared-media.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatSharedMediaComponent {
    constructor() {
        this.type = null;
        this.item = null;
        this.messageType = CometChat.MESSAGE_TYPE.IMAGE; //Sets type of media message to be fetched
        //Sets type of media message to be fetched
        this.messageList = [];
        this.mediaMessageListenerId = "messages_" + new Date().getTime();
        this.mediaMessageRequest = null;
        //If No speciifc type of media message is sent/received
        this.checkMediaMessage = false;
        this.scrollVariable = 0;
        this.imageClick = true;
        this.videoClick = false;
        this.docsClick = false;
        this.SHARED_MEDIA = COMETCHAT_CONSTANTS.SHARED_MEDIA;
        this.PHOTOS = COMETCHAT_CONSTANTS.PHOTOS;
        this.VIDEOS = COMETCHAT_CONSTANTS.VIDEOS;
        this.DOCUMENT = COMETCHAT_CONSTANTS.DOCUMENT;
        this.MESSAGE_TYPE_IMAGE = CometChat.MESSAGE_TYPE.IMAGE;
        this.MESSAGE_TYPE_VIDEO = CometChat.MESSAGE_TYPE.VIDEO;
        this.MESSAGE_TYPE_FILE = CometChat.MESSAGE_TYPE.FILE;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.displaySharedMedia = this.mediaMessageRequestBuilder(this.item, this.type, this.messageType);
            this.getMessages(true);
            this.addMediaMessageEventListeners(this.messageUpdated);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removing Listeners
     * @return {?}
     */
    ngOnDestroy() {
        try {
            CometChat.removeMessageListener(this.mediaMessageListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Builds the user request
     * @param {?} item
     * @param {?} type
     * @param {?} messageType
     * @return {?}
     */
    mediaMessageRequestBuilder(item, type, messageType) {
        try {
            if (type === CometChat.RECEIVER_TYPE.USER) {
                this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
                    .setUID(item.uid)
                    .setLimit(10)
                    .setCategory(CometChat.CATEGORY_MESSAGE)
                    .setType(messageType)
                    .build();
            }
            else {
                this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
                    .setGUID(item.guid)
                    .setLimit(10)
                    .setCategory(CometChat.CATEGORY_MESSAGE)
                    .setType(messageType)
                    .build();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listener To Receive Media Messages in Real Time
     * @param {?} callback
     * @return {?}
     */
    addMediaMessageEventListeners(callback) {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates sharedMediaView on basis of user activity or group activity
     * @param {?} key
     * @param {?} message
     * @return {?}
     */
    messageUpdated(key, message) {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * If User Deletes Message
     * @param {?} deletedMessage
     * @return {?}
     */
    messageDeleted(deletedMessage) {
        try {
            /** @type {?} */
            const messageType = deletedMessage.data.type;
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                deletedMessage.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * When a message is recieved
     * @param {?} message
     * @return {?}
     */
    messageReceived(message) {
        try {
            /** @type {?} */
            const messageType = message.data.type;
            if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
                message.getReceiver().guid === this.item.guid &&
                messageType === this.messageType) {
                /** @type {?} */
                let messages = [...this.messageList];
                messages = messages.concat(message);
                this.messageList = messages;
                this.scrolltoBottom = true;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *   Gets the Media Message that are displayed
     * @param {?=} scrollToBottom
     * @return {?}
     */
    getMessages(scrollToBottom = false) {
        try {
            CometChat.getLoggedinUser()
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
                        this.displayMessage = COMETCHAT_CONSTANTS.NO_RECORDS_FOUND;
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
                    logger("[SharedMediaView] getMessages fetchPrevious error", error);
                }));
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("[SharedMediaView] getMessages getLoggedInUser error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Fetches All the previous Messages
     * @return {?}
     */
    fetchPreviousMessages() {
        try {
            return this.mediaMessageRequest.fetchPrevious();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Scrolls to Bottom of Chat Window
     * @return {?}
     */
    scrollToBottom() {
        try {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.scrollVariable =
                    this.mediaWindow.nativeElement.scrollHeight -
                        this.mediaWindow.nativeElement.clientHeight;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Handles the scroll
     * @param {?} e
     * @return {?}
     */
    handleScroll(e) {
        try {
            /** @type {?} */
            const top = Math.round(e.currentTarget.scrollTop) === 0;
            if (top && this.messageList.length) {
                this.getMessages();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets the type of message i.e image,video or file
     * @param {?} type
     * @return {?}
     */
    mediaClickHandler(type) {
        try {
            if (type === CometChat.MESSAGE_TYPE.IMAGE) {
                this.imageClick = true;
                this.videoClick = false;
                this.docsClick = false;
            }
            else if (type === CometChat.MESSAGE_TYPE.VIDEO) {
                this.imageClick = false;
                this.videoClick = true;
                this.docsClick = false;
            }
            else if (type === CometChat.MESSAGE_TYPE.FILE) {
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
        catch (error) {
            logger(error);
        }
    }
}
CometChatSharedMediaComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-shared-media",
                template: "<div class=\"sectionStyle\">\n  <h6 class=\"sectionHeaderStyle\">{{ SHARED_MEDIA }}</h6>\n  <div class=\"sectionContentStyle\">\n    <div class=\"mediaBtnStyle\">\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler(MESSAGE_TYPE_IMAGE)\"\n        [ngClass]=\"{\n          buttonActiveStyle: imageClick\n        }\"\n        >{{ PHOTOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler(MESSAGE_TYPE_VIDEO)\"\n        [ngClass]=\"{\n          buttonActiveStyle: videoClick\n        }\"\n        >{{ VIDEOS }}\n      </span>\n\n      <span\n        class=\"buttonStyle\"\n        (click)=\"mediaClickHandler(MESSAGE_TYPE_FILE)\"\n        [ngClass]=\"{\n          buttonActiveStyle: docsClick\n        }\"\n      >\n        {{ DOCUMENT }}\n      </span>\n    </div>\n\n    <div\n      class=\"mediaItemStyle\"\n      (scroll)=\"handleScroll($event)\"\n      #mediaContainer\n      [scrollTop]=\"scrollVariable\"\n    >\n      <ng-container *ngFor=\"let msg of messageList\">\n        <div class=\"mediaContainer\" [ngSwitch]=\"msg.type\" *ngIf=\"msg.data.url\">\n          <div class=\"imageStyle\" *ngSwitchCase=\"MESSAGE_TYPE_IMAGE\">\n            <div class=\"itemStylePhotos\">\n              <img [src]=\"msg.data.url\" loading=\"lazy\" />\n            </div>\n          </div>\n\n          <div *ngSwitchCase=\"MESSAGE_TYPE_VIDEO\">\n            <div class=\"itemStyleVideo\">\n              <video [src]=\"msg.data.url\"></video>\n            </div>\n          </div>\n          <div *ngSwitchCase=\"MESSAGE_TYPE_FILE\">\n            <div class=\"itemStyleDocs file\">\n              <a [href]=\"msg.data.url\" target=\"_blank\">\n                {{ msg.data.attachments[0].name }}\n              </a>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n      <div *ngIf=\"checkMediaMessage\">\n        {{ displayMessage }}\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".sectionStyle{width:100%;height:calc(100% - 50px)}sectionStyle *{box-sizing:border-box}.sectionStyle ::-webkit-scrollbar{width:8px;height:4px}.sectionStyle ::-webkit-scrollbar-track{background:#ffffff00}.sectionStyle ::-webkit-scrollbar-thumb{background:#ccc}.sectionStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0;display:flex;flex-direction:column;height:calc(100% - 20px)}.mediaBtnStyle{border-radius:8px;background-color:rgba(20,20,20,.08);width:100%;padding:2px;margin:6px 0;clear:both}.buttonStyle{width:33.33%;font-size:13px;font-weight:500;line-height:18px;padding:5px;position:relative;text-align:center;float:left;cursor:pointer}.buttonActiveStyle{background-color:#fff;box-shadow:rgba(20,20,20,.04) 0 3px 1px,rgba(20,20,20,.12) 0 3px 8px;border-radius:7px}.buttonStyle::before{position:absolute;display:block;width:2px;height:16px;background-color:rgba(20,20,20,.12);right:-2px;top:6px}.buttonStyle:last-of-type::before{display:none}.mediaItemStyle{height:calc(100% - 45px);overflow-y:auto;overflow-x:hidden;display:flex;flex-wrap:wrap;font-size:14px;width:auto}.itemStylePhotos{height:125px;width:135px;margin:.5rem;text-align:center;flex:1 0 auto}.itemStylePhotos>img{display:block;width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.itemStyleVideo{margin:.5rem;text-align:center;flex:1 0 auto}.itemStyleVideo>video{height:125px;width:135px;margin:auto}.itemStyleDocs{background-color:none}.itemStyleDocs>a{max-width:100%;max-height:100%;margin:auto;display:inline-block;padding:10px 10px 10px 35px;font-size:13px;color:#141414;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGaADAAQAAAABAAAAIAAAAAD0wk2pAAACf0lEQVRIDe2Wv2sTYRjHn/dyUQelVBEXHVpBweog5hqHLg4KQkEotWCRgsXW3b8gLTq6dGtaSiVYqrUiCIqDIC5WY9xcXIrURUGH4mJ6udfPE3LQXO4CSTNJnvL2fX7d93mf73uX9zWCeEv2hPXlPmrWWuljTqu/QYxY/rbFSMlxZKZ427xryIlxmFqBL4AfioknuoyIT7HJT9OmkJhUC7h0cK9W4A++nGPkPeNv3IN+IHfxj1PglxU5QlfLXt4GxWnzKC4/9LkkZmtGrnTHPAgDcXMmb3+wIDFG5oifRJ/AfIi/Qkercc+ozyGpv6rQQVJS1A94ZXhKbuFfQU+x0MKFeXs9mhfaDkp1k5MoChOjc86YoL9XJqDuMQt1mVe8BTsSzVNbi7Qta2OmcvCU3IS+dS0UBLKaWbDXooB7KqJgby8ZH8puoD5npNGfDObtsMZC2XMRBeKF2WEag7IX7M++ipWnvAxXO1okLNTXK6NQ9xJ7P+MZL8MVjbXVCUApfTgq7FH56HEZ4SN9DW0HiK9nl+wZN5rYzGZzf2s8sDLKKr+hKk118nOL78iRNZwehQ77fOwtFeE9feWLzML7OUCW69B3GTbYZYgMtVTkw5QpeYv2MiDjrPJYHVSj0YNriNHTUhHF4Zf3DZOOppJZtOdtRT7TtdvWxjdFjwl2i8SQkuzq0pXMTUykS1cMKcmu/4kuI2VtlDNCT7OOCbcfPbT0jlZ2jJXNGrLXsQoA8Qs8qHgcdJsu/zbQT9PJTGaeUEo+tnoHU7BQlBFQLnLezKqPJjbavnCHoM1mbi/bKUcGnOKk2TKuDMBdgfGVhxrO7WZAMbEdxanipeUsp+n3fzx9zTKZd9H5AAAAAElFTkSuQmCC) 3px center no-repeat;white-space:pre-wrap;word-wrap:break-word;text-align:left;text-decoration:none!important}.itemStyleDocs>a:hover,.itemStyleDocs>a:visited{color:#141414}.mediaContainer{height:130px;display:flex;flex-direction:column;margin:.5rem;text-align:center;flex:1 0 auto;background-color:rgba(20,20,20,.08)}.imageStyle{text-align:-webkit-center}"]
            }] }
];
/** @nocollapse */
CometChatSharedMediaComponent.ctorParameters = () => [];
CometChatSharedMediaComponent.propDecorators = {
    mediaWindow: [{ type: ViewChild, args: ["mediaContainer", { static: false },] }],
    type: [{ type: Input }],
    item: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.mediaWindow;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.type;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.item;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.messageType;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.messageList;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.displaySharedMedia;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.messageContainer;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.mediaMessageListenerId;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.mediaMessageRequest;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.checkMediaMessage;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.displayMessage;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.scrollVariable;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.scrolltoBottom;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.imageClick;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.videoClick;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.docsClick;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.SHARED_MEDIA;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.PHOTOS;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.VIDEOS;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.DOCUMENT;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.MESSAGE_TYPE_IMAGE;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.MESSAGE_TYPE_VIDEO;
    /** @type {?} */
    CometChatSharedMediaComponent.prototype.MESSAGE_TYPE_FILE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXNoYXJlZC1tZWRpYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvQ29tZXRDaGF0LXNoYXJlZC1tZWRpYS9jb21ldGNoYXQtc2hhcmVkLW1lZGlhL2NvbWV0Y2hhdC1zaGFyZWQtbWVkaWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPbEQsTUFBTSxPQUFPLDZCQUE2QjtJQWlDeEM7UUE5QlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsZ0JBQVcsR0FBVyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLDBDQUEwQzs7UUFDOUYsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFJakIsMkJBQXNCLEdBQUcsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUQsd0JBQW1CLEdBQUcsSUFBSSxDQUFDOztRQUkzQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFHbkMsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFHbkIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsaUJBQVksR0FBVyxtQkFBbUIsQ0FB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dURBQXdCOztJQUV4QixtREFBMkI7O0lBQzNCLG1EQUE0Qjs7SUFDNUIsa0RBQTJCOztJQUUzQixxREFBd0Q7O0lBQ3hELCtDQUE0Qzs7SUFDNUMsK0NBQTRDOztJQUM1QyxpREFBZ0Q7O0lBQ2hELDJEQUEwRDs7SUFDMUQsMkRBQTBEOztJQUMxRCwwREFBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1zaGFyZWQtbWVkaWFcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtc2hhcmVkLW1lZGlhLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtc2hhcmVkLW1lZGlhLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFNoYXJlZE1lZGlhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcIm1lZGlhQ29udGFpbmVyXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBtZWRpYVdpbmRvdzogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIG1lc3NhZ2VUeXBlOiBzdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFOyAvL1NldHMgdHlwZSBvZiBtZWRpYSBtZXNzYWdlIHRvIGJlIGZldGNoZWRcbiAgbWVzc2FnZUxpc3QgPSBbXTtcblxuICBkaXNwbGF5U2hhcmVkTWVkaWE6IGFueTtcbiAgbWVzc2FnZUNvbnRhaW5lcjtcbiAgbWVkaWFNZXNzYWdlTGlzdGVuZXJJZCA9IFwibWVzc2FnZXNfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgbWVkaWFNZXNzYWdlUmVxdWVzdCA9IG51bGw7XG4gIGxvZ2dlZEluVXNlcjtcblxuICAvL0lmIE5vIHNwZWNpaWZjIHR5cGUgb2YgbWVkaWEgbWVzc2FnZSBpcyBzZW50L3JlY2VpdmVkXG4gIGNoZWNrTWVkaWFNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIGRpc3BsYXlNZXNzYWdlOiBzdHJpbmc7XG5cbiAgc2Nyb2xsVmFyaWFibGUgPSAwO1xuICBzY3JvbGx0b0JvdHRvbTogYm9vbGVhbjtcblxuICBpbWFnZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgdmlkZW9DbGljazogYm9vbGVhbiA9IGZhbHNlO1xuICBkb2NzQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBTSEFSRURfTUVESUE6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuU0hBUkVEX01FRElBO1xuICBQSE9UT1M6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuUEhPVE9TO1xuICBWSURFT1M6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuVklERU9TO1xuICBET0NVTUVOVDogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5ET0NVTUVOVDtcbiAgTUVTU0FHRV9UWVBFX0lNQUdFOiBTdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFO1xuICBNRVNTQUdFX1RZUEVfVklERU86IFN0cmluZyA9IENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVklERU87XG4gIE1FU1NBR0VfVFlQRV9GSUxFOiBTdHJpbmcgPSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkZJTEU7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmRpc3BsYXlTaGFyZWRNZWRpYSA9IHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdEJ1aWxkZXIoXG4gICAgICAgIHRoaXMuaXRlbSxcbiAgICAgICAgdGhpcy50eXBlLFxuICAgICAgICB0aGlzLm1lc3NhZ2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5nZXRNZXNzYWdlcyh0cnVlKTtcbiAgICAgIHRoaXMuYWRkTWVkaWFNZXNzYWdlRXZlbnRMaXN0ZW5lcnModGhpcy5tZXNzYWdlVXBkYXRlZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92aW5nIExpc3RlbmVyc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5tZWRpYU1lc3NhZ2VMaXN0ZW5lcklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRzIHRoZSB1c2VyIHJlcXVlc3RcbiAgICovXG4gIG1lZGlhTWVzc2FnZVJlcXVlc3RCdWlsZGVyKGl0ZW0sIHR5cGUsIG1lc3NhZ2VUeXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSKSB7XG4gICAgICAgIHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdCA9IG5ldyBDb21ldENoYXQuTWVzc2FnZXNSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgICAgLnNldFVJRChpdGVtLnVpZClcbiAgICAgICAgICAuc2V0TGltaXQoMTApXG4gICAgICAgICAgLnNldENhdGVnb3J5KENvbWV0Q2hhdC5DQVRFR09SWV9NRVNTQUdFKVxuICAgICAgICAgIC5zZXRUeXBlKG1lc3NhZ2VUeXBlKVxuICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZWRpYU1lc3NhZ2VSZXF1ZXN0ID0gbmV3IENvbWV0Q2hhdC5NZXNzYWdlc1JlcXVlc3RCdWlsZGVyKClcbiAgICAgICAgICAuc2V0R1VJRChpdGVtLmd1aWQpXG4gICAgICAgICAgLnNldExpbWl0KDEwKVxuICAgICAgICAgIC5zZXRDYXRlZ29yeShDb21ldENoYXQuQ0FURUdPUllfTUVTU0FHRSlcbiAgICAgICAgICAuc2V0VHlwZShtZXNzYWdlVHlwZSlcbiAgICAgICAgICAuYnVpbGQoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgVG8gUmVjZWl2ZSBNZWRpYSBNZXNzYWdlcyBpbiBSZWFsIFRpbWVcbiAgICogIEBwYXJhbVxuICAgKi9cbiAgYWRkTWVkaWFNZXNzYWdlRXZlbnRMaXN0ZW5lcnMoY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmFkZE1lc3NhZ2VMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5tZWRpYU1lc3NhZ2VMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgICAgb25NZWRpYU1lc3NhZ2VSZWNlaXZlZDogKG1lZGlhTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVESUFfTUVTU0FHRV9SRUNFSVZFRCwgbWVkaWFNZXNzYWdlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uTWVzc2FnZURlbGV0ZWQ6IChkZWxldGVkTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZW51bXMuTUVTU0FHRV9ERUxFVEVELCBkZWxldGVkTWVzc2FnZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgc2hhcmVkTWVkaWFWaWV3IG9uIGJhc2lzIG9mIHVzZXIgYWN0aXZpdHkgb3IgZ3JvdXAgYWN0aXZpdHlcbiAgICovXG4gIG1lc3NhZ2VVcGRhdGVkKGtleSwgbWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIGVudW1zLk1FU1NBR0VfREVMRVRFRDpcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VEZWxldGVkKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLk1FRElBX01FU1NBR0VfUkVDRUlWRUQ6XG4gICAgICAgICAgdGhpcy5tZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIFVzZXIgRGVsZXRlcyBNZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVzc2FnZURlbGV0ZWQoZGVsZXRlZE1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZVR5cGUgPSBkZWxldGVkTWVzc2FnZS5kYXRhLnR5cGU7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgZGVsZXRlZE1lc3NhZ2UuZ2V0UmVjZWl2ZXJUeXBlKCkgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgIGRlbGV0ZWRNZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWQgJiZcbiAgICAgICAgbWVzc2FnZVR5cGUgPT09IHRoaXMubWVzc2FnZVR5cGVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlTGlzdCA9IFsuLi50aGlzLm1lc3NhZ2VMaXN0XTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRNZXNzYWdlcyA9IG1lc3NhZ2VMaXN0LmZpbHRlcihcbiAgICAgICAgICAobWVzc2FnZSkgPT4gbWVzc2FnZS5pZCAhPT0gZGVsZXRlZE1lc3NhZ2UuaWRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlTGlzdCA9IGZpbHRlcmVkTWVzc2FnZXM7XG4gICAgICAgIHRoaXMuc2Nyb2xsdG9Cb3R0b20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFdoZW4gYSBtZXNzYWdlIGlzIHJlY2lldmVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZVR5cGUgPSBtZXNzYWdlLmRhdGEudHlwZTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyVHlwZSgpID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICBtZXNzYWdlLmdldFJlY2VpdmVyKCkuZ3VpZCA9PT0gdGhpcy5pdGVtLmd1aWQgJiZcbiAgICAgICAgbWVzc2FnZVR5cGUgPT09IHRoaXMubWVzc2FnZVR5cGVcbiAgICAgICkge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBbLi4udGhpcy5tZXNzYWdlTGlzdF07XG4gICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuY29uY2F0KG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gbWVzc2FnZXM7XG4gICAgICAgIHRoaXMuc2Nyb2xsdG9Cb3R0b20gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgIEdldHMgdGhlIE1lZGlhIE1lc3NhZ2UgdGhhdCBhcmUgZGlzcGxheWVkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0TWVzc2FnZXMoc2Nyb2xsVG9Cb3R0b20gPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG5cbiAgICAgICAgICB0aGlzLmZldGNoUHJldmlvdXNNZXNzYWdlcygpXG4gICAgICAgICAgICAudGhlbigobWVzc2FnZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZXMsIC4uLnRoaXMubWVzc2FnZUxpc3RdO1xuXG4gICAgICAgICAgICAgIGlmIChtZXNzYWdlTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTWVkaWFNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5OT19SRUNPUkRTX0ZPVU5EO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzY3JvbGxUb0JvdHRvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9ObyBOZWVkIGZvciBiZWxvdyBhY3Rpb25zIGlmIHRoZXJlIGlzIG5vdGhpbmcgdG8gcHJlcGVuZFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIGxldCBwcmV2U2Nyb2xsSGVpZ2h0ID0gdGhpcy5tZWRpYVdpbmRvdy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdDtcblxuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgK1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgIHByZXZTY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIC8vVE9ETyBIYW5kbGUgdGhlIGVycm9zIGluIGNvbnRhY3QgbGlzdC5cbiAgICAgICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgICAgIFwiW1NoYXJlZE1lZGlhVmlld10gZ2V0TWVzc2FnZXMgZmV0Y2hQcmV2aW91cyBlcnJvclwiLFxuICAgICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcIltTaGFyZWRNZWRpYVZpZXddIGdldE1lc3NhZ2VzIGdldExvZ2dlZEluVXNlciBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIEFsbCB0aGUgcHJldmlvdXMgTWVzc2FnZXNcbiAgICovXG4gIGZldGNoUHJldmlvdXNNZXNzYWdlcygpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWFNZXNzYWdlUmVxdWVzdC5mZXRjaFByZXZpb3VzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gQm90dG9tIG9mIENoYXQgV2luZG93XG4gICAqL1xuICBzY3JvbGxUb0JvdHRvbSgpIHtcbiAgICB0cnkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmFyaWFibGUgPVxuICAgICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICAgIHRoaXMubWVkaWFXaW5kb3cubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgc2Nyb2xsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgaGFuZGxlU2Nyb2xsKGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9wID0gTWF0aC5yb3VuZChlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG9wKSA9PT0gMDtcbiAgICAgIGlmICh0b3AgJiYgdGhpcy5tZXNzYWdlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0eXBlIG9mIG1lc3NhZ2UgaS5lIGltYWdlLHZpZGVvIG9yIGZpbGVcbiAgICogQHBhcmFtXG4gICAqL1xuICBtZWRpYUNsaWNrSGFuZGxlcih0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlID09PSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDbGljayA9IHRydWU7XG4gICAgICAgIHRoaXMudmlkZW9DbGljayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRvY3NDbGljayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLlZJREVPKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VDbGljayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZGVvQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvY3NDbGljayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkZJTEUpIHtcbiAgICAgICAgdGhpcy5pbWFnZUNsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlkZW9DbGljayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRvY3NDbGljayA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tNZWRpYU1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMubWVzc2FnZVR5cGUgPSB0eXBlO1xuICAgICAgdGhpcy5kaXNwbGF5U2hhcmVkTWVkaWEgPSB0aGlzLm1lZGlhTWVzc2FnZVJlcXVlc3RCdWlsZGVyKFxuICAgICAgICB0aGlzLml0ZW0sXG4gICAgICAgIHRoaXMudHlwZSxcbiAgICAgICAgdGhpcy5tZXNzYWdlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZXModHJ1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=