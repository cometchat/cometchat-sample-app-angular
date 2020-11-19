import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'lib-comet-chat-user-contact-list',
  templateUrl: './comet-chat-user-contact-list.component.html',
  styleUrls: ['./comet-chat-user-contact-list.component.css']
})
export class CometChatUserContactListComponent implements OnInit {

  
  usersList;
  usersRequest;
  searchKey : String;
  timeout;
  friendsOnly = false;
  

  constructor() { }

  ngOnInit() {

    this.usersRequest = new CometChat.UsersRequestBuilder().friendsOnly(this.friendsOnly).setLimit(60).build();


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
	 * Search User Based on their Name
	 * @param String searchKey
	*/
  serchUsers(searchKey){

    console.log('search user based on key = ', searchKey);


    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = searchKey;
    this.timeout = setTimeout(() => {

      console.log('Searching for user');

      this.usersRequest = new CometChat.UsersRequestBuilder().friendsOnly(this.friendsOnly).setSearchKeyword(searchKey).setLimit(30).build();

      this.fetchNextContactList();
      
    }, 500)


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
