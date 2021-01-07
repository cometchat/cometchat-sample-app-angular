/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/Extensions/cometchat-message-reactions/cometchat-message-reactions/cometchat-message-reactions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import { REACTION_ICON } from "../../../../resources/icons/reaction";
import { STRING_MESSAGES } from "../../../../utils/messageConstants";
export class CometchatMessageReactionsComponent {
    constructor() {
        this.MessageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.messageReactions = [];
        this.reactionIcon = REACTION_ICON;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["MessageDetails"]) {
            if (change["MessageDetails"].previousValue !==
                change["MessageDetails"].currentValue) {
                /** @type {?} */
                let extensionData = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
                this.getMessageReactions(extensionData);
                // this.MessageDetails = change["MessageDetails"].currentValue;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.extensionData = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        this.getMessageReactions(this.extensionData);
    }
    /**
     * @param {?} reaction
     * @return {?}
     */
    getMessageReactions(reaction) {
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
                userList.push(reactionData[user]["name"]);
            }
            if (userList.length) {
                reactionTitle = userList.join(", ");
                reactionTitle = reactionTitle.concat(" reacted");
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
    /**
     * @param {?=} emoji
     * @return {?}
     */
    reactToMessages(emoji = null) {
        CometChat.callExtension(STRING_MESSAGES.REACTIONS, STRING_MESSAGES.POST, STRING_MESSAGES.V1_REACT, {
            msgId: this.MessageDetails.id,
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
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEmojiClick(event) {
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    sendReaction() {
        this.actionGenerated.emit({
            type: enums.REACT_TO_MESSAGE,
            payLoad: this.MessageDetails,
        });
    }
}
CometchatMessageReactionsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-reactions",
                template: "<div\n  class=\"regularReaction\"\n  [ngClass]=\"{\n    regularReactionSecondaryStyle:\n      MessageDetails.sender.uid === loggedInUser.uid\n  }\"\n>\n  <div\n    class=\"messageReactionStyle\"\n    *ngIf=\"\n      messageReactions?.length > 0 &&\n      MessageDetails.sender.uid === loggedInUser.uid\n    \"\n  >\n    <button class=\"emojiButtonStyle\" (click)=\"sendReaction()\">\n      <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n    </button>\n  </div>\n  <div\n    *ngFor=\"let reaction of messageReactions\"\n    class=\"messageReactionsStyle\"\n    (click)=\"reactToMessages(reaction)\"\n    [title]=\"reaction?.reactionTitle\"\n    [ngClass]=\"{\n      messageReactionsSecondaryStyle: reaction?.showBlueOutline,\n      messageReactionsHoverStyle: !reaction?.showBlueOutline\n    }\"\n  >\n    <ngx-emoji [emoji]=\"reaction?.reactionName\" size=\"16\"></ngx-emoji>\n    <span class=\"reactionCountStyle\">\n      {{ reaction?.reactionCount }}\n    </span>\n  </div>\n\n  <div\n    class=\"messageReactionStyle\"\n    *ngIf=\"\n      messageReactions?.length > 0 &&\n      MessageDetails.sender.uid !== loggedInUser.uid\n    \"\n  >\n    <button class=\"emojiButtonStyle\" (click)=\"sendReaction()\">\n      <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n    </button>\n  </div>\n</div>\n",
                styles: [".messageReactionsStyle{font-size:11px;padding:2px 6px;display:inline-flex;align-items:center;vertical-align:top;border-radius:12px;margin:4px 4px 0 0;cursor:pointer;background-color:#f6f6f6;border:1px solid transparent;float:right;height:30px}.messageReactionsHoverStyle{cursor:pointer}.messageReactionsHoverStyle:hover{border:1px solid #eaeaea}.messageReactionsSecondaryStyle{border:1px solid #39f}.emojiButtonStyle{outline:0;border:0;border-radius:10px;align-items:center;display:inline-flex;justify-content:center;position:relative;height:30px;margin:5px;padding:5px 10px;background-color:#f6f6f6;cursor:pointer}.reactionCountStyle{padding:0 1px 0 3px}.regularReactionIcon{height:24px;width:24px;padding:2px}.regularReaction{display:flex;flex-flow:wrap}.regularReactionSecondaryStyle{justify-content:flex-end}"]
            }] }
];
/** @nocollapse */
CometchatMessageReactionsComponent.ctorParameters = () => [];
CometchatMessageReactionsComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    loggedInUser: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.extensionData;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.reactionsName;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.messageReactions;
    /** @type {?} */
    CometchatMessageReactionsComponent.prototype.reactionIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0V4dGVuc2lvbnMvY29tZXRjaGF0LW1lc3NhZ2UtcmVhY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBT3JFLE1BQU0sT0FBTyxrQ0FBa0M7SUFTN0M7UUFSUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xFLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixpQkFBWSxHQUFHLGFBQWEsQ0FBQztJQUVkLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzVCLElBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsYUFBYTtnQkFDdEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxFQUNyQzs7b0JBQ0ksYUFBYSxHQUFHLDZCQUE2QixDQUMvQyxJQUFJ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QUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtZQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBakhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw0ekNBQTJEOzthQUU1RDs7Ozs7NkJBRUUsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFGUCw0REFBK0I7O0lBQy9CLDBEQUFzQjs7SUFDdEIsNkRBQWtFOztJQUNsRSwyREFBYzs7SUFDZCwyREFBYzs7SUFDZCw4REFBc0I7O0lBQ3RCLDBEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgUkVBQ1RJT05fSUNPTiB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvcmVhY3Rpb25cIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZS1yZWFjdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLXJlYWN0aW9ucy5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlUmVhY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIGxvZ2dlZEluVXNlcjtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGV4dGVuc2lvbkRhdGE7XG4gIHJlYWN0aW9uc05hbWU7XG4gIG1lc3NhZ2VSZWFjdGlvbnMgPSBbXTtcbiAgcmVhY3Rpb25JY29uID0gUkVBQ1RJT05fSUNPTjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLnByZXZpb3VzVmFsdWUgIT09XG4gICAgICAgIGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZVxuICAgICAgKSB7XG4gICAgICAgIGxldCBleHRlbnNpb25EYXRhID0gY2hlY2tNZXNzYWdlRm9yRXh0ZW5zaW9uc0RhdGEoXG4gICAgICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0TWVzc2FnZVJlYWN0aW9ucyhleHRlbnNpb25EYXRhKTtcbiAgICAgICAgLy8gdGhpcy5NZXNzYWdlRGV0YWlscyA9IGNoYW5nZVtcIk1lc3NhZ2VEZXRhaWxzXCJdLmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV4dGVuc2lvbkRhdGEgPSBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YShcbiAgICAgIHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgICBTVFJJTkdfTUVTU0FHRVMuUkVBQ1RJT05TXG4gICAgKTtcbiAgICB0aGlzLmdldE1lc3NhZ2VSZWFjdGlvbnModGhpcy5leHRlbnNpb25EYXRhKTtcbiAgfVxuXG4gIGdldE1lc3NhZ2VSZWFjdGlvbnMocmVhY3Rpb24pIHtcbiAgICBpZiAocmVhY3Rpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZVJlYWN0aW9ucyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKHJlYWN0aW9uKS5tYXAoKGRhdGEsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcmVhY3Rpb25EYXRhID0gcmVhY3Rpb25bZGF0YV07XG4gICAgICBjb25zdCByZWFjdGlvbkNvdW50ID0gT2JqZWN0LmtleXMocmVhY3Rpb25EYXRhKS5sZW5ndGg7XG5cbiAgICAgIGxldCBzaG93Qmx1ZU91dGxpbmUgPSBmYWxzZTtcbiAgICAgIGlmIChyZWFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkodGhpcy5sb2dnZWRJblVzZXIudWlkKSkge1xuICAgICAgICBzaG93Qmx1ZU91dGxpbmUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFjdGlvbk5hbWUgPSBkYXRhO1xuICAgICAgbGV0IG1lc3NhZ2VSZWFjdGlvbjtcblxuICAgICAgY29uc3QgdXNlckxpc3QgPSBbXTtcbiAgICAgIGxldCByZWFjdGlvblRpdGxlID0gXCJcIjtcblxuICAgICAgZm9yIChjb25zdCB1c2VyIGluIHJlYWN0aW9uRGF0YSkge1xuICAgICAgICB1c2VyTGlzdC5wdXNoKHJlYWN0aW9uRGF0YVt1c2VyXVtcIm5hbWVcIl0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodXNlckxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHJlYWN0aW9uVGl0bGUgPSB1c2VyTGlzdC5qb2luKFwiLCBcIik7XG4gICAgICAgIHJlYWN0aW9uVGl0bGUgPSByZWFjdGlvblRpdGxlLmNvbmNhdChcIiByZWFjdGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVhY3Rpb25Db3VudCkge1xuICAgICAgICBtZXNzYWdlUmVhY3Rpb24gPSB7XG4gICAgICAgICAgcmVhY3Rpb25OYW1lLFxuICAgICAgICAgIHJlYWN0aW9uQ291bnQsXG4gICAgICAgICAgcmVhY3Rpb25UaXRsZSxcbiAgICAgICAgICBzaG93Qmx1ZU91dGxpbmUsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlUmVhY3Rpb24gPSB7IHJlYWN0aW9uTmFtZSwgcmVhY3Rpb25UaXRsZSwgc2hvd0JsdWVPdXRsaW5lIH07XG4gICAgICB9XG5cbiAgICAgIG1lc3NhZ2VSZWFjdGlvbnMucHVzaChtZXNzYWdlUmVhY3Rpb24pO1xuICAgIH0pO1xuICAgIHRoaXMubWVzc2FnZVJlYWN0aW9ucyA9IG1lc3NhZ2VSZWFjdGlvbnM7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVhY3RUb01lc3NhZ2VzKGVtb2ppID0gbnVsbCkge1xuICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OUyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5QT1NULFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlYxX1JFQUNULFxuICAgICAge1xuICAgICAgICBtc2dJZDogdGhpcy5NZXNzYWdlRGV0YWlscy5pZCxcbiAgICAgICAgZW1vamk6IGVtb2ppLmNvbG9ucyB8fCBlbW9qaS5yZWFjdGlvbk5hbWUsXG4gICAgICB9XG4gICAgKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIFJlYWN0aW9uIGFkZGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gU29tZSBlcnJvciBvY2N1cmVkXG4gICAgICB9KTtcbiAgfVxuXG4gIHRyaWdnZXJFbW9qaUNsaWNrKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBzZW5kUmVhY3Rpb24oKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5SRUFDVF9UT19NRVNTQUdFLFxuICAgICAgcGF5TG9hZDogdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxufVxuIl19