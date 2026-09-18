import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { usePathname, useRouter } from 'expo-router';

const TAB_NAMES = ['home', 'profile'];
const SWIPE_DISTANCE = 48;

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
