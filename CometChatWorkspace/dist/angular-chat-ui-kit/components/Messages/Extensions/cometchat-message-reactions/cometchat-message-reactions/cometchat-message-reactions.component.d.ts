import { OnInit, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
export declare class CometchatMessageReactionsComponent implements OnInit, OnChanges {
    MessageDetails: any;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    extensionData: any;
    reactionsName: any;
    messageReactions: any[];
    reactionIcon: string;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    getMessageReactions(reaction: any): any;
    reactToMessages(emoji?: any): void;
    triggerEmojiClick(event: any): void;
    sendReaction(): void;
}
