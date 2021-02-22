import React from "react";
import { Table } from "antd";

interface IProps {
  tableData: any[];
}

export default ({ tableData }: IProps) => {
  const columns = [
    {
      title: "小区名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "行政区",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "均价",
      dataIndex: "prise",
      key: "prise",
    },
    {
      title: "优点",
      dataIndex: "advantage",
      key: "advantage",
    },
    {
      title: "缺点",
      dataIndex: "disadvatage",
      key: "disadvatage",
    },
  ];

  return <Table dataSource={tableData} columns={columns} />;
};
