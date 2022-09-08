import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";

import Carousel from "nuka-carousel";

var settings = {
  cellAlign: "center",
};

function render({ state, dispatch }) {
  let regionType = state.regions[state.region].how;
  let localType = state.regions[state.region].districts[state.district].how;

  console.log(regionType);
  console.log(localType);

  if (!localType) {
    return <></>;
  }

  return (
    <Section title="HOW?">
      {/* <Image>COOL INFOGRAPHIC GOES HERE</Image> */}
      <Container>
        {localType == regionType ? (
          <InfoContainer>
            <Title>Your councils use {localType}</Title>
            <Image src={`./assets/${localType}.png`}></Image>
          </InfoContainer>
        ) : (
          //   <Carousel cellAlign="center">
          <>
            <InfoContainer>
              <Title>Your local council uses {localType}</Title>
              <Image src={`./assets/${localType}.png`}></Image>
            </InfoContainer>
            <InfoContainer>
              <Title>Your regional council uses {regionType}</Title>
              <Image src={`./assets/${regionType}.png`}></Image>
            </InfoContainer>
          </>
        )}
      </Container>
    </Section>
  );
}

export default render;

const Image = styled.img`
  width: 50%;
  min-height: 60%;
  /* max-width: 100%; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: lightgray;
`;

const Title = styled.p`
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
  flex-wrap: wrap;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
