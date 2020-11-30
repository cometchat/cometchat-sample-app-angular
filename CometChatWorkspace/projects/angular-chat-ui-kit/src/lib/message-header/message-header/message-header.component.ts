import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "lib-message-header",
  templateUrl: "./message-header.component.html",
  styleUrls: ["./message-header.component.css"],
})
export class MessageHeaderComponent implements OnInit {
  @Input() item = null;

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
}
