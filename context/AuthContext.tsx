import useAuthProvider from '@/hooks/useAuthProvider';
import { FakeUser } from '@/utils/fakeUser';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';

type LoginState = 'not-logged-in' | 'logging-in' | 'logged-in';

type AuthContextProps = {
  loginState: LoginState;
  user?: FakeUser;

  // login: (username: string, password: string) => Promise<void>;
  loginWithFakeProvider: () => Promise<FakeUser | undefined>;
};

export const AuthContext = createContext<AuthContextProps>({
  loginState: 'not-logged-in',

  user: undefined,

  // login: async (username: string, password: string) => {},
  loginWithFakeProvider: async () => undefined,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loginState, setLoginState] = useState<LoginState>('not-logged-in');
  const [user, setUser] = useState<FakeUser>();

  // #region fake auth
  const fakeAuth = useAuthProvider('fake');
  const loginWithFakeProvider = useCallback(async () => {
    setLoginState('logging-in');

    const authentication = await fakeAuth.login();

    if (authentication.type === 'error') {
      console.warn(`Error while logging in: ${authentication.error}`);

      setLoginState('not-logged-in');
      setUser(undefined);

      return;
    }

    console.log(`Successfully logged in!`);
    console.log(JSON.stringify(authentication.data, null, 2));

    setLoginState('logged-in');
    setUser(authentication.data);

    return authentication.data;
  }, [fakeAuth]);
  // #endregion google auth

  return (
    <AuthContext.Provider
      value={{
        user,

        loginState,

        loginWithFakeProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
