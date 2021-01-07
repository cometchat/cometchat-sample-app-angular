import { OnInit, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
export declare class CometchatReceiverStickerMessageBubbleComponent implements OnInit, OnChanges {
    MessageDetails: any;
    showToolTip: boolean;
    loggedInUser: any;
    showReplyCount: boolean;
    actionGenerated: EventEmitter<any>;
    avatar: any;
    name: string;
    avatarIfGroup: boolean;
    stickerName: string;
    stickerUrl: string;
    checkReaction: boolean;
    messageFrom: string;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Get Sticker Details
     */
    getSticker(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
