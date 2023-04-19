import { BottomNavbar } from '@/components/BottomNavbar';
import useAuth from '@/hooks/useAuth';
import useScreens from '@/hooks/useScreens';
import {
  Package,
  PackageStatusColor,
  PackageStatusIcon,
  PackageStatusMessage,
} from '@/utils/fakePackage';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export default function DeliveriesScreen() {
  const { user } = useAuth();

  const deliveries = user?.deliveries || [];

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#aaa', paddingTop: 50 }}>
        {deliveries.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: 'white' }}>No deliveries yet</Text>
          </View>
        ) : (
          <>
            {deliveries.map((delivery) => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </>
        )}
      </View>

      <BottomNavbar />
    </>
  );
}

type DeliveryCardProps = {
  delivery: Package;
};
function DeliveryCard({ delivery }: DeliveryCardProps) {
  const { navigation } = useScreens();

  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        borderRadius: 10,

        padding: 10,

        marginHorizontal: 20,
        marginVertical: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.open('Delivery', { deliveryId: delivery.id });
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            borderRadius: 10,

            backgroundColor: '#111',

            width: 50,
            aspectRatio: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome5
            name={PackageStatusIcon[delivery.status]}
            size={20}
            color={PackageStatusColor[delivery.status]}
          />
        </View>
        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text>
            {delivery.item} ({delivery.category}) x{delivery.count}
          </Text>
          <Text>{PackageStatusMessage[delivery.status]}</Text>
        </View>
      </View>
    </Pressable>
  );
}
