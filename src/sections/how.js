import "../App.css";
import styled from "@emotion/styled";
import Section from "../components/Section";

import { Chip, List, ListItem, ListItemIcon } from "@mui/material";

import PortraitIcon from "@mui/icons-material/Portrait";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import CreateIcon from "@mui/icons-material/Create";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import { Link } from "react-scroll";

function render({ state, dispatch }) {
  return (
    <Section title="HOW?">
      <Container>
        <SelectContainer>
          <span>Did you enrol before the 16th of August?</span>
          <AnswerContainer>
            <Chip
              label={"Yes"}
              className="Chip"
              color={state.enrolled ? "primary" : "secondary"}
              onClick={() => dispatch({ type: "setEnrolled", payload: true })}
              key={"Yes"}
            />
            <Chip
              label={"No"}
              className="Chip"
              color={!state.enrolled ? "primary" : "secondary"}
              onClick={() => dispatch({ type: "setEnrolled", payload: false })}
              key={"No"}
            />
          </AnswerContainer>
        </SelectContainer>
        {state.enrolled && (
          <SelectContainer>
            <>
              <span>Are your details up to date?</span>
              <AnswerContainer>
                <Chip
                  label={"Yes"}
                  className="Chip"
                  color={state.current ? "primary" : "secondary"}
                  onClick={() =>
                    dispatch({ type: "setCurrent", payload: true })
                  }
                  key={"Yes"}
                />
                <Chip
                  label={"No"}
                  className="Chip"
                  color={!state.current ? "primary" : "secondary"}
                  onClick={() =>
                    dispatch({ type: "setCurrent", payload: false })
                  }
                  key={"No"}
                />
              </AnswerContainer>
            </>
          </SelectContainer>
        )}
        <ExtraInfoContainer>
          Unsure? Find out{" "}
          <a
            href="https://enrol.vote.nz/app/enrol/#/check-online"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </ExtraInfoContainer>
        <p>{state.special && "You've got to special vote"}</p>
        <InfoContainer>
          <List sx={{ fontSize: "14px" }}>
            {state.special ? (
              <ListItem>
                <ListItemIcon>
                  <HomeWorkIcon />
                </ListItemIcon>
                <p>
                  You have to pick up your voting pack. See the{" "}
                  <Link to="Where" smooth={true}>
                    <a href="#">Where</a>
                  </Link>{" "}
                  section below for locations.
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
                  <b> Wednesday 21 September.</b>
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
                <b> 8th of October</b>
              </p>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MarkunreadMailboxIcon />
              </ListItemIcon>
              <p>
                Or you can mail in your papers before the<b> 3rd of October.</b>{" "}
                Find your nearest mailbox{" "}
                <a
                  href="https://www.nzpost.co.nz/tools/postshop-kiwibank-locator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </p>
            </ListItem>
          </List>
        </InfoContainer>
      </Container>
    </Section>
  );
}

export default render;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;

  & > p {
    font-size: 30px;
    font-weight: bold;
  }
`;

const InfoContainer = styled.div`
  height: 70%;
  width: 80%;
  max-width: 500px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  align-content: flex-end;
  flex-wrap: wrap;
  font-size: 16px;
  max-width: 450px;
  width: 80%;
  margin-bottom: 10px;
  row-gap: 10px;

  & > span {
    font-weight: bold;
  }
`;

const ExtraInfoContainer = styled.div`
  font-size: 12px;
`;

const AnswerContainer = styled.div`
  font-size: 12px;
  display: flex;
  flex-wrap: nowrap;

  & > .Chip {
    margin-right: 10px;
    /* color: white; */
    /* color: #221f1f; */
  }
`;
