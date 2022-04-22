import React from "react";
import { Navigate, NavLink, useRoutes, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Message from "./pages/Message";
import Detail from "./pages/Detail";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const element = useRoutes([
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "news",
          element: <News />,
        },
        {
          path: "message",
          element: <Message />,
          children: [
            {
              path: "detail",
              element: <Detail />,
            },
          ],
        },
        // { path: '/home', element: <Navigate to='/home/news' /> },
      ],
    },
    { path: "/about", element: <About /> },
    { path: "/", element: <Navigate to="/home" /> },
  ]);

  const computedClassName = ({ isActive }) => {
    console.log(isActive);
    return isActive ? "colorRed" : "";
  };
  function fword() {
    navigate(1);
  }
  function back() {
    navigate(-1);
  }

  return (
    <div>
      <h1>庄子·逍遥游丨</h1>
      <button onClick={fword}>前进</button>
      <button onClick={back}>后退</button>
      <div id="main">
        <div id="left">
          <ul>
            <li>
              <NavLink className={computedClassName} to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={computedClassName} to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="right">{element}</div>
      </div>
    </div>
  );
}
