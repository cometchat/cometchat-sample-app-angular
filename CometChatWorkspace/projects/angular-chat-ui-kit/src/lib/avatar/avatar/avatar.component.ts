import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  @Input() avatar =
    "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
  @Input() userStatus = "";

  constructor() {}

  ngOnInit() {
    if (this.avatar === undefined) {
      this.avatar =
        "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";
    }
  }
}
