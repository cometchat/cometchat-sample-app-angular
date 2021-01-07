import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverFileMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    name: string;
    url: string;
    avatar: any;
    avatarName: string;
    avatarIfGroup: boolean;
    checkReaction: boolean;
    showReplyCount: boolean;
    showToolTip: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
