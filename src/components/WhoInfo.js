import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "../components/Scorecard";
import data from "../data";
import Section from "../components/Section";
import { useEffect } from "react";
import { Icon, Modal, Button, Chip } from "@mui/material";

const categoryInfo = {
  overview:
    "Everyone was sent a questionnaire that asked various questions about the categories listed below. Their responses were rated. For people who are already elected to the council their voting record on issues while in office was taken into account",
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
        <p style={{ fontWeight: "bold" }}> How did we get to these scores?</p>
        <p> {categoryInfo.overview}</p>
        <Table>
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
        </Table>
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
  overflow-x: auto;

  & > .h1 {
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
