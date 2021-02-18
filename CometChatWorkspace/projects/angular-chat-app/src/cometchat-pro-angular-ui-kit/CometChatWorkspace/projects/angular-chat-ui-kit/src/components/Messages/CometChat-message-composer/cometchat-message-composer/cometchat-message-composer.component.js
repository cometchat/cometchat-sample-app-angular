/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-message-composer/cometchat-message-composer/cometchat-message-composer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { logger } from "../../../../utils/common";
import { OUTGOING_MESSAGE_SOUND } from "../../../../resources/audio/outgoingMessageSound";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
export class CometChatMessageComposerComponent {
    constructor() {
        this.parentMessageId = null;
        // can be user or a group
        this.item = null;
        this.type = null;
        this.messageToBeEdited = null;
        this.replyPreview = null;
        this.messageToReact = null;
        this.actionGenerated = new EventEmitter();
        this.enableSendButton = false;
        this.enableReaction = true;
        this.messageSending = false;
        this.messageInput = "";
        this.messageType = "";
        this.emojiViewer = false;
        this.createPoll = false;
        this.stickerViewer = false;
        this.checkAnimatedState = "normal";
        this.openEditMessageWindow = false;
        this.createPollView = false;
        this.emojiToggled = false;
        this.userBlocked = false;
        this.PICK_YOUR_EMOJI = COMETCHAT_CONSTANTS.PICK_YOUR_EMOJI;
        this.ATTACH_FILE = COMETCHAT_CONSTANTS.ATTACH_FILE;
        this.ATTACH_VIDEO = COMETCHAT_CONSTANTS.ATTACH_VIDEO;
        this.ATTACH_AUDIO = COMETCHAT_CONSTANTS.ATTACH_AUDIO;
        this.ATTACH_IMAGE = COMETCHAT_CONSTANTS.ATTACH_IMAGE;
        this.ADD_EMOJI = COMETCHAT_CONSTANTS.ADD_EMOJI;
        this.ENTER_YOUR_MESSAGE_HERE = COMETCHAT_CONSTANTS.ENTER_YOUR_MESSAGE_HERE;
        this.EDIT_MESSAGE = COMETCHAT_CONSTANTS.EDIT_MESSAGE;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                this.checkBlocked();
            }
            if (change[enums.MESSAGE_TO_BE_EDITED]) {
                //edit message only if its not null or undefined
                if (change[enums.MESSAGE_TO_BE_EDITED].currentValue) {
                    this.openEditPreview();
                }
            }
            if (change[enums.MESSAGE_TO_REACT] &&
                change[enums.MESSAGE_TO_REACT].currentValue) {
                /** @type {?} */
                const previousMessage = change[enums.MESSAGE_TO_REACT].previousValue;
                /** @type {?} */
                const currentMessage = change[enums.MESSAGE_TO_REACT].currentValue;
                if (previousMessage !== currentMessage) {
                    this.messageToReact = change[enums.MESSAGE_TO_REACT].currentValue;
                    this.toggleEmoji();
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    actionHandler(action) {
        try {
            /** @type {?} */
            let message = action.payLoad;
            // logger("Message Composer --> action generation is ", action);
            switch (action.type) {
                case enums.SEND_SMART_REPLY: {
                    this.sendTextMessage(message);
                    //closing smartReply preview window
                    this.replyPreview = null;
                    break;
                }
                case enums.CLOSE_POLL_VIEW: {
                    this.closeCreatePollPreview();
                    break;
                }
                case enums.POLL_CREATED: {
                    this.closeCreatePollPreview();
                    this.actionGenerated.emit({
                        type: enums.POLL_CREATED,
                        payLoad: [message],
                    });
                    break;
                }
                case enums.SEND_STICKER:
                    this.sendSticker(message);
                    break;
                case enums.CLOSE_STICKER:
                    this.toggleStickerPicker();
                    break;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Check If user Blocked then disable input box
     * @return {?}
     */
    checkBlocked() {
        try {
            if (this.item.blockedByMe) {
                this.userBlocked = true;
            }
            else {
                this.userBlocked = false;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get Details of the User/Group , to whom , you want to send the message
     * @return {?}
     */
    getReceiverDetails() {
        try {
            /** @type {?} */
            let receiverId;
            /** @type {?} */
            let receiverType;
            if (this.type == CometChat.RECEIVER_TYPE.USER) {
                receiverId = this.item.uid;
                receiverType = CometChat.RECEIVER_TYPE.USER;
            }
            else if (this.type == CometChat.RECEIVER_TYPE.GROUP) {
                receiverId = this.item.guid;
                receiverType = CometChat.RECEIVER_TYPE.GROUP;
            }
            return { receiverId: receiverId, receiverType: receiverType };
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Update the Message to be sent on every key press
     * @param {?} event
     * @return {?}
     */
    changeHandler(event) {
        try {
            this.startTyping();
            if (event.target.value.length > 0) {
                this.messageInput = event.target.value;
                this.enableSendButton = true;
                this.enableReaction = false;
            }
            if (event.target.value.length == 0) {
                this.enableSendButton = false;
                this.enableReaction = true;
                this.messageInput = "";
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Send the message if user hits ENTER-key
     * @param {?} event
     * @return {?}
     */
    sendMessageOnEnter(event) {
        try {
            if (event.keyCode === 13 && !event.shiftKey) {
                event.preventDefault();
                this.sendTextMessage(event.target.value);
                this.playAudio();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Edit and Send a Text message
     * @return {?}
     */
    editMessage() {
        try {
            /** @type {?} */
            const messageToBeEdited = this.messageToBeEdited;
            let { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            let messageText = this.messageInput.trim();
            /** @type {?} */
            let textMessage = new CometChat.TextMessage(receiverId, messageText, receiverType);
            textMessage.setId(messageToBeEdited.id);
            this.endTyping();
            CometChat.editMessage(textMessage)
                .then((/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                this.messageInput = "";
                this.messageSending = false;
                this.closeEditPreview();
                this.enableSendButton = false;
                this.enableReaction = true;
                this.actionGenerated.emit({
                    type: enums.MESSAGE_EDIT,
                    payLoad: message,
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.messageSending = false;
                logger("Message editing failed with error:", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Send Text Message
     * @param {?=} textMsg
     * @return {?}
     */
    sendTextMessage(textMsg = "") {
        try {
            //If user you are chatting with is blocked then return false
            if (this.userBlocked) {
                return false;
            }
            // Close Emoji Viewer if it is open while sending the message
            if (this.emojiToggled) {
                this.emojiToggled = false;
            }
            // Dont Send Blank text messages -- i.e --- messages that only contain spaces
            if (this.messageInput.trim().length == 0 && textMsg.trim().length == 0) {
                return false;
            }
            // wait for the previous message to be sent before sending the current message
            if (this.messageSending) {
                return false;
            }
            this.messageSending = true;
            // If its an Edit and Send Message Operation , use Edit Message Function
            if (this.messageToBeEdited) {
                this.editMessage();
                return false;
            }
            let { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            let messageInput;
            if (textMsg !== null) {
                messageInput = textMsg.trim();
            }
            else {
                messageInput = this.messageInput.trim();
            }
            /** @type {?} */
            let textMessage = new CometChat.TextMessage(receiverId, messageInput, receiverType);
            if (this.parentMessageId) {
                textMessage.setParentMessageId(this.parentMessageId);
            }
            // End Typing Indicator Function
            this.endTyping();
            CometChat.sendMessage(textMessage)
                .then((/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                this.messageInput = "";
                this.messageSending = false;
                // this Message Emitted will Be Appended to the existing Message List
                this.actionGenerated.emit({
                    type: enums.MESSAGE_COMPOSED,
                    payLoad: [message],
                });
                //clearing Message Input Box
                this.messageInput = "";
                // Change the send button to reaction button
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.enableReaction = true;
                    this.enableSendButton = false;
                }), 500);
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("Message sending failed with error:", error);
                this.messageSending = false;
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens drawer to send media files and sets animation state
     * @return {?}
     */
    toggleFilePicker() {
        try {
            //If user you are chatting with is blocked then return false
            if (this.userBlocked) {
                return false;
            }
            this.checkAnimatedState == "normal"
                ? (this.checkAnimatedState = "animated")
                : (this.checkAnimatedState = "normal");
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens window to select and upload video
     * @return {?}
     */
    getVideo() {
        try {
            this.videoPicker.nativeElement.click();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens window to select and upload audio
     * @return {?}
     */
    getAudio() {
        try {
            this.audioPicker.nativeElement.click();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens window to select and upload image
     * @return {?}
     */
    getImage() {
        try {
            this.imagePicker.nativeElement.click();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens window to select and upload file
     * @return {?}
     */
    getFile() {
        try {
            this.filePicker.nativeElement.click();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Loads and upload the video
     * @param {?} event
     * @return {?}
     */
    onVideoChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            /** @type {?} */
            const uploadedFile = event.target.files[0];
            /** @type {?} */
            const reader = new FileReader();
            reader.addEventListener(enums.LOAD, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.VIDEO);
            }), false);
            reader.readAsArrayBuffer(uploadedFile);
            this.videoPicker.nativeElement.value = "";
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Loads and upload the audio
     * @param {?} event
     * @return {?}
     */
    onAudChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            /** @type {?} */
            const uploadedFile = event.target.files[0];
            /** @type {?} */
            const reader = new FileReader();
            reader.addEventListener(enums.LOAD, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.AUDIO);
            }), false);
            reader.readAsArrayBuffer(uploadedFile);
            this.audioPicker.nativeElement.value = "";
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Loads and upload the image
     * @param {?} event
     * @return {?}
     */
    onImgChange(event) {
        try {
            if (!event.target.files[0]) {
                return false;
            }
            /** @type {?} */
            const uploadedFile = event.target.files[0];
            /** @type {?} */
            const reader = new FileReader();
            reader.addEventListener(enums.LOAD, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.IMAGE);
            }), false);
            reader.readAsArrayBuffer(uploadedFile);
            this.imagePicker.nativeElement.value = "";
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Loads and upload the file
     * @param {?} event
     * @return {?}
     */
    onFileChange(event) {
        try {
            if (!event.target.files["0"]) {
                return false;
            }
            /** @type {?} */
            const uploadedFile = event.target.files["0"];
            /** @type {?} */
            var reader = new FileReader();
            reader.addEventListener(enums.LOAD, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
                this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.FILE);
            }), false);
            reader.readAsArrayBuffer(uploadedFile);
            this.filePicker.nativeElement.value = "";
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sends media messages eg. image,audio,file etc.
     * @param {?} messageInput
     * @param {?} messageType
     * @return {?}
     */
    sendMediaMessage(messageInput, messageType) {
        try {
            this.toggleFilePicker();
            if (this.messageSending) {
                return false;
            }
            this.messageSending = true;
            const { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            let mediaMessage = new CometChat.MediaMessage(receiverId, messageInput, messageType, receiverType);
            if (this.parentMessageId) {
                mediaMessage.setParentMessageId(this.parentMessageId);
            }
            this.endTyping();
            CometChat.sendMessage(mediaMessage)
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                this.messageSending = false;
                this.playAudio();
                this.actionGenerated.emit({
                    type: enums.MESSAGE_COMPOSED,
                    payLoad: [response],
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.messageSending = false;
                logger("message sending failed with error Message_Composer ", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Add emoji to the input when user clicks on emoji
     * @param {?} $event
     * @return {?}
     */
    addEmoji($event) {
        try {
            if (this.messageToReact) {
                this.reactToMessages($event.emoji);
                return;
            }
            this.enableSendButton = true;
            this.enableReaction = false;
            /** @type {?} */
            let emoji = $event.emoji.native;
            this.messageInput = this.messageInput + emoji;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * opens the edit message window
     * @return {?}
     */
    openEditPreview() {
        try {
            this.openEditMessageWindow = true;
            this.messageInput = this.messageToBeEdited.data.text;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes the edit message window
     * @return {?}
     */
    closeEditPreview() {
        try {
            this.openEditMessageWindow = false;
            this.messageToBeEdited = null;
            this.messageInput = "";
            this.actionGenerated.emit({
                type: enums.CLEAR_MESSAGE_TO_BE_UPDATED,
                payLoad: null,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * opens the create poll Modal
     * @return {?}
     */
    openCreatePollPreview() {
        try {
            this.createPollView = true;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes the create poll Modal
     * @return {?}
     */
    closeCreatePollPreview() {
        try {
            this.createPollView = false;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    playAudio() {
        try {
            /** @type {?} */
            let audio = new Audio();
            audio.src = OUTGOING_MESSAGE_SOUND;
            audio.play();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     *  When user starts typing sets typing indicator
     * @param {?=} timer
     * @param {?=} metadata
     * @return {?}
     */
    startTyping(timer = null, metadata = null) {
        try {
            /** @type {?} */
            let typingInterval = timer || 5000;
            if (this.isTyping > 0) {
                return false;
            }
            let { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            let typingMetadata = metadata || undefined;
            /** @type {?} */
            let typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
            CometChat.startTyping(typingNotification);
            this.isTyping = setTimeout((/**
             * @return {?}
             */
            () => {
                this.endTyping();
            }), typingInterval);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * When user stops writing
     * @param {?=} metadata
     * @return {?}
     */
    endTyping(metadata = null) {
        try {
            let { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            let typingMetadata = metadata || undefined;
            /** @type {?} */
            let typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
            CometChat.endTyping(typingNotification);
            clearTimeout(this.isTyping);
            this.isTyping = null;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sends Live Reaction
     * @param {?} event
     * @return {?}
     */
    sendReaction(event) {
        try {
            //If user you are chatting with is blocked then return false
            if (this.userBlocked) {
                return false;
            }
            /** @type {?} */
            const typingInterval = 1000;
            /** @type {?} */
            const typingMetadata = {
                type: enums.LIVE_REACTION_KEY,
                reaction: COMETCHAT_CONSTANTS.HEART,
            };
            this.startTyping(typingInterval, typingMetadata);
            this.actionGenerated.emit({
                type: enums.SEND_REACTION,
            });
            // event.persist();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.endTyping(typingMetadata);
                this.actionGenerated.emit({
                    type: enums.STOP_REACTION,
                });
            }), typingInterval);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Toggles Sticker Window
     * @return {?}
     */
    toggleStickerPicker() {
        try {
            //If user you are chatting with is blocked then return false
            if (this.userBlocked) {
                return false;
            }
            /** @type {?} */
            const stickerViewer = this.stickerViewer;
            this.stickerViewer = !stickerViewer;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sends Sticker Message
     * @param {?} stickerMessage
     * @return {?}
     */
    sendSticker(stickerMessage) {
        try {
            this.messageSending = true;
            const { receiverId, receiverType } = this.getReceiverDetails();
            /** @type {?} */
            const customData = {
                sticker_url: stickerMessage.stickerUrl,
                sticker_name: stickerMessage.stickerName,
            };
            /** @type {?} */
            const customType = enums.CUSTOM_TYPE_STICKER;
            /** @type {?} */
            const customMessage = new CometChat.CustomMessage(receiverId, receiverType, customType, customData);
            if (this.parentMessageId) {
                customMessage.setParentMessageId(this.parentMessageId);
            }
            CometChat.sendCustomMessage(customMessage)
                .then((/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                this.messageSending = false;
                this.playAudio();
                this.actionGenerated.emit({
                    type: enums.MESSAGE_COMPOSED,
                    payLoad: [message],
                });
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.messageSending = false;
                logger("custom message sending failed with error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Toggle emoji window when emoji button is clicked
     * @return {?}
     */
    toggleEmoji() {
        try {
            //If user you are chatting with is blocked then return false
            if (this.userBlocked) {
                return false;
            }
            this.emojiToggled = !this.emojiToggled;
            if (!this.emojiToggled) {
                this.actionGenerated.emit({
                    type: enums.REACT_TO_MESSAGE,
                    payLoad: null,
                });
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * React to message with emoji
     * @param {?} emoji
     * @return {?}
     */
    reactToMessages(emoji) {
        try {
            CometChat.callExtension(enums.REACTIONS, enums.POST, enums.V1_REACT, {
                msgId: this.messageToReact.id,
                emoji: emoji.colons,
            })
                .then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response.hasOwnProperty(enums.SUCCESS) &&
                    response[enums.SUCCESS] === true) {
                    this.toggleEmoji();
                }
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                // Some error occured
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * To set style for emoji selector
     * @param {?} val
     * @return {?}
     */
    emojiStyle(val) {
        try {
            return val
                ? {
                    position: "absolute",
                    bottom: "20px",
                    right: "15px",
                    width: "285px",
                    zIndex: "1",
                }
                : {
                    position: "absolute",
                    bottom: "20px",
                    right: "45px",
                    width: "285px",
                    zIndex: "1",
                };
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessageComposerComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-composer",
                template: "<div class=\"chatComposerStyle\">\n  <div\n    class=\"editPreviewContainerStyle\"\n    *ngIf=\"openEditMessageWindow\"\n    [@slideInOut]\n  >\n    <div class=\"previewHeadingStyle\">\n      <div class=\"previewTextStyle\">{{ EDIT_MESSAGE }}</div>\n      <span class=\"previewCloseStyle\" (click)=\"closeEditPreview()\"></span>\n    </div>\n    <div>{{ this.messageToBeEdited?.data?.text }}</div>\n  </div>\n  <cometchat-smart-reply-preview\n    [replyPreview]=\"replyPreview\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-smart-reply-preview>\n  <cometchat-sticker-keyboard\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"stickerViewer\"\n  ></cometchat-sticker-keyboard>\n  <div class=\"blockedUserPopup\" *ngIf=\"userBlocked\">\n    <p>You have blocked this contact</p>\n    <p>\n      <span\n        >To start conversations, click on the icon at the top right corner and\n        unblock the user</span\n      >\n    </p>\n  </div>\n  <div class=\"composerInputStyle\">\n    <div class=\"inputInnerStyle\" tabindex=\"-1\">\n      <input\n        class=\"messageInputStyle\"\n        contenteditable=\"true\"\n        [placeholder]=\"ENTER_YOUR_MESSAGE_HERE\"\n        dir=\"ltr\"\n        (input)=\"changeHandler($event)\"\n        (blur)=\"endTyping()\"\n        (keyup)=\"sendMessageOnEnter($event)\"\n        [value]=\"messageInput\"\n        #message\n        [ngClass]=\"{\n          messageInputDisabledStyle: userBlocked\n        }\"\n      />\n      <div class=\"inputStickyStyle\">\n        <div class=\"stickyAttachmentStyle\">\n          <!--All file upload options starts here-->\n          <div class=\"attachmentIconStyle\" (click)=\"toggleFilePicker()\">\n            <span>&nbsp;</span>\n          </div>\n\n          <span\n            [title]=\"ATTACH_VIDEO\"\n            (click)=\"getVideo()\"\n            class=\"fileItemStyle\"\n            id=\"video\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"video/*\"\n              #videoPicker\n              (change)=\"onVideoChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_AUDIO\"\n            (click)=\"getAudio()\"\n            class=\"fileItemStyle\"\n            id=\"audio\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"audio/*\"\n              #audioPicker\n              (change)=\"onAudChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_IMAGE\"\n            (click)=\"getImage()\"\n            class=\"fileItemStyle\"\n            id=\"image\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"image/*\"\n              #imagePicker\n              (change)=\"onImgChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_FILE\"\n            (click)=\"getFile()\"\n            class=\"fileItemStyle\"\n            id=\"file\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"file/*\"\n              #filePicker\n              (change)=\"onFileChange($event)\"\n            />\n          </span>\n\n          <span\n            *ngIf=\"!parentMessageId\"\n            title=\"Create Poll\"\n            class=\"fileItemStyle\"\n            id=\"poll\"\n            (click)=\"openCreatePollPreview()\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n          </span>\n        </div>\n        <div class=\"stickyButtonStyle\">\n          <!-- all buttons will come here-->\n          <span\n            class=\"stickerBtnStyle\"\n            title=\"Add Sticker\"\n            (click)=\"toggleStickerPicker()\"\n            >&nbsp;</span\n          >\n          <span\n            class=\"emojiButtonStyle\"\n            [title]=\"ADD_EMOJI\"\n            (click)=\"toggleEmoji()\"\n          >\n          </span>\n          <emoji-mart\n            (emojiSelect)=\"addEmoji($event)\"\n            [title]=\"PICK_YOUR_EMOJI\"\n            emoji=\"point_up\"\n            *ngIf=\"emojiToggled\"\n            [style]=\"emojiStyle(parentMessageId)\"\n          ></emoji-mart>\n          <span\n            id=\"send\"\n            title=\"send message\"\n            *ngIf=\"enableSendButton\"\n            class=\"sendButtonStyle\"\n            (click)=\"sendTextMessage(message.value)\"\n          >\n          </span>\n          <span\n            class=\"reactionBtnStyle\"\n            id=\"reaction\"\n            *ngIf=\"enableReaction && !parentMessageId\"\n            (click)=\"sendReaction($event)\"\n          >\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- POLL component Below -->\n  <cometchat-create-poll\n    [item]=\"item\"\n    [type]=\"type\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"createPollView\"\n  ></cometchat-create-poll>\n  <!-- POLL component Below -->\n</div>\n\n<!-- oninput onblur onkeydown to be inplemented -->\n",
                animations: [
                    trigger("FadeInFadeOut", [
                        state("normal", style({
                            width: "0px",
                        })),
                        state("animated", style({
                            width: "26px",
                            margin: "auto 1px",
                        })),
                        transition("normal=>animated", animate(500)),
                    ]),
                    trigger("slideInOut", [
                        transition(":enter", [
                            style({ transform: "translateY(100%)" }),
                            animate("400ms ease-in", style({ transform: "translateY(0%)" })),
                        ]),
                    ]),
                ],
                styles: ["*{box-sizing:border-box}.chatComposerStyle{padding:14px 16px;background-color:#fff;order:3;position:relative;flex:none;min-height:105px}.composerInputStyle{display:flex;width:100%;flex-direction:row;align-items:flex-end;position:relative;z-index:2;padding:0;min-height:85px}.inputInnerStyle{flex:1 1 auto;position:relative;outline:0;border-radius:8px;border:1px solid #eaeaea;background-color:#fff;display:flex;flex-direction:column;width:100%;min-height:85px}.messageInputStyle{width:100%;font-size:15px;line-height:20px;font-weight:400;padding:15px 10px;outline:0;overflow-x:hidden;overflow-y:auto;position:relative;white-space:pre-wrap;word-wrap:break-word;z-index:1;min-height:50px;max-height:100px;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;border:none}.messageInputStyle:empty::before{content:attr(placeholder);color:#999;pointer-events:none;display:block}.messageInputDisabledStyle{pointer-events:none;opacity:.4}.inputStickyStyle{padding:7px 10px;height:35px;border-top:1px solid #eaeaea;background-color:rgba(20,20,20,.04);display:flex;justify-content:space-between}.stickyAttachmentStyle{display:flex}.attachmentIconStyle{margin:auto 0}.attachmentIconStyle>span{display:inline-block;width:20px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACkklEQVQ4EY2VS2sUQRDHncdCzqKyq/dF0CDIxmPCIhow4Ouwzw+ggggmiCQSzeLrIBgRIX6BfV5WQQ0iusTczKJI8LBzdx+i3o3jrr/a9IzjpCU21FR1Pf5d3V3VY+zQjEajYXe73dP9fv+MYRhjuMSUWwf+DqrHYrGnyWTSVXqfGb6khHK5PDUYDO5DccC+wt/CP4sZeR/yOHwX0xY0nc/nX4jNGz4gTgZgC/DrGNcty5ozTXM5lUr98pyF12o1y3XdE4h3oAMsUMhmswWxyfABS6VSQcAAWYpGo5d029kM2fw2m81Iq9V6yOw8MQse6BBQtsl5PcP4mC1cCAZuJxeLxSWyPAfoVCaTWTbkAjqdzicCN+Lx+OFEIvEzDELQJAEuWbwO2yRTx3Heo7e5qFETsFNsVS7gmg5MALDN4nM1DCZzFTOHfX+v1ztpopPS+M4lPNcFKJ0FF9IO27blpr9xbGcF8Ajoq+Hb1Eb+Q6liVzCP2XxiZPgq6MuNH2M+w0LDrOAHmQ84y6Ef/lLQ93K53BsvDp3U6nEB3DIAiOAwAnmAJvIAxxHl7IrPlkAUAijttDdoVNXvdwAZr2LfIKOjQb+QLO3ZkTOU3hyXDgg5/PeUbAVnAr4mQh1hp2onLQj2H0JaI8pqtTqJfTe1Wjfl1UDXQnFbilwXhOOVSCSirUOJoVzucsYOLfvElJ4lYAag0Xa7/UAHSId8oDTWdTaeuUWSOSQYgqV7HB6x0uXtHgf1Zi6S3UUWusVFzsuCPiCrGJVKpYDDPOl/ZMXZdDr9ErkfzAw/U85Mtqkyu8mjcEOV1R9ALyj4wKL7Aq3g7D+wzCegPegcaJrj+Ktl/Qxx8ofajvYXQFZrZF+XC9Ady2/lKUxrQgx6NgAAAABJRU5ErkJggg==) center center no-repeat;cursor:pointer}.stickyButtonStyle{display:flex;align-items:center;justify-content:space-between}.stickyButtonStyle div:not(:first-of-type){margin-left:5px}.stickyButtonStyle div:not(:last-of-type){margin-right:5px}.sendButtonStyle{width:20px;height:20px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACAUlEQVQ4EZ1VTU9TURA9c3k1IYGtQQwxMYBuXAHuSKgkbhr58D8U9/0BisqanSbKj6gmBTYGWNPiBhd8dOeiISlhU5ImpW8882yhr9xXPm570ztzzpzOnbnvPoFnzGxrUCtjQUMsEp7ifNSiVSDYFSA/MIafO2m56A4nFh8T3zQjglVVjMeRuMXAQzjkSlnZ6ERc21BVmfiuH2kXbhKzGAWekVeYXNMPbQ37vcwwElO87wRvuxaHZWZqyfwXtG1yXUgS4L9eMCN+kfJyBEpOprQkmxI14Ah/bAs+MomnxF4Ta3D+4nzo49F3MDiOF652jPkkMZKqLsDs3jv5zbkfpJBmw04SBJ+flzEXUMyOhm9UA4dZbaLe6nzYDPE3EKS5/y3GDXUHhYq3jpV52Q3Qtu29CvtwRtImi95PO4UmNkKgTjHLtN4dx/JM2bFpH9ornEV2gmltYIfBTwk02D5rzEhTsU07zSND7figbziIu1qW4gHZXxKwJ/R/9WJ0WoaVJPAe/oqzZ/MegUkhRZYK+ST0rn42L+/s1qDoYa9gUTzmzTPckyM4GhjFD2oBNz16kRA7z0/E9wn3Cd7sLkkhum34FKyT+slHvPT1EGPdVkzMuJGgLUpZLPPns63vMiKx7NUtdW0Lt75gWTMe5Fy0u44Mrgka1vMVABStm9YA3yvgH7eCrtZpy5pnAAAAAElFTkSuQmCC) no-repeat}.reactionBtnStyle{cursor:pointer;width:25px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAFAAAAAAnxZisAAACpElEQVQ4Ea1VzUsVURQ/5868UrEg/AMy0NTMRQRBJfIQszKxgh5ByzbVIooiiDbZBwUtXAWJtGgRJW0MQsxnxfhRIbgpsqcQtajoA8uITGfu3Hs6Z+zJU3pq+n4wc+fee87vd+bcM2cQ5mB0Z+0WMuERQNiNgO+UgtYAgs7K7uffM01fVlevyc9391iAo5bsOkT1gPdvlvd4Q5l2mJ68bahdG2rTwvMmB9HV1gKP0WWA3oSWzlc86rsj9qm6mkOuwgsKsMQSgeErxpEYS5oQOpSLp0u7vA9iGwmkdsWLlaGuPKXKJw3TyU4GYizEYG+OFglXAt7gOWomzoRY5TsO+Na+8pEaqpJ97/FeIuFUjX++X+C4jb+ZPBsUi3C0Wvb5OSaRZ0MBi0xY01GxvfYApuprtjkE/ZZAZXeZpkrnczF2Ek9oaKtCi2c4ogXJRUKIFyJP2zmolHLUSZeAGjWXQq4RcpHwMTVxIeCwVEuuIWfGSPGIl/9OcqohnA7QVWUCeMg1PyJ1nCsIl7ZmVIcqqSo97xen6aK8UC4SleZB5VwS7ijs8p7e9sDQLflIlos8R4FPdLs9Gb8rXJEAq5K7YurEpLHeckTEd8rYp77G483QHNXmTOJLuwZ/ukof9I0dWIqI+PjWDFqHEps870c6EzMCslCSfPYVQtzvG9MpDos5E7GZJrc9gfX3buju/5Qml3GWgCyUed7YtwmdYJHrLqqom8r6vyDfT0whsG3bqrzV+6oeD36ZazdvkCN1NYe5nq8xSRHndpYvd14Igca5dZxdn+xtm7WZMZlXQOxe18c3ukQtLLJDc0cUSPsOiJ6AMqfKugdeRItZbgsKiN/Q5s2xwqLCYw7hOWl3/FO5oj+OtVYODwdZeJe2LD+mVDxe/D/efwCuAQs2cnkFkQAAAABJRU5ErkJggg==) no-repeat}.fileItemStyle{width:26px;height:21px;cursor:pointer}.fileItemStyle>input{display:none}#video{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAACZElEQVRIDb2Wz2sTURDHu9vEGhtbQhC9SEWp9qIoIp7ESyEQyCGJBBMPHtQ/QqimqPgnSCmeikkwusk5BwVBDyL4AxEPWg96EMSoW9JiSNz1861dKLUhW9t1YDLz3ryZ78x7mzfPGIAajcZws9mcQk26rnsQuV3zfskwjC5rP+D7NBwOT+VyuY9+fI1qtRrtdrvPcRwnyFfkKxy/+XH21uA3jH4Y373IRcYnC4XCG8/uSexGrVbbk81mP2suBPC0gNHvxuPxC4lEYtFbvBFJEYPEukos8S18T6/2r1Qqx+AytolyuXyb5C4ZKKp0IhKJ7E6n0z9WO2xUJ7DivcVvPBaL7Ugmk23FADTtOM4ddmQbQwd2KTRuohyC5zcLTIwBgruIl7DZarUOaI5kLpOUhW2J4ST6fXjItu2dphQmF7Rwi8hWHCodKZVKc8S/yfA14CfY6kfov2QXhf6Irf8FvELUfYBa7PD59b6lwMABHgO4mM/nryN1HH+RzjwQAvAi23ytF7BAAwMn9ot+VQUJ3g87uMr5yo/3Qw+y8lkulyJJGL2SCAwc0E/83aZJ4J4a13oJBAbOV34WQN3lWTrmE8uyxtYmYLJI9+/IWsMmxqPyDYVC9jnINM0rDI+02+1n7MIp9EHZRar8HbyfrrTspMl/pZXzPYq/E41G5xWHS+YGBeZQo9gfop9B/0kjWxD4AyaHaIczvc6GNX1JLZUmUmShGtVjr6PJkQTUTFT1e6Q621wqlVrSY2K00+moreo61GNCXek77Jvw8/2YqNfruzKZzBcFX/4brCSgrCdhPSz+yzPqN0QhGc/YrnAKAAAAAElFTkSuQmCC) center center/25px no-repeat}#audio{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGqADAAQAAAABAAAAFAAAAADz+QhrAAABy0lEQVRIDa2VP0gCURzHvfMEoYZIiYaaI/uzFja0VEIQCIagEi01R2N70NKfsdYWFcEcGiQIIppqa2toibA1CEONO+3zDOk4fdw7uIPz++73+/6+33u/d++pFQqFeKfTOQ8EAjHQAH25NE2z0HtFbC+Xy90Y7Xb7guAYgWOw7osLIpiEgS00L8Fxg8E0g9NsNnsA+nrl8/lPDE9KpdKoIdqF2beqQ7lcnmi1Wqvwl7kXDMNYSafTtUH1aHc7ZJpmyPOaNJvNF0SHbMLDtrF0qEsz8oTdJBAMBpty6n/G84xEKa1+BO65b1Op1JuIuV2ejTCp8eEsugk7855bxwKbThGVZ09GfK4zKqKDOEqtw2CD4kNmMw8qrYnTzNWoUqmMNBqNK7HfRDFr9OEUkT3D1ajrpl1bl0wmvyC/CzZ1P8BRt1Lhh7o/F7iuRoi3o9HoHPtlnfEUX9y1gkcfRRw/4piY7MvYAolEQhxRVVtIddjVjUQiddH3O2a4w4Ivgb6d3uiGmcQs+CReVByq27qu74MxEiHVV3XjoSf2W5VD98yN62tek6kVi8U1y7LisrwzTleeM5lMxRnvPUv3Ef+8u5A2e0Q3pFUPcKRGv/QLmR04BG1lAAAAAElFTkSuQmCC) center center/25px no-repeat}#image{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAFAAAAAAnxZisAAAC1ElEQVQ4EZ2TX0jTURTH/f32q/ngTEkwCixmNRQtiL30Xi9i7kXWdAQJUVCJgY9BPkQFPVhPWS/hQ+oQJIY0o4ckgv7QXmp7MImoqIQSctoexsbW52zeH/c3tlpeuL9zzvec8z2/c+69Rl2Na3Z2dkehUOjK5XKHSJHdbRiGD8wyTfNBKBQawc6X0xnlwOLiorWysuJTJBB0b+ptEgtJCpFAJvL5/HtkOzHDFBkaGBiYlBh9WTiN6enpfgJ7cRyGvANsO3qWvcQWsgkhdLlciWAw+AXMsaampjrJ6QOcdDgwrJmZmXHkJfYL9gJENy3LSni93iW/3y9FalnPKDBUKVA6OE17E7R3vlJALZh0R9y+aDTqCQQCG3qOhTMns9TBWCzmTqVSw+BH8Xt0XxW9kR810un0Y8adJmYd+7nP57sjHQj5AT1xbW1NxnYO8qfIT7qvmk7sO83Xjj6+vLy820KR9uSm2IuicmB3w+HwRRv8T4VO7pPSJ3c4yShOluW3gMcVxhtoy2azl/lLk+I3KPxR+f4iJf8EPKZ00AzJHhUMUUHpInlc84izkJ/Bt6D7qunEFjlMkqWAkDjGpBLlwIntUjb6QbBGZf9LmrT7i7/6RqBdABL7hff09GTwP1RE6DGwdWWL5C355+bm9uqY0s1NJQGpXUA5lWxqagozyjDkp3iE/QpnrA284nnO8E0mk/nAwcqDdSy5RXWQJxHHHB7N4Np6eIgRCuQVDPkuDv4R9hHB4BCuWxRpHhwcHBNMVrEDEt+yO3G2luDSNx6Pb+MP75H8kzEkId0vnkgk0gH5K9QieSm69CX2Cjy34SuOufgBaMHxnZCX4HJLriJHwXrZxzWCH4xqjJFcB2vW8ErqVzjq7cOkSBCya4ANRLeiZ5D1lTJrxeBatQvoSYxlFXunjm1R/6xukSOfyq8dwBYN4alW4AKcTwj4vUXuDXJjbrd79A+Otjsh3VBTtQAAAABJRU5ErkJggg==) center center/25px no-repeat}#file{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAFAAAAADB1dcyAAABdUlEQVQ4Ee2UsUvDQBTGm/SCi0I2iSJadxEHF0GkQ0U6iIiUlqwi6Ko4OncRnETc04T8BaKdLZTSpZOgqzjXRduQ+IuacAa5dnD04Ljv3vu+747H3dN83y8Mh8MrTdPWoiiazEmDWMC2p+v6frVa7UqpFGqNRuOG3SriSwSPaeYL1IlPAPPMkm3b7Uw+pzmO0+eEi1qtdpZNYv5A7Jq5gdE6vBK8jszT2UyRfJKDGTwQQuxxu/swDG9d112R87HByFGpVAamae5i0uawpud5y4loLIOYXC6X3y3L2sGgy02aFH8pjisNIEdw4gJ+jmKx+GYYxjbhXhAEd5jMiiT528qVO5BPKeZWkkeYI24QnwYfKA0o3gkkG/FcYiCtC+AZpQHFe4F0LolSyK3iQuaVNUjZCvBvMOIhKWqXpv6kiK/YLaaWYwJeYgFqX8TfFHBEX4j476pvnVjnEW8y59G2eK3i8LulHfPLfrS0RJFdET4z67Q5/wMob42oqL23twAAAABJRU5ErkJggg==) 50% 100%/17px no-repeat}#poll{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAC0UlEQVQ4EZ2VTWsTURSGO5NJIAmoFYsiih9ZSAq6cFEoVARdWEMQXEQXTUojYkD9AW6ajUh/gYsgJBiTKsRClAhCBdOlqF2I3xZqFwpuQgjNR5NMxuekSWidibUeODl33nPue9+598yNMtCxZDJ5RFGUs/hpfC9wq5v7WzQMo4y/pSbfbDYXw+FwTeoV+UmlUtcJMxDukOf/tFUWyLZarejk5OSygtIxm82Wh+wnHmXVLyzQUFW1vWh3EbCWruvKnzhEQOpB8pcgHqc+7XA4bmqQ3udBpeBaKBR63iXaZnyFwA9wDUI+Uq1Wd2kQHMULAIv9yBKJxD673S4CngaDwbtWdSgugr/Dx1HsEmIxnS0w1oemXwXS3aBj+Iop2wFkPnVNFlBrtZpN7Ve4EW80GhUmrIHVN+IWY4U3N1BsdBVvqgkEAja/3z+iaZqfhI1aUezCR+mgGaK83Q/8AVtTIprMktjn89k5iAtU35IZqG1PJJ5kIC7CvhNf4h9xk1luhTR5uVy+zb4do8WG6Rg/RCX8Yb1e9/LsBT+F2k8mxg5gqVhykUikQviKK3RFk4NpobjIop8lv5X1FHNA/bpigL02IJW8vgVhj6OtmFd0OZ1OORwrMyqVyorL5bpMctmqQDA47AS5EnS+xIYGEEfNFQ7rKmAUNxnb0gCcNyU6QCwWs9NiXnjOwPerUCiUFMA9brd7AXCYugUS74llnucnJiZeMJb75DAqphhbXVKi9AA+ypw1DvYOV0Os3UfpdPoQwDSTz0M8RJHYo6WlpSmPx3OcCbOdhUkbvX2UInC5XovAbxjfy2azTzKZjL7eoFKBoX4ne+mh4BmeA5J7YY5J+3mepsXm8E3E8pXRlqu5XK4ohMIjtolYgHg8PkTxa4ZyqcirD+I36NlZ4j9br926M6TtUFfHT+Dy5he3SypcJmLUyj/BY3Lf2PdzHEReCrdrvwH3LTvlG+Q2kQAAAABJRU5ErkJggg==) 0 center/22px no-repeat}.editPreviewContainerStyle{padding:7px;background-color:#fff;border-color:#eaeaea;border-width:1px 1px 1px 5px;border-style:solid;color:rgba(20,20,20,.6);font-size:13px;position:relative}.previewHeadingStyle{display:flex;align-items:center;justify-content:space-between}.previewTextStyle{padding:5px 0}.previewCloseStyle{width:24px;height:24px;border-radius:50%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAFQAAAAAIGxIOAAACcElEQVQ4EZ2UPYgTQRiGs3MJhoAHBoNgIQd3vYiVjaV2IhHCZqMcWFgqCqcQ9U4Uf++wsFCw8DfJhuUKUUhhk0KwUlA4sFA4EJSAhAsWggSzPt+6EyZze6dxYJj53vf93vl2ftZJbdLCMFSNRmOP4zhT9Dy9C7bquu475uFGqU4SgdF2kqskeow7bA34V7Aa3I1KpbK2jreBer1eAbtLn7S5hHhNKXWiXC4vm5wyAyqcJ67R/8VQUrdRbUDenAS6DT8fYhbBI02MM8b763qeF0heZOr7/s7BYPCRODeOmaX9nslkZkql0rfo86nwkm3I6s/pvpUYheBP6M8sbrLf718QTLVarS2YupYgBfaaz/HA71jcEvAs2BsLT7HQ0Xa7nVa9Xm8/5NYEwVW5CbRTcJExSYvEc/H+X7ZzKCTf6XT2KYTTNikxggm4x9qY+SEqPBsbPkAycnMMj+k0B1QwgJGpNm42myu8ohcssBdsM0MppiCrrXsRpjMV3sTwfRAEu/j0t8RLJp8wlwehPicQEYTBdV7LeflkTvYTlcpdPAd+a6Mc8VO5XK6N6KctgryHQdXYwwy6mjZGf9/OIf5B3qvo8pO4zF4cMUUY3Cb+Ar7IODwU8F/Ep8FnGE/Shw3OpxAvLQjuFzmwwwgntIL5GT03x1hj312R9OEWZBJVwEF8YJUrAvxvI3+Bg5Sn/ufty4RVHP4BTxnl1zdWw/AhX31cJ5l7FXLSx9gKqXigBX8ZRTdvGop++Oszk7nsu9nja2AH4z00aXnjclgtCqiydSsjJEGiqRZx4QvczwOYTIHlWaDLfDWbzb4sFotdrbPH34IuDwr79+D1AAAAAElFTkSuQmCC) center center no-repeat}.emojiButtonStyle{width:24px;height:24px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACyklEQVQ4EaWVy2tTURDGc28SiCsXWklaVwVD8YEgaXDVkpXS+g55tFm6UKEIdmel2qDWnYIP6j+QpC20UayWrkJ1ZRsKRbpIXEkpSURdSmNe/ia953JtIxE8MJk5c775ztwzZ040W4uRyWQcxWLxUr1ev6xpWi8QjwEroFeQtMfjeR0IBKqG31SaaRlGKpUabDQajxEvZN/Q79Fbsozdhd2HPsg0h4zGYrF3sqaGSQhIg2wCfZfFT3a7fUzX9cVwOFxTYNGzs7P2arU6gDmJHGOD+NDQUFzWZJiEyWQyLmSQTLnd7putPmcnZOc3m806c7ncU2bXiZlQpE1C+UzOa4HFl3zCDWtgOzuRSEyR5TVIB6PR6KImBSgUChsE/vJ6vad8Pl+lHYl1XTLN5/Nr+BwU6oQO2UU+VQpwx0o2Pz9/gGPosQaLPT097eUcO5TfiBmDo6dUKl3QWZCr8YMivFUg0dvb22nUOsH7lR97X61WW6MoS8on2uFwSKW/c2xXhNAP+4fd1cT/Gf9Wd3f3T+zmCIVCZTbfxJ9XPtFG7DJmrxB6ADXvmSyqMTw8fNXpdB6xHgO4Otkcp3BRhVPa4OgUwr+OFlmrbPbEkHVDnEIo7dQpk/8ZZCgcBSGU3uyTDrASzs3NHcbntvrExu/B32X1k5zw9KNXHRhpjJjRTm8sQHulUlnh6nzEt0EGGrij5XLZj3nagrOBOcu8g8ud1uXVYJID/FAuuQIGg8EvLpfLz7yEnONKDIApUhQ/bbapcBLDBpNInpZ9tbv1XlDBEQX+F03bPmOzEe7xeVpvodXj8JydbrV7HIw384mQsfEDEhmXBExCPkejreIAxkl/nfO4HYlElrDr1kzB6TMzM2fAPcI+Ce4+md0D17w2JqEKsj6w+L4iy4DNB5Z5P3IIXx4Z5Tz/aNk9hIBtxue0/Asgq1WpphSg1bH8BqpaZxMCIb3UAAAAAElFTkSuQmCC) center no-repeat;margin-right:5px}.stickerBtnStyle{width:24px;height:24px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACxklEQVQ4EZ2US2hTURCGvTcP4yIUk0W7EKOE1IUbKfjYabEiIrgQESFNNKltspCgVTciko24UCoUoS2tpnnhpkVwU1QKdSGopUKXJbqpoG2hxqB508ZvQm64xrRqB4Y5Z+af/8yZ81C2bSCDg4PbW1paOgwGwzEgvejj7u7uuxvA626lPqoNwuGw2el0+hRFuYbuq1QqZazgyuvr60GPxxNrzNHPVf0kFovtdrlcU6qqDsOxSOw81gXpO8YW/OOJROKiPqdxXK9QyNjeCwCtEPSxvQkNnEwmZ/CZaotcYHyJeFSL6221QukXZLKVVvSEnkzAEHzB7CyVSj7GExCPx+Nxr8QapUpos9l8BI4C7nG73XONIAjeou3428rlsgc7yfajzUjVgYGBHYBvAHpFZc8ayWROZVOYislkCvh8vsLy8vKGpKrdbj8A2IkOo00FkhSBURa+SVWn+/v786lUSno50VipajQaTwEuIrNN2WpOqrwFwRtIn3PS9xwOx15y/PieQjqqbV96GMK5lM/n05sRUuX3bDZ7BswQet1sNi9YLJb3LLCHuRk7xm24rUL2g0n1cAhsKoFAIEOfr3Aw+7nkIcBz5BdRqVy4Akac0rs7VqvVhv2J/lVqPZW+PhIwLdiF+QThkFQ2jUrJB7FblSMkmiGcVldWVuYZfKSxwa2ykRcUjrW1tXlVrgCTBzi7aOrZ/yVlu+fY3XH0vtzR6mGk0+lxiF6jYxx/x7+SRqPRQ2BHKWhmdXW1+rYVLVn/OXCCvXxTk1qsmWVh+YlGiH3ljp70+/2fBVcnlAlbdrBaBGAn9iUueR2zhULhm8Tps53ndxjfZaZdYKZZ3O/1ehclLvIboThqH2wPyVeZtpMkH+wSFqO04TMyXkAf5nK5J9zNsuRp8gehFohEIhaeZQcknfj60Ao6wknOZDKZD6FQqKhh9fYXWbRNtH+OHB4AAAAASUVORK5CYII=) center no-repeat;margin-right:5px}.blockedUserPopup{background-color:#85baff;color:#fff;height:auto;width:100%;border-radius:5px;padding:5px}.blockedUserPopup p{font-size:20px;font-weight:800;text-align:center;margin:0}.blockedUserPopup span{font-size:14px;font-weight:100;text-align:center;margin:0}@media (min-width:320px) and (max-width:767px){.chatComposerStyle{z-index:1}}"]
            }] }
];
/** @nocollapse */
CometChatMessageComposerComponent.ctorParameters = () => [];
CometChatMessageComposerComponent.propDecorators = {
    parentMessageId: [{ type: Input }],
    item: [{ type: Input }],
    type: [{ type: Input }],
    messageToBeEdited: [{ type: Input }],
    replyPreview: [{ type: Input }],
    messageToReact: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    imagePicker: [{ type: ViewChild, args: ["imagePicker", { static: false },] }],
    videoPicker: [{ type: ViewChild, args: ["videoPicker", { static: false },] }],
    audioPicker: [{ type: ViewChild, args: ["audioPicker", { static: false },] }],
    filePicker: [{ type: ViewChild, args: ["filePicker", { static: false },] }]
};
if (false) {
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.parentMessageId;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.item;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.type;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.replyPreview;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.messageToReact;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.imagePicker;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.videoPicker;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.audioPicker;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.filePicker;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.enableSendButton;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.enableReaction;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.messageSending;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.messageInput;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.messageType;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.emojiViewer;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.createPoll;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.stickerViewer;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.openEditMessageWindow;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.createPollView;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.emojiToggled;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.isTyping;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.userBlocked;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.PICK_YOUR_EMOJI;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ATTACH_FILE;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ATTACH_VIDEO;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ATTACH_AUDIO;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ATTACH_IMAGE;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ADD_EMOJI;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.ENTER_YOUR_MESSAGE_HERE;
    /** @type {?} */
    CometChatMessageComposerComponent.prototype.EDIT_MESSAGE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvQ29tZXRDaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWxELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBOEJ6RSxNQUFNLE9BQU8saUNBQWlDO0lBMEM1QztRQXpDUyxvQkFBZSxHQUFHLElBQUksQ0FBQzs7UUFHdkIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU9sRSxxQkFBZ0IsR0FBRyxLQUFLLENB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SUFDekIsMkRBQXNCOztJQUN0QiwyREFBZ0M7O0lBQ2hDLHlEQUFrQjs7SUFDbEIsd0RBQWlCOztJQUNqQix3REFBb0I7O0lBQ3BCLHVEQUFtQjs7SUFDbkIsMERBQXNCOztJQUN0QiwrREFBOEI7O0lBQzlCLGtFQUF1Qzs7SUFDdkMsMkRBQWdDOztJQUVoQyx5REFBOEI7O0lBQzlCLHFEQUFjOztJQUNkLHdEQUE2Qjs7SUFFN0IsNERBQThEOztJQUM5RCx3REFBc0Q7O0lBQ3RELHlEQUF3RDs7SUFDeEQseURBQXdEOztJQUN4RCx5REFBd0Q7O0lBQ3hELHNEQUFrRDs7SUFDbEQsb0VBQThFOztJQUM5RSx5REFBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBPVVRHT0lOR19NRVNTQUdFX1NPVU5EIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9vdXRnb2luZ01lc3NhZ2VTb3VuZFwiO1xuaW1wb3J0IHsgQ09NRVRDSEFUX0NPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbWVzc2FnZS1jb21wb3Nlci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LmNzc1wiXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJGYWRlSW5GYWRlT3V0XCIsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICBcIm5vcm1hbFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgd2lkdGg6IFwiMHB4XCIsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgIFwiYW5pbWF0ZWRcIixcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHdpZHRoOiBcIjI2cHhcIixcbiAgICAgICAgICBtYXJnaW46IFwiYXV0byAxcHhcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFwibm9ybWFsPT5hbmltYXRlZFwiLCBhbmltYXRlKDUwMCkpLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoXCJzbGlkZUluT3V0XCIsIFtcbiAgICAgIHRyYW5zaXRpb24oXCI6ZW50ZXJcIiwgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKDEwMCUpXCIgfSksXG4gICAgICAgIGFuaW1hdGUoXCI0MDBtcyBlYXNlLWluXCIsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoMCUpXCIgfSkpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcGFyZW50TWVzc2FnZUlkID0gbnVsbDtcblxuICAvLyBjYW4gYmUgdXNlciBvciBhIGdyb3VwXG4gIEBJbnB1dCgpIGl0ZW0gPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gbnVsbDtcbiAgQElucHV0KCkgbWVzc2FnZVRvQmVFZGl0ZWQgPSBudWxsO1xuICBASW5wdXQoKSByZXBseVByZXZpZXcgPSBudWxsO1xuICBASW5wdXQoKSBtZXNzYWdlVG9SZWFjdCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChcImltYWdlUGlja2VyXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBpbWFnZVBpY2tlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInZpZGVvUGlja2VyXCIsIHsgc3RhdGljOiBmYWxzZSB9KSB2aWRlb1BpY2tlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImF1ZGlvUGlja2VyXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBhdWRpb1BpY2tlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImZpbGVQaWNrZXJcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGZpbGVQaWNrZXI6IEVsZW1lbnRSZWY7XG5cbiAgZW5hYmxlU2VuZEJ1dHRvbiA9IGZhbHNlO1xuICBlbmFibGVSZWFjdGlvbiA9IHRydWU7XG4gIG1lc3NhZ2VTZW5kaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIG1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gIG1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgZW1vamlWaWV3ZXIgPSBmYWxzZTtcbiAgY3JlYXRlUG9sbCA9IGZhbHNlO1xuICBzdGlja2VyVmlld2VyID0gZmFsc2U7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gIG9wZW5FZGl0TWVzc2FnZVdpbmRvdzogYm9vbGVhbiA9IGZhbHNlO1xuICBjcmVhdGVQb2xsVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGVtb2ppVG9nZ2xlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1R5cGluZzogYW55O1xuICB1c2VyQmxvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIFBJQ0tfWU9VUl9FTU9KSTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5QSUNLX1lPVVJfRU1PSkk7XG4gIEFUVEFDSF9GSUxFOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkFUVEFDSF9GSUxFO1xuICBBVFRBQ0hfVklERU86IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQVRUQUNIX1ZJREVPO1xuICBBVFRBQ0hfQVVESU86IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQVRUQUNIX0FVRElPO1xuICBBVFRBQ0hfSU1BR0U6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQVRUQUNIX0lNQUdFO1xuICBBRERfRU1PSkk6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuQUREX0VNT0pJO1xuICBFTlRFUl9ZT1VSX01FU1NBR0VfSEVSRTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5FTlRFUl9ZT1VSX01FU1NBR0VfSEVSRTtcbiAgRURJVF9NRVNTQUdFOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkVESVRfTUVTU0FHRTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuSVRFTV0pIHtcbiAgICAgICAgdGhpcy5jaGVja0Jsb2NrZWQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuTUVTU0FHRV9UT19CRV9FRElURURdKSB7XG4gICAgICAgIC8vZWRpdCBtZXNzYWdlIG9ubHkgaWYgaXRzIG5vdCBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICBpZiAoY2hhbmdlW2VudW1zLk1FU1NBR0VfVE9fQkVfRURJVEVEXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0UHJldmlldygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZVtlbnVtcy5NRVNTQUdFX1RPX1JFQUNUXSAmJlxuICAgICAgICBjaGFuZ2VbZW51bXMuTUVTU0FHRV9UT19SRUFDVF0uY3VycmVudFZhbHVlXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNNZXNzYWdlID0gY2hhbmdlW2VudW1zLk1FU1NBR0VfVE9fUkVBQ1RdLnByZXZpb3VzVmFsdWU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlID0gY2hhbmdlW2VudW1zLk1FU1NBR0VfVE9fUkVBQ1RdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgaWYgKHByZXZpb3VzTWVzc2FnZSAhPT0gY3VycmVudE1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VUb1JlYWN0ID0gY2hhbmdlW2VudW1zLk1FU1NBR0VfVE9fUkVBQ1RdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgIHRoaXMudG9nZ2xlRW1vamkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBtZXNzYWdlID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAgIC8vIGxvZ2dlcihcIk1lc3NhZ2UgQ29tcG9zZXIgLS0+IGFjdGlvbiBnZW5lcmF0aW9uIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZW51bXMuU0VORF9TTUFSVF9SRVBMWToge1xuICAgICAgICAgIHRoaXMuc2VuZFRleHRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgLy9jbG9zaW5nIHNtYXJ0UmVwbHkgcHJldmlldyB3aW5kb3dcbiAgICAgICAgICB0aGlzLnJlcGx5UHJldmlldyA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9QT0xMX1ZJRVc6IHtcbiAgICAgICAgICB0aGlzLmNsb3NlQ3JlYXRlUG9sbFByZXZpZXcoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlBPTExfQ1JFQVRFRDoge1xuICAgICAgICAgIHRoaXMuY2xvc2VDcmVhdGVQb2xsUHJldmlldygpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuUE9MTF9DUkVBVEVELFxuICAgICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBlbnVtcy5TRU5EX1NUSUNLRVI6XG4gICAgICAgICAgdGhpcy5zZW5kU3RpY2tlcihtZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBlbnVtcy5DTE9TRV9TVElDS0VSOlxuICAgICAgICAgIHRoaXMudG9nZ2xlU3RpY2tlclBpY2tlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBJZiB1c2VyIEJsb2NrZWQgdGhlbiBkaXNhYmxlIGlucHV0IGJveFxuICAgKi9cbiAgY2hlY2tCbG9ja2VkKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5pdGVtLmJsb2NrZWRCeU1lKSB7XG4gICAgICAgIHRoaXMudXNlckJsb2NrZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51c2VyQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogR2V0IERldGFpbHMgb2YgdGhlIFVzZXIvR3JvdXAgLCB0byB3aG9tICwgeW91IHdhbnQgdG8gc2VuZCB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldFJlY2VpdmVyRGV0YWlscygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlY2VpdmVySWQ7XG4gICAgICBsZXQgcmVjZWl2ZXJUeXBlO1xuXG4gICAgICBpZiAodGhpcy50eXBlID09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVIpIHtcbiAgICAgICAgcmVjZWl2ZXJJZCA9IHRoaXMuaXRlbS51aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICByZWNlaXZlcklkID0gdGhpcy5pdGVtLmd1aWQ7XG4gICAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyByZWNlaXZlcklkOiByZWNlaXZlcklkLCByZWNlaXZlclR5cGU6IHJlY2VpdmVyVHlwZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIE1lc3NhZ2UgdG8gYmUgc2VudCBvbiBldmVyeSBrZXkgcHJlc3NcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBjaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RhcnRUeXBpbmcoKTtcbiAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VJbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVTZW5kQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmFibGVSZWFjdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT0gMCkge1xuICAgICAgICB0aGlzLmVuYWJsZVNlbmRCdXR0b24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmFibGVSZWFjdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gXCJcIjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCB0aGUgbWVzc2FnZSBpZiB1c2VyIGhpdHMgRU5URVIta2V5XG4gICAqIEBwYXJhbSBFdmVudCBlXG4gICAqL1xuICBzZW5kTWVzc2FnZU9uRW50ZXIoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRUZXh0TWVzc2FnZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFZGl0IGFuZCBTZW5kIGEgVGV4dCBtZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZWRpdE1lc3NhZ2UoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VUb0JlRWRpdGVkID0gdGhpcy5tZXNzYWdlVG9CZUVkaXRlZDtcblxuICAgICAgbGV0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSB0aGlzLm1lc3NhZ2VJbnB1dC50cmltKCk7XG4gICAgICBsZXQgdGV4dE1lc3NhZ2UgPSBuZXcgQ29tZXRDaGF0LlRleHRNZXNzYWdlKFxuICAgICAgICByZWNlaXZlcklkLFxuICAgICAgICBtZXNzYWdlVGV4dCxcbiAgICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgICApO1xuICAgICAgdGV4dE1lc3NhZ2Uuc2V0SWQobWVzc2FnZVRvQmVFZGl0ZWQuaWQpO1xuXG4gICAgICB0aGlzLmVuZFR5cGluZygpO1xuXG4gICAgICBDb21ldENoYXQuZWRpdE1lc3NhZ2UodGV4dE1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlSW5wdXQgPSBcIlwiO1xuICAgICAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuY2xvc2VFZGl0UHJldmlldygpO1xuXG4gICAgICAgICAgdGhpcy5lbmFibGVTZW5kQnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5lbmFibGVSZWFjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLk1FU1NBR0VfRURJVCxcbiAgICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgbG9nZ2VyKFwiTWVzc2FnZSBlZGl0aW5nIGZhaWxlZCB3aXRoIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIFRleHQgTWVzc2FnZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNlbmRUZXh0TWVzc2FnZSh0ZXh0TXNnOiBTdHJpbmcgPSBcIlwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vSWYgdXNlciB5b3UgYXJlIGNoYXR0aW5nIHdpdGggaXMgYmxvY2tlZCB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgaWYgKHRoaXMudXNlckJsb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZSBFbW9qaSBWaWV3ZXIgaWYgaXQgaXMgb3BlbiB3aGlsZSBzZW5kaW5nIHRoZSBtZXNzYWdlXG4gICAgICBpZiAodGhpcy5lbW9qaVRvZ2dsZWQpIHtcbiAgICAgICAgdGhpcy5lbW9qaVRvZ2dsZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gRG9udCBTZW5kIEJsYW5rIHRleHQgbWVzc2FnZXMgLS0gaS5lIC0tLSBtZXNzYWdlcyB0aGF0IG9ubHkgY29udGFpbiBzcGFjZXNcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VJbnB1dC50cmltKCkubGVuZ3RoID09IDAgJiYgdGV4dE1zZy50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyB3YWl0IGZvciB0aGUgcHJldmlvdXMgbWVzc2FnZSB0byBiZSBzZW50IGJlZm9yZSBzZW5kaW5nIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VTZW5kaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IHRydWU7XG5cbiAgICAgIC8vIElmIGl0cyBhbiBFZGl0IGFuZCBTZW5kIE1lc3NhZ2UgT3BlcmF0aW9uICwgdXNlIEVkaXQgTWVzc2FnZSBGdW5jdGlvblxuICAgICAgaWYgKHRoaXMubWVzc2FnZVRvQmVFZGl0ZWQpIHtcbiAgICAgICAgdGhpcy5lZGl0TWVzc2FnZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcblxuICAgICAgbGV0IG1lc3NhZ2VJbnB1dDtcblxuICAgICAgaWYgKHRleHRNc2cgIT09IG51bGwpIHtcbiAgICAgICAgbWVzc2FnZUlucHV0ID0gdGV4dE1zZy50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlSW5wdXQgPSB0aGlzLm1lc3NhZ2VJbnB1dC50cmltKCk7XG4gICAgICB9XG5cbiAgICAgIGxldCB0ZXh0TWVzc2FnZSA9IG5ldyBDb21ldENoYXQuVGV4dE1lc3NhZ2UoXG4gICAgICAgIHJlY2VpdmVySWQsXG4gICAgICAgIG1lc3NhZ2VJbnB1dCxcbiAgICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgdGV4dE1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5kIFR5cGluZyBJbmRpY2F0b3IgRnVuY3Rpb25cbiAgICAgIHRoaXMuZW5kVHlwaW5nKCk7XG5cbiAgICAgIENvbWV0Q2hhdC5zZW5kTWVzc2FnZSh0ZXh0TWVzc2FnZSlcbiAgICAgICAgLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgLy8gdGhpcyBNZXNzYWdlIEVtaXR0ZWQgd2lsbCBCZSBBcHBlbmRlZCB0byB0aGUgZXhpc3RpbmcgTWVzc2FnZSBMaXN0XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0NPTVBPU0VELFxuICAgICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy9jbGVhcmluZyBNZXNzYWdlIElucHV0IEJveFxuICAgICAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gXCJcIjtcblxuICAgICAgICAgIC8vIENoYW5nZSB0aGUgc2VuZCBidXR0b24gdG8gcmVhY3Rpb24gYnV0dG9uXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVJlYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlU2VuZEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dnZXIoXCJNZXNzYWdlIHNlbmRpbmcgZmFpbGVkIHdpdGggZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBkcmF3ZXIgdG8gc2VuZCBtZWRpYSBmaWxlcyBhbmQgc2V0cyBhbmltYXRpb24gc3RhdGVcbiAgICovXG4gIHRvZ2dsZUZpbGVQaWNrZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vSWYgdXNlciB5b3UgYXJlIGNoYXR0aW5nIHdpdGggaXMgYmxvY2tlZCB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgaWYgKHRoaXMudXNlckJsb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPT0gXCJub3JtYWxcIlxuICAgICAgICA/ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwiYW5pbWF0ZWRcIilcbiAgICAgICAgOiAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcIm5vcm1hbFwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgd2luZG93IHRvIHNlbGVjdCBhbmQgdXBsb2FkIHZpZGVvXG4gICAqL1xuICBnZXRWaWRlbygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy52aWRlb1BpY2tlci5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHdpbmRvdyB0byBzZWxlY3QgYW5kIHVwbG9hZCBhdWRpb1xuICAgKi9cbiAgZ2V0QXVkaW8oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXVkaW9QaWNrZXIubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB3aW5kb3cgdG8gc2VsZWN0IGFuZCB1cGxvYWQgaW1hZ2VcbiAgICovXG4gIGdldEltYWdlKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmltYWdlUGlja2VyLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgd2luZG93IHRvIHNlbGVjdCBhbmQgdXBsb2FkIGZpbGVcbiAgICovXG4gIGdldEZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZmlsZVBpY2tlci5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGFuZCB1cGxvYWQgdGhlIHZpZGVvXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgb25WaWRlb0NoYW5nZShldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5maWxlc1swXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCB1cGxvYWRlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIGVudW1zLkxPQUQsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdGaWxlID0gbmV3IEZpbGUoXG4gICAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZW5kTWVkaWFNZXNzYWdlKG5ld0ZpbGUsIENvbWV0Q2hhdC5NRVNTQUdFX1RZUEUuVklERU8pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHVwbG9hZGVkRmlsZSk7XG5cbiAgICAgIHRoaXMudmlkZW9QaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGFuZCB1cGxvYWQgdGhlIGF1ZGlvXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgb25BdWRDaGFuZ2UoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFldmVudC50YXJnZXQuZmlsZXNbMF0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgdXBsb2FkZWRGaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBlbnVtcy5MT0FELFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3RmlsZSA9IG5ldyBGaWxlKFxuICAgICAgICAgICAgW3JlYWRlci5yZXN1bHRdLFxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGVcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShuZXdGaWxlLCBDb21ldENoYXQuTUVTU0FHRV9UWVBFLkFVRElPKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuXG4gICAgICB0aGlzLmF1ZGlvUGlja2VyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhbmQgdXBsb2FkIHRoZSBpbWFnZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIG9uSW1nQ2hhbmdlKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVwbG9hZGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZW51bXMuTE9BRCxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICAgIFtyZWFkZXIucmVzdWx0XSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNlbmRNZWRpYU1lc3NhZ2UobmV3RmlsZSwgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5JTUFHRSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuXG4gICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodXBsb2FkZWRGaWxlKTtcblxuICAgICAgdGhpcy5pbWFnZVBpY2tlci5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYW5kIHVwbG9hZCB0aGUgZmlsZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIG9uRmlsZUNoYW5nZShldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5maWxlc1tcIjBcIl0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGxvYWRlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbXCIwXCJdO1xuICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZW51bXMuTE9BRCxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICAgIFtyZWFkZXIucmVzdWx0XSxcbiAgICAgICAgICAgIHVwbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNlbmRNZWRpYU1lc3NhZ2UobmV3RmlsZSwgQ29tZXRDaGF0Lk1FU1NBR0VfVFlQRS5GSUxFKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuXG4gICAgICB0aGlzLmZpbGVQaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIG1lZGlhIG1lc3NhZ2VzIGVnLiBpbWFnZSxhdWRpbyxmaWxlIGV0Yy5cbiAgICogQHBhcmFtXG4gICAqL1xuICBzZW5kTWVkaWFNZXNzYWdlKG1lc3NhZ2VJbnB1dCwgbWVzc2FnZVR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50b2dnbGVGaWxlUGlja2VyKCk7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlU2VuZGluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgeyByZWNlaXZlcklkLCByZWNlaXZlclR5cGUgfSA9IHRoaXMuZ2V0UmVjZWl2ZXJEZXRhaWxzKCk7XG5cbiAgICAgIGxldCBtZWRpYU1lc3NhZ2UgPSBuZXcgQ29tZXRDaGF0Lk1lZGlhTWVzc2FnZShcbiAgICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgICAgbWVzc2FnZUlucHV0LFxuICAgICAgICBtZXNzYWdlVHlwZSxcbiAgICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgICAgbWVkaWFNZXNzYWdlLnNldFBhcmVudE1lc3NhZ2VJZCh0aGlzLnBhcmVudE1lc3NhZ2VJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW5kVHlwaW5nKCk7XG5cbiAgICAgIENvbWV0Q2hhdC5zZW5kTWVzc2FnZShtZWRpYU1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9DT01QT1NFRCxcbiAgICAgICAgICAgIHBheUxvYWQ6IFtyZXNwb25zZV0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgbG9nZ2VyKFwibWVzc2FnZSBzZW5kaW5nIGZhaWxlZCB3aXRoIGVycm9yIE1lc3NhZ2VfQ29tcG9zZXIgXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBlbW9qaSB0byB0aGUgaW5wdXQgd2hlbiB1c2VyIGNsaWNrcyBvbiBlbW9qaVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGFkZEVtb2ppKCRldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlVG9SZWFjdCkge1xuICAgICAgICB0aGlzLnJlYWN0VG9NZXNzYWdlcygkZXZlbnQuZW1vamkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmVuYWJsZVNlbmRCdXR0b24gPSB0cnVlO1xuICAgICAgdGhpcy5lbmFibGVSZWFjdGlvbiA9IGZhbHNlO1xuICAgICAgbGV0IGVtb2ppID0gJGV2ZW50LmVtb2ppLm5hdGl2ZTtcbiAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gdGhpcy5tZXNzYWdlSW5wdXQgKyBlbW9qaTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogb3BlbnMgdGhlIGVkaXQgbWVzc2FnZSB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBvcGVuRWRpdFByZXZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3BlbkVkaXRNZXNzYWdlV2luZG93ID0gdHJ1ZTtcbiAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gdGhpcy5tZXNzYWdlVG9CZUVkaXRlZC5kYXRhLnRleHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZWRpdCBtZXNzYWdlIHdpbmRvd1xuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlRWRpdFByZXZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMub3BlbkVkaXRNZXNzYWdlV2luZG93ID0gZmFsc2U7XG4gICAgICB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkID0gbnVsbDtcbiAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gXCJcIjtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5DTEVBUl9NRVNTQUdFX1RPX0JFX1VQREFURUQsXG4gICAgICAgIHBheUxvYWQ6IG51bGwsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogb3BlbnMgdGhlIGNyZWF0ZSBwb2xsIE1vZGFsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgb3BlbkNyZWF0ZVBvbGxQcmV2aWV3KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNyZWF0ZVBvbGxWaWV3ID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBjcmVhdGUgcG9sbCBNb2RhbFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlQ3JlYXRlUG9sbFByZXZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY3JlYXRlUG9sbFZpZXcgPSBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFBsYXlzIEF1ZGlvIFdoZW4gTWVzc2FnZSBpcyBTZW50XG4gICAqL1xuICBwbGF5QXVkaW8oKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgICAgYXVkaW8uc3JjID0gT1VUR09JTkdfTUVTU0FHRV9TT1VORDtcbiAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIFdoZW4gdXNlciBzdGFydHMgdHlwaW5nIHNldHMgdHlwaW5nIGluZGljYXRvclxuICAgKi9cbiAgc3RhcnRUeXBpbmcodGltZXIgPSBudWxsLCBtZXRhZGF0YSA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHR5cGluZ0ludGVydmFsID0gdGltZXIgfHwgNTAwMDtcblxuICAgICAgaWYgKHRoaXMuaXNUeXBpbmcgPiAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxldCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcbiAgICAgIGxldCB0eXBpbmdNZXRhZGF0YSA9IG1ldGFkYXRhIHx8IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IHR5cGluZ05vdGlmaWNhdGlvbiA9IG5ldyBDb21ldENoYXQuVHlwaW5nSW5kaWNhdG9yKFxuICAgICAgICByZWNlaXZlcklkLFxuICAgICAgICByZWNlaXZlclR5cGUsXG4gICAgICAgIHR5cGluZ01ldGFkYXRhXG4gICAgICApO1xuICAgICAgQ29tZXRDaGF0LnN0YXJ0VHlwaW5nKHR5cGluZ05vdGlmaWNhdGlvbik7XG5cbiAgICAgIHRoaXMuaXNUeXBpbmcgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5lbmRUeXBpbmcoKTtcbiAgICAgIH0sIHR5cGluZ0ludGVydmFsKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIHN0b3BzIHdyaXRpbmdcbiAgICovXG4gIGVuZFR5cGluZyhtZXRhZGF0YSA9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuXG4gICAgICBsZXQgdHlwaW5nTWV0YWRhdGEgPSBtZXRhZGF0YSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIGxldCB0eXBpbmdOb3RpZmljYXRpb24gPSBuZXcgQ29tZXRDaGF0LlR5cGluZ0luZGljYXRvcihcbiAgICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgICAgcmVjZWl2ZXJUeXBlLFxuICAgICAgICB0eXBpbmdNZXRhZGF0YVxuICAgICAgKTtcbiAgICAgIENvbWV0Q2hhdC5lbmRUeXBpbmcodHlwaW5nTm90aWZpY2F0aW9uKTtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaXNUeXBpbmcpO1xuICAgICAgdGhpcy5pc1R5cGluZyA9IG51bGw7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIExpdmUgUmVhY3Rpb25cbiAgICovXG4gIHNlbmRSZWFjdGlvbihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICAvL0lmIHVzZXIgeW91IGFyZSBjaGF0dGluZyB3aXRoIGlzIGJsb2NrZWQgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgIGlmICh0aGlzLnVzZXJCbG9ja2VkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGluZ0ludGVydmFsID0gMTAwMDtcblxuICAgICAgY29uc3QgdHlwaW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIHR5cGU6IGVudW1zLkxJVkVfUkVBQ1RJT05fS0VZLFxuICAgICAgICByZWFjdGlvbjogQ09NRVRDSEFUX0NPTlNUQU5UUy5IRUFSVCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc3RhcnRUeXBpbmcodHlwaW5nSW50ZXJ2YWwsIHR5cGluZ01ldGFkYXRhKTtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5TRU5EX1JFQUNUSU9OLFxuICAgICAgfSk7XG4gICAgICAvLyBldmVudC5wZXJzaXN0KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5lbmRUeXBpbmcodHlwaW5nTWV0YWRhdGEpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5TVE9QX1JFQUNUSU9OLFxuICAgICAgICB9KTtcbiAgICAgIH0sIHR5cGluZ0ludGVydmFsKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBTdGlja2VyIFdpbmRvd1xuICAgKi9cbiAgdG9nZ2xlU3RpY2tlclBpY2tlcigpIHtcbiAgICB0cnkge1xuICAgICAgLy9JZiB1c2VyIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCBpcyBibG9ja2VkIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICBpZiAodGhpcy51c2VyQmxvY2tlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBzdGlja2VyVmlld2VyID0gdGhpcy5zdGlja2VyVmlld2VyO1xuICAgICAgdGhpcy5zdGlja2VyVmlld2VyID0gIXN0aWNrZXJWaWV3ZXI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIFN0aWNrZXIgTWVzc2FnZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIHNlbmRTdGlja2VyKHN0aWNrZXJNZXNzYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgeyByZWNlaXZlcklkLCByZWNlaXZlclR5cGUgfSA9IHRoaXMuZ2V0UmVjZWl2ZXJEZXRhaWxzKCk7XG4gICAgICBjb25zdCBjdXN0b21EYXRhID0ge1xuICAgICAgICBzdGlja2VyX3VybDogc3RpY2tlck1lc3NhZ2Uuc3RpY2tlclVybCxcbiAgICAgICAgc3RpY2tlcl9uYW1lOiBzdGlja2VyTWVzc2FnZS5zdGlja2VyTmFtZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjdXN0b21UeXBlID0gZW51bXMuQ1VTVE9NX1RZUEVfU1RJQ0tFUjtcbiAgICAgIGNvbnN0IGN1c3RvbU1lc3NhZ2UgPSBuZXcgQ29tZXRDaGF0LkN1c3RvbU1lc3NhZ2UoXG4gICAgICAgIHJlY2VpdmVySWQsXG4gICAgICAgIHJlY2VpdmVyVHlwZSxcbiAgICAgICAgY3VzdG9tVHlwZSxcbiAgICAgICAgY3VzdG9tRGF0YVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMucGFyZW50TWVzc2FnZUlkKSB7XG4gICAgICAgIGN1c3RvbU1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICAgIH1cblxuICAgICAgQ29tZXRDaGF0LnNlbmRDdXN0b21NZXNzYWdlKGN1c3RvbU1lc3NhZ2UpXG4gICAgICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucGxheUF1ZGlvKCk7XG4gICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0NPTVBPU0VELFxuICAgICAgICAgICAgcGF5TG9hZDogW21lc3NhZ2VdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGxvZ2dlcihcImN1c3RvbSBtZXNzYWdlIHNlbmRpbmcgZmFpbGVkIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGVtb2ppIHdpbmRvdyB3aGVuIGVtb2ppIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAqL1xuICB0b2dnbGVFbW9qaSgpIHtcbiAgICB0cnkge1xuICAgICAgLy9JZiB1c2VyIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCBpcyBibG9ja2VkIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICBpZiAodGhpcy51c2VyQmxvY2tlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmVtb2ppVG9nZ2xlZCA9ICF0aGlzLmVtb2ppVG9nZ2xlZDtcbiAgICAgIGlmICghdGhpcy5lbW9qaVRvZ2dsZWQpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuUkVBQ1RfVE9fTUVTU0FHRSxcbiAgICAgICAgICBwYXlMb2FkOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhY3QgdG8gbWVzc2FnZSB3aXRoIGVtb2ppXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgcmVhY3RUb01lc3NhZ2VzKGVtb2ppKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKGVudW1zLlJFQUNUSU9OUywgZW51bXMuUE9TVCwgZW51bXMuVjFfUkVBQ1QsIHtcbiAgICAgICAgbXNnSWQ6IHRoaXMubWVzc2FnZVRvUmVhY3QuaWQsXG4gICAgICAgIGVtb2ppOiBlbW9qaS5jb2xvbnMsXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZXNwb25zZS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5TVUNDRVNTKSAmJlxuICAgICAgICAgICAgcmVzcG9uc2VbZW51bXMuU1VDQ0VTU10gPT09IHRydWVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRW1vamkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAvLyBTb21lIGVycm9yIG9jY3VyZWRcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvIHNldCBzdHlsZSBmb3IgZW1vamkgc2VsZWN0b3JcbiAgICogQHBhcmFtXG4gICAqL1xuICBlbW9qaVN0eWxlKHZhbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdmFsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIGJvdHRvbTogXCIyMHB4XCIsXG4gICAgICAgICAgICByaWdodDogXCIxNXB4XCIsXG4gICAgICAgICAgICB3aWR0aDogXCIyODVweFwiLFxuICAgICAgICAgICAgekluZGV4OiBcIjFcIixcbiAgICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIGJvdHRvbTogXCIyMHB4XCIsXG4gICAgICAgICAgICByaWdodDogXCI0NXB4XCIsXG4gICAgICAgICAgICB3aWR0aDogXCIyODVweFwiLFxuICAgICAgICAgICAgekluZGV4OiBcIjFcIixcbiAgICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19