import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type YearStats = {
  progress: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getYearStats(): YearStats {
  const now = new Date();

  // start of year in local timezone
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // end of year (Dec 31 23:59:59) in local timezone
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  const total = endOfYear.getTime() - startOfYear.getTime();
  const elapsed = now.getTime() - startOfYear.getTime();
  const remaining = endOfYear.getTime() - now.getTime();

  const progress = (elapsed / total) * 100;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return { progress, days, hours, minutes, seconds };
}

export default function YearCountdown() {
  const [{ progress, days, hours, minutes, seconds }, setYearStats] =
    useState<YearStats>(getYearStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setYearStats(getYearStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="p-6 rounded-2xl shadow-lg bg-gray-900 text-white w-11/12 self-center mt-10">
        <Text className="text-2xl font-bold mb-4 text-center text-white">
          {new Date().getFullYear()} Countdown
        </Text>

        {/* Progress Bar */}
        <View className="w-full bg-gray-700 rounded-full h-4 mb-3 overflow-hidden">
          <View
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className="text-sm text-gray-300 mb-4 text-center">
          {progress.toFixed(2)}% of the year completed
        </Text>

        {/* Countdown Timer */}
        <View className="flex-row justify-center gap-6 ">
          <View className="items-center">
            <Text className="text-3xl font-bold text-white">{days}</Text>
            <Text className="text-gray-400 text-sm">Days</Text>
          </View>

          <View className="items-center">
            <Text className="text-3xl font-bold text-white">{hours}</Text>
            <Text className="text-gray-400 text-sm">Hrs</Text>
          </View>

          <View className="items-center">
            <Text className="text-3xl font-bold text-white">{minutes}</Text>
            <Text className="text-gray-400 text-sm">Min</Text>
          </View>

          <View className="items-center">
            <Text className="text-3xl font-bold text-white">{seconds}</Text>
            <Text className="text-gray-400 text-sm">Sec</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>

  );
}
