import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'lib-comet-chat-user-contact-list',
  templateUrl: './comet-chat-user-contact-list.component.html',
  styleUrls: ['./comet-chat-user-contact-list.component.css']
})
export class CometChatUserContactListComponent implements OnInit {

  usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();

  constructor() { }

  ngOnInit() {
    let user = CometChat.getLoggedinUser().then(
      user => {
        console.log("Inside librart user details:", { user });
        //console.log(this.fetchNextContactList());
        
      },
      error => {
        console.log("error getting details:", { error });
      }
    );
  }

  /**
	 * Get List of users that are contacts of the current user
	 * @param {String} UID
	*/
  // fetchNextContactList() {
  //   return this.usersRequest.fetchNext();
  // }

}
