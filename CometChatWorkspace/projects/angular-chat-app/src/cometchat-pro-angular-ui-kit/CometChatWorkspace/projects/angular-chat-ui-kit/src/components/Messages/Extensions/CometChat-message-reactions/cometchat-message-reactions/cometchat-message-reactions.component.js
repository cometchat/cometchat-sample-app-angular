/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/CometChat-message-reactions/cometchat-message-reactions/cometchat-message-reactions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../../utils/enums";
import { checkMessageForExtensionsData, logger, } from "../../../../../utils/common";
import { REACTION_ICON } from "./resources/reaction";
import { COMETCHAT_CONSTANTS } from "../../../../../utils/messageConstants";
export class CometChatMessageReactionsComponent {
    constructor() {
        this.messageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.messageReactions = [];
        this.reactionIcon = REACTION_ICON;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.MESSAGE_DETAILS]) {
                if (change[enums.MESSAGE_DETAILS].previousValue !==
                    change[enums.MESSAGE_DETAILS].currentValue) {
                    /** @type {?} */
                    let extensionData = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
                    this.getMessageReactions(extensionData);
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
            this.extensionData = checkMessageForExtensionsData(this.messageDetails, enums.REACTIONS);
            this.getMessageReactions(this.extensionData);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * fetches the reactions that are already present on the current message
     * @param {?} reaction
     * @return {?}
     */
    getMessageReactions(reaction) {
        try {
            if (reaction === null) {
                return null;
            }
            /** @type {?} */
            let messageReactions = [];
            Object.keys(reaction).map((/**
             * @param {?} data
             * @param {?} key
             * @return {?}
             */
            (data, key) => {
                /** @type {?} */
                const reactionData = reaction[data];
                /** @type {?} */
                const reactionCount = Object.keys(reactionData).length;
                /** @type {?} */
                let showBlueOutline = false;
                if (reactionData.hasOwnProperty(this.loggedInUser.uid)) {
                    showBlueOutline = true;
                }
                /** @type {?} */
                const reactionName = data;
                /** @type {?} */
                let messageReaction;
                /** @type {?} */
                const userList = [];
                /** @type {?} */
                let reactionTitle = "";
                for (const user in reactionData) {
                    userList.push(reactionData[user][enums.NAME]);
                }
                if (userList.length) {
                    reactionTitle = userList.join(", ");
                    reactionTitle = reactionTitle.concat(` ${COMETCHAT_CONSTANTS.REACTED}`);
                }
                if (reactionCount) {
                    messageReaction = {
                        reactionName,
                        reactionCount,
                        reactionTitle,
                        showBlueOutline,
                    };
                }
                else {
                    messageReaction = { reactionName, reactionTitle, showBlueOutline };
                }
                messageReactions.push(messageReaction);
            }));
            this.messageReactions = messageReactions;
            return;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * helps to react to a message
     * @param {?=} emoji
     * @return {?}
     */
    reactToMessages(emoji = null) {
        try {
            CometChat.callExtension(enums.REACTIONS, enums.POST, enums.V1_REACT, {
                msgId: this.messageDetails.id,
                emoji: emoji.colons || emoji.reactionName,
            })
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                // Reaction added successfully
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                // Some error occured
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * stops the emoji click even from bubbling
     * @param {?} event
     * @return {?}
     */
    triggerEmojiClick(event) {
        try {
            event.stopPropagation();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * emits an action to send reaction to the current message
     * @return {?}
     */
    sendReaction() {
        try {
            this.actionGenerated.emit({
                type: enums.REACT_TO_MESSAGE,
                payLoad: this.messageDetails,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessageReactionsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-reactions",
                template: "<div\n  class=\"regularReaction\"\n  [ngClass]=\"{\n    regularReactionSecondaryStyle:\n      messageDetails.sender.uid === loggedInUser.uid\n  }\"\n>\n  <div\n    class=\"messageReactionStyle\"\n    *ngIf=\"\n      messageReactions?.length > 0 &&\n      messageDetails.sender.uid === loggedInUser.uid\n    \"\n  >\n    <button class=\"emojiButtonStyle\" (click)=\"sendReaction()\">\n      <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n    </button>\n  </div>\n  <div\n    *ngFor=\"let reaction of messageReactions\"\n    class=\"messageReactionsStyle\"\n    (click)=\"reactToMessages(reaction)\"\n    [title]=\"reaction?.reactionTitle\"\n    [ngClass]=\"{\n      messageReactionsSecondaryStyle: reaction?.showBlueOutline,\n      messageReactionsHoverStyle: !reaction?.showBlueOutline\n    }\"\n  >\n    <ngx-emoji [emoji]=\"reaction?.reactionName\" size=\"16\"></ngx-emoji>\n    <span class=\"reactionCountStyle\">\n      {{ reaction?.reactionCount }}\n    </span>\n  </div>\n\n  <div\n    class=\"messageReactionStyle\"\n    *ngIf=\"\n      messageReactions?.length > 0 &&\n      messageDetails.sender.uid !== loggedInUser.uid\n    \"\n  >\n    <button class=\"emojiButtonStyle\" (click)=\"sendReaction()\">\n      <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n    </button>\n  </div>\n</div>\n",
                styles: [".messageReactionsStyle{font-size:11px;padding:2px 6px;display:inline-flex;align-items:center;vertical-align:top;border-radius:12px;margin:4px 4px 0 0;cursor:pointer;background-color:#f6f6f6;border:1px solid transparent;float:right;height:30px}.messageReactionsHoverStyle{cursor:pointer}.messageReactionsHoverStyle:hover{border:1px solid #eaeaea}.messageReactionsSecondaryStyle{border:1px solid #39f}.emojiButtonStyle{outline:0;border:0;border-radius:10px;align-items:center;display:inline-flex;justify-content:center;position:relative;height:30px;margin:5px;padding:5px 10px;background-color:#f6f6f6;cursor:pointer}.reactionCountStyle{padding:0 1px 0 3px}.regularReactionIcon{height:24px;width:24px;padding:2px}.regularReaction{display:flex;flex-flow:wrap}.regularReactionSecondaryStyle{justify-content:flex-end}"]
            }] }
];
/** @nocollapse */
CometChatMessageReactionsComponent.ctorParameters = () => [];
CometChatMessageReactionsComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.extensionData;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.reactionsName;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.messageReactions;
    /** @type {?} */
    CometChatMessageReactionsComponent.prototype.reactionIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvQ29tZXRDaGF0LW1lc3NhZ2UtcmVhY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLE1BQU0sR0FDUCxNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQU81RSxNQUFNLE9BQU8sa0NBQWtDO0lBUzdDO1FBUlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsRSxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBRyxhQUFhLENBQUM7SUFFZCxDQUFDOzs7OztJQUVoQixXQUFXLENBQUMsTUFBcUI7UUFDL0IsSUFBSTtZQUNGLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDakMsSUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWE7b0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENB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S0FBSyxDQUFDLFlBQVk7YUFDMUMsQ0FBQztpQkFDQyxJQUFJOzs7O1lBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsOEJBQThCO1lBQ2hDLENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZixxQkFBcUI7WUFDdkIsQ0FBQyxFQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7Ozs7SUFLRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUk7WUFDRixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxZQUFZO1FBQ1YsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtnQkFDNUIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO2FBQzdCLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7OztZQWpKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsNHpDQUEyRDs7YUFFNUQ7Ozs7OzZCQUVFLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNOzs7O0lBRlAsNERBQStCOztJQUMvQiwwREFBc0I7O0lBQ3RCLDZEQUFrRTs7SUFDbEUsMkRBQWM7O0lBQ2QsMkRBQWM7O0lBQ2QsOERBQXNCOztJQUN0QiwwREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQge1xuICBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSxcbiAgbG9nZ2VyLFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBSRUFDVElPTl9JQ09OIH0gZnJvbSBcIi4vcmVzb3VyY2VzL3JlYWN0aW9uXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9uc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdE1lc3NhZ2VSZWFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcbiAgQElucHV0KCkgbG9nZ2VkSW5Vc2VyO1xuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgZXh0ZW5zaW9uRGF0YTtcbiAgcmVhY3Rpb25zTmFtZTtcbiAgbWVzc2FnZVJlYWN0aW9ucyA9IFtdO1xuICByZWFjdGlvbkljb24gPSBSRUFDVElPTl9JQ09OO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5NRVNTQUdFX0RFVEFJTFNdKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjaGFuZ2VbZW51bXMuTUVTU0FHRV9ERVRBSUxTXS5wcmV2aW91c1ZhbHVlICE9PVxuICAgICAgICAgIGNoYW5nZVtlbnVtcy5NRVNTQUdFX0RFVEFJTFNdLmN1cnJlbnRWYWx1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgZXh0ZW5zaW9uRGF0YSA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgICAgICAgIGVudW1zLlJFQUNUSU9OU1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5nZXRNZXNzYWdlUmVhY3Rpb25zKGV4dGVuc2lvbkRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uRGF0YSA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgICB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICBlbnVtcy5SRUFDVElPTlNcbiAgICAgICk7XG4gICAgICB0aGlzLmdldE1lc3NhZ2VSZWFjdGlvbnModGhpcy5leHRlbnNpb25EYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZmV0Y2hlcyB0aGUgcmVhY3Rpb25zIHRoYXQgYXJlIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgY3VycmVudCBtZXNzYWdlXG4gICAqL1xuICBnZXRNZXNzYWdlUmVhY3Rpb25zKHJlYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChyZWFjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBtZXNzYWdlUmVhY3Rpb25zID0gW107XG4gICAgICBPYmplY3Qua2V5cyhyZWFjdGlvbikubWFwKChkYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcmVhY3Rpb25EYXRhID0gcmVhY3Rpb25bZGF0YV07XG4gICAgICAgIGNvbnN0IHJlYWN0aW9uQ291bnQgPSBPYmplY3Qua2V5cyhyZWFjdGlvbkRhdGEpLmxlbmd0aDtcblxuICAgICAgICBsZXQgc2hvd0JsdWVPdXRsaW5lID0gZmFsc2U7XG4gICAgICAgIGlmIChyZWFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkodGhpcy5sb2dnZWRJblVzZXIudWlkKSkge1xuICAgICAgICAgIHNob3dCbHVlT3V0bGluZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWFjdGlvbk5hbWUgPSBkYXRhO1xuICAgICAgICBsZXQgbWVzc2FnZVJlYWN0aW9uO1xuXG4gICAgICAgIGNvbnN0IHVzZXJMaXN0ID0gW107XG4gICAgICAgIGxldCByZWFjdGlvblRpdGxlID0gXCJcIjtcblxuICAgICAgICBmb3IgKGNvbnN0IHVzZXIgaW4gcmVhY3Rpb25EYXRhKSB7XG4gICAgICAgICAgdXNlckxpc3QucHVzaChyZWFjdGlvbkRhdGFbdXNlcl1bZW51bXMuTkFNRV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHJlYWN0aW9uVGl0bGUgPSB1c2VyTGlzdC5qb2luKFwiLCBcIik7XG4gICAgICAgICAgcmVhY3Rpb25UaXRsZSA9IHJlYWN0aW9uVGl0bGUuY29uY2F0KFxuICAgICAgICAgICAgYCAke0NPTUVUQ0hBVF9DT05TVEFOVFMuUkVBQ1RFRH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWFjdGlvbkNvdW50KSB7XG4gICAgICAgICAgbWVzc2FnZVJlYWN0aW9uID0ge1xuICAgICAgICAgICAgcmVhY3Rpb25OYW1lLFxuICAgICAgICAgICAgcmVhY3Rpb25Db3VudCxcbiAgICAgICAgICAgIHJlYWN0aW9uVGl0bGUsXG4gICAgICAgICAgICBzaG93Qmx1ZU91dGxpbmUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZXNzYWdlUmVhY3Rpb24gPSB7IHJlYWN0aW9uTmFtZSwgcmVhY3Rpb25UaXRsZSwgc2hvd0JsdWVPdXRsaW5lIH07XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlUmVhY3Rpb25zLnB1c2gobWVzc2FnZVJlYWN0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tZXNzYWdlUmVhY3Rpb25zID0gbWVzc2FnZVJlYWN0aW9ucztcbiAgICAgIHJldHVybjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGVscHMgdG8gcmVhY3QgdG8gYSBtZXNzYWdlXG4gICAqL1xuICByZWFjdFRvTWVzc2FnZXMoZW1vamkgPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKGVudW1zLlJFQUNUSU9OUywgZW51bXMuUE9TVCwgZW51bXMuVjFfUkVBQ1QsIHtcbiAgICAgICAgbXNnSWQ6IHRoaXMubWVzc2FnZURldGFpbHMuaWQsXG4gICAgICAgIGVtb2ppOiBlbW9qaS5jb2xvbnMgfHwgZW1vamkucmVhY3Rpb25OYW1lLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgLy8gUmVhY3Rpb24gYWRkZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAvLyBTb21lIGVycm9yIG9jY3VyZWRcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHN0b3BzIHRoZSBlbW9qaSBjbGljayBldmVuIGZyb20gYnViYmxpbmdcbiAgICovXG4gIHRyaWdnZXJFbW9qaUNsaWNrKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBlbWl0cyBhbiBhY3Rpb24gdG8gc2VuZCByZWFjdGlvbiB0byB0aGUgY3VycmVudCBtZXNzYWdlXG4gICAqL1xuICBzZW5kUmVhY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5SRUFDVF9UT19NRVNTQUdFLFxuICAgICAgICBwYXlMb2FkOiB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=