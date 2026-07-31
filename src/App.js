import React, { useState } from "react";
import Preloader from "./components/Pre";
import Desktop from "./components/Desktop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  return (
    <>
      <Preloader load={load} setLoad={updateLoad} />
      <Desktop visible={!load} />
    </>
  );
}

export default App;
