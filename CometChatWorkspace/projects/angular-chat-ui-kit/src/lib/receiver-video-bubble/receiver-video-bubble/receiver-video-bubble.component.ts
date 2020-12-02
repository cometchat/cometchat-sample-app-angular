import { getUrlScheme } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "receiver-video-bubble",
  templateUrl: "./receiver-video-bubble.component.html",
  styleUrls: ["./receiver-video-bubble.component.css"],
})
export class ReceiverVideoBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  avatar = null;
  userAvatar = null;
  name: string = null;
  videoUrl: string;
  //if group then only show avatar
  avatarIfGroup: boolean = false;

  message = Object.assign({}, this.MessageDetails, { messageFrom: "receiver" });

  constructor() {}

  ngOnInit() {
    if (this.MessageDetails.receiverType === "group") {
      this.avatarIfGroup = true;
      if (!this.MessageDetails.sender.avatar) {
        const uid = this.MessageDetails.sender.getUid();
        const char = this.MessageDetails.sender.getName().charAt(0);

        //  this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid,char))
      }
      this.name = this.MessageDetails.sender.name;
      this.userAvatar = this.MessageDetails.sender.avatar;
    }
    this.getUrl();
  }

  getUrl() {
    this.videoUrl = this.MessageDetails.data.url;
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
