import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "./Scorecard";
import data from "../data";
import Section from "./Section";
import { useEffect, useState } from "react";
import { Icon, Modal, Button, Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import WhoInfo from "./WhoInfo";

let categories = [
  "publicTransport",
  "housing",
  "environment",
  "equity",
  "teTiriti",
];

function Render({ state, dbPath, watchKey, title, type, dispatch }) {
  useEffect(() => {
    const fetchData = async () => {
      let q = query(collection(db, dbPath));
      let res = await getDocs(q);
      dispatch({
        type: "setWho",
        payload: {
          type: type,
          data: res.docs.map((doc) => doc.data()),
        },
      });
    };

    fetchData();
  }, [state[watchKey]]);

  let loaded = state.who[type].length > 0;

  if (state[watchKey] === "") {
    return (
      <>
        <Subtitle>{title}</Subtitle>
        <Title>
          Please select your location above to see your local candidates
        </Title>
      </>
    );
  }
  if (!loaded) {
    return (
      <>
        <Subtitle>{title}</Subtitle>
        <Title>These candidates in your location haven't been scored</Title>
      </>
    );
  }
  return (
    <>
      <Subtitle>{title}</Subtitle>
      <ScorecardContainer>
        {state.who[type]
          .sort((a, b) => (a.overall + "," > b.overall + "," ? 1 : -1))
          .map((candidate, i) => (
            <Scorecard data={candidate} key={i} categories={categories} />
          ))}
      </ScorecardContainer>
    </>
  );
}

export default Render;

const ScorecardContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;

  & > .Card {
    margin: 0 5px;
    background-color: rgba(245, 245, 220, 0);
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    border-color: white;
    color: white;
    border-radius: 5%;
  }

  & > .Card::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.p`
  font-size: 15px;
`;

const Subtitle = styled.h2``;
