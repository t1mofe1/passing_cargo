import { Text } from '@/components/Utils/ThemedNativeElements';
import { useStore } from '@/Storage';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const DriverModeSwitchContainer = styled.View`
  height: 50px;

  background-color: rgb(28, 28, 28);

  border-radius: 7.5px;

  margin-top: -25px;

  margin-left: 20px;
  margin-right: 20px;

  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DriverModeSwitchBtn = styled.Switch`
  /* transform: scale(1.2); */
`;

const DriverModeSwitchLabel = styled(Text)`
  font-weight: bold;
  color: #fff;
`;

export function DriverModeSwitch() {
  const [driverMode, setDriverMode] = useStore.driverMode();

  const changeDriverMode = async () => {
    if (driverMode === true) {
      setDriverMode(false);
    } else {
      setDriverMode(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setDriverMode(false);
      Alert.alert('Driver mode', 'Driver mode is not yet available.');
    }
  };

  return (
    <DriverModeSwitchContainer>
      <DriverModeSwitchLabel>Driver mode</DriverModeSwitchLabel>
      <DriverModeSwitchBtn
        value={driverMode}
        onValueChange={changeDriverMode}
      />
    </DriverModeSwitchContainer>
  );
}
