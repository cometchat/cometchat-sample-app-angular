import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "receiver-video-bubble",
  templateUrl: "./receiver-video-bubble.component.html",
  styleUrls: ["./receiver-video-bubble.component.css"],
})
export class ReceiverVideoBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  //Sets the User Avatar if group
  avatar = null;
  //Sets Username of Avatar
  name: string = null;

  videoUrl: string;

  //if group then only show avatar
  avatarIfGroup: boolean = false;

  message = Object.assign({}, this.MessageDetails, { messageFrom: "receiver" });

  constructor() {}

  ngOnInit() {
    /**
     *  If Group then displays Avatar And Name
     */
    if (this.MessageDetails.receiverType === "group") {
      this.avatarIfGroup = true;
      if (!this.MessageDetails.sender.avatar) {
        const uid = this.MessageDetails.sender.getUid();
        const char = this.MessageDetails.sender.getName().charAt(0);

        //  this.MessageDetails.sender.setAvatar(SvgAvatar.getAvatar(uid,char))
      }
      this.name = this.MessageDetails.sender.name;
      this.avatar = this.MessageDetails.sender.avatar;
    }
    this.getUrl();
  }

  /**
   * Gets the url of video to be displayed
   */
  getUrl() {
    this.videoUrl = this.MessageDetails.data.url;
  }

  /**
   * Gets time when the video message was received
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
