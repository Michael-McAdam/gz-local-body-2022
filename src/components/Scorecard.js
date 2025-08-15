import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";

import CandidateIcons from "./CandidateIcons";

const render = ({ data, categories, type, url }) => {
  let maxNameWidth = data.Name.length * 8;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Content>
        <Score>{data.Overall}</Score>
        <Name style={{ minWidth: `${maxNameWidth}px` }}>{data.Name}</Name>
        <div>
          {type !== "board" && (
            <Table>
              <tbody>
                {categories.map((title) => {
                  return (
                    <Row key={title}>
                      <TitleCell>{title}</TitleCell>
                      <ScoreCell>{data[title] || "-"}</ScoreCell>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
          )}
          <CandidateIcons data={data} />
        </div>
        {data.dna && (
          <Tooltip
            enterTouchDelay={0}
            title="Candidate did not fill out our survey"
          >
            <ExtraInfo>*</ExtraInfo>
          </Tooltip>
        )}
      </Content>
    </a>
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
  padding: 10px 20px;
  padding-top: 20px;
  position: relative;
  border: 1px solid black;
  border-radius: 20px;

  background-color: #ebdcb7;
`;

const Score = styled.p`
  font-weight: bold;
  font-size: 2em;
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

const Table = styled.table`
  width: 150px;
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
