import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Map from "@/components/map/index";
import Table from "./table/index";
import Radar from "./radar/index";
import Side from "./sidebar/index";
import datas from "@/datas/community";
import { mainDistrict, MainDistrict } from "@/datas/核心位置";

import "antd/dist/antd.css";
import "./index.css";

export default () => {
  const [雷达图数据, set雷达数据] = useState<ApartmentData[]>([]);
  const [表格数据, set表格数据] = useState<any[]>([]);
  const [地图数据, set地图数据] = useState<number[][]>([]);
  const [核心区域坐标, set核心区域坐标] = useState<
    {
      cords: number[];
      importance: number;
    }[]
  >([]);
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

    set核心区域坐标(get核心区域坐标(mainDistrict));

    set雷达数据(过滤后数据);
  }, []);

  const handle侧边栏改变 = (selected: any[]) => {
    const 过滤后的数据 = datas.filter((data) => selected.includes(data.name));

    const cords = get地图数据(过滤后的数据);
    set地图数据([...cords]);

    const tableData: any[] = get表格数据(过滤后的数据);
    // 库太多，太卡顿，放入下一个宏任务执行
    setTimeout(() => set表格数据(tableData));

    setTimeout(() => set雷达数据(过滤后的数据));
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
      url: data.url,
      name: data.name,
      zone: `${data.zone}/${data.district}`,
      prise: data.prise,
      advantage: data.advantage,
      disadvatage: data.disadvatage,
    }));
  };

  const get核心区域坐标 = (datas: MainDistrict[]) => {
    return datas.map((data) => ({
      cords: [data.lng, data.lat],
      importance: data.value,
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
          <Map mainPosition={核心区域坐标} houseCords={地图数据} />
        </Col>
        <Col span={24}>
          <Table tableData={表格数据} />;
        </Col>
      </Row>
    </div>
  );
};
