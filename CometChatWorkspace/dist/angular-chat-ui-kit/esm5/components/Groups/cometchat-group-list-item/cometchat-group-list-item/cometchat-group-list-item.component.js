/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/cometchat-group-list-item/cometchat-group-list-item/cometchat-group-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
var CometchatGroupListItemComponent = /** @class */ (function () {
    function CometchatGroupListItemComponent() {
        this.group = null;
        this.selectedGroup = null;
        this.onGroupClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CometchatGroupListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param Any group
     */
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    CometchatGroupListItemComponent.prototype.groupClicked = /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.onGroupClick.emit(group);
    };
    CometchatGroupListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-group-list-item",
                    template: "<div\n  class=\"listItem\"\n  [ngClass]=\"{\n    selectedGroupStyle: group?.guid === selectedGroup?.guid\n  }\"\n  (click)=\"groupClicked(group)\"\n>\n  <div class=\"itemThumbnailStyle\">\n    <cometchat-avatar [item]=\"group\"></cometchat-avatar>\n  </div>\n  <div class=\"itemDetailStyle\">\n    <div class=\"itemNameWrapperStyle\">\n      <span class=\"listItemName\">{{ group.name }}</span>\n      <div [ngSwitch]=\"group?.type\">\n        <div *ngSwitchCase=\"'private'\">\n          <span class=\"shieldIcon\"></span>\n        </div>\n        <div *ngSwitchCase=\"'password'\">\n          <span class=\"lockIcon\"></span>\n        </div>\n      </div>\n    </div>\n    <div class=\"itemDescStyle\" *ngIf=\"group.membersCount == 1\">\n      {{ group?.membersCount }} member\n    </div>\n    <div class=\"itemDescStyle\" *ngIf=\"group.membersCount > 1\">\n      {{ group?.membersCount }} members\n    </div>\n  </div>\n</div>\n",
                    styles: [".listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:0 20px}.listItem:hover{background:#e6e6e6;cursor:pointer}.selectedGroupStyle{background:#e6e6e6}.listItemName{max-width:calc(100% - 30px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.listItemIcon{width:16px;height:16px;margin:0 5px}.shieldIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEaADAAQAAAABAAAAFAAAAABGcxxxAAACBElEQVQ4Ee2Uy0sbURSHnUliArYBISgGBBHEhZQuXLmoNFQIRETGSMhDREGk4EI3dilCpVi6qAsfa23zIEIgCwPZiV2UQkBFEUM3KgU3gbYSIYEk43eHziKdZPAP8MLh3Ht+jzlz596RWhqMRCLxslarRYAmiE4iK8tyzOl0Hvh8vvL/EkkvpFKpjlKpNKWq6gy1F5IkCXKauCaC1LvJv6knybvhcPg7WRtSNBrtBfgIaZxsJX/jqV8dDse+oih/BIuaHI/H3zCdZq6Q2+BeMl+LRCJRKRaLnbDoorhF7IVCoStITUcymXxWrVYVXncO0rDFYhkSnaiI39Hep6bKBkA6nX5eLBbv0L6VBc6k0oBnWiqXy5oGraSZmLIfAT6ZGDdJZnM5JqrdCJlXbDabpuG81MTGimPdZy4xonxiTUMTNzJdnEN5xUlsNVKbV2hgRKB2u/1cdLKPUV+lUllrLqlHuCoDaFbo4off7/8lc9y//DNa5grsZDIZ0/2B44N/RJS4qLPCXvsV5HI5Wz6f32Q9j/uxAIPB4Kkg6CObzbYVCoX34Et0ccPGjgUCgTOBayY6kes+CWGbdTt5w+VyrXq93nvqo6w3iR5Mdq1W6yIGf3VdnYko0m47aZ2YQ3BL/on4NfmCDhf4VRwyrxsGEx3FbBCTzxj0U/vgdru3PB5Pw9v+AMlK0jim04IbAAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer;display:block;width:18px;height:20px;margin:0 5px}.lockIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADqADAAQAAAABAAAAFAAAAACXoLbZAAABXklEQVQ4EeWTP0vEQBDFb7MLJxZXaKf1YSXWfgIbsVOS2AoiCBYKdv6pBFErFUEQLJJgIWIT8Cysr/MLyHViKSnVJP4mmhADuRNbFyZvZ9572c3sRjUqIwiCuTRNV4kppVQC/Ugcua57X5Za5cT3/fMkSW4xjWK6BANinOjAHZS1Kk8gFhBcYdjn7Zt5XRDuDG5Zaz1j23ZHasWKENuY7qomETmOswLXjeN4S3IZmTEMwybEBHH9Vf75pM570xuqkzmTGaMoakNois85UUXLsoRr0bwx4TIjWxiWBHMsWDMyju/MtMU31ohry4qOTcMesprgK/FWox6i3iIe2Pa6YXKBqUmyw7zfVhucsaFRS+CpGNvEHi3fBQcOdjiCedGSbjJ5H+j4FqD/YKr/3Jz/YpSfVe7pb4ems9mB9nDMe573Ava9ABybwTSLric3YY3kGDwBix+7ZvmU+pMxZuMTSuKTUiOk1nUAAAAASUVORK5CYII=) center center no-repeat;cursor:pointer;display:block;width:16px;height:21px;margin:0 5px}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.itemDetailStyle{width:calc(100% - 70px);flex-grow:1;padding:15px}.itemNameWrapperStyle{font-size:15px;font-weight:600;display:flex;align-items:center;width:100;margin:0}.itemDescStyle{border-bottom:1px solid #eaeaea;padding:0 0 5px;font-size:12px;color:rgba(20,20,20,.4)}.itemDescStyle:hover{background:#e6e6e6;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    CometchatGroupListItemComponent.ctorParameters = function () { return []; };
    CometchatGroupListItemComponent.propDecorators = {
        group: [{ type: Input }],
        selectedGroup: [{ type: Input }],
        onGroupClick: [{ type: Output }]
    };
    return CometchatGroupListItemComponent;
}());
export { CometchatGroupListItemComponent };
if (false) {
    /** @type {?} */
    CometchatGroupListItemComponent.prototype.group;
    /** @type {?} */
    CometchatGroupListItemComponent.prototype.selectedGroup;
    /** @type {?} */
    CometchatGroupListItemComponent.prototype.onGroupClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvY29tZXRjaGF0LWdyb3VwLWxpc3QtaXRlbS9jb21ldGNoYXQtZ3JvdXAtbGlzdC1pdGVtL2NvbWV0Y2hhdC1ncm91cC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRTtJQVdFO1FBTFMsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXBCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFaEQsQ0FBQzs7OztJQUVoQixrREFBUTs7O0lBQVIsY0FBWSxDQUFDO0lBRWI7OztPQUdHOzs7Ozs7SUFDSCxzREFBWTs7Ozs7SUFBWixVQUFhLEtBQUs7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0JBckJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQywrNkJBQXlEOztpQkFFMUQ7Ozs7O3dCQUVFLEtBQUs7Z0NBQ0wsS0FBSzsrQkFFTCxNQUFNOztJQWFULHNDQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0FqQlksK0JBQStCOzs7SUFDMUMsZ0RBQXNCOztJQUN0Qix3REFBOEI7O0lBRTlCLHVEQUErRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWdyb3VwLWxpc3QtaXRlbVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1ncm91cC1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1ncm91cC1saXN0LWl0ZW0uY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0R3JvdXBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGdyb3VwID0gbnVsbDtcbiAgQElucHV0KCkgc2VsZWN0ZWRHcm91cCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIG9uR3JvdXBDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogRW1pdHRpbmcgdGhlIEdyb3VwIGNsaWNrZWQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gQW55IGdyb3VwXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICB0aGlzLm9uR3JvdXBDbGljay5lbWl0KGdyb3VwKTtcbiAgfVxufVxuIl19