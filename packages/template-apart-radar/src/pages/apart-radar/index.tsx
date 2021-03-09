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
  const [雷达图数据, set雷达数据] = useState<ApartmentData[]>([]);
  const [表格数据, set表格数据] = useState<any[]>([]);
  const [地图数据, set地图数据] = useState<number[][]>([]);
  const [侧边栏数据, set侧边栏数据] = useState<
    { label: string; value: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    const 过滤后数据 = datas.filter((data) => data.selected);
    // 生成坐标
    const cords = get地图数据(过滤后数据);
    set地图数据([...cords]);

    const sideData = get侧边栏数据(datas);
    set侧边栏数据([...sideData]);

    const tableData: any[] = get表格数据(过滤后数据);
    set表格数据(tableData);

    set雷达数据(过滤后数据);
  }, []);

  const handle侧边栏改变 = (selected: any[]) => {
    const 过滤后的数据 = datas.filter((data) => selected.includes(data.name));

    const cords = get地图数据(过滤后的数据);
    set地图数据([...cords]);

    const tableData: any[] = get表格数据(过滤后的数据);
    set表格数据(tableData);

    set雷达数据(过滤后的数据);
  };

  const get地图数据 = (datas: ApartmentData[]) => {
    return datas.map((data) => [data.lat, data.lng]);
  };

  const get侧边栏数据 = (datas: ApartmentData[]) => {
    return datas.map((data) => ({
      label: data.name,
      value: data.name,
      selected: !!data.selected,
    }));
  };

  const get表格数据 = (datas: ApartmentData[]) => {
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
      <Side data={侧边栏数据} onChange={handle侧边栏改变} />
      <Row>
        <Col span={12}>
          <Radar datas={雷达图数据} />
        </Col>
        <Col span={12}>
          <Map cords={地图数据} />
        </Col>
        <Col span={24}>
          <Table tableData={表格数据} />;
        </Col>
      </Row>
    </div>
  );
};
