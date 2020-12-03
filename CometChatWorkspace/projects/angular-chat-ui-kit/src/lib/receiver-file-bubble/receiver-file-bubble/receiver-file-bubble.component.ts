import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "receiver-file-bubble",
  templateUrl: "./receiver-file-bubble.component.html",
  styleUrls: ["./receiver-file-bubble.component.css"],
})
export class ReceiverFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  name: string;
  url: string;
  avatar = null;
  //Sets Username of Avatar
  avatarName: string = null;
  //If Group then only show avatar
  avatarIfGroup: boolean = false;

  @Input() showToolTip = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
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
      this.avatarName = this.MessageDetails.sender.name;
      this.avatar = this.MessageDetails.sender.avatar;
    }
    //Gets File name and file url
    this.name = this.MessageDetails.data.attachments[0].name;
    this.url = this.MessageDetails.data.attachments[0].url;
  }

  /**
   * Get Time Of file receieved
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
