import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Message() {
  const navigate = useNavigate();

  const lookDetail = (v) => {
      console.log("@",v);
    navigate("detail", {
      replace: false,       // 是否替换
      state: {
        id: v.id,
        title: v.title,
        context: v.context,
      },
    });
  };

  const [message] = useState([
    { id: "001", title: "消息1", context: "锄禾日当午" },
    { id: "002", title: "消息2", context: "汗滴禾下土" },
    { id: "003", title: "消息3", context: "谁知盘中餐" },
    { id: "004", title: "消息4", context: "粒粒皆辛苦" },
  ]);
  return (
    <div>
      <ul>
        {message.map((v) => {
          return (
            <li key={v.id}>
              <Link
                to="detail"
                state={{
                  id: v.id,
                  title: v.title,
                  context: v.context,
                }}
              >
                {v.title}
              </Link>
              <button onClick={() => lookDetail(v)}>查看详情</button>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
