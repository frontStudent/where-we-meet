import { useEffect, useState } from "react";
import { MapContainer, ClickToMark, SearchToMark } from "@components/AMap";
import PoiList from "@components/PoiList";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer>
        <SearchToMark />
        <PoiList />
      </MapContainer>
    </div>
  );
}
