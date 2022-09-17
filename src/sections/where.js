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
import { GenericErrorBoundary } from "../components/GenericErrorBoundary";

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

  locations.forEach((location) => {
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
    const bounds = getMapBounds(map, maps, locations);
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
  }
};

const Body = ({ state, dispatch }) => {
  let loaded = state.where.length > 0;
  let selected = state.selected.district;

  // Cleverness to pull lat, lng and name from Maps URL
  var locRegex = new RegExp("@(.*),(.*),");
  var nameRegex = new RegExp("/place/(.*)/@");

  info = state.where
    .map((x) => {
      var loc = x.link.match(locRegex);
      var lat = loc && loc[1];
      var lng = loc && loc[2];
      var name_match = x.link.match(nameRegex);
      var name = name_match && name_match[1];
      name = name?.split("+").join(" ");
      name = decodeURIComponent(name);
      let out = { lat, lng, name, ...x };
      return out;
    })
    .filter((a) => a.lat && a.lng)
    .sort((a, b) => (a.type === "special" ? 1 : -1));

  // console.log(info);

  // info = state.special
  //   ? info
  //   : info.filter((a) => a.type !== "special" || !a.type);

  useEffect(() => {
    apiIsLoaded(_map, _maps, info);
    // console.log("Running...: ", info);
  }, [state.special]);

  return (
    <>
      {selected ? (
        loaded ? (
          <>
            <MapSection>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCf2A6eifV2BP62X3qwtdG4HJx8Dyw96pM",
                }}
                center={defaultLoc.center}
                zoom={defaultLoc.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  apiIsLoaded(map, maps, info)
                }
                key={state.selected.district}
              >
                {info.map(({ lat, lng, name, link, type }) => {
                  return (
                    <MapMarker
                      key={name}
                      lat={lat}
                      lng={lng}
                      text={name}
                      link={link}
                      type={state.special ? type : undefined}
                    />
                  );
                })}
              </GoogleMapReact>
            </MapSection>
            {state.special && (
              <KeyContainer>
                <MarkerContainer>
                  <RoomIcon style={{ color: "red" }} />
                  <span>Drop Off Location</span>
                </MarkerContainer>
                <MarkerContainer>
                  <RoomIcon style={{ color: "#556a41" }} />
                  <span>Special Vote Pickup</span>
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
    </>
  );
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
      fetchData();
    } else {
      dispatch({
        type: "setWhere",
        payload: [],
      });
    }
  }, [state.selected.district]);

  return (
    <div id="Where">
      <Section
        title="WHERE?"
        subtitle="All the locations in your area where you can drop off your voting pack"
      >
        <GenericErrorBoundary
          errorContent={() => (
            <>
              Oops! Looks like something went wrong while loading the map.
              Please try again later.
            </>
          )}
        >
          <Body state={state} dispatch={dispatch} />
        </GenericErrorBoundary>
      </Section>
    </div>
  );
}

export default Render;

const MapSection = styled.div`
  width: 80%;
  height: 60%;
  margin-top: 40px;
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
