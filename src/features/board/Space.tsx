import { Piece } from "./Piece"
import type { Player } from "./types"
import style from "./Space.module.scss"
import { useAppSelector } from "../../app/hooks"

type SpaceOwner = Player | "both"

type SpaceProps = {
  belongsTo: SpaceOwner
  stepOnCourse: number
}

export function Space({ belongsTo, stepOnCourse }: SpaceProps) {
  let player: Player | null = null

  if (belongsTo == "program" || belongsTo == "both") {
    const programHasOnBoard = useAppSelector(
      (state) => state.board.pieces.program.onBoard,
    )

    if (programHasOnBoard.includes(stepOnCourse)) player = "program"
  }

  if (belongsTo == "user" || belongsTo == "both") {
    const userHasOnBoard = useAppSelector(
      (state) => state.board.pieces.user.onBoard,
    )

    if (userHasOnBoard.includes(stepOnCourse)) player = "user"
  }

  const dice = useAppSelector((state) => state.board.dice),
    whoseTurn = useAppSelector((state) => state.board.whoseTurn),
    selectedPiece = useAppSelector(
      (state) => state.board.pieces[whoseTurn].selected,
    ),
    isDestination =
      (belongsTo === whoseTurn || belongsTo === "both") &&
      dice &&
      selectedPiece !== null &&
      stepOnCourse === selectedPiece + dice[0] + dice[1]

  return (
    <div className={style.space}>
      {player && <Piece belongsTo={player} currentPosition={stepOnCourse} />}
      {isDestination ? (
        <Piece isDestination={true} belongsTo={whoseTurn} currentPosition={stepOnCourse} />
      ) : (
        ""
      )}
    </div>
  )
}
