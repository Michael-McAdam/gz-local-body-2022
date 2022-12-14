import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";
import RentIcon from "@mui/icons-material/HolidayVillage";
import RainbowIcon from "@mui/icons-material/Looks";
import AgeIcon from "@mui/icons-material/Skateboarding";
import DisabledIcon from "@mui/icons-material/AccessibleForward";
import MaoriIcon from "@mui/icons-material/Foundation";

// const categories = [
//   "Bike Friendly",
//   "Te Tiriti",
//   "Public Transport",
//   "Clean Energy",
// ];

// Whether or not they are Māori
// Whether or not they are in the rainbow community
// Whether or not they are 35 or under
// Whether or not they are a renter
// Whether or not they are disabled
// How many properties they own
// How many languages they speak

const iconStyle = {
  borderRadius: "50%",
  padding: "4px",
  borderWidth: "1px",
  borderStyle: "solid",
};

const render = ({ data, categories, type, url }) => {
  return (
    <Container className="Card" variant="outlined" title={data.comment}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Content>
          {/* <ScoreContainer> */}
          <Score>{data.overall}</Score>
          {/* </ScoreContainer> */}
          <Name>{data.name}</Name>
          {type !== "board" && (
            <Table>
              <tbody>
                {categories.map((c) => {
                  let title = c.replace(/([A-Z])/g, " $1");
                  title = title.charAt(0).toUpperCase() + title.slice(1);
                  return (
                    <Row key={c}>
                      <TitleCell>{title}</TitleCell>
                      <ScoreCell>{data[c] || "-"}</ScoreCell>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
          )}
          <IconContainer>
            {data.renter && (
              <Tooltip enterTouchDelay={0} title="Renter">
                <RentIcon
                  sx={{
                    // borderColor: "rgba(55, 47, 11, 0.6)",
                    // color: "rgba(55, 47, 11, 0.6)",
                    ...iconStyle,
                  }}
                />
              </Tooltip>
            )}
            {data.rainbow && (
              <Tooltip enterTouchDelay={0} title="Rainbow Community">
                <RainbowIcon
                  sx={{
                    // borderColor: "rgb(236, 164, 187)",
                    // color: "rgb(236, 164, 187)",
                    ...iconStyle,
                  }}
                />
              </Tooltip>
            )}
            {data.young && (
              <Tooltip enterTouchDelay={0} title="Under 35">
                <AgeIcon
                  sx={{
                    // borderColor: "rgba(232, 86, 53, 0.8)",
                    // color: "rgba(232, 86, 53, 0.8)",
                    ...iconStyle,
                  }}
                />
              </Tooltip>
            )}
            {data.disabled && (
              <Tooltip enterTouchDelay={0} title="Disabled Community">
                <DisabledIcon
                  sx={{
                    // borderColor: "rgb(168, 209, 220)",
                    // color: "rgb(168, 209, 220)",
                    ...iconStyle,
                  }}
                />
              </Tooltip>
            )}
            {data.maori && (
              <Tooltip enterTouchDelay={0} title="Māori">
                <MaoriIcon
                  sx={{
                    // borderColor: "rgb(168, 209, 220)",
                    // color: "rgb(168, 209, 220)",
                    ...iconStyle,
                  }}
                />
              </Tooltip>
            )}
          </IconContainer>
          {data.dna && (
            <Tooltip
              enterTouchDelay={0}
              title="Candidate did not fill out our survey"
            >
              <ExtraInfo>*</ExtraInfo>
            </Tooltip>
          )}
        </Content>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </a>
    </Container>
  );
};

export default render;

const Container = styled.div`
  /* width: 30%; */
  min-height: 300;
  /* background-color: "rgba(255, 255, 255, 0.5)"; */
  /* display: inline-block; */
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
  /* background-color: rgba(235, 220, 183, 0.6); */
  height: 100%;
  min-width: 150px;

  /* background-color: #ebe3d1; */
  background-color: #ebdcb7;

  /* padding: 0px 20px; */
`;

const Score = styled.p`
  font-weight: bold;
  font-size: 2em;
  margin: 0;
  text-align: center;
  margin-left: 5px;
  width: 60%;
  min-width: 90px;
  /* background-color: rgba(225, 210, 183, 1); */
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

const PictureContainer = styled.div`
  height: 150px;
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const Picture = styled.img`
  /* margin-left: 100px; */
  height: 150px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 15px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  width: 100%;
  margin-top: 15px;
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
