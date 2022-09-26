import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChatServices } from 'src/app/app.service';
import { CometChatTheme, fontHelper } from '@cometchat-pro/angular-ui-kit';
import { dataItemStyle } from '@cometchat-pro/angular-ui-kit/lib/src/cometchat-pro-angular-ui-kit/src/components/Messages/CometChatMessageHeader/headerInterface';
import { InputData } from '@cometchat-pro/angular-ui-kit/lib/src/cometchat-pro-angular-ui-kit/src/components/Shared/InputData/inputData';

@Component({
  selector: 'cometchat-users-demo',
  templateUrl: './users-demo.component.html',
  styleUrls: ['./users-demo.component.scss']
})
export class UsersDemoComponent implements OnInit {

  @Input() theme = new CometChatTheme({})
  public openUsersWithMessages:boolean = false;
  public openUsers:boolean = false;
  public openUserList:boolean = false;
  public openUserDataItem:boolean = false;
  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }
  public image:string="https://data-us.cometchat.io/assets/images/avatars/captainamerica.png";
  public user:any = {
    getName:()=> "Raj Dubey",
    getAvatar:()=> this.image,
    getUid:()=>"uid123",
    getStatus:()=>"online"
  };

  public inputdata:InputData = {
    thumbnail:true,
    title:true

  }
  userListStyle:any = {
    
  }
  public dataItemStyle:dataItemStyle = {
    background:"",
    titleColor:"",
    titleFont:"",
    subtitleColor:"",
    subtitleFont:""
  };


  constructor(private router: Router,private route: ActivatedRoute, private cometchatService:CometChatServices) { 
    this.theme = this.cometchatService.theme;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
       if(this.router.getCurrentNavigation()?.extras?.state!["pageName"]){
         if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "usersWithMessages"){
           this.openUsersWithMessages = true;
         }
         else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "users"){
          this.openUsers = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "userList"){
          this.openUserList = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "dataItem"){
          this.openUserDataItem = true;
        }
       }
       else{
        window.history.back()
       }

      }
      else{
        window.history.back()
       }
      
    });
  }

  ngOnInit(): void {

    
    this.setTheme()
    this.onResize()
  }
  innerWidth!: number;
  isMobileView: boolean=false;
    /**
   * Checks when window size is changed in realtime
   */
     @HostListener("window:resize", [])
     onResize(): boolean {
       try {
         this.innerWidth = window.innerWidth;
         if (
           this.innerWidth >= 320 &&
           this.innerWidth <= 760
         ) {
           this.isMobileView = true;
         } else {
           this.isMobileView = false
         }
       } catch (error) {
       
       }
       return true;
     }
  setTheme(){
    this.dataItemStyle.background = this.theme.palette.getBackground();
    this.dataItemStyle.activeBackground = this.theme.palette.getBackground();
    this.dataItemStyle.titleColor = this.theme.palette.getAccent();
    this.dataItemStyle.subtitleColor = this.theme.palette.getAccent600();
    this.dataItemStyle.titleFont = fontHelper(this.theme.typography.title1);
    this.dataItemStyle.subtitleFont = fontHelper(this.theme.typography.subtitle2);
    this.withMessagesStyle.background = this.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = this.theme.palette.getAccent400();
    this.userListStyle.background =   this.theme.palette.getBackground(); 
    this.userListStyle.errorStateTextFont = fontHelper(this.theme.typography.heading)
    this.userListStyle.errorStateTextColor = this.theme.palette.getAccent400()
    this.userListStyle.emptyStateTextFont =  fontHelper(this.theme.typography.heading)
    this.userListStyle.emptyStateTextColor = this.theme.palette.getAccent400()
  }


}
