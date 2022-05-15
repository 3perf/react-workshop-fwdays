import { CacheProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./app-wrapper";
import createEmotionCache from "./createEmotionCache";

const cache = createEmotionCache();

const element = (
  <CacheProvider value={cache}>
    <AppWrapper />
  </CacheProvider>
);
const root = document.getElementById("root");
const isServerSideRenderingEnabled = root.innerHTML.trim().length > 0;
if (isServerSideRenderingEnabled) {
  ReactDOM.hydrateRoot(root, element);
} else {
  ReactDOM.createRoot(root).render(element);
}
