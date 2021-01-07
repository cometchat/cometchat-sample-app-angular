/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-message-composer/cometchat-message-composer.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageComposerComponent } from "./cometchat-message-composer/cometchat-message-composer.component";
import { CometchatSmartReplyPreviewModule } from "../Extensions/cometchat-smart-reply-preview/cometchat-smart-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { CometchatStickerKeyboardModule } from "../cometchat-sticker-keyboard/cometchat-sticker-keyboard.module";
import { CometchatCreatePollModule } from "../Extensions/cometchat-create-poll/cometchat-create-poll.module";
var CometchatMessageComposerModule = /** @class */ (function () {
    function CometchatMessageComposerModule() {
    }
    CometchatMessageComposerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CometchatMessageComposerComponent],
                    imports: [
                        CommonModule,
                        CometchatSmartReplyPreviewModule,
                        PickerModule,
                        CometchatStickerKeyboardModule,
                        CometchatCreatePollModule,
                    ],
                    exports: [CometchatMessageComposerComponent],
                },] }
    ];
    return CometchatMessageComposerModule;
}());
export { CometchatMessageComposerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jaGF0LXVpLWtpdC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWVzc2FnZXMvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFDdEgsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdHO0lBQUE7SUFXNkMsQ0FBQzs7Z0JBWDdDLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztvQkFDakQsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0NBQWdDO3dCQUNoQyxZQUFZO3dCQUNaLDhCQUE4Qjt3QkFDOUIseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDN0M7O0lBQzRDLHFDQUFDO0NBQUEsQUFYOUMsSUFXOEM7U0FBakMsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29tZXRjaGF0TWVzc2FnZUNvbXBvc2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIvY29tZXRjaGF0LW1lc3NhZ2UtY29tcG9zZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb21ldGNoYXRTbWFydFJlcGx5UHJldmlld01vZHVsZSB9IGZyb20gXCIuLi9FeHRlbnNpb25zL2NvbWV0Y2hhdC1zbWFydC1yZXBseS1wcmV2aWV3L2NvbWV0Y2hhdC1zbWFydC1yZXBseS1wcmV2aWV3Lm1vZHVsZVwiO1xuaW1wb3J0IHsgUGlja2VyTW9kdWxlIH0gZnJvbSBcIkBjdHJsL25neC1lbW9qaS1tYXJ0XCI7XG5pbXBvcnQgeyBDb21ldGNoYXRTdGlja2VyS2V5Ym9hcmRNb2R1bGUgfSBmcm9tIFwiLi4vY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQvY29tZXRjaGF0LXN0aWNrZXIta2V5Ym9hcmQubW9kdWxlXCI7XG5pbXBvcnQgeyBDb21ldGNoYXRDcmVhdGVQb2xsTW9kdWxlIH0gZnJvbSBcIi4uL0V4dGVuc2lvbnMvY29tZXRjaGF0LWNyZWF0ZS1wb2xsL2NvbWV0Y2hhdC1jcmVhdGUtcG9sbC5tb2R1bGVcIjtcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NvbWV0Y2hhdE1lc3NhZ2VDb21wb3NlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29tZXRjaGF0U21hcnRSZXBseVByZXZpZXdNb2R1bGUsXG4gICAgUGlja2VyTW9kdWxlLFxuICAgIENvbWV0Y2hhdFN0aWNrZXJLZXlib2FyZE1vZHVsZSxcbiAgICBDb21ldGNoYXRDcmVhdGVQb2xsTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tZXRjaGF0TWVzc2FnZUNvbXBvc2VyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0TWVzc2FnZUNvbXBvc2VyTW9kdWxlIHt9XG4iXX0=