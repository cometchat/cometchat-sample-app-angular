import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatIncomingCallComponent implements OnInit {
    incomingCall: any;
    callInProgress: any;
    callListenerId: string;
    actionGenerated: EventEmitter<any>;
    user: any;
    name: string;
    audio: any;
    INCOMING_AUDIO_CALL: String;
    INCOMING_VIDEO_CALL: String;
    DECLINE: String;
    ACCEPT: String;
    constructor();
    ngOnInit(): void;
    attachListeners(): void;
    removeListeners(): void;
    callScreenUpdated(key: any, call: any): void;
    /**
     * When user receives a call
     * @param
     */
    incomingCallReceived(incomingCall: any): void;
    markMessageAsRead(message: any): void;
    /**
     * When call is cancelled
     * @param
     */
    incomingCallCancelled(call: any): void;
    /**
     * Rejects call when user click reject
     */
    rejectCall(): void;
    /**
     * When user clicks on button to accept call it emits data
     */
    acceptCall(): void;
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
