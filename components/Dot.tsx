import { StyleSheet } from "react-native";
import React, { FC } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type DotProps = {
  activeDotIndex: Animated.SharedValue<number>;
  index: number;
};

const Dot: FC<DotProps> = ({ activeDotIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: withTiming(isActive ? "black" : "white", {
        duration: 150,
      }),
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]}></Animated.View>;
};

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Dot;
