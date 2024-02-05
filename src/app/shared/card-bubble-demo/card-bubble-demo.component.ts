import { CardBubbleStyle, CardMessage, CometChatThemeService, fontHelper, } from '@cometchat/chat-uikit-angular';
import { Component, Input, OnInit } from '@angular/core';

import { AvatarStyle } from '@cometchat/uikit-elements';

@Component({
  selector: 'card-bubble-demo',
  templateUrl: './card-bubble-demo.component.html',
  styleUrls: ['./card-bubble-demo.component.scss']
})
export class CardBubbleDemoComponent implements OnInit {
  public closeIconURL: string = "assets/close.svg";
  public message: any = this.getCardMessage();
  public cardBubbleStyle: any = this.getCardMessageBubbleStyle();

  @Input() closeButton: any;
  bubbleStyle: any = {}
  constructor(private themeService: CometChatThemeService) { }


  ngOnInit(): void {
    this.message = this.getCardMessage();
    this.cardBubbleStyle = this.getCardMessageBubbleStyle();
  }

  getCardMessageBubbleStyle() {
    const buttonStyle = {
      height: "40px",
      width: "100%",
      background: "transparent",
      border: `none`,
      borderRadius: "0px",
      buttonTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      buttonTextColor: `${this.themeService.theme.palette.getPrimary()}`,
      justifyContent: "center",
    };

    return new CardBubbleStyle({
      background: "transparent",
      border: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      borderRadius: "8px",
      height: "fit-content",
      width: "300px",
      imageHeight: "auto",
      imageWidth: "100%",
      imageRadius: "8px",
      imageBackgroundColor: "transparent",
      descriptionFontColor: this.themeService.theme.palette.getAccent(),
      descriptionFont: fontHelper(this.themeService.theme.typography.subtitle2),
      buttonStyle: buttonStyle,
      dividerTintColor: this.themeService.theme.palette.getAccent100(),
      wrapperBackground: this.themeService.theme.palette.getBackground(),
      wrapperBorderRadius: "8px",
      wrapperPadding: "2px",
      disabledButtonColor: this.themeService.theme.palette.getAccent600(),
    });
  }

  getCardMessage() {
    const json = {
      id: "1978",
      muid: "1697641596",
      conversationId: "nakul_user_rohit",
      sender: "nakul",
      receiverType: "user",
      receiver: "rohit",
      category: "interactive",
      type: "card",
      data: {
        entities: {
          sender: {
            entity: {
              uid: "nakul",
              name: "Nakul",
              role: "default",
              status: "available",
              lastActiveAt: 1697636600,
            },
            entityType: "user",
          },
          receiver: {
            entity: {
              uid: "rohit",
              name: "Rohit",
              role: "default",
              status: "available",
              lastActiveAt: 1696508846,
              conversationId: "nakul_user_rohit",
            },
            entityType: "user",
          },
        },
        resource:
          "REACT_NATIVE-4_0_0-2d83fe8e-a47e-444c-bbbf-c5d68afc030a-1697640527366",
        interactionGoal: {
          type: "none",
          elementIds: [],
        },
        interactiveData: {
          text: "Introducing our latest product, the Super Widget 5000! With its advanced features and sleek design, this widget is sure to revolutionize the industry. Don't miss out on the opportunity to experience the future of widgets. Order yours today!",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/e/e1/Thomas_D._Baird_%28low-resolution%29.jpg",
          cardActions: [
            {
              action: {
                url: "https://api.example.com/register",
                actionType: "urlNavigation",
              },
              elementId: "submitButton1",
              buttonText: "Order Now",
              elementType: "button",
              disableAfterInteracted: true,
            },
            {
              action: {
                url: "https://api.example.com/register",
                actionType: "urlNavigation",
              },
              elementId: "submitButton2",
              buttonText: "Register Now",
              elementType: "button",
              disableAfterInteracted: true,
            },
            {
              action: {
                url: "https://api.example.com/register",
                actionType: "urlNavigation",
              },
              elementId: "submitButton3",
              buttonText: "Login Now",
              elementType: "button",
              disableAfterInteracted: true,
            },
          ],
          interactableElementIds: [
            "submitButton1",
            "submitButton2",
            "submitButton3",
          ],
        },
        allowSenderInteraction: true,
      },
      sentAt: 1697641596,
      deliveredAt: 1697641596,
      readAt: 1697708285,
      updatedAt: 1697708285,
    };

    const cardMessage = CardMessage.fromJSON(json);

    return cardMessage;
  }


  // style
  style: any = {
    closeIconStyle: () => {
      return {
        WebkitMask: `url(${this.closeIconURL}) center center no-repeat`,
        background: this.themeService.theme.palette.getAccent600(),


      }
    },
    titleStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.title2),
        color: this.themeService.theme.palette.getAccent(),

      }
    },
    wrapperStyle: () => {
      return {
        background: this.themeService.theme.palette.getBackground(),
        boxShadow: `${this.themeService.theme.palette.getAccent400()} 0px 0px 3px`

      }
    },
    cardDescriptionStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent600()
      }
    },

  }
}
