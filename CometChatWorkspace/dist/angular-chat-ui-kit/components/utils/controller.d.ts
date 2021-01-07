export declare class CometChatManager {
    loggedInUser: any;
    isUserLoggedIn: any;
    /**
     * Gets LoggedIn Information of User
     */
    getLoggedInUser(): Promise<unknown>;
    /**
     * Blocks the User
     * @param
     */
    static blockUsers(userList: any): Promise<unknown>;
    /**
     * Unblocks the User
     * @param
     */
    static unblockUsers(userList: any): Promise<unknown>;
    /**
     * Starts audio call
     * @param
     */
    static audioCall(receiverID: any, receiverType: any, callType: any): Promise<unknown>;
    /**
     * Rejectes the call
     * @param
     */
    static rejectCall(sessionId: any, rejectStatus: any): Promise<unknown>;
    static call(receiverID: any, receiverType: any, callType: any): Promise<unknown>;
    /**
     * Accepts a call
     * @param
     */
    static acceptCall(sessionId: any): Promise<unknown>;
    /**
     * Starts a video call
     * @param
     */
    static videoCall(receiverID: any, receiverType: any, callType: any): Promise<unknown>;
}
export default CometChatManager;
