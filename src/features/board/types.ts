export type Player = "user" | "program"

export type MovablePieces = { [position: number]: number } | null

export type Pieces = {
  atStart: number
  onBoard: number[]
  movable: MovablePieces
  selected: number | null
  finished: number
}

type Die = 1 | 2

export type Dice = [Die, Die] | null

export type BoardState = {
  isInitialState: boolean
  whoseTurn: Player
  dice: Dice
  pieces: { [P in Player]: Pieces }
}