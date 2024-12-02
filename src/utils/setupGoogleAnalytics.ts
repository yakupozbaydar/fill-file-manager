import firebase from "@react-native-firebase/app";

export const setupGoogleAnalytics = async () => {
  await firebase.analytics().setAnalyticsCollectionEnabled(true);
};
