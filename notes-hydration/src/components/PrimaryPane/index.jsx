import ActiveAuthors from "../ActiveAuthors";
import NoteView from "../NoteView";
import "./index.css";

function PrimaryPane({ activeNoteId, notes }) {
  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes"></div>
        <div className="primary-pane__eyes-caption">
          Select a note to view it
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1>Note</h1>
        <ActiveAuthors />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
    </div>
  );
}

export default PrimaryPane;
