import { useEffect, useState } from "react";
import { MapContainer, ClickToMark, SearchToMark } from "@components/AMap";
import ToolbarHeader from "@components/ToolbarHeader";
import PoiList from "@components/PoiList";
import 'ant-design-pro/dist/ant-design-pro.css';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "96%", margin: "10px auto" }}>
      <ToolbarHeader />
      <div style={{ height: "90vh", width: "100%" }}>
        <MapContainer>
          <PoiList />
        </MapContainer>
      </div>
    </div>
  );
}
