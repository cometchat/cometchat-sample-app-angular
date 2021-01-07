/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-composer/cometchat-message-composer/cometchat-message-composer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
// import {SEND_SMART_REPLY,SEND_STICKER,CLOSE_STICKER} from '../../utils/enums'
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { OUTGOING_MESSAGE_SOUND } from "../../../resources/audio/outgoingMessageSound";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatMessageComposerComponent = /** @class */ (function () {
    function CometchatMessageComposerComponent() {
        this.parentMessageId = null;
        // can be user or a group
        this.item = null;
        this.type = null;
        this.messageToBeEdited = null;
        this.replyPreview = null;
        this.messageToReact = null;
        this.actionGenerated = new EventEmitter();
        this.senddisable = false;
        this.reactdisable = true;
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
        this.PICK_YOUR_EMOJI = STRING_MESSAGES.PICK_YOUR_EMOJI;
        this.ATTACH_FILE = STRING_MESSAGES.ATTACH_FILE;
        this.ATTACH_VIDEO = STRING_MESSAGES.ATTACH_VIDEO;
        this.ATTACH_AUDIO = STRING_MESSAGES.ATTACH_AUDIO;
        this.ATTACH_IMAGE = STRING_MESSAGES.ATTACH_IMAGE;
        this.ADD_EMOJI = STRING_MESSAGES.ADD_EMOJI;
        this.ENTER_YOUR_MESSAGE_HERE = STRING_MESSAGES.ENTER_YOUR_MESSAGE_HERE;
        this.EDIT_MESSAGE = STRING_MESSAGES.EDIT_MESSAGE;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["item"]) {
            this.checkBlocked();
        }
        if (change["messageToBeEdited"]) {
            //edit message only if its not null or undefined
            if (change["messageToBeEdited"].currentValue) {
                this.openEditPreview();
            }
        }
        if (change["messageToReact"] && change["messageToReact"].currentValue) {
            /** @type {?} */
            var previousMessage = change["messageToReact"].previousValue;
            /** @type {?} */
            var currentMessage = change["messageToReact"].currentValue;
            if (previousMessage !== currentMessage) {
                this.messageToReact = change["messageToReact"].currentValue;
                this.toggleEmoji();
            }
        }
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var message = action.payLoad;
        // console.log("Message Composer --> action generation is ", action);
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
                //temporary check; custom data listener working for sender too
                // if (this.type === "user") {
                //   this.actionGenerated.emit({ type :  "pollCreated", payLoad : [message]});
                // }
                break;
            }
            case enums.SEND_STICKER:
                this.sendSticker(message);
                break;
            case enums.CLOSE_STICKER:
                this.toggleStickerPicker();
                break;
        }
    };
    /**
     * Check If user Blocked then disable input box
     */
    /**
     * Check If user Blocked then disable input box
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.checkBlocked = /**
     * Check If user Blocked then disable input box
     * @return {?}
     */
    function () {
        if (this.item.blockedByMe) {
            this.userBlocked = true;
        }
        else {
            this.userBlocked = false;
        }
    };
    /**
     * Get Details of the User/Group , to whom , you want to send the message
     * @param
     */
    /**
     * Get Details of the User/Group , to whom , you want to send the message
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.getReceiverDetails = /**
     * Get Details of the User/Group , to whom , you want to send the message
     * @return {?}
     */
    function () {
        /** @type {?} */
        var receiverId;
        /** @type {?} */
        var receiverType;
        if (this.type == "user") {
            receiverId = this.item.uid;
            receiverType = CometChat.RECEIVER_TYPE.USER;
        }
        else if (this.type == "group") {
            receiverId = this.item.guid;
            receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }
        return { receiverId: receiverId, receiverType: receiverType };
    };
    /**
     * Update the Message to be sent on every key press
     * @param event
     */
    /**
     * Update the Message to be sent on every key press
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.changeHandler = /**
     * Update the Message to be sent on every key press
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.startTyping();
        if (event.target.value.length > 0) {
            this.messageInput = event.target.value;
            this.senddisable = true;
            this.reactdisable = false;
        }
        if (event.target.value.length == 0) {
            this.senddisable = false;
            this.reactdisable = true;
            this.messageInput = "";
        }
    };
    /**
     * Send the message if user hits ENTER-key
     * @param Event e
     */
    /**
     * Send the message if user hits ENTER-key
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.sendMessageOnEnter = /**
     * Send the message if user hits ENTER-key
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.sendTextMessage();
            this.playAudio();
        }
    };
    /**
     * Edit and Sent a Text message
     * @param
     */
    /**
     * Edit and Sent a Text message
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.editMessage = /**
     * Edit and Sent a Text message
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var messageToBeEdited = this.messageToBeEdited;
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var messageText = this.messageInput.trim();
        /** @type {?} */
        var textMessage = new CometChat.TextMessage(receiverId, messageText, receiverType);
        textMessage.setId(messageToBeEdited.id);
        this.endTyping();
        CometChat.editMessage(textMessage)
            .then((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            _this.messageInput = "";
            _this.messageSending = false;
            //this.playAudio();
            _this.closeEditPreview();
            _this.actionGenerated.emit({
                type: enums.MESSAGE_EDIT,
                payLoad: message,
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.messageSending = false;
            console.log("Message editing failed with error:", error);
        }));
    };
    /**
     * Send Text Message
     * @param
     */
    /**
     * Send Text Message
     * @param {?=} textMsg
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.sendTextMessage = /**
     * Send Text Message
     * @param {?=} textMsg
     * @return {?}
     */
    function (textMsg) {
        var _this = this;
        if (textMsg === void 0) { textMsg = null; }
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
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var messageInput;
        if (textMsg !== null) {
            messageInput = textMsg.trim();
        }
        else {
            messageInput = this.messageInput.trim();
        }
        /** @type {?} */
        var textMessage = new CometChat.TextMessage(receiverId, messageInput, receiverType);
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
        function (message) {
            _this.messageInput = "";
            _this.messageSending = false;
            // Clear Message Input Box Logic
            // this.messageInputRef.current.textContent = "";
            // Play Message Sent Successfully Audio
            // this.playAudio();
            // this Message Emitted will Be Appended to the existing Message List
            _this.actionGenerated.emit({
                type: enums.MESSAGE_COMPOSED,
                payLoad: [message],
            });
            //clearing Message Input Box
            _this.messageInput = "";
            // Change the send button to reaction button
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.reactdisable = true;
                _this.senddisable = false;
            }), 500);
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Message sending failed with error:", error);
            _this.messageSending = false;
        }));
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.toggleFilePicker = /**
     * @return {?}
     */
    function () {
        //If user you are chatting with is blocked then return false
        if (this.userBlocked) {
            return false;
        }
        this.checkAnimatedState == "normal"
            ? (this.checkAnimatedState = "animated")
            : (this.checkAnimatedState = "normal");
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.getVideo = /**
     * @return {?}
     */
    function () {
        this.vidPicker.nativeElement.click();
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.getAudio = /**
     * @return {?}
     */
    function () {
        this.audPicker.nativeElement.click();
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.getImage = /**
     * @return {?}
     */
    function () {
        this.imgPicker.nativeElement.click();
    };
    /**
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.getFile = /**
     * @return {?}
     */
    function () {
        this.filePicker.nativeElement.click();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.onVideoChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!event.target.files[0]) {
            return false;
        }
        /** @type {?} */
        var uploadedFile = event.target.files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.addEventListener("load", (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newFile = new File([reader.result], uploadedFile.name, uploadedFile);
            _this.sendMediaMessage(newFile, "video");
        }), false);
        reader.readAsArrayBuffer(uploadedFile);
        this.vidPicker.nativeElement.value = "";
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.onAudChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!event.target.files[0]) {
            return false;
        }
        /** @type {?} */
        var uploadedFile = event.target.files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.addEventListener("load", (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newFile = new File([reader.result], uploadedFile.name, uploadedFile);
            _this.sendMediaMessage(newFile, "audio");
        }), false);
        reader.readAsArrayBuffer(uploadedFile);
        this.audPicker.nativeElement.value = "";
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.onImgChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!event.target.files[0]) {
            return false;
        }
        /** @type {?} */
        var uploadedFile = event.target.files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.addEventListener("load", (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newFile = new File([reader.result], uploadedFile.name, uploadedFile);
            _this.sendMediaMessage(newFile, "image");
        }), false);
        reader.readAsArrayBuffer(uploadedFile);
        this.imgPicker.nativeElement.value = "";
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.onFileChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!event.target.files["0"]) {
            return false;
        }
        /** @type {?} */
        var uploadedFile = event.target.files["0"];
        /** @type {?} */
        var reader = new FileReader();
        reader.addEventListener("load", (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newFile = new File([reader.result], uploadedFile.name, uploadedFile);
            _this.sendMediaMessage(newFile, "file");
        }), false);
        reader.readAsArrayBuffer(uploadedFile);
        this.filePicker.nativeElement.value = "";
    };
    /**
     * @param {?} messageInput
     * @param {?} messageType
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.sendMediaMessage = /**
     * @param {?} messageInput
     * @param {?} messageType
     * @return {?}
     */
    function (messageInput, messageType) {
        var _this = this;
        this.toggleFilePicker();
        if (this.messageSending) {
            return false;
        }
        this.messageSending = true;
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var mediaMessage = new CometChat.MediaMessage(receiverId, messageInput, messageType, receiverType);
        if (this.parentMessageId) {
            mediaMessage.setParentMessageId(this.parentMessageId);
        }
        this.endTyping();
        CometChat.sendMessage(mediaMessage)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.messageSending = false;
            _this.playAudio();
            _this.actionGenerated.emit({
                type: enums.MESSAGE_COMPOSED,
                payLoad: [response],
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.messageSending = false;
            console.log("message sending failed with error Message_Composer ", error);
        }));
    };
    /**
     * Add emoji to the input when user clicks on emoji
     * @param
     */
    /**
     * Add emoji to the input when user clicks on emoji
     * @param {?} $event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.addEmoji = /**
     * Add emoji to the input when user clicks on emoji
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.messageToReact) {
            this.reactToMessages($event.emoji);
            return;
        }
        this.senddisable = true;
        this.reactdisable = false;
        /** @type {?} */
        var emoji = $event.emoji.native;
        this.messageInput = this.messageInput + emoji;
    };
    /**
     * opens the edit message window
     * @param
     */
    /**
     * opens the edit message window
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.openEditPreview = /**
     * opens the edit message window
     * @return {?}
     */
    function () {
        this.openEditMessageWindow = true;
        this.messageInput = this.messageToBeEdited.data.text;
    };
    /**
     * Closes the edit message window
     * @param
     */
    /**
     * Closes the edit message window
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.closeEditPreview = /**
     * Closes the edit message window
     * @return {?}
     */
    function () {
        this.openEditMessageWindow = false;
        this.messageToBeEdited = null;
        this.messageInput = "";
        this.actionGenerated.emit({
            type: enums.CLEAR_MESSAGE_TO_BE_UPDATED,
            payLoad: null,
        });
    };
    /**
     * opens the create poll Modal
     * @param
     */
    /**
     * opens the create poll Modal
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.openCreatePollPreview = /**
     * opens the create poll Modal
     * @return {?}
     */
    function () {
        this.createPollView = true;
    };
    /**
     * Closes the create poll Modal
     * @param
     */
    /**
     * Closes the create poll Modal
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.closeCreatePollPreview = /**
     * Closes the create poll Modal
     * @return {?}
     */
    function () {
        this.createPollView = false;
    };
    /**
     * Plays Audio When Message is Sent
     */
    /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.playAudio = /**
     * Plays Audio When Message is Sent
     * @return {?}
     */
    function () {
        /** @type {?} */
        var audio = new Audio();
        audio.src = OUTGOING_MESSAGE_SOUND;
        audio.play();
    };
    /**
     *  When user starts typing
     */
    /**
     *  When user starts typing
     * @param {?=} timer
     * @param {?=} metadata
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.startTyping = /**
     *  When user starts typing
     * @param {?=} timer
     * @param {?=} metadata
     * @return {?}
     */
    function (timer, metadata) {
        var _this = this;
        if (timer === void 0) { timer = null; }
        if (metadata === void 0) { metadata = null; }
        /** @type {?} */
        var typingInterval = timer || 5000;
        if (this.isTyping > 0) {
            return false;
        }
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var typingMetadata = metadata || undefined;
        /** @type {?} */
        var typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
        CometChat.startTyping(typingNotification);
        this.isTyping = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.endTyping();
        }), typingInterval);
    };
    /**
     * When user stops writing
     */
    /**
     * When user stops writing
     * @param {?=} metadata
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.endTyping = /**
     * When user stops writing
     * @param {?=} metadata
     * @return {?}
     */
    function (metadata) {
        if (metadata === void 0) { metadata = null; }
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var typingMetadata = metadata || undefined;
        /** @type {?} */
        var typingNotification = new CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
        CometChat.endTyping(typingNotification);
        clearTimeout(this.isTyping);
        this.isTyping = null;
    };
    /**
     * Sends Live Reaction
     */
    /**
     * Sends Live Reaction
     * @param {?} event
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.sendReaction = /**
     * Sends Live Reaction
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        //If user you are chatting with is blocked then return false
        if (this.userBlocked) {
            return false;
        }
        /** @type {?} */
        var typingInterval = 1000;
        /** @type {?} */
        var typingMetadata = {
            type: enums.LIVE_REACTION_KEY,
            reaction: "heart",
        };
        this.startTyping(typingInterval, typingMetadata);
        this.actionGenerated.emit({
            type: enums.SEND_REACTION,
        });
        // event.persist();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.endTyping(typingMetadata);
            _this.actionGenerated.emit({
                type: enums.STOP_REACTION,
            });
        }), typingInterval);
    };
    /**
     * Toggles Sticker Window
     */
    /**
     * Toggles Sticker Window
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.toggleStickerPicker = /**
     * Toggles Sticker Window
     * @return {?}
     */
    function () {
        //If user you are chatting with is blocked then return false
        if (this.userBlocked) {
            return false;
        }
        /** @type {?} */
        var stickerViewer = this.stickerViewer;
        this.stickerViewer = !stickerViewer;
    };
    /**
     * Sends Sticker Message
     * @param
     */
    /**
     * Sends Sticker Message
     * @param {?} stickerMessage
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.sendSticker = /**
     * Sends Sticker Message
     * @param {?} stickerMessage
     * @return {?}
     */
    function (stickerMessage) {
        var _this = this;
        this.messageSending = true;
        var _a = this.getReceiverDetails(), receiverId = _a.receiverId, receiverType = _a.receiverType;
        /** @type {?} */
        var customData = {
            sticker_url: stickerMessage.stickerUrl,
            sticker_name: stickerMessage.stickerName,
        };
        /** @type {?} */
        var customType = enums.CUSTOM_TYPE_STICKER;
        /** @type {?} */
        var customMessage = new CometChat.CustomMessage(receiverId, receiverType, customType, customData);
        if (this.parentMessageId) {
            customMessage.setParentMessageId(this.parentMessageId);
        }
        CometChat.sendCustomMessage(customMessage)
            .then((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            _this.messageSending = false;
            _this.playAudio();
            _this.actionGenerated.emit({
                type: enums.MESSAGE_COMPOSED,
                payLoad: [message],
            });
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.messageSending = false;
            console.log("custom message sending failed with error", error);
        }));
    };
    /**
     * Toggle emoji window when emoji button is clicked
     */
    /**
     * Toggle emoji window when emoji button is clicked
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.toggleEmoji = /**
     * Toggle emoji window when emoji button is clicked
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} emoji
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.reactToMessages = /**
     * @param {?} emoji
     * @return {?}
     */
    function (emoji) {
        var _this = this;
        CometChat.callExtension(STRING_MESSAGES.REACTIONS, STRING_MESSAGES.POST, STRING_MESSAGES.V1_REACT, {
            msgId: this.messageToReact.id,
            emoji: emoji.colons,
        })
            .then((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (response.hasOwnProperty("success") &&
                response["success"] === true) {
                _this.toggleEmoji();
            }
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            // Some error occured
        }));
    };
    /**
     * To set style for emoji selector
     * @param
     */
    /**
     * To set style for emoji selector
     * @param {?} val
     * @return {?}
     */
    CometchatMessageComposerComponent.prototype.emojiStyle = /**
     * To set style for emoji selector
     * @param {?} val
     * @return {?}
     */
    function (val) {
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
    };
    CometchatMessageComposerComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-message-composer",
                    template: "<div class=\"chatComposerStyle\">\n  <div\n    class=\"editPreviewContainerStyle\"\n    *ngIf=\"openEditMessageWindow\"\n    [@slideInOut]\n  >\n    <div class=\"previewHeadingStyle\">\n      <div class=\"previewTextStyle\">{{ EDIT_MESSAGE }}</div>\n      <span class=\"previewCloseStyle\" (click)=\"closeEditPreview()\"></span>\n    </div>\n    <div>{{ this.messageToBeEdited?.data?.text }}</div>\n  </div>\n  <cometchat-smart-reply-preview\n    [replyPreview]=\"replyPreview\"\n    (actionGenerated)=\"actionHandler($event)\"\n  ></cometchat-smart-reply-preview>\n  <cometchat-sticker-keyboard\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"stickerViewer\"\n  ></cometchat-sticker-keyboard>\n  <div class=\"blockedUserPopup\" *ngIf=\"userBlocked\">\n    <p>You have blocked this contact</p>\n    <p>\n      <span\n        >To start conversations, click on the icon at the top right corner and\n        unblock the user</span\n      >\n    </p>\n  </div>\n  <div class=\"composerInputStyle\">\n    <div class=\"inputInnerStyle\" tabindex=\"-1\">\n      <input\n        class=\"messageInputStyle\"\n        contenteditable=\"true\"\n        [placeholder]=\"ENTER_YOUR_MESSAGE_HERE\"\n        dir=\"ltr\"\n        (input)=\"changeHandler($event)\"\n        (blur)=\"endTyping()\"\n        (keyup)=\"sendMessageOnEnter($event)\"\n        [value]=\"messageInput\"\n        #message\n        [ngClass]=\"{\n          messageInputDisabledStyle: userBlocked\n        }\"\n      />\n      <div class=\"inputStickyStyle\">\n        <div class=\"stickyAttachmentStyle\">\n          <!--All file upload options starts here-->\n          <div class=\"attachmentIconStyle\" (click)=\"toggleFilePicker()\">\n            <span>&nbsp;</span>\n          </div>\n\n          <span\n            [title]=\"ATTACH_VIDEO\"\n            (click)=\"getVideo()\"\n            class=\"fileItemStyle\"\n            id=\"video\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"video/*\"\n              #vidPicker\n              (change)=\"onVideoChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_AUDIO\"\n            (click)=\"getAudio()\"\n            class=\"fileItemStyle\"\n            id=\"audio\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"audio/*\"\n              #audPicker\n              (change)=\"onAudChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_IMAGE\"\n            (click)=\"getImage()\"\n            class=\"fileItemStyle\"\n            id=\"image\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"image/*\"\n              #imgPicker\n              (change)=\"onImgChange($event)\"\n            />\n          </span>\n          <span\n            [title]=\"ATTACH_FILE\"\n            (click)=\"getFile()\"\n            class=\"fileItemStyle\"\n            id=\"file\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n            <input\n              type=\"file\"\n              accept=\"file/*\"\n              #filePicker\n              (change)=\"onFileChange($event)\"\n            />\n          </span>\n\n          <span\n            *ngIf=\"!parentMessageId\"\n            title=\"Create Poll\"\n            class=\"fileItemStyle\"\n            id=\"poll\"\n            (click)=\"openCreatePollPreview()\"\n            [@FadeInFadeOut]=\"checkAnimatedState\"\n          >\n          </span>\n        </div>\n        <div class=\"stickyButtonStyle\">\n          <!-- all buttons will come here-->\n          <span\n            class=\"stickerBtnStyle\"\n            title=\"Add Sticker\"\n            (click)=\"toggleStickerPicker()\"\n            >&nbsp;</span\n          >\n          <span\n            class=\"emojiButtonStyle\"\n            [title]=\"ADD_EMOJI\"\n            (click)=\"toggleEmoji()\"\n          >\n          </span>\n          <emoji-mart\n            (emojiSelect)=\"addEmoji($event)\"\n            [title]=\"PICK_YOUR_EMOJI\"\n            emoji=\"point_up\"\n            *ngIf=\"emojiToggled\"\n            [style]=\"emojiStyle(parentMessageId)\"\n          ></emoji-mart>\n          <span\n            id=\"send\"\n            title=\"send message\"\n            *ngIf=\"senddisable\"\n            class=\"sendButtonStyle\"\n            (click)=\"sendTextMessage()\"\n          >\n          </span>\n          <span\n            class=\"reactionBtnStyle\"\n            id=\"reaction\"\n            *ngIf=\"reactdisable && !parentMessageId\"\n            (click)=\"sendReaction($event)\"\n          >\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- POLL component Below -->\n  <cometchat-create-poll\n    [item]=\"item\"\n    [type]=\"type\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"createPollView\"\n  ></cometchat-create-poll>\n  <!-- POLL component Below -->\n</div>\n\n<!-- oninput onblur onkeydown to be inplemented -->\n",
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
    CometchatMessageComposerComponent.ctorParameters = function () { return []; };
    CometchatMessageComposerComponent.propDecorators = {
        parentMessageId: [{ type: Input }],
        item: [{ type: Input }],
        type: [{ type: Input }],
        messageToBeEdited: [{ type: Input }],
        replyPreview: [{ type: Input }],
        messageToReact: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        imgPicker: [{ type: ViewChild, args: ["imgPicker", null,] }],
        vidPicker: [{ type: ViewChild, args: ["vidPicker", null,] }],
        audPicker: [{ type: ViewChild, args: ["audPicker", null,] }],
        filePicker: [{ type: ViewChild, args: ["filePicker", null,] }]
    };
    return CometchatMessageComposerComponent;
}());
export { CometchatMessageComposerComponent };
if (false) {
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.parentMessageId;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.item;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.type;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.messageToBeEdited;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.replyPreview;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.messageToReact;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.imgPicker;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.vidPicker;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.audPicker;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.filePicker;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.senddisable;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.reactdisable;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.messageSending;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.messageInput;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.messageType;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.emojiViewer;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.createPoll;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.stickerViewer;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.checkAnimatedState;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.openEditMessageWindow;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.createPollView;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.emojiToggled;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.isTyping;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.userBlocked;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.PICK_YOUR_EMOJI;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ATTACH_FILE;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ATTACH_VIDEO;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ATTACH_AUDIO;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ATTACH_IMAGE;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ADD_EMOJI;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.ENTER_YOUR_MESSAGE_HERE;
    /** @type {?} */
    CometchatMessageComposerComponent.prototype.EDIT_MESSAGE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDOztBQUk5QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRTtJQXVFRTtRQXpDUyxvQkFBZSxHQUFHLElBQUksQ0FBQzs7UUFHdkIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFckIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU9sRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxp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R0wsS0FBSzt1QkFDTCxLQUFLO29DQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUVMLE1BQU07NEJBRU4sU0FBUyxTQUFDLFdBQVcsRUFBRSxJQUFJOzRCQUMzQixTQUFTLFNBQUMsV0FBVyxFQUFFLElBQUk7NEJBQzNCLFNBQVMsU0FBQyxXQUFXLEVBQUUsSUFBSTs2QkFDM0IsU0FBUyxTQUFDLFlBQVksRUFBRSxJQUFJOztJQThxQi9CLHdDQUFDO0NBQUEsQUExdEJELElBMHRCQztTQTdyQlksaUNBQWlDOzs7SUFDNUMsNERBQWdDOztJQUdoQyxpREFBcUI7O0lBQ3JCLGlEQUFxQjs7SUFDckIsOERBQWtDOztJQUNsQyx5REFBNkI7O0lBQzdCLDJEQUErQjs7SUFFL0IsNERBQWtFOztJQUVsRSxzREFBb0Q7O0lBQ3BELHNEQUFvRDs7SUFDcEQsc0RBQW9EOztJQUNwRCx1REFBc0Q7O0lBRXRELHdEQUFvQjs7SUFDcEIseURBQW9COztJQUNwQiwyREFBZ0M7O0lBQ2hDLHlEQUFrQjs7SUFDbEIsd0RBQWlCOztJQUNqQix3REFBb0I7O0lBQ3BCLHVEQUFtQjs7SUFDbkIsMERBQXNCOztJQUN0QiwrREFBOEI7O0lBQzlCLGtFQUF1Qzs7SUFDdkMsMkRBQWdDOztJQUVoQyx5REFBOEI7O0lBQzlCLHFEQUFjOztJQUNkLHdEQUE2Qjs7SUFFN0IsNERBQTBEOztJQUMxRCx3REFBa0Q7O0lBQ2xELHlEQUFvRDs7SUFDcEQseURBQW9EOztJQUNwRCx5REFBb0Q7O0lBQ3BELHNEQUE4Qzs7SUFDOUMsb0VBQTBFOztJQUMxRSx5REFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcblxuLy8gaW1wb3J0IHtTRU5EX1NNQVJUX1JFUExZLFNFTkRfU1RJQ0tFUixDTE9TRV9TVElDS0VSfSBmcm9tICcuLi8uLi91dGlscy9lbnVtcydcblxuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuXG5pbXBvcnQgeyBPVVRHT0lOR19NRVNTQUdFX1NPVU5EIH0gZnJvbSBcIi4uLy4uLy4uL3Jlc291cmNlcy9hdWRpby9vdXRnb2luZ01lc3NhZ2VTb3VuZFwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbWVzc2FnZS1jb21wb3NlclwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1tZXNzYWdlLWNvbXBvc2VyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZS1jb21wb3Nlci5jb21wb25lbnQuY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcIkZhZGVJbkZhZGVPdXRcIiwgW1xuICAgICAgc3RhdGUoXG4gICAgICAgIFwibm9ybWFsXCIsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB3aWR0aDogXCIwcHhcIixcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgXCJhbmltYXRlZFwiLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgd2lkdGg6IFwiMjZweFwiLFxuICAgICAgICAgIG1hcmdpbjogXCJhdXRvIDFweFwiLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXCJub3JtYWw9PmFuaW1hdGVkXCIsIGFuaW1hdGUoNTAwKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcihcInNsaWRlSW5PdXRcIiwgW1xuICAgICAgdHJhbnNpdGlvbihcIjplbnRlclwiLCBbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoMTAwJSlcIiB9KSxcbiAgICAgICAgYW5pbWF0ZShcIjQwMG1zIGVhc2UtaW5cIiwgc3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgwJSlcIiB9KSksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TWVzc2FnZUNvbXBvc2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwYXJlbnRNZXNzYWdlSWQgPSBudWxsO1xuXG4gIC8vIGNhbiBiZSB1c2VyIG9yIGEgZ3JvdXBcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBtZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlcGx5UHJldmlldyA9IG51bGw7XG4gIEBJbnB1dCgpIG1lc3NhZ2VUb1JlYWN0ID0gbnVsbDtcblxuICBAT3V0cHV0KCkgYWN0aW9uR2VuZXJhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFwiaW1nUGlja2VyXCIsIG51bGwpIGltZ1BpY2tlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInZpZFBpY2tlclwiLCBudWxsKSB2aWRQaWNrZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJhdWRQaWNrZXJcIiwgbnVsbCkgYXVkUGlja2VyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiZmlsZVBpY2tlclwiLCBudWxsKSBmaWxlUGlja2VyOiBFbGVtZW50UmVmO1xuXG4gIHNlbmRkaXNhYmxlID0gZmFsc2U7XG4gIHJlYWN0ZGlzYWJsZSA9IHRydWU7XG4gIG1lc3NhZ2VTZW5kaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIG1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gIG1lc3NhZ2VUeXBlID0gXCJcIjtcbiAgZW1vamlWaWV3ZXIgPSBmYWxzZTtcbiAgY3JlYXRlUG9sbCA9IGZhbHNlO1xuICBzdGlja2VyVmlld2VyID0gZmFsc2U7XG4gIGNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCI7XG4gIG9wZW5FZGl0TWVzc2FnZVdpbmRvdzogYm9vbGVhbiA9IGZhbHNlO1xuICBjcmVhdGVQb2xsVmlldzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGVtb2ppVG9nZ2xlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1R5cGluZzogYW55O1xuICB1c2VyQmxvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIFBJQ0tfWU9VUl9FTU9KSTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBJQ0tfWU9VUl9FTU9KSTtcbiAgQVRUQUNIX0ZJTEU6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5BVFRBQ0hfRklMRTtcbiAgQVRUQUNIX1ZJREVPOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQVRUQUNIX1ZJREVPO1xuICBBVFRBQ0hfQVVESU86IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5BVFRBQ0hfQVVESU87XG4gIEFUVEFDSF9JTUFHRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkFUVEFDSF9JTUFHRTtcbiAgQUREX0VNT0pJOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQUREX0VNT0pJO1xuICBFTlRFUl9ZT1VSX01FU1NBR0VfSEVSRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkVOVEVSX1lPVVJfTUVTU0FHRV9IRVJFO1xuICBFRElUX01FU1NBR0U6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5FRElUX01FU1NBR0U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdKSB7XG4gICAgICB0aGlzLmNoZWNrQmxvY2tlZCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlW1wibWVzc2FnZVRvQmVFZGl0ZWRcIl0pIHtcbiAgICAgIC8vZWRpdCBtZXNzYWdlIG9ubHkgaWYgaXRzIG5vdCBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgaWYgKGNoYW5nZVtcIm1lc3NhZ2VUb0JlRWRpdGVkXCJdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLm9wZW5FZGl0UHJldmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlW1wibWVzc2FnZVRvUmVhY3RcIl0gJiYgY2hhbmdlW1wibWVzc2FnZVRvUmVhY3RcIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01lc3NhZ2UgPSBjaGFuZ2VbXCJtZXNzYWdlVG9SZWFjdFwiXS5wcmV2aW91c1ZhbHVlO1xuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2UgPSBjaGFuZ2VbXCJtZXNzYWdlVG9SZWFjdFwiXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAocHJldmlvdXNNZXNzYWdlICE9PSBjdXJyZW50TWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VUb1JlYWN0ID0gY2hhbmdlW1wibWVzc2FnZVRvUmVhY3RcIl0uY3VycmVudFZhbHVlO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlRW1vamkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYWxsIHRoZSBhY3Rpb25zIGVtaXR0ZWQgYnkgdGhlIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBtYWtlIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gRXZlbnQgYWN0aW9uXG4gICAqL1xuICBhY3Rpb25IYW5kbGVyKGFjdGlvbikge1xuICAgIGxldCBtZXNzYWdlID0gYWN0aW9uLnBheUxvYWQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgQ29tcG9zZXIgLS0+IGFjdGlvbiBnZW5lcmF0aW9uIGlzIFwiLCBhY3Rpb24pO1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5TRU5EX1NNQVJUX1JFUExZOiB7XG4gICAgICAgIHRoaXMuc2VuZFRleHRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgIC8vY2xvc2luZyBzbWFydFJlcGx5IHByZXZpZXcgd2luZG93XG4gICAgICAgIHRoaXMucmVwbHlQcmV2aWV3ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLkNMT1NFX1BPTExfVklFVzoge1xuICAgICAgICB0aGlzLmNsb3NlQ3JlYXRlUG9sbFByZXZpZXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIGVudW1zLlBPTExfQ1JFQVRFRDoge1xuICAgICAgICB0aGlzLmNsb3NlQ3JlYXRlUG9sbFByZXZpZXcoKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuUE9MTF9DUkVBVEVELFxuICAgICAgICAgIHBheUxvYWQ6IFttZXNzYWdlXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy90ZW1wb3JhcnkgY2hlY2s7IGN1c3RvbSBkYXRhIGxpc3RlbmVyIHdvcmtpbmcgZm9yIHNlbmRlciB0b29cbiAgICAgICAgLy8gaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgICAgLy8gICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZSA6ICBcInBvbGxDcmVhdGVkXCIsIHBheUxvYWQgOiBbbWVzc2FnZV19KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5TRU5EX1NUSUNLRVI6XG4gICAgICAgIHRoaXMuc2VuZFN0aWNrZXIobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5DTE9TRV9TVElDS0VSOlxuICAgICAgICB0aGlzLnRvZ2dsZVN0aWNrZXJQaWNrZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIElmIHVzZXIgQmxvY2tlZCB0aGVuIGRpc2FibGUgaW5wdXQgYm94XG4gICAqL1xuICBjaGVja0Jsb2NrZWQoKSB7XG4gICAgaWYgKHRoaXMuaXRlbS5ibG9ja2VkQnlNZSkge1xuICAgICAgdGhpcy51c2VyQmxvY2tlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXNlckJsb2NrZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEdldCBEZXRhaWxzIG9mIHRoZSBVc2VyL0dyb3VwICwgdG8gd2hvbSAsIHlvdSB3YW50IHRvIHNlbmQgdGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRSZWNlaXZlckRldGFpbHMoKSB7XG4gICAgbGV0IHJlY2VpdmVySWQ7XG4gICAgbGV0IHJlY2VpdmVyVHlwZTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT0gXCJ1c2VyXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0udWlkO1xuICAgICAgcmVjZWl2ZXJUeXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBcImdyb3VwXCIpIHtcbiAgICAgIHJlY2VpdmVySWQgPSB0aGlzLml0ZW0uZ3VpZDtcbiAgICAgIHJlY2VpdmVyVHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJlY2VpdmVySWQ6IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZTogcmVjZWl2ZXJUeXBlIH07XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBNZXNzYWdlIHRvIGJlIHNlbnQgb24gZXZlcnkga2V5IHByZXNzXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgY2hhbmdlSGFuZGxlcihldmVudCkge1xuICAgIHRoaXMuc3RhcnRUeXBpbmcoKTtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubWVzc2FnZUlucHV0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgdGhpcy5zZW5kZGlzYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnJlYWN0ZGlzYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnNlbmRkaXNhYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLnJlYWN0ZGlzYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLm1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIG1lc3NhZ2UgaWYgdXNlciBoaXRzIEVOVEVSLWtleVxuICAgKiBAcGFyYW0gRXZlbnQgZVxuICAgKi9cbiAgc2VuZE1lc3NhZ2VPbkVudGVyKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZFRleHRNZXNzYWdlKCk7XG4gICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFZGl0IGFuZCBTZW50IGEgVGV4dCBtZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZWRpdE1lc3NhZ2UoKSB7XG4gICAgY29uc3QgbWVzc2FnZVRvQmVFZGl0ZWQgPSB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkO1xuXG4gICAgbGV0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuXG4gICAgbGV0IG1lc3NhZ2VUZXh0ID0gdGhpcy5tZXNzYWdlSW5wdXQudHJpbSgpO1xuICAgIGxldCB0ZXh0TWVzc2FnZSA9IG5ldyBDb21ldENoYXQuVGV4dE1lc3NhZ2UoXG4gICAgICByZWNlaXZlcklkLFxuICAgICAgbWVzc2FnZVRleHQsXG4gICAgICByZWNlaXZlclR5cGVcbiAgICApO1xuICAgIHRleHRNZXNzYWdlLnNldElkKG1lc3NhZ2VUb0JlRWRpdGVkLmlkKTtcblxuICAgIHRoaXMuZW5kVHlwaW5nKCk7XG5cbiAgICBDb21ldENoYXQuZWRpdE1lc3NhZ2UodGV4dE1lc3NhZ2UpXG4gICAgICAudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvL3RoaXMucGxheUF1ZGlvKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZUVkaXRQcmV2aWV3KCk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9FRElULFxuICAgICAgICAgIHBheUxvYWQ6IG1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgZWRpdGluZyBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBUZXh0IE1lc3NhZ2VcbiAgICogQHBhcmFtXG4gICAqL1xuICBzZW5kVGV4dE1lc3NhZ2UodGV4dE1zZyA9IG51bGwpIHtcbiAgICAvL0lmIHVzZXIgeW91IGFyZSBjaGF0dGluZyB3aXRoIGlzIGJsb2NrZWQgdGhlbiByZXR1cm4gZmFsc2VcbiAgICBpZiAodGhpcy51c2VyQmxvY2tlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENsb3NlIEVtb2ppIFZpZXdlciBpZiBpdCBpcyBvcGVuIHdoaWxlIHNlbmRpbmcgdGhlIG1lc3NhZ2VcbiAgICBpZiAodGhpcy5lbW9qaVRvZ2dsZWQpIHtcbiAgICAgIHRoaXMuZW1vamlUb2dnbGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRG9udCBTZW5kIEJsYW5rIHRleHQgbWVzc2FnZXMgLS0gaS5lIC0tLSBtZXNzYWdlcyB0aGF0IG9ubHkgY29udGFpbiBzcGFjZXNcbiAgICBpZiAodGhpcy5tZXNzYWdlSW5wdXQudHJpbSgpLmxlbmd0aCA9PSAwICYmIHRleHRNc2cudHJpbSgpLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIHByZXZpb3VzIG1lc3NhZ2UgdG8gYmUgc2VudCBiZWZvcmUgc2VuZGluZyB0aGUgY3VycmVudCBtZXNzYWdlXG4gICAgaWYgKHRoaXMubWVzc2FnZVNlbmRpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gdHJ1ZTtcblxuICAgIC8vIElmIGl0cyBhbiBFZGl0IGFuZCBTZW5kIE1lc3NhZ2UgT3BlcmF0aW9uICwgdXNlIEVkaXQgTWVzc2FnZSBGdW5jdGlvblxuICAgIGlmICh0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkKSB7XG4gICAgICB0aGlzLmVkaXRNZXNzYWdlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuXG4gICAgbGV0IG1lc3NhZ2VJbnB1dDtcblxuICAgIGlmICh0ZXh0TXNnICE9PSBudWxsKSB7XG4gICAgICBtZXNzYWdlSW5wdXQgPSB0ZXh0TXNnLnRyaW0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZUlucHV0ID0gdGhpcy5tZXNzYWdlSW5wdXQudHJpbSgpO1xuICAgIH1cblxuICAgIGxldCB0ZXh0TWVzc2FnZSA9IG5ldyBDb21ldENoYXQuVGV4dE1lc3NhZ2UoXG4gICAgICByZWNlaXZlcklkLFxuICAgICAgbWVzc2FnZUlucHV0LFxuICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgdGV4dE1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICB9XG5cbiAgICAvLyBFbmQgVHlwaW5nIEluZGljYXRvciBGdW5jdGlvblxuICAgIHRoaXMuZW5kVHlwaW5nKCk7XG5cbiAgICBDb21ldENoYXQuc2VuZE1lc3NhZ2UodGV4dE1lc3NhZ2UpXG4gICAgICAudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VJbnB1dCA9IFwiXCI7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvLyBDbGVhciBNZXNzYWdlIElucHV0IEJveCBMb2dpY1xuICAgICAgICAvLyB0aGlzLm1lc3NhZ2VJbnB1dFJlZi5jdXJyZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgICAvLyBQbGF5IE1lc3NhZ2UgU2VudCBTdWNjZXNzZnVsbHkgQXVkaW9cbiAgICAgICAgLy8gdGhpcy5wbGF5QXVkaW8oKTtcblxuICAgICAgICAvLyB0aGlzIE1lc3NhZ2UgRW1pdHRlZCB3aWxsIEJlIEFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBNZXNzYWdlIExpc3RcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9DT01QT1NFRCxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY2xlYXJpbmcgTWVzc2FnZSBJbnB1dCBCb3hcbiAgICAgICAgdGhpcy5tZXNzYWdlSW5wdXQgPSBcIlwiO1xuXG4gICAgICAgIC8vIENoYW5nZSB0aGUgc2VuZCBidXR0b24gdG8gcmVhY3Rpb24gYnV0dG9uXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVhY3RkaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNlbmRkaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2Ugc2VuZGluZyBmYWlsZWQgd2l0aCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZUZpbGVQaWNrZXIoKSB7XG4gICAgLy9JZiB1c2VyIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCBpcyBibG9ja2VkIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRoaXMudXNlckJsb2NrZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPT0gXCJub3JtYWxcIlxuICAgICAgPyAodGhpcy5jaGVja0FuaW1hdGVkU3RhdGUgPSBcImFuaW1hdGVkXCIpXG4gICAgICA6ICh0aGlzLmNoZWNrQW5pbWF0ZWRTdGF0ZSA9IFwibm9ybWFsXCIpO1xuICB9XG5cbiAgZ2V0VmlkZW8oKSB7XG4gICAgdGhpcy52aWRQaWNrZXIubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG4gIGdldEF1ZGlvKCkge1xuICAgIHRoaXMuYXVkUGlja2VyLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgfVxuICBnZXRJbWFnZSgpIHtcbiAgICB0aGlzLmltZ1BpY2tlci5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cbiAgZ2V0RmlsZSgpIHtcbiAgICB0aGlzLmZpbGVQaWNrZXIubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgb25WaWRlb0NoYW5nZShldmVudCkge1xuICAgIGlmICghZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVwbG9hZGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJsb2FkXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShuZXdGaWxlLCBcInZpZGVvXCIpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuXG4gICAgdGhpcy52aWRQaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBvbkF1ZENoYW5nZShldmVudCkge1xuICAgIGlmICghZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVwbG9hZGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJsb2FkXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShuZXdGaWxlLCBcImF1ZGlvXCIpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuXG4gICAgdGhpcy5hdWRQaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBvbkltZ0NoYW5nZShldmVudCkge1xuICAgIGlmICghZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVwbG9hZGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJsb2FkXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShuZXdGaWxlLCBcImltYWdlXCIpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih1cGxvYWRlZEZpbGUpO1xuXG4gICAgdGhpcy5pbWdQaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBvbkZpbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldC5maWxlc1tcIjBcIl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGxvYWRlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbXCIwXCJdO1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJsb2FkXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICBbcmVhZGVyLnJlc3VsdF0sXG4gICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXG4gICAgICAgICAgdXBsb2FkZWRGaWxlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhTWVzc2FnZShuZXdGaWxlLCBcImZpbGVcIik7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHVwbG9hZGVkRmlsZSk7XG5cbiAgICB0aGlzLmZpbGVQaWNrZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBzZW5kTWVkaWFNZXNzYWdlKG1lc3NhZ2VJbnB1dCwgbWVzc2FnZVR5cGUpIHtcbiAgICB0aGlzLnRvZ2dsZUZpbGVQaWNrZXIoKTtcbiAgICBpZiAodGhpcy5tZXNzYWdlU2VuZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IHsgcmVjZWl2ZXJJZCwgcmVjZWl2ZXJUeXBlIH0gPSB0aGlzLmdldFJlY2VpdmVyRGV0YWlscygpO1xuXG4gICAgbGV0IG1lZGlhTWVzc2FnZSA9IG5ldyBDb21ldENoYXQuTWVkaWFNZXNzYWdlKFxuICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgIG1lc3NhZ2VJbnB1dCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcmVjZWl2ZXJUeXBlXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnBhcmVudE1lc3NhZ2VJZCkge1xuICAgICAgbWVkaWFNZXNzYWdlLnNldFBhcmVudE1lc3NhZ2VJZCh0aGlzLnBhcmVudE1lc3NhZ2VJZCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmRUeXBpbmcoKTtcblxuICAgIENvbWV0Q2hhdC5zZW5kTWVzc2FnZShtZWRpYU1lc3NhZ2UpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXlBdWRpbygpO1xuICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiBlbnVtcy5NRVNTQUdFX0NPTVBPU0VELFxuICAgICAgICAgIHBheUxvYWQ6IFtyZXNwb25zZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm1lc3NhZ2Ugc2VuZGluZyBmYWlsZWQgd2l0aCBlcnJvciBNZXNzYWdlX0NvbXBvc2VyIFwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZW1vamkgdG8gdGhlIGlucHV0IHdoZW4gdXNlciBjbGlja3Mgb24gZW1vamlcbiAgICogQHBhcmFtXG4gICAqL1xuICBhZGRFbW9qaSgkZXZlbnQpIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlVG9SZWFjdCkge1xuICAgICAgdGhpcy5yZWFjdFRvTWVzc2FnZXMoJGV2ZW50LmVtb2ppKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZW5kZGlzYWJsZSA9IHRydWU7XG4gICAgdGhpcy5yZWFjdGRpc2FibGUgPSBmYWxzZTtcbiAgICBsZXQgZW1vamkgPSAkZXZlbnQuZW1vamkubmF0aXZlO1xuICAgIHRoaXMubWVzc2FnZUlucHV0ID0gdGhpcy5tZXNzYWdlSW5wdXQgKyBlbW9qaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVucyB0aGUgZWRpdCBtZXNzYWdlIHdpbmRvd1xuICAgKiBAcGFyYW1cbiAgICovXG4gIG9wZW5FZGl0UHJldmlldygpIHtcbiAgICB0aGlzLm9wZW5FZGl0TWVzc2FnZVdpbmRvdyA9IHRydWU7XG4gICAgdGhpcy5tZXNzYWdlSW5wdXQgPSB0aGlzLm1lc3NhZ2VUb0JlRWRpdGVkLmRhdGEudGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGVkaXQgbWVzc2FnZSB3aW5kb3dcbiAgICogQHBhcmFtXG4gICAqL1xuICBjbG9zZUVkaXRQcmV2aWV3KCkge1xuICAgIHRoaXMub3BlbkVkaXRNZXNzYWdlV2luZG93ID0gZmFsc2U7XG4gICAgdGhpcy5tZXNzYWdlVG9CZUVkaXRlZCA9IG51bGw7XG4gICAgdGhpcy5tZXNzYWdlSW5wdXQgPSBcIlwiO1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuQ0xFQVJfTUVTU0FHRV9UT19CRV9VUERBVEVELFxuICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVucyB0aGUgY3JlYXRlIHBvbGwgTW9kYWxcbiAgICogQHBhcmFtXG4gICAqL1xuICBvcGVuQ3JlYXRlUG9sbFByZXZpZXcoKSB7XG4gICAgdGhpcy5jcmVhdGVQb2xsVmlldyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBjcmVhdGUgcG9sbCBNb2RhbFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNsb3NlQ3JlYXRlUG9sbFByZXZpZXcoKSB7XG4gICAgdGhpcy5jcmVhdGVQb2xsVmlldyA9IGZhbHNlO1xuICB9XG4gIC8qKlxuICAgKiBQbGF5cyBBdWRpbyBXaGVuIE1lc3NhZ2UgaXMgU2VudFxuICAgKi9cbiAgcGxheUF1ZGlvKCkge1xuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgIGF1ZGlvLnNyYyA9IE9VVEdPSU5HX01FU1NBR0VfU09VTkQ7XG4gICAgYXVkaW8ucGxheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBXaGVuIHVzZXIgc3RhcnRzIHR5cGluZ1xuICAgKi9cbiAgc3RhcnRUeXBpbmcodGltZXIgPSBudWxsLCBtZXRhZGF0YSA9IG51bGwpIHtcbiAgICBsZXQgdHlwaW5nSW50ZXJ2YWwgPSB0aW1lciB8fCA1MDAwO1xuXG4gICAgaWYgKHRoaXMuaXNUeXBpbmcgPiAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcbiAgICBsZXQgdHlwaW5nTWV0YWRhdGEgPSBtZXRhZGF0YSB8fCB1bmRlZmluZWQ7XG5cbiAgICBsZXQgdHlwaW5nTm90aWZpY2F0aW9uID0gbmV3IENvbWV0Q2hhdC5UeXBpbmdJbmRpY2F0b3IoXG4gICAgICByZWNlaXZlcklkLFxuICAgICAgcmVjZWl2ZXJUeXBlLFxuICAgICAgdHlwaW5nTWV0YWRhdGFcbiAgICApO1xuICAgIENvbWV0Q2hhdC5zdGFydFR5cGluZyh0eXBpbmdOb3RpZmljYXRpb24pO1xuXG4gICAgdGhpcy5pc1R5cGluZyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5lbmRUeXBpbmcoKTtcbiAgICB9LCB0eXBpbmdJbnRlcnZhbCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIHN0b3BzIHdyaXRpbmdcbiAgICovXG4gIGVuZFR5cGluZyhtZXRhZGF0YSA9IG51bGwpIHtcbiAgICBsZXQgeyByZWNlaXZlcklkLCByZWNlaXZlclR5cGUgfSA9IHRoaXMuZ2V0UmVjZWl2ZXJEZXRhaWxzKCk7XG5cbiAgICBsZXQgdHlwaW5nTWV0YWRhdGEgPSBtZXRhZGF0YSB8fCB1bmRlZmluZWQ7XG5cbiAgICBsZXQgdHlwaW5nTm90aWZpY2F0aW9uID0gbmV3IENvbWV0Q2hhdC5UeXBpbmdJbmRpY2F0b3IoXG4gICAgICByZWNlaXZlcklkLFxuICAgICAgcmVjZWl2ZXJUeXBlLFxuICAgICAgdHlwaW5nTWV0YWRhdGFcbiAgICApO1xuICAgIENvbWV0Q2hhdC5lbmRUeXBpbmcodHlwaW5nTm90aWZpY2F0aW9uKTtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLmlzVHlwaW5nKTtcbiAgICB0aGlzLmlzVHlwaW5nID0gbnVsbDtcbiAgfVxuICAvKipcbiAgICogU2VuZHMgTGl2ZSBSZWFjdGlvblxuICAgKi9cblxuICBzZW5kUmVhY3Rpb24oZXZlbnQpIHtcbiAgICAvL0lmIHVzZXIgeW91IGFyZSBjaGF0dGluZyB3aXRoIGlzIGJsb2NrZWQgdGhlbiByZXR1cm4gZmFsc2VcbiAgICBpZiAodGhpcy51c2VyQmxvY2tlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0eXBpbmdJbnRlcnZhbCA9IDEwMDA7XG5cbiAgICBjb25zdCB0eXBpbmdNZXRhZGF0YSA9IHtcbiAgICAgIHR5cGU6IGVudW1zLkxJVkVfUkVBQ1RJT05fS0VZLFxuICAgICAgcmVhY3Rpb246IFwiaGVhcnRcIixcbiAgICB9O1xuXG4gICAgdGhpcy5zdGFydFR5cGluZyh0eXBpbmdJbnRlcnZhbCwgdHlwaW5nTWV0YWRhdGEpO1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgdHlwZTogZW51bXMuU0VORF9SRUFDVElPTixcbiAgICB9KTtcbiAgICAvLyBldmVudC5wZXJzaXN0KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmVuZFR5cGluZyh0eXBpbmdNZXRhZGF0YSk7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuU1RPUF9SRUFDVElPTixcbiAgICAgIH0pO1xuICAgIH0sIHR5cGluZ0ludGVydmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIFN0aWNrZXIgV2luZG93XG4gICAqL1xuICB0b2dnbGVTdGlja2VyUGlja2VyKCkge1xuICAgIC8vSWYgdXNlciB5b3UgYXJlIGNoYXR0aW5nIHdpdGggaXMgYmxvY2tlZCB0aGVuIHJldHVybiBmYWxzZVxuICAgIGlmICh0aGlzLnVzZXJCbG9ja2VkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN0aWNrZXJWaWV3ZXIgPSB0aGlzLnN0aWNrZXJWaWV3ZXI7XG4gICAgdGhpcy5zdGlja2VyVmlld2VyID0gIXN0aWNrZXJWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgU3RpY2tlciBNZXNzYWdlXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc2VuZFN0aWNrZXIoc3RpY2tlck1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZW5kaW5nID0gdHJ1ZTtcbiAgICBjb25zdCB7IHJlY2VpdmVySWQsIHJlY2VpdmVyVHlwZSB9ID0gdGhpcy5nZXRSZWNlaXZlckRldGFpbHMoKTtcbiAgICBjb25zdCBjdXN0b21EYXRhID0ge1xuICAgICAgc3RpY2tlcl91cmw6IHN0aWNrZXJNZXNzYWdlLnN0aWNrZXJVcmwsXG4gICAgICBzdGlja2VyX25hbWU6IHN0aWNrZXJNZXNzYWdlLnN0aWNrZXJOYW1lLFxuICAgIH07XG4gICAgY29uc3QgY3VzdG9tVHlwZSA9IGVudW1zLkNVU1RPTV9UWVBFX1NUSUNLRVI7XG4gICAgY29uc3QgY3VzdG9tTWVzc2FnZSA9IG5ldyBDb21ldENoYXQuQ3VzdG9tTWVzc2FnZShcbiAgICAgIHJlY2VpdmVySWQsXG4gICAgICByZWNlaXZlclR5cGUsXG4gICAgICBjdXN0b21UeXBlLFxuICAgICAgY3VzdG9tRGF0YVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnRNZXNzYWdlSWQpIHtcbiAgICAgIGN1c3RvbU1lc3NhZ2Uuc2V0UGFyZW50TWVzc2FnZUlkKHRoaXMucGFyZW50TWVzc2FnZUlkKTtcbiAgICB9XG5cbiAgICBDb21ldENoYXQuc2VuZEN1c3RvbU1lc3NhZ2UoY3VzdG9tTWVzc2FnZSlcbiAgICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5QXVkaW8oKTtcbiAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgdHlwZTogZW51bXMuTUVTU0FHRV9DT01QT1NFRCxcbiAgICAgICAgICBwYXlMb2FkOiBbbWVzc2FnZV0sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcImN1c3RvbSBtZXNzYWdlIHNlbmRpbmcgZmFpbGVkIHdpdGggZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGVtb2ppIHdpbmRvdyB3aGVuIGVtb2ppIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAqL1xuICB0b2dnbGVFbW9qaSgpIHtcbiAgICAvL0lmIHVzZXIgeW91IGFyZSBjaGF0dGluZyB3aXRoIGlzIGJsb2NrZWQgdGhlbiByZXR1cm4gZmFsc2VcbiAgICBpZiAodGhpcy51c2VyQmxvY2tlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmVtb2ppVG9nZ2xlZCA9ICF0aGlzLmVtb2ppVG9nZ2xlZDtcbiAgICBpZiAoIXRoaXMuZW1vamlUb2dnbGVkKSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogZW51bXMuUkVBQ1RfVE9fTUVTU0FHRSxcbiAgICAgICAgcGF5TG9hZDogbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlYWN0VG9NZXNzYWdlcyhlbW9qaSkge1xuICAgIENvbWV0Q2hhdC5jYWxsRXh0ZW5zaW9uKFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlJFQUNUSU9OUyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5QT1NULFxuICAgICAgU1RSSU5HX01FU1NBR0VTLlYxX1JFQUNULFxuICAgICAge1xuICAgICAgICBtc2dJZDogdGhpcy5tZXNzYWdlVG9SZWFjdC5pZCxcbiAgICAgICAgZW1vamk6IGVtb2ppLmNvbG9ucyxcbiAgICAgIH1cbiAgICApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlc3BvbnNlLmhhc093blByb3BlcnR5KFwic3VjY2Vzc1wiKSAmJlxuICAgICAgICAgIHJlc3BvbnNlW1wic3VjY2Vzc1wiXSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUVtb2ppKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIFNvbWUgZXJyb3Igb2NjdXJlZFxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG8gc2V0IHN0eWxlIGZvciBlbW9qaSBzZWxlY3RvclxuICAgKiBAcGFyYW1cbiAgICovXG4gIGVtb2ppU3R5bGUodmFsKSB7XG4gICAgcmV0dXJuIHZhbFxuICAgICAgPyB7XG4gICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICBib3R0b206IFwiMjBweFwiLFxuICAgICAgICAgIHJpZ2h0OiBcIjE1cHhcIixcbiAgICAgICAgICB3aWR0aDogXCIyODVweFwiLFxuICAgICAgICAgIHpJbmRleDogXCIxXCIsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgYm90dG9tOiBcIjIwcHhcIixcbiAgICAgICAgICByaWdodDogXCI0NXB4XCIsXG4gICAgICAgICAgd2lkdGg6IFwiMjg1cHhcIixcbiAgICAgICAgICB6SW5kZXg6IFwiMVwiLFxuICAgICAgICB9O1xuICB9XG59XG4iXX0=