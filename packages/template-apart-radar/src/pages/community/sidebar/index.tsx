import React, { useState } from "react";
import { Checkbox, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";

import "./index.css";

interface IProps {
  data: {
    label: string;
    value: string;
    selected: boolean;
  }[];

  onChange: (selected: any[]) => void;
}

export default ({ data, onChange }: IProps) => {
  const [fold, setFold] = useState<boolean>(false);
  const defaultValue = data
    .filter((data) => data.selected)
    .map((data) => data.value);

  return (
    <>
      <SettingFilled className={`sticky-btn`} onClick={() => setFold(!fold)} />
      <Modal
        title="筛选"
        visible={fold}
        onCancel={() => setFold(false)}
        onOk={(e) => {
          setFold(false);
        }}
      >
        {!!data.length && (
          <Checkbox.Group
            options={data}
            onChange={onChange}
            defaultValue={defaultValue}
          ></Checkbox.Group>
        )}
      </Modal>
    </>
  );
};
