import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movePiece } from "./boardSlice"
import type { Player } from "./types"
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
    ),
    randomlySelected = useAppSelector(
      (state) => state.board.pieces.program.randomlySelected,
    ) as number | null

  let movable = false
  if (
    areDiceCast &&
    whoseTurn === belongsTo &&
    movablePieces &&
    movablePieces[currentPosition]
  ) {
    movable = true
  }

  const dispatch = useAppDispatch()

  const disabled = !movable || whoseTurn === "program"

  const hasActiveStyle = !disabled,
    hasAutoStyle =
      belongsTo === "program" &&
      randomlySelected !== null &&
      currentPosition === randomlySelected,
    className = `${style.piece} ${style[belongsTo]}
  ${hasActiveStyle ? style.active : ""}
  ${hasAutoStyle ? style.auto : ""}`

  return (
    <button
      className={className}
      onClick={() => {
        if (movable) dispatch(movePiece({ currentPosition }))
      }}
      disabled={disabled}
    ></button>
  )
}
