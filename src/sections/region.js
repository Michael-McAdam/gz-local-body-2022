import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import Section from "../components/Section";
import { levels } from "../util";
import { recordRegionSelected } from "../analytics";
import { set } from "lodash";
import { connect } from "unistore/react";
import RegionSection from "./region_section";

var Scroll = require("react-scroll");
var scroller = Scroll.scroller;

const render = ({ region, selected }) => {
  //   let district = selected.district;
  //   let wardFinder =
  //     district && state.data.district.find(({ id }) => id === district)?.wardMap;

  let disp = [];
  for (let i = 0; i < levels.length; i++) {
    // Always select the id of the previous level (or empty for first)
    let parentId = i === 0 ? "" : selected[i - 1] || "";

    let locations = region.filter((a) => {
      return a.Parent == parentId;
    });

    disp.push(
      <RegionSection
        level={i}
        label={levels[i]}
        locations={locations}
        selected={selected[i]}
      />
    );

    if (!selected[i]) break;
  }

  if (disp.length === levels.length) {
    setTimeout(() => {
      scroller.scrollTo("region", {
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }, 0);
  }

  return (
    <div id="region">
      <Section>
        Where are you based?
        {disp}
        {/* {wardFinder && (
          <p>
            Need{" "}
            <a href={wardFinder} target="_blank" rel="noopener noreferrer">
              {" "}
              help?
            </a>
          </p>
        )} */}
      </Section>
    </div>
  );
};

export default connect(["region", "selected"])(render);
