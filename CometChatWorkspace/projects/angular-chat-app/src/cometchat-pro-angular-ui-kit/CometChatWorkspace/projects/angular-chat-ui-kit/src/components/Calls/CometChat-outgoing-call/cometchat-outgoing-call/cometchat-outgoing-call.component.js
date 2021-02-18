/**
 * @fileoverview added by tsickle
 * Generated from: components/Calls/CometChat-outgoing-call/cometchat-outgoing-call/cometchat-outgoing-call.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { CometChatManager } from "../../../../utils/controller";
import { OUTGOING_CALL_ALERT } from "../../../../resources/audio/outgoingCallAlert";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatOutgoingCallComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.incomingCall = null;
        this.outgoingCall = null;
        this.callInProgress = null;
        this.callListenerId = enums.CALL_SCREEN_ + new Date().getTime();
        this.outgoingCallScreen = false;
        this.errorScreen = false;
        this.errorMessage = "";
        this.actionGenerated = new EventEmitter();
        this.loggedInUser = null;
        this.CALLING = COMETCHAT_CONSTANTS.CALLING;
        /**
         * Updates the callScreen on basis of call actions
         */
        this.callScreenUpdated = (/**
         * @param {?} key
         * @param {?} call
         * @return {?}
         */
        (key, call) => {
            try {
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
            }
            catch (error) {
                logger(error);
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
            try {
                this.outgoingCallScreen = false;
                this.callInProgress = null;
            }
            catch (error) {
                logger(error);
            }
        });
        /**
         * Starts the call  , if the call is accepted by the person , to whom you are calling
         * @param any call
         */
        this.outgoingCallAccepted = (/**
         * @param {?} call
         * @return {?}
         */
        (call) => {
            try {
                if (this.outgoingCallScreen) {
                    this.pauseAudio();
                    this.outgoingCallScreen = false;
                    this.callInProgress = call;
                    this.startCall(call);
                }
            }
            catch (error) {
                logger(error);
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
            try {
                if (call.hasOwnProperty(enums.STATUS) &&
                    call.status === CometChat.CALL_STATUS.BUSY) {
                    //show busy message.
                    /** @type {?} */
                    const errorMessage = `${call.sender.name} is on another call.`;
                    this.errorScreen = true;
                    this.errorMessage = errorMessage;
                }
                else {
                    this.pauseAudio();
                    this.actionGenerated.emit({
                        type: enums.OUT_GOING_CALL_REJECTED,
                        payLoad: call,
                    });
                    this.outgoingCallScreen = false;
                    this.callInProgress = null;
                }
            }
            catch (error) {
                logger(error);
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
            try {
                /** @type {?} */
                const type = message.receiverType;
                /** @type {?} */
                const id = type === CometChat.RECEIVER_TYPE.USER
                    ? message.sender.uid
                    : message.receiverId;
                if (message.hasOwnProperty(enums.READ_AT) === false) {
                    CometChat.markAsRead(message.id, id, type);
                }
            }
            catch (error) {
                logger(error);
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
            try {
                this.pauseAudio();
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
            if (change[enums.OUTGOING_CALL]) {
                /** @type {?} */
                let prevProps = { outgoingCall: null };
                /** @type {?} */
                let props = { outgoingCall: null };
                prevProps[enums.OUTGOING_CALL] =
                    change[enums.OUTGOING_CALL].previousValue;
                props[enums.OUTGOING_CALL] = change[enums.OUTGOING_CALL].currentValue;
                if (prevProps.outgoingCall !== props.outgoingCall &&
                    props.outgoingCall) {
                    this.playAudio();
                    /** @type {?} */
                    let call = props.outgoingCall;
                    this.outgoingCallScreen = true;
                    this.callInProgress = call;
                    this.errorScreen = false;
                    this.errorMessage = "";
                }
            }
            if (change[enums.INCOMING_CALL]) {
                /** @type {?} */
                let prevProps = { incomingCall: null };
                /** @type {?} */
                let props = { incomingCall: null };
                prevProps = Object.assign({}, prevProps, change[enums.INCOMING_CALL].previousValue);
                props = Object.assign({}, props, change[enums.INCOMING_CALL].currentValue);
                if (prevProps.incomingCall !== this.incomingCall && this.incomingCall) {
                    this.acceptCall();
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
            this.setLoggedInUser();
            this.attachListeners();
            this.loadAudio();
        }
        catch (error) {
            logger(error);
        }
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
        try {
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes the call listeners
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
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param {?} call
     * @return {?}
     */
    startCall(call) {
        try {
            /** @type {?} */
            const el = this.callScreenFrame.nativeElement;
            /** @type {?} */
            const sessionId = call.getSessionId();
            /** @type {?} */
            const callType = call.type;
            /** @type {?} */
            const callSettings = new CometChat.CallSettingsBuilder()
                .setSessionID(sessionId)
                .enableDefaultLayout(true)
                .setMode(CometChat.CALL_MODE.DEFAULT)
                .setIsAudioOnlyCall(callType === CometChat.CALL_TYPE.AUDIO ? true : false)
                .build();
            CometChat.startCall(callSettings, el, new CometChat.OngoingCallListener({
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
                            action: enums.LEFT,
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
        catch (error) {
            logger(error);
        }
    }
    /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @return {?}
     */
    acceptCall() {
        try {
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
                logger("[CallScreen] acceptCall -- error", error);
                this.actionGenerated.emit({ type: enums.CALL_ERROR, payLoad: error });
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets The current loggedIn user information
     * @return {?}
     */
    setLoggedInUser() {
        try {
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
                logger("failed to get the loggedIn user", error);
            }));
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
            this.audio.src = OUTGOING_CALL_ALERT;
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
CometChatOutgoingCallComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-outgoing-call",
                template: "<div class=\"callScreenWrapperStyle\" *ngIf=\"callInProgress\" #callScreenFrame>\n  <!-- OUTGOING CALL SCREEN BELOW -->\n  <div class=\"callScreenContainerStyle\" *ngIf=\"outgoingCallScreen\">\n    <div class=\"headerStyle\">\n      <span class=\"headerDurationStyle\"> {{ CALLING }} </span>\n      <h6 class=\"headerNameStyle\">{{ item?.name }}</h6>\n    </div>\n    <div class=\"thumbnailWrapperStyle\">\n      <div class=\"thumbnailStyle\">\n        <cometchat-avatar\n          [item]=\"item\"\n          [enableUserStatus]=\"false\"\n        ></cometchat-avatar>\n      </div>\n    </div>\n    <!-- ERROR SCREEN BELOW -->\n    <div class=\"errorContainerStyle\" *ngIf=\"errorScreen\">\n      <div>{{ errorMessage }}</div>\n    </div>\n    <!-- ERROR SCREEN ABOVE -->\n    <div class=\"headerIconStyle\">\n      <div class=\"iconWrapperStyle\">\n        <div class=\"iconStyle\" (click)=\"cancelCall()\"></div>\n      </div>\n    </div>\n  </div>\n  <!-- OUTGOING CALL SCREEN ABOVE -->\n</div>\n",
                styles: [".callScreenWrapperStyle{opacity:1;width:inherit;height:inherit;position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(20,20,20,.9);z-index:999;color:#fff;text-align:center;box-sizing:border-box;font-family:Inter,sans-serif}.callScreenWrapperStyle *{font-family:Inter,sans-serif;box-sizing:border-box}.callScreenContainerStyle{display:flex;flex-direction:column;height:100%;width:100%}.headerStyle{padding:20px 10px;width:100%;height:20%}.headerDurationStyle{font-size:13px;display:inline-block;padding:5px}.headerNameStyle{margin:0;font-weight:700;text-transform:capitalize;font-size:16px}.thumbnailWrapperStyle{width:100%;height:45%;display:flex;justify-content:center;align-items:center}.thumbnailStyle{width:200px;flex-shrink:0}.headerIconStyle{width:100%;height:30%;padding:10px;display:flex;justify-content:center}.iconWrapperStyle{display:flex}.iconStyle{width:50px;height:50px;border-radius:27px;display:block;margin:auto 10px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAQAAACC9CRNAAAAAmJLR0QA/4ePzL8AAACuSURBVBgZdcG/K0QBAAfwr3SZXDH4dbNRNlmsN5hZJPOVjdk/YLQZpWxKlivbLXQWq1ikbjHZpPCRXtd7vZ7PJ1UW7Tn3YOTTh1f3Tm2ZSRMb+pp9ubCSKssGCjf2rZozqWXBmgNDf35cmk/Btndj3dToGXuzmcSRqm5q9JS+7cZI1Xpq7KgaRF9pqJUas16UTqLjSeFKOw103Cncmk5iybVHhybyD1OOPTvTTn4BBq7mkUyOAckAAAAASUVORK5CYII=) center center no-repeat #ff3b30}.errorContainerStyle{color:#fff;text-align:center;border-radius:2px;padding:13px 10px;font-size:13px;width:100%;height:10%;background-color:#333}"]
            }] }
];
/** @nocollapse */
CometChatOutgoingCallComponent.ctorParameters = () => [];
CometChatOutgoingCallComponent.propDecorators = {
    callScreenFrame: [{ type: ViewChild, args: ["callScreenFrame", { static: false },] }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    incomingCall: [{ type: Input }],
    outgoingCall: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.callScreenFrame;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.item;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.type;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.incomingCall;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.outgoingCall;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.callInProgress;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.callListenerId;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.outgoingCallScreen;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.errorScreen;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.errorMessage;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.audio;
    /** @type {?} */
    CometChatOutgoingCallComponent.prototype.CALLING;
    /**
     * Updates the callScreen on basis of call actions
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.callScreenUpdated;
    /**
     * closes call screen when the incoming call is cancelled by the user
     * \@param any call
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.incomingCallCancelled;
    /**
     * Starts the call  , if the call is accepted by the person , to whom you are calling
     * \@param any call
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.outgoingCallAccepted;
    /**
     * closes the call screen , if the person you are calling has rejected the call or the person is busy in some other call
     * \@param any call
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.outgoingCallRejected;
    /**
     * Marks messages as Read
     * \@param any message
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.markMessageAsRead;
    /**
     * Cancels the call , made by the current user
     * \@param
     * @type {?}
     */
    CometChatOutgoingCallComponent.prototype.cancelCall;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsbHMvQ29tZXRDaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwvY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1sRCxNQUFNLE9BQU8sOEJBQThCO0lBc0J6QztRQWxCUyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTdCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNELHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFXLEVB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QUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQUtELFVBQVU7UUFDUixJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUFsY0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLG0vQkFBdUQ7O2FBRXhEOzs7Ozs4QkFHRSxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO21CQUU5QyxLQUFLO21CQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQVFMLE1BQU07Ozs7SUFiUCx5REFBNkU7O0lBRTdFLDhDQUFxQjs7SUFDckIsOENBQXFCOztJQUNyQixzREFBNkI7O0lBQzdCLHNEQUE2Qjs7SUFFN0Isd0RBQXNCOztJQUN0Qix3REFBMkQ7O0lBQzNELDREQUFvQzs7SUFDcEMscURBQTZCOztJQUM3QixzREFBMEI7O0lBRTFCLHlEQUFrRTs7SUFFbEUsc0RBQW9COztJQUNwQiwrQ0FBTTs7SUFFTixpREFBOEM7Ozs7O0lBcUc5QywyREFrQkU7Ozs7OztJQU1GLCtEQU9FOzs7Ozs7SUFNRiw4REFZRTs7Ozs7O0lBTUYsOERBc0JFOzs7Ozs7SUE4R0YsMkRBY0U7Ozs7OztJQW9DRixvREF1QkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgQ29tZXRDaGF0TWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBPVVRHT0lOR19DQUxMX0FMRVJUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9vdXRnb2luZ0NhbGxBbGVydFwiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW91dGdvaW5nLWNhbGxcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtb3V0Z29pbmctY2FsbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW91dGdvaW5nLWNhbGwuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0T3V0Z29pbmdDYWxsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoXCJjYWxsU2NyZWVuRnJhbWVcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbGxTY3JlZW5GcmFtZTogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGluY29taW5nQ2FsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG91dGdvaW5nQ2FsbCA9IG51bGw7XG5cbiAgY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICBjYWxsTGlzdGVuZXJJZCA9IGVudW1zLkNBTExfU0NSRUVOXyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBvdXRnb2luZ0NhbGxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXJyb3JTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcgPSBcIlwiO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGxvZ2dlZEluVXNlciA9IG51bGw7XG4gIGF1ZGlvO1xuXG4gIENBTExJTkc6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQ0FMTElORztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuT1VUR09JTkdfQ0FMTF0pIHtcbiAgICAgICAgbGV0IHByZXZQcm9wcyA9IHsgb3V0Z29pbmdDYWxsOiBudWxsIH07XG4gICAgICAgIGxldCBwcm9wcyA9IHsgb3V0Z29pbmdDYWxsOiBudWxsIH07XG5cbiAgICAgICAgcHJldlByb3BzW2VudW1zLk9VVEdPSU5HX0NBTExdID1cbiAgICAgICAgICBjaGFuZ2VbZW51bXMuT1VUR09JTkdfQ0FMTF0ucHJldmlvdXNWYWx1ZTtcbiAgICAgICAgcHJvcHNbZW51bXMuT1VUR09JTkdfQ0FMTF0gPSBjaGFuZ2VbZW51bXMuT1VUR09JTkdfQ0FMTF0uY3VycmVudFZhbHVlO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcmV2UHJvcHMub3V0Z29pbmdDYWxsICE9PSBwcm9wcy5vdXRnb2luZ0NhbGwgJiZcbiAgICAgICAgICBwcm9wcy5vdXRnb2luZ0NhbGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcblxuICAgICAgICAgIGxldCBjYWxsID0gcHJvcHMub3V0Z29pbmdDYWxsO1xuICAgICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcbiAgICAgICAgICB0aGlzLmVycm9yU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuSU5DT01JTkdfQ0FMTF0pIHtcbiAgICAgICAgbGV0IHByZXZQcm9wcyA9IHsgaW5jb21pbmdDYWxsOiBudWxsIH07XG4gICAgICAgIGxldCBwcm9wcyA9IHsgaW5jb21pbmdDYWxsOiBudWxsIH07XG5cbiAgICAgICAgcHJldlByb3BzID0ge1xuICAgICAgICAgIC4uLnByZXZQcm9wcyxcbiAgICAgICAgICAuLi5jaGFuZ2VbZW51bXMuSU5DT01JTkdfQ0FMTF0ucHJldmlvdXNWYWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcHJvcHMgPSB7IC4uLnByb3BzLCAuLi5jaGFuZ2VbZW51bXMuSU5DT01JTkdfQ0FMTF0uY3VycmVudFZhbHVlIH07XG5cbiAgICAgICAgaWYgKHByZXZQcm9wcy5pbmNvbWluZ0NhbGwgIT09IHRoaXMuaW5jb21pbmdDYWxsICYmIHRoaXMuaW5jb21pbmdDYWxsKSB7XG4gICAgICAgICAgdGhpcy5hY2NlcHRDYWxsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zZXRMb2dnZWRJblVzZXIoKTtcblxuICAgICAgdGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMubG9hZEF1ZGlvKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBUbyBSZWNlaXZlIENhbGwgQWN0aW9ucyBpbiBSZWFsIFRpbWVcbiAgICogQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXG4gICAqL1xuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5hZGRDYWxsTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuQ2FsbExpc3RlbmVyKHtcbiAgICAgICAgICBvbk91dGdvaW5nQ2FsbEFjY2VwdGVkOiAoY2FsbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxsU2NyZWVuVXBkYXRlZChlbnVtcy5PVVRHT0lOR19DQUxMX0FDQ0VQVEVELCBjYWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uT3V0Z29pbmdDYWxsUmVqZWN0ZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLk9VVEdPSU5HX0NBTExfUkVKRUNURUQsIGNhbGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25JbmNvbWluZ0NhbGxDYW5jZWxsZWQ6IChjYWxsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxTY3JlZW5VcGRhdGVkKGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVELCBjYWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2FsbCBsaXN0ZW5lcnNcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZUNhbGxMaXN0ZW5lcih0aGlzLmNhbGxMaXN0ZW5lcklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY2FsbFNjcmVlbiBvbiBiYXNpcyBvZiBjYWxsIGFjdGlvbnNcbiAgICovXG4gIGNhbGxTY3JlZW5VcGRhdGVkID0gKGtleSwgY2FsbCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIGVudW1zLklOQ09NSU5HX0NBTExfQ0FOQ0VMTEVEOlxuICAgICAgICAgIHRoaXMuaW5jb21pbmdDYWxsQ2FuY2VsbGVkKGNhbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLk9VVEdPSU5HX0NBTExfQUNDRVBURUQ6IC8vb2NjdXJzIGF0IHRoZSBjYWxsZXIgZW5kXG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxBY2NlcHRlZChjYWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5PVVRHT0lOR19DQUxMX1JFSkVDVEVEOiAvL29jY3VycyBhdCB0aGUgY2FsbGVyIGVuZCwgY2FsbGVlIHJlamVjdHMgdGhlIGNhbGxcbiAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFJlamVjdGVkKGNhbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogY2xvc2VzIGNhbGwgc2NyZWVuIHdoZW4gdGhlIGluY29taW5nIGNhbGwgaXMgY2FuY2VsbGVkIGJ5IHRoZSB1c2VyXG4gICAqIEBwYXJhbSBhbnkgY2FsbFxuICAgKi9cbiAgaW5jb21pbmdDYWxsQ2FuY2VsbGVkID0gKGNhbGwpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FsbEluUHJvZ3Jlc3MgPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBjYWxsICAsIGlmIHRoZSBjYWxsIGlzIGFjY2VwdGVkIGJ5IHRoZSBwZXJzb24gLCB0byB3aG9tIHlvdSBhcmUgY2FsbGluZ1xuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIG91dGdvaW5nQ2FsbEFjY2VwdGVkID0gKGNhbGwpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuKSB7XG4gICAgICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcblxuICAgICAgICB0aGlzLnN0YXJ0Q2FsbChjYWxsKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNsb3NlcyB0aGUgY2FsbCBzY3JlZW4gLCBpZiB0aGUgcGVyc29uIHlvdSBhcmUgY2FsbGluZyBoYXMgcmVqZWN0ZWQgdGhlIGNhbGwgb3IgdGhlIHBlcnNvbiBpcyBidXN5IGluIHNvbWUgb3RoZXIgY2FsbFxuICAgKiBAcGFyYW0gYW55IGNhbGxcbiAgICovXG4gIG91dGdvaW5nQ2FsbFJlamVjdGVkID0gKGNhbGwpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICBjYWxsLmhhc093blByb3BlcnR5KGVudW1zLlNUQVRVUykgJiZcbiAgICAgICAgY2FsbC5zdGF0dXMgPT09IENvbWV0Q2hhdC5DQUxMX1NUQVRVUy5CVVNZXG4gICAgICApIHtcbiAgICAgICAgLy9zaG93IGJ1c3kgbWVzc2FnZS5cbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7Y2FsbC5zZW5kZXIubmFtZX0gaXMgb24gYW5vdGhlciBjYWxsLmA7XG4gICAgICAgIHRoaXMuZXJyb3JTY3JlZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5PVVRfR09JTkdfQ0FMTF9SRUpFQ1RFRCxcbiAgICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGNhbGwgLCBpZiB0aGUgb3V0Z29pbmcgY2FsbCBpcyBhY2NlcHRlZCBieSB0aGUgcGVyc29uICwgdGhhdCB5b3UgYXJlIGNhbGxpbmdcbiAgICogQHBhcmFtIGFueSBjYWxsXG4gICAqL1xuICBzdGFydENhbGwoY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuY2FsbFNjcmVlbkZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGNvbnN0IHNlc3Npb25JZCA9IGNhbGwuZ2V0U2Vzc2lvbklkKCk7XG4gICAgICBjb25zdCBjYWxsVHlwZSA9IGNhbGwudHlwZTtcblxuICAgICAgY29uc3QgY2FsbFNldHRpbmdzID0gbmV3IENvbWV0Q2hhdC5DYWxsU2V0dGluZ3NCdWlsZGVyKClcbiAgICAgICAgLnNldFNlc3Npb25JRChzZXNzaW9uSWQpXG4gICAgICAgIC5lbmFibGVEZWZhdWx0TGF5b3V0KHRydWUpXG4gICAgICAgIC5zZXRNb2RlKENvbWV0Q2hhdC5DQUxMX01PREUuREVGQVVMVClcbiAgICAgICAgLnNldElzQXVkaW9Pbmx5Q2FsbChcbiAgICAgICAgICBjYWxsVHlwZSA9PT0gQ29tZXRDaGF0LkNBTExfVFlQRS5BVURJTyA/IHRydWUgOiBmYWxzZVxuICAgICAgICApXG4gICAgICAgIC5idWlsZCgpO1xuXG4gICAgICBDb21ldENoYXQuc3RhcnRDYWxsKFxuICAgICAgICBjYWxsU2V0dGluZ3MsXG4gICAgICAgIGVsLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lk9uZ29pbmdDYWxsTGlzdGVuZXIoe1xuICAgICAgICAgIG9uVXNlckpvaW5lZDogKHVzZXIpID0+IHtcbiAgICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGFub3RoZXIgdXNlciBqb2lucyB0aGUgY2FsbC4gKi9cbiAgICAgICAgICAgIC8qIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2UgdG8gZGlzcGxheSBtZXNzYWdlIG9yIHBlcmZvcm0gYW55IGFjdGlvbnMgaWYgc29tZW9uZSBqb2luaW5nIHRoZSBjYWxsICovXG5cbiAgICAgICAgICAgIC8vY2FsbCBpbml0aWF0b3IgZ2V0cyB0aGUgc2FtZSBpbmZvIGluIG91dGdvaW5nY2FsbGFjY3BldGVkIGV2ZW50XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGwuY2FsbEluaXRpYXRvci51aWQgIT09IHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCAmJlxuICAgICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB1c2VyLnVpZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFya01lc3NhZ2VBc1JlYWQoY2FsbCk7XG5cbiAgICAgICAgICAgICAgY29uc3QgY2FsbE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IGNhbGwuY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgdHlwZTogY2FsbC50eXBlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogY2FsbC5hY3Rpb24sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjYWxsLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBjYWxsSW5pdGlhdG9yOiBjYWxsLmNhbGxJbml0aWF0b3IsXG4gICAgICAgICAgICAgICAgY2FsbFJlY2VpdmVyOiBjYWxsLmNhbGxSZWNlaXZlcixcbiAgICAgICAgICAgICAgICByZWNlaXZlcklkOiBjYWxsLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXJUeXBlOiBjYWxsLnJlY2VpdmVyVHlwZSxcbiAgICAgICAgICAgICAgICBzZW50QXQ6IGNhbGwuc2VudEF0LFxuICAgICAgICAgICAgICAgIHNlbmRlcjogeyAuLi51c2VyIH0sXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGVudW1zLlVTRVJfSk9JTkVEX0NBTEwsXG4gICAgICAgICAgICAgICAgcGF5TG9hZDogY2FsbE1lc3NhZ2UsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Vc2VyTGVmdDogKHVzZXIpID0+IHtcbiAgICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGFub3RoZXIgdXNlciBsZWZ0IHRoZSBjYWxsLiAqL1xuXG4gICAgICAgICAgICAvKiB0aGlzIG1ldGhvZCBjYW4gYmUgdXNlIHRvIGRpc3BsYXkgbWVzc2FnZSBvciBwZXJmb3JtIGFueSBhY3Rpb25zIGlmIHNvbWVvbmUgbGVhdmluZyB0aGUgY2FsbCAqL1xuXG4gICAgICAgICAgICAvL2NhbGwgaW5pdGlhdG9yIGdldHMgdGhlIHNhbWUgaW5mbyBpbiBvdXRnb2luZ2NhbGxhY2NwZXRlZCBldmVudFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjYWxsLmNhbGxJbml0aWF0b3IudWlkICE9PSB0aGlzLmxvZ2dlZEluVXNlci51aWQgJiZcbiAgICAgICAgICAgICAgY2FsbC5jYWxsSW5pdGlhdG9yLnVpZCAhPT0gdXNlci51aWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLm1hcmtNZXNzYWdlQXNSZWFkKGNhbGwpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBjYWxsLmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgIHR5cGU6IGNhbGwudHlwZSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGVudW1zLkxFRlQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjYWxsLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBjYWxsSW5pdGlhdG9yOiBjYWxsLmNhbGxJbml0aWF0b3IsXG4gICAgICAgICAgICAgICAgY2FsbFJlY2VpdmVyOiBjYWxsLmNhbGxSZWNlaXZlcixcbiAgICAgICAgICAgICAgICByZWNlaXZlcklkOiBjYWxsLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXJUeXBlOiBjYWxsLnJlY2VpdmVyVHlwZSxcbiAgICAgICAgICAgICAgICBzZW50QXQ6IGNhbGwuc2VudEF0LFxuICAgICAgICAgICAgICAgIHNlbmRlcjogeyAuLi51c2VyIH0sXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogZW51bXMuVVNFUl9MRUZUX0NBTEwsXG4gICAgICAgICAgICAgICAgcGF5TG9hZDogY2FsbE1lc3NhZ2UsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DYWxsRW5kZWQ6IChlbmRlZENhbGwpID0+IHtcbiAgICAgICAgICAgIC8qIE5vdGlmaWNhdGlvbiByZWNlaXZlZCBoZXJlIGlmIGN1cnJlbnQgb25nb2luZyBjYWxsIGlzIGVuZGVkLiAqL1xuXG4gICAgICAgICAgICB0aGlzLm91dGdvaW5nQ2FsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMubWFya01lc3NhZ2VBc1JlYWQoZW5kZWRDYWxsKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5DQUxMX0VOREVEX0JZX1VTRVIsXG4gICAgICAgICAgICAgIHBheUxvYWQ6IGVuZGVkQ2FsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLyogaGlkaW5nL2Nsb3NpbmcgdGhlIGNhbGwgc2NyZWVuIGNhbiBiZSBkb25lIGhlcmUuICovXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIG1lc3NhZ2VzIGFzIFJlYWRcbiAgICogQHBhcmFtIGFueSBtZXNzYWdlXG4gICAqL1xuICBtYXJrTWVzc2FnZUFzUmVhZCA9IChtZXNzYWdlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBtZXNzYWdlLnJlY2VpdmVyVHlwZTtcbiAgICAgIGNvbnN0IGlkID1cbiAgICAgICAgdHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUlxuICAgICAgICAgID8gbWVzc2FnZS5zZW5kZXIudWlkXG4gICAgICAgICAgOiBtZXNzYWdlLnJlY2VpdmVySWQ7XG5cbiAgICAgIGlmIChtZXNzYWdlLmhhc093blByb3BlcnR5KGVudW1zLlJFQURfQVQpID09PSBmYWxzZSkge1xuICAgICAgICBDb21ldENoYXQubWFya0FzUmVhZChtZXNzYWdlLmlkLCBpZCwgdHlwZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHRoZSBpbmNvbWluZyBjYWxsICwgaWYgY2FsbCBpcyBhY2NwZXRlZCBieSB0aGUgY3VycmVudCB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgYWNjZXB0Q2FsbCgpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0TWFuYWdlci5hY2NlcHRDYWxsKHRoaXMuaW5jb21pbmdDYWxsLnNlc3Npb25JZClcbiAgICAgICAgLnRoZW4oKGNhbGwpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLkFDQ0VQVEVEX0lOQ09NSU5HX0NBTEwsXG4gICAgICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gY2FsbDtcbiAgICAgICAgICB0aGlzLmVycm9yU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydENhbGwoY2FsbCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJbQ2FsbFNjcmVlbl0gYWNjZXB0Q2FsbCAtLSBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLkNBTExfRVJST1IsIHBheUxvYWQ6IGVycm9yIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyB0aGUgY2FsbCAsIG1hZGUgYnkgdGhlIGN1cnJlbnQgdXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNhbmNlbENhbGwgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucGF1c2VBdWRpbygpO1xuICAgICAgQ29tZXRDaGF0TWFuYWdlci5yZWplY3RDYWxsKFxuICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzLnNlc3Npb25JZCxcbiAgICAgICAgQ29tZXRDaGF0LkNBTExfU1RBVFVTLkNBTkNFTExFRFxuICAgICAgKVxuICAgICAgICAudGhlbigoY2FsbCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuT1VUR09JTkdfQ0FMTF9DQU5DRUxMRUQsXG4gICAgICAgICAgICBwYXlMb2FkOiBjYWxsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMub3V0Z29pbmdDYWxsU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5jYWxsSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQ0FMTF9FUlJPUiwgcGF5TG9hZDogZXJyb3IgfSk7XG4gICAgICAgICAgdGhpcy5vdXRnb2luZ0NhbGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNhbGxJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIFRoZSBjdXJyZW50IGxvZ2dlZEluIHVzZXIgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtXG4gICAqL1xuICBzZXRMb2dnZWRJblVzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdXNlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcImZhaWxlZCB0byBnZXQgdGhlIGxvZ2dlZEluIHVzZXJcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBhdWRpb1xuICAgKi9cbiAgbG9hZEF1ZGlvKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgICB0aGlzLmF1ZGlvLnNyYyA9IE9VVEdPSU5HX0NBTExfQUxFUlQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIGluIGxvb3BcbiAgICovXG4gIHBsYXlBdWRpbygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuYXVkaW8ubG9vcCA9PSBlbnVtcy5Cb29sZWFuKSB7XG4gICAgICAgIHRoaXMuYXVkaW8ubG9vcCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgZW51bXMuRU5ERUQsXG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIGF1ZGlvXG4gICAqL1xuICBwYXVzZUF1ZGlvKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=