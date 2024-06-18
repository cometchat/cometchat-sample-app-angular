import { Component, OnInit } from "@angular/core";

import { COMETCHAT_CONSTANTS } from "src/CONSTS";
import { CometChat } from "@cometchat-pro/chat";
import { Router } from "@angular/router";
import { users } from "src/sampleApp/sampledata";

@Component({
  selector: "app-kitchen-sink-app",
  templateUrl: "./kitchen-sink-app.component.html",
  styleUrls: ["./kitchen-sink-app.component.scss"],
})
export class KitchenSinkAppComponent implements OnInit {
  userInput: String = "";
  userList = [];

  constructor(private router: Router) {}

  onLoginError: boolean = false;
  errorMsg: string = "";

  ngOnInit() {
    //console.log('kitchen sink app loaded');
    //Create User
    // let  user = new CometChat.User('testing');
    // user.setName('Sohail');
    // CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
    //   user => {
    //       console.log("user created", user);
    //   },error => {
    //       console.log("error", error);
    //   }
    // )
    this.fetchDefaultUsers();

  }

  async fetchDefaultUsers() {
    try {
      const response = await fetch(
        "https://assets.cometchat.io/sampleapp/sampledata.json"
      );
      const data = await response.json();
      this.userList = data.users;
    } catch (error) {
      console.log("fetching default users failed, using fallback data", error);
      this.userList = users.users;
    }
  }

  /**
   * Get User info by using the UID for logging a user in
   * @param {String} UID
   */
  onLogin(UID) {
    CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      (user) => {
        console.log("Login Successful:", { user });
        this.router.navigate(["/Home"]);
      },
      (error) => {
        console.log("Login failed with exception:", { error });
        this.onLoginError = true;
        this.errorMsg = error.message;
      }
    );
  }
}
