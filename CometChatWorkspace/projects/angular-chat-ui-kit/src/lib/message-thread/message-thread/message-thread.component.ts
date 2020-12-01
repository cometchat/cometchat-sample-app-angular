import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "message-thread",
  templateUrl: "./message-thread.component.html",
  styleUrls: ["./message-thread.component.css"],
})
export class MessageThreadComponent implements OnInit {
  dummyMessage = {
    data: {
      text: "testing thread",
    },
    sender: {
      sentAt: 1606742046,
    },
  };

  @Input() item = null;
  @Input() type = null;
  @Input() parentMessage = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Action is Generated to inform UserListScreen to close the thread window
   * @param
   */
  closeThread() {
    console.log("close thread clicked");
    this.actionGenerated.emit({ type: "closeThreadClicked", payLoad: null });
  }
}
