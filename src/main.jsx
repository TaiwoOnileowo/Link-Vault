import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContext } from "./Context/AppContext.jsx";
import { LinkContext } from "./Context/LinkContext.jsx";
import { InputsContext } from "./Context/InputsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <InputsContext>
        <LinkContext>
          <App />
        </LinkContext>
      </InputsContext>
    </AppContext>
  </React.StrictMode>
);
