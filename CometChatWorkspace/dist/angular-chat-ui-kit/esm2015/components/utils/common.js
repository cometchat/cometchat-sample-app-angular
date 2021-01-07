/**
 * @fileoverview added by tsickle
 * Generated from: components/utils/common.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const checkMessageForExtensionsData = (/**
 * @param {?} message
 * @param {?} extensionKey
 * @return {?}
 */
(message, extensionKey) => {
    /** @type {?} */
    let output = null;
    if (message.hasOwnProperty("metadata")) {
        /** @type {?} */
        const metadata = message.metadata;
        /** @type {?} */
        const injectedObject = metadata["@injected"];
        if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
            /** @type {?} */
            const extensionsObject = injectedObject["extensions"];
            if (extensionsObject && extensionsObject.hasOwnProperty(extensionKey)) {
                output = extensionsObject[extensionKey];
            }
        }
    }
    return output;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdXRpbHMvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sT0FBTyw2QkFBNkI7Ozs7O0FBQUcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUU7O1FBQ2pFLE1BQU0sR0FBRyxJQUFJO0lBRWpCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTs7Y0FDaEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFROztjQUMzQixjQUFjLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFOztrQkFDM0QsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztZQUNyRCxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDckUsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjaGVja01lc3NhZ2VGb3JFeHRlbnNpb25zRGF0YSA9IChtZXNzYWdlLCBleHRlbnNpb25LZXkpID0+IHtcbiAgbGV0IG91dHB1dCA9IG51bGw7XG5cbiAgaWYgKG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXRhZGF0YVwiKSkge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gbWVzc2FnZS5tZXRhZGF0YTtcbiAgICBjb25zdCBpbmplY3RlZE9iamVjdCA9IG1ldGFkYXRhW1wiQGluamVjdGVkXCJdO1xuICAgIGlmIChpbmplY3RlZE9iamVjdCAmJiBpbmplY3RlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcImV4dGVuc2lvbnNcIikpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtcImV4dGVuc2lvbnNcIl07XG4gICAgICBpZiAoZXh0ZW5zaW9uc09iamVjdCAmJiBleHRlbnNpb25zT2JqZWN0Lmhhc093blByb3BlcnR5KGV4dGVuc2lvbktleSkpIHtcbiAgICAgICAgb3V0cHV0ID0gZXh0ZW5zaW9uc09iamVjdFtleHRlbnNpb25LZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuIl19