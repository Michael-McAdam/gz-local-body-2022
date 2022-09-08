import "../App.css";
import { Button, Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef } from "react";
import Section from "../components/Section";
import { Link } from "react-scroll";

function render({ onClick }) {
  console.log(onClick);
  return (
    <Section>
      <Button
        variant="contained"
        href="https://enrol.vote.nz/app/enrol/#/enrol-online"
        target="_blank"
        size="large"
        rel="noopener noreferrer"
        // className="Button"
        sx={{ fontWeight: "bold", transform: "scale(3)" }}
        // sx={{ fontWeight: "bold", width: 0.3, pt: 5, pb: 5, fontSize: 40 }}
      >
        Enrol
      </Button>
      <ContinueSection>
        <Link to="region" spy={true} smooth={true}>
          <Fab color="primary" aria-label="add">
            <KeyboardArrowDownIcon onClick={() => onClick()} />
          </Fab>
        </Link>
        <p>Already enrolled? Find out more below</p>
      </ContinueSection>
    </Section>
  );
}

export default render;

const ContinueSection = styled.div`
  font-size: small;
  position: absolute;
  bottom: 0;

  & > p {
    opacity: 0.8;
  }
`;
