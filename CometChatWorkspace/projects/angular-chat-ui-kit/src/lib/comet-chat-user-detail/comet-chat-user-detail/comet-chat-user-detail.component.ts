import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "comet-chat-user-detail",
  templateUrl: "./comet-chat-user-detail.component.html",
  styleUrls: ["./comet-chat-user-detail.component.css"],
})
export class CometChatUserDetailComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  constructor() {}

  ngOnInit() {}
}
