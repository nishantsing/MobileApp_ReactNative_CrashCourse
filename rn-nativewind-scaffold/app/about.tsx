import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router';

const About = () => {
    const router = useRouter();
    return (
        <View>
            <Text className='font-extrabold'>This is about screen</Text>
            <Pressable
                onPress={() => router.back()}
                className="bg-gray-300 px-4 py-2 rounded"
            >
                <Text>Go Back</Text>
            </Pressable>
        </View>
    )
}

export default About

/* 
onPress={() => router.push('/details/42')}

import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Details() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Details for ID: {id}</Text>
    </View>
  );
}

Method	Purpose
router.push('/route')	Go to new route
router.replace('/route')	Replace current route
router.back()	Go back
router.prefetch('/route')	Preload a route
router.setParams({ key: value })	Update params in current route
*/