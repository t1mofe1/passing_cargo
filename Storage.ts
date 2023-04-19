import { differenceShow, findDifference } from '@/utils/difference';
import { FakeUser } from '@/utils/fakeUser';
import createStore from 'teaful';

type SavedLocationType = 'home' | 'work' | 'other' | 'recent';
type SavedLocations = {
  [key in SavedLocationType]: string[];
};

type Storage = {
  firstInit: boolean;

  driverMode: boolean;

  user: FakeUser | null;

  savedLocations: SavedLocations;

  storageChanges: Partial<Storage>[];
};
export const initialStorage: Storage = {
  firstInit: true,

  driverMode: false,

  user: null,

  savedLocations: {
    home: [],
    work: [],
    other: [],
    recent: [],
  } as SavedLocations,

  storageChanges: [],
};

export const { useStore, getStore, setStore, withStore } = createStore(
  initialStorage,
  // TODO: implement storage changes history
);
