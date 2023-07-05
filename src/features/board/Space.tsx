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

  return (
    <div className={style[belongsTo]}>
      {player && <Piece belongsTo={player} currentPosition={stepOnCourse} />}
    </div>
  )
}
