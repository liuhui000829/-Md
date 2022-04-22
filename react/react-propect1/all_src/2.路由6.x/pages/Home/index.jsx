import React, { useState } from "react";
import { Navigate, NavLink,Outlet } from "react-router-dom";

export default function Home() {
  let [sum, setSum] = useState(1);
  return (
    <div>
      <h2>我是home组件</h2>
      {/* Navigate 跳转 replace={替换路径} */}
      {sum === 2 ? (
        <Navigate to="/about/" replace={true} />
      ) : (
        <h4>当前的sum值是:{sum}</h4>
      )}
      <button onClick={() => setSum(2)}>点我将sum变为2</button>
      <br />
     
      <NavLink to="news">News</NavLink>&nbsp;&nbsp;
      <NavLink to="Message">Message</NavLink><br /><br />

      <div style={{height:100,backgroundColor:"yellow"}}>
         {/* 指定路由组件展示的位置 */}
         <Outlet/>
      </div>


    </div>
  );
}
