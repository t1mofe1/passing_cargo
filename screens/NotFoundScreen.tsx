import { Text } from '@/components/Utils/ThemedNativeElements';
import useScreens from '@/hooks/useScreens';
import { TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  const { navigation, route } = useScreens();

  console.log({ route });

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 100,
          }}
        >
          Oops! Seems like you've got in an unknown place..
        </Text>
        <TouchableOpacity
          onPress={() => navigation.open('Home')}
          style={{
            marginTop: 50,
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 5,
            backgroundColor: '#1c1c1c',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#2e78b7',
            }}
          >
            Go to home
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 50,
          }}
        >
          For debug: {'\n\n'}
          {JSON.stringify(route, null, 2)}
        </Text>
      </View>
    </>
  );
}
