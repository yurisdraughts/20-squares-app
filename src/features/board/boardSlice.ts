import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "../../app/store"
import type { BoardState, Dice, MovablePieces, Player } from "./types"
import {
  numberOfPieces,
  courseLength,
  firstCourseTurn,
  secondCourseTurn,
  rosettes,
  getOpponent,
  timeout,
} from "./util"

// CONTENT:
// Initial State
// Slice
// Action Creators
// Thunk Functions
// Reducer

// Initial State
const initialState: BoardState = {
  isInitialState: true,
  whoseTurn: "user",
  dice: null,
  pieces: {
    user: {
      atStart: numberOfPieces,
      onBoard: [],
      movable: null,
      selected: null,
      finished: 0,
    },
    program: {
      atStart: numberOfPieces,
      onBoard: [],
      movable: null,
      selected: null,
      finished: 0,
    },
  },
}

let stateFromLocalStorage: BoardState
try {
  const boardState = localStorage.getItem("boardState")
  if (boardState) {
    stateFromLocalStorage = JSON.parse(boardState)
  } else {
    stateFromLocalStorage = initialState
  }
} catch (e) {
  // The user probably blocks cookies.
  stateFromLocalStorage = initialState
}

// Slice
export const boardSlice = createSlice({
  name: "board",
  initialState: stateFromLocalStorage,
  reducers: {
    changeTurns: (state) => {
      state.whoseTurn = getOpponent(state.whoseTurn)
    },
    updateDice: (state, action: PayloadAction<Dice>) => {
      if (state.isInitialState) state.isInitialState = false
      state.dice = action.payload
    },
    updatePiecesAtStart: (
      state,
      action: PayloadAction<{ player: Player; change: 1 | -1 }>,
    ) => {
      state.pieces[action.payload.player].atStart += action.payload.change
    },
    addPieceOnBoard: (
      state,
      action: PayloadAction<{ player: Player; piece: number }>,
    ) => {
      state.pieces[action.payload.player].onBoard.push(action.payload.piece)
    },
    removePieceFromBoard: (
      state,
      action: PayloadAction<{ player: Player; piece: number }>,
    ) => {
      const piecesOnBoard = state.pieces[action.payload.player].onBoard
      piecesOnBoard.splice(piecesOnBoard.indexOf(action.payload.piece), 1)
    },
    updateMovablePieces: (
      state,
      action: PayloadAction<{ player: Player; movablePieces: MovablePieces }>,
    ) => {
      state.pieces[action.payload.player].movable = action.payload.movablePieces
    },
    updateSelectedPieces: (
      state,
      action: PayloadAction<{ player: Player; value: number | null }>,
    ) => {
      if (
        typeof state.pieces[action.payload.player].selected ===
        typeof action.payload.value
      ) {
        return
      }
      state.pieces[action.payload.player].selected = action.payload.value
    },
    updateFinishedPieces: (
      state,
      action: PayloadAction<{ player: Player }>,
    ) => {
      state.pieces[action.payload.player].finished += 1
    },
    resetState: (state) => {
      state.whoseTurn = "user"
      state.dice = null
      state.pieces = {
        user: {
          atStart: numberOfPieces,
          onBoard: [],
          movable: null,
          selected: null,
          finished: 0,
        },
        program: {
          atStart: numberOfPieces,
          onBoard: [],
          movable: null,
          selected: null,
          finished: 0,
        },
      }
      state.isInitialState = true

      try {
        localStorage.setItem("boardState", JSON.stringify(state))
      } catch (e) {
        // Do nothing. The user probably blocks cookies.
      }
    },
  },
})

// Action Creators
const {
  changeTurns,
  updateDice,
  updatePiecesAtStart,
  addPieceOnBoard,
  removePieceFromBoard,
  updateMovablePieces,
  updateFinishedPieces,
} = boardSlice.actions

export const { updateSelectedPieces, resetState } = boardSlice.actions

// Thunk Functions
export const castDice =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().board,
      pieces = state.pieces[state.whoseTurn]

    if (state.dice || pieces.movable) return

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
        (destination <= courseLength || destination === courseLength + 2) &&
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
    if (Object.keys(movablePieces).length === 0) {
      dispatch(updateDice(dice))
      await timeout()

      dispatch(
        updateMovablePieces({ player: state.whoseTurn, movablePieces: null }),
      )
      dispatch(updateDice(null))
      dispatch(changeTurns())
    } else {
      dispatch(updateMovablePieces({ player: state.whoseTurn, movablePieces }))
      dispatch(updateDice(dice))
    }

    const newState = getState().board
    if (newState.whoseTurn === "user") {
      try {
        localStorage.setItem("boardState", JSON.stringify(newState))
      } catch (e) {
        // Do nothing. The user probably blocks cookies.
      }
    }
  }

export const movePiece =
  (actionPayload: { currentPosition: number }) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().board,
      player = state.whoseTurn
    let pieces = state.pieces[player]
    if (!state.dice || !pieces.movable) return
    const currentPosition = actionPayload.currentPosition,
      opponentPieces = state.pieces[getOpponent(state.whoseTurn)],
      destination = pieces.movable[currentPosition],
      opponentPiecesOnCombatRow = opponentPieces.onBoard.filter(
        (position) =>
          position >= firstCourseTurn && position <= secondCourseTurn,
      )

    if (currentPosition === 0) {
      // Совершаем ход с начальной позиции
      dispatch(updatePiecesAtStart({ player, change: -1 }))
      dispatch(addPieceOnBoard({ player, piece: destination }))
    } else if (destination <= courseLength) {
      // Ходим на другую клетку
      if (opponentPiecesOnCombatRow.includes(destination)) {
        // Убираем фишку противника
        dispatch(
          removePieceFromBoard({
            player: getOpponent(player),
            piece: destination,
          }),
        )
        dispatch(
          updatePiecesAtStart({ player: getOpponent(player), change: 1 }),
        )
      }

      dispatch(removePieceFromBoard({ player, piece: currentPosition }))
      dispatch(addPieceOnBoard({ player, piece: destination }))
    } else if (destination === courseLength + 2) {
      // Завершаем прохождение маршрута
      dispatch(removePieceFromBoard({ player, piece: currentPosition }))
      dispatch(updateFinishedPieces({ player }))

      pieces = getState().board.pieces[player]
    }

    dispatch(updateSelectedPieces({ player, value: null }))
    pieces = getState().board.pieces[player]
    if (pieces.finished < 7) {
      dispatch(updateMovablePieces({ player, movablePieces: null }))
      dispatch(updateDice(null))
      if (!rosettes.includes(destination)) {
        // Передаем ход противнику, если не оказались сами на клетке с "розеткой"
        dispatch(changeTurns())
      }
    }

    const newState = getState().board
    if (newState.whoseTurn === "user") {
      try {
        localStorage.setItem("boardState", JSON.stringify(newState))
      } catch (e) {
        // Do nothing. The user probably blocks cookies.
      }
    }
  }

export const programMove =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    if (getState().board.dice || getState().board.pieces.program.movable) return
    // Пауза №1 после хода игрока
    await timeout()

    // Бросок костей
    dispatch(castDice())
    const movablePieces = getState().board.pieces.program.movable
    if (!getState().board.dice || !movablePieces) return
    // Пауза №2 после броска костей
    await timeout()

    // Выявляем фишки двух уровней "приоритетности":
    // 1) которые могут уйти на безопасное поле или снять фишку игрока с доски
    // 2) которые можно снять с доски
    const priority1: number[] = [],
      priority2: number[] = []
    for (const [currentPositionString, destination] of Object.entries(
      movablePieces,
    )) {
      const currentPosition = Number(currentPositionString),
        opponentPieces = getState().board.pieces.user.onBoard.filter(
          (position) =>
            position >= firstCourseTurn && position <= secondCourseTurn,
        )

      if (
        (currentPosition <= secondCourseTurn &&
          destination > secondCourseTurn) ||
        (currentPosition >= firstCourseTurn &&
          rosettes.includes(destination)) ||
        opponentPieces.includes(destination)
      ) {
        priority1.push(currentPosition)
      }

      if (destination === courseLength + 2) {
        priority2.push(currentPosition)
      }
    }

    // Выбираем позицию
    let position: number
    if (priority1.length) {
      position = priority1[Math.floor(Math.random() * priority1.length)]
    } else if (priority2.length) {
      position = priority2[Math.floor(Math.random() * priority2.length)]
    } else {
      const positions = Object.keys(movablePieces)
      position = Number(positions[Math.floor(Math.random() * positions.length)])
    }
    dispatch(updateSelectedPieces({ player: "program", value: position }))
    // Делаем паузу после выбора позиции
    await timeout()

    // Делаем ход
    dispatch(movePiece({ currentPosition: position }))
    dispatch(updateSelectedPieces({ player: "program", value: null }))

    try {
      localStorage.setItem("boardState", JSON.stringify(getState().board))
    } catch (e) {
      // Do nothing. The user probably blocks cookies.
    }
  }

// Reducer
export default boardSlice.reducer
