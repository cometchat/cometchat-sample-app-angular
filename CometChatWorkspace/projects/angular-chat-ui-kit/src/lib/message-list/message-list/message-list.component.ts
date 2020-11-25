import { Component, OnInit } from "@angular/core";

@Component({
  selector: "lib-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"],
})
export class MessageListComponent implements OnInit {
  item = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  constructor() {}

  ngOnInit() {}
}
