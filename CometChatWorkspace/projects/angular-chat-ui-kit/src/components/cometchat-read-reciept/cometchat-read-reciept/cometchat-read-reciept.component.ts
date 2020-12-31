import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cometchat-read-reciept",
  templateUrl: "./cometchat-read-reciept.component.html",
  styleUrls: ["./cometchat-read-reciept.component.css"],
})
export class CometchatReadRecieptComponent implements OnInit {
  @Input() MessageDetails = null;
  msgSent: boolean = false;
  msgRead: boolean = false;
  msgDeliv: boolean = false;
  tickStatus: string = "read";
  constructor() {}

  ngOnInit() {
    this.getTick();
  }
  /**
   * Get  Time for message sending
   */
  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    // console.log("time is ", timeStamp);
    return timeStamp;
  }
  /**
   * Get Read/Deliv/Sent Status
   */
  getTick() {
    let sentAt = this.MessageDetails.sentAt;
    let readAt = this.MessageDetails.readAt;
    let delivAt = this.MessageDetails.deliveredAt;
    if (sentAt && !readAt && !delivAt) {
      this.tickStatus = "sent";
    }
    if (sentAt && !readAt && delivAt) {
      this.tickStatus = "deliv";
    }
  }
}
