import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'lib-comet-chat-user-contact-list',
  templateUrl: './comet-chat-user-contact-list.component.html',
  styleUrls: ['./comet-chat-user-contact-list.component.css']
})
export class CometChatUserContactListComponent implements OnInit {

  usersRequest = new CometChat.UsersRequestBuilder().setLimit(60).build();
  usersList;

  constructor() { }

  ngOnInit() {
    let user = CometChat.getLoggedinUser().then(
      user => {
        console.log("Inside librart user details:", { user });
        this.fetchNextContactList();
      },
      error => {
        console.log("error getting details:", { error });
      }
    );
  }

  /**
	 * Get List of users that are contacts of the current user
	 * 
  */
  fetchNextContactList() {
    this.usersRequest.fetchNext().then(
      userList => {
        /* userList will be the list of User class. */
        console.log("User list received:", userList);
        this.usersList = userList;
        /* retrived list can be used to display contact list. */
      },
      error => {
        console.log("User list fetching failed with error:", error);
      }
    );
  }

}
