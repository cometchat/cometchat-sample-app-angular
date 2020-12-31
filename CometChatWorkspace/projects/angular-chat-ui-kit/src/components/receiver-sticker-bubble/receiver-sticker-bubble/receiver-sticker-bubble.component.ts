import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "receiver-sticker-bubble",
  templateUrl: "./receiver-sticker-bubble.component.html",
  styleUrls: ["./receiver-sticker-bubble.component.css"],
})
export class ReceiverStickerBubbleComponent implements OnInit, OnChanges {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;

  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  avatar = null;
  //Sets Username of Avatar
  name: string = null;
  //If Group then only show avatar
  //If Group then only show avatar
  avatarIfGroup: boolean = false;

  stickerName: string;
  stickerUrl: string;

  messageFrom = "receiver";

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    if (change["MessageDetails"]) {
      if (
        change["MessageDetails"].previousValue !==
        change["MessageDetails"].currentValue
      ) {
        const message = Object.assign({}, this.MessageDetails, {
          messageFrom: this.messageFrom,
        });
        this.MessageDetails = message;
      }
    }
  }

  ngOnInit() {
    /**
     *  If Group then displays Avatar And Name
     */
    if (this.MessageDetails.receiverType === "group") {
      this.avatarIfGroup = true;

      if (!this.MessageDetails.sender.avatar) {
        const uid = this.MessageDetails.sender.getUid();
        const char = this.MessageDetails.sender
          .getName()
          .charAt(0)
          .toUpperCase();
        // this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
      this.name = this.MessageDetails.sender.name;
      this.avatar = this.MessageDetails.sender.avatar;
    }
    this.getSticker();
  }

  /**
   * Get Sticker Details
   */
  getSticker() {
    let stickerData = null;
    if (
      this.MessageDetails.hasOwnProperty("data") &&
      this.MessageDetails.data.hasOwnProperty("customData")
    ) {
      stickerData = this.MessageDetails.data.customData;
      if (stickerData.hasOwnProperty("sticker_url")) {
        this.stickerName = stickerData.hasOwnProperty("sticker_name")
          ? stickerData.sticker_name
          : "Sticker";
        this.stickerUrl = stickerData.sticker_url;
      }
    }
  }

  /**
   * Set Time-Stamp for receiving sticker
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
    console.log("receiver Sticker Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
