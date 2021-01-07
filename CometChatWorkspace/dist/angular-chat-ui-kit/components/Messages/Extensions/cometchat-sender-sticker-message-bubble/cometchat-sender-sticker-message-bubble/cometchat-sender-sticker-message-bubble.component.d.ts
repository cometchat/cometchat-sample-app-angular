import { OnInit, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
export declare class CometchatSenderStickerMessageBubbleComponent implements OnInit, OnChanges {
    MessageDetails: any;
    showToolTip: boolean;
    loggedInUser: any;
    showReplyCount: boolean;
    actionGenerated: EventEmitter<any>;
    messageFrom: string;
    message: any;
    stickerUrl: string;
    stickerName: string;
    checkReaction: boolean;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    actionHandler(action: any): void;
}
