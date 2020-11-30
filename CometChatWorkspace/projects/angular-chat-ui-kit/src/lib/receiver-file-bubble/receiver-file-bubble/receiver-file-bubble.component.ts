import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "receiver-file-bubble",
  templateUrl: "./receiver-file-bubble.component.html",
  styleUrls: ["./receiver-file-bubble.component.css"],
})
export class ReceiverFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  name: string;
  url: string;
  constructor() {}

  ngOnInit() {
    this.name = this.MessageDetails.data.attachments[0].name;
    this.url = this.MessageDetails.data.attachments[0].url;
  }
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
