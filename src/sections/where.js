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

const getMapBounds = (map, maps, locations) => {
  const bounds = new maps.LatLngBounds();
  console.log("Setting bounds");

  locations.forEach(({ location }) => {
    console.log(location);
    bounds.extend(new maps.LatLng(location._lat, location._long));
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
    console.log(locations);
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
          state.region,
          "districts",
          state.district,
          "where"
        )
      );
      let where = await getDocs(q);
      dispatch({
        type: "setWhere",
        payload: where.docs.map((doc) => doc.data()),
      });
    };

    fetchData();
    // return unsub;
  }, [state.district]);

  //   useEffect(() => {
  //     const bounds = new maps.LatLngBounds();

  //     console.log(locations);
  //     locations.forEach((location) => {
  //       bounds.extend(new maps.LatLng(location._lat, location._long));
  //     });
  //   });

  if (state.where.length == 0) {
    return <></>;
  }

  console.log(state.where);
  info = state.where;

  //   let info = data.loc["Wellington"];

  return (
    <Section
      title="WHERE?"
      subtitle="All the locations in your area where you can drop off your voting pack"
    >
      <MapSection>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={state.regions[state.region]?.center}
          zoom={state.regions[state.region]?.zoom}
        >
          {state.where.map((loc) => (
            <Marker key={loc.lat} lat={loc.lat} lng={loc.lng} text={loc.name} />
          ))}
        </GoogleMapReact> */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCf2A6eifV2BP62X3qwtdG4HJx8Dyw96pM",
            // libraries: ["places"],
          }}
          center={defaultLoc.center}
          zoom={defaultLoc.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, info)}
        >
          {info.map(
            ({ location: loc, name, link }) => {
              console.log(loc._lat, loc._long);
              return (
                <MapMarker
                  key={loc._lat}
                  lat={loc._lat}
                  lng={loc._long}
                  text={name}
                  link={link}
                />
              );
            }
            // <Marker key={loc.lat} lat={loc.lat} lng={loc.lng} text={loc.name} />
          )}
        </GoogleMapReact>
      </MapSection>
    </Section>
  );
}

export default Render;

const MapSection = styled.div`
  width: 80%;
  height: 60%;
  /* position: absolute; */
  /* bottom: 0; */
`;

const MarkerContainer = styled.div`
  white-space: nowrap;
`;
