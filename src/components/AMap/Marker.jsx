import { useEffect } from "react";
import { useStore } from "@store";
import useMarker from './hooks/useMarker';

// eslint-disable-next-line react/prop-types
export default function Marker({ point = { lng: 116.397428, lat: 39.90923 } }) {
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);
  const { lng, lat } = point;
  const [marker] = useMarker(lng, lat);

  useEffect(() => {
    if (!map || !AMap) return;
    map.add(marker);
  }, [map, AMap]); // eslint-disable-line

  return null;
}
