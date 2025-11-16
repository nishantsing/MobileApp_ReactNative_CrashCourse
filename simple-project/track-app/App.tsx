import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Screens
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";

// Track Screens
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";

// Account Screen
import AccountScreen from "./src/screens/AccountScreen";
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';

import { Provider as TrackProvider } from './src/context/TrackContext';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './src/locationTask'; //🔥
import { Feather, FontAwesome } from '@expo/vector-icons';
import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ AUTH STACK (Signup ↔ Signin)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ title: "Sign In" }}
      />
    </Stack.Navigator >
  );
}

// ✅ TRACK LIST STACK (TrackList ↔ TrackDetail)
function TrackStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{
          title: "Tracks",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={({ route }) => {
          const title = route?.params?.name ?? "Track Detail";
          return {
            title,
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          };
        }}
      />
    </Stack.Navigator>
  );
}

// ✅ BOTTOM TABS (TrackStack + TrackCreate + Account)
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Tracks"
        component={TrackStack}
        options={{
          headerShown: false, tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          title: "Create Track", tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { state, tryLocalSignin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // bootstrap required because we cannot have direct await inside the useEffect
    const bootstrap = async () => {
      await tryLocalSignin(); // load token if available
      setLoading(false);
    };
    bootstrap();
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" />; // or a loading spinner
  }
  return (
    <NavigationContainer>
      {state.token ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  // ✅ This state acts like SwitchNavigator
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </LocationProvider >
      </TrackProvider>
    </SafeAreaProvider>


  );
}

// const { state, signin, signout } = useContext(AuthContext);