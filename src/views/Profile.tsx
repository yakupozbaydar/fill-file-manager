import { Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { metrics } from "@/style/metrics";

export const Profile = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top + metrics.TOP_PADDING,
      }}
      className="px-4"
    >
      <Text className="text-2xl font-bold mb-4">Profile</Text>
    </View>
  );
};
