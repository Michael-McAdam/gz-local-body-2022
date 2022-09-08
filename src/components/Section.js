import "../App.css";
import styled from "@emotion/styled";
import { Icon, Modal, Button, Chip } from "@mui/material";

function Section(props) {
  return (
    <Container>
      <TitleContainer>
        <SectionTitle>{props.title}</SectionTitle>
        <IconContainer>{props.icon}</IconContainer>
      </TitleContainer>
      {props.children}
    </Container>
  );
}

export default Section;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-bottom: 30vh;

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
  margin-right: 50px;
`;

const TitleContainer = styled.div`
  color: white;
  position: absolute;
  font-weight: 900;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > .Chip {
    color: white;
    margin: 15px 10px;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
`;
