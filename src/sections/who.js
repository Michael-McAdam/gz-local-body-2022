import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";
import {forwardRef, useEffect, useState} from "react";
import InfoIcon from "@mui/icons-material/Info";

import WhoInfo from "../components/WhoInfo";
import ScorecardSection from "../components/ScorecardSection";
import { AucklandID } from "../util";

const Render = forwardRef(({ state, dispatch }, ref) => {
  let [open, setOpen] = useState(false);

  let isAuckland = state.selected.region === AucklandID;

  return (
    <div id="who">
      <Section
        title="WHO?"
        icon={<InfoIcon onClick={() => setOpen(true)} />}
        subtitle="We researched the candidates so that you don't have to"
        dense={true}
        height={"180vh"}
      >
        <WhoInfo open={open} onClose={() => setOpen(false)} />
        <ScorecardSection
          state={state}
          dispatch={dispatch}
          dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/mayor`}
          watchKey={"district"}
          type={"mayor"}
          title={"Mayor"}
        />
        {isAuckland ? (
          <>
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/wards/${state.selected.ward}/who`}
              watchKey={"ward"}
              type={"region"}
              title={"Councillors"}
            />
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/wards/${state.selected.ward}/boards/${state.selected.board}/subdivisions/${state.selected.subdivision}/who`}
              watchKey={"subdivision"}
              type={"board"}
              title={"Local Board"}
            />
          </>
        ) : (
          <>
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/who`}
              watchKey={"district"}
              type={"region"}
              title={"Regional Councillors"}
            />
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/wards/${state.selected.ward}/who`}
              watchKey={"ward"}
              type={"district"}
              title={"Local Councillors"}
            />
          </>
        )}
        <ExtrasContainer>
          <span>Other groups scored candidates too! Check them out: </span>
          <a
            href="https://policy.nz/2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policy.nz
          </a>
        </ExtrasContainer>
      </Section>
    </div>
  );
})

export default Render;

const ExtrasContainer = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;
