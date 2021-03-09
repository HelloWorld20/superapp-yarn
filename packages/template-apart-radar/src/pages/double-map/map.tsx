import React, { useEffect, useRef } from "react";
import loadScript from "ww-utils/lib/load-script";

interface IProps {

}

export default () => {
  const mapEl = useRef<any>(null);
  const mapIns = useRef<any>(null);
  useEffect(() => {
    loadScript(
      "https://map.qq.com/api/gljs?v=1.exp&key=PSDBZ-UNLR2-I36UR-CSMLR-UN7B3-YJBTH"
    ).then(() => {
      if(mapIns.current) return;
      const center = new TMap.LatLng
    });
  }, []);
  return (
    <div
      className="c-map"
      ref={(el) => {
        mapIns.current = el;
      }}
    />
  );
};
