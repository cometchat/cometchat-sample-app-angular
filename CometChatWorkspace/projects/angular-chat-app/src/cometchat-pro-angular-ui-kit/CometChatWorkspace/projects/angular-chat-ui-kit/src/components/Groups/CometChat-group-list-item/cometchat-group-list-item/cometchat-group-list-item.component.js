/**
 * @fileoverview added by tsickle
 * Generated from: components/Groups/CometChat-group-list-item/cometchat-group-list-item/cometchat-group-list-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { logger } from "../../../../utils/common";
export class CometChatGroupListItemComponent {
    constructor() {
        this.group = null;
        this.selectedGroup = null;
        this.onGroupClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        try {
            this.onGroupClick.emit(group);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatGroupListItemComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-group-list-item",
                template: "<div\n  class=\"listItem\"\n  [ngClass]=\"{\n    selectedGroupStyle: group?.guid === selectedGroup?.guid\n  }\"\n  (click)=\"groupClicked(group)\"\n>\n  <div class=\"itemThumbnailStyle\">\n    <cometchat-avatar [item]=\"group\"></cometchat-avatar>\n  </div>\n  <div class=\"itemDetailStyle\">\n    <div class=\"itemNameWrapperStyle\">\n      <span class=\"listItemName\">{{ group.name }}</span>\n      <div [ngSwitch]=\"group?.type\">\n        <div *ngSwitchCase=\"'private'\">\n          <span class=\"shieldIcon\"></span>\n        </div>\n        <div *ngSwitchCase=\"'password'\">\n          <span class=\"lockIcon\"></span>\n        </div>\n      </div>\n    </div>\n    <div class=\"itemDescStyle\" *ngIf=\"group.membersCount == 1\">\n      {{ group?.membersCount }} member\n    </div>\n    <div class=\"itemDescStyle\" *ngIf=\"group.membersCount > 1\">\n      {{ group?.membersCount }} members\n    </div>\n  </div>\n</div>\n",
                styles: [".listItem{display:flex;flex-direction:row;justify-content:left;align-items:center;cursor:pointer;width:100%;padding:0 20px}.listItem:hover{background:#e6e6e6;cursor:pointer}.selectedGroupStyle{background:#e6e6e6}.listItemName{max-width:calc(100% - 30px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.listItemIcon{width:16px;height:16px;margin:0 5px}.shieldIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEaADAAQAAAABAAAAFAAAAABGcxxxAAACBElEQVQ4Ee2Uy0sbURSHnUliArYBISgGBBHEhZQuXLmoNFQIRETGSMhDREGk4EI3dilCpVi6qAsfa23zIEIgCwPZiV2UQkBFEUM3KgU3gbYSIYEk43eHziKdZPAP8MLh3Ht+jzlz596RWhqMRCLxslarRYAmiE4iK8tyzOl0Hvh8vvL/EkkvpFKpjlKpNKWq6gy1F5IkCXKauCaC1LvJv6knybvhcPg7WRtSNBrtBfgIaZxsJX/jqV8dDse+oih/BIuaHI/H3zCdZq6Q2+BeMl+LRCJRKRaLnbDoorhF7IVCoStITUcymXxWrVYVXncO0rDFYhkSnaiI39Hep6bKBkA6nX5eLBbv0L6VBc6k0oBnWiqXy5oGraSZmLIfAT6ZGDdJZnM5JqrdCJlXbDabpuG81MTGimPdZy4xonxiTUMTNzJdnEN5xUlsNVKbV2hgRKB2u/1cdLKPUV+lUllrLqlHuCoDaFbo4off7/8lc9y//DNa5grsZDIZ0/2B44N/RJS4qLPCXvsV5HI5Wz6f32Q9j/uxAIPB4Kkg6CObzbYVCoX34Et0ccPGjgUCgTOBayY6kes+CWGbdTt5w+VyrXq93nvqo6w3iR5Mdq1W6yIGf3VdnYko0m47aZ2YQ3BL/on4NfmCDhf4VRwyrxsGEx3FbBCTzxj0U/vgdru3PB5Pw9v+AMlK0jim04IbAAAAAElFTkSuQmCC) center center no-repeat;cursor:pointer;display:block;width:18px;height:20px;margin:0 5px}.lockIcon{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADqADAAQAAAABAAAAFAAAAACXoLbZAAABXklEQVQ4EeWTP0vEQBDFb7MLJxZXaKf1YSXWfgIbsVOS2AoiCBYKdv6pBFErFUEQLJJgIWIT8Cysr/MLyHViKSnVJP4mmhADuRNbFyZvZ9572c3sRjUqIwiCuTRNV4kppVQC/Ugcua57X5Za5cT3/fMkSW4xjWK6BANinOjAHZS1Kk8gFhBcYdjn7Zt5XRDuDG5Zaz1j23ZHasWKENuY7qomETmOswLXjeN4S3IZmTEMwybEBHH9Vf75pM570xuqkzmTGaMoakNois85UUXLsoRr0bwx4TIjWxiWBHMsWDMyju/MtMU31ohry4qOTcMesprgK/FWox6i3iIe2Pa6YXKBqUmyw7zfVhucsaFRS+CpGNvEHi3fBQcOdjiCedGSbjJ5H+j4FqD/YKr/3Jz/YpSfVe7pb4ems9mB9nDMe573Ava9ABybwTSLric3YY3kGDwBix+7ZvmU+pMxZuMTSuKTUiOk1nUAAAAASUVORK5CYII=) center center no-repeat;cursor:pointer;display:block;width:16px;height:21px;margin:0 5px}.itemThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.itemDetailStyle{width:calc(100% - 70px);flex-grow:1;padding:15px}.itemNameWrapperStyle{font-size:15px;font-weight:600;display:flex;align-items:center;width:100;margin:0}.itemDescStyle{border-bottom:1px solid #eaeaea;padding:0 0 5px;font-size:12px;color:rgba(20,20,20,.4)}.itemDescStyle:hover{background:#e6e6e6;cursor:pointer}"]
            }] }
];
/** @nocollapse */
CometChatGroupListItemComponent.ctorParameters = () => [];
CometChatGroupListItemComponent.propDecorators = {
    group: [{ type: Input }],
    selectedGroup: [{ type: Input }],
    onGroupClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatGroupListItemComponent.prototype.group;
    /** @type {?} */
    CometChatGroupListItemComponent.prototype.selectedGroup;
    /** @type {?} */
    CometChatGroupListItemComponent.prototype.onGroupClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWdyb3VwLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Hcm91cHMvQ29tZXRDaGF0LWdyb3VwLWxpc3QtaXRlbS9jb21ldGNoYXQtZ3JvdXAtbGlzdC1pdGVtL2NvbWV0Y2hhdC1ncm91cC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPbEQsTUFBTSxPQUFPLCtCQUErQjtJQU0xQztRQUxTLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUVwQixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWhELENBQUM7Ozs7SUFFaEIsUUFBUSxLQUFJLENBQUM7Ozs7OztJQU1iLFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUk7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUF6QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLCs2QkFBeUQ7O2FBRTFEOzs7OztvQkFFRSxLQUFLOzRCQUNMLEtBQUs7MkJBRUwsTUFBTTs7OztJQUhQLGdEQUFzQjs7SUFDdEIsd0RBQThCOztJQUU5Qix1REFBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1ncm91cC1saXN0LWl0ZW1cIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtZ3JvdXAtbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtZ3JvdXAtbGlzdC1pdGVtLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdEdyb3VwTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBncm91cCA9IG51bGw7XG4gIEBJbnB1dCgpIHNlbGVjdGVkR3JvdXAgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBvbkdyb3VwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXR0aW5nIHRoZSBHcm91cCBjbGlja2VkIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgaW4gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICogQHBhcmFtIEFueSBncm91cFxuICAgKi9cbiAgZ3JvdXBDbGlja2VkKGdyb3VwKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub25Hcm91cENsaWNrLmVtaXQoZ3JvdXApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19