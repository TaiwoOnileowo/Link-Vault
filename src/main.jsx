import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./components/Layout/";
import { LinkProvider } from "./context/LinkContext.jsx";
import App from "./App.jsx";
import { FolderProvider } from "./context/FolderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <FolderProvider>
          <AppProvider>
            <LinkProvider>
              <Layout>
                <App />
              </Layout>
            </LinkProvider>
          </AppProvider>
        </FolderProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
