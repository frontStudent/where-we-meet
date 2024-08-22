import axios from "axios";
import { getParamsWithSignature } from "@utils";
const WEB_SERVICE_KEY = import.meta.env.VITE_WEB_SERVICE_KEY;

export const fetchPoiByText = (keyword) => {
  if (!keyword) return;
  const params = {
    key: WEB_SERVICE_KEY,
    keywords: keyword,
    city: "南京",
  }
  return axios.get("https://restapi.amap.com/v3/place/text", {
    params: getParamsWithSignature(params),
  });
};

export const fetchPoiAround = (center, types, page) => {
  const params = {
    key: WEB_SERVICE_KEY,
    location: `${center[0]},${center[1]}`,
    radius: 1000,
    types,
    page: page ?? 1,
    offset: 20,
    output: "json",
  }
  return axios.get("https://restapi.amap.com/v3/place/around", {
    params: getParamsWithSignature(params),
  });
};

export const fetchTransitIntegrated = (origin, destination, strategy) => {
  const params = {
    key: WEB_SERVICE_KEY,
    city: "南京",
    origin,
    destination,
    strategy: strategy ?? 0,
  }
  return axios.get("https://restapi.amap.com/v3/direction/transit/integrated", {
    params: getParamsWithSignature(params),
  })

};
