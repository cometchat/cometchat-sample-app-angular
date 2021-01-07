import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatMessageActionsComponent implements OnInit {
    MessageDetails: any;
    actionGenerated: EventEmitter<any>;
    showToolTip: boolean;
    pollView: boolean;
    loggedInUser: any;
    showOnlyReplyButton: boolean;
    receivedMessage: boolean;
    showReplyOption: boolean;
    threadView: boolean;
    reactionIcon: string;
    constructor();
    ngOnInit(): void;
    /**
     * Generates an action to reply to the current message
     *
     */
    replyToMessage(): void;
    /**
     * Generates an action to edit  the current message
     *
     */
    editMessage(): void;
    /**
     * Generates an action to Delete  the current message
     *
     */
    deleteMessage(): void;
    /**
     * Generates an action to send Regular Reactions the current message
     *
     */
    sendReaction(): void;
}
