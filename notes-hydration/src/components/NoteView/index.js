import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  const paragraphs = textWithHeader.split("\n\n");

  return (
    <div className="note-view">
      {paragraphs.map((paragraph, index) => (
        <ReactMarkdown key={index} plugins={[gfm]}>
          {paragraph}
        </ReactMarkdown>
      ))}
    </div>
  );
}
