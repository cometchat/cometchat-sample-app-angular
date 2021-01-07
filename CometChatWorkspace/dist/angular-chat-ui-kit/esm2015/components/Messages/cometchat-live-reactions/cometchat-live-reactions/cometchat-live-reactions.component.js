/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-live-reactions/cometchat-live-reactions/cometchat-live-reactions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import * as enums from "../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
export class CometchatLiveReactionsComponent {
    constructor() {
        this.reactionName = null;
        this.items = [];
        this.checkAnimatedState = "normal";
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearTimeout(this.timer);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.counter = 0;
        this.verticalSpeed = 5;
        this.horizontalSpeed = 2;
        this.items = [];
        this.before = Date.now();
        /** @type {?} */
        const reaction = this.reactionName
            ? enums.LIVE_REACTIONS[this.reactionName]
            : enums.LIVE_REACTIONS["heart"];
        this.setItems();
        this.requestAnimation();
    }
    /**
     * Sets height width speed for animation
     * @return {?}
     */
    setItems() {
        //Toggle animation state
        this.checkAnimatedState == "normal"
            ? (this.checkAnimatedState = "animated")
            : (this.checkAnimatedState = "normal");
        /** @type {?} */
        const width = this.emojiWindow.nativeElement.parentElement.offsetWidth;
        /** @type {?} */
        const height = this.emojiWindow.nativeElement.parentElement.offsetHeight;
        /** @type {?} */
        const elements = this.emojiWindow.nativeElement.parentElement.querySelectorAll(".reactionEmojiStyle");
        for (let i = 0; i < elements.length; i++) {
            /** @type {?} */
            const element = elements[i];
            /** @type {?} */
            const elementWidth = element.offsetWidth;
            /** @type {?} */
            const elementHeight = element.offsetHeight;
            /** @type {?} */
            const item = {
                element: element,
                elementHeight: elementHeight,
                elementWidth: elementWidth,
                ySpeed: -this.verticalSpeed,
                omega: (2 * Math.PI * this.horizontalSpeed) / (width * 60),
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
            this.items.push(item);
        }
    }
    /**
     * Function to call animation with Timeout
     * @return {?}
     */
    requestAnimation() {
        this.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            this.animate();
        }), 1000 / 60);
    }
    /**
     * Animates
     * @return {?}
     */
    animate() {
        if (!this.emojiWindow.nativeElement.parentElement) {
            return false;
        }
        /** @type {?} */
        const height = this.emojiWindow.nativeElement.parentElement.offsetHeight;
        /** @type {?} */
        const time = +new Date();
        for (let i = 0; i < this.items.length; i++) {
            /** @type {?} */
            const item = this.items[i];
            /** @type {?} */
            const transformString = "translate3d(" + item.x(time) + "px, " + item.y + "px, 0px)";
            item.element.style.transform = transformString;
            item.element.style.visibility = "visible";
            item.y += item.ySpeed;
        }
        this.requestAnimation();
    }
}
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
CometchatLiveReactionsComponent.ctorParameters = () => [];
CometchatLiveReactionsComponent.propDecorators = {
    reactionName: [{ type: Input }],
    emojiWindow: [{ type: ViewChild, args: ["emoji", null,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1saXZlLXJlYWN0aW9ucy9jb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnMvY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBd0I3QixNQUFNLE9BQU8sK0JBQStCO0lBWTFDO1FBWFMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFLN0IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLHVCQUFrQixHQUFHLFFBQVEsQ0FBQztJQUlmLENBQUM7Ozs7SUFFaEIsV0FBVztRQUNULFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7Y0FDbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFD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Q29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgYW5pbWF0ZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1saXZlLXJlYWN0aW9ucy5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcIkZhZGVJbkZhZGVPdXRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwibm9ybWFsXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICAgICAgdHJhbnNpdGlvbjogXCJvcGFjaXR5IDVzXCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcIm5vcm1hbD0+YW5pbWF0ZWRcIiwgYW5pbWF0ZSg1NTAwKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdExpdmVSZWFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByZWFjdGlvbk5hbWUgPSBudWxsO1xuICBjb3VudGVyO1xuICB2ZXJ0aWNhbFNwZWVkO1xuICBob3Jpem9udGFsU3BlZWQ7XG4gIGJlZm9yZTtcbiAgaXRlbXMgPSBbXTtcbiAgdGltZXI7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG5cbiAgQFZpZXdDaGlsZChcImVtb2ppXCIsIG51bGwpIGVtb2ppV2luZG93OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMudmVydGljYWxTcGVlZCA9IDU7XG4gICAgdGhpcy5ob3Jpem9udGFsU3BlZWQgPSAyO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgIHRoaXMuYmVmb3JlID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCByZWFjdGlvbiA9IHRoaXMucmVhY3Rpb25OYW1lXG4gICAgICA/IGVudW1zLkxJVkVfUkVBQ1RJT05TW3RoaXMucmVhY3Rpb25OYW1lXVxuICAgICAgOiBlbnVtcy5MSVZFX1JFQUNUSU9OU1tcImhlYXJ0XCJdO1xuXG4gICAgdGhpcy5zZXRJdGVtcygpO1xuICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaGVpZ2h0IHdpZHRoIHNwZWVkIGZvciBhbmltYXRpb25cbiAgICovXG4gIHNldEl0ZW1zKCkge1xuICAgIC8vVG9nZ2xlIGFuaW1hdGlvbiBzdGF0ZVxuICAgIHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID09IFwibm9ybWFsXCJcbiAgICAgID8gKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJhbmltYXRlZFwiKVxuICAgICAgOiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiKTtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiLnJlYWN0aW9uRW1vamlTdHlsZVwiXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXSxcbiAgICAgICAgZWxlbWVudFdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgZWxlbWVudEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgZWxlbWVudEhlaWdodDogZWxlbWVudEhlaWdodCxcbiAgICAgICAgZWxlbWVudFdpZHRoOiBlbGVtZW50V2lkdGgsXG4gICAgICAgIHlTcGVlZDogLXRoaXMudmVydGljYWxTcGVlZCxcbiAgICAgICAgb21lZ2E6ICgyICogTWF0aC5QSSAqIHRoaXMuaG9yaXpvbnRhbFNwZWVkKSAvICh3aWR0aCAqIDYwKSwgLy9vbWVnYT0gMlBpKmZyZXF1ZW5jeVxuICAgICAgICByYW5kb206IChNYXRoLnJhbmRvbSgpIC8gMiArIDAuNSkgKiBpICogMTAwMDAsIC8vcmFuZG9tIHRpbWUgb2Zmc2V0XG4gICAgICAgIHg6IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICgoTWF0aC5zaW4odGhpcy5vbWVnYSAqICh0aW1lICsgdGhpcy5yYW5kb20pKSArIDEpIC8gMikgKlxuICAgICAgICAgICAgKHdpZHRoIC0gZWxlbWVudFdpZHRoKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHk6IGhlaWdodCArIChNYXRoLnJhbmRvbSgpICsgMC4yKSAqIGkgKiBlbGVtZW50SGVpZ2h0LFxuICAgICAgfTtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2FsbCBhbmltYXRpb24gd2l0aCBUaW1lb3V0XG4gICAqL1xuICByZXF1ZXN0QW5pbWF0aW9uKCkge1xuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuICAgIH0sIDEwMDAgLyA2MCk7XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF0ZXNcbiAgICovXG4gIGFuaW1hdGUoKSB7XG4gICAgaWYgKCF0aGlzLmVtb2ppV2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZW1vamlXaW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB0aW1lID0gK25ldyBEYXRlKCk7IC8vbGl0dGxlIHRyaWNrLCBnaXZlcyB1bml4IHRpbWUgaW4gbXNcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaV07XG5cbiAgICAgIGNvbnN0IHRyYW5zZm9ybVN0cmluZyA9XG4gICAgICAgIFwidHJhbnNsYXRlM2QoXCIgKyBpdGVtLngodGltZSkgKyBcInB4LCBcIiArIGl0ZW0ueSArIFwicHgsIDBweClcIjtcbiAgICAgIGl0ZW0uZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICBpdGVtLmVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgaXRlbS55ICs9IGl0ZW0ueVNwZWVkO1xuICAgIH1cbiAgICB0aGlzLnJlcXVlc3RBbmltYXRpb24oKTtcbiAgfVxufVxuIl19