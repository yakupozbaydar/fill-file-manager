import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { tw } from "@/utils/tw";
import { colors } from "@/style/colors";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  title: string;
  active: boolean;
} & TouchableOpacityProps;

export const FilterButton = ({ active, title, ...rest }: Props) => {
  const containerClassName = [
    tw`px-8 py-2 rounded-xl border-[1px] items-center justify-center`,
    rest.className,
  ]
    .filter(Boolean)
    .join(" ");

  const activeShared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        activeShared.value,
        [0, 1],
        ["transparent", colors.primary],
      ),
      borderColor: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.primary, colors.geekBlue],
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        activeShared.value,
        [0, 1],
        [colors.primary, colors.light],
      ),
    };
  });

  useEffect(() => {
    activeShared.value = active ? withTiming(1) : withTiming(0);
  }, [active, activeShared]);

  return (
    <AnimatedTouchableOpacity
      {...rest}
      className={containerClassName}
      style={[animatedStyle, rest.style]}
    >
      <Animated.Text style={animatedTextStyle}>{title}</Animated.Text>
    </AnimatedTouchableOpacity>
  );
};
