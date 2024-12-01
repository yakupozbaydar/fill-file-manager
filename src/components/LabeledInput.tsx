import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { rhs } from "@/utils/screen";

type LabeledInputProps = {
  label: string;
  inputProps?: TextInputProps;
} & ViewProps;

const ACTIVE_TOP_PADDING = rhs(16);
const INACTIVE_TOP_PADDING = rhs(30);

export const LabeledInput = ({
  label,
  inputProps,
  ...rest
}: LabeledInputProps) => {
  const passwordFocused = useSharedValue(inputProps?.value ? true : false);

  const passwordStyle = useAnimatedStyle(() => {
    return {
      fontSize: passwordFocused.value ? withTiming(12) : withTiming(16),
      paddingTop: passwordFocused.value
        ? withTiming(ACTIVE_TOP_PADDING)
        : withTiming(INACTIVE_TOP_PADDING),
    };
  });

  return (
    <View className="py-2 rounded-lg" {...rest}>
      <Animated.Text
        className="text-black/30 absolute px-4 font-inter-medium"
        style={passwordStyle}
      >
        {label}
      </Animated.Text>

      <TextInput
        accessibilityLabel="Text input field"
        className="text-base text-black rounded-lg p-4 pt-6 leading-5 border-[1px] border-black/10"
        onFocus={() => (passwordFocused.value = true)}
        onBlur={() => {
          if (!inputProps?.value) {
            passwordFocused.value = false;
          }
        }}
        {...inputProps}
      />
    </View>
  );
};
