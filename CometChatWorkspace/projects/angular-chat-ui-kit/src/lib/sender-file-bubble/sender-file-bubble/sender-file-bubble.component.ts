import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "sender-file-bubble",
  templateUrl: "./sender-file-bubble.component.html",
  styleUrls: ["./sender-file-bubble.component.css"],
})
export class SenderFileBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  url: string;
  name: string;
  constructor() {}

  ngOnInit() {
    this.url = this.MessageDetails.data.attachments[0].url;
    this.name = this.MessageDetails.data.attachments[0].name;
  }
}
