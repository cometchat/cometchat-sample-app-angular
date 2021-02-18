/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/CometChat-user-details/cometchat-user-details/cometchat-user-details.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatUserDetailsComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.OPTIONS = COMETCHAT_CONSTANTS.OPTIONS;
        this.DETAILS = COMETCHAT_CONSTANTS.DETAILS;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                this.getBlockStatus(change[enums.ITEM].currentValue);
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Gets Status If user is Blocked/Unblocked
     * @param {?} item
     * @return {?}
     */
    getBlockStatus(item) {
        try {
            if (item.blockedByMe) {
                this.blockUserText = COMETCHAT_CONSTANTS.UNBLOCK_USER;
            }
            else {
                this.blockUserText = COMETCHAT_CONSTANTS.BLOCK_USER;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Toggle Block/Unblock
     * @return {?}
     */
    toggleBlockUser() {
        try {
            if (this.blockUserText === COMETCHAT_CONSTANTS.BLOCK_USER) {
                this.actionGenerated.emit({
                    type: enums.BLOCK_USER,
                });
            }
            else if (this.blockUserText === COMETCHAT_CONSTANTS.UNBLOCK_USER) {
                this.actionGenerated.emit({
                    type: enums.UNBLOCK_USER,
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Close thread when opened in small screen
     * @return {?}
     */
    closeThreadView() {
        try {
            this.actionGenerated.emit({
                type: enums.CLOSE_DETAIL_CLICKED,
            });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatUserDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-details",
                template: "<div class=\"userDetailStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerCloseStyle\" (click)=\"closeThreadView()\"></div>\n    <h4 class=\"headerTitleStyle\">{{ DETAILS }}</h4>\n  </div>\n  <div class=\"sectionStyle\">\n    <!-- BLOCKED USER VIEW -->\n    <div class=\"privacySectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">{{ OPTIONS }}</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleBlockUser()\">\n            {{ blockUserText }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- BLOCKED USER VIEW -->\n\n    <!-- SHARED MEDIA VIEW -->\n    <div class=\"sharedMedia\">\n      <cometchat-shared-media\n        [item]=\"item\"\n        [type]=\"type\"\n      ></cometchat-shared-media>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.userDetailStyle{height:100%;box-sizing:border-box}.userDetailStyle>*{box-sizing:border-box}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea;display:flex;justify-content:flex-start;align-items:center}.headerCloseStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAlElEQVRIS+3TQQ6AIAwEwPZl+g56kZeJB/5pmmBCjEIXIfEAV5Mdu1CmwYcH59MEqg3/s6IY40ZEi4j42gjwBCl8T8FeREIJgYA8nJkP55xOUjxmoCVcZRPQGm4CvoTDABEFy8vJLwWuCEVMgP7R7XmaJzEDrQgEPCB9F+26PK2Lmdeui1bb2LfvcEUoNIFqY8MrOgHJVToZIc83egAAAABJRU5ErkJggg==) center center no-repeat;width:24px;height:24px}.headerTitleStyle{margin:0;font-weight:700;font-size:20px}.sectionStyle{margin:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;height:calc(100% - 70px)}.privacySectionStyle{width:100%}.privacySectionStyle>div{color:#ff3b30;font-weight:600;cursor:pointer;font-size:12px}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0}.contentItemStyle{width:100%}.itemLinkStyle{font-size:15px;line-height:20px;font-weight:600;display:inline-block;color:#ff3b30}.sharedMedia{height:100%;width:100%}@media (min-width:320px) and (max-width:767px){.headerCloseStyle{display:block}}"]
            }] }
];
/** @nocollapse */
CometChatUserDetailsComponent.ctorParameters = () => [];
CometChatUserDetailsComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.item;
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.type;
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.OPTIONS;
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.DETAILS;
    /** @type {?} */
    CometChatUserDetailsComponent.prototype.blockUserText;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2Vycy9Db21ldENoYXQtdXNlci1kZXRhaWxzL2NvbWV0Y2hhdC11c2VyLWRldGFpbHMvY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTWxELE1BQU0sT0FBTyw2QkFBNkI7SUFTeEM7UUFSUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsWUFBTyxHQUFXLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUM5QyxZQUFPLEdBQVcsbUJBQW1CLENBQUMsT0FBTyxDQUFDO0lBRy9CLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJO1lBQ0YsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdEQ7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7O0lBQ0QsUUFBUSxLQUFJLENBQUM7Ozs7OztJQU1iLGNBQWMsQ0FBQyxJQUFJO1FBQ2pCLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxDQUFDO2FBQ3JEO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSTtZQUNGLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVU7aUJBQ3ZCLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVk7aUJBQ3pCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLG9CQUFvQjthQUNqQyxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF6RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHcyQkFBc0Q7O2FBRXZEOzs7OzttQkFFRSxLQUFLO21CQUNMLEtBQUs7OEJBQ0wsTUFBTTs7OztJQUZQLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQix3REFBa0U7O0lBRWxFLGdEQUE4Qzs7SUFDOUMsZ0RBQThDOztJQUU5QyxzREFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC11c2VyLWRldGFpbHNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtdXNlci1kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdXNlci1kZXRhaWxzLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdFVzZXJEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIE9QVElPTlM6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuT1BUSU9OUztcbiAgREVUQUlMUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5ERVRBSUxTO1xuXG4gIGJsb2NrVXNlclRleHQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY2hhbmdlW2VudW1zLklURU1dKSB7XG4gICAgICAgIHRoaXMuZ2V0QmxvY2tTdGF0dXMoY2hhbmdlW2VudW1zLklURU1dLmN1cnJlbnRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogR2V0cyBTdGF0dXMgSWYgdXNlciBpcyBCbG9ja2VkL1VuYmxvY2tlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldEJsb2NrU3RhdHVzKGl0ZW0pIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGl0ZW0uYmxvY2tlZEJ5TWUpIHtcbiAgICAgICAgdGhpcy5ibG9ja1VzZXJUZXh0ID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5VTkJMT0NLX1VTRVI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJsb2NrVXNlclRleHQgPSBDT01FVENIQVRfQ09OU1RBTlRTLkJMT0NLX1VTRVI7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBCbG9jay9VbmJsb2NrXG4gICAqL1xuICB0b2dnbGVCbG9ja1VzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrVXNlclRleHQgPT09IENPTUVUQ0hBVF9DT05TVEFOVFMuQkxPQ0tfVVNFUikge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5CTE9DS19VU0VSLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ibG9ja1VzZXJUZXh0ID09PSBDT01FVENIQVRfQ09OU1RBTlRTLlVOQkxPQ0tfVVNFUikge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5VTkJMT0NLX1VTRVIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aHJlYWQgd2hlbiBvcGVuZWQgaW4gc21hbGwgc2NyZWVuXG4gICAqL1xuICBjbG9zZVRocmVhZFZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5DTE9TRV9ERVRBSUxfQ0xJQ0tFRCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19