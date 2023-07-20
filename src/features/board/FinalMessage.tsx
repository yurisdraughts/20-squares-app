import { ResetButton } from "./ResetButton"
import style from "./FinalMessage.module.scss"
import boardStyle from "./Board.module.scss"

export function FinalMessage({ userWon }: { userWon: boolean }) {
  return (
    <div
      className={`${boardStyle.finalMessage} ${style.container} ${
        userWon ? style.container_win : style.container_lose
      }`}
    >
      <h2 className={`${style.message} ${userWon ? style.win : style.lose}`}>
        Вы {userWon ? "выиграли!" : "проиграли..."}
      </h2>
      <ResetButton
        className={`${boardStyle.restartButton} ${boardStyle.restartButton_finalMessage}`}
      />
    </div>
  )
}
