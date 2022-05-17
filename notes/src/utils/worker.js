import { marked } from "marked";
import * as Comlink from "comlink";

export const convertMarkdownToHtml = (markdown) => marked(markdown);

Comlink.expose({
  convertMarkdownToHtml,
});
