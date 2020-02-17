import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../CONSTS';

@Component({
  selector: 'app-home-compoenent',
  templateUrl: './app-home-compoenent.component.html',
  styleUrls: ['./app-home-compoenent.component.scss']
})
export class AppHomeCompoenentComponent implements OnInit {
  showUi: boolean = false;
  showloader = false;
  uid;
  constructor() { }

  ngOnInit() {

    CometChat.getLoggedinUser().then(user => {

      if (user) {
        location.href = '/menu';
        this.uid = user.getUid();
      } else {

        this.showUi = true;
        this.showloader = false;
      }
    }, error => {
      console.log('yes here', error);
      this.showUi = true;
      this.showloader = false;
    });

  }

  login = (event?, uid?) => {
    this.showloader = true;
    if (event) {
      event.preventDefault();
    }

    if (uid) {
      this.uid = uid;
    }

    CometChat.login(this.uid, COMETCHAT_CONSTANTS.API_KEY).then((user) => {
      console.log('sucess');
      location.href = '/menu';
    }, error => {
      console.log('CometChatLogin Failed', error);
      this.showloader = false;
    });


  }
}
