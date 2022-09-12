import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "../components/Scorecard";
import data from "../data";
import Section from "../components/Section";
import { useEffect } from "react";
import { Icon, Modal, Button, Chip } from "@mui/material";

const categoryInfo = {
  overview: `Everyone was sent a questionnaire that asked various questions about the categories listed below. Their responses were rated. 
    For people who are already elected to the council their voting record on issues while in office was taken into account`,
  categories: {
    publicTransport:
      "Public Transport is a key part of mode shift - getting people out of cars and into more efficient forms of transport",
    cleanEnergy: "Local council can support clean energy through x, y and z",
    density:
      "Density means people live closer together, meaning less resources are need to get around",
  },
};

function Render({ open, onClose }) {
  return (
    <Modal
      open={open}
      disableAutoFocus={true}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InfoContainer>
        <h1> Our scorecarding process </h1>
        <p>
          The final scores were based on a combination of the answers given by
          the candidates via our survey and voting records (for incumbents) or
          publicly known information.
        </p>
        <p>
          There were five marked sections - scale, multiple choice, explain your
          answer, yes/no, and regional. For each section, the candidates were
          able to explain their answers at the bottom of the page if they wish.
          Their explanations or comments were taken into account when marking.
        </p>
        <p>
          The questions do not have equal weighting on the final scoring, and
          the weightings change based on the regions. We did the final scoring
          on five wider themes:{" "}
          <b>Environment, Transport, Te Tiriti, Equity/Social Welfare, </b> and{" "}
          <b>Housing/Liveable Cities</b>, and then these scores were weighed to
          create a final grade.
        </p>
        <p>
          All questions are optional, but skipping questions did result in lower
          or zero marks. Candidates were able to leave and come back to the
          questionnaire at any point before submitting.
        </p>
        <p>
          We have been supported in the creation of our scorecard. We want to
          thank many groups and individuals for helping with the writing of our
          survey questions:{" "}
          <i>
            350 Aotearoa, All Aboard Aotearoa, Coalition For More Homes,
            Disabled Persons Assembly, Free Fares to freedom, Greenpeace,
            Kōkiri, Marae (Lynda Ryan), Renters United, Sustainability Trust,
            Victoria University of Wellington Students Association (VUWSA),
            Waste Free Wellington, Wellington Alliance Against Sexual Violence,
            Wellington Regional Healthy Housing Group, Women in Urbanism, Zero
            Waste Network, Our amazing Instagram followers and Fb group members!
          </i>
        </p>
        {/* <Table>
          <tbody>
            {Object.keys(categoryInfo.categories).map((c) => {
              let title = c.replace(/([A-Z])/g, " $1");
              title = title.charAt(0).toUpperCase() + title.slice(1);
              return (
                <Row key={c}>
                  <TitleCell>{title}</TitleCell>
                  <ScoreCell>{categoryInfo.categories[c]}</ScoreCell>
                </Row>
              );
            })}
          </tbody>
        </Table> */}
      </InfoContainer>
    </Modal>
  );
}

export default Render;

const InfoContainer = styled.div`
  width: 70%;
  /* height: 70%; */
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 50px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.9);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;

  & > .h1 {
  }

  & > p {
    margin-top: 5px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  & > p:last-child {
    font-size: 14px;
  }
`;

const Table = styled.table`
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
`;
const Row = styled.tr`
  font-size: 16px;

  & > td {
    border-bottom: 1px solid;
  }
`;
const TitleCell = styled.td`
  text-align: left;
`;
const ScoreCell = styled.td`
  text-align: left;
`;
