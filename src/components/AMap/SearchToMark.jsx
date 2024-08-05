import { useEffect, useState } from "react";
import { useStore } from "@store";
import { Button, Space, message, Select } from "antd";
import ComboBox from "@components/ComboBox";
import { getPointsCenter } from "./utils";
import { polygonCommonStyle } from "./constant";
// eslint-disable-next-line react/prop-types
import { fetchPoiByText, fetchPoiAround } from "./api";

export default function SearchToMark() {
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);
  const setPoiData = useStore((state) => state.setPoiData);

  const pointsCenter = useStore((state) => state.pointsCenter);
  const setPointsCenter = useStore((state) => state.setPointsCenter);

  const vertexList = useStore((state) => state.vertexList);
  const updateVertexList = useStore((state) => state.updateVertexList);

  const [isMarking, setIsMarking] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [curArea, setCurArea] = useState(null);
  const [type, setType] = useState("050000");

  useEffect(() => {
    if (pointsCenter?.length === 2) handleFetchPoi(pointsCenter, type);
  }, [pointsCenter, type]); // eslint-disable-line

  const handleFetchPoi = (pointsCenter, type) => {
    fetchPoiAround(pointsCenter, type).then((res) => {
      const poiData = res?.data?.pois;
      setPoiData(poiData);
    });
  };

  const handleToggleMarking = () => {
    if (isMarking && vertexList?.length <= 1) {
      message.warning("请至少标记两个顶点位置");
      return;
    }
    if (!isMarking) {
      markers.forEach((marker) => {
        map.remove(marker);
      });
      curArea && map.remove(curArea);
      setCurArea(null);
      updateVertexList();
      setMarkers([]);
      setPointsCenter([]);
      setPoiData([]);
    }
    if (isMarking) {
      const polygon = new AMap.Polygon({
        path: [vertexList], //多边形路径
        ...polygonCommonStyle,
      });

      const pointsCenter = getPointsCenter(vertexList);
      setPointsCenter(pointsCenter);

      const position = new AMap.LngLat(pointsCenter[0], pointsCenter[1]);
      const marker = new AMap.Marker({
        position,
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      map.add(marker);

      setCurArea(polygon);
      map.add(polygon);
    }
    setIsMarking(!isMarking);
  };

  const handleInputChange = (value) => {
    const lng = value.split(",")[0];
    const lat = value.split(",")[1];
    console.log(lng, lat);
    const position = new AMap.LngLat(lng, lat);
    const marker = new AMap.Marker({
      position,
    });
    map.add(marker);
    map.setCenter(position);
    updateVertexList([lng, lat]);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  return (
    <div>
      <Space style={{ zIndex: 1000, position: "fixed", left: 10, top: 10 }}>
        <ComboBox
          disabled={!isMarking}
          placeholder="输入关键字"
          style={{ width: 200 }}
          request={fetchPoiByText}
          onBeforeChange={handleInputChange}
        />
        <Button onClick={handleToggleMarking}>
          {isMarking ? "停止此轮标记" : "开始新一轮标记"}
        </Button>
        <Select
          value={type}
          onChange={(value) => setType(value)}
          options={[
            { label: "餐饮服务", value: "050000" },
            { label: "购物服务", value: "010000" },
          ]}
          style={{ width: "100px" }}
        />
      </Space>
    </div>
  );
}
