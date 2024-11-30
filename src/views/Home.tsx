import { Pressable, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { metrics } from "@/style/metrics";
import { FitlerButton } from "@/components/FitlerButton";
import { filterButtonData, useHomeState } from "@/store/store";

export const Home = () => {
  // I used top value with padding instead of using SafeAreaView parent
  // to properly style the top side of the screen(safearea default is margin so you can't change color of it)
  const { top } = useSafeAreaInsets();

  const { activeKey, setActiveKey } = useHomeState();

  const searchInputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        paddingTop: top + metrics.TOP_PADDING,
      }}
      className="flex-1 bg-page px-4"
    >
      {/* Search Box */}
      <Pressable
        accessibilityRole="button"
        className="bg-white w-full rounded-full flex-row items-center py-4 px-4"
        onPress={() => {
          searchInputRef.current?.focus();
        }}
      >
        <Ionicons name="search-outline" color="black" size={24} />
        <TextInput
          ref={searchInputRef}
          accessibilityLabel="Text input field"
          placeholder="Dosya ara"
          className="text-base ml-2 w-[80%] leading-5"
        />
      </Pressable>

      {/* Filter Options */}
      <View className="flex-row items-center w-full justify-between my-4">
        {filterButtonData.map((item, index) => (
          <FitlerButton
            key={index}
            title={item.title}
            active={activeKey === item.key}
            onPress={() => {
              setActiveKey(item.key);
            }}
          />
        ))}
      </View>
    </View>
  );
};
