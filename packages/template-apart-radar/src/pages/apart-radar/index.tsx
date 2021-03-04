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
  const [radarData, setRadaData] = useState<ApartmentData[]>([]);
  const [tableData, setTabelData] = useState<any[]>([]);
  const [cords, setCords] = useState<number[][]>([]);
  const [sideData, setSideData] = useState<
    { label: string; value: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    const filtedDatas = datas.filter((data) => data.selected);
    // 生成坐标
    const cords = getCordData(filtedDatas);
    setCords([...cords]);

    const sideData = getSideData(datas);
    setSideData([...sideData]);

    const tableData: any[] = getTableData(filtedDatas);
    setTabelData(tableData);

    setRadaData(filtedDatas);
  }, []);

  const handleSideChange = (selected: any[]) => {
    const filtedDatas = datas.filter((data) => selected.includes(data.name));

    const cords = getCordData(filtedDatas);
    setCords([...cords]);

    const tableData: any[] = getTableData(filtedDatas);
    setTabelData(tableData);

    setRadaData(filtedDatas);
  };

  const getCordData = (datas: ApartmentData[]) => {
    return datas.map((data) => [data.lat, data.lng]);
  };

  const getSideData = (datas: ApartmentData[]) => {
    return datas.map((data) => ({
      label: data.name,
      value: data.name,
      selected: !!data.selected,
    }));
  };

  const getTableData = (datas: ApartmentData[]) => {
    return datas.map((data: any) => ({
      name: data.name,
      zone: `${data.zone}/${data.district}`,
      prise: data.prise,
      advantage: data.advantage,
      disadvatage: data.disadvatage,
    }));
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
        <Col span={24}>
          <Table tableData={tableData} />;
        </Col>
      </Row>
    </div>
  );
};
