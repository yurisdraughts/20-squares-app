import { useAppSelector } from "../../app/hooks"
import { Piece } from "./Piece"
import {
  courseLength,
  firstCourseTurn,
  secondCourseTurn,
  getOpponent,
} from "./util"
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
    ),
    piecesOnCombatRow = useAppSelector(
      (state) => state.board.pieces[player].onBoard,
    ).filter((piece) => piece >= firstCourseTurn && piece <= secondCourseTurn),
    selectedPiece = useAppSelector(
      (state) => state.board.pieces[player].selected,
    ),
    selectedByOpponent = useAppSelector(
      (state) => state.board.pieces[getOpponent(player)].selected,
    ),
    dice = useAppSelector((state) => state.board.dice),
    willFinish =
      dice &&
      selectedPiece &&
      selectedPiece + dice[0] + dice[1] === courseLength + 2,
    willBeRemoved =
      dice &&
      selectedByOpponent &&
      piecesOnCombatRow.includes(selectedByOpponent + dice[0] + dice[1])

  const containerClassName = `${style.container} ${style[player]}`,
    pieceClassName = `${pieceStyle.piece} ${pieceStyle[player]}`,
    destinationClassName = `${pieceClassName} ${pieceStyle.destination}`

  return (
    <table className={containerClassName}>
      <thead>
        <tr>
          <th colSpan={2}>
            {player === "program" ? "Фишки противника" : "Ваши фишки"}...
          </th>
        </tr>
        <tr>
          <th>...в начальной позиции ({piecesAtStart}):</th>
          <th>...в конечной позиции ({finishedPieces}):</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={style.center}>
              <div className={style.atStart}>
                {Array.from({ length: piecesAtStart }, (_, i) => {
                  if (i + 1 === piecesAtStart) {
                    return (
                      <Piece key={i} belongsTo={player} currentPosition={0} />
                    )
                  }
                  return <div key={i} className={pieceClassName}></div>
                })}
                {willBeRemoved ? <div className={destinationClassName} /> : ""}
              </div>
            </div>
          </td>
          <td>
            <div>
              <div className={style.finished}>
                {Array.from({ length: finishedPieces }, (_, i) => {
                  return <div key={i} className={pieceClassName}></div>
                })}
                {willFinish ? <div className={destinationClassName} /> : ""}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
