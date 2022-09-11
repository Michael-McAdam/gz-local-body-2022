import "./App.css";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { useState, useRef, useEffect, useReducer } from "react";
import {
  EnrolSection,
  HowSection,
  RegionSection,
  WhenSection,
  WhereSection,
  WhoSection,
  WhySection,
} from "./sections";

import { collection, getDocs, query, where } from "firebase/firestore";
import { levels } from "./util";

import { db } from "./firebase";
import Section from "./components/Section";
import data from "./data";

const q = query(collection(db, "regions"), where("include", "==", true));

const initialState = {
  regions: {},
  districts: [],
  wards: [],
  region: "",
  district: "",
  ward: "",
  data: {
    region: [],
    district: [],
    ward: [],
    board: [],
    subdivision: [],
  },
  selected: {
    region: "",
    district: "",
    ward: "",
    board: "",
    subdivision: "",
  },
  who: {
    district: [],
    region: [],
    mayor: [],
    board: [],
  },
  where: [],
  loaded: false,
  special: false,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "addData":
      return {
        ...state,
        data: { ...state.data, [action.payload.type]: action.payload.data },
      };
    case "setSelected":
      return {
        ...state,
        selected: action.payload.selected,
        data: action.payload.data,
      };
    case "setRegion":
      return {
        ...state,
        district: "",
        ward: "",
        board: "",
        who: initialState.who,
        region: action.payload,
      };
    case "setDistrict":
      return {
        ...state,
        ward: "",
        board: "",
        who: initialState.who,
        district: action.payload,
      };
    case "setWard":
      return { ...state, board: "", ward: action.payload };
    case "setBoard":
      return { ...state, board: action.payload };
    case "setWho":
      console.log("Here: ", action);
      return {
        ...state,
        who: { ...state.who, [action.payload.type]: action.payload.data },
      };
    case "setWhere":
      return { ...state, where: action.payload };
    case "finishedLoading":
      return { ...state, loaded: true };
    case "setSpecial":
      return { ...state, special: action.payload };
    default:
      console.log("No handler for reducer");
      return state;
    // throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getDocs(q);
      dispatch({
        type: "addData",
        payload: {
          type: "region",
          data: res.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        },
      });
    };
    // regions.docs.forEach(async (doc) => {
    //   let q2 = query(
    //     collection(db, "regions", doc.id, "districts"),
    //     where("include", "==", true)
    //   );
    //   let districts = await getDocs(q2);
    //   districts.docs.forEach(async (doc2) => {
    //     let q3 = query(
    //       collection(db, "regions", doc.id, "districts", doc2.id, "wards"),
    //       where("include", "==", true)
    //     );
    //     await getDocs(q3);
    //     dispatch({
    //       type: "addRegion",
    //       payload: {
    //         [doc.id]: {
    //           ...doc.data(),
    //           id: doc.id,
    //           districts: districts.docs.reduce(
    //             (o, d) => ({ ...o, [d.id]: { ...d.data(), id: d.id } }),
    //             {}
    //           ),
    //         },
    //       },
    //     });
    //   });
    // });
    // };

    fetchData();
  }, []);

  console.log(state);

  let loaded = Object.keys(state.data.region).length > 0;

  return (
    <Background>
      <AppContainer className="App">
        {loaded ? (
          <>
            <EnrolSection />
            <RegionSection state={state} dispatch={dispatch} db={db} />
            <WhoSection state={state} dispatch={dispatch} />
            <HowSection state={state} dispatch={dispatch} />
            <WhereSection state={state} dispatch={dispatch} />
            <WhySection />
            <WhenSection state={state} dispatch={dispatch} />
            <LogoContainer>
              <LogoText>Proudly made by:</LogoText>
              <a
                href="https://www.generationzero.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Logo src="./assets/generation-zero-logo.png" />
              </a>
            </LogoContainer>
          </>
        ) : (
          <Section>
            <CircularProgress />
          </Section>
        )}
      </AppContainer>
    </Background>
  );
}

export default App;

const View = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  /* height: calc(8 * 100vh + 8 * 30vh); */
  width: 100%;
  background-color: blue;
  /* background: rgb(21, 20, 37); */
  background: linear-gradient(
    180deg,
    rgba(85, 106, 65, 1) 0%,
    rgba(85, 106, 65, 0.8) 25%,
    rgba(85, 106, 65, 0.8) 75%,
    rgba(85, 106, 65, 1) 100%
  );
`;

const AppContainer = styled.div`
  /* background-color: blue;
  background: rgb(21, 20, 37);
  background: linear-gradient(
    180deg,
    rgba(21, 20, 37, 1) 0%,
    rgba(61, 92, 142, 1) 100%
  ); */
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: scroll;
`; /* rgba(142, 111, 61, 1) 100% */
/* rgba(186, 186, 186, 1) 100% */
/* rgba(251, 229, 163, 1) 67%, */

const LogoContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  opacity: 70%;

  & > a {
    width: 50%;
  }
`;
const Logo = styled.img`
  width: 100%;
`;
const LogoText = styled.p`
  margin-right: 10px;
  white-space: nowrap;
  font-size: 10px;
  color: white;
`;
