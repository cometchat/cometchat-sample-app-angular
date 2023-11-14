import { CheckboxStyle, CometChatTheme, CometChatThemeService, DropdownStyle, FormBubbleStyle, FormMessage, InputStyle, LabelStyle, RadioButtonStyle, fontHelper, } from '@cometchat/chat-uikit-angular';
import { Component, Input, OnInit } from '@angular/core';

import { AvatarStyle } from '@cometchat/uikit-elements';

@Component({
  selector: 'form-bubble-demo',
  templateUrl: './form-bubble-demo.component.html',
  styleUrls: ['./form-bubble-demo.component.scss']
})
export class FormBubbleDemoComponent implements OnInit {
  public closeIconURL:string="assets/close2x.svg";
  public message:any = this.getFormMessage();
  public formBubbleStyle:any = this.getFormMessageBubbleStyle();

  @Input() closeButton:any;
    bubbleStyle:any = {}
    audioURL:string = "assets/sample.mp3"
  constructor(private themeService:CometChatThemeService) { }


  ngOnInit(): void {
    this.message = this.getFormMessage();
    this.formBubbleStyle = this.getFormMessageBubbleStyle();
  }

  getFormMessageBubbleStyle() {
    let textStyle = new InputStyle({
      width: "100%",
      height: "30px",
      border: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      borderRadius: "3px",
      padding: "0px 0px 0px 5px",
      placeholderTextColor: this.themeService.theme.palette.getAccent400(),
      placeholderTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      textFont: fontHelper(this.themeService.theme.typography.subtitle2),
      textColor: this.themeService.theme.palette.getAccent(),
      background: this.themeService.theme.palette.getBackground(),
    });
    const labelStyle = new LabelStyle({
      textFont: fontHelper(this.themeService.theme.typography.subtitle1),
      textColor: this.themeService.theme.palette.getAccent(),
      background: "transparent",
    });
    const radioButtonStyle = new RadioButtonStyle({
      height: "16px",
      width: "16px",
      border: "none",
      labelTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      labelTextColor: this.themeService.theme.palette.getAccent600(),
      borderRadius: "4px",
      background: "",
    });
    const checkboxStyle = new CheckboxStyle({
      height: "16px",
      width: "16px",
      border: "none",
      borderRadius: "4px",
      background: "",
      labelTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      labelTextColor: this.themeService.theme.palette.getAccent600(),
    });
    const dropdownStyle = new DropdownStyle({
      height: "35px",
      width: "100%",
      background: this.themeService.theme.palette.getBackground(),
      border: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      borderRadius: "12px",
      activeTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      activeTextColor: this.themeService.theme.palette.getAccent(),
      arrowIconTint: this.themeService.theme.palette.getAccent700(),
      textFont: fontHelper(this.themeService.theme.typography.subtitle2),
      textColor: this.themeService.theme.palette.getAccent(),
      optionBackground: this.themeService.theme.palette.getBackground(),
      optionBorder: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      optionHoverBorder: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      hoverTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      hoverTextColor: this.themeService.theme.palette.getAccent(),
      hoverTextBackground: this.themeService.theme.palette.getAccent100(),
    });
    const buttonGroupStyle = {
      height: "40px",
      width: "100%",
      background: this.themeService.theme.palette.getPrimary(),
      border: `none`,
      borderRadius: "12px",
      buttonTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      buttonTextColor: this.themeService.theme.palette.getBackground(),
      justifyContent: "center",
    };
    const singleSelectStyle = {
      height: "100%",
      width: "100%",
      background: this.themeService.theme.palette.getBackground()!,
      border: "none",
      borderRadius: "12px",
      activeTextFont: fontHelper(this.themeService.theme.typography.subtitle2)!,
      activeTextColor: this.themeService.theme.palette.getAccent()!,
      activeTextBackground: this.themeService.theme.palette.getAccent100()!,
      textFont: fontHelper(this.themeService.theme.typography.subtitle2)!,
      textColor: this.themeService.theme.palette.getAccent() || "",
      optionBackground: this.themeService.theme.palette.getBackground() || "",
      optionBorder: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      optionBorderRadius: "2px",
      hoverTextFont: fontHelper(this.themeService.theme.typography.subtitle2)!,
      hoverTextColor: this.themeService.theme.palette.getAccent()!,
      hoverTextBackground: this.themeService.theme.palette.getAccent100()!,
    };
    const quickViewStyle = {
      background: "transparent",
      height: "fit-content",
      width: "100%",
      titleFont: fontHelper(this.themeService.theme.typography.subtitle2) || "",
      titleColor: this.themeService.theme.palette.getPrimary() || "",
      subtitleFont: fontHelper(this.themeService.theme.typography.subtitle2)!,
      subtitleColor: this.themeService.theme.palette.getAccent600()!,
      leadingBarTint: this.themeService.theme.palette.getPrimary()!,
      leadingBarWidth: "4px",
      borderRadius: "8px",
      closeIconTint: "",
    };
    return new FormBubbleStyle({
      width: "300px",
      height: "fit-content",
      border: "1px solid #e0e0e0",
      background: "transparent",
      wrapperBackground: this.themeService.theme.palette.getBackground(),
      borderRadius: "8px",
      wrapperBorderRadius: "8px",
      textInputStyle: textStyle,
      labelStyle: labelStyle,
      radioButtonStyle: radioButtonStyle,
      checkboxStyle: checkboxStyle,
      dropdownStyle: dropdownStyle,
      buttonStyle: buttonGroupStyle,
      singleSelectStyle: singleSelectStyle,
      quickViewStyle: quickViewStyle,
      titleColor: this.themeService.theme.palette.getAccent(),
      titleFont: fontHelper(this.themeService.theme.typography.title1),
      goalCompletionTextColor: this.themeService.theme.palette.getAccent(),
      goalCompletionTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
      wrapperPadding: "2px",
    });
  }

  getFormMessage() {
    const json = {
      id: "2862",
      muid: "1698667506320",
      conversationId: "group_group_1696408979857",
      sender: "nakul",
      receiverType: "group",
      receiver: "group_1696408979857",
      category: "interactive",
      type: "form",
      data: {
        entities: {
          sender: {
            entity: {
              uid: "nakul",
              name: "Nakul",
              role: "default",
              status: "available",
              lastActiveAt: 1698830332,
            },
            entityType: "user",
          },
          receiver: {
            entity: {
              guid: "group_1696408979857",
              name: "chutiyaGang",
              type: "public",
              owner: "vivek",
              createdAt: 1696408980,
              updatedAt: 1698667314,
              membersCount: 7,
              conversationId: "group_group_1696408979857",
              onlineMembersCount: 14,
            },
            entityType: "group",
          },
        },
        metadata: {
          data: {
            text: "Thanks For filling the Form!",
          },
          type: "text",
          category: "message",
          receiver: "{$s}",
          receiverType: "{$t}",
        },
        resource:
          "WEB-4_0_1-a9b124b3-e092-43a7-9f78-cf507c93d153-1698830285347",
        interactions: [
          {
            elementId: "element8",
            interactedAt: 1699874632,
          },
        ],
        interactionGoal: {
          type: "none",
          elementIds: [],
        },
        interactiveData: {
          title: "Society Survey",
          formFields: [
            {
              label: "Name",
              maxLines: 1,
              optional: false,
              elementId: "element1",
              elementType: "textInput",
              defaultValue: "vivek",
            },
            {
              label: "Last Name",
              maxLines: 1,
              optional: false,
              elementId: "element2",
              elementType: "textInput",
            },
            {
              label: "Address",
              maxLines: 5,
              optional: false,
              elementId: "element3",
              elementType: "textInput",
            },
            {
              label: "Country",
              options: [
                {
                  label: "INDIA",
                  value: "option1",
                },
                {
                  label: "AUSTRALIA",
                  value: "option2",
                },
              ],
              optional: false,
              elementId: "element4",
              elementType: "dropdown",
              defaultValue: "option1",
            },
            {
              label: "Services",
              options: [
                {
                  label: "Garbage",
                  value: "option1",
                },
                {
                  label: "Electricity Bill",
                  value: "option2",
                },
                {
                  label: "Lift",
                  value: "option3",
                },
              ],
              optional: false,
              elementId: "element5",
              elementType: "checkbox",
              defaultValue: ["option1", "option2"],
            },
            {
              label: "Wing",
              options: [
                {
                  label: "A",
                  value: "option1",
                },
                {
                  label: "B",
                  value: "option2",
                },
              ],
              optional: false,
              elementId: "element6",
              elementType: "singleSelect",
              defaultValue: "option1",
            },
            {
              action: {
                url: "https://www.cometchat.com/",
                actionType: "urlNavigation",
              },
              elementId: "element9",
              buttonText: "About us",
              elementType: "button",
              disableAfterInteracted: true,
            },
          ],
          submitElement: {
            action: {
              url: "",
              actionType: "urlNavigation",
            },
            elementId: "element8",
            buttonText: "Submit",
            elementType: "button",
            disableAfterInteracted: true,
          },
        },
        allowSenderInteraction: true,
      },
      sentAt: 1698830332,
      updatedAt: 1698830332,
    };
    const formMessage = FormMessage.fromJSON(json);
    return formMessage;
  }


  // style
  style:any = {
    closeIconStyle:()=>{
      return{
        WebkitMask: `url(${this.closeIconURL}) center center no-repeat`,
        background:  this.themeService.theme.palette.getAccent600(),


      }
    },
    titleStyle:()=>{
      return{
       font: fontHelper(this.themeService.theme.typography.title2),
       color:this.themeService.theme.palette.getAccent(),

      }
    },
    wrapperStyle:()=>{
      return{
        background:  this.themeService.theme.palette.getBackground(),
        boxShadow: `${this.themeService.theme.palette.getAccent400()} 0px 0px 3px`

      }
    },
    cardDescriptionStyle:()=>{
      return{
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color:this.themeService.theme.palette.getAccent600()
      }
    },

  }
}
