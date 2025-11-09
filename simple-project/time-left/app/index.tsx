import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getDaysLeftInYear() {
  const now = new Date();
  const endOfYear = new Date(now.getFullYear(), 11, 31); // December 31
  const diff = endOfYear.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)); // convert ms → days
}

export default function DaysLeftInYear() {

  const [daysLeft, setDaysLeft] = useState(getDaysLeftInYear());
  useEffect(() => {
    // Calculate time till next midnight
    const now = new Date();
    const millisTillMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timer = setTimeout(() => {
      setDaysLeft(getDaysLeftInYear());
    }, millisTillMidnight);

    return () => clearTimeout(timer);
  }, [daysLeft])
  return (
    // <View>
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-300">
      <Text className="m-5 text-2xl font-bold text-black-500">Days Left for {new Date().getFullYear() + 1} to arrive</Text>
      <View className=" bg-gray-100 rounded-full">
        <Text className="text-center m-5 text-2xl font-bold text-red-500">{daysLeft}</Text>
      </View>
    </SafeAreaView>
    // </View>
  );
}
