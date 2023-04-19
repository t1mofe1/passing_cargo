import styled from 'styled-components/native';

export const Container1 = styled.View`
  height: 175px;
  width: 100%;

  padding: 20px;

  background-color: rgb(60, 59, 68);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ProfilePicture = styled.Image`
  height: 75px;
  aspect-ratio: 1;

  margin-top: 10px;

  border-radius: 75px;
`;

export const ProfileInfoContainer = styled.View`
  display: flex;
  flex-direction: column;

  margin-left: 20px;
`;

export const ProfileName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 5px;
`;

export const ProfileSubText = styled.Text`
  font-size: 12px;
  color: #a5a3a3;
`;
