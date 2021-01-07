import { OnInit, EventEmitter, OnChanges, OnDestroy, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { DatePipe } from "@angular/common";
export declare class CometchatMessageListComponent implements OnInit, OnDestroy, OnChanges {
    private ref;
    datepipe: DatePipe;
    item: any;
    type: any;
    parentMessageId: any;
    messages: any[];
    reachedTopOfConversation: any[];
    actionGenerated: EventEmitter<any>;
    messagesRequest: any;
    limit: number;
    decoratorMessage: string;
    times: number;
    lastScrollTop: number;
    loggedInUser: any;
    msgListenerId: string;
    groupListenerId: string;
    callListenerId: string;
    prevUser: any;
    categories: string[];
    types: string[];
    constructor(ref: ChangeDetectorRef, datepipe: DatePipe);
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
     * @param
     */
    createMessageRequestObjectAndGetMessages(): void;
    /**
     * Listener To Receive Messages in Real Time
     * @param
     */
    addMessageEventListeners(): void;
    /**
     * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
     * @param
     */
    buildMessageRequestObject(item?: any, type?: any, parentMessageId?: any): any;
    /**
     * Gets Messages For a particular conversation bases on MessageRequestConfig
     * @param
     */
    getMessages(scrollToBottom?: boolean, newConversation?: boolean, scrollToTop?: boolean): void;
    messageUpdated(key?: any, message?: any, group?: any, options?: any): void;
    messageReceived(message: any): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    messageReadAndDelivered(message: any): void;
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param Any message
     */
    messageDeleted(message: any): void;
    /**
     * Detects if the message that was edit is you current open conversation window
     * @param Any message
     */
    messageEdited: (message: any) => void;
    /**
     * Emits an Action Indicating that a message was deleted by the user/person you are chatting with
     * @param Any message
     */
    updateEditedMessage: (message: any) => void;
    /**
     * Emits an Action Indicating that Group Data has been updated
     * @param
     */
    groupUpdated: (key: any, message: any, group: any, options: any) => void;
    customMessageReceived(message: any): boolean;
    addMetadataToCustomData: (message: any) => any;
    callUpdated(message: any): void;
    /**
     * Compares two dates and return true if they are not equal
     */
    isDateDifferent(firstDate: any, secondDate: any): boolean;
}
