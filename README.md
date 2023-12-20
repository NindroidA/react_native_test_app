# React Native Test App

React Native Test App. 

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- React Native CLI
- Xcode (for iOS development) or Android Studio (for Android development)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory: `cd my-app`.
3. Install the dependencies: `npm install`.

## Running the App

### Android

- Start an Android emulator or connect an Android device.
- Run the app (expo): `npm run android`
- Run the app (react-native): `npx react-native run-android`.

### iOS

#### Simulator
- Start an ios Simulator.
- Run the app (expo): `npm run ios`
- Run the app: `npx react-native run-ios`

#### Xcode
- Open the project in Xcode: `cd ios && open MyReactNativeApp.xcworkspace`
- Build and run the app in the simulator or on a connected device.

## Troubleshooting

1. Clean the project.
- Android: `cd android && ./gradlewclean && cd ..`.
- iOS: `cd ios && pod install && cd ..`