import { Component, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../utils/controller";
@Component({
  selector: "comet-chat-user-info-screen",
  templateUrl: "./comet-chat-user-info-screen.component.html",
  styleUrls: ["./comet-chat-user-info-screen.component.css"],
})
export class CometChatUserInfoScreenComponent implements OnInit {
  user;
  constructor() {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        // this.setAvatar(user);
        this.user = user;
      })
      .catch((error) => {
        console.log(
          "[CometChatUserInfoScreen] getProfile getLoggedInUser error",
          error
        );
      });
  }
}
