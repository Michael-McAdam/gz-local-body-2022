import "../App.css";
import { Button, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef } from "react";
import Section from "../components/Section";
import { Link } from "react-scroll";

function render({ onClick }) {
  return (
    <Section>
      <Button
        variant="contained"
        href="https://enrol.vote.nz/app/enrol/#/enrol-online"
        size="large"
        target="_blank"
        rel="noopener noreferrer"
        // className="Button"
        sx={{
          fontWeight: "900",
          transform: "scale(3)",
          // color: "rgba(85,106,65, 1)",
          color: "white",
        }}
        // sx={{ fontWeight: "bold", width: 0.3, pt: 5, pb: 5, fontSize: 40 }}
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
