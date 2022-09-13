import "../App.css";
import styled from "@emotion/styled";
import data from "../data";
import ReactPlayer from "react-player";
import Section from "../components/Section";

function render() {
  return (
    <Section title="WHY?">
      {/* <VideoContainer className="video-responsive"> */}
      {/* <VideoPlayer
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Fo22DoBuhMc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> */}
      {/* <VideoPlayer
        style={{ maxWidth: "100%" }}
        // width="100%"
        // height="100%"
        url="https://www.youtube.com/watch?v=Fo22DoBuhMc"
      /> */}
      Content TBC
      {/* </VideoContainer> */}
    </Section>
  );
}

export default render;

const VideoContainer = styled.div`
  /* overflow: hidden; */
  /* padding-bottom: 56.25%; */
  /* position: relative; */
  /* width: 60%; */
  /* max-width: 800px; */
  /* height: 0; */
`;

const VideoPlayer = styled(ReactPlayer)`
  /* position: absolute;
  left: 0;
  top: 0; */
  /* height: 100%; */
  /* width: 50%; */
`;
