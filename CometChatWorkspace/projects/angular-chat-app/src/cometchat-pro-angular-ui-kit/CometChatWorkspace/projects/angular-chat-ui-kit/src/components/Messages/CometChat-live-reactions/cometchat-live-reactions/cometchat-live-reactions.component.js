/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-live-reactions/cometchat-live-reactions/cometchat-live-reactions.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
export class CometChatLiveReactionsComponent {
    constructor() {
        this.reactionName = null;
        this.items = [];
        this.checkAnimatedState = "normal";
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            clearTimeout(this.timer);
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
            this.counter = 0;
            this.verticalSpeed = 5;
            this.horizontalSpeed = 2;
            this.items = [];
            this.before = Date.now();
            /** @type {?} */
            const reaction = this.reactionName
                ? enums.LIVE_REACTIONS[this.reactionName]
                : enums.LIVE_REACTIONS[COMETCHAT_CONSTANTS.HEART];
            this.setItems();
            this.requestAnimation();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets height width speed for animation
     * @return {?}
     */
    setItems() {
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Function to call animation with Timeout
     * @return {?}
     */
    requestAnimation() {
        try {
            this.timer = setTimeout((/**
             * @return {?}
             */
            () => {
                this.animate();
            }), 1000 / 60);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Animates the reactions
     * @return {?}
     */
    animate() {
        try {
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
        catch (error) {
            logger(error);
        }
    }
}
CometChatLiveReactionsComponent.decorators = [
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
CometChatLiveReactionsComponent.ctorParameters = () => [];
CometChatLiveReactionsComponent.propDecorators = {
    reactionName: [{ type: Input }],
    emojiWindow: [{ type: ViewChild, args: ["emoji", { static: true },] }]
};
if (false) {
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.reactionName;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.counter;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.verticalSpeed;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.horizontalSpeed;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.before;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.items;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.timer;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatLiveReactionsComponent.prototype.emojiWindow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1saXZlLXJlYWN0aW9ucy9jb21ldGNoYXQtbGl2ZS1yZWFjdGlvbnMvY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxLQUFLLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXdCbEQsTUFBTSxPQUFPLCtCQUErQjtJQVkxQztRQVhTLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBSzdCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCx1QkFBa0IsR0FBRyxRQUFRLENBQUM7SUFJZixDQUFDOzs7O0lBRWhCLFdBQVc7UUFDVCxJQUFJO1lBQ0YsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxH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QXdEO2dCQUV4RCxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLGVBQWUsRUFBRTt3QkFDdkIsS0FBSyxDQUNILFFBQVEsRUFDUixLQUFLLENBQUM7NEJBQ0osT0FBTyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQyxDQUNIO3dCQUNELEtBQUssQ0FDSCxVQUFVLEVBQ1YsS0FBSyxDQUFDOzRCQUNKLE9BQU8sRUFBRSxHQUFHOzRCQUNaLFVBQVUsRUFBRSxZQUFZO3lCQUN6QixDQUFDLENBQ0g7d0JBQ0QsVUFBVSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDOUMsQ0FBQztpQkFDSDs7YUFDRjs7Ozs7MkJBRUUsS0FBSzswQkFTTCxTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQVRwQyx1REFBNkI7O0lBQzdCLGtEQUFROztJQUNSLHdEQUFjOztJQUNkLDBEQUFnQjs7SUFDaEIsaURBQU87O0lBQ1AsZ0RBQVc7O0lBQ1gsZ0RBQU07O0lBQ04sNkRBQThCOztJQUU5QixzREFBOEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1saXZlLXJlYWN0aW9uc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1saXZlLXJlYWN0aW9ucy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWxpdmUtcmVhY3Rpb25zLmNvbXBvbmVudC5jc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiRmFkZUluRmFkZU91dFwiLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJub3JtYWxcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICBcImFuaW1hdGVkXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcIm9wYWNpdHkgNXNcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFwibm9ybWFsPT5hbmltYXRlZFwiLCBhbmltYXRlKDU1MDApKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TGl2ZVJlYWN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHJlYWN0aW9uTmFtZSA9IG51bGw7XG4gIGNvdW50ZXI7XG4gIHZlcnRpY2FsU3BlZWQ7XG4gIGhvcml6b250YWxTcGVlZDtcbiAgYmVmb3JlO1xuICBpdGVtcyA9IFtdO1xuICB0aW1lcjtcbiAgY2hlY2tBbmltYXRlZFN0YXRlID0gXCJub3JtYWxcIjtcblxuICBAVmlld0NoaWxkKFwiZW1vamlcIiwgeyBzdGF0aWM6IHRydWUgfSkgZW1vamlXaW5kb3c6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRyeSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICB0aGlzLnZlcnRpY2FsU3BlZWQgPSA1O1xuICAgICAgdGhpcy5ob3Jpem9udGFsU3BlZWQgPSAyO1xuICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICB0aGlzLmJlZm9yZSA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCByZWFjdGlvbiA9IHRoaXMucmVhY3Rpb25OYW1lXG4gICAgICAgID8gZW51bXMuTElWRV9SRUFDVElPTlNbdGhpcy5yZWFjdGlvbk5hbWVdXG4gICAgICAgIDogZW51bXMuTElWRV9SRUFDVElPTlNbQ09NRVRDSEFUX0NPTlNUQU5UUy5IRUFSVF07XG5cbiAgICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGhlaWdodCB3aWR0aCBzcGVlZCBmb3IgYW5pbWF0aW9uXG4gICAqL1xuICBzZXRJdGVtcygpIHtcbiAgICB0cnkge1xuICAgICAgLy9Ub2dnbGUgYW5pbWF0aW9uIHN0YXRlXG4gICAgICB0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9PSBcIm5vcm1hbFwiXG4gICAgICAgID8gKHRoaXMuY2hlY2tBbmltYXRlZFN0YXRlID0gXCJhbmltYXRlZFwiKVxuICAgICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZW1vamlXaW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmVtb2ppV2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBcIi5yZWFjdGlvbkVtb2ppU3R5bGVcIlxuICAgICAgKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV0sXG4gICAgICAgICAgZWxlbWVudFdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICBlbGVtZW50SGVpZ2h0OiBlbGVtZW50SGVpZ2h0LFxuICAgICAgICAgIGVsZW1lbnRXaWR0aDogZWxlbWVudFdpZHRoLFxuICAgICAgICAgIHlTcGVlZDogLXRoaXMudmVydGljYWxTcGVlZCxcbiAgICAgICAgICBvbWVnYTogKDIgKiBNYXRoLlBJICogdGhpcy5ob3Jpem9udGFsU3BlZWQpIC8gKHdpZHRoICogNjApLCAvL29tZWdhPSAyUGkqZnJlcXVlbmN5XG4gICAgICAgICAgcmFuZG9tOiAoTWF0aC5yYW5kb20oKSAvIDIgKyAwLjUpICogaSAqIDEwMDAwLCAvL3JhbmRvbSB0aW1lIG9mZnNldFxuICAgICAgICAgIHg6IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAoKE1hdGguc2luKHRoaXMub21lZ2EgKiAodGltZSArIHRoaXMucmFuZG9tKSkgKyAxKSAvIDIpICpcbiAgICAgICAgICAgICAgKHdpZHRoIC0gZWxlbWVudFdpZHRoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHk6IGhlaWdodCArIChNYXRoLnJhbmRvbSgpICsgMC4yKSAqIGkgKiBlbGVtZW50SGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYW5pbWF0aW9uIHdpdGggVGltZW91dFxuICAgKi9cbiAgcmVxdWVzdEFuaW1hdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICAgIH0sIDEwMDAgLyA2MCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hdGVzIHRoZSByZWFjdGlvbnNcbiAgICovXG4gIGFuaW1hdGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5lbW9qaVdpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVtb2ppV2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICBjb25zdCB0aW1lID0gK25ldyBEYXRlKCk7IC8vbGl0dGxlIHRyaWNrLCBnaXZlcyB1bml4IHRpbWUgaW4gbXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybVN0cmluZyA9XG4gICAgICAgICAgXCJ0cmFuc2xhdGUzZChcIiArIGl0ZW0ueCh0aW1lKSArIFwicHgsIFwiICsgaXRlbS55ICsgXCJweCwgMHB4KVwiO1xuICAgICAgICBpdGVtLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICBpdGVtLmVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICBpdGVtLnkgKz0gaXRlbS55U3BlZWQ7XG4gICAgICB9XG4gICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==