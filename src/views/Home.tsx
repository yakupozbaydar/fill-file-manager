import {
  Pressable,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { metrics } from "@/style/metrics";
import { filterButtonData, useHomeState } from "@/store/store";
import { FilterButton } from "@/components/FilterButton";
import { FileItem } from "@/components/FileItem";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useFileStore } from "@/store/useFileStore";

export const Home = () => {
  // I used top value with padding instead of using SafeAreaView parent
  // to properly style the top side of the screen(safearea default is margin so you can't change color of it)
  const { top } = useSafeAreaInsets();

  const { activeKey, setActiveKey, searchInput, setSearchInput } =
    useHomeState();

  const navigation = useAppNavigation();

  const files = useFileStore((state) => state.files);
  const { resetInput } = useFileStore();

  const filteredFiles = useMemo(() => {
    if (activeKey === "all") {
      return files.filter((file) =>
        file.fileName.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    return files.filter(
      (file) =>
        file.status === activeKey &&
        file.fileName.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [files, searchInput, activeKey]);

  const searchInputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        paddingTop: top + metrics.TOP_PADDING,
      }}
      className="flex-1 bg-page px-4"
    >
      <Text className="text-2xl font-bold mb-4">Fill Labs File Manager</Text>

      {/* Search Box */}
      <Pressable
        accessibilityRole="button"
        className="bg-black/10 w-full rounded-xl flex-row items-center py-4 px-4"
        onPress={() => {
          searchInputRef.current?.focus();
        }}
      >
        <Ionicons name="search-outline" color="black" size={24} />
        <TextInput
          ref={searchInputRef}
          accessibilityLabel="Text input field"
          placeholder="Dosya ara"
          className="text-base text-black ml-2 w-[80%] leading-5"
          placeholderTextColor={"#000"}
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
          }}
        />
      </Pressable>

      {/* Filter Options */}
      <View className="flex-row items-center w-full justify-between my-4">
        {filterButtonData.map((item, index) => (
          <FilterButton
            key={index}
            title={item.title}
            active={activeKey === item.key}
            onPress={() => {
              setActiveKey(item.key);
            }}
            className="w-[32%]"
          />
        ))}
      </View>

      {/* File List */}

      <FlatList
        data={filteredFiles}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FileItem file={item} />}
      />

      <View className="absolute bottom-5 right-5">
        <TouchableOpacity
          accessibilityRole="button"
          className="px-4 py-2 bg-primary rounded-full flex-row items-center"
          onPress={() => {
            resetInput();
            navigation.navigate("FileStack", {
              screen: "Detail",
              params: {
                initialRouteName: "Info",
              },
            });
          }}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text className="text-white ml-1">Add File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
