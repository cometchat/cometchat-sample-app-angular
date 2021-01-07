/**
 * @fileoverview added by tsickle
 * Generated from: components/UserProfile/cometchat-nav-bar/cometchat-nav-bar/cometchat-nav-bar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from "@angular/core";
import * as enums from "../../../utils/enums";
var CometchatNavBarComponent = /** @class */ (function () {
    function CometchatNavBarComponent() {
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
    CometchatNavBarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Toggles the List to be opened on user clicked
     * @param
     */
    /**
     * Toggles the List to be opened on user clicked
     * @param {?} type
     * @return {?}
     */
    CometchatNavBarComponent.prototype.checkScreen = /**
     * Toggles the List to be opened on user clicked
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.displayConversationList = type === "conversationList" ? true : false;
        this.displayGroupList = type === "groupList" ? true : false;
        this.displayUserList = type === "userList" ? true : false;
        this.displayUserInfoScreen = type === "infoScreen" ? true : false;
    };
    /**
     * Opens ConversationList
     */
    /**
     * Opens ConversationList
     * @return {?}
     */
    CometchatNavBarComponent.prototype.openConversationList = /**
     * Opens ConversationList
     * @return {?}
     */
    function () {
        this.checkScreen("conversationList");
        this.closeDetailView();
    };
    /**
     * Opens GroupList
     */
    /**
     * Opens GroupList
     * @return {?}
     */
    CometchatNavBarComponent.prototype.openGroupList = /**
     * Opens GroupList
     * @return {?}
     */
    function () {
        this.checkScreen("groupList");
        this.closeDetailView();
    };
    /**
     * Opens userlist
     */
    /**
     * Opens userlist
     * @return {?}
     */
    CometchatNavBarComponent.prototype.openUserList = /**
     * Opens userlist
     * @return {?}
     */
    function () {
        this.checkScreen("userList");
        this.closeDetailView();
    };
    /**
     * Opens User Info Screnn
     */
    /**
     * Opens User Info Screnn
     * @return {?}
     */
    CometchatNavBarComponent.prototype.openUserInfoScreen = /**
     * Opens User Info Screnn
     * @return {?}
     */
    function () {
        this.checkScreen("infoScreen");
        this.closeDetailView();
    };
    /**
     * Closes Detail View when tab is changed
     */
    /**
     * Closes Detail View when tab is changed
     * @return {?}
     */
    CometchatNavBarComponent.prototype.closeDetailView = /**
     * Closes Detail View when tab is changed
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.TAB_CHANGED,
        });
    };
    /**
     * Listen to the user emitted by the userList component
     * @param Event user
     */
    /**
     * Listen to the user emitted by the userList component
     * @param {?} user
     * @return {?}
     */
    CometchatNavBarComponent.prototype.userClicked = /**
     * Listen to the user emitted by the userList component
     * @param {?} user
     * @return {?}
     */
    function (user) {
        if (user.hasOwnProperty("conversationWith")) {
            this.item = user.conversationWith;
            this.curentItem = this.item;
        }
        else {
            this.item = user;
            this.curentItem = this.item;
        }
        if (this.item.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
        }
        this.lastMessage = user.lastMessage;
        this.onUserClick.emit(this.item);
    };
    /**
     * Listen to the group emitted by the groupList component
     * @param Event user
     */
    /**
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    CometchatNavBarComponent.prototype.groupClicked = /**
     * Listen to the group emitted by the groupList component
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.item = group;
        this.curentItem = this.item;
        //Close Thread And User Detail Screen When Chat Window Is Changed
        //this.closeThreadMessages();
        //this.viewDetailScreen = false;
        if (this.item.hasOwnProperty("uid")) {
            this.type = "user";
        }
        else {
            this.type = "group";
        }
        this.onUserClick.emit(this.item);
    };
    CometchatNavBarComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-nav-bar",
                    template: "<div class=\"listStyle\">\n  <div *ngIf=\"displayConversationList\" class=\"listDisplayStyle\">\n    <cometchat-conversation-list\n      (onUserClick)=\"userClicked($event)\"\n      [item]=\"item\"\n      [lastMessage]=\"lastMessage\"\n      [type]=\"type\"\n    ></cometchat-conversation-list>\n  </div>\n\n  <div *ngIf=\"displayGroupList\" class=\"listDisplayStyle\">\n    <cometchat-group-list\n      [enableSelectedGroupStyling]=\"true\"\n      [groupToUpdate]=\"groupToUpdate\"\n      [groupToLeave]=\"groupToLeave\"\n      [groupToDelete]=\"groupToDelete\"\n      (onGroupClick)=\"groupClicked($event)\"\n    ></cometchat-group-list>\n  </div>\n\n  <div *ngIf=\"displayUserList\" class=\"listDisplayStyle\">\n    <cometchat-user-list\n      [item]=\"curentItem\"\n      (onUserClick)=\"userClicked($event)\"\n    ></cometchat-user-list>\n  </div>\n\n  <div class=\"userInfoScreenStyle\" *ngIf=\"displayUserInfoScreen\">\n    <cometchat-user-profile></cometchat-user-profile>\n  </div>\n</div>\n\n<div class=\"footerStyle\">\n  <div class=\"navbarStyle\">\n    <!--ConversationList-->\n    <div class=\"itemStyle\" (click)=\"openConversationList()\">\n      <div\n        class=\"itemLinkStyle Chats\"\n        [ngClass]=\"{\n          ChatsActiveStyle: displayConversationList\n        }\"\n      ></div>\n    </div>\n    <!--ConversationList Ends-->\n\n    <!--UserList-->\n    <div class=\"itemStyle\" (click)=\"openUserList()\">\n      <div\n        class=\"itemLinkStyle Contacts\"\n        [ngClass]=\"{\n          ContactsActiveStyle: displayUserList\n        }\"\n      ></div>\n    </div>\n    <!--UserList Ends-->\n\n    <!--GroupList-->\n    <div class=\"itemStyle\" (click)=\"openGroupList()\">\n      <div\n        class=\"itemLinkStyle Groups\"\n        [ngClass]=\"{\n          GroupsActiveStyle: displayGroupList\n        }\"\n      ></div>\n    </div>\n    <!--GroupList Ends-->\n\n    <!--UserInfo Ends-->\n    <div class=\"itemStyle\" (click)=\"openUserInfoScreen()\">\n      <div\n        class=\"itemLinkStyle Info\"\n        [ngClass]=\"{\n          InfoActiveStyle: displayUserInfoScreen\n        }\"\n      ></div>\n    </div>\n    <!--UserInfo Ends-->\n  </div>\n</div>\n",
                    styles: ["*{overflow:hidden}.footerStyle{width:100%;z-index:1;position:absolute;bottom:0;background-color:#fff}.listStyle{height:100%}.listDisplayStyle{overflow-y:hidden;height:calc(100% - 40px)}.navbarStyle{display:flex;flex-direction:row;align-items:center;justify-content:space-around}.itemStyle{display:inline-block;padding:8px;cursor:pointer}.itemLinkStyle{height:20px;display:inline-block}.userInfoScreenStyle{height:calc(100% - 40px)}.Chats{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAByElEQVQ4Ea2Vu0vDcBDHmxcpSDeXQv8Cl4KD6CClODkUhGDpA0c3964i4qjg4HMqWJpBCoJWCg4uTlZxKUIySNVCB0sGxSI2id+rTYmxSmh/B9ff3f3uPrnf5VEu8IcUi8U527bnsT0LjUDH4X9gfYHWOI67lGX5WFGUOvxfwnkjhUJhEbFV6IR3z+sDbuJiJUmScslk8sG93wdXKpWxVquVR6LiTvBj4wJvyFvJZDJ5J78L7kHPAaVjDyWA2ygk+A4BePpBp1ujQImBempyW1XVafJ5zHQKwWVyRhVwBMuy9ojD4whMoE5TgEepWRpFzAmyWtFsjMD0jDIVdB0hcJsp9RvWJnCNNZjneZ3AJcbgT0EQzvhQKHSAYTdZwcFax+vd5BOJxDuGvYSAyQB+Gw6HN4hDowhks9kLzGUBpkH+kHJFjHg83qH6LpiMVCp1io1JmNfk+xU6KXQNX7hYOp1+cur6XzcngHc9aprmneP/s94AeCSKokoz9eaJ7kC1WpU0Tdt1x2C/QvehdZyogW9BA909DoK5636AdV3fxI2c6SVYWNVgMJjDv8Szu8iP3R9FuVyWDcO4x/E6gJ/gWTzE3DU/kEE5X7GJonCI9jNfAAAAAElFTkSuQmCC) center center no-repeat;padding:11px}.Groups{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAAC6ElEQVRIDcWWS2hTQRSGm5ex8QGtRYi61FTowkUjVQQhigV14SIQ8qLWjYLuFIrFVVEEbUE3LrpSsE1iJMGAxo3o0gdUQbRCaNy4sKioAWvJ229iRube3JtEELxwmDn/+c/5551Yev7Rl0gk9lSr1YuUG8FWLRbLQ6fTOen3+z+aSVjMAslkcmulUjlGvNdqtT4JBoMvzbjxeHykXq8/wtarHAbw1m637w8EAl9VXPatsqO2FDtYLpeXKHYDm2FGC7FY7ILKkf10Or0JTlYvLOJgQ0zgruTq2xZxRIZIugdxrUoGu0TsuIqJfrFYDBLr1+PSJ3aALfFIX21bxFmqMyRolk8mgE/IvtLuVPqG3VqtNmgUaBGHaFqMgQ0yAM05wf9pVFjFyDPktIhDLKiJah+h78TrKkb/qc7XuPBLNpvtlQZsOkbi942IAqNQS8ztdgvsmVkO+PWuTztX6iYiCYNii1ybs3rc5/NVHA7HUfBFfYw6c6FQ6Lwel77RzGsej2cMwgzJH7DPWBKBUbMZCNzlcu2DN4GlsDnyowx2nL5+m6T2/201J1cOJZvNOguFwjD+Fg5ZnRduCcszwx+So29TqdS2Uqm0HXyA2ZaxL9gbckwPsEacJ7WfF+kyelGKrFMFKFTFTxG7GolEFkSMR2eA5jQWBd8hMPVr5rwAm2UrY16vt6zG/+w5hU7wpOYocgqCRlgkgNtojlBwjfB5gsfB8tgU1iIsOCIH24vdyuVyr3npdgtcfo2ZI3wOwowETdoawofC4fBj+FfgG712Jqm/YfKLmJ8b8EAglvn5+WGA5xQTM2v33Wa5x+CfhDTbjtguhtYq52eYK/3OijPZhXAPr9RUJpPZQOHpdsU7xdDq5Qm/Jnhiz32dEhjgMiPNr6ysHIa7sRO/i/goK9hnZSSaE2+S2Pg3wiBMfzpN8gzhpmZfY9lhfDJkNUHIu/jTsJnlusMAssDfaMXVq/2NkVPBlrFpzs/7XwjARwfSot0XAAAAAElFTkSuQmCC) center center no-repeat;padding:16px}.Contacts{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACBUlEQVQ4EaVVO0gDQRT0Nmch2KpJ7PwQTGFnqZBCrPxFCUkaKzs7O7UUO0srOyEfAolRC7ExoKCIqSQEgpbCBWMhaBGIJs4ct+FucyLRg83uvDczt3v7dqP1uDyFQkGvVqtLzWZzWdO0KVB8Fs1otVr3Qohjr9ebD4VCn6pcUwPJZHIesX0Ix9WcHeNFj8Cb8Xj8zB4XEsBAg9ku+tPfzKghh1xL056YRxoGAgGabUvcRT9TKpX0bDZ7SY3pzGXybT+YlLG8Ayu3Ad6EGw+cBS5f4wYYhlEGseObgVTVdX0yEonUaJLL5Qbr9foDuEOqKb+pz+cLCu6mm5klOJdmxOFw+AXdhZVzdPSgl2BpODJO0OeE5mZ0xCSHXgJTZZ25PnjrXCKRGJHJdDo9ivGsxGpPL5bKO4T9atKGn1HIR8TgraEN23KOIQw/2nXoyFgAhBraNUze2BC+An5148qYjoGB5rbDecTXUQoOg0wmM9BoNA6RW0RTH4MzLKpRzOIW5bKqmpHHXff7/avg3Kk6rOJe4OdYTYC8BeGXGpeYlwI4bqcqrxWLxd5KpVIGeUwKPB7PCjbiRmK3HsueRjxjyz3h+AbNo5dKpRZQQye2ZNdDTGAxFoudmrtsDoTY69rFEsBsjx6E7bKJRqM7THRrSg21Ute+x2SANw/Gf75gOwxp/J+/gG/oC/OXokvhqgAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.Info{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAB0klEQVQ4EaVVPUvDUBTte2l+QZcGBCcpuAnpKnTo4KDolqY4CA7u3VTwA+nmD3AQHDRbaamjYEeHOhaHtgid0jWDi5XWcx55oaaipHlwe98999yT93GTiswvo9PpZMfj8e50Ot0TQhRBsUKaP5vNulLKZj6fb5VKpa94uYgDnudtA7tG4Vo8Nx/jQQPENdd1H+dxqQMICIhdwbf/E2MNOeSGNdHCDC1YKBQodqLjBH6z1+tlG43GM2uUMrfJpyUQWaDiCHa4fcEL8H3/jVtYYCUAeKaWZa1L3mZaMT6XGtSSbI0EC/mTSi0Z9llERPwCuwQwIoj5J+wG01vYhBjGO+wC1mWgB3hFto1uWhYHuVyujMM9Q/Puk4it3CE+qlarh8h7xAzDcBCfm6ZZRvhBLBxW1IcEUCyCIFA3j7nKQWSeo9pM5yBIruKHghk2cx+E6IYh8IrkEzCucAU2AXYPTzEXeBZ+hB08YL4F20CsBngDJikQCYJgI6bpYQI70EHoV3EBxzGMO+xK/DTjiRRxS+KVa0FgmEJElw6pJW3bnuA8ahpd1lNDaVGgUqm0AdRTiNWpwfqoJRzHOV1GlDWs1Yv50UME+eWBW/oDuyBI0TR/Ad9XntrCd2oXXwAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.ChatsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFqADAAQAAAABAAAAFAAAAABm4WA6AAAB2UlEQVQ4Ea2UP0hbURTGv3NfooNLh44uHVxcAlVjO0goQiFboDg6WIxd3LNKkY4KDv6pOlgcMoggVF0cXCzUoLiIYAfxHwRa7WCpFl/e6XcfTbipEaJ5F8I957zv/HLeue9cwT2ra057gxLSIuhRoJWypwL84f6D/j4Um80elr4MynEtBLXVq2NG+xgZ4a+9+sldj39aUsWyZ5DbzsqRq6iAX3/SlssbLFD4xhXUaf+ibnjnnSyU9SHYQi9usM7X6yk/ePAuUEN4YUgmbS5tgNDxhqAWohD2fqJ7Vl9Y13TOaZLBrHUaXWyj5weYthyjpWigTlEJW6xtRcoJRmMqUoanZ7/RSJcGaDUQXEdKJYzVXptwiiImq+Cb4fQsR8y9lRhWDfvxkX0uRgVnG0YLA1I0HMPfrLrfzn0E8N2WNnywnHDyOIYbNDL0fz4WzsK2TByZzVfiV8DW2B6Sz/EmPKeg8BB4+KaC98+eIFV4K6fl3PASKjt2T85rouRjz43VtAU7hC7yoPK2p/9rYm6Ad3E88DHlxph8xU9yhjfMMQ/mPDA4Fw8ntWBuXhWYkDFeJC//CQLueU+Q+5qVMzepHrvSivSaNn8/wwHBPqdxxQNm2ffDeiC1NH8BJh+Ms9UtjuYAAAAASUVORK5CYII=) center center no-repeat;padding:11px}.ContactsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACC0lEQVQ4EaVVMUwUURCd+WJBchaSqBA75Ey0sJFtTEiwMFSCJsRSE6LY2NkpncaOkkIgmNBasEBhrDSSaMydjQWFUJJglIIEEgiBG99b/t/c7f4EkJ/szX9vZt7+2ZndU4ms/k/Wtr0q96wh9+FOcHX5sHXYmjqZq/RI+vm27ns+N5rv/CaZtruNAxkHrBZ9Bbzizsjz2mNdbOZdAGamvVP2GmIL4I4SY1qVscxhbtBpC5tkWl6hxJcBH9cyB7lcY/zJlH2ZPFlsLTuVCToaIs/E5FosCOUPsnxlA7Z+yTKCSmXibr/bz8qNpRH9S5Fbs3Zxb1d+msmliOjKuaty3bGbMTGf8CGIEX99qH9gPnpf0VSp5fxoFJ2HWKW96MDpSlyIoRa7zDmLLiQPJDPWHZw339oVPPU7AUdsogjagqMScWaUqqyhEbMEJvII5nLmiP9s53MY9auwGUviZJMXxL8Ab0RjPck55OtU6jC4FEd6Un+qLQJ9M3ZhZ1+m8DiGvEazWXe4a72Z4R7j8q37vAz/KIjRx65XqjKM7Xfiwqo53GmuQArKe/H+gR6UeE/wo4BBjr1VKUtOcaRVlNcTBHDCjuSddQYcs4096WjhDzXS7NXrnbRBnHS+JeCEAI9uqD6qC1mXuYHymxNq5OHMpQaJfGxqozL2P6LMYW5QB25dp/3AlgQpf5q/gH80bbbQie8A+gAAAABJRU5ErkJggg==) center center no-repeat;padding:11px}.GroupsActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAADF0lEQVRIDc1WTUhUURQ+942Omk2oSYtq0aI0cNFiHCcrIosCK2gRWAvJCkehdgbR0EoKoQxq08KfMPvDkKBFTS0i3Y0/WRClEE6rogjpBySZv3f67rOZeXPfe/NctOjB9Z7zne/c751z77ujoH/0BAd4e5rpEpYLMtMS5mcY4ZlO8cVJQjgFGod5QypOR3SmMnDGsMhrJ66/j4OIvcBYbeYIQe+LNdodbRffzXjG1jKGeQ4M8r5knOYhfBP4NYyZ+j6+aOZk7IZhXguRCPw8YRlHB+oSOo1muOpsEQ/0c52epsdILDWTmegyKmwzY9LWE3Qc3CoVz/pMexv6uSbrmwyLOKo9i7ilir855025yybTVgumAKxRrQIZrkUcqONiaG8tM6vn5Lfdwgpmy7ET/6Uk5lymn0II7EDuQcujOc/GEpQoInpjEyGLuNDoiR1RYlC1xHw1wARNOOWgTTdWfNoPt9MQ2jtis9is10NdKj7eJFJejQ4Bn1VjEL43HaILKp7x1f0zcJzqYlTTgwYfww6XAhzzllBXtE18ziSq854hrlhMUQjtCWIsoYDnmypoZLRFpFXuf+HbVt4c4ZKFT+RH1etRBWseml/lo9h4i1h0emtcrxtR4mbEqzGS6NwCp+kdbkbHA5wn3jjIVUmdenCwWiFabhZCG3F106MiQVcnQ2JGxrA91ZqgM7gbWuFuMfOlLXOwzhTy+uA+wIskzZzsaQ8M8Klkmj7g0+lUhWUCcA/wg7gwvNLHTXgSbx6DcDdci7DkyBwIN8K8jfEWOQHM2ceoHBWcAyLv8EKP7tFo/1RIvKzv5ytY2HrbFcpejsUxHUUHnkpXYK/86OekUdkywfYvWnj3VYc4gQ516LrRRlueG4hql4o08k+ExJwG4bCbsFwQnO6dt9jHOvW6CRSKYxvKkkzXJUfueVMhsozhbb+iVbFEmpqRvMaNv4L4gV33uVJDRca+uyQY/43oVOCn02WBvDA043GqxJdCYQS+5QUVB9Vu23GH15WV00PsfQThH8ZnhJ9z2Cse0ErJLmL0Tp8WH/8AzIgQLCup5hkAAAAASUVORK5CYII=) center center no-repeat;padding:16px}.InfoActiveStyle{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAABxUlEQVQ4Ea1VPU8CURDcvSNGE2nsTCzFws4IvRYUFhrt1ISOgD2lJH7Gzh+AYmKhtBItLbSzAFoLMSZU1kZtQHnOHHfniQYR3OTdvp3dmfe1AZUfbObKhF7uZdE0ZQnpGMaoW/YIX1JLzobHpXg9q28u7jv1Z+4kljfzzXfZRxhpz7XFVcuWTCmpF0Hc8gJjjEYPzS7EzoH9JkZahLXkkOvphLxJLC87OOK6F3fryQGXluXHUXaPyZ31bDj+Ao+vfIDnO7mFUjfH7LRgNTwhkxZf8x/EuFCEWpbbGp1W7jpHLb4y+8w3XOoNbnYbo+aAKnVVyWEcIW4QQ80DxhawklPz+YlR0Gtawk8jQxKvpHTDVkkQUCPH5ZSuYSQRFhxMZbmc1k1jJA71V2Kujfp9SACran2QTgTFTs5Iy7t5m77p5sIDqDWteuI0nc6ZO3j/haFWRptewicgOoZcA/MT0GyQV7FACPMadn6K3BziKXjPqho9MAUQVzykT1+wIHbWp0iQXuQ9FXGE+yDa07ylUbQqaeUdZXoSCZCoQS3nJdES5wD2Avk/TcmlBkl+25RSku1FlBxyvR0g/mr9/sB+E6R8P38BH3BdnpwmY1jPAAAAAElFTkSuQmCC) center center no-repeat;padding:11px}"]
                }] }
    ];
    /** @nocollapse */
    CometchatNavBarComponent.ctorParameters = function () { return []; };
    CometchatNavBarComponent.propDecorators = {
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
    return CometchatNavBarComponent;
}());
export { CometchatNavBarComponent };
if (false) {
    /** @type {?} */
    CometchatNavBarComponent.prototype.item;
    /** @type {?} */
    CometchatNavBarComponent.prototype.type;
    /** @type {?} */
    CometchatNavBarComponent.prototype.lastMessage;
    /** @type {?} */
    CometchatNavBarComponent.prototype.enableSelectedGroupStyling;
    /** @type {?} */
    CometchatNavBarComponent.prototype.groupToUpdate;
    /** @type {?} */
    CometchatNavBarComponent.prototype.groupToLeave;
    /** @type {?} */
    CometchatNavBarComponent.prototype.groupToDelete;
    /** @type {?} */
    CometchatNavBarComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatNavBarComponent.prototype.onUserClick;
    /** @type {?} */
    CometchatNavBarComponent.prototype.displayConversationList;
    /** @type {?} */
    CometchatNavBarComponent.prototype.displayGroupList;
    /** @type {?} */
    CometchatNavBarComponent.prototype.displayUserList;
    /** @type {?} */
    CometchatNavBarComponent.prototype.displayUserInfoScreen;
    /** @type {?} */
    CometchatNavBarComponent.prototype.groupMessage;
    /** @type {?} */
    CometchatNavBarComponent.prototype.curentItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW5hdi1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVXNlclByb2ZpbGUvY29tZXRjaGF0LW5hdi1iYXIvY29tZXRjaGF0LW5hdi1iYXIvY29tZXRjaGF0LW5hdi1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDO0lBd0JFO1FBbEJTLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVosK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXBCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCw0QkFBdUIsR0FBWSxJQUFJLENBQUM7UUFDeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUV2QyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQUVILENBQUM7Ozs7SUFFaEIsMkNBQVE7OztJQUFSLGNBQVksQ0FBQztJQUViOzs7T0FHRzs7Ozs7O0lBQ0gsOENBQVc7Ozs7O0lBQVgsVUFBWSxJQUFJO1FBQ2QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFD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SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLHFxRUFBaUQ7O2lCQUVsRDs7Ozs7dUJBRUUsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7NkNBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUs7Z0NBQ0wsS0FBSztrQ0FFTCxNQUFNOzhCQUNOLE1BQU07O0lBMEdULCtCQUFDO0NBQUEsQUF6SEQsSUF5SEM7U0FwSFksd0JBQXdCOzs7SUFDbkMsd0NBQXFCOztJQUNyQix3Q0FBcUI7O0lBQ3JCLCtDQUFxQjs7SUFDckIsOERBQTRDOztJQUM1QyxpREFBOEI7O0lBQzlCLGdEQUE2Qjs7SUFDN0IsaURBQThCOztJQUU5QixtREFBa0U7O0lBQ2xFLCtDQUE4RDs7SUFFOUQsMkRBQXdDOztJQUN4QyxvREFBa0M7O0lBQ2xDLG1EQUFpQzs7SUFDakMseURBQXVDOztJQUV2QyxnREFBa0I7O0lBQ2xCLDhDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZW51bXNcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjb21ldGNoYXQtbmF2LWJhclwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1uYXYtYmFyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbmF2LWJhci5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21ldGNoYXROYXZCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG4gIEBJbnB1dCgpIGxhc3RNZXNzYWdlO1xuICBASW5wdXQoKSBlbmFibGVTZWxlY3RlZEdyb3VwU3R5bGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBncm91cFRvVXBkYXRlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0xlYXZlID0gbnVsbDtcbiAgQElucHV0KCkgZ3JvdXBUb0RlbGV0ZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblVzZXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZGlzcGxheUNvbnZlcnNhdGlvbkxpc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBkaXNwbGF5R3JvdXBMaXN0OiBib29sZWFuID0gZmFsc2U7XG4gIGRpc3BsYXlVc2VyTGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNwbGF5VXNlckluZm9TY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBncm91cE1lc3NhZ2UgPSBbXTtcbiAgY3VyZW50SXRlbTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgTGlzdCB0byBiZSBvcGVuZWQgb24gdXNlciBjbGlja2VkXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgY2hlY2tTY3JlZW4odHlwZSkge1xuICAgIHRoaXMuZGlzcGxheUNvbnZlcnNhdGlvbkxpc3QgPSB0eXBlID09PSBcImNvbnZlcnNhdGlvbkxpc3RcIiA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlHcm91cExpc3QgPSB0eXBlID09PSBcImdyb3VwTGlzdFwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheVVzZXJMaXN0ID0gdHlwZSA9PT0gXCJ1c2VyTGlzdFwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheVVzZXJJbmZvU2NyZWVuID0gdHlwZSA9PT0gXCJpbmZvU2NyZWVuXCIgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgQ29udmVyc2F0aW9uTGlzdFxuICAgKi9cbiAgb3BlbkNvbnZlcnNhdGlvbkxpc3QoKSB7XG4gICAgdGhpcy5jaGVja1NjcmVlbihcImNvbnZlcnNhdGlvbkxpc3RcIik7XG4gICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBHcm91cExpc3RcbiAgICovXG4gIG9wZW5Hcm91cExpc3QoKSB7XG4gICAgdGhpcy5jaGVja1NjcmVlbihcImdyb3VwTGlzdFwiKTtcbiAgICB0aGlzLmNsb3NlRGV0YWlsVmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHVzZXJsaXN0XG4gICAqL1xuICBvcGVuVXNlckxpc3QoKSB7XG4gICAgdGhpcy5jaGVja1NjcmVlbihcInVzZXJMaXN0XCIpO1xuICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgVXNlciBJbmZvIFNjcmVublxuICAgKi9cbiAgb3BlblVzZXJJbmZvU2NyZWVuKCkge1xuICAgIHRoaXMuY2hlY2tTY3JlZW4oXCJpbmZvU2NyZWVuXCIpO1xuICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIERldGFpbCBWaWV3IHdoZW4gdGFiIGlzIGNoYW5nZWRcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlRBQl9DSEFOR0VELFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byB0aGUgdXNlciBlbWl0dGVkIGJ5IHRoZSB1c2VyTGlzdCBjb21wb25lbnRcbiAgICogQHBhcmFtIEV2ZW50IHVzZXJcbiAgICovXG4gIHVzZXJDbGlja2VkKHVzZXIpIHtcbiAgICBpZiAodXNlci5oYXNPd25Qcm9wZXJ0eShcImNvbnZlcnNhdGlvbldpdGhcIikpIHtcbiAgICAgIHRoaXMuaXRlbSA9IHVzZXIuY29udmVyc2F0aW9uV2l0aDtcbiAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtID0gdXNlcjtcbiAgICAgIHRoaXMuY3VyZW50SXRlbSA9IHRoaXMuaXRlbTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXRlbS5oYXNPd25Qcm9wZXJ0eShcInVpZFwiKSkge1xuICAgICAgdGhpcy50eXBlID0gXCJ1c2VyXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICB9XG4gICAgdGhpcy5sYXN0TWVzc2FnZSA9IHVzZXIubGFzdE1lc3NhZ2U7XG4gICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHRoaXMuaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBncm91cCBlbWl0dGVkIGJ5IHRoZSBncm91cExpc3QgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCB1c2VyXG4gICAqL1xuICBncm91cENsaWNrZWQoZ3JvdXApIHtcbiAgICB0aGlzLml0ZW0gPSBncm91cDtcbiAgICB0aGlzLmN1cmVudEl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAvL0Nsb3NlIFRocmVhZCBBbmQgVXNlciBEZXRhaWwgU2NyZWVuIFdoZW4gQ2hhdCBXaW5kb3cgSXMgQ2hhbmdlZFxuICAgIC8vdGhpcy5jbG9zZVRocmVhZE1lc3NhZ2VzKCk7XG4gICAgLy90aGlzLnZpZXdEZXRhaWxTY3JlZW4gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLml0ZW0uaGFzT3duUHJvcGVydHkoXCJ1aWRcIikpIHtcbiAgICAgIHRoaXMudHlwZSA9IFwidXNlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR5cGUgPSBcImdyb3VwXCI7XG4gICAgfVxuXG4gICAgdGhpcy5vblVzZXJDbGljay5lbWl0KHRoaXMuaXRlbSk7XG4gIH1cbn1cbiJdfQ==