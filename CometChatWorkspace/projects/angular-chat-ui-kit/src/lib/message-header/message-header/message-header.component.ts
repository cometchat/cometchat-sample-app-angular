import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
@Component({
  selector: "message-header",
  templateUrl: "./message-header.component.html",
  styleUrls: ["./message-header.component.css"],
})
export class MessageHeaderComponent implements OnInit {
  @Input() item = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  getDate(date) {
    let lastActiveDate = "Last Active At: ";

    if (date === undefined) {
      lastActiveDate = "Offline";
      return lastActiveDate;
    }

    lastActiveDate =
      lastActiveDate +
      new Date(date * 1000).toLocaleTimeString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    // console.log("z->>>>>> ", lastActiveDate);
    return lastActiveDate;
  }

  /**
   * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
   * @param
   */
  openUserDetail() {
    this.actionGenerated.emit({ type: "viewDetail", payLoad: null });
  }
}
