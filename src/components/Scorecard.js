import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";

import CandidateIcons from "./CandidateIcons";

const render = ({ data, categories, type, url }) => {
  

  return (
    <Container className="Card" variant="outlined" title={data.comment}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Content>
          <Score>{data.Overall}</Score>
          <Name>{data.Name}</Name>
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
    </Container>
  );
};

export default render;

const Container = styled.div`
  min-height: 300;
  width: fit-content;

  & > a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
`;

const Content = styled.div`
  width: fit-content;
  display: inline-block;
  padding: 10px 20px;
  position: relative;
  border: 1px solid black;
  border-radius: 20px;
  height: 100%;
  min-width: 150px;

  background-color: #ebdcb7;
`;

const Score = styled.p`
  font-weight: bold;
  font-size: 2em;
  margin: 0;
  text-align: center;
  margin-left: 5px;
  width: 60%;
  min-width: 90px;
  background-color: #e24f33;
  border-radius: 50px;
  margin: auto;
  color: #372f0b;
`;

const Name = styled.p`
  font-weight: 900;
  font-size: 20px;
  /* font-size: 0.7em; */
  white-space: nowrap;
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
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
