import { Die } from "./Die"
import style from "./Dice.module.scss"

export function Dice() {
  return (
    <div className={style.dice}>
      <Die index={0} />
      <Die index={1} />
    </div>
  )
}
