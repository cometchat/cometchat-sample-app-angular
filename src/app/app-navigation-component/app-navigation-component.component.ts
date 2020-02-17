import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-navigation-component',
  templateUrl: './app-navigation-component.component.html',
  styleUrls: ['./app-navigation-component.component.scss']
})
export class AppNavigationComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    CometChat.getLoggedinUser().then(user => {
      console.log('we are here', user);
      if (!user) {
        location.href = '/';
      }
    }, error => {
      console.log(error);
      location.href = '/';
    });
  }

  logout = () => {
    CometChat.logout().then(() => {
      location.href = '/';
    });
  }

}
