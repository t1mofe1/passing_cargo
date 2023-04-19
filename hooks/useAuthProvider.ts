import { useStore } from '@/Storage';
import { FakeUser, fetchFakeUser } from '@/utils/fakeUser';

export default function useAuthProvider(provider: string) {
  const [user, setUser] = useStore.user();

  const login = async () => {
    // const isSuccessedResult = Math.random() * 1 >= 0.5;
    const isSuccessedResult = true;

    const userData = isSuccessedResult ? await fetchFakeUser() : undefined;

    const errorResult = {
      type: 'error' as const,
      error: new Error(`Some error occured!`),
      data: undefined,
    };
    const successResult = {
      type: 'success' as const,
      data: userData,
      error: undefined,
    };

    const result: {
      type: 'error' | 'success';
      data?: FakeUser;
      error?: Error;
    } = isSuccessedResult ? successResult : errorResult;

    if (result.type === 'success') {
      setUser(result.data);
    }

    return result;
  };

  return { login, provider };
}
