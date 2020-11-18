import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'projects/angular-chat-app/src/CONSTS';

@Component({
  selector: 'app-kitchen-sink-app',
  templateUrl: './kitchen-sink-app.component.html',
  styleUrls: ['./kitchen-sink-app.component.scss']
})
export class KitchenSinkAppComponent implements OnInit {

  userInput : String = '';

  constructor(private router: Router) { }

  ngOnInit() {
    //console.log('kitchen sink app loaded');

    //Create User
    // let  user = new CometChat.User('testing');
    // user.setName('Sohail');
    // CometChat.createUser(user, COMETCHAT_CONSTANTS.API_KEY).then(
    //   user => {
    //       console.log("user created", user);
    //   },error => {
    //       console.log("error", error);
    //   }
    // )

  }

  
  /**
	 * Get webApp Info and businessIDs from token data
	 * @param {String} UID
	*/
  onLogin(UID){
    //console.log(UID)
    
    CometChat.login(UID, COMETCHAT_CONSTANTS.API_KEY).then(
      user => {
        console.log("Login Successful:", { user });    
        this.router.navigate(['/Home']);
      },
      error => {
        //console.log("Login failed with exception:", { error });    
      }
    );
    
  }

}
