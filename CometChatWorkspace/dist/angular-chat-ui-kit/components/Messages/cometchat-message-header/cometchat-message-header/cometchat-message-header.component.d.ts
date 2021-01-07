import { OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { DatePipe } from "@angular/common";
export declare class CometchatMessageHeaderComponent implements OnInit, OnChanges, OnDestroy {
    datepipe: DatePipe;
    item: any;
    type: any;
    actionGenerated: EventEmitter<any>;
    userListenerId: string;
    msgListenerId: string;
    groupListenerId: string;
    status: string;
    isTyping: boolean;
    loggedInUser: any;
    checkNotBlocked: boolean;
    constructor(datepipe: DatePipe);
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Gets Information of the currently logged in user
     * @param
     */
    getLoggedInUserInfo(): void;
    attachListeners(): void;
    removeListeners(): void;
    /**
     * If user blocked then doesnot display audio and video call else displays
     */
    checkBlocked(): void;
    updateHeader(key?: any, item?: any, groupUser?: any): void;
    /**
     * Sets status of the group according to its member count
     * @param number membersCount
     */
    setGroupMemeberCountStatus(membersCount: any): void;
    /**
     * Get Last Active Date
     * @param
     */
    getDate(date: any): string;
    /**
     * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
     * @param
     */
    openUserDetail(): void;
    /**
     * Starts audio call
     */
    audioCall(): void;
    /**
     * Starts video call
     */
    videoCall(): void;
    closeChatWindow(): void;
}
