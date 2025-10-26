# React Native App

- npx create-expo-app@latest . -> basic expo app
- npx rn-new --nativewind -> rn/expo with nativewind

- npm run reset-project
- npm run android

- rnfe

- [NativeWind - Tailwind for react native](https://www.nativewind.dev/docs/getting-started/installation)


- npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
- npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
- npx tailwindcss init


```js 
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- create global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- create babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};

```

- create metro.config.js
```js

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './global.css' })

```

- In app.json
```json

{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

- In app/_layout.tsx

```tsx
import { Stack } from "expo-router";
import "../global.css"
export default function RootLayout() {
  return <Stack />;
}
```

- In app/index.tsx
```tsx
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}

```

## Routing

- Folder structure (this drives the routing)
app/
 ┣ _layout.js           ← Global Stack layout
 ┣ (tabs)/              ← Tab navigation folder
 ┃ ┣ _layout.js         ← Tab Navigator config
 ┃ ┣ index.js           ← Home tab
 ┃ ┗ profile.js         ← Profile tab
 ┣ details.js           ← Stack screen (not in tabs)
 ┗ modal.js             ← Optional modal screen

 ```js
//  Global Stack layout — app/_layout.js
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Main tab navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Stack screens outside tabs */}
      <Stack.Screen name="details" options={{ title: 'Details Page' }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Modal View' }}
      />
    </Stack>
  );
}

// Tab Navigator — app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native'; // icons

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarStyle: { backgroundColor: '#f9fafb' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  );
}

// Home screen — app/(tabs)/index.js
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">🏠 Home Tab</Text>

      <Pressable
        onPress={() => router.push('/details')}
        className="bg-blue-500 px-6 py-3 rounded-lg mb-3"
      >
        <Text className="text-white text-lg">Go to Details (Stack)</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/modal')}
        className="bg-green-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg">Open Modal</Text>
      </Pressable>
    </View>
  );
}

// Profile tab — app/(tabs)/profile.js
import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">👤 Profile Tab</Text>
    </View>
  );
}

// Stack screen — app/details.js
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Details() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-2xl font-bold mb-4">📄 Details Screen</Text>
      <Pressable
        onPress={() => router.back()}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

// Modal screen — app/modal.js
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Modal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-6">🎉 Modal Screen</Text>
      <Pressable
        onPress={() => router.back()}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white">Close Modal</Text>
      </Pressable>
    </View>
  );
}


 ```

## React Native Mobile App Development 

- [React Native App - Hitesh](https://youtu.be/kGtEax1WQFg?list=PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c)
- [React Native Crash Course+ | Build a Mobile App In 3 Hours](https://youtu.be/bCpFbERgj7s)

## Notes - React Native Crash Course+ | Build a Mobile App In 3 Hours

![image](https://github.com/user-attachments/assets/479bd19d-05ab-4ff0-994e-e110e7ed021d)



