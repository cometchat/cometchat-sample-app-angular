/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-message-header/cometchat-message-header/cometchat-message-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output, } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { DatePipe } from "@angular/common";
import { logger } from "../../../../utils/common";
export class CometChatMessageHeaderComponent {
    /**
     * @param {?} datepipe
     */
    constructor(datepipe) {
        this.datepipe = datepipe;
        this.item = null;
        this.type = null;
        this.actionGenerated = new EventEmitter();
        this.userListenerId = enums.HEAD_USER_ + new Date().getTime();
        this.msgListenerId = enums.HEAD_MESSAGE_ + new Date().getTime();
        this.groupListenerId = enums.HEAD_GROUP_ + new Date().getTime();
        this.status = "";
        this.isTyping = false;
        this.loggedInUser = null;
        this.GROUP = CometChat.RECEIVER_TYPE.GROUP;
        this.USER = CometChat.RECEIVER_TYPE.USER;
        this.ONLINE = CometChat.USER_STATUS.ONLINE;
        this.OFFLINE = CometChat.USER_STATUS.OFFLINE;
        //displays audio and video call options
        this.checkNotBlocked = true;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        try {
            if (change[enums.ITEM]) {
                //Check if user is blocked/unblocked
                this.checkBlocked();
                // if the person you are chatting with changes
                //Removing User Presence , typing and Group Listeners
                this.removeListeners();
                if (this.type == CometChat.RECEIVER_TYPE.GROUP) {
                    /** @type {?} */
                    let prevProps = {
                        item: change[enums.ITEM].previousValue == null
                            ? { guid: "" }
                            : change[enums.ITEM].previousValue,
                    };
                    /** @type {?} */
                    let props = { item: change[enums.ITEM].currentValue };
                    if (prevProps.item.guid === props.item.guid &&
                        prevProps.item.membersCount !== props.item.membersCount) {
                        this.updateHeader(enums.GROUP_MEMBER_ADDED, props.item);
                    }
                    if (prevProps.item.guid !== props.item.guid) {
                        this.setGroupMemeberCountStatus(this.item.membersCount);
                    }
                }
                //Attaching new listeners
                this.userListenerId = enums.HEAD_USER_ + new Date().getTime();
                this.msgListenerId = enums.HEAD_MESSAGE_ + new Date().getTime();
                this.groupListenerId = enums.HEAD_GROUP_ + new Date().getTime();
                this.attachListeners();
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.attachListeners();
            this.getLoggedInUserInfo();
            if (this.type == CometChat.RECEIVER_TYPE.GROUP) {
                this.setGroupMemeberCountStatus(this.item.membersCount);
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            //Removing User Presence , typing and Group Listeners
            this.removeListeners();
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Gets Information of the currently logged in user
     * @return {?}
     */
    getLoggedInUserInfo() {
        try {
            CometChat.getLoggedinUser()
                .then((/**
             * @param {?} user
             * @return {?}
             */
            (user) => {
                this.loggedInUser = user;
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                logger("[CometChatGroupList] getUsers getLoggedInUser error", error);
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * attaches Listeners for user activity , group activities and calling
     * @return {?}
     */
    attachListeners() {
        try {
            CometChat.addUserListener(this.userListenerId, new CometChat.UserListener({
                onUserOnline: (/**
                 * @param {?} onlineUser
                 * @return {?}
                 */
                (onlineUser) => {
                    /* when someuser/friend comes online, user will be received here */
                    this.updateHeader(enums.USER_ONLINE, onlineUser);
                }),
                onUserOffline: (/**
                 * @param {?} offlineUser
                 * @return {?}
                 */
                (offlineUser) => {
                    /* when someuser/friend went offline, user will be received here */
                    this.updateHeader(enums.USER_OFFLINE, offlineUser);
                }),
            }));
            CometChat.addMessageListener(this.msgListenerId, new CometChat.MessageListener({
                onTypingStarted: (/**
                 * @param {?} typingIndicator
                 * @return {?}
                 */
                (typingIndicator) => {
                    this.updateHeader(enums.TYPING_STARTED, typingIndicator);
                }),
                onTypingEnded: (/**
                 * @param {?} typingIndicator
                 * @return {?}
                 */
                (typingIndicator) => {
                    this.updateHeader(enums.TYPING_ENDED, typingIndicator);
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
                (message, kickedUser, kickedBy, kickedFrom) => {
                    this.updateHeader(enums.GROUP_MEMBER_KICKED, kickedFrom, kickedUser);
                }),
                onGroupMemberBanned: (/**
                 * @param {?} message
                 * @param {?} bannedUser
                 * @param {?} bannedBy
                 * @param {?} bannedFrom
                 * @return {?}
                 */
                (message, bannedUser, bannedBy, bannedFrom) => {
                    this.updateHeader(enums.GROUP_MEMBER_BANNED, bannedFrom, bannedUser);
                }),
                onMemberAddedToGroup: (/**
                 * @param {?} message
                 * @param {?} userAdded
                 * @param {?} userAddedBy
                 * @param {?} userAddedIn
                 * @return {?}
                 */
                (message, userAdded, userAddedBy, userAddedIn) => {
                    this.updateHeader(enums.GROUP_MEMBER_ADDED, userAddedIn);
                }),
                onGroupMemberLeft: (/**
                 * @param {?} message
                 * @param {?} leavingUser
                 * @param {?} group
                 * @return {?}
                 */
                (message, leavingUser, group) => {
                    this.updateHeader(enums.GROUP_MEMBER_LEFT, group, leavingUser);
                }),
                onGroupMemberJoined: (/**
                 * @param {?} message
                 * @param {?} joinedUser
                 * @param {?} joinedGroup
                 * @return {?}
                 */
                (message, joinedUser, joinedGroup) => {
                    this.updateHeader(enums.GROUP_MEMBER_JOINED, joinedGroup);
                }),
            }));
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Removes all listeners
     * @return {?}
     */
    removeListeners() {
        try {
            CometChat.removeUserListener(this.userListenerId);
            CometChat.removeMessageListener(this.msgListenerId);
            CometChat.removeGroupListener(this.groupListenerId);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * If user blocked then doesnot display audio and video call else displays
     * @return {?}
     */
    checkBlocked() {
        try {
            if (this.item.blockedByMe === true) {
                this.checkNotBlocked = false;
            }
            else {
                this.checkNotBlocked = true;
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Updates header such as typing indicator, count of group members, user status
     * @param {?=} key
     * @param {?=} item
     * @param {?=} groupUser
     * @return {?}
     */
    updateHeader(key = null, item = null, groupUser = null) {
        try {
            switch (key) {
                case enums.USER_ONLINE:
                case enums.USER_OFFLINE: {
                    if (this.type === CometChat.RECEIVER_TYPE.USER &&
                        this.item.uid === item.uid) {
                        this.item = Object.assign({}, item);
                    }
                    break;
                }
                case enums.GROUP_MEMBER_KICKED:
                case enums.GROUP_MEMBER_BANNED:
                case enums.GROUP_MEMBER_LEFT:
                    if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                        this.item.guid === item.guid &&
                        this.loggedInUser.uid !== groupUser.uid) {
                        /** @type {?} */
                        let membersCount = parseInt(item.membersCount);
                        this.item.membersCount = membersCount;
                        this.setGroupMemeberCountStatus(membersCount);
                    }
                    break;
                case enums.GROUP_MEMBER_JOINED:
                    if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                        this.item.guid === item.guid) {
                        /** @type {?} */
                        let membersCount = parseInt(item.membersCount);
                        this.item.membersCount = membersCount;
                        this.setGroupMemeberCountStatus(membersCount);
                    }
                    break;
                case enums.GROUP_MEMBER_ADDED:
                    if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                        this.item.guid === item.guid) {
                        /** @type {?} */
                        let membersCount = parseInt(item.membersCount);
                        this.item.membersCount = membersCount;
                        this.setGroupMemeberCountStatus(membersCount);
                    }
                    break;
                case enums.TYPING_STARTED: {
                    if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                        this.type === item.receiverType &&
                        this.item.guid === item.receiverId) {
                        this.status = item.sender.name + COMETCHAT_CONSTANTS.IS_TYPING;
                        this.actionGenerated.emit({
                            type: enums.SHOW_REACTION,
                            payLoad: item,
                        });
                    }
                    else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                        this.type === item.receiverType &&
                        this.item.uid === item.sender.uid) {
                        this.isTyping = true;
                        this.status = COMETCHAT_CONSTANTS.TYPING;
                        this.actionGenerated.emit({
                            type: enums.SHOW_REACTION,
                            payLoad: item,
                        });
                    }
                    break;
                }
                case enums.TYPING_ENDED: {
                    if (this.type === CometChat.RECEIVER_TYPE.GROUP &&
                        this.type === item.receiverType &&
                        this.item.guid === item.receiverId) {
                        this.setGroupMemeberCountStatus(this.item.membersCount);
                        // this.setStatusForGroup();
                        this.actionGenerated.emit({
                            type: enums.STOP_REACTION,
                            payLoad: item,
                        });
                    }
                    else if (this.type === CometChat.RECEIVER_TYPE.USER &&
                        this.type === item.receiverType &&
                        this.item.uid === item.sender.uid) {
                        if (this.item.status === CometChat.USER_STATUS.ONLINE) {
                            this.status = null;
                            this.isTyping = false;
                        }
                        else {
                            this.getLastActiveDate(item.lastActiveAt);
                        }
                        this.actionGenerated.emit({
                            type: enums.STOP_REACTION,
                            payLoad: item,
                        });
                    }
                    break;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Sets status of the group according to its member count
     * @param {?} membersCount
     * @return {?}
     */
    setGroupMemeberCountStatus(membersCount) {
        try {
            if (membersCount > 1) {
                this.status = membersCount + " members";
            }
            else {
                this.status = membersCount + " member";
            }
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get Last Active Date
     * @param {?} date
     * @return {?}
     */
    getLastActiveDate(date) {
        try {
            /** @type {?} */
            let lastActiveDate = COMETCHAT_CONSTANTS.LAST_ACTIVE_AT;
            if (date === undefined) {
                lastActiveDate = CometChat.USER_STATUS.OFFLINE;
                return lastActiveDate;
            }
            date = date * 1000;
            lastActiveDate =
                lastActiveDate + this.datepipe.transform(date, "dd MMMM yyyy, h:mm a");
            return lastActiveDate;
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Emits an action to indicate the parent component to open the user ( you are chatting with ) Detail component
     * @return {?}
     */
    openUserDetail() {
        try {
            this.actionGenerated.emit({ type: enums.VIEW_DETAIL, payLoad: null });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Starts audio call
     * @return {?}
     */
    audioCall() {
        try {
            this.actionGenerated.emit({ type: enums.AUDIO_CALL });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Starts video call
     * @return {?}
     */
    videoCall() {
        try {
            this.actionGenerated.emit({ type: enums.VIDEO_CALL });
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Closes Chat Window
     * @return {?}
     */
    closeChatWindow() {
        try {
            this.actionGenerated.emit({ type: enums.MENU_CLICKED });
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatMessageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-message-header",
                template: "<div class=\"chatHeaderStyle\">\n  <div class=\"chatDetailStyle\">\n    <!-- SideBar menu icon when screen size goes to mobile -->\n    <div class=\"chatSideBarBtnStyle\" (click)=\"closeChatWindow()\"></div>\n    <div class=\"chatThumbnailStyle\">\n      <!-- Pass The emitted User to The AVATAR below -->\n      <cometchat-avatar\n        [item]=\"item\"\n        [userStatus]=\"item?.status\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"chatUserStyle\">\n      <!-- Add Tool Tip functions here -->\n      <h6 class=\"chatNameStyle\">{{ item.name }}</h6>\n      <div class=\"chatStatusStyle typing\" *ngIf=\"isTyping\">{{ status }}</div>\n      <!-- Add Mouse Event to status -->\n      <div *ngIf=\"item.status === ONLINE && !isTyping\">\n        <span class=\"chatStatusStyle\">{{ item.status }}</span>\n      </div>\n\n      <div *ngIf=\"item.status === OFFLINE\">\n        <span class=\"chatStatusStyle lastActive\">{{\n          getLastActiveDate(item.lastActiveAt)\n        }}</span>\n      </div>\n\n      <div *ngIf=\"type === GROUP && !isTyping\">\n        <span class=\"chatStatusStyle groupMemberCountStatusStyle\">{{\n          status\n        }}</span>\n      </div>\n    </div>\n  </div>\n  <div class=\"chatOptionWrapStyle\">\n    <!-- add action generated to call -->\n    <div\n      class=\"chatOptionStyle callOption\"\n      *ngIf=\"checkNotBlocked\"\n      (click)=\"audioCall()\"\n    ></div>\n    <div\n      class=\"chatOptionStyle videoCallOption\"\n      *ngIf=\"checkNotBlocked\"\n      (click)=\"videoCall()\"\n    ></div>\n    <div class=\"chatOptionStyle detailsOption\" (click)=\"openUserDetail()\"></div>\n  </div>\n</div>\n",
                styles: [".chatHeaderStyle{padding:12px 16px;width:100%;background-color:#fff;z-index:1;border-bottom:1px solid #eaeaea;display:flex;flex-direction:row;justify-content:space-between}.chatDetailStyle{display:flex;flex-direction:row;align-items:center;width:calc(100% - 100px)}.chatThumbnailStyle{display:inline-block;width:36px;height:36px;flex-shrink:0}.chatUserStyle{width:calc(100% - 50px);padding:0 14px;flex-grow:1;display:flex;flex-direction:column}.chatNameStyle{margin:0;font-size:15px;font-weight:600;width:100%;overflow:hidden;text-overflow:ellipsis}.chatStatusStyle{color:#39f;text-transform:capitalize;font-size:13px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lastActive{color:rgba(20,20,20,.6);white-space:normal;line-height:0}.groupMemberCountStatusStyle{color:rgba(20,20,20,.6)}.typing{color:rgba(20,20,20,.6);text-transform:none;font-style:italic}.chatOptionWrapStyle{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;width:118px}.chatOptionStyle{display:inline-block;width:20px;height:20px;margin:0 10px;cursor:pointer}.callOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACtklEQVQ4EZ1UUUiTURQ+5/9xVCYaRCsUAumtQkhXFEUzyYg0emn1MIqls3qISisIkZmURDSKiqhpSEEvEzKoqJDKepnTFVH2ElEiWT6Ek5IsbTt9R/uH0VZbBy733HO/7zvn3Hv/nwlWfFmy2CCfxMnLRINk0o5INffpXqZmbA2KSUw3IFbPTC+EKF9i9MDRJvMzFVO88S5Ke0moAqINkRpeb5tBy+Db4uPU+l+CIG9GZc8rvdSsAqGdPIgEB+BucgTEm6moIUJLINDVyBy3yE9381X4d9C+3xmU2VY8ndkAKBfE4SRgP5LljI7QhiR7KUMG2n2PtgunI8qvSTbiPowYRF9P3/uXb6C6x3gqGxtFtNpJGx6j8xBai7EH7b+04unMWmE7iPbbreROEJjs8D9i6FlmZEbEy52osA8Xc2JlUGYqGwlOI9E8jJMZqQE81SbTEYgUjI9QnQqgzUc4ioOI1Za0iD6htA3FTRk+vyAqqjRMWtdTxSGNQuy4fkFwDyGJfwpJtPyKFMVjtMicRZ1hN3+24jonBJ1tkjc6Qc9QVXaWjVZ0e7hfAcUBacZxHEUyvag6MKpAugDfxPZXg+lwbw1fVKxaQlAXmjn2A7eOp4Tsq6zsEN0H4BlAPkHIDtZDnFUTjqUWa/3S7nIW7er18NBvgpOiLbImHqf7AL/BugKtDmgcR1KKSSv8YMuj/SEXj2nc0SJu4M/BnWCTyv4QVBDIq0G8hc3vJtOWsJe7NZ7KgF8A/BMW+pJUUIkALcXUgXby0daxHBud7fLwt1SiJQEJY29hSkElQjQXgpcguB3LAcOg+p5qus6MWn6Z/k/fRsmHZQOqbPqroEWCcDn8UxhFIAwJ0z0k6sftz0WsFAkXQ6wD621pCVrCjlYpw9/cBbITIgWIRzFeYdwsnEOBdhfHfgIOSveEJ4dt6QAAAABJRU5ErkJggg==) center center/19px no-repeat}.videoCallOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAB1aeb6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAHV+TnAAACiElEQVRIDb1Wz0tUURT+zhud0fwFI5UbMYrJNokxMwaF1EJauIt+EARG1Ogf0CowJypa9QfUm1lNYWS6DoKiooJSyyGiRemiFkWYo4bWhPNO3518MJjDjOnrwuXcd+495/vOPffe8wRsh1Ja8+0H+iHoFmCnKqqMvtxGmyXaTnH9C9r2j/fJx3Js5eCQ1n7P4BUXh9in6SitwEw5xu4aEdRAsZt2zSSxYAF7R3vlrTvvSlWViI0mkvtsdBK+odcozxH0TrAaZ+73yIK7eC3y2JD6pmYxQBID9PVkrE8OFNpHkrpHcxikbhd7kgRiErY1bRR1ldj66LTMFhqsdWwii9p4xx0IbWnGpnvdkjU+Omw9nFPcIim/ChwS1MZqNFoctHJ+cr3ABkREiIsJdmvmC3YYXdTW8zlghMNFpqeLeMMcBzI51DE9CFAxT7lRbS7vKIf6iK0pR3GV328q/YjyHDwmAXL50yrcwUbLJQe36XMbwUaCVTi12lnyDJynvoXbGn8Zw+XldPwVn9l2TxoP11lu86ViwAbUM3B6fl0qKu/ASyF7GTkflHApfO8iF9iRhMbNw1OMhHfgik/q4GI0gbumcK1GwDNwXwVOEHCQVe4IK+azfUltWUnAgGd5J+tXTqzju8HY8nGZY/E4Sd8X2NuyDkY7EtpJMj7Xt8WEvOfzup3VLW/kTvyLXM5vO22dYBMmjY/xXrlCIsf56tc6Dh6SyFF+/3R+Yd7icXjANQEqrhfLjXFSqpmSyooWZ2VpZUBP3Ypm7MZiMuyz0Mm5DwzUz57iriyaet5ANmkqTE6mSWKCW5MpBVY4T5uyfyb238Tm5z3y1djnr4EhQAe8FuiiDFH+l9+o3xTf5Es4uYHyAAAAAElFTkSuQmCC) center center/24px no-repeat;padding:0 0 0 24px;margin-left:0}.detailsOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGqADAAQAAAABAAAAFAAAAADz+QhrAAAB5klEQVRIDbVVTSiEURQ99/OFYuEnikZKslPKpCyUhUQsUCw1JWNpZ2M7e3Z+pihZsbKQha0VpvyUWMhC2ClZyJh513nGxxgS5nl15913591z3vvuffdK94qW3D4gpsAQgBDFo+Q/BEmCnBNsZi8qcWld1FkoJmm8gmBbgMefsvBwRfSN0Gefvokcv0pV9NBWSun3RTFEh5uGctSvj0g6Z/O3y85lLbtPIqKCjURUYrmbWxe0mbYjEQz63BTiiVZ/S5ILatcdS1qVTKMmZXhP4DQxIcf8YtdchDyahFf88ef6iiCwPaQQJ8kh10eUAWu3oaB4bgJvETl4YD+jkcB7163t7Y9gQz4zT37Cz9TE2ajBWTaWU6L9CZkiuJVPwylR26IOGkU7A6OeYH53XC4CRqdEacUYgftszhnBAfU3IqfJEJz+q9npjUgwZysEi4BKAXayCZ0S8YFuEtzKp+GUKBzXGAxGWW0MYzLMYroXMDqNEd9OC/OgjslQT7LGgMTOTomI9xSAe4r7QLezb3OeL7ko25iHHvELUZ1KwuxG5dzi8IYW2/jULrnoGl7TgnwrOJPhjqBWXsZLm1DUsk1s/VvjY4GtIFsvJdP4KosxzVZOO1u5MmP+EDf6hOkbztzj9fdjK998BobvpZEpTxuHAAAAAElFTkSuQmCC) center center/22px no-repeat;padding:0 30px 0 0;margin-left:-5px}.chatSideBarBtnStyle{cursor:pointer;display:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAW0lEQVRIS2NkoDFgpLH5DKMWEAxh+gbR0qVL/xN0EhEKoqOj4Q5H8QHNLSDCcSQroW8ckOw8IjTQNw5GIxlblNA3FdE8DmhuARHJmmQl9I0Dkp1HhIZRHxAMJAAC5RgZMxAd6wAAAABJRU5ErkJggg==) center center no-repeat;padding:20px;width:24px;height:24px;float:left}@media (min-width:320px) and (max-width:767px){.chatSideBarBtnStyle{display:block}.chatUserStyle{width:calc(100% - 80px)!important}}"]
            }] }
];
/** @nocollapse */
CometChatMessageHeaderComponent.ctorParameters = () => [
    { type: DatePipe }
];
CometChatMessageHeaderComponent.propDecorators = {
    item: [{ type: Input }],
    type: [{ type: Input }],
    actionGenerated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.item;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.type;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.actionGenerated;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.userListenerId;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.msgListenerId;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.groupListenerId;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.status;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.isTyping;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.loggedInUser;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.GROUP;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.USER;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.ONLINE;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.OFFLINE;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.checkNotBlocked;
    /** @type {?} */
    CometChatMessageHeaderComponent.prototype.datepipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL0NvbWV0Q2hhdC1tZXNzYWdlLWhlYWRlci9jb21ldGNoYXQtbWVzc2FnZS1oZWFkZXIvY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFlBQVksRUFDWixNQUFNLEdBSVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9sRCxNQUFNLE9BQU8sK0JBQStCOzs7O0lBcUIxQyxZQUFtQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbkI1QixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUVYLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsbUJBQWMsR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekQsa0JBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0Qsb0JBQWUsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxF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bUJBVWQsS0FBSzttQkFDTCxLQUFLOzhCQUVMLE1BQU07Ozs7SUFIUCwrQ0FBcUI7O0lBQ3JCLCtDQUFxQjs7SUFFckIsMERBQWtFOztJQUVsRSx5REFBeUQ7O0lBQ3pELHdEQUEyRDs7SUFDM0QsMERBQTJEOztJQUMzRCxpREFBb0I7O0lBQ3BCLG1EQUEwQjs7SUFDMUIsdURBQW9COztJQUNwQixnREFBOEM7O0lBQzlDLCtDQUE0Qzs7SUFDNUMsaURBQThDOztJQUM5QyxrREFBZ0Q7O0lBR2hELDBEQUFnQzs7SUFFcEIsbURBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC1wcm8vY2hhdFwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtbWVzc2FnZS1oZWFkZXIuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0TWVzc2FnZUhlYWRlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtID0gbnVsbDtcbiAgQElucHV0KCkgdHlwZSA9IG51bGw7XG5cbiAgQE91dHB1dCgpIGFjdGlvbkdlbmVyYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdXNlckxpc3RlbmVySWQgPSBlbnVtcy5IRUFEX1VTRVJfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIG1zZ0xpc3RlbmVySWQgPSBlbnVtcy5IRUFEX01FU1NBR0VfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGdyb3VwTGlzdGVuZXJJZCA9IGVudW1zLkhFQURfR1JPVVBfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHN0YXR1czogc3RyaW5nID0gXCJcIjtcbiAgaXNUeXBpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbG9nZ2VkSW5Vc2VyID0gbnVsbDtcbiAgR1JPVVA6IFN0cmluZyA9IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQO1xuICBVU0VSOiBTdHJpbmcgPSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSO1xuICBPTkxJTkU6IFN0cmluZyA9IENvbWV0Q2hhdC5VU0VSX1NUQVRVUy5PTkxJTkU7XG4gIE9GRkxJTkU6IFN0cmluZyA9IENvbWV0Q2hhdC5VU0VSX1NUQVRVUy5PRkZMSU5FO1xuXG4gIC8vZGlzcGxheXMgYXVkaW8gYW5kIHZpZGVvIGNhbGwgb3B0aW9uc1xuICBjaGVja05vdEJsb2NrZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaGFuZ2VbZW51bXMuSVRFTV0pIHtcbiAgICAgICAgLy9DaGVjayBpZiB1c2VyIGlzIGJsb2NrZWQvdW5ibG9ja2VkXG4gICAgICAgIHRoaXMuY2hlY2tCbG9ja2VkKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHBlcnNvbiB5b3UgYXJlIGNoYXR0aW5nIHdpdGggY2hhbmdlc1xuICAgICAgICAvL1JlbW92aW5nIFVzZXIgUHJlc2VuY2UgLCB0eXBpbmcgYW5kIEdyb3VwIExpc3RlbmVyc1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVApIHtcbiAgICAgICAgICBsZXQgcHJldlByb3BzID0ge1xuICAgICAgICAgICAgaXRlbTpcbiAgICAgICAgICAgICAgY2hhbmdlW2VudW1zLklURU1dLnByZXZpb3VzVmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgICAgID8geyBndWlkOiBcIlwiIH1cbiAgICAgICAgICAgICAgICA6IGNoYW5nZVtlbnVtcy5JVEVNXS5wcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbGV0IHByb3BzID0geyBpdGVtOiBjaGFuZ2VbZW51bXMuSVRFTV0uY3VycmVudFZhbHVlIH07XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmV2UHJvcHMuaXRlbS5ndWlkID09PSBwcm9wcy5pdGVtLmd1aWQgJiZcbiAgICAgICAgICAgIHByZXZQcm9wcy5pdGVtLm1lbWJlcnNDb3VudCAhPT0gcHJvcHMuaXRlbS5tZW1iZXJzQ291bnRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLkdST1VQX01FTUJFUl9BRERFRCwgcHJvcHMuaXRlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByZXZQcm9wcy5pdGVtLmd1aWQgIT09IHByb3BzLml0ZW0uZ3VpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRHcm91cE1lbWViZXJDb3VudFN0YXR1cyh0aGlzLml0ZW0ubWVtYmVyc0NvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0F0dGFjaGluZyBuZXcgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMudXNlckxpc3RlbmVySWQgPSBlbnVtcy5IRUFEX1VTRVJfICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMubXNnTGlzdGVuZXJJZCA9IGVudW1zLkhFQURfTUVTU0FHRV8gKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ncm91cExpc3RlbmVySWQgPSBlbnVtcy5IRUFEX0dST1VQXyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuXG4gICAgICB0aGlzLmdldExvZ2dlZEluVXNlckluZm8oKTtcblxuICAgICAgaWYgKHRoaXMudHlwZSA9PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCkge1xuICAgICAgICB0aGlzLnNldEdyb3VwTWVtZWJlckNvdW50U3RhdHVzKHRoaXMuaXRlbS5tZW1iZXJzQ291bnQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRyeSB7XG4gICAgICAvL1JlbW92aW5nIFVzZXIgUHJlc2VuY2UgLCB0eXBpbmcgYW5kIEdyb3VwIExpc3RlbmVyc1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBJbmZvcm1hdGlvbiBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgZ2V0TG9nZ2VkSW5Vc2VySW5mbygpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LmdldExvZ2dlZGluVXNlcigpXG4gICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyKFwiW0NvbWV0Q2hhdEdyb3VwTGlzdF0gZ2V0VXNlcnMgZ2V0TG9nZ2VkSW5Vc2VyIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGF0dGFjaGVzIExpc3RlbmVycyBmb3IgdXNlciBhY3Rpdml0eSAsIGdyb3VwIGFjdGl2aXRpZXMgYW5kIGNhbGxpbmdcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIENvbWV0Q2hhdC5hZGRVc2VyTGlzdGVuZXIoXG4gICAgICAgIHRoaXMudXNlckxpc3RlbmVySWQsXG4gICAgICAgIG5ldyBDb21ldENoYXQuVXNlckxpc3RlbmVyKHtcbiAgICAgICAgICBvblVzZXJPbmxpbmU6IChvbmxpbmVVc2VyKSA9PiB7XG4gICAgICAgICAgICAvKiB3aGVuIHNvbWV1c2VyL2ZyaWVuZCBjb21lcyBvbmxpbmUsIHVzZXIgd2lsbCBiZSByZWNlaXZlZCBoZXJlICovXG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLlVTRVJfT05MSU5FLCBvbmxpbmVVc2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVXNlck9mZmxpbmU6IChvZmZsaW5lVXNlcikgPT4ge1xuICAgICAgICAgICAgLyogd2hlbiBzb21ldXNlci9mcmllbmQgd2VudCBvZmZsaW5lLCB1c2VyIHdpbGwgYmUgcmVjZWl2ZWQgaGVyZSAqL1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5VU0VSX09GRkxJTkUsIG9mZmxpbmVVc2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgQ29tZXRDaGF0LmFkZE1lc3NhZ2VMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5tc2dMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lk1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICAgICAgb25UeXBpbmdTdGFydGVkOiAodHlwaW5nSW5kaWNhdG9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5UWVBJTkdfU1RBUlRFRCwgdHlwaW5nSW5kaWNhdG9yKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVHlwaW5nRW5kZWQ6ICh0eXBpbmdJbmRpY2F0b3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKGVudW1zLlRZUElOR19FTkRFRCwgdHlwaW5nSW5kaWNhdG9yKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgQ29tZXRDaGF0LmFkZEdyb3VwTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcklkLFxuICAgICAgICBuZXcgQ29tZXRDaGF0Lkdyb3VwTGlzdGVuZXIoe1xuICAgICAgICAgIG9uR3JvdXBNZW1iZXJLaWNrZWQ6IChtZXNzYWdlLCBraWNrZWRVc2VyLCBraWNrZWRCeSwga2lja2VkRnJvbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoXG4gICAgICAgICAgICAgIGVudW1zLkdST1VQX01FTUJFUl9LSUNLRUQsXG4gICAgICAgICAgICAgIGtpY2tlZEZyb20sXG4gICAgICAgICAgICAgIGtpY2tlZFVzZXJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkdyb3VwTWVtYmVyQmFubmVkOiAobWVzc2FnZSwgYmFubmVkVXNlciwgYmFubmVkQnksIGJhbm5lZEZyb20pID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKFxuICAgICAgICAgICAgICBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVELFxuICAgICAgICAgICAgICBiYW5uZWRGcm9tLFxuICAgICAgICAgICAgICBiYW5uZWRVc2VyXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25NZW1iZXJBZGRlZFRvR3JvdXA6IChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyQWRkZWQsXG4gICAgICAgICAgICB1c2VyQWRkZWRCeSxcbiAgICAgICAgICAgIHVzZXJBZGRlZEluXG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5HUk9VUF9NRU1CRVJfQURERUQsIHVzZXJBZGRlZEluKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJMZWZ0OiAobWVzc2FnZSwgbGVhdmluZ1VzZXIsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcihlbnVtcy5HUk9VUF9NRU1CRVJfTEVGVCwgZ3JvdXAsIGxlYXZpbmdVc2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uR3JvdXBNZW1iZXJKb2luZWQ6IChtZXNzYWdlLCBqb2luZWRVc2VyLCBqb2luZWRHcm91cCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoZW51bXMuR1JPVVBfTUVNQkVSX0pPSU5FRCwgam9pbmVkR3JvdXApO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnNcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICB0cnkge1xuICAgICAgQ29tZXRDaGF0LnJlbW92ZVVzZXJMaXN0ZW5lcih0aGlzLnVzZXJMaXN0ZW5lcklkKTtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVNZXNzYWdlTGlzdGVuZXIodGhpcy5tc2dMaXN0ZW5lcklkKTtcbiAgICAgIENvbWV0Q2hhdC5yZW1vdmVHcm91cExpc3RlbmVyKHRoaXMuZ3JvdXBMaXN0ZW5lcklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdXNlciBibG9ja2VkIHRoZW4gZG9lc25vdCBkaXNwbGF5IGF1ZGlvIGFuZCB2aWRlbyBjYWxsIGVsc2UgZGlzcGxheXNcbiAgICovXG4gIGNoZWNrQmxvY2tlZCgpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaXRlbS5ibG9ja2VkQnlNZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNoZWNrTm90QmxvY2tlZCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja05vdEJsb2NrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGhlYWRlciBzdWNoIGFzIHR5cGluZyBpbmRpY2F0b3IsIGNvdW50IG9mIGdyb3VwIG1lbWJlcnMsIHVzZXIgc3RhdHVzXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgdXBkYXRlSGVhZGVyKGtleSA9IG51bGwsIGl0ZW0gPSBudWxsLCBncm91cFVzZXIgPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9PTkxJTkU6XG4gICAgICAgIGNhc2UgZW51bXMuVVNFUl9PRkZMSU5FOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5VU0VSICYmXG4gICAgICAgICAgICB0aGlzLml0ZW0udWlkID09PSBpdGVtLnVpZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5pdGVtID0geyAuLi5pdGVtIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgZW51bXMuR1JPVVBfTUVNQkVSX0tJQ0tFRDpcbiAgICAgICAgY2FzZSBlbnVtcy5HUk9VUF9NRU1CRVJfQkFOTkVEOlxuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9MRUZUOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLmd1aWQgJiZcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyLnVpZCAhPT0gZ3JvdXBVc2VyLnVpZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGl0ZW0ubWVtYmVyc0NvdW50KTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5tZW1iZXJzQ291bnQgPSBtZW1iZXJzQ291bnQ7XG4gICAgICAgICAgICB0aGlzLnNldEdyb3VwTWVtZWJlckNvdW50U3RhdHVzKG1lbWJlcnNDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9KT0lORUQ6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy50eXBlID09PSBDb21ldENoYXQuUkVDRUlWRVJfVFlQRS5HUk9VUCAmJlxuICAgICAgICAgICAgdGhpcy5pdGVtLmd1aWQgPT09IGl0ZW0uZ3VpZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IG1lbWJlcnNDb3VudCA9IHBhcnNlSW50KGl0ZW0ubWVtYmVyc0NvdW50KTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5tZW1iZXJzQ291bnQgPSBtZW1iZXJzQ291bnQ7XG4gICAgICAgICAgICB0aGlzLnNldEdyb3VwTWVtZWJlckNvdW50U3RhdHVzKG1lbWJlcnNDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGVudW1zLkdST1VQX01FTUJFUl9BRERFRDpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCA9PT0gaXRlbS5ndWlkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyc0NvdW50ID0gcGFyc2VJbnQoaXRlbS5tZW1iZXJzQ291bnQpO1xuICAgICAgICAgICAgdGhpcy5pdGVtLm1lbWJlcnNDb3VudCA9IG1lbWJlcnNDb3VudDtcbiAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBNZW1lYmVyQ291bnRTdGF0dXMobWVtYmVyc0NvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZW51bXMuVFlQSU5HX1NUQVJURUQ6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnR5cGUgPT09IENvbWV0Q2hhdC5SRUNFSVZFUl9UWVBFLkdST1VQICYmXG4gICAgICAgICAgICB0aGlzLnR5cGUgPT09IGl0ZW0ucmVjZWl2ZXJUeXBlICYmXG4gICAgICAgICAgICB0aGlzLml0ZW0uZ3VpZCA9PT0gaXRlbS5yZWNlaXZlcklkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGl0ZW0uc2VuZGVyLm5hbWUgKyBDT01FVENIQVRfQ09OU1RBTlRTLklTX1RZUElORztcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5TSE9XX1JFQUNUSU9OLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgICAgdGhpcy50eXBlID09PSBpdGVtLnJlY2VpdmVyVHlwZSAmJlxuICAgICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gaXRlbS5zZW5kZXIudWlkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5UWVBJTkc7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgICAgICAgICAgdHlwZTogZW51bXMuU0hPV19SRUFDVElPTixcbiAgICAgICAgICAgICAgcGF5TG9hZDogaXRlbSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGVudW1zLlRZUElOR19FTkRFRDoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuR1JPVVAgJiZcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gaXRlbS5yZWNlaXZlclR5cGUgJiZcbiAgICAgICAgICAgIHRoaXMuaXRlbS5ndWlkID09PSBpdGVtLnJlY2VpdmVySWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBNZW1lYmVyQ291bnRTdGF0dXModGhpcy5pdGVtLm1lbWJlcnNDb3VudCk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdHVzRm9yR3JvdXAoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uR2VuZXJhdGVkLmVtaXQoe1xuICAgICAgICAgICAgICB0eXBlOiBlbnVtcy5TVE9QX1JFQUNUSU9OLFxuICAgICAgICAgICAgICBwYXlMb2FkOiBpdGVtLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gQ29tZXRDaGF0LlJFQ0VJVkVSX1RZUEUuVVNFUiAmJlxuICAgICAgICAgICAgdGhpcy50eXBlID09PSBpdGVtLnJlY2VpdmVyVHlwZSAmJlxuICAgICAgICAgICAgdGhpcy5pdGVtLnVpZCA9PT0gaXRlbS5zZW5kZXIudWlkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtLnN0YXR1cyA9PT0gQ29tZXRDaGF0LlVTRVJfU1RBVFVTLk9OTElORSkge1xuICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0TGFzdEFjdGl2ZURhdGUoaXRlbS5sYXN0QWN0aXZlQXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgIHR5cGU6IGVudW1zLlNUT1BfUkVBQ1RJT04sXG4gICAgICAgICAgICAgIHBheUxvYWQ6IGl0ZW0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBzdGF0dXMgb2YgdGhlIGdyb3VwIGFjY29yZGluZyB0byBpdHMgbWVtYmVyIGNvdW50XG4gICAqIEBwYXJhbSBudW1iZXIgbWVtYmVyc0NvdW50XG4gICAqL1xuICBzZXRHcm91cE1lbWViZXJDb3VudFN0YXR1cyhtZW1iZXJzQ291bnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKG1lbWJlcnNDb3VudCA+IDEpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBtZW1iZXJzQ291bnQgKyBcIiBtZW1iZXJzXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG1lbWJlcnNDb3VudCArIFwiIG1lbWJlclwiO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTGFzdCBBY3RpdmUgRGF0ZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGdldExhc3RBY3RpdmVEYXRlKGRhdGUpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxhc3RBY3RpdmVEYXRlID0gQ09NRVRDSEFUX0NPTlNUQU5UUy5MQVNUX0FDVElWRV9BVDtcblxuICAgICAgaWYgKGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYXN0QWN0aXZlRGF0ZSA9IENvbWV0Q2hhdC5VU0VSX1NUQVRVUy5PRkZMSU5FO1xuICAgICAgICByZXR1cm4gbGFzdEFjdGl2ZURhdGU7XG4gICAgICB9XG4gICAgICBkYXRlID0gZGF0ZSAqIDEwMDA7XG4gICAgICBsYXN0QWN0aXZlRGF0ZSA9XG4gICAgICAgIGxhc3RBY3RpdmVEYXRlICsgdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oZGF0ZSwgXCJkZCBNTU1NIHl5eXksIGg6bW0gYVwiKTtcblxuICAgICAgcmV0dXJuIGxhc3RBY3RpdmVEYXRlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBhY3Rpb24gdG8gaW5kaWNhdGUgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gb3BlbiB0aGUgdXNlciAoIHlvdSBhcmUgY2hhdHRpbmcgd2l0aCApIERldGFpbCBjb21wb25lbnRcbiAgICogQHBhcmFtXG4gICAqL1xuICBvcGVuVXNlckRldGFpbCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLlZJRVdfREVUQUlMLCBwYXlMb2FkOiBudWxsIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYXVkaW8gY2FsbFxuICAgKi9cbiAgYXVkaW9DYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuQVVESU9fQ0FMTCB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHZpZGVvIGNhbGxcbiAgICovXG4gIHZpZGVvQ2FsbCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdCh7IHR5cGU6IGVudW1zLlZJREVPX0NBTEwgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBDaGF0IFdpbmRvd1xuICAgKi9cbiAgY2xvc2VDaGF0V2luZG93KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHsgdHlwZTogZW51bXMuTUVOVV9DTElDS0VEIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19