import { router } from 'expo-router';
import Carousel from '../components/carousel';
import { useOnboarding } from '../state/onboarding-context';

// 入口：轮播页。点击开始后先写持久化并翻转内存状态
// （根布局的路由守卫随之放开），再进入首页。
export default function IndexScreen() {
  const { complete } = useOnboarding();

  const finish = async () => {
    await complete();
    router.replace('/home');
  };

  return <Carousel onFinish={finish} />;
}
