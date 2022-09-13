import "../App.css";
import { Button, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { Link } from "react-scroll";

function render() {
  return (
    <Section>
      <Button
        variant="contained"
        size="large"
        href="https://enrol.vote.nz/app/enrol/#/enrol-online"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontWeight: "900",
          transform: "scale(3)",
          color: "white",
        }}
      >
        Enrol
      </Button>
      <Subtitle>
        *If you enrol now, you'll have to special vote. See more details below
      </Subtitle>
      <ContinueSection>
        <Link to="region" spy={true} smooth={true}>
          <Fab color="primary" aria-label="add" sx={{ color: "white" }}>
            <KeyboardArrowDownIcon />
          </Fab>
        </Link>
        <p>Already enrolled? Find out more below</p>
      </ContinueSection>
    </Section>
  );
}

export default render;

const ContinueSection = styled.div`
  font-size: medium;
  position: absolute;
  bottom: 20px;

  & > p {
    opacity: 0.8;
  }
`;

const Subtitle = styled.p`
  font-size: 12px;
  margin-top: 60px;
`;
