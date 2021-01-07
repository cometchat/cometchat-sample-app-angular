import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatSenderAudioMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    checkReaction: boolean;
    audioUrl: string;
    message: any;
    actionGenerated: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    getUrl(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
