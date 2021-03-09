import React from "react";
import { Col, Row } from "antd";

import Map from './map'

import './index.less';

export default () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Map />
        </Col>
        <Col span={12}>b</Col>
      </Row>
    </div>
  );
};
