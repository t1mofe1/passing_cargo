import useAuth from '@/hooks/useAuth';
import useScreens from '@/hooks/useScreens';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function AuthScreen() {
  const { loginState, loginWithFakeProvider } = useAuth();

  const { navigation } = useScreens();

  // #region if user is logged in, redirect to home
  useFocusEffect(
    useCallback(() => {
      if (loginState === 'logged-in') navigation.openAsNew('Home');
    }, [loginState, navigation]),
  );
  // #endregion if user is logged in, redirect to home

  useEffect(() => {
    loginState === 'not-logged-in' && loginWithFakeProvider();
  }, [loginState, loginWithFakeProvider]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Text>Auth Screen</Text>
      {loginState === 'logging-in' ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Button
          title={`Login with Fake Provider`}
          onPress={loginWithFakeProvider}
        />
      )}
    </View>
  );
}
