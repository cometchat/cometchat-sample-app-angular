/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-actions/cometchat-message-actions/cometchat-message-actions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { REACTION_ICON } from "../../../resources/icons/reaction";
export class CometchatMessageActionsComponent {
    constructor() {
        this.MessageDetails = null;
        this.actionGenerated = new EventEmitter();
        this.showToolTip = true;
        this.pollView = false;
        this.showOnlyReplyButton = false;
        this.receivedMessage = false;
        this.showReplyOption = true;
        this.threadView = false;
        this.reactionIcon = REACTION_ICON;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.MessageDetails.hasOwnProperty("parentMessageId")) {
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
            if (this.MessageDetails.sender.uid !== this.loggedInUser.uid) {
                this.showOnlyReplyButton = true;
                this.receivedMessage = true;
            }
        }));
    }
    /**
     * Generates an action to reply to the current message
     *
     * @return {?}
     */
    replyToMessage() {
        this.actionGenerated.emit({
            type: enums.VIEW_MESSAGE_THREAD,
            payLoad: this.MessageDetails,
        });
    }
    /**
     * Generates an action to edit  the current message
     *
     * @return {?}
     */
    editMessage() {
        this.actionGenerated.emit({
            type: enums.EDIT_MESSAGE,
            payLoad: this.MessageDetails,
        });
    }
    /**
     * Generates an action to Delete  the current message
     *
     * @return {?}
     */
    deleteMessage() {
        this.actionGenerated.emit({
            type: enums.DELETE_MESSAGE,
            payLoad: this.MessageDetails,
        });
    }
    /**
     * Generates an action to send Regular Reactions the current message
     *
     * @return {?}
     */
    sendReaction() {
        this.actionGenerated.emit({
            type: enums.REACT_TO_MESSAGE,
            payLoad: this.MessageDetails,
        });
    }
}
CometchatMessageActionsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-actions",
                template: "<div *ngIf=\"!pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n    [ngClass]=\"{\n      messageActionStyleSecondaryStyle: !receivedMessage\n    }\"\n  >\n    <div [class.tool]=\"!receivedMessage\" class=\"toolTip\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"showReplyOption\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle replyIcon\"\n          (click)=\"replyToMessage()\"\n        ></button>\n      </li>\n      <li\n        class=\"actionGroupStyle\"\n        *ngIf=\"!showOnlyReplyButton && MessageDetails?.type === 'text'\"\n      >\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle editIcon\"\n          (click)=\"editMessage()\"\n        ></button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n\n      <li class=\"actionGroupStyle\" *ngIf=\"receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n    </div>\n  </ul>\n</div>\n\n<!-- For Poll View Sent ,  only delete option is there -->\n<div *ngIf=\"pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n  >\n    <div [class.tool]=\"!receivedMessage\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n    </div>\n  </ul>\n</div>\n<!-- For Poll View Sent ,  only delete option is there -->\n",
                styles: [".messageActionStyle{position:absolute;z-index:4;display:flex;list-style-type:none;padding:8px;margin:0;height:35px;border:1px solid #eaeaea;background-color:#fff;border-radius:4px;align-items:center;justify-content:center;align-self:flex-start;top:-30px}.messageActionStyleSecondaryStyle{right:0}.actionGroupStyle{display:flex;position:relative;padding:3px}.groupButtonStyle{outline:0;border:0;height:24px;width:24px;border-radius:4px;align-items:center;display:inline-flex;justify-content:center;position:relative;cursor:pointer}.replyIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAACz0lEQVQ4EZ2UTWjScRjH+/+dTfOlYCCxSEJsizVadarBCAk6BPZysEMozqDZorJLh3aSHYpk2RtBwshMXRDbLjutYFBBx4qoLlN6YdSpmpYJ6rTP00FUspwPfP09r9/f7//4/H7KmuaixGKxbkVResFWsJnUPHgPFovF4qLP51tuVq40BoLBYIfNZjugqqqfmANCU2NOpVIp41silkBPut3ud405dcSJRKKPhMsUHGItUbSA/gxdCr+vrKys1Wg0Fvy78e/Dtwt8BjcLhUKk9guqxPF4fJDkhyRZWGN86vXh4eG32H+VaDSqY5MjfNl5EvqpmWPDC5x+SQr+EENqJ+EJtp7gGYJTEmxF2GCLVqsdI/c4mM7lcqf9fv8vlZ6q7HYVZ3e5XD67GlLZmM//wNddgmMGc79erx8Sv5JMJneyvuCkc5AeFmcbIhO0h9ZEqZ1lo3EVwpMYCqs425UKf6xMyQIENoPBsEHaMIIhE5Bql1XqaGOO5SOwAKPKz1dI+e9UPXrbwomFSwvoRLEshjReWjLYNiuFnZ2d61l2gC+lUikjhLMYGchHI5GIBFctMtOM3ABcQ/C8sVqtGVUGGscNHL1GozEEuXxOy+JyuTSQymRdhGOZXj92OBwlaYU0PgT5I+CD/D5ibYWZQ6xzOp0Hyb1N7SYw6fF4Xktt9Uozh13M4V12dZLwiVgolUpNcoEKklgrQqjT6frJH8V/DHwDIW7dHW5dUXKrxGKEw2G9xWI5gTrBBpl8Pt+XzWbz+NzY29jQQGwj2I5tx/6BPs96jZM+R6+KpqqhmM3mSk9PTxdFR8E4J8qaTKZ76OcI7wUD6DKn8tBM0cKxdDp9KxAIyPzWSd2Jud42dp+nWE7yFF3eZHl7r4BpiH4yr1nehwx2BTSVjtoIRKcgteOTInmbZyCa8Hq9L2vzWtHriCl4BXkR8gfcntC/3uP/kf8G3uhClzSuHPgAAAAASUVORK5CYII=) center/20px no-repeat}.deleteIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAADTUlEQVQ4T43UX2gcRRwH8O939jZpkyipLUHxT8EqBRUL0geL+CAq+CIigoI+tQ+2Su/2rNm9Ng1kI7V3u5tLdjcn2iqCVoniS62BKFStbf1La1VQ1FQpbdQ2Ji1JPUl72f1JTrPXbiO6T8P8Zj7zm9/ODLHAJwWjG3G8CcCSJEx1HhLvR2vmEdoDp9PTmO6QbVuXY2r6GJR6BhltJInHWIbZ2qtQqp9OsO2/oc78GjD6BEvalrGrOHnhBLGMd6HxZxb9Jy+BxNxogNq1SUDkKkAeBfAcqGZSEx4COAXI3sZ4RmhiSDGzFZC3QuROECOAqi1UtwX61gCogjgCFXXVaySFTasQ174C5Wq6lV//DySWcQCQL+iGT8+N/xvqNlfg3MxRZPSVLPb/KGbucbResZu2PS5mLotYH2K5PCFWPo9r2l9mzp4Wc+MRKG0PnaCnAdl2B6qTpxBzNcvhYbGMjyFxF73Bj8TMfg/R1rLP/1TM7Alk9Lvri3VmR6FrO1j0+y6EWlCdrELT7mLJ3ydm9gMocehU3rsIsoxxLF60mr3OcbGM36BUL0sDLyRQfXtmNkJGf4DF/mGxjBFoeJ7FYE8qo2no6kZuD06JZZwF8QSd4LU0NAVoG+j5Q2JmdwPyOr3KW6mMzoGLOlAqTaOQj0D1IJ2Bty+GLOMXiPTSC3eKlX8TGoZZ9HfNQ/AGPoOVi3HTbYsxMaFh/Pgf0HkPt4fvp6DcD6DaQcfvl4LxCmIeoOe/lEDXXf8lTozOwA0VtuY7UItPIqNuZzH4PL21Q9C0d1jye8UydgLxN3QHKw2o/VuMnfmdbtDcOC5NN7NY/i6VUX4fIIfoBp2y+alBxPExukE5gdraf0J18ii9wcuTA9zSsnzuD6ZrNAzBGL1gg1hGH8AzdP1nE6hZjaEWHaYbdMgW8w7MzhxEa2bp/JOSPCNiZt8AGNELH5PN+R7EmK1DlvE1MlwLvXkCf1Y/pFdZIWbuPkBGcMMtTVy/vn43G5CVexGCK+mF94ttN9WDtn1eHOcyFgpn62ftn7YUcg9DuGuuXvP3sgFtyXcikh5ItA4Z/eS/XlwRHVHUDaqldINVl0K23Ybq6SGQ90LiZKUFQapRUNbRCQ/Ox/8CRNajNq37aVYAAAAASUVORK5CYII=) center/18px no-repeat}.editIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFAAAAAA1ezu+AAACWklEQVQ4Ea2UT4gScRTHHR0R0hQ66MUVFuvQXjp2iqiFrnnolChLGFKxVBDbYaOsDnvZJXKR0JBAhQK7eOtU0CGoS5du6mWhQ2YlmE4b6vR5sj8Jx3+H/cHjzbz3vp/fvzej2Q5hZLNZn8fjuWCaZrjT6ezoh8C0AVyGcw/TvV5vQRNooVBY1jTtkt1ul6RDYrMGK/rKip4Cs/O8ivbYYDDYQ7PS7XZ3tWKxeBzYWwJLs0AHORjmHnYDzQdia9gjiQFdj8fjwrHpzJLDL5F4jT0haUhi2uj3+81Wq9X0+/3r1NzHOujK7Xb7k9II9Jy8CDAWi8nsMwdH5Q4EAlepf4j2J8XblUolXS6X+0poVw8UjYIqNu4zmYwH0HVqt8k12dVWtVrNRCKRoByjqh9BOaPhpanEuM/n80d9Pt9N6rbIGcAf1+v1XDgcPs/7LraiNCOoCkzypVLJ63K57giI/G/sQTQazYVCoQCxi7yfwP5iwzG3T9PptIvKTcQb+F9seZOzfyZqXZcr0SwLmwnlSzlCL8oNC1DOcAPgCwHK6PV6psNhbeup0FQqpbvd7gjau9g3gLcBvhTYvGFZuhIEg0Evz0lu+j3AtUWBop8Kpcn/YLdqtdoqwDdqskX81O0nk8kugM+LQMZrRitli+Z4cpF3jseiG0HnNf+kCQ5aynL9OhN9pNdOY9f41AzaZH8S4P8YMJPz1lnIKfRn0O5jP1SNnOkVEu8Ixim67HQ6eyo5y1Mnu3Sg7eBfNRqNL6pe/aRP0sTylZxViQX9d+qeG4axk0gk5I81HP8ApbX2i1+ISsQAAAAASUVORK5CYII=) center/20px no-repeat}.regularReactionIcon{height:24px;width:24px;background-color:#fff;padding:2px}.tool{justify-content:flex-end;display:flex;padding:5px}.toolTip{display:flex}"]
            }] }
];
/** @nocollapse */
CometchatMessageActionsComponent.ctorParameters = () => [];
CometchatMessageActionsComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    showToolTip: [{ type: Input }],
    pollView: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.pollView;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.showOnlyReplyButton;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.receivedMessage;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.showReplyOption;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.threadView;
    /** @type {?} */
    CometchatMessageActionsComponent.prototype.reactionIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU1sRSxNQUFNLE9BQU8sZ0NBQWdDO0lBaUIzQztRQWhCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFJbkMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsaUJBQVksR0FBRyxhQUFhLENBQUM7SUFFZCxDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDekQsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCOztZQUVHLElBQUksR0FBRyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSTs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFekIsMEVBQTBFO1lBQzFFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO2dCQUM1RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUM3QjtRQUNILENBQUMsRUFBQztJQUNKLENBQUM7Ozs7OztJQU1ELGNBQWM7UUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLG1CQUFtQjtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWTtZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsYUFBYTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsY0FBYztZQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsWUFBWTtRQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsZ0JBQWdCO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYztTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLDhyRUFBeUQ7O2FBRTFEOzs7Ozs2QkFFRSxLQUFLOzhCQUVMLE1BQU07MEJBRU4sS0FBSzt1QkFFTCxLQUFLOzs7O0lBTk4sMERBQStCOztJQUUvQiwyREFBa0U7O0lBRWxFLHVEQUFxQzs7SUFFckMsb0RBQW1DOztJQUVuQyx3REFBYTs7SUFFYiwrREFBcUM7O0lBQ3JDLDJEQUFpQzs7SUFDakMsMkRBQWdDOztJQUNoQyxzREFBNEI7O0lBQzVCLHdEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgUkVBQ1RJT05fSUNPTiB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvaWNvbnMvcmVhY3Rpb25cIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRNZXNzYWdlQWN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIE1lc3NhZ2VEZXRhaWxzID0gbnVsbDtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBzaG93VG9vbFRpcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgcG9sbFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBsb2dnZWRJblVzZXI7XG5cbiAgc2hvd09ubHlSZXBseUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICByZWNlaXZlZE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2hvd1JlcGx5T3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgdGhyZWFkVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICByZWFjdGlvbkljb24gPSBSRUFDVElPTl9JQ09OO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcInBhcmVudE1lc3NhZ2VJZFwiKSkge1xuICAgICAgLy95b3UgY2Fubm90IHJlcGx5IGFueSBtZXNzYWdlIGluc2lkZSB0aHJlYWQgd2luZG93XG4gICAgICB0aGlzLnNob3dSZXBseU9wdGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy50aHJlYWRWaWV3ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgdXNlciA9IENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG5cbiAgICAgIC8vZm9yIHRoZSBtZXNzYWdlIHRoYXQgaXMgcmVjZWl2ZWQgLCBvbmx5IHNob3cgdGhlIHJlcGx5IGJ1dHRvbiBpbiB0b29sdGlwXG4gICAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5zZW5kZXIudWlkICE9PSB0aGlzLmxvZ2dlZEluVXNlci51aWQpIHtcbiAgICAgICAgdGhpcy5zaG93T25seVJlcGx5QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWNlaXZlZE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBhY3Rpb24gdG8gcmVwbHkgdG8gdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgcmVwbHlUb01lc3NhZ2UoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5WSUVXX01FU1NBR0VfVEhSRUFELFxuICAgICAgcGF5TG9hZDogdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWN0aW9uIHRvIGVkaXQgIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICpcbiAgICovXG4gIGVkaXRNZXNzYWdlKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuRURJVF9NRVNTQUdFLFxuICAgICAgcGF5TG9hZDogdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWN0aW9uIHRvIERlbGV0ZSAgdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgZGVsZXRlTWVzc2FnZSgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkRFTEVURV9NRVNTQUdFLFxuICAgICAgcGF5TG9hZDogdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWN0aW9uIHRvIHNlbmQgUmVndWxhciBSZWFjdGlvbnMgdGhlIGN1cnJlbnQgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgc2VuZFJlYWN0aW9uKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuUkVBQ1RfVE9fTUVTU0FHRSxcbiAgICAgIHBheUxvYWQ6IHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==