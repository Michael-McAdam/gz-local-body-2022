import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { useState } from "react";
// import InfoIcon from "@mui/icons-material/Info";
import InfoIcon from "@mui/icons-material/Help";

import WhoInfo from "../components/WhoInfo";
import BoardInfo from "../components/BoardInfo";
import ScorecardSection from "../components/ScorecardSection";
import { AucklandID } from "../util";

import RentIcon from "@mui/icons-material/HolidayVillage";
import RainbowIcon from "@mui/icons-material/Looks";
import AgeIcon from "@mui/icons-material/Skateboarding";
import DisabledIcon from "@mui/icons-material/AccessibleForward";
import MaoriIcon from "@mui/icons-material/Foundation";

const iconStyle = {
  borderRadius: "50%",
  padding: "4px",
  borderWidth: "1px",
  borderStyle: "solid",
};

const Render = ({ state, dispatch }) => {
  let [open, setOpen] = useState(false);
  let [boardOpen, setBoardOpen] = useState(false);

  let isAuckland = state.selected.region === AucklandID;

  let { pnzRegional, pnzMayor } =
    state.data.district.find((a) => a.id === state.selected.district) || {};
  let pnzLocal = state.data.ward.find((a) => a.id === state.selected.ward)?.pnz;
  let pnzBoard = state.data.subdivision.find(
    (a) => a.id === state.selected.subdivision
  )?.pnz;

  return (
    <div id="who">
      <Section
        title="WHO?"
        icon={<InfoIcon onClick={() => setOpen(true)} fontSize="large" />}
        subtitle="We researched the candidates so that you don't have to"
        dense={true}
        // height={"190vh"}
        height={"1500px"}
      >
        <WhoInfo open={open} onClose={() => setOpen(false)} />
        <BoardInfo open={boardOpen} onClose={() => setBoardOpen(false)} />
        <ScorecardSection
          state={state}
          dispatch={dispatch}
          dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/mayor`}
          watchKey={"district"}
          type={"mayor"}
          title={"Mayor"}
          pnz={pnzMayor}
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
              pnz={pnzRegional}
            />
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/wards/${state.selected.ward}/boards/${state.selected.board}/subdivisions/${state.selected.subdivision}/who`}
              watchKey={"subdivision"}
              type={"board"}
              title={"Local Board"}
              pnz={pnzBoard}
              icon={
                <InfoIcon
                  onClick={() => setBoardOpen(true)}
                  fontSize="medium"
                  sx={{ cursor: "pointer", "&:hover": { opacity: "50%" } }}
                />
              }
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
              pnz={pnzRegional}
            />
            <ScorecardSection
              state={state}
              dispatch={dispatch}
              dbPath={`regions/${state.selected.region}/districts/${state.selected.district}/wards/${state.selected.ward}/who`}
              watchKey={"ward"}
              type={"district"}
              title={"Local Councillors"}
              pnz={pnzLocal}
            />
          </>
        )}
        <ExtrasContainer>
          <IconKey>
            <IconKeyItem>
              <RentIcon sx={{ ...iconStyle }} />
              <span>- Renter </span>
            </IconKeyItem>
            <IconKeyItem>
              <RainbowIcon sx={{ ...iconStyle }} />
              <span>- Rainbow Community </span>
            </IconKeyItem>
            <IconKeyItem>
              <AgeIcon sx={{ ...iconStyle }} />
              <span>- Under 35 </span>
            </IconKeyItem>
            <IconKeyItem>
              <DisabledIcon sx={{ ...iconStyle }} />
              <span>- Disabled Community </span>
            </IconKeyItem>
            <IconKeyItem>
              <MaoriIcon sx={{ ...iconStyle }} />
              <span>- Māori </span>
            </IconKeyItem>
          </IconKey>
          {/* <span>Other groups scored candidates too! Check them out: </span> */}
          <span>
            Don't just take our word for it! More info on local elections:{" "}
          </span>
          <a
            href="https://policy.nz/2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policy.nz
          </a>
          ,{" "}
          <a
            href="https://www.voteclimate.org.nz/candidates"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vote Climate
          </a>
          ,{" "}
          <a
            href="https://rentersunited.org.nz/lbe22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Renters United
          </a>
          {isAuckland && (
            <>
              ,{" "}
              <a
                href="https://organiseaotearoa.nz/auckland2022/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Organise Aotearoa
              </a>
            </>
          )}
          <p>* = didn't fill out our survey.</p>
        </ExtrasContainer>
      </Section>
    </div>
  );
};

export default Render;

const ExtrasContainer = styled.div`
  margin-top: 30px;
  font-size: 14px;

  & > p {
    font-style: italic;
  }
`;

const IconKey = styled.div`
  font-size: 14px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & > span {
    font-style: italic;
    margin-right: 10px;
    margin-left: 5px;
  }
`;

const IconKeyItem = styled.div`
  margin-bottom: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & > span {
    font-style: italic;
    margin-right: 10px;
    margin-left: 5px;
  }
`;
