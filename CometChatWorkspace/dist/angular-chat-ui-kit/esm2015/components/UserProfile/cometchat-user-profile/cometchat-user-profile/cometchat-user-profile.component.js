/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/cometchat-user-profile/cometchat-user-profile/cometchat-user-profile.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
export class CometchatUserProfileComponent {
    constructor() {
        this.MORE = STRING_MESSAGES.MORE;
        this.ONLINE = STRING_MESSAGES.ONLINE;
        this.PREFERENCES = STRING_MESSAGES.PREFERENCES;
        this.NOTIFICATIONS = STRING_MESSAGES.NOTIFICATIONS;
        this.PRIVACY_AND_SECURITY = STRING_MESSAGES.PRIVACY_AND_SECURITY;
        this.CHATS = STRING_MESSAGES.CHATS;
        this.OTHER = STRING_MESSAGES.OTHER;
        this.HELP = STRING_MESSAGES.HELP;
        this.REPORT_PROBLEM = STRING_MESSAGES.REPORT_PROBLEM;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getProfile();
    }
    /**
     * @return {?}
     */
    getProfile() {
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        (user) => {
            this.user = user;
            this.name = this.user.name;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log("[CometChatUserInfoScreen] getProfile getLoggedInUser error", error);
        }));
    }
}
CometchatUserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-profile",
                template: "<div class=\"userInfoScreenStyle\">\n  <div class=\"headerStyle\">\n    <h4 class=\"headerTitleStyle\">{{ MORE }}</h4>\n  </div>\n  <div class=\"detailStyle\">\n    <div class=\"thumbnailStyle\">\n      <cometchat-avatar [item]=\"user\"></cometchat-avatar>\n    </div>\n    <div class=\"userDetailStyle\">\n      <div class=\"userNameStyle\">\n        {{ name }}\n      </div>\n      <p class=\"userStatusStyle\">{{ ONLINE }}</p>\n    </div>\n  </div>\n  <div class=\"optionsStyle\">\n    <div class=\"optionTitleStyle\">{{ PREFERENCES }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Notifications\">\n        <div class=\"optionNameStyle\">{{ NOTIFICATIONS }}</div>\n      </div>\n      <div class=\"optionStyle Privacy\">\n        <div class=\"optionNameStyle\">{{ PRIVACY_AND_SECURITY }}</div>\n      </div>\n      <div class=\"optionStyle Chats\">\n        <div class=\"optionNameStyle\">{{ CHATS }}</div>\n      </div>\n    </div>\n    <div class=\"optionTitleStyle Other\">{{ OTHER }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Help\">\n        <div class=\"optionNameStyle\">{{ HELP }}</div>\n      </div>\n      <div class=\"optionStyle Report\">\n        <div class=\"optionNameStyle\">{{ REPORT_PROBLEM }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".userInfoScreenStyle{display:flex;flex-direction:column!important;height:calc(100% - 40px);font-family:Inter,sans-serif}.userInfoScreenStyle *{box-sizing:border-box;font-family:Inter,sans-serif}.userInfoScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.userInfoScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.userInfoScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.userInfoScreenStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea}.headerTitleStyle{margin:0;font-weight:700;font-size:22px}.detailStyle{padding:19px 16px;display:flex;flex-direction:row;justify-content:left;align-items:center}.thumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.userDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.userNameStyle{margin:0;font-size:15px;font-weight:600;display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.userStatusStyle{font-size:13px;margin:0;color:#39f}.optionsStyle{height:calc(100% - 196px);overflow-y:auto;padding:0 16px;display:flex;flex-direction:column;justify-content:left;align-items:flex-start}.optionTitleStyle{margin:5px 0;width:100%;font-size:12px;color:#ccc;text-transform:uppercase}.optionListStyle{padding:10px 0;width:100%;font-size:15px}.optionStyle{width:100%;padding:15px 15px 15px 48px;font-weight:600}.optionNameStyle{width:100%}.Notifications{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2IDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUuMjg2IDE1LjI5Yy42My42My4xOCAxLjcxLS43MSAxLjcxSDEuNDA2Yy0uODkgMC0xLjMzLTEuMDgtLjctMS43MUwxLjk5NiAxNFY5YzAtMy4wOCAxLjYzLTUuNjQgNC41LTYuMzJWMmMwLS44My42Ny0xLjUgMS41LTEuNXMxLjUuNjcgMS41IDEuNXYuNjhjMi44Ni42OCA0LjUgMy4yNSA0LjUgNi4zMnY1ek01Ljk5NiAxOGg0YTIgMiAwIDEgMS00IDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Privacy{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDE4IDIyIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNOSAxMC45OTJoN2MtLjUzIDQuMTItMy4yOCA3Ljc5LTcgOC45NHYtOC45M0gydi01LjdsNy0zLjExek04LjE5LjM2MmwtNyAzLjExQy40NyAzLjc5MyAwIDQuNTEzIDAgNS4zMDN2NC43YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEydi00LjdjMC0uNzktLjQ3LTEuNTEtMS4xOS0xLjgzbC03LTMuMTFjLS41MS0uMjMtMS4xMS0uMjMtMS42MiAweiIvPjwvZz48L2c+PC9zdmc+) 16px center no-repeat}.Chats{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUgNkg1Yy0uNTUgMC0xLS40NS0xLTFzLjQ1LTEgMS0xaDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxem0tNCA2SDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTFoNmMuNTUgMCAxIC40NSAxIDFzLS40NSAxLTEgMXpNNSA3aDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxSDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTF6bTEzLTdIMkMuOSAwIC4wMS45LjAxIDJMMCAyMGw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWMmMwLTEuMS0uOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==) 16px center no-repeat}.Help{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTIuMTcgMTAuMTdjLS41LjUxLS44Ni45Ny0xLjA0IDEuNjktLjA4LjMyLS4xMy42OC0uMTMgMS4xNEg5di0uNWEzLjk5NyAzLjk5NyAwIDAgMSAxLjE3LTIuODNsMS4yNC0xLjI2Yy40Ni0uNDQuNjgtMS4xLjU1LTEuOGExLjk5IDEuOTkgMCAwIDAtMS4zOS0xLjUzYy0xLjExLS4zMS0yLjE0LjMyLTIuNDcgMS4yNy0uMTIuMzctLjQzLjY1LS44Mi42NWgtLjNDNi40IDcgNiA2LjQ0IDYuMTYgNS44OGE0LjAwOCA0LjAwOCAwIDAgMSAzLjIzLTIuODNjMS41Mi0uMjQgMi45Ny41NSAzLjg3IDEuOCAxLjE4IDEuNjMuODMgMy4zOC0uMTkgNC40ek0xMSAxN0g5di0yaDJ6TTEwIDBDNC40OCAwIDAgNC40OCAwIDEwczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNS41MiAwIDEwIDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Report{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDIyIDE4Ij48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTEuMDAzIDExLjAwMmMtLjU1IDAtMS0uNDUtMS0xdi0yYzAtLjU1LjQ1LTEgMS0xczEgLjQ1IDEgMXYyYzAgLjU1LS40NSAxLTEgMXptMSA0aC0ydi0yaDJ6bS0xMC4yNyAzaDE4LjUzYy43NyAwIDEuMjUtLjgzLjg3LTEuNWwtOS4yNy0xNmEuOTk2Ljk5NiAwIDAgMC0xLjczIDBsLTkuMjcgMTZjLS4zOC42Ny4xIDEuNS44NyAxLjV6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}"]
            }] }
];
/** @nocollapse */
CometchatUserProfileComponent.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    CometchatUserProfileComponent.prototype.user;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.name;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.MORE;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.ONLINE;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.PREFERENCES;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.NOTIFICATIONS;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.PRIVACY_AND_SECURITY;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.CHATS;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.OTHER;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.HELP;
    /** @type {?} */
    CometchatUserProfileComponent.prototype.REPORT_PROBLEM;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2VyUHJvZmlsZS9jb21ldGNoYXQtdXNlci1wcm9maWxlL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUvY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU1sRSxNQUFNLE9BQU8sNkJBQTZCO0lBY3hDO1FBVkEsU0FBSSxHQUFXLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDcEMsV0FBTSxHQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEMsZ0JBQVcsR0FBVyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ2xELGtCQUFhLEdBQVcsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUN0RCx5QkFBb0IsR0FBVyxlQUFlLENBQUMsb0JBQW9CLENBQUM7UUFDcEUsVUFBSyxHQUFXLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDdEMsVUFBSyxHQUFXLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDdEMsU0FBSSxHQUFXLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDcEMsbUJBQWMsR0FBVyxlQUFlLENBQUMsY0FBYyxDQUFDO0lBRXpDLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksZ0JBQWdCLEVBQUU7YUFDbkIsZUFBZSxFQUFFO2FBQ2pCLElBQUk7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDLEVBQUM7YUFDRCxLQUFLOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQ1QsNERBQTRELEVBQzVELEtBQUssQ0FDTixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLDZ6Q0FBc0Q7O2FBRXZEOzs7Ozs7SUFFQyw2Q0FBSzs7SUFDTCw2Q0FBYTs7SUFFYiw2Q0FBb0M7O0lBQ3BDLCtDQUF3Qzs7SUFDeEMsb0RBQWtEOztJQUNsRCxzREFBc0Q7O0lBQ3RELDZEQUFvRTs7SUFDcEUsOENBQXNDOztJQUN0Qyw4Q0FBc0M7O0lBQ3RDLDZDQUFvQzs7SUFDcEMsdURBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCB7IENvbWV0Q2hhdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29udHJvbGxlclwiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdXNlci1wcm9maWxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXRVc2VyUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI7XG4gIG5hbWU6IHN0cmluZztcblxuICBNT1JFOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuTU9SRTtcbiAgT05MSU5FOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuT05MSU5FO1xuICBQUkVGRVJFTkNFUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlBSRUZFUkVOQ0VTO1xuICBOT1RJRklDQVRJT05TOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuTk9USUZJQ0FUSU9OUztcbiAgUFJJVkFDWV9BTkRfU0VDVVJJVFk6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QUklWQUNZX0FORF9TRUNVUklUWTtcbiAgQ0hBVFM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5DSEFUUztcbiAgT1RIRVI6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5PVEhFUjtcbiAgSEVMUDogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLkhFTFA7XG4gIFJFUE9SVF9QUk9CTEVNOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuUkVQT1JUX1BST0JMRU07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0UHJvZmlsZSgpO1xuICB9XG5cbiAgZ2V0UHJvZmlsZSgpIHtcbiAgICBuZXcgQ29tZXRDaGF0TWFuYWdlcigpXG4gICAgICAuZ2V0TG9nZ2VkSW5Vc2VyKClcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMudXNlci5uYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0VXNlckluZm9TY3JlZW5dIGdldFByb2ZpbGUgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=