import { Button } from "@mui/material";
import { useState } from "react";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteEditorTextarea from "../NoteEditorTextarea";
import NoteView from "../NoteView";
import DarkModeSwitcher from "../DarkModeSwitcher";
import ActiveAuthors from "../ActiveAuthors";
import spinner from "./spinner.svg";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  publishNote,
  unpublishNote,
} from "../../store/redux/noteMetadataReducer";

const usePlainNoteEditor = false;

function PrimaryPane({ activeNoteId, notes, saveNote }) {
  const isLoading = useSelector((state) => state.noteMetadata.isUpdating);
  const isPublic = useSelector(
    (state) => state.noteMetadata.publicity[activeNoteId]
  );
  const publishedAt = useSelector(
    (state) => state.noteMetadata.publishedDate[activeNoteId]
  );
  const dispatch = useDispatch();

  const togglePublic = () => {
    if (isPublic) {
      dispatch(unpublishNote(activeNoteId));
    } else {
      dispatch(publishNote(activeNoteId));
    }
  };

  // const togglePublic = () => {
  //   setIsPublic(true);
  //   setPublishedAt(new Date().toLocaleTimeString());

  //   fakeApi.setPublicStatus(true).catch(() => {
  //     setIsPublic(false);
  //   });
  //   // const publishedDate = await fakeApi.getPublishedDate();
  // };

  // const togglePublic = async () => {
  //   setIsLoading(true);

  //   if (isPublic) {
  //     await fakeApi.setPublicStatus(false);
  //     unstable_batchedUpdates(() => {
  //       setIsPublic(false);
  //       setIsLoading(false);
  //     });
  //   } else {
  //     await fakeApi.setPublicStatus(true);
  //     const publishedDate = await fakeApi.getPublishedDate();
  //     unstable_batchedUpdates(() => {
  //       setIsPublic(true);
  //       setPublishedAt(publishedDate.toLocaleTimeString());
  //       setIsLoading(false);
  //     });
  //   }
  // };

  // 1: useReducer
  // 2: upgrade to React 18
  // 3: React 0.14-17: unstable_batchedUpdates() (noop in React 18)

  /*
  clickEventListener = () => ...


  // REACT 17:
  batchUpdates = false
  onClick = () => {
    batchUpdates = true
    clickEventListener()
    batchUpdates = false
    processUpdateQueue()
  }

  setState = (...) => {
    updateQueue.push(...)
    if (!batchUpdates) processUpdateQueue()
  }

  // REACT 18:
  onClick = () => {
    clickEventListener()
  }

  setState = (...) => {
    if (!queueUpdateScheduled) {

      Promise.resolve().then(
        // MICROTASK:
        () => {
          processUpdateQueue()
        }
      )
    }
    updateQueue.push(...)
  }
  */

  // settimeout
  // settimeout
  // click a button
  // [processUpdateQueue()]

  /*
    setIsPublic(!isPublic);
    // → 2
    setPublishedAt(new Date().toISOString());
    // → 3
    // update batching → takes several state updates → batches them together
    // react 17-: this works inside event listeners
  */

  // useReducer →

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes">👀</div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  const NoteEditorComponent = usePlainNoteEditor
    ? NoteEditorTextarea
    : NoteEditor;

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1 className="primary-pane__header-text">Editor</h1>
        <ActiveAuthors />
        <DarkModeSwitcher />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
            startIcon={isPublic ? "🤫" : "👀"}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "Make Private"
              : "Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditorComponent
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
      <div
        className={
          "primary-pane__spinner-wrapper" +
          (isLoading ? " primary-pane__spinner-wrapper_visible" : "")
        }
      >
        <img className="primary-pane__spinner" src={spinner} alt="" />
      </div>
    </div>
  );
}

export default PrimaryPane;
