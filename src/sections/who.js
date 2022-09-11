import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "../components/Scorecard";
import data from "../data";
import Section from "../components/Section";
import {forwardRef, useEffect, useState} from "react";
import { Icon, Modal, Button, Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import WhoInfo from "../components/WhoInfo";

let findCategories = (data) => {
  let res = Object.values(data).reduce((sum, entry) => {
    console.log(entry);
    let { name, overall, _createdBy, _updatedBy, photo, ...categories } = entry;
    console.log(categories);
    return { ...sum, ...categories };
  }, {});
  return Object.keys(res).sort();
};

const Render = forwardRef(({ state, dispatch }, ref) => {
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let q1 = query(
        collection(
          db,
          "regions",
          state.region,
          "districts",
          state.district,
          "who"
        )
      );
      let q2 = query(collection(db, "regions", state.region, "who"));
      let who = await getDocs(q1);
      let whoRegion = await getDocs(q2);
      dispatch({ type: "setWho", payload: who.docs.map((doc) => doc.data()) });
      dispatch({
        type: "setWhoRegion",
        payload: whoRegion.docs.map((doc) => doc.data()),
      });
    };

    setLoading(true);
    fetchData();
  }, [state.district]);

  //   let categories = findCategories(state.who);
  let categories = findCategories(state.who);
  let regionCategories = findCategories(state.whoRegion);

  let localLoaded = state.who.length > 0;
  let regionLoaded = state.whoRegion.length > 0;
  let loaded = localLoaded || regionLoaded;
  return (
    <>
      <Section title="WHO?" icon={<InfoIcon onClick={() => setOpen(true)} />} ref={ref}>
        <WhoInfo open={open} onClose={() => setOpen(false)} />
        {localLoaded ? (
          <>
            <Subtitle>Local</Subtitle>
            <ScorecardSection>
              {state.who
                .sort((a, b) => (a.overall + "," > b.overall + "," ? 1 : -1))
                .map((candidate, i) => (
                  <Scorecard data={candidate} key={i} categories={categories} />
                ))}
            </ScorecardSection>
          </>
        ) : (
          <Title>The candidates in your district haven't been scored</Title>
        )}
      </Section>
      {regionLoaded && (
        <>
          <Section>
            <Subtitle>Regional</Subtitle>
            <ScorecardSection>
              {state.whoRegion
                .sort((a, b) => (a.overall + "," > b.overall + "," ? 1 : -1))
                .map((candidate, i) => (
                  <Scorecard
                    data={candidate}
                    key={i}
                    categories={regionCategories}
                  />
                ))}
            </ScorecardSection>
          </Section>
        </>
      )}
    </>
  );
})

export default Render;

const ScorecardSection = styled.div`
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
