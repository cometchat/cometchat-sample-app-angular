/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-read-reciept/cometchat-read-reciept/cometchat-read-reciept.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
var CometchatReadRecieptComponent = /** @class */ (function () {
    function CometchatReadRecieptComponent() {
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
    CometchatReadRecieptComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getTick();
    };
    /**
     * Get  Time for message sending
     */
    /**
     * Get  Time for message sending
     * @return {?}
     */
    CometchatReadRecieptComponent.prototype.getTime = /**
     * Get  Time for message sending
     * @return {?}
     */
    function () {
        /** @type {?} */
        var msgSentAt = this.MessageDetails.sentAt;
        msgSentAt = msgSentAt * 1000;
        return msgSentAt;
    };
    /**
     * Get Read/Deliv/Sent Status
     */
    /**
     * Get Read/Deliv/Sent Status
     * @return {?}
     */
    CometchatReadRecieptComponent.prototype.getTick = /**
     * Get Read/Deliv/Sent Status
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sentAt = this.MessageDetails.sentAt;
        /** @type {?} */
        var readAt = this.MessageDetails.readAt;
        /** @type {?} */
        var delivAt = this.MessageDetails.deliveredAt;
        if (sentAt && !readAt && !delivAt) {
            this.tickStatus = "sent";
        }
        if (sentAt && !readAt && delivAt) {
            this.tickStatus = "deliv";
        }
    };
    CometchatReadRecieptComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-read-reciept",
                    template: "<div [ngSwitch]=\"tickStatus\">\n  <div\n    *ngSwitchCase=\"'sent'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick sent\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"'deliv'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick deliv\">&nbsp;</span>\n  </div>\n  <div\n    *ngSwitchCase=\"'read'\"\n    class=\"recieptContainer\"\n    [ngClass]=\"{\n      recieptContainerSecondaryStyle: displayReadReciept === false\n    }\"\n  >\n    <span\n      class=\"msgTimestampStyle\"\n      [ngClass]=\"{\n        msgTimestampSecondaryStyle: displayReadReciept === false\n      }\"\n    >\n      {{ getTime() | date: \"shortTime\" }}\n    </span>\n    <span *ngIf=\"displayReadReciept\" class=\"tick read\">&nbsp;</span>\n  </div>\n</div>\n",
                    styles: [".recieptContainer{width:68px}.recieptContainerSecondaryStyle{width:50px}.msgTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase}.msgTimestampSecondaryStyle{color:rgba(20,20,20,.6)}.tick{width:22%;padding-bottom:0;margin-left:3px;vertical-align:bottom;display:inline-block}.tick.sent{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAARdJREFUOBFjYEAGIiIiUQg+kBeB4EFZYmJiVnDB////M8I5WBmSkpImIAkmmCxQy0MYmwFogxGcQxYDaEIaTCPcKSA3/vv3T56JiYn11atXi2AKBopGdiQLuiNERUU9WVlZD8HEwSElLi4eBZTgcXBwYAGGmOyzZ89uwBTAvQk19p+AgMDiO3fu/IQpQKGBptigCNCFw0ysLSAPfvv2zZ+bm1vo69evj2H64OkFJoCNVlFR4bty5UoCUI6Xj4/vLDY1YDEFBQUOkE3ICiQkJBRAIQhMLAHY0jE8mEGagPFh8ffvXz0g8xMjI+MWFhYWjd+/fxsB2ddev359BNlgGBvFAJgg0DZrYNLUBvHZ2NgOIUcsTM3goQFXzEj1uzh+EwAAAABJRU5ErkJggg==) 15px center}.tick.deliv{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWNJREFUOBFjYEAGEhISosh8BgaQCCNMSFJS0gTGZhARETECYbgAMgOuRUxMzAokwQhUGgGkmYD435s3b1aABBn+///PCMJgDskE0Mg0kCYYDTYGZOG/f//kmZiYWIFGr2NkZAx69erVIpJNp5IGmONgNIpfRUVFPVlZWe//+fNHnoWF5eGzZ89uMImLi0cBJXgcHBxYgD6Qtba2vg3yEUgS5CiwCVDj/gkICCz++PFjND8//9I7d+78RHE10BQbkACMRpGkKYeZkOkgz3379s2fm5tb6OvXr4/R+SjBhG6YiooK34cPH8KAcfyLj49vJVCeHRgIocC4/g3iwwNCQUGBA2QysgHAFK0ACj1gQgkApT0pKSk5ZD5MLdgFwLiw+Pv3rx5Q8BPQ9C3ASNL4/fu3EZB97fXr10eAIWsINMQUxodpBtEoXgDaZg2MRG2QBBsb2yFQZAINdwEargTjg+QGFwAAd+eJSUtUxzMAAAAASUVORK5CYII=) 15px center}.tick.read{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAWdJREFUOBHNUrtKA1EQPXeNRUDxgVqLQj7AjWjAwh8QKyvbuIIgVhYWNhYWdhFBkugPpLOwt7CwSEQLrTQI1roB44Os7nhm4YZdCyWg4MDsmTOzM3dm7gXiMlUWN84B9RjrcouyBQOJOMmmqg0mMJ5S0IjhrzfELmpQWzYZdUJEjGpEOv6wZNSKxagMScEYzDHU63RjIgxwzvOGO67+Swm2OYupeN1sSY650DzxSFFjxi3JXcpgxunDQ8tHc2wA6bqPV06h24NT88zoe4h7Bv10D4bqDTwqajAh2aLsqcNiIvin5McbzVUkHTRwwms642BrX/m3BbjLcbZ/RX3i4JnWC/pDwTWLNZWfLhrf0flyBzKoldW2ki3LPG19jBdVDyNvz5j+CFFn8qVyTdZ/ow64uR2+sXXy25SDWa7do62Pfp9tr0yWZIMnb1tObEtiBN7wLk9Y1ahxkK8umUOOUSFdsLyd+W+MTyDvnh60pF/jAAAAAElFTkSuQmCC) 15px center}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReadRecieptComponent.ctorParameters = function () { return []; };
    CometchatReadRecieptComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        displayReadReciept: [{ type: Input }]
    };
    return CometchatReadRecieptComponent;
}());
export { CometchatReadRecieptComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNoYXQtdWkta2l0LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9NZXNzYWdlcy9jb21ldGNoYXQtcmVhZC1yZWNpZXB0L2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQvY29tZXRjaGF0LXJlYWQtcmVjaWVwdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUV6RDtJQVlFO1FBTlMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFDYixDQUFDOzs7O0lBRWhCLGdEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0Q7O09BRUc7Ozs7O0lBQ0gsK0NBQU87Ozs7SUFBUDs7WUFDTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO1FBQzFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTdCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDRDs7T0FFRzs7Ozs7SUFDSCwrQ0FBTzs7OztJQUFQOztZQUNNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07O1lBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07O1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVc7UUFDN0MsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDMUI7UUFDRCxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7U0FDM0I7SUFDSCxDQUFDOztnQkF2Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLHU2Q0FBc0Q7O2lCQUV2RDs7Ozs7aUNBRUUsS0FBSztxQ0FDTCxLQUFLOztJQWlDUixvQ0FBQztDQUFBLEFBeENELElBd0NDO1NBbkNZLDZCQUE2Qjs7O0lBQ3hDLHVEQUErQjs7SUFDL0IsMkRBQW1DOztJQUNuQyxnREFBeUI7O0lBQ3pCLGdEQUF5Qjs7SUFDekIsaURBQTBCOztJQUMxQixtREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlYWQtcmVjaWVwdFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbWV0Y2hhdC1yZWFkLXJlY2llcHQuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVhZFJlY2llcHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc3BsYXlSZWFkUmVjaWVwdCA9IHRydWU7XG4gIG1zZ1NlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbXNnUmVhZDogYm9vbGVhbiA9IGZhbHNlO1xuICBtc2dEZWxpdjogYm9vbGVhbiA9IGZhbHNlO1xuICB0aWNrU3RhdHVzOiBzdHJpbmcgPSBcInJlYWRcIjtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0VGljaygpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgIFRpbWUgZm9yIG1lc3NhZ2Ugc2VuZGluZ1xuICAgKi9cbiAgZ2V0VGltZSgpIHtcbiAgICBsZXQgbXNnU2VudEF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5zZW50QXQ7XG4gICAgbXNnU2VudEF0ID0gbXNnU2VudEF0ICogMTAwMDtcblxuICAgIHJldHVybiBtc2dTZW50QXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBSZWFkL0RlbGl2L1NlbnQgU3RhdHVzXG4gICAqL1xuICBnZXRUaWNrKCkge1xuICAgIGxldCBzZW50QXQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbnRBdDtcbiAgICBsZXQgcmVhZEF0ID0gdGhpcy5NZXNzYWdlRGV0YWlscy5yZWFkQXQ7XG4gICAgbGV0IGRlbGl2QXQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLmRlbGl2ZXJlZEF0O1xuICAgIGlmIChzZW50QXQgJiYgIXJlYWRBdCAmJiAhZGVsaXZBdCkge1xuICAgICAgdGhpcy50aWNrU3RhdHVzID0gXCJzZW50XCI7XG4gICAgfVxuICAgIGlmIChzZW50QXQgJiYgIXJlYWRBdCAmJiBkZWxpdkF0KSB7XG4gICAgICB0aGlzLnRpY2tTdGF0dXMgPSBcImRlbGl2XCI7XG4gICAgfVxuICB9XG59XG4iXX0=