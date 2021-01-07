/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/cometchat-user-profile/cometchat-user-profile/cometchat-user-profile.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { CometChatManager } from "../../../utils/controller";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatUserProfileComponent = /** @class */ (function () {
    function CometchatUserProfileComponent() {
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
    CometchatUserProfileComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getProfile();
    };
    /**
     * @return {?}
     */
    CometchatUserProfileComponent.prototype.getProfile = /**
     * @return {?}
     */
    function () {
        var _this = this;
        new CometChatManager()
            .getLoggedInUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.user = user;
            _this.name = _this.user.name;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[CometChatUserInfoScreen] getProfile getLoggedInUser error", error);
        }));
    };
    CometchatUserProfileComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-user-profile",
                    template: "<div class=\"userInfoScreenStyle\">\n  <div class=\"headerStyle\">\n    <h4 class=\"headerTitleStyle\">{{ MORE }}</h4>\n  </div>\n  <div class=\"detailStyle\">\n    <div class=\"thumbnailStyle\">\n      <cometchat-avatar [item]=\"user\"></cometchat-avatar>\n    </div>\n    <div class=\"userDetailStyle\">\n      <div class=\"userNameStyle\">\n        {{ name }}\n      </div>\n      <p class=\"userStatusStyle\">{{ ONLINE }}</p>\n    </div>\n  </div>\n  <div class=\"optionsStyle\">\n    <div class=\"optionTitleStyle\">{{ PREFERENCES }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Notifications\">\n        <div class=\"optionNameStyle\">{{ NOTIFICATIONS }}</div>\n      </div>\n      <div class=\"optionStyle Privacy\">\n        <div class=\"optionNameStyle\">{{ PRIVACY_AND_SECURITY }}</div>\n      </div>\n      <div class=\"optionStyle Chats\">\n        <div class=\"optionNameStyle\">{{ CHATS }}</div>\n      </div>\n    </div>\n    <div class=\"optionTitleStyle Other\">{{ OTHER }}</div>\n    <div class=\"optionListStyle\">\n      <div class=\"optionStyle Help\">\n        <div class=\"optionNameStyle\">{{ HELP }}</div>\n      </div>\n      <div class=\"optionStyle Report\">\n        <div class=\"optionNameStyle\">{{ REPORT_PROBLEM }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".userInfoScreenStyle{display:flex;flex-direction:column!important;height:calc(100% - 40px);font-family:Inter,sans-serif}.userInfoScreenStyle *{box-sizing:border-box;font-family:Inter,sans-serif}.userInfoScreenStyle ::-webkit-scrollbar{width:8px;height:4px}.userInfoScreenStyle ::-webkit-scrollbar-track{background:#ffffff00}.userInfoScreenStyle ::-webkit-scrollbar-thumb{background:#ccc}.userInfoScreenStyle ::-webkit-scrollbar-thumb:hover{background:#aaa}.headerStyle{padding:19px 16px;position:relative;border-bottom:1px solid #eaeaea}.headerTitleStyle{margin:0;font-weight:700;font-size:22px}.detailStyle{padding:19px 16px;display:flex;flex-direction:row;justify-content:left;align-items:center}.thumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.userDetailStyle{width:calc(100% - 45px);flex-grow:1;padding-left:15px}.userNameStyle{margin:0;font-size:15px;font-weight:600;display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.userStatusStyle{font-size:13px;margin:0;color:#39f}.optionsStyle{height:calc(100% - 196px);overflow-y:auto;padding:0 16px;display:flex;flex-direction:column;justify-content:left;align-items:flex-start}.optionTitleStyle{margin:5px 0;width:100%;font-size:12px;color:#ccc;text-transform:uppercase}.optionListStyle{padding:10px 0;width:100%;font-size:15px}.optionStyle{width:100%;padding:15px 15px 15px 48px;font-weight:600}.optionNameStyle{width:100%}.Notifications{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2IDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUuMjg2IDE1LjI5Yy42My42My4xOCAxLjcxLS43MSAxLjcxSDEuNDA2Yy0uODkgMC0xLjMzLTEuMDgtLjctMS43MUwxLjk5NiAxNFY5YzAtMy4wOCAxLjYzLTUuNjQgNC41LTYuMzJWMmMwLS44My42Ny0xLjUgMS41LTEuNXMxLjUuNjcgMS41IDEuNXYuNjhjMi44Ni42OCA0LjUgMy4yNSA0LjUgNi4zMnY1ek01Ljk5NiAxOGg0YTIgMiAwIDEgMS00IDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Privacy{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDE4IDIyIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNOSAxMC45OTJoN2MtLjUzIDQuMTItMy4yOCA3Ljc5LTcgOC45NHYtOC45M0gydi01LjdsNy0zLjExek04LjE5LjM2MmwtNyAzLjExQy40NyAzLjc5MyAwIDQuNTEzIDAgNS4zMDN2NC43YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEydi00LjdjMC0uNzktLjQ3LTEuNTEtMS4xOS0xLjgzbC03LTMuMTFjLS41MS0uMjMtMS4xMS0uMjMtMS42MiAweiIvPjwvZz48L2c+PC9zdmc+) 16px center no-repeat}.Chats{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTUgNkg1Yy0uNTUgMC0xLS40NS0xLTFzLjQ1LTEgMS0xaDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxem0tNCA2SDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTFoNmMuNTUgMCAxIC40NSAxIDFzLS40NSAxLTEgMXpNNSA3aDEwYy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxSDVjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTF6bTEzLTdIMkMuOSAwIC4wMS45LjAxIDJMMCAyMGw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWMmMwLTEuMS0uOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==) 16px center no-repeat}.Help{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTIuMTcgMTAuMTdjLS41LjUxLS44Ni45Ny0xLjA0IDEuNjktLjA4LjMyLS4xMy42OC0uMTMgMS4xNEg5di0uNWEzLjk5NyAzLjk5NyAwIDAgMSAxLjE3LTIuODNsMS4yNC0xLjI2Yy40Ni0uNDQuNjgtMS4xLjU1LTEuOGExLjk5IDEuOTkgMCAwIDAtMS4zOS0xLjUzYy0xLjExLS4zMS0yLjE0LjMyLTIuNDcgMS4yNy0uMTIuMzctLjQzLjY1LS44Mi42NWgtLjNDNi40IDcgNiA2LjQ0IDYuMTYgNS44OGE0LjAwOCA0LjAwOCAwIDAgMSAzLjIzLTIuODNjMS41Mi0uMjQgMi45Ny41NSAzLjg3IDEuOCAxLjE4IDEuNjMuODMgMy4zOC0uMTkgNC40ek0xMSAxN0g5di0yaDJ6TTEwIDBDNC40OCAwIDAgNC40OCAwIDEwczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNS41MiAwIDEwIDB6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}.Report{background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDIyIDE4Ij48Zz48Zz48cGF0aCBmaWxsPSIjMTQxNDE0IiBkPSJNMTEuMDAzIDExLjAwMmMtLjU1IDAtMS0uNDUtMS0xdi0yYzAtLjU1LjQ1LTEgMS0xczEgLjQ1IDEgMXYyYzAgLjU1LS40NSAxLTEgMXptMSA0aC0ydi0yaDJ6bS0xMC4yNyAzaDE4LjUzYy43NyAwIDEuMjUtLjgzLjg3LTEuNWwtOS4yNy0xNmEuOTk2Ljk5NiAwIDAgMC0xLjczIDBsLTkuMjcgMTZjLS4zOC42Ny4xIDEuNS44NyAxLjV6Ii8+PC9nPjwvZz48L3N2Zz4=) 16px center no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    CometchatUserProfileComponent.ctorParameters = function () { return []; };
    return CometchatUserProfileComponent;
}());
export { CometchatUserProfileComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9Vc2VyUHJvZmlsZS9jb21ldGNoYXQtdXNlci1wcm9maWxlL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUvY29tZXRjaGF0LXVzZXItcHJvZmlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRTtJQW1CRTtRQVZBLFNBQUksR0FBVyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFdBQU0sR0FBVyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQ3hDLGdCQUFXLEdBQVcsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNsRCxrQkFBYSxHQUFXLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDdEQseUJBQW9CLEdBQVcsZUFBZSxDQUFDLG9CQUFvQixDQUFDO1FBQ3BFLFVBQUssR0FBVyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQ3RDLFVBQUssR0FBVyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQ3RDLFNBQUksR0FBVyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ3BDLG1CQUFjLEdBQVcsZUFBZSxDQUFDLGNBQWMsQ0FBQztJQUV6QyxDQUFDOzs7O0lBRWhCLGdEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsa0RBQVU7OztJQUFWO1FBQUEsaUJBYUM7UUFaQyxJQUFJLGdCQUFnQixFQUFFO2FBQ25CLGVBQWUsRUFBRTthQUNqQixJQUFJOzs7O1FBQUMsVUFBQyxJQUFJO1lBQ1QsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDLEVBQUM7YUFDRCxLQUFLOzs7O1FBQUMsVUFBQyxLQUFLO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FDVCw0REFBNEQsRUFDNUQsS0FBSyxDQUNOLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsNnpDQUFzRDs7aUJBRXZEOzs7O0lBbUNELG9DQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0FsQ1ksNkJBQTZCOzs7SUFDeEMsNkNBQUs7O0lBQ0wsNkNBQWE7O0lBRWIsNkNBQW9DOztJQUNwQywrQ0FBd0M7O0lBQ3hDLG9EQUFrRDs7SUFDbEQsc0RBQXNEOztJQUN0RCw2REFBb0U7O0lBQ3BFLDhDQUFzQzs7SUFDdEMsOENBQXNDOztJQUN0Qyw2Q0FBb0M7O0lBQ3BDLHVEQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5pbXBvcnQgeyBDb21ldENoYXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFNUUklOR19NRVNTQUdFUyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlQ29uc3RhbnRzXCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXVzZXItcHJvZmlsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC11c2VyLXByb2ZpbGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0VXNlclByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB1c2VyO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgTU9SRTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk1PUkU7XG4gIE9OTElORTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk9OTElORTtcbiAgUFJFRkVSRU5DRVM6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5QUkVGRVJFTkNFUztcbiAgTk9USUZJQ0FUSU9OUzogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLk5PVElGSUNBVElPTlM7XG4gIFBSSVZBQ1lfQU5EX1NFQ1VSSVRZOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuUFJJVkFDWV9BTkRfU0VDVVJJVFk7XG4gIENIQVRTOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuQ0hBVFM7XG4gIE9USEVSOiBTdHJpbmcgPSBTVFJJTkdfTUVTU0FHRVMuT1RIRVI7XG4gIEhFTFA6IFN0cmluZyA9IFNUUklOR19NRVNTQUdFUy5IRUxQO1xuICBSRVBPUlRfUFJPQkxFTTogU3RyaW5nID0gU1RSSU5HX01FU1NBR0VTLlJFUE9SVF9QUk9CTEVNO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFByb2ZpbGUoKTtcbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgbmV3IENvbWV0Q2hhdE1hbmFnZXIoKVxuICAgICAgLmdldExvZ2dlZEluVXNlcigpXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnVzZXIubmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiW0NvbWV0Q2hhdFVzZXJJbmZvU2NyZWVuXSBnZXRQcm9maWxlIGdldExvZ2dlZEluVXNlciBlcnJvclwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19