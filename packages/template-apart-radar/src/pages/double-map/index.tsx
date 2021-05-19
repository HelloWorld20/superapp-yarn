import React, { useEffect, useState } from "react";

import datas from "@/datas/community";

import { mainDistrict, MainDistrict } from "@/datas/核心位置";
import Map from "@/components/map";

import "./index.less";

export default () => {
  const [地图数据, set地图数据] = useState<number[][]>([]);
  const [核心区域坐标, set核心区域坐标] = useState<
    {
      cords: number[];
      importance: number;
    }[]
  >([]);

  useEffect(() => {
    const 过滤后数据 = datas.filter((data) => data);
    // 生成坐标
    const cords = get地图数据(过滤后数据);
    set地图数据([...cords]);
    set核心区域坐标(get核心区域坐标(mainDistrict));
  }, []);

  const get地图数据 = (datas: ApartmentData[]) => {
    return datas.map((data) => [data.lat, data.lng]);
  };
  const get核心区域坐标 = (datas: MainDistrict[]) => {
    return datas.map((data) => ({
      cords: [data.lng, data.lat],
      importance: data.value,
    }));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map mainPosition={核心区域坐标} houseCords={地图数据} />
    </div>
  );
};
