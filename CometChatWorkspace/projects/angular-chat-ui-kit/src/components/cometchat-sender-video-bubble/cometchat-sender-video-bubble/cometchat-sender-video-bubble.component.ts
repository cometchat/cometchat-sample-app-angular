import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cometchat-sender-video-bubble",
  templateUrl: "./cometchat-sender-video-bubble.component.html",
  styleUrls: ["./cometchat-sender-video-bubble.component.css"],
})
export class CometchatSenderVideoBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  //Sets Video Url to be displayed
  videoUrl: string;
  messageFrom = "sender";

  message = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });

  constructor() {}

  ngOnInit() {
    this.getUrl();
  }
  /**
   * Gets the url of video to be displayed
   */
  getUrl() {
    this.videoUrl = this.MessageDetails.data.url;
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
