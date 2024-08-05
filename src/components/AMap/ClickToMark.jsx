import { useEffect, useState, useRef } from "react";
import { useStore } from "@store";
import { Button, Input, Space, message, Select } from "antd";
import { getPointsCenter } from "./utils";
import { polygonCommonStyle } from "./constant";
// eslint-disable-next-line react/prop-types
import { fetchPoiAround } from "./api";

export default function ClickToMark() {
  const inputRef = useRef(null);
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);
  const setPoiData = useStore((state) => state.setPoiData);

  const pointsCenter = useStore((state) => state.pointsCenter);
  const setPointsCenter = useStore((state) => state.setPointsCenter);

  const [isMarking, setIsMarking] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [vertexList, setVertexList] = useState([]);
  const [curArea, setCurArea] = useState(null);
  const [type, setType] = useState("050000");

  const handleMapClick = (e) => {
    const { lng, lat } = e.lnglat || {};
    const position = new AMap.LngLat(lng, lat);
    const marker = new AMap.Marker({
      position,
    });
    setVertexList((prevVertexList) => [...prevVertexList, [lng, lat]]);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
    map.add(marker);
  };

  useEffect(() => {
    if (!map || !AMap) return;
    if (isMarking) {
      map.on("click", handleMapClick);
    }

    var autoOptions = {
      city: "南京",
      input: "tip_input",
    };
    
    //地图图块加载完成后触发
    var auto = new AMap.AutoComplete(autoOptions); //实例化AutoComplete模块
    var placeSearch = new AMap.PlaceSearch({
      map: map, //文档中的map参数
    }); //构造地点查询类

    auto.on("select", function (e) {
      console.log(e);
      // placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    });

    placeSearch.on("selectChanged", function (e) {
      console.log(e);
    })

    placeSearch.on("markerClick", function (e) {
      console.log(e);
    })

    return () => {
      console.log("off click");
      map.off("click", handleMapClick);
    };
  }, [map, AMap, isMarking]); // eslint-disable-line

  useEffect(() => {
    handleFetchPoi(pointsCenter, type);
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
      setVertexList([]);
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
  return (
    <div>
      <Space style={{ zIndex: 1000, position: "fixed", left: 10, top: 10 }}>
        <Input
          id="tip_input"
          ref={inputRef}
          placeholder="输入关键字"
          style={{ width: 200 }}
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
