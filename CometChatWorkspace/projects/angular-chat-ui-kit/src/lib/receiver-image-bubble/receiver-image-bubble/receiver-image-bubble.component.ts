import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "receiver-image-bubble",
  templateUrl: "./receiver-image-bubble.component.html",
  styleUrls: ["./receiver-image-bubble.component.css"],
})
export class ReceiverImageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  messageFrom = "receiver";

  messageAssign = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });

  message = this.messageAssign;
  imageUrl = "";

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.receiverType === "group") {
      if (!this.MessageDetails.sender.avatar) {
        const uid = this.MessageDetails.sender.getUid();
        const char = this.MessageDetails.sender
          .getName()
          .charAt(0)
          .toUpperCase();
        // this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
    }
    this.setImage();
  }
  /**
   * Checks if thumnail-generation extension is present or not And then Sets the image
   * @param
   */
  setImage() {
    if (this.MessageDetails.hasOwnProperty("metadata")) {
      const metadata = this.MessageDetails.metadata;

      const injectedObject = metadata["@injected"];
      if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
        const extensionsObject = injectedObject["extensions"];
        if (
          extensionsObject &&
          extensionsObject.hasOwnProperty("thumbnail-generation")
        ) {
          const thumbnailGenerationObject =
            extensionsObject["thumbnail-generation"];

          //mq harcoded value is used until theme is not passed change it after
          const mq = window.matchMedia(
            "(min-width:360px) and (max-width: 767px)"
          );

          //when theme is passed use this mq
          //const mq = window.matchMedia(this.MessageDetails.theme.breakPoints[0]);

          mq.addListener(() => {
            const imageToDownload = this.chooseImage(thumbnailGenerationObject);
            let img = new Image();
            img.src = imageToDownload;
            img.onload = () => {
              this.imageUrl = img.src;
              console.log("eventlist");
            };
          });
          const imageToDownload = this.chooseImage(thumbnailGenerationObject);
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            this.imageUrl = img.src;
            URL.revokeObjectURL(img.src);
          };
        }
      }
    } else {
      this.setMessageImageUrl();
    }
  }
  /**
   * If thumbnail-extension is not present then this works
   * @param
   */
  setMessageImageUrl = () => {
    let img = new Image();
    img.src = this.MessageDetails.data.url;
    img.onload = () => {
      this.imageUrl = img.src;
    };
  };
  /**
   * Sets image url i.e medium-size or small-size
   * @param
   */
  chooseImage(thumbnailGenerationObject) {
    const smallUrl = thumbnailGenerationObject["url_small"];
    const mediumUrl = thumbnailGenerationObject["url_medium"];
    const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
    let imageToDownload = mediumUrl;
    if (mq.matches) {
      imageToDownload = smallUrl;
    }

    return imageToDownload;
  }
  /**
   *
   *   Emits action to view image in full screen
   */
  open() {
    this.actionGenerated.emit({
      type: "viewActualImage",
      payLoad: { ...this.message, ...this.MessageDetails },
    });
  }

  /**
   * Set Time-Stamp for receiving image
   * @param
   */
  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeStamp;
  }
}
