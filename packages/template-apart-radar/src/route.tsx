import React from "react";
import {
  Route,
  Switch,
  HashRouter,
  Redirect,
} from "react-router-dom";

import ApartRadar from "./pages/apart-radar";

export const routeList = {
  apratRadar: ApartRadar,
};

function getRoutes(routeList: Record<string, any>) {
  return Object.keys(routeList).map((key) => {
    return <Route key={key} path={`/${key}`} component={routeList[key]} />;
  });
}
export default function () {
  return (
    //   HashRouter, 而不是 BrowserRouter. HashRouter利用hash切换路由.而BrowserRouter则直接跳转(且没用到history.pushState)
    <HashRouter>
      {/* 渲染第一个匹配到的Route */}
      <Switch>
        <Route path="/" exact component={ApartRadar} />
        {getRoutes(routeList)}
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
