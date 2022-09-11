import "../App.css";
import RoomIcon from "@mui/icons-material/Room";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Section from "../components/Section";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";

import MapMarker from "../components/MapMarker";

const defaultLoc = {
  center: {
    lat: -39.312328190014426,
    lng: 171.87617060410338,
  },
  zoom: 5,
};

let info = [];
let _map;
let _maps;

const getMapBounds = (map, maps, locations) => {
  const bounds = new maps.LatLngBounds();
  // console.log("Setting bounds");

  locations.forEach((location) => {
    // console.log(location);
    bounds.extend(new maps.LatLng(location.lat, location.lng));
  });
  return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

const apiIsLoaded = (map, maps, locations) => {
  if (map) {
    _map = map;
    _maps = maps;
    // console.log(locations);
    const bounds = getMapBounds(map, maps, locations);
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
  }
};

function Render({ state, dispatch }) {
  useEffect(() => {
    const fetchData = async () => {
      let q = query(
        collection(
          db,
          "regions",
          state.selected.region,
          "districts",
          state.selected.district,
          "where"
        )
      );
      let where = await getDocs(q);
      dispatch({
        type: "setWhere",
        payload: where.docs.map((doc) => doc.data()),
      });
    };

    if (state.selected.region && state.selected.district) {
      console.log("Fetching: ", state.selected);
      fetchData();
    } else {
      dispatch({
        type: "setWhere",
        payload: [],
      });
      console.log("Not fetching: ", state.selected);
    }
    // return unsub;
  }, [state.selected.district]);

  // if (state.where.length == 0) {
  //   return <></>;
  // }

  let loaded = state.where.length > 0;
  let selected = state.selected.district;

  info = state.special
    ? state.where
    : state.where.filter((a) => a.type !== "special" || !a.type);

  useEffect(() => {
    apiIsLoaded(_map, _maps, info);
    console.log("Running...: ", info);
  }, [state.special]);

  return (
    <Section
      title="WHERE?"
      subtitle="All the locations in your area where you can drop off your voting pack"
    >
      {selected ? (
        loaded ? (
          <>
            <MapSection>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCf2A6eifV2BP62X3qwtdG4HJx8Dyw96pM",
                  // libraries: ["places"],
                }}
                center={defaultLoc.center}
                zoom={defaultLoc.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  apiIsLoaded(map, maps, info)
                }
                key={state.selected.district}
              >
                {info.map(
                  ({ lat, lng, name, link, type }) => {
                    // console.log(lat, lng);
                    return (
                      <MapMarker
                        key={lat}
                        lat={lat}
                        lng={lng}
                        text={name}
                        link={link}
                        type={state.special ? type : undefined}
                      />
                    );
                  }
                  // <Marker key={loc.lat} lat={loc.lat} lng={loc.lng} text={loc.name} />
                )}
              </GoogleMapReact>
            </MapSection>
            {state.special && (
              <KeyContainer>
                <MarkerContainer>
                  <RoomIcon style={{ color: "red" }} />
                  <span>Drop Off Location</span>
                </MarkerContainer>
                <MarkerContainer>
                  <RoomIcon style={{ color: "yellow" }} />
                  <span>Special Vote Pickup</span>
                </MarkerContainer>
                <MarkerContainer>
                  <RoomIcon style={{ color: "orange" }} />
                  <span>Both</span>
                </MarkerContainer>
              </KeyContainer>
            )}
          </>
        ) : (
          <>We haven't filled out the map data for your area</>
        )
      ) : (
        <>Please select a location to view map</>
      )}
    </Section>
  );
}

export default Render;

const MapSection = styled.div`
  width: 80%;
  height: 60%;
  margin-top: 40px;
  /* position: absolute; */
  /* bottom: 0; */
`;

const KeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 10px;
  justify-content: center;
`;

const MarkerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;

  & > span {
    font-size: 14px;
  }
`;
