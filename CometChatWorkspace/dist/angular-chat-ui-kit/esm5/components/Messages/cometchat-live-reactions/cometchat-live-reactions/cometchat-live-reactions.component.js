/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-live-reactions/cometchat-live-reactions/cometchat-live-reactions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import * as enums from "../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
var CometchatLiveReactionsComponent = /** @class */ (function () {
    function CometchatLiveReactionsComponent() {
        this.reactionName = null;
        this.items = [];
        this.checkAnimatedState = "normal";
    }
    /**
     * @return {?}
     */
    CometchatLiveReactionsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timer);
    };
    /**
     * @return {?}
     */
    CometchatLiveReactionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.counter = 0;
        this.verticalSpeed = 5;
        this.horizontalSpeed = 2;
        this.items = [];
        this.before = Date.now();
        /** @type {?} */
        var reaction = this.reactionName
            ? enums.LIVE_REACTIONS[this.reactionName]
            : enums.LIVE_REACTIONS["heart"];
        this.setItems();
        this.requestAnimation();
    };
    /**
     * Sets height width speed for animation
     */
    /**
     * Sets height width speed for animation
     * @return {?}
     */
    CometchatLiveReactionsComponent.prototype.setItems = /**
     * Sets height width speed for animation
     * @return {?}
     */
    function () {
        //Toggle animation state
        this.checkAnimatedState == "normal"
            ? (this.checkAnimatedState = "animated")
            : (this.checkAnimatedState = "normal");
        /** @type {?} */
        var width = this.emojiWindow.nativeElement.parentElement.offsetWidth;
        /** @type {?} */
        var height = this.emojiWindow.nativeElement.parentElement.offsetHeight;
        /** @type {?} */
        var elements = this.emojiWindow.nativeElement.parentElement.querySelectorAll(".reactionEmojiStyle");
        var _loop_1 = function (i) {
            /** @type {?} */
            var element = elements[i];
            /** @type {?} */
            var elementWidth = element.offsetWidth;
            /** @type {?} */
            var elementHeight = element.offsetHeight;
            /** @type {?} */
            var item = {
                element: element,
                elementHeight: elementHeight,
                elementWidth: elementWidth,
                ySpeed: -this_1.verticalSpeed,
                omega: (2 * Math.PI * this_1.horizontalSpeed) / (width * 60),
                //omega= 2Pi*frequency
                random: (Math.random() / 2 + 0.5) * i * 10000,
                //random time offset
                x: (/**
                 * @param {?} time
                 * @return {?}
                 */
                function (time) {
                    return (((Math.sin(this.omega * (time + this.random)) + 1) / 2) *
                        (width - elementWidth));
                }),
                y: height + (Math.random() + 0.2) * i * elementHeight,
            };
            this_1.items.push(item);
        };
        var this_1 = this;
        for (var i = 0; i < elements.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Function to call animation with Timeout
     */
    /**
     * Function to call animation with Timeout
     * @return {?}
     */
    CometchatLiveReactionsComponent.prototype.requestAnimation = /**
     * Function to call animation with Timeout
     * @return {?}
     */
    function () {
        var _this = this;
        this.timer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.animate();
        }), 1000 / 60);
    };
    /**
     * Animates
     */
    /**
     * Animates
     * @return {?}
     */
    CometchatLiveReactionsComponent.prototype.animate = /**
     * Animates
     * @return {?}
     */
    function () {
        if (!this.emojiWindow.nativeElement.parentElement) {
            return false;
        }
        /** @type {?} */
        var height = this.emojiWindow.nativeElement.parentElement.offsetHeight;
        /** @type {?} */
        var time = +new Date();
        for (var i = 0; i < this.items.length; i++) {
            /** @type {?} */
            var item = this.items[i];
            /** @type {?} */
            var transformString = "translate3d(" + item.x(time) + "px, " + item.y + "px, 0px)";
            item.element.style.transform = transformString;
            item.element.style.visibility = "visible";
            item.y += item.ySpeed;
        }
        this.requestAnimation();
    };
    CometchatLiveReactionsComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-live-reactions",
                    template: "<div class=\"reactionContainerStyle\">\n  <span\n    class=\"reactionEmojiStyle\"\n    #emoji\n    [@FadeInFadeOut]=\"checkAnimatedState\"\n  ></span>\n  <!-- </div> -->\n  <span\n    class=\"reactionEmojiStyle\"\n    #emoji\n    [@FadeInFadeOut]=\"checkAnimatedState\"\n  ></span>\n  <span\n    class=\"reactionEmojiStyle\"\n    #emoji\n    [@FadeInFadeOut]=\"checkAnimatedState\"\n  ></span>\n  <span\n    class=\"reactionEmojiStyle\"\n    #emoji\n    [@FadeInFadeOut]=\"checkAnimatedState\"\n  ></span>\n  <span\n    class=\"reactionEmojiStyle\"\n    #emoji\n    [@FadeInFadeOut]=\"checkAnimatedState\"\n  ></span>\n</div>\n",
                    animations: [
                        trigger("FadeInFadeOut", [
                            state("normal", style({
                                opacity: "1",
                            })),
                            state("animated", style({
                                opacity: "0",
                                transition: "opacity 5s",
                            })),
                            transition("normal=>animated", animate(5500)),
                        ]),
                    ],
                    styles: [".reactionContainerStyle{width:100px;height:calc(100% - 120px);overflow:hidden;top:70px;float:right}.reactionEmojiStyle{position:absolute;z-index:4;color:#dd4144;visibility:hidden;width:25px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAFAAAAAAnxZisAAACpElEQVQ4Ea1VzUsVURQ/5868UrEg/AMy0NTMRQRBJfIQszKxgh5ByzbVIooiiDbZBwUtXAWJtGgRJW0MQsxnxfhRIbgpsqcQtajoA8uITGfu3Hs6Z+zJU3pq+n4wc+fee87vd+bcM2cQ5mB0Z+0WMuERQNiNgO+UgtYAgs7K7uffM01fVlevyc9391iAo5bsOkT1gPdvlvd4Q5l2mJ68bahdG2rTwvMmB9HV1gKP0WWA3oSWzlc86rsj9qm6mkOuwgsKsMQSgeErxpEYS5oQOpSLp0u7vA9iGwmkdsWLlaGuPKXKJw3TyU4GYizEYG+OFglXAt7gOWomzoRY5TsO+Na+8pEaqpJ97/FeIuFUjX++X+C4jb+ZPBsUi3C0Wvb5OSaRZ0MBi0xY01GxvfYApuprtjkE/ZZAZXeZpkrnczF2Ek9oaKtCi2c4ogXJRUKIFyJP2zmolHLUSZeAGjWXQq4RcpHwMTVxIeCwVEuuIWfGSPGIl/9OcqohnA7QVWUCeMg1PyJ1nCsIl7ZmVIcqqSo97xen6aK8UC4SleZB5VwS7ijs8p7e9sDQLflIlos8R4FPdLs9Gb8rXJEAq5K7YurEpLHeckTEd8rYp77G483QHNXmTOJLuwZ/ukof9I0dWIqI+PjWDFqHEps870c6EzMCslCSfPYVQtzvG9MpDos5E7GZJrc9gfX3buju/5Qml3GWgCyUed7YtwmdYJHrLqqom8r6vyDfT0whsG3bqrzV+6oeD36ZazdvkCN1NYe5nq8xSRHndpYvd14Igca5dZxdn+xtm7WZMZlXQOxe18c3ukQtLLJDc0cUSPsOiJ6AMqfKugdeRItZbgsKiN/Q5s2xwqLCYw7hOWl3/FO5oj+OtVYODwdZeJe2LD+mVDxe/D/efwCuAQs2cnkFkQAAAABJRU5ErkJggg==) no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    CometchatLiveReactionsComponent.ctorParameters = function () { return []; };
    CometchatLiveReactionsComponent.propDecorators = {
        reactionName: [{ type: Input }],
        emojiWindow: [{ type: ViewChild, args: ["emoji", null,] }]
    };
    return CometchatLiveReactionsComponent;
}());
export { CometchatLiveReactionsComponent };
if (false) {
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.reactionName;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.counter;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.verticalSpeed;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.horizontalSpeed;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.before;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.items;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.timer;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatLiveReactionsComponent.prototype.emojiWindow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1saXZlLXJlYWN0aW9ucy9jb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnMvY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCO0lBbUNFO1FBWFMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFLN0IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLHVCQUFrQixHQUFHLFFBQVEsQ0FBQztJQUlmLENBQUM7Ozs7SUFFaEIscURBQVc7OztJQUFYO1FBQ0UsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsa0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7O1lBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWTtZQUNoQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJ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QUM3QixrREFBUTs7SUFDUix3REFBYzs7SUFDZCwwREFBZ0I7O0lBQ2hCLGlEQUFPOztJQUNQLGdEQUFXOztJQUNYLGdEQUFNOztJQUNOLDZEQUE4Qjs7SUFFOUIsc0RBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnMuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwiYW5pbWF0ZWRcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgICAgIHRyYW5zaXRpb246IFwib3BhY2l0eSA1c1wiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoNTUwMCkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRMaXZlUmVhY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcmVhY3Rpb25OYW1lID0gbnVsbDtcbiAgY291bnRlcjtcbiAgdmVydGljYWxTcGVlZDtcbiAgaG9yaXpvbnRhbFNwZWVkO1xuICBiZWZvcmU7XG4gIGl0ZW1zID0gW107XG4gIHRpbWVyO1xuICBjaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiO1xuXG4gIEBWaWV3Q2hpbGQoXCJlbW9qaVwiLCBudWxsKSBlbW9qaVdpbmRvdzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICB0aGlzLnZlcnRpY2FsU3BlZWQgPSA1O1xuICAgIHRoaXMuaG9yaXpvbnRhbFNwZWVkID0gMjtcbiAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICB0aGlzLmJlZm9yZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcmVhY3Rpb24gPSB0aGlzLnJlYWN0aW9uTmFtZVxuICAgICAgPyBlbnVtcy5MSVZFX1JFQUNUSU9OU1t0aGlzLnJlYWN0aW9uTmFtZV1cbiAgICAgIDogZW51bXMuTElWRV9SRUFDVElPTlNbXCJoZWFydFwiXTtcblxuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgICB0aGlzLnJlcXVlc3RBbmltYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGhlaWdodCB3aWR0aCBzcGVlZCBmb3IgYW5pbWF0aW9uXG4gICAqL1xuICBzZXRJdGVtcygpIHtcbiAgICAvL1RvZ2dsZSBhbmltYXRpb24gc3RhdGVcbiAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICA/ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwiYW5pbWF0ZWRcIilcbiAgICAgIDogKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIik7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZW1vamlXaW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZW1vamlXaW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuZW1vamlXaW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIi5yZWFjdGlvbkVtb2ppU3R5bGVcIlxuICAgICk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV0sXG4gICAgICAgIGVsZW1lbnRXaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICAgIGVsZW1lbnRIZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgIGVsZW1lbnRIZWlnaHQ6IGVsZW1lbnRIZWlnaHQsXG4gICAgICAgIGVsZW1lbnRXaWR0aDogZWxlbWVudFdpZHRoLFxuICAgICAgICB5U3BlZWQ6IC10aGlzLnZlcnRpY2FsU3BlZWQsXG4gICAgICAgIG9tZWdhOiAoMiAqIE1hdGguUEkgKiB0aGlzLmhvcml6b250YWxTcGVlZCkgLyAod2lkdGggKiA2MCksIC8vb21lZ2E9IDJQaSpmcmVxdWVuY3lcbiAgICAgICAgcmFuZG9tOiAoTWF0aC5yYW5kb20oKSAvIDIgKyAwLjUpICogaSAqIDEwMDAwLCAvL3JhbmRvbSB0aW1lIG9mZnNldFxuICAgICAgICB4OiBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoKE1hdGguc2luKHRoaXMub21lZ2EgKiAodGltZSArIHRoaXMucmFuZG9tKSkgKyAxKSAvIDIpICpcbiAgICAgICAgICAgICh3aWR0aCAtIGVsZW1lbnRXaWR0aClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB5OiBoZWlnaHQgKyAoTWF0aC5yYW5kb20oKSArIDAuMikgKiBpICogZWxlbWVudEhlaWdodCxcbiAgICAgIH07XG4gICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYW5pbWF0aW9uIHdpdGggVGltZW91dFxuICAgKi9cbiAgcmVxdWVzdEFuaW1hdGlvbigpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICB9LCAxMDAwIC8gNjApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hdGVzXG4gICAqL1xuICBhbmltYXRlKCkge1xuICAgIGlmICghdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVtb2ppV2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgdGltZSA9ICtuZXcgRGF0ZSgpOyAvL2xpdHRsZSB0cmljaywgZ2l2ZXMgdW5peCB0aW1lIGluIG1zXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuXG4gICAgICBjb25zdCB0cmFuc2Zvcm1TdHJpbmcgPVxuICAgICAgICBcInRyYW5zbGF0ZTNkKFwiICsgaXRlbS54KHRpbWUpICsgXCJweCwgXCIgKyBpdGVtLnkgKyBcInB4LCAwcHgpXCI7XG4gICAgICBpdGVtLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgaXRlbS5lbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIGl0ZW0ueSArPSBpdGVtLnlTcGVlZDtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uKCk7XG4gIH1cbn1cbiJdfQ==