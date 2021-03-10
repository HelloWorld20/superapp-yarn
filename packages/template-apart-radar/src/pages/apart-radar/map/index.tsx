import React, { useState, useEffect, useRef, useCallback } from "react";
import loadScript from "ww-utils/lib/load-script";

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
      "https://webapi.amap.com/maps?v=1.4.15&key=840f3a44903c1ffa87b9e93174422d7f"
    ).then((res) => {
      if (mapIns.current) return;

      mapIns.current = new AMap.Map(mapEl.current, {
        zoom: 11.5,
        center: [113.324059, 23.072969],
        viewMode: "3D",
      });
      // 添加控件
      AMap.plugin(["AMap.MapType"], () => {
        // 地图类型切换控件
        mapIns.current.addControl(new AMap.MapType());
      });

      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      const markers = props.cords.map((cord) => {
        const res = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: cord.reverse(),
        });
        return res;
      });
      mapIns.current.add(markers);
    }
  }, [ready, props.cords]);

  return (
    <div
      className="tmap"
      ref={(el) => {
        mapEl.current = el;
      }}
    />
  );
};
