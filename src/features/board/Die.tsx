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

  const className = `${style.die} ${style[`die${index}`]} ${style[whoseTurn]}
  ${diceValues ? "" : style.active}`

  return (
    <button
      onClick={() => {
        if (!diceValues) dispatch(castDice())
      }}
      className={className}
      disabled={!!diceValues}
    >
      {diceValues ? diceValues[index] : ""}
    </button>
  )
}
