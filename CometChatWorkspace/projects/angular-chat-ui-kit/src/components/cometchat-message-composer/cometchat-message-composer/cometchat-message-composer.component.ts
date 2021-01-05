import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

// import {SEND_SMART_REPLY,SEND_STICKER,CLOSE_STICKER} from '../../utils/enums'

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

import { OUTGOING_MESSAGE_SOUND } from "../../resources/audio/outgoingMessageSound";
@Component({
  selector: "cometchat-message-composer",
  templateUrl: "./cometchat-message-composer.component.html",
  styleUrls: ["./cometchat-message-composer.component.css"],
  animations: [
    trigger("FadeInFadeOut", [
      state(
        "normal",
        style({
          width: "0px",
        })
      ),
      state(
        "animated",
        style({
          width: "26px",
          margin: "auto 1px",
        })
      ),
      transition("normal=>animated", animate(500)),
    ]),
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(100%)" }),
        animate("400ms ease-in", style({ transform: "translateY(0%)" })),
      ]),
    ]),
  ],
})
export class CometchatMessageComposerComponent implements OnInit, OnChanges {
  @Input() parentMessageId = null;

  // can be user or a group
  @Input() item = null;
  @Input() type = null;
  @Input() messageToBeEdited = null;
  @Input() replyPreview = null;
  @Input() messageToReact = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @ViewChild("imgPicker", null) imgPicker: ElementRef;
  @ViewChild("vidPicker", null) vidPicker: ElementRef;
  @ViewChild("audPicker", null) audPicker: ElementRef;
  @ViewChild("filePicker", null) filePicker: ElementRef;

  senddisable = false;
  reactdisable = true;
  messageSending: boolean = false;
  messageInput = "";
  messageType = "";
  emojiViewer = false;
  createPoll = false;
  stickerViewer = false;
  checkAnimatedState = "normal";
  openEditMessageWindow: boolean = false;
  createPollView: boolean = false;

  emojiToggled: boolean = false;
  isTyping: any;
  userBlocked: boolean = false;
  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("Message Composer --> ngOnChanges -->  ", change);
    if (change["item"]) {
      this.checkBlocked();
    }
    if (change["messageToBeEdited"]) {
      console.log(
        "Message Composer --> Message to Be edited changed -->  ",
        change["messageToBeEdited"]
      );

      //edit message only if its not null or undefined
      if (change["messageToBeEdited"].currentValue) {
        this.openEditPreview();
      }
    }
    if (change["messageToReact"] && change["messageToReact"].currentValue) {
      const previousMessage = change["messageToReact"].previousValue;
      const currentMessage = change["messageToReact"].currentValue;
      if (previousMessage !== currentMessage) {
        this.messageToReact = change["messageToReact"].currentValue;
        // console.log("message composer reaction changed", this.messageToReact);
        this.toggleEmoji();
      }
    }
  }

  ngOnInit() {
    // console.log(
    //   "MessageComposer -> user to which , message will be sent ",
    //   this.item
    // );
    //console.log("MessageComposer -> Type of User ", this.type);
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let message = action.payLoad;

    console.log("Message Composer --> action generation is ", action);

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
  }

  /**
   * Check If user Blocked then disable input box
   */
  checkBlocked() {
    if (this.item.blockedByMe) {
      this.userBlocked = true;
    } else {
      this.userBlocked = false;
    }
  }
  /**
   * Get Details of the User/Group , to whom , you want to send the message
   * @param
   */
  getReceiverDetails() {
    let receiverId;
    let receiverType;

    if (this.type == "user") {
      receiverId = this.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;
    } else if (this.type == "group") {
      console.log(
        ` Message Composer --> see user receing the message details `,
        this.item
      );

      receiverId = this.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId: receiverId, receiverType: receiverType };
  }

  /**
   * Update the Message to be sent on every key press
   * @param event
   */
  changeHandler(event) {
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
  }

  /**
   * Send the message if user hits ENTER-key
   * @param Event e
   */
  sendMessageOnEnter(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendTextMessage();
      this.playAudio();
    }
  }

  /**
   * Edit and Sent a Text message
   * @param
   */
  editMessage() {
    const messageToBeEdited = this.messageToBeEdited;

    let { receiverId, receiverType } = this.getReceiverDetails();

    let messageText = this.messageInput.trim();
    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageText,
      receiverType
    );
    textMessage.setId(messageToBeEdited.id);

    this.endTyping();

    CometChat.editMessage(textMessage)
      .then((message) => {
        this.messageInput = "";
        this.messageSending = false;

        //this.playAudio();

        this.closeEditPreview();

        this.actionGenerated.emit({ type: "messageEdited", payLoad: message });
      })
      .catch((error) => {
        this.messageSending = false;
        console.log("Message editing failed with error:", error);
      });
  }

  /**
   * Send Text Message
   * @param
   */
  sendTextMessage(textMsg = null) {
    //If user you are chatting with is blocked then return false
    if (this.userBlocked) {
      return false;
    }
    //console.log("Send Text Message Button Clicked");

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

    // console.log(
    //   `receiverID = ${receiverId}  and receiverType = ${receiverType} `
    // );

    let messageInput;

    if (textMsg !== null) {
      messageInput = textMsg.trim();
    } else {
      messageInput = this.messageInput.trim();
    }

    console.log("message composer --> sending message ", messageInput);

    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageInput,
      receiverType
    );

    if (this.parentMessageId) {
      textMessage.setParentMessageId(this.parentMessageId);
    }

    // End Typing Indicator Function
    this.endTyping();

    CometChat.sendMessage(textMessage)
      .then((message) => {
        this.messageInput = "";
        this.messageSending = false;

        // Clear Message Input Box Logic
        // this.messageInputRef.current.textContent = "";

        // Play Message Sent Successfully Audio
        // this.playAudio();

        // this Message Emitted will Be Appended to the existing Message List
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: [message],
        });

        //clearing Message Input Box
        this.messageInput = "";

        // Change the send button to reaction button
        setTimeout(() => {
          this.reactdisable = true;
          this.senddisable = false;
        }, 500);

        //console.log("Message Sent Successfull to ", this.item);
      })
      .catch((error) => {
        console.log("Message sending failed with error:", error);
        this.messageSending = false;
      });
  }

  toggleFilePicker() {
    //If user you are chatting with is blocked then return false
    if (this.userBlocked) {
      return false;
    }
    this.checkAnimatedState == "normal"
      ? (this.checkAnimatedState = "animated")
      : (this.checkAnimatedState = "normal");
  }

  getVideo() {
    this.vidPicker.nativeElement.click();
  }
  getAudio() {
    this.audPicker.nativeElement.click();
  }
  getImage() {
    this.imgPicker.nativeElement.click();
  }
  getFile() {
    this.filePicker.nativeElement.click();
  }

  onVideoChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "video");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);

    this.vidPicker.nativeElement.value = "";
  }

  onAudChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "audio");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);

    this.audPicker.nativeElement.value = "";
  }

  onImgChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "image");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);

    this.imgPicker.nativeElement.value = "";
  }

  onFileChange(event) {
    if (!event.target.files["0"]) {
      return false;
    }

    const uploadedFile = event.target.files["0"];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "file");
      },
      false
    );
    console.log("reader is ", reader);

    reader.readAsArrayBuffer(uploadedFile);

    this.filePicker.nativeElement.value = "";
  }

  sendMediaMessage(messageInput, messageType) {
    this.toggleFilePicker();
    if (this.messageSending) {
      return false;
    }
    this.messageSending = true;

    const { receiverId, receiverType } = this.getReceiverDetails();

    let mediaMessage = new CometChat.MediaMessage(
      receiverId,
      messageInput,
      messageType,
      receiverType
    );

    console.log(`Message Composer --> setting parent for media message`);

    if (this.parentMessageId) {
      console.log(`Message Composer --> setting parent for media message`);
      mediaMessage.setParentMessageId(this.parentMessageId);
    }

    this.endTyping();
    // console.log(
    //   "sendMediaMessage mediaMessage Message_Composer ->>>",
    //   mediaMessage
    // );
    CometChat.sendMessage(mediaMessage)
      .then((response) => {
        // console.log(
        //   "sendMediaMessage response Message_Composer ->>>",
        //   response
        // );
        this.messageSending = false;
        this.playAudio();
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: [response],
        });
      })
      .catch((error) => {
        this.messageSending = false;
        console.log(
          "message sending failed with error Message_Composer ",
          error
        );
      });
  }

  /**
   * Add emoji to the input when user clicks on emoji
   * @param
   */
  addEmoji($event) {
    if (this.messageToReact) {
      this.reactToMessages($event.emoji);
      return;
    }
    this.senddisable = true;
    this.reactdisable = false;
    let emoji = $event.emoji.native;
    this.messageInput = this.messageInput + emoji;
  }

  /**
   * opens the edit message window
   * @param
   */
  openEditPreview() {
    this.openEditMessageWindow = true;
    this.messageInput = this.messageToBeEdited.data.text;
  }

  /**
   * Closes the edit message window
   * @param
   */
  closeEditPreview() {
    this.openEditMessageWindow = false;
    this.messageToBeEdited = null;
    this.messageInput = "";
    this.actionGenerated.emit({
      type: "clearMessageToBeEdited",
      payLoad: null,
    });
  }

  /**
   * opens the create poll Modal
   * @param
   */
  openCreatePollPreview() {
    this.createPollView = true;
  }

  /**
   * Closes the create poll Modal
   * @param
   */
  closeCreatePollPreview() {
    this.createPollView = false;
  }
  /**
   * Plays Audio When Message is Sent
   */
  playAudio() {
    let audio = new Audio();
    audio.src = OUTGOING_MESSAGE_SOUND;
    audio.play();
  }

  /**
   *  When user starts typing
   */
  startTyping(timer = null, metadata = null) {
    let typingInterval = timer || 5000;

    //console.log("typing interval ", typingInterval);

    if (this.isTyping > 0) {
      return false;
    }
    let { receiverId, receiverType } = this.getReceiverDetails();
    let typingMetadata = metadata || undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.startTyping(typingNotification);
    // console.log("start notification ", typingNotification);
    this.isTyping = setTimeout(() => {
      this.endTyping();
    }, typingInterval);
  }

  /**
   * When user stops writing
   */
  endTyping(metadata = null) {
    let { receiverId, receiverType } = this.getReceiverDetails();

    let typingMetadata = metadata || undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.endTyping(typingNotification);
    console.log("end notification ", typingNotification);

    // console.log("end notification typing ", this.istyping);

    clearTimeout(this.isTyping);
    this.isTyping = null;
  }
  /**
   * Sends Live Reaction
   */

  sendReaction(event) {
    //If user you are chatting with is blocked then return false
    if (this.userBlocked) {
      return false;
    }
    const typingInterval = 1000;
    console.log("send reaction");

    const typingMetadata = {
      type: enums.LIVE_REACTION_KEY,
      reaction: "heart",
    };

    this.startTyping(typingInterval, typingMetadata);
    this.actionGenerated.emit({
      type: "sendReaction",
    });
    // event.persist();
    setTimeout(() => {
      this.endTyping(typingMetadata);
      this.actionGenerated.emit({
        type: "stopReaction",
      });
    }, typingInterval);
  }

  /**
   * Toggles Sticker Window
   */
  toggleStickerPicker() {
    //If user you are chatting with is blocked then return false
    if (this.userBlocked) {
      return false;
    }
    const stickerViewer = this.stickerViewer;
    this.stickerViewer = !stickerViewer;
  }

  /**
   * Sends Sticker Message
   * @param
   */
  sendSticker(stickerMessage) {
    this.messageSending = true;
    const { receiverId, receiverType } = this.getReceiverDetails();
    const customData = {
      sticker_url: stickerMessage.stickerUrl,
      sticker_name: stickerMessage.stickerName,
    };
    const customType = enums.CUSTOM_TYPE_STICKER;
    const customMessage = new CometChat.CustomMessage(
      receiverId,
      receiverType,
      customType,
      customData
    );

    if (this.parentMessageId) {
      customMessage.setParentMessageId(this.parentMessageId);
    }

    CometChat.sendCustomMessage(customMessage)
      .then((message) => {
        console.log("custom msg ", message);

        this.messageSending = false;
        this.playAudio();
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: [message],
        });
      })
      .catch((error) => {
        this.messageSending = false;
        console.log("custom message sending failed with error", error);
      });
  }

  /**
   * Toggle emoji window when emoji button is clicked
   */
  toggleEmoji() {
    //If user you are chatting with is blocked then return false
    if (this.userBlocked) {
      return false;
    }
    this.emojiToggled = !this.emojiToggled;
    if (!this.emojiToggled) {
      this.messageToReact = null;
    }
  }

  reactToMessages(emoji) {
    CometChat.callExtension("reactions", "POST", "v1/react", {
      msgId: this.messageToReact.id,
      emoji: emoji.colons,
    })
      .then((response) => {
        if (
          response.hasOwnProperty("success") &&
          response["success"] === true
        ) {
          this.toggleEmoji();
        }
      })
      .catch((error) => {
        // Some error occured
      });
  }
}
