import { useEffect, useRef } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useStore } from "@store";

import { getFormatPosition } from "./utils";

export default function MapContainer(props) {
  const { children, center } = props; //eslint-disable-line
  const initMap = useStore((state) => state.initMap);
  let mapRef = useRef(null);

  const handleLoadMap = (AMap) => {
    let centerConfig = center
      ? { center: getFormatPosition(center, "array") }
      : {};

    const map = new AMap.Map("container", {
      viewMode: "3D", // 是否为3D地图模式
      zoom: 13, // 初始化地图级别
      ...centerConfig, // 初始化地图中心点位置
    });

    //添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    map.addControl(new AMap.ToolBar({ position: "RT" }));

    //添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.addControl(new AMap.Scale());

    //添加定位控件，用来获取和展示用户主机所在的经纬度位置
    const geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      // enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 5000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      // zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      buttonPosition: "RB",
    });

    map.addControl(geolocation);
    // 组件使用者不自定义中心点就用高德自带定位
    if (!center) geolocation.getCurrentPosition();

    initMap(map, AMap);
  };

  useEffect(() => {
    AMapLoader.load({
      key: "b9067eeb9d3e86a8e3baca77679ca190", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.AutoComplete",
        "AMap.PlaceSearch",
        "AMap.ToolBar",
        "AMap.Scale",
        "AMap.HawkEye",
        "AMap.MapType",
        "AMap.Geolocation",
        "AMap.ControlBar",
      ],
    })
      .then((AMap) => {
        mapRef.current && handleLoadMap(AMap);
      })
      .catch((e) => {
        console.log(e);
      });
    // return () => {
    //   map?.destroy();
    // };
  }, [mapRef]); // eslint-disable-line

  return (
    <div
      id="container"
      ref={mapRef}
      style={{ height: "100%", padding: 0, margin: 0, width: "100%", position: "relative" }}
    >
      {children}
    </div>
  );
}
