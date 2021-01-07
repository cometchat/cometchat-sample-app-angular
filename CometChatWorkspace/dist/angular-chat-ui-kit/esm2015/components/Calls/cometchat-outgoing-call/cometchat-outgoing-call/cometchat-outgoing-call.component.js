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
                // this.setState({ outgoingCallScreen: false, callInProgress: null });
                this.outgoingCallScreen = false;
                this.callInProgress = null;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
                // this.setState({ outgoingCallScreen: false, callInProgress: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU1sRSxNQUFNLE9BQU8sOEJBQThCO0lBc0J6QztRQWxCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTdCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEQsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRWhCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsaUJB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LE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FDekIsT0FBTzs7O1lBQ1A7Z0JBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLENBQUMsR0FDRCxLQUFLLENBQ04sQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUtELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQXZYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsbS9CQUF1RDs7YUFFeEQ7Ozs7OzhCQUdFLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxJQUFJO21CQUVqQyxLQUFLO21CQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQVFMLE1BQU07Ozs7SUFiUCx5REFBZ0U7O0lBRWhFLDhDQUFxQjs7SUFDckIsOENBQXFCOztJQUNyQixzREFBNkI7O0lBQzdCLHNEQUE2Qjs7SUFFN0Isd0RBQXNCOztJQUN0Qix3REFBc0Q7O0lBQ3RELDREQUFvQzs7SUFDcEMscURBQTZCOztJQUM3QixzREFBMEI7O0lBRTFCLHlEQUFrRTs7SUFFbEUsc0RBQW9COztJQUNwQiwrQ0FBTTs7SUFFTixpREFBMEM7Ozs7O0lBK0UxQywyREFjRTs7Ozs7O0lBTUYsK0RBR0U7Ozs7OztJQU1GLDhEQVNFOzs7Ozs7SUFNRiw4REFtQkU7Ozs7OztJQWtHRiwyREFPRTs7Ozs7O0lBZ0NGLG9EQXVCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE9VVEdPSU5HX0NBTExfQUxFUlQgfSBmcm9tIFwiLi4vLi4vLi4vcmVzb3VyY2VzL2F1ZGlvL291dGdvaW5nQ2FsbEFsZXJ0XCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1vdXRnb2luZy1jYWxsXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1vdXRnb2luZy1jYWxsLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdE91dGdvaW5nQ2FsbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKFwiY2FsbFNjcmVlbkZyYW1lXCIsIG51bGwpIGNhbGxTY3JlZW5GcmFtZTogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG91dGdvaW5nQ2FsbCA9IG51bGw7XG5cbiAgY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICBjYWxsTGlzdGVuZXJJZCA9IFwiY2FsbHNjcmVlbl9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBvdXRnb2luZ0NhbGxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXJyb3JTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcgPSBcIlwiO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGF1ZGlvO1xuXG4gIENBTExJTkc6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5DQUxMSU5HO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlW1wib3V0Z29pbmdDYWxsXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBvdXRnb2luZ0NhbGw6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgb3V0Z29pbmdDYWxsOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wc1tcIm91dGdvaW5nQ2FsbFwiXSA9IGNoYW5nZVtcIm91dGdvaW5nQ2FsbFwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgcHJvcHNbXCJvdXRnb2luZ0NhbGxcIl0gPSBjaGFuZ2VbXCJvdXRnb2luZ0NhbGxcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICBpZiAocHJldlByb3BzLm91dGdvaW5nQ2FsbCAhPT0gcHJvcHMub3V0Z29pbmdDYWxsICYmIHByb3BzLm91dGdvaW5nQ2FsbCkge1xuICAgICAgICAvLyB0aGlzLnBsYXlPdXRnb2luZ0FsZXJ0KCk7XG4gICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG5cbiAgICAgICAgbGV0IGNhbGwgPSBwcm9wcy5vdXRnb2luZ0NhbGw7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IGNhbGw7XG4gICAgICAgIHRoaXMuZXJyb3JTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VbXCJpbmNvbWluZ0NhbGxcIl0pIHtcbiAgICAgIGxldCBwcmV2UHJvcHMgPSB7IGluY29taW5nQ2FsbDogbnVsbCB9O1xuICAgICAgbGV0IHByb3BzID0geyBpbmNvbWluZ0NhbGw6IG51bGwgfTtcblxuICAgICAgcHJldlByb3BzID0geyAuLi5wcmV2UHJvcHMsIC4uLmNoYW5nZVtcImluY29taW5nQ2FsbFwiXS5wcmV2aW91c1ZhbHVlIH07XG4gICAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIC4uLmNoYW5nZVtcImluY29taW5nQ2FsbFwiXS5jdXJyZW50VmFsdWUgfTtcblxuICAgICAgaWYgKHByZXZQcm9wcy5pbmNvbWluZ0NhbGwgIT09IHRoaXMuaW5jb21pbmdDYWxsICYmIHRoaXMuaW5jb21pbmdDYWxsKSB7XG4gICAgICAgIHRoaXMuYWNjZXB0Q2FsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0TG9nZ2VkSW5Vc2VyKCk7XG5cbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIHRoaXMubG9hZEF1ZGlvKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIFRvIFJlY2VpdmUgQ2FsbCBBY3Rpb25zIGluIFJlYWwgVGltZVxuICAgKiBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2tcbiAgICovXG4gIGF0dGFjaExpc3RlbmVycygpIHtcbiAgICBDb21ldENoYXQuYWRkQ2FsbExpc3RlbmVyKFxuICAgICAgdGhpcy5jYWxsTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgb25PdXRnb2luZ0NhbGxBY2NlcHRlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLk9VVEdPSU5HX0NBTExfQUNDRVBURUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbk91dGdvaW5nQ2FsbFJlamVjdGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsbFNjcmVlblVwZGF0ZWQoZW51bXMuT1VUR09JTkdfQ0FMTF9SRUpFQ1RFRCwgY2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5jb21pbmdDYWxsQ2FuY2VsbGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsbFNjcmVlblVwZGF0ZWQoZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNhbGwgbGlzdGVuZXJzXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjYWxsU2NyZWVuIG9uIGJhc2lzIG9mIGNhbGwgYWN0aW9uc1xuICAgKi9cbiAgY2FsbFNjcmVlblVwZGF0ZWQgPSAoa2V5LCBjYWxsKSA9PiB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgZW51bXMuSU5DT01JTkdfQ0FMTF9DQU5DRUxMRUQ6XG4gICAgICAgIHRoaXMuaW5jb21pbmdDYWxsQ2FuY2VsbGVkKGNhbGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuT1VUR09JTkdfQ0FMTF9BQ0NFUFRFRDogLy9vY2N1cnMgYXQgdGhlIGNhbGxlciBlbmRcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxBY2NlcHRlZChjYWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQ6IC8vb2NjdXJzIGF0IHRoZSBjYWxsZXIgZW5kLCBjYWxsZWUgcmVqZWN0cyB0aGUgY2FsbFxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFJlamVjdGVkKGNhbGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogY2xvc2VzIGNhbGwgc2NyZWVuIHdoZW4gdGhlIGluY29taW5nIGNhbGwgaXMgY2FuY2VsbGVkIGJ5IHRoZSB1c2VyXG4gICAqIEBwYXJhbSBhbnkgY2FsbFxuICAgKi9cbiAgaW5jb21pbmdDYWxsQ2FuY2VsbGVkID0gKGNhbGwpID0+IHtcbiAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGNhbGwgLCBpZiB0aGUgY2FsbCBpcyBhY2NlcHRlZCBieSB0aGUgcGVyc29uICwgdG8gd2hvbSB5b3UgYXJlIGNhbGxpbmdcbiAgICogQHBhcmFtIGFueSBjYWxsXG4gICAqL1xuICBvdXRnb2luZ0NhbGxBY2NlcHRlZCA9IChjYWxsKSA9PiB7XG4gICAgaWYgKHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuKSB7XG4gICAgICAvLyB0aGlzLnBhdXNlT3V0Z29pbmdBbGVydCgpO1xuICAgICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG4gICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IGNhbGw7XG5cbiAgICAgIHRoaXMuc3RhcnRDYWxsKGNhbGwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogY2xvc2VzIHRoZSBjYWxsIHNjcmVlbiAsIGlmIHRoZSBwZXJzb24geW91IGFyZSBjYWxsaW5nIGhhcyByZWplY3RlZCB0aGUgY2FsbCBvciB0aGUgcGVyc29uIGlzIGJ1c3kgaW4gc29tZSBvdGhlciBjYWxsXG4gICAqIEBwYXJhbSBhbnkgY2FsbFxuICAgKi9cbiAgb3V0Z29pbmdDYWxsUmVqZWN0ZWQgPSAoY2FsbCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGNhbGwuaGFzT3duUHJvcGVydHkoXCJzdGF0dXNcIikgJiZcbiAgICAgIGNhbGwuc3RhdHVzID09PSBDb21ldENoYXQuQ0FMTF9TVEFUVVMuQlVTWVxuICAgICkge1xuICAgICAgLy9zaG93IGJ1c3kgbWVzc2FnZS5cbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke2NhbGwuc2VuZGVyLm5hbWV9IGlzIG9uIGFub3RoZXIgY2FsbC5gO1xuICAgICAgdGhpcy5lcnJvclNjcmVlbiA9IHRydWU7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5wYXVzZU91dGdvaW5nQWxlcnQoKTtcbiAgICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgIHR5cGU6IGVudW1zLk9VVF9HT0lOR19DQUxMX1JFSkVDVEVELFxuICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgfSk7XG4gICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGNhbGwgLCBpZiB0aGUgb3V0Z29pbmcgY2FsbCBpcyBhY2NlcHRlZCBieSB0aGUgcGVyc29uICwgdGhhdCB5b3UgYXJlIGNhbGxpbmdcbiAgICogQHBhcmFtIGFueSBjYWxsXG4gICAqL1xuICBzdGFydENhbGwoY2FsbCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5jYWxsU2NyZWVuRnJhbWUubmF0aXZlRWxlbWVudDtcblxuICAgIENvbWV0Q2hhdC5zdGFydENhbGwoXG4gICAgICBjYWxsLmdldFNlc3Npb25JZCgpLFxuICAgICAgZWwsXG4gICAgICBuZXcgQ29tZXRDaGF0Lk9uZ29pbmdDYWxsTGlzdGVuZXIoe1xuICAgICAgICBvblVzZXJKb2luZWQ6ICh1c2VyKSA9PiB7XG4gICAgICAgICAgLyogTm90aWZpY2F0aW9uIHJlY2VpdmVkIGhlcmUgaWYgYW5vdGhlciB1c2VyIGpvaW5zIHRoZSBjYWxsLiAqL1xuICAgICAgICAgIC8qIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2UgdG8gZGlzcGxheSBtZXNzYWdlIG9yIHBlcmZvcm0gYW55IGFjdGlvbnMgaWYgc29tZW9uZSBqb2luaW5nIHRoZSBjYWxsICovXG5cbiAgICAgICAgICAvL2NhbGwgaW5pdGlhdG9yIGdldHMgdGhlIHNhbWUgaW5mbyBpbiBvdXRnb2luZ2NhbGxhY2NwZXRlZCBldmVudFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGwuY2FsbEluaXRpYXRvci51aWQgIT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCAmJlxuICAgICAgICAgICAgY2FsbC5jYWxsSW5pdGlhdG9yLnVpZCAhPT0gdXNlci51aWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubWFya01lc3NhZ2VBc1JlYWQoY2FsbCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxNZXNzYWdlID0ge1xuICAgICAgICAgICAgICBjYXRlZ29yeTogY2FsbC5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgdHlwZTogY2FsbC50eXBlLFxuICAgICAgICAgICAgICBhY3Rpb246IGNhbGwuYWN0aW9uLFxuICAgICAgICAgICAgICBzdGF0dXM6IGNhbGwuc3RhdHVzLFxuICAgICAgICAgICAgICBjYWxsSW5pdGlhdG9yOiBjYWxsLmNhbGxJbml0aWF0b3IsXG4gICAgICAgICAgICAgIGNhbGxSZWNlaXZlcjogY2FsbC5jYWxsUmVjZWl2ZXIsXG4gICAgICAgICAgICAgIHJlY2VpdmVySWQ6IGNhbGwucmVjZWl2ZXJJZCxcbiAgICAgICAgICAgICAgcmVjZWl2ZXJUeXBlOiBjYWxsLnJlY2VpdmVyVHlwZSxcbiAgICAgICAgICAgICAgc2VudEF0OiBjYWxsLnNlbnRBdCxcbiAgICAgICAgICAgICAgc2VuZGVyOiB7IC4uLnVzZXIgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuVVNFUl9KT0lORURfQ0FMTCxcbiAgICAgICAgICAgICAgcGF5TG9hZDogY2FsbE1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlckxlZnQ6ICh1c2VyKSA9PiB7XG4gICAgICAgICAgLyogTm90aWZpY2F0aW9uIHJlY2VpdmVkIGhlcmUgaWYgYW5vdGhlciB1c2VyIGxlZnQgdGhlIGNhbGwuICovXG5cbiAgICAgICAgICAvKiB0aGlzIG1ldGhvZCBjYW4gYmUgdXNlIHRvIGRpc3BsYXkgbWVzc2FnZSBvciBwZXJmb3JtIGFueSBhY3Rpb25zIGlmIHNvbWVvbmUgbGVhdmluZyB0aGUgY2FsbCAqL1xuXG4gICAgICAgICAgLy9jYWxsIGluaXRpYXRvciBnZXRzIHRoZSBzYW1lIGluZm8gaW4gb3V0Z29pbmdjYWxsYWNjcGV0ZWQgZXZlbnRcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB0aGlzLmxvZ2dlZEluVXNlci51aWQgJiZcbiAgICAgICAgICAgIGNhbGwuY2FsbEluaXRpYXRvci51aWQgIT09IHVzZXIudWlkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlQXNSZWFkKGNhbGwpO1xuXG4gICAgICAgICAgICBjb25zdCBjYWxsTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IGNhbGwuY2F0ZWdvcnksXG4gICAgICAgICAgICAgIHR5cGU6IGNhbGwudHlwZSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgc3RhdHVzOiBjYWxsLnN0YXR1cyxcbiAgICAgICAgICAgICAgY2FsbEluaXRpYXRvcjogY2FsbC5jYWxsSW5pdGlhdG9yLFxuICAgICAgICAgICAgICBjYWxsUmVjZWl2ZXI6IGNhbGwuY2FsbFJlY2VpdmVyLFxuICAgICAgICAgICAgICByZWNlaXZlcklkOiBjYWxsLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgIHJlY2VpdmVyVHlwZTogY2FsbC5yZWNlaXZlclR5cGUsXG4gICAgICAgICAgICAgIHNlbnRBdDogY2FsbC5zZW50QXQsXG4gICAgICAgICAgICAgIHNlbmRlcjogeyAuLi51c2VyIH0sXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuVVNFUl9MRUZUX0NBTEwsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IGNhbGxNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNhbGxFbmRlZDogKGVuZGVkQ2FsbCkgPT4ge1xuICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGN1cnJlbnQgb25nb2luZyBjYWxsIGlzIGVuZGVkLiAqL1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsIGVuZGVkOlwiLCBlbnVtcy5DQUxMX0VOREVELCBjYWxsKTtcblxuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBzaG93T3V0Z29pbmdTY3JlZW46IGZhbHNlLCBjYWxsSW5Qcm9ncmVzczogbnVsbCB9KTtcblxuICAgICAgICAgIC8vIHRoaXMuc2hvd091dGdvaW5nU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gbnVsbDtcblxuICAgICAgICAgIHRoaXMubWFya01lc3NhZ2VBc1JlYWQoZW5kZWRDYWxsKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkNBTExfRU5ERURfQllfVVNFUixcbiAgICAgICAgICAgIHBheUxvYWQ6IGVuZGVkQ2FsbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvKiBoaWRpbmcvY2xvc2luZyB0aGUgY2FsbCBzY3JlZW4gY2FuIGJlIGRvbmUgaGVyZS4gKi9cbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyBtZXNzYWdlcyBhcyBSZWFkXG4gICAqIEBwYXJhbSBhbnkgbWVzc2FnZVxuICAgKi9cbiAgbWFya01lc3NhZ2VBc1JlYWQgPSAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSBtZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09IFwidXNlclwiID8gbWVzc2FnZS5zZW5kZXIudWlkIDogbWVzc2FnZS5yZWNlaXZlcklkO1xuXG4gICAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyZWFkQXRcIikgPT09IGZhbHNlKSB7XG4gICAgICBDb21ldENoYXQubWFya0FzUmVhZChtZXNzYWdlLmlkLCBpZCwgdHlwZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHRoZSBpbmNvbWluZyBjYWxsICwgaWYgY2FsbCBpcyBhY2NwZXRlZCBieSB0aGUgY3VycmVudCB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWNjZXB0Q2FsbCgpIHtcbiAgICBDb21ldENoYXRNYW5hZ2VyLmFjY2VwdENhbGwodGhpcy5pbmNvbWluZ0NhbGwuc2Vzc2lvbklkKVxuICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuQUNDRVBURURfSU5DT01JTkdfQ0FMTCxcbiAgICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcbiAgICAgICAgdGhpcy5lcnJvclNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnRDYWxsKGNhbGwpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0NhbGxTY3JlZW5dIGFjY2VwdENhbGwgLS0gZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQ0FMTF9FUlJPUiwgcGF5TG9hZDogZXJyb3IgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIHRoZSBjYWxsICwgbWFkZSBieSB0aGUgY3VycmVudCB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2FuY2VsQ2FsbCA9ICgpID0+IHtcbiAgICB0aGlzLnBhdXNlQXVkaW8oKTtcbiAgICAvLyB0aGlzLnBhdXNlT3V0Z29pbmdBbGVydCgpO1xuICAgIENvbWV0Q2hhdE1hbmFnZXIucmVqZWN0Q2FsbChcbiAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3Muc2Vzc2lvbklkLFxuICAgICAgQ29tZXRDaGF0LkNBTExfU1RBVFVTLkNBTkNFTExFRFxuICAgIClcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLk9VVEdPSU5HX0NBTExfQ0FOQ0VMTEVELFxuICAgICAgICAgIHBheUxvYWQ6IGNhbGwsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgb3V0Z29pbmdDYWxsU2NyZWVuOiBmYWxzZSwgY2FsbEluUHJvZ3Jlc3M6IG51bGwgfSk7XG5cbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQ0FMTF9FUlJPUiwgcGF5TG9hZDogZXJyb3IgfSk7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBvdXRnb2luZ0NhbGxTY3JlZW46IGZhbHNlLCBjYWxsSW5Qcm9ncmVzczogbnVsbCB9KTtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBUaGUgY3VycmVudCBsb2dnZWRJbiB1c2VyIGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2V0TG9nZ2VkSW5Vc2VyKCkge1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gZ2V0IHRoZSBsb2dnZWRJbiB1c2VyXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgYXVkaW9cbiAgICovXG4gIGxvYWRBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgdGhpcy5hdWRpby5zcmMgPSBPVVRHT0lOR19DQUxMX0FMRVJUO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIGluIGxvb3BcbiAgICovXG4gIHBsYXlBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICBpZiAodHlwZW9mIHRoaXMuYXVkaW8ubG9vcCA9PSBcImJvb2xlYW5cIikge1xuICAgICAgdGhpcy5hdWRpby5sb29wID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImVuZGVkXCIsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBhdWRpb1xuICAgKi9cbiAgcGF1c2VBdWRpbygpIHtcbiAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gIH1cbn1cbiJdfQ==