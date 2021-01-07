import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverVideoMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    avatar: any;
    name: string;
    videoUrl: string;
    checkReaction: boolean;
    avatarIfGroup: boolean;
    message: any;
    constructor();
    ngOnInit(): void;
    /**
     * Gets the url of video to be displayed
     */
    getUrl(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
