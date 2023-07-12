import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { castDice } from "./boardSlice"
import style from "./Die.module.scss"

type DieProp = {
  index: 0 | 1
}

export function Die({ index }: DieProp) {
  const diceValues = useAppSelector((state) => state.board.dice),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn)

  const dispatch = useAppDispatch()

  const disabled = !!diceValues || whoseTurn === "program"

  const hasActiveStyle = !disabled,
    hasAutoStyle = !diceValues && whoseTurn === "program",
    className = `${style.die} ${style[whoseTurn]} ${style[`die_index${index}`]}
  ${hasActiveStyle ? style.active : ""}
  ${hasAutoStyle ? style.auto : ""}
  ${diceValues && diceValues[index] === 1 ? style[`die_value${1}`] : ""}
  ${diceValues && diceValues[index] === 2 ? style[`die_value${2}`] : ""}`

  return (
    <button
      onClick={() => {
        if (!diceValues) dispatch(castDice())
      }}
      className={className}
      disabled={disabled}
    ></button>
  )
}
