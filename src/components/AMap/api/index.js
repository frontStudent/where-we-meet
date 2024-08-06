import axios from "axios";
const WEB_SERVICE_KEY = "9f36a75711c0741c33ddebc1d27880ed";

export const fetchPoiByText = (keyword) => {
  return axios.get("https://restapi.amap.com/v3/place/text", {
    params: {
      key: WEB_SERVICE_KEY,
      keywords: keyword,
      city: "南京",
    },
  });
};

export const fetchPoiAround = (center, types, page) => {
  return axios.get("https://restapi.amap.com/v3/place/around", {
    params: {
      key: WEB_SERVICE_KEY,
      location: `${center[0]},${center[1]}`,
      radius: 1000,
      types,

      page: page ?? 1,
      offset: 20,

      output: "json",
    },
  });
};

export const fetchTransitIntegrated = (origin, destination, strategy) => {
  return axios.get("https://restapi.amap.com/v3/direction/transit/integrated", {
    params: {
      key: WEB_SERVICE_KEY,
      city: "南京",
      origin,
      destination,
      strategy: strategy ?? 0,
    },
  });
};
