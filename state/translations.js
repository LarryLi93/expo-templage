import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/language';

// 模板全部页面的文案（轮播页、Tab、设置页等）
export const translations = {
  zh: {
    // Tab
    tabHome: '首页',
    tabProfile: '资料',
    settings: '设置',
    // 轮播页（按文件名称 01 打卡 → 02 资料 → 03 首页 → 04 模型的顺序）
    slide1Title: '每天进步一点点',
    slide1Body: '打卡运动、睡眠等习惯，让预测越来越准确',
    slide2Title: '从今天开始',
    slide2Body: '完善资料，几分钟内完成首次预测',
    slide3Title: '预测你的寿命',
    slide3Body: '填写资料，了解你的预期寿命与未来旅程',
    slide4Title: '了解影响寿命的因素',
    slide4Body: '基础因素与生活方式共同塑造你的未来',
    start: '开始使用',
    privacy: '隐私政策',
    terms: '使用条款',
    // 设置页
    sectionGeneral: '通用',
    sectionData: '数据',
    sectionAbout: '关于',
    language: '语言',
    languageDesc: '选择应用显示语言',
    clearCache: '清空缓存',
    clearCacheDesc: '删除已保存的资料和打卡数据',
    privacyPolicyDesc: '我们如何处理你的信息',
    termsOfUseDesc: '使用本应用的相关条款',
    clearDialogTitle: '确认清空缓存？',
    clearDialogBody: '这将删除所有资料和打卡记录，且无法恢复。',
    cancel: '取消',
    confirmClear: '确认清空',
  },
  en: {
    // Tab
    tabHome: 'Home',
    tabProfile: 'Profile',
    settings: 'Settings',
    // Carousel (by file name: 01 tracking → 02 profile → 03 home → 04 model)
    slide1Title: 'Improve day by day',
    slide1Body: 'Check in on exercise, sleep and habits to refine your prediction',
    slide2Title: 'Start today',
    slide2Body: 'Complete your profile and get your first prediction in minutes',
    slide3Title: 'Predict your lifespan',
    slide3Body: 'Input your details to discover your future lifespan and journey',
    slide4Title: 'What shapes it',
    slide4Body: 'Foundation and lifestyle factors combine to shape your future',
    start: "Let's start",
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    // Settings
    sectionGeneral: 'General',
    sectionData: 'Data',
    sectionAbout: 'About',
    language: 'Language',
    languageDesc: 'Choose the app display language',
    clearCache: 'Clear Cache',
    clearCacheDesc: 'Remove saved profile and check-in data.',
    privacyPolicyDesc: 'How we handle your information',
    termsOfUseDesc: 'Terms governing use of this app',
    clearDialogTitle: 'Clear cache?',
    clearDialogBody: 'This will delete all profile and check-in data. This cannot be undone.',
    cancel: 'Cancel',
    confirmClear: 'Clear',
  },
};

export function getTranslations(language) {
  return translations[isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE];
}
