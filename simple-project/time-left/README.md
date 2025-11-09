# Expo app with Nativewind

## Create an expo repo without the new file navigation but with nativewind
- npm install -g create-expo-stack rn-new
- npx rn-new --nativewind
  
## Create expo app with file navigatin and nativewind
- npx create-expo-app@latest . (current folder must be empty)
- npm run reset-project
- npm install nativewind tailwindcss@^3.4.17
- [Follow These Docs Steps from Nativewind](https://www.nativewind.dev/docs/getting-started/installation)
- npx tailwindcss init


## Building for App store

#### Set up EAS (Expo Application Services)
- npm install -g eas-cli
- eas login
- eas build:configure

#### Android APK (for direct install)
- eas build -p android --profile preview
- eas build -p ios --profile preview

#### Local build without uploading to expo servers
- eas build -p android --profile preview --local

###### To install directly on your iPhone:

- You must have an Apple Developer account
- You’ll need to register your device or use TestFlight


## Building for local use
- npx expo prebuild
- npx expo run:android
- android/app/build/outputs/apk/debug/app-debug.apk

#### Installation
- adb install android/app/build/outputs/apk/debug/app-debug.apk

## Questions

- can we only use hooks inside the component function?
  - Yes, React Hooks can only be used inside React function components or custom Hooks. Hooks like useState, useEffect, useContext, etc., are designed to "hook into" React's features (state, lifecycle, context) within the context of a function component's rendering cycle.
  - Hooks are incompatible with React class components. If you are using class components, you would use this.state and lifecycle methods instead of Hooks.
  - Beyond being called within function components or custom Hooks, Hooks also have other rules, such as being called at the top level of the component/Hook (not inside loops, conditions, or nested functions) and not being conditional.
  - Attempting to use a Hook outside of these specified contexts will result in an "Invalid hook call" error from React.

- Does useeffect runs after the render of before the render of the component?
  - Yes, The order is:
  1.  Component Renders: React renders the component, calculating the virtual DOM and updating the actual DOM.
  2. useEffect Executes: After the component has rendered and the browser has painted the changes to the screen, the callback function inside useEffect is executed.
  - This behavior is important because useEffect is designed for side effects, such as data fetching, subscriptions, or manually manipulating the DOM. These operations often require the component to have already rendered and be present in the DOM for them to function correctly.
  - **It's also worth noting that:**
      By default, useEffect runs after every render.
      If an empty dependency array ([]) is provided as the second argument to useEffect, the effect will only run once after the initial render (on mount). Using return of useEffect you can also do the cleanup for timeouts or intervals or other cleanups.
      If a dependency array with specific values is provided, the effect will re-run only when those values change.