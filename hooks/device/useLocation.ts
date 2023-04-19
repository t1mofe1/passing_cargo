import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObjectCoords>();
  const [error, setError] = useState<string>();
  const locationCacheTimer = useRef<ReturnType<typeof setTimeout>>();

  // #region location permission
  const askPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    const permission = status === 'granted';

    return permission;
  }, []);
  // #endregion location permission

  // #region location subscription
  useEffect(() => {
    let sub: Location.LocationSubscription | undefined;

    const getLocationSubscription = async () => {
      if (!(await askPermission())) {
        return setError('Location permission not granted');
      }

      const sub = await Location.watchPositionAsync({}, ({ coords }) => {
        // #region location cache
        clearTimeout(locationCacheTimer.current);
        locationCacheTimer.current = setTimeout(
          () => setLocation(undefined),
          10000,
        ) as unknown as NodeJS.Timeout;
        // #endregion location cache

        setLocation(coords);
      });

      return sub;
    };

    getLocationSubscription();

    return () => sub?.remove();
  }, []);
  // #endregion location subscription

  // #region get location
  const getLocation = useCallback(async () => {
    if (location) return location;

    if (!(await askPermission())) {
      return setError('Location permission not granted');
    }

    const lastPos = await Location.getLastKnownPositionAsync();

    setLocation(lastPos?.coords);

    return lastPos?.coords;
  }, [askPermission, location]);
  // #endregion get location

  return {
    lastLocation: location,

    error,

    getLocation,
    askPermission,
  };
}
