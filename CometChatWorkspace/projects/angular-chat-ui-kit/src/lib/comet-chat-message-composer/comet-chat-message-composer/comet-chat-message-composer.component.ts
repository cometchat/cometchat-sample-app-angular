import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "lib-comet-chat-message-composer",
  templateUrl: "./comet-chat-message-composer.component.html",
  styleUrls: ["./comet-chat-message-composer.component.css"],
})
export class CometChatMessageComposerComponent implements OnInit {
  @Input() parentMessageId = null;

  // can be user or a group
  @Input() item = null;
  @Input() type = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  senddisable = false;
  reactdisable = true;
  messageSending: boolean = false;
  messageInput = "";
  messageType = "";
  emojiViewer = false;
  createPoll = false;
  messageToBeEdited = false;
  replyPreview = null;
  stickerViewer = false;

  constructor() {}

  ngOnInit() {
    console.log(
      "MessageComposer -> user to which , message will be sent ",
      this.item
    );

    console.log("MessageComposer -> Type of User ", this.type);
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
    } else if (this.item.type == "group") {
      receiverId = this.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId: receiverId, receiverType: receiverType };
  }

  /**
   * Update the Message to be sent on every key press and send the message if user hits ENTER-key
   * @param Event e
   */
  sendMessageOnEnter(event) {
    // console.log(event);
    // console.log(event.target.value);
    // console.log(event.target.value.length);
    if (event.target.value.length > 0) {
      this.messageInput = event.target.value;
      this.senddisable = true;
      this.reactdisable = false;
    }
    if (event.target.value.length == 0) {
      this.senddisable = false;
      this.reactdisable = true;
    }

    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      console.log(event);
      this.sendTextMessage();
    }
  }

  /**
   * Edit and Sent a Text message
   * @param
   */
  editMessage() {}

  /**
   * Send Text Message
   * @param
   */
  sendTextMessage() {
    console.log("Send Text Message Button Clicked");

    // Close Emoji Viewer if it is open while sending the message
    if (this.emojiViewer) {
      this.emojiViewer = false;
    }

    // Dont Send Blank text messages -- i.e --- messages that only contain spaces
    if (this.messageInput.trim().length == 0) {
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

    console.log(
      `receiverID = ${receiverId}  and receiverType = ${receiverType} `
    );

    let messageInput = this.messageInput.trim();
    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageInput,
      receiverType
    );

    if (this.parentMessageId) {
      textMessage.setParentMessageId(this.parentMessageId);
    }

    // End Typing Indicator Function
    // this.endTyping();

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

        console.log("Message Sent Successfull to ", this.item);
      })
      .catch((error) => {
        console.log("Message sending failed with error:", error);
        this.messageSending = false;
      });
  }

  toggleFilePicker() {}

  getVideo() {
    let vidPicker = document.getElementById("vidPicker");
    vidPicker.click();
  }
  getAudio() {
    let audPicker = document.getElementById("audPicker");
    audPicker.click();
  }
  getImage() {
    let imgPicker = document.getElementById("imgPicker");
    imgPicker.click();
  }
  getFile() {
    let filePicker = document.getElementById("filePicker");
    filePicker.click();
  }

  onVideoChange(event) {
    console.log(event);
    console.log(event.target.files[0]);
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
    console.log(reader);

    reader.readAsArrayBuffer(uploadedFile);
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
    console.log(reader);

    reader.readAsArrayBuffer(uploadedFile);
  }

  onImgChange(event) {
    console.log(event);
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
    console.log(reader);

    reader.readAsArrayBuffer(uploadedFile);
  }

  onFileChange(event) {
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
        this.sendMediaMessage(newFile, "file");
      },
      false
    );
    console.log(reader);

    reader.readAsArrayBuffer(uploadedFile);
  }

  sendMediaMessage(messageInput, messageType) {
    this.toggleFilePicker();
    if (this.messageSending) {
      return false;
    }
    this.messageSending = true;

    // const { receiverId, receiverType } = this.getReceiverDetails();
  }
}
