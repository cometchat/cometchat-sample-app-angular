/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-actions/cometchat-message-actions/cometchat-message-actions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { REACTION_ICON } from "../../../resources/icons/reaction";
var CometchatMessageActionsComponent = /** @class */ (function () {
    function CometchatMessageActionsComponent() {
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
    CometchatMessageActionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.MessageDetails.hasOwnProperty("parentMessageId")) {
            //you cannot reply any message inside thread window
            this.showReplyOption = false;
            this.threadView = true;
        }
        /** @type {?} */
        var user = CometChat.getLoggedinUser().then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
            //for the message that is received , only show the reply button in tooltip
            if (_this.MessageDetails.sender.uid !== _this.loggedInUser.uid) {
                _this.showOnlyReplyButton = true;
                _this.receivedMessage = true;
            }
        }));
    };
    /**
     * Generates an action to reply to the current message
     *
     */
    /**
     * Generates an action to reply to the current message
     *
     * @return {?}
     */
    CometchatMessageActionsComponent.prototype.replyToMessage = /**
     * Generates an action to reply to the current message
     *
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.VIEW_MESSAGE_THREAD,
            payLoad: this.MessageDetails,
        });
    };
    /**
     * Generates an action to edit  the current message
     *
     */
    /**
     * Generates an action to edit  the current message
     *
     * @return {?}
     */
    CometchatMessageActionsComponent.prototype.editMessage = /**
     * Generates an action to edit  the current message
     *
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.EDIT_MESSAGE,
            payLoad: this.MessageDetails,
        });
    };
    /**
     * Generates an action to Delete  the current message
     *
     */
    /**
     * Generates an action to Delete  the current message
     *
     * @return {?}
     */
    CometchatMessageActionsComponent.prototype.deleteMessage = /**
     * Generates an action to Delete  the current message
     *
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.DELETE_MESSAGE,
            payLoad: this.MessageDetails,
        });
    };
    /**
     * Generates an action to send Regular Reactions the current message
     *
     */
    /**
     * Generates an action to send Regular Reactions the current message
     *
     * @return {?}
     */
    CometchatMessageActionsComponent.prototype.sendReaction = /**
     * Generates an action to send Regular Reactions the current message
     *
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.REACT_TO_MESSAGE,
            payLoad: this.MessageDetails,
        });
    };
    CometchatMessageActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-message-actions",
                    template: "<div *ngIf=\"!pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n    [ngClass]=\"{\n      messageActionStyleSecondaryStyle: !receivedMessage\n    }\"\n  >\n    <div [class.tool]=\"!receivedMessage\" class=\"toolTip\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"showReplyOption\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle replyIcon\"\n          (click)=\"replyToMessage()\"\n        ></button>\n      </li>\n      <li\n        class=\"actionGroupStyle\"\n        *ngIf=\"!showOnlyReplyButton && MessageDetails?.type === 'text'\"\n      >\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle editIcon\"\n          (click)=\"editMessage()\"\n        ></button>\n      </li>\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n\n      <li class=\"actionGroupStyle\" *ngIf=\"receivedMessage\">\n        <button type=\"button\" class=\"groupButtonStyle\" (click)=\"sendReaction()\">\n          <img [src]=\"reactionIcon\" class=\"regularReactionIcon\" />\n        </button>\n      </li>\n    </div>\n  </ul>\n</div>\n\n<!-- For Poll View Sent ,  only delete option is there -->\n<div *ngIf=\"pollView\">\n  <ul\n    class=\"messageActionStyle\"\n    *ngIf=\"\n      showToolTip && (!receivedMessage || (receivedMessage && !threadView))\n    \"\n  >\n    <div [class.tool]=\"!receivedMessage\">\n      <li class=\"actionGroupStyle\" *ngIf=\"!showOnlyReplyButton\">\n        <button\n          type=\"button\"\n          class=\"groupButtonStyle deleteIcon\"\n          (click)=\"deleteMessage()\"\n        ></button>\n      </li>\n    </div>\n  </ul>\n</div>\n<!-- For Poll View Sent ,  only delete option is there -->\n",
                    styles: [".messageActionStyle{position:absolute;z-index:4;display:flex;list-style-type:none;padding:8px;margin:0;height:35px;border:1px solid #eaeaea;background-color:#fff;border-radius:4px;align-items:center;justify-content:center;align-self:flex-start;top:-30px}.messageActionStyleSecondaryStyle{right:0}.actionGroupStyle{display:flex;position:relative;padding:3px}.groupButtonStyle{outline:0;border:0;height:24px;width:24px;border-radius:4px;align-items:center;display:inline-flex;justify-content:center;position:relative;cursor:pointer}.replyIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAACz0lEQVQ4EZ2UTWjScRjH+/+dTfOlYCCxSEJsizVadarBCAk6BPZysEMozqDZorJLh3aSHYpk2RtBwshMXRDbLjutYFBBx4qoLlN6YdSpmpYJ6rTP00FUspwPfP09r9/f7//4/H7KmuaixGKxbkVResFWsJnUPHgPFovF4qLP51tuVq40BoLBYIfNZjugqqqfmANCU2NOpVIp41silkBPut3ud405dcSJRKKPhMsUHGItUbSA/gxdCr+vrKys1Wg0Fvy78e/Dtwt8BjcLhUKk9guqxPF4fJDkhyRZWGN86vXh4eG32H+VaDSqY5MjfNl5EvqpmWPDC5x+SQr+EENqJ+EJtp7gGYJTEmxF2GCLVqsdI/c4mM7lcqf9fv8vlZ6q7HYVZ3e5XD67GlLZmM//wNddgmMGc79erx8Sv5JMJneyvuCkc5AeFmcbIhO0h9ZEqZ1lo3EVwpMYCqs425UKf6xMyQIENoPBsEHaMIIhE5Bql1XqaGOO5SOwAKPKz1dI+e9UPXrbwomFSwvoRLEshjReWjLYNiuFnZ2d61l2gC+lUikjhLMYGchHI5GIBFctMtOM3ABcQ/C8sVqtGVUGGscNHL1GozEEuXxOy+JyuTSQymRdhGOZXj92OBwlaYU0PgT5I+CD/D5ibYWZQ6xzOp0Hyb1N7SYw6fF4Xktt9Uozh13M4V12dZLwiVgolUpNcoEKklgrQqjT6frJH8V/DHwDIW7dHW5dUXKrxGKEw2G9xWI5gTrBBpl8Pt+XzWbz+NzY29jQQGwj2I5tx/6BPs96jZM+R6+KpqqhmM3mSk9PTxdFR8E4J8qaTKZ76OcI7wUD6DKn8tBM0cKxdDp9KxAIyPzWSd2Jud42dp+nWE7yFF3eZHl7r4BpiH4yr1nehwx2BTSVjtoIRKcgteOTInmbZyCa8Hq9L2vzWtHriCl4BXkR8gfcntC/3uP/kf8G3uhClzSuHPgAAAAASUVORK5CYII=) center/20px no-repeat}.deleteIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAADTUlEQVQ4T43UX2gcRRwH8O939jZpkyipLUHxT8EqBRUL0geL+CAq+CIigoI+tQ+2Su/2rNm9Ng1kI7V3u5tLdjcn2iqCVoniS62BKFStbf1La1VQ1FQpbdQ2Ji1JPUl72f1JTrPXbiO6T8P8Zj7zm9/ODLHAJwWjG3G8CcCSJEx1HhLvR2vmEdoDp9PTmO6QbVuXY2r6GJR6BhltJInHWIbZ2qtQqp9OsO2/oc78GjD6BEvalrGrOHnhBLGMd6HxZxb9Jy+BxNxogNq1SUDkKkAeBfAcqGZSEx4COAXI3sZ4RmhiSDGzFZC3QuROECOAqi1UtwX61gCogjgCFXXVaySFTasQ174C5Wq6lV//DySWcQCQL+iGT8+N/xvqNlfg3MxRZPSVLPb/KGbucbResZu2PS5mLotYH2K5PCFWPo9r2l9mzp4Wc+MRKG0PnaCnAdl2B6qTpxBzNcvhYbGMjyFxF73Bj8TMfg/R1rLP/1TM7Alk9Lvri3VmR6FrO1j0+y6EWlCdrELT7mLJ3ydm9gMocehU3rsIsoxxLF60mr3OcbGM36BUL0sDLyRQfXtmNkJGf4DF/mGxjBFoeJ7FYE8qo2no6kZuD06JZZwF8QSd4LU0NAVoG+j5Q2JmdwPyOr3KW6mMzoGLOlAqTaOQj0D1IJ2Bty+GLOMXiPTSC3eKlX8TGoZZ9HfNQ/AGPoOVi3HTbYsxMaFh/Pgf0HkPt4fvp6DcD6DaQcfvl4LxCmIeoOe/lEDXXf8lTozOwA0VtuY7UItPIqNuZzH4PL21Q9C0d1jye8UydgLxN3QHKw2o/VuMnfmdbtDcOC5NN7NY/i6VUX4fIIfoBp2y+alBxPExukE5gdraf0J18ii9wcuTA9zSsnzuD6ZrNAzBGL1gg1hGH8AzdP1nE6hZjaEWHaYbdMgW8w7MzhxEa2bp/JOSPCNiZt8AGNELH5PN+R7EmK1DlvE1MlwLvXkCf1Y/pFdZIWbuPkBGcMMtTVy/vn43G5CVexGCK+mF94ttN9WDtn1eHOcyFgpn62ftn7YUcg9DuGuuXvP3sgFtyXcikh5ItA4Z/eS/XlwRHVHUDaqldINVl0K23Ybq6SGQ90LiZKUFQapRUNbRCQ/Ox/8CRNajNq37aVYAAAAASUVORK5CYII=) center/18px no-repeat}.editIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFAAAAAA1ezu+AAACWklEQVQ4Ea2UT4gScRTHHR0R0hQ66MUVFuvQXjp2iqiFrnnolChLGFKxVBDbYaOsDnvZJXKR0JBAhQK7eOtU0CGoS5du6mWhQ2YlmE4b6vR5sj8Jx3+H/cHjzbz3vp/fvzej2Q5hZLNZn8fjuWCaZrjT6ezoh8C0AVyGcw/TvV5vQRNooVBY1jTtkt1ul6RDYrMGK/rKip4Cs/O8ivbYYDDYQ7PS7XZ3tWKxeBzYWwJLs0AHORjmHnYDzQdia9gjiQFdj8fjwrHpzJLDL5F4jT0haUhi2uj3+81Wq9X0+/3r1NzHOujK7Xb7k9II9Jy8CDAWi8nsMwdH5Q4EAlepf4j2J8XblUolXS6X+0poVw8UjYIqNu4zmYwH0HVqt8k12dVWtVrNRCKRoByjqh9BOaPhpanEuM/n80d9Pt9N6rbIGcAf1+v1XDgcPs/7LraiNCOoCkzypVLJ63K57giI/G/sQTQazYVCoQCxi7yfwP5iwzG3T9PptIvKTcQb+F9seZOzfyZqXZcr0SwLmwnlSzlCL8oNC1DOcAPgCwHK6PV6psNhbeup0FQqpbvd7gjau9g3gLcBvhTYvGFZuhIEg0Evz0lu+j3AtUWBop8Kpcn/YLdqtdoqwDdqskX81O0nk8kugM+LQMZrRitli+Z4cpF3jseiG0HnNf+kCQ5aynL9OhN9pNdOY9f41AzaZH8S4P8YMJPz1lnIKfRn0O5jP1SNnOkVEu8Ixim67HQ6eyo5y1Mnu3Sg7eBfNRqNL6pe/aRP0sTylZxViQX9d+qeG4axk0gk5I81HP8ApbX2i1+ISsQAAAAASUVORK5CYII=) center/20px no-repeat}.regularReactionIcon{height:24px;width:24px;background-color:#fff;padding:2px}.tool{justify-content:flex-end;display:flex;padding:5px}.toolTip{display:flex}"]
                }] }
    ];
    /** @nocollapse */
    CometchatMessageActionsComponent.ctorParameters = function () { return []; };
    CometchatMessageActionsComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        showToolTip: [{ type: Input }],
        pollView: [{ type: Input }]
    };
    return CometchatMessageActionsComponent;
}());
export { CometchatMessageActionsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtbWVzc2FnZS1hY3Rpb25zL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMvY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRTtJQXNCRTtRQWhCUyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFJbkMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsaUJBQVksR0FBRyxhQUFhLENBQUM7SUFFZCxDQUFDOzs7O0lBRWhCLG1EQUFROzs7SUFBUjtRQUFBLGlCQWdCQztRQWZDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN6RCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7O1lBRUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxJQUFJO1lBQy9DLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBRXpCLDBFQUEwRTtZQUMxRSxJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtnQkFDNUQsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztnQkFDaEMsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDN0I7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx5REFBYzs7Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsbUJBQW1CO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYztTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzREFBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWTtZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsd0RBQWE7Ozs7O0lBQWI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHVEQUFZOzs7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7WUFDNUIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXBGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsOHJFQUF5RDs7aUJBRTFEOzs7OztpQ0FFRSxLQUFLO2tDQUVMLE1BQU07OEJBRU4sS0FBSzsyQkFFTCxLQUFLOztJQXlFUix1Q0FBQztDQUFBLEFBckZELElBcUZDO1NBaEZZLGdDQUFnQzs7O0lBQzNDLDBEQUErQjs7SUFFL0IsMkRBQWtFOztJQUVsRSx1REFBcUM7O0lBRXJDLG9EQUFtQzs7SUFFbkMsd0RBQWE7O0lBRWIsK0RBQXFDOztJQUNyQywyREFBaUM7O0lBQ2pDLDJEQUFnQzs7SUFDaEMsc0RBQTRCOztJQUM1Qix3REFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFJFQUNUSU9OX0lDT04gfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2ljb25zL3JlYWN0aW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtYWN0aW9uc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWFjdGlvbnMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TWVzc2FnZUFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgc2hvd1Rvb2xUaXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHBvbGxWaWV3OiBib29sZWFuID0gZmFsc2U7XG5cbiAgbG9nZ2VkSW5Vc2VyO1xuXG4gIHNob3dPbmx5UmVwbHlCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVjZWl2ZWRNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIHNob3dSZXBseU9wdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIHRocmVhZFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhY3Rpb25JY29uID0gUkVBQ1RJT05fSUNPTjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRNZXNzYWdlSWRcIikpIHtcbiAgICAgIC8veW91IGNhbm5vdCByZXBseSBhbnkgbWVzc2FnZSBpbnNpZGUgdGhyZWFkIHdpbmRvd1xuICAgICAgdGhpcy5zaG93UmVwbHlPcHRpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMudGhyZWFkVmlldyA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV0IHVzZXIgPSBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuXG4gICAgICAvL2ZvciB0aGUgbWVzc2FnZSB0aGF0IGlzIHJlY2VpdmVkICwgb25seSBzaG93IHRoZSByZXBseSBidXR0b24gaW4gdG9vbHRpcFxuICAgICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMuc2VuZGVyLnVpZCAhPT0gdGhpcy5sb2dnZWRJblVzZXIudWlkKSB7XG4gICAgICAgIHRoaXMuc2hvd09ubHlSZXBseUJ1dHRvbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYWN0aW9uIHRvIHJlcGx5IHRvIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICpcbiAgICovXG4gIHJlcGx5VG9NZXNzYWdlKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuVklFV19NRVNTQUdFX1RIUkVBRCxcbiAgICAgIHBheUxvYWQ6IHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFjdGlvbiB0byBlZGl0ICB0aGUgY3VycmVudCBtZXNzYWdlXG4gICAqXG4gICAqL1xuICBlZGl0TWVzc2FnZSgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkVESVRfTUVTU0FHRSxcbiAgICAgIHBheUxvYWQ6IHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFjdGlvbiB0byBEZWxldGUgIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICpcbiAgICovXG4gIGRlbGV0ZU1lc3NhZ2UoKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICB0eXBlOiBlbnVtcy5ERUxFVEVfTUVTU0FHRSxcbiAgICAgIHBheUxvYWQ6IHRoaXMuTWVzc2FnZURldGFpbHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFjdGlvbiB0byBzZW5kIFJlZ3VsYXIgUmVhY3Rpb25zIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICpcbiAgICovXG4gIHNlbmRSZWFjdGlvbigpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlJFQUNUX1RPX01FU1NBR0UsXG4gICAgICBwYXlMb2FkOiB0aGlzLk1lc3NhZ2VEZXRhaWxzLFxuICAgIH0pO1xuICB9XG59XG4iXX0=