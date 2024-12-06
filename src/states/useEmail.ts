import { create } from 'zustand'

type State = {
  email: string
}

type Actions = {
  setEmail: (e: string) => void;
}

const useEmail = create<State & Actions>()( (set) => ({
  email: '',
  setEmail: (e) => {
    set((state) => ({
      email: e
    }))
  }
}))

export default useEmail;