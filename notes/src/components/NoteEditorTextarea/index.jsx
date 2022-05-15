import { useRef } from "react";
import "./index.css";

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const currentNote = notes[activeNoteId];
  const textareaRef = useRef();

  return (
    <div key={activeNoteId}>
      <textarea
        className="note-editor-textarea"
        ref={textareaRef}
        defaultValue={currentNote.text}
        onChange={(e) => saveNote({ text: e.target.value })}
        autoComplete="off"
      />
    </div>
  );
}

export default NoteEditor;
