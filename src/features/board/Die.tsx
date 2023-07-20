import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { castDice } from "./boardSlice"
import style from "./Die.module.scss"

export function Die({ index }: { index: 0 | 1 }) {
  const diceValues = useAppSelector((state) => state.board.dice),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn),
    dispatch = useAppDispatch()

  const disabled = !!diceValues || whoseTurn === "program",
    hasActiveStyle = !disabled,
    hasAutoStyle = !diceValues && whoseTurn === "program"

  const className = `${style.die} ${style[whoseTurn]} ${style[`index${index}`]}
  ${hasActiveStyle ? style.active : ""}
  ${hasAutoStyle ? style.auto : ""}
  ${diceValues && diceValues[index] === 1 ? style.value1 : ""}
  ${diceValues && diceValues[index] === 2 ? style.value2 : ""}`

  return (
    <button
      onClick={() => {
        if (!diceValues) dispatch(castDice())
      }}
      className={className}
      disabled={disabled}
      aria-label="Игральная кость"
    ></button>
  )
}
