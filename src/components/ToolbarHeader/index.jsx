import { useEffect, useState } from "react";
import { useStore } from "@store";
import { SearchToMark } from "@components/AMap";
import "ant-design-pro/dist/ant-design-pro.css";
import TagSelect from "ant-design-pro/lib/TagSelect";

const foodOptions = [
  { label: "中餐厅", value: "050100" },
  { label: "外国餐厅", value: "050200" },
  { label: "快餐1", value: "050300" },
  { label: "咖啡厅", value: "050500" },
  { label: "甜品店", value: "050900" },
];

const playOptions = [
  { label: "影剧院", value: "080600" },
  { label: "娱乐场所", value: "080300" },
];

export default function ToolbarHeader() {
  const { fetchPoiAround, poiTypes, setPoiTypes } = useStore();
  const [foodTypes, setFoodTypes] = useState([]);
  const [playTypes, setPlayTypes] = useState([]);

  useEffect(() => {
    fetchPoiAround();
  }, [poiTypes]); // eslint-disable-line

  useEffect(() => {
    setPoiTypes([...foodTypes, ...playTypes]);
  }, [foodTypes, playTypes]); // eslint-disable-line

  function handleFoodChange(checkedValue) {
    setFoodTypes(checkedValue);
  }

  function handlePlayChange(checkedValue) {
    setPlayTypes(checkedValue);
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <SearchToMark />
      <TagSelect
        onChange={handleFoodChange}
        style={{ borderBottom: "1px solid #cccccc99" }}
      >
        {foodOptions.map((item) => (
          <TagSelect.Option value={item.value} key={item.value}>
            {item.label}
          </TagSelect.Option>
        ))}
      </TagSelect>
      <TagSelect
        onChange={handlePlayChange}
        // style={{ borderBottom: "1px solid #cccccc99" }}
      >
        {playOptions.map((item) => (
          <TagSelect.Option value={item.value} key={item.value}>
            {item.label}
          </TagSelect.Option>
        ))}
      </TagSelect>
    </div>
  );
}
