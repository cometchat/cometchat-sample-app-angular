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
  selector: "cometchat-sender-sticker-bubble",
  templateUrl: "./cometchat-sender-sticker-bubble.component.html",
  styleUrls: ["./cometchat-sender-sticker-bubble.component.css"],
})
export class CometchatSenderStickerBubbleComponent
  implements OnInit, OnChanges {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;

  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageFrom = "sender";
  message;
  stickerUrl: string;
  stickerName: string;
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
  actionHandler(action) {
    this.actionGenerated.emit(action);
  }
}
