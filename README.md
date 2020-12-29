# CometChat Kitchen Sink Sample App

CometChat Kitchen Sink Sample App is a real-time messaging app capable of **one-on-one** (private), **group** messaging, voice & video calling.

## Features

- Login
- Private and Group conversations
- Search by users and groups
- Text, Media and Custom messages
- Read receipts
- Chat history

## Prerequisite

1. To run this app, you must have the **Node Package Manager (NPM)** and **Angular CLI** already installed and setup . If you don't, this documentation will help you in setting up **NPM** and **Angular CLI**

   - <a href="https://jasonwatmore.com/post/2020/06/02/angular-setup-development-environment" target="_blank">Angular - Setup Development Environment (For Windows) </a>
   - <a href="https://www.zeolearn.com/magazine/setup-angular-mac" target="_blank">Angular - Setup Development Environment (For Mac) </a>

2. To run this app, you must create an account with CometChat and obtain your `App ID`, `Auth Key` and `Region`. If you don't have an account, you can create one from <a href="https://app.cometchat.io/" target="_blank">CometChat Dashboard</a>.

## Usage

1. Clone this repository
2. Navigate to the root directory and replace `APP_ID`, `REGION` and `AUTH_KEY` with your CometChat `App ID`, `Region` and `Auth Key` in `src/CONSTS.ts` file
3. Install dependencies and run the app

```javascript
    cd CometChatWorkspace
    npm install
    ng build angular-chat-ui-kit
    ng serve angular-chat-app
```

---
