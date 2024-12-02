import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import firebase from "@react-native-firebase/app";
import { RootStackNavigator } from "@/navigation";
import { setupGoogleAnalytics } from "@/utils/setupGoogleAnalytics";

void setupGoogleAnalytics()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to setup Google Analytics", error);
  })
  .then(async () => {
    await firebase.analytics().setConsent({
      analytics_storage: true,
      ad_storage: true,
      ad_user_data: true,
      ad_personalization: true,
    });
    return;
  });

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
