import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_KEY } from '../constants/storage';

// 引导完成状态：内存中的 completed 与 AsyncStorage 保持同步。
// 点击「开始使用」时 complete() 写库并翻转内存状态，
// 根布局的路由守卫随之放开，才能进入首页（参考原 App 的做法）。
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

  // 清缓存：删除引导标记并翻转内存状态，路由守卫随之放回轮播页（参考原 App 的 clearProfile）
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
