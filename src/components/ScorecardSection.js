import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "./Scorecard";
import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import { sortBy } from "lodash/collection";

let categories = ["transport", "housing", "environment", "equity", "teTiriti"];

function Render({ state, dbPath, watchKey, title, type, dispatch }) {
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Requesting: ", dbPath);
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
      // console.log("Fetching");
    } else {
      dispatch({
        type: "setWho",
        payload: {
          type: type,
          data: [],
        },
      });
    }
    // console.log("Running for: ", title);
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

  const filteredAndNormalisedSectionCandidates = sortBy(
    state.who[type]
      .filter((x) => !x.exclude)
      .map((x) => ({
        transport: x.publicTransport || x.transport,
        ...x,
      })),
    [
      // I got lazy and installed lodash to do this for me. It makes things heaps easier.
      // Keep in mind this sorts from least->most. So the smaller the value the 'lefter' it is.
      // The first arrow function is executed on every candidate, the second is only used to break ties.
      (candidate) => {
        if (candidate.overall === "?") {
          return Infinity;
        }

        // Hacky, but simple. In ASCII 'A' < 'B' < 'C'... so use this to assign increasing scores for worse grades
        // Multiply by 10 so that we can +/- 1 to sort A+ -> A -> A-
        const base = candidate.overall.charCodeAt(0) * 10;
        if (candidate.overall.length === 1) {
          return base;
        } else if (candidate.overall[1] === "+") {
          return base - 1;
        } else {
          return base + 1;
        }
      },
      (candidate) => !!candidate.dna,
    ]
  );

  return (
    <>
      <Subtitle>{title}</Subtitle>
      <ScorecardContainer>
        {filteredAndNormalisedSectionCandidates.map((candidate, i) => (
          <Scorecard
            data={candidate}
            key={candidate.name}
            categories={categories}
            type={type}
          />
        ))}
      </ScorecardContainer>
    </>
  );
}

export default Render;

const ScorecardContainer = styled.div`
  width: 100%;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;

  & > .Card {
    margin: 0 5px;
    background-color: rgba(245, 245, 220, 0);
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    /* border-color: white; */
    /* color: white; */
    border-color: #221f1f;
    color: #221f1f;
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
