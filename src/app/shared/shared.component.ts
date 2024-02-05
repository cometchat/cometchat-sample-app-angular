import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CometChatTheme, CometChatThemeService, fontHelper, localize } from '@cometchat/chat-uikit-angular';
@Component({
  selector: 'cometchat-shared-wrapper',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  public localize: any = localize
  public logoutIconURL: string = "assets/logout.svg";
  public soundIconURL: string = "assets/sound-small.png";
  public localizeIconURL: string = "assets/localize.png";
  public themeIconURL: string = "assets/theme.png";
  public conversationIconURL: string = "assets/conversation.png";
  public avatarIconURL: string = "assets/avatar.png";
  public statusIconURL: string = "assets/status.png";
  public badgeIconURL: string = "assets/badge.png";
  public receiptIconURL: string = "assets/receipt.png";
  public textBubbleIcon: string = "assets/text-bubble.svg"
  public audioBubbleIcon: string = "assets/audio-bubble.svg"
  public videoBubbleIcon: string = "assets/video-bubble.svg"
  public imageBubbleIcon: string = "assets/image-bubble.svg"
  public fileBubbleIcon: string = "assets/file-bubble.svg"
  public formBubbleIcon: string = "assets/form-bubble.svg";
  public schedulerBubbleIcon: string = "assets/schedule.svg";
  public cardBubbleIcon: string = "assets/card-bubble.svg"
  public openDataItem: boolean = false;
  public openAvatar: boolean = false;
  public openBadgeCount: boolean = false;
  public openMessageReceipt: boolean = false;
  public openConversationListItem: boolean = false
  public openStatusIndicator: boolean = false;
  public openSoundManager: boolean = false;
  public openTheme: boolean = false;
  public openLocalize: boolean = false;
  public openTextBubble: boolean = false;
  public openAudioBubble: boolean = false;
  public openVideoBubble: boolean = false;
  public openFileBubble: boolean = false;
  public openImageBubble: boolean = false;
  public openFormBubble: boolean = false;
  public openCardBubble: boolean = false;
  public openSchedulerBubble: boolean = false;



  constructor(private themeService: CometChatThemeService, private ref: ChangeDetectorRef) {


  }

  ngOnInit(): void {
  }

  openModal = (name: string) => {
    switch (name) {
      case 'dataItem':
        this.openDataItem = true;
        break;
      case 'avatar':
        this.openAvatar = true;
        break;
      case 'badge':
        this.openBadgeCount = true;
        break;
      case 'receipt':
        this.openMessageReceipt = true;
        break;
      case 'ListItem':
        this.openConversationListItem = true;
        break;
      case 'statusIndicator':
        this.openStatusIndicator = true;
        break;
      case 'soundManager':
        this.openSoundManager = true;
        break;
      case 'theme':
        this.openTheme = true;
        break;
      case 'localize':
        this.openLocalize = true;
        break;
      case 'audio':
        this.openAudioBubble = true;
        break;
      case 'video':
        this.openVideoBubble = true;
        break;
      case 'image':
        this.openImageBubble = true;
        break;
      case 'file':
        this.openFileBubble = true;
        break;
      case 'text':
        this.openTextBubble = true;
        break;
      case 'form':
        this.openFormBubble = true;
        break;
      case 'card':
        this.openCardBubble = true;
        break;
      case 'scheduler':
        this.openSchedulerBubble = true;
        break;
      default:

      // Handle invalid modal name
    }
  }

  closeModal = () => {
    this.openDataItem = false;
    this.openBadgeCount = false
    this.openAvatar = false;
    this.openMessageReceipt = false;
    this.openConversationListItem = false;
    this.openStatusIndicator = false;
    this.openSoundManager = false;
    this.openTheme = false;
    this.openLocalize = false;
    this.openAudioBubble = false;
    this.openVideoBubble = false;
    this.openTextBubble = false;
    this.openImageBubble = false;
    this.openFileBubble = false;
    this.openFormBubble = false;
    this.openCardBubble = false;
    this.openSchedulerBubble = false;
  }
  // styles
  style: any = {
    sidebarStyle: () => {
      return {
        background: this.themeService.theme.palette.getSecondary()

      }
    },
    headerTitleStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.heading),
        color: this.themeService.theme.palette.getAccent()
      }
    },
    sectionHeaderStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent400()
      }
    },
    cardTitleStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.title2),
        color: this.themeService.theme.palette.getAccent()
      }
    },
    cardStyle: () => {
      return {
        background: this.themeService.theme.palette.getBackground(),
        boxShadow: `${this.themeService.theme.palette.getAccent400()} 0px 0px 5px`
      }
    },
    schedulerStyle: () => {
      return {
        background: this.themeService.theme.palette.getBackground(),
        boxShadow: `${this.themeService.theme.palette.getAccent400()} 0px 0px 5px`
      }
    },
    cardDescriptionStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent600()

      }
    },
    footerStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent500()

      }
    },
    iconStyle: (icon: string) => {
      return {
        WebkitMask: `url(${icon}) center center no-repeat`,
        background: this.themeService.theme.palette.getAccent(),
        height: "40px",
        maskSize: "100%",
        width: "fit-content"

      }
    },
    logoutIoncStyle: () => {
      return {
        WebkitMask: `url(${this.logoutIconURL}) center center no-repeat`,
        background: "black",
        height: "24px",
        width: "24px"

      }
    },
  }

}
