import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cometchat-user-list-screen",
  templateUrl: "./cometchat-user-list-screen.component.html",
  styleUrls: ["./cometchat-user-list-screen.component.css"],
})
export class CometchatUserListScreenComponent implements OnInit {
  dummyMessage = {
    data: {
      text: "testing thread",
    },
    sender: {
      sentAt: 1606742046,
    },
  };

  //It can be a user or a group
  curentItem = null;

  // Defines the types of item that was clicked --> that is .. if its a user or a group
  type = null;

  threadMessageView: boolean = false;
  threadMessageParent = null;
  threadMessageItem = null;
  threadMessageType = "";
  viewDetailScreen: boolean = false;

  constructor() {}

  ngOnInit() {}

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(user) {
    console.log(`user in parent component  `, user);
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
    let message = action.payLoad;

    console.log("UserListScreen --> action generation is ", action);

    switch (action.type) {
      case "viewMessageThread": {
        this.viewMessageThread(message);
        break;
      }
    }
  }

  /**
   * Sets All the Intial Conditions for the threaded View of Messages
   * @param Any parentMessage
   */
  viewMessageThread(parentMessage) {
    //Open Thread Screen
    this.threadMessageView = true;

    //close user ( the person you are chatting with ) Detail screen
    this.viewDetailScreen = false;

    this.threadMessageParent = parentMessage;
    this.threadMessageItem = this.curentItem;
    this.threadMessageType = this.type;
  }
}
