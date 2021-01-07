/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-read-reciept/cometchat-read-reciept/cometchat-read-reciept.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
export class CometchatReadRecieptComponent {
    constructor() {
        this.MessageDetails = null;
        this.displayReadReciept = true;
        this.msgSent = false;
        this.msgRead = false;
        this.msgDeliv = false;
        this.tickStatus = "read";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getTick();
    }
    /**
     * Get  Time for message sending
     * @return {?}
     */
    getTime() {
        /** @type {?} */
        let msgSentAt = this.MessageDetails.sentAt;
        msgSentAt = msgSentAt * 1000;
        return msgSentAt;
    }
    /**
     * Get Read/Deliv/Sent Status
     * @return {?}
     */
    getTick() {
        /** @type {?} */
        let sentAt = this.MessageDetails.sentAt;
        /** @type {?} */
        let readAt = this.MessageDetails.readAt;
        /** @type {?} */
        let delivAt = this.MessageDetails.deliveredAt;
        if (sentAt && !readAt && !delivAt) {
            this.tickStatus = "sent";
        }
        if (sentAt && !readAt && delivAt) {
            this.tickStatus = "deliv";
        }
    }
}
CometchatReadRecieptComponent.decorators = [
    { type: Component, args: [{
                selector: "cometchat-read-reciept",
                template: "<div [ngSwitch]=\"tickStatus\">\n  <div\n    *ngSwitchCase=\"'sent'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick sent\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"'deliv'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick deliv\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"'read'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick read\">&nbsp;</span>\n  </div>\n</div>\n",
                styles: [".recieptContainer{width:68px}.recieptContainerSecondaryStyle{width:50px}.msgTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.msgTimestampSecondaryStyle{color:rgba(20,20,20,.6)}.tick{width:22%;padding-bottom:0;margin-left:3px;vertical-align:bottom;display:inline-block}.tick.sent{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAARdJREFUOBFjYEAGIiIiUQg+kBeB4EFZYmJiVnDB////M8I5WBmSkpImIAkmmCxQy0MYmwFogxGcQxYDaEIaTCPcKSA3/vv3T56JiYn11atXi2AKBopGdiQLuiNERUU9WVlZD8HEwSElLi4eBZTgcXBwYAGGmOyzZ89uwBTAvQk19p+AgMDiO3fu/IQpQKGBptigCNCFw0ysLSAPfvv2zZ+bm1vo69evj2H64OkFJoCNVlFR4bty5UoCUI6Xj4/vLDY1YDEFBQUOkE3ICiQkJBRAIQhMLAHY0jE8mEGagPFh8ffvXz0g8xMjI+MWFhYWjd+/fxsB2ddev359BNlgGBvFAJgg0DZrYNLUBvHZ2NgOIUcsTM3goQFXzEj1uzh+EwAAAABJRU5ErkJggg==) 15px center}.tick.deliv{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWNJREFUOBFjYEAGEhISosh8BgaQCCNMSFJS0gTGZhARETECYbgAMgOuRUxMzAokwQhUGgGkmYD435s3b1aABBn+///PCMJgDskE0Mg0kCYYDTYGZOG/f//kmZiYWIFGr2NkZAx69erVIpJNp5IGmONgNIpfRUVFPVlZWe//+fNHnoWF5eGzZ89uMImLi0cBJXgcHBxYgD6Qtba2vg3yEUgS5CiwCVDj/gkICCz++PFjND8//9I7d+78RHE10BQbkACMRpGkKYeZkOkgz3379s2fm5tb6OvXr4/R+SjBhG6YiooK34cPH8KAcfyLj49vJVCeHRgIocC4/g3iwwNCQUGBA2QysgHAFK0ACj1gQgkApT0pKSk5ZD5MLdgFwLiw+Pv3rx5Q8BPQ9C3ASNL4/fu3EZB97fXr10eAIWsINMQUxodpBtEoXgDaZg2MRG2QBBsb2yFQZAINdwEargTjg+QGFwAAd+eJSUtUxzMAAAAASUVORK5CYII=) 15px center}.tick.read{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWdJREFUOBHNUrtKA1EQPXeNRUDxgVqLQj7AjWjAwh8QKyvbuIIgVhYWNhYWdhFBkugPpLOwt7CwSEQLrTQI1roB44Os7nhm4YZdCyWg4MDsmTOzM3dm7gXiMlUWN84B9RjrcouyBQOJOMmmqg0mMJ5S0IjhrzfELmpQWzYZdUJEjGpEOv6wZNSKxagMScEYzDHU63RjIgxwzvOGO67+Swm2OYupeN1sSY650DzxSFFjxi3JXcpgxunDQ8tHc2wA6bqPV06h24NT88zoe4h7Bv10D4bqDTwqajAh2aLsqcNiIvin5McbzVUkHTRwwms642BrX/m3BbjLcbZ/RX3i4JnWC/pDwTWLNZWfLhrf0flyBzKoldW2ki3LPG19jBdVDyNvz5j+CFFn8qVyTdZ/ow64uR2+sXXy25SDWa7do62Pfp9tr0yWZIMnb1tObEtiBN7wLk9Y1ahxkK8umUOOUSFdsLyd+W+MTyDvnh60pF/jAAAAAElFTkSuQmCC) 15px center}"]
            }] }
];
/** @nocollapse */
CometchatReadRecieptComponent.ctorParameters = () => [];
CometchatReadRecieptComponent.propDecorators = {
    MessageDetails: [{ type: Input }],
    displayReadReciept: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.displayReadReciept;
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.msgSent;
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.msgRead;
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.msgDeliv;
    /** @type {?} */
    CometchatReadRecieptComponent.prototype.tickStatus;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtcmVhZC1yZWNpZXB0L2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQvY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQU96RCxNQUFNLE9BQU8sNkJBQTZCO0lBT3hDO1FBTlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFDYixDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFJRCxPQUFPOztZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07UUFDMUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFN0IsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFJRCxPQUFPOztZQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07O1lBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07O1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVc7UUFDN0MsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDMUI7UUFDRCxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHU2Q0FBc0Q7O2FBRXZEOzs7Ozs2QkFFRSxLQUFLO2lDQUNMLEtBQUs7Ozs7SUFETix1REFBK0I7O0lBQy9CLDJEQUFtQzs7SUFDbkMsZ0RBQXlCOztJQUN6QixnREFBeUI7O0lBQ3pCLGlEQUEwQjs7SUFDMUIsbURBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbWV0Y2hhdC1yZWFkLXJlY2llcHRcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9jb21ldGNoYXQtcmVhZC1yZWNpZXB0LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVhZC1yZWNpZXB0LmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbWV0Y2hhdFJlYWRSZWNpZXB0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgTWVzc2FnZURldGFpbHMgPSBudWxsO1xuICBASW5wdXQoKSBkaXNwbGF5UmVhZFJlY2llcHQgPSB0cnVlO1xuICBtc2dTZW50OiBib29sZWFuID0gZmFsc2U7XG4gIG1zZ1JlYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbXNnRGVsaXY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGlja1N0YXR1czogc3RyaW5nID0gXCJyZWFkXCI7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFRpY2soKTtcbiAgfVxuICAvKipcbiAgICogR2V0ICBUaW1lIGZvciBtZXNzYWdlIHNlbmRpbmdcbiAgICovXG4gIGdldFRpbWUoKSB7XG4gICAgbGV0IG1zZ1NlbnRBdCA9IHRoaXMuTWVzc2FnZURldGFpbHMuc2VudEF0O1xuICAgIG1zZ1NlbnRBdCA9IG1zZ1NlbnRBdCAqIDEwMDA7XG5cbiAgICByZXR1cm4gbXNnU2VudEF0O1xuICB9XG4gIC8qKlxuICAgKiBHZXQgUmVhZC9EZWxpdi9TZW50IFN0YXR1c1xuICAgKi9cbiAgZ2V0VGljaygpIHtcbiAgICBsZXQgc2VudEF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW50QXQ7XG4gICAgbGV0IHJlYWRBdCA9IHRoaXMuTWVzc2FnZURldGFpbHMucmVhZEF0O1xuICAgIGxldCBkZWxpdkF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5kZWxpdmVyZWRBdDtcbiAgICBpZiAoc2VudEF0ICYmICFyZWFkQXQgJiYgIWRlbGl2QXQpIHtcbiAgICAgIHRoaXMudGlja1N0YXR1cyA9IFwic2VudFwiO1xuICAgIH1cbiAgICBpZiAoc2VudEF0ICYmICFyZWFkQXQgJiYgZGVsaXZBdCkge1xuICAgICAgdGhpcy50aWNrU3RhdHVzID0gXCJkZWxpdlwiO1xuICAgIH1cbiAgfVxufVxuIl19