import React, { Fragment, useState } from 'react'
import { simplify } from '@tonaljs/note'
import { generateFretboard } from './generators'
import './Fretboard.css'

function Fretboard() {
  const [noteInputError, setNoteInputError] = useState(false)
  const [deepestNote, setDeepestNote] = useState('F1')
  const [fretboard, setFretboard] = useState(generateFretboard('F1'))

  return (
    <Fragment>
      <form action="">
        <label htmlFor="lowest-note">
          Deepest note:
          <input
            type="text"
            value={deepestNote}
            onChange={e => {
              const value = e.target.value
              console.log("value", value)
              const noteValue = simplify(value)
              if (noteValue) {
                setNoteInputError(false)
                setFretboard(generateFretboard(noteValue))
              } else {
                setNoteInputError(true)
              }
              setDeepestNote(value)
            }}
          />
        </label>
        {noteInputError && <span>not a valid note</span>}
      </form>
      <main>
        <ol>
          {fretboard.map(guitarString => (
            <li key={guitarString.flatNote}>{guitarString.flatNote}</li>
          ))}
        </ol>
        <ol>
          {fretboard.map(guitarString => (
            <li key={guitarString.flatNote}>
              <ol>
                {guitarString.frets.map(fret => (
                  <li key={fret}>{fret}</li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </main>
    </Fragment>
  )
}

export default Fretboard
