import "../App.css";
import styled from "@emotion/styled";
import Scorecard from "./Scorecard";
import { useEffect, useState } from "react";

import { sortBy } from "lodash/collection";

let categories = [
    "Overall",
    "Transport",
    "Housing",
    "Environment",
    "Equity",
    "Te Tiriti",
];

function Render({ title, data, type, icon }) {
    // let loaded = data.length > 0;
    // let baseURL = pnz && `https://policy.nz/2022/${pnz}/candidates/`;

    // if (state.selected[watchKey] === "") {
    //   return (
    //     <>
    //       <Subtitle>{title}</Subtitle>
    //       <Title>
    //         Please select your location above to see your local candidates
    //       </Title>
    //     </>
    //   );
    // }
    // if (!loaded) {
    //   return (
    //     <>
    //       <Subtitle>{title}</Subtitle>
    //       <Title>These candidates in your location haven't been scored</Title>
    //     </>
    //   );
    // }

    //   let urlName =
    //   candidate.pnzName ||
    //   candidate.name?.toLowerCase().split(" ").join("-");
    // baseURL = candidate.pnzRegion
    //   ? `https://policy.nz/2022/${candidate.pnzRegion}/candidates/`
    //   : baseURL;

    // Filter categories: only show those where at least one candidate has a value (not null/undefined/empty string or '-')
    const activeCategories = categories.filter((cat) =>
        data.some(
            (candidate) =>
                candidate[cat] !== undefined &&
                candidate[cat] !== null &&
                candidate[cat] !== "" &&
                candidate[cat] !== "-"
        )
    );

    const filteredData = sortBy(
        data.filter((x) => !x.exclude),
        [
            (candidate) => {
                if (candidate.Overall === "-") {
                    return Infinity;
                }
                const base = candidate.Overall.charCodeAt(0) * 10;
                if (candidate.Overall.length === 1) {
                    return base;
                } else if (candidate.Overall[1] === "+") {
                    return base - 1;
                } else {
                    return base + 1;
                }
            },
        ]
    );

    return (
        <>
            <Subtitle>
                {title} {icon}
            </Subtitle>
            <ScorecardContainer className="horizontal">
                {filteredData.map((candidate, i) => {
                    return (
                        <Scorecard
                            data={candidate}
                            key={candidate.name}
                            categories={activeCategories}
                            type={type}
                        />
                    );
                })}
            </ScorecardContainer>
        </>
    );
}

export default Render;

const ScorecardContainer = styled.div`
    width: 100%;
    padding-left: 2.5vw;
    padding-right: 2.5vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    overflow-x: auto;
    overflow-y: hidden;
    height: fit-content;
    gap: 10px;
`;

const Subtitle = styled.h2``;
