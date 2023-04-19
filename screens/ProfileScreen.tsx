import { BottomNavbar } from '@/components/BottomNavbar';
import {
  Container1,
  ProfileInfoContainer,
  ProfileName,
  ProfilePicture,
  ProfileSubText,
} from '@/components/ProfileScreen';
import { DriverModeSwitch } from '@/components/ProfileScreen/DriverModeSwitch';
import { ProfileMenus } from '@/components/ProfileScreen/ProfileMenus';
import useAuth from '@/hooks/useAuth';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <>
      <View
        style={{ backgroundColor: '#0d0d0d', flex: 1, flexDirection: 'column' }}
      >
        <Container1>
          <ProfilePicture source={{ uri: user?.avatar! }} />

          <ProfileInfoContainer>
            <ProfileName>
              {user?.first_name} {user?.last_name}
            </ProfileName>
            <ProfileSubText>ID: {user?.id}</ProfileSubText>
          </ProfileInfoContainer>
        </Container1>
        <DriverModeSwitch />
        <ProfileMenus />
      </View>

      <BottomNavbar />
    </>
  );
}
