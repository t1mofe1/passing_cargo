import useAuth from '@/hooks/useAuth';
import useScreens from '@/hooks/useScreens';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function useAuthenticatedScreen() {
  const { loginState } = useAuth();

  const { navigation } = useScreens();

  useFocusEffect(
    useCallback(() => {
      if (loginState === 'not-logged-in') navigation.openAsNew('Auth');
    }, [loginState, navigation]),
  );
}
