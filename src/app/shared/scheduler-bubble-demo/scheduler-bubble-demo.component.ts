import { CalendarStyle, CometChatThemeService, RadioButtonStyle, SchedulerBubbleStyle, SchedulerMessage, TimeSlotStyle, fontHelper, } from '@cometchat/chat-uikit-angular';
import { Component, Input, OnInit } from '@angular/core';

import { AvatarStyle, ListItemStyle, QuickViewStyle } from '@cometchat/uikit-elements';
import '@cometchat/uikit-shared'
@Component({
  selector: 'scheduler-bubble-demo',
  templateUrl: './scheduler-bubble-demo.component.html',
  styleUrls: ['./scheduler-bubble-demo.component.scss']
})
export class SchedulerBubbleDemoComponent implements OnInit {
  public closeIconURL: string = "assets/close.svg";
  public message: any = this.getSchedulerMessage();
  public schedulerBubbleStyle: any;

  @Input() closeButton: any;
  bubbleStyle: any = {}
  constructor(private themeService: CometChatThemeService) { }


  ngOnInit(): void {
    this.message = this.getSchedulerMessage();
    this.schedulerBubbleStyle = this.getSchedulerBubbleStyle();
  }

  getSchedulerBubbleStyle = () => {
    let avatarStyle = new AvatarStyle({
      borderRadius: "50%",
      width: "48px",
      height: "48px",
      border: "none",
      backgroundColor: this.themeService.theme.palette.getAccent700(),
      nameTextColor: this.themeService.theme.palette.getAccent900(),
      backgroundSize: "cover",
      nameTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
    })
    let listItemStyle = new ListItemStyle({
      height: "auto",
      width: "100%",
      background: "inherit",
      activeBackground: "transparent",
      borderRadius: "0",
      titleFont: fontHelper(this.themeService.theme.typography.text1),
      titleColor: this.themeService.theme.palette.getAccent(),
      border: "none",
      separatorColor: "",
      hoverBackground: "transparent"
    })

    let calendarStyle = new CalendarStyle({
      height: "100%",
      width: "100%",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      dateTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      dateTextColor: this.themeService.theme.palette.getAccent(),
      dayTextFont: fontHelper(this.themeService.theme.typography.text2),
      dayTextColor: this.themeService.theme.palette.getAccent(),
      monthYearTextFont: fontHelper(this.themeService.theme.typography.text2),
      monthYearTextColor: this.themeService.theme.palette.getAccent(),
      defaultDateTextBackground: 'transparent',
      disabledDateTextColor: this.themeService.theme.palette.getAccent400(),
      disabledDateTextFont: fontHelper(this.themeService.theme.typography.subtitle2),
      disabledDateTextBackground: "transparent",
      titleTextFont: fontHelper(this.themeService.theme.typography.text1),
      titleTextColor: this.themeService.theme.palette.getAccent(),
      timezoneTextFont: fontHelper(this.themeService.theme.typography.caption2),
      timezoneTextColor: this.themeService.theme.palette.getAccent(),
      arrowButtonTextColor: this.themeService.theme.palette.getAccent(),
      arrowButtonTextFont: fontHelper(this.themeService.theme.typography.title2),
    })
    let timeSlotStyle = new TimeSlotStyle({
      background: "transparent",
      height: "fit-content",
      width: "100%",
      border: "none",
      borderRadius: "0",
      calendarIconTint: this.themeService.theme.palette.getAccent(),
      timezoneIconTint: this.themeService.theme.palette.getAccent(),
      emptySlotIconTint: this.themeService.theme.palette.getAccent500(),
      emptySlotTextColor: this.themeService.theme.palette.getAccent500(),
      emptySlotTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
      dateTextColor: this.themeService.theme.palette.getAccent(),
      dateTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
      seperatorTint: this.themeService.theme.palette.getAccent100(),
      slotBackground: this.themeService.theme.palette.getAccent900(),
      slotBorder: "none",
      slotBorderRadius: "8px",
      slotTextColor: this.themeService.theme.palette.getAccent(),
      slotTextFont: fontHelper(this.themeService.theme.typography.caption2),
      timezoneTextColor: this.themeService.theme.palette.getAccent(),
      timezoneTextFont: fontHelper(this.themeService.theme.typography.caption2),
      titleTextColor: this.themeService.theme.palette.getAccent(),
      titleTextFont: fontHelper(this.themeService.theme.typography.text1)
    })
    let qucikViewStyle = new QuickViewStyle({
      background: this.themeService.theme.palette.getAccent50(),
      height: "fit-content",
      width: "100%",
      titleFont: fontHelper(this.themeService.theme.typography.subtitle2),
      titleColor: this.themeService.theme.palette.getAccent(),
      subtitleFont: fontHelper(this.themeService.theme.typography.subtitle2),
      subtitleColor: this.themeService.theme.palette.getAccent600(),
      leadingBarTint: this.themeService.theme.palette.getPrimary(),
      leadingBarWidth: "4px",
      borderRadius: "8px",
    })
    return new SchedulerBubbleStyle({
      avatarStyle: avatarStyle,
      listItemStyle: listItemStyle,
      quickViewStyle: qucikViewStyle,
      dateSelectorStyle: calendarStyle,
      timeSlotSelectorStyle: timeSlotStyle,
      backButtonIconTint: this.themeService.theme.palette.getPrimary(),
      background: this.themeService.theme.palette.getSecondary(),
      height: "100%",
      width: "100%",
      border: `1px solid ${this.themeService.theme.palette.getAccent100()}`,
      borderRadius: "8px",
      loadingIconTint: this.themeService.theme.palette.getAccent600(),
      suggestedTimeBackground: this.themeService.theme.palette.getAccent900(),
      suggestedTimeBorder: `1px solid ${this.themeService.theme.palette.getPrimary()}`,
      suggestedTimeBorderRadius: "8px",
      suggestedTimeDisabledBackground: this.themeService.theme.palette.getAccent50(),
      suggestedTimeDisabledBorder: `1px solid ${this.themeService.theme.palette.getAccent200()}`,
      suggestedTimeDisabledBorderRadius: "8px",
      suggestedTimeDisabledTextColor: this.themeService.theme.palette.getAccent700(),
      suggestedTimeDisabledTextFont: fontHelper(this.themeService.theme.typography.text3),
      suggestedTimeTextColor: this.themeService.theme.palette.getPrimary(),
      suggestedTimeTextFont: fontHelper(this.themeService.theme.typography.text3),
      moreButtonDisabledTextBackground: "transparent",
      moreButtonDisabledTextBorder: "none",
      moreButtonDisabledTextBorderRadius: "0",
      moreButtonDisabledTextColor: this.themeService.theme.palette.getAccent600(),
      moreButtonDisabledTextFont: fontHelper(this.themeService.theme.typography.caption2),
      moreButtonTextBackground: "transparent",
      moreButtonTextBorder: "none",
      moreButtonTextBorderRadius: "0",
      moreButtonTextColor: this.themeService.theme.palette.getPrimary(),
      moreButtonTextFont: fontHelper(this.themeService.theme.typography.caption2),
      goalCompletionTextColor: this.themeService.theme.palette.getAccent(),
      goalCompletionTextFont: fontHelper(this.themeService.theme.typography.text3),
      errorTextColor: this.themeService.theme.palette.getError(),
      errorTextFont: fontHelper(this.themeService.theme.typography.text3),
      scheduleButtonStyle: {
        iconHeight: "20px", iconWidth: "20px",
        buttonIconTint: this.themeService.theme.palette.getAccent(),
        buttonTextFont: fontHelper(this.themeService.theme.typography.name),
        buttonTextColor: this.themeService.theme.palette.getAccent("dark"),
        border: "none",
        borderRadius: "8px",
        background: this.themeService.theme.palette.getPrimary(),
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "8px"
      },
      seperatorTint: this.themeService.theme.palette.getAccent200(),
      subtitleTextColor: this.themeService.theme.palette.getAccent400(),
      subtitleTextFont: fontHelper(this.themeService.theme.typography.name),
      summaryTextColor: this.themeService.theme.palette.getAccent(),
      summaryTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
      timezoneTextColor: this.themeService.theme.palette.getAccent600(),
      timezoneTextFont: fontHelper(this.themeService.theme.typography.caption2),
      titleTextColor: this.themeService.theme.palette.getAccent(),
      titleTextFont: fontHelper(this.themeService.theme.typography.title1),
      timezoneIconTint: this.themeService.theme.palette.getAccent(),
      calendarIconTint: this.themeService.theme.palette.getAccent(),
      clockIconTint: this.themeService.theme.palette.getAccent(),
    })
  }

  getSchedulerMessage() {
    const json = {
      id: "951",
      conversationId: "group_supergroup",
      sender: "superhero1",
      receiverType: "group",
      receiver: "supergroup",
      category: "interactive",
      type: "scheduler",
      data: {
        duration: 30,
        entities: {
          sender: {
            entity: {
              uid: "superhero1",
              name: "Iron Man",
              role: "default",
              avatar:
                "https://data-us.cometchat-staging.com/assets/images/avatars/ironman.png",
              status: "available",
              createdAt: 1683717043,
              lastActiveAt: 1704362403,
            },
            entityType: "user",
          },
          receiver: {
            entity: {
              guid: "supergroup",
              icon: "https://data-us.cometchat-staging.com/assets/images/avatars/supergroup.png",
              name: "Comic Heros' Hangout",
              type: "public",
              owner: "superhero1",
              createdAt: 1683717041,
              membersCount: 3,
              conversationId: "group_supergroup",
              onlineMembersCount: 207,
            },
            entityType: "group",
          },
        },
        bufferTime: 0,
        interactionGoal: {
          type: "anyAction",
          elementIds: [],
        },
        interactiveData: {
          title: "Meet with Dr. Jacob",
          duration: 60,
          bufferTime: 15,
          icsFileUrl:
            "https://data-us.cometchat.io/23965108c9b89ad2/media/1704380186_864562419_ab59586ed5ab5f89d2c960457ceee249.ics",
          availability: {
            friday: [
              {
                to: "2359",
                from: "0000",
              },
            ],
            monday: [
              {
                to: "1700",
                from: "0600",
              },
            ],
            tuesday: [
              {
                to: "1400",
                from: "1000",
              },
              {
                to: "2000",
                from: "1700",
              },
            ],
            saturday: [
              {
                to: "0800",
                from: "0600",
              },
              {
                to: "2300",
                from: "1200",
              },
            ],
            thursday: [
              {
                to: "2359",
                from: "0000",
              },
            ],
            wednesday: [
              {
                to: "0800",
                from: "0600",
              },
              {
                to: "2300",
                from: "1200",
              },
            ],
          },
          dateRangeEnd: "2024-02-09",
          timezoneCode: "Asia/Kolkata",
          dateRangeStart: "2023-02-10",
          scheduleElement: {
            action: {
              url: "test.com",
              method: "post",
              actionType: "apiAction",
            },
            elementId: "1",
            buttonText: "Schedule",
            elementType: "button",
            disableAfterInteracted: true,
          },
          goalCompletionText: "Appointment scheduled",
          interactableElementIds: ["1"],
          allowSenderInteraction: true,
        },
        allowSenderInteraction: true,
      },
      sentAt: 1706806090,
      updatedAt: 1706806090,
    };

    const schedulerMessage = SchedulerMessage.fromJSON(json);

    return schedulerMessage;

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
