/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/cometchat-conversation-list-item/cometchat-conversation-list-item/cometchat-conversation-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatConversationListItemComponent = /** @class */ (function () {
    function CometchatConversationListItemComponent() {
        this.ConversationDetails = null;
        this.loggedInUser = null;
        this.onUserClick = new EventEmitter();
        /**
         * Displays lastMessage was Custom Message i.e Poll or Sticker
         * @param
         */
        this.getCustomMessage = (/**
         * @param {?} lastMessage
         * @return {?}
         */
        function (lastMessage) {
            /** @type {?} */
            var message = null;
            switch (lastMessage.type) {
                case enums.CUSTOM_TYPE_POLL:
                    message = STRING_MESSAGES.CUSTOM_MESSAGE_POLL;
                    break;
                case enums.CUSTOM_TYPE_STICKER:
                    message = STRING_MESSAGES.CUSTOM_MESSAGE_STICKER;
                    break;
                default:
                    break;
            }
            return message;
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["ConversationDetails"]) {
            if (change["ConversationDetails"].currentValue !==
                change["ConversationDetails"].previousValue) {
                this.getLastMessage(change["ConversationDetails"].currentValue);
                this.getLastMessageTimestamp(change["ConversationDetails"].currentValue);
                this.getName(change["ConversationDetails"].currentValue);
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getLastMessage(this.ConversationDetails);
        this.getLastMessageTimestamp(this.ConversationDetails);
        this.getName(this.ConversationDetails);
    };
    /**
     * Sets Avatar According to user type ie. user or group
     * @param
     */
    /**
     * Sets Avatar According to user type ie. user or group
     * @param {?} data
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getAvatar = /**
     * Sets Avatar According to user type ie. user or group
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data.conversationType === "user") {
            this.setAvatar = data.conversationWith;
        }
        else if (data.conversationType === "group") {
            this.setAvatar = data.conversationWith;
        }
        return this.setAvatar;
    };
    /**
     * Gets Name of Last Conversation User
     * @param
     */
    /**
     * Gets Name of Last Conversation User
     * @param {?} data
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getName = /**
     * Gets Name of Last Conversation User
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.lastMessageName = data.conversationWith.name;
        return this.lastMessageName;
    };
    /**
     * Gets the Last Conversation with user
     * @param
     */
    /**
     * Gets the Last Conversation with user
     * @param {?} data
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getLastMessage = /**
     * Gets the Last Conversation with user
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data === null) {
            return false;
        }
        if (data.hasOwnProperty("lastMessage") === false) {
            return false;
        }
        /** @type {?} */
        var message = null;
        /** @type {?} */
        var lastMessage = data.lastMessage;
        if (lastMessage.hasOwnProperty("deletedAt")) {
            message =
                this.loggedInUser.uid === lastMessage.sender.uid
                    ? STRING_MESSAGES.YOU_DELETED_THIS_MESSAGE
                    : STRING_MESSAGES.THIS_MESSAGE_DELETED;
        }
        else {
            switch (lastMessage.category) {
                case enums.MESSAGE:
                    message = this.getMessage(lastMessage);
                    break;
                case enums.CALL:
                    message = this.getCallMessage(lastMessage);
                    break;
                case enums.ACTION:
                    message = lastMessage.message;
                    break;
                case enums.CUSTOM:
                    message = this.getCustomMessage(lastMessage);
                    break;
                default:
                    break;
            }
        }
        this.lastMessage = message;
        return this.lastMessage;
    };
    /**
     * Gets Time when the last conversation was done
     * @param
     */
    /**
     * Gets Time when the last conversation was done
     * @param {?} data
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getLastMessageTimestamp = /**
     * Gets Time when the last conversation was done
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data === null) {
            return false;
        }
        if (data.hasOwnProperty("lastMessage") === false) {
            return false;
        }
        if (data.lastMessage.hasOwnProperty("sentAt") === false) {
            return false;
        }
        /** @type {?} */
        var timestamp = null;
        /** @type {?} */
        var messageTimestamp = new Date(data.lastMessage.sentAt * 1000);
        /** @type {?} */
        var currentTimestamp = Date.now();
        /** @type {?} */
        var diffTimestamp = currentTimestamp - messageTimestamp;
        if (diffTimestamp < 24 * 60 * 60 * 1000) {
            timestamp = messageTimestamp.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        }
        else if (diffTimestamp < 48 * 60 * 60 * 1000) {
            timestamp = STRING_MESSAGES.YESTERDAY;
        }
        else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
            timestamp = messageTimestamp.toLocaleString("en-US", { weekday: "long" });
        }
        else {
            timestamp = messageTimestamp.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
            });
        }
        this.lastMessageTimestamp = timestamp;
        return this.lastMessageTimestamp;
    };
    /**
     * Gets the MessageType i.e if text then display text else displays image,video,etc
     * @param
     */
    /**
     * Gets the MessageType i.e if text then display text else displays image,video,etc
     * @param {?} lastMessage
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getMessage = /**
     * Gets the MessageType i.e if text then display text else displays image,video,etc
     * @param {?} lastMessage
     * @return {?}
     */
    function (lastMessage) {
        /** @type {?} */
        var message = null;
        switch (lastMessage.type) {
            case CometChat.MESSAGE_TYPE.TEXT:
                message = lastMessage.text;
                break;
            case CometChat.MESSAGE_TYPE.MEDIA:
                message = STRING_MESSAGES.MEDIA_MESSAGE;
                break;
            case CometChat.MESSAGE_TYPE.IMAGE:
                message = STRING_MESSAGES.MESSAGE_IMAGE;
                break;
            case CometChat.MESSAGE_TYPE.FILE:
                message = STRING_MESSAGES.MESSAGE_FILE;
                break;
            case CometChat.MESSAGE_TYPE.VIDEO:
                message = STRING_MESSAGES.MESSAGE_VIDEO;
                break;
            case CometChat.MESSAGE_TYPE.AUDIO:
                message = STRING_MESSAGES.MESSAGE_AUDIO;
                break;
            case CometChat.MESSAGE_TYPE.CUSTOM:
                message = STRING_MESSAGES.CUSTOM_MESSAGE;
                break;
            default:
                break;
        }
        return message;
    };
    /**
     * Displays if lastMessage was Video or Audio Call
     * @param
     */
    /**
     * Displays if lastMessage was Video or Audio Call
     * @param {?} lastMessage
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.getCallMessage = /**
     * Displays if lastMessage was Video or Audio Call
     * @param {?} lastMessage
     * @return {?}
     */
    function (lastMessage) {
        /** @type {?} */
        var message = null;
        switch (lastMessage.type) {
            case CometChat.MESSAGE_TYPE.VIDEO:
                message = STRING_MESSAGES.VIDEO_CALL;
                break;
            case CometChat.MESSAGE_TYPE.AUDIO:
                message = STRING_MESSAGES.AUDIO_CALL;
                break;
            default:
                break;
        }
        return message;
    };
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param Any userToEmit
     */
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param {?} userToEmit
     * @return {?}
     */
    CometchatConversationListItemComponent.prototype.onUserClicked = /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param {?} userToEmit
     * @return {?}
     */
    function (userToEmit) {
        this.onUserClick.emit(userToEmit);
    };
    CometchatConversationListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-conversation-list-item",
                    template: "<div class=\"listItem\" (click)=\"onUserClicked(ConversationDetails)\">\n  <div class=\"itemThumbnailStyle\">\n    <!--Avatar-->\n    <cometchat-avatar\n      [item]=\"getAvatar(ConversationDetails)\"\n      [userStatus]=\"ConversationDetails.conversationWith.status\"\n    ></cometchat-avatar>\n  </div>\n  <div class=\"itemDetailStyle\">\n    <div class=\"itemRowStyle\">\n      <div class=\"itemNameStyle\">\n        <!--Conversation Name-->\n        {{ lastMessageName }}\n      </div>\n      <span class=\"itemLastMsgTimeStyle\">\n        {{ lastMessageTimestamp }}\n      </span>\n    </div>\n    <div class=\"itemRowStyle\">\n      <div class=\"itemLastMsgStyle\">\n        <!--Last Message-->\n        {{ lastMessage }}\n      </div>\n      <!--BadgeCount-->\n      <cometchat-badge-count\n        *ngIf=\"ConversationDetails.unreadMessageCount > 0\"\n        [count]=\"ConversationDetails.unreadMessageCount\"\n      ></cometchat-badge-count>\n    </div>\n  </div>\n</div>\n",
                    styles: [".listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:10px 20px}.listItem:hover{background-color:#eaeaea}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.itemDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.itemRowStyle{display:flex;justify-content:space-between;align-items:baseline}.itemNameStyle{font-size:15px;font-weight:600;display:block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.itemLastMsgStyle{margin:0;font-size:13px;width:calc(100% - 50px);overflow:hidden;-webkit-text-emphasis:ellipsis;text-emphasis:ellipsis;white-space:nowrap;line-height:20px;color:rgba(20,20,20,.6)}.itemLastMsgTimeStyle{font-size:11px;text-transform:uppercase;color:rgba(20,20,20,.6)}"]
                }] }
    ];
    /** @nocollapse */
    CometchatConversationListItemComponent.ctorParameters = function () { return []; };
    CometchatConversationListItemComponent.propDecorators = {
        ConversationDetails: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        onUserClick: [{ type: Output }]
    };
    return CometchatConversationListItemComponent;
}());
export { CometchatConversationListItemComponent };
if (false) {
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.ConversationDetails;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.onUserClick;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.setAvatar;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.lastMessageTimestamp;
    /** @type {?} */
    CometchatConversationListItemComponent.prototype.lastMessageName;
    /**
     * Displays lastMessage was Custom Message i.e Poll or Sticker
     * \@param
     * @type {?}
     */
    CometchatConversationListItemComponent.prototype.getCustomMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUVOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUFnQkU7UUFUUyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7UUErTDlELHFCQUFnQjs7OztRQUFHLFVBQUMsV0FBVzs7Z0JBQ3pCLE9BQU8sR0FBRyxJQUFJO1lBQ2xCLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDeEIsS0FBSyxLQUFLLENBQUMsZ0JBQWdCO29CQUN6QixPQUFPLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixDQUFDO29CQUM5QyxNQUFNO2dCQUNSLEtBQUssS0FBSyxDQUFDLG1CQUFtQjtvQkFDNUIsT0FBTyxHQUFHLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakQsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDLEVBQUM7SUF0TWEsQ0FBQzs7Ozs7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ImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QtaXRlbVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtY29udmVyc2F0aW9uLWxpc3QtaXRlbS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRDb252ZXJzYXRpb25MaXN0SXRlbUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgQ29udmVyc2F0aW9uRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIEBPdXRwdXQoKSBvblVzZXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2V0QXZhdGFyOiBzdHJpbmc7XG4gIGxhc3RNZXNzYWdlOiBzdHJpbmc7XG4gIGxhc3RNZXNzYWdlVGltZXN0YW1wOiBzdHJpbmc7XG4gIGxhc3RNZXNzYWdlTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiQ29udmVyc2F0aW9uRGV0YWlsc1wiXSkge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VbXCJDb252ZXJzYXRpb25EZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZSAhPT1cbiAgICAgICAgY2hhbmdlW1wiQ29udmVyc2F0aW9uRGV0YWlsc1wiXS5wcmV2aW91c1ZhbHVlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5nZXRMYXN0TWVzc2FnZShjaGFuZ2VbXCJDb252ZXJzYXRpb25EZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIHRoaXMuZ2V0TGFzdE1lc3NhZ2VUaW1lc3RhbXAoXG4gICAgICAgICAgY2hhbmdlW1wiQ29udmVyc2F0aW9uRGV0YWlsc1wiXS5jdXJyZW50VmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXROYW1lKGNoYW5nZVtcIkNvbnZlcnNhdGlvbkRldGFpbHNcIl0uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRMYXN0TWVzc2FnZSh0aGlzLkNvbnZlcnNhdGlvbkRldGFpbHMpO1xuICAgIHRoaXMuZ2V0TGFzdE1lc3NhZ2VUaW1lc3RhbXAodGhpcy5Db252ZXJzYXRpb25EZXRhaWxzKTtcbiAgICB0aGlzLmdldE5hbWUodGhpcy5Db252ZXJzYXRpb25EZXRhaWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIEF2YXRhciBBY2NvcmRpbmcgdG8gdXNlciB0eXBlIGllLiB1c2VyIG9yIGdyb3VwXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0QXZhdGFyKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5jb252ZXJzYXRpb25UeXBlID09PSBcInVzZXJcIikge1xuICAgICAgdGhpcy5zZXRBdmF0YXIgPSBkYXRhLmNvbnZlcnNhdGlvbldpdGg7XG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbnZlcnNhdGlvblR5cGUgPT09IFwiZ3JvdXBcIikge1xuICAgICAgdGhpcy5zZXRBdmF0YXIgPSBkYXRhLmNvbnZlcnNhdGlvbldpdGg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldEF2YXRhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIE5hbWUgb2YgTGFzdCBDb252ZXJzYXRpb24gVXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldE5hbWUoZGF0YSkge1xuICAgIHRoaXMubGFzdE1lc3NhZ2VOYW1lID0gZGF0YS5jb252ZXJzYXRpb25XaXRoLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMubGFzdE1lc3NhZ2VOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIExhc3QgQ29udmVyc2F0aW9uIHdpdGggdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldExhc3RNZXNzYWdlKGRhdGEpIHtcbiAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImxhc3RNZXNzYWdlXCIpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBkYXRhLmxhc3RNZXNzYWdlO1xuXG4gICAgaWYgKGxhc3RNZXNzYWdlLmhhc093blByb3BlcnR5KFwiZGVsZXRlZEF0XCIpKSB7XG4gICAgICBtZXNzYWdlID1cbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBsYXN0TWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgICAgPyBTVFJJTkdfTUVTU0FHRVMuWU9VX0RFTEVURURfVEhJU19NRVNTQUdFXG4gICAgICAgICAgOiBTVFJJTkdfTUVTU0FHRVMuVEhJU19NRVNTQUdFX0RFTEVURUQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAobGFzdE1lc3NhZ2UuY2F0ZWdvcnkpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5NRVNTQUdFOlxuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmdldE1lc3NhZ2UobGFzdE1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkNBTEw6XG4gICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZ2V0Q2FsbE1lc3NhZ2UobGFzdE1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkFDVElPTjpcbiAgICAgICAgICBtZXNzYWdlID0gbGFzdE1lc3NhZ2UubWVzc2FnZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DVVNUT006XG4gICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZ2V0Q3VzdG9tTWVzc2FnZShsYXN0TWVzc2FnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubGFzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHJldHVybiB0aGlzLmxhc3RNZXNzYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgVGltZSB3aGVuIHRoZSBsYXN0IGNvbnZlcnNhdGlvbiB3YXMgZG9uZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldExhc3RNZXNzYWdlVGltZXN0YW1wKGRhdGEpIHtcbiAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwibGFzdE1lc3NhZ2VcIikgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkYXRhLmxhc3RNZXNzYWdlLmhhc093blByb3BlcnR5KFwic2VudEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgdGltZXN0YW1wID0gbnVsbDtcblxuICAgIGNvbnN0IG1lc3NhZ2VUaW1lc3RhbXA6IGFueSA9IG5ldyBEYXRlKGRhdGEubGFzdE1lc3NhZ2Uuc2VudEF0ICogMTAwMCk7XG4gICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZGlmZlRpbWVzdGFtcCA9IGN1cnJlbnRUaW1lc3RhbXAgLSBtZXNzYWdlVGltZXN0YW1wO1xuICAgIGlmIChkaWZmVGltZXN0YW1wIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgdGltZXN0YW1wID0gbWVzc2FnZVRpbWVzdGFtcC50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgIGhvdXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtaW51dGU6IFwibnVtZXJpY1wiLFxuICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRpZmZUaW1lc3RhbXAgPCA0OCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICB0aW1lc3RhbXAgPSBTVFJJTkdfTUVTU0FHRVMuWUVTVEVSREFZO1xuICAgIH0gZWxzZSBpZiAoZGlmZlRpbWVzdGFtcCA8IDcgKiAyNCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICB0aW1lc3RhbXAgPSBtZXNzYWdlVGltZXN0YW1wLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgeyB3ZWVrZGF5OiBcImxvbmdcIiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZXN0YW1wID0gbWVzc2FnZVRpbWVzdGFtcC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgIHllYXI6IFwiMi1kaWdpdFwiLFxuICAgICAgICBtb250aDogXCIyLWRpZ2l0XCIsXG4gICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5sYXN0TWVzc2FnZVRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICByZXR1cm4gdGhpcy5sYXN0TWVzc2FnZVRpbWVzdGFtcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBNZXNzYWdlVHlwZSBpLmUgaWYgdGV4dCB0aGVuIGRpc3BsYXkgdGV4dCBlbHNlIGRpc3BsYXlzIGltYWdlLHZpZGVvLGV0Y1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldE1lc3NhZ2UobGFzdE1lc3NhZ2UpIHtcbiAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgc3dpdGNoIChsYXN0TWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVEVYVDpcbiAgICAgICAgbWVzc2FnZSA9IGxhc3RNZXNzYWdlLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLk1FRElBOlxuICAgICAgICBtZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk1FRElBX01FU1NBR0U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFOlxuICAgICAgICBtZXNzYWdlID0gU1RSSU5HX01FU1NBR0VTLk1FU1NBR0VfSU1BR0U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkZJTEU6XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuTUVTU0FHRV9GSUxFO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5WSURFTzpcbiAgICAgICAgbWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5NRVNTQUdFX1ZJREVPO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5BVURJTzpcbiAgICAgICAgbWVzc2FnZSA9IFNUUklOR19NRVNTQUdFUy5NRVNTQUdFX0FVRElPO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5DVVNUT006XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuQ1VTVE9NX01FU1NBR0U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGlmIGxhc3RNZXNzYWdlIHdhcyBWaWRlbyBvciBBdWRpbyBDYWxsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0Q2FsbE1lc3NhZ2UobGFzdE1lc3NhZ2UpIHtcbiAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgc3dpdGNoIChsYXN0TWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVklERU86XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuVklERU9fQ0FMTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuQVVESU86XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuQVVESU9fQ0FMTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBsYXN0TWVzc2FnZSB3YXMgQ3VzdG9tIE1lc3NhZ2UgaS5lIFBvbGwgb3IgU3RpY2tlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEN1c3RvbU1lc3NhZ2UgPSAobGFzdE1lc3NhZ2UpID0+IHtcbiAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgc3dpdGNoIChsYXN0TWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9UWVBFX1BPTEw6XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuQ1VTVE9NX01FU1NBR0VfUE9MTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVI6XG4gICAgICAgIG1lc3NhZ2UgPSBTVFJJTkdfTUVTU0FHRVMuQ1VTVE9NX01FU1NBR0VfU1RJQ0tFUjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHRpbmcgdGhlIHVzZXIgY2xpY2tlZCBzbyB0aGF0IGl0IGNhbiBiZSB1c2VkIGluIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBBbnkgdXNlclRvRW1pdFxuICAgKi9cbiAgb25Vc2VyQ2xpY2tlZCh1c2VyVG9FbWl0KSB7XG4gICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHVzZXJUb0VtaXQpO1xuICB9XG59XG4iXX0=