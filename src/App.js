import "./App.css";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { useRef, useEffect } from "react";
import store from "./state";
import { Provider } from "unistore/react";

import Section from "./components/Section";
import { ShareButton } from "./components/ShareButton";
import DataConnect from "./data_connect";
import Sections from "./sections";

store.subscribe((state, actions) => {
  console.log("State updated:", state);
});

function App() {
  // let loaded = Object.keys(state.data.region).length > 0;
  // let contact = state.data.region.find(
  //   (a) => a.id === state.selected.region
  // )?.contact;

  const loaded = true;

  return (
    <Provider store={store}>
      <div>
        <DataConnect />
        <Background>
          <AppContainer className="App">
            {loaded ? (
              <Sections />
            ) : (
              <Section>
                <CircularProgress />
              </Section>
            )}

            <ShareButton
              href={document.location.href}
              style={{ position: "fixed", bottom: 10, left: 10 }}
            />
          </AppContainer>
        </Background>
      </div>
    </Provider>
  );
}

export default App;

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: #a4d1dd;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
`;
