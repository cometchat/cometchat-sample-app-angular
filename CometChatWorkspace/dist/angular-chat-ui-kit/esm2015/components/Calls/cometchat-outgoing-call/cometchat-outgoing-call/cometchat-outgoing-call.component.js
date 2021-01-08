/**
 * @fileoverview added by tsickle
 * Generated from: components/Calls/cometchat-outgoing-call/cometchat-outgoing-call/cometchat-outgoing-call.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { OUTGOING_CALL_ALERT } from "../../../resources/audio/outgoingCallAlert";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatOutgoingCallComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.incomingCall = null;
        this.outgoingCall = null;
        this.callInProgress = null;
        this.callListenerId = "callscreen_" + new Date().getTime();
        this.outgoingCallScreen = false;
        this.errorScreen = false;
        this.errorMessage = "";
        this.actionGenerated = new EventEmitter();
        this.loggedInUser = null;
        this.CALLING = STRING_MESSAGES.CALLING;
        /**
         * Updates the callScreen on basis of call actions
         */
        this.callScreenUpdated = (/**
         * @param {?} key
         * @param {?} call
         * @return {?}
         */
        (key, call) => {
            switch (key) {
                case enums.INCOMING_CALL_CANCELLED:
                    this.incomingCallCancelled(call);
                    break;
                case enums.OUTGOING_CALL_ACCEPTED: //occurs at the caller end
                    this.outgoingCallAccepted(call);
                    break;
                case enums.OUTGOING_CALL_REJECTED: //occurs at the caller end, callee rejects the call
                    this.outgoingCallRejected(call);
                    break;
                default:
                    break;
            }
        });
        /**
         * closes call screen when the incoming call is cancelled by the user
         * @param any call
         */
        this.incomingCallCancelled = (/**
         * @param {?} call
         * @return {?}
         */
        (call) => {
            this.outgoingCallScreen = false;
            this.callInProgress = null;
        });
        /**
         * Starts the call , if the call is accepted by the person , to whom you are calling
         * @param any call
         */
        this.outgoingCallAccepted = (/**
         * @param {?} call
         * @return {?}
         */
        (call) => {
            if (this.outgoingCallScreen) {
                // this.pauseOutgoingAlert();
                this.pauseAudio();
                this.outgoingCallScreen = false;
                this.callInProgress = call;
                this.startCall(call);
            }
        });
        /**
         * closes the call screen , if the person you are calling has rejected the call or the person is busy in some other call
         * @param any call
         */
        this.outgoingCallRejected = (/**
         * @param {?} call
         * @return {?}
         */
        (call) => {
            if (call.hasOwnProperty("status") &&
                call.status === CometChat.CALL_STATUS.BUSY) {
                //show busy message.
                /** @type {?} */
                const errorMessage = `${call.sender.name} is on another call.`;
                this.errorScreen = true;
                this.errorMessage = errorMessage;
            }
            else {
                // this.pauseOutgoingAlert();
                this.pauseAudio();
                this.actionGenerated.emit({
                    type: enums.OUT_GOING_CALL_REJECTED,
                    payLoad: call,
                });
                this.outgoingCallScreen = false;
                this.callInProgress = null;
            }
        });
        /**
         * Marks messages as Read
         * @param any message
         */
        this.markMessageAsRead = (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            /** @type {?} */
            const type = message.receiverType;
            /** @type {?} */
            const id = type === "user" ? message.sender.uid : message.receiverId;
            if (message.hasOwnProperty("readAt") === false) {
                CometChat.markAsRead(message.id, id, type);
            }
        });
        /**
         * Cancels the call , made by the current user
         * @param
         */
        this.cancelCall = (/**
         * @return {?}
         */
        () => {
            this.pauseAudio();
            // this.pauseOutgoingAlert();
            CometChatManager.rejectCall(this.callInProgress.sessionId, CometChat.CALL_STATUS.CANCELLED)
                .then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                this.actionGenerated.emit({
                    type: enums.OUTGOING_CALL_CANCELLED,
                    payLoad: call,
                });
                this.outgoingCallScreen = false;
                this.callInProgress = null;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
                this.outgoingCallScreen = false;
                this.callInProgress = null;
            }));
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change["outgoingCall"]) {
            /** @type {?} */
            let prevProps = { outgoingCall: null };
            /** @type {?} */
            let props = { outgoingCall: null };
            prevProps["outgoingCall"] = change["outgoingCall"].previousValue;
            props["outgoingCall"] = change["outgoingCall"].currentValue;
            if (prevProps.outgoingCall !== props.outgoingCall && props.outgoingCall) {
                // this.playOutgoingAlert();
                this.playAudio();
                /** @type {?} */
                let call = props.outgoingCall;
                this.outgoingCallScreen = true;
                this.callInProgress = call;
                this.errorScreen = false;
                this.errorMessage = "";
            }
        }
        if (change["incomingCall"]) {
            /** @type {?} */
            let prevProps = { incomingCall: null };
            /** @type {?} */
            let props = { incomingCall: null };
            prevProps = Object.assign({}, prevProps, change["incomingCall"].previousValue);
            props = Object.assign({}, props, change["incomingCall"].currentValue);
            if (prevProps.incomingCall !== this.incomingCall && this.incomingCall) {
                this.acceptCall();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setLoggedInUser();
        this.attachListeners();
        this.loadAudio();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListeners();
    }
    /**
     * Listener To Receive Call Actions in Real Time
     * @return {?}
     */
    attachListeners() {
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onOutgoingCallAccepted: (/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                this.callScreenUpdated(enums.OUTGOING_CALL_ACCEPTED, call);
            }),
            onOutgoingCallRejected: (/**
             * @param {?} call
             * @return {?}
             */
            (call) => {
                this.callScreenUpdated(enums.OUTGOING_CALL_REJECTED, call);
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
    /**
     * Removes the call listeners
     * @return {?}
     */
    removeListeners() {
        CometChat.removeCallListener(this.callListenerId);
    }
    /**
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param {?} call
     * @return {?}
     */
    startCall(call) {
        /** @type {?} */
        const el = this.callScreenFrame.nativeElement;
        CometChat.startCall(call.getSessionId(), el, new CometChat.OngoingCallListener({
            onUserJoined: (/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                /* Notification received here if another user joins the call. */
                /* this method can be use to display message or perform any actions if someone joining the call */
                //call initiator gets the same info in outgoingcallaccpeted event
                if (call.callInitiator.uid !== this.loggedInUser.uid &&
                    call.callInitiator.uid !== user.uid) {
                    this.markMessageAsRead(call);
                    /** @type {?} */
                    const callMessage = {
                        category: call.category,
                        type: call.type,
                        action: call.action,
                        status: call.status,
                        callInitiator: call.callInitiator,
                        callReceiver: call.callReceiver,
                        receiverId: call.receiverId,
                        receiverType: call.receiverType,
                        sentAt: call.sentAt,
                        sender: Object.assign({}, user),
                    };
                    this.actionGenerated.emit({
                        type: enums.USER_JOINED_CALL,
                        payLoad: callMessage,
                    });
                }
            }),
            onUserLeft: (/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                /* Notification received here if another user left the call. */
                /* this method can be use to display message or perform any actions if someone leaving the call */
                //call initiator gets the same info in outgoingcallaccpeted event
                if (call.callInitiator.uid !== this.loggedInUser.uid &&
                    call.callInitiator.uid !== user.uid) {
                    this.markMessageAsRead(call);
                    /** @type {?} */
                    const callMessage = {
                        category: call.category,
                        type: call.type,
                        action: "left",
                        status: call.status,
                        callInitiator: call.callInitiator,
                        callReceiver: call.callReceiver,
                        receiverId: call.receiverId,
                        receiverType: call.receiverType,
                        sentAt: call.sentAt,
                        sender: Object.assign({}, user),
                    };
                    this.actionGenerated.emit({
                        type: enums.USER_LEFT_CALL,
                        payLoad: callMessage,
                    });
                }
            }),
            onCallEnded: (/**
             * @param {?} endedCall
             * @return {?}
             */
            (endedCall) => {
                /* Notification received here if current ongoing call is ended. */
                //console.log("call ended:", enums.CALL_ENDED, call);
                // this.setState({ showOutgoingScreen: false, callInProgress: null });
                // this.showOutgoingScreen = false;
                this.outgoingCallScreen = false;
                this.callInProgress = null;
                this.markMessageAsRead(endedCall);
                this.actionGenerated.emit({
                    type: enums.CALL_ENDED_BY_USER,
                    payLoad: endedCall,
                });
                /* hiding/closing the call screen can be done here. */
            }),
        }));
    }
    /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @return {?}
     */
    acceptCall() {
        CometChatManager.acceptCall(this.incomingCall.sessionId)
            .then((/**
         * @param {?} call
         * @return {?}
         */
        (call) => {
            this.actionGenerated.emit({
                type: enums.ACCEPTED_INCOMING_CALL,
                payLoad: call,
            });
            this.outgoingCallScreen = false;
            this.callInProgress = call;
            this.errorScreen = false;
            this.errorMessage = null;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.startCall(call);
            }), 1000);
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("[CallScreen] acceptCall -- error", error);
            this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
        }));
    }
    /**
     * Gets The current loggedIn user information
     * @return {?}
     */
    setLoggedInUser() {
        CometChat.getLoggedinUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.loggedInUser = user;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("failed to get the loggedIn user", error);
        }));
    }
    /**
     * Loads the audio
     * @return {?}
     */
    loadAudio() {
        this.audio = new Audio();
        this.audio.src = OUTGOING_CALL_ALERT;
    }
    /**
     * Plays Audio in loop
     * @return {?}
     */
    playAudio() {
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
    }
    /**
     * Pauses audio
     * @return {?}
     */
    pauseAudio() {
        this.audio.pause();
    }
}
CometchatOutgoingCallComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-outgoing-call",
                template: "<div class=\"callScreenWrapperStyle\" *ngIf=\"callInProgress\" #callScreenFrame>\n  <!-- OUTGOING CALL SCREEN BELOW -->\n  <div class=\"callScreenContainerStyle\" *ngIf=\"outgoingCallScreen\">\n    <div class=\"headerStyle\">\n      <span class=\"headerDurationStyle\"> {{ CALLING }} </span>\n      <h6 class=\"headerNameStyle\">{{ item?.name }}</h6>\n    </div>\n    <div class=\"thumbnailWrapperStyle\">\n      <div class=\"thumbnailStyle\">\n        <cometchat-avatar\n          [item]=\"item\"\n          [enableUserStatus]=\"false\"\n        ></cometchat-avatar>\n      </div>\n    </div>\n    <!-- ERROR SCREEN BELOW -->\n    <div class=\"errorContainerStyle\" *ngIf=\"errorScreen\">\n      <div>{{ errorMessage }}</div>\n    </div>\n    <!-- ERROR SCREEN ABOVE -->\n    <div class=\"headerIconStyle\">\n      <div class=\"iconWrapperStyle\">\n        <div class=\"iconStyle\" (click)=\"cancelCall()\"></div>\n      </div>\n    </div>\n  </div>\n  <!-- OUTGOING CALL SCREEN ABOVE -->\n</div>\n",
                styles: [".callScreenWrapperStyle{opacity:1;width:inherit;height:inherit;position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(20,20,20,.9);z-index:999;color:#fff;text-align:center;box-sizing:border-box;font-family:Inter,sans-serif}.callScreenWrapperStyle *{font-family:Inter,sans-serif;box-sizing:border-box}.callScreenContainerStyle{display:flex;flex-direction:column;height:100%;width:100%}.headerStyle{padding:20px 10px;width:100%;height:20%}.headerDurationStyle{font-size:13px;display:inline-block;padding:5px}.headerNameStyle{margin:0;font-weight:700;text-transform:capitalize;font-size:16px}.thumbnailWrapperStyle{width:100%;height:45%;display:flex;justify-content:center;align-items:center}.thumbnailStyle{width:200px;flex-shrink:0}.headerIconStyle{width:100%;height:30%;padding:10px;display:flex;justify-content:center}.iconWrapperStyle{display:flex}.iconStyle{width:50px;height:50px;border-radius:27px;display:block;margin:auto 10px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAQAAACC9CRNAAAAAmJLR0QA/4ePzL8AAACuSURBVBgZdcG/K0QBAAfwr3SZXDH4dbNRNlmsN5hZJPOVjdk/YLQZpWxKlivbLXQWq1ikbjHZpPCRXtd7vZ7PJ1UW7Tn3YOTTh1f3Tm2ZSRMb+pp9ubCSKssGCjf2rZozqWXBmgNDf35cmk/Btndj3dToGXuzmcSRqm5q9JS+7cZI1Xpq7KgaRF9pqJUas16UTqLjSeFKOw103Cncmk5iybVHhybyD1OOPTvTTn4BBq7mkUyOAckAAAAASUVORK5CYII=) center center no-repeat #ff3b30}.errorContainerStyle{color:#fff;text-align:center;border-radius:2px;padding:13px 10px;font-size:13px;width:100%;height:10%;background-color:#333}"]
            }] }
];
/** @nocollapse */
CometchatOutgoingCallComponent.ctorParameters = () => [];
CometchatOutgoingCallComponent.propDecorators = {
    callScreenFrame: [{ type: ViewChild, args: ["callScreenFrame", null,] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    incomingCall: [{ type: Input }],
    outgoingCall: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.callScreenFrame;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.item;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.type;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.incomingCall;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.outgoingCall;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.callInProgress;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.callListenerId;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.outgoingCallScreen;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.errorScreen;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.errorMessage;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.audio;
    /** @type {?} */
    CometchatOutgoingCallComponent.prototype.CALLING;
    /**
     * Updates the callScreen on basis of call actions
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.callScreenUpdated;
    /**
     * closes call screen when the incoming call is cancelled by the user
     * \@param any call
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.incomingCallCancelled;
    /**
     * Starts the call , if the call is accepted by the person , to whom you are calling
     * \@param any call
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.outgoingCallAccepted;
    /**
     * closes the call screen , if the person you are calling has rejected the call or the person is busy in some other call
     * \@param any call
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.outgoingCallRejected;
    /**
     * Marks messages as Read
     * \@param any message
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.markMessageAsRead;
    /**
     * Cancels the call , made by the current user
     * \@param
     * @type {?}
     */
    CometchatOutgoingCallComponent.prototype.cancelCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU1sRSxNQUFNLE9BQU8sOEJBQThCO0lBc0J6QztRQWxCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTdCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEQsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRWhCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsaUJB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QUksSUFBSSxTQUFTLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUN6QixPQUFPOzs7WUFDUDtnQkFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsQ0FBQyxHQUNELEtBQUssQ0FDTixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7O1lBcFhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxtL0JBQXVEOzthQUV4RDs7Ozs7OEJBR0UsU0FBUyxTQUFDLGlCQUFpQixFQUFFLElBQUk7bUJBRWpDLEtBQUs7bUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBUUwsTUFBTTs7OztJQWJQLHlEQUFnRTs7SUFFaEUsOENBQXFCOztJQUNyQiw4Q0FBcUI7O0lBQ3JCLHNEQUE2Qjs7SUFDN0Isc0RBQTZCOztJQUU3Qix3REFBc0I7O0lBQ3RCLHdEQUFzRDs7SUFDdEQsNERBQW9DOztJQUNwQyxxREFBNkI7O0lBQzdCLHNEQUEwQjs7SUFFMUIseURBQWtFOztJQUVsRSxzREFBb0I7O0lBQ3BCLCtDQUFNOztJQUVOLGlEQUEwQzs7Ozs7SUErRTFDLDJEQWNFOzs7Ozs7SUFNRiwrREFHRTs7Ozs7O0lBTUYsOERBU0U7Ozs7OztJQU1GLDhEQW1CRTs7Ozs7O0lBa0dGLDJEQU9FOzs7Ozs7SUFnQ0Ysb0RBb0JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgT1VUR09JTkdfQ0FMTF9BTEVSVCB9IGZyb20gXCIuLi8uLi8uLi9yZXNvdXJjZXMvYXVkaW8vb3V0Z29pbmdDYWxsQWxlcnRcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW91dGdvaW5nLWNhbGxcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtb3V0Z29pbmctY2FsbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0T3V0Z29pbmdDYWxsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoXCJjYWxsU2NyZWVuRnJhbWVcIiwgbnVsbCkgY2FsbFNjcmVlbkZyYW1lOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgaW5jb21pbmdDYWxsID0gbnVsbDtcbiAgQElucHV0KCkgb3V0Z29pbmdDYWxsID0gbnVsbDtcblxuICBjYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gIGNhbGxMaXN0ZW5lcklkID0gXCJjYWxsc2NyZWVuX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIG91dGdvaW5nQ2FsbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBlcnJvclNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBlcnJvck1lc3NhZ2U6IFN0cmluZyA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgYXVkaW87XG5cbiAgQ0FMTElORzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkNBTExJTkc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJvdXRnb2luZ0NhbGxcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IG91dGdvaW5nQ2FsbDogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBvdXRnb2luZ0NhbGw6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzW1wib3V0Z29pbmdDYWxsXCJdID0gY2hhbmdlW1wib3V0Z29pbmdDYWxsXCJdLnByZXZpb3VzVmFsdWU7XG4gICAgICBwcm9wc1tcIm91dGdvaW5nQ2FsbFwiXSA9IGNoYW5nZVtcIm91dGdvaW5nQ2FsbFwiXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmIChwcmV2UHJvcHMub3V0Z29pbmdDYWxsICE9PSBwcm9wcy5vdXRnb2luZ0NhbGwgJiYgcHJvcHMub3V0Z29pbmdDYWxsKSB7XG4gICAgICAgIC8vIHRoaXMucGxheU91dGdvaW5nQWxlcnQoKTtcbiAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcblxuICAgICAgICBsZXQgY2FsbCA9IHByb3BzLm91dGdvaW5nQ2FsbDtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcbiAgICAgICAgdGhpcy5lcnJvclNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZVtcImluY29taW5nQ2FsbFwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgaW5jb21pbmdDYWxsOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IGluY29taW5nQ2FsbDogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHMgPSB7IC4uLnByZXZQcm9wcywgLi4uY2hhbmdlW1wiaW5jb21pbmdDYWxsXCJdLnByZXZpb3VzVmFsdWUgfTtcbiAgICAgIHByb3BzID0geyAuLi5wcm9wcywgLi4uY2hhbmdlW1wiaW5jb21pbmdDYWxsXCJdLmN1cnJlbnRWYWx1ZSB9O1xuXG4gICAgICBpZiAocHJldlByb3BzLmluY29taW5nQ2FsbCAhPT0gdGhpcy5pbmNvbWluZ0NhbGwgJiYgdGhpcy5pbmNvbWluZ0NhbGwpIHtcbiAgICAgICAgdGhpcy5hY2NlcHRDYWxsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRMb2dnZWRJblVzZXIoKTtcblxuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5sb2FkQXVkaW8oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgVG8gUmVjZWl2ZSBDYWxsIEFjdGlvbnMgaW4gUmVhbCBUaW1lXG4gICAqIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xuICAgKi9cbiAgYXR0YWNoTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICB0aGlzLmNhbGxMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5DYWxsTGlzdGVuZXIoe1xuICAgICAgICBvbk91dGdvaW5nQ2FsbEFjY2VwdGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsbFNjcmVlblVwZGF0ZWQoZW51bXMuT1VUR09JTkdfQ0FMTF9BQ0NFUFRFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3V0Z29pbmdDYWxsUmVqZWN0ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxsU2NyZWVuVXBkYXRlZChlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JbmNvbWluZ0NhbGxDYW5jZWxsZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxsU2NyZWVuVXBkYXRlZChlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2FsbCBsaXN0ZW5lcnNcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQucmVtb3ZlQ2FsbExpc3RlbmVyKHRoaXMuY2FsbExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNhbGxTY3JlZW4gb24gYmFzaXMgb2YgY2FsbCBhY3Rpb25zXG4gICAqL1xuICBjYWxsU2NyZWVuVXBkYXRlZCA9IChrZXksIGNhbGwpID0+IHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBlbnVtcy5JTkNPTUlOR19DQUxMX0NBTkNFTExFRDpcbiAgICAgICAgdGhpcy5pbmNvbWluZ0NhbGxDYW5jZWxsZWQoY2FsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX0FDQ0VQVEVEOiAvL29jY3VycyBhdCB0aGUgY2FsbGVyIGVuZFxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbEFjY2VwdGVkKGNhbGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRDogLy9vY2N1cnMgYXQgdGhlIGNhbGxlciBlbmQsIGNhbGxlZSByZWplY3RzIHRoZSBjYWxsXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsUmVqZWN0ZWQoY2FsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBjbG9zZXMgY2FsbCBzY3JlZW4gd2hlbiB0aGUgaW5jb21pbmcgY2FsbCBpcyBjYW5jZWxsZWQgYnkgdGhlIHVzZXJcbiAgICogQHBhcmFtIGFueSBjYWxsXG4gICAqL1xuICBpbmNvbWluZ0NhbGxDYW5jZWxsZWQgPSAoY2FsbCkgPT4ge1xuICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgY2FsbCAsIGlmIHRoZSBjYWxsIGlzIGFjY2VwdGVkIGJ5IHRoZSBwZXJzb24gLCB0byB3aG9tIHlvdSBhcmUgY2FsbGluZ1xuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIG91dGdvaW5nQ2FsbEFjY2VwdGVkID0gKGNhbGwpID0+IHtcbiAgICBpZiAodGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4pIHtcbiAgICAgIC8vIHRoaXMucGF1c2VPdXRnb2luZ0FsZXJ0KCk7XG4gICAgICB0aGlzLnBhdXNlQXVkaW8oKTtcbiAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcblxuICAgICAgdGhpcy5zdGFydENhbGwoY2FsbCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBjbG9zZXMgdGhlIGNhbGwgc2NyZWVuICwgaWYgdGhlIHBlcnNvbiB5b3UgYXJlIGNhbGxpbmcgaGFzIHJlamVjdGVkIHRoZSBjYWxsIG9yIHRoZSBwZXJzb24gaXMgYnVzeSBpbiBzb21lIG90aGVyIGNhbGxcbiAgICogQHBhcmFtIGFueSBjYWxsXG4gICAqL1xuICBvdXRnb2luZ0NhbGxSZWplY3RlZCA9IChjYWxsKSA9PiB7XG4gICAgaWYgKFxuICAgICAgY2FsbC5oYXNPd25Qcm9wZXJ0eShcInN0YXR1c1wiKSAmJlxuICAgICAgY2FsbC5zdGF0dXMgPT09IENvbWV0Q2hhdC5DQUxMX1NUQVRVUy5CVVNZXG4gICAgKSB7XG4gICAgICAvL3Nob3cgYnVzeSBtZXNzYWdlLlxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7Y2FsbC5zZW5kZXIubmFtZX0gaXMgb24gYW5vdGhlciBjYWxsLmA7XG4gICAgICB0aGlzLmVycm9yU2NyZWVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLnBhdXNlT3V0Z29pbmdBbGVydCgpO1xuICAgICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuT1VUX0dPSU5HX0NBTExfUkVKRUNURUQsXG4gICAgICAgIHBheUxvYWQ6IGNhbGwsXG4gICAgICB9KTtcbiAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgY2FsbCAsIGlmIHRoZSBvdXRnb2luZyBjYWxsIGlzIGFjY2VwdGVkIGJ5IHRoZSBwZXJzb24gLCB0aGF0IHlvdSBhcmUgY2FsbGluZ1xuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIHN0YXJ0Q2FsbChjYWxsKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmNhbGxTY3JlZW5GcmFtZS5uYXRpdmVFbGVtZW50O1xuXG4gICAgQ29tZXRDaGF0LnN0YXJ0Q2FsbChcbiAgICAgIGNhbGwuZ2V0U2Vzc2lvbklkKCksXG4gICAgICBlbCxcbiAgICAgIG5ldyBDb21ldENoYXQuT25nb2luZ0NhbGxMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlckpvaW5lZDogKHVzZXIpID0+IHtcbiAgICAgICAgICAvKiBOb3RpZmljYXRpb24gcmVjZWl2ZWQgaGVyZSBpZiBhbm90aGVyIHVzZXIgam9pbnMgdGhlIGNhbGwuICovXG4gICAgICAgICAgLyogdGhpcyBtZXRob2QgY2FuIGJlIHVzZSB0byBkaXNwbGF5IG1lc3NhZ2Ugb3IgcGVyZm9ybSBhbnkgYWN0aW9ucyBpZiBzb21lb25lIGpvaW5pbmcgdGhlIGNhbGwgKi9cblxuICAgICAgICAgIC8vY2FsbCBpbml0aWF0b3IgZ2V0cyB0aGUgc2FtZSBpbmZvIGluIG91dGdvaW5nY2FsbGFjY3BldGVkIGV2ZW50XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbC5jYWxsSW5pdGlhdG9yLnVpZCAhPT0gdGhpcy5sb2dnZWRJblVzZXIudWlkICYmXG4gICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB1c2VyLnVpZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5tYXJrTWVzc2FnZUFzUmVhZChjYWxsKTtcblxuICAgICAgICAgICAgY29uc3QgY2FsbE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5OiBjYWxsLmNhdGVnb3J5LFxuICAgICAgICAgICAgICB0eXBlOiBjYWxsLnR5cGUsXG4gICAgICAgICAgICAgIGFjdGlvbjogY2FsbC5hY3Rpb24sXG4gICAgICAgICAgICAgIHN0YXR1czogY2FsbC5zdGF0dXMsXG4gICAgICAgICAgICAgIGNhbGxJbml0aWF0b3I6IGNhbGwuY2FsbEluaXRpYXRvcixcbiAgICAgICAgICAgICAgY2FsbFJlY2VpdmVyOiBjYWxsLmNhbGxSZWNlaXZlcixcbiAgICAgICAgICAgICAgcmVjZWl2ZXJJZDogY2FsbC5yZWNlaXZlcklkLFxuICAgICAgICAgICAgICByZWNlaXZlclR5cGU6IGNhbGwucmVjZWl2ZXJUeXBlLFxuICAgICAgICAgICAgICBzZW50QXQ6IGNhbGwuc2VudEF0LFxuICAgICAgICAgICAgICBzZW5kZXI6IHsgLi4udXNlciB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5VU0VSX0pPSU5FRF9DQUxMLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBjYWxsTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25Vc2VyTGVmdDogKHVzZXIpID0+IHtcbiAgICAgICAgICAvKiBOb3RpZmljYXRpb24gcmVjZWl2ZWQgaGVyZSBpZiBhbm90aGVyIHVzZXIgbGVmdCB0aGUgY2FsbC4gKi9cblxuICAgICAgICAgIC8qIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2UgdG8gZGlzcGxheSBtZXNzYWdlIG9yIHBlcmZvcm0gYW55IGFjdGlvbnMgaWYgc29tZW9uZSBsZWF2aW5nIHRoZSBjYWxsICovXG5cbiAgICAgICAgICAvL2NhbGwgaW5pdGlhdG9yIGdldHMgdGhlIHNhbWUgaW5mbyBpbiBvdXRnb2luZ2NhbGxhY2NwZXRlZCBldmVudFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGwuY2FsbEluaXRpYXRvci51aWQgIT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCAmJlxuICAgICAgICAgICAgY2FsbC5jYWxsSW5pdGlhdG9yLnVpZCAhPT0gdXNlci51aWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubWFya01lc3NhZ2VBc1JlYWQoY2FsbCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxNZXNzYWdlID0ge1xuICAgICAgICAgICAgICBjYXRlZ29yeTogY2FsbC5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgdHlwZTogY2FsbC50eXBlLFxuICAgICAgICAgICAgICBhY3Rpb246IFwibGVmdFwiLFxuICAgICAgICAgICAgICBzdGF0dXM6IGNhbGwuc3RhdHVzLFxuICAgICAgICAgICAgICBjYWxsSW5pdGlhdG9yOiBjYWxsLmNhbGxJbml0aWF0b3IsXG4gICAgICAgICAgICAgIGNhbGxSZWNlaXZlcjogY2FsbC5jYWxsUmVjZWl2ZXIsXG4gICAgICAgICAgICAgIHJlY2VpdmVySWQ6IGNhbGwucmVjZWl2ZXJJZCxcbiAgICAgICAgICAgICAgcmVjZWl2ZXJUeXBlOiBjYWxsLnJlY2VpdmVyVHlwZSxcbiAgICAgICAgICAgICAgc2VudEF0OiBjYWxsLnNlbnRBdCxcbiAgICAgICAgICAgICAgc2VuZGVyOiB7IC4uLnVzZXIgfSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5VU0VSX0xFRlRfQ0FMTCxcbiAgICAgICAgICAgICAgcGF5TG9hZDogY2FsbE1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2FsbEVuZGVkOiAoZW5kZWRDYWxsKSA9PiB7XG4gICAgICAgICAgLyogTm90aWZpY2F0aW9uIHJlY2VpdmVkIGhlcmUgaWYgY3VycmVudCBvbmdvaW5nIGNhbGwgaXMgZW5kZWQuICovXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbGwgZW5kZWQ6XCIsIGVudW1zLkNBTExfRU5ERUQsIGNhbGwpO1xuXG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IHNob3dPdXRnb2luZ1NjcmVlbjogZmFsc2UsIGNhbGxJblByb2dyZXNzOiBudWxsIH0pO1xuXG4gICAgICAgICAgLy8gdGhpcy5zaG93T3V0Z29pbmdTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuXG4gICAgICAgICAgdGhpcy5tYXJrTWVzc2FnZUFzUmVhZChlbmRlZENhbGwpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuQ0FMTF9FTkRFRF9CWV9VU0VSLFxuICAgICAgICAgICAgcGF5TG9hZDogZW5kZWRDYWxsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8qIGhpZGluZy9jbG9zaW5nIHRoZSBjYWxsIHNjcmVlbiBjYW4gYmUgZG9uZSBoZXJlLiAqL1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIG1lc3NhZ2VzIGFzIFJlYWRcbiAgICogQHBhcmFtIGFueSBtZXNzYWdlXG4gICAqL1xuICBtYXJrTWVzc2FnZUFzUmVhZCA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IG1lc3NhZ2UucmVjZWl2ZXJUeXBlO1xuICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gXCJ1c2VyXCIgPyBtZXNzYWdlLnNlbmRlci51aWQgOiBtZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICBpZiAobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJlYWRBdFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIENvbWV0Q2hhdC5tYXJrQXNSZWFkKG1lc3NhZ2UuaWQsIGlkLCB0eXBlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdGhlIGluY29taW5nIGNhbGwgLCBpZiBjYWxsIGlzIGFjY3BldGVkIGJ5IHRoZSBjdXJyZW50IHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBhY2NlcHRDYWxsKCkge1xuICAgIENvbWV0Q2hhdE1hbmFnZXIuYWNjZXB0Q2FsbCh0aGlzLmluY29taW5nQ2FsbC5zZXNzaW9uSWQpXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5BQ0NFUFRFRF9JTkNPTUlOR19DQUxMLFxuICAgICAgICAgIHBheUxvYWQ6IGNhbGwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBjYWxsO1xuICAgICAgICB0aGlzLmVycm9yU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydENhbGwoY2FsbCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbQ2FsbFNjcmVlbl0gYWNjZXB0Q2FsbCAtLSBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoeyB0eXBlOiBlbnVtcy5DQUxMX0VSUk9SLCBwYXlMb2FkOiBlcnJvciB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgdGhlIGNhbGwgLCBtYWRlIGJ5IHRoZSBjdXJyZW50IHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBjYW5jZWxDYWxsID0gKCkgPT4ge1xuICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgIC8vIHRoaXMucGF1c2VPdXRnb2luZ0FsZXJ0KCk7XG4gICAgQ29tZXRDaGF0TWFuYWdlci5yZWplY3RDYWxsKFxuICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcy5zZXNzaW9uSWQsXG4gICAgICBDb21ldENoYXQuQ0FMTF9TVEFUVVMuQ0FOQ0VMTEVEXG4gICAgKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQsXG4gICAgICAgICAgcGF5TG9hZDogY2FsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNBTExfRVJST1IsIHBheUxvYWQ6IGVycm9yIH0pO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIFRoZSBjdXJyZW50IGxvZ2dlZEluIHVzZXIgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRMb2dnZWRJblVzZXIoKSB7XG4gICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBnZXQgdGhlIGxvZ2dlZEluIHVzZXJcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBhdWRpb1xuICAgKi9cbiAgbG9hZEF1ZGlvKCkge1xuICAgIHRoaXMuYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgICB0aGlzLmF1ZGlvLnNyYyA9IE9VVEdPSU5HX0NBTExfQUxFUlQ7XG4gIH1cblxuICAvKipcbiAgICogUGxheXMgQXVkaW8gaW4gbG9vcFxuICAgKi9cbiAgcGxheUF1ZGlvKCkge1xuICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgIGlmICh0eXBlb2YgdGhpcy5hdWRpby5sb29wID09IFwiYm9vbGVhblwiKSB7XG4gICAgICB0aGlzLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiZW5kZWRcIixcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIGF1ZGlvXG4gICAqL1xuICBwYXVzZUF1ZGlvKCkge1xuICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgfVxufVxuIl19