import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverAudioMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    audioUrl: string;
    avatar: any;
    name: string;
    avatarIfGroup: boolean;
    checkReaction: boolean;
    constructor();
    ngOnInit(): void;
    /**
     * Gets the url of audio to be displayed
     */
    getUrl(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
