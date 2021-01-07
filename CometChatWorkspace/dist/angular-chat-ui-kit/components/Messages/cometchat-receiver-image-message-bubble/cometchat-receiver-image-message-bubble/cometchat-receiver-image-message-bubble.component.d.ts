import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatReceiverImageMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    messageFrom: string;
    messageAssign: any;
    imageLoader: boolean;
    innerWidth: any;
    checkScreenSize: boolean;
    checkReaction: boolean;
    avatar: any;
    name: string;
    avatarIfGroup: boolean;
    message: any;
    imageUrl: string;
    constructor();
    ngOnInit(): void;
    /**
     * Checks when window size is changed in realtime
     */
    onResize(): void;
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     */
    setImage(): void;
    /**
     * If thumbnail-extension is not present then this works
     *
     */
    setMessageImageUrl: () => void;
    /**
     * Sets image url i.e medium-size or small-size
     * @param
     */
    chooseImage(thumbnailGenerationObject: any): any;
    /**
     *
     *   Emits action to view image in full screen
     */
    open(): void;
    /**
     * Set Time-Stamp for receiving image
     *
     */
    getTime(): string;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
