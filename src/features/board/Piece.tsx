import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movePiece } from "./boardSlice"
import type { Player } from "./boardSlice"
import style from "./Piece.module.scss"

type PieceProps = {
  belongsTo: Player
  currentPosition: number
}

export function Piece({ belongsTo, currentPosition }: PieceProps) {
  const areDiceCast = Boolean(useAppSelector((state) => state.board.dice)),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn),
    movablePieces = useAppSelector(
      (state) => state.board.pieces[belongsTo].movable,
    )

  let movable = false
  if (
    areDiceCast &&
    whoseTurn == belongsTo &&
    movablePieces &&
    movablePieces[currentPosition]
  ) {
    movable = true
  }

  const dispatch = useAppDispatch()

  const className = `${style.piece} ${style[belongsTo]}
  ${movable ? style.active : ""}`

  return (
    <button
      className={className}
      onClick={() => {
        if (movable) dispatch(movePiece({ currentPosition }))
      }}
      disabled={!movable}
    ></button>
  )
}
