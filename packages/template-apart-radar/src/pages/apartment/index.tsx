import React, { useState, useEffect } from "react";
import { Table, Modal, Popover, Col, Row, Drawer } from "antd";
import apartData from "@/datas/aparts";
import Radar from "./radar";

const Apartment = () => {
  const [tableData, setTableData] = useState<ApartmentData[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    setTableData(
      apartData.map((apart) => ({
        ...apart,
        key: apart.url,
      }))
    );
  }, []);

  useEffect(() => {
    setVisible(selectedRows.length > 0);
  }, [selectedRows]);

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      fixed: true,
      width: 300,
      render: (text: string, data: Record<string, any>) => {
        return (
          <a href={data.url} target="_blank">
            {text}
          </a>
        );
      },
    },
    {
      title: "面积",
      dataIndex: "size",
      key: "size",
      width: 100,
    },
    {
      title: "均价",
      dataIndex: "averavePrize",
      key: "averavePrize",
      width: 150,
      sorter: (a: Record<string, any>, b: Record<string, any>) =>
        parseInt(a.averavePrize, 10) - parseInt(b.averavePrize, 10),
    },
    {
      title: "总价",
      dataIndex: "totalPrize",
      key: "totalPrize",
      width: 100,
      sorter: (a: Record<string, any>, b: Record<string, any>) =>
        parseInt(a.totalPrize, 10) - parseInt(b.totalPrize, 10),
    },
    {
      title: "年份",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "楼层",
      dataIndex: "storey",
      key: "storey",
      width: 100,
    },
    {
      title: "朝向",
      dataIndex: "orientation",
      key: "orientation",
      width: 100,
    },
    {
      title: "小区",
      dataIndex: "community",
      key: "community",
      width: 100,
    },
    {
      title: "评论",
      dataIndex: "comment",
      key: "comment",
      width: 200,
    },
    {
      title: "户型图",
      dataIndex: "blueprint",
      key: "blueprint",
      width: 150,
      render: (text: string, data: Record<string, any>) => {
        const proxyImgUrl = `http://v4.rabbitpre.com/m/proxy?host=${text}`;
        const hoverContent = (
          <img
            style={{ width: "700px", height: "700px" }}
            src={proxyImgUrl}
            alt=""
          />
        );
        return (
          <Popover placement="leftTop" content={hoverContent} trigger="hover">
            <img
              style={{ width: "120px", height: "100px", cursor: "pointer" }}
              src={proxyImgUrl}
              alt=""
            />
          </Popover>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (_: any, selectedRows: ApartmentData[]) => {
      setSelectedRows(selectedRows);
    },
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="apartment">
      <Table
        dataSource={tableData}
        rowSelection={rowSelection}
        columns={columns}
        pagination={false}
      />
      <Drawer
        title="雷达图"
        placement="right"
        mask={false}
        maskClosable={false}
        closable={true}
        width={"50%"}
        onClose={onClose}
        visible={visible}
      >
        <Radar datas={selectedRows} />
      </Drawer>
    </div>
  );
};

export default Apartment;
