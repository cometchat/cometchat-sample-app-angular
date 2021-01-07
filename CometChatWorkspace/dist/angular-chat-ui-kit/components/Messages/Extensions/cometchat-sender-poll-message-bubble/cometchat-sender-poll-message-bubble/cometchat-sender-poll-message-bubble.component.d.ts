import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatSenderPollMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    showToolTip: boolean;
    isPollExtensionEnabled: boolean;
    checkReaction: boolean;
    pollExtensionData: any;
    pollOptions: any[];
    totalVotes: number;
    constructor();
    ngOnInit(): void;
    /**
     * Displays the poll component , only if it is enabled
     * @param
     */
    checkPollExtension(): void;
    /**
     * Sets Poll Data
     * @param
     */
    setPollExtensionData(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
