import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "read-reciept",
  templateUrl: "./read-reciept.component.html",
  styleUrls: ["./read-reciept.component.css"],
})
export class ReadRecieptComponent implements OnInit {
  @Input() MessageDetails = null;
  msgSent: boolean = false;
  msgRead: boolean = false;
  msgDeliv: boolean = false;
  tickStatus: string;
  constructor() {}

  ngOnInit() {
    this.getTick();
  }

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

  getTick() {
    // let tick;
    // this.msgSent = false;
    let sentAt = this.MessageDetails.sentAt;
    let readAt = this.MessageDetails.readAt;
    let delivAt = this.MessageDetails.deliveredAt;
    // this.msgSent = sentAt && !readAt && !delivAt;
    // this.msgDeliv = sentAt && !readAt && delivAt;
    // this.msgRead = sentAt && readAt && delivAt;
    if (sentAt && !readAt && !delivAt) {
      // this.msgSent = true;
      this.tickStatus = "sent";
    }
    if (sentAt && !readAt && delivAt) {
      // this.msgDeliv = true;
      this.tickStatus = "deliv";

      //tick = "double";
      // this.msgSent = false;
      // this.msgRead = false;
    }
    if (sentAt && readAt && delivAt) {
      // this.msgRead = true;
      this.tickStatus = "read";

      // tick = "blue tick";
      // this.msgSent = false;
      // this.msgDeliv = false;
    }
    // return tick;
  }
}
