import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef } from "react";
import Section from "../components/Section";
import { collection, getDocs, query, where } from "firebase/firestore";

var Scroll = require("react-scroll");
var Element = Scroll.Element;
var scroller = Scroll.scroller;

function render({ state, dispatch, db }) {
  return (
    <div id="region">
      <Section>
        Where are you based?
        <LocationsSection>
          {Object.values(state.regions).map((r) => {
            return (
              <Chip
                label={r.name}
                className="Chip"
                variant={r.id !== state.region ? "outlined" : ""}
                onClick={
                  async () => {
                    dispatch({ type: "setRegion", payload: r.id });
                    let q = query(
                      collection(db, "regions", r.id, "districts"),
                      where("include", "==", true)
                    );
                    let districts = await getDocs(q);
                    let res = districts.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    console.log(res);
                    dispatch({ type: "addDistricts", payload: res });
                  }

                  // let wards = await getDocs(q3);
                }
                key={r.name}
              />
            );
          })}
        </LocationsSection>
        {state.region && (
          <LocationsSection>
            {Object.values(state.districts).map((d) => {
              return (
                <Chip
                  label={d.name}
                  className="Chip"
                  variant={d.id !== state.district ? "outlined" : ""}
                  onClick={async () => {
                    dispatch({ type: "setDistrict", payload: d.id });
                    console.log(state.region);
                    console.log(d.id);
                    let q = query(
                      collection(
                        db,
                        "regions",
                        state.region,
                        "districts",
                        d.id,
                        "wards"
                      ),
                      where("include", "==", true)
                    );
                    let wards = await getDocs(q);
                    let res = wards.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    console.log(res);
                    dispatch({ type: "addWards", payload: res });
                    // scroller.scrollTo("who", {
                    //   smooth: true,
                    //   // containerId: 'ContainerElementID',
                    // });
                  }}
                  key={d.name}
                />
              );
            })}
          </LocationsSection>
        )}
        {state.district && (
          <LocationsSection>
            {Object.values(state.wards).map((w) => {
              return (
                <Chip
                  label={w.name}
                  className="Chip"
                  variant={w.id !== state.ward ? "outlined" : ""}
                  onClick={async () => {
                    dispatch({ type: "setWard", payload: w.id });
                    scroller.scrollTo("who", {
                      smooth: true,
                      // containerId: 'ContainerElementID',
                    });
                  }}
                  key={w.name}
                />
              );
            })}
          </LocationsSection>
        )}
      </Section>
    </div>
  );
}

export default render;

const LocationsSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;

  & > .Chip {
    color: white;
    margin: 2px 10px;
  }
`;
