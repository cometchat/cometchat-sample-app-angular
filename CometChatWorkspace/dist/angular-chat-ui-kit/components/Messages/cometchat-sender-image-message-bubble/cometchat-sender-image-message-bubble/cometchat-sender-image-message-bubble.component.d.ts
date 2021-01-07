import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatSenderImageMessageBubbleComponent implements OnInit {
    MessageDetails: any;
    showToolTip: boolean;
    showReplyCount: boolean;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    innerWidth: any;
    checkScreenSize: boolean;
    checkReaction: boolean;
    timer: any;
    messageFrom: string;
    imageLoader: boolean;
    messageAssign: any;
    message: any;
    imageUrl: string;
    fullScreenView: boolean;
    constructor();
    ngOnInit(): void;
    /**
     * Checks when window size is changed in realtime
     */
    onResize(): void;
    /**
     * Checks if thumnail-generation extension is present And then Sets the image
     *
     */
    setImage(): void;
    /**
     * Sets image url ie. medium or small-size image
     * @param
     */
    chooseImage(thumbnailGenerationObject: any): any;
    /**
     * If thumnail-generation extension is not present
     * @param
     */
    setMessageImageUrl(): void;
    /**
     * Emits action to open image in full-screen view
     *
     */
    open(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
}
