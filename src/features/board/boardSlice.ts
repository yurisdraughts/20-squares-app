import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Player = "user" | "program"

type MovablePieces = { [position: number]: number } | null

type Pieces = {
  atStart: number
  onBoard: number[]
  movable: MovablePieces
  finished: number
}

type BoardState = {
  whoseTurn: Player
  dice: [1 | 2, 1 | 2] | null
  pieces: { [P in Player]: Pieces }
}

export const courseLength = 14,
  firstCourseTurn = 5,
  secondCourseTurn = 12

const rosettes = [4, 8, 14]

const getOpponent = (player: Player) =>
  player == "program" ? "user" : "program"

const initialState: BoardState = {
  whoseTurn: "user",
  dice: null,
  pieces: {
    user: {
      atStart: 7,
      onBoard: [],
      movable: null,
      finished: 0,
    },
    program: {
      atStart: 7,
      onBoard: [],
      movable: null,
      finished: 0,
    },
  },
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    castDice: (state) => {
      const pieces = state.pieces[state.whoseTurn]

      // Бросаем кости
      const randomNumber = Math.floor(Math.random() * 4)
      let dice: [1 | 2, 1 | 2]
      switch (randomNumber) {
        case 0:
          dice = [1, 1]
          break
        case 1:
          dice = [1, 2]
          break
        case 2:
          dice = [2, 1]
          break
        default:
          dice = [2, 2]
          break
      }

      // Определяем, какие фишки могут быть передвинуты, и на сколько ходов
      const moveBy = dice[0] + dice[1],
        movablePieces: MovablePieces = {}
      if (pieces.atStart > 0 && !pieces.onBoard.includes(moveBy)) {
        movablePieces[0] = moveBy
      }
      for (const currentPosition of pieces.onBoard) {
        const destination = currentPosition + moveBy
        if (
          !pieces.onBoard.includes(destination) &&
          (destination <= courseLength || destination == courseLength + 2) &&
          !(
            rosettes.includes(destination) &&
            state.pieces[getOpponent(state.whoseTurn)].onBoard.includes(
              destination,
            )
          )
        ) {
          movablePieces[currentPosition] = destination
        }
      }

      // Добавляем информацию о возможных ходах в состояние
      // или передаем ход противнику
      if (Object.keys(movablePieces).length == 0) {
        pieces.movable = null
        state.dice = null
        state.whoseTurn = getOpponent(state.whoseTurn)
      } else {
        pieces.movable = movablePieces
        state.dice = dice
      }
    },
    movePiece: (state, action: PayloadAction<{ currentPosition: number }>) => {
      const pieces = state.pieces[state.whoseTurn]
      if (!state.dice || !pieces.movable) return
      const currentPosition = action.payload.currentPosition,
        currentPositionIndex = pieces.onBoard.indexOf(currentPosition),
        opponentPieces = state.pieces[getOpponent(state.whoseTurn)],
        destination = pieces.movable[currentPosition],
        opponentPiecesOnCombatRow = opponentPieces.onBoard.filter(
          (position) => {
            return position >= firstCourseTurn && position <= secondCourseTurn
          },
        )

      if (currentPosition == 0) {
        // Совершаем ход с начальной позиции
        pieces.atStart -= 1
        pieces.onBoard.push(destination)
      } else if (destination <= courseLength) {
        // Ходим на другую клетку
        if (opponentPiecesOnCombatRow.includes(destination)) {
          // Убираем фишку противника
          opponentPieces.onBoard.splice(
            opponentPieces.onBoard.indexOf(destination),
            1,
          )
          opponentPieces.atStart += 1
        }
        pieces.onBoard[currentPositionIndex] = destination
      } else if (destination == courseLength + 2) {
        // Завершаем прохождение маршрута
        pieces.onBoard.splice(currentPositionIndex, 1)
        pieces.finished += 1
      }

      if (pieces.finished < 7) {
        pieces.movable = null
        state.dice = null
        if (!rosettes.includes(destination)) {
          // Передаем ход противнику, если не оказались сами на клетке с "розеткой"
          state.whoseTurn = getOpponent(state.whoseTurn)
        }
      } else {
        // Отмечаем победу
        console.log(`${state.whoseTurn} won!`)

        state.whoseTurn = "user"
        state.dice = null
        state.pieces = {
          user: {
            atStart: 7,
            onBoard: [],
            movable: null,
            finished: 0,
          },
          program: {
            atStart: 7,
            onBoard: [],
            movable: null,
            finished: 0,
          },
        }
      }
    },
  },
})

export const { castDice, movePiece } = boardSlice.actions

export default boardSlice.reducer
