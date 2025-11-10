import * as SecureStore from "expo-secure-store";

export async function saveTheme(value: "light" | "dark") {
    await SecureStore.setItemAsync("theme", value);
}

export async function loadTheme() {
    return await SecureStore.getItemAsync("theme");
}