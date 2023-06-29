import { useAppSelector } from "../../app/hooks"
import { Piece } from "./Piece"
import type { Player } from "./boardSlice"
import style from "./PieceContainer.module.scss"
import pieceStyle from "./Piece.module.scss"

type PieceContainerProps = { player: Player }

export function PieceContainer({ player }: PieceContainerProps) {
  const piecesAtStart = useAppSelector(
    (state) => state.board.pieces[player].atStart,
  )

  const className = `${style.container} ${style[player]}`
  const pieceClassName = `${pieceStyle.piece} ${pieceStyle[player]}`

  return (
    <div className={className}>
      {Array.from({ length: piecesAtStart }, (_, i) => {
        if (i + 1 == piecesAtStart) {
          return <Piece key={i} belongsTo={player} currentPosition={0} />
        }
        return <div key={i} className={pieceClassName}></div>
      })}
    </div>
  )
}
