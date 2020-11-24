import { Component, OnInit } from "@angular/core";

@Component({
  selector: "lib-cometchat-user-list-screen",
  templateUrl: "./cometchat-user-list-screen.component.html",
  styleUrls: ["./cometchat-user-list-screen.component.css"],
})
export class CometchatUserListScreenComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(user) {
    console.log(`user in parent component  `, user);
  }
}
