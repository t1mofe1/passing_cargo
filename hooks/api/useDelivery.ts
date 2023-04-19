import { useStore } from '@/Storage';

export function useDelivery(deliveryId: string) {
  // TODO: implement api call

  const [user] = useStore.user();

  return user?.deliveries?.find((delivery) => delivery.id === deliveryId);
}
