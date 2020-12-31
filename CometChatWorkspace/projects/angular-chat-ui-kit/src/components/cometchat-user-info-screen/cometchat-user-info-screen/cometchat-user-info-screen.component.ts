import { Component, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../utils/controller";
@Component({
  selector: "cometchat-user-info-screen",
  templateUrl: "./cometchat-user-info-screen.component.html",
  styleUrls: ["./cometchat-user-info-screen.component.css"],
})
export class CometchatUserInfoScreenComponent implements OnInit {
  user;
  name: string;
  constructor() {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.user = user;
        this.name = this.user.name;
      })
      .catch((error) => {
        console.log(
          "[CometChatUserInfoScreen] getProfile getLoggedInUser error",
          error
        );
      });
  }
}
