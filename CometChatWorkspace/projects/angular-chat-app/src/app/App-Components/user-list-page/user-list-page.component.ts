import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-list-page",
  templateUrl: "./user-list-page.component.html",
  styleUrls: ["./user-list-page.component.scss"],
})
export class UserListPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  userClicked(user) {
    console.log(`user in parent component  `, user);
  }
}
