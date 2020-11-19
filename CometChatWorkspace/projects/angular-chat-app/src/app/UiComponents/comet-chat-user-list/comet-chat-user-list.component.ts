import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-comet-chat-user-list',
  templateUrl: './comet-chat-user-list.component.html',
  styleUrls: ['./comet-chat-user-list.component.scss']
})
export class CometChatUserListComponent implements OnInit {

  usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();

  constructor() { }

  ngOnInit() {

    let user = CometChat.getLoggedinUser().then(
      user => {
        console.log("user details:", { user });
      },
      error => {
        console.log("error getting details:", { error });
      }
    );
  }

}
