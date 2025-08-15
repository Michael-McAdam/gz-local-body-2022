import "../App.css";
import Section from "../components/Section";
import { levels } from "../util";
import { recordRegionSelected } from "../analytics";
import { useStore } from "../state";
import RegionSection from "../components/region_section";
import WardFinder from "../components/ward_finder";
import { useEffect } from "react";

var Scroll = require("react-scroll");
var scroller = Scroll.scroller;

const Region = () => {
  const region = useStore((state) => state.region);
  const selected = useStore((state) => state.selected);
  let disp = [];
  for (let i = 0; i < levels.length; i++) {
    // Always select the id of the previous level (or empty for first)
    let parentId = i === 0 ? "" : selected[i - 1]?.UUID || "";

    let locations = region.filter((a) => {
      return a.parent == parentId;
    });

    disp.push(
      <RegionSection
        key={i}
        level={i}
        label={levels[i]}
        locations={locations}
        selected={selected[i]}
      />
    );

    if (!selected[i]) break;
  }

  useEffect(() => {
    // Only run when the last entry of selected exists and has no SubItems
    const last = selected[selected.length - 1];
    if (selected.length > 0 && !last?.children) {
      console.log("Scrolling to who section");
      scroller.scrollTo("who", {
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }
  }, [selected]);

  return (
    <div id="region">
      <Section>
        Where are you based?
        {disp}
        <WardFinder />
      </Section>
    </div>
  );
};

export default Region;
