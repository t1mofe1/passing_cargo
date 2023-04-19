import MyLocationButton from '@/components/Map/MyLocationButton';
import { useLocation } from '@/hooks/device/useLocation';
import useTheme from '@/hooks/useTheme';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Dimensions, View } from 'react-native';
import MapView, {
  Details,
  MapStyleElement,
  Region,
  UserLocationChangeEvent,
} from 'react-native-maps';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type PosState = {
  latitude: number;
  longitude: number;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// TALLINN CENTER
const DEFAULT_LOCATION = {
  latitude: 59.436962,
  longitude: 24.753574,
};

type MapProps = {
  menuProgress: Animated.SharedValue<number>;
};
export function Map({ menuProgress }: MapProps) {
  const map = useRef<MapView>();

  // #region styling
  const {
    colors: { primary: primaryColor },
    theme,
  } = useTheme();

  const mapStyles = useMemo(() => {
    const _styles: MapStyleElement[] = [
      // {
      //   featureType: 'transit',
      //   stylers: [{ visibility: 'off' }],
      // },
    ];

    if (theme === 'dark') {
      _styles.push(
        // #region all
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36,
              color: '#000000',
              lightness: 40,
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on',
              color: '#000000',
              lightness: 16,
            },
          ],
        },
        // {
        //   featureType: 'all',
        //   elementType: 'labels.icon',
        //   stylers: [{ visibility: 'off' }],
        // },
        // #endregion all

        // #region administartive
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#000000',
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#000000',
              lightness: 17,
              weight: 1.2,
            },
          ],
        },
        {
          featureType: 'administrative.province',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#e0a64b' }],
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d1b995' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#e0a64b' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#0e0d0a' }],
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d1b995' }],
        },
        // #endregion administartive

        // #region landscape
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
              lightness: 20,
            },
          ],
        },
        // #endregion landscape

        // #region poi
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
              lightness: 25,
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9b7d51' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#0e0d0a',
              lightness: 5,
            },
          ],
        },
        // #endregion poi

        // #region roads
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [{ color: '#ffaa00' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#12120f' }],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
              lightness: 18,
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.fill',
          stylers: [{ color: '#575757' }],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#2c2c2c' }],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
              lightness: 16,
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#999999' }],
        },
        // #endregion roads

        // #region transit
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
              lightness: 19,
            },
          ],
        },
        // #endregion transit

        // #region water
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#080808',
              gamma: '3.14',
              weight: '1.07',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffaa00' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#080808' }],
        },
        // #endregion water
      );
    }

    return _styles;
  }, [primaryColor, theme]);
  // #endregion styling

  // #region error handling
  const { error, getLocation, lastLocation } = useLocation();
  useEffect(() => {
    error && Alert.alert('Error', error);
  }, [error]);
  // #endregion error handling

  const [currentMapPos, setCurrentMapPos] = useState<PosState>(
    lastLocation || DEFAULT_LOCATION,
  );
  const [userMapPos, setUserMapPos] = useState<PosState>();

  // #region map events
  const onMapMoveOrMoveCompleted = async (
    region: Region,
    { isGesture }: Details,
  ) => {
    if (!isGesture) return;

    setUserMapPos({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const onUserLocationChange = ({
    nativeEvent: { coordinate },
  }: UserLocationChangeEvent) => {
    if (!coordinate) return;

    setCurrentMapPos({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    if (userMapPos) return;

    map.current?.animateCamera({
      center: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      zoom: 15,
    });
  };
  // #endregion map events

  return (
    <Animated.View
      style={[
        {
          backgroundColor: primaryColor,

          justifyContent: 'center',
          alignContent: 'center',

          width: '100%',
          height: SCREEN_HEIGHT - 240,
        },
        useAnimatedStyle(
          () => ({
            opacity: interpolate(menuProgress.value, [0, 1], [1, 0.25]),
          }),
          [menuProgress.value],
        ),
      ]}
    >
      <MapView
        // @ts-ignore
        ref={map}
        style={{ flex: 1 }}
        provider='google'
        onRegionChange={onMapMoveOrMoveCompleted}
        onRegionChangeComplete={onMapMoveOrMoveCompleted}
        onUserLocationChange={onUserLocationChange}
        showsUserLocation
        showsMyLocationButton={false}
        initialCamera={{
          center: currentMapPos,
          heading: 0,
          pitch: 0,
          zoom: 15,
        }}
        minZoomLevel={7}
        maxZoomLevel={18}
        pitchEnabled={false}
        loadingEnabled
        loadingBackgroundColor={'#111'}
        loadingIndicatorColor={primaryColor}
        mapPadding={{ left: 5, right: 5, top: 10, bottom: 10 }}
        showsCompass={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        rotateEnabled={false}
        customMapStyle={mapStyles}
      ></MapView>
      <MyLocationButton
        onPress={async () => {
          const location = currentMapPos || (await getLocation());

          if (!location || !map.current) return;

          setUserMapPos(undefined);

          map.current.animateCamera({
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            zoom: 15,
          });
        }}
        hide={!userMapPos}
      />
    </Animated.View>
  );
}
