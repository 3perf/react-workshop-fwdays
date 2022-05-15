import { renderToString } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import AppWrapper from "../src/app-wrapper";
import createEmotionCache from "../src/createEmotionCache";
import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";

const app = express();

if (process.env.ENABLE_SSR === "true") {
  const indexFile = readFileSync(resolve("build/index.html"), "utf-8");

  app.get("/*", (req, res, next) => {
    if (req.url !== "/") {
      return next();
    }

    // Generate Emotion styles, per https://mui.com/material-ui/guides/server-rendering/
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);
    const reactApp = renderToString(
      <CacheProvider value={cache}>
        <AppWrapper />
      </CacheProvider>
    );
    const emotionChunks = extractCriticalToChunks(reactApp);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    return res.send(
      indexFile
        .replace("</head>", `${emotionCss}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
}

app.use(express.static(resolve(__dirname, "../build")));

app.listen(8080, () =>
  console.log("Express server is running on http://localhost:8080")
);
