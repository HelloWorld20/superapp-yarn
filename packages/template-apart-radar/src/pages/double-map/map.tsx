import React, { useEffect, useRef } from "react";
import loadScript from "ww-utils/lib/load-script";

export default () => {
  const mapEl = useRef<any>(null);
  const mapIns = useRef<any>(null);
  useEffect(() => {
    console.log("loadScript", loadScript);
    loadScript(
      "https://map.qq.com/api/gljs?v=1.exp&key=PSDBZ-UNLR2-I36UR-CSMLR-UN7B3-YJBTH"
    ).then(() => {
      
    });
  }, []);
  return <div>map</div>;
};
