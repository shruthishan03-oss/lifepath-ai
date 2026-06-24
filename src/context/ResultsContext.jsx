import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'lifepath-ai-results'
const ResultsContext = createContext(null)

function readStoredResults() {
  if (typeof window === 'undefined') return null
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function saveStoredResults(results) {
  if (typeof window === 'undefined') return
  if (!results) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
}

export function ResultsProvider({ children }) {
  const [results, setResultsState] = useState(readStoredResults)

  const value = useMemo(() => ({
    results,
    hasResults: Boolean(results),
    setResults(nextResults) {
      setResultsState(nextResults)
      saveStoredResults(nextResults)
    },
    clearResults() {
      setResultsState(null)
      saveStoredResults(null)
    },
  }), [results])

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  )
}

export function useResults() {
  const context = useContext(ResultsContext)
  if (!context) {
    throw new Error('useResults must be used inside ResultsProvider')
  }
  return context
}
