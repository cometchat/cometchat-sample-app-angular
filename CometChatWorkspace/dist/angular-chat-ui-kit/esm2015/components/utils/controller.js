/**
 * @fileoverview added by tsickle
 * Generated from: components/utils/controller.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CometChat } from "@cometchat-pro/chat";
export class CometChatManager {
    /**
     * Gets LoggedIn Information of User
     * @return {?}
     */
    getLoggedInUser() {
        /** @type {?} */
        let timerCounter = 10000;
        /** @type {?} */
        let timer = 0;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (timerCounter === timer)
                reject(`timer reached ${timerCounter}`);
            if (this.loggedInUser)
                resolve(this.loggedInUser);
            if (!CometChat.isInitialized())
                reject("CometChat not initialized");
            this.isUserLoggedIn = setInterval((/**
             * @return {?}
             */
            () => {
                CometChat.getLoggedinUser().then((/**
                 * @param {?} user
                 * @return {?}
                 */
                (user) => {
                    this.loggedInUser = user;
                    clearInterval(this.isUserLoggedIn);
                    resolve(user);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    console.log(error);
                    reject(error);
                }));
                timer += 100;
            }), 100);
        }));
    }
    /**
     * Blocks the User
     * @param {?} userList
     * @return {?}
     */
    static blockUsers(userList) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            CometChat.blockUsers(userList).then((/**
             * @param {?} list
             * @return {?}
             */
            (list) => resolve(list)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Unblocks the User
     * @param {?} userList
     * @return {?}
     */
    static unblockUsers(userList) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            CometChat.unblockUsers(userList).then((/**
             * @param {?} list
             * @return {?}
             */
            (list) => resolve(list)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Starts audio call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    static audioCall(receiverID, receiverType, callType) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => resolve(call)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Rejectes the call
     * @param {?} sessionId
     * @param {?} rejectStatus
     * @return {?}
     */
    static rejectCall(sessionId, rejectStatus) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            CometChat.rejectCall(sessionId, rejectStatus).then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => resolve(call)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    static call(receiverID, receiverType, callType) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => resolve(call)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Accepts a call
     * @param {?} sessionId
     * @return {?}
     */
    static acceptCall(sessionId) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            CometChat.acceptCall(sessionId).then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => resolve(call)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
    /**
     * Starts a video call
     * @param {?} receiverID
     * @param {?} receiverType
     * @param {?} callType
     * @return {?}
     */
    static videoCall(receiverID, receiverType, callType) {
        /** @type {?} */
        let promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const call = new CometChat.Call(receiverID, callType, receiverType);
            CometChat.initiateCall(call).then((/**
             * @param {?} call
             * @return {?}
             */
            (call) => resolve(call)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
        return promise;
    }
}
if (false) {
    /** @type {?} */
    CometChatManager.prototype.loggedInUser;
    /** @type {?} */
    CometChatManager.prototype.isUserLoggedIn;
}
export default CometChatManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3V0aWxzL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFPM0IsZUFBZTs7WUFDVCxZQUFZLEdBQUcsS0FBSzs7WUFDcEIsS0FBSyxHQUFHLENBQUM7UUFFYixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLFlBQVksS0FBSyxLQUFLO2dCQUFFLE1BQU0sQ0FBQyxpQkFBaUIsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUVwRSxJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7Z0JBQUUsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFcEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJOzs7O2dCQUM5QixDQUFDLElBQUksRUFBRSxFQUFFO29CQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Ozs7Z0JBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsRUFDRixDQUFDO2dCQUVGLEtBQUssSUFBSSxHQUFHLENBQUM7WUFDZixDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUTs7WUFDcEIsT0FBTyxHQUFHLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7Ozs7WUFDakMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Ozs7WUFDdkIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDekIsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUTs7WUFDdEIsT0FBTyxHQUFHLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7Ozs7WUFDbkMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Ozs7WUFDdkIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDekIsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBTUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVE7O1lBQzdDLE9BQU8sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2tCQUN0QyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO1lBQ25FLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTs7OztZQUMvQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7OztZQUN2QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUN6QixDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBRUYsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFlBQVk7O1lBQ25DLE9BQU8sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSTs7OztZQUNoRCxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7OztZQUN2QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUN6QixDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBRUYsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFROztZQUN4QyxPQUFPLEdBQUcsSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztrQkFDdEMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztZQUNuRSxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7Ozs7WUFDL0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Ozs7WUFDdkIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDekIsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUzs7WUFDckIsT0FBTyxHQUFHLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7Ozs7WUFDbEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Ozs7WUFDdkIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDekIsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBTUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVE7O1lBQzdDLE9BQU8sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2tCQUN0QyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO1lBQ25FLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTs7OztZQUMvQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7OztZQUN2QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUN6QixDQUFDO1FBQ0osQ0FBQyxFQUFDO1FBRUYsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGOzs7SUExSUMsd0NBQWE7O0lBQ2IsMENBQWU7O0FBMklqQixlQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQtcHJvL2NoYXRcIjtcblxuZXhwb3J0IGNsYXNzIENvbWV0Q2hhdE1hbmFnZXIge1xuICBsb2dnZWRJblVzZXI7XG4gIGlzVXNlckxvZ2dlZEluO1xuXG4gIC8qKlxuICAgKiBHZXRzIExvZ2dlZEluIEluZm9ybWF0aW9uIG9mIFVzZXJcbiAgICovXG4gIGdldExvZ2dlZEluVXNlcigpIHtcbiAgICBsZXQgdGltZXJDb3VudGVyID0gMTAwMDA7XG4gICAgbGV0IHRpbWVyID0gMDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGltZXJDb3VudGVyID09PSB0aW1lcikgcmVqZWN0KGB0aW1lciByZWFjaGVkICR7dGltZXJDb3VudGVyfWApO1xuXG4gICAgICBpZiAodGhpcy5sb2dnZWRJblVzZXIpIHJlc29sdmUodGhpcy5sb2dnZWRJblVzZXIpO1xuXG4gICAgICBpZiAoIUNvbWV0Q2hhdC5pc0luaXRpYWxpemVkKCkpIHJlamVjdChcIkNvbWV0Q2hhdCBub3QgaW5pdGlhbGl6ZWRcIik7XG5cbiAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIENvbWV0Q2hhdC5nZXRMb2dnZWRpblVzZXIoKS50aGVuKFxuICAgICAgICAgICh1c2VyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlZEluVXNlciA9IHVzZXI7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaXNVc2VyTG9nZ2VkSW4pO1xuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGltZXIgKz0gMTAwO1xuICAgICAgfSwgMTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbG9ja3MgdGhlIFVzZXJcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGF0aWMgYmxvY2tVc2Vycyh1c2VyTGlzdCkge1xuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgQ29tZXRDaGF0LmJsb2NrVXNlcnModXNlckxpc3QpLnRoZW4oXG4gICAgICAgIChsaXN0KSA9PiByZXNvbHZlKGxpc3QpLFxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmJsb2NrcyB0aGUgVXNlclxuICAgKiBAcGFyYW1cbiAgICovXG4gIHN0YXRpYyB1bmJsb2NrVXNlcnModXNlckxpc3QpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENvbWV0Q2hhdC51bmJsb2NrVXNlcnModXNlckxpc3QpLnRoZW4oXG4gICAgICAgIChsaXN0KSA9PiByZXNvbHZlKGxpc3QpLFxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYXVkaW8gY2FsbFxuICAgKiBAcGFyYW1cbiAgICovXG4gIHN0YXRpYyBhdWRpb0NhbGwocmVjZWl2ZXJJRCwgcmVjZWl2ZXJUeXBlLCBjYWxsVHlwZSkge1xuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FsbCA9IG5ldyBDb21ldENoYXQuQ2FsbChyZWNlaXZlcklELCBjYWxsVHlwZSwgcmVjZWl2ZXJUeXBlKTtcbiAgICAgIENvbWV0Q2hhdC5pbml0aWF0ZUNhbGwoY2FsbCkudGhlbihcbiAgICAgICAgKGNhbGwpID0+IHJlc29sdmUoY2FsbCksXG4gICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlamVjdGVzIHRoZSBjYWxsXG4gICAqIEBwYXJhbVxuICAgKi9cbiAgc3RhdGljIHJlamVjdENhbGwoc2Vzc2lvbklkLCByZWplY3RTdGF0dXMpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENvbWV0Q2hhdC5yZWplY3RDYWxsKHNlc3Npb25JZCwgcmVqZWN0U3RhdHVzKS50aGVuKFxuICAgICAgICAoY2FsbCkgPT4gcmVzb2x2ZShjYWxsKSxcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBzdGF0aWMgY2FsbChyZWNlaXZlcklELCByZWNlaXZlclR5cGUsIGNhbGxUeXBlKSB7XG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjYWxsID0gbmV3IENvbWV0Q2hhdC5DYWxsKHJlY2VpdmVySUQsIGNhbGxUeXBlLCByZWNlaXZlclR5cGUpO1xuICAgICAgQ29tZXRDaGF0LmluaXRpYXRlQ2FsbChjYWxsKS50aGVuKFxuICAgICAgICAoY2FsbCkgPT4gcmVzb2x2ZShjYWxsKSxcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIGNhbGxcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGF0aWMgYWNjZXB0Q2FsbChzZXNzaW9uSWQpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENvbWV0Q2hhdC5hY2NlcHRDYWxsKHNlc3Npb25JZCkudGhlbihcbiAgICAgICAgKGNhbGwpID0+IHJlc29sdmUoY2FsbCksXG4gICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHZpZGVvIGNhbGxcbiAgICogQHBhcmFtXG4gICAqL1xuICBzdGF0aWMgdmlkZW9DYWxsKHJlY2VpdmVySUQsIHJlY2VpdmVyVHlwZSwgY2FsbFR5cGUpIHtcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNhbGwgPSBuZXcgQ29tZXRDaGF0LkNhbGwocmVjZWl2ZXJJRCwgY2FsbFR5cGUsIHJlY2VpdmVyVHlwZSk7XG4gICAgICBDb21ldENoYXQuaW5pdGlhdGVDYWxsKGNhbGwpLnRoZW4oXG4gICAgICAgIChjYWxsKSA9PiByZXNvbHZlKGNhbGwpLFxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21ldENoYXRNYW5hZ2VyO1xuIl19