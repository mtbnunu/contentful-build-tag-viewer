import React from "react";
import { render } from "react-dom";

import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

import App from "./App";

const root = document.getElementById("root");

if (process.env.NODE_ENV === "development" && window.self === window.top) {
} else {
  render(
    <SDKProvider>
      <GlobalStyles />
      <App />
    </SDKProvider>,
    root
  );
}
