import React from "react";
import styled from "styled-components";
import {Ionicons} from "@expo/vector-icons";
import {Video} from "expo-av";
import {WebView} from "react-native-webview";
// import {Video} from "expo";
import {TouchableOpacity, Dimensions} from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

class VideoScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <Container>
        <WebView
          source={{
            uri: "https://youtu.be/3Ww2TP_tU7o/",
          }}
          shouldPlay
          useNativeControls={true}
          resizeMode="cover"
          style={{width: screenWidth, height: 210}}
        />
        <CloseView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{padding: 20}}
          >
            <Ionicons name="ios-close" size={44} color="white" />
          </TouchableOpacity>
        </CloseView>
      </Container>
    );
  }
}

export default VideoScreen;

const Container = styled.View`
  flex: 1;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
