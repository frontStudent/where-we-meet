import { useState, useMemo } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";

const ComboBox = (props) => {
  // eslint-disable-next-line react/prop-types
  const { request, debounceTimeout = 500, onBeforeChange, ...others } = props;
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      request(value).then((res) => {
        const pois = res.data.pois;
        console.log(pois, "pois");
        setData(
          pois.map((item) => {
            return { value: item.location, label: item.name };
          })
        );
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [request, debounceTimeout]);

  const handleChange = (newValue) => {
    typeof onBeforeChange === "function" && onBeforeChange(newValue);
    setValue(newValue);
  };
  
  return (
    <Select
      showSearch
      value={value}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debounceFetcher}
      onChange={handleChange}
      notFoundContent={null}
      options={data}
      {...others}
    />
  );
};
export default ComboBox;
