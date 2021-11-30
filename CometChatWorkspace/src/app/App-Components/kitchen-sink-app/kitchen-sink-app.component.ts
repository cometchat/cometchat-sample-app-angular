import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "src/CONSTS";

@Component({
  selector: "app-kitchen-sink-app",
  templateUrl: "./kitchen-sink-app.component.html",
  styleUrls: ["./kitchen-sink-app.component.scss"],
})
export class KitchenSinkAppComponent implements OnInit {
  userInput: String = "";
  superHero1 = "https://data-us.cometchat.io/assets/images/avatars/ironman.png";
  superHero2 =
    "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png";
  superHero3 =
    "https://data-us.cometchat.io/assets/images/avatars/spiderman.png";
  superHero4 =
    "https://data-us.cometchat.io/assets/images/avatars/wolverine.png";
  superHero5 = "https://data-us.cometchat.io/assets/images/avatars/cyclops.png";

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
