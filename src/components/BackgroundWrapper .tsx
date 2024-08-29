import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '../hooks/useThemeColor';

const BackgroundWrapper = ({ children }: any) => {
  const primary = useThemeColor('primary');
  const background = useThemeColor('background');

  return (
    <LinearGradient
      colors={[primary, background]}
      style={{flex: 1}}
    >
      {children}
    </LinearGradient>
  );
};

export default BackgroundWrapper;
