import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "./Scorecard";
import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";

let categories = ["transport", "housing", "environment", "equity", "teTiriti"];

function Render({ state, dbPath, watchKey, title, type, dispatch }) {
  useEffect(() => {
    const fetchData = async () => {
      console.log("Requesting: ", dbPath);
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

    if (state.selected[watchKey]) {
      fetchData();
      console.log("Fetching");
    } else {
      dispatch({
        type: "setWho",
        payload: {
          type: type,
          data: [],
        },
      });
    }
    console.log("Running for: ", title);
  }, [state.selected[watchKey]]);

  let loaded = state.who[type].length > 0;

  if (state.selected[watchKey] === "") {
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
  // .sort((a, b) => (a.overall == "?" ? 1 : -1))
  return (
    <>
      <Subtitle>{title}</Subtitle>
      <ScorecardContainer>
        {state.who[type]
          .filter((x) => !x.exclude)
          .sort((a, b) => {
            if (a.overall === "?") return 1;
            return a.overall + "," > b.overall + "," ? 1 : -1;
          })
          .map((x) => ({
            transport: x.publicTransport || x.transport,
            ...x,
          }))
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
  min-height: 150px;
`;

const Subtitle = styled.h2``;
