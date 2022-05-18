import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './RootStackParamList';

export type ScreenProps<S extends keyof RootStackParamList> = BottomTabScreenProps<RootStackParamList, S>;
