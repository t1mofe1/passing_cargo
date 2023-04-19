import { NavigateBackButton } from '@/components/NavigateBackButton';
import { Text } from '@/components/Utils/ThemedNativeElements';
import { useDelivery } from '@/hooks/api/useDelivery';
import { useLanguage } from '@/hooks/useLanguage';
import useScreens from '@/hooks/useScreens';
import useTheme from '@/hooks/useTheme';
import { Package, PackageStatus } from '@/utils/fakePackage';
import Intl from 'intl';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DeliveryProps = {
  delivery: Package;
};

export default function DeliveryScreen() {
  const {
    route: {
      params: { deliveryId },
    },
  } = useScreens<'Delivery'>();

  const delivery = useDelivery(deliveryId);

  if (!delivery) return <DeliveryNotFoundScreen />;

  if (
    [PackageStatus.Delivered, PackageStatus.Confirmed].includes(delivery.status)
  ) {
    return <DeliveredScreen delivery={delivery} />;
  } else if (
    [PackageStatus.Waiting, PackageStatus.Delivering].includes(delivery.status)
  ) {
    return <DeliveringScreen delivery={delivery} />;
  } else {
    return null;
  }
}

function DeliveredScreen({ delivery }: DeliveryProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
    >
      <DeliveryHeader delivery={delivery} />

      <DeliveryDetails delivery={delivery} />
    </View>
  );
}

const formatDeliveryTime = (time: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',

    hour: 'numeric',
    minute: 'numeric',
  }).format(time);
};

function DeliveryDetails({ delivery }: DeliveryProps) {
  const { colors } = useTheme();
  const language = useLanguage();

  const statusText = [
    delivery.status === PackageStatus.Confirmed ? 'Confirmed' : 'Delivered',
    formatDeliveryTime(
      delivery.status === PackageStatus.Confirmed
        ? delivery.delivery_confirmed_at!
        : delivery.delivered_at!,
      language,
    ),
  ].join(' ');

  return (
    <View
      style={{
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          color: colors.text,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {statusText}
      </Text>
    </View>
  );
}

function DeliveryHeader({ delivery }: DeliveryProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: colors.background,

        paddingHorizontal: 10,
        paddingVertical: 15,

        position: 'relative',
      }}
    >
      <NavigateBackButton style={{ position: 'absolute', left: 10 }} />
      <Text
        style={{
          color: colors.text,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        Delivery #{delivery.id}
      </Text>
    </View>
  );
}

function DeliveringScreen({ delivery }: DeliveryProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        paddingTop: insets.top,
      }}
    >
      <Text>DeliveringScreen</Text>
      {/* <DeliveryHeader delivery={delivery} /> */}
    </View>
  );
}

function DeliveryNotFoundScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DeliveryNotFoundScreen</Text>
    </View>
  );
}
