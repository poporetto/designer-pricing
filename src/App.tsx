import React from "react";
import "./App.scss";
import Cloud from "./pages/pricing/components/CloudPricing";
import Server from "./pages/pricing/components/ServerPricing";

function App() {
  return (
    <article className="pricing">
      <Cloud />
      <Server />
    </article>
  );
}

export default App;
