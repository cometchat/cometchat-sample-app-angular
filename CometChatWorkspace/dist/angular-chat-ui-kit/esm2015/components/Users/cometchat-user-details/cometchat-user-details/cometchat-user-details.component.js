/**
 * @fileoverview added by tsickle
 * Generated from: components/Users/cometchat-user-details/cometchat-user-details/cometchat-user-details.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatUserDetailsComponent {
    constructor() {
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
    ngOnChanges(change) {
        if (change["item"]) {
            this.getBlockStatus(change["item"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} item
     * @return {?}
     */
    getBlockStatus(item) {
        if (item.blockedByMe) {
            this.blockUserText = STRING_MESSAGES.UNBLOCK_USER;
        }
        else {
            this.blockUserText = STRING_MESSAGES.BLOCK_USER;
        }
        // return this.blockUserText;
    }
    /**
     * @return {?}
     */
    toggleBlockUser() {
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
    }
    /**
     * Close thread when opened in small screen
     * @return {?}
     */
    closeThreadView() {
        this.actionGenerated.emit({
            type: enums.CLOSE_DETAIL_CLICKED,
        });
    }
}
CometchatUserDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-details",
                template: "<div class=\"userDetailStyle\">\n  <div class=\"headerStyle\">\n    <div class=\"headerCloseStyle\" (click)=\"closeThreadView()\"></div>\n    <h4 class=\"headerTitleStyle\">{{ DETAILS }}</h4>\n  </div>\n  <div class=\"sectionStyle\">\n    <!-- BLOCKED USER VIEW -->\n    <div class=\"privacySectionStyle\">\n      <h6 class=\"sectionHeaderStyle\">{{ OPTIONS }}</h6>\n      <div class=\"sectionContentStyle\">\n        <div class=\"contentItemStyle\">\n          <div class=\"itemLinkStyle\" (click)=\"toggleBlockUser()\">\n            {{ blockUserText }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- BLOCKED USER VIEW -->\n\n    <!-- SHARED MEDIA VIEW -->\n    <div class=\"sharedMedia\">\n      <cometchat-shared-media\n        [item]=\"item\"\n        [type]=\"type\"\n      ></cometchat-shared-media>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{font-family:Inter,sans-serif}.userDetailStyle{height:100%;box-sizing:border-box}.userDetailStyle>*{box-sizing:border-box}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea;display:flex;justify-content:flex-start;align-items:center}.headerCloseStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAlElEQVRIS+3TQQ6AIAwEwPZl+g56kZeJB/5pmmBCjEIXIfEAV5Mdu1CmwYcH59MEqg3/s6IY40ZEi4j42gjwBCl8T8FeREIJgYA8nJkP55xOUjxmoCVcZRPQGm4CvoTDABEFy8vJLwWuCEVMgP7R7XmaJzEDrQgEPCB9F+26PK2Lmdeui1bb2LfvcEUoNIFqY8MrOgHJVToZIc83egAAAABJRU5ErkJggg==) center center no-repeat;width:24px;height:24px}.headerTitleStyle{margin:0;font-weight:700;font-size:20px}.sectionStyle{margin:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;height:calc(100% - 70px)}.privacySectionStyle{width:100%}.privacySectionStyle>div{color:#ff3b30;font-weight:600;cursor:pointer;font-size:12px}.sectionHeaderStyle{margin:0;width:100%;font-size:12px;font-weight:500!important;line-height:20px;color:#ccc;text-transform:uppercase}.sectionContentStyle{width:100%;margin:6px 0}.contentItemStyle{width:100%}.itemLinkStyle{font-size:15px;line-height:20px;font-weight:600;display:inline-block;color:#ff3b30}.sharedMedia{height:100%;width:100%}@media (min-width:320px) and (max-width:767px){.headerCloseStyle{display:block}}"]
            }] }
];
/** @nocollapse */
CometchatUserDetailsComponent.ctorParameters = () => [];
CometchatUserDetailsComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2Vycy9jb21ldGNoYXQtdXNlci1kZXRhaWxzL2NvbWV0Y2hhdC11c2VyLWRldGFpbHMvY29tZXRjaGF0LXVzZXItZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLE1BQU0sT0FBTyw2QkFBNkI7SUFTeEM7UUFSUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDMUMsWUFBTyxHQUFXLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFHM0IsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQXFCO1FBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztJQUNELFFBQVEsS0FBSSxDQUFDOzs7OztJQUViLGNBQWMsQ0FBQyxJQUFJO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztTQUNqRDtRQUNELDZCQUE2QjtJQUMvQixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsVUFBVSxFQUFFO1lBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLFlBQVksRUFBRTtZQUM5RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZO2FBQ3pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyx3MkJBQXNEOzthQUV2RDs7Ozs7bUJBRUUsS0FBSzttQkFDTCxLQUFLOzhCQUNMLE1BQU07Ozs7SUFGUCw2Q0FBcUI7O0lBQ3JCLDZDQUFxQjs7SUFDckIsd0RBQWtFOztJQUVsRSxnREFBMEM7O0lBQzFDLGdEQUEwQzs7SUFFMUMsc0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC11c2VyLWRldGFpbHNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtdXNlci1kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtdXNlci1kZXRhaWxzLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFVzZXJEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIE9QVElPTlM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5PUFRJT05TO1xuICBERVRBSUxTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuREVUQUlMUztcblxuICBibG9ja1VzZXJUZXh0OiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiaXRlbVwiXSkge1xuICAgICAgdGhpcy5nZXRCbG9ja1N0YXR1cyhjaGFuZ2VbXCJpdGVtXCJdLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCkge31cblxuICBnZXRCbG9ja1N0YXR1cyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0uYmxvY2tlZEJ5TWUpIHtcbiAgICAgIHRoaXMuYmxvY2tVc2VyVGV4dCA9IFNUUklOR19NRVNTQUdFUy5VTkJMT0NLX1VTRVI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmxvY2tVc2VyVGV4dCA9IFNUUklOR19NRVNTQUdFUy5CTE9DS19VU0VSO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdGhpcy5ibG9ja1VzZXJUZXh0O1xuICB9XG5cbiAgdG9nZ2xlQmxvY2tVc2VyKCkge1xuICAgIGlmICh0aGlzLmJsb2NrVXNlclRleHQgPT09IFNUUklOR19NRVNTQUdFUy5CTE9DS19VU0VSKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuQkxPQ0tfVVNFUixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ibG9ja1VzZXJUZXh0ID09PSBTVFJJTkdfTUVTU0FHRVMuVU5CTE9DS19VU0VSKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuVU5CTE9DS19VU0VSLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRocmVhZCB3aGVuIG9wZW5lZCBpbiBzbWFsbCBzY3JlZW5cbiAgICovXG4gIGNsb3NlVGhyZWFkVmlldygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkNMT1NFX0RFVEFJTF9DTElDS0VELFxuICAgIH0pO1xuICB9XG59XG4iXX0=