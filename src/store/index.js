import { create } from "zustand";
import axios from "axios";
import { Modal } from "antd";

import { getParamsWithSignature } from "@utils";
const WEB_SERVICE_KEY = import.meta.env.VITE_WEB_SERVICE_KEY;

export const useStore = create((set, get) => ({
  map: undefined,
  AMap: undefined,
  initMap: (map, AMap) => set({ map, AMap }),

  isMarking: false,
  toggleMarking: () => set((state) => ({ isMarking: !state.isMarking })),

  // 出发点的集合
  vertexList: [],
  updateVertexList: (newVertex) => {
    if (newVertex) {
      set((state) => ({ vertexList: [...state.vertexList, newVertex] }));
      return;
    }
    set({ vertexList: [] });
  },

  // 中心点坐标
  pointsCenter: [],
  setPointsCenter: (center) => set({ pointsCenter: center }),

  // 中心点附近的POI数据
  poiData: [],
  setPoiData: (data) => set({ poiData: data }),

  // POI数据分页加载
  poiDataPage: 1,
  incPoiDataPage: () =>
    set((state) => ({ poiDataPage: state.poiDataPage + 1 })),

  // POI类型
  poiTypes: ["050000"],
  setPoiTypes: (types) => set({ poiTypes: types }),

  // 获取中心点附近的POI数据
  fetchPoiAround: () => {
    const { poiDataPage, poiTypes, pointsCenter, setPoiData } = get();
    if (pointsCenter.length < 2) return;
    const types = poiTypes.join("|");
    const alertModal = (content) => {
      Modal.confirm({
        title: "提示",
        content,
        okText: "确定",
        onOk: () => {},
      });
    };
    const params = {
      key: WEB_SERVICE_KEY,
      location: `${pointsCenter[0]},${pointsCenter[1]}`,
      radius: 1000,
      types,
      page: poiDataPage,
      offset: 20,
      output: "json",
    };
    axios
      .get("https://restapi.amap.com/v3/place/around", {
        params: getParamsWithSignature(params),
      })
      .then((res) => {
        const data = res?.data || {};
        // https://lbs.amap.com/api/webservice/guide/tools/info/
        if (data?.status === "0") {
          switch (data?.info) {
            case "INVALID_USER_KEY":
              alertModal("用户Key无效");
              break;
            case "INSUFFICIENT_PRIVILEGES":
              alertModal("权限不足");
              break;
            case "SERVICE_NOT_AVAILABLE":
              alertModal("服务不可用");
              break;
            case "USER_DAILY_QUERY_OVER_LIMIT":
              alertModal("用户日请求量超限");
              break;
            case "INVALID_USER_SIGNATURE":
              alertModal("用户签名无效");
              break;
            default:
              alertModal("未知错误，未查询到数据");
              break;
          }
          return;
        }
        setPoiData(res?.data?.pois);
      });
  },
}));
