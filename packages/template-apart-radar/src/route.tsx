import React, { useState } from "react";
import { Route, Switch, HashRouter, Redirect, Link } from "react-router-dom";
import { Menu } from "antd";

import Community from "./pages/community";
import DoubleMap from "./pages/double-map";
import Apartment from "./pages/apartment";

export const routeList = {
  community: Community,
  doubleMap: DoubleMap,
  apartment: Apartment,
};

function getRoutes(routeList: Record<string, any>) {
  return Object.keys(routeList).map((key) => {
    return <Route key={key} path={`/${key}`} component={routeList[key]} />;
  });
}
export default function () {
  const route = location.hash.slice(2);
  const defaultCurrent = route || "community";
  console.log(defaultCurrent);
  const [current, setCurrent] = useState<string[]>([defaultCurrent]);
  const handleClick = (e: any) => setCurrent([e.key]);
  return (
    /* HashRouter, 而不是 BrowserRouter.
      HashRouter利用hash切换路由.而BrowserRouter则直接跳转(且没用到history.pushState) */
    <HashRouter>
      <Menu
        style={{ display: "flex", justifyContent: "center" }}
        mode="horizontal"
        selectedKeys={current}
        onClick={handleClick}
      >
        <Menu.Item key="community">
          <Link to="community">首页</Link>
        </Menu.Item>
        <Menu.Item key="doubleMap">
          <Link to="doubleMap">全屏地图</Link>
        </Menu.Item>
        <Menu.Item key="apartment">
          <Link to="apartment">户型记录</Link>
        </Menu.Item>
      </Menu>
      {/* 渲染第一个匹配到的Route */}
      <Switch>
        <Route path="/" exact component={Community} />
        {getRoutes(routeList)}
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
