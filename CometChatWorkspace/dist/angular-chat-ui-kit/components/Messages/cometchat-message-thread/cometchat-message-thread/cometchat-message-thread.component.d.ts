import { OnInit, EventEmitter, ElementRef, OnChanges, SimpleChanges } from "@angular/core";
export declare class CometchatMessageThreadComponent implements OnInit, OnChanges {
    chatWindow: ElementRef;
    item: any;
    type: any;
    parentMessage: any;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    messageList: any[];
    replyCount: number;
    reachedTopOfConversation: boolean;
    scrollVariable: number;
    messageToBeEdited: any;
    replyPreview: any;
    imageView: any;
    fullScreenViewImage: boolean;
    messageToReact: any;
    THREAD: String;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Action is Generated to inform UserListScreen to close the thread window
     * @param
     */
    closeThread(): void;
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param Any messages
     */
    setMessages(messages: any): void;
    /**
     * append Messages that are sent
     * @param Any messages
     */
    appendMessage: (messages: any) => void;
    /**
     * prepend Fetched Messages
     * @param Any messages
     */
    prependMessages(messages: any): void;
    /**
     * update status of message ie. read or deliv
     * @param Any messages
     */
    updateMessages: (messages: any) => void;
    /**
     * Sets The message to be edited to pass it to the message composer
     * @param Any messages
     */
    editMessage(messages: any): void;
    /**
     * Render The Message List after Message has been successfullly edited
     * @param Any message
     */
    messageEdited(message: any): void;
    /**
     * Delete the message
     * @param Any message
     */
    deleteMessage: (message: any) => void;
    /**
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * @param Any messages
     */
    removeMessages: (messages: any) => void;
    smartReplyPreview(messages: any): void;
    /**
     * Opens the clicked Image in full screen mode
     * @param Any message
     */
    toggleImageView(message: any): void;
    handleScroll(e: any): void;
    /**
     * Sets the text for Reply Count
     * @param
     */
    getReplyCountText(replyCount: any): string;
    scrollToBottomOfChatWindow(): void;
    reactToMessage(message: any): void;
}
