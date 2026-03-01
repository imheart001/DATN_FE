import { useAppSelector } from "../store/hooks"
import { RootState } from "../store/store"

export const PrivateRouterAdmin = () => {
    const auth = useAppSelector((state: RootState) => state.auth)
  return (
    <div>PrivateRouterAdmin</div>
  )
}
