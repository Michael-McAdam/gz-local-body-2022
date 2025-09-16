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
import { useStore } from "./state";
import FAQ from "./sections/FAQ";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    // let loaded = Object.keys(state.data.region).length > 0;
    // let contact = state.data.region.find(
    //   (a) => a.id === state.selected.region
    // )?.contact;

    const loaded = useStore((state) => state.loaded);

    const under_construction = false;

    if (under_construction) {
        return (
            <Background>
                <AppContainer className="App">
                    <Section>
                        <h2>Under Construction</h2>
                        <p>
                            This site is currently being updated for the 2025
                            election. Please check back soon!
                        </p>
                    </Section>
                </AppContainer>
            </Background>
        );
    }

    return (
        <BrowserRouter>
            <DataConnect />
            <Background>
                <AppContainer className="App">
                    <Routes>
                        <Route path="/faq" element={<FAQ />} />
                        <Route
                            path="*"
                            element={
                                loaded ? (
                                    <Sections />
                                ) : (
                                    <Section>
                                        <CircularProgress />
                                        <p>Loading data...</p>
                                    </Section>
                                )
                            }
                        />
                    </Routes>
                    <ShareButton
                        href={document.location.href}
                        style={{ position: "fixed", bottom: 10, left: 10 }}
                    />
                </AppContainer>
            </Background>
        </BrowserRouter>
    );
}

export default App;

const Background = styled.div`
    height: 150%;
    width: 100%;
    background-color: #a4d1dd;
    min-height: 100vh;
`;

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
`;
