import "../App.css";
import styled from "@emotion/styled";
import { Icon, Modal, Button, Chip } from "@mui/material";

const Section = (props) => {
  return (
    <Container dense={props.dense} height={props.height}>
      <HeaderContainer>
        <TitleContainer>
          <SectionTitle>{props.title}</SectionTitle>
          <IconContainer>{props.icon}</IconContainer>
        </TitleContainer>
        <Subtitle>{props.subtitle}</Subtitle>
      </HeaderContainer>
      {props.children}
    </Container>
  );
};

export default Section;

const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  height: ${(props) => (props.height ? props.height : "100vh")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  /* color: white; */
  color: #221f1f;
  margin-bottom: ${(props) => !props.dense && "30vh"};

  display: ${(props) => (props.hidden ? "hidden" : "default")};

  margin-left: auto;
  margin-right: auto;

  position: relative;

  & > .Button {
    font-weight: bold;
    transform: scale(3);
  }
`;

const SectionTitle = styled.h1`
  margin: 0;
  margin-right: 50px;
`;

const TitleContainer = styled.div`
  font-weight: 900;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > .Chip {
    /* color: white; */
    color: #221f1f;
    margin: 15px 10px;
  }
`;

const HeaderContainer = styled.div`
  /* color: white; */
  color: #221f1f;
  position: absolute;
  top: 50px;
  left: 5vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  cursor: pointer;
  /* font-size: x-large; */

  &:hover {
    opacity: 50%;
  }
`;

const Subtitle = styled.p`
  /* font-size: 15px; */
  font-size: 0.6em;
  font-style: italic;
  text-align: left;
  margin: 0;
  padding: 0;
`;
