import { Moon, Sun } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../components/ProgressBar";
import useCountdowns, { TimeLeft } from "../hooks/useCountdowns";
import { loadTheme, saveTheme } from "../utils/themeStorage";

type BlockProps = {
  title: string;
  data?: TimeLeft;
};

function Block({ title, data, dark }: BlockProps & { dark: boolean }) {
  if (!data) return null;

  return (
    <View className={`p-4 rounded-xl ${dark ? "bg-gray-800" : "bg-white"} w-full mb-4 shadow`}>
      <Text className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"} mb-2`}>
        {title}
      </Text>
      <ProgressBar progress={data.progress} />
      <Text className={`mt-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
        {data.progress.toFixed(2)}%
      </Text>
      <View className="flex-row justify-between mt-3">
        <Text className={`text-base ${dark ? "text-white" : "text-gray-900"}`}>{data.days}d</Text>
        <Text className={`text-base ${dark ? "text-white" : "text-gray-900"}`}>{data.hours}h</Text>
        <Text className={`text-base ${dark ? "text-white" : "text-gray-900"}`}>{data.minutes}m</Text>
        <Text className={`text-base ${dark ? "text-white" : "text-gray-900"}`}>{data.seconds}s</Text>
      </View>
    </View>
  );
}

export default function CountdownScreen() {
  const { year, month, week, day } = useCountdowns();
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [fire, setFire] = useState(false);

  // Load theme once
  useEffect(() => {
    (async () => {
      const storedTheme = await loadTheme();
      if (storedTheme === "dark") setDark(true);
      setHydrated(true);
    })();
  }, []);

  // Toggle theme and save
  const toggleDark = async () => {
    const next = !dark;
    setDark(next);
    await saveTheme(next ? "dark" : "light");
  };

  // Fire confetti
  useEffect(() => {
    const list = [year, month, week, day];
    if (!list.some(Boolean)) return;

    const hitZero = list.some(
      (t) =>
        t &&
        t.days === 0 &&
        t.hours === 0 &&
        t.minutes === 0 &&
        t.seconds === 0
    );

    if (hitZero) {
      setFire(true);
      setTimeout(() => setFire(false), 3000);
    }
  }, [year, month, week, day]);

  if (!hydrated) return <View className="flex-1 bg-black" />;

  return (
    <View className={`${dark ? "dark bg-black" : "bg-white"} flex-1`}>
      <SafeAreaView className="flex-1 p-6">
        {fire && <ConfettiCannon count={200} origin={{ x: 180, y: -10 }} />}
        <View className="flex-row justify-between items-center mb-6">
          <Text className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            Countdowns
          </Text>
          <TouchableOpacity
            onPress={toggleDark}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun size={20} color="white" /> : <Moon size={20} color="black" />}
          </TouchableOpacity>
        </View>

        <Block title="Day Ends In" data={day} dark={dark} />
        <Block title="Week Ends In" data={week} dark={dark} />
        <Block title="Month Ends In" data={month} dark={dark} />
        <Block title="Year Ends In" data={year} dark={dark} />
      </SafeAreaView>
    </View>
  );
}
