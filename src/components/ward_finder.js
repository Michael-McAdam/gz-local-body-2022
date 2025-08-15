import "../App.css";
import { connect } from "unistore/react";
import { useStore } from "../state";

const Render = () => {
  const selected = useStore((state) => state.selected);

  let wardMaps = selected
    .filter(({ wardMap }) => Boolean(wardMap))
    .map(({ wardMap }) => wardMap);

  let wardFinder = wardMaps[wardMaps.length - 1];

  if (!wardFinder) {
    return null;
  }

  return (
    <p>
      Need{" "}
      <a href={wardFinder} target="_blank" rel="noopener noreferrer">
        {" "}
        help?
      </a>
    </p>
  );
};

export default Render;
