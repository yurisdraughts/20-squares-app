import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { programMove } from "./boardSlice"
import { Die } from "./Die"
import style from "./Dice.module.scss"

export function Dice() {
  const diceValues = useAppSelector((state) => state.board.dice),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn),
    dispatch = useAppDispatch()

  useEffect(() => {
    if (whoseTurn === "program" && !diceValues) {
      dispatch(programMove())
    }
  }, [whoseTurn, diceValues])

  const className = `${style.dice} ${style[whoseTurn]}`

  return (
    <table className={className}>
      <thead>
        <tr>
          <th colSpan={2}>Игральные кости:</th>
        </tr>
        <tr>
          <th colSpan={2}>
            ({whoseTurn === "program" ? "Ход противника" : "Ваш ход"})
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={style.center}>
              <Die index={0} />
            </div>
          </td>
          <td>
            <div className={style.center}>
              <Die index={1} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
