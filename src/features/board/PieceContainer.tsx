import { useAppSelector } from "../../app/hooks"
import { Piece } from "./Piece"
import type { Player } from "./types"
import style from "./PieceContainer.module.scss"
import pieceStyle from "./Piece.module.scss"

type PieceContainerProps = { player: Player }

export function PieceContainer({ player }: PieceContainerProps) {
  const piecesAtStart = useAppSelector(
      (state) => state.board.pieces[player].atStart,
    ),
    finishedPieces = useAppSelector(
      (state) => state.board.pieces[player].finished,
    )

  const className1 = `${style.container1} ${style[player]}`,
    className2 = `${style.container2} ${style[player]}`,
    pieceClassName = `${pieceStyle.piece} ${pieceStyle[player]}`

  return (
    <>
      <div className={className1}>
        {Array.from({ length: piecesAtStart }, (_, i) => {
          if (i + 1 === piecesAtStart) {
            return <Piece key={i} belongsTo={player} currentPosition={0} />
          }
          return <div key={i} className={pieceClassName}></div>
        })}
      </div>
      <div className={className2}>
        {Array.from({ length: finishedPieces }, (_, i) => {
          return <div key={i} className={pieceClassName}></div>
        })}
      </div>
    </>
  )
}
