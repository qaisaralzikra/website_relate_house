/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react'
import { initialData } from '../data/defaults.js'

const STORAGE_KEY = 'relate_data'

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...initialData, ...parsed }
    }
  } catch {
    // ignore parse errors
  }
  return initialData
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SECTION':
      return { ...state, [action.section]: action.payload }
    case 'RESET_SECTION':
      return { ...state, [action.section]: initialData[action.section] }
    case 'RESET_ALL':
      return initialData
    default:
      return state
  }
}

const DataContext = createContext(null)
const DataDispatchContext = createContext(null)

export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, null, loadData)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore storage errors
    }
  }, [data])

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}

export function useDataDispatch() {
  return useContext(DataDispatchContext)
}
