/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-message-actions/cometchat-message-actions/cometchat-message-actions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { REACTION_ICON } from "./resources/reaction";
import { logger } from "../../../../utils/common";
export class CometChatMessageActionsComponent {
    constructor() {
        this.messageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.pollView = false;
        this.showOnlyReplyButton = false;
        this.receivedMessage = false;
        this.showReplyOption = true;
        this.threadView = false;
        this.reactionIcon = REACTION_ICON;
        this.MESSAGE_TYPE_TEXT = CometChat.MESSAGE_TYPE.TEXT;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            if (this.messageDetails.hasOwnProperty(enums.PARENT_MESSAGE_ID)) {
                //you cannot reply any message inside thread window
                this.showReplyOption = false;
                this.threadView = true;
            }
            /** @type {?} */
            let user = CometChat.getLoggedinUser().then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.loggedInUser = user;
                //for the message that is received , only show the reply button in tooltip
                if (this.messageDetails.sender.uid !== this.loggedInUser.uid) {
                    this.showOnlyReplyButton = true;
                    this.receivedMessage = true;
                }
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Generates an action to reply to the current message
     *
     * @return {?}
     */
    replyToMessage() {
        try {
            this.actionGenerated.emit({
                type: enums.VIEW_MESSAGE_THREAD,
                payLoad: this.messageDetails,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Generates an action to edit  the current message
     *
     * @return {?}
     */
    editMessage() {
        try {
            this.actionGenerated.emit({
                type: enums.EDIT_MESSAGE,
                payLoad: this.messageDetails,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Generates an action to Delete  the current message
     *
     * @return {?}
     */
    deleteMessage() {
        try {
            this.actionGenerated.emit({
                type: enums.DELETE_MESSAGE,
                payLoad: this.messageDetails,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Generates an action to send Regular Reactions the current message
     *
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
CometChatMessageActionsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-actions",
                template: "<div *ngIf=\"!pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n    [ngClass]=\"{\n      messageActionStyleSecondaryStyle: !receivedMessage\n    }\"\n  >\n    <div [class.tool]=\"!receivedMessage\" class=\"toolTip\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"showReplyOption\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle replyIcon\"\n          (click)=\"replyToMessage()\"\n        ></button>\n      </li>\n      <li\n        class=\"actionGroupStyle\"\n        *ngIf=\"\n          !showOnlyReplyButton && messageDetails?.type === MESSAGE_TYPE_TEXT\n        \"\n      >\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle editIcon\"\n          (click)=\"editMessage()\"\n        ></button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n\n      <li class=\"actionGroupStyle\" *ngIf=\"receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n    </div>\n  </ul>\n</div>\n\n<!-- For Poll View Sent ,  only delete option is there -->\n<div *ngIf=\"pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n  >\n    <div [class.tool]=\"!receivedMessage\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n    </div>\n  </ul>\n</div>\n<!-- For Poll View Sent ,  only delete option is there -->\n",
                styles: [".messageActionStyle{position:absolute;z-index:4;display:flex;list-style-type:none;padding:8px;margin:0;height:35px;border:1px solid #eaeaea;background-color:#fff;border-radius:4px;align-items:center;justify-content:center;align-self:flex-start;top:-30px}.messageActionStyleSecondaryStyle{right:0}.actionGroupStyle{display:flex;position:relative;padding:3px}.groupButtonStyle{outline:0;border:0;height:24px;width:24px;border-radius:4px;align-items:center;display:inline-flex;justify-content:center;position:relative;cursor:pointer}.replyIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAACz0lEQVQ4EZ2UTWjScRjH+/+dTfOlYCCxSEJsizVadarBCAk6BPZysEMozqDZorJLh3aSHYpk2RtBwshMXRDbLjutYFBBx4qoLlN6YdSpmpYJ6rTP00FUspwPfP09r9/f7//4/H7KmuaixGKxbkVResFWsJnUPHgPFovF4qLP51tuVq40BoLBYIfNZjugqqqfmANCU2NOpVIp41silkBPut3ud405dcSJRKKPhMsUHGItUbSA/gxdCr+vrKys1Wg0Fvy78e/Dtwt8BjcLhUKk9guqxPF4fJDkhyRZWGN86vXh4eG32H+VaDSqY5MjfNl5EvqpmWPDC5x+SQr+EENqJ+EJtp7gGYJTEmxF2GCLVqsdI/c4mM7lcqf9fv8vlZ6q7HYVZ3e5XD67GlLZmM//wNddgmMGc79erx8Sv5JMJneyvuCkc5AeFmcbIhO0h9ZEqZ1lo3EVwpMYCqs425UKf6xMyQIENoPBsEHaMIIhE5Bql1XqaGOO5SOwAKPKz1dI+e9UPXrbwomFSwvoRLEshjReWjLYNiuFnZ2d61l2gC+lUikjhLMYGchHI5GIBFctMtOM3ABcQ/C8sVqtGVUGGscNHL1GozEEuXxOy+JyuTSQymRdhGOZXj92OBwlaYU0PgT5I+CD/D5ibYWZQ6xzOp0Hyb1N7SYw6fF4Xktt9Uozh13M4V12dZLwiVgolUpNcoEKklgrQqjT6frJH8V/DHwDIW7dHW5dUXKrxGKEw2G9xWI5gTrBBpl8Pt+XzWbz+NzY29jQQGwj2I5tx/6BPs96jZM+R6+KpqqhmM3mSk9PTxdFR8E4J8qaTKZ76OcI7wUD6DKn8tBM0cKxdDp9KxAIyPzWSd2Jud42dp+nWE7yFF3eZHl7r4BpiH4yr1nehwx2BTSVjtoIRKcgteOTInmbZyCa8Hq9L2vzWtHriCl4BXkR8gfcntC/3uP/kf8G3uhClzSuHPgAAAAASUVORK5CYII=) center/20px no-repeat}.deleteIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAADTUlEQVQ4T43UX2gcRRwH8O939jZpkyipLUHxT8EqBRUL0geL+CAq+CIigoI+tQ+2Su/2rNm9Ng1kI7V3u5tLdjcn2iqCVoniS62BKFStbf1La1VQ1FQpbdQ2Ji1JPUl72f1JTrPXbiO6T8P8Zj7zm9/ODLHAJwWjG3G8CcCSJEx1HhLvR2vmEdoDp9PTmO6QbVuXY2r6GJR6BhltJInHWIbZ2qtQqp9OsO2/oc78GjD6BEvalrGrOHnhBLGMd6HxZxb9Jy+BxNxogNq1SUDkKkAeBfAcqGZSEx4COAXI3sZ4RmhiSDGzFZC3QuROECOAqi1UtwX61gCogjgCFXXVaySFTasQ174C5Wq6lV//DySWcQCQL+iGT8+N/xvqNlfg3MxRZPSVLPb/KGbucbResZu2PS5mLotYH2K5PCFWPo9r2l9mzp4Wc+MRKG0PnaCnAdl2B6qTpxBzNcvhYbGMjyFxF73Bj8TMfg/R1rLP/1TM7Alk9Lvri3VmR6FrO1j0+y6EWlCdrELT7mLJ3ydm9gMocehU3rsIsoxxLF60mr3OcbGM36BUL0sDLyRQfXtmNkJGf4DF/mGxjBFoeJ7FYE8qo2no6kZuD06JZZwF8QSd4LU0NAVoG+j5Q2JmdwPyOr3KW6mMzoGLOlAqTaOQj0D1IJ2Bty+GLOMXiPTSC3eKlX8TGoZZ9HfNQ/AGPoOVi3HTbYsxMaFh/Pgf0HkPt4fvp6DcD6DaQcfvl4LxCmIeoOe/lEDXXf8lTozOwA0VtuY7UItPIqNuZzH4PL21Q9C0d1jye8UydgLxN3QHKw2o/VuMnfmdbtDcOC5NN7NY/i6VUX4fIIfoBp2y+alBxPExukE5gdraf0J18ii9wcuTA9zSsnzuD6ZrNAzBGL1gg1hGH8AzdP1nE6hZjaEWHaYbdMgW8w7MzhxEa2bp/JOSPCNiZt8AGNELH5PN+R7EmK1DlvE1MlwLvXkCf1Y/pFdZIWbuPkBGcMMtTVy/vn43G5CVexGCK+mF94ttN9WDtn1eHOcyFgpn62ftn7YUcg9DuGuuXvP3sgFtyXcikh5ItA4Z/eS/XlwRHVHUDaqldINVl0K23Ybq6SGQ90LiZKUFQapRUNbRCQ/Ox/8CRNajNq37aVYAAAAASUVORK5CYII=) center/18px no-repeat}.editIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFAAAAAA1ezu+AAACWklEQVQ4Ea2UT4gScRTHHR0R0hQ66MUVFuvQXjp2iqiFrnnolChLGFKxVBDbYaOsDnvZJXKR0JBAhQK7eOtU0CGoS5du6mWhQ2YlmE4b6vR5sj8Jx3+H/cHjzbz3vp/fvzej2Q5hZLNZn8fjuWCaZrjT6ezoh8C0AVyGcw/TvV5vQRNooVBY1jTtkt1ul6RDYrMGK/rKip4Cs/O8ivbYYDDYQ7PS7XZ3tWKxeBzYWwJLs0AHORjmHnYDzQdia9gjiQFdj8fjwrHpzJLDL5F4jT0haUhi2uj3+81Wq9X0+/3r1NzHOujK7Xb7k9II9Jy8CDAWi8nsMwdH5Q4EAlepf4j2J8XblUolXS6X+0poVw8UjYIqNu4zmYwH0HVqt8k12dVWtVrNRCKRoByjqh9BOaPhpanEuM/n80d9Pt9N6rbIGcAf1+v1XDgcPs/7LraiNCOoCkzypVLJ63K57giI/G/sQTQazYVCoQCxi7yfwP5iwzG3T9PptIvKTcQb+F9seZOzfyZqXZcr0SwLmwnlSzlCL8oNC1DOcAPgCwHK6PV6psNhbeup0FQqpbvd7gjau9g3gLcBvhTYvGFZuhIEg0Evz0lu+j3AtUWBop8Kpcn/YLdqtdoqwDdqskX81O0nk8kugM+LQMZrRitli+Z4cpF3jseiG0HnNf+kCQ5aynL9OhN9pNdOY9f41AzaZH8S4P8YMJPz1lnIKfRn0O5jP1SNnOkVEu8Ixim67HQ6eyo5y1Mnu3Sg7eBfNRqNL6pe/aRP0sTylZxViQX9d+qeG4axk0gk5I81HP8ApbX2i1+ISsQAAAAASUVORK5CYII=) center/20px no-repeat}.regularReactionIcon{height:24px;width:24px;background-color:#fff;padding:2px}.tool{justify-content:flex-end;display:flex;padding:5px}.toolTip{display:flex}"]
            }] }
];
/** @nocollapse */
CometChatMessageActionsComponent.ctorParameters = () => [];
CometChatMessageActionsComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }],
    pollView: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.showToolTip;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.pollView;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.showOnlyReplyButton;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.receivedMessage;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.showReplyOption;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.threadView;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.reactionIcon;
    /** @type {?} */
    CometChatMessageActionsComponent.prototype.MESSAGE_TYPE_TEXT;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtbWVzc2FnZS1hY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFNbEQsTUFBTSxPQUFPLGdDQUFnQztJQW1CM0M7UUFsQlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBSW5DLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGlCQUFZLEdBQUcsYUFBYSxDQUFDO1FBRTdCLHNCQUFpQixHQUFXLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBRXpDLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUMvRCxtREFBbUQ7Z0JBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUN4Qjs7Z0JBRUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBRXpCLDBFQUEwRTtnQkFDMUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7b0JBQzVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjtZQUNILENBQUMsRUFBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7OztJQU1ELGNBQWM7UUFDWixJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsbUJBQW1CO2dCQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsV0FBVztRQUNULElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsYUFBYTtRQUNYLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjO2dCQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsWUFBWTtRQUNWLElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYzthQUM3QixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUExR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLCt0RUFBeUQ7O2FBRTFEOzs7Ozs2QkFFRSxLQUFLOzhCQUVMLE1BQU07MEJBRU4sS0FBSzt1QkFFTCxLQUFLOzs7O0lBTk4sMERBQStCOztJQUUvQiwyREFBa0U7O0lBRWxFLHVEQUFxQzs7SUFFckMsb0RBQW1DOztJQUVuQyx3REFBYTs7SUFFYiwrREFBcUM7O0lBQ3JDLDJEQUFpQzs7SUFDakMsMkRBQWdDOztJQUNoQyxzREFBNEI7O0lBQzVCLHdEQUE2Qjs7SUFFN0IsNkRBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBSRUFDVElPTl9JQ09OIH0gZnJvbSBcIi4vcmVzb3VyY2VzL3JlYWN0aW9uXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9uc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TWVzc2FnZUFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHBvbGxWaWV3OiBib29sZWFuID0gZmFsc2U7XG5cbiAgbG9nZ2VkSW5Vc2VyO1xuXG4gIHNob3dPbmx5UmVwbHlCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVjZWl2ZWRNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dSZXBseU9wdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIHRocmVhZFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhY3Rpb25JY29uID0gUkVBQ1RJT05fSUNPTjtcblxuICBNRVNTQUdFX1RZUEVfVEVYVDogU3RyaW5nID0gQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5URVhUO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoZW51bXMuUEFSRU5UX01FU1NBR0VfSUQpKSB7XG4gICAgICAgIC8veW91IGNhbm5vdCByZXBseSBhbnkgbWVzc2FnZSBpbnNpZGUgdGhyZWFkIHdpbmRvd1xuICAgICAgICB0aGlzLnNob3dSZXBseU9wdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRocmVhZFZpZXcgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXNlciA9IENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcblxuICAgICAgICAvL2ZvciB0aGUgbWVzc2FnZSB0aGF0IGlzIHJlY2VpdmVkICwgb25seSBzaG93IHRoZSByZXBseSBidXR0b24gaW4gdG9vbHRpcFxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5zZW5kZXIudWlkICE9PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgICB0aGlzLnNob3dPbmx5UmVwbHlCdXR0b24gPSB0cnVlO1xuICAgICAgICAgIHRoaXMucmVjZWl2ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBhY3Rpb24gdG8gcmVwbHkgdG8gdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgcmVwbHlUb01lc3NhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFELFxuICAgICAgICBwYXlMb2FkOiB0aGlzLm1lc3NhZ2VEZXRhaWxzLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBhY3Rpb24gdG8gZWRpdCAgdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgZWRpdE1lc3NhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5FRElUX01FU1NBR0UsXG4gICAgICAgIHBheUxvYWQ6IHRoaXMubWVzc2FnZURldGFpbHMsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFjdGlvbiB0byBEZWxldGUgIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICpcbiAgICovXG4gIGRlbGV0ZU1lc3NhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5ERUxFVEVfTUVTU0FHRSxcbiAgICAgICAgcGF5TG9hZDogdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWN0aW9uIHRvIHNlbmQgUmVndWxhciBSZWFjdGlvbnMgdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgc2VuZFJlYWN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuUkVBQ1RfVE9fTUVTU0FHRSxcbiAgICAgICAgcGF5TG9hZDogdGhpcy5tZXNzYWdlRGV0YWlscyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19