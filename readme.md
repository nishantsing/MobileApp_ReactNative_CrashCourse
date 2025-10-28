# React Native App

- npx create-expo-app@latest . -> basic expo app
- npx rn-new --nativewind -> rn/expo with nativewind

- npm run reset-project
- npm run android

- rnfe

## Local Storage
- npm i @react-native-async-storage/async-storage 

```tsx
// get the user's choice
AsyncStorage.getItem("darkMode").then((value) => {
    if (value) setIsDarkMode(JSON.parse(value));
});

await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));

```

## Context API
- Usage is same as react. wrap your root layout.
- refer useTheme and its usage for better understanding.

- Provider is used to wrap the application and Context using used to create the context in child

```jsx
const styles = createStyles(colors)

<TouchableOpacity onPress={() => toggleDarkMode()}><Text>Toggle the mode</Text></TouchableOpacity> // when you want to do multiple actions
// and 
<TouchableOpacity onPress={ toggleDarkMode}><Text>Toggle the mode</Text></TouchableOpacity> // clean for single action


const createStyles = (colors: ColorScheme) => { // To make colors accessible to StyleSheet we used a wrapper function
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg
    },
    linkButton: {
      borderWidth: 2,
      borderColor: 'blue',
      borderRadius: 10,
      padding: 16,
    }
  })
  return styles
}

```

## Using Convex as DB (Supabase/ Firebase/ Appwrite)

- npm i convex
- npx convex dev -> running and syncing with convex server

- you can also work on convex db and functions first and then start working on the frontend


## Expo Linear
- npx expo install expo-linear-gradient

```ts
// 1. convex/schema.ts
import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values"

export default defineSchema({
    todos: defineTable({
        text: v.string(),
        isCompleted: v.boolean()
    }),
    // users: defineTable({
    //     fullName: v.string(),
    //     isLoggedIn: v.boolean()
    // })
})

// 2. convex/todos.ts
/* Query -> Get
Mutation -> create, update, delete  */

import { query, mutation } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const getTodos = query({
    args: {},
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect()
        // .take(50)
        return todos
    }
})

export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false
        })

        return todoId
    }
})

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id)
        if (!todo) throw new ConvexError("Todo not found!!!")

        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })

    }
})

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})

export const updateTodo = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text
        })
    }
})

export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();

        // Delete all todos
        for (const todo of todos) {
            await ctx.db.delete(todo._id)
        }
        return { deletedCount: todos.length }
    }
})

//Usage 
// Update your convex/react import like this:
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const todos = useQuery(api.todos.getTodos)
console.log(todos)

const addTodo = useMutation(api.todos.addTodo)
const clearAllTodos = useMutation(api.todos.clearAllTodos)

<TouchableOpacity onPress={() => addTodo({ text: "walk the dog" })}><Text>Add a new Todo</Text></TouchableOpacity>
<TouchableOpacity onPress={() => clearAllTodos()}><Text>Clear All</Text></TouchableOpacity>
```

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



