/**
 * @fileoverview added by tsickle
 * Generated from: components/Shared/cometchat-avatar/cometchat-avatar/cometchat-avatar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
export class CometchatAvatarComponent {
    /**
     * @param {?} _sanitizer
     */
    constructor(_sanitizer) {
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
        (generator, data) => {
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
        });
        this.stringToColour = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
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
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["item"]) {
            if (change["item"].previousValue !== change["item"].currentValue) {
                this.setAvatarIfNotPresent();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setAvatarIfNotPresent();
    }
    /**
     * @return {?}
     */
    setAvatarIfNotPresent() {
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
    }
}
CometchatAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-avatar",
                template: "<div>\n  <img [src]=\"avatar\" class=\"imgStyle imgBorderStyle\" />\n  <div *ngIf=\"enableUserStatus\">\n    <span *ngIf=\"userStatus == 'offline'\" class=\"figure Offline\"></span>\n    <span *ngIf=\"userStatus == 'online'\" class=\"figure Online\"></span>\n  </div>\n</div>\n",
                styles: [".imgStyle{overflow:hidden;display:inherit;width:100%;height:100%}.imgBorderStyle{border-radius:50%;border:1px solid #aaa}.figure{border-radius:50%;border:1px solid #eaeaea}.Offline{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#555}.Online{width:9px;height:9px;top:-12px;float:right;position:relative;background-color:#0f0}"]
            }] }
];
/** @nocollapse */
CometchatAvatarComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
CometchatAvatarComponent.propDecorators = {
    item: [{ type: Input }],
    avatar: [{ type: Input }],
    userStatus: [{ type: Input }],
    enableUserStatus: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9TaGFyZWQvY29tZXRjaGF0LWF2YXRhci9jb21ldGNoYXQtYXZhdGFyL2NvbWV0Y2hhdC1hdmF0YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3pELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFRbkMsWUFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQVBuQyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosV0FBTSxHQUNiLGtFQUFrRSxDQUFDO1FBQzVELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBeUMxQyxjQUFTOzs7OztRQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFOztrQkFDeEIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDOztrQkFFN0IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDO1lBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtB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SUFDRixrREFXRTs7Ozs7SUFqRlUsOENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWF2YXRhclwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1hdmF0YXIuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1hdmF0YXIuY29tcG9uZW50LnNjc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG5cbiAgQElucHV0KCkgYXZhdGFyOiBhbnkgPVxuICAgIFwiaHR0cHM6Ly9kYXRhLWV1LmNvbWV0Y2hhdC5pby9hc3NldHMvaW1hZ2VzL2F2YXRhcnMvc3BpZGVybWFuLnBuZ1wiO1xuICBASW5wdXQoKSB1c2VyU3RhdHVzID0gXCJcIjtcbiAgQElucHV0KCkgZW5hYmxlVXNlclN0YXR1czogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIml0ZW1cIl0pIHtcbiAgICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXZhdGFySWZOb3RQcmVzZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRBdmF0YXJJZk5vdFByZXNlbnQoKTtcbiAgfVxuXG4gIHNldEF2YXRhcklmTm90UHJlc2VudCgpIHtcbiAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuaXRlbS5hdmF0YXIgfHwgdGhpcy5pdGVtLmljb247XG4gICAgICB0aGlzLnVzZXJTdGF0dXMgPSB0aGlzLml0ZW0uc3RhdHVzO1xuXG4gICAgICBpZiAodGhpcy5hdmF0YXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmF2YXRhciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5pdGVtLmhhc093blByb3BlcnR5KFwiZ3VpZFwiKSkge1xuICAgICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgICAgICAgIHRoaXMuZ2V0QXZhdGFyKFxuICAgICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCxcbiAgICAgICAgICAgICAgdGhpcy5pdGVtLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgICAgICAgIHRoaXMuZ2V0QXZhdGFyKFxuICAgICAgICAgICAgICB0aGlzLml0ZW0udWlkLFxuICAgICAgICAgICAgICB0aGlzLml0ZW0ubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRBdmF0YXIgPSAoZ2VuZXJhdG9yLCBkYXRhKSA9PiB7XG4gICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgIHN2ZzEuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMDBcIik7XG4gICAgc3ZnMS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyMDBcIik7XG5cbiAgICBjb25zdCByZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xuICAgIHJlY3Quc2V0QXR0cmlidXRlKFwieFwiLCBcIjBcIik7XG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ5XCIsIFwiMFwiKTtcbiAgICByZWN0LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMjAwXCIpO1xuICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjAwXCIpO1xuICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiZmlsbFwiLCB0aGlzLnN0cmluZ1RvQ29sb3VyKGdlbmVyYXRvcikpO1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInRleHRcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIFwiNTAlXCIpO1xuICAgIHRleHQuc2V0QXR0cmlidXRlKFwieVwiLCBcIjU0JVwiKTtcbiAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpO1xuICAgIHRleHQuc2V0QXR0cmlidXRlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwid2hpdGVcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJmb250LXNpemVcIiwgXCIxMjBcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJmb250LWZhbWlseVwiLCBcIidJbnRlcicsIHNhbnMtc2VyaWZcIik7XG4gICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJmb250LXdpZ2h0XCIsIFwiNjAwXCIpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSBkYXRhO1xuICAgIHN2ZzEuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgc3ZnMS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICBsZXQgc3ZnU3RyaW5nID0gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyhzdmcxKTtcblxuICAgIGxldCBkZWNvZGVkID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN2Z1N0cmluZykpO1xuICAgIGxldCBiYXNlNjQgPSBidG9hKGRlY29kZWQpO1xuXG4gICAgbGV0IGltZ1NvdXJjZSA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCR7YmFzZTY0fWA7XG4gICAgcmV0dXJuIGltZ1NvdXJjZTtcbiAgfTtcbiAgc3RyaW5nVG9Db2xvdXIgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoYXNoID0gc3RyLmNoYXJDb2RlQXQoaSkgKyAoKGhhc2ggPDwgNSkgLSBoYXNoKTtcbiAgICB9XG4gICAgbGV0IGNvbG91ciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoaGFzaCA+PiAoaSAqIDgpKSAmIDB4ZmY7XG4gICAgICBjb2xvdXIgKz0gKFwiMDBcIiArIHZhbHVlLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG91cjtcbiAgfTtcbn1cbiJdfQ==