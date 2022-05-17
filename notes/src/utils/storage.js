import { formatISO, parseISO } from "date-fns";
import { marked } from "marked";
// markdown text => html

let notes;

const loadNotesFromLocalStorage = () => {
  const parsedNotes = JSON.parse(localStorage.reactWorkshopAppNotes || "{}");

  const transformedNotes = {};
  for (const [id, note] of Object.entries(parsedNotes)) {
    const transformedNote = {
      ...note,
      date: parseISO(note.date),
      html: marked(note.text),
    };
    transformedNotes[id] = transformedNote;
  }

  return transformedNotes;
};

const saveNotesToLocalStorage = (notes) => {
  processQueue(Object.entries(notes), (transformedNotes) => {
    const stringifiedNotes = JSON.stringify(transformedNotes);
    localStorage.reactWorkshopAppNotes = stringifiedNotes;
  });

  function processQueue(queue, callback, result = {}) {
    const DEADLINE = performance.now() + 10; /* ms */
    while (queue.length > 0) {
      // TODO: add abortController

      if (
        "isInputPending" in navigator.scheduling &&
        navigator.scheduling.isInputPending()
      ) {
        break;
      }

      if (performance.now() > DEADLINE) {
        break;
      }

      const [id, note] = queue.pop();

      const transformedNote = {
        ...note,
        date: formatISO(note.date),
        html: marked(note.text),
      };
      result[id] = transformedNote;
    }

    if (queue.length > 0) {
      setTimeout(() => processQueue(queue, callback, result), 0);
    } else {
      callback(result);
    }
  }
};

// fast PC: saveNotesToLocalStorage → 10ms
// slow mobile phone: saveNotesToLocalStorage → 500ms

// [function] [function]

// 1: for-of → queue
// 2: isolate the code into a queue processing function
// 3: return → callback
// 4: add isInputPending check + setTimeout
// 5: add performance.now() + DEADLINE check

// const myWorker = Comlink.wrap(new Worker("./worker.js"));
// await myWorker.convertMarkdownToHtml(note.text);

// 1) optimize marked
// 2) split the execution into microtasks
// 3) only use marked for the changed notes
// 4) memoize the marked() function
// 5) optimize the loop itself: O(N + M) → O(N)
// 6) use a worker

export const getNotes = () => {
  if (!notes) {
    notes = loadNotesFromLocalStorage();
  }

  return notes;
};

export const putNote = (noteId, { text, date }) => {
  if (notes[noteId]) {
    // The note already exists; just update it
    notes = {
      ...notes,
      [noteId]: {
        ...notes[noteId],
        text: text || notes[noteId].text,
        date: date || notes[noteId].date,
      },
    };
  } else {
    // The note doesn’t exist; create it, filling the creation date
    notes = {
      ...notes,
      [noteId]: {
        id: noteId,
        text: text,
        date: date || new Date(),
      },
    };
  }

  saveNotesToLocalStorage(notes);
};

export const deleteNotes = () => {
  notes = {};

  saveNotesToLocalStorage(notes);
};
