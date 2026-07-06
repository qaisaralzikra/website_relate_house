/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
