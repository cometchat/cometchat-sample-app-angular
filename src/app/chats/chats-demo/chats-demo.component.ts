import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CometChatServices } from 'src/app/app.service';
import { CometChatLocalize, CometChatTheme, CometChatWrapperComponent, ConversationInputData, fontHelper } from '@cometchat-pro/angular-ui-kit';

@Component({
  selector: 'cometchat-chats-demo',
  templateUrl: './chats-demo.component.html',
  styleUrls: ['./chats-demo.component.scss']
})
export class ChatsDemoComponent implements OnInit {
  @Input() theme = new CometChatTheme({})
  public openConversationsWithMessages:boolean = false;
  public openConversations:boolean = false;
  public openConversationList:boolean = false;
  public openConversationListItem:boolean = false;
  public isOpen:boolean=false;
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

  
  public lastMessage = {
    sentAt:1165370496,
    id:"2121",
    text:"hello",
    getText:()=>"hell",
    sender:{
      name: "dummy man",
      avatar: this.image,
      uid:"uid123",
      status:"online"
    },
    getSentAt:()=>20129012109,
    getDeliveredAt:()=>null,
    getReadAt:()=>null,
    getId:()=>12120,
    getReceiverType:()=> "user"
  }
  public group: any={
    getName:()=> "new group",
    getMembersCount:()=> 12,
    getGuid:()=> "new__group123",
    getType:()=>"public",
    getIcon:()=>null

  };
  public conversationObject:any = {
    getConversationType:()=>"user",
    unreadMessageCount:12,
    conversationWith: {
      uid:"newuser12",
      type:"user",
      name:"raj dubey",
      

    },
    conversationId:"conversation121212",
    lastMessage: this.lastMessage

    

  }
  listItemStyle: any = {
    titleFont: "",
    titleColor: "",
    subTitleColor: "",
    subTitleFont: "",
    typingIndicatorTextColor: "",
    typingIndicatorTextFont: "",
    threadIndicatorTextColor: "",
    threadIndicatorTextFont: "",
    activeBackground:""
  }
  public inputdata:ConversationInputData = {
    thumbnail:true,
    title:true,
    subtitle: ()=> "heyy! nice to meet you.",
    time:true,
    unreadCount:true,
    readReceipt:true


  }

  constructor(private router: Router,private route: ActivatedRoute, private cometchatService:CometChatServices) { 
  
   
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        if(this.router.getCurrentNavigation()?.extras.state!["pageLanguage"]){
          CometChatLocalize.init(this.router.getCurrentNavigation()?.extras.state!["pageLanguage"])
        }
       if(this.router.getCurrentNavigation()?.extras?.state!["pageName"]){
         if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "conversationsWithMessages"){
           this.openConversationsWithMessages = true;
         }
         else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "conversations"){
          this.openConversations = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "conversationList"){
          this.openConversationList = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "conversationListItem"){
          this.openConversationListItem = true;
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
    if(this.cometchatService.customTheme){
      this.theme = this.cometchatService.customTheme;
    }
    else{

      this.theme = this.cometchatService.theme;
    }
  }

  ngOnInit(): void {
  

    this.setTheme()
    this.onResize()
  }
  innerWidth!: number;
  isMobileView: boolean=false;
  conversationListStyle:any = {
    
  }
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
    this.withMessagesStyle.background = this.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = this.theme.palette.getAccent400();
    this.listItemStyle.background = this.theme.palette.getBackground();
    this.listItemStyle.activeBackground = this.theme.palette.getBackground();
    this.listItemStyle.titleFont = fontHelper(this.theme.typography.title1);
    this.listItemStyle.titleColor = this.theme.palette.getAccent();
    this.listItemStyle.subTitleFont = fontHelper(this.theme.typography.subtitle2);
    this.listItemStyle.subTitleColor = this.theme.palette.getAccent600();
    this.listItemStyle.typingIndicatorTextColor = this.theme.palette.getPrimary();
    this.listItemStyle.typingIndicatorTextFont = fontHelper(this.theme.typography.subtitle2);
    this.listItemStyle.threadIndicatorTextFont =  fontHelper(this.theme.typography.subtitle2);
    this.listItemStyle.threadIndicatorTextColor = this.theme.palette.getAccent400();
    this.conversationListStyle.background =   this.theme.palette.getBackground(); 
    this.conversationListStyle.errorStateTextFont = fontHelper(this.theme.typography.heading)
    this.conversationListStyle.errorStateTextColor = this.theme.palette.getAccent400()
    this.conversationListStyle.emptyStateTextFont =  fontHelper(this.theme.typography.heading)
    this.conversationListStyle.emptyStateTextColor = this.theme.palette.getAccent400()
  }
  ngOnDestroy(){
    CometChatLocalize.init(CometChatLocalize.getBrowserLanguage());
    this.cometchatService.customTheme = undefined;
    CometChatWrapperComponent.cometchattheme = null;
  }


}
