import React, { useState, useEffect, useRef } from "react";
// import loadScript from "ww-utils/lib/load-script";
import AMapLoader from "@amap/amap-jsapi-loader";

import "./index.css";
interface IProps {
  houseCords: number[][];
  mainPosition: {
    importance: number;
    cords: number[];
  }[];
}

export default (props: IProps) => {
  const mapEl = useRef<any>(null);
  const mapIns = useRef<any>(null);
  const Map = useRef<any>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    AMapLoader.load({
      key: "840f3a44903c1ffa87b9e93174422d7f",
      version: "2.0",
    }).then((AMap) => {
      Map.current = AMap;
      mapIns.current = new AMap.Map(mapEl.current, {
        zoom: 11, //级别
        center: [113.324059, 23.072969], //中心点坐标
      });

      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready && mapIns.current && Map.current) {
      const markers = props.houseCords.map((cord) => {
        return new Map.current.Marker({
          position: cord.reverse(),
        });
      });

      const circles = props.mainPosition.map((pos) => {
        return new Map.current.Circle({
          center: new Map.current.LngLat(pos.cords[0], pos.cords[1]), // 圆心位置
          radius: 10 * pos.importance, // 圆半径
          fillColor: "red", // 圆形填充颜色
          strokeColor: "#fff", // 描边颜色
          strokeWeight: 2, // 描边宽度
        });
      });

      mapIns.current.add(markers);
      mapIns.current.add(circles);
    }
  }, [ready, props.houseCords]);

  return (
    <div
      className="tmap"
      ref={(el) => {
        mapEl.current = el;
      }}
    />
  );
};
