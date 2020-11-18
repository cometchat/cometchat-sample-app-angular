import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


   /**
	 * Get webApp Info and businessIDs from token data
	 * @param 
	*/
 onLogout(){

  CometChat.logout().then(
    user => {
      //console.log("Logout successfull:");  
      this.router.navigate(['/login']);

    },
    error => {
      //console.log("Logout failed", { error });    
    }
  );

  
   
 }

}
