import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="/about" className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg font-semibold">Visit about screen</Link>
      <Pressable onPress={() => router.push('/about')} className="bg-blue-500 px-6 py-3 rounded-lg">
        <Text className="text-white text-lg font-semibold">Go to About Pressable Button</Text>
      </Pressable>
    </View>
  );
}

/* 
With Expo Router, you don’t use useNavigation() or navigation.navigate() anymore.
Instead, you import useRouter() or use <Link>.
*/

/* 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-2xl mb-4 font-semibold">🏠 Home Screen</Text>

      <Pressable
        onPress={() => navigation.navigate('Details', { user: 'Nishant' })}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg font-semibold">
          Go to Details
        </Text>
      </Pressable>
    </View>
  );
}

import { View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-2">
        Details Screen 👋
      </Text>
      <Text className="text-gray-500 mb-6">
        Hello, {route.params?.user}!
      </Text>

      <Pressable
        onPress={() => navigation.goBack()}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


Task	Code
Navigate forward	navigation.navigate('RouteName')
Go back	navigation.goBack()
Pass params	navigation.navigate('Details', { userId: 1 })
Access params	route.params.userId
*/