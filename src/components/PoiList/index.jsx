import { useState } from "react";
import { Avatar, List } from "antd";
import PoiDetailDialog from "@components/PoiDetailDialog";
import { useStore } from "@store";

const PoiList = () => {
  const poiData = useStore((state) => state.poiData);
  console.log(poiData, "poiData");
  const [visible, setVisible] = useState(false);
  const [curPoi, setCurPoi] = useState(null);

  const handleViewDetail = (poi) => {
    setCurPoi(poi);
    setVisible(true);
  }
  return poiData?.length ? (
    <>
      <List
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "calc(100% - 40px)",
          overflowY: "auto",
          zIndex: 999,
        }}
        itemLayout="horizontal"
        dataSource={poiData}
        renderItem={(item, index) => (
          <List.Item style={{ width: "300px", backgroundColor: "#ffffffaa" }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item?.name}
              description={item?.address}
              onClick={() => handleViewDetail(item)}
            />
          </List.Item>
        )}
      />
      <PoiDetailDialog
        visible={visible}
        onCancel={() => setVisible(false)}
        poiData={curPoi}
      />
    </>
  ) : null;
};
export default PoiList;
