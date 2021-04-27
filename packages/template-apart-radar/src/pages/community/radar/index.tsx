import React, { useRef, useEffect, useCallback } from "react";

import * as echarts from "echarts/core";

import { RadarChart } from "echarts/charts";
import {
  RadarComponentOption,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const { init } = echarts;

import "./index.css";

type ECOption = echarts.ComposeOption<RadarComponentOption>;

interface IProps {
  datas: any[];
}

export default ({ datas }: IProps) => {
  const chartEl = useRef<HTMLDivElement | null>(null);
  const instance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 注册必须的组件
    echarts.use([
      RadarChart,
      LegendComponent,
      TooltipComponent,
      CanvasRenderer,
    ]);
  }, []);

  const getOption = useCallback(
    (datas: any[]): ECOption => {
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
            { text: "交通", max: 100 },
            { text: "环境", max: 100 },
            { text: "学区", max: 100 },
            { text: "质量", max: 100 },
            { text: "房龄", max: 100 },
            { text: "户型", max: 100 },
            { text: "升值空间", max: 100 },
            { text: "配套设施", max: 100 },
            { text: "性价比", max: 100 },
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
