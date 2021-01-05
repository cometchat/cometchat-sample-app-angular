import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../utils/common";

@Component({
  selector: "cometchat-sender-audio-bubble",
  templateUrl: "./cometchat-sender-audio-bubble.component.html",
  styleUrls: ["./cometchat-sender-audio-bubble.component.css"],
})
export class CometchatSenderAudioBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Input() showReplyCount = true;
  @Input() loggedInUser;

  checkReaction: boolean = false;

  audioUrl: string;
  message = Object.assign({}, this.MessageDetails, { messageFrom: "sender" });
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.getUrl();
    this.checkReaction = checkMessageForExtensionsData(
      this.MessageDetails,
      "reactions"
    );
  }
  getUrl() {
    this.audioUrl = this.MessageDetails.data.url;
  }
  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    this.actionGenerated.emit(action);
  }
}
