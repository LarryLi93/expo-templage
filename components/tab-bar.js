import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '../constants/theme';

const ICONS = {
  home: { on: 'home', off: 'home-outline' },
  profile: { on: 'account', off: 'account-outline' },
};

export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.dock, { paddingBottom: insets.bottom + layout.tabBarGap }]}>
      <View style={styles.pill}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          const icon = ICONS[route.name] ?? ICONS.home;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              onPress={onPress}
              style={[styles.item, focused && styles.itemFocused]}
            >
              <MaterialCommunityIcons
                name={focused ? icon.on : icon.off}
                size={layout.tabBarIconSize}
                color={focused ? colors.text : colors.muted}
              />
              <Text style={[styles.label, focused && styles.labelFocused]}>
                {descriptors[route.key].options.title ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    alignItems: 'center',
  },
  pill: {
    height: layout.tabBarHeight,
    borderRadius: layout.tabBarHeight / 2,
    backgroundColor: colors.floatingBar,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  item: {
    width: layout.tabBarItemWidth,
    height: '100%',
    borderRadius: layout.tabBarHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemFocused: { backgroundColor: colors.floatingChip },
  label: { fontSize: layout.tabBarLabelSize, lineHeight: 14, color: colors.muted, fontWeight: '500' },
  labelFocused: { color: colors.text, fontWeight: '600' },
});
