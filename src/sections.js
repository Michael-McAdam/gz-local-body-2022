import "./App.css";
import styled from "@emotion/styled";
import store from "./state";
import { connect } from "unistore/react";
import {
    EnrolSection,
    HowSection,
    RegionSection,
    WhenSection,
    WhereSection,
    WhoSection,
    WhySection,
    LandingSection,
} from "./sections/index";

import { db } from "./firebase";
import { ShareButton } from "./components/ShareButton";
import Contact from "./contact";

function Sections() {
    // ...existing code...
    let contact = null;
    // If you have a state or store, set contact accordingly
    // Example: contact = state?.data?.region?.find(a => a.id === state.selected.region)?.contact;
    return (
        <>
            <LandingSection />
            <RegionSection />
            <WhoSection />
            <HowSection />
            <WhereSection />
            {/* <WhySection /> */}
            <WhenSection />
            <Contact />
        </>
    );
}

export default Sections;

// ...existing code...
