import { Component, OnInit } from "@angular/core";
@Component({
  selector: "lib-comet-chat-message-composer",
  templateUrl: "./comet-chat-message-composer.component.html",
  styleUrls: ["./comet-chat-message-composer.component.css"],
})
export class CometChatMessageComposerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  senddisable = false;
  reactdisable = true;
  messageSending: boolean = false;

  sendMessageOnEnter(event) {
    console.log(event);
    console.log(event.target.value);
    console.log(event.target.value.length);
    if (event.target.value.length > 0) {
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

  sendTextMessage() {}

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
