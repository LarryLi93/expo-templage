import { useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import Header from '../components/header';
import { colors } from '../constants/theme';
import { PRIVACY_URL, TERMS_URL } from '../constants/links';
import { LANGUAGES, LANGUAGE_NAMES } from '../constants/language';
import { getTranslations } from '../state/translations';
import { useLanguage } from '../state/language-context';
import { useOnboarding } from '../state/onboarding-context';
import { navigateBackOrReplace } from '../utils/navigation';

export default function SettingsScreen() {
  const { reset } = useOnboarding();
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);
  const [confirming, setConfirming] = useState(false);

  const clearCache = async () => {
    setConfirming(false);
    await reset();
    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <Header title={t.settings} onBack={() => navigateBackOrReplace(router, '/home')} />
      <View style={styles.content}>
        <Text style={styles.section}>{t.sectionGeneral}</Text>
        <View style={styles.card}>
          <View style={styles.copy}>
            <Text style={styles.rowTitle}>{t.language}</Text>
            <Text style={styles.description}>{t.languageDesc}</Text>
          </View>
          <View style={styles.options}>
            {LANGUAGES.map((value) => (
              <Pressable
                key={value}
                onPress={() => setLanguage(value)}
                style={[styles.option, language === value && styles.optionActive]}
              >
                <Text style={[styles.optionText, language === value && styles.optionTextActive]}>
                  {LANGUAGE_NAMES[value]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={styles.section}>{t.sectionData}</Text>
        <SettingRow
          icon="trash-can-outline"
          title={t.clearCache}
          description={t.clearCacheDesc}
          onPress={() => setConfirming(true)}
        />

        <Text style={styles.section}>{t.sectionAbout}</Text>
        <SettingRow
          icon="file-document-outline"
          title={t.privacy}
          description={t.privacyPolicyDesc}
          onPress={() => Linking.openURL(PRIVACY_URL)}
        />
        <SettingRow
          icon="file-document-outline"
          title={t.terms}
          description={t.termsOfUseDesc}
          onPress={() => Linking.openURL(TERMS_URL)}
        />
      </View>

      <Modal
        visible={confirming}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirming(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>{t.clearDialogTitle}</Text>
            <Text style={styles.description}>{t.clearDialogBody}</Text>
            <View style={styles.actions}>
              <Pressable style={styles.action} onPress={() => setConfirming(false)}>
                <Text style={styles.actionText}>{t.cancel}</Text>
              </Pressable>
              <Pressable style={styles.action} onPress={clearCache}>
                <Text style={styles.danger}>{t.confirmClear}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SettingRow({ icon, title, description, onPress }) {
  return (
    <Pressable accessibilityRole="button" style={styles.card} onPress={onPress}>
      <View style={styles.copy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialCommunityIcons name={icon} size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, gap: 12 },
  section: { color: colors.muted, fontSize: 13, lineHeight: 16, fontWeight: '600', marginTop: 4 },
  card: {
    minHeight: 76,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  copy: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: 16, lineHeight: 20, fontWeight: '700' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  options: { flexDirection: 'row', gap: 6 },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: { backgroundColor: '#29451f' },
  optionText: { color: colors.muted, fontSize: 12, lineHeight: 16, fontWeight: '700' },
  optionTextActive: { color: colors.accent },
  backdrop: {
    flex: 1,
    backgroundColor: '#0009',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: { width: '100%', padding: 20, borderRadius: 12, backgroundColor: colors.panel, gap: 12 },
  dialogTitle: { color: colors.text, fontSize: 18, lineHeight: 24, fontWeight: '800' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  action: {
    minHeight: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  actionText: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  danger: { color: '#ef5b5b', fontSize: 14, lineHeight: 20, fontWeight: '800' },
});
