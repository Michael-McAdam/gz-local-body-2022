import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";

import CandidateIcons from "./CandidateIcons";

const render = ({ data, categories, type, url }) => {
    let maxNameWidth = data.Name.length * 8;

    maxNameWidth = Math.max(maxNameWidth, 150);

    return (
        <div>
            <Content>
                {data.pnz && (
                    <LinkOverlay
                        href={data.pnz}
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                )}
                <Score>{data.Overall || "?"}</Score>
                <div>
                    <Name style={{ width: `${maxNameWidth}px` }}>
                        {data.Name}
                    </Name>
                    {data.Iwi && <Iwi>{data.Iwi}</Iwi>}
                </div>
                <div>
                    {type !== "board" && (
                        <Table>
                            <tbody>
                                {categories.map((title) => {
                                    return (
                                        <Row key={title}>
                                            <TitleCell>{title}</TitleCell>
                                            <ScoreCell>
                                                {data[title] || "-"}
                                            </ScoreCell>
                                        </Row>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                    <CandidateIcons data={data} />
                </div>
                {data.Overall && data.late && (
                    <Tooltip
                        enterTouchDelay={0}
                        title="Candidate submitted their survey after the deadline"
                    >
                        <ExtraInfo>*</ExtraInfo>
                    </Tooltip>
                )}
            </Content>
        </div>
    );
};

export default render;

// const Container = styled.div`
//   width: fit-content;
//   /* min-height: fit-content; */
//   /* height: 100%; */
//   display: flex;
//   flex-direction: column;

//   & > a {
//     color: inherit; /* blue colors for links too */
//     text-decoration: inherit; /* no underline */
//   }
// `;

const Content = styled.div`
    width: fit-content;
    min-width: 180px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    // padding-top: 20px;
    position: relative;
    border: 1px solid black;
    border-radius: 20px;

    background-color: #ebdcb7;
`;

const LinkOverlay = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-decoration: none;
    color: transparent;
`;

const Score = styled.p`
    font-weight: bold;
    font-size: 50px;
    margin: 0;
    text-align: center;
    width: 90px;
    height: 90px;
    aspect-ratio: 1 / 1;
    background-color: #e24f33;
    border-radius: 50%;
    color: #372f0b;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Name = styled.p`
    font-weight: 900;
    font-size: 20px;
    margin: 0;
    text-align: center;
    word-break: break-word;
    white-space: normal;
`;

const Iwi = styled.p`
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #372f0b;
    font-style: italic;
`;

const Table = styled.table`
    width: 200px;
    margin: 0 auto;
    border-collapse: collapse;
`;
const Row = styled.tr`
    font-size: 0.5em;

    & > td {
        border-bottom: 1px solid;
    }
`;
const TitleCell = styled.td`
    text-align: left;
`;
const ScoreCell = styled.td`
    text-align: left;
`;

const ExtraInfo = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
`;
