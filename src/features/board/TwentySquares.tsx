import { courseLength, firstCourseTurn, secondCourseTurn } from "./util"
import { Space } from "./Space"
import style from "./TwentySquares.module.scss"

export function TwentySquares() {
  const programRowStart = [],
    programRowFinish = [],
    combatRow = [],
    playerRowStart = [],
    playerRowFinish = []

  for (let i = 1; i <= courseLength; i++) {
    if (i < firstCourseTurn) {
      programRowStart.push(
        <Space key={i} stepOnCourse={i} belongsTo="program" />,
      )
      playerRowStart.push(<Space key={i} stepOnCourse={i} belongsTo="user" />)
    } else if (i > secondCourseTurn) {
      programRowFinish.push(
        <Space key={i} stepOnCourse={i} belongsTo="program" />,
      )
      playerRowFinish.push(<Space key={i} stepOnCourse={i} belongsTo="user" />)
    } else {
      combatRow.push(<Space key={i} stepOnCourse={i} belongsTo="both" />)
    }
  }

  const programRow = [
      ...programRowStart.reverse(),
      ...programRowFinish.reverse(),
    ],
    playerRow = [...playerRowStart.reverse(), ...playerRowFinish.reverse()]

  return (
    <div className={style.board}>
      {programRow}
      {combatRow}
      {playerRow}
    </div>
  )
}
