import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cometchat-user-list-screen",
  templateUrl: "./cometchat-user-list-screen.component.html",
  styleUrls: ["./cometchat-user-list-screen.component.css"],
})
export class CometchatUserListScreenComponent implements OnInit {
  //It can be a user or a group
  curentItem = null;

  // Defines the types of item that was clicked --> that is .. if its a user or a group
  type = null;

  // To display image in full screen
  imageView = null;

  //If clicked then only show image in full screen
  fullScreenViewImage: boolean = false;

  constructor() {}

  ngOnInit() {}

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(user) {
    // console.log(`user in parent component  `, user);
    this.curentItem = user;

    if (this.curentItem.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }

    //console.log("UserListScreen -> Type of User ", this.type);
  }
  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
    // action.payLoad has the array of messages that is received
    // let messages = action.payLoad;
    // console.log("UserListScreen --> action generation is ", action);
    switch (action.type) {
      case "viewActualImage": {
        this.toggleImageView(action.payLoad);
        break;
      }
      case "closeFullScreenImage": {
        this.toggleImageView(null);
      }
    }
  }
  toggleImageView(message) {
    console.log("userlistscreen toggleImageView ", message);
    this.imageView = message;
    this.fullScreenViewImage = !this.fullScreenViewImage;
  }
}
