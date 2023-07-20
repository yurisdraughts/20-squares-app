import { useAppDispatch } from "../../app/hooks"
import { resetState } from "./boardSlice"

export function ResetButton({ className }: { className: string }) {
  const dispatch = useAppDispatch()

  return (
    <button
      className={className}
      onClick={() => {
        dispatch(resetState())
      }}
    >
      Начать сначала
    </button>
  )
}
