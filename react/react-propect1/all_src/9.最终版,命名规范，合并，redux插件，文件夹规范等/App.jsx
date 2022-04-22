import React from "react";
import Count from "./containers/Count"; // 容器组件
import Person from './containers/Person'

import "./App.css";

export default function App() {
  return (
    <div>
      <Count/>
      <Person/>
    </div>
  );
}
