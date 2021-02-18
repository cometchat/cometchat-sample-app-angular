/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/CometChat-read-receipt/cometchat-read-receipt/cometchat-read-receipt.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
import { getSentAtTime } from "../../../../utils/common";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
export class CometChatReadReceiptComponent {
    constructor() {
        this.messageDetails = null;
        this.displayReadReciept = true;
        this.SENT = COMETCHAT_CONSTANTS.SENT;
        this.DELIVERED = COMETCHAT_CONSTANTS.DELIVERED;
        this.READ = enums.READ;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        try {
            this.getDeliveryStatus();
            this.time = getSentAtTime(this.messageDetails);
        }
        catch (error) {
            logger(error);
        }
    }
    /**
     * Get Read/Deliv/Sent Status
     * @return {?}
     */
    getDeliveryStatus() {
        try {
            if (this.messageDetails.hasOwnProperty(enums.SENT_AT)) {
                this.tickStatus = this.SENT;
                if (this.messageDetails.hasOwnProperty(enums.DELIVERED_AT)) {
                    this.tickStatus = this.DELIVERED;
                }
                if (this.messageDetails.hasOwnProperty(enums.READ_AT)) {
                    this.tickStatus = this.READ;
                }
            }
        }
        catch (error) {
            logger(error);
        }
    }
}
CometChatReadReceiptComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-read-receipt",
                template: "<div [ngSwitch]=\"tickStatus\">\n  <div\n    *ngSwitchCase=\"SENT\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ time | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick sent\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"DELIVERED\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ time | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick deliv\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"READ\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ time | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick read\">&nbsp;</span>\n  </div>\n</div>\n",
                styles: [".recieptContainer{width:68px}.recieptContainerSecondaryStyle{width:50px}.msgTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.msgTimestampSecondaryStyle{color:rgba(20,20,20,.6)}.tick{width:22%;padding-bottom:0;margin-left:3px;vertical-align:bottom;display:inline-block}.tick.sent{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAARdJREFUOBFjYEAGIiIiUQg+kBeB4EFZYmJiVnDB////M8I5WBmSkpImIAkmmCxQy0MYmwFogxGcQxYDaEIaTCPcKSA3/vv3T56JiYn11atXi2AKBopGdiQLuiNERUU9WVlZD8HEwSElLi4eBZTgcXBwYAGGmOyzZ89uwBTAvQk19p+AgMDiO3fu/IQpQKGBptigCNCFw0ysLSAPfvv2zZ+bm1vo69evj2H64OkFJoCNVlFR4bty5UoCUI6Xj4/vLDY1YDEFBQUOkE3ICiQkJBRAIQhMLAHY0jE8mEGagPFh8ffvXz0g8xMjI+MWFhYWjd+/fxsB2ddev359BNlgGBvFAJgg0DZrYNLUBvHZ2NgOIUcsTM3goQFXzEj1uzh+EwAAAABJRU5ErkJggg==) 15px center}.tick.deliv{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWNJREFUOBFjYEAGEhISosh8BgaQCCNMSFJS0gTGZhARETECYbgAMgOuRUxMzAokwQhUGgGkmYD435s3b1aABBn+///PCMJgDskE0Mg0kCYYDTYGZOG/f//kmZiYWIFGr2NkZAx69erVIpJNp5IGmONgNIpfRUVFPVlZWe//+fNHnoWF5eGzZ89uMImLi0cBJXgcHBxYgD6Qtba2vg3yEUgS5CiwCVDj/gkICCz++PFjND8//9I7d+78RHE10BQbkACMRpGkKYeZkOkgz3379s2fm5tb6OvXr4/R+SjBhG6YiooK34cPH8KAcfyLj49vJVCeHRgIocC4/g3iwwNCQUGBA2QysgHAFK0ACj1gQgkApT0pKSk5ZD5MLdgFwLiw+Pv3rx5Q8BPQ9C3ASNL4/fu3EZB97fXr10eAIWsINMQUxodpBtEoXgDaZg2MRG2QBBsb2yFQZAINdwEargTjg+QGFwAAd+eJSUtUxzMAAAAASUVORK5CYII=) 15px center}.tick.read{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWdJREFUOBHNUrtKA1EQPXeNRUDxgVqLQj7AjWjAwh8QKyvbuIIgVhYWNhYWdhFBkugPpLOwt7CwSEQLrTQI1roB44Os7nhm4YZdCyWg4MDsmTOzM3dm7gXiMlUWN84B9RjrcouyBQOJOMmmqg0mMJ5S0IjhrzfELmpQWzYZdUJEjGpEOv6wZNSKxagMScEYzDHU63RjIgxwzvOGO67+Swm2OYupeN1sSY650DzxSFFjxi3JXcpgxunDQ8tHc2wA6bqPV06h24NT88zoe4h7Bv10D4bqDTwqajAh2aLsqcNiIvin5McbzVUkHTRwwms642BrX/m3BbjLcbZ/RX3i4JnWC/pDwTWLNZWfLhrf0flyBzKoldW2ki3LPG19jBdVDyNvz5j+CFFn8qVyTdZ/ow64uR2+sXXy25SDWa7do62Pfp9tr0yWZIMnb1tObEtiBN7wLk9Y1ahxkK8umUOOUSFdsLyd+W+MTyDvnh60pF/jAAAAAElFTkSuQmCC) 15px center}"]
            }] }
];
/** @nocollapse */
CometChatReadReceiptComponent.ctorParameters = () => [];
CometChatReadReceiptComponent.propDecorators = {
    messageDetails: [{ type: Input }],
    displayReadReciept: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.messageDetails;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.displayReadReciept;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.tickStatus;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.time;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.SENT;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.DELIVERED;
    /** @type {?} */
    CometChatReadReceiptComponent.prototype.READ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlYWQtcmVjZWlwdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9Db21ldENoYXQtcmVhZC1yZWNlaXB0L2NvbWV0Y2hhdC1yZWFkLXJlY2VpcHQvY29tZXRjaGF0LXJlYWQtcmVjZWlwdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFPakQsTUFBTSxPQUFPLDZCQUE2QjtJQVV4QztRQVRTLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUtuQyxTQUFJLEdBQVcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ3hDLGNBQVMsR0FBVyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7UUFDbEQsU0FBSSxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDWCxDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7Ozs7O0lBS0QsaUJBQWlCO1FBQ2YsSUFBSTtZQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ2xDO2dCQUNELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQzdCO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7WUE1Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHM1Q0FBc0Q7O2FBRXZEOzs7Ozs2QkFFRSxLQUFLO2lDQUNMLEtBQUs7Ozs7SUFETix1REFBK0I7O0lBQy9CLDJEQUFtQzs7SUFFbkMsbURBQW1COztJQUNuQiw2Q0FBSzs7SUFFTCw2Q0FBd0M7O0lBQ3hDLGtEQUFrRDs7SUFDbEQsNkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGdldFNlbnRBdFRpbWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvY29tbW9uXCI7XG5pbXBvcnQgeyBDT01FVENIQVRfQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL21lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9jb21tb25cIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9lbnVtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlYWQtcmVjZWlwdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWFkLXJlY2VpcHQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWFkLXJlY2VpcHQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRDaGF0UmVhZFJlY2VpcHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc3BsYXlSZWFkUmVjaWVwdCA9IHRydWU7XG5cbiAgdGlja1N0YXR1czogU3RyaW5nO1xuICB0aW1lO1xuXG4gIFNFTlQ6IFN0cmluZyA9IENPTUVUQ0hBVF9DT05TVEFOVFMuU0VOVDtcbiAgREVMSVZFUkVEOiBTdHJpbmcgPSBDT01FVENIQVRfQ09OU1RBTlRTLkRFTElWRVJFRDtcbiAgUkVBRDogU3RyaW5nID0gZW51bXMuUkVBRDtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmdldERlbGl2ZXJ5U3RhdHVzKCk7XG4gICAgICB0aGlzLnRpbWUgPSBnZXRTZW50QXRUaW1lKHRoaXMubWVzc2FnZURldGFpbHMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgUmVhZC9EZWxpdi9TZW50IFN0YXR1c1xuICAgKi9cbiAgZ2V0RGVsaXZlcnlTdGF0dXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VEZXRhaWxzLmhhc093blByb3BlcnR5KGVudW1zLlNFTlRfQVQpKSB7XG4gICAgICAgIHRoaXMudGlja1N0YXR1cyA9IHRoaXMuU0VOVDtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShlbnVtcy5ERUxJVkVSRURfQVQpKSB7XG4gICAgICAgICAgdGhpcy50aWNrU3RhdHVzID0gdGhpcy5ERUxJVkVSRUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZURldGFpbHMuaGFzT3duUHJvcGVydHkoZW51bXMuUkVBRF9BVCkpIHtcbiAgICAgICAgICB0aGlzLnRpY2tTdGF0dXMgPSB0aGlzLlJFQUQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==