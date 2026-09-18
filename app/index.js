import { router } from 'expo-router';
import Carousel from '../components/carousel';
import { useOnboarding } from '../state/onboarding-context';

export default function IndexScreen() {
  const { complete } = useOnboarding();

  const finish = async () => {
    await complete();
    router.replace('/home');
  };

  return <Carousel onFinish={finish} />;
}
