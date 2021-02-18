/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/CometChat-nav-bar/cometchat-nav-bar/cometchat-nav-bar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
export class CometChatNavBarComponent {
    constructor() {
        this.item = null;
        this.type = null;
        this.enableSelectedGroupStyling = false;
        this.groupToUpdate = null;
        this.groupToLeave = null;
        this.groupToDelete = null;
        this.actionGenerated = new EventEmitter();
        this.onUserClick = new EventEmitter();
        this.displayConversationList = true;
        this.displayGroupList = false;
        this.displayUserList = false;
        this.displayUserInfoScreen = false;
        this.groupMessage = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Toggles the List to be opened on user clicked
     * @param {?} type
     * @return {?}
     */
    checkScreen(type) {
        try {
            this.displayConversationList =
                type === enums.CONVERSATION_LIST ? true : false;
            this.displayGroupList = type === enums.GROUP_LIST ? true : false;
            this.displayUserList = type === enums.USER_LIST ? true : false;
            this.displayUserInfoScreen = type === enums.INFO_SCREEN ? true : false;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens ConversationList
     * @return {?}
     */
    openConversationList() {
        try {
            this.checkScreen(enums.CONVERSATION_LIST);
            this.closeDetailView();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens GroupList
     * @return {?}
     */
    openGroupList() {
        try {
            this.checkScreen(enums.GROUP_LIST);
            this.closeDetailView();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens userlist
     * @return {?}
     */
    openUserList() {
        try {
            this.checkScreen(enums.USER_LIST);
            this.closeDetailView();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Opens User Info Screnn
     * @return {?}
     */
    openUserInfoScreen() {
        try {
            this.checkScreen(enums.INFO_SCREEN);
            this.closeDetailView();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes Detail View when tab is changed
     * @return {?}
     */
    closeDetailView() {
        try {
            this.actionGenerated.emit({
                type: enums.TAB_CHANGED,
            });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listen to the user emitted by the userList component
     * @param {?} user
     * @return {?}
     */
    userClicked(user) {
        try {
            if (user.hasOwnProperty(enums.CONVERSATION_WITH)) {
                this.item = user.conversationWith;
                this.curentItem = this.item;
            }
            else {
                this.item = user;
                this.curentItem = this.item;
            }
            if (this.item.hasOwnProperty(enums.UID)) {
                this.type = CometChat.RECEIVER_TYPE.USER;
            }
            else {
                this.type = CometChat.RECEIVER_TYPE.GROUP;
            }
            this.lastMessage = user.lastMessage;
            this.onUserClick.emit(this.item);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    groupClicked(group) {
        try {
            this.item = group;
            this.curentItem = this.item;
            if (this.item.hasOwnProperty(enums.UID)) {
                this.type = CometChat.RECEIVER_TYPE.USER;
            }
            else {
                this.type = CometChat.RECEIVER_TYPE.GROUP;
            }
            this.onUserClick.emit(this.item);
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatNavBarComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-nav-bar",
                template: "<div class=\"listStyle\">\n  <div *ngIf=\"displayConversationList\" class=\"listDisplayStyle\">\n    <cometchat-conversation-list\n      (onUserClick)=\"userClicked($event)\"\n      [item]=\"item\"\n      [lastMessage]=\"lastMessage\"\n      [type]=\"type\"\n    ></cometchat-conversation-list>\n  </div>\n\n  <div *ngIf=\"displayGroupList\" class=\"listDisplayStyle\">\n    <cometchat-group-list\n      [enableSelectedGroupStyling]=\"true\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      (onGroupClick)=\"groupClicked($event)\"\n    ></cometchat-group-list>\n  </div>\n\n  <div *ngIf=\"displayUserList\" class=\"listDisplayStyle\">\n    <cometchat-user-list\n      [item]=\"curentItem\"\n      (onUserClick)=\"userClicked($event)\"\n    ></cometchat-user-list>\n  </div>\n\n  <div class=\"userInfoScreenStyle\" *ngIf=\"displayUserInfoScreen\">\n    <cometchat-user-profile></cometchat-user-profile>\n  </div>\n</div>\n\n<div class=\"footerStyle\">\n  <div class=\"navbarStyle\">\n    <!--ConversationList-->\n    <div class=\"itemStyle\" (click)=\"openConversationList()\">\n      <div\n        class=\"itemLinkStyle Chats\"\n        [ngClass]=\"{\n          ChatsActiveStyle: displayConversationList\n        }\"\n      ></div>\n    </div>\n    <!--ConversationList Ends-->\n\n    <!--UserList-->\n    <div class=\"itemStyle\" (click)=\"openUserList()\">\n      <div\n        class=\"itemLinkStyle Contacts\"\n        [ngClass]=\"{\n          ContactsActiveStyle: displayUserList\n        }\"\n      ></div>\n    </div>\n    <!--UserList Ends-->\n\n    <!--GroupList-->\n    <div class=\"itemStyle\" (click)=\"openGroupList()\">\n      <div\n        class=\"itemLinkStyle Groups\"\n        [ngClass]=\"{\n          GroupsActiveStyle: displayGroupList\n        }\"\n      ></div>\n    </div>\n    <!--GroupList Ends-->\n\n    <!--UserInfo Ends-->\n    <div class=\"itemStyle\" (click)=\"openUserInfoScreen()\">\n      <div\n        class=\"itemLinkStyle Info\"\n        [ngClass]=\"{\n          InfoActiveStyle: displayUserInfoScreen\n        }\"\n      ></div>\n    </div>\n    <!--UserInfo Ends-->\n  </div>\n</div>\n",
                styles: ["*{overflow:hidden}.footerStyle{width:100%;z-index:1;position:absolute;bottom:0;background-color:#fff}.listStyle{height:100%}.listDisplayStyle{overflow-y:hidden;height:calc(100% - 40px)}.navbarStyle{display:flex;flex-direction:row;align-items:center;justify-content:space-around}.itemStyle{display:inline-block;padding:8px;cursor:pointer}.itemLinkStyle{height:20px;display:inline-block}.userInfoScreenStyle{height:calc(100% - 40px)}.Chats{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAByElEQVQ4Ea2Vu0vDcBDHmxcpSDeXQv8Cl4KD6CClODkUhGDpA0c3964i4qjg4HMqWJpBCoJWCg4uTlZxKUIySNVCB0sGxSI2id+rTYmxSmh/B9ff3f3uPrnf5VEu8IcUi8U527bnsT0LjUDH4X9gfYHWOI67lGX5WFGUOvxfwnkjhUJhEbFV6IR3z+sDbuJiJUmScslk8sG93wdXKpWxVquVR6LiTvBj4wJvyFvJZDJ5J78L7kHPAaVjDyWA2ygk+A4BePpBp1ujQImBempyW1XVafJ5zHQKwWVyRhVwBMuy9ojD4whMoE5TgEepWRpFzAmyWtFsjMD0jDIVdB0hcJsp9RvWJnCNNZjneZ3AJcbgT0EQzvhQKHSAYTdZwcFax+vd5BOJxDuGvYSAyQB+Gw6HN4hDowhks9kLzGUBpkH+kHJFjHg83qH6LpiMVCp1io1JmNfk+xU6KXQNX7hYOp1+cur6XzcngHc9aprmneP/s94AeCSKokoz9eaJ7kC1WpU0Tdt1x2C/QvehdZyogW9BA909DoK5636AdV3fxI2c6SVYWNVgMJjDv8Szu8iP3R9FuVyWDcO4x/E6gJ/gWTzE3DU/kEE5X7GJonCI9jNfAAAAAElFTkSuQmCC) center center no-repeat;padding:11px}.Groups{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAAC6ElEQVRIDcWWS2hTQRSGm5ex8QGtRYi61FTowkUjVQQhigV14SIQ8qLWjYLuFIrFVVEEbUE3LrpSsE1iJMGAxo3o0gdUQbRCaNy4sKioAWvJ229iRube3JtEELxwmDn/+c/5551Yev7Rl0gk9lSr1YuUG8FWLRbLQ6fTOen3+z+aSVjMAslkcmulUjlGvNdqtT4JBoMvzbjxeHykXq8/wtarHAbw1m637w8EAl9VXPatsqO2FDtYLpeXKHYDm2FGC7FY7ILKkf10Or0JTlYvLOJgQ0zgruTq2xZxRIZIugdxrUoGu0TsuIqJfrFYDBLr1+PSJ3aALfFIX21bxFmqMyRolk8mgE/IvtLuVPqG3VqtNmgUaBGHaFqMgQ0yAM05wf9pVFjFyDPktIhDLKiJah+h78TrKkb/qc7XuPBLNpvtlQZsOkbi942IAqNQS8ztdgvsmVkO+PWuTztX6iYiCYNii1ybs3rc5/NVHA7HUfBFfYw6c6FQ6Lwel77RzGsej2cMwgzJH7DPWBKBUbMZCNzlcu2DN4GlsDnyowx2nL5+m6T2/201J1cOJZvNOguFwjD+Fg5ZnRduCcszwx+So29TqdS2Uqm0HXyA2ZaxL9gbckwPsEacJ7WfF+kyelGKrFMFKFTFTxG7GolEFkSMR2eA5jQWBd8hMPVr5rwAm2UrY16vt6zG/+w5hU7wpOYocgqCRlgkgNtojlBwjfB5gsfB8tgU1iIsOCIH24vdyuVyr3npdgtcfo2ZI3wOwowETdoawofC4fBj+FfgG712Jqm/YfKLmJ8b8EAglvn5+WGA5xQTM2v33Wa5x+CfhDTbjtguhtYq52eYK/3OijPZhXAPr9RUJpPZQOHpdsU7xdDq5Qm/Jnhiz32dEhjgMiPNr6ysHIa7sRO/i/goK9hnZSSaE2+S2Pg3wiBMfzpN8gzhpmZfY9lhfDJkNUHIu/jTsJnlusMAssDfaMXVq/2NkVPBlrFpzs/7XwjARwfSot0XAAAAAElFTkSuQmCC) center center no-repeat;padding:16px}.Contacts{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACBUlEQVQ4EaVVO0gDQRT0Nmch2KpJ7PwQTGFnqZBCrPxFCUkaKzs7O7UUO0srOyEfAolRC7ExoKCIqSQEgpbCBWMhaBGIJs4ct+FucyLRg83uvDczt3v7dqP1uDyFQkGvVqtLzWZzWdO0KVB8Fs1otVr3Qohjr9ebD4VCn6pcUwPJZHIesX0Ix9WcHeNFj8Cb8Xj8zB4XEsBAg9ku+tPfzKghh1xL056YRxoGAgGabUvcRT9TKpX0bDZ7SY3pzGXybT+YlLG8Ayu3Ad6EGw+cBS5f4wYYhlEGseObgVTVdX0yEonUaJLL5Qbr9foDuEOqKb+pz+cLCu6mm5klOJdmxOFw+AXdhZVzdPSgl2BpODJO0OeE5mZ0xCSHXgJTZZ25PnjrXCKRGJHJdDo9ivGsxGpPL5bKO4T9atKGn1HIR8TgraEN23KOIQw/2nXoyFgAhBraNUze2BC+An5148qYjoGB5rbDecTXUQoOg0wmM9BoNA6RW0RTH4MzLKpRzOIW5bKqmpHHXff7/avg3Kk6rOJe4OdYTYC8BeGXGpeYlwI4bqcqrxWLxd5KpVIGeUwKPB7PCjbiRmK3HsueRjxjyz3h+AbNo5dKpRZQQye2ZNdDTGAxFoudmrtsDoTY69rFEsBsjx6E7bKJRqM7THRrSg21Ute+x2SANw/Gf75gOwxp/J+/gG/oC/OXokvhqgAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.Info{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAB0klEQVQ4EaVVPUvDUBTte2l+QZcGBCcpuAnpKnTo4KDolqY4CA7u3VTwA+nmD3AQHDRbaamjYEeHOhaHtgid0jWDi5XWcx55oaaipHlwe98999yT93GTiswvo9PpZMfj8e50Ot0TQhRBsUKaP5vNulLKZj6fb5VKpa94uYgDnudtA7tG4Vo8Nx/jQQPENdd1H+dxqQMICIhdwbf/E2MNOeSGNdHCDC1YKBQodqLjBH6z1+tlG43GM2uUMrfJpyUQWaDiCHa4fcEL8H3/jVtYYCUAeKaWZa1L3mZaMT6XGtSSbI0EC/mTSi0Z9llERPwCuwQwIoj5J+wG01vYhBjGO+wC1mWgB3hFto1uWhYHuVyujMM9Q/Puk4it3CE+qlarh8h7xAzDcBCfm6ZZRvhBLBxW1IcEUCyCIFA3j7nKQWSeo9pM5yBIruKHghk2cx+E6IYh8IrkEzCucAU2AXYPTzEXeBZ+hB08YL4F20CsBngDJikQCYJgI6bpYQI70EHoV3EBxzGMO+xK/DTjiRRxS+KVa0FgmEJElw6pJW3bnuA8ahpd1lNDaVGgUqm0AdRTiNWpwfqoJRzHOV1GlDWs1Yv50UME+eWBW/oDuyBI0TR/Ad9XntrCd2oXXwAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.ChatsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAB2UlEQVQ4Ea2UP0hbURTGv3NfooNLh44uHVxcAlVjO0goQiFboDg6WIxd3LNKkY4KDv6pOlgcMoggVF0cXCzUoLiIYAfxHwRa7WCpFl/e6XcfTbipEaJ5F8I957zv/HLeue9cwT2ra057gxLSIuhRoJWypwL84f6D/j4Um80elr4MynEtBLXVq2NG+xgZ4a+9+sldj39aUsWyZ5DbzsqRq6iAX3/SlssbLFD4xhXUaf+ibnjnnSyU9SHYQi9usM7X6yk/ePAuUEN4YUgmbS5tgNDxhqAWohD2fqJ7Vl9Y13TOaZLBrHUaXWyj5weYthyjpWigTlEJW6xtRcoJRmMqUoanZ7/RSJcGaDUQXEdKJYzVXptwiiImq+Cb4fQsR8y9lRhWDfvxkX0uRgVnG0YLA1I0HMPfrLrfzn0E8N2WNnywnHDyOIYbNDL0fz4WzsK2TByZzVfiV8DW2B6Sz/EmPKeg8BB4+KaC98+eIFV4K6fl3PASKjt2T85rouRjz43VtAU7hC7yoPK2p/9rYm6Ad3E88DHlxph8xU9yhjfMMQ/mPDA4Fw8ntWBuXhWYkDFeJC//CQLueU+Q+5qVMzepHrvSivSaNn8/wwHBPqdxxQNm2ffDeiC1NH8BJh+Ms9UtjuYAAAAASUVORK5CYII=) center center no-repeat;padding:11px}.ContactsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACC0lEQVQ4EaVVMUwUURCd+WJBchaSqBA75Ey0sJFtTEiwMFSCJsRSE6LY2NkpncaOkkIgmNBasEBhrDSSaMydjQWFUJJglIIEEgiBG99b/t/c7f4EkJ/szX9vZt7+2ZndU4ms/k/Wtr0q96wh9+FOcHX5sHXYmjqZq/RI+vm27ns+N5rv/CaZtruNAxkHrBZ9Bbzizsjz2mNdbOZdAGamvVP2GmIL4I4SY1qVscxhbtBpC5tkWl6hxJcBH9cyB7lcY/zJlH2ZPFlsLTuVCToaIs/E5FosCOUPsnxlA7Z+yTKCSmXibr/bz8qNpRH9S5Fbs3Zxb1d+msmliOjKuaty3bGbMTGf8CGIEX99qH9gPnpf0VSp5fxoFJ2HWKW96MDpSlyIoRa7zDmLLiQPJDPWHZw339oVPPU7AUdsogjagqMScWaUqqyhEbMEJvII5nLmiP9s53MY9auwGUviZJMXxL8Ab0RjPck55OtU6jC4FEd6Un+qLQJ9M3ZhZ1+m8DiGvEazWXe4a72Z4R7j8q37vAz/KIjRx65XqjKM7Xfiwqo53GmuQArKe/H+gR6UeE/wo4BBjr1VKUtOcaRVlNcTBHDCjuSddQYcs4096WjhDzXS7NXrnbRBnHS+JeCEAI9uqD6qC1mXuYHymxNq5OHMpQaJfGxqozL2P6LMYW5QB25dp/3AlgQpf5q/gH80bbbQie8A+gAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.GroupsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAADF0lEQVRIDc1WTUhUURQ+942Omk2oSYtq0aI0cNFiHCcrIosCK2gRWAvJCkehdgbR0EoKoQxq08KfMPvDkKBFTS0i3Y0/WRClEE6rogjpBySZv3f67rOZeXPfe/NctOjB9Z7zne/c751z77ujoH/0BAd4e5rpEpYLMtMS5mcY4ZlO8cVJQjgFGod5QypOR3SmMnDGsMhrJ66/j4OIvcBYbeYIQe+LNdodbRffzXjG1jKGeQ4M8r5knOYhfBP4NYyZ+j6+aOZk7IZhXguRCPw8YRlHB+oSOo1muOpsEQ/0c52epsdILDWTmegyKmwzY9LWE3Qc3CoVz/pMexv6uSbrmwyLOKo9i7ilir855025yybTVgumAKxRrQIZrkUcqONiaG8tM6vn5Lfdwgpmy7ET/6Uk5lymn0II7EDuQcujOc/GEpQoInpjEyGLuNDoiR1RYlC1xHw1wARNOOWgTTdWfNoPt9MQ2jtis9is10NdKj7eJFJejQ4Bn1VjEL43HaILKp7x1f0zcJzqYlTTgwYfww6XAhzzllBXtE18ziSq854hrlhMUQjtCWIsoYDnmypoZLRFpFXuf+HbVt4c4ZKFT+RH1etRBWseml/lo9h4i1h0emtcrxtR4mbEqzGS6NwCp+kdbkbHA5wn3jjIVUmdenCwWiFabhZCG3F106MiQVcnQ2JGxrA91ZqgM7gbWuFuMfOlLXOwzhTy+uA+wIskzZzsaQ8M8Klkmj7g0+lUhWUCcA/wg7gwvNLHTXgSbx6DcDdci7DkyBwIN8K8jfEWOQHM2ceoHBWcAyLv8EKP7tFo/1RIvKzv5ytY2HrbFcpejsUxHUUHnkpXYK/86OekUdkywfYvWnj3VYc4gQ516LrRRlueG4hql4o08k+ExJwG4bCbsFwQnO6dt9jHOvW6CRSKYxvKkkzXJUfueVMhsozhbb+iVbFEmpqRvMaNv4L4gV33uVJDRca+uyQY/43oVOCn02WBvDA043GqxJdCYQS+5QUVB9Vu23GH15WV00PsfQThH8ZnhJ9z2Cse0ErJLmL0Tp8WH/8AzIgQLCup5hkAAAAASUVORK5CYII=) center center no-repeat;padding:16px}.InfoActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAABxUlEQVQ4Ea1VPU8CURDcvSNGE2nsTCzFws4IvRYUFhrt1ISOgD2lJH7Gzh+AYmKhtBItLbSzAFoLMSZU1kZtQHnOHHfniQYR3OTdvp3dmfe1AZUfbObKhF7uZdE0ZQnpGMaoW/YIX1JLzobHpXg9q28u7jv1Z+4kljfzzXfZRxhpz7XFVcuWTCmpF0Hc8gJjjEYPzS7EzoH9JkZahLXkkOvphLxJLC87OOK6F3fryQGXluXHUXaPyZ31bDj+Ao+vfIDnO7mFUjfH7LRgNTwhkxZf8x/EuFCEWpbbGp1W7jpHLb4y+8w3XOoNbnYbo+aAKnVVyWEcIW4QQ80DxhawklPz+YlR0Gtawk8jQxKvpHTDVkkQUCPH5ZSuYSQRFhxMZbmc1k1jJA71V2Kujfp9SACran2QTgTFTs5Iy7t5m77p5sIDqDWteuI0nc6ZO3j/haFWRptewicgOoZcA/MT0GyQV7FACPMadn6K3BziKXjPqho9MAUQVzykT1+wIHbWp0iQXuQ9FXGE+yDa07ylUbQqaeUdZXoSCZCoQS3nJdES5wD2Avk/TcmlBkl+25RSku1FlBxyvR0g/mr9/sB+E6R8P38BH3BdnpwmY1jPAAAAAElFTkSuQmCC) center center no-repeat;padding:11px}"]
            }] }
];
/** @nocollapse */
CometChatNavBarComponent.ctorParameters = () => [];
CometChatNavBarComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    lastMessage: [{ type: Input }],
    enableSelectedGroupStyling: [{ type: Input }],
    groupToUpdate: [{ type: Input }],
    groupToLeave: [{ type: Input }],
    groupToDelete: [{ type: Input }],
    actionGenerated: [{ type: Output }],
    onUserClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatNavBarComponent.prototype.item;
    /** @type {?} */
    CometChatNavBarComponent.prototype.type;
    /** @type {?} */
    CometChatNavBarComponent.prototype.lastMessage;
    /** @type {?} */
    CometChatNavBarComponent.prototype.enableSelectedGroupStyling;
    /** @type {?} */
    CometChatNavBarComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometChatNavBarComponent.prototype.groupToLeave;
    /** @type {?} */
    CometChatNavBarComponent.prototype.groupToDelete;
    /** @type {?} */
    CometChatNavBarComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatNavBarComponent.prototype.onUserClick;
    /** @type {?} */
    CometChatNavBarComponent.prototype.displayConversationList;
    /** @type {?} */
    CometChatNavBarComponent.prototype.displayGroupList;
    /** @type {?} */
    CometChatNavBarComponent.prototype.displayUserList;
    /** @type {?} */
    CometChatNavBarComponent.prototype.displayUserInfoScreen;
    /** @type {?} */
    CometChatNavBarComponent.prototype.groupMessage;
    /** @type {?} */
    CometChatNavBarComponent.prototype.curentItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW5hdi1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVXNlclByb2ZpbGUvQ29tZXRDaGF0LW5hdi1iYXIvY29tZXRjaGF0LW5hdi1iYXIvY29tZXRjaGF0LW5hdi1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNaEQsTUFBTSxPQUFPLHdCQUF3QjtJQW1CbkM7UUFsQlMsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWiwrQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFcEIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlELDRCQUF1QixHQUFZLElBQUksQ0FBQztRQUN4QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBRXZDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBRUgsQ0FBQzs7OztJQUVoQixRQUFRLEtBQUksQ0FBQzs7Ozs7O0lBTWIsV0FBVyxDQUFDLElBQUk7UUFDZCxJQUFJO1lBQ0YsSUFB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NkI7O0lBQzdCLGlEQUE4Qjs7SUFFOUIsbURBQWtFOztJQUNsRSwrQ0FBOEQ7O0lBRTlELDJEQUF3Qzs7SUFDeEMsb0RBQWtDOztJQUNsQyxtREFBaUM7O0lBQ2pDLHlEQUF1Qzs7SUFFdkMsZ0RBQWtCOztJQUNsQiw4Q0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW5hdi1iYXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtbmF2LWJhci5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vY29tZXRjaGF0LW5hdi1iYXIuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TmF2QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXRlbSA9IG51bGw7XG4gIEBJbnB1dCgpIHR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBsYXN0TWVzc2FnZTtcbiAgQElucHV0KCkgZW5hYmxlU2VsZWN0ZWRHcm91cFN0eWxpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JvdXBUb1VwZGF0ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9MZWF2ZSA9IG51bGw7XG4gIEBJbnB1dCgpIGdyb3VwVG9EZWxldGUgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Vc2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRpc3BsYXlDb252ZXJzYXRpb25MaXN0OiBib29sZWFuID0gdHJ1ZTtcbiAgZGlzcGxheUdyb3VwTGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNwbGF5VXNlckxpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGlzcGxheVVzZXJJbmZvU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ3JvdXBNZXNzYWdlID0gW107XG4gIGN1cmVudEl0ZW07XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIExpc3QgdG8gYmUgb3BlbmVkIG9uIHVzZXIgY2xpY2tlZFxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNoZWNrU2NyZWVuKHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5kaXNwbGF5Q29udmVyc2F0aW9uTGlzdCA9XG4gICAgICAgIHR5cGUgPT09IGVudW1zLkNPTlZFUlNBVElPTl9MSVNUID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGhpcy5kaXNwbGF5R3JvdXBMaXN0ID0gdHlwZSA9PT0gZW51bXMuR1JPVVBfTElTVCA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHRoaXMuZGlzcGxheVVzZXJMaXN0ID0gdHlwZSA9PT0gZW51bXMuVVNFUl9MSVNUID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGhpcy5kaXNwbGF5VXNlckluZm9TY3JlZW4gPSB0eXBlID09PSBlbnVtcy5JTkZPX1NDUkVFTiA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgQ29udmVyc2F0aW9uTGlzdFxuICAgKi9cbiAgb3BlbkNvbnZlcnNhdGlvbkxpc3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2hlY2tTY3JlZW4oZW51bXMuQ09OVkVSU0FUSU9OX0xJU1QpO1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgR3JvdXBMaXN0XG4gICAqL1xuICBvcGVuR3JvdXBMaXN0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNoZWNrU2NyZWVuKGVudW1zLkdST1VQX0xJU1QpO1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdXNlcmxpc3RcbiAgICovXG4gIG9wZW5Vc2VyTGlzdCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja1NjcmVlbihlbnVtcy5VU0VSX0xJU1QpO1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgVXNlciBJbmZvIFNjcmVublxuICAgKi9cbiAgb3BlblVzZXJJbmZvU2NyZWVuKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNoZWNrU2NyZWVuKGVudW1zLklORk9fU0NSRUVOKTtcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBEZXRhaWwgVmlldyB3aGVuIHRhYiBpcyBjaGFuZ2VkXG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICB0eXBlOiBlbnVtcy5UQUJfQ0hBTkdFRCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIHVzZXIgZW1pdHRlZCBieSB0aGUgdXNlckxpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICB1c2VyQ2xpY2tlZCh1c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh1c2VyLmhhc093blByb3BlcnR5KGVudW1zLkNPTlZFUlNBVElPTl9XSVRIKSkge1xuICAgICAgICB0aGlzLml0ZW0gPSB1c2VyLmNvbnZlcnNhdGlvbldpdGg7XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHVzZXI7XG4gICAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoZW51bXMuVUlEKSkge1xuICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50eXBlID0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVA7XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RNZXNzYWdlID0gdXNlci5sYXN0TWVzc2FnZTtcbiAgICAgIHRoaXMub25Vc2VyQ2xpY2suZW1pdCh0aGlzLml0ZW0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIGdyb3VwIGVtaXR0ZWQgYnkgdGhlIGdyb3VwTGlzdCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IHVzZXJcbiAgICovXG4gIGdyb3VwQ2xpY2tlZChncm91cCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLml0ZW0gPSBncm91cDtcbiAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcblxuICAgICAgaWYgKHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShlbnVtcy5VSUQpKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLlVTRVI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnR5cGUgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHRoaXMuaXRlbSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=