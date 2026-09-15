import { router, Tabs, useSegments } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/header';
import TabBar from '../../components/tab-bar';
import { colors } from '../../constants/theme';
import { getTranslations } from '../../state/translations';
import { useLanguage } from '../../state/language-context';

export default function TabLayout() {
  const segments = useSegments();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const title = segments[1] === 'profile' ? t.tabProfile : t.tabHome;

  return (
    <View style={styles.layout}>
      {/* 顶部栏放在导航器外面：切换页面时它保持不动，页面在下方滑动 */}
      <Header
        title={title}
        logo={require('../../assets/lifespan-logo-white.png')}
        onSettingsPress={() => router.push('/settings')}
      />
      <Tabs
        screenOptions={{ headerShown: false, animation: 'none' }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="home" options={{ title: t.tabHome }} />
        <Tabs.Screen name="profile" options={{ title: t.tabProfile }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: { flex: 1, backgroundColor: colors.bg },
});
