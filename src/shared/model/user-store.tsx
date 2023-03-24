import { create } from "zustand"
import { User } from "./common-types"

type UserStore = User & {
  setUser: (v: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  email: null,
  username: null,
  accessToken: localStorage.getItem("accessToken"),
  setUser: (user: User) =>
    set({
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken: user.accessToken,
    }),
}))
