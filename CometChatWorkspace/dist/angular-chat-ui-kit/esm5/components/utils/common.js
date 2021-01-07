/**
 * @fileoverview added by tsickle
 * Generated from: components/utils/common.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var checkMessageForExtensionsData = (/**
 * @param {?} message
 * @param {?} extensionKey
 * @return {?}
 */
function (message, extensionKey) {
    /** @type {?} */
    var output = null;
    if (message.hasOwnProperty("metadata")) {
        /** @type {?} */
        var metadata = message.metadata;
        /** @type {?} */
        var injectedObject = metadata["@injected"];
        if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
            /** @type {?} */
            var extensionsObject = injectedObject["extensions"];
            if (extensionsObject && extensionsObject.hasOwnProperty(extensionKey)) {
                output = extensionsObject[extensionKey];
            }
        }
    }
    return output;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdXRpbHMvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sS0FBTyw2QkFBNkI7Ozs7O0FBQUcsVUFBQyxPQUFPLEVBQUUsWUFBWTs7UUFDN0QsTUFBTSxHQUFHLElBQUk7SUFFakIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztZQUNoQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVE7O1lBQzNCLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQzVDLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7O2dCQUMzRCxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1lBQ3JELElBQUksZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNyRSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekM7U0FDRjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhID0gKG1lc3NhZ2UsIGV4dGVuc2lvbktleSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gbnVsbDtcblxuICBpZiAobWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBtZXNzYWdlLm1ldGFkYXRhO1xuICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgaWYgKGluamVjdGVkT2JqZWN0ICYmIGluamVjdGVkT2JqZWN0Lmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uc1wiKSkge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uc09iamVjdCA9IGluamVjdGVkT2JqZWN0W1wiZXh0ZW5zaW9uc1wiXTtcbiAgICAgIGlmIChleHRlbnNpb25zT2JqZWN0ICYmIGV4dGVuc2lvbnNPYmplY3QuaGFzT3duUHJvcGVydHkoZXh0ZW5zaW9uS2V5KSkge1xuICAgICAgICBvdXRwdXQgPSBleHRlbnNpb25zT2JqZWN0W2V4dGVuc2lvbktleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG4iXX0=