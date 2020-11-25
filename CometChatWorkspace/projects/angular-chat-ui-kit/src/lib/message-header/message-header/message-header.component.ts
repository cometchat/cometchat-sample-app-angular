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
}
