import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Map from "./map/index";
import Table from "./table/index";
import Radar from "./radar/index";
import Side from "./sidebar/index";
import datas from "./data/index";

import "antd/dist/antd.css";
import "./index.css";

export default () => {
  const [radarData, setRadaData] = useState<any[]>(datas);
  const [tableData, setTabelData] = useState<any[]>([]);
  const [cords, setCords] = useState<number[][]>([]);
  const [sideData, setSideData] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    // 生成坐标
    const cords = datas.map((data) => [data.lat, data.lng]);
    setCords([...cords]);

    const sideData = datas.map((data) => ({
      label: data.name,
      value: data.name,
    }));
    setSideData([...sideData]);

    const tableData: any[] = datas.map((data: any) => ({
      name: data.name,
      zone: `${data.zone}/${data.district}`,
      prise: data.prise,
      advantage: data.advantage,
      disadvatage: data.disadvatage,
    }));
    setTabelData(tableData);
  }, []);

  const handleSideChange = (selected: any[]) => {
    // const names = selected.map((item) => item.value);
    const filtedDatas = datas.filter((data) => selected.includes(data.name));

    const cords = filtedDatas.map((data) => [data.lat, data.lng]);
    setCords([...cords]);

    const tableData: any[] = filtedDatas.map((data: any) => ({
      name: data.name,
      zone: `${data.zone}/${data.district}`,
      prise: data.prise,
      advantage: data.advantage,
      disadvatage: data.disadvatage,
    }));
    setTabelData(tableData);

    setRadaData(filtedDatas);
  };
  return (
    <div className="apart-radar">
      <Side data={sideData} onChange={handleSideChange} />
      <Row>
        <Col span={12}>
          <Radar datas={radarData} />
        </Col>
        <Col span={12}>
          <Map cords={cords} />
        </Col>
      </Row>
      <Table tableData={tableData} />;
    </div>
  );
};
