import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "sender-image-bubble",
  templateUrl: "./sender-image-bubble.component.html",
  styleUrls: ["./sender-image-bubble.component.css"],
})
export class SenderImageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  timer = null;
  messageFrom = "sender";

  messageAssign = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });

  message = this.messageAssign;
  imageUrl = "";
  fullScreenView = false;

  constructor() {}

  ngOnInit() {
    this.setImage();
  }
  /**
   * Checks if thumnail-generation extension is present And then Sets the image
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
          // const mq = window.matchMedia(
          //   "(min-width:360px) and (max-width: 767px)"
          // );

          //when theme is passed use this mq
          //const mq = window.matchMedia(this.MessageDetails.theme.breakPoints[0]);

          // mq.addListener(() => {
          //   const imageToDownload = this.chooseImage(thumbnailGenerationObject);
          //   let img = new Image();
          //   img.src = imageToDownload;
          //   img.onload = () => {
          //     this.imageUrl = img.src;
          //     console.log("listner");
          //   };
          // });

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
   * Sets image url ie. medium or small-size image
   * @param
   */
  chooseImage(thumbnailGenerationObject) {
    //console.log("thumbnail ", thumbnailGenerationObject);

    const smallUrl = thumbnailGenerationObject["url_small"];
    const mediumUrl = thumbnailGenerationObject["url_medium"];

    //mq harcoded value is used until theme is not passed change it after
    const mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");

    //when theme is passed use this mq
    //const mq = window.matchMedia(this.MessageDetails.theme.breakPoints[0]);

    let imageToDownload = mediumUrl;
    if (mq.matches) {
      imageToDownload = smallUrl;
    }

    return imageToDownload;
  }

  /**
   * If thumnail-generation extension is not present
   * @param
   */
  setMessageImageUrl() {
    let img = new Image();
    img.src = this.MessageDetails.data.url;
    img.onload = () => {
      this.imageUrl = img.src;
      // console.log("src ",img.src);
    };
  }

  /**
   * Emits action to open image in full-screen view
   * @param
   */
  open() {
    this.actionGenerated.emit({
      type: "viewActualImage",
      payLoad: { ...this.message, ...this.MessageDetails },
    });
  }
}
