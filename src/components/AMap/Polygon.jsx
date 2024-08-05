import { useEffect } from "react";
import { useStore } from "@store";

// eslint-disable-next-line react/prop-types
export default function Polygon() {
  const map = useStore((state) => state.map);
  const AMap = useStore((state) => state.AMap);

  useEffect(() => {
    if (!map || !AMap) return;
    const pathArr = [
      [
        [
          [116.397428, 39.90923],
          [116.390428, 39.80923],
          [116.37428, 39.90023],
        ],
      ],
    ];

    const polygon = new AMap.Polygon({
      path: pathArr, //多边形路径
      fillColor: "#ccebc5", //多边形填充颜色
      strokeOpacity: 1, //线条透明度
      fillOpacity: 0.5, //填充透明度
      strokeColor: "#2b8cbe", //线条颜色
      strokeWeight: 1, //线条宽度
      strokeStyle: "dashed", //线样式
      strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
    });

    map.add(polygon);
  }, [map, AMap]); // eslint-disable-line

  return <></>;
}
