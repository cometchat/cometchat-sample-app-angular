import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "comet-chat-sender-message-bubble",
  templateUrl: "./comet-chat-sender-message-bubble.component.html",
  styleUrls: ["./comet-chat-sender-message-bubble.component.css"],
})
export class CometChatSenderMessageBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  linkPreview: boolean = false;
  linkTitle: string;
  linkDescription: string;
  linkUrl: string;
  linkText: string;
  linkImage: string;

  constructor() {}

  ngOnInit() {
    this.checkLinkPreview();
  }

  /**
   * Check If extension has enabled LinkPreview
   */
  checkLinkPreview() {
    if (this.MessageDetails.hasOwnProperty("metadata")) {
      const metadata = this.MessageDetails.metadata;
      const injectedObject = metadata["@injected"];
      if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
        const extensionsObject = injectedObject["extensions"];
        if (
          extensionsObject &&
          extensionsObject.hasOwnProperty("link-preview")
        ) {
          const linkPreviewObject = extensionsObject["link-preview"];
          if (
            linkPreviewObject &&
            linkPreviewObject.hasOwnProperty("links") &&
            linkPreviewObject["links"].length
          ) {
            this.linkPreview = true;
            const linkObject = linkPreviewObject["links"][0];
            this.linkTitle = linkObject.title;
            this.linkDescription = linkObject.description;

            if (linkObject.url !== this.MessageDetails.data.text) {
              this.linkUrl = this.MessageDetails.data.text;
            } else {
              this.linkUrl = linkObject.url;
            }

            this.linkImage = linkObject.image;
            const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
            const linkText = linkObject["url"].match(pattern)
              ? "View on Youtube"
              : "Visit";
            this.linkText = linkText;
            // const actualMessage = messageText;
          }
        }
      }
    }
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
