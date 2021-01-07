import { OnInit, EventEmitter, ElementRef, OnChanges, SimpleChanges } from "@angular/core";
export declare class CometchatMessagesComponent implements OnInit, OnChanges {
    chatWindow: ElementRef;
    item: any;
    type: any;
    composedthreadmessage: any;
    groupMessage: any;
    callMessage: any;
    actionGenerated: EventEmitter<any>;
    messageList: any[];
    scrollToBottom: true;
    messageToBeEdited: any;
    replyPreview: any;
    liveReaction: boolean;
    changeNumber: number;
    reachedTopOfConversation: boolean;
    scrollVariable: number;
    reactionName: string;
    messageToReact: any;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Updating the reply count of Thread Parent Message
     * @param Any message
     */
    updateReplyCount(messages: any): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Sets the message to which reaction has to be set
     * @param
     */
    reactToMessage(message: any): void;
    /**
     * Resets The component to initial conditions
     * @param
     */
    resetPage(): void;
    /**
     * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
     * @param Any messages
     */
    setMessages(messages: any): void;
    /**
     * prepend Fetched Messages
     * @param Any messages
     */
    prependMessages(messages: any): void;
    /**
     * append Messages that are sent
     * @param Any messages
     */
    appendMessage(messages: any): void;
    /**
     * append Poll Messages that are sent
     * @param Any messages
     */
    appendPollMessage(messages: any): void;
    /**
     * updates Poll Messages depending on answer given by user
     * @param Any messages
     */
    updatePollMessage(message: any): void;
    /**
     * update status of message ie. read or deliv
     * @param Any messages
     */
    updateMessages: (messages: any) => void;
    /**
     * Delete the message
     * @param Any message
     */
    deleteMessage: (message: any) => void;
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
     * If the message gets deleted successfull , remove the deleted message in frontend using this function
     * @param Any messages
     */
    removeMessages: (messages: any) => void;
    smartReplyPreview(messages: any): void;
    handleScroll(e: any): void;
    scrollToBottomOfChatWindow(): void;
    /**
     * Toggle Reaction -> true/false
     * @param
     */
    toggleReaction(flag: any): void;
    /**
     * Shows Reaction on receiving end
     * @param
     */
    showReaction(reaction: any): boolean;
    callUpdated(message: any): void;
    /**
     * Plays Audio When Message is Sent
     */
    playAudio(): void;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * @param
     */
    groupUpdated: (message: any, key: any, group: any, options: any) => void;
}
