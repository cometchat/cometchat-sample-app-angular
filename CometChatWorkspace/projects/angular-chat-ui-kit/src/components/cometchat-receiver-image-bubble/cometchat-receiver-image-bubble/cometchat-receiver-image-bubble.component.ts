import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import * as enums from "../../utils/enums";

@Component({
  selector: "cometchat-receiver-image-bubble",
  templateUrl: "./cometchat-receiver-image-bubble.component.html",
  styleUrls: ["./cometchat-receiver-image-bubble.component.css"],
})
export class CometchatReceiverImageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Input() showReplyCount = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  messageFrom = "receiver";

  messageAssign = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });
  imageLoader: boolean = false;
  innerWidth;
  checkScreenSize: boolean = false;

  avatar = null;
  //Sets Username of Avatar
  name: string = null;
  //If Group then only show avatar
  //If Group then only show avatar
  avatarIfGroup: boolean = false;

  message = this.messageAssign;
  imageUrl = "";

  constructor() {}

  ngOnInit() {
    /**
     *  If Group then displays Avatar And Name
     */
    if (this.MessageDetails.receiverType === "group") {
      this.avatarIfGroup = true;
      this.name = this.MessageDetails.sender.name;
      this.avatar = this.MessageDetails.sender.avatar;
    }
    this.setImage();
  }

  /**
   * Checks when window size is changed in realtime
   */
  @HostListener("window:resize", [])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= "320" && this.innerWidth <= "767") {
      console.log("sender image bubble size less");
      this.checkScreenSize = true;
    } else {
      if (this.checkScreenSize === true) {
        console.log("sender image bubble size");

        this.setImage();
      }
      this.checkScreenSize = false;
    }
  }
  /**
   * Checks if thumnail-generation extension is present or not And then Sets the image
   *
   */
  setImage() {
    this.imageLoader = true;
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

          const mq = window.matchMedia(
            "(min-width:360px) and (max-width: 767px)"
          );

          const imageToShow = this.chooseImage(thumbnailGenerationObject);
          let img = new Image();
          img.src = imageToShow;
          img.onload = () => {
            this.imageLoader = false;
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
   *
   */
  setMessageImageUrl = () => {
    let img = new Image();
    img.src = this.MessageDetails.data.url;
    img.onload = () => {
      this.imageLoader = false;
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
    let imageToShow = mediumUrl;
    if (mq.matches) {
      imageToShow = smallUrl;
    }

    return imageToShow;
  }
  /**
   *
   *   Emits action to view image in full screen
   */
  open() {
    this.actionGenerated.emit({
      type: enums.VIEW_ACTUAL_IMAGE,
      payLoad: { ...this.message, ...this.MessageDetails },
    });
  }

  /**
   * Set Time-Stamp for receiving image
   *
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

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("receiver Message Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
