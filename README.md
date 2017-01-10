# Personal Push messenger
Run any node js script and setup hooks to the firebase clound messenger for phone push notifications

## Firebase
- Uses the [Firebase](https://firebase.google.com/) cloud messaging service
- Click on go to console and create a new project.
- Visit the [docs](https://firebase.google.com/docs/) to learn the basics for the android/ios firebase api.
  - Will put up my own sample code and tutorial for android (requires android studio)
- Once the app is set up, go on to the install portion and fill in the variables in envVar.js

## Install
- runs on pure node js, no fussing around with npm
- to setup, run:
  - `node setup.js`
- fill in the created envVar.js file with the necessary information
- run the example script using:
  - `node script.js`

## Preinstalled scripts:
- Cornell class notifier: findclass.js
  - usage: set exports.cookie in envVar.js and call `classFinder.testforopening('class name');`
