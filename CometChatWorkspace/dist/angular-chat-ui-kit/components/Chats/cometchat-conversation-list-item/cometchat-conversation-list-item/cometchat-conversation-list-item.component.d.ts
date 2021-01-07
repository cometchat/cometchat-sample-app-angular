import { OnChanges, OnInit, SimpleChanges, EventEmitter } from "@angular/core";
export declare class CometchatConversationListItemComponent implements OnInit, OnChanges {
    ConversationDetails: any;
    loggedInUser: any;
    onUserClick: EventEmitter<any>;
    setAvatar: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    lastMessageName: string;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Sets Avatar According to user type ie. user or group
     * @param
     */
    getAvatar(data: any): string;
    /**
     * Gets Name of Last Conversation User
     * @param
     */
    getName(data: any): string;
    /**
     * Gets the Last Conversation with user
     * @param
     */
    getLastMessage(data: any): string | false;
    /**
     * Gets Time when the last conversation was done
     * @param
     */
    getLastMessageTimestamp(data: any): string | false;
    /**
     * Gets the MessageType i.e if text then display text else displays image,video,etc
     * @param
     */
    getMessage(lastMessage: any): any;
    /**
     * Displays if lastMessage was Video or Audio Call
     * @param
     */
    getCallMessage(lastMessage: any): any;
    /**
     * Displays lastMessage was Custom Message i.e Poll or Sticker
     * @param
     */
    getCustomMessage: (lastMessage: any) => any;
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param Any userToEmit
     */
    onUserClicked(userToEmit: any): void;
}
