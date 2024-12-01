import React, { memo } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import * as Haptics from "expo-haptics";
import { tw } from "@/utils/tw";

type Props = {
  title?: string;
  theme?: "primary" | "secondary";
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  vertical?: boolean;
  textClassName?: string;
  loading?: boolean;
} & TouchableOpacityProps;

const buttonVariants = {
  primary: tw`bg-primary rounded-lg`,
  secondary: tw`bg-black/20 rounded-lg`,
  disabled: tw`bg-white/10 opacity-20`,
};

const _Button = ({
  title,
  disabled,
  rightElement,
  leftElement,
  textClassName,
  theme = "primary",
  onPress,
  loading,
  children,
  ...rest
}: Props) => {
  const containerClassNames = [
    tw`p-4 rounded-lg flex-row items-center justify-center`,
    buttonVariants[theme],
    leftElement && tw`justify-between`,
    disabled && buttonVariants.disabled,
  ].join(" ");

  const textClassNames = [
    tw`text-white text-lg text-center font-inter-medium`,
    disabled && tw`text-white opacity-50`,
    textClassName,
  ].join(" ");

  const onClick: TouchableOpacityProps["onPress"] = (e) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      className={containerClassNames}
      disabled={disabled}
      onPress={onClick}
      {...rest}
    >
      {children || (
        <>
          <View className="w-10">{leftElement}</View>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className={textClassNames}>{title}</Text>
          )}
          <View className="w-10">{rightElement}</View>
        </>
      )}
    </TouchableOpacity>
  );
};

export const Button = memo(_Button);
