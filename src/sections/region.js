import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef } from "react";
import Section from "../components/Section";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { levels } from "../util";

var Scroll = require("react-scroll");
var Element = Scroll.Element;
var scroller = Scroll.scroller;

const order = levels;

let clickHandler = async (state, dispatch, index, db, id) => {
  const level = levels[index];
  let selected = state.selected;
  let data = state.data;
  for (let k = levels.length; k > index; k--) {
    selected[levels[k]] = "";
    data[levels[k]] = [];
  }
  selected[level] = id;
  dispatch({
    type: "setSelected",
    payload: { selected, data },
  });

  let path = "";
  for (let j = 0; j <= index; j++) {
    path += `/${order[j]}s/${selected[order[j]]}`;
  }
  path += `/${order[index + 1]}s`;

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
  if (locs.length == 1) {
    await clickHandler(
      { ...state, data: { ...state.data, [order[index + 1]]: locs } },
      dispatch,
      index + 1,
      db,
      locs[0].id
    );
  } else if (locs.length == 0) {
    scroller.scrollTo("who", { smooth: true });
  }
};

function render({ state, dispatch, db }) {
  let district = state.selected.district;
  let wardFinder =
    district && state.data.district.find(({ id }) => id === district)?.wardMap;

  console.log(wardFinder);

  return (
    <div id="region">
      <Section>
        Where are you based?
        {order.map((level, i) => {
          if (state.data[level].length < 2) return <></>;
          return (
            <Container>
              <p>{level}</p>
              <LocationsSection>
                {state.data[level].map((loc) => {
                  return (
                    <Chip
                      label={loc.name}
                      className="Chip"
                      variant={
                        loc.id !== state.selected[level] ? "outlined" : ""
                      }
                      onClick={async () =>
                        await clickHandler(state, dispatch, i, db, loc.id)
                      }
                      key={data.name}
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
}

export default render;

const Container = styled.div`
  /* width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap; */
  margin-top: 20px;
  width: 100%;
  text-align: center;

  & > p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    font-style: italic;
    /* background-color: red; */
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
