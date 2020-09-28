import React from "react";
import styled from "styled-components";
import {TouchableOpacity, StatusBar} from "react-native";
import {Ionicons} from "@expo/vector-icons";

class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  isMounted = false;
  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
    this.isMounted = true;
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
    this.isMounted = true;
  }

  render() {
    const {navigation} = this.props;
    const section = navigation.getParam("section");
    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={{uri: section.image.url}} />
          <Wrapper>
            <Logo source={{uri: section.logo.url}} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={36}
              style={{marginTop: -2}}
              color="#4775f2"
            />
          </CloseView>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: #3c4560;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 350px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
