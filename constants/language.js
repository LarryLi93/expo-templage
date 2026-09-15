// 默认中文；用户显式选择的语言在 LanguageProvider 启动时恢复
export const DEFAULT_LANGUAGE = 'zh';

export const LANGUAGES = ['zh', 'en'];

// 语言显示名（设置页语言选择器用）
export const LANGUAGE_NAMES = { zh: '中文', en: 'English' };

export function isSupportedLanguage(value) {
  return LANGUAGES.includes(value);
}
