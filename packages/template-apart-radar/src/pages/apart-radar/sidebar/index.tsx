import React, { useState } from "react";
import { Checkbox } from "antd";

import "./index.css";

interface IProps {
  data: {
    label: string;
    value: string;
  }[];

  onChange: (selected: any[]) => void;
}

export default ({ data, onChange }: IProps) => {
  const [fold, setFold] = useState<boolean>(false);
  const defaultValue = data.map((data) => data.value);
  return (
    <div className="side">
      <div className="side-trigger">点击展开</div>
      {/* <div className="side-body"></div> */}
      {!!data.length && (
        <Checkbox.Group
          options={data}
          onChange={onChange}
          defaultValue={defaultValue}
        ></Checkbox.Group>
      )}
    </div>
  );
};
