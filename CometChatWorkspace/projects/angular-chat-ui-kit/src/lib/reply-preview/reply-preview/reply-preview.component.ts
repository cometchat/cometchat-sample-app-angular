import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "reply-preview",
  templateUrl: "./reply-preview.component.html",
  styleUrls: ["./reply-preview.component.css"],
})
export class ReplyPreviewComponent implements OnInit {
  @Input() replyPreview = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  options = [];

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("reply preview --> ngOnChanges -->  ", change);

    if (change["replyPreview"]) {
      if (change["replyPreview"].currentValue) {
        this.generateSmartReplyOptions(change["replyPreview"].currentValue);
      }
    }
  }

  ngOnInit() {
    if (this.replyPreview) {
      this.generateSmartReplyOptions(this.replyPreview);
    }
  }

  /**
   * Generate the quick replies that the current user can use
   * @param Any message
   */
  generateSmartReplyOptions(message) {
    if (message.hasOwnProperty("metadata")) {
      const metadata = message.metadata;
      if (metadata.hasOwnProperty("@injected")) {
        const injectedObject = metadata["@injected"];
        if (injectedObject.hasOwnProperty("extensions")) {
          const extensionsObject = injectedObject["extensions"];
          if (extensionsObject.hasOwnProperty("smart-reply")) {
            const smartReplyObject = extensionsObject["smart-reply"];

            const options = [
              smartReplyObject["reply_positive"],
              smartReplyObject["reply_neutral"],
              smartReplyObject["reply_negative"],
            ];

            this.options = options;

            console.log("Reply Preview --> options ", this.options);
          }
        }
      }
    }
  }

  /**
   * Sends the selected option as reply
   * @param
   */
  sendReplyMessage(message) {
    console.log(`Reply Preview --> send message `, message);
    this.actionGenerated.emit({ type: "sendSmartReply", payLoad: message });
  }

  /**
   * Closes the reply preview window
   * @param
   */
  closeReplyPreview() {
    //console.log(`close preview clicked`);
    this.replyPreview = null;
  }
}
