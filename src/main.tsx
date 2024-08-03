import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AppProvider } from "./context/AppContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import Layout from "./components/Layout/";
import { LinkProvider } from "./context/LinkContext.tsx";
import App from "./App.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";

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
