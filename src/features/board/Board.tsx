import { Space } from "./Space"
import { Dice } from "./Dice"
import { PieceContainer } from "./PieceContainer"
import { courseLength, firstCourseTurn, secondCourseTurn } from "./boardSlice"
import style from "./Board.module.scss"

export function Board() {
  const programRowStart = [],
    programRowFinish = [],
    combatRow = [],
    playerRowStart = [],
    playerRowFinish = []

  for (let i = 1; i <= courseLength; i++) {
    if (i < firstCourseTurn) {
      programRowStart.push(<Space key={i} stepOnCourse={i} belongsTo="program" />)
      playerRowStart.push(<Space key={i} stepOnCourse={i} belongsTo="user" />)
    } else if (i > secondCourseTurn) {
      programRowFinish.push(<Space key={i} stepOnCourse={i} belongsTo="program" />)
      playerRowFinish.push(<Space key={i} stepOnCourse={i} belongsTo="user" />)
    } else {
      combatRow.push(<Space key={i} stepOnCourse={i} belongsTo="both" />)
    }
  }

  const programRow = [
    ...programRowStart.reverse(),
    ...programRowFinish.reverse(),
  ]
  const playerRow = [...playerRowStart.reverse(), ...playerRowFinish.reverse()]

  return (
    <>
      <Dice />
      <PieceContainer player="program" />
      <PieceContainer player="user" />
      <div className={style.board}>
        {programRow}
        {combatRow}
        {playerRow}
      </div>
    </>
  )
}