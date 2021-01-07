import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverTextMessageBubbleComponent implements OnInit {
    item: any;
    type: string;
    MessageDetails: any;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    showToolTip: boolean;
    linkPreview: boolean;
    linkTitle: string;
    linkDescription: string;
    linkUrl: string;
    linkText: string;
    linkImage: string;
    checkReaction: boolean;
    constructor();
    ngOnInit(): void;
    /**
     * Check If extension has enabled LinkPreview
     */
    checkLinkPreview(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
