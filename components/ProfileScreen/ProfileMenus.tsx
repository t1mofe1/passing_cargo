import { useStore } from '@/Storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';

const ProfileMenu = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  padding: 0 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  background-color: #1c1c1c;
`;

const ProfileMenuText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;
`;

const ProfileMenuIcon = styled(FontAwesome5)`
  width: 28px;
  font-size: 22px;
  color: #fff;
  text-align: center;
`;

type ProfileMenuMode = 'default' | 'driver' | 'both';

type ProfileMenuProps = {
  text: string;
  icon: string;
  mode: ProfileMenuMode;
};

export function ProfileMenus() {
  const [driverMode] = useStore.driverMode();

  const menus: ProfileMenuProps[] = [
    {
      text: 'Earnings',
      icon: 'money-bill-wave',
      mode: 'driver',
    },
    {
      text: 'Invite Friends',
      icon: 'user-friends',
      mode: 'both',
    },
    {
      text: 'Preferences',
      icon: 'cogs',
      mode: 'both',
    },
    {
      text: 'Help',
      icon: 'question-circle',
      mode: 'both',
    },
  ];

  return (
    <FlatList
      data={menus.filter(
        (menu) =>
          // If the menu is for both driver and default mode, or if the menu is for the current mode
          !(menu.mode === 'driver' && !driverMode) &&
          !(menu.mode === 'default' && driverMode),
      )}
      renderItem={({ item }) => (
        <ProfileMenu>
          <ProfileMenuIcon key={item.icon} name={item.icon} />
          <ProfileMenuText>{item.text}</ProfileMenuText>
        </ProfileMenu>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: '#262626' }} />
      )}
      style={{
        marginTop: 20,
      }}
    />
  );
}
