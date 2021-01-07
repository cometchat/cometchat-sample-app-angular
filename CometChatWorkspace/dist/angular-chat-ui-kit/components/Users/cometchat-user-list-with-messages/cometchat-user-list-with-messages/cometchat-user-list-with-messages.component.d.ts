import { OnInit } from "@angular/core";
export declare class CometchatUserListWithMessagesComponent implements OnInit {
    curentItem: any;
    item: any;
    type: any;
    threadMessageView: boolean;
    threadMessageParent: any;
    threadMessageItem: any;
    threadMessageType: string;
    composedthreadmessage: any;
    viewDetailScreen: boolean;
    imageView: any;
    fullScreenViewImage: boolean;
    outgoingCall: any;
    incomingCall: any;
    loggedInUser: any;
    callMessage: {};
    messageToMarkRead: any;
    callInitialised: boolean;
    checkAnimatedState: any;
    checkIfAnimated: boolean;
    innerWidth: any;
    constructor();
    ngOnInit(): void;
    /**
     * Checks when window size is changed in realtime
     */
    onResize(): boolean;
    /**
     * Listen to the user emitted by the userList component
     * @param Event user
     */
    userClicked(user: any): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
     * @param Any parentMessage
     */
    viewMessageThread(parentMessage: any): void;
    /**
     * Close the thread window
     * @param Any parentMessage
     */
    closeThreadMessages(): void;
    /**
     * Opens the clicked Image in full screen mode
     * @param Any message
     */
    toggleImageView(message: any): void;
    /**
     * Opens User Detail Right Side bar
     * @param Any message
     */
    toggleDetailView: () => void;
    /**
     * When User Block someone
     */
    blockUser(): void;
    /**
     * When User UnBlock someone
     */
    unblockUser(): void;
    /**
     * initiates an audio call with the person you are chatting with
     */
    audioCall(): void;
    /**
     * initiates an video call with the person you are chatting with
     */
    videoCall: () => void;
    appendCallMessage(call: any): void;
    outgoingCallEnded(message: any): void;
    /**
     * ACCPETS INCOMING CALL
     */
    acceptIncomingCall(call: any): void;
    /**
     * When call is accepted and connected
     * @param
     */
    callInitiated(message: any): void;
    /**
     * IncomingCall Rejected
     */
    rejectedIncomingCall(call: any): void;
}
