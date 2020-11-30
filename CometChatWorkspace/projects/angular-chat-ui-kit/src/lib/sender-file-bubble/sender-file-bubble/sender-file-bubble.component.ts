import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "sender-file-bubble",
  templateUrl: "./sender-file-bubble.component.html",
  styleUrls: ["./sender-file-bubble.component.css"],
})
export class SenderFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  url1;
  constructor() {}

  ngOnInit() {
    console.log("sender-file-bubble ->>> ", this.MessageDetails);
    console.log(
      "image detials ->>>> ",
      this.MessageDetails.data.attachments[0].name
    );
    this.url1 = this.MessageDetails.data.attachments[0].url;
    console.log(
      "url detials ->>>> ",
      this.MessageDetails.data.attachments[0].url
    );
    console.log("->>>>>>>>>>>>", this.url1);
  }
}
