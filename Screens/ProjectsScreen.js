import React from "react";
import styled from "styled-components";
import {Button} from "react-native";
import Project from "../components/Project";
import {PanResponder, Animated} from "react-native";

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    pan: new Animated.ValueXY(),
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, {
          toValue: {x: 0, y: 0},
        }).start();
      },
    });
  }

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              {translateX: this.state.pan.x},
              {translateY: this.state.pan.y},
            ],
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title="Price tag"
            image={require("../assets/background5.jpg")}
            author="John Doe"
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;
