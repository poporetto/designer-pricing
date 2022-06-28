import React from "react";
import "./App.scss";
import Cloud from "./pages/pricing/components/CloudPricing";
import Server from "./pages/pricing/components/ServerPricing";

function App() {
  return (
    <div style={{ margin: "0px" }}>
      <div>
        <Cloud />
        <Server />
      </div>
    </div>
  );
}

export default App;
