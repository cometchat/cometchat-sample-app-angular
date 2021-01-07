/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/cometchat-user-details/cometchat-user-details/cometchat-user-details.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatUserDetailsComponent = /** @class */ (function () {
    function CometchatUserDetailsComponent() {
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.OPTIONS = STRING_MESSAGES.OPTIONS;
        this.DETAILS = STRING_MESSAGES.DETAILS;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatUserDetailsComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["item"]) {
            this.getBlockStatus(change["item"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    CometchatUserDetailsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} item
     * @return {?}
     */
    CometchatUserDetailsComponent.prototype.getBlockStatus = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.blockedByMe) {
            this.blockUserText = STRING_MESSAGES.UNBLOCK_USER;
        }
        else {
            this.blockUserText = STRING_MESSAGES.BLOCK_USER;
        }
        // return this.blockUserText;
    };
    /**
     * @return {?}
     */
    CometchatUserDetailsComponent.prototype.toggleBlockUser = /**
     * @return {?}
     */
    function () {
        if (this.blockUserText === STRING_MESSAGES.BLOCK_USER) {
            this.actionGenerated.emit({
                type: enums.BLOCK_USER,
            });
        }
        else if (this.blockUserText === STRING_MESSAGES.UNBLOCK_USER) {
            this.actionGenerated.emit({
                type: enums.UNBLOCK_USER,
            });
        }
    };
    /**
     * Close thread when opened in small screen
     */
    /**
     * Close thread when opened in small screen
     * @return {?}
     */
    CometchatUserDetailsComponent.prototype.closeThreadView = /**
     * Close thread when opened in small screen
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.CLOSE_DETAIL_CLICKED,
        });
    };
    CometchatUserDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-user-details",
                    template: "<div class=\"userDetailStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerCloseStyle\" (click)=\"closeThreadView()\"></div>\n    <h4 class=\"headerTitleStyle\">{{ DETAILS }}</h4>\n  </div>\n  <div class=\"sectionStyle\">\n    <!-- BLOCKED USER VIEW -->\n    <div class=\"privacySectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">{{ OPTIONS }}</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleBlockUser()\">\n            {{ blockUserText }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- BLOCKED USER VIEW -->\n\n    <!-- SHARED MEDIA VIEW -->\n    <div class=\"sharedMedia\">\n      <cometchat-shared-media\n        [item]=\"item\"\n        [type]=\"type\"\n      ></cometchat-shared-media>\n    </div>\n  </div>\n</div>\n",
                    styles: ["*{font-family:Inter,sans-serif}.userDetailStyle{height:100%;box-sizing:border-box}.userDetailStyle>*{box-sizing:border-box}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea;display:flex;justify-content:flex-start;align-items:center}.headerCloseStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAlElEQVRIS+3TQQ6AIAwEwPZl+g56kZeJB/5pmmBCjEIXIfEAV5Mdu1CmwYcH59MEqg3/s6IY40ZEi4j42gjwBCl8T8FeREIJgYA8nJkP55xOUjxmoCVcZRPQGm4CvoTDABEFy8vJLwWuCEVMgP7R7XmaJzEDrQgEPCB9F+26PK2Lmdeui1bb2LfvcEUoNIFqY8MrOgHJVToZIc83egAAAABJRU5ErkJggg==) center center no-repeat;width:24px;height:24px}.headerTitleStyle{margin:0;font-weight:700;font-size:20px}.sectionStyle{margin:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;height:calc(100% - 70px)}.privacySectionStyle{width:100%}.privacySectionStyle>div{color:#ff3b30;font-weight:600;cursor:pointer;font-size:12px}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0}.contentItemStyle{width:100%}.itemLinkStyle{font-size:15px;line-height:20px;font-weight:600;display:inline-block;color:#ff3b30}.sharedMedia{height:100%;width:100%}@media (min-width:320px) and (max-width:767px){.headerCloseStyle{display:block}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatUserDetailsComponent.ctorParameters = function () { return []; };
    CometchatUserDetailsComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatUserDetailsComponent;
}());
export { CometchatUserDetailsComponent };
if (false) {
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.item;
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.type;
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.OPTIONS;
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.DETAILS;
    /** @type {?} */
    CometchatUserDetailsComponent.prototype.blockUserText;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2Vycy9jb21ldGNoYXQtdXNlci1kZXRhaWxzL2NvbWV0Y2hhdC11c2VyLWRldGFpbHMvY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFO0lBY0U7UUFSUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDMUMsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFHM0IsQ0FBQzs7Ozs7SUFFaEIsbURBQVc7Ozs7SUFBWCxVQUFZLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztJQUNELGdEQUFROzs7SUFBUixjQUFZLENBQUM7Ozs7O0lBRWIsc0RBQWM7Ozs7SUFBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQztTQUNuRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO1NBQ2pEO1FBQ0QsNkJBQTZCO0lBQy9CLENBQUM7Ozs7SUFFRCx1REFBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLFVBQVUsRUFBRTtZQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVO2FBQ3ZCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWTthQUN6QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1REFBZTs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyx3MkJBQXNEOztpQkFFdkQ7Ozs7O3VCQUVFLEtBQUs7dUJBQ0wsS0FBSztrQ0FDTCxNQUFNOztJQTRDVCxvQ0FBQztDQUFBLEFBcERELElBb0RDO1NBL0NZLDZCQUE2Qjs7O0lBQ3hDLDZDQUFxQjs7SUFDckIsNkNBQXFCOztJQUNyQix3REFBa0U7O0lBRWxFLGdEQUEwQzs7SUFDMUMsZ0RBQTBDOztJQUUxQyxzREFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXVzZXItZGV0YWlsc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC11c2VyLWRldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC11c2VyLWRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0VXNlckRldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgT1BUSU9OUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk9QVElPTlM7XG4gIERFVEFJTFM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ERVRBSUxTO1xuXG4gIGJsb2NrVXNlclRleHQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdKSB7XG4gICAgICB0aGlzLmdldEJsb2NrU3RhdHVzKGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuXG4gIGdldEJsb2NrU3RhdHVzKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5ibG9ja2VkQnlNZSkge1xuICAgICAgdGhpcy5ibG9ja1VzZXJUZXh0ID0gU1RSSU5HX01FU1NBR0VTLlVOQkxPQ0tfVVNFUjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ibG9ja1VzZXJUZXh0ID0gU1RSSU5HX01FU1NBR0VTLkJMT0NLX1VTRVI7XG4gICAgfVxuICAgIC8vIHJldHVybiB0aGlzLmJsb2NrVXNlclRleHQ7XG4gIH1cblxuICB0b2dnbGVCbG9ja1VzZXIoKSB7XG4gICAgaWYgKHRoaXMuYmxvY2tVc2VyVGV4dCA9PT0gU1RSSU5HX01FU1NBR0VTLkJMT0NLX1VTRVIpIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5CTE9DS19VU0VSLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJsb2NrVXNlclRleHQgPT09IFNUUklOR19NRVNTQUdFUy5VTkJMT0NLX1VTRVIpIHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5VTkJMT0NLX1VTRVIsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhyZWFkIHdoZW4gb3BlbmVkIGluIHNtYWxsIHNjcmVlblxuICAgKi9cbiAgY2xvc2VUaHJlYWRWaWV3KCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xPU0VfREVUQUlMX0NMSUNLRUQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==