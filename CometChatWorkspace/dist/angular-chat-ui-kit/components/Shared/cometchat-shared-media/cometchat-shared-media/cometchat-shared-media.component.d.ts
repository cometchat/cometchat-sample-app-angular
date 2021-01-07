import { ElementRef, OnInit } from "@angular/core";
export declare class CometchatSharedMediaComponent implements OnInit {
    mediaWindow: ElementRef;
    type: any;
    item: any;
    messageType: string;
    messageList: any[];
    displaySharedMedia: any;
    messageContainer: any;
    mediaMessageListenerId: string;
    mediaMessageRequest: any;
    loggedInUser: any;
    checkMediaMessage: boolean;
    displayMessage: string;
    scrollVariable: number;
    scrolltoBottom: boolean;
    imageClick: boolean;
    videoClick: boolean;
    docsClick: boolean;
    SHARED_MEDIA: String;
    PHOTOS: String;
    VIDEOS: String;
    DOCUMENT: String;
    constructor();
    ngOnInit(): void;
    /**
     * Removing Listeners
     */
    ngOnDestroy(): void;
    /**
     * Builds the user request
     */
    mediaMessageRequestBuilder(item: any, type: any, messageType: any): void;
    /**
     * Listener To Receive Media Messages in Real Time
     *  @param
     */
    addMediaMessageEventListeners(callback: any): void;
    /**
     * CallBack for listeners
     */
    messageUpdated(key: any, message: any): void;
    /**
     * If User Deletes Message
     * @param
     */
    messageDeleted(deletedMessage: any): void;
    /**
     * When a message is recieved
     * @param
     */
    messageReceived(message: any): void;
    /**
     *   Gets the Media Message that are displayed
     * @param
     */
    getMessages(scrollToBottom?: boolean): void;
    /**
     * Fetches All the previous Messages
     */
    fetchPreviousMessages(): any;
    /**
     * Scrolls to Bottom of Chat Window
     */
    scrollToBottom(): void;
    /**
     * Handles the scroll
     * @param
     */
    handleScroll(e: any): void;
    /**
     * Sets the type of message i.e image,video or file
     * @param
     */
    mediaClickHandler(type: any): void;
}
