import { useAppSelector } from "../../app/hooks"
import { numberOfPieces } from "./util"
import { TwentySquares } from "./TwentySquares"
import { Dice } from "./Dice"
import { PieceContainer } from "./PieceContainer"
import { ResetButton } from "./ResetButton"
import { FinalMessage } from "./FinalMessage"
import style from "./Board.module.scss"

export function Board() {
  const isInitialState = useAppSelector((state) => state.board.isInitialState),
    programFinishedPieces = useAppSelector(
      (state) => state.board.pieces.program.finished,
    ),
    programWon = programFinishedPieces === numberOfPieces,
    userFinishedPieces = useAppSelector(
      (state) => state.board.pieces.user.finished,
    ),
    userWon = userFinishedPieces === numberOfPieces

  return (
    <div className={style.container}>
      <div className={style.board}>
        <PieceContainer player="program" />
        <TwentySquares />
        <PieceContainer player="user" />
        <Dice />
      </div>
      {!isInitialState && (
        <ResetButton className={style.restartButton} />
      )}
      {(programWon || userWon) && <FinalMessage userWon={userWon} />}
    </div>
  )
}
