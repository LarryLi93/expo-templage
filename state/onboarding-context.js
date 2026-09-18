import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_KEY } from '../constants/storage';

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => setCompleted(value === '1'))
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  const complete = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    setCompleted(true);
  }, []);

  const reset = useCallback(async () => {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    setCompleted(false);
  }, []);

  return (
    <OnboardingContext.Provider value={{ hydrated, completed, complete, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const value = useContext(OnboardingContext);
  if (!value) throw new Error('useOnboarding must be used within OnboardingProvider');
  return value;
}
