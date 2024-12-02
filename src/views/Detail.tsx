import { Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { metrics } from "@/style/metrics";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { StatusBubble } from "@/components/FileItem";
import { useFileStore } from "@/store/useFileStore";
import { InfoTab } from "@/views/InfoTab";
import { TabA } from "@/views/TabA";
import { FileStackParams } from "@/navigation";

export type TopTabsParams = {
  Info: undefined;
  TabA: undefined;
  TabB: undefined;
};

const TopTabs = createMaterialTopTabNavigator<TopTabsParams>();

export const TopTab = ({
  initialRouteName,
}: {
  initialRouteName: keyof TopTabsParams;
}) => {
  return (
    <TopTabs.Navigator initialRouteName={initialRouteName}>
      <TopTabs.Screen name="Info" component={InfoTab} />
      <TopTabs.Screen name="TabA" component={TabA} />
      <TopTabs.Screen name="TabB" component={TabA} />
    </TopTabs.Navigator>
  );
};

export const Detail = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const { fileInput } = useFileStore();

  const {
    params: { initialRouteName },
  } = useRoute<RouteProp<FileStackParams, "Detail">>();

  return (
    <View
      style={{
        paddingTop: top + metrics.TOP_PADDING,
      }}
      className="flex-1 bg-white"
    >
      <View className="flex-row items-center border-b-[1px] pb-4 px-4 border-black/10">
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View className="ml-4 flex-row justify-between flex-1">
          <View>
            <Text className="text-lg">Detail</Text>
            <Text>{fileInput?.date}</Text>
          </View>

          <View className="flex-row items-center">
            <StatusBubble status={fileInput?.status || "open"} />
          </View>
        </View>
      </View>

      <TopTab initialRouteName={initialRouteName || "Info"} />
    </View>
  );
};
