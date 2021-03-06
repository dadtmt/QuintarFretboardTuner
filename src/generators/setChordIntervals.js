import * as R from 'ramda'
import { note, distance } from '@tonaljs/tonal'
import { transposeFrom, enharmonic } from '@tonaljs/note'

export const getInterval = (fret, tonic, chordNotes) => {
  const { pc, interval } = R.head(chordNotes)
  const dist = distance(pc, fret.note.pc)
  return dist === '1P' || dist === '0A' || dist === '2d'
    ? interval
    : R.length(R.tail(chordNotes))
    ? getInterval(fret, tonic, R.tail(chordNotes))
    : ''
}

export default (fretboard, tonic, chord) => {
  const chordNotes = chord.intervals.map(interval => ({
    ...R.pipe(transposeFrom(tonic), enharmonic, note)(interval),
    interval
  }))
  console.log(chord)
  return R.map(fret => ({
    ...fret,
    selectedChordInterval: getInterval(fret, tonic, chordNotes)
  }))(fretboard)
}
