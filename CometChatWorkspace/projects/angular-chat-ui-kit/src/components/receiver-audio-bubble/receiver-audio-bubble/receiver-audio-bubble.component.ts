import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "receiver-audio-bubble",
  templateUrl: "./receiver-audio-bubble.component.html",
  styleUrls: ["./receiver-audio-bubble.component.css"],
})
export class ReceiverAudioBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  audioUrl: string;
  //Sets the User Avatar if group
  avatar = null;
  //Sets Username of Avatar
  name: string = null;
  //If Group then only show avatar
  avatarIfGroup: boolean = false;

  constructor() {}

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
    this.getUrl();
  }

  /**
   * Gets time when the audio message was received
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
   * Gets the url of audio to be displayed
   */
  getUrl() {
    this.audioUrl = this.MessageDetails.data.url;
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
