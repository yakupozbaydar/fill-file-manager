import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tw } from "@/utils/tw";
import { File } from "@/store/useFileStore";

type Props = {
  file: File;
} & TouchableOpacityProps;

export const FileItem = ({ file, ...rest }: Props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
          <View className="flex-row items-center">
            <StatusBubble status={file.status} />
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                setDropdownVisible(!dropdownVisible);
              }}
              className="p-2 bg-primary/40 rounded-full ml-2"
            >
              <Ionicons name="ellipsis-vertical" size={20} />
            </TouchableOpacity>
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
