import React, { useState, useEffect, useRef, useCallback } from "react";
import loadScript from "ww-utils/lib/load-script";

import "./index.css";
interface IProps {
  houseCords: number[][];
  mainCords: number[][];
}

export default (props: IProps) => {
  const mapEl = useRef<any>(null);
  const mapIns = useRef<any>(null);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    loadScript(
      "https://webapi.amap.com/maps?v=1.4.3&key=840f3a44903c1ffa87b9e93174422d7f"
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
      const markers = props.houseCords.map((cord) => {
        const res = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: cord.reverse(),
        });
        return res;
      });
      mapIns.current.add(markers);
    }
  }, [ready, props.houseCords]);

  // useEffect(() => {
  //   if (ready) {
  //     const circleMarkers = props.houseCords.map((cord) => {
  //       console.log("cord", cord);

  //       const circleMarker = new AMap.CircleMarker({
  //         center: AMap.LngLat(113.26641, 23.132324),
  //         radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
  //         strokeColor: "white",
  //         strokeWeight: 2,
  //         strokeOpacity: 0.5,
  //         fillColor: "rgba(0,0,255,1)",
  //         fillOpacity: 0.5,
  //         zIndex: 10,
  //         bubble: true,
  //         cursor: "pointer",
  //         clickable: true,
  //       });
  //       console.log("mapIns.current", circleMarker);

  //       circleMarker.set(mapIns.current);
  //       return circleMarker;
  //     });
  //   }
  // }, [ready, props.mainCords, mapIns.current]);

  return (
    <div
      className="tmap"
      ref={(el) => {
        mapEl.current = el;
      }}
    />
  );
};
