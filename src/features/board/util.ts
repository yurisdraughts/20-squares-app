import type { Player } from "./types"

export const numberOfPieces = 7,
  courseLength = 14,
  firstCourseTurn = 5,
  secondCourseTurn = 12

export const rosettes = [4, 8, 14]

export const getOpponent = (player: Player): Player =>
  player === "program" ? "user" : "program"

export const timeout = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 500)
  })
