import React from "react";
import styled from "styled-components";
import Project from "../components/Project";
import {PanResponder, Animated} from "react-native";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    action: state.action,
  };
}

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action === "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },

      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, {toValue: 1}).start();
        Animated.spring(this.state.translateY, {toValue: 0}).start();

        Animated.spring(this.state.thirdScale, {toValue: 0.9}).start();
        Animated.spring(this.state.thirdTranslateY, {toValue: 44}).start();

        Animated.timing(this.state.opacity, {toValue: 1}).start();
      },

      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        Animated.timing(this.state.opacity, {toValue: 0}).start();

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: {x: 0, y: 1000},
          }).start(() => {
            this.state.pan.setValue({x: 0, y: 0});
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({index: getNextIndex(this.state.index)});
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
          }).start();

          Animated.spring(this.state.scale, {toValue: 0.9}).start();
          Animated.spring(this.state.translateY, {toValue: 44}).start();

          Animated.spring(this.state.thirdScale, {toValue: 0.8}).start();
          Animated.spring(this.state.thirdTranslateY, {toValue: -50}).start();
        }
      },
    });
  }

  render() {
    return (
      <Container>
        <AnimatedMask style={{opacity: this.state.opacity}} />
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
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {scale: this.state.scale},
              {translateY: this.state.translateY},
            ],
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {scale: this.state.thirdScale},
              {translateY: this.state.thirdTranslateY},
            ],
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ProjectsScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Firms",
    image: require("../assets/background5.jpg"),
    author: "CFO, Kinder Farms",
    text:
      "We are working to get partnerships with local and international firms for small scale farmers to get funding in their personal projects as well as sponsorships",
  },
  {
    title: "Community Chat",
    image: require("../assets/background6.jpg"),
    author: "CEO, Kinder Farms",
    text:
      "We will be launching a chat feature where you will be matched to the nearest group of farmers in your location so as to make it easier for updates such as when there's an outbreak, one can have measures. It will also be effective on sharing tips such as what crops are better in the area  ",
  },
  {
    title: "Profit Maximization",
    image: require("../assets/background7.jpg"),
    author: "CEO, Kinder Farms",
    text:
      "By ensuring the produce is fit for human consumption, we will establish a market while working with brokers nearest in your area to save on costs",
  },
];

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);
