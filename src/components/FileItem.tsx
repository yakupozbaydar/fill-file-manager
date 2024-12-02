import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import analytics from "@react-native-firebase/analytics";
import { tw } from "@/utils/tw";
import { File, useFileStore } from "@/store/useFileStore";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { rs } from "@/utils/screen";
import { FIREBASE_EVENTS } from "@/constant/analytics";

type Props = {
  file: File;
} & TouchableOpacityProps;

const useDropdownItems = (currentItem: File) => {
  const navigation = useAppNavigation();
  const { updateFile, setFileInput } = useFileStore();

  return [
    {
      label: "Go to Detail",
      onPress: () => {
        setFileInput(currentItem);
        navigation.navigate("FileStack", {
          screen: "Detail",
          params: { initialRouteName: "Info" },
        });
      },
    },
    {
      label: currentItem.status === "closed" ? "Open File" : "Close File",
      onPress: () => {
        if (currentItem.status === "closed") {
          updateFile({
            ...currentItem,
            status: "open",
          });
          void analytics().logEvent(FIREBASE_EVENTS.FILE_OPENED, {
            file_name: currentItem.fileName,
          });
        } else {
          updateFile({
            ...currentItem,
            status: "closed",
          });

          void analytics().logEvent(FIREBASE_EVENTS.FILE_CLOSED, {
            file_name: currentItem.fileName,
          });
        }
      },
    },
    {
      label: "Go to Tab A",
      onPress: () => {
        setFileInput(currentItem);
        navigation.navigate("FileStack", {
          screen: "Detail",
          params: { initialRouteName: "TabA" },
        });
      },
    },
    {
      label: "Go to Tab B",
      onPress: () => {
        setFileInput(currentItem);
        navigation.navigate("FileStack", {
          screen: "Detail",
          params: { initialRouteName: "TabB" },
        });
      },
    },
  ];
};

export const FileItem = ({ file, ...rest }: Props) => {
  const data = useDropdownItems(file);

  const containerClassName = [
    tw`mb-4 p-4 border-[1px] rounded-xl`,
    file.status === "open"
      ? tw`border-primary bg-primary/10`
      : tw`border-black/10`,
  ].join(" ");

  return (
    <View className={containerClassName} {...rest}>
      <View className="mb-2">
        <View className="flex-row justify-between">
          <Text className="text-base font-bold w-[60%]" numberOfLines={1}>
            {file.fileName}
          </Text>

          {/* Just a tricky usage of Dropdown component
          I have to declare that I think dropdown is not a good practice in mobile */}
          <View className="flex-row items-center">
            <Dropdown
              data={data}
              onFocus={() => {}}
              onChange={(item) => {
                item.onPress();
              }}
              placeholderStyle={{
                display: "none",
              }}
              renderRightIcon={() => (
                <Ionicons name="ellipsis-vertical" size={24} />
              )}
              labelField={"label"}
              valueField={"onPress"}
              style={styles.dropdown}
              containerStyle={styles.container}
            />
            <StatusBubble status={file.status} />
          </View>
        </View>
        <Text>
          <Text className="text-sm text-gray-500">{file.number}</Text>•
          <Text className="text-sm text-gray-500">{file.description}</Text>
        </Text>
      </View>
      <View>
        <View className="flex-row">
          <Text className="text-base w-[75%]" numberOfLines={1}>
            {file.date}
          </Text>
        </View>
        <Text className="text-sm text-gray-500">{file.fileType}</Text>
      </View>
    </View>
  );
};

export const StatusBubble = ({ status }: { status: File["status"] }) => {
  const containerClassName = [
    tw`px-2 py-1 rounded-full border-[1px] ml-1`,
    status === "closed"
      ? tw`bg-transparent border-danger/80`
      : tw`bg-blue-700 border-blue-700`,
  ].join(" ");

  const textClassName = [
    tw`text-white text-xs font-bold`,
    status === "closed" ? tw`text-danger/80` : tw`text-white`,
  ].join(" ");
  return (
    <View className={containerClassName}>
      <Text className={textClassName}>
        {status === "closed" ? "Closed" : "Open"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: rs(60),
    alignItems: "flex-end",
  },
  container: { width: rs(150) },
});
