import { Text, View, Pressable } from 'react-native'
import React from 'react'

const Link = ({ navigation, routeName, displayText }) => {
    return (
        <View className='mt-5'>
            <Pressable onPress={() => navigation.navigate(routeName)}>
                <Text className="text-blue-500 text-xl text">
                    {displayText}
                </Text>
            </Pressable>
        </View>
    )
}

export default Link