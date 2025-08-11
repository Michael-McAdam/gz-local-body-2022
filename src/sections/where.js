import "../App.css";
import RoomIcon from "@mui/icons-material/Room";
import styled from "@emotion/styled";
import data from "../data";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Section from "../components/Section";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";

import MapMarker from "../components/MapMarker";
import { GenericErrorBoundary } from "../components/GenericErrorBoundary";
import { connect } from "unistore/react";

const defaultLoc = {
  center: [-39.312328190014426, 171.87617060410338],
  zoom: 5,
};

// Leaflet handles bounds automatically, but you can use fitBounds if needed.

const Body = ({ selected, where, special }) => {
  // let loaded = state.where.length > 0;
  // let selected = selected.district;
  console.log(selected);

  // locations where loc.District matches any selected.Name
  const selectedNames = selected.map((s) => s.Name);
  const locations = where?.filter(
    (loc) => loc.District && selectedNames.includes(loc.District)
  );

  let loaded = true;

  // Cleverness to pull lat, lng and name from Maps URL
  var locRegex = new RegExp("@(.*),(.*),");
  var nameRegex = new RegExp("/place/(.*)/@");

  const info = locations
    .map((x, idx) => {
      var loc = x.link.match(locRegex);
      var lat = loc && parseFloat(loc[1]);
      var lng = loc && parseFloat(loc[2]);
      var name_match = x.link.match(nameRegex);
      var name = name_match && name_match[1];
      name = name?.split("+").join(" ");
      name = decodeURIComponent(name);
      // Use a unique key: prefer x.id, else name+idx
      let out = { lat, lng, name, ...x, _key: x.id || `${name}-${idx}` };
      return out;
    })
    .filter((a) => a.lat && a.lng)
    .sort((a, b) => (a.type === "special" ? 1 : -1));

  // Center map on first marker or default
  const mapCenter =
    info.length > 0 ? [info[0].lat, info[0].lng] : defaultLoc.center;

  return (
    <>
      {selected ? (
        loaded ? (
          <>
            <MapSection>
              <MapContainer
                center={mapCenter}
                zoom={defaultLoc.zoom}
                style={{ width: "100%", height: "400px" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {info.map(({ lat, lng, name, link, type, _key }) => (
                  <Marker key={_key} position={[lat, lng]}>
                    <Popup>
                      <div>
                        <strong>{name}</strong>
                        {link && (
                          <div>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View on Google Maps
                            </a>
                          </div>
                        )}
                        {type && <div>Type: {type}</div>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </MapSection>
            {special && (
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
          <ErrorContainer>
            We haven't filled out the map data for your area
          </ErrorContainer>
        )
      ) : (
        <ErrorContainer>Please select a location to view map</ErrorContainer>
      )}
    </>
  );
};

function Render({ where, selected, special }) {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let q = query(
  //       collection(
  //         db,
  //         "regions",
  //         state.selected.region,
  //         "districts",
  //         state.selected.district,
  //         "where"
  //       )
  //     );
  //     let where = await getDocs(q);
  //     dispatch({
  //       type: "setWhere",
  //       payload: where.docs.map((doc) => doc.data()),
  //     });
  //   };

  //   if (state.selected.region && state.selected.district) {
  //     fetchData();
  //   } else {
  //     dispatch({
  //       type: "setWhere",
  //       payload: [],
  //     });
  //   }
  // }, [state.selected.district]);

  return (
    <div id="Where">
      <Section
        title="WHERE?"
        subtitle="All the locations in your area where you can drop off your voting pack"
      >
        {/* <GenericErrorBoundary
          errorContent={() => (
            <>
              Oops! Looks like something went wrong while loading the map.
              Please try again later.
            </>
          )}
        > */}
        <Body selected={selected} where={where} special={special} />
        {/* </GenericErrorBoundary> */}
      </Section>
    </div>
  );
}

export default connect(["where", "selected", "special"], {})(Render);

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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10em;

  & > span {
    font-size: 14px;
  }
`;
