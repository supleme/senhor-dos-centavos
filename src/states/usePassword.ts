import { create } from 'zustand'

type State = {
  password: string
}

type Actions = {
  setPassword: (p: string) => void;
}

const usePassword = create<State & Actions>()( (set) => ({
  password: '',
  setPassword: (p) => {
    set((state) => ({
      password: p
    }))
  }
}))

export default usePassword;