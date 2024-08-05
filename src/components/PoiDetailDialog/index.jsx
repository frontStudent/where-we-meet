import { useEffect, useState } from "react";
import { Modal, Tabs, Empty } from "antd";
import { useStore } from "@store";
import {
  formatSeconds,
  removeParenthesesContent,
  formatDistance,
} from "@utils";
import { fetchTransitIntegrated } from "../AMap/api";
import styled from "styled-components";

const TransitCard = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(34, 34, 34, 0.1);
  margin-bottom: 10px;
  &:hover {
    box-shadow: 1px 1px 10px rgba(34, 34, 34, 0.2);
  }
`;

// eslint-disable-next-line react/prop-types
const PoiDetailDialog = ({ visible, onOk, onCancel, poiData }) => {
  const vertexList = useStore((state) => state.vertexList);
  const [vertexTabKey, setVertexTabKey] = useState("1");
  const [transitData, setTransitData] = useState([]);

  const vertexTabItems = vertexList.map((vertex, index) => ({
    key: `${index + 1}`,
    label: `出发点${index + 1}`,
  }));

  const { name = "", address = "", location = "", biz_ext } = poiData || {};

  useEffect(() => {
    if (!location) return;

    // 切换出发点视角时，重新获取交通数据
    const vertex = vertexList[vertexTabKey - 1];
    const origin = `${vertex[0]},${vertex[1]}`;

    fetchTransitIntegrated(origin, location).then(({ data }) => {
      const transits = data?.route?.transits || [];
      console.log(transits, "transits");
      setTransitData(transits);
    });
  }, [poiData, vertexTabKey]); // eslint-disable-line

  const handleFormatTransit = (transit) => {
    if (!transit?.segments?.length) return;
    const res = [];
    transit?.segments.forEach(({ walking, bus }) => {
      const buslines = bus?.buslines || [];
      if (walking?.distance) {
        res.push(`步行${walking.distance}米`);
      }
      buslines.forEach(({ name }) => {
        res.push(removeParenthesesContent(name));
      });
    });
    return res.join("->");
  };

  const handleVertexTabChange = (key) => {
    setVertexTabKey(key);
  };

  return (
    <Modal
      title={name}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={900}
    >
      <div>{`地址: ${address}`}</div>
      <Tabs
        size="large"
        defaultActiveKey="1"
        activeKey={vertexTabKey}
        items={vertexTabItems}
        onChange={handleVertexTabChange}
      />
      {transitData?.length ? (
        transitData.map((transit, index) => (
          <TransitCard key={index}>
            <div>{handleFormatTransit(transit)}</div>
            <div>{`${formatSeconds(transit?.duration)} | ${formatDistance(
              transit?.distance
            )}`}</div>
          </TransitCard>
        ))
      ) : (
        <Empty />
      )}
    </Modal>
  );
};
export default PoiDetailDialog;
