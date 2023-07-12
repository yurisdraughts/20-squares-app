export type Player = "user" | "program"

export type MovablePieces = { [position: number]: number } | null

export type Pieces = {
  atStart: number
  onBoard: number[]
  movable: MovablePieces
  selected: number | null
  finished: number
}

export type Dice = [1 | 2, 1 | 2] | null

export type BoardState = {
  whoseTurn: Player
  dice: Dice
  pieces: { [P in Player]: Pieces }
}