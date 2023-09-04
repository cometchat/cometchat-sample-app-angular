import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatLocalize, CometChatTheme, CometChatThemeService, CometChatUIKitConstants, fontHelper } from '@cometchat/chat-uikit-angular';
import { ListItemStyle } from '@cometchat/uikit-elements';


@Component({
  selector: 'details-demo',
  templateUrl: './details-demo.component.html',
  styleUrls: ['./details-demo.component.scss']
})
export class DetailsDemoComponent implements OnInit {

 public user!:CometChat.User | null;
 group!:CometChat.Group;




  constructor(private router: Router,private route: ActivatedRoute,private themeService:CometChatThemeService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state!["type"]) {
        if(this.router.getCurrentNavigation()?.extras?.state!["type"] == CometChatUIKitConstants.MessageReceiverType.user){
          CometChat.getLoggedinUser().then((user:CometChat.User | null)=>{
             this.user = user
          })
          .catch((error:CometChat.CometChatException)=>{
            console.log(error)
          })
        }
        else{
          CometChat.getGroup("supergroup").then((group:CometChat.Group)=>{
            this.group = group

          })
          .catch((error:CometChat.CometChatException)=>{
            console.log(error)
          })
        }
      }


    });
  }

  ngOnInit(): void {

  }
  innerWidth!: number;
  isMobileView: boolean=false;
  listItemStyle: ListItemStyle = {
    height: "100%",
    width: "100%",

  };



}
