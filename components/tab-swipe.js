import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { usePathname, useRouter } from 'expo-router';

// 与 app/(tabs)/_layout.js 中声明的页面顺序保持一致
const TAB_NAMES = ['home', 'profile'];
const SWIPE_DISTANCE = 48;

// 在页面内左右滑动，切换到相邻 Tab
export default function TabSwipe({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const index = TAB_NAMES.findIndex((name) => pathname.startsWith(`/${name}`));

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-16, 16])
    .failOffsetY([-16, 16])
    .onEnd(({ translationX }) => {
      if (index < 0 || Math.abs(translationX) < SWIPE_DISTANCE) return;
      const next = TAB_NAMES[index + (translationX < 0 ? 1 : -1)];
      if (next) router.navigate(`/${next}`);
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.area} collapsable={false}>
        {children}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1 },
});
