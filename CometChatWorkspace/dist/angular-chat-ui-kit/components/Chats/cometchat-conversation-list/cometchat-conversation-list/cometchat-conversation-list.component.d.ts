import { OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, EventEmitter } from "@angular/core";
export declare class CometchatConversationListComponent implements OnInit, OnChanges {
    private ref;
    item: any;
    type: any;
    lastMessage: any;
    onUserClick: EventEmitter<any>;
    groupToUpdate: any;
    groupToLeave: any;
    groupToDelete: any;
    decoratorMessage: string;
    loggedInUser: any;
    conversationList: any[];
    onItemClick: any;
    selectedConversation: any;
    ConversationListManager: any;
    checkItemChange: boolean;
    conversationRequest: any;
    conversationListenerId: string;
    userListenerId: string;
    groupListenerId: string;
    callListenerId: string;
    CHATS: String;
    constructor(ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    fetchNextConversation(): any;
    /**
     * Listeners for respective functionality
     * @param callback
     */
    attachListeners(callback: any): void;
    /**
     * Listeners Removed
     */
    removeListeners(): void;
    /**
     * Fetches Conversations Details with all the users
     */
    getConversation(): void;
    /**
     * Sets User Avatar If Avatar is not present
     * @param
     */
    setAvatar(conversation: any): void;
    conversationUpdated: (key?: any, item?: any, message?: any, options?: any) => void;
    /**
     * Updates Detail when user comes online/offline
     * @param
     */
    updateUser(user: any): void;
    /**
     *
     * Gets the last message
     * @param conversation
     */
    makeLastMessage(message: any, conversation?: {}): any;
    /**
     *
     * Updates Conversations as Text/Custom Messages are received
     * @param
     *
     */
    updateConversation(message: any, notification?: boolean): void;
    /**
     *
     * Gets The Count of Unread Messages
     * @param
     */
    makeUnreadMessageCount(conversation?: any, operator?: any): number;
    /**
     * Changes detail of conversations
     * @param
     */
    makeConversation(message: any): Promise<unknown>;
    /**
     * Updates Conversation View when message is edited or deleted
     */
    conversationEditedDeleted(message: any): void;
    /**
     * If User scrolls to the bottom of the current Conversation list than fetch next items of the Conversation list and append
     * @param Event e
     */
    handleScroll(e: any): void;
    /**
     * Emits User on User Click
     * @param user
     */
    userClicked(user: any): void;
    /**
     * Plays Audio When Message is Received
     */
    playAudio(): void;
}
