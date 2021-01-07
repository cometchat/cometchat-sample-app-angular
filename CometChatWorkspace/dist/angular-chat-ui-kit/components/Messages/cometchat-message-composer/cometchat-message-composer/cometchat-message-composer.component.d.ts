import { OnInit, EventEmitter, OnChanges, SimpleChanges, ElementRef } from "@angular/core";
export declare class CometchatMessageComposerComponent implements OnInit, OnChanges {
    parentMessageId: any;
    item: any;
    type: any;
    messageToBeEdited: any;
    replyPreview: any;
    messageToReact: any;
    actionGenerated: EventEmitter<any>;
    imgPicker: ElementRef;
    vidPicker: ElementRef;
    audPicker: ElementRef;
    filePicker: ElementRef;
    senddisable: boolean;
    reactdisable: boolean;
    messageSending: boolean;
    messageInput: string;
    messageType: string;
    emojiViewer: boolean;
    createPoll: boolean;
    stickerViewer: boolean;
    checkAnimatedState: string;
    openEditMessageWindow: boolean;
    createPollView: boolean;
    emojiToggled: boolean;
    isTyping: any;
    userBlocked: boolean;
    PICK_YOUR_EMOJI: String;
    ATTACH_FILE: String;
    ATTACH_VIDEO: String;
    ATTACH_AUDIO: String;
    ATTACH_IMAGE: String;
    ADD_EMOJI: String;
    ENTER_YOUR_MESSAGE_HERE: String;
    EDIT_MESSAGE: String;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Check If user Blocked then disable input box
     */
    checkBlocked(): void;
    /**
     * Get Details of the User/Group , to whom , you want to send the message
     * @param
     */
    getReceiverDetails(): {
        receiverId: any;
        receiverType: any;
    };
    /**
     * Update the Message to be sent on every key press
     * @param event
     */
    changeHandler(event: any): void;
    /**
     * Send the message if user hits ENTER-key
     * @param Event e
     */
    sendMessageOnEnter(event: any): void;
    /**
     * Edit and Sent a Text message
     * @param
     */
    editMessage(): void;
    /**
     * Send Text Message
     * @param
     */
    sendTextMessage(textMsg?: any): boolean;
    toggleFilePicker(): boolean;
    getVideo(): void;
    getAudio(): void;
    getImage(): void;
    getFile(): void;
    onVideoChange(event: any): boolean;
    onAudChange(event: any): boolean;
    onImgChange(event: any): boolean;
    onFileChange(event: any): boolean;
    sendMediaMessage(messageInput: any, messageType: any): boolean;
    /**
     * Add emoji to the input when user clicks on emoji
     * @param
     */
    addEmoji($event: any): void;
    /**
     * opens the edit message window
     * @param
     */
    openEditPreview(): void;
    /**
     * Closes the edit message window
     * @param
     */
    closeEditPreview(): void;
    /**
     * opens the create poll Modal
     * @param
     */
    openCreatePollPreview(): void;
    /**
     * Closes the create poll Modal
     * @param
     */
    closeCreatePollPreview(): void;
    /**
     * Plays Audio When Message is Sent
     */
    playAudio(): void;
    /**
     *  When user starts typing
     */
    startTyping(timer?: any, metadata?: any): boolean;
    /**
     * When user stops writing
     */
    endTyping(metadata?: any): void;
    /**
     * Sends Live Reaction
     */
    sendReaction(event: any): boolean;
    /**
     * Toggles Sticker Window
     */
    toggleStickerPicker(): boolean;
    /**
     * Sends Sticker Message
     * @param
     */
    sendSticker(stickerMessage: any): void;
    /**
     * Toggle emoji window when emoji button is clicked
     */
    toggleEmoji(): boolean;
    reactToMessages(emoji: any): void;
    /**
     * To set style for emoji selector
     * @param
     */
    emojiStyle(val: any): {
        position: string;
        bottom: string;
        right: string;
        width: string;
        zIndex: string;
    };
}
