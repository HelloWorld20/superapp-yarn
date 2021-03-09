import React, { useState, useEffect, useRef, useCallback } from "react";
import loadScript from 'ww-utils/lib/load-script'

import "./index.css";
interface IProps {
  cords: number[][];
}

export default (props: IProps) => {
  const mapEl = useRef<any>(null);
  const mapIns = useRef<any>(null);
  const mapMarker = useRef<any>(null);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    loadScript(
      "https://map.qq.com/api/gljs?v=1.exp&key=PSDBZ-UNLR2-I36UR-CSMLR-UN7B3-YJBTH"
    ).then((res) => {
      if (mapIns.current) return;
      var center = new TMap.LatLng(23.072969, 113.324059); //设置中心点坐标
      //初始化地图

      mapIns.current = new TMap.Map(mapEl.current, {
        center: center,
        zoom: 11.5,
        // baseMap: {  // 设置卫星地图
        //   type: 'satellite'
        // }
      });

      setTimeout(() => {
        console.log("start", mapIns.current);
        mapIns.current.setBaseMap([{ type: "satellite" }, { type: "vector" }]);
        // mapIns.current.panTo(new TMap.LatLng(23.072969, 113.324059))
      }, 3000);

      mapMarker.current = new TMap.MultiMarker({
        id: "marker-layer", //图层id
        map: mapIns.current,
        styles: {
          //点标注的相关样式
          marker: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src:
              "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
          }),
        },
      });
      mapMarker.current.on("click", () => {});
      // makeMark();
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      makeMark();
    }
  }, [ready, props.cords]);

  const makeMark = useCallback(() => {
    if (!mapIns.current || props.cords.length === 0) return;
    const geometries = props.cords.map((cord) => ({
      // id: "demo",
      styleId: "marker",
      position: new TMap.LatLng(cord[0], cord[1]),
      properties: {
        title: "marker",
      },
    }));

    mapMarker.current.setGeometries(geometries);

  }, [props.cords]);

  return (
    <div
      className="tmap"
      ref={(el) => {
        mapEl.current = el;
      }}
    />
  );
};
