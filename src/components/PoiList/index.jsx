import { useState, useEffect } from "react";
import { Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";

import PoiDetailDialog from "@components/PoiDetailDialog";
import { useStore } from "@store";

const ContainerHeight = 600;

const PoiList = () => {
  const { poiData, poiDataPage, incPoiDataPage, fetchPoiAround } = useStore();

  console.log(poiData, "poiData");
  const [visible, setVisible] = useState(false);
  const [curPoi, setCurPoi] = useState(null);

  useEffect(() => {
    if (poiDataPage > 1) fetchPoiAround();
  }, [poiDataPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewDetail = (poi) => {
    setCurPoi(poi);
    setVisible(true);
  };

  const onScroll = (e) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      incPoiDataPage();
    }
  };
  return poiData?.length ? (
    <div>
      <List
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "300px",
          zIndex: 999,
        }}
      >
        <VirtualList
          data={poiData}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="name"
          onScroll={onScroll}
        >
          {(item, index) => (
            <List.Item style={{ backgroundColor: "#ffffffaa" }}>
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
        </VirtualList>
      </List>
      <PoiDetailDialog
        visible={visible}
        onCancel={() => setVisible(false)}
        poiData={curPoi}
      />
    </div>
  ) : null;
};
export default PoiList;
