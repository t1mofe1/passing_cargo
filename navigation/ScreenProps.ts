import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';

export type ScreenProps<S extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, S>;
