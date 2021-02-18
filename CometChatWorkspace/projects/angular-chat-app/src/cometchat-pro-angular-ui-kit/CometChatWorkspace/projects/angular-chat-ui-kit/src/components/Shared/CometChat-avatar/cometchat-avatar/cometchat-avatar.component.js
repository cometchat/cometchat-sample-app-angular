/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/CometChat-avatar/cometchat-avatar/cometchat-avatar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
export class CometChatAvatarComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.item = null;
        this.avatar = "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
        this.userStatus = "";
        this.enableUserStatus = true;
        /**
         * if a user doesn't have an avatar , it take the first character of username in data paramter and converts it into an svg image
         * @param
         */
        this.getAvatar = (/**
         * @param {?} generator
         * @param {?} data
         * @return {?}
         */
        (generator, data) => {
            try {
                /** @type {?} */
                const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg1.setAttribute("width", "200");
                svg1.setAttribute("height", "200");
                /** @type {?} */
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", "0");
                rect.setAttribute("y", "0");
                rect.setAttribute("width", "200");
                rect.setAttribute("height", "200");
                rect.setAttribute("fill", this.stringToColour(generator));
                /** @type {?} */
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
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
                let svgString = new XMLSerializer().serializeToString(svg1);
                /** @type {?} */
                let decoded = unescape(encodeURIComponent(svgString));
                /** @type {?} */
                let base64 = btoa(decoded);
                /** @type {?} */
                let imgSource = `data:image/svg+xml;base64,${base64}`;
                return imgSource;
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Sets Color to String
         * @param str
         */
        this.stringToColour = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            try {
                /** @type {?} */
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }
                /** @type {?} */
                let colour = "#";
                for (let i = 0; i < 3; i++) {
                    /** @type {?} */
                    let value = (hash >> (i * 8)) & 0xff;
                    colour += ("00" + value.toString(16)).substr(-2);
                }
                return colour;
            }
            catch (error) {
                logger(error);
            }
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                if (change[enums.ITEM].previousValue !== change[enums.ITEM].currentValue) {
                    this.setAvatarIfNotPresent();
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.setAvatarIfNotPresent();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * If Avatar of user is not present Sets Avatar as First Character of User Name
     * @return {?}
     */
    setAvatarIfNotPresent() {
        try {
            if (this.item) {
                this.avatar = this.item.avatar || this.item.icon;
                this.userStatus = this.item.status;
                if (this.avatar === undefined || this.avatar === null) {
                    if (this.item.hasOwnProperty(enums.GUID)) {
                        this.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(this.getAvatar(this.item.guid, this.item.name.charAt(0).toUpperCase()));
                    }
                    else {
                        this.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(this.getAvatar(this.item.uid, this.item.name.charAt(0).toUpperCase()));
                    }
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-avatar",
                template: "<div>\n  <img [src]=\"avatar\" class=\"imgStyle imgBorderStyle\" />\n  <div *ngIf=\"enableUserStatus\">\n    <span *ngIf=\"userStatus == 'offline'\" class=\"figure Offline\"></span>\n    <span *ngIf=\"userStatus == 'online'\" class=\"figure Online\"></span>\n  </div>\n</div>\n",
                styles: [".imgStyle{overflow:hidden;display:inherit;width:100%;height:100%}.imgBorderStyle{border-radius:50%;border:1px solid #aaa}.figure{border-radius:50%;border:1px solid #eaeaea}.Offline{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#555}.Online{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#0f0}"]
            }] }
];
/** @nocollapse */
CometChatAvatarComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
CometChatAvatarComponent.propDecorators = {
    item: [{ type: Input }],
    avatar: [{ type: Input }],
    userStatus: [{ type: Input }],
    enableUserStatus: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatAvatarComponent.prototype.item;
    /** @type {?} */
    CometChatAvatarComponent.prototype.avatar;
    /** @type {?} */
    CometChatAvatarComponent.prototype.userStatus;
    /** @type {?} */
    CometChatAvatarComponent.prototype.enableUserStatus;
    /**
     * if a user doesn't have an avatar , it take the first character of username in data paramter and converts it into an svg image
     * \@param
     * @type {?}
     */
    CometChatAvatarComponent.prototype.getAvatar;
    /**
     * Sets Color to String
     * \@param str
     * @type {?}
     */
    CometChatAvatarComponent.prototype.stringToColour;
    /**
     * @type {?}
     * @private
     */
    CometChatAvatarComponent.prototype._sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvQ29tZXRDaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2xELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFRbkMsWUFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQVBuQyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosV0FBTSxHQUNiLGtFQUFrRSxDQUFDO1FBQzVELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7OztRQThEMUMsY0FBUzs7Ozs7UUFBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM5QixJQUFJOztzQkFDSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbkMsNEJBQTRCLEVBQzVCLEtBQUssQ0FDTjtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7O3NCQUU3QixJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbkMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDUDtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFH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QUFDLFdBQVcsRUFBRSxDQUN2QyxDQUNGLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUMxRCxJQUFJLENBQUMsU0FBUyxDQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FDdkMsQ0FDRixDQUFDO3FCQUNIO2lCQUNGO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGlTQUFnRDs7YUFFakQ7Ozs7WUFSUSxZQUFZOzs7bUJBVWxCLEtBQUs7cUJBRUwsS0FBSzt5QkFFTCxLQUFLOytCQUNMLEtBQUs7Ozs7SUFMTix3Q0FBcUI7O0lBRXJCLDBDQUNxRTs7SUFDckUsOENBQXlCOztJQUN6QixvREFBMEM7Ozs7OztJQThEMUMsNkNBMkNFOzs7Ozs7SUFNRixrREFlRTs7Ozs7SUE1SFUsOENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtYXZhdGFyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuc2Nzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0QXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcblxuICBASW5wdXQoKSBhdmF0YXI6IGFueSA9XG4gICAgXCJodHRwczovL2RhdGEtZXUuY29tZXRjaGF0LmlvL2Fzc2V0cy9pbWFnZXMvYXZhdGFycy9zcGlkZXJtYW4ucG5nXCI7XG4gIEBJbnB1dCgpIHVzZXJTdGF0dXMgPSBcIlwiO1xuICBASW5wdXQoKSBlbmFibGVVc2VyU3RhdHVzOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGNoYW5nZVtlbnVtcy5JVEVNXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZVtlbnVtcy5JVEVNXS5jdXJyZW50VmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRBdmF0YXJJZk5vdFByZXNlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNldEF2YXRhcklmTm90UHJlc2VudCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBBdmF0YXIgb2YgdXNlciBpcyBub3QgcHJlc2VudCBTZXRzIEF2YXRhciBhcyBGaXJzdCBDaGFyYWN0ZXIgb2YgVXNlciBOYW1lXG4gICAqL1xuICBzZXRBdmF0YXJJZk5vdFByZXNlbnQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLml0ZW0uYXZhdGFyIHx8IHRoaXMuaXRlbS5pY29uO1xuICAgICAgICB0aGlzLnVzZXJTdGF0dXMgPSB0aGlzLml0ZW0uc3RhdHVzO1xuXG4gICAgICAgIGlmICh0aGlzLmF2YXRhciA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuYXZhdGFyID09PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5HVUlEKSkge1xuICAgICAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKFxuICAgICAgICAgICAgICB0aGlzLmdldEF2YXRhcihcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCxcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW0ubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0QXZhdGFyKFxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbS51aWQsXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgYSB1c2VyIGRvZXNuJ3QgaGF2ZSBhbiBhdmF0YXIgLCBpdCB0YWtlIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdXNlcm5hbWUgaW4gZGF0YSBwYXJhbXRlciBhbmQgY29udmVydHMgaXQgaW50byBhbiBzdmcgaW1hZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRBdmF0YXIgPSAoZ2VuZXJhdG9yLCBkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN2ZzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICAgICAgXCJzdmdcIlxuICAgICAgKTtcbiAgICAgIHN2ZzEuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMDBcIik7XG4gICAgICBzdmcxLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjIwMFwiKTtcblxuICAgICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgICAgICBcInJlY3RcIlxuICAgICAgKTtcbiAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwieFwiLCBcIjBcIik7XG4gICAgICByZWN0LnNldEF0dHJpYnV0ZShcInlcIiwgXCIwXCIpO1xuICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjIwMFwiKTtcbiAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjAwXCIpO1xuICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIHRoaXMuc3RyaW5nVG9Db2xvdXIoZ2VuZXJhdG9yKSk7XG4gICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgICAgIFwidGV4dFwiXG4gICAgICApO1xuICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIFwiNTAlXCIpO1xuICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ5XCIsIFwiNTQlXCIpO1xuICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJkb21pbmFudC1iYXNlbGluZVwiLCBcIm1pZGRsZVwiKTtcbiAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG4gICAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJ3aGl0ZVwiKTtcbiAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwiZm9udC1zaXplXCIsIFwiMTIwXCIpO1xuICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJmb250LWZhbWlseVwiLCBcIidJbnRlcicsIHNhbnMtc2VyaWZcIik7XG4gICAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZvbnQtd2lnaHRcIiwgXCI2MDBcIik7XG4gICAgICB0ZXh0LnRleHRDb250ZW50ID0gZGF0YTtcbiAgICAgIHN2ZzEuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICBzdmcxLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgbGV0IHN2Z1N0cmluZyA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoc3ZnMSk7XG5cbiAgICAgIGxldCBkZWNvZGVkID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN2Z1N0cmluZykpO1xuICAgICAgbGV0IGJhc2U2NCA9IGJ0b2EoZGVjb2RlZCk7XG5cbiAgICAgIGxldCBpbWdTb3VyY2UgPSBgZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwke2Jhc2U2NH1gO1xuICAgICAgcmV0dXJuIGltZ1NvdXJjZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgQ29sb3IgdG8gU3RyaW5nXG4gICAqIEBwYXJhbSBzdHJcbiAgICovXG4gIHN0cmluZ1RvQ29sb3VyID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaGFzaCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBoYXNoID0gc3RyLmNoYXJDb2RlQXQoaSkgKyAoKGhhc2ggPDwgNSkgLSBoYXNoKTtcbiAgICAgIH1cbiAgICAgIGxldCBjb2xvdXIgPSBcIiNcIjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChoYXNoID4+IChpICogOCkpICYgMHhmZjtcbiAgICAgICAgY29sb3VyICs9IChcIjAwXCIgKyB2YWx1ZS50b1N0cmluZygxNikpLnN1YnN0cigtMik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3VyO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==