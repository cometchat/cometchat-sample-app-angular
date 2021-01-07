import { OnInit, EventEmitter, OnChanges, SimpleChanges, ElementRef, OnDestroy } from "@angular/core";
export declare class CometchatOutgoingCallComponent implements OnInit, OnChanges, OnDestroy {
    callScreenFrame: ElementRef;
    item: any;
    type: any;
    incomingCall: any;
    outgoingCall: any;
    callInProgress: any;
    callListenerId: string;
    outgoingCallScreen: boolean;
    errorScreen: boolean;
    errorMessage: String;
    actionGenerated: EventEmitter<any>;
    loggedInUser: any;
    audio: any;
    CALLING: String;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Listener To Receive Call Actions in Real Time
     * @param function callback
     */
    attachListeners(): void;
    /**
     * Removes the call listeners
     */
    removeListeners(): void;
    /**
     * Updates the callScreen on basis of call actions
     */
    callScreenUpdated: (key: any, call: any) => void;
    /**
     * closes call screen when the incoming call is cancelled by the user
     * @param any call
     */
    incomingCallCancelled: (call: any) => void;
    /**
     * Starts the call , if the call is accepted by the person , to whom you are calling
     * @param any call
     */
    outgoingCallAccepted: (call: any) => void;
    /**
     * closes the call screen , if the person you are calling has rejected the call or the person is busy in some other call
     * @param any call
     */
    outgoingCallRejected: (call: any) => void;
    /**
     * Starts the call , if the outgoing call is accepted by the person , that you are calling
     * @param any call
     */
    startCall(call: any): void;
    /**
     * Marks messages as Read
     * @param any message
     */
    markMessageAsRead: (message: any) => void;
    /**
     * Accepts the incoming call , if call is accpeted by the current user
     * @param
     */
    acceptCall(): void;
    /**
     * Cancels the call , made by the current user
     * @param
     */
    cancelCall: () => void;
    /**
     * Gets The current loggedIn user information
     * @param
     */
    setLoggedInUser(): void;
    /**
     * Loads the audio
     */
    loadAudio(): void;
    /**
     * Plays Audio in loop
     */
    playAudio(): void;
    /**
     * Pauses audio
     */
    pauseAudio(): void;
}
