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

      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          // "AMap.HawkEye",
          "AMap.MapType",
          // "AMap.Geolocation",
        ],
        function () {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          mapIns.current.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          mapIns.current.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // mapIns.current.addControl(new AMap.HawkEye({ isOpen: true }));

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          mapIns.current.addControl(new AMap.MapType());

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          // mapIns.current.addControl(new AMap.Geolocation());
        }
      );

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
