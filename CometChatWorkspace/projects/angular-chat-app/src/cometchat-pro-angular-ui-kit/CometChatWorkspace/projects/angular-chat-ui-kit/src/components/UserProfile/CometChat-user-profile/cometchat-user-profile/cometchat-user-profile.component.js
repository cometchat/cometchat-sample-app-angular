/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/CometChat-user-profile/cometchat-user-profile/cometchat-user-profile.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
export class CometChatUserProfileComponent {
    constructor() {
        this.MORE = COMETCHAT_CONSTANTS.MORE;
        this.ONLINE = COMETCHAT_CONSTANTS.ONLINE;
        this.PREFERENCES = COMETCHAT_CONSTANTS.PREFERENCES;
        this.NOTIFICATIONS = COMETCHAT_CONSTANTS.NOTIFICATIONS;
        this.PRIVACY_AND_SECURITY = COMETCHAT_CONSTANTS.PRIVACY_AND_SECURITY;
        this.CHATS = COMETCHAT_CONSTANTS.CHATS;
        this.OTHER = COMETCHAT_CONSTANTS.OTHER;
        this.HELP = COMETCHAT_CONSTANTS.HELP;
        this.REPORT_PROBLEM = COMETCHAT_CONSTANTS.REPORT_PROBLEM;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.getProfile();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get Info Of LoggedIn User
     * @return {?}
     */
    getProfile() {
        try {
            CometChat.getLoggedinUser()
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
                logger("[CometChatUserInfoScreen] getProfile getLoggedInUser error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatUserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-user-profile",
                template: "<div class=\"userInfoScreenStyle\">\n  <div class=\"headerStyle\">\n    <h4 class=\"headerTitleStyle\">{{ MORE }}</h4>\n  </div>\n  <div class=\"detailStyle\">\n    <div class=\"thumbnailStyle\">\n      <cometchat-avatar [item]=\"user\"></cometchat-avatar>\n    </div>\n    <div class=\"userDetailStyle\">\n      <div class=\"userNameStyle\">\n        {{ name }}\n      </div>\n      <p class=\"userStatusStyle\">{{ ONLINE }}</p>\n    </div>\n  </div>\n  <div class=\"optionsStyle\">\n    <div class=\"optionTitleStyle\">{{ PREFERENCES }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Notifications\">\n        <div class=\"optionNameStyle\">{{ NOTIFICATIONS }}</div>\n      </div>\n      <div class=\"optionStyle Privacy\">\n        <div class=\"optionNameStyle\">{{ PRIVACY_AND_SECURITY }}</div>\n      </div>\n      <div class=\"optionStyle Chats\">\n        <div class=\"optionNameStyle\">{{ CHATS }}</div>\n      </div>\n    </div>\n    <div class=\"optionTitleStyle Other\">{{ OTHER }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Help\">\n        <div class=\"optionNameStyle\">{{ HELP }}</div>\n      </div>\n      <div class=\"optionStyle Report\">\n        <div class=\"optionNameStyle\">{{ REPORT_PROBLEM }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".userInfoScreenStyle{display:flex;flex-direction:column!important;height:calc(100% - 40px);font-family:Inter,sans-serif}.userInfoScreenStyle *{box-sizing:border-box;font-family:Inter,sans-serif}.userInfoScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.userInfoScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.userInfoScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.userInfoScreenStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea}.headerTitleStyle{margin:0;font-weight:700;font-size:22px}.detailStyle{padding:19px 16px;display:flex;flex-direction:row;justify-content:left;align-items:center}.thumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.userDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.userNameStyle{margin:0;font-size:15px;font-weight:600;display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.userStatusStyle{font-size:13px;margin:0;color:#39f}.optionsStyle{height:calc(100% - 196px);overflow-y:auto;padding:0 16px;display:flex;flex-direction:column;justify-content:left;align-items:flex-start}.optionTitleStyle{margin:5px 0;width:100%;font-size:12px;color:#ccc;text-transform:uppercase}.optionListStyle{padding:10px 0;width:100%;font-size:15px}.optionStyle{width:100%;padding:15px 15px 15px 48px;font-weight:600}.optionNameStyle{width:100%}.Notifications{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2IDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUuMjg2IDE1LjI5Yy42My42My4xOCAxLjcxLS43MSAxLjcxSDEuNDA2Yy0uODkgMC0xLjMzLTEuMDgtLjctMS43MUwxLjk5NiAxNFY5YzAtMy4wOCAxLjYzLTUuNjQgNC41LTYuMzJWMmMwLS44My42Ny0xLjUgMS41LTEuNXMxLjUuNjcgMS41IDEuNXYuNjhjMi44Ni42OCA0LjUgMy4yNSA0LjUgNi4zMnY1ek01Ljk5NiAxOGg0YTIgMiAwIDEgMS00IDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Privacy{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDE4IDIyIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNOSAxMC45OTJoN2MtLjUzIDQuMTItMy4yOCA3Ljc5LTcgOC45NHYtOC45M0gydi01LjdsNy0zLjExek04LjE5LjM2MmwtNyAzLjExQy40NyAzLjc5MyAwIDQuNTEzIDAgNS4zMDN2NC43YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEydi00LjdjMC0uNzktLjQ3LTEuNTEtMS4xOS0xLjgzbC03LTMuMTFjLS41MS0uMjMtMS4xMS0uMjMtMS42MiAweiIvPjwvZz48L2c+PC9zdmc+) 16px center no-repeat}.Chats{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUgNkg1Yy0uNTUgMC0xLS40NS0xLTFzLjQ1LTEgMS0xaDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxem0tNCA2SDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTFoNmMuNTUgMCAxIC40NSAxIDFzLS40NSAxLTEgMXpNNSA3aDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxSDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTF6bTEzLTdIMkMuOSAwIC4wMS45LjAxIDJMMCAyMGw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWMmMwLTEuMS0uOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==) 16px center no-repeat}.Help{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTIuMTcgMTAuMTdjLS41LjUxLS44Ni45Ny0xLjA0IDEuNjktLjA4LjMyLS4xMy42OC0uMTMgMS4xNEg5di0uNWEzLjk5NyAzLjk5NyAwIDAgMSAxLjE3LTIuODNsMS4yNC0xLjI2Yy40Ni0uNDQuNjgtMS4xLjU1LTEuOGExLjk5IDEuOTkgMCAwIDAtMS4zOS0xLjUzYy0xLjExLS4zMS0yLjE0LjMyLTIuNDcgMS4yNy0uMTIuMzctLjQzLjY1LS44Mi42NWgtLjNDNi40IDcgNiA2LjQ0IDYuMTYgNS44OGE0LjAwOCA0LjAwOCAwIDAgMSAzLjIzLTIuODNjMS41Mi0uMjQgMi45Ny41NSAzLjg3IDEuOCAxLjE4IDEuNjMuODMgMy4zOC0uMTkgNC40ek0xMSAxN0g5di0yaDJ6TTEwIDBDNC40OCAwIDAgNC40OCAwIDEwczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNS41MiAwIDEwIDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Report{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDIyIDE4Ij48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTEuMDAzIDExLjAwMmMtLjU1IDAtMS0uNDUtMS0xdi0yYzAtLjU1LjQ1LTEgMS0xczEgLjQ1IDEgMXYyYzAgLjU1LS40NSAxLTEgMXptMSA0aC0ydi0yaDJ6bS0xMC4yNyAzaDE4LjUzYy43NyAwIDEuMjUtLjgzLjg3LTEuNWwtOS4yNy0xNmEuOTk2Ljk5NiAwIDAgMC0xLjczIDBsLTkuMjcgMTZjLS4zOC42Ny4xIDEuNS44NyAxLjV6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}"]
            }] }
];
/** @nocollapse */
CometChatUserProfileComponent.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    CometChatUserProfileComponent.prototype.user;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.name;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.MORE;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.ONLINE;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.PREFERENCES;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.NOTIFICATIONS;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.PRIVACY_AND_SECURITY;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.CHATS;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.OTHER;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.HELP;
    /** @type {?} */
    CometChatUserProfileComponent.prototype.REPORT_PROBLEM;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2VyUHJvZmlsZS9Db21ldENoYXQtdXNlci1wcm9maWxlL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUvY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFNbEQsTUFBTSxPQUFPLDZCQUE2QjtJQWN4QztRQVZBLFNBQUksR0FBVyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDeEMsV0FBTSxHQUFXLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUM1QyxnQkFBVyxHQUFXLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztRQUN0RCxrQkFBYSxHQUFXLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUMxRCx5QkFBb0IsR0FBVyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUN4RSxVQUFLLEdBQVcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQzFDLFVBQUssR0FBVyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDMUMsU0FBSSxHQUFXLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUN4QyxtQkFBYyxHQUFXLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztJQUU3QyxDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJO1lBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUk7WUFDRixTQUFTLENBQUMsZUFBZSxFQUFFO2lCQUN4QixJQUFJOzs7O1lBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixDQUFDLEVBQUM7aUJBQ0QsS0FBSzs7OztZQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxDQUNKLDREQUE0RCxFQUM1RCxLQUFLLENBQ04sQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ047UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw2ekNBQXNEOzthQUV2RDs7Ozs7O0lBRUMsNkNBQUs7O0lBQ0wsNkNBQWE7O0lBRWIsNkNBQXdDOztJQUN4QywrQ0FBNEM7O0lBQzVDLG9EQUFzRDs7SUFDdEQsc0RBQTBEOztJQUMxRCw2REFBd0U7O0lBQ3hFLDhDQUEwQzs7SUFDMUMsOENBQTBDOztJQUMxQyw2Q0FBd0M7O0lBQ3hDLHVEQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtdXNlci1wcm9maWxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldENoYXRVc2VyUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI7XG4gIG5hbWU6IHN0cmluZztcblxuICBNT1JFOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLk1PUkU7XG4gIE9OTElORTogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5PTkxJTkU7XG4gIFBSRUZFUkVOQ0VTOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlBSRUZFUkVOQ0VTO1xuICBOT1RJRklDQVRJT05TOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLk5PVElGSUNBVElPTlM7XG4gIFBSSVZBQ1lfQU5EX1NFQ1VSSVRZOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLlBSSVZBQ1lfQU5EX1NFQ1VSSVRZO1xuICBDSEFUUzogU3RyaW5nID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5DSEFUUztcbiAgT1RIRVI6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuT1RIRVI7XG4gIEhFTFA6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuSEVMUDtcbiAgUkVQT1JUX1BST0JMRU06IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuUkVQT1JUX1BST0JMRU07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdldFByb2ZpbGUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IEluZm8gT2YgTG9nZ2VkSW4gVXNlclxuICAgKi9cbiAgZ2V0UHJvZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnVzZXIubmFtZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgIFwiW0NvbWV0Q2hhdFVzZXJJbmZvU2NyZWVuXSBnZXRQcm9maWxlIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==