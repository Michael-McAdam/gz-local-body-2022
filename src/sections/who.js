import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "../components/Scorecard";
import data from "../data";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import { Icon, Modal, Button, Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import WhoInfo from "../components/WhoInfo";
import ScorecardSection from "../components/ScorecardSection";

function Render({ state, dispatch }) {
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  return (
    <div id="who">
      <Section
        title="WHO?"
        icon={<InfoIcon onClick={() => setOpen(true)} />}
        subtitle="We researched the candidates so that you don't have to"
        dense={true}
        height={"150vh"}
      >
        <WhoInfo open={open} onClose={() => setOpen(false)} />
        {/* <WhoMayor state={state} dispatch={dispatch} /> */}
        <ScorecardSection
          state={state}
          dispatch={dispatch}
          dbPath={`regions/${state.region}/districts/${state.district}/mayor`}
          watchKey={"district"}
          type={"mayor"}
          title={"Mayor"}
        />
        <ScorecardSection
          state={state}
          dispatch={dispatch}
          dbPath={`regions/${state.region}/districts/${state.district}/who`}
          watchKey={"district"}
          type={"region"}
          title={"Regional Councillors"}
        />
        <ScorecardSection
          state={state}
          dispatch={dispatch}
          dbPath={`regions/${state.region}/districts/${state.district}/wards/${state.ward}/who`}
          watchKey={"ward"}
          type={"district"}
          title={"Local Councillors"}
        />
      </Section>
      {/* {localLoaded && (
        <>
          <Section>
            <Subtitle>Local</Subtitle>
            <ScorecardSection>
              {state.who
                .sort((a, b) => (a.overall + "," > b.overall + "," ? 1 : -1))
                .map((candidate, i) => (
                  <Scorecard data={candidate} key={i} categories={categories} />
                ))}
            </ScorecardSection>
          </Section>
        </>
      )} */}
    </div>
  );
}

export default Render;

// const ScorecardSection = styled.div`
//   width: 90%;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   overflow-x: auto;

//   & > .Card {
//     margin: 0 5px;
//     background-color: rgba(245, 245, 220, 0);
//     -ms-overflow-style: none; /* IE and Edge */
//     scrollbar-width: none; /* Firefox */
//     border-color: white;
//     color: white;
//     border-radius: 5%;
//   }

//   & > .Card::-webkit-scrollbar {
//     display: none;
//   }
// `;

const Title = styled.p`
  font-size: 15px;
`;

const Subtitle = styled.h2``;
