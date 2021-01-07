/**
 * @fileoverview added by tsickle
 * Generated from: components/Calls/cometchat-incoming-call/cometchat-incoming-call/cometchat-incoming-call.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../../utils/controller";
import { INCOMING_CALL_ALERT } from "../../../resources/audio/incomingCallAlert";
import { trigger, style, transition, animate } from "@angular/animations";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatIncomingCallComponent = /** @class */ (function () {
    function CometchatIncomingCallComponent() {
        this.incomingCall = null;
        this.callInProgress = null;
        this.callListenerId = "incoming_call_" + new Date().getTime();
        this.actionGenerated = new EventEmitter();
        this.INCOMING_AUDIO_CALL = STRING_MESSAGES.INCOMING_AUDIO_CALL;
        this.INCOMING_VIDEO_CALL = STRING_MESSAGES.INCOMING_VIDEO_CALL;
        this.DECLINE = STRING_MESSAGES.DECLINE;
        this.ACCEPT = STRING_MESSAGES.ACCEPT;
    }
    // ngOnDestroy() {
    //   this.removeListeners();
    // }
    // ngOnDestroy() {
    //   this.removeListeners();
    // }
    /**
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.ngOnInit = 
    // ngOnDestroy() {
    //   this.removeListeners();
    // }
    /**
     * @return {?}
     */
    function () {
        this.attachListeners();
        this.loadAudio();
    };
    /**
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.attachListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onIncomingCallReceived: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.callScreenUpdated(enums.INCOMING_CALL_RECEIVED, call);
            }),
            onIncomingCallCancelled: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.callScreenUpdated(enums.INCOMING_CALL_CANCELLED, call);
            }),
        }));
    };
    /**
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.removeListeners = /**
     * @return {?}
     */
    function () {
        CometChat.removeCallListener(this.callListenerId);
    };
    /**
     * @param {?} key
     * @param {?} call
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.callScreenUpdated = /**
     * @param {?} key
     * @param {?} call
     * @return {?}
     */
    function (key, call) {
        switch (key) {
            case enums.INCOMING_CALL_RECEIVED: {
                //occurs at the callee end
                this.incomingCallReceived(call);
                break;
            }
            case enums.INCOMING_CALL_CANCELLED: {
                //occurs(call dismissed) at the callee end, caller cancels the call
                this.incomingCallCancelled(call);
                break;
            }
            default:
                break;
        }
    };
    /**
     * When user receives a call
     * @param
     */
    /**
     * When user receives a call
     * @param {?} incomingCall
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.incomingCallReceived = /**
     * When user receives a call
     * @param {?} incomingCall
     * @return {?}
     */
    function (incomingCall) {
        var _this = this;
        this.user = incomingCall.sender;
        this.name = incomingCall.sender.name;
        /** @type {?} */
        var activeCall = CometChat.getActiveCall();
        //if there is another call in progress
        if (activeCall) {
            CometChat.rejectCall(incomingCall.sessionId, CometChat.CALL_STATUS.BUSY)
                .then((/**
             * @param {?} rejectedCall
             * @return {?}
             */
            function (rejectedCall) {
                //mark as read incoming call message
                _this.markMessageAsRead(incomingCall);
                _this.actionGenerated.emit({
                    type: enums.REJECTED_INCOMING_CALL,
                    payLoad: { incomingCall: incomingCall, rejectedCall: rejectedCall },
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
                console.log("Call rejection failed with error:", error);
            }));
        }
        else if (this.incomingCall === null) {
            this.incomingCall = incomingCall;
            if (this.incomingCall !== null) {
                this.playAudio();
            }
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.markMessageAsRead = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var receiverType = message.receiverType;
        /** @type {?} */
        var receiverId = receiverType === "user" ? message.sender.uid : message.receiverId;
        if (message.hasOwnProperty("readAt") === false) {
            CometChat.markAsRead(message.id, receiverId, receiverType);
        }
    };
    /**
     * When call is cancelled
     * @param
     */
    /**
     * When call is cancelled
     * @param {?} call
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.incomingCallCancelled = /**
     * When call is cancelled
     * @param {?} call
     * @return {?}
     */
    function (call) {
        //we are not marking this as read as it will done in messagelist component
        this.pauseAudio();
        this.incomingCall = null;
    };
    /**
     * Rejects call when user click reject
     */
    /**
     * Rejects call when user click reject
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.rejectCall = /**
     * Rejects call when user click reject
     * @return {?}
     */
    function () {
        var _this = this;
        this.pauseAudio();
        CometChatManager.rejectCall(this.incomingCall.sessionId, CometChat.CALL_STATUS.REJECTED)
            .then((/**
         * @param {?} rejectedCall
         * @return {?}
         */
        function (rejectedCall) {
            _this.actionGenerated.emit({
                type: enums.REJECTED_INCOMING_CALL,
                payLoad: {
                    incomingCall: _this.incomingCall,
                    rejectedCall: rejectedCall,
                },
            });
            _this.incomingCall = null;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
            _this.incomingCall = null;
        }));
    };
    /**
     * When user clicks on button to accept call it emits data
     */
    /**
     * When user clicks on button to accept call it emits data
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.acceptCall = /**
     * When user clicks on button to accept call it emits data
     * @return {?}
     */
    function () {
        //this.pauseIncomingAlert();
        this.pauseAudio();
        this.actionGenerated.emit({
            type: enums.ACCEPT_INCOMING_CALL,
            payLoad: this.incomingCall,
        });
        this.incomingCall = null;
        //     this.callInProgress=this.callInProgress
    };
    /**
     * Loads the audio
     */
    /**
     * Loads the audio
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.loadAudio = /**
     * Loads the audio
     * @return {?}
     */
    function () {
        this.audio = new Audio();
        this.audio.src = INCOMING_CALL_ALERT;
    };
    /**
     * Plays Audio in loop
     */
    /**
     * Plays Audio in loop
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.playAudio = /**
     * Plays Audio in loop
     * @return {?}
     */
    function () {
        this.audio.currentTime = 0;
        if (typeof this.audio.loop == "boolean") {
            this.audio.loop = true;
        }
        else {
            this.audio.addEventListener("ended", (/**
             * @return {?}
             */
            function () {
                this.currentTime = 0;
                this.play();
            }), false);
        }
        this.audio.play();
    };
    /**
     * Pauses audio
     */
    /**
     * Pauses audio
     * @return {?}
     */
    CometchatIncomingCallComponent.prototype.pauseAudio = /**
     * Pauses audio
     * @return {?}
     */
    function () {
        this.audio.pause();
    };
    CometchatIncomingCallComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-incoming-call",
                    template: "<div\n  class=\"incomingCallWrapperStyle\"\n  *ngIf=\"incomingCall !== null\"\n  [@slideInOut]\n>\n  <div class=\"callContainerStyle\">\n    <div class=\"headerWrapperStyle\">\n      <div class=\"callDetailStyle\">\n        <div class=\"nameStyle\">\n          <!--name-->\n          {{ name }}\n        </div>\n        <div class=\"callTypeStyle\">\n          <!--call type-->\n          <div *ngIf=\"incomingCall.type === 'audio'\">\n            <span class=\"audioCall\"></span>\n            <span>{{ INCOMING_AUDIO_CALL }}</span>\n          </div>\n          <div *ngIf=\"incomingCall.type === 'video'\">\n            <span class=\"videoCall\"></span>\n            <span>{{ INCOMING_VIDEO_CALL }}</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"thumbnailStyle\">\n        <!--avatar-->\n        <cometchat-avatar\n          [item]=\"user\"\n          [enableUserStatus]=\"false\"\n        ></cometchat-avatar>\n      </div>\n    </div>\n    <div class=\"headerButtonStyle\">\n      <button class=\"ButtonStyle Decline\" (click)=\"rejectCall()\">\n        {{ DECLINE }}\n      </button>\n      <button class=\"ButtonStyle Accept\" (click)=\"acceptCall()\">\n        {{ ACCEPT }}\n      </button>\n    </div>\n  </div>\n</div>\n",
                    animations: [
                        trigger("slideInOut", [
                            transition(":enter", [
                                style({ transform: "translateY(-100%)" }),
                                animate("250ms ease-in", style({ transform: "translateY(0%)" })),
                            ]),
                        ]),
                    ],
                    styles: [".incomingCallWrapperStyle{position:absolute;top:0;left:0;bottom:unset;right:0;border-radius:10px;margin:15px;background-color:#444;z-index:999;color:#fff;text-align:center;box-sizing:border-box;font-family:Inter,sans-serif;width:250px}.incomingCallWrapperStyle *{box-sizing:border-box}.callContainerStyle{display:flex;flex-direction:column;width:100%;padding:15px}.headerWrapperStyle{width:100%;display:flex}.callDetailStyle{width:calc(100% - 36px);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:left}.nameStyle{font-size:15px;font-weight:600;display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:20px}.callTypeStyle{font-size:13px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:capitalize;line-height:20px;color:#8a8a8a;display:flex;justify-content:flex-start;align-items:center;padding:2px 0 0}.callTypeStyle span{padding:0 10px}.thumbnailStyle{width:36px;height:36px;display:flex;justify-content:center}.headerButtonStyle{width:100%;display:flex;justify-content:space-between;margin:10px 0 0}.ButtonStyle{cursor:pointer;padding:6px 20px;border-radius:5px;color:#fff;font-size:14px;outline:0;border:0;width:45%}.Accept{background-color:#39f}.Decline{background-color:#ff3b30}.audioCall{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACRFdLHAAACj0lEQVQ4Ec2US2hTQRSGb94JhCAWBYWCgqAL3Qhu3IkWxJUIFUUwkIdBAqEYBCkKUhBBa7FuQl5oIEUMWNfdK4KCoCtxocRUF4VKI0TM2++PuZeb2lIXLjwwmTn/OfPPf87MjWH8Y3Os58tkMnt8Pt/udrv9OpFItNfHN/ILhcKkw+H4EI1G3zrtCblc7qzf73/lcrleMObsMa3z+fwEI2nHi8ViGgGVXq93SLhFSOJeSDJgOzqdjuF2u5OcfM6+2el0niLnsomxJ03eLNVMx2KxBeEWIeuTHo9ne7fbNfr9vgZVOOYg3WcSgHVQ0pCPsiter3e21Wpdj0Qit8ntC7cIAcYEmCZiNuyCZNrEdAL+N5Rd4vB7KLsRj8dvmXHNbptTJdnm/l7CsWID2xAdRuURlE1R5rwtNlhahJA9p3ffIQiJmN4YbHqG0hn7pmAwuHMNAztGO85QhbvZbD5B6QPlWSUDfMJfRIFwA2L1cZWn82MA8AP5YqPRuMvyIfFl5nfkvGGuMgY28g6z2ewBCF8S2UZZBjcKRzdJadlh/paTpVCZqHkP0U2IBhtZs3Td5xLOb8k0TBhRKKxSqbjq9XqJx3qBHhq8PZX/E6W6hGy5XA6B3yHVz5jhyXzUPtP+IFRAm2j0U8o/IVL1U0a/HjGNc9hx+TybZbA0n1xFvmxDQgVKpdIYqh5z2xMilenCIDD0JcmGrenTmnku61oqlWqO9HCQNfwJh8OrKJhkLIhIpbO2yJTGgQZkFOCYCgQC+4VtSqggl1Sv1WoXUZTGXePNWeUrLpNKSKvEvsjftGQF7cYjPojKq2CnaUPI7CuHfaUN3E1kSfl/TWiS688CwqP44xCt0N8lKvlsxv//+RdSDjjIN00QiwAAAABJRU5ErkJggg==) center center no-repeat}.videoCall{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACRFdLHAAAB9klEQVQ4Ee2Tu0sjURTGZyaTl9qs2GmxrZaLqKDFNot/wFYKgpHEWLlY2dtZCVYZCImd3Xa7sIsIiwgigqKChVvuKlhYKIRMkpn4+8ZcGVMJWnrgzLnn9Z3HvWNZ7/TaDdgGoFKpjNu2vRKG4RQcGLuRjuMk4N0gCDby+fyxsXfLCLADtktCT6vVsgDujrPa7baVTCatZrN5S9xELpe7VJDneQOZTOZro9H4USgU/jkyEjzrum4PwVKjZLq0xAIyBUgSaD+2UcWVSqUR9F/ZbLZEkZxsBnCIUaQLwIdvBUKQuAnwIrytDlWA2LBcLk+m0+nfiUTiU71eV9Fe5UeAKKEUJXD+znGejnVusII5eA99zBSlSIuYJeIHY1O1heHqYwgAHe/p5g4psBmAtKsdfIMCpCOtAtUOkIp/Rs8A5WEkdZ3xfX8BsP+c/wDyQft7CUUjxwOp7HJb2s0R5zV8F4D95RwPU2FXO+6myNLpytzqx2q1Osw4fexnlbHzJHkaNUZSPHzX2ruIglFFU+JK1QiQ4zNgJ8h9bAdIPeJ1+TqJEg5T7LGWaeynPBvZapEj+jjONg7fVAMoCadj7KiBVCqlh31DwUPlFYvFM9bxpVarLWPfku1pMXpXAH4DeJIVPLajiA4BqF/vJze9ya93buzv8u038AAdggH5Kp0raQAAAABJRU5ErkJggg==) center center no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    CometchatIncomingCallComponent.ctorParameters = function () { return []; };
    CometchatIncomingCallComponent.propDecorators = {
        actionGenerated: [{ type: Output }]
    };
    return CometchatIncomingCallComponent;
}());
export { CometchatIncomingCallComponent };
if (false) {
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.callInProgress;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.callListenerId;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.user;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.name;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.audio;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.INCOMING_AUDIO_CALL;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.INCOMING_VIDEO_CALL;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.DECLINE;
    /** @type {?} */
    CometchatIncomingCallComponent.prototype.ACCEPT;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWluY29taW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvY29tZXRjaGF0LWluY29taW5nLWNhbGwvY29tZXRjaGF0LWluY29taW5nLWNhbGwvY29tZXRjaGF0LWluY29taW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbEU7SUE0QkU7UUFkQSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLGdCQUFnQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0Msb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU1sRSx3QkFBbUIsR0FBVyxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFDbEUsd0JBQW1CLEdBQVcsZUFBZSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xFLFlBQU8sR0FBVyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBQzFDLFdBQU0sR0FBVyxlQUFlLENBQUMs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SSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsQ0FBQyxHQUNELEtBQUssQ0FDTixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxtREFBVTs7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDOztnQkF4TUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHF2Q0FBdUQ7b0JBRXZELFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsWUFBWSxFQUFFOzRCQUNwQixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQ0FDekMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDOzZCQUNqRSxDQUFDO3lCQUNILENBQUM7cUJBQ0g7O2lCQUNGOzs7OztrQ0FLRSxNQUFNOztJQXdMVCxxQ0FBQztDQUFBLEFBek1ELElBeU1DO1NBNUxZLDhCQUE4Qjs7O0lBQ3pDLHNEQUFvQjs7SUFDcEIsd0RBQXNCOztJQUN0Qix3REFBeUQ7O0lBQ3pELHlEQUFrRTs7SUFFbEUsOENBQUs7O0lBQ0wsOENBQWE7O0lBQ2IsK0NBQU07O0lBRU4sNkRBQWtFOztJQUNsRSw2REFBa0U7O0lBQ2xFLGlEQUEwQzs7SUFDMUMsZ0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgSU5DT01JTkdfQ0FMTF9BTEVSVCB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvYXVkaW8vaW5jb21pbmdDYWxsQWxlcnRcIjtcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtaW5jb21pbmctY2FsbFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1pbmNvbWluZy1jYWxsLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtaW5jb21pbmctY2FsbC5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcInNsaWRlSW5PdXRcIiwgW1xuICAgICAgdHJhbnNpdGlvbihcIjplbnRlclwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTEwMCUpXCIgfSksXG4gICAgICAgIGFuaW1hdGUoXCIyNTBtcyBlYXNlLWluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoMCUpXCIgfSkpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdEluY29taW5nQ2FsbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIGNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgY2FsbExpc3RlbmVySWQgPSBcImluY29taW5nX2NhbGxfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdXNlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBhdWRpbztcblxuICBJTkNPTUlOR19BVURJT19DQUxMOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuSU5DT01JTkdfQVVESU9fQ0FMTDtcbiAgSU5DT01JTkdfVklERU9fQ0FMTDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLklOQ09NSU5HX1ZJREVPX0NBTEw7XG4gIERFQ0xJTkU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5ERUNMSU5FO1xuICBBQ0NFUFQ6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5BQ0NFUFQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuICAvLyBuZ09uRGVzdHJveSgpIHtcbiAgLy8gICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAvLyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmxvYWRBdWRpbygpO1xuICB9XG5cbiAgYXR0YWNoTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5DYWxsTGlzdGVuZXIoe1xuICAgICAgICBvbkluY29taW5nQ2FsbFJlY2VpdmVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsbFNjcmVlblVwZGF0ZWQoZW51bXMuSU5DT01JTkdfQ0FMTF9SRUNFSVZFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5jb21pbmdDYWxsQ2FuY2VsbGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsbFNjcmVlblVwZGF0ZWQoZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gIH1cblxuICBjYWxsU2NyZWVuVXBkYXRlZChrZXksIGNhbGwpIHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX1JFQ0VJVkVEOiB7XG4gICAgICAgIC8vb2NjdXJzIGF0IHRoZSBjYWxsZWUgZW5kXG4gICAgICAgIHRoaXMuaW5jb21pbmdDYWxsUmVjZWl2ZWQoY2FsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRDoge1xuICAgICAgICAvL29jY3VycyhjYWxsIGRpc21pc3NlZCkgYXQgdGhlIGNhbGxlZSBlbmQsIGNhbGxlciBjYW5jZWxzIHRoZSBjYWxsXG4gICAgICAgIHRoaXMuaW5jb21pbmdDYWxsQ2FuY2VsbGVkKGNhbGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdXNlciByZWNlaXZlcyBhIGNhbGxcbiAgICogQHBhcmFtXG4gICAqL1xuICBpbmNvbWluZ0NhbGxSZWNlaXZlZChpbmNvbWluZ0NhbGwpIHtcbiAgICB0aGlzLnVzZXIgPSBpbmNvbWluZ0NhbGwuc2VuZGVyO1xuICAgIHRoaXMubmFtZSA9IGluY29taW5nQ2FsbC5zZW5kZXIubmFtZTtcbiAgICBjb25zdCBhY3RpdmVDYWxsID0gQ29tZXRDaGF0LmdldEFjdGl2ZUNhbGwoKTtcblxuICAgIC8vaWYgdGhlcmUgaXMgYW5vdGhlciBjYWxsIGluIHByb2dyZXNzXG4gICAgaWYgKGFjdGl2ZUNhbGwpIHtcbiAgICAgIENvbWV0Q2hhdC5yZWplY3RDYWxsKGluY29taW5nQ2FsbC5zZXNzaW9uSWQsIENvbWV0Q2hhdC5DQUxMX1NUQVRVUy5CVVNZKVxuICAgICAgICAudGhlbigocmVqZWN0ZWRDYWxsKSA9PiB7XG4gICAgICAgICAgLy9tYXJrIGFzIHJlYWQgaW5jb21pbmcgY2FsbCBtZXNzYWdlXG4gICAgICAgICAgdGhpcy5tYXJrTWVzc2FnZUFzUmVhZChpbmNvbWluZ0NhbGwpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTCxcbiAgICAgICAgICAgIHBheUxvYWQ6IHsgaW5jb21pbmdDYWxsLCByZWplY3RlZENhbGw6IHJlamVjdGVkQ2FsbCB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNBTExfRVJST1IsIHBheUxvYWQ6IGVycm9yIH0pO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coXCJDYWxsIHJlamVjdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5jb21pbmdDYWxsID09PSBudWxsKSB7XG4gICAgICB0aGlzLmluY29taW5nQ2FsbCA9IGluY29taW5nQ2FsbDtcbiAgICAgIGlmICh0aGlzLmluY29taW5nQ2FsbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1hcmtNZXNzYWdlQXNSZWFkKG1lc3NhZ2UpIHtcbiAgICBjb25zdCByZWNlaXZlclR5cGUgPSBtZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCByZWNlaXZlcklkID1cbiAgICAgIHJlY2VpdmVyVHlwZSA9PT0gXCJ1c2VyXCIgPyBtZXNzYWdlLnNlbmRlci51aWQgOiBtZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICBpZiAobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlYWRBdFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKG1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2FsbCBpcyBjYW5jZWxsZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBpbmNvbWluZ0NhbGxDYW5jZWxsZWQoY2FsbCkge1xuICAgIC8vd2UgYXJlIG5vdCBtYXJraW5nIHRoaXMgYXMgcmVhZCBhcyBpdCB3aWxsIGRvbmUgaW4gbWVzc2FnZWxpc3QgY29tcG9uZW50XG4gICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlamVjdHMgY2FsbCB3aGVuIHVzZXIgY2xpY2sgcmVqZWN0XG4gICAqL1xuICByZWplY3RDYWxsKCkge1xuICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgIENvbWV0Q2hhdE1hbmFnZXIucmVqZWN0Q2FsbChcbiAgICAgIHRoaXMuaW5jb21pbmdDYWxsLnNlc3Npb25JZCxcbiAgICAgIENvbWV0Q2hhdC5DQUxMX1NUQVRVUy5SRUpFQ1RFRFxuICAgIClcbiAgICAgIC50aGVuKChyZWplY3RlZENhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTCxcbiAgICAgICAgICBwYXlMb2FkOiB7XG4gICAgICAgICAgICBpbmNvbWluZ0NhbGw6IHRoaXMuaW5jb21pbmdDYWxsLFxuICAgICAgICAgICAgcmVqZWN0ZWRDYWxsOiByZWplY3RlZENhbGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoeyB0eXBlOiBlbnVtcy5DQUxMX0VSUk9SLCBwYXlMb2FkOiBlcnJvciB9KTtcbiAgICAgICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIGNsaWNrcyBvbiBidXR0b24gdG8gYWNjZXB0IGNhbGwgaXQgZW1pdHMgZGF0YVxuICAgKi9cbiAgYWNjZXB0Q2FsbCgpIHtcbiAgICAvL3RoaXMucGF1c2VJbmNvbWluZ0FsZXJ0KCk7XG4gICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG5cbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMLFxuICAgICAgcGF5TG9hZDogdGhpcy5pbmNvbWluZ0NhbGwsXG4gICAgfSk7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIC8vICAgICB0aGlzLmNhbGxJblByb2dyZXNzPXRoaXMuY2FsbEluUHJvZ3Jlc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgYXVkaW9cbiAgICovXG4gIGxvYWRBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgdGhpcy5hdWRpby5zcmMgPSBJTkNPTUlOR19DQUxMX0FMRVJUO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIGluIGxvb3BcbiAgICovXG4gIHBsYXlBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICBpZiAodHlwZW9mIHRoaXMuYXVkaW8ubG9vcCA9PSBcImJvb2xlYW5cIikge1xuICAgICAgdGhpcy5hdWRpby5sb29wID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImVuZGVkXCIsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBhdWRpb1xuICAgKi9cbiAgcGF1c2VBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gIH1cbn1cbiJdfQ==