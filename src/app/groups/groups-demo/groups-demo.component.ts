import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChatServices } from 'src/app/app.service';
import { CometChatTheme, fontHelper } from '@cometchat-pro/angular-ui-kit';
import { dataItemStyle } from '@cometchat-pro/angular-ui-kit/lib/src/cometchat-pro-angular-ui-kit/src/components/Messages/CometChatMessageHeader/headerInterface';
import { InputData } from '@cometchat-pro/angular-ui-kit/lib/src/cometchat-pro-angular-ui-kit/src/components/Shared/InputData/inputData';

@Component({
  selector: 'cometchat-groups-demo',
  templateUrl: './groups-demo.component.html',
  styleUrls: ['./groups-demo.component.scss']
})
export class GroupsDemoComponent implements OnInit {

  @Input() theme = new CometChatTheme({})
  public openGroupsWithMessages:boolean = false;
  public openGroups:boolean = false;
  public openGroupList:boolean = false;
  public openGroupDataItem:boolean = false;
  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }
  groupListStyle:any = {
    
  }
  public group: any={
    getName:()=> "new group",
    getMembersCount:()=> 12,
    getGuid:()=> "new__group123",
    getType:()=>"public",
    getIcon:()=>null

  };
  public dataItemStyle:dataItemStyle = {
    background:"",
    titleColor:"",
    titleFont:"",
    subtitleColor:"",
    subtitleFont:""
  };
  public groupInputdata:InputData = {
    thumbnail:true,
    title:true,


  }

  constructor(private router: Router,private route: ActivatedRoute, private cometchatService:CometChatServices) { 
    this.theme = this.cometchatService.theme;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
       if(this.router.getCurrentNavigation()?.extras?.state!["pageName"]){
         if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "groupsWithMessages"){
           this.openGroupsWithMessages = true;
         }
         else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "groups"){
          this.openGroups = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "groupList"){
          this.openGroupList = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "dataItem"){
          this.openGroupDataItem = true;
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
    this.groupInputdata.subtitle = ()=> this.group.getMembersCount() + " members";

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
    this.withMessagesStyle.background = this.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = this.theme.palette.getAccent400();

    this.dataItemStyle.background = this.theme.palette.getBackground();
    this.dataItemStyle.activeBackground = this.theme.palette.getBackground();
    this.dataItemStyle.titleColor = this.theme.palette.getAccent();
    this.dataItemStyle.subtitleColor = this.theme.palette.getAccent600();
    this.dataItemStyle.titleFont = fontHelper(this.theme.typography.title1);
    this.dataItemStyle.subtitleFont = fontHelper(this.theme.typography.subtitle2);
    this.groupListStyle.background =   this.theme.palette.getBackground(); 
    this.groupListStyle.errorStateTextFont = fontHelper(this.theme.typography.heading)
    this.groupListStyle.errorStateTextColor = this.theme.palette.getAccent400()
    this.groupListStyle.emptyStateTextFont =  fontHelper(this.theme.typography.heading)
    this.groupListStyle.emptyStateTextColor = this.theme.palette.getAccent400()
  }

}
