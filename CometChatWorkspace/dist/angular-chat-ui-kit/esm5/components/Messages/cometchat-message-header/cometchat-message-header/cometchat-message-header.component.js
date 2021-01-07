/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-header/cometchat-message-header/cometchat-message-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
import { DatePipe } from "@angular/common";
var CometchatMessageHeaderComponent = /** @class */ (function () {
    function CometchatMessageHeaderComponent(datepipe) {
        this.datepipe = datepipe;
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.userListenerId = "head_user_" + new Date().getTime();
        this.msgListenerId = "head_message_" + new Date().getTime();
        this.groupListenerId = "head_group_" + new Date().getTime();
        this.status = "";
        this.isTyping = false;
        this.loggedInUser = null;
        //displays audio and video call options
        this.checkNotBlocked = true;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change["item"]) {
            //Check if user is blocked/unblocked
            this.checkBlocked();
            // if the person you are chatting with changes
            //Removing User Presence , typing and Group Listeners
            this.removeListeners();
            if (this.type == "group") {
                /** @type {?} */
                var prevProps = {
                    item: change["item"].previousValue == null
                        ? { guid: "" }
                        : change["item"].previousValue,
                };
                /** @type {?} */
                var props = { item: change["item"].currentValue };
                if (prevProps.item.guid === props.item.guid &&
                    prevProps.item.membersCount !== props.item.membersCount) {
                    this.updateHeader(enums.GROUP_MEMBER_ADDED, props.item);
                }
                if (prevProps.item.guid !== props.item.guid) {
                    this.setGroupMemeberCountStatus(this.item.membersCount);
                }
            }
            //Attaching new listeners
            this.userListenerId = "head_user_" + new Date().getTime();
            this.msgListenerId = "head_message_" + new Date().getTime();
            this.groupListenerId = "head_group_" + new Date().getTime();
            this.attachListeners();
        }
    };
    /**
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.attachListeners();
        this.getLoggedInUserInfo();
        if (this.type == "group") {
            this.setGroupMemeberCountStatus(this.item.membersCount);
        }
    };
    /**
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        //Removing User Presence , typing and Group Listeners
        this.removeListeners();
    };
    /**
     * Gets Information of the currently logged in user
     * @param
     */
    /**
     * Gets Information of the currently logged in user
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.getLoggedInUserInfo = /**
     * Gets Information of the currently logged in user
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.getLoggedinUser()
            .then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.loggedInUser = user;
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("[CometChatGroupList] getUsers getLoggedInUser error", error);
        }));
    };
    /**
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.attachListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
            onUserOnline: (/**
             * @param {?} onlineUser
             * @return {?}
             */
            function (onlineUser) {
                /* when someuser/friend comes online, user will be received here */
                _this.updateHeader(enums.USER_ONLINE, onlineUser);
            }),
            onUserOffline: (/**
             * @param {?} offlineUser
             * @return {?}
             */
            function (offlineUser) {
                /* when someuser/friend went offline, user will be received here */
                _this.updateHeader(enums.USER_OFFLINE, offlineUser);
            }),
        }));
        CometChat.addMessageListener(this.msgListenerId, new CometChat.MessageListener({
            onTypingStarted: (/**
             * @param {?} typingIndicator
             * @return {?}
             */
            function (typingIndicator) {
                _this.updateHeader(enums.TYPING_STARTED, typingIndicator);
            }),
            onTypingEnded: (/**
             * @param {?} typingIndicator
             * @return {?}
             */
            function (typingIndicator) {
                _this.updateHeader(enums.TYPING_ENDED, typingIndicator);
            }),
        }));
        CometChat.addGroupListener(this.groupListenerId, new CometChat.GroupListener({
            onGroupMemberKicked: (/**
             * @param {?} message
             * @param {?} kickedUser
             * @param {?} kickedBy
             * @param {?} kickedFrom
             * @return {?}
             */
            function (message, kickedUser, kickedBy, kickedFrom) {
                _this.updateHeader(enums.GROUP_MEMBER_KICKED, kickedFrom, kickedUser);
            }),
            onGroupMemberBanned: (/**
             * @param {?} message
             * @param {?} bannedUser
             * @param {?} bannedBy
             * @param {?} bannedFrom
             * @return {?}
             */
            function (message, bannedUser, bannedBy, bannedFrom) {
                _this.updateHeader(enums.GROUP_MEMBER_BANNED, bannedFrom, bannedUser);
            }),
            onMemberAddedToGroup: (/**
             * @param {?} message
             * @param {?} userAdded
             * @param {?} userAddedBy
             * @param {?} userAddedIn
             * @return {?}
             */
            function (message, userAdded, userAddedBy, userAddedIn) {
                _this.updateHeader(enums.GROUP_MEMBER_ADDED, userAddedIn);
            }),
            onGroupMemberLeft: (/**
             * @param {?} message
             * @param {?} leavingUser
             * @param {?} group
             * @return {?}
             */
            function (message, leavingUser, group) {
                _this.updateHeader(enums.GROUP_MEMBER_LEFT, group, leavingUser);
            }),
            onGroupMemberJoined: (/**
             * @param {?} message
             * @param {?} joinedUser
             * @param {?} joinedGroup
             * @return {?}
             */
            function (message, joinedUser, joinedGroup) {
                _this.updateHeader(enums.GROUP_MEMBER_JOINED, joinedGroup);
            }),
        }));
    };
    /**
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.removeListeners = /**
     * @return {?}
     */
    function () {
        CometChat.removeUserListener(this.userListenerId);
        CometChat.removeMessageListener(this.msgListenerId);
        CometChat.removeGroupListener(this.groupListenerId);
    };
    /**
     * If user blocked then doesnot display audio and video call else displays
     */
    /**
     * If user blocked then doesnot display audio and video call else displays
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.checkBlocked = /**
     * If user blocked then doesnot display audio and video call else displays
     * @return {?}
     */
    function () {
        if (this.item.blockedByMe === true) {
            this.checkNotBlocked = false;
        }
        else {
            this.checkNotBlocked = true;
        }
    };
    /**
     * @param {?=} key
     * @param {?=} item
     * @param {?=} groupUser
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.updateHeader = /**
     * @param {?=} key
     * @param {?=} item
     * @param {?=} groupUser
     * @return {?}
     */
    function (key, item, groupUser) {
        if (key === void 0) { key = null; }
        if (item === void 0) { item = null; }
        if (groupUser === void 0) { groupUser = null; }
        switch (key) {
            case enums.USER_ONLINE:
            case enums.USER_OFFLINE: {
                if (this.type === "user" && this.item.uid === item.uid) {
                    this.item = tslib_1.__assign({}, item);
                }
                break;
            }
            case enums.GROUP_MEMBER_KICKED:
            case enums.GROUP_MEMBER_BANNED:
            case enums.GROUP_MEMBER_LEFT:
                if (this.type === "group" &&
                    this.item.guid === item.guid &&
                    this.loggedInUser.uid !== groupUser.uid) {
                    /** @type {?} */
                    var membersCount = parseInt(item.membersCount);
                    this.item.membersCount = membersCount;
                    this.setGroupMemeberCountStatus(membersCount);
                }
                break;
            case enums.GROUP_MEMBER_JOINED:
                if (this.type === "group" && this.item.guid === item.guid) {
                    /** @type {?} */
                    var membersCount = parseInt(item.membersCount);
                    this.item.membersCount = membersCount;
                    this.setGroupMemeberCountStatus(membersCount);
                }
                break;
            case enums.GROUP_MEMBER_ADDED:
                if (this.type === "group" && this.item.guid === item.guid) {
                    /** @type {?} */
                    var membersCount = parseInt(item.membersCount);
                    this.item.membersCount = membersCount;
                    this.setGroupMemeberCountStatus(membersCount);
                }
                break;
            case enums.TYPING_STARTED: {
                if (this.type === "group" &&
                    this.type === item.receiverType &&
                    this.item.guid === item.receiverId) {
                    this.status = item.sender.name + STRING_MESSAGES.IS_TYPING;
                    this.actionGenerated.emit({
                        type: enums.SHOW_REACTION,
                        payLoad: item,
                    });
                }
                else if (this.type === "user" &&
                    this.type === item.receiverType &&
                    this.item.uid === item.sender.uid) {
                    this.isTyping = true;
                    this.status = STRING_MESSAGES.TYPING;
                    this.actionGenerated.emit({
                        type: enums.SHOW_REACTION,
                        payLoad: item,
                    });
                }
                break;
            }
            case enums.TYPING_ENDED: {
                if (this.type === "group" &&
                    this.type === item.receiverType &&
                    this.item.guid === item.receiverId) {
                    this.setGroupMemeberCountStatus(this.item.membersCount);
                    // this.setStatusForGroup();
                    this.actionGenerated.emit({
                        type: enums.STOP_REACTION,
                        payLoad: item,
                    });
                }
                else if (this.type === "user" &&
                    this.type === item.receiverType &&
                    this.item.uid === item.sender.uid) {
                    if (this.item.status === "online") {
                        this.status = null;
                        this.isTyping = false;
                    }
                    else {
                        this.getDate(item.lastActiveAt);
                    }
                    this.actionGenerated.emit({
                        type: enums.STOP_REACTION,
                        payLoad: item,
                    });
                }
                break;
            }
        }
    };
    /**
     * Sets status of the group according to its member count
     * @param number membersCount
     */
    /**
     * Sets status of the group according to its member count
     * @param {?} membersCount
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.setGroupMemeberCountStatus = /**
     * Sets status of the group according to its member count
     * @param {?} membersCount
     * @return {?}
     */
    function (membersCount) {
        if (membersCount > 1) {
            this.status = membersCount + " members";
        }
        else {
            this.status = membersCount + " member";
        }
    };
    /**
     * Get Last Active Date
     * @param
     */
    /**
     * Get Last Active Date
     * @param {?} date
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.getDate = /**
     * Get Last Active Date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var lastActiveDate = "Last Active At: ";
        if (date === undefined) {
            lastActiveDate = "Offline";
            return lastActiveDate;
        }
        date = date * 1000;
        lastActiveDate =
            lastActiveDate + this.datepipe.transform(date, "dd MMMM yyyy, h:mm a");
        return lastActiveDate;
    };
    /**
     * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
     * @param
     */
    /**
     * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.openUserDetail = /**
     * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.VIEW_DETAIL, payLoad: null });
    };
    /**
     * Starts audio call
     */
    /**
     * Starts audio call
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.audioCall = /**
     * Starts audio call
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.AUDIO_CALL });
    };
    /**
     * Starts video call
     */
    /**
     * Starts video call
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.videoCall = /**
     * Starts video call
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.VIDEO_CALL });
    };
    /**
     * @return {?}
     */
    CometchatMessageHeaderComponent.prototype.closeChatWindow = /**
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({ type: enums.MENU_CLICKED });
    };
    CometchatMessageHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-message-header",
                    template: "<div class=\"chatHeaderStyle\">\n  <div class=\"chatDetailStyle\">\n    <!-- SideBar menu icon when screen size goes to mobile -->\n    <div class=\"chatSideBarBtnStyle\" (click)=\"closeChatWindow()\"></div>\n    <div class=\"chatThumbnailStyle\">\n      <!-- Pass The emitted User to The AVATAR below -->\n      <cometchat-avatar\n        [item]=\"item\"\n        [userStatus]=\"item?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"chatUserStyle\">\n      <!-- Add Tool Tip functions here -->\n      <h6 class=\"chatNameStyle\">{{ item.name }}</h6>\n      <div class=\"chatStatusStyle typing\" *ngIf=\"isTyping\">{{ status }}</div>\n      <!-- Add Mouse Event to status -->\n      <div *ngIf=\"item.status === 'online' && !isTyping\">\n        <span class=\"chatStatusStyle\">{{ item.status }}</span>\n      </div>\n\n      <div *ngIf=\"item.status === 'offline'\">\n        <span class=\"chatStatusStyle lastActive\">{{\n          getDate(item.lastActiveAt)\n        }}</span>\n      </div>\n\n      <div *ngIf=\"type === 'group' && !isTyping\">\n        <span class=\"chatStatusStyle groupMemberCountStatusStyle\">{{\n          status\n        }}</span>\n      </div>\n    </div>\n  </div>\n  <div class=\"chatOptionWrapStyle\">\n    <!-- add action generated to call -->\n    <div\n      class=\"chatOptionStyle callOption\"\n      *ngIf=\"checkNotBlocked\"\n      (click)=\"audioCall()\"\n    ></div>\n    <div\n      class=\"chatOptionStyle videoCallOption\"\n      *ngIf=\"checkNotBlocked\"\n      (click)=\"videoCall()\"\n    ></div>\n    <div class=\"chatOptionStyle detailsOption\" (click)=\"openUserDetail()\"></div>\n  </div>\n</div>\n",
                    styles: [".chatHeaderStyle{padding:12px 16px;width:100%;background-color:#fff;z-index:1;border-bottom:1px solid #eaeaea;display:flex;flex-direction:row;justify-content:space-between}.chatDetailStyle{display:flex;flex-direction:row;align-items:center;width:calc(100% - 100px)}.chatThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.chatUserStyle{width:calc(100% - 50px);padding:0 14px;flex-grow:1;display:flex;flex-direction:column}.chatNameStyle{margin:0;font-size:15px;font-weight:600;width:100%;overflow:hidden;text-overflow:ellipsis}.chatStatusStyle{color:#39f;text-transform:capitalize;font-size:13px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lastActive{color:rgba(20,20,20,.6);white-space:normal;line-height:0}.groupMemberCountStatusStyle{color:rgba(20,20,20,.6)}.typing{color:rgba(20,20,20,.6);text-transform:none;font-style:italic}.chatOptionWrapStyle{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;width:118px}.chatOptionStyle{display:inline-block;width:20px;height:20px;margin:0 10px;cursor:pointer}.callOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACtklEQVQ4EZ1UUUiTURQ+5/9xVCYaRCsUAumtQkhXFEUzyYg0emn1MIqls3qISisIkZmURDSKiqhpSEEvEzKoqJDKepnTFVH2ElEiWT6Ek5IsbTt9R/uH0VZbBy733HO/7zvn3Hv/nwlWfFmy2CCfxMnLRINk0o5INffpXqZmbA2KSUw3IFbPTC+EKF9i9MDRJvMzFVO88S5Ke0moAqINkRpeb5tBy+Db4uPU+l+CIG9GZc8rvdSsAqGdPIgEB+BucgTEm6moIUJLINDVyBy3yE9381X4d9C+3xmU2VY8ndkAKBfE4SRgP5LljI7QhiR7KUMG2n2PtgunI8qvSTbiPowYRF9P3/uXb6C6x3gqGxtFtNpJGx6j8xBai7EH7b+04unMWmE7iPbbreROEJjs8D9i6FlmZEbEy52osA8Xc2JlUGYqGwlOI9E8jJMZqQE81SbTEYgUjI9QnQqgzUc4ioOI1Za0iD6htA3FTRk+vyAqqjRMWtdTxSGNQuy4fkFwDyGJfwpJtPyKFMVjtMicRZ1hN3+24jonBJ1tkjc6Qc9QVXaWjVZ0e7hfAcUBacZxHEUyvag6MKpAugDfxPZXg+lwbw1fVKxaQlAXmjn2A7eOp4Tsq6zsEN0H4BlAPkHIDtZDnFUTjqUWa/3S7nIW7er18NBvgpOiLbImHqf7AL/BugKtDmgcR1KKSSv8YMuj/SEXj2nc0SJu4M/BnWCTyv4QVBDIq0G8hc3vJtOWsJe7NZ7KgF8A/BMW+pJUUIkALcXUgXby0daxHBud7fLwt1SiJQEJY29hSkElQjQXgpcguB3LAcOg+p5qus6MWn6Z/k/fRsmHZQOqbPqroEWCcDn8UxhFIAwJ0z0k6sftz0WsFAkXQ6wD621pCVrCjlYpw9/cBbITIgWIRzFeYdwsnEOBdhfHfgIOSveEJ4dt6QAAAABJRU5ErkJggg==) center center/19px no-repeat}.videoCallOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAACiElEQVRIDb1Wz0tUURT+zhud0fwFI5UbMYrJNokxMwaF1EJauIt+EARG1Ogf0CowJypa9QfUm1lNYWS6DoKiooJSyyGiRemiFkWYo4bWhPNO3518MJjDjOnrwuXcd+495/vOPffe8wRsh1Ja8+0H+iHoFmCnKqqMvtxGmyXaTnH9C9r2j/fJx3Js5eCQ1n7P4BUXh9in6SitwEw5xu4aEdRAsZt2zSSxYAF7R3vlrTvvSlWViI0mkvtsdBK+odcozxH0TrAaZ+73yIK7eC3y2JD6pmYxQBID9PVkrE8OFNpHkrpHcxikbhd7kgRiErY1bRR1ldj66LTMFhqsdWwii9p4xx0IbWnGpnvdkjU+Omw9nFPcIim/ChwS1MZqNFoctHJ+cr3ABkREiIsJdmvmC3YYXdTW8zlghMNFpqeLeMMcBzI51DE9CFAxT7lRbS7vKIf6iK0pR3GV328q/YjyHDwmAXL50yrcwUbLJQe36XMbwUaCVTi12lnyDJynvoXbGn8Zw+XldPwVn9l2TxoP11lu86ViwAbUM3B6fl0qKu/ASyF7GTkflHApfO8iF9iRhMbNw1OMhHfgik/q4GI0gbumcK1GwDNwXwVOEHCQVe4IK+azfUltWUnAgGd5J+tXTqzju8HY8nGZY/E4Sd8X2NuyDkY7EtpJMj7Xt8WEvOfzup3VLW/kTvyLXM5vO22dYBMmjY/xXrlCIsf56tc6Dh6SyFF+/3R+Yd7icXjANQEqrhfLjXFSqpmSyooWZ2VpZUBP3Ypm7MZiMuyz0Mm5DwzUz57iriyaet5ANmkqTE6mSWKCW5MpBVY4T5uyfyb238Tm5z3y1djnr4EhQAe8FuiiDFH+l9+o3xTf5Es4uYHyAAAAAElFTkSuQmCC) center center/24px no-repeat;padding:0 0 0 24px;margin-left:0}.detailsOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGqADAAQAAAABAAAAFAAAAADz+QhrAAAB5klEQVRIDbVVTSiEURQ99/OFYuEnikZKslPKpCyUhUQsUCw1JWNpZ2M7e3Z+pihZsbKQha0VpvyUWMhC2ClZyJh513nGxxgS5nl15913591z3vvuffdK94qW3D4gpsAQgBDFo+Q/BEmCnBNsZi8qcWld1FkoJmm8gmBbgMefsvBwRfSN0Gefvokcv0pV9NBWSun3RTFEh5uGctSvj0g6Z/O3y85lLbtPIqKCjURUYrmbWxe0mbYjEQz63BTiiVZ/S5ILatcdS1qVTKMmZXhP4DQxIcf8YtdchDyahFf88ef6iiCwPaQQJ8kh10eUAWu3oaB4bgJvETl4YD+jkcB7163t7Y9gQz4zT37Cz9TE2ajBWTaWU6L9CZkiuJVPwylR26IOGkU7A6OeYH53XC4CRqdEacUYgftszhnBAfU3IqfJEJz+q9npjUgwZysEi4BKAXayCZ0S8YFuEtzKp+GUKBzXGAxGWW0MYzLMYroXMDqNEd9OC/OgjslQT7LGgMTOTomI9xSAe4r7QLezb3OeL7ko25iHHvELUZ1KwuxG5dzi8IYW2/jULrnoGl7TgnwrOJPhjqBWXsZLm1DUsk1s/VvjY4GtIFsvJdP4KosxzVZOO1u5MmP+EDf6hOkbztzj9fdjK998BobvpZEpTxuHAAAAAElFTkSuQmCC) center center/22px no-repeat;padding:0 30px 0 0;margin-left:-5px}.chatSideBarBtnStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAW0lEQVRIS2NkoDFgpLH5DKMWEAxh+gbR0qVL/xN0EhEKoqOj4Q5H8QHNLSDCcSQroW8ckOw8IjTQNw5GIxlblNA3FdE8DmhuARHJmmQl9I0Dkp1HhIZRHxAMJAAC5RgZMxAd6wAAAABJRU5ErkJggg==) center center no-repeat;padding:20px;width:24px;height:24px;float:left}@media (min-width:320px) and (max-width:767px){.chatSideBarBtnStyle{display:block}.chatUserStyle{width:calc(100% - 80px)!important}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatMessageHeaderComponent.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    CometchatMessageHeaderComponent.propDecorators = {
        item: [{ type: Input }],
        type: [{ type: Input }],
        actionGenerated: [{ type: Output }]
    };
    return CometchatMessageHeaderComponent;
}());
export { CometchatMessageHeaderComponent };
if (false) {
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.item;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.type;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.userListenerId;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.msgListenerId;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.groupListenerId;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.status;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.isTyping;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.checkNotBlocked;
    /** @type {?} */
    CometchatMessageHeaderComponent.prototype.datepipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1tZXNzYWdlLWhlYWRlci9jb21ldGNoYXQtbWVzc2FnZS1oZWFkZXIvY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxZQUFZLEVBQ1osTUFBTSxHQUlQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0M7SUFzQkUseUNBQW1CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFmNUIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLG1CQUFjLEdBQUcsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckQsa0JBQWEsR0FBRyxlQUFlLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2RCxvQkFBZSxHQUFHLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZELFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFHLElBQUksQ0FBQzs7UUFHcEIs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Ozs7SUFDSCxtREFBUzs7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQUNELHlEQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQTNURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsK29EQUF3RDs7aUJBRXpEOzs7O2dCQU5RLFFBQVE7Ozt1QkFTZCxLQUFLO3VCQUNMLEtBQUs7a0NBRUwsTUFBTTs7SUFrVFQsc0NBQUM7Q0FBQSxBQTVURCxJQTRUQztTQXZUWSwrQkFBK0I7OztJQUUxQywrQ0FBcUI7O0lBQ3JCLCtDQUFxQjs7SUFFckIsMERBQWtFOztJQUVsRSx5REFBcUQ7O0lBQ3JELHdEQUF1RDs7SUFDdkQsMERBQXVEOztJQUN2RCxpREFBb0I7O0lBQ3BCLG1EQUEwQjs7SUFDMUIsdURBQW9COztJQUdwQiwwREFBZ0M7O0lBRXBCLG1EQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuaW1wb3J0IHsgU1RSSU5HX01FU1NBR0VTIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZS1oZWFkZXIuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TWVzc2FnZUhlYWRlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdXNlckxpc3RlbmVySWQgPSBcImhlYWRfdXNlcl9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBtc2dMaXN0ZW5lcklkID0gXCJoZWFkX21lc3NhZ2VfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZ3JvdXBMaXN0ZW5lcklkID0gXCJoZWFkX2dyb3VwX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHN0YXR1czogc3RyaW5nID0gXCJcIjtcbiAgaXNUeXBpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcblxuICAvL2Rpc3BsYXlzIGF1ZGlvIGFuZCB2aWRlbyBjYWxsIG9wdGlvbnNcbiAgY2hlY2tOb3RCbG9ja2VkOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VbXCJpdGVtXCJdKSB7XG4gICAgICAvL0NoZWNrIGlmIHVzZXIgaXMgYmxvY2tlZC91bmJsb2NrZWRcbiAgICAgIHRoaXMuY2hlY2tCbG9ja2VkKCk7XG5cbiAgICAgIC8vIGlmIHRoZSBwZXJzb24geW91IGFyZSBjaGF0dGluZyB3aXRoIGNoYW5nZXNcbiAgICAgIC8vUmVtb3ZpbmcgVXNlciBQcmVzZW5jZSAsIHR5cGluZyBhbmQgR3JvdXAgTGlzdGVuZXJzXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuXG4gICAgICBpZiAodGhpcy50eXBlID09IFwiZ3JvdXBcIikge1xuICAgICAgICBsZXQgcHJldlByb3BzID0ge1xuICAgICAgICAgIGl0ZW06XG4gICAgICAgICAgICBjaGFuZ2VbXCJpdGVtXCJdLnByZXZpb3VzVmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgICA/IHsgZ3VpZDogXCJcIiB9XG4gICAgICAgICAgICAgIDogY2hhbmdlW1wiaXRlbVwiXS5wcmV2aW91c1ZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvcHMgPSB7IGl0ZW06IGNoYW5nZVtcIml0ZW1cIl0uY3VycmVudFZhbHVlIH07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZQcm9wcy5pdGVtLmd1aWQgPT09IHByb3BzLml0ZW0uZ3VpZCAmJlxuICAgICAgICAgIHByZXZQcm9wcy5pdGVtLm1lbWJlcnNDb3VudCAhPT0gcHJvcHMuaXRlbS5tZW1iZXJzQ291bnRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoZW51bXMuR1JPVVBfTUVNQkVSX0FEREVELCBwcm9wcy5pdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2UHJvcHMuaXRlbS5ndWlkICE9PSBwcm9wcy5pdGVtLmd1aWQpIHtcbiAgICAgICAgICB0aGlzLnNldEdyb3VwTWVtZWJlckNvdW50U3RhdHVzKHRoaXMuaXRlbS5tZW1iZXJzQ291bnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vQXR0YWNoaW5nIG5ldyBsaXN0ZW5lcnNcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQgPSBcImhlYWRfdXNlcl9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkID0gXCJoZWFkX21lc3NhZ2VfXCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkID0gXCJoZWFkX2dyb3VwX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLmdldExvZ2dlZEluVXNlckluZm8oKTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT0gXCJncm91cFwiKSB7XG4gICAgICB0aGlzLnNldEdyb3VwTWVtZWJlckNvdW50U3RhdHVzKHRoaXMuaXRlbS5tZW1iZXJzQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vUmVtb3ZpbmcgVXNlciBQcmVzZW5jZSAsIHR5cGluZyBhbmQgR3JvdXAgTGlzdGVuZXJzXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIEluZm9ybWF0aW9uIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBnZXRMb2dnZWRJblVzZXJJbmZvKCkge1xuICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJbQ29tZXRDaGF0R3JvdXBMaXN0XSBnZXRVc2VycyBnZXRMb2dnZWRJblVzZXIgZXJyb3JcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LmFkZFVzZXJMaXN0ZW5lcihcbiAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICBuZXcgQ29tZXRDaGF0LlVzZXJMaXN0ZW5lcih7XG4gICAgICAgIG9uVXNlck9ubGluZTogKG9ubGluZVVzZXIpID0+IHtcbiAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG5cbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5VU0VSX09OTElORSwgb25saW5lVXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgIC8qIHdoZW4gc29tZXVzZXIvZnJpZW5kIHdlbnQgb2ZmbGluZSwgdXNlciB3aWxsIGJlIHJlY2VpdmVkIGhlcmUgKi9cblxuICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLlVTRVJfT0ZGTElORSwgb2ZmbGluZVVzZXIpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgQ29tZXRDaGF0LmFkZE1lc3NhZ2VMaXN0ZW5lcihcbiAgICAgIHRoaXMubXNnTGlzdGVuZXJJZCxcbiAgICAgIG5ldyBDb21ldENoYXQuTWVzc2FnZUxpc3RlbmVyKHtcbiAgICAgICAgb25UeXBpbmdTdGFydGVkOiAodHlwaW5nSW5kaWNhdG9yKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoZW51bXMuVFlQSU5HX1NUQVJURUQsIHR5cGluZ0luZGljYXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVHlwaW5nRW5kZWQ6ICh0eXBpbmdJbmRpY2F0b3IpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5UWVBJTkdfRU5ERUQsIHR5cGluZ0luZGljYXRvcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBDb21ldENoYXQuYWRkR3JvdXBMaXN0ZW5lcihcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgbmV3IENvbWV0Q2hhdC5Hcm91cExpc3RlbmVyKHtcbiAgICAgICAgb25Hcm91cE1lbWJlcktpY2tlZDogKG1lc3NhZ2UsIGtpY2tlZFVzZXIsIGtpY2tlZEJ5LCBraWNrZWRGcm9tKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRCwga2lja2VkRnJvbSwga2lja2VkVXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uR3JvdXBNZW1iZXJCYW5uZWQ6IChtZXNzYWdlLCBiYW5uZWRVc2VyLCBiYW5uZWRCeSwgYmFubmVkRnJvbSkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLkdST1VQX01FTUJFUl9CQU5ORUQsIGJhbm5lZEZyb20sIGJhbm5lZFVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvbk1lbWJlckFkZGVkVG9Hcm91cDogKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdXNlckFkZGVkLFxuICAgICAgICAgIHVzZXJBZGRlZEJ5LFxuICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgdXNlckFkZGVkSW4pO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVyTGVmdDogKG1lc3NhZ2UsIGxlYXZpbmdVc2VyLCBncm91cCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLkdST1VQX01FTUJFUl9MRUZULCBncm91cCwgbGVhdmluZ1VzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwTWVtYmVySm9pbmVkOiAobWVzc2FnZSwgam9pbmVkVXNlciwgam9pbmVkR3JvdXApID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5HUk9VUF9NRU1CRVJfSk9JTkVELCBqb2luZWRHcm91cCk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgICBDb21ldENoYXQucmVtb3ZlTWVzc2FnZUxpc3RlbmVyKHRoaXMubXNnTGlzdGVuZXJJZCk7XG4gICAgQ29tZXRDaGF0LnJlbW92ZUdyb3VwTGlzdGVuZXIodGhpcy5ncm91cExpc3RlbmVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHVzZXIgYmxvY2tlZCB0aGVuIGRvZXNub3QgZGlzcGxheSBhdWRpbyBhbmQgdmlkZW8gY2FsbCBlbHNlIGRpc3BsYXlzXG4gICAqL1xuICBjaGVja0Jsb2NrZWQoKSB7XG4gICAgaWYgKHRoaXMuaXRlbS5ibG9ja2VkQnlNZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jaGVja05vdEJsb2NrZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja05vdEJsb2NrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUhlYWRlcihrZXkgPSBudWxsLCBpdGVtID0gbnVsbCwgZ3JvdXBVc2VyID0gbnVsbCkge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIGVudW1zLlVTRVJfT05MSU5FOlxuICAgICAgY2FzZSBlbnVtcy5VU0VSX09GRkxJTkU6IHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiYgdGhpcy5pdGVtLnVpZCA9PT0gaXRlbS51aWQpIHtcbiAgICAgICAgICB0aGlzLml0ZW0gPSB7IC4uLml0ZW0gfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0JBTk5FRDpcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0xFRlQ6XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJlxuICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLmd1aWQgJiZcbiAgICAgICAgICB0aGlzLmxvZ2dlZEluVXNlci51aWQgIT09IGdyb3VwVXNlci51aWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGl0ZW0ubWVtYmVyc0NvdW50KTtcbiAgICAgICAgICB0aGlzLml0ZW0ubWVtYmVyc0NvdW50ID0gbWVtYmVyc0NvdW50O1xuICAgICAgICAgIHRoaXMuc2V0R3JvdXBNZW1lYmVyQ291bnRTdGF0dXMobWVtYmVyc0NvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRDpcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLmd1aWQpIHtcbiAgICAgICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoaXRlbS5tZW1iZXJzQ291bnQpO1xuICAgICAgICAgIHRoaXMuaXRlbS5tZW1iZXJzQ291bnQgPSBtZW1iZXJzQ291bnQ7XG4gICAgICAgICAgdGhpcy5zZXRHcm91cE1lbWViZXJDb3VudFN0YXR1cyhtZW1iZXJzQ291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQ6XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIiAmJiB0aGlzLml0ZW0uZ3VpZCA9PT0gaXRlbS5ndWlkKSB7XG4gICAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGl0ZW0ubWVtYmVyc0NvdW50KTtcbiAgICAgICAgICB0aGlzLml0ZW0ubWVtYmVyc0NvdW50ID0gbWVtYmVyc0NvdW50O1xuICAgICAgICAgIHRoaXMuc2V0R3JvdXBNZW1lYmVyQ291bnRTdGF0dXMobWVtYmVyc0NvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZW51bXMuVFlQSU5HX1NUQVJURUQ6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgdGhpcy50eXBlID09PSBpdGVtLnJlY2VpdmVyVHlwZSAmJlxuICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLnJlY2VpdmVySWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zdGF0dXMgPSBpdGVtLnNlbmRlci5uYW1lICsgU1RSSU5HX01FU1NBR0VTLklTX1RZUElORztcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlNIT1dfUkVBQ1RJT04sXG4gICAgICAgICAgICBwYXlMb2FkOiBpdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICB0aGlzLnR5cGUgPT09IGl0ZW0ucmVjZWl2ZXJUeXBlICYmXG4gICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gaXRlbS5zZW5kZXIudWlkXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc3RhdHVzID0gU1RSSU5HX01FU1NBR0VTLlRZUElORztcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlNIT1dfUkVBQ1RJT04sXG4gICAgICAgICAgICBwYXlMb2FkOiBpdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBlbnVtcy5UWVBJTkdfRU5ERUQ6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJncm91cFwiICYmXG4gICAgICAgICAgdGhpcy50eXBlID09PSBpdGVtLnJlY2VpdmVyVHlwZSAmJlxuICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLnJlY2VpdmVySWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRHcm91cE1lbWViZXJDb3VudFN0YXR1cyh0aGlzLml0ZW0ubWVtYmVyc0NvdW50KTtcblxuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdHVzRm9yR3JvdXAoKTtcbiAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IGVudW1zLlNUT1BfUkVBQ1RJT04sXG4gICAgICAgICAgICBwYXlMb2FkOiBpdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMudHlwZSA9PT0gXCJ1c2VyXCIgJiZcbiAgICAgICAgICB0aGlzLnR5cGUgPT09IGl0ZW0ucmVjZWl2ZXJUeXBlICYmXG4gICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gaXRlbS5zZW5kZXIudWlkXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLml0ZW0uc3RhdHVzID09PSBcIm9ubGluZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShpdGVtLmxhc3RBY3RpdmVBdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogZW51bXMuU1RPUF9SRUFDVElPTixcbiAgICAgICAgICAgIHBheUxvYWQ6IGl0ZW0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgc3RhdHVzIG9mIHRoZSBncm91cCBhY2NvcmRpbmcgdG8gaXRzIG1lbWJlciBjb3VudFxuICAgKiBAcGFyYW0gbnVtYmVyIG1lbWJlcnNDb3VudFxuICAgKi9cbiAgc2V0R3JvdXBNZW1lYmVyQ291bnRTdGF0dXMobWVtYmVyc0NvdW50KSB7XG4gICAgaWYgKG1lbWJlcnNDb3VudCA+IDEpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gbWVtYmVyc0NvdW50ICsgXCIgbWVtYmVyc1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IG1lbWJlcnNDb3VudCArIFwiIG1lbWJlclwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTGFzdCBBY3RpdmUgRGF0ZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldERhdGUoZGF0ZSkge1xuICAgIGxldCBsYXN0QWN0aXZlRGF0ZSA9IFwiTGFzdCBBY3RpdmUgQXQ6IFwiO1xuXG4gICAgaWYgKGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFzdEFjdGl2ZURhdGUgPSBcIk9mZmxpbmVcIjtcbiAgICAgIHJldHVybiBsYXN0QWN0aXZlRGF0ZTtcbiAgICB9XG4gICAgZGF0ZSA9IGRhdGUgKiAxMDAwO1xuICAgIGxhc3RBY3RpdmVEYXRlID1cbiAgICAgIGxhc3RBY3RpdmVEYXRlICsgdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oZGF0ZSwgXCJkZCBNTU1NIHl5eXksIGg6bW0gYVwiKTtcblxuICAgIHJldHVybiBsYXN0QWN0aXZlRGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBhY3Rpb24gdG8gaW5kaWNhdGUgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gb3BlbiB0aGUgdXNlciAoIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBjb21wb25lbnRcbiAgICogQHBhcmFtXG4gICAqL1xuICBvcGVuVXNlckRldGFpbCgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuVklFV19ERVRBSUwsIHBheUxvYWQ6IG51bGwgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGF1ZGlvIGNhbGxcbiAgICovXG4gIGF1ZGlvQ2FsbCgpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQVVESU9fQ0FMTCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgdmlkZW8gY2FsbFxuICAgKi9cbiAgdmlkZW9DYWxsKCkge1xuICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoeyB0eXBlOiBlbnVtcy5WSURFT19DQUxMIH0pO1xuICB9XG4gIGNsb3NlQ2hhdFdpbmRvdygpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuTUVOVV9DTElDS0VEIH0pO1xuICB9XG59XG4iXX0=