// 返回：能返回就返回；栈里没有上一页（如直接打开/刷新设置页）时，
// 用 replace 兜底跳回 fallback，避免 GO_BACK 无导航器处理报错（参考原 App 的做法）。
export function navigateBackOrReplace(router, fallback) {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  router.replace(fallback);
}
