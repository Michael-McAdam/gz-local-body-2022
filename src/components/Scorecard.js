import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";

// const categories = [
//   "Bike Friendly",
//   "Te Tiriti",
//   "Public Transport",
//   "Clean Energy",
// ];

const render = ({ data, categories }) => {
  return (
    <Container className="Card" variant="outlined">
      <CardContent>
        {/* <ScoreContainer> */}
        <Score>{data.overall}</Score>
        {/* </ScoreContainer> */}
        <Name>{data.name}</Name>
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
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Container>
  );
};

export default render;

const Container = styled(Card)`
  width: 30%;
  min-width: 200px;
  min-height: 300;
  background-color: "rgba(255, 255, 255, 0.5)";
`;

const Score = styled.p`
  font-weight: bold;
  font-size: 2em;
  margin: 0;
  text-align: center;
  margin-left: 5px;
  width: 60%;
  background-color: rgba(225, 210, 183, 1);
  border-radius: 50px;
  margin: auto;
`;

const Name = styled.p`
  font-weight: 900;
  font-size: 20px;
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

const Table = styled.table`
  width: 80%;
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
