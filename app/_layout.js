import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingProvider, useOnboarding } from '../state/onboarding-context';
import { LanguageProvider } from '../state/language-context';
import { colors } from '../constants/theme';

function RootNavigator() {
  const { hydrated, completed } = useOnboarding();
  if (!hydrated) return null;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <Stack.Protected guard={!completed}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={completed}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <LanguageProvider>
          <OnboardingProvider>
            <RootNavigator />
          </OnboardingProvider>
        </LanguageProvider>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
