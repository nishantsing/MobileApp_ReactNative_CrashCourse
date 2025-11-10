// ==== ProgressBar.tsx ====
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";


export default function ProgressBar({ progress }: { progress: number }) {
    const anim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(anim, {
            toValue: progress,
            duration: 600,
            useNativeDriver: false,
        }).start();
    }, [progress]);


    const width = anim.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });


    return (
        <View className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <Animated.View
                style={{ width }}
                className="h-3 bg-blue-500 dark:bg-blue-300"
            />
        </View>
    );
}