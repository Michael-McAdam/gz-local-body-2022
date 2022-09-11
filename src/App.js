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

import { db } from "./firebase";
import Section from "./components/Section";

const q = query(collection(db, "regions"), where("include", "==", true));

const initialState = {
  regions: {},
  region: "",
  district: "",
  who: [],
  whoRegion: [],
  where: [],
  loaded: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "addRegion":
      return { ...state, regions: { ...state.regions, ...action.payload } };
    case "setRegion":
      return {
        ...initialState,
        regions: state.regions,
        region: action.payload,
      };
    case "setDistrict":
      return {
        ...initialState,
        regions: state.regions,
        region: state.region,
        district: action.payload,
      };
    case "setWho":
      return { ...state, who: action.payload };
    case "setWhoRegion":
      return { ...state, whoRegion: action.payload };
    case "setWhere":
      return { ...state, where: action.payload };
    case "finishedLoading":
      return { ...state, loaded: true };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let regions = await getDocs(q);
      regions.docs.forEach(async (doc) => {
        let q2 = query(
          collection(db, "regions", doc.id, "districts"),
          where("include", "==", true)
        );
        let districts = await getDocs(q2);
        dispatch({
          type: "addRegion",
          payload: {
            [doc.id]: {
              ...doc.data(),
              id: doc.id,
              districts: districts.docs.reduce(
                (o, d) => ({ ...o, [d.id]: { ...d.data(), id: d.id } }),
                {}
              ),
            },
          },
        });
      });
    };

    fetchData();
  }, []);

  console.log(state);

  let loaded = Object.keys(state.regions).length > 0;

  return (
    <Background>
      <AppContainer className="App">
        {loaded ? (
          <>
            <EnrolSection
              onClick={() =>
                ref.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <RegionSection state={state} dispatch={dispatch} ref={ref} />
            {state.region && state.district && (
              <>
                <WhoSection state={state} dispatch={dispatch} />
                <WhereSection state={state} dispatch={dispatch} />
                <WhySection />
                <HowSection state={state} dispatch={dispatch} />
                <WhenSection state={state} dispatch={dispatch} />
                <LogoContainer>
                  <LogoText>Proudly made by:</LogoText>
                  <a
                    href="https://www.generationzero.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Logo src="./assets/gen_zero_logo.png" />
                  </a>
                </LogoContainer>
              </>
            )}
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

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: blue;
  background: rgb(21, 20, 37);
  background: linear-gradient(
    180deg,
    rgba(21, 20, 37, 1) 0%,
    rgba(61, 92, 142, 1) 25%,
    rgba(61, 92, 142, 1) 75%,
    rgba(21, 20, 37, 1) 100%
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
