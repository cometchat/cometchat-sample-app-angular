/**
 * @fileoverview added by tsickle
 * Generated from: components/Calls/cometchat-outgoing-call/cometchat-outgoing-call/cometchat-outgoing-call.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { CometChatManager } from "../../../utils/controller";
import { OUTGOING_CALL_ALERT } from "../../../resources/audio/outgoingCallAlert";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatOutgoingCallComponent = /** @class */ (function () {
    function CometchatOutgoingCallComponent() {
        var _this = this;
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
        function (key, call) {
            switch (key) {
                case enums.INCOMING_CALL_CANCELLED:
                    _this.incomingCallCancelled(call);
                    break;
                case enums.OUTGOING_CALL_ACCEPTED: //occurs at the caller end
                    _this.outgoingCallAccepted(call);
                    break;
                case enums.OUTGOING_CALL_REJECTED: //occurs at the caller end, callee rejects the call
                    _this.outgoingCallRejected(call);
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
        function (call) {
            _this.outgoingCallScreen = false;
            _this.callInProgress = null;
        });
        /**
         * Starts the call , if the call is accepted by the person , to whom you are calling
         * @param any call
         */
        this.outgoingCallAccepted = (/**
         * @param {?} call
         * @return {?}
         */
        function (call) {
            if (_this.outgoingCallScreen) {
                // this.pauseOutgoingAlert();
                _this.pauseAudio();
                _this.outgoingCallScreen = false;
                _this.callInProgress = call;
                _this.startCall(call);
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
        function (call) {
            if (call.hasOwnProperty("status") &&
                call.status === CometChat.CALL_STATUS.BUSY) {
                //show busy message.
                /** @type {?} */
                var errorMessage = call.sender.name + " is on another call.";
                _this.errorScreen = true;
                _this.errorMessage = errorMessage;
            }
            else {
                // this.pauseOutgoingAlert();
                _this.pauseAudio();
                _this.actionGenerated.emit({
                    type: enums.OUT_GOING_CALL_REJECTED,
                    payLoad: call,
                });
                _this.outgoingCallScreen = false;
                _this.callInProgress = null;
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
        function (message) {
            /** @type {?} */
            var type = message.receiverType;
            /** @type {?} */
            var id = type === "user" ? message.sender.uid : message.receiverId;
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
        function () {
            _this.pauseAudio();
            // this.pauseOutgoingAlert();
            CometChatManager.rejectCall(_this.callInProgress.sessionId, CometChat.CALL_STATUS.CANCELLED)
                .then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.actionGenerated.emit({
                    type: enums.OUTGOING_CALL_CANCELLED,
                    payLoad: call,
                });
                // this.setState({ outgoingCallScreen: false, callInProgress: null });
                _this.outgoingCallScreen = false;
                _this.callInProgress = null;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
                // this.setState({ outgoingCallScreen: false, callInProgress: null });
                _this.outgoingCallScreen = false;
                _this.callInProgress = null;
            }));
        });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["outgoingCall"]) {
            /** @type {?} */
            var prevProps = { outgoingCall: null };
            /** @type {?} */
            var props = { outgoingCall: null };
            prevProps["outgoingCall"] = change["outgoingCall"].previousValue;
            props["outgoingCall"] = change["outgoingCall"].currentValue;
            if (prevProps.outgoingCall !== props.outgoingCall && props.outgoingCall) {
                // this.playOutgoingAlert();
                this.playAudio();
                /** @type {?} */
                var call = props.outgoingCall;
                this.outgoingCallScreen = true;
                this.callInProgress = call;
                this.errorScreen = false;
                this.errorMessage = "";
            }
        }
        if (change["incomingCall"]) {
            /** @type {?} */
            var prevProps = { incomingCall: null };
            /** @type {?} */
            var props = { incomingCall: null };
            prevProps = tslib_1.__assign({}, prevProps, change["incomingCall"].previousValue);
            props = tslib_1.__assign({}, props, change["incomingCall"].currentValue);
            if (prevProps.incomingCall !== this.incomingCall && this.incomingCall) {
                this.acceptCall();
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setLoggedInUser();
        this.attachListeners();
        this.loadAudio();
    };
    /**
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
    };
    /**
     * Listener To Receive Call Actions in Real Time
     * @param function callback
     */
    /**
     * Listener To Receive Call Actions in Real Time
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.attachListeners = /**
     * Listener To Receive Call Actions in Real Time
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.addCallListener(this.callListenerId, new CometChat.CallListener({
            onOutgoingCallAccepted: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.callScreenUpdated(enums.OUTGOING_CALL_ACCEPTED, call);
            }),
            onOutgoingCallRejected: (/**
             * @param {?} call
             * @return {?}
             */
            function (call) {
                _this.callScreenUpdated(enums.OUTGOING_CALL_REJECTED, call);
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
     * Removes the call listeners
     */
    /**
     * Removes the call listeners
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.removeListeners = /**
     * Removes the call listeners
     * @return {?}
     */
    function () {
        CometChat.removeCallListener(this.callListenerId);
    };
    /**
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param any call
     */
    /**
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param {?} call
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.startCall = /**
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param {?} call
     * @return {?}
     */
    function (call) {
        var _this = this;
        /** @type {?} */
        var el = this.callScreenFrame.nativeElement;
        CometChat.startCall(call.getSessionId(), el, new CometChat.OngoingCallListener({
            onUserJoined: (/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                /* Notification received here if another user joins the call. */
                /* this method can be use to display message or perform any actions if someone joining the call */
                //call initiator gets the same info in outgoingcallaccpeted event
                if (call.callInitiator.uid !== _this.loggedInUser.uid &&
                    call.callInitiator.uid !== user.uid) {
                    _this.markMessageAsRead(call);
                    /** @type {?} */
                    var callMessage = {
                        category: call.category,
                        type: call.type,
                        action: call.action,
                        status: call.status,
                        callInitiator: call.callInitiator,
                        callReceiver: call.callReceiver,
                        receiverId: call.receiverId,
                        receiverType: call.receiverType,
                        sentAt: call.sentAt,
                        sender: tslib_1.__assign({}, user),
                    };
                    _this.actionGenerated.emit({
                        type: enums.USER_JOINED_CALL,
                        payLoad: callMessage,
                    });
                }
            }),
            onUserLeft: (/**
             * @param {?} user
             * @return {?}
             */
            function (user) {
                /* Notification received here if another user left the call. */
                /* this method can be use to display message or perform any actions if someone leaving the call */
                //call initiator gets the same info in outgoingcallaccpeted event
                if (call.callInitiator.uid !== _this.loggedInUser.uid &&
                    call.callInitiator.uid !== user.uid) {
                    _this.markMessageAsRead(call);
                    /** @type {?} */
                    var callMessage = {
                        category: call.category,
                        type: call.type,
                        action: "left",
                        status: call.status,
                        callInitiator: call.callInitiator,
                        callReceiver: call.callReceiver,
                        receiverId: call.receiverId,
                        receiverType: call.receiverType,
                        sentAt: call.sentAt,
                        sender: tslib_1.__assign({}, user),
                    };
                    _this.actionGenerated.emit({
                        type: enums.USER_LEFT_CALL,
                        payLoad: callMessage,
                    });
                }
            }),
            onCallEnded: (/**
             * @param {?} endedCall
             * @return {?}
             */
            function (endedCall) {
                /* Notification received here if current ongoing call is ended. */
                //console.log("call ended:", enums.CALL_ENDED, call);
                // this.setState({ showOutgoingScreen: false, callInProgress: null });
                // this.showOutgoingScreen = false;
                _this.outgoingCallScreen = false;
                _this.callInProgress = null;
                _this.markMessageAsRead(endedCall);
                _this.actionGenerated.emit({
                    type: enums.CALL_ENDED_BY_USER,
                    payLoad: endedCall,
                });
                /* hiding/closing the call screen can be done here. */
            }),
        }));
    };
    /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @param
     */
    /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.acceptCall = /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @return {?}
     */
    function () {
        var _this = this;
        CometChatManager.acceptCall(this.incomingCall.sessionId)
            .then((/**
         * @param {?} call
         * @return {?}
         */
        function (call) {
            _this.actionGenerated.emit({
                type: enums.ACCEPTED_INCOMING_CALL,
                payLoad: call,
            });
            _this.outgoingCallScreen = false;
            _this.callInProgress = call;
            _this.errorScreen = false;
            _this.errorMessage = null;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.startCall(call);
            }), 1000);
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[CallScreen] acceptCall -- error", error);
            _this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
        }));
    };
    /**
     * Gets The current loggedIn user information
     * @param
     */
    /**
     * Gets The current loggedIn user information
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.setLoggedInUser = /**
     * Gets The current loggedIn user information
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.getLoggedinUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("failed to get the loggedIn user", error);
        }));
    };
    /**
     * Loads the audio
     */
    /**
     * Loads the audio
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.loadAudio = /**
     * Loads the audio
     * @return {?}
     */
    function () {
        this.audio = new Audio();
        this.audio.src = OUTGOING_CALL_ALERT;
    };
    /**
     * Plays Audio in loop
     */
    /**
     * Plays Audio in loop
     * @return {?}
     */
    CometchatOutgoingCallComponent.prototype.playAudio = /**
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
    CometchatOutgoingCallComponent.prototype.pauseAudio = /**
     * Pauses audio
     * @return {?}
     */
    function () {
        this.audio.pause();
    };
    CometchatOutgoingCallComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-outgoing-call",
                    template: "<div class=\"callScreenWrapperStyle\" *ngIf=\"callInProgress\" #callScreenFrame>\n  <!-- OUTGOING CALL SCREEN BELOW -->\n  <div class=\"callScreenContainerStyle\" *ngIf=\"outgoingCallScreen\">\n    <div class=\"headerStyle\">\n      <span class=\"headerDurationStyle\"> {{ CALLING }} </span>\n      <h6 class=\"headerNameStyle\">{{ item?.name }}</h6>\n    </div>\n    <div class=\"thumbnailWrapperStyle\">\n      <div class=\"thumbnailStyle\">\n        <cometchat-avatar\n          [item]=\"item\"\n          [enableUserStatus]=\"false\"\n        ></cometchat-avatar>\n      </div>\n    </div>\n    <!-- ERROR SCREEN BELOW -->\n    <div class=\"errorContainerStyle\" *ngIf=\"errorScreen\">\n      <div>{{ errorMessage }}</div>\n    </div>\n    <!-- ERROR SCREEN ABOVE -->\n    <div class=\"headerIconStyle\">\n      <div class=\"iconWrapperStyle\">\n        <div class=\"iconStyle\" (click)=\"cancelCall()\"></div>\n      </div>\n    </div>\n  </div>\n  <!-- OUTGOING CALL SCREEN ABOVE -->\n</div>\n",
                    styles: [".callScreenWrapperStyle{opacity:1;width:inherit;height:inherit;position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(20,20,20,.9);z-index:999;color:#fff;text-align:center;box-sizing:border-box;font-family:Inter,sans-serif}.callScreenWrapperStyle *{font-family:Inter,sans-serif;box-sizing:border-box}.callScreenContainerStyle{display:flex;flex-direction:column;height:100%;width:100%}.headerStyle{padding:20px 10px;width:100%;height:20%}.headerDurationStyle{font-size:13px;display:inline-block;padding:5px}.headerNameStyle{margin:0;font-weight:700;text-transform:capitalize;font-size:16px}.thumbnailWrapperStyle{width:100%;height:45%;display:flex;justify-content:center;align-items:center}.thumbnailStyle{width:200px;flex-shrink:0}.headerIconStyle{width:100%;height:30%;padding:10px;display:flex;justify-content:center}.iconWrapperStyle{display:flex}.iconStyle{width:50px;height:50px;border-radius:27px;display:block;margin:auto 10px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAQAAACC9CRNAAAAAmJLR0QA/4ePzL8AAACuSURBVBgZdcG/K0QBAAfwr3SZXDH4dbNRNlmsN5hZJPOVjdk/YLQZpWxKlivbLXQWq1ikbjHZpPCRXtd7vZ7PJ1UW7Tn3YOTTh1f3Tm2ZSRMb+pp9ubCSKssGCjf2rZozqWXBmgNDf35cmk/Btndj3dToGXuzmcSRqm5q9JS+7cZI1Xpq7KgaRF9pqJUas16UTqLjSeFKOw103Cncmk5iybVHhybyD1OOPTvTTn4BBq7mkUyOAckAAAAASUVORK5CYII=) center center no-repeat #ff3b30}.errorContainerStyle{color:#fff;text-align:center;border-radius:2px;padding:13px 10px;font-size:13px;width:100%;height:10%;background-color:#333}"]
                }] }
    ];
    /** @nocollapse */
    CometchatOutgoingCallComponent.ctorParameters = function () { return []; };
    CometchatOutgoingCallComponent.propDecorators = {
        callScreenFrame: [{ type: ViewChild, args: ["callScreenFrame", null,] }],
        item: [{ type: Input }],
        type: [{ type: Input }],
        incomingCall: [{ type: Input }],
        outgoingCall: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatOutgoingCallComponent;
}());
export { CometchatOutgoingCallComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBR1osU0FBUyxFQUNULFVBQVUsR0FFWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEU7SUEyQkU7UUFBQSxpQkFBZ0I7UUFsQlAsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUU3QixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixtQkFBYyxHQUFHLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUVoQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGlCQUFZLEdB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QkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBPVVRHT0lOR19DQUxMX0FMRVJUIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9vdXRnb2luZ0NhbGxBbGVydFwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtb3V0Z29pbmctY2FsbFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1vdXRnb2luZy1jYWxsLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtb3V0Z29pbmctY2FsbC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRPdXRnb2luZ0NhbGxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChcImNhbGxTY3JlZW5GcmFtZVwiLCBudWxsKSBjYWxsU2NyZWVuRnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBpbmNvbWluZ0NhbGwgPSBudWxsO1xuICBASW5wdXQoKSBvdXRnb2luZ0NhbGwgPSBudWxsO1xuXG4gIGNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgY2FsbExpc3RlbmVySWQgPSBcImNhbGxzY3JlZW5fXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgb3V0Z29pbmdDYWxsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIGVycm9yU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gIGVycm9yTWVzc2FnZTogU3RyaW5nID0gXCJcIjtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsb2dnZWRJblVzZXIgPSBudWxsO1xuICBhdWRpbztcblxuICBDQUxMSU5HOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQ0FMTElORztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZVtcIm91dGdvaW5nQ2FsbFwiXSkge1xuICAgICAgbGV0IHByZXZQcm9wcyA9IHsgb3V0Z29pbmdDYWxsOiBudWxsIH07XG4gICAgICBsZXQgcHJvcHMgPSB7IG91dGdvaW5nQ2FsbDogbnVsbCB9O1xuXG4gICAgICBwcmV2UHJvcHNbXCJvdXRnb2luZ0NhbGxcIl0gPSBjaGFuZ2VbXCJvdXRnb2luZ0NhbGxcIl0ucHJldmlvdXNWYWx1ZTtcbiAgICAgIHByb3BzW1wib3V0Z29pbmdDYWxsXCJdID0gY2hhbmdlW1wib3V0Z29pbmdDYWxsXCJdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgaWYgKHByZXZQcm9wcy5vdXRnb2luZ0NhbGwgIT09IHByb3BzLm91dGdvaW5nQ2FsbCAmJiBwcm9wcy5vdXRnb2luZ0NhbGwpIHtcbiAgICAgICAgLy8gdGhpcy5wbGF5T3V0Z29pbmdBbGVydCgpO1xuICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuXG4gICAgICAgIGxldCBjYWxsID0gcHJvcHMub3V0Z29pbmdDYWxsO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBjYWxsO1xuICAgICAgICB0aGlzLmVycm9yU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlW1wiaW5jb21pbmdDYWxsXCJdKSB7XG4gICAgICBsZXQgcHJldlByb3BzID0geyBpbmNvbWluZ0NhbGw6IG51bGwgfTtcbiAgICAgIGxldCBwcm9wcyA9IHsgaW5jb21pbmdDYWxsOiBudWxsIH07XG5cbiAgICAgIHByZXZQcm9wcyA9IHsgLi4ucHJldlByb3BzLCAuLi5jaGFuZ2VbXCJpbmNvbWluZ0NhbGxcIl0ucHJldmlvdXNWYWx1ZSB9O1xuICAgICAgcHJvcHMgPSB7IC4uLnByb3BzLCAuLi5jaGFuZ2VbXCJpbmNvbWluZ0NhbGxcIl0uY3VycmVudFZhbHVlIH07XG5cbiAgICAgIGlmIChwcmV2UHJvcHMuaW5jb21pbmdDYWxsICE9PSB0aGlzLmluY29taW5nQ2FsbCAmJiB0aGlzLmluY29taW5nQ2FsbCkge1xuICAgICAgICB0aGlzLmFjY2VwdENhbGwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldExvZ2dlZEluVXNlcigpO1xuXG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmxvYWRBdWRpbygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBUbyBSZWNlaXZlIENhbGwgQWN0aW9ucyBpbiBSZWFsIFRpbWVcbiAgICogQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXG4gICAqL1xuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LmFkZENhbGxMaXN0ZW5lcihcbiAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LkNhbGxMaXN0ZW5lcih7XG4gICAgICAgIG9uT3V0Z29pbmdDYWxsQWNjZXB0ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxsU2NyZWVuVXBkYXRlZChlbnVtcy5PVVRHT0lOR19DQUxMX0FDQ0VQVEVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25PdXRnb2luZ0NhbGxSZWplY3RlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQsIGNhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluY29taW5nQ2FsbENhbmNlbGxlZDogKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBjYWxsKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjYWxsIGxpc3RlbmVyc1xuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIENvbWV0Q2hhdC5yZW1vdmVDYWxsTGlzdGVuZXIodGhpcy5jYWxsTGlzdGVuZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY2FsbFNjcmVlbiBvbiBiYXNpcyBvZiBjYWxsIGFjdGlvbnNcbiAgICovXG4gIGNhbGxTY3JlZW5VcGRhdGVkID0gKGtleSwgY2FsbCkgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgICB0aGlzLmluY29taW5nQ2FsbENhbmNlbGxlZChjYWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfQUNDRVBURUQ6IC8vb2NjdXJzIGF0IHRoZSBjYWxsZXIgZW5kXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsQWNjZXB0ZWQoY2FsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOiAvL29jY3VycyBhdCB0aGUgY2FsbGVyIGVuZCwgY2FsbGVlIHJlamVjdHMgdGhlIGNhbGxcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxSZWplY3RlZChjYWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNsb3NlcyBjYWxsIHNjcmVlbiB3aGVuIHRoZSBpbmNvbWluZyBjYWxsIGlzIGNhbmNlbGxlZCBieSB0aGUgdXNlclxuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIGluY29taW5nQ2FsbENhbmNlbGxlZCA9IChjYWxsKSA9PiB7XG4gICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBjYWxsICwgaWYgdGhlIGNhbGwgaXMgYWNjZXB0ZWQgYnkgdGhlIHBlcnNvbiAsIHRvIHdob20geW91IGFyZSBjYWxsaW5nXG4gICAqIEBwYXJhbSBhbnkgY2FsbFxuICAgKi9cbiAgb3V0Z29pbmdDYWxsQWNjZXB0ZWQgPSAoY2FsbCkgPT4ge1xuICAgIGlmICh0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbikge1xuICAgICAgLy8gdGhpcy5wYXVzZU91dGdvaW5nQWxlcnQoKTtcbiAgICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBjYWxsO1xuXG4gICAgICB0aGlzLnN0YXJ0Q2FsbChjYWxsKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNsb3NlcyB0aGUgY2FsbCBzY3JlZW4gLCBpZiB0aGUgcGVyc29uIHlvdSBhcmUgY2FsbGluZyBoYXMgcmVqZWN0ZWQgdGhlIGNhbGwgb3IgdGhlIHBlcnNvbiBpcyBidXN5IGluIHNvbWUgb3RoZXIgY2FsbFxuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIG91dGdvaW5nQ2FsbFJlamVjdGVkID0gKGNhbGwpID0+IHtcbiAgICBpZiAoXG4gICAgICBjYWxsLmhhc093blByb3BlcnR5KFwic3RhdHVzXCIpICYmXG4gICAgICBjYWxsLnN0YXR1cyA9PT0gQ29tZXRDaGF0LkNBTExfU1RBVFVTLkJVU1lcbiAgICApIHtcbiAgICAgIC8vc2hvdyBidXN5IG1lc3NhZ2UuXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHtjYWxsLnNlbmRlci5uYW1lfSBpcyBvbiBhbm90aGVyIGNhbGwuYDtcbiAgICAgIHRoaXMuZXJyb3JTY3JlZW4gPSB0cnVlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMucGF1c2VPdXRnb2luZ0FsZXJ0KCk7XG4gICAgICB0aGlzLnBhdXNlQXVkaW8oKTtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRCxcbiAgICAgICAgcGF5TG9hZDogY2FsbCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBjYWxsICwgaWYgdGhlIG91dGdvaW5nIGNhbGwgaXMgYWNjZXB0ZWQgYnkgdGhlIHBlcnNvbiAsIHRoYXQgeW91IGFyZSBjYWxsaW5nXG4gICAqIEBwYXJhbSBhbnkgY2FsbFxuICAgKi9cbiAgc3RhcnRDYWxsKGNhbGwpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuY2FsbFNjcmVlbkZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBDb21ldENoYXQuc3RhcnRDYWxsKFxuICAgICAgY2FsbC5nZXRTZXNzaW9uSWQoKSxcbiAgICAgIGVsLFxuICAgICAgbmV3IENvbWV0Q2hhdC5PbmdvaW5nQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgb25Vc2VySm9pbmVkOiAodXNlcikgPT4ge1xuICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGFub3RoZXIgdXNlciBqb2lucyB0aGUgY2FsbC4gKi9cbiAgICAgICAgICAvKiB0aGlzIG1ldGhvZCBjYW4gYmUgdXNlIHRvIGRpc3BsYXkgbWVzc2FnZSBvciBwZXJmb3JtIGFueSBhY3Rpb25zIGlmIHNvbWVvbmUgam9pbmluZyB0aGUgY2FsbCAqL1xuXG4gICAgICAgICAgLy9jYWxsIGluaXRpYXRvciBnZXRzIHRoZSBzYW1lIGluZm8gaW4gb3V0Z29pbmdjYWxsYWNjcGV0ZWQgZXZlbnRcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB0aGlzLmxvZ2dlZEluVXNlci51aWQgJiZcbiAgICAgICAgICAgIGNhbGwuY2FsbEluaXRpYXRvci51aWQgIT09IHVzZXIudWlkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlQXNSZWFkKGNhbGwpO1xuXG4gICAgICAgICAgICBjb25zdCBjYWxsTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IGNhbGwuY2F0ZWdvcnksXG4gICAgICAgICAgICAgIHR5cGU6IGNhbGwudHlwZSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBjYWxsLmFjdGlvbixcbiAgICAgICAgICAgICAgc3RhdHVzOiBjYWxsLnN0YXR1cyxcbiAgICAgICAgICAgICAgY2FsbEluaXRpYXRvcjogY2FsbC5jYWxsSW5pdGlhdG9yLFxuICAgICAgICAgICAgICBjYWxsUmVjZWl2ZXI6IGNhbGwuY2FsbFJlY2VpdmVyLFxuICAgICAgICAgICAgICByZWNlaXZlcklkOiBjYWxsLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgIHJlY2VpdmVyVHlwZTogY2FsbC5yZWNlaXZlclR5cGUsXG4gICAgICAgICAgICAgIHNlbnRBdDogY2FsbC5zZW50QXQsXG4gICAgICAgICAgICAgIHNlbmRlcjogeyAuLi51c2VyIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLlVTRVJfSk9JTkVEX0NBTEwsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IGNhbGxNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvblVzZXJMZWZ0OiAodXNlcikgPT4ge1xuICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGFub3RoZXIgdXNlciBsZWZ0IHRoZSBjYWxsLiAqL1xuXG4gICAgICAgICAgLyogdGhpcyBtZXRob2QgY2FuIGJlIHVzZSB0byBkaXNwbGF5IG1lc3NhZ2Ugb3IgcGVyZm9ybSBhbnkgYWN0aW9ucyBpZiBzb21lb25lIGxlYXZpbmcgdGhlIGNhbGwgKi9cblxuICAgICAgICAgIC8vY2FsbCBpbml0aWF0b3IgZ2V0cyB0aGUgc2FtZSBpbmZvIGluIG91dGdvaW5nY2FsbGFjY3BldGVkIGV2ZW50XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbC5jYWxsSW5pdGlhdG9yLnVpZCAhPT0gdGhpcy5sb2dnZWRJblVzZXIudWlkICYmXG4gICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB1c2VyLnVpZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5tYXJrTWVzc2FnZUFzUmVhZChjYWxsKTtcblxuICAgICAgICAgICAgY29uc3QgY2FsbE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5OiBjYWxsLmNhdGVnb3J5LFxuICAgICAgICAgICAgICB0eXBlOiBjYWxsLnR5cGUsXG4gICAgICAgICAgICAgIGFjdGlvbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgIHN0YXR1czogY2FsbC5zdGF0dXMsXG4gICAgICAgICAgICAgIGNhbGxJbml0aWF0b3I6IGNhbGwuY2FsbEluaXRpYXRvcixcbiAgICAgICAgICAgICAgY2FsbFJlY2VpdmVyOiBjYWxsLmNhbGxSZWNlaXZlcixcbiAgICAgICAgICAgICAgcmVjZWl2ZXJJZDogY2FsbC5yZWNlaXZlcklkLFxuICAgICAgICAgICAgICByZWNlaXZlclR5cGU6IGNhbGwucmVjZWl2ZXJUeXBlLFxuICAgICAgICAgICAgICBzZW50QXQ6IGNhbGwuc2VudEF0LFxuICAgICAgICAgICAgICBzZW5kZXI6IHsgLi4udXNlciB9LFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLlVTRVJfTEVGVF9DQUxMLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBjYWxsTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25DYWxsRW5kZWQ6IChlbmRlZENhbGwpID0+IHtcbiAgICAgICAgICAvKiBOb3RpZmljYXRpb24gcmVjZWl2ZWQgaGVyZSBpZiBjdXJyZW50IG9uZ29pbmcgY2FsbCBpcyBlbmRlZC4gKi9cbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbCBlbmRlZDpcIiwgZW51bXMuQ0FMTF9FTkRFRCwgY2FsbCk7XG5cbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgc2hvd091dGdvaW5nU2NyZWVuOiBmYWxzZSwgY2FsbEluUHJvZ3Jlc3M6IG51bGwgfSk7XG5cbiAgICAgICAgICAvLyB0aGlzLnNob3dPdXRnb2luZ1NjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG5cbiAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlQXNSZWFkKGVuZGVkQ2FsbCk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX0VOREVEX0JZX1VTRVIsXG4gICAgICAgICAgICBwYXlMb2FkOiBlbmRlZENhbGwsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLyogaGlkaW5nL2Nsb3NpbmcgdGhlIGNhbGwgc2NyZWVuIGNhbiBiZSBkb25lIGhlcmUuICovXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTWFya3MgbWVzc2FnZXMgYXMgUmVhZFxuICAgKiBAcGFyYW0gYW55IG1lc3NhZ2VcbiAgICovXG4gIG1hcmtNZXNzYWdlQXNSZWFkID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB0eXBlID0gbWVzc2FnZS5yZWNlaXZlclR5cGU7XG4gICAgY29uc3QgaWQgPSB0eXBlID09PSBcInVzZXJcIiA/IG1lc3NhZ2Uuc2VuZGVyLnVpZCA6IG1lc3NhZ2UucmVjZWl2ZXJJZDtcblxuICAgIGlmIChtZXNzYWdlLmhhc093blByb3BlcnR5KFwicmVhZEF0XCIpID09PSBmYWxzZSkge1xuICAgICAgQ29tZXRDaGF0Lm1hcmtBc1JlYWQobWVzc2FnZS5pZCwgaWQsIHR5cGUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWNjZXB0cyB0aGUgaW5jb21pbmcgY2FsbCAsIGlmIGNhbGwgaXMgYWNjcGV0ZWQgYnkgdGhlIGN1cnJlbnQgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGFjY2VwdENhbGwoKSB7XG4gICAgQ29tZXRDaGF0TWFuYWdlci5hY2NlcHRDYWxsKHRoaXMuaW5jb21pbmdDYWxsLnNlc3Npb25JZClcbiAgICAgIC50aGVuKChjYWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgIHR5cGU6IGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEwsXG4gICAgICAgICAgcGF5TG9hZDogY2FsbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IGNhbGw7XG4gICAgICAgIHRoaXMuZXJyb3JTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0Q2FsbChjYWxsKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltDYWxsU2NyZWVuXSBhY2NlcHRDYWxsIC0tIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNBTExfRVJST1IsIHBheUxvYWQ6IGVycm9yIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyB0aGUgY2FsbCAsIG1hZGUgYnkgdGhlIGN1cnJlbnQgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbmNlbENhbGwgPSAoKSA9PiB7XG4gICAgdGhpcy5wYXVzZUF1ZGlvKCk7XG4gICAgLy8gdGhpcy5wYXVzZU91dGdvaW5nQWxlcnQoKTtcbiAgICBDb21ldENoYXRNYW5hZ2VyLnJlamVjdENhbGwoXG4gICAgICB0aGlzLmNhbGxJblByb2dyZXNzLnNlc3Npb25JZCxcbiAgICAgIENvbWV0Q2hhdC5DQUxMX1NUQVRVUy5DQU5DRUxMRURcbiAgICApXG4gICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5PVVRHT0lOR19DQUxMX0NBTkNFTExFRCxcbiAgICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7IG91dGdvaW5nQ2FsbFNjcmVlbjogZmFsc2UsIGNhbGxJblByb2dyZXNzOiBudWxsIH0pO1xuXG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNBTExfRVJST1IsIHBheUxvYWQ6IGVycm9yIH0pO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHsgb3V0Z29pbmdDYWxsU2NyZWVuOiBmYWxzZSwgY2FsbEluUHJvZ3Jlc3M6IG51bGwgfSk7XG4gICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgVGhlIGN1cnJlbnQgbG9nZ2VkSW4gdXNlciBpbmZvcm1hdGlvblxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNldExvZ2dlZEluVXNlcigpIHtcbiAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIGdldCB0aGUgbG9nZ2VkSW4gdXNlclwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuICAvKipcbiAgICogTG9hZHMgdGhlIGF1ZGlvXG4gICAqL1xuICBsb2FkQXVkaW8oKSB7XG4gICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgIHRoaXMuYXVkaW8uc3JjID0gT1VUR09JTkdfQ0FMTF9BTEVSVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5cyBBdWRpbyBpbiBsb29wXG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmF1ZGlvLmxvb3AgPT0gXCJib29sZWFuXCIpIHtcbiAgICAgIHRoaXMuYXVkaW8ubG9vcCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJlbmRlZFwiLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgYXVkaW9cbiAgICovXG4gIHBhdXNlQXVkaW8oKSB7XG4gICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICB9XG59XG4iXX0=