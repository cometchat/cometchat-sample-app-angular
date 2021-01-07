import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverPollMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showReplyCount: boolean;
    loggedInUserUid: string;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    showToolTip: boolean;
    isPollExtensionEnabled: boolean;
    pollId: string;
    pollExtensionData: any;
    pollOptions: any[];
    totalVotes: number;
    selectedOption: any;
    checkReaction: boolean;
    constructor();
    ngOnInit(): void;
    /**
     * Displays the poll component , only if it is enabled
     * @param Event action
     */
    checkPollExtension(): void;
    /**
     * Sets Poll Data
     * @param
     */
    setPollExtensionData(): void;
    /**
     * sends the  answer selected by the user for the  the poll question
     * @param Any selectedOption
     */
    answerPollQuestion(selectedOption: any): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * dynamically applies styles based on coditions
     * @param Event action
     */
    getStyles(key?: any, data?: any): {
        background: string;
    } | {
        background?: undefined;
    };
}
