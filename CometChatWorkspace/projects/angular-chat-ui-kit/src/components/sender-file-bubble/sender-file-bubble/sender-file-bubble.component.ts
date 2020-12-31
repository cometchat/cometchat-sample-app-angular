import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "sender-file-bubble",
  templateUrl: "./sender-file-bubble.component.html",
  styleUrls: ["./sender-file-bubble.component.css"],
})
export class SenderFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  url: string;
  name: string;
  constructor() {}

  ngOnInit() {
    this.url = this.MessageDetails.data.attachments[0].url;
    this.name = this.MessageDetails.data.attachments[0].name;
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
