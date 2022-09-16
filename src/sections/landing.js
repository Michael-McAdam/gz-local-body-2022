import "../App.css";
import { Button, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { Link } from "react-scroll";

function render() {
  return (
    <Container>
      <Section>
        <Logo src="./assets/VoteLocal.png" />
        <Subtitle>
          Welcome to Generation Zero scorecards for 2022 Local Elections! This
          is your one stop hub to know where your local candidates stand on
          climate justice. Let’s get started..
        </Subtitle>
        <ContinueButton
          variant="contained"
          size="large"
          href="https://enrol.vote.nz/app/enrol/#/enrol-online"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </ContinueButton>
      </Section>
    </Container>
  );
}

export default render;

const Container = styled.div`
  background-color: #a4d1dd;

  & > p {
    color: #221f1f;
  }
`;

const ContinueSection = styled.div`
  font-size: medium;
  position: absolute;
  bottom: 20px;

  & > p {
    opacity: 0.8;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-top: 60px;
  color: #221f1f;
`;

const Logo = styled.img`
  /* width: 100%; */
  max-height: 200px;
`;

const ContinueButton = styled(Button)`
  /* font-weight: 900; */
  font-family: "Barlow Condensed", "Helvetica", "Arial", sans-serif;
  /* font-family: "Helvetica", "Arial", sans-serif; */
  // fontSize: "20px",
  transform: scale(2);
  // color: "white",
  color: #221f1f;
  background-color: #e24f33;
`;
