import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "sender-video-bubble",
  templateUrl: "./sender-video-bubble.component.html",
  styleUrls: ["./sender-video-bubble.component.css"],
})
export class SenderVideoBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  videoUrl: string;
  messageFrom = "sender";

  message = Object.assign({}, this.MessageDetails, {
    messageFrom: this.messageFrom,
  });

  constructor() {}

  ngOnInit() {
    this.getUrl();
  }

  getUrl() {
    this.videoUrl = this.MessageDetails.data.url;
  }
}
