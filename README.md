<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# Angular Sample App by CometChat

This is a reference application showcasing the integration of [CometChat's Angular UI Kit](https://www.cometchat.com/docs/v4/angular-uikit/overview) within an Angular framework. It provides developers with examples of implementing real-time messaging and voice and video calling features in their own Angular-based applications.

<div style="
    display: flex;
    align-items: center;
    justify-content: center;">
   <img src="./Screenshots/overview_cometchat_screens.png" />
</div>

## Prerequisites

- Ensure that you have Node.js and npm installed:

    ```sh
    npm install npm@latest -g
    ```

- Sign up for a [CometChat](https://app.cometchat.com/) account to get your app credentials: _`App ID`_, _`Region`_, and _`Auth Key`_


## Installation
1. Clone the repository:
    ```
    git clone https://github.com/cometchat/cometchat-sample-app-angular.git
    ```
2. Navigate to the cloned directory:
    ```
    cd cometchat-sample-app-angular
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Enter your CometChat _`App ID`_, _`Region`_, and _`Auth Key`_ in the [AppConstants.ts](https://github.com/cometchat/cometchat-sample-app-angular/blob/v4/src/AppConstants.ts) file:
   https://github.com/cometchat/cometchat-sample-app-angular/blob/b624244691176cad7b468b8fa343fe3b3f76e27a/src/AppConstants.ts#L1-L5
5. If your app is created before August 12th, 2024 then change the sample data URL to `https://assets.cometchat.io/sampleapp/v1/sampledata.json` in the [src/app/login/login.component.ts](https://github.com/cometchat/cometchat-sample-app-angular/src/app/login/login.component.ts) file: https://github.com/cometchat/cometchat-sample-app-angular/blob/b624244691176cad7b468b8fa343fe3b3f76e27a/src/app/login/login.component.ts#L38-L40

6. Run the project locally to see all CometChat features in action:
    ```
    npm run start
    ```


## Help and Support
For issues running the project or integrating with our UI Kits, consult our [documentation](https://www.cometchat.com/docs/angular-uikit/integration) or create a [support ticket](https://help.cometchat.com/hc/en-us) or seek real-time support via the [CometChat Dashboard](http://app.cometchat.com/).
