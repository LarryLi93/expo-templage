import { StyleSheet, Text, View } from 'react-native';
import TabSwipe from '../../components/tab-swipe';
import { colors } from '../../constants/theme';
import { getTranslations } from '../../state/translations';
import { useLanguage } from '../../state/language-context';

export default function ProfileScreen() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  return (
    <TabSwipe>
      <View style={styles.screen}>
        <Text style={styles.text}>{t.tabProfile}</Text>
      </View>
    </TabSwipe>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  text: { color: colors.text, fontSize: 34, lineHeight: 42, fontWeight: '700' },
});
