(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"], {
  /***/
  "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/@ctrl/ngx-emoji-mart/picker.css":
  /*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!/Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/postcss-loader/src??embedded!/Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@ctrl/ngx-emoji-mart/picker.css ***!
    \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesAngularDevkitBuildAngularSrcAngularCliFilesPluginsRawCssLoaderJsNode_modulesPostcssLoaderSrcIndexJsNode_modulesCtrlNgxEmojiMartPickerCss(module, exports) {
    module.exports = [[module.i, ".emoji-mart,\n.emoji-mart * {\n  box-sizing: border-box;\n  line-height: 1.15;\n}\n\n.emoji-mart {\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  display: inline-block;\n  color: #222427;\n  border: 1px solid #d9d9d9;\n  border-radius: 5px;\n  background: #fff;\n}\n\n.emoji-mart .emoji-mart-emoji {\n  padding: 6px;\n}\n\n.emoji-mart-bar {\n  border: 0 solid #d9d9d9;\n}\n\n.emoji-mart-bar:first-child {\n  border-bottom-width: 1px;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.emoji-mart-bar:last-child {\n  border-top-width: 1px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n}\n\n.emoji-mart-anchors {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 0 6px;\n  color: #858585;\n  line-height: 0;\n}\n\n.emoji-mart-anchor {\n  position: relative;\n  display: block;\n  flex: 1 1 auto;\n  text-align: center;\n  padding: 12px 4px;\n  overflow: hidden;\n  transition: color .1s ease-out;\n}\n\n.emoji-mart-anchor:hover,\n.emoji-mart-anchor-selected {\n  color: #464646;\n}\n\n.emoji-mart-anchor-selected .emoji-mart-anchor-bar {\n  bottom: 0;\n}\n\n.emoji-mart-anchor-bar {\n  position: absolute;\n  bottom: -3px; left: 0;\n  width: 100%; height: 3px;\n  background-color: #464646;\n}\n\n.emoji-mart-anchors i {\n  display: inline-block;\n  width: 100%;\n  max-width: 22px;\n}\n\n.emoji-mart-anchors svg {\n  fill: currentColor;\n  max-height: 18px;\n}\n\n.emoji-mart-scroll {\n  overflow-y: scroll;\n  height: 270px;\n  padding: 0 6px 6px 6px;\n  will-change: transform; /* avoids \"repaints on scroll\" in mobile Chrome */\n}\n\n.emoji-mart-search {\n  margin-top: 6px;\n  padding: 0 6px;\n  position: relative;\n}\n\n.emoji-mart-search input {\n  font-size: 16px;\n  display: block;\n  width: 100%;\n  padding: 5px 25px 6px 10px;\n  border-radius: 5px;\n  border: 1px solid #d9d9d9;\n  outline: 0;\n}\n\n.emoji-mart-search input::-webkit-search-decoration,\n.emoji-mart-search input::-webkit-search-cancel-button,\n.emoji-mart-search input::-webkit-search-results-button,\n.emoji-mart-search input::-webkit-search-results-decoration {\n  /* remove webkit/blink styles for <input type=\"search\">\n   * via https://stackoverflow.com/a/9422689 */\n  -webkit-appearance: none;\t  -webkit-appearance: none;\n}\n\n.emoji-mart-search-icon {\n  position: absolute;\n  top: 9px;\n  right: 16px;\n  z-index: 2;\n  padding: 0;\n  border: none;\n  background: none;\n  line-height: 0;\n}\n\n.emoji-mart-category .emoji-mart-emoji span {\n  z-index: 1;\n  position: relative;\n  text-align: center;\n  cursor: default;\n}\n\n.emoji-mart-category .emoji-mart-emoji:hover:before {\n  z-index: 0;\n  content: \"\";\n  position: absolute;\n  top: 0; left: 0;\n  width: 100%; height: 100%;\n  background-color: #f4f4f4;\n  border-radius: 100%;\n}\n\n.emoji-mart-category-label {\n  z-index: 2;\n  position: relative;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n\n.emoji-mart-category-label span {\n  display: block;\n  width: 100%;\n  font-weight: 500;\n  padding: 5px 6px;\n  background-color: #fff;\n  background-color: rgba(255, 255, 255, .95);\n}\n\n.emoji-mart-emoji {\n  position: relative;\n  display: inline-block;\n  font-size: 0;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n  box-shadow: none;\n}\n\n.emoji-mart-emoji-native {\n  font-family: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\";\n}\n\n.emoji-mart-no-results {\n  font-size: 14px;\n  text-align: center;\n  padding-top: 70px;\n  color: #858585;\n}\n\n.emoji-mart-no-results .emoji-mart-category-label {\n  display: none;\n}\n\n.emoji-mart-no-results .emoji-mart-no-results-label {\n  margin-top: .2em;\n}\n\n.emoji-mart-no-results .emoji-mart-emoji:hover:before {\n  content: none;\n}\n\n.emoji-mart-preview {\n  position: relative;\n  height: 70px;\n}\n\n.emoji-mart-preview-emoji,\n.emoji-mart-preview-data,\n.emoji-mart-preview-skins {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.emoji-mart-preview-emoji {\n  left: 12px;\n}\n\n.emoji-mart-preview-data {\n  left: 68px; right: 12px;\n  word-break: break-all;\n}\n\n.emoji-mart-preview-skins {\n  right: 30px;\n  text-align: right;\n}\n\n.emoji-mart-preview-name {\n  font-size: 14px;\n}\n\n.emoji-mart-preview-shortnames {\n  font-size: 12px;\n  color: #888;\n}\n\n.emoji-mart-preview-shortname + .emoji-mart-preview-shortname,\n.emoji-mart-preview-shortname + .emoji-mart-preview-emoticon,\n.emoji-mart-preview-emoticon + .emoji-mart-preview-emoticon {\n  margin-left: .5em;\n}\n\n.emoji-mart-preview-emoticons {\n  font-size: 11px;\n  color: #bbb;\n}\n\n.emoji-mart-title span {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.emoji-mart-title .emoji-mart-emoji {\n  padding: 0;\n}\n\n.emoji-mart-title-label {\n  color: #999A9C;\n  font-size: 26px;\n  font-weight: 300;\n}\n\n.emoji-mart-skin-swatches {\n  font-size: 0;\n  padding: 2px 0;\n  border: 1px solid #d9d9d9;\n  border-radius: 12px;\n  background-color: #fff;\n}\n\n.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch {\n  width: 16px;\n  padding: 0 2px;\n}\n\n.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch-selected:after {\n  opacity: .75;\n}\n\n.emoji-mart-skin-swatch {\n  display: inline-block;\n  width: 0;\n  vertical-align: middle;\n  transition-property: width, padding;\n  transition-duration: .125s;\n  transition-timing-function: ease-out;\n}\n\n.emoji-mart-skin-swatch:nth-child(1) { transition-delay: 0s }\n\n.emoji-mart-skin-swatch:nth-child(2) { transition-delay: .03s }\n\n.emoji-mart-skin-swatch:nth-child(3) { transition-delay: .06s }\n\n.emoji-mart-skin-swatch:nth-child(4) { transition-delay: .09s }\n\n.emoji-mart-skin-swatch:nth-child(5) { transition-delay: .12s }\n\n.emoji-mart-skin-swatch:nth-child(6) { transition-delay: .15s }\n\n.emoji-mart-skin-swatch-selected {\n  position: relative;\n  width: 16px;\n  padding: 0 2px;\n}\n\n.emoji-mart-skin-swatch-selected:after {\n  content: \"\";\n  position: absolute;\n  top: 50%; left: 50%;\n  width: 4px; height: 4px;\n  margin: -2px 0 0 -2px;\n  background-color: #fff;\n  border-radius: 100%;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity .2s ease-out;\n}\n\n.emoji-mart-skin {\n  display: inline-block;\n  width: 100%; padding-top: 100%;\n  max-width: 12px;\n  border-radius: 100%;\n}\n\n.emoji-mart-skin-tone-1 { background-color: #ffc93a }\n\n.emoji-mart-skin-tone-2 { background-color: #fadcbc }\n\n.emoji-mart-skin-tone-3 { background-color: #e0bb95 }\n\n.emoji-mart-skin-tone-4 { background-color: #bf8f68 }\n\n.emoji-mart-skin-tone-5 { background-color: #9b643d }\n\n.emoji-mart-skin-tone-6 { background-color: #594539 }\n\n/* For screenreaders only, via https://stackoverflow.com/a/19758620 */\n\n.emoji-mart-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3RybC9uZ3gtZW1vamktbWFydC9waWNrZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw0RUFBNEU7RUFDNUUsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBQ0E7RUFDRSx3QkFBd0I7RUFDeEIsMkJBQTJCO0VBQzNCLDRCQUE0QjtBQUM5Qjs7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQiw4QkFBOEI7RUFDOUIsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7RUFDOUIsY0FBYztFQUNkLGNBQWM7RUFDZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsOEJBQThCO0FBQ2hDOztBQUNBOztFQUVFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWSxFQUFFLE9BQU87RUFDckIsV0FBVyxFQUFFLFdBQVc7RUFDeEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHNCQUFzQixFQUFFLGlEQUFpRDtBQUMzRTs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxX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Q3BELDBCQUEwQiwwQkFBMEI7O0FBQ3BELDBCQUEwQiwwQkFBMEI7O0FBQ3BELDBCQUEwQiwwQkFBMEI7O0FBQ3BELDBCQUEwQiwwQkFBMEI7O0FBQ3BELDBCQUEwQiwwQkFBMEI7O0FBRXBELHFFQUFxRTs7QUFDckU7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFdBQVc7RUFDWCxVQUFVO0VBQ1YsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsU0FBUztBQUNYIiwiZmlsZSI6Im5vZGVfbW9kdWxlcy9AY3RybC9uZ3gtZW1vamktbWFydC9waWNrZXIuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVtb2ppLW1hcnQsXG4uZW1vamktbWFydCAqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XG59XG5cbi5lbW9qaS1tYXJ0IHtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY29sb3I6ICMyMjI0Mjc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkOWQ5ZDk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLmVtb2ppLW1hcnQgLmVtb2ppLW1hcnQtZW1vamkge1xuICBwYWRkaW5nOiA2cHg7XG59XG5cbi5lbW9qaS1tYXJ0LWJhciB7XG4gIGJvcmRlcjogMCBzb2xpZCAjZDlkOWQ5O1xufVxuLmVtb2ppLW1hcnQtYmFyOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XG59XG4uZW1vamktbWFydC1iYXI6bGFzdC1jaGlsZCB7XG4gIGJvcmRlci10b3Atd2lkdGg6IDFweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xufVxuXG4uZW1vamktbWFydC1hbmNob3JzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAwIDZweDtcbiAgY29sb3I6ICM4NTg1ODU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xufVxuXG4uZW1vamktbWFydC1hbmNob3Ige1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbGV4OiAxIDEgYXV0bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxMnB4IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbjogY29sb3IgLjFzIGVhc2Utb3V0O1xufVxuLmVtb2ppLW1hcnQtYW5jaG9yOmhvdmVyLFxuLmVtb2ppLW1hcnQtYW5jaG9yLXNlbGVjdGVkIHtcbiAgY29sb3I6ICM0NjQ2NDY7XG59XG5cbi5lbW9qaS1tYXJ0LWFuY2hvci1zZWxlY3RlZCAuZW1vamktbWFydC1hbmNob3ItYmFyIHtcbiAgYm90dG9tOiAwO1xufVxuXG4uZW1vamktbWFydC1hbmNob3ItYmFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0zcHg7IGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDNweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0Njtcbn1cblxuLmVtb2ppLW1hcnQtYW5jaG9ycyBpIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAyMnB4O1xufVxuXG4uZW1vamktbWFydC1hbmNob3JzIHN2ZyB7XG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcbiAgbWF4LWhlaWdodDogMThweDtcbn1cblxuLmVtb2ppLW1hcnQtc2Nyb2xsIHtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBoZWlnaHQ6IDI3MHB4O1xuICBwYWRkaW5nOiAwIDZweCA2cHggNnB4O1xuICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtOyAvKiBhdm9pZHMgXCJyZXBhaW50cyBvbiBzY3JvbGxcIiBpbiBtb2JpbGUgQ2hyb21lICovXG59XG5cbi5lbW9qaS1tYXJ0LXNlYXJjaCB7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5lbW9qaS1tYXJ0LXNlYXJjaCBpbnB1dCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA1cHggMjVweCA2cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOWQ5O1xuICBvdXRsaW5lOiAwO1xufVxuLmVtb2ppLW1hcnQtc2VhcmNoIGlucHV0Ojotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLFxuLmVtb2ppLW1hcnQtc2VhcmNoIGlucHV0Ojotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuLmVtb2ppLW1hcnQtc2VhcmNoIGlucHV0Ojotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWJ1dHRvbixcbi5lbW9qaS1tYXJ0LXNlYXJjaCBpbnB1dDo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9uIHtcbiAgLyogcmVtb3ZlIHdlYmtpdC9ibGluayBzdHlsZXMgZm9yIDxpbnB1dCB0eXBlPVwic2VhcmNoXCI+XG4gICAqIHZpYSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTQyMjY4OSAqL1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHQgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5lbW9qaS1tYXJ0LXNlYXJjaC1pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDlweDtcbiAgcmlnaHQ6IDE2cHg7XG4gIHotaW5kZXg6IDI7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IDA7XG59XG5cbi5lbW9qaS1tYXJ0LWNhdGVnb3J5IC5lbW9qaS1tYXJ0LWVtb2ppIHNwYW4ge1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLmVtb2ppLW1hcnQtY2F0ZWdvcnkgLmVtb2ppLW1hcnQtZW1vamk6aG92ZXI6YmVmb3JlIHtcbiAgei1pbmRleDogMDtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7IGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG59XG4uZW1vamktbWFydC1jYXRlZ29yeS1sYWJlbCB7XG4gIHotaW5kZXg6IDI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDA7XG59XG4uZW1vamktbWFydC1jYXRlZ29yeS1sYWJlbCBzcGFuIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXdlaWdodDogNTAwO1xuICBwYWRkaW5nOiA1cHggNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIC45NSk7XG59XG5cbi5lbW9qaS1tYXJ0LWVtb2ppIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5lbW9qaS1tYXJ0LWVtb2ppLW5hdGl2ZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCIsIFwiU2Vnb2UgVUlcIiwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLCBcIlR3ZW1vamkgTW96aWxsYVwiLCBcIk5vdG8gQ29sb3IgRW1vamlcIiwgXCJFbW9qaU9uZSBDb2xvclwiLCBcIkFuZHJvaWQgRW1vamlcIjtcbn1cbi5lbW9qaS1tYXJ0LW5vLXJlc3VsdHMge1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDcwcHg7XG4gIGNvbG9yOiAjODU4NTg1O1xufVxuLmVtb2ppLW1hcnQtbm8tcmVzdWx0cyAuZW1vamktbWFydC1jYXRlZ29yeS1sYWJlbCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uZW1vamktbWFydC1uby1yZXN1bHRzIC5lbW9qaS1tYXJ0LW5vLXJlc3VsdHMtbGFiZWwge1xuICBtYXJnaW4tdG9wOiAuMmVtO1xufVxuLmVtb2ppLW1hcnQtbm8tcmVzdWx0cyAuZW1vamktbWFydC1lbW9qaTpob3ZlcjpiZWZvcmUge1xuICBjb250ZW50OiBub25lO1xufVxuXG4uZW1vamktbWFydC1wcmV2aWV3IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDcwcHg7XG59XG5cbi5lbW9qaS1tYXJ0LXByZXZpZXctZW1vamksXG4uZW1vamktbWFydC1wcmV2aWV3LWRhdGEsXG4uZW1vamktbWFydC1wcmV2aWV3LXNraW5zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4uZW1vamktbWFydC1wcmV2aWV3LWVtb2ppIHtcbiAgbGVmdDogMTJweDtcbn1cblxuLmVtb2ppLW1hcnQtcHJldmlldy1kYXRhIHtcbiAgbGVmdDogNjhweDsgcmlnaHQ6IDEycHg7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbn1cblxuLmVtb2ppLW1hcnQtcHJldmlldy1za2lucyB7XG4gIHJpZ2h0OiAzMHB4O1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLmVtb2ppLW1hcnQtcHJldmlldy1uYW1lIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uZW1vamktbWFydC1wcmV2aWV3LXNob3J0bmFtZXMge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjODg4O1xufVxuLmVtb2ppLW1hcnQtcHJldmlldy1zaG9ydG5hbWUgKyAuZW1vamktbWFydC1wcmV2aWV3LXNob3J0bmFtZSxcbi5lbW9qaS1tYXJ0LXByZXZpZXctc2hvcnRuYW1lICsgLmVtb2ppLW1hcnQtcHJldmlldy1lbW90aWNvbixcbi5lbW9qaS1tYXJ0LXByZXZpZXctZW1vdGljb24gKyAuZW1vamktbWFydC1wcmV2aWV3LWVtb3RpY29uIHtcbiAgbWFyZ2luLWxlZnQ6IC41ZW07XG59XG5cbi5lbW9qaS1tYXJ0LXByZXZpZXctZW1vdGljb25zIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBjb2xvcjogI2JiYjtcbn1cblxuLmVtb2ppLW1hcnQtdGl0bGUgc3BhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmVtb2ppLW1hcnQtdGl0bGUgLmVtb2ppLW1hcnQtZW1vamkge1xuICBwYWRkaW5nOiAwO1xufVxuXG4uZW1vamktbWFydC10aXRsZS1sYWJlbCB7XG4gIGNvbG9yOiAjOTk5QTlDO1xuICBmb250LXNpemU6IDI2cHg7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG5cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoZXMge1xuICBmb250LXNpemU6IDA7XG4gIHBhZGRpbmc6IDJweCAwO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOWQ5O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4uZW1vamktbWFydC1za2luLXN3YXRjaGVzLW9wZW5lZCAuZW1vamktbWFydC1za2luLXN3YXRjaCB7XG4gIHdpZHRoOiAxNnB4O1xuICBwYWRkaW5nOiAwIDJweDtcbn1cblxuLmVtb2ppLW1hcnQtc2tpbi1zd2F0Y2hlcy1vcGVuZWQgLmVtb2ppLW1hcnQtc2tpbi1zd2F0Y2gtc2VsZWN0ZWQ6YWZ0ZXIge1xuICBvcGFjaXR5OiAuNzU7XG59XG5cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogd2lkdGgsIHBhZGRpbmc7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IC4xMjVzO1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XG59XG5cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoOm50aC1jaGlsZCgxKSB7IHRyYW5zaXRpb24tZGVsYXk6IDBzIH1cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoOm50aC1jaGlsZCgyKSB7IHRyYW5zaXRpb24tZGVsYXk6IC4wM3MgfVxuLmVtb2ppLW1hcnQtc2tpbi1zd2F0Y2g6bnRoLWNoaWxkKDMpIHsgdHJhbnNpdGlvbi1kZWxheTogLjA2cyB9XG4uZW1vamktbWFydC1za2luLXN3YXRjaDpudGgtY2hpbGQoNCkgeyB0cmFuc2l0aW9uLWRlbGF5OiAuMDlzIH1cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoOm50aC1jaGlsZCg1KSB7IHRyYW5zaXRpb24tZGVsYXk6IC4xMnMgfVxuLmVtb2ppLW1hcnQtc2tpbi1zd2F0Y2g6bnRoLWNoaWxkKDYpIHsgdHJhbnNpdGlvbi1kZWxheTogLjE1cyB9XG5cbi5lbW9qaS1tYXJ0LXNraW4tc3dhdGNoLXNlbGVjdGVkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTZweDtcbiAgcGFkZGluZzogMCAycHg7XG59XG4uZW1vamktbWFydC1za2luLXN3YXRjaC1zZWxlY3RlZDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7IGxlZnQ6IDUwJTtcbiAgd2lkdGg6IDRweDsgaGVpZ2h0OiA0cHg7XG4gIG1hcmdpbjogLTJweCAwIDAgLTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjJzIGVhc2Utb3V0O1xufVxuXG4uZW1vamktbWFydC1za2luIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJTsgcGFkZGluZy10b3A6IDEwMCU7XG4gIG1heC13aWR0aDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbn1cblxuLmVtb2ppLW1hcnQtc2tpbi10b25lLTEgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjOTNhIH1cbi5lbW9qaS1tYXJ0LXNraW4tdG9uZS0yIHsgYmFja2dyb3VuZC1jb2xvcjogI2ZhZGNiYyB9XG4uZW1vamktbWFydC1za2luLXRvbmUtMyB7IGJhY2tncm91bmQtY29sb3I6ICNlMGJiOTUgfVxuLmVtb2ppLW1hcnQtc2tpbi10b25lLTQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmY4ZjY4IH1cbi5lbW9qaS1tYXJ0LXNraW4tdG9uZS01IHsgYmFja2dyb3VuZC1jb2xvcjogIzliNjQzZCB9XG4uZW1vamktbWFydC1za2luLXRvbmUtNiB7IGJhY2tncm91bmQtY29sb3I6ICM1OTQ1MzkgfVxuXG4vKiBGb3Igc2NyZWVucmVhZGVycyBvbmx5LCB2aWEgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5NzU4NjIwICovXG4uZW1vamktbWFydC1zci1vbmx5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDFweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAtMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICBib3JkZXI6IDA7XG59XG4iXX0= */", '', '']];
    /***/
  },

  /***/
  "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/lib/loader.js?!./src/styles.scss":
  /*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!/Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/postcss-loader/src??embedded!/Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/sass-loader/lib/loader.js??ref--15-3!./src/styles.scss ***!
    \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesAngularDevkitBuildAngularSrcAngularCliFilesPluginsRawCssLoaderJsNode_modulesPostcssLoaderSrcIndexJsNode_modulesSassLoaderLibLoaderJsSrcStylesScss(module, exports) {
    module.exports = [[module.i, "/* You can add global styles to this file, and also import other style files */\n* {\n  box-sizing: border-box;\n}\nhtml {\n  -webkit-text-size-adjust: 100%;\n     -moz-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%;\n  font-size: 10px;\n  height: 100%;\n  width: 100%;\n}\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"Inter\", sans-serif;\n  font-size: 1.4rem;\n  overflow-x: hidden;\n  background-color: #fff;\n  color: #141414;\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n}\nbutton,\ninput {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0;\n  font: inherit;\n}\nbutton,\ninput {\n  line-height: normal;\n  overflow: visible;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZWVwYW5zaHVnb3lhbC9Eb2N1bWVudHMvY29tZXQtY2hhdC1hbmd1bGFyL2FuZ3VsYXIvQ29tZXRDaGF0V29ya3NwYWNlL3Byb2plY3RzL2FuZ3VsYXItY2hhdC1hcHAvc3JjL3N0eWxlcy5zY3NzIiwicHJvamVjdHMvYW5ndWxhci1jaGF0LWFwcC9zcmMvc3R5bGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEVBQUE7QUFHQTtFQUNFLHNCQUFBO0FDREY7QURJQTtFQUNFLDhCQUFBO0tBQUEsMkJBQUE7TUFBQSwwQkFBQTtVQUFBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDREY7QURJQTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBaEJpQjtFQWlCakIsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNERjtBRElBOztFQUVFLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FDREY7QURJQTs7RUFFRSxtQkFBQTtFQUNBLGlCQUFBO0FDREYiLCJmaWxlIjoicHJvamVjdHMvYW5ndWxhci1jaGF0LWFwcC9zcmMvc3R5bGVzLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG4kYmFzZV9mb250X2ZhbWlseTogXCJJbnRlclwiLCBzYW5zLXNlcmlmO1xuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIHRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZm9udC1mYW1pbHk6ICRiYXNlX2ZvbnRfZmFtaWx5O1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBjb2xvcjogIzE0MTQxNDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuYnV0dG9uLFxuaW5wdXQge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAxMDAlO1xuICBtYXJnaW46IDA7XG4gIGZvbnQ6IGluaGVyaXQ7XG59XG5cbmJ1dHRvbixcbmlucHV0IHtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4iLCIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIHRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZm9udC1mYW1pbHk6IFwiSW50ZXJcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgY29sb3I6ICMxNDE0MTQ7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmJ1dHRvbixcbmlucHV0IHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBmb250OiBpbmhlcml0O1xufVxuXG5idXR0b24sXG5pbnB1dCB7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufSJdfQ== */", '', '']];
    /***/
  },

  /***/
  "../../node_modules/@ctrl/ngx-emoji-mart/picker.css":
  /*!**********************************************************************************************************************************!*\
    !*** /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@ctrl/ngx-emoji-mart/picker.css ***!
    \**********************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesCtrlNgxEmojiMartPickerCss(module, exports, __webpack_require__) {
    var content = __webpack_require__(
    /*! !../../@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../postcss-loader/src??embedded!./picker.css */
    "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/@ctrl/ngx-emoji-mart/picker.css");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    var options = {};
    options.insert = "head";
    options.singleton = false;

    var update = __webpack_require__(
    /*! ../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */
    "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

    if (content.locals) {
      module.exports = content.locals;
    }
    /***/

  },

  /***/
  "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
  /*!********************************************************************************************************************************************************!*\
    !*** /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
    \********************************************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesStyleLoaderDistRuntimeInjectStylesIntoStyleTagJs(module, exports, __webpack_require__) {
    "use strict";

    var stylesInDom = {};

    var isOldIE = function isOldIE() {
      var memo;
      return function memorize() {
        if (typeof memo === 'undefined') {
          // Test for IE <= 9 as proposed by Browserhacks
          // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
          // Tests for existence of standard globals is to allow style-loader
          // to operate correctly into non-standard environments
          // @see https://github.com/webpack-contrib/style-loader/issues/177
          memo = Boolean(window && document && document.all && !window.atob);
        }

        return memo;
      };
    }();

    var getTarget = function getTarget() {
      var memo = {};
      return function memorize(target) {
        if (typeof memo[target] === 'undefined') {
          var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

          if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
            try {
              // This will throw an exception if access to iframe is blocked
              // due to cross-origin restrictions
              styleTarget = styleTarget.contentDocument.head;
            } catch (e) {
              // istanbul ignore next
              styleTarget = null;
            }
          }

          memo[target] = styleTarget;
        }

        return memo[target];
      };
    }();

    function listToStyles(list, options) {
      var styles = [];
      var newStyles = {};

      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var id = options.base ? item[0] + options.base : item[0];
        var css = item[1];
        var media = item[2];
        var sourceMap = item[3];
        var part = {
          css: css,
          media: media,
          sourceMap: sourceMap
        };

        if (!newStyles[id]) {
          styles.push(newStyles[id] = {
            id: id,
            parts: [part]
          });
        } else {
          newStyles[id].parts.push(part);
        }
      }

      return styles;
    }

    function addStylesToDom(styles, options) {
      for (var i = 0; i < styles.length; i++) {
        var item = styles[i];
        var domStyle = stylesInDom[item.id];
        var j = 0;

        if (domStyle) {
          domStyle.refs++;

          for (; j < domStyle.parts.length; j++) {
            domStyle.parts[j](item.parts[j]);
          }

          for (; j < item.parts.length; j++) {
            domStyle.parts.push(addStyle(item.parts[j], options));
          }
        } else {
          var parts = [];

          for (; j < item.parts.length; j++) {
            parts.push(addStyle(item.parts[j], options));
          }

          stylesInDom[item.id] = {
            id: item.id,
            refs: 1,
            parts: parts
          };
        }
      }
    }

    function insertStyleElement(options) {
      var style = document.createElement('style');

      if (typeof options.attributes.nonce === 'undefined') {
        var nonce = true ? __webpack_require__.nc : undefined;

        if (nonce) {
          options.attributes.nonce = nonce;
        }
      }

      Object.keys(options.attributes).forEach(function (key) {
        style.setAttribute(key, options.attributes[key]);
      });

      if (typeof options.insert === 'function') {
        options.insert(style);
      } else {
        var target = getTarget(options.insert || 'head');

        if (!target) {
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        }

        target.appendChild(style);
      }

      return style;
    }

    function removeStyleElement(style) {
      // istanbul ignore if
      if (style.parentNode === null) {
        return false;
      }

      style.parentNode.removeChild(style);
    }
    /* istanbul ignore next  */


    var replaceText = function replaceText() {
      var textStore = [];
      return function replace(index, replacement) {
        textStore[index] = replacement;
        return textStore.filter(Boolean).join('\n');
      };
    }();

    function applyToSingletonTag(style, index, remove, obj) {
      var css = remove ? '' : obj.css; // For old IE

      /* istanbul ignore if  */

      if (style.styleSheet) {
        style.styleSheet.cssText = replaceText(index, css);
      } else {
        var cssNode = document.createTextNode(css);
        var childNodes = style.childNodes;

        if (childNodes[index]) {
          style.removeChild(childNodes[index]);
        }

        if (childNodes.length) {
          style.insertBefore(cssNode, childNodes[index]);
        } else {
          style.appendChild(cssNode);
        }
      }
    }

    function applyToTag(style, options, obj) {
      var css = obj.css;
      var media = obj.media;
      var sourceMap = obj.sourceMap;

      if (media) {
        style.setAttribute('media', media);
      }

      if (sourceMap && btoa) {
        css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
      } // For old IE

      /* istanbul ignore if  */


      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        while (style.firstChild) {
          style.removeChild(style.firstChild);
        }

        style.appendChild(document.createTextNode(css));
      }
    }

    var singleton = null;
    var singletonCounter = 0;

    function addStyle(obj, options) {
      var style;
      var update;
      var remove;

      if (options.singleton) {
        var styleIndex = singletonCounter++;
        style = singleton || (singleton = insertStyleElement(options));
        update = applyToSingletonTag.bind(null, style, styleIndex, false);
        remove = applyToSingletonTag.bind(null, style, styleIndex, true);
      } else {
        style = insertStyleElement(options);
        update = applyToTag.bind(null, style, options);

        remove = function remove() {
          removeStyleElement(style);
        };
      }

      update(obj);
      return function updateStyle(newObj) {
        if (newObj) {
          if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
            return;
          }

          update(obj = newObj);
        } else {
          remove();
        }
      };
    }

    module.exports = function (list, options) {
      options = options || {};
      options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
      // tags it will allow on a page

      if (!options.singleton && typeof options.singleton !== 'boolean') {
        options.singleton = isOldIE();
      }

      var styles = listToStyles(list, options);
      addStylesToDom(styles, options);
      return function update(newList) {
        var mayRemove = [];

        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];

          if (domStyle) {
            domStyle.refs--;
            mayRemove.push(domStyle);
          }
        }

        if (newList) {
          var newStyles = listToStyles(newList, options);
          addStylesToDom(newStyles, options);
        }

        for (var _i = 0; _i < mayRemove.length; _i++) {
          var _domStyle = mayRemove[_i];

          if (_domStyle.refs === 0) {
            for (var j = 0; j < _domStyle.parts.length; j++) {
              _domStyle.parts[j]();
            }

            delete stylesInDom[_domStyle.id];
          }
        }
      };
    };
    /***/

  },

  /***/
  "./src/styles.scss":
  /*!*************************!*\
    !*** ./src/styles.scss ***!
    \*************************/

  /*! no static exports found */

  /***/
  function srcStylesScss(module, exports, __webpack_require__) {
    var content = __webpack_require__(
    /*! !../../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../../node_modules/postcss-loader/src??embedded!../../../node_modules/sass-loader/lib/loader.js??ref--15-3!./styles.scss */
    "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/lib/loader.js?!./src/styles.scss");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    var options = {};
    options.insert = "head";
    options.singleton = false;

    var update = __webpack_require__(
    /*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */
    "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

    if (content.locals) {
      module.exports = content.locals;
    }
    /***/

  },

  /***/
  3:
  /*!**********************************************************************************************************************************************************!*\
    !*** multi ./src/styles.scss /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@ctrl/ngx-emoji-mart/picker.css ***!
    \**********************************************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    __webpack_require__(
    /*! /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/projects/angular-chat-app/src/styles.scss */
    "./src/styles.scss");

    module.exports = __webpack_require__(
    /*! /Users/deepanshugoyal/Documents/comet-chat-angular/angular/CometChatWorkspace/node_modules/@ctrl/ngx-emoji-mart/picker.css */
    "../../node_modules/@ctrl/ngx-emoji-mart/picker.css");
    /***/
  }
}, [[3, "runtime"]]]);
//# sourceMappingURL=styles-es5.js.map