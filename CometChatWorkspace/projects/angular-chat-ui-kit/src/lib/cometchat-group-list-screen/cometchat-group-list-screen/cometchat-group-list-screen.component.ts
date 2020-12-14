import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cometchat-group-list-screen",
  templateUrl: "./cometchat-group-list-screen.component.html",
  styleUrls: ["./cometchat-group-list-screen.component.css"],
})
export class CometchatGroupListScreenComponent implements OnInit {
  //It can be a user or a group
  item = null;

  // Defines the types of item that was clicked --> that is .. if its a user or a group
  type = null;

  threadMessageView: boolean = false;
  threadMessageParent = null;
  threadMessageItem = null;
  threadMessageType = "";
  composedthreadmessage = null;
  viewDetailScreen: boolean = false;
  // To display image in full screen
  imageView = null;

  //If clicked then only show image in full screen
  fullScreenViewImage: boolean = false;

  constructor() {}

  ngOnInit() {}

  /**
   * Listen to the group emitted by the groupList component
   * @param Event user
   */
  groupClicked(group) {
    this.item = group;

    //Close Thread And User Detail Screen When Chat Window Is Changed
    this.closeThreadMessages();
    this.viewDetailScreen = false;

    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let message = action.payLoad;

    console.log("groupListScreen --> action generation is ", action);

    switch (action.type) {
      case "viewMessageThread": {
        this.viewMessageThread(message);
        break;
      }
      case "closeThreadClicked": {
        this.closeThreadMessages();
        break;
      }
      case "viewActualImage": {
        this.toggleImageView(action.payLoad);
        break;
      }
      case "closeFullScreenImage": {
        this.toggleImageView(null);
      }
      case "viewDetail":
      case "closeDetailClicked": {
        this.toggleDetailView();
        break;
      }
      case "changeThreadParentMessageReplyCount": {
        // this.toggleDetailView();

        this.composedthreadmessage = {
          ...this.threadMessageParent,
          replyCount: action.payLoad,
        };

        console.log(
          "groupListScreen --> thread Message Reply count updated ",
          action.payLoad
        );

        break;
      }
    }
  }

  /**
   * Sets All the Intial Conditions for the threaded View of Messages and Opens thread View
   * @param Any parentMessage
   */
  viewMessageThread(parentMessage) {
    //Open Thread Screen
    this.threadMessageView = true;

    //close user ( the person you are chatting with ) Detail screen
    this.viewDetailScreen = false;

    this.threadMessageParent = parentMessage;
    this.threadMessageItem = this.item;
    this.threadMessageType = this.type;
  }

  /**
   * Close the thread window
   * @param Any parentMessage
   */
  closeThreadMessages() {
    //close Thread Screen
    this.threadMessageView = false;
    this.threadMessageParent = null;
    this.threadMessageItem = null;
    this.threadMessageType = null;
  }

  /**
   * Opens the clicked Image in full screen mode
   * @param Any message
   */
  toggleImageView(message) {
    console.log("userlistscreen toggleImageView ", message);
    this.imageView = message;
    this.fullScreenViewImage = !this.fullScreenViewImage;
  }

  /**
   * Opens User Detail Right Side bar
   * @param Any message
   */
  toggleDetailView = () => {
    this.threadMessageView = false;
    this.viewDetailScreen = !this.viewDetailScreen;
  };
}
