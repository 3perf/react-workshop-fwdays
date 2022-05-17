import { useState, useTransition, startTransition, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";

// startTransition(() => {});

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  // This piece of state is important so is going to be updated immediately
  const [a, setA] = useState("");
  // This piece of state not that important so its updates can be rendered in background
  const [b, setB] = useState("");
  const [isTransitioning, startTransition] = useTransition();

  // 1: spliting the state into important and not important
  // 2: wrapping non-important state updates with startTransition

  useEffect(() => {
    console.log("A changed");
  }, [a]);

  useEffect(() => {
    console.log("B changed");
  }, [b]);

  return (
    <div
      className="notes-list"
      style={{ position: "relative", opacity: isTransitioning ? 0.5 : 1 }}
    >
      <div className="notes-list__filter">
        <FilterInput
          filter={a}
          onChange={(value) => {
            setA(value);
            // → immediately → renders the result immediately
            startTransition(() => {
              // console.log(value);
              setB(value);
              // → once important state updates are flushed
              // → renders the result in background, yuielding to the browser every 5-10 ms or so
            });
          }}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!b) {
              return true;
            }

            return text.toLowerCase().includes(b.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              isActive={activeNoteId === id}
              id={id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={b}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
