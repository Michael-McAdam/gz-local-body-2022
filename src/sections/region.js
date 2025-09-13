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

let roll = [
    {
        id: "roll-general",
        Name: "General Roll",
        Type: "Roll",
    },
    {
        id: "roll-maori",
        Name: "Māori Roll",
        Type: "Roll",
    },
];

let maori_ward_type = "māori-ward";

const Region = () => {
    let region = useStore((state) => state.region).filter((r) => r.include);
    const selected = useStore((state) => state.selected);

    // Cleverness to inject Maori wards into the hierarchy if the Maori roll is selected
    if (selected[0]?.id === "roll-maori") {
        const maori_wards = region.filter((r) => r.Type === maori_ward_type);
        region = region.map((r) => {
            if (r.Type === maori_ward_type) return r;

            let localMaoriWards = maori_wards
                .filter((mw) => mw.parent_id === r.parent_id)
                .map((mw) => mw.coda_id);

            if (localMaoriWards.length === 0) return r;

            return { ...r, parent_id: localMaoriWards };
        });
    } else {
        region = region.filter((r) => r.Type !== maori_ward_type);
    }

    let disp = [];
    for (let i = 0; i < levels.length; i++) {
        // Always select the id of the previous level (or empty for first)

        let locations = [];
        if (i === 0) {
            locations = roll;
        } else {
            let parentId = i === 0 ? "" : selected[i - 1]?.coda_id || "";

            locations = region.filter((a) => {
                const aParent = a.parent_id;
                const aVals = Array.isArray(aParent) ? aParent : [aParent];
                return aVals.includes(parentId);
            });
        }

        disp.push(
            <RegionSection
                key={i}
                level={i}
                locations={locations}
                selected={selected[i]}
            />
        );

        if (!selected[i]) break;
    }

    useEffect(() => {
        // Only run when the last entry of selected exists and has no SubItems
        const last = selected[selected.length - 1];
        if (
            selected.length > 1 &&
            !last?.hasChildren &&
            last?.Type !== maori_ward_type
        ) {
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
