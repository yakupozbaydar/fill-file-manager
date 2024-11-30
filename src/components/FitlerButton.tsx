import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { tw } from "@/utils/tw";

type Props = {
  title: string;
  active: boolean;
} & TouchableOpacityProps;

export const FitlerButton = ({ active, title, ...rest }: Props) => {
  const containerClassName = [
    tw`px-8 py-2 rounded-full items-center justify-center`,
    active ? tw`bg-geekBlue` : tw`bg-[#E8E8E8]`,
  ].join(" ");

  const textClassName = active ? tw`text-primary` : tw`text-gray-800`;

  return (
    <TouchableOpacity {...rest} className={containerClassName}>
      <Text className={textClassName}>{title}</Text>
    </TouchableOpacity>
  );
};
