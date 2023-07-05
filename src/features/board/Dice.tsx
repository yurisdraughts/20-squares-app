import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect } from "react"
import { Die } from "./Die"
import style from "./Dice.module.scss"
import { programMove } from "./boardSlice"

export function Dice() {
  const diceValues = useAppSelector((state) => state.board.dice),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (whoseTurn === "program" && !diceValues) {
      dispatch(programMove())
    }
  }, [whoseTurn, diceValues])

  return (
    <div className={style.dice}>
      <Die index={0} />
      <Die index={1} />
    </div>
  )
}
