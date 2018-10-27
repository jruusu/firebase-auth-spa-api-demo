# firebase-auth-spa-api-demo
Quick demo of a single page web app with
* Google Firebase Auth login
* something something

## Prerequisites
* Node.js 8.12
* [The Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Initial Firebase project setup
At the [Google Firebase Console](https://console.firebase.google.com/)
1) Add a project
2) Develop > Authentication > Set up sign-in method, enable Google
3) Put your _Project ID_ as `FIREBASE_PROJECT_ID` and _Web API Key_ as `FIREBASE_WEB_API_KEY` in your local `.env` file
`

## Run it locally
`heroku local web`
