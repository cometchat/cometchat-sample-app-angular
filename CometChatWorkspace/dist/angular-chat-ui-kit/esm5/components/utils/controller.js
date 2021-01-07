/**
 * @fileoverview added by tsickle
 * Generated from: components/utils/controller.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CometChat } from "@cometchat-pro/chat";
var CometChatManager = /** @class */ (function () {
    function CometChatManager() {
    }
    /**
     * Gets LoggedIn Information of User
     */
    /**
     * Gets LoggedIn Information of User
     * @return {?}
     */
    CometChatManager.prototype.getLoggedInUser = /**
     * Gets LoggedIn Information of User
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var timerCounter = 10000;
        /** @type {?} */
        var timer = 0;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (timerCounter === timer)
                reject("timer reached " + timerCounter);
            if (_this.loggedInUser)
                resolve(_this.loggedInUser);
            if (!CometChat.isInitialized())
                reject("CometChat not initialized");
            _this.isUserLoggedIn = setInterval((/**
             * @return {?}
             */
            function () {
                CometChat.getLoggedinUser().then((/**
                 * @param {?} user
                 * @return {?}
                 */
                function (user) {
                    _this.loggedInUser = user;
                    clearInterval(_this.isUserLoggedIn);
                    resolve(user);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    console.log(error);
                    reject(error);
                }));
                timer += 100;
            }), 100);
        }));
    };
    /**
     * Blocks the User
     * @param
     */
    /**
     * Blocks the User
     * @param {?} userList
     * @return {?}
     */
    CometChatManager.blockUsers = /**
     * Blocks the User
     * @param {?} userList
     * @return {?}
     */
    function (userList) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            CometChat.blockUsers(userList).then((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return resolve(list); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Unblocks the User
     * @param
     */
    /**
     * Unblocks the User
     * @param {?} userList
     * @return {?}
     */
    CometChatManager.unblockUsers = /**
     * Unblocks the User
     * @param {?} userList
     * @return {?}
     */
    function (userList) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            CometChat.unblockUsers(userList).then((/**
             * @param {?} list
             * @return {?}
             */
            function (list) { return resolve(list); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Starts audio call
     * @param
     */
    /**
     * Starts audio call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    CometChatManager.audioCall = /**
     * Starts audio call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    function (receiverID, receiverType, callType) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) { return resolve(call); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Rejectes the call
     * @param
     */
    /**
     * Rejectes the call
     * @param {?} sessionId
     * @param {?} rejectStatus
     * @return {?}
     */
    CometChatManager.rejectCall = /**
     * Rejectes the call
     * @param {?} sessionId
     * @param {?} rejectStatus
     * @return {?}
     */
    function (sessionId, rejectStatus) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            CometChat.rejectCall(sessionId, rejectStatus).then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) { return resolve(call); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    CometChatManager.call = /**
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    function (receiverID, receiverType, callType) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) { return resolve(call); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Accepts a call
     * @param
     */
    /**
     * Accepts a call
     * @param {?} sessionId
     * @return {?}
     */
    CometChatManager.acceptCall = /**
     * Accepts a call
     * @param {?} sessionId
     * @return {?}
     */
    function (sessionId) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            CometChat.acceptCall(sessionId).then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) { return resolve(call); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    /**
     * Starts a video call
     * @param
     */
    /**
     * Starts a video call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    CometChatManager.videoCall = /**
     * Starts a video call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    function (receiverID, receiverType, callType) {
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            function (call) { return resolve(call); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
        return promise;
    };
    return CometChatManager;
}());
export { CometChatManager };
if (false) {
    /** @type {?} */
    CometChatManager.prototype.loggedInUser;
    /** @type {?} */
    CometChatManager.prototype.isUserLoggedIn;
}
export default CometChatManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3V0aWxzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQ7SUFBQTtJQTJJQSxDQUFDO0lBdklDOztPQUVHOzs7OztJQUNILDBDQUFlOzs7O0lBQWY7UUFBQSxpQkEyQkM7O1lBMUJLLFlBQVksR0FBRyxLQUFLOztZQUNwQixLQUFLLEdBQUcsQ0FBQztRQUViLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxZQUFZLEtBQUssS0FBSztnQkFBRSxNQUFNLENBQUMsbUJBQWlCLFlBQWMsQ0FBQyxDQUFDO1lBRXBFLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQUUsT0FBTyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTtnQkFBRSxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUVwRSxLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVc7OztZQUFDO2dCQUNoQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSTs7OztnQkFDOUIsVUFBQyxJQUFJO29CQUNILEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixhQUFhLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Ozs7Z0JBQ0QsVUFBQyxLQUFLO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxFQUNGLENBQUM7Z0JBRUYsS0FBSyxJQUFJ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QUNiLDBDQUFlOztBQTJJakIsZUFBZSxnQkFBZ0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbWV0Q2hhdCB9IGZyb20gXCJAY29tZXRjaGF0LXByby9jaGF0XCI7XG5cbmV4cG9ydCBjbGFzcyBDb21ldENoYXRNYW5hZ2VyIHtcbiAgbG9nZ2VkSW5Vc2VyO1xuICBpc1VzZXJMb2dnZWRJbjtcblxuICAvKipcbiAgICogR2V0cyBMb2dnZWRJbiBJbmZvcm1hdGlvbiBvZiBVc2VyXG4gICAqL1xuICBnZXRMb2dnZWRJblVzZXIoKSB7XG4gICAgbGV0IHRpbWVyQ291bnRlciA9IDEwMDAwO1xuICAgIGxldCB0aW1lciA9IDA7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRpbWVyQ291bnRlciA9PT0gdGltZXIpIHJlamVjdChgdGltZXIgcmVhY2hlZCAke3RpbWVyQ291bnRlcn1gKTtcblxuICAgICAgaWYgKHRoaXMubG9nZ2VkSW5Vc2VyKSByZXNvbHZlKHRoaXMubG9nZ2VkSW5Vc2VyKTtcblxuICAgICAgaWYgKCFDb21ldENoYXQuaXNJbml0aWFsaXplZCgpKSByZWplY3QoXCJDb21ldENoYXQgbm90IGluaXRpYWxpemVkXCIpO1xuXG4gICAgICB0aGlzLmlzVXNlckxvZ2dlZEluID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBDb21ldENoYXQuZ2V0TG9nZ2VkaW5Vc2VyKCkudGhlbihcbiAgICAgICAgICAodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmlzVXNlckxvZ2dlZEluKTtcbiAgICAgICAgICAgIHJlc29sdmUodXNlcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRpbWVyICs9IDEwMDtcbiAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQmxvY2tzIHRoZSBVc2VyXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc3RhdGljIGJsb2NrVXNlcnModXNlckxpc3QpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENvbWV0Q2hhdC5ibG9ja1VzZXJzKHVzZXJMaXN0KS50aGVuKFxuICAgICAgICAobGlzdCkgPT4gcmVzb2x2ZShsaXN0KSxcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVW5ibG9ja3MgdGhlIFVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGF0aWMgdW5ibG9ja1VzZXJzKHVzZXJMaXN0KSB7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDb21ldENoYXQudW5ibG9ja1VzZXJzKHVzZXJMaXN0KS50aGVuKFxuICAgICAgICAobGlzdCkgPT4gcmVzb2x2ZShsaXN0KSxcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGF1ZGlvIGNhbGxcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGF0aWMgYXVkaW9DYWxsKHJlY2VpdmVySUQsIHJlY2VpdmVyVHlwZSwgY2FsbFR5cGUpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNhbGwgPSBuZXcgQ29tZXRDaGF0LkNhbGwocmVjZWl2ZXJJRCwgY2FsbFR5cGUsIHJlY2VpdmVyVHlwZSk7XG4gICAgICBDb21ldENoYXQuaW5pdGlhdGVDYWxsKGNhbGwpLnRoZW4oXG4gICAgICAgIChjYWxsKSA9PiByZXNvbHZlKGNhbGwpLFxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWplY3RlcyB0aGUgY2FsbFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHN0YXRpYyByZWplY3RDYWxsKHNlc3Npb25JZCwgcmVqZWN0U3RhdHVzKSB7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDb21ldENoYXQucmVqZWN0Q2FsbChzZXNzaW9uSWQsIHJlamVjdFN0YXR1cykudGhlbihcbiAgICAgICAgKGNhbGwpID0+IHJlc29sdmUoY2FsbCksXG4gICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgc3RhdGljIGNhbGwocmVjZWl2ZXJJRCwgcmVjZWl2ZXJUeXBlLCBjYWxsVHlwZSkge1xuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FsbCA9IG5ldyBDb21ldENoYXQuQ2FsbChyZWNlaXZlcklELCBjYWxsVHlwZSwgcmVjZWl2ZXJUeXBlKTtcbiAgICAgIENvbWV0Q2hhdC5pbml0aWF0ZUNhbGwoY2FsbCkudGhlbihcbiAgICAgICAgKGNhbGwpID0+IHJlc29sdmUoY2FsbCksXG4gICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYSBjYWxsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc3RhdGljIGFjY2VwdENhbGwoc2Vzc2lvbklkKSB7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDb21ldENoYXQuYWNjZXB0Q2FsbChzZXNzaW9uSWQpLnRoZW4oXG4gICAgICAgIChjYWxsKSA9PiByZXNvbHZlKGNhbGwpLFxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSB2aWRlbyBjYWxsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc3RhdGljIHZpZGVvQ2FsbChyZWNlaXZlcklELCByZWNlaXZlclR5cGUsIGNhbGxUeXBlKSB7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjYWxsID0gbmV3IENvbWV0Q2hhdC5DYWxsKHJlY2VpdmVySUQsIGNhbGxUeXBlLCByZWNlaXZlclR5cGUpO1xuICAgICAgQ29tZXRDaGF0LmluaXRpYXRlQ2FsbChjYWxsKS50aGVuKFxuICAgICAgICAoY2FsbCkgPT4gcmVzb2x2ZShjYWxsKSxcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tZXRDaGF0TWFuYWdlcjtcbiJdfQ==