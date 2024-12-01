import { TextInputProps } from "react-native";
import { File } from "@/store/useFileStore";

type InputData = {
  inputKey: keyof File;
  label: string;
} & TextInputProps;

export const CREATE_FILE_INPUTS: InputData[] = [
  {
    inputKey: "fileName",
    label: "File Name",
    keyboardType: "default",
  },
  {
    inputKey: "description",
    label: "Description",
  },
  {
    inputKey: "number",
    label: "Number",
    keyboardType: "number-pad",
  },
];
