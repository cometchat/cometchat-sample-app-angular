import { OnInit } from "@angular/core";
export declare class CometchatGroupWithMessagesComponent implements OnInit {
    item: any;
    type: any;
    loggedInUser: any;
    threadMessageView: boolean;
    threadMessageParent: any;
    threadMessageItem: any;
    threadMessageType: string;
    composedthreadmessage: any;
    viewDetailScreen: boolean;
    imageView: any;
    fullScreenViewImage: boolean;
    groupToUpdate: {};
    groupToLeave: {};
    groupToDelete: {};
    groupMessage: any[];
    outgoingCall: any;
    incomingCall: any;
    callMessage: {};
    messageToMarkRead: any;
    callInitialised: boolean;
    checkAnimatedState: any;
    checkIfAnimated: boolean;
    innerWidth: any;
    constructor();
    ngOnInit(): void;
    /**
     * Listen to the group emitted by the groupList component
     * @param Event user
     */
    groupClicked(group: any): void;
    /**
     * Checks when window size is changed in realtime
     */
    onResize(): boolean;
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
     * updates the message list with a message notifying that , scope a some user is changed
     * @param Any members
     */
    memberScopeChanged: (members: any) => void;
    /**
     * updates the messageList with messages about the members that were added
     * @param Any members
     */
    membersAdded: (members: any) => void;
    /**
     * updates The count of  number of members present in a group based on group activities , like adding a member or kicking a member
     * @param Any members
     */
    updateMembersCount: (item: any, count: any) => void;
    /**
     * Updates Current Group Information
     * @param
     */
    groupUpdated: (message: any, key: any, group: any, options: any) => void;
    /**
     *  Unbans the user
     * @param
     */
    memberUnbanned(members: any): void;
    leaveGroup: (group: any) => void;
    /**
     * Closes group screen and all , after user has deleted the group
     * @param
     */
    deleteGroup: (group: any) => void;
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
