import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { levels } from "../util";
import { recordRegionSelected } from "../analytics";
import { set } from "lodash";
import { connect } from "unistore/react";

var Scroll = require("react-scroll");
var scroller = Scroll.scroller;

/*
 Magic function which clears any selected data at a lower level than the selection and then requests the correct data
 If there is only one result it "automatically" selects it (which required a little bit of bodging)
*/

const actions = {
  setSelected: (state, level, id) => {
    let selected = state.selected.slice(0, level + 1);
    selected[level] = id;
    return { ...state, selected };
  },
};

const render = ({ level, label, locations = [], selected, setSelected }) => {
  if (locations.length === 1 && !selected) {
    setSelected(level, locations[0].UUID);
  }

  if (locations.length <= 1) {
    return null;
  }

  let locationDisplay = locations.map((loc, i) => {
    let sel = selected === loc.UUID;
    return (
      <Chip
        key={loc.id}
        label={loc.Name}
        className="Chip"
        color={sel ? "primary" : "secondary"}
        sx={{
          transform: sel ? "scale(1.2)" : "",
        }}
        onClick={() => setSelected(level, loc.UUID)}
      />
    );
  });

  return (
    <Container key={label}>
      <p>{label}</p>
      <LocationsSection>{locationDisplay}</LocationsSection>
    </Container>
  );
};

export default connect([], actions)(render);

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;

  & > p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    font-style: italic;
  }
`;

const LocationsSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;

  & > .Chip {
    /* color: white; */
    /* color: #221f1f; */
    margin: 2px 10px;
  }
`;
