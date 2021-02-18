/**
 * @fileoverview added by tsickle
 * Generated from: components/Chats/CometChat-conversation-list-item/cometchat-conversation-list-item/cometchat-conversation-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatConversationListItemComponent {
    constructor() {
        this.conversationDetails = null;
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
        (lastMessage) => {
            try {
                /** @type {?} */
                let message = null;
                switch (lastMessage.type) {
                    case enums.CUSTOM_TYPE_POLL:
                        message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE_POLL;
                        break;
                    case enums.CUSTOM_TYPE_STICKER:
                        message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE_STICKER;
                        break;
                    default:
                        break;
                }
                return message;
            }
            catch (error) {
                logger(error);
            }
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.CONVERSATION_DETAILS]) {
                if (change[enums.CONVERSATION_DETAILS].currentValue !==
                    change[enums.CONVERSATION_DETAILS].previousValue) {
                    this.getLastMessage(change[enums.CONVERSATION_DETAILS].currentValue);
                    this.getLastMessageTimestamp(change[enums.CONVERSATION_DETAILS].currentValue);
                    this.getName(change[enums.CONVERSATION_DETAILS].currentValue);
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.getLastMessage(this.conversationDetails);
            this.getLastMessageTimestamp(this.conversationDetails);
            this.getName(this.conversationDetails);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets Avatar According to user type ie. user or group
     * @param {?} data
     * @return {?}
     */
    getAvatar(data) {
        try {
            if (data.conversationType === CometChat.RECEIVER_TYPE.USER) {
                this.setAvatar = data.conversationWith;
            }
            else if (data.conversationType === CometChat.RECEIVER_TYPE.GROUP) {
                this.setAvatar = data.conversationWith;
            }
            return this.setAvatar;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets Name of Last Conversation User
     * @param {?} data
     * @return {?}
     */
    getName(data) {
        try {
            this.lastMessageName = data.conversationWith.name;
            return this.lastMessageName;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets the Last Conversation with user
     * @param {?} data
     * @return {?}
     */
    getLastMessage(data) {
        try {
            if (data === null) {
                return false;
            }
            if (data.hasOwnProperty(enums.LAST_MESSAGE) === false) {
                return false;
            }
            /** @type {?} */
            let message = null;
            /** @type {?} */
            const lastMessage = data.lastMessage;
            if (lastMessage.hasOwnProperty(enums.DELETED_AT)) {
                message =
                    this.loggedInUser.uid === lastMessage.sender.uid
                        ? COMETCHAT_CONSTANTS.YOU_DELETED_THIS_MESSAGE
                        : COMETCHAT_CONSTANTS.THIS_MESSAGE_DELETED;
            }
            else {
                switch (lastMessage.category) {
                    case CometChat.CATEGORY_MESSAGE:
                        message = this.getMessage(lastMessage);
                        break;
                    case CometChat.CATEGORY_CALL:
                        message = this.getCallMessage(lastMessage);
                        break;
                    case CometChat.CATEGORY_ACTION:
                        message = lastMessage.message;
                        break;
                    case CometChat.MESSAGE_TYPE.CUSTOM:
                        message = this.getCustomMessage(lastMessage);
                        break;
                    default:
                        break;
                }
            }
            this.lastMessage = message;
            return this.lastMessage;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets Time when the last conversation was done
     * @param {?} data
     * @return {?}
     */
    getLastMessageTimestamp(data) {
        try {
            if (data === null) {
                return false;
            }
            if (data.hasOwnProperty(enums.LAST_MESSAGE) === false) {
                return false;
            }
            if (data.lastMessage.hasOwnProperty(enums.SENT_AT) === false) {
                return false;
            }
            /** @type {?} */
            let timestamp = null;
            /** @type {?} */
            const messageTimestamp = new Date(data.lastMessage.sentAt * 1000);
            /** @type {?} */
            const currentTimestamp = Date.now();
            /** @type {?} */
            const diffTimestamp = currentTimestamp - messageTimestamp;
            if (diffTimestamp < 24 * 60 * 60 * 1000) {
                timestamp = messageTimestamp.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });
            }
            else if (diffTimestamp < 48 * 60 * 60 * 1000) {
                timestamp = COMETCHAT_CONSTANTS.YESTERDAY;
            }
            else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
                timestamp = messageTimestamp.toLocaleString("en-US", {
                    weekday: "long",
                });
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets the MessageType i.e if text then display text else displays image,video,etc
     * @param {?} lastMessage
     * @return {?}
     */
    getMessage(lastMessage) {
        try {
            /** @type {?} */
            let message = null;
            switch (lastMessage.type) {
                case CometChat.MESSAGE_TYPE.TEXT:
                    message = lastMessage.text;
                    break;
                case CometChat.MESSAGE_TYPE.MEDIA:
                    message = COMETCHAT_CONSTANTS.MEDIA_MESSAGE;
                    break;
                case CometChat.MESSAGE_TYPE.IMAGE:
                    message = COMETCHAT_CONSTANTS.MESSAGE_IMAGE;
                    break;
                case CometChat.MESSAGE_TYPE.FILE:
                    message = COMETCHAT_CONSTANTS.MESSAGE_FILE;
                    break;
                case CometChat.MESSAGE_TYPE.VIDEO:
                    message = COMETCHAT_CONSTANTS.MESSAGE_VIDEO;
                    break;
                case CometChat.MESSAGE_TYPE.AUDIO:
                    message = COMETCHAT_CONSTANTS.MESSAGE_AUDIO;
                    break;
                case CometChat.MESSAGE_TYPE.CUSTOM:
                    message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE;
                    break;
                default:
                    break;
            }
            return message;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Displays if lastMessage was Video or Audio Call
     * @param {?} lastMessage
     * @return {?}
     */
    getCallMessage(lastMessage) {
        try {
            /** @type {?} */
            let message = null;
            switch (lastMessage.type) {
                case CometChat.MESSAGE_TYPE.VIDEO:
                    message = COMETCHAT_CONSTANTS.VIDEO_CALL;
                    break;
                case CometChat.MESSAGE_TYPE.AUDIO:
                    message = COMETCHAT_CONSTANTS.AUDIO_CALL;
                    break;
                default:
                    break;
            }
            return message;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param {?} userToEmit
     * @return {?}
     */
    onUserClicked(userToEmit) {
        try {
            this.onUserClick.emit(userToEmit);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatConversationListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-conversation-list-item",
                template: "<div class=\"listItem\" (click)=\"onUserClicked(conversationDetails)\">\n  <div class=\"itemThumbnailStyle\">\n    <!--Avatar-->\n    <cometchat-avatar\n      [item]=\"getAvatar(conversationDetails)\"\n      [userStatus]=\"conversationDetails.conversationWith.status\"\n    ></cometchat-avatar>\n  </div>\n  <div class=\"itemDetailStyle\">\n    <div class=\"itemRowStyle\">\n      <div class=\"itemNameStyle\">\n        <!--Conversation Name-->\n        {{ lastMessageName }}\n      </div>\n      <span class=\"itemLastMsgTimeStyle\">\n        {{ lastMessageTimestamp }}\n      </span>\n    </div>\n    <div class=\"itemRowStyle\">\n      <div class=\"itemLastMsgStyle\">\n        <!--Last Message-->\n        {{ lastMessage }}\n      </div>\n      <!--BadgeCount-->\n      <cometchat-badge-count\n        *ngIf=\"conversationDetails.unreadMessageCount > 0\"\n        [count]=\"conversationDetails.unreadMessageCount\"\n      ></cometchat-badge-count>\n    </div>\n  </div>\n</div>\n",
                styles: [".listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:10px 20px}.listItem:hover{background-color:#eaeaea}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.itemDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.itemRowStyle{display:flex;justify-content:space-between;align-items:baseline}.itemNameStyle{font-size:15px;font-weight:600;display:block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.itemLastMsgStyle{margin:0;font-size:13px;width:calc(100% - 30px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:20px;color:rgba(20,20,20,.6)}.itemLastMsgTimeStyle{font-size:11px;text-transform:uppercase;color:rgba(20,20,20,.6)}"]
            }] }
];
/** @nocollapse */
CometChatConversationListItemComponent.ctorParameters = () => [];
CometChatConversationListItemComponent.propDecorators = {
    conversationDetails: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    onUserClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.conversationDetails;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.onUserClick;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.setAvatar;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.lastMessage;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.lastMessageTimestamp;
    /** @type {?} */
    CometChatConversationListItemComponent.prototype.lastMessageName;
    /**
     * Displays lastMessage was Custom Message i.e Poll or Sticker
     * \@param
     * @type {?}
     */
    CometChatConversationListItemComponent.prototype.getCustomMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2hhdHMvQ29tZXRDaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUVOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPbEQsTUFBTSxPQUFPLHNDQUFzQztJQVdqRDtRQVRTLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDOzs7OztRQWtPOUQscUJBQWdCOzs7O1FBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNqQyxJQUFJOztvQkFDRSxPQUFPLEdBQUcsSUFBSTtnQkFDbEIsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUN4QixLQUFLLEtBQUssQ0FBQyxnQkFBZ0I7d0JBQ3pCLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDbEQsTUFBTTtvQkFDUixLQUFLLEtBQUssQ0FBQyxtQkFBbUI7d0JBQzVCLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDckQsTUFBTTtvQkFDUjt3QkFDRSxNQUFNO2lCQUNUO2dCQUVELE9BQU8sT0FBTyxDQUFDO2FBQ2hCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7SUE3T2EsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUk7WUFDRixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDdEMsSUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWTtvQkFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLGFBQWEsRUFDaEQ7b0JBQ0EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JFLElBQUksQ0FBQyx1QkFBdUIsQ0FDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksQ0FDaEQsQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDL0Q7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSTtZQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDeEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsU0FBUyxDQUFDLElBQUk7UUFDWixJQUFJO1lBQ0YsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2FBQ3hDO2lCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFNRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7WUFDbEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQzdCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxJQUFJO1FBQ2pCLElBQUk7WUFDRixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDckQsT0FBTyxLQUFLLENBQUM7YUFDZDs7Z0JBQ0csT0FBTyxHQUFHLElBQUk7O2tCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUVwQyxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNoRCxPQUFPO29CQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRzt3QkFDOUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLHdCQUF3Qjt3QkFDOUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLFFBQVEsV0FBVyxDQUFDLFFBQVEsRUFBRTtvQkFDNUIsS0FBSyxTQUFTLENBQUMsZ0JBQWdCO3dCQUM3QixPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDdkMsTUFBTTtvQkFDUixLQUFLLFNBQVMsQ0FBQyxhQUFhO3dCQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDUixLQUFLLFNBQVMsQ0FBQyxlQUFlO3dCQUM1QixPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQzt3QkFDOUIsTUFBTTtvQkFDUixLQUFLLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTTt3QkFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDN0MsTUFBTTtvQkFDUjt3QkFDRSxNQUFNO2lCQUNUO2FBQ0Y7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsdUJBQXVCLENBQUMsSUFBSTtRQUMxQixJQUFJO1lBQ0YsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3JELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQzVELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7O2dCQUNHLFNBQVMsR0FBRyxJQUFJOztrQkFFZCxnQkFBZ0IsR0FBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7O2tCQUNoRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOztrQkFDN0IsYUFBYSxHQUFHLGdCQUFnQixHQUFHLGdCQUFnQjtZQUN6RCxJQUFJLGFBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7Z0JBQ3ZDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZELElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsSUFBSTtpQkFDYixDQUFDLENBQUM7YUFDSjtpQkFBTSxJQUFJLGFBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7Z0JBQzlDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7YUFDM0M7aUJBQU0sSUFBSSxhQUFhLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRTtnQkFDbEQsU0FBUyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7b0JBQ25ELE9BQU8sRUFBRSxNQUFNO2lCQUNoQixDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO29CQUN2RCxJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsU0FBUztvQkFDaEIsR0FBRyxFQUFFLFNBQVM7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ2xDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELFVBQVUsQ0FBQyxXQUFXO1FBQ3BCLElBQUk7O2dCQUNFLE9BQU8sR0FBRyxJQUFJO1lBQ2xCLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDeEIsS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUk7b0JBQzlCLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUMzQixNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUMvQixPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDO29CQUM1QyxNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUMvQixPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDO29CQUM1QyxNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJO29CQUM5QixPQUFPLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDO29CQUMzQyxNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUMvQixPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDO29CQUM1QyxNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUMvQixPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDO29CQUM1QyxNQUFNO2dCQUNSLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNO29CQUNoQyxPQUFPLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDO29CQUM3QyxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtZQUNELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxXQUFXO1FBQ3hCLElBQUk7O2dCQUNFLE9BQU8sR0FBRyxJQUFJO1lBQ2xCLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDeEIsS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUs7b0JBQy9CLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLE1BQU07Z0JBQ1IsS0FBSyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUs7b0JBQy9CLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTTthQUNUO1lBRUQsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBOEJELGFBQWEsQ0FBQyxVQUFVO1FBQ3RCLElBQUk7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF6UUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLG0rQkFBZ0U7O2FBRWpFOzs7OztrQ0FHRSxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsTUFBTTs7OztJQUZQLHFFQUFvQzs7SUFDcEMsOERBQTZCOztJQUM3Qiw2REFBOEQ7O0lBRTlELDJEQUFrQjs7SUFDbEIsNkRBQW9COztJQUNwQixzRUFBNkI7O0lBQzdCLGlFQUF3Qjs7Ozs7O0lBNk54QixrRUFrQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC1pdGVtXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWNvbnZlcnNhdGlvbi1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1jb252ZXJzYXRpb24tbGlzdC1pdGVtLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdENvbnZlcnNhdGlvbkxpc3RJdGVtQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb252ZXJzYXRpb25EZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uVXNlckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzZXRBdmF0YXI6IHN0cmluZztcbiAgbGFzdE1lc3NhZ2U6IHN0cmluZztcbiAgbGFzdE1lc3NhZ2VUaW1lc3RhbXA6IHN0cmluZztcbiAgbGFzdE1lc3NhZ2VOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2hhbmdlW2VudW1zLkNPTlZFUlNBVElPTl9ERVRBSUxTXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW2VudW1zLkNPTlZFUlNBVElPTl9ERVRBSUxTXS5jdXJyZW50VmFsdWUgIT09XG4gICAgICAgICAgY2hhbmdlW2VudW1zLkNPTlZFUlNBVElPTl9ERVRBSUxTXS5wcmV2aW91c1ZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuZ2V0TGFzdE1lc3NhZ2UoY2hhbmdlW2VudW1zLkNPTlZFUlNBVElPTl9ERVRBSUxTXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgIHRoaXMuZ2V0TGFzdE1lc3NhZ2VUaW1lc3RhbXAoXG4gICAgICAgICAgICBjaGFuZ2VbZW51bXMuQ09OVkVSU0FUSU9OX0RFVEFJTFNdLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5nZXROYW1lKGNoYW5nZVtlbnVtcy5DT05WRVJTQVRJT05fREVUQUlMU10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdldExhc3RNZXNzYWdlKHRoaXMuY29udmVyc2F0aW9uRGV0YWlscyk7XG4gICAgICB0aGlzLmdldExhc3RNZXNzYWdlVGltZXN0YW1wKHRoaXMuY29udmVyc2F0aW9uRGV0YWlscyk7XG4gICAgICB0aGlzLmdldE5hbWUodGhpcy5jb252ZXJzYXRpb25EZXRhaWxzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBBdmF0YXIgQWNjb3JkaW5nIHRvIHVzZXIgdHlwZSBpZS4gdXNlciBvciBncm91cFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEF2YXRhcihkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChkYXRhLmNvbnZlcnNhdGlvblR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIpIHtcbiAgICAgICAgdGhpcy5zZXRBdmF0YXIgPSBkYXRhLmNvbnZlcnNhdGlvbldpdGg7XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuY29udmVyc2F0aW9uVHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgdGhpcy5zZXRBdmF0YXIgPSBkYXRhLmNvbnZlcnNhdGlvbldpdGg7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zZXRBdmF0YXI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgTmFtZSBvZiBMYXN0IENvbnZlcnNhdGlvbiBVc2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0TmFtZShkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubGFzdE1lc3NhZ2VOYW1lID0gZGF0YS5jb252ZXJzYXRpb25XaXRoLm5hbWU7XG4gICAgICByZXR1cm4gdGhpcy5sYXN0TWVzc2FnZU5hbWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIExhc3QgQ29udmVyc2F0aW9uIHdpdGggdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldExhc3RNZXNzYWdlKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuTEFTVF9NRVNTQUdFKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IG1lc3NhZ2UgPSBudWxsO1xuICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBkYXRhLmxhc3RNZXNzYWdlO1xuXG4gICAgICBpZiAobGFzdE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuREVMRVRFRF9BVCkpIHtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIudWlkID09PSBsYXN0TWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgICAgICA/IENPTUVUQ0hBVF9DT05TVEFOVFMuWU9VX0RFTEVURURfVEhJU19NRVNTQUdFXG4gICAgICAgICAgICA6IENPTUVUQ0hBVF9DT05TVEFOVFMuVEhJU19NRVNTQUdFX0RFTEVURUQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGxhc3RNZXNzYWdlLmNhdGVnb3J5KSB7XG4gICAgICAgICAgY2FzZSBDb21ldENoYXQuQ0FURUdPUllfTUVTU0FHRTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmdldE1lc3NhZ2UobGFzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBDb21ldENoYXQuQ0FURUdPUllfQ0FMTDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmdldENhbGxNZXNzYWdlKGxhc3RNZXNzYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQ29tZXRDaGF0LkNBVEVHT1JZX0FDVElPTjpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBsYXN0TWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkNVU1RPTTpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmdldEN1c3RvbU1lc3NhZ2UobGFzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RNZXNzYWdlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIFRpbWUgd2hlbiB0aGUgbGFzdCBjb252ZXJzYXRpb24gd2FzIGRvbmVcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRMYXN0TWVzc2FnZVRpbWVzdGFtcChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoZW51bXMuTEFTVF9NRVNTQUdFKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEubGFzdE1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuU0VOVF9BVCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxldCB0aW1lc3RhbXAgPSBudWxsO1xuXG4gICAgICBjb25zdCBtZXNzYWdlVGltZXN0YW1wOiBhbnkgPSBuZXcgRGF0ZShkYXRhLmxhc3RNZXNzYWdlLnNlbnRBdCAqIDEwMDApO1xuICAgICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBkaWZmVGltZXN0YW1wID0gY3VycmVudFRpbWVzdGFtcCAtIG1lc3NhZ2VUaW1lc3RhbXA7XG4gICAgICBpZiAoZGlmZlRpbWVzdGFtcCA8IDI0ICogNjAgKiA2MCAqIDEwMDApIHtcbiAgICAgICAgdGltZXN0YW1wID0gbWVzc2FnZVRpbWVzdGFtcC50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgICAgICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChkaWZmVGltZXN0YW1wIDwgNDggKiA2MCAqIDYwICogMTAwMCkge1xuICAgICAgICB0aW1lc3RhbXAgPSBDT01FVENIQVRfQ09OU1RBTlRTLllFU1RFUkRBWTtcbiAgICAgIH0gZWxzZSBpZiAoZGlmZlRpbWVzdGFtcCA8IDcgKiAyNCAqIDYwICogNjAgKiAxMDAwKSB7XG4gICAgICAgIHRpbWVzdGFtcCA9IG1lc3NhZ2VUaW1lc3RhbXAudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgICAgd2Vla2RheTogXCJsb25nXCIsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZXN0YW1wID0gbWVzc2FnZVRpbWVzdGFtcC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgICAgeWVhcjogXCIyLWRpZ2l0XCIsXG4gICAgICAgICAgbW9udGg6IFwiMi1kaWdpdFwiLFxuICAgICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0TWVzc2FnZVRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RNZXNzYWdlVGltZXN0YW1wO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBNZXNzYWdlVHlwZSBpLmUgaWYgdGV4dCB0aGVuIGRpc3BsYXkgdGV4dCBlbHNlIGRpc3BsYXlzIGltYWdlLHZpZGVvLGV0Y1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldE1lc3NhZ2UobGFzdE1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBudWxsO1xuICAgICAgc3dpdGNoIChsYXN0TWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5URVhUOlxuICAgICAgICAgIG1lc3NhZ2UgPSBsYXN0TWVzc2FnZS50ZXh0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuTUVESUE6XG4gICAgICAgICAgbWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuTUVESUFfTUVTU0FHRTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLklNQUdFOlxuICAgICAgICAgIG1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLk1FU1NBR0VfSU1BR0U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5GSUxFOlxuICAgICAgICAgIG1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLk1FU1NBR0VfRklMRTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb21ldENoYXQuTUVTU0FHRV9UWVBFLlZJREVPOlxuICAgICAgICAgIG1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLk1FU1NBR0VfVklERU87XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5BVURJTzpcbiAgICAgICAgICBtZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5NRVNTQUdFX0FVRElPO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuQ1VTVE9NOlxuICAgICAgICAgIG1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkNVU1RPTV9NRVNTQUdFO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGlmIGxhc3RNZXNzYWdlIHdhcyBWaWRlbyBvciBBdWRpbyBDYWxsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0Q2FsbE1lc3NhZ2UobGFzdE1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBudWxsO1xuICAgICAgc3dpdGNoIChsYXN0TWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5WSURFTzpcbiAgICAgICAgICBtZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5WSURFT19DQUxMO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuQVVESU86XG4gICAgICAgICAgbWVzc2FnZSA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQVVESU9fQ0FMTDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGxhc3RNZXNzYWdlIHdhcyBDdXN0b20gTWVzc2FnZSBpLmUgUG9sbCBvciBTdGlja2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0Q3VzdG9tTWVzc2FnZSA9IChsYXN0TWVzc2FnZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgICBzd2l0Y2ggKGxhc3RNZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBlbnVtcy5DVVNUT01fVFlQRV9QT0xMOlxuICAgICAgICAgIG1lc3NhZ2UgPSBDT01FVENIQVRfQ09OU1RBTlRTLkNVU1RPTV9NRVNTQUdFX1BPTEw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUjpcbiAgICAgICAgICBtZXNzYWdlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DVVNUT01fTUVTU0FHRV9TVElDS0VSO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSB1c2VyIGNsaWNrZWQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gQW55IHVzZXJUb0VtaXRcbiAgICovXG4gIG9uVXNlckNsaWNrZWQodXNlclRvRW1pdCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm9uVXNlckNsaWNrLmVtaXQodXNlclRvRW1pdCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=