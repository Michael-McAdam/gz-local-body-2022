import "../App.css";
import { Button, Fab } from "@mui/material";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { Link } from "react-scroll";
import { AutoScaler } from "../components/AutoScaler";

function render() {
  return (
    <Container>
      <Section>
        <Logo src="./assets/VoteLocal.png" />
        <GZLogoContainer>
          <span>by </span>
          <GZLink
            href="https://www.generationzero.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GZLogo
              src="./assets/gen_zero_logo_black.png"
              href="https://www.generationzero.org/"
            />
          </GZLink>
        </GZLogoContainer>

        <Subtitle>
          Where do your local candidates stand on climate justice?
        </Subtitle>

        <Link to="region" spy={true} smooth={true}>
          <ContinueButton
            variant="contained"
            size="large"
            // href="https://enrol.vote.nz/app/enrol/#/enrol-online"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </ContinueButton>
        </Link>
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
  position: relative;
`;

const ContinueSection = styled.div`
  font-size: medium;
  position: absolute;
  bottom: 20px;

  & > p {
    opacity: 0.8;
  }
`;

const Subtitle = styled.div`
  font-size: 0.8em;
  margin-top: 60px;
  color: #221f1f;
`;

const Logo = styled.img`
  width: 90%;
  max-width: 600px;
  /* max-height: 200px; */
`;

const GZLogo = styled.img`
  width: 100%;
  /* max-width: 200px; */
  /* max-height: 200px; */
`;

const GZLink = styled.a`
  width: 30%;
  max-width: 200px;
  /* max-height: 200px; */
`;

const GZLogoContainer = styled.div`
  width: 100%;
  color: #221f1f;
  font-size: 14px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  /* & > span {
    margin-right: 10px;
  } */

  /* max-height: 200px; */
`;

const ContinueButton = styled(Button)`
  font-weight: 600;
  font-family: "Barlow Condensed", "Helvetica", "Arial", sans-serif;
  /* font-family: "Helvetica", "Arial", sans-serif; */
  // fontSize: "20px",
  transform: scale(2) translateX(-25%);
  // color: "white",
  color: #221f1f;
  background-color: #e24f33;

  position: absolute;
  bottom: 70px;
`;
