/**
 * @fileoverview added by tsickle
 * Generated from: components/Calls/CometChat-incoming-call/cometchat-incoming-call/cometchat-incoming-call.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../../../utils/controller";
import { INCOMING_CALL_ALERT } from "../../../../resources/audio/incomingCallAlert";
import { trigger, style, transition, animate } from "@angular/animations";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatIncomingCallComponent {
    constructor() {
        this.incomingCall = null;
        this.callInProgress = null;
        this.callListenerId = enums.INCOMING_CALL_ + new Date().getTime();
        this.actionGenerated = new EventEmitter();
        this.INCOMING_AUDIO_CALL = COMETCHAT_CONSTANTS.INCOMING_AUDIO_CALL;
        this.INCOMING_VIDEO_CALL = COMETCHAT_CONSTANTS.INCOMING_VIDEO_CALL;
        this.DECLINE = COMETCHAT_CONSTANTS.DECLINE;
        this.ACCEPT = COMETCHAT_CONSTANTS.ACCEPT;
        this.CALL_TYPE_AUDIO = CometChat.CALL_TYPE.AUDIO;
        this.CALL_TYPE_VIDEO = CometChat.CALL_TYPE.VIDEO;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.attachListeners();
            this.loadAudio();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Attaches call listeners , so that user can receive / cancel real-time calls
     * @return {?}
     */
    attachListeners() {
        try {
            CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
                onIncomingCallReceived: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.callScreenUpdated(enums.INCOMING_CALL_RECEIVED, call);
                }),
                onIncomingCallCancelled: (/**
                 * @param {?} call
                 * @return {?}
                 */
                (call) => {
                    this.callScreenUpdated(enums.INCOMING_CALL_CANCELLED, call);
                }),
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes call listeners when component is destroyed
     * @return {?}
     */
    removeListeners() {
        try {
            CometChat.removeCallListener(this.callListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates the call screen and opens/closes outgoing callScreen , depending on action taken by user
     * @param {?} key
     * @param {?} call
     * @return {?}
     */
    callScreenUpdated(key, call) {
        try {
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
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When user receives a call , the function notifies the user , if the user is not already on another call
     * If the user is on another call , it show busy to the person that is calling the current user
     * @param {?} incomingCall
     * @return {?}
     */
    incomingCallReceived(incomingCall) {
        try {
            this.user = incomingCall.sender;
            this.name = incomingCall.sender.name;
            /** @type {?} */
            const activeCall = CometChat.getActiveCall();
            //if there is another call in progress
            if (activeCall) {
                CometChat.rejectCall(incomingCall.sessionId, CometChat.CALL_STATUS.BUSY)
                    .then((/**
                 * @param {?} rejectedCall
                 * @return {?}
                 */
                (rejectedCall) => {
                    //mark as read incoming call message
                    this.markMessageAsRead(incomingCall);
                    this.actionGenerated.emit({
                        type: enums.REJECTED_INCOMING_CALL,
                        payLoad: { incomingCall, rejectedCall: rejectedCall },
                    });
                }))
                    .catch((/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.actionGenerated.emit({
                        type: enums.CALL_ERROR,
                        payLoad: error,
                    });
                    logger("Call rejection failed with error:", error);
                }));
            }
            else if (this.incomingCall === null) {
                this.incomingCall = incomingCall;
                if (this.incomingCall !== null) {
                    this.playAudio();
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * marks the message as read by the current loggedInUser
     * @param {?} message
     * @return {?}
     */
    markMessageAsRead(message) {
        try {
            /** @type {?} */
            const receiverType = message.receiverType;
            /** @type {?} */
            const receiverId = receiverType === CometChat.RECEIVER_TYPE.USER
                ? message.sender.uid
                : message.receiverId;
            if (message.hasOwnProperty(enums.READ_AT) === false) {
                CometChat.markAsRead(message.id, receiverId, receiverType);
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When call is cancelled
     * @param {?} call
     * @return {?}
     */
    incomingCallCancelled(call) {
        //we are not marking this as read as it will done in messagelist component
        this.pauseAudio();
        this.incomingCall = null;
    }
    /**
     * Rejects call when user click reject
     * @return {?}
     */
    rejectCall() {
        try {
            this.pauseAudio();
            CometChatManager.rejectCall(this.incomingCall.sessionId, CometChat.CALL_STATUS.REJECTED)
                .then((/**
             * @param {?} rejectedCall
             * @return {?}
             */
            (rejectedCall) => {
                this.actionGenerated.emit({
                    type: enums.REJECTED_INCOMING_CALL,
                    payLoad: {
                        incomingCall: this.incomingCall,
                        rejectedCall: rejectedCall,
                    },
                });
                this.incomingCall = null;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
                this.incomingCall = null;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When user clicks on button to accept call it emits data about the incoming call that was accepted
     * @return {?}
     */
    acceptCall() {
        try {
            this.pauseAudio();
            this.actionGenerated.emit({
                type: enums.ACCEPT_INCOMING_CALL,
                payLoad: this.incomingCall,
            });
            this.incomingCall = null;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Loads the audio
     * @return {?}
     */
    loadAudio() {
        try {
            this.audio = new Audio();
            this.audio.src = INCOMING_CALL_ALERT;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Plays Audio in loop
     * @return {?}
     */
    playAudio() {
        try {
            this.audio.currentTime = 0;
            if (typeof this.audio.loop == enums.Boolean) {
                this.audio.loop = true;
            }
            else {
                this.audio.addEventListener(enums.ENDED, (/**
                 * @return {?}
                 */
                function () {
                    this.currentTime = 0;
                    this.play();
                }), false);
            }
            this.audio.play();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Pauses audio
     * @return {?}
     */
    pauseAudio() {
        try {
            this.audio.pause();
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatIncomingCallComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-incoming-call",
                template: "<div\n  class=\"incomingCallWrapperStyle\"\n  *ngIf=\"incomingCall !== null\"\n  [@slideInOut]\n>\n  <div class=\"callContainerStyle\">\n    <div class=\"headerWrapperStyle\">\n      <div class=\"callDetailStyle\">\n        <div class=\"nameStyle\">\n          <!--name-->\n          {{ name }}\n        </div>\n        <div class=\"callTypeStyle\">\n          <!--call type-->\n          <div *ngIf=\"incomingCall.type === CALL_TYPE_AUDIO\">\n            <span class=\"audioCall\"></span>\n            <span>{{ INCOMING_AUDIO_CALL }}</span>\n          </div>\n          <div *ngIf=\"incomingCall.type === CALL_TYPE_VIDEO\">\n            <span class=\"videoCall\"></span>\n            <span>{{ INCOMING_VIDEO_CALL }}</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"thumbnailStyle\">\n        <!--avatar-->\n        <cometchat-avatar\n          [item]=\"user\"\n          [enableUserStatus]=\"false\"\n        ></cometchat-avatar>\n      </div>\n    </div>\n    <div class=\"headerButtonStyle\">\n      <button class=\"ButtonStyle Decline\" (click)=\"rejectCall()\">\n        {{ DECLINE }}\n      </button>\n      <button class=\"ButtonStyle Accept\" (click)=\"acceptCall()\">\n        {{ ACCEPT }}\n      </button>\n    </div>\n  </div>\n</div>\n",
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
CometChatIncomingCallComponent.ctorParameters = () => [];
CometChatIncomingCallComponent.propDecorators = {
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.callInProgress;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.callListenerId;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.user;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.name;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.audio;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.INCOMING_AUDIO_CALL;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.INCOMING_VIDEO_CALL;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.DECLINE;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.ACCEPT;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.CALL_TYPE_AUDIO;
    /** @type {?} */
    CometChatIncomingCallComponent.prototype.CALL_TYPE_VIDEO;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LWluY29taW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvQ29tZXRDaGF0LWluY29taW5nLWNhbGwvY29tZXRjaGF0LWluY29taW5nLWNhbGwvY29tZXRjaGF0LWluY29taW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFlbEQsTUFBTSxPQUFPLDhCQUE4QjtJQWtCekM7UUFqQkEsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU1sRSx3QkFBbUIsR0FBVyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUN0RSx3QkFBbUIsR0FBVyxtQkFBbUIsQ0FB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S0FBSyxFQUFFLENBQUM7U0FDcEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBeFFGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxxd0NBQXVEO2dCQUV2RCxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDcEIsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLENBQUM7NEJBQ3pDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQzt5QkFDakUsQ0FBQztxQkFDSCxDQUFDO2lCQUNIOzthQUNGOzs7Ozs4QkFLRSxNQUFNOzs7O0lBSFAsc0RBQW9COztJQUNwQix3REFBc0I7O0lBQ3RCLHdEQUE2RDs7SUFDN0QseURBQWtFOztJQUVsRSw4Q0FBSzs7SUFDTCw4Q0FBYTs7SUFDYiwrQ0FBTTs7SUFFTiw2REFBc0U7O0lBQ3RFLDZEQUFzRTs7SUFDdEUsaURBQThDOztJQUM5QyxnREFBNEM7O0lBRTVDLHlEQUFvRDs7SUFDcEQseURBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgSU5DT01JTkdfQ0FMTF9BTEVSVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXNvdXJjZXMvYXVkaW8vaW5jb21pbmdDYWxsQWxlcnRcIjtcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IENPTUVUQ0hBVF9DT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LWluY29taW5nLWNhbGxcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtaW5jb21pbmctY2FsbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LWluY29taW5nLWNhbGwuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJzbGlkZUluT3V0XCIsIFtcbiAgICAgIHRyYW5zaXRpb24oXCI6ZW50ZXJcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKC0xMDAlKVwiIH0pLFxuICAgICAgICBhbmltYXRlKFwiMjUwbXMgZWFzZS1pblwiLCBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKDAlKVwiIH0pKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRJbmNvbWluZ0NhbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBjYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gIGNhbGxMaXN0ZW5lcklkID0gZW51bXMuSU5DT01JTkdfQ0FMTF8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdXNlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBhdWRpbztcblxuICBJTkNPTUlOR19BVURJT19DQUxMOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLklOQ09NSU5HX0FVRElPX0NBTEw7XG4gIElOQ09NSU5HX1ZJREVPX0NBTEw6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuSU5DT01JTkdfVklERU9fQ0FMTDtcbiAgREVDTElORTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5ERUNMSU5FO1xuICBBQ0NFUFQ6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQUNDRVBUO1xuXG4gIENBTExfVFlQRV9BVURJTzogU3RyaW5nID0gQ29tZXRDaGF0LkNBTExfVFlQRS5BVURJTztcbiAgQ0FMTF9UWVBFX1ZJREVPOiBTdHJpbmcgPSBDb21ldENoYXQuQ0FMTF9UWVBFLlZJREVPO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMubG9hZEF1ZGlvKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGNhbGwgbGlzdGVuZXJzICwgc28gdGhhdCB1c2VyIGNhbiByZWNlaXZlIC8gY2FuY2VsIHJlYWwtdGltZSBjYWxsc1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGF0dGFjaExpc3RlbmVycygpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmFkZENhbGxMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXJJZCxcbiAgICAgICAgbmV3IENvbWV0Q2hhdC5DYWxsTGlzdGVuZXIoe1xuICAgICAgICAgIG9uSW5jb21pbmdDYWxsUmVjZWl2ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQsIGNhbGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25JbmNvbWluZ0NhbGxDYW5jZWxsZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBjYWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjYWxsIGxpc3RlbmVycyB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNhbGwgc2NyZWVuIGFuZCBvcGVucy9jbG9zZXMgb3V0Z29pbmcgY2FsbFNjcmVlbiAsIGRlcGVuZGluZyBvbiBhY3Rpb24gdGFrZW4gYnkgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbGxTY3JlZW5VcGRhdGVkKGtleSwgY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfUkVDRUlWRUQ6IHtcbiAgICAgICAgICAvL29jY3VycyBhdCB0aGUgY2FsbGVlIGVuZFxuICAgICAgICAgIHRoaXMuaW5jb21pbmdDYWxsUmVjZWl2ZWQoY2FsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRDoge1xuICAgICAgICAgIC8vb2NjdXJzKGNhbGwgZGlzbWlzc2VkKSBhdCB0aGUgY2FsbGVlIGVuZCwgY2FsbGVyIGNhbmNlbHMgdGhlIGNhbGxcbiAgICAgICAgICB0aGlzLmluY29taW5nQ2FsbENhbmNlbGxlZChjYWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdXNlciByZWNlaXZlcyBhIGNhbGwgLCB0aGUgZnVuY3Rpb24gbm90aWZpZXMgdGhlIHVzZXIgLCBpZiB0aGUgdXNlciBpcyBub3QgYWxyZWFkeSBvbiBhbm90aGVyIGNhbGxcbiAgICogSWYgdGhlIHVzZXIgaXMgb24gYW5vdGhlciBjYWxsICwgaXQgc2hvdyBidXN5IHRvIHRoZSBwZXJzb24gdGhhdCBpcyBjYWxsaW5nIHRoZSBjdXJyZW50IHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBpbmNvbWluZ0NhbGxSZWNlaXZlZChpbmNvbWluZ0NhbGwpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy51c2VyID0gaW5jb21pbmdDYWxsLnNlbmRlcjtcbiAgICAgIHRoaXMubmFtZSA9IGluY29taW5nQ2FsbC5zZW5kZXIubmFtZTtcbiAgICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBDb21ldENoYXQuZ2V0QWN0aXZlQ2FsbCgpO1xuXG4gICAgICAvL2lmIHRoZXJlIGlzIGFub3RoZXIgY2FsbCBpbiBwcm9ncmVzc1xuICAgICAgaWYgKGFjdGl2ZUNhbGwpIHtcbiAgICAgICAgQ29tZXRDaGF0LnJlamVjdENhbGwoaW5jb21pbmdDYWxsLnNlc3Npb25JZCwgQ29tZXRDaGF0LkNBTExfU1RBVFVTLkJVU1kpXG4gICAgICAgICAgLnRoZW4oKHJlamVjdGVkQ2FsbCkgPT4ge1xuICAgICAgICAgICAgLy9tYXJrIGFzIHJlYWQgaW5jb21pbmcgY2FsbCBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlQXNSZWFkKGluY29taW5nQ2FsbCk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTCxcbiAgICAgICAgICAgICAgcGF5TG9hZDogeyBpbmNvbWluZ0NhbGwsIHJlamVjdGVkQ2FsbDogcmVqZWN0ZWRDYWxsIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX0VSUk9SLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBlcnJvcixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsb2dnZXIoXCJDYWxsIHJlamVjdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluY29taW5nQ2FsbCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmluY29taW5nQ2FsbCA9IGluY29taW5nQ2FsbDtcbiAgICAgICAgaWYgKHRoaXMuaW5jb21pbmdDYWxsICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtYXJrcyB0aGUgbWVzc2FnZSBhcyByZWFkIGJ5IHRoZSBjdXJyZW50IGxvZ2dlZEluVXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIG1hcmtNZXNzYWdlQXNSZWFkKG1lc3NhZ2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVjZWl2ZXJUeXBlID0gbWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgICBjb25zdCByZWNlaXZlcklkID1cbiAgICAgICAgcmVjZWl2ZXJUeXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSXG4gICAgICAgICAgPyBtZXNzYWdlLnNlbmRlci51aWRcbiAgICAgICAgICA6IG1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoZW51bXMuUkVBRF9BVCkgPT09IGZhbHNlKSB7XG4gICAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKG1lc3NhZ2UuaWQsIHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2FsbCBpcyBjYW5jZWxsZWRcbiAgICogQHBhcmFtXG4gICAqL1xuICBpbmNvbWluZ0NhbGxDYW5jZWxsZWQoY2FsbCkge1xuICAgIC8vd2UgYXJlIG5vdCBtYXJraW5nIHRoaXMgYXMgcmVhZCBhcyBpdCB3aWxsIGRvbmUgaW4gbWVzc2FnZWxpc3QgY29tcG9uZW50XG4gICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG4gICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlamVjdHMgY2FsbCB3aGVuIHVzZXIgY2xpY2sgcmVqZWN0XG4gICAqL1xuICByZWplY3RDYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhdXNlQXVkaW8oKTtcbiAgICAgIENvbWV0Q2hhdE1hbmFnZXIucmVqZWN0Q2FsbChcbiAgICAgICAgdGhpcy5pbmNvbWluZ0NhbGwuc2Vzc2lvbklkLFxuICAgICAgICBDb21ldENoYXQuQ0FMTF9TVEFUVVMuUkVKRUNURURcbiAgICAgIClcbiAgICAgICAgLnRoZW4oKHJlamVjdGVkQ2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuUkVKRUNURURfSU5DT01JTkdfQ0FMTCxcbiAgICAgICAgICAgIHBheUxvYWQ6IHtcbiAgICAgICAgICAgICAgaW5jb21pbmdDYWxsOiB0aGlzLmluY29taW5nQ2FsbCxcbiAgICAgICAgICAgICAgcmVqZWN0ZWRDYWxsOiByZWplY3RlZENhbGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoeyB0eXBlOiBlbnVtcy5DQUxMX0VSUk9SLCBwYXlMb2FkOiBlcnJvciB9KTtcbiAgICAgICAgICB0aGlzLmluY29taW5nQ2FsbCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHVzZXIgY2xpY2tzIG9uIGJ1dHRvbiB0byBhY2NlcHQgY2FsbCBpdCBlbWl0cyBkYXRhIGFib3V0IHRoZSBpbmNvbWluZyBjYWxsIHRoYXQgd2FzIGFjY2VwdGVkXG4gICAqL1xuICBhY2NlcHRDYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhdXNlQXVkaW8oKTtcblxuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLkFDQ0VQVF9JTkNPTUlOR19DQUxMLFxuICAgICAgICBwYXlMb2FkOiB0aGlzLmluY29taW5nQ2FsbCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbmNvbWluZ0NhbGwgPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgYXVkaW9cbiAgICovXG4gIGxvYWRBdWRpbygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy5hdWRpby5zcmMgPSBJTkNPTUlOR19DQUxMX0FMRVJUO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5cyBBdWRpbyBpbiBsb29wXG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1ZGlvLmxvb3AgPT0gZW51bXMuQm9vbGVhbikge1xuICAgICAgICB0aGlzLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGVudW1zLkVOREVELFxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBhdWRpb1xuICAgKi9cbiAgcGF1c2VBdWRpbygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19