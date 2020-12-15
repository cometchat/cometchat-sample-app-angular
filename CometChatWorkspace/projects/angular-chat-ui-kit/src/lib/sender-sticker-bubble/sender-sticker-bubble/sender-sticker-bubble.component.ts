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
  selector: "sender-sticker-bubble",
  templateUrl: "./sender-sticker-bubble.component.html",
  styleUrls: ["./sender-sticker-bubble.component.css"],
})
export class SenderStickerBubbleComponent implements OnInit, OnChanges {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;

  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageFrom = "sender";
  message;
  stickerUrl: string;
  constructor() {}

  ngOnChanges(change: SimpleChanges) {}

  ngOnInit() {
    let stickerData = null;
    let stickerImg = null;
    if (
      this.MessageDetails.hasOwnProperty("data") &&
      this.MessageDetails.data.hasOwnProperty("customData")
    ) {
      stickerData = this.MessageDetails.data.customData;
      if (stickerData.hasOwnProperty("sticker_url")) {
        const stickerName = stickerData.hasOwnProperty("sticker_name")
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
