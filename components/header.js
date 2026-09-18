import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '../constants/theme';

export default function Header({ title, onBack, onSettingsPress, logo }) {
  const insets = useSafeAreaInsets();

  const left = onBack ? (
    <Pressable style={styles.side} onPress={onBack} hitSlop={8}>
      <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
    </Pressable>
  ) : logo ? (
    <View style={styles.side}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  ) : (
    <View style={styles.side} />
  );

  const right = onSettingsPress ? (
    <Pressable style={styles.side} onPress={onSettingsPress} hitSlop={8}>
      <MaterialCommunityIcons name="cog-outline" size={24} color={colors.text} />
    </Pressable>
  ) : (
    <View style={styles.side} />
  );

  return (
    <View style={[styles.header, { height: insets.top + layout.headerHeight, paddingTop: insets.top }]}>
      {left}
      <Text style={styles.title}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.bg,
  },
  side: { width: 44, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 34, height: 34 },
  title: { flex: 1, textAlign: 'center', color: colors.text, fontSize: 17, lineHeight: 22, fontWeight: '700' },
});
