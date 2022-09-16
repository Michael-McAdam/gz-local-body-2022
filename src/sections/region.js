import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";
import Section from "../components/Section";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { levels } from "../util";
import { recordRegionSelected } from "../analytics";
import { db } from "../firebase";

var Scroll = require("react-scroll");
var scroller = Scroll.scroller;

const order = levels;

/*
 Magic function which clears any selected data at a lower level than the selection and then requests the correct data
 If there is only one result it "automatically" selects it (which required a little bit of bodging)
*/

let clickHandler = async (state, dispatch, index, db, id) => {
  const level = levels[index];

  // Clear selected state and data below the current level
  let selected = state.selected;
  let data = state.data;
  for (let k = levels.length; k > index; k--) {
    selected[levels[k]] = "";
    data[levels[k]] = [];
  }
  selected[level] = id;

  //Update state
  dispatch({
    type: "setSelected",
    payload: { selected, data },
  });

  // Figure out path based on new state
  let path = "";
  for (let j = 0; j <= index; j++) {
    path += `/${order[j]}s/${selected[order[j]]}`;
  }
  path += `/${order[index + 1]}s`;

  // Request new data
  let q = query(collection(db, path), where("include", "==", true));
  let res = await getDocs(q);
  let locs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  dispatch({
    type: "addData",
    payload: {
      type: order[index + 1],
      data: locs,
    },
  });

  // If only one option, select it
  if (locs.length == 1) {
    await clickHandler(
      { ...state, data: { ...state.data, [order[index + 1]]: locs } },
      dispatch,
      index + 1,
      db,
      locs[0].id
    );
  } else if (locs.length == 0) {
    // If no options, assume we are at the bottom and scroll to next section
    recordRegionSelected(state.data, state.selected);
    scroller.scrollTo("who", { smooth: true });
  }
};

const render = ({ state, dispatch }) => {
  let district = state.selected.district;
  let wardFinder =
    district && state.data.district.find(({ id }) => id === district)?.wardMap;

  return (
    <div id="region">
      <Section>
        Where are you based?
        {order.map((level, i) => {
          // Don't render any options if there are less than 2
          if (state.data[level].length < 2) return <></>;
          return (
            <Container key={level}>
              <p>{level}</p>
              <LocationsSection>
                {state.data[level]
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((loc) => {
                    return (
                      <Chip
                        key={loc.name}
                        label={loc.name}
                        className="Chip"
                        variant={
                          loc.id !== state.selected[level] ? "outlined" : ""
                        }
                        onClick={async () =>
                          await clickHandler(state, dispatch, i, db, loc.id)
                        }
                      />
                    );
                  })}
              </LocationsSection>
            </Container>
          );
        })}
        {wardFinder && (
          <p>
            Need{" "}
            <a href={wardFinder} target="_blank" rel="noopener noreferrer">
              {" "}
              help?
            </a>
          </p>
        )}
      </Section>
    </div>
  );
};

export default render;

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
    color: white;
    margin: 2px 10px;
  }
`;
