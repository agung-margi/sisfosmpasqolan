import React from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function SiderLayout() {
  const items = [
    {
      key: "Menu1",
      label: "PPDB",
      icon: <MailOutlined />,
      children: [
        {
          key: "g1",
          type: "group",
          children: [
            {
              key: "1",
              label: "View PPDB",
            },
          ],
        },
      ],
    },
    {
      key: "Menu2",
      label: "User",
      icon: <MailOutlined />,
      children: [
        {
          key: "g2",
          type: "group",
          children: [
            {
              key: "2",
              label: "View PPDB",
            },
          ],
        },
      ],
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="h-screen bg-slate-100">
      <div className="py-4 border-b-1 border-blue-900 text-center font-bold">SMP ISLAM ASQOLAN</div>
      <Menu
        className="bg-slate-100"
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default SiderLayout;
