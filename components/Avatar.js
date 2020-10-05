import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {AsyncStorage} from "react-native";

function mapStateToProps(state) {
  return {
    name: state.name,
    avatar: state.avatar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
    updateAvatar: (avatar) =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar,
      }),
  };
}

class Avatar extends React.Component {
  componentDidMount() {
    this.loadState();

    // fetch("https://uifaces.co/api?limit=1&random", {
    //   headers: new Headers({
    //     "X-API-KEY": "5FD48611-5B754C39-BDDBAA1A-0F99EEB1",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     // console.log(response);
    //     this.setState({
    //       photo: response[0].photo,
    //     });
    //     // this.props.updateName(response[0].name);
    //   });
  }

  loadState = () => {
    AsyncStorage.getItem("state").then((serializedState) => {
      const state = JSON.parse(serializedState);
      console.log(state);

      if (state) {
        this.props.updateName(state.name);
        this.props.updateAvatar(state.avatar);
      }
    });
  };

  render() {
    return <Image source={{uri: this.props.avatar}} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
