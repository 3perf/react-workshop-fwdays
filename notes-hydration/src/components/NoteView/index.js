import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Suspense } from "react";

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  const paragraphs = textWithHeader.split("\n\n");

  // useTransition
  // → yieding back to the browser every 5 ms or so

  return (
    <div className="note-view">
      <Suspense>
        {paragraphs.map((paragraph, index) => (
          <ReactMarkdown key={index} plugins={[gfm]}>
            {paragraph}
          </ReactMarkdown>
        ))}
      </Suspense>
    </div>
  );

  // return (
  //   <div className="note-view">
  //     {isServer ? (
  //       <div>
  //         {paragraphs.map((paragraph, index) => (
  //           <ReactMarkdown key={index} plugins={[gfm]}>
  //             {paragraph}
  //           </ReactMarkdown>
  //         ))}
  //       </div>
  //     ) : (
  //       <div
  //         dangerouslySetInnerHTML={{ __html: "wrgfuiwrhuifg" }}
  //         suppressHydrationWarning={true}
  //       />
  //     )}
  //   </div>
  // );
}

// document.createElement
//
