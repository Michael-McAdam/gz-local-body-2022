import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { useState } from "react";

import WhoInfo from "../components/WhoInfo";
import BoardInfo from "../components/BoardInfo";
import ScorecardSection from "../components/ScorecardSection";

import { connect } from "unistore/react";
import CandidateIconKey from "../components/CandidateIconKey";
import ElectionLinks from "../components/ElectionLinks";

import { useStore } from "../state";
import { use } from "react";

const Render = () => {
    let [open, setOpen] = useState(false);
    let [boardOpen, setBoardOpen] = useState(false);

    const selected = useStore((state) => state.selected);
    let candidates = useStore((state) => state.candidates);
    const candidate_types = useStore((state) => state.candidate_types);

    // Filter out regional-maori if no maori wards selected and vice versa
    if (selected.map((s) => s.Type).includes("māori-ward")) {
        candidates = candidates.filter((c) => c.key !== "regional");
    } else {
        candidates = candidates.filter((c) => c.key !== "regional-maori");
    }
    // Get the list of candidates which is stored as a list of csv
    let selectedCandidates = selected
        .map((sel) => {
            let selectedList = sel.candidates?.split(",") || [];
            return selectedList.map((c) => {
                return candidates.find(
                    (candidate) => String(candidate.rowID) === String(c)
                );
            });
        })
        .flat();

    // console.log({ selectedCandidates });

    // Group candidates by their type
    let groupedCandidates = selectedCandidates.reduce((acc, candidate) => {
        if (!candidate || !candidate.key) return acc;
        if (!acc[candidate.key]) acc[candidate.key] = [];
        acc[candidate.key].push(candidate);
        return acc;
    }, {});

    // Remove candidate types that are not scored
    let keys =
        candidate_types?.filter((ct) => {
            return Object.keys(groupedCandidates)?.includes(ct.key);
        }) || [];

    // console.log({ candidate_types, keys, groupedCandidates });

    const subtitle = (
        <>
            We researched the candidates so that you don't have to. Our scoring
            process can be found{" "}
            <a href="#" onClick={() => setOpen(true)}>
                here
            </a>
        </>
    );

    return (
        <Section
            title="WHO?"
            id="who"
            // icon={<InfoIcon onClick={() => setOpen(true)} fontSize="large" />}
            subtitle={subtitle}
            // dense={true}
        >
            <WhoInfo open={open} onClose={() => setOpen(false)} />
            <BoardInfo open={boardOpen} onClose={() => setBoardOpen(false)} />
            {keys.map((key) => {
                return (
                    <ScorecardSection
                        title={key.display || "Error"}
                        data={groupedCandidates[key.key] || []}
                        type={key.key}
                        key={key.id}
                        // pnz={pnzMayor}
                    />
                );
            })}
            <ExtrasContainer>
                <CandidateIconKey />
                <ElectionLinks />
                <p>* = candidate submitted survey after scorecard launch.</p>
                <p>** = candidate declined to fill our survey.</p>
                <p>† = candidate is running unopposed.</p>
            </ExtrasContainer>
        </Section>
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
