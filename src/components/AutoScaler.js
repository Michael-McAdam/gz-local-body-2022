import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const useScreenSize = () => {
  const [size, setSize] = useState({
    screenWidth: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = window.addEventListener("resize", (evt) => {
      setSize({ screenWidth: window.innerWidth, height: window.innerHeight });
    });
    return () => window.removeEventListener("resize", handler);
  }, [setSize]);

  return size;
};

/**
 * Children needs to be a function of the type (ref, scale: number) => React.ReactNode
 */
export const AutoScaler = ({ children, initialWidth }) => {
  const [scale, setScale] = useState(1);
  const { screenWidth } = useScreenSize();

  const ref = useRef(null);

  const baseWidth = useMemo(() => initialWidth * scale, [initialWidth, scale]);

  useEffect(() => {
    const scale = screenWidth / initialWidth;
    setScale(Math.min(1, scale));
  }, [baseWidth, screenWidth]);

  // console.log(scale, baseWidth)

  return <>{children(ref, scale)}</>;
};
