import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Dot from "./components/Dot";
import Page, { PAGE_WIDTH } from "./components/Page";
import { BACKGROUND_COLOR, PAGES } from "./constants";

export default function App() {
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        // scrollEnabled={false}
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page
            page={page}
            index={index}
            key={index.toString()}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={[styles.fillCenter, { flexDirection: "row" }]}>
          {PAGES.map((_, index) => (
            <Dot
              key={index.toString()}
              activeDotIndex={activeIndex}
              index={index}
            />
          ))}
        </View>
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    flexDirection: "row",
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500",
  },
});
