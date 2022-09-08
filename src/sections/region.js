import "../App.css";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef } from "react";
import Section from "../components/Section";

function render({ state, dispatch }) {
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
                onClick={() => dispatch({ type: "setRegion", payload: r.id })}
                key={r.name}
              />
            );
          })}
        </LocationsSection>
        {state.region && (
          <LocationsSection>
            {Object.values(state.regions[state.region].districts).map((d) => {
              return (
                <Chip
                  label={d.name}
                  className="Chip"
                  variant={d.id !== state.district ? "outlined" : ""}
                  onClick={() =>
                    dispatch({ type: "setDistrict", payload: d.id })
                  }
                  key={d.name}
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
