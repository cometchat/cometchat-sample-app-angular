import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatSenderFileMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    checkReaction: boolean;
    actionGenerated: EventEmitter<any>;
    url: string;
    name: string;
    constructor();
    ngOnInit(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
