import React, { useState, useEffect } from "react";
import { Table, Modal, Popover, Col, Row } from "antd";
import apartData from "@/datas/aparts";
import Radar from "./radar";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export default () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [modal, setModal] = useState<Record<string, any> | null>(null);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  useEffect(() => {
    setTableData(
      apartData.map((apart) => ({
        ...apart,
        key: apart.url,
      }))
    );
  }, []);

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
              onClick={() => {
                showDetail(data);
              }}
              style={{ width: "120px", height: "100px", cursor: "pointer" }}
              src={proxyImgUrl}
              alt=""
            />
          </Popover>
        );
      },
    },
  ];

  const showDetail = (data: Record<string, any>) => {
    setModal(data);
  };

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  // };

  return (
    <div className="apartment">
      <Table dataSource={tableData} columns={columns} pagination={false} />
      <Modal
        visible={modal !== null}
        onCancel={() => setModal(null)}
        width={1000}
      >
        {modal !== null && (
          <Row>
            <Col span={12}>
              <img
                src={`http://v4.rabbitpre.com/m/proxy?host=${modal.blueprint}`}
                style={{ width: "100%", height: "auto", textAlign: "center" }}
                alt=""
              />
            </Col>
            <Col span={12}>
              <Radar datas={[modal]} />
            </Col>
            <Col>
              <p>{modal.comment}</p>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};
