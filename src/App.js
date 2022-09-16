import "./App.css";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { useRef, useEffect, useReducer } from "react";
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
import {ShareButton} from "./components/ShareButton";

const q = query(collection(db, "regions"), where("include", "==", true));

const initialState = {
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
  enrolled: true,
  current: true,
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
    case "setWho":
      // console.log("Here: ", action);
      return {
        ...state,
        who: { ...state.who, [action.payload.type]: action.payload.data },
      };
    case "setWhere":
      return { ...state, where: action.payload };
    case "finishedLoading":
      return { ...state, loaded: true };
    case "setEnrolled":
      return {
        ...state,
        enrolled: action.payload,
        special: !(action.payload && state.current),
      };
    case "setCurrent":
      return {
        ...state,
        current: action.payload,
        special: !(action.payload && state.enrolled),
      };
    default:
      console.log("No handler for reducer");
      return state;
    // throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef(null);

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

        <ShareButton href={document.location.href} style={{position: 'fixed', bottom: 10, left: 10}} />
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
  height: 100%;
  width: 100%;
  background-color: blue;
  background: linear-gradient(
    180deg,
    rgba(85, 106, 65, 1) 0%,
    rgba(85, 106, 65, 0.8) 25%,
    rgba(85, 106, 65, 0.8) 75%,
    rgba(85, 106, 65, 1) 100%
  );
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
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
  max-height: 200px;
`;
const LogoText = styled.p`
  margin-right: 10px;
  white-space: nowrap;
  font-size: 10px;
  color: white;
`;
