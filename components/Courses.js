import React from "react";
import styled from "styled-components";
import Course from "../components/Course";

const Courses = () => (
  <Container>
    {courses.map((course, index) => (
      <Course
        key={index}
        image={course.image}
        title={course.title}
        subtitle={course.subtitle}
        logo={course.logo}
        author={course.author}
        avatar={course.avatar}
        caption={course.caption}
      />
    ))}
  </Container>
);

export default Courses;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const courses = [
  {
    title: "Requirements for Shallot Growth ",
    subtitle: "2 Sections",
    image: require("../assets/background4.jpg"),
    logo: require("../assets/logo.png"),
    author: "Kinder Farms",
    avatar: require("../assets/avatar.jpg"),
    caption: "Effectively use space and costs",
  },
  {
    title: "The Farmers Market",
    subtitle: "12 sections",
    image: require("../assets/background15.jpg"),
    logo: require("../assets/logo.png"),
    author: "Mercy",
    avatar: require("../assets/avatar.jpg"),
    caption: "What is the farmers market?",
  },
  {
    title: "Lemons or limes?",
    subtitle: "10 sections",
    image: require("../assets/background16.jpg"),
    logo: require("../assets/logo.png"),
    author: "Kinder Farms",
    avatar: require("../assets/avatar.jpg"),
    caption: "What soil is compatible?",
  },
  {
    title: "Utilizing Space",
    subtitle: "10 sections",
    image: require("../assets/background7.jpg"),
    logo: require("../assets/logo.png"),
    author: "Joe",
    avatar: require("../assets/avatar.jpg"),
    caption: "Grow produce with creative minimal spaces",
  },
];
