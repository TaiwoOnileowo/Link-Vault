import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AppContext } from "./Context/AppContext.jsx";
import { LinkContext } from "./Context/LinkContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import App from "./App.jsx";
import { FolderContext } from "./Context/FolderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
        <FolderContext>
      <LinkContext>
          <Layout>
            <App />
          </Layout>
      </LinkContext>
        </FolderContext>
    </AppContext>
  </React.StrictMode>
);
