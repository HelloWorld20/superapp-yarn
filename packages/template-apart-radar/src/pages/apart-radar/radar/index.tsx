import React, { useRef, useEffect, useCallback } from "react";
import { EChartOption, ECharts, init } from "echarts";

import "./index.css";

interface IProps {
  datas: any[];
}

export default ({ datas }: IProps) => {
  const chartEl = useRef<HTMLDivElement | null>(null);
  const instance = useRef<ECharts | null>(null);

  const getOption = useCallback(
    (datas: any[]): EChartOption => {
      // const data
      // const indicator: any[] = [];
      const series = datas.map((data) => {
        return {
          value: Object.keys(data.score).map(
            (key: any) => data.score[key].data
          ),
          name: data.name,
        };
      });
      const legend = series.map((serie) => serie.name);
      return {
        // title: {
        //   text: "已看小区评价",
        // },
        tooltip: {},
        legend: {
          data: legend,
        },
        radar: {
          indicator: [
            { name: "交通", max: 100 },
            { name: "环境", max: 100 },
            { name: "学区", max: 100 },
            { name: "质量", max: 100 },
            { name: "房龄", max: 100 },
            { name: "户型", max: 100 },
            { name: "升值空间", max: 100 },
            { name: "配套设施", max: 100 },
            { name: "性价比", max: 100 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            //   areaStyle: {},
            // areaStyle: {normal: {}},
            data: series,
          },
        ],
      };
    },
    [datas]
  );

  useEffect(() => {
    if (chartEl.current) {
      instance.current = init(chartEl.current);

      instance.current.setOption(getOption(datas));
    }
  }, [datas]);

  return (
    <div
      className="container"
      ref={(el) => {
        chartEl.current = el;
      }}
    ></div>
  );
};
