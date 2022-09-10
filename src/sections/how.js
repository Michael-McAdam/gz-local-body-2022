import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";

import { Chip, List, ListItem, ListItemIcon } from "@mui/material";

import PortraitIcon from "@mui/icons-material/Portrait";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import CreateIcon from "@mui/icons-material/Create";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

function render({ state, dispatch }) {
  return (
    <Section title="HOW?">
      <Container>
        <SelectContainer>
          <span>Did you enrol before the 16th of August?</span>
          <Chip
            label={"Yes"}
            className="Chip"
            variant={state.special ? "outlined" : ""}
            onClick={() => dispatch({ type: "setSpecial", payload: false })}
            key={"Yes"}
          />
          <Chip
            label={"No"}
            className="Chip"
            variant={!state.special ? "outlined" : ""}
            onClick={() => dispatch({ type: "setSpecial", payload: true })}
            key={"No"}
          />
        </SelectContainer>
        {state.special && <p> You've got to special vote</p>}
        <InfoContainer>
          <List sx={{ fontSize: "14px" }}>
            <ListItem>
              <ListItemIcon>
                <PortraitIcon />
              </ListItemIcon>
              <p>
                Make sure all your details are up to date, if you're unsure you
                can check{" "}
                <a href="https://enrol.vote.nz/app/enrol/#/check-online">
                  here
                </a>
              </p>
            </ListItem>
            {state.special ? (
              <ListItem>
                <ListItemIcon>
                  <HomeWorkIcon />
                </ListItemIcon>
                <p>
                  You have to pick up your voting pack. See the "Where" section
                  below for locations
                </p>
              </ListItem>
            ) : (
              <ListItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <p>
                  You should receive your voting pack in the mail between
                  <b> Friday 16 September </b>
                  and
                  <b> Wednesday 21 September</b>
                </p>
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <p>
                Follow the instructions in your voting pack to vote for all the
                candidates in your local area
              </p>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <p>
                Drop your voting pack off at a drop off center before the
                <b> {state.special ? "7th" : "8th"} of October</b>
              </p>
            </ListItem>
          </List>
        </InfoContainer>
      </Container>
    </Section>
  );
}

export default render;

const Image = styled.img`
  width: 50%;
  min-height: 60%;
  /* max-width: 100%; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: lightgray;
`;

const Title = styled.p`
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  /* flex-wrap: wrap; */
`;

const InfoContainer = styled.div`
  /* display: flex;
  align-items: center;
  flex-direction: column; */
  height: 70%;
  width: 80%;
  max-width: 500px;
  /* background-color: red; */
`;

const SelectContainer = styled.div`
  /* display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around; */
  /* height: 70%; */
  /* background-color: red; */
  font-size: 16px;
  /* width: 50%; */

  & > * {
    color: white;
    margin-right: 10px;
  }

  & > span {
    font-weight: bold;
  }
`;
