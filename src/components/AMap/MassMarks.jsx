import { useEffect } from "react";
import { useStore } from "@store";
import { generateRandomLngLatData } from "./utils";
 
// eslint-disable-next-line react/prop-types
export default function MassMarks() {
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);

  useEffect(() => {
    if (!map || !AMap) return;
    const style = {
      url: "//vdata.amap.com/icons/b18/1/2.png", //图标地址
      size: new AMap.Size(11, 11), //图标大小
      anchor: new AMap.Pixel(5, 5), //图标显示位置偏移量，基准点为图标左上角
    };

    const data = generateRandomLngLatData(1000).map((item) => ({ ...item, name: "随机点" }));
    const massMarks = new AMap.MassMarks(data, {
      zIndex: 5, //海量点图层叠加的顺序
      zooms: [3, 19], //在指定地图缩放级别范围内展示海量点图层
      style: style, //设置样式对象
    });

    massMarks.setMap(map);
  }, [map, AMap]); // eslint-disable-line

  return null
}
