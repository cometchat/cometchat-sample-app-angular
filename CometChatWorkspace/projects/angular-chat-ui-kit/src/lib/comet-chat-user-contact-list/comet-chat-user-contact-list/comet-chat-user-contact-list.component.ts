import { Component, Input, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "lib-comet-chat-user-contact-list",
  templateUrl: "./comet-chat-user-contact-list.component.html",
  styleUrls: ["./comet-chat-user-contact-list.component.css"],
})
export class CometChatUserContactListComponent implements OnInit {
  @Input() friendsOnly = false;
  contacts = [];
  usersList = [];
  usersRequest;
  timeout;
  defaultAvatarImage =
    "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";

  constructor() {}

  ngOnInit() {
    //console.log(`friends only status is `, this.friendsOnly);

    this.usersRequest = new CometChat.UsersRequestBuilder()
      .friendsOnly(this.friendsOnly)
      .setLimit(60)
      .build();

    let user = CometChat.getLoggedinUser().then(
      (user) => {
        //console.log("Inside library user details:", { user });
        this.fetchNextContactList();
      },
      (error) => {
        console.log("error getting details:", { error });
      }
    );
  }

  /**
   * Search User Based on their Name
   * @param String searchKey
   */
  searchUsers(searchKey) {
    //console.log("search user based on key = ", searchKey);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = searchKey;
    this.timeout = setTimeout(() => {
      //console.log("Searching for user");

      //Empty Intial User List before searching user list according to search key
      this.usersList = [];

      this.usersRequest = new CometChat.UsersRequestBuilder()
        .friendsOnly(this.friendsOnly)
        .setSearchKeyword(searchKey)
        .setLimit(30)
        .build();

      this.fetchNextContactList();
    }, 500);
  }

  /**
   * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
   * @param Event e
   */
  handleScroll(e) {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);

    console.log("reached bottom ", bottom);

    if (bottom) this.fetchNextContactList();
  }

  /**
   * Get List of users that are contacts of the current user
   *
   */
  fetchNextContactList() {
    this.usersRequest.fetchNext().then(
      (userList) => {
        /* userList will be the list of User class. */
        console.log("User list received:", userList);
        this.usersList = [...this.usersList, ...userList];
      },
      (error) => {
        console.log("User list fetching failed with error:", error);
      }
    );
  }
}
