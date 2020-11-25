import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-cometchat-message-list-screen",
  templateUrl: "./cometchat-message-list-screen.component.html",
  styleUrls: ["./cometchat-message-list-screen.component.css"],
})
export class CometchatMessageListScreenComponent implements OnInit {
  @Input() item = null;

  constructor() {}

  ngOnInit() {}
}
