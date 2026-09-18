export const DEFAULT_LANGUAGE = 'zh';

export const LANGUAGES = ['zh', 'en'];

export const LANGUAGE_NAMES = { zh: '中文', en: 'English' };

export function isSupportedLanguage(value) {
  return LANGUAGES.includes(value);
}
