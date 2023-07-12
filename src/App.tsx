import { Board } from "./features/board/Board"
import { Dice } from "./features/board/Dice"
import { PieceContainer } from "./features/board/PieceContainer"
import "./App.scss"

function App() {
  return (
    <div className="App">
      <PieceContainer player="program" />
      <Board />
      <PieceContainer player="user" />
      <Dice />
    </div>
  )
}

export default App
