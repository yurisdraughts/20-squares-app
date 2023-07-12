import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movePiece, updateSelectedPieces } from "./boardSlice"
import type { Player } from "./types"
import style from "./Piece.module.scss"

type PieceProps = {
  belongsTo: Player
  currentPosition: number
  isDestination?: true
}

export function Piece({
  belongsTo,
  currentPosition,
  isDestination,
}: PieceProps) {
  const areDiceCast = Boolean(useAppSelector((state) => state.board.dice)),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn),
    movablePieces = useAppSelector(
      (state) => state.board.pieces[belongsTo].movable,
    ),
    selected = useAppSelector(
      (state) => state.board.pieces.program.selected,
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
      selected !== null &&
      currentPosition === selected,
    className = `${style.piece} ${style[belongsTo]} ${
      style[`piece_position${currentPosition}`]
    } ${hasActiveStyle ? style.active : ""} ${hasAutoStyle ? style.auto : ""} ${
      isDestination ? style.destination : ""
    }`
  const addToSelectedPieces = () => {
      if (whoseTurn === "user") {
        dispatch(
          updateSelectedPieces({ player: "user", value: currentPosition }),
        )
      }
    },
    clearSelectedPieces = () => {
      if (whoseTurn === "user") {
        dispatch(updateSelectedPieces({ player: "user", value: null }))
      }
    }

  return (
    <button
      className={className}
      onClick={() => {
        if (movable) dispatch(movePiece({ currentPosition }))
      }}
      onMouseEnter={addToSelectedPieces}
      onTouchStart={addToSelectedPieces}
      onMouseLeave={clearSelectedPieces}
      onTouchEnd={clearSelectedPieces}
      disabled={disabled}
    ></button>
  )
}
