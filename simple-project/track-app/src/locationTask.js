//🔥  locationTask.js
import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask("TRACKING_TASK", ({ data, error }) => {
    if (error) {
        console.error("Background Task Error:", error);
        return;
    }
    const { locations } = data;
    console.log("Background Location:", locations[0].coords);
});

// 🔥 also add below in app.json
/* {
  "expo": {
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["location"],
        "NSLocationWhenInUseUsageDescription": "App needs your location while in use.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "App needs background location."
      }
    }
  }
} */

/* 
{
  "expo": {
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ]
    }
  }
} */
