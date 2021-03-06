import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import {Ionicons} from "@expo/vector-icons";
import {Icon} from "expo";
import {NotificationIcon} from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import {connect} from "react-redux";
import Avatar from "../components/Avatar";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
  return {action: state.action, name: state.name};
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN",
      }),
    openNotif: () =>
      dispatch({
        type: "OPEN_NOTIF",
      }),
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") StatusBar.setBarStyle("light-content", true);
  }
  componentDidUpdate() {
    this.toggleMenu();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("light-content"), true;
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content"), true;
    }
  };

  handleAvatar = () => {
    if (this.props.name !== "Farmer") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <Notifications />
        <AnimatedContainer
          style={{
            transform: [{scale: this.state.scale}],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView style={{height: "100%"}}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{position: "absolute", top: 0, left: 20}}
                >
                  <Avatar />
                </TouchableOpacity>
                <Text>Welcome back</Text>
                <Name>{this.props.name}</Name>
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{position: "absolute", right: 20, top: 5}}
                >
                  <NotificationButton />
                </TouchableOpacity>
                <StatusBar style="auto" />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>{"Continue Learning".toUpperCase()}</Subtitle>
              <ScrollView
                horizontal={true}
                style={{paddingBottom: 30}}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({loading, error, data}) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;

                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card,
                              });
                            }}
                          >
                            <Card
                              title={card.title}
                              image={{uri: card.image.url}}
                              caption={card.caption}
                              logo={{uri: card.logo.url}}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                            {/* <Card
      title={card.title}
      image={card.image}
      caption={card.caption}
      logo={card.logo}
      subtitle={card.subtitle}
      content={card.content}
    /> */}
                            {/* <Card
      title={card.title}
      image={{ uri: card.image.url }}
      caption={card.caption}
      logo={{ uri: card.logo.url }}
      subtitle={card.subtitle}
    /> */}
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Subtitle>{"Popular Reads".toUpperCase()}</Subtitle>
              <CoursesContainer>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    image={course.image}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={course.logo}
                    author={course.author}
                    caption={course.caption}
                  />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 50px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Oranges",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Vegetables",
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Mint",
  },
  {
    image: require("../assets/logo-react.png"),
    text: "Mangoes",
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Kiwi",
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Bananas",
  },
];

const cards = [
  {
    title: "Introduction to crop farming",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo.png"),
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("../assets/logo.png"),
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("../assets/logo.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("../assets/logo.png"),
  },
];

const courses = [
  {
    title: "Potato Planting Guide",
    subtitle: "4 Sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo.png"),
    author: "John",
    avatar: require("../assets/avatar.jpg"),
    caption: "Plant and Harvest plentifully",
  },
  {
    title: "Effectively Growing Seedlings",
    subtitle: "3 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo.png"),
    author: "Harry",
    avatar: require("../assets/avatar.jpg"),
    caption: "Save space and Grow Seedlings",
  },
  {
    title: "Capsicum Farming",
    subtitle: "5 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo.png"),
    author: "Sherline",
    avatar: require("../assets/avatar.jpg"),
    caption: "Shielding from the sun and birds",
  },
  {
    title: "Sweet Pepper ",
    subtitle: "7 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo.png"),
    author: "Sherline",
    avatar: require("../assets/avatar.jpg"),
    caption: "Complete guide to growing peppers",
  },
];

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;
