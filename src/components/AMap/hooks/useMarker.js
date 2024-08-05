import { useEffect, useState } from "react";
import { useStore } from "@store";

// eslint-disable-next-line react/prop-types
export default function useMarker({ lng, lat }) {
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map || !AMap || !lng || !lat) return;
    const position = new AMap.LngLat(lng, lat); //Marker 经纬度
    const marker = new AMap.Marker({
      position,
    });
    setMarker(marker);
  }, [map, AMap]); // eslint-disable-line

  return [marker, setMarker]
}