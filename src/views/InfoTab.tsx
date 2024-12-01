import { Alert, Switch, Text, View } from "react-native";
import React from "react";
import { LabeledInput } from "@/components/LabeledInput";
import { FilterButton } from "@/components/FilterButton";
import { Button } from "@/components/Button";
import { CREATE_FILE_INPUTS } from "@/constant/file";
import { useFileStore } from "@/store/useFileStore";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export const InfoTab = () => {
  const navigation = useAppNavigation();
  const { fileInput, setFileInputKey, updateFile, addFile, resetInput } =
    useFileStore();

  return (
    <View>
      <View className="border-[1px] border-black/10 rounded-xl mt-8 p-4 mx-4">
        {CREATE_FILE_INPUTS.map((input) => (
          <LabeledInput
            key={input.inputKey}
            label={input.label}
            inputProps={{
              value: fileInput?.[input.inputKey] ?? "",
              onChangeText: (text) => {
                setFileInputKey(input.inputKey, text);
              },
              ...input,
            }}
          />
        ))}

        <View className="mt-4">
          <Text className="text-black/60 font-inter-medium text-base">
            Select file type
          </Text>
          <View className="flex-row justify-around mt-4">
            <FilterButton
              title="X"
              active={fileInput?.fileType === "X"}
              className="w-[45%]"
              onPress={() => {
                setFileInputKey("fileType", "X");
              }}
            />
            <FilterButton
              title="Y"
              active={fileInput?.fileType === "Y"}
              className="w-[45%]"
              onPress={() => {
                setFileInputKey("fileType", "Y");
              }}
            />
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-black/60 font-inter-medium text-base">
            File status
          </Text>
          <Switch
            value={fileInput?.status === "open"}
            className="mt-4"
            onValueChange={(value) => {
              setFileInputKey("status", value ? "open" : "closed");
            }}
          />
        </View>
      </View>
      <View className="mt-4 self-center w-2/3 px-4">
        {fileInput?.id ? (
          <Button
            title="Update"
            onPress={() => {
              if (!fileInput.id || !fileInput.date) {
                Alert.alert("File ID is required");
                return;
              }

              if (!fileInput.fileName) {
                Alert.alert("File Name is required");
                return;
              }

              updateFile({
                id: fileInput.id,
                date: fileInput.date,

                fileName: fileInput.fileName,
                description: fileInput.description,
                number: fileInput.number,
                fileType: fileInput.fileType,
                status: fileInput.status,
              });
              resetInput();
              navigation.goBack();
            }}
          />
        ) : (
          <Button
            title="Create"
            onPress={() => {
              if (!fileInput) return;

              if (!fileInput.fileName) {
                Alert.alert("File Name is required");
                return;
              }

              addFile({
                fileName: fileInput.fileName,
                description: fileInput.description,
                number: fileInput.number,
                fileType: fileInput.fileType,
                status: fileInput.status,
              });
              resetInput();
              navigation.goBack();
            }}
          />
        )}
      </View>
    </View>
  );
};
