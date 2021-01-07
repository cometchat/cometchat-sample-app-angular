/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/cometchat-avatar/cometchat-avatar/cometchat-avatar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
var CometchatAvatarComponent = /** @class */ (function () {
    function CometchatAvatarComponent(_sanitizer) {
        var _this = this;
        this._sanitizer = _sanitizer;
        this.item = null;
        this.avatar = "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
        this.userStatus = "";
        this.enableUserStatus = true;
        this.getAvatar = (/**
         * @param {?} generator
         * @param {?} data
         * @return {?}
         */
        function (generator, data) {
            /** @type {?} */
            var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg1.setAttribute("width", "200");
            svg1.setAttribute("height", "200");
            /** @type {?} */
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", "0");
            rect.setAttribute("y", "0");
            rect.setAttribute("width", "200");
            rect.setAttribute("height", "200");
            rect.setAttribute("fill", _this.stringToColour(generator));
            /** @type {?} */
            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "50%");
            text.setAttribute("y", "54%");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", "white");
            text.setAttribute("font-size", "120");
            text.setAttribute("font-family", "'Inter', sans-serif");
            text.setAttribute("font-wight", "600");
            text.textContent = data;
            svg1.appendChild(rect);
            svg1.appendChild(text);
            /** @type {?} */
            var svgString = new XMLSerializer().serializeToString(svg1);
            /** @type {?} */
            var decoded = unescape(encodeURIComponent(svgString));
            /** @type {?} */
            var base64 = btoa(decoded);
            /** @type {?} */
            var imgSource = "data:image/svg+xml;base64," + base64;
            return imgSource;
        });
        this.stringToColour = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            /** @type {?} */
            var colour = "#";
            for (var i = 0; i < 3; i++) {
                /** @type {?} */
                var value = (hash >> (i * 8)) & 0xff;
                colour += ("00" + value.toString(16)).substr(-2);
            }
            return colour;
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatAvatarComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["item"]) {
            if (change["item"].previousValue !== change["item"].currentValue) {
                this.setAvatarIfNotPresent();
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatAvatarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setAvatarIfNotPresent();
    };
    /**
     * @return {?}
     */
    CometchatAvatarComponent.prototype.setAvatarIfNotPresent = /**
     * @return {?}
     */
    function () {
        if (this.item) {
            this.avatar = this.item.avatar || this.item.icon;
            this.userStatus = this.item.status;
            if (this.avatar === undefined || this.avatar === null) {
                if (this.item.hasOwnProperty("guid")) {
                    this.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(this.getAvatar(this.item.guid, this.item.name.charAt(0).toUpperCase()));
                }
                else {
                    this.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(this.getAvatar(this.item.uid, this.item.name.charAt(0).toUpperCase()));
                }
            }
        }
    };
    CometchatAvatarComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-avatar",
                    template: "<div>\n  <img [src]=\"avatar\" class=\"imgStyle imgBorderStyle\" />\n  <div *ngIf=\"enableUserStatus\">\n    <span *ngIf=\"userStatus == 'offline'\" class=\"figure Offline\"></span>\n    <span *ngIf=\"userStatus == 'online'\" class=\"figure Online\"></span>\n  </div>\n</div>\n",
                    styles: [".imgStyle{overflow:hidden;display:inherit;width:100%;height:100%}.imgBorderStyle{border-radius:50%;border:1px solid #aaa}.figure{border-radius:50%;border:1px solid #eaeaea}.Offline{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#555}.Online{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#0f0}"]
                }] }
    ];
    /** @nocollapse */
    CometchatAvatarComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    CometchatAvatarComponent.propDecorators = {
        item: [{ type: Input }],
        avatar: [{ type: Input }],
        userStatus: [{ type: Input }],
        enableUserStatus: [{ type: Input }]
    };
    return CometchatAvatarComponent;
}());
export { CometchatAvatarComponent };
if (false) {
    /** @type {?} */
    CometchatAvatarComponent.prototype.item;
    /** @type {?} */
    CometchatAvatarComponent.prototype.avatar;
    /** @type {?} */
    CometchatAvatarComponent.prototype.userStatus;
    /** @type {?} */
    CometchatAvatarComponent.prototype.enableUserStatus;
    /** @type {?} */
    CometchatAvatarComponent.prototype.getAvatar;
    /** @type {?} */
    CometchatAvatarComponent.prototype.stringToColour;
    /**
     * @type {?}
     * @private
     */
    CometchatAvatarComponent.prototype._sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvY29tZXRjaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpEO0lBYUUsa0NBQW9CLFVBQXdCO1FBQTVDLGlCQUFnRDtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBUG5DLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWixXQUFNLEdBQ2Isa0VBQWtFLENBQUM7UUFDNUQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUF5QzFDLGNBQVM7Ozs7O1FBQUcsVUFBQyxTQUFTLEVBQUUsSUFBSTs7Z0JBQ3BCLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQztZQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Z0JBRTdCLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUFFLE1BQU0sQ0FBQztZQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O2dCQUNwRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUM7WUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ25CLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQzs7Z0JBRXZELE9BQU8sR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUNqRCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Z0JBRXRCLFNBQVMsR0FBRywrQkFBNkIsTUFBUTtZQUNyRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDLEVBQUM7UUFDRixtQkFBYzs7OztRQUFHLFVBQVUsR0FBRzs7Z0JBQ3hCLElBQUksR0FBRyxDQUFDO1lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDakQ7O2dCQUNHLE1BQU0sR0FBRyxHQUFHO1lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O29CQUN0QixLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO2dCQUNwQyxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFDO0lBakY2QyxDQUFDOzs7OztJQUVoRCw4Q0FBVzs7OztJQUFYLFVBQVksTUFBcUI7UUFDL0IsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzlCO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELHdEQUFxQjs7O0lBQXJCO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRW5DLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ3JELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FDMUQsSUFBSSxDQUFDLFNBQVMsQ0FDWixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQ3ZDLENBQ0YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQzFELElBQUksQ0FBQyxTQUFTLENBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUN2QyxDQUNGLENBQUM7aUJBQ0g7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBbERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixpU0FBZ0Q7O2lCQUVqRDs7OztnQkFOUSxZQUFZOzs7dUJBUWxCLEtBQUs7eUJBRUwsS0FBSzs2QkFFTCxLQUFLO21DQUNMLEtBQUs7O0lBb0ZSLCtCQUFDO0NBQUEsQUEvRkQsSUErRkM7U0ExRlksd0JBQXdCOzs7SUFDbkMsd0NBQXFCOztJQUVyQiwwQ0FDcUU7O0lBQ3JFLDhDQUF5Qjs7SUFDekIsb0RBQTBDOztJQXlDMUMsNkNBOEJFOztJQUNGLGtEQVdFOzs7OztJQWpGVSw4Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtYXZhdGFyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuc2Nzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0QXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcblxuICBASW5wdXQoKSBhdmF0YXI6IGFueSA9XG4gICAgXCJodHRwczovL2RhdGEtZXUuY29tZXRjaGF0LmlvL2Fzc2V0cy9pbWFnZXMvYXZhdGFycy9zcGlkZXJtYW4ucG5nXCI7XG4gIEBJbnB1dCgpIHVzZXJTdGF0dXMgPSBcIlwiO1xuICBASW5wdXQoKSBlbmFibGVVc2VyU3RhdHVzOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wiaXRlbVwiXSkge1xuICAgICAgaWYgKGNoYW5nZVtcIml0ZW1cIl0ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlW1wiaXRlbVwiXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdmF0YXJJZk5vdFByZXNlbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldEF2YXRhcklmTm90UHJlc2VudCgpO1xuICB9XG5cbiAgc2V0QXZhdGFySWZOb3RQcmVzZW50KCkge1xuICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5pdGVtLmF2YXRhciB8fCB0aGlzLml0ZW0uaWNvbjtcbiAgICAgIHRoaXMudXNlclN0YXR1cyA9IHRoaXMuaXRlbS5zdGF0dXM7XG5cbiAgICAgIGlmICh0aGlzLmF2YXRhciA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuYXZhdGFyID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJndWlkXCIpKSB7XG4gICAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgICAgICAgdGhpcy5nZXRBdmF0YXIoXG4gICAgICAgICAgICAgIHRoaXMuaXRlbS5ndWlkLFxuICAgICAgICAgICAgICB0aGlzLml0ZW0ubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgICAgICAgdGhpcy5nZXRBdmF0YXIoXG4gICAgICAgICAgICAgIHRoaXMuaXRlbS51aWQsXG4gICAgICAgICAgICAgIHRoaXMuaXRlbS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEF2YXRhciA9IChnZW5lcmF0b3IsIGRhdGEpID0+IHtcbiAgICBjb25zdCBzdmcxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gICAgc3ZnMS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjIwMFwiKTtcbiAgICBzdmcxLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjIwMFwiKTtcblxuICAgIGNvbnN0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInJlY3RcIik7XG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIFwiMFwiKTtcbiAgICByZWN0LnNldEF0dHJpYnV0ZShcInlcIiwgXCIwXCIpO1xuICAgIHJlY3Quc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMDBcIik7XG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyMDBcIik7XG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIHRoaXMuc3RyaW5nVG9Db2xvdXIoZ2VuZXJhdG9yKSk7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwidGV4dFwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcInhcIiwgXCI1MCVcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ5XCIsIFwiNTQlXCIpO1xuICAgIHRleHQuc2V0QXR0cmlidXRlKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZvbnQtc2l6ZVwiLCBcIjEyMFwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZvbnQtZmFtaWx5XCIsIFwiJ0ludGVyJywgc2Fucy1zZXJpZlwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZvbnQtd2lnaHRcIiwgXCI2MDBcIik7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IGRhdGE7XG4gICAgc3ZnMS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICBzdmcxLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIGxldCBzdmdTdHJpbmcgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHN2ZzEpO1xuXG4gICAgbGV0IGRlY29kZWQgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3ZnU3RyaW5nKSk7XG4gICAgbGV0IGJhc2U2NCA9IGJ0b2EoZGVjb2RlZCk7XG5cbiAgICBsZXQgaW1nU291cmNlID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJHtiYXNlNjR9YDtcbiAgICByZXR1cm4gaW1nU291cmNlO1xuICB9O1xuICBzdHJpbmdUb0NvbG91ciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGhhc2ggPSBzdHIuY2hhckNvZGVBdChpKSArICgoaGFzaCA8PCA1KSAtIGhhc2gpO1xuICAgIH1cbiAgICBsZXQgY29sb3VyID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGxldCB2YWx1ZSA9IChoYXNoID4+IChpICogOCkpICYgMHhmZjtcbiAgICAgIGNvbG91ciArPSAoXCIwMFwiICsgdmFsdWUudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3VyO1xuICB9O1xufVxuIl19